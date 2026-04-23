# ZANESBESTLIFE Quiz

A high-converting quiz funnel built in Next.js with:

- an 8-step quiz flow
- email capture on the final step
- derived score and tailored reset-plan summary
- GitHub-backed lead storage for production
- local file storage for development

## Local development

```bash
npm install
npm run dev
```

In development, submitted leads are appended to `data/leads-dev.ndjson`.

## Production lead storage

For durable storage on Vercel, set these environment variables and point them at a **private GitHub repository** dedicated to leads:

```bash
GITHUB_STORAGE_REPO=SuperDashJ/zanesbestlife-leads
GITHUB_STORAGE_TOKEN=github_pat_xxx
GITHUB_STORAGE_BRANCH=leads
GITHUB_STORAGE_COMMITTER_NAME=ZanesBestLife Leads
GITHUB_STORAGE_COMMITTER_EMAIL=leads@users.noreply.github.com
```

How it works:

1. The API route creates the storage branch if it does not exist.
2. Each submission is appended to a dated `.ndjson` file in that branch.
3. The quiz stores email, answers, score, and generated plan summary.

## Deploying to Vercel

1. Push this project to GitHub.
2. Import the repo into Vercel.
3. Add the environment variables above in the Vercel project settings.
4. Deploy.

## Notes

- The visual structure is built to match the supplied quiz references while staying fully editable in-code.
- The image references from the chat were recreated as inline SVG illustrations inside the app so the project remains self-contained in this workspace.
