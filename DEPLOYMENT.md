Vercel deployment — quick guide

Overview
- This repository is a Next.js 16 (App Router) project and works natively on Vercel.
- Vercel will install dependencies using pnpm (if `pnpm-lock.yaml` is present) and run `pnpm run build` (which maps to `next build`).

Quick steps — GitHub → Vercel (recommended)
1. Push your repo to GitHub (or GitLab/Bitbucket).
2. Sign in to Vercel (https://vercel.com) and click "New Project" → "Import Project".
3. Choose the repository you pushed.
4. In the import screen, confirm:
   - Framework Preset: Next.js
   - Build Command: `pnpm run build`
   - Install Command: `pnpm i`
   - Output Directory: (leave blank — Next handles it)
5. Add any Environment Variables (VERCEL env UI) required by your app (e.g., API keys). Do NOT store secrets in the repo.
6. Deploy. Vercel will create a production deployment and give you a URL.

Optional: test deploy locally with Vercel CLI
- Install: `pnpm i -g vercel` (or `npm i -g vercel`)
- Link project: `vercel login` → `vercel link`
- Deploy: `vercel --prod` (first `vercel` will create a preview deployment)

Notes and troubleshooting
- If Vercel complains about using the wrong package manager, ensure `pnpm-lock.yaml` is checked into the repo root.
- If you see Turbopack warnings about root inference, you can set `turbopack.root` in `next.config` (not required for a standard Vercel import). Example (if needed):

  // next.config.mjs
  export default {
    turbopack: { root: __dirname },
    /* ...other config... */
  }

- For Docker/Platform-as-a-Service use, add `output: 'standalone'` to `next.config` and build the standalone files.

CI / PR Checks
- Add a simple GitHub Action to build on PRs to prevent regressions: run `pnpm i` and `pnpm run build`.

If you'd like, I can:
- Add a `.github/workflows/ci.yml` that runs `pnpm i` and `pnpm run build` on PRs.
- Generate a short `vercel` CLI script and a sample env file (`.env.example`).

Tell me which of those you'd like me to add next and I’ll implement it.