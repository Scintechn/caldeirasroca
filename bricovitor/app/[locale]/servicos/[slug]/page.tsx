import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ICON_FOR_KEY,
  Phone,
  Sparkles,
  WhatsAppIcon,
} from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { business, whatsappLink } from "@/lib/business";
import {
  defaultLocale,
  getDictionary,
  hreflangMap,
  isLocale,
  locales,
} from "@/lib/i18n";
import { anchorServices, getService, services } from "@/lib/services";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    anchorServices().map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const service = getService(slug);
  if (!service?.copy[locale].detail) {
    return { title: dict.meta.services.title };
  }
  const c = service.copy[locale];
  return {
    title: `${c.name} · ${dict.meta.siteName}`,
    description: c.short,
    alternates: {
      canonical: `/${locale}/servicos/${slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflangMap[l], `/${l}/servicos/${slug}`]),
      ),
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const t = getDictionary(locale);
  const service = getService(slug);
  if (!service || !service.copy[locale].detail) notFound();
  const c = service.copy[locale];
  const detail = c.detail!;
  const Icon = ICON_FOR_KEY[service.iconKey] ?? Sparkles;

  const related = services
    .filter((s) => s.slug !== slug && s.tier === "anchor")
    .slice(0, 3);

  return (
    <>
      {/* HERO — light */}
      <section className="relative isolate overflow-hidden bg-white text-brand-900">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_10%,rgba(245,158,11,0.10),transparent_70%)]"
        />
        <Container className="py-14 sm:py-16 lg:py-20">
          <Link
            href={`/${locale}#catalogo`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition hover:text-brand-900"
          >
            ← {t.serviceDetail.backToCatalog}
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500 text-brand-950 shadow-sm"
            >
              <Icon className="h-6 w-6" />
            </span>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-700">
              {c.name}
            </p>
          </div>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-900 sm:text-5xl">
            {detail.heroLead}{" "}
            <span className="text-accent-600">{detail.heroHighlight}</span>
            {detail.heroTail}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {detail.intro}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppLink
              href={whatsappLink()}
              location="hero"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp-500 px-5 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-whatsapp-600 sm:text-lg"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t.hero.primaryCta}
            </WhatsAppLink>
            <a
              href={business.phone.urgent.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-3.5 text-base font-semibold text-brand-950 shadow-lg transition hover:bg-accent-600 sm:text-lg"
            >
              <Phone className="h-5 w-5" />
              {business.phone.urgent.display}
            </a>
          </div>
        </Container>
      </section>

      {/* SUB-SERVICES */}
      <Section variant="muted">
        <Container>
          <header className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              {t.serviceDetail.subServicesTitle}
            </h2>
          </header>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {detail.subServices.map((sub) => (
              <article
                key={sub.title}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-100 text-accent-700"
                >
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-brand-900">
                  {sub.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {sub.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* PROBLEMS */}
      <Section variant="default">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <header>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              {detail.problemsTitle}
            </h2>
          </header>
          <ul className="grid gap-3 sm:grid-cols-1">
            {detail.problems.map((problem) => (
              <li
                key={problem}
                className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent-100 text-accent-700"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-slate-800 sm:text-base">
                  {problem}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* BRANDS (if any) */}
      {detail.brands && detail.brands.length > 0 && (
        <Section variant="muted">
          <Container>
            <header className="max-w-3xl">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
                {detail.brandsTitle ?? t.serviceDetail.brandsTitle}
              </h2>
            </header>
            <ul className="mt-8 flex flex-wrap gap-2">
              {detail.brands.map((brand) => (
                <li key={brand}>
                  <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-sm font-medium text-brand-800 ring-1 ring-inset ring-slate-200">
                    {brand}
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* FINAL CTA for the service — warm amber tint */}
      <Section variant="warm">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
                {detail.ctaTitle}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
                {detail.ctaBody}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <WhatsAppLink
                href={whatsappLink()}
                location="final_cta"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp-500 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-whatsapp-600 sm:text-lg"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t.finalCta.whatsapp}
              </WhatsAppLink>
              <a
                href={business.phone.urgent.href}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-900 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-brand-800 sm:text-lg"
              >
                <Phone className="h-5 w-5" />
                {business.phone.urgent.display}
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* RELATED */}
      <Section variant="default">
        <Container>
          <header className="max-w-3xl">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-brand-900 sm:text-3xl">
              {t.serviceDetail.relatedTitle}
            </h2>
          </header>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {related.map((s) => {
              const RelatedIcon = ICON_FOR_KEY[s.iconKey] ?? Sparkles;
              const cc = s.copy[locale];
              return (
                <Link
                  key={s.slug}
                  href={`/${locale}/servicos/${s.slug}`}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-md"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-100 text-accent-700"
                  >
                    <RelatedIcon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-brand-900">
                    {cc.name}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-slate-600">
                    {cc.short}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-700">
                    {t.catalog.viewService}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
