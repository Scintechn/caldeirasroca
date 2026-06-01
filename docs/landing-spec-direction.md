# Landing Page Spec & Direction

A reusable specification for building small-business landing pages / marketing sites. Captures the architecture, conventions, and operational choices proven on production deployments, so a new site for a different business follows the same shape without re-deriving every decision.

This document is **business-agnostic**. Anywhere it mentions "the business", substitute the real one. Anywhere it mentions a specific locale, substitute the locale(s) your market actually needs.

---

## 1. What this spec is for

Use this when:
- Building a **marketing/landing site** for a service business (electricians, gyms, dentists, clinics, agencies, restaurants, etc.).
- The site is **mostly static content + a small number of conversion surfaces** (contact form, WhatsApp CTA, click-to-call).
- The business needs **multilingual SEO** (typically two locales: native + English) and **local SEO** (Google Business / structured data).
- Budget for vendors is **near zero** — free tiers only, no SaaS unless unavoidable.
- The site will live on **Vercel**.
- The site needs **Portuguese as the primary language and English as the secondary language**, with a user-facing switcher to toggle between them. (Substitute the locales your market needs; the pattern is the same.)
- **Vercel Analytics is enabled** and **WhatsApp interactions are tracked** as custom events.
- Where the business already has brand assets — existing copy, factual information about the company, social following, and brand colors — those are used as the source of truth rather than invented (see §4a Content intake and §10 Visual system).

Do **not** use this for: SaaS apps, dashboards behind auth, e-commerce, content-heavy publications. Those need different architecture.

---

## 1a. Pitching prep (internal — not a client deliverable)

> **Audience: you, not the client.** This section is your private sales preparation. It is **never shown, sent, or handed to the business**. Its *content* is built from the data you gathered and validated about them in §4a — so it's specific to the real business — but it stays in your own notes (a scratch doc, your CRM, the project's internal `NOTES.md` — anywhere outside the repo's public deliverables). Don't commit it into the client-facing site or any document they receive.

For most small-business owners the site is a cost they're unsure about, not a product they're shopping for. So your prep centers on outcomes — leads, trust, being found — and keeps the technical choices invisible. The zero-vendor-cost posture is a point in your favor; note it.

### Build the pitch on what you already validated

The intake and validation work (§4a) doubles as pitch material: walking in with their *real* data already assembled shows competence and de-risks the decision. Pull these from §4a and turn them into talking points for yourself:

- Their current Google rating and review count, and the fact that none of it currently surfaces on their own site.
- Concrete gaps you found while validating: no mobile site, wrong hours online, no English version for tourists/expats, a competitor outranking them.
- A one-line outcome statement in the owner's language to use live (e.g. a fast page that shows up on Google, in Portuguese and English, one tap from WhatsApp or a call).

### Anchor on conversion surfaces, not features

Owners care about the phone ringing. For your own reference, map every feature to a lead so you can lead with the outcome, not the mechanism:

- WhatsApp FAB + click-to-call → every visitor is one tap from reaching them.
- Contact form → leads hit their phone instantly via Telegram, no inbox to check.
- Local SEO + structured data → they show up when someone nearby searches the service.
- Bilingual → they don't lose the customer who searches in English.

### Be honest about cost and what you don't control

Things to state plainly in the conversation so expectations are set before you build:

- **Hosting and tooling are free** at this volume (Vercel, analytics, Telegram). The cost is your time, plus a domain (~€10–15/yr) and possibly a small Google Maps API spend if reviews are pulled.
- **Reviews and ranking**: you can *display* their Google rating, but you cannot make star ratings appear in Google search results for their own business (§4a), and SEO is a multi-week effect, not a launch-day switch.
- **Ownership and updates**: who owns the domain and repo, and how copy/hours get changed later (a PR by you, since there's no CMS — §2). The actual "how to request an update" note for the owner is a separate, client-facing artifact produced at handoff (§13) — not this section.

### Scope guardrails

For your own boundary-setting: say yes to more pages, more services, a second/third locale, swapping Telegram for email. Say no (or "that's a different project") to logins, online booking with payments, a storefront, or owner self-editing — those break the architecture this spec is built for and belong in §14's deviation list. Naming the boundary up front prevents scope creep from eroding a fixed-fee job.

---

## 2. Locked-in stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16+ (App Router)** | RSC by default keeps JS bundle small; file-based routing fits flat marketing sites; first-class on Vercel. |
| Language | **TypeScript (strict)** | Catches drift between i18n keys, dictionary shape, component props. |
| Styling | **Tailwind CSS v4** | Utility-first, no runtime CSS-in-JS, zero-config dark mode if needed later. |
| Icons | **lucide-react** | Tree-shakable, consistent stroke, no separate icon font. |
| Fonts | **next/font** (Google or local) | Auto-self-hosts, eliminates layout shift, no FOIT. |
| Analytics | **@vercel/analytics** | Free on Vercel, no cookies, no consent banner needed in EU. |
| Hosting | **Vercel** | Free tier covers a landing site; preview deploys per PR; first-party Next.js support. |
| Forms backend | **Telegram bot** (default) OR **Resend** (when email is mandatory) | Both free at landing-page volume. Telegram = instant phone notification; Resend = proper sender domain. |
| Form state | **React 19 `useState` + Server Actions** | No `react-hook-form` / `formik` — server action does authoritative validation. |
| Validation | **Hand-rolled** (regex + length bounds) | Zod is fine but unnecessary for ~5 fields. Don't add a dep for this. |

**What we do NOT use** (intentionally):
- ❌ A UI component library (shadcn/Radix/MUI) — landing pages are small enough that primitives + Tailwind beats the abstraction tax.
- ❌ State management (Redux/Zustand/Jotai) — no shared client state to manage.
- ❌ A CMS — copy lives in typed dictionaries (see §5), edited via PR. If the business *actually* needs to edit copy without a developer, that's a different project shape.
- ❌ Custom backend / DB — landing sites have no persistent state worth a database.

---

## 3. Project structure

```
app/
  [locale]/                    # All public pages live under a locale segment
    layout.tsx                 # Locale-aware root: fonts, header, footer, analytics, JSON-LD
    page.tsx                   # Home
    contact/
      page.tsx
      actions.ts               # Server Actions for this route
    services/
      page.tsx
    privacy-policy/
      page.tsx
    terms/
      page.tsx
    opengraph-image.tsx        # Dynamic OG image (next/og)
  globals.css                  # Tailwind directives + design tokens
  robots.ts                    # Generated robots.txt
  sitemap.ts                   # Generated sitemap.xml
  favicon.ico
components/
  ui/                          # Generic, business-agnostic primitives
    Button.tsx
    Container.tsx
    Section.tsx
    Reveal.tsx                 # Scroll-reveal animation wrapper
  Header.tsx
  Footer.tsx
  ContactForm.tsx              # Client component — the only stateful form
  WhatsAppFab.tsx              # Floating button (sitewide)
  WhatsAppLink.tsx             # Small client wrapper that fires analytics on click
  ServiceCard.tsx
  LocaleSwitcher.tsx
  Logo.tsx
  icons.tsx                    # Curated re-exports from lucide
lib/
  business.ts                  # Single source of truth for business FACTS
  i18n/
    index.ts                   # locales, defaultLocale, getDictionary, isLocale
    types.ts                   # Dictionary shape
    pt.ts                      # Primary-locale copy
    en.ts                      # Secondary-locale copy
  cn.ts                        # className merge helper (clsx + tailwind-merge or hand-rolled)
proxy.ts                       # Locale-prefix redirect (Next 16 convention — was `middleware.ts`)
next.config.ts                 # Security headers, image config
vercel.json                    # Pins framework: "nextjs"
docs/
  landing-spec-direction.md    # This file
```

**Conventions:**
- Components are `PascalCase.tsx`. Utilities are `camelCase.ts`.
- Server components by default; `"use client"` only when the file needs hooks, event handlers, or browser APIs.
- Page-specific server actions live next to the page (`actions.ts`). Globally useful actions go in `lib/actions/`.
- Pages re-export `generateStaticParams` so every locale is pre-rendered.

---

## 4. Two single sources of truth

The cardinal rule: any piece of information about the business or any piece of translatable copy must have **exactly one home**.

### `lib/business.ts` — business facts

Hard facts about the company: legal name, tax ID, addresses, phone numbers, hours, social URLs, map embed URL, mandatory legal links (consumer rights pages, dispute resolution platforms required by local law).

```ts
export const business = {
  legalName: "...",
  brandName: "...",
  siteUrl: "https://...",
  taxId: "...",
  foundedYear: 2018,
  registeredOffice: { street, postalCode, locality, country },
  showroom: { ... },        // public-facing location, may differ from registered office
  phone: {
    landline: { display: "...", href: "tel:+..." },
    mobile:   { display: "...", href: "tel:+..." },
  },
  whatsapp: { display: "...", number: "..." },  // digits-only for wa.me URLs
  email:    { display: "...", href: "mailto:..." },
  hours: { weekdays: { morning, afternoon }, weekendClosed: true },
  mapEmbedSrc: "...",
  mapDirectionsUrl: "...",
} as const;
```

Plus small helpers next to the data: `whatsappLink(message?)`, address-as-one-line getters, etc. Anywhere a page references the business, it imports from here. Changing a phone number is a one-line PR.

### `lib/i18n/` — translatable copy

All user-facing strings live in `pt.ts` / `en.ts` (or whatever locales apply), typed against a shared `Dictionary` in `types.ts`. The `getDictionary(locale)` helper returns the right slice for a given page.

Pages receive a slice via props, not via a hook — keeps server components pure and lets TypeScript catch missing keys.

```tsx
// page.tsx (server component)
const t = getDictionary(locale).contact;
return <ContactForm t={t.form} locale={locale} />;
```

```tsx
// ContactForm.tsx (client component)
export function ContactForm({ t, locale }: { t: Dictionary["contact"]["form"]; locale: Locale }) {
  return <button>{t.submit}</button>;
}
```

**Adding a new locale** = create `lib/i18n/xx.ts` mirroring the existing shape, add `"xx"` to the `locales` tuple. TypeScript will flag every missing key.

**Why not a CMS or JSON files?** Typed dictionaries catch missing keys at build time, version with the code, and reviewed in PRs alongside the components that use them.

---

## 4a. Content intake & data validation

Before any code is written, gather the business's real information into one place and verify it. A landing site built on guessed facts is worse than no site — wrong hours or a dead phone number actively costs the business leads. This step front-loads the facts that `lib/business.ts` and the i18n dictionaries (§4) consume.

### Intake checklist

Collect from the business owner directly, and cross-check against public sources:

- **Identity**: legal name, brand/trading name, tax ID, year founded.
- **Locations**: registered office and any public-facing location (showroom, clinic, storefront). Note when they differ.
- **Contact**: landline, mobile, WhatsApp number (digits-only for `wa.me`), email.
- **Hours**: per-day opening hours, including lunch breaks and weekend/holiday closures.
- **Web presence**: current website (if any), Google Business Profile, social URLs, follower counts (useful as social proof copy).
- **Brand**: logo files (SVG preferred), existing brand colors (hex), fonts if any, tagline, tone of voice.
- **Content**: services offered, service area, pricing posture (exact / "from €X" / "request a quote"), differentiators, certifications/licenses, team size.
- **Legal**: locale-mandated links (consumer-rights pages, online dispute resolution platform, privacy/terms requirements).

### Validate against the current site and Google Maps

Owner-supplied facts drift from reality. Reconcile every fact against at least one public source before committing it to `lib/business.ts`:

1. **Current website** — if one exists, fetch it and extract the live phone, address, hours, and any structured data already present. Treat mismatches as questions for the owner, not as truth.
2. **Google Maps / Google Business Profile** — the authoritative source for **address, geo coordinates, opening hours, and phone** for a local business. Resolve the business's `place_id` once (Google's Place ID Finder, or a `places:searchText` lookup with the business name + locality) and store it; everything else keys off it.
3. **Flag conflicts explicitly.** If the site says one phone and Maps says another, do not silently pick one. Surface both to the owner and have them confirm before launch — the confirmed value becomes the single source of truth in `lib/business.ts`.

> ⚠️ **Never scrape Google Maps via the HTML interface or an unofficial scraper.** It violates Google's Terms of Service and risks an API ban. Use the official Places API (New) — endpoint `https://places.googleapis.com/v1/places`, authenticated with `X-Goog-Api-Key` and a `X-Goog-FieldMask` — for any programmatic data pull.

### Geo & directions data

For the map and the "get directions" CTA, capture during intake:

- `geo` (lat/lng) — pulled from the Place Details response, also feeds JSON-LD (§9).
- `mapEmbedSrc` — the Maps embed iframe URL (uses `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY`).
- `mapDirectionsUrl` — a `https://www.google.com/maps/dir/?api=1&destination=...` link (prefer `destination_place_id` over a raw address so the pin is exact). This is the target of the "Get directions" button and should fire a `directions_click` analytics event (§8).

### Reviews & star rating from Google Maps

Reviews are strong conversion fuel, but there are two hard constraints to design around:

- **API cap**: the official Places API returns **at most 5 reviews** per place, plus the **aggregate `rating`** and **`userRatingCount`**. Getting more requires the Google Business Profile API (only for locations the owner manages, paginated up to 50/page) or a paid third-party service — out of scope for the zero-budget default.
- **SEO reality**: displaying a business's own Google rating on its own site is a **self-serving review** in Google's eyes. As of Google's 2019 policy (still in force), `LocalBusiness`/`Organization` schema with self-serving `AggregateRating` is **ineligible for star rich results** in search, and inflated/unverifiable aggregates risk a manual action. So show reviews on-page for **trust and conversion**, but do **not** expect (or fake) search-result stars from them.

Practical implementation:

1. **Server-side fetch + cache.** Call the Places API from a server component or route, requesting `rating,userRatingCount,reviews` via field mask. Cache the response (e.g. `revalidate: 86400`) — reviews update only every few hours and the API is billed per call.
2. **Render in a client component** (`<Reviews>`): show the aggregate stars, the count, and up to 5 review cards (author name, rating, text, relative time). Always include author attribution as Google requires.
3. **Accuracy rule.** Any rating/count shown on the page must match what the API returned exactly. Never hardcode an aggregate that can drift.
4. **Env var**: `GOOGLE_PLACES_API_KEY` (server-only, no `NEXT_PUBLIC_` prefix — it must never reach the browser).

---

## 5. Routing & internationalization

### Locale-prefix-all strategy

Every URL is prefixed with the locale: `/pt/contact`, `/en/contact`. No "naked" routes. This is enforced by:

1. **File system**: every page lives under `app/[locale]/`.
2. **`proxy.ts`** at project root: any incoming request without a locale prefix is 308-redirected to `/{defaultLocale}{path}`.

```ts
// proxy.ts (Next 16 — was middleware.ts in prior versions)
const LOCALES = ["pt", "en"] as const;        // keep in sync with lib/i18n/index.ts
const DEFAULT_LOCALE = "pt";
const PUBLIC_FILE = /\.[\w-]+$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internals, API routes, and anything that looks like a file.
  // `/_vercel/*` MUST be skipped — that's where Web Analytics serves its script
  // and receives beacon POSTs. Letting the locale prefix attach to those paths
  // breaks analytics silently (every event 308-redirected into /pt/_vercel/...).
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) return NextResponse.next();

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/|_vercel/|api/|.*\\.[\\w-]+$).*)"],
};
```

**Why inline the locale list in `proxy.ts`** instead of importing from `lib/i18n`? Importing pulls the full dictionaries into the proxy bundle. The 2-line duplication is cheaper than the bundle bloat.

### Page boilerplate

Every locale-aware page follows the same shape:

```tsx
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.pageTitle,
    description: dict.meta.pageDescription,
    alternates: {
      canonical: `/${locale}/this-page`,
      languages: Object.fromEntries(locales.map((l) => [hreflangMap[l], `/${l}/this-page`])),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const t = getDictionary(locale).thisPage;
  // ...
}
```

**Note on Next 16 async `params`**: page params are now a `Promise`. Always `await` them.

---

## 6. Server vs. client boundary

Default to server. Add `"use client"` only when one of these is true:
- The component uses React state, refs, or event handlers (`onClick`, `onChange`, `onSubmit`).
- The component reads browser APIs (`window`, `navigator`, `localStorage`).
- The component fires analytics (`track()` requires client).

**Pattern: extract the interactive bit into a tiny client wrapper.** Don't promote an entire heavy section to client just because it has a single trackable link.

Example from this repo — the EV-charging section is a fat server component, but its WhatsApp CTA goes through `<WhatsAppLink>` (client, ~10 lines) so only that link ships JS:

```tsx
// components/WhatsAppLink.tsx — the only client island
"use client";
import { track } from "@vercel/analytics";
export function WhatsAppLink({ href, location, children, ...rest }) {
  return (
    <a {...rest} href={href} target="_blank" rel="noopener noreferrer"
       onClick={() => track("whatsapp_click", { location })}>
      {children}
    </a>
  );
}
```

---

## 7. Forms & lead delivery

### Architecture

1. **Client component** holds form state, runs UX validation, shows error/success UI.
2. **Server Action** (co-located with the page in `actions.ts`) re-validates authoritatively and delivers the message.
3. Action returns a discriminated result: `{ ok: true } | { ok: false; error: "validation" | "config" | "delivery" }`.
4. Form shows generic error if `!result.ok`. Specific error codes are for server logs, not the visitor.

### Delivery channels

Pick **one** based on the business:

#### Default — Telegram bot (recommended for solo operators)
- **Pros**: Instant phone notification, zero setup cost, no domain verification, no deliverability concerns, free forever.
- **Cons**: Notifications live in Telegram (not a paper trail in an inbox), one human reads them.
- **Setup**: Create bot via @BotFather → get token. Send bot a message → call `getUpdates` → grab `result[].message.chat.id` (NOT `update_id`). Store both as Vercel env vars: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
- For a **shared team inbox**, add the bot to a Telegram group; the chat ID will be negative (e.g. `-1001234567890`).

#### When email is mandatory — Resend
- **Pros**: Proper email, sender domain auth (SPF/DKIM via DNS), 3,000/mo free.
- **Cons**: Requires DNS access to the business domain, 1-day verification.
- **Setup**: Install via Vercel Marketplace (auto-provisions `RESEND_API_KEY`), verify domain, swap the action's HTTP call from Telegram to Resend.

### Server Action template

See `app/[locale]/contact/actions.ts` for the canonical implementation. Key invariants:

- Read env vars at **call time**, not module-load time (so missing vars log clearly instead of crashing the page).
- Escape user input before interpolating into HTML payloads (Telegram interprets a small HTML subset; an unescaped `<` in a name field can break the message or worse).
- Bound string lengths (`name <= 200`, `message <= 5000`, etc.) — protects against accidental flooding and adversarial bots.
- Allowlist categorical fields (subject, etc.) against a hardcoded tuple. Don't pass arbitrary strings through to delivery.
- Log failures with a `[route-name]` prefix so they're greppable in Vercel logs.

### Validation rules (default starter set)

- `name`: required, 1–200 chars after trim.
- `email`: required, matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, ≤ 200 chars.
- `phone`: optional, ≤ 50 chars (allow any format — international, hyphens, parens; people type phones in 30 different ways).
- `message`: required, 10–5000 chars after trim.
- `consent` (privacy policy checkbox): required `true` — non-negotiable in EU/UK.
- `subject`: optional or one of a hardcoded value list.

---

## 8. Analytics

### Page views — free, automatic
Mount `<Analytics />` from `@vercel/analytics/next` once in `app/[locale]/layout.tsx`. No further code; route-change events are captured automatically.

### Custom events — for conversion-relevant interactions

Track only **high-intent actions**, not generic clicks. Suggested event taxonomy:

| Event | When | Properties |
|---|---|---|
| `whatsapp_click` | Any WhatsApp link/button click | `location: "fab" \| "header" \| "ev_spotlight" \| ...` |
| `phone_click` | Click-to-call link | `location` |
| `directions_click` | "Get directions" / map CTA click | `location` |
| `contact_form_submit` | Form Server Action returns `ok: true` | `subject` (the categorical value, e.g. `"electrical"`) |
| `service_card_open` | Visitor opens a service detail (if any) | `service_id` |

Conventions:
- **Event names**: `snake_case`, verb_noun or noun_action.
- **Property values**: stick to `string | number | boolean` (Vercel's `AllowedPropertyValues`). Don't pass URLs, PII, or freeform text — properties are for filtering/grouping in the dashboard, not storing data.
- **The `location` property is mandatory** for any event triggered from more than one place in the UI — without it you can't tell which touchpoint converted.

### Privacy posture
Vercel Analytics is **cookieless** and **anonymous** — no consent banner required under GDPR. If you ever swap it for GA/Plausible/etc., that calculus changes; check current rules before shipping.

---

## 9. SEO

### Per-page metadata
Every page exports `generateMetadata` returning at minimum `title`, `description`, `alternates.canonical`, `alternates.languages` (hreflang).

### Sitemap & robots
- `app/sitemap.ts` exports a `MetadataRoute.Sitemap` listing every public URL for every locale.
- `app/robots.ts` exports a `MetadataRoute.Robots` allowing crawl, pointing at the sitemap.

### Structured data (JSON-LD)
The layout includes a JSON-LD blob describing the business. Pick the most specific schema.org type that fits:

| Business type | schema.org type |
|---|---|
| Electrician / contractor | `Electrician`, `Plumber`, `HVACBusiness`, `RoofingContractor` |
| Doctor / clinic | `MedicalBusiness`, `Dentist`, `Physician` |
| Restaurant / café | `Restaurant`, `CafeOrCoffeeShop` |
| Gym / studio | `ExerciseGym`, `SportsActivityLocation` |
| Generic local service | `LocalBusiness` |

Required fields for local SEO: `name`, `url`, `telephone`, `address` (PostalAddress), `openingHoursSpecification`, `geo` (if known), `priceRange` (if relevant). The `geo` and `address` values come from the validated Google Maps data (§4a), so the JSON-LD, the map embed, and the directions link all stay consistent.

> **On review stars in JSON-LD**: do *not* add a self-serving `AggregateRating` to your `LocalBusiness` schema expecting star rich results — Google has excluded self-reviewed `LocalBusiness`/`Organization` entities from review snippets since 2019, and inflated aggregates risk a manual action. Display reviews on-page for conversion (§4a), not as a search-ranking trick.

### Open Graph image
`app/[locale]/opengraph-image.tsx` generates a dynamic OG image using `next/og` (ImageResponse). Default size 1200×630. Per-page overrides go in each page's own `opengraph-image.tsx`.

---

## 10. Visual system

### Color tokens
Define semantic color tokens in `app/globals.css` (Tailwind v4 `@theme` block). Typical palette for a service business:

- **Primary** (brand): one bold accent for CTAs and key surfaces.
- **Navy / dark neutral**: deep background for hero sections, headers.
- **Slate scale**: body text, surfaces, borders.
- **Semantic**: emerald (success), red (error), amber (warning) — only for system feedback, not brand.

Avoid more than 2 brand colors. Service businesses convert better with a single recognizable accent.

### Deriving the color scheme from the business's brand

Don't invent colors when the business already has a brand. Derive the palette from what they own, in this order of preference:

1. **Brand guidelines / logo files** — if they exist, pull exact hex values from the logo (open the SVG, or sample a high-res PNG). The logo's dominant color is usually the primary accent.
2. **Existing website** — sample the current site's CTA color, header background, and link color. These are the colors customers already associate with the business.
3. **Physical brand** — signage, vehicle livery, uniforms, packaging. A photo from the Google Business Profile often reveals the real brand color when no digital asset exists.
4. **Nothing exists** — only then choose a palette. Pick one accent appropriate to the sector (trust-blue for clinics, energetic orange/red for trades, warm tones for food) and confirm it with the owner before building.

Build a **full tonal scale** (50–950) from the chosen accent rather than using one flat hex — this gives hover/active states, tints for surfaces, and accessible text-on-color combinations. Then verify every text/background pairing against the contrast rules below; a brand color that fails 4.5:1 for body text gets used only for large text or surfaces, never small copy. Record the final tokens in `app/globals.css` so the palette has one home, the same way facts and copy do (§4).

### Typography
- **Display font**: a geometric or humanist sans for headings (e.g. Plus Jakarta Sans, Inter Tight, Geist).
- **Body font**: a high-readability sans for paragraphs (e.g. Inter, Geist).
- Load both via `next/font/google` with `display: "swap"` and weight subsets you actually use (typically 400/500/600 body, 600/700/800 display).

### Component primitives (`components/ui/`)
Keep this list small. Anything more specialized goes in `components/`.

- `<Container>` — max-width wrapper with horizontal padding.
- `<Section>` — vertical-rhythm wrapper with optional background variants.
- `<Button>` — variants: primary, secondary, ghost. Sizes: sm, md, lg. Renders `<button>` or `<a>` based on props.
- `<Reveal>` — IntersectionObserver-based scroll reveal (use sparingly; skip on the hero).

### Accessibility (non-negotiable)
- All interactive controls reachable by keyboard, visible focus ring (`focus-visible:ring-2`).
- All images have `alt`, decorative ones use `alt=""` + `aria-hidden="true"`.
- Color contrast ≥ 4.5:1 for body, ≥ 3:1 for large text.
- Honor `prefers-reduced-motion` for any animation that moves or pulses.
- Form inputs use `<label htmlFor>` (not placeholder-as-label) and `aria-invalid` / `aria-describedby` on errors.
- A "skip to content" link at the top of `<body>` (sr-only until focused).

---

## 11. Vercel deployment

### `vercel.json` (mandatory)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs"
}
```

**Why this file exists**: if the Vercel project is created with framework preset = "Other", builds skip Next entirely and serve `public/` as static — every dynamic route 404s with `x-vercel-error: NOT_FOUND` from the edge, with zero Next.js compilation. Pinning the framework in the repo prevents the dashboard setting from drifting. **Test for this trap**: `vercel inspect <deployment-url>` and look at the `Builds` line — if it shows `. [0ms]`, the framework preset is wrong.

### Security headers (`next.config.ts`)

```ts
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
```

Add a `Content-Security-Policy` once you know which third parties (Maps, fonts, analytics) you actually load.

### Environment variables

Set via the dashboard (most reliable) or `vercel env add <NAME> production`. The CLI's piped-stdin for `vercel env add` is unreliable in some versions — when in doubt, use the dashboard.

**Public vs. private**: anything the browser must read needs a `NEXT_PUBLIC_` prefix (e.g. `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY`). Everything else stays server-only — notably `GOOGLE_PLACES_API_KEY` (reviews fetch, §4a), `TELEGRAM_BOT_TOKEN`, and `TELEGRAM_CHAT_ID`, which must never reach the client.

Pull to local dev: `vercel env pull .env.local`. Make sure `.env*` is in `.gitignore`.

### Custom domain
Once the business confirms the production domain, add it under Project Settings → Domains. Update `business.siteUrl` in `lib/business.ts` so canonical URLs and the sitemap match. Re-deploy.

---

## 12. Known traps (in order of how badly they bit us)

1. **Vercel framework preset "Other"** — the deployment "succeeds" in 14 seconds with `Builds: . [0ms]`, then the production alias 404s every route. Always pin `framework: "nextjs"` in `vercel.json`.

2. **Stray lockfiles in `~/`** — if `~/package.json`, `~/package-lock.json`, or `~/yarn.lock` exists from a long-ago accidental `npm install` in your home directory, Next/Turbopack infers your **entire home directory** as the workspace root, starts watching everything, and freezes your Mac. Delete the orphans rather than working around it with `turbopack.root`.

3. **`__dirname` / Node globals in `next.config.ts`** — in older Next versions the config file gets evaluated inside the Edge runtime for middleware. `__dirname` is undefined there and throws `ReferenceError: __dirname is not defined` on every request. Don't reference Node-only globals in config files unless you're sure of the runtime.

4. **`middleware.ts` → `proxy.ts` in Next 16** — the convention renamed. Old `middleware.ts` files bundled by Next 16 can ship as ESM-loaded-as-CJS and crash at request time. New projects: use `proxy.ts` from day one.

5. **Telegram `chat_id` confusion** — when reading `getUpdates`, the *first* `id` you see is `update_id`, which is useless. The chat ID is nested at `result[].message.chat.id`. For groups/channels it's negative.

6. **Form silently "works"** — placeholder `setTimeout(...).then(() => setStatus("success"))` looks like a working form to QA but drops every lead. Always wire the action before declaring a contact page done; test it from end to end (UI → server log → delivery channel).

7. **Browser-extension hydration warnings** — extensions (ColorZilla, Grammarly, etc.) inject attributes into `<body>` after server HTML lands but before React hydrates. React warns about the mismatch. Reproduce in incognito before chasing it — it's almost never your code.

8. **Locale proxy eating `/_vercel/` requests** — if `proxy.ts`'s skip list and matcher don't exclude `/_vercel/`, Web Analytics fails *silently*: `/_vercel/insights/script.js` 404s and every `/_vercel/insights/view` beacon gets 308-redirected to `/{defaultLocale}/_vercel/insights/view`. The dashboard stays stuck on "0 online / Get Started" even though `<Analytics />` is mounted and the package is installed. Skip `/_vercel/` in **both** the body check **and** the matcher negative lookahead. Separately: Web Analytics has to be turned on in the Vercel dashboard before any script is served — installing the package is not enough.

---

## 13. Setup checklist for a new site

Run this sequence when bootstrapping a new business landing page:

### Day 0 — project skeleton

- [ ] **Run the §4a intake**: gather the business's facts, brand assets, and content; validate them against the current site and Google Business Profile; resolve and store the `place_id`. Flag and confirm any conflicts with the owner *before* coding.
- [ ] `npx create-next-app@latest <slug> --typescript --tailwind --app --no-src-dir --no-eslint=false`
- [ ] Copy `proxy.ts`, `next.config.ts`, `vercel.json`, and the structure of `components/ui/` from a reference repo.
- [ ] Create `lib/business.ts` with the new business's real facts. **Do this first** — every page reads from it.
- [ ] Create `lib/i18n/{index,types,pt,en}.ts` (or whatever locales). Translate the dictionary against the new business.
- [ ] `app/[locale]/layout.tsx` — paste from reference, swap fonts/colors/JSON-LD type.
- [ ] `app/[locale]/page.tsx` — home page; usually hero + 3–5 sections.
- [ ] `app/[locale]/contact/page.tsx` + `actions.ts` — contact form + Telegram delivery.
- [ ] `app/robots.ts`, `app/sitemap.ts`, `app/[locale]/opengraph-image.tsx`.
- [ ] Add `npm run dev` test of all routes locally.

### Day 1 — deploy

- [ ] `vercel link` → create the project. **In the link prompts, set framework = Next.js.**
- [ ] Verify: `vercel project inspect <name>` shows `Framework Preset: Next.js` (not "Other"). If wrong, fix in dashboard now.
- [ ] Commit `vercel.json` with `"framework": "nextjs"` as belt-and-suspenders.
- [ ] Set Telegram (or Resend) env vars: `vercel env add TELEGRAM_BOT_TOKEN production` etc.
- [ ] First push → preview deploy → smoke-test on the preview URL.
- [ ] Test the contact form end-to-end on production. If it doesn't deliver, check `vercel logs --since 5m`.
- [ ] Hook up the custom domain in Vercel; update `business.siteUrl`; redeploy.

### Day 2 — polish

- [ ] Submit sitemap to Google Search Console.
- [ ] Verify JSON-LD with the Schema.org validator.
- [ ] Lighthouse run: target ≥ 90 across the board on mobile.
- [ ] Add a `Content-Security-Policy` header once all third parties are known.
- [ ] Confirm Vercel Analytics is receiving events (page views + at least one custom event).
- [ ] Verify the "Get directions" CTA opens the correct pin and fires `directions_click`.
- [ ] If reviews are shown: confirm the displayed rating/count match the Places API response exactly, and that author attribution is present.
- [ ] Hand off: write a short "how to update your phone number / hours / copy" note for the business owner.

---

## 14. When to deviate from this spec

This spec is opinionated, not dogmatic. Reasons to break a rule:

- **Different framework**: Astro is a defensible alternative for sites that are 100% static and never need a server action. Use it then; don't drag Next into a pure-static project.
- **More than two locales**: at 4+ locales, consider extracting copy to JSON and adding a script that compares keys across locales — typed dictionaries get unwieldy.
- **High form volume**: > ~100 submissions/day argues for proper email + a DB (Supabase free tier) or a real CRM.
- **The business wants self-serve editing**: switch to a headless CMS (Sanity, Payload). At that point the dictionaries become CMS schemas.

Document any deviation in the project's own `AGENTS.md` / `CLAUDE.md` so future contributors understand why.

---

**Last updated**: 2026-05-31. When making a change to the spec, also update the reference implementation it's drawn from, or note the divergence here explicitly.
