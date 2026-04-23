import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

function headers(token) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": "zanesbestlife-quiz"
  };
}

async function githubRequest(url, options, token) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers(token),
      ...(options?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub storage failed (${response.status}): ${body}`);
  }

  return response;
}

async function ensureBranch(repository, token, branch) {
  const repoResponse = await githubRequest(
    `https://api.github.com/repos/${repository}`,
    { method: "GET" },
    token
  );
  const repo = await repoResponse.json();
  const defaultBranch = repo.default_branch;

  const branchResponse = await fetch(
    `https://api.github.com/repos/${repository}/git/ref/heads/${branch}`,
    {
      method: "GET",
      headers: headers(token),
      cache: "no-store"
    }
  );

  if (branchResponse.ok) {
    return;
  }

  if (branchResponse.status !== 404) {
    const body = await branchResponse.text();
    throw new Error(`Unable to verify storage branch (${branchResponse.status}): ${body}`);
  }

  const defaultRefResponse = await githubRequest(
    `https://api.github.com/repos/${repository}/git/ref/heads/${defaultBranch}`,
    { method: "GET" },
    token
  );
  const defaultRef = await defaultRefResponse.json();

  await githubRequest(
    `https://api.github.com/repos/${repository}/git/refs`,
    {
      method: "POST",
      body: JSON.stringify({
        ref: `refs/heads/${branch}`,
        sha: defaultRef.object.sha
      })
    },
    token
  );
}

function toBase64(content) {
  return Buffer.from(content, "utf8").toString("base64");
}

function fromBase64(content) {
  return Buffer.from(content, "base64").toString("utf8");
}

async function saveLeadToGitHub(record) {
  const repository = process.env.GITHUB_STORAGE_REPO;
  const token = process.env.GITHUB_STORAGE_TOKEN;
  const branch = process.env.GITHUB_STORAGE_BRANCH || "leads";
  const now = new Date(record.createdAt);
  const month = now.toISOString().slice(0, 7);
  const date = now.toISOString().slice(0, 10);
  const filePath = `leads/${month}/${date}.ndjson`;

  await ensureBranch(repository, token, branch);

  const url = `https://api.github.com/repos/${repository}/contents/${encodeURIComponent(
    filePath
  )}?ref=${encodeURIComponent(branch)}`;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const existingResponse = await fetch(url, {
      method: "GET",
      headers: headers(token),
      cache: "no-store"
    });

    let sha;
    let currentContent = "";

    if (existingResponse.ok) {
      const existing = await existingResponse.json();
      sha = existing.sha;
      currentContent = fromBase64(existing.content.replace(/\n/g, ""));
    } else if (existingResponse.status !== 404) {
      const body = await existingResponse.text();
      throw new Error(`Unable to read lead store (${existingResponse.status}): ${body}`);
    }

    const nextContent = `${currentContent}${JSON.stringify(record)}\n`;

    const payload = {
      message: `Capture lead ${record.id}`,
      content: toBase64(nextContent),
      branch,
      committer: {
        name: process.env.GITHUB_STORAGE_COMMITTER_NAME || "ZanesBestLife Leads",
        email:
          process.env.GITHUB_STORAGE_COMMITTER_EMAIL ||
          "41898282+github-actions[bot]@users.noreply.github.com"
      }
    };

    if (sha) {
      payload.sha = sha;
    }

    const updateResponse = await fetch(
      `https://api.github.com/repos/${repository}/contents/${encodeURIComponent(filePath)}`,
      {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(payload),
        cache: "no-store"
      }
    );

    if (updateResponse.ok) {
      return {
        mode: "github",
        repository,
        branch,
        path: filePath
      };
    }

    if (updateResponse.status !== 409 && updateResponse.status !== 422) {
      const body = await updateResponse.text();
      throw new Error(`Unable to write lead store (${updateResponse.status}): ${body}`);
    }
  }

  throw new Error("Unable to save lead after multiple GitHub write attempts.");
}

async function saveLeadToLocal(record) {
  const directory = path.join(process.cwd(), "data");
  const filePath = path.join(directory, "leads-dev.ndjson");
  await mkdir(directory, { recursive: true });
  await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");

  return {
    mode: "local",
    path: filePath
  };
}

export async function saveLead(record) {
  if (process.env.GITHUB_STORAGE_REPO && process.env.GITHUB_STORAGE_TOKEN) {
    return saveLeadToGitHub(record);
  }

  if (process.env.NODE_ENV !== "production") {
    return saveLeadToLocal(record);
  }

  throw new Error(
    "Lead storage is not configured. Set GITHUB_STORAGE_REPO and GITHUB_STORAGE_TOKEN for production."
  );
}
