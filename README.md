# Scintechn rebuilds workspace

This workspace contains modernized rebuilds of small-business landing sites, each as a self-contained Next.js 16 + Tailwind v4 project, all following the shared spec in [`docs/landing-spec-direction.md`](docs/landing-spec-direction.md).

## Projects

| Folder | Rebuild of | Locales | Status |
|---|---|---|---|
| [`caldeirasroca/`](caldeirasroca/) | `assistencia-caldeira-roca.pt/assistencia-caldeiras-roca-viana-do-castelo/` | pt + en | Working |
| [`bricovitor/`](bricovitor/) | `bricovitor.pt` (parent multi-service brand) | pt + en | Working |

Each project has its own `package.json`, `node_modules`, and Vercel deployment lifecycle. They share the spec but are otherwise independent — copy/paste between them is the reuse model, not workspace symlinks.

## Working on a project

```bash
cd caldeirasroca   # or bricovitor
npm install        # first time only
npm run dev        # local dev server
npm run build      # production build
npm run typecheck  # strict TypeScript
```

## Underlying business

Both rebuilds front the same legal entity: **Tecnidom Lda** (NIF 514303417, registered at Praceta Serra de Baixo nº1B, 2725-142 Algueirão-Mem Martins). BricoVitor is the parent multi-service brand; *Assistência Caldeiras Roca* is one of several locality-targeted landing brands operated under it.

## Deploying

Each project ships its own `vercel.json` pinning `framework: "nextjs"`. Create a Vercel project per folder, set the same env vars (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `NEXT_PUBLIC_SITE_URL`), and deploy from the repo with the **root directory** field set to the folder name.

## Spec

[`docs/landing-spec-direction.md`](docs/landing-spec-direction.md) — the locked stack, intake methodology, routing, i18n, form, SEO, color, and deployment conventions both projects follow. Read it before touching either rebuild.
