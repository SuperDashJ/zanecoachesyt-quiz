# Email Setup Checklist

This quiz already has the core email flow implemented. The visitor enters an email on the final quiz step, the browser posts the email and answers to `/api/leads`, the API builds the personalized result profile, and `lib/email.js` sends the HTML/text report through Resend.

## Current Code Path

1. The final form lives in `components/quiz-app.jsx`.
2. On submit, the client sends `{ email, answers, website }` to `/api/leads`.
3. `app/api/leads/route.js` validates the payload, builds a result profile, sends the report email, saves the lead, and returns the profile.
4. `lib/quiz-logic.js` creates the score, summary, next 72 hours, week-one checklist, and custom action plan.
5. `lib/email.js` builds the email subject, HTML body, plain-text body, and sends it to Resend.
6. `lib/storage.js` saves local leads in development, or saves production leads to GitHub when configured.

## Step By Step To Make Real Emails Send

1. Create or log into a Resend account.

2. Add a sending domain in Resend. Use a subdomain such as `mail.yourdomain.com` or `updates.yourdomain.com` when possible so quiz/report email reputation is isolated from your root domain.

3. Add the DNS records Resend gives you. At minimum, Resend domain verification depends on SPF and DKIM records. Add DMARC too once SPF and DKIM pass.

4. Wait until the domain shows as verified in Resend.

5. Create a Resend API key. Keep it secret.

6. In the Vercel project, add these environment variables:

```bash
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL="ZanesBestLife <results@your-verified-domain.com>"
RESEND_REPLY_TO="you@your-domain.com"
```

For the current `zanesquiz.com` setup, use:

```bash
RESEND_FROM_EMAIL="ZanesBestLife <results@zanesquiz.com>"
RESEND_REPLY_TO="zanesquizresults@gmail.com"
```

7. Configure production lead storage too, because `/api/leads` requires storage in production:

```bash
GITHUB_STORAGE_REPO=your-github-user/your-private-leads-repo
GITHUB_STORAGE_TOKEN=github_pat_xxx
GITHUB_STORAGE_BRANCH=leads
```

8. Redeploy the Vercel site after adding the environment variables.

9. Submit the quiz with an email address you control.

10. Confirm all three things:

- The browser success screen says the full report was emailed.
- Resend shows the email in its Emails dashboard.
- The private GitHub lead repo receives a dated `.ndjson` entry with `emailDelivery.ok: true`.

## Local Testing Notes

Without `RESEND_API_KEY`, local development intentionally skips real email and returns:

```json
{
  "ok": false,
  "skipped": true,
  "reason": "RESEND_API_KEY is not configured in local development."
}
```

To test real delivery locally, create `.env.local` with real values:

```bash
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL="ZanesBestLife <results@your-verified-domain.com>"
RESEND_REPLY_TO="you@your-domain.com"
```

Then run:

```bash
npm run dev
```

Submit the quiz through the browser, or POST a test payload to `/api/leads`.

## Important Production Notes

- Do not use `onboarding@resend.dev` for the real public site. Use a verified sender on your own domain.
- The app treats `onboarding@resend.dev` as a placeholder and sends from `ZanesBestLife <results@zanesquiz.com>` instead.
- Do not commit `.env.local`, API keys, or GitHub tokens.
- If email delivery fails in production, the API returns a `502` with `"We saved the lead, but the report email could not be sent..."` so launch testing should catch it.
- If lead storage is not configured in production, the API returns an error even if email settings are present.
