# `pitch/` — private sales prep

This folder is **gitignored except for this README**. Per-client pitch docs (`pitch/<client>.md`) live here on the local machine only and are never pushed to GitHub.

Why: per §1a of [`docs/landing-spec-direction.md`](../docs/landing-spec-direction.md), pitching material is internal to Scintechn — *"never shown, sent, or handed to the business"*. Even though §1a itself is a generic methodology safe for the public spec, anything filled in with real client data (specific gaps, competitor positions, owner-language one-liners, internal cost notes) belongs here, not in the public repo.

## Convention

- One file per client/site: `pitch/<slug>.md` — matches the rebuild's project folder name where applicable.
- Follow the §1a structure: validated facts → conversion mapping → cost & limits → scope guardrails.
- Update as the conversation evolves; the file is your living scratchpad for that engagement.
- When a deal closes, archive the final version somewhere durable (CRM, Drive) and you can delete the local file.

## What lives here (locally, never pushed)

- `pitch/<client>.md` — strategic pitch prep per prospect: validated facts, gaps, conversion mapping, scope guardrails, open questions. Built from §4a intake data. The doc you walk in *thinking about*.
- `pitch/outreach-templates.md` — reusable WhatsApp / LinkedIn / email scripts for the *first message* that links the prospect to the live rebuild. The doc you copy-paste *from*.
- Per-client outreach: the actual ready-to-send messages for that prospect live at the bottom of their `pitch/<client>.md`, populated with the §4a data and the live preview URLs.

Conventions:
- One strategy doc + one block of outreach scripts per prospect.
- When two of your protótipos serve the same legal entity (e.g. BricoVitor parent + Caldeiras Roca Viana sub-site, both Tecnidom Lda), combine outreach into one message that references both — don't send twice.

If you're cloning this repo on a new machine and these files aren't here, that's expected — they only ever existed on the original workstation.
