# ZANESBESTLIFE Quiz

A high-converting quiz funnel built in Next.js with:

- an 8-step quiz flow
- email capture on the final step
- derived score and tailored reset-plan summary
- automatic personalized report emails on submit
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
```

For automatic report delivery, also set:

```bash
RESEND_API_KEY=re_xxx
```

See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for the full production checklist, including Resend domain verification, sender setup, Vercel environment variables, and smoke testing.

Optional production overrides:

```bash
GITHUB_STORAGE_BRANCH=leads
GITHUB_STORAGE_COMMITTER_NAME=ZanesBestLife Leads
GITHUB_STORAGE_COMMITTER_EMAIL=leads@users.noreply.github.com
RESEND_FROM_EMAIL="ZanesBestLife <results@zanesquiz.com>"
RESEND_REPLY_TO=zanesquizresults@gmail.com
```

How it works:

1. The API route creates the storage branch if it does not exist.
2. Each submission generates a personalized reset report and attempts immediate email delivery.
3. Each submission is appended to a dated `.ndjson` file in the storage branch.
4. The quiz stores email, answers, score, generated plan summary, and email-delivery status.

## Deploying to Vercel

1. Push this project to GitHub.
2. Import the repo into Vercel.
3. Add the environment variables above in the Vercel project settings.
4. Deploy.

## Notes

- The visual structure is built to match the supplied quiz references while staying fully editable in-code.
- The quiz now uses the supplied local button/source images from `imagestouse/` wherever those assets were provided, with code-native fallbacks only for missing source art.
