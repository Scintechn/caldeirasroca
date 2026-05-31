import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  WhatsAppIcon,
  ICON_FOR_KEY,
} from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Faq } from "@/components/Faq";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { business, whatsappLink } from "@/lib/business";
import {
  defaultLocale,
  getDictionary,
  hreflangMap,
  isLocale,
  locales,
} from "@/lib/i18n";
import { anchorServices, services } from "@/lib/services";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [hreflangMap[l], `/${l}`])),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const t = getDictionary(locale);
  const anchors = anchorServices();
  const catalog = services.filter((s) => s.tier === "catalog");

  return (
    <>
      {/* HERO — light */}
      <section className="relative isolate overflow-hidden bg-white text-brand-900">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_10%,rgba(245,158,11,0.10),transparent_70%),radial-gradient(50%_60%_at_0%_100%,rgba(245,158,11,0.06),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(#0f172a_1px,transparent_1px),linear-gradient(90deg,#0f172a_1px,transparent_1px)] [background-size:42px_42px]"
        />
        <Container className="py-16 sm:py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-800 ring-1 ring-accent-200">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-500" />
                {t.hero.eyebrow}
              </span>

              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {t.hero.h1Lead}{" "}
                <span className="relative whitespace-nowrap text-accent-600">
                  {t.hero.h1Highlight}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 200 12"
                    className="absolute -bottom-2 left-0 right-0 mx-auto h-2 w-full text-accent-400"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8 Q 50 0 100 6 T 198 6"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                {t.hero.h1Tail}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {t.hero.subline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <WhatsAppLink
                  href={whatsappLink()}
                  location="hero"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-whatsapp-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:text-lg"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.hero.primaryCta}
                </WhatsAppLink>
                <a
                  href={business.phone.urgent.href}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-base font-semibold text-brand-950 shadow-lg shadow-amber-900/10 transition hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:text-lg"
                >
                  <Phone className="h-5 w-5" />
                  {t.hero.secondaryCta} · {business.phone.urgent.display}
                </a>
              </div>

              <ul className="mt-8 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                {[
                  t.hero.badges.years,
                  t.hero.badges.warranty,
                  t.hero.badges.coverage,
                  t.hero.badges.multiservice,
                ].map((label) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-slate-700 ring-1 ring-slate-200"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-none text-accent-600" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-x-6 -top-6 h-72 -z-10 rounded-3xl bg-gradient-to-br from-accent-100/60 to-amber-50/40 blur-2xl"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {anchors.map((s) => {
                  const Icon = ICON_FOR_KEY[s.iconKey] ?? Sparkles;
                  const c = s.copy[locale];
                  return (
                    <Link
                      key={s.slug}
                      href={`/${locale}/servicos/${s.slug}`}
                      className="group rounded-2xl bg-white p-4 ring-1 ring-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-md hover:ring-accent-200 sm:p-5"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500 text-brand-950"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-3 font-display text-base font-bold leading-tight text-brand-900">
                        {c.name}
                      </h3>
                      <p className="mt-1 text-sm leading-snug text-slate-600">
                        {c.short}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-700 transition group-hover:text-accent-800">
                        {t.catalog.viewService}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TRUST */}
      <Section variant="muted" id="confianca">
        <Container>
          <header className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              {t.trust.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {t.trust.subtitle}
            </p>
          </header>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.trust.items.map((item) => (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-100 text-accent-700"
                >
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-brand-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ANCHOR SERVICES */}
      <Section variant="default" id="servicos">
        <Container>
          <header className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              {t.catalog.anchorTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {t.catalog.anchorSubtitle}
            </p>
          </header>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {anchors.map((s) => {
              const Icon = ICON_FOR_KEY[s.iconKey] ?? Sparkles;
              const c = s.copy[locale];
              return (
                <Link
                  key={s.slug}
                  href={`/${locale}/servicos/${s.slug}`}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-md sm:flex-row sm:items-start sm:gap-5 sm:p-8"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-accent-100 text-accent-700 ring-1 ring-inset ring-accent-200 transition group-hover:bg-accent-500 group-hover:text-brand-950"
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="mt-4 flex-1 sm:mt-0">
                    <h3 className="font-display text-lg font-bold text-brand-900">
                      {c.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {c.short}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
                      {t.catalog.viewService}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CATALOG GRID */}
      <Section variant="muted" id="catalogo">
        <Container>
          <header className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              {t.catalog.catalogTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {t.catalog.catalogSubtitle}
            </p>
          </header>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.map((s) => {
              const Icon = ICON_FOR_KEY[s.iconKey] ?? Sparkles;
              const c = s.copy[locale];
              return (
                <div
                  key={s.slug}
                  className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-slate-100 text-brand-700 ring-1 ring-inset ring-slate-200"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-brand-900">
                      {c.name}
                    </h3>
                    <p className="mt-1 text-xs leading-snug text-slate-600">
                      {c.short}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-accent-500 p-6 text-brand-950 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h3 className="font-display text-xl font-bold">
                {t.finalCta.title}
              </h3>
              <p className="mt-1 text-sm text-brand-900/90 sm:text-base">
                {t.finalCta.body}
              </p>
            </div>
            <WhatsAppLink
              href={whatsappLink()}
              location="services_cta"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 sm:text-base"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t.finalCta.whatsapp}
            </WhatsAppLink>
          </div>
        </Container>
      </Section>

      {/* COVERAGE */}
      <Section variant="default" id="cobertura">
        <Container>
          <header className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              {t.coverage.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {t.coverage.subtitle}
            </p>
          </header>

          <div className="mt-10 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.coverage.districtsLabel}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {business.districtsCovered.map((d) => (
                <li key={d}>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-brand-800 ring-1 ring-inset ring-slate-200">
                    <MapPin className="h-3.5 w-3.5 text-accent-600" />
                    {d}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-500">{t.coverage.note}</p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="muted" id="faq">
        <Container>
          <header className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              {t.faq.title}
            </h2>
          </header>
          <div className="mt-10">
            <Faq items={t.faq.items} />
          </div>
        </Container>
      </Section>

      {/* FINAL CTA — warm amber tint, light theme */}
      <Section variant="warm" id="contacto-rapido" className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
                {t.finalCta.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
                {t.finalCta.body}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-brand-900 ring-1 ring-accent-200">
                <Clock className="h-4 w-4 text-accent-600" />
                24 h · 7 dias / 24 h · 7 days
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
                {t.finalCta.callUrgent} · {business.phone.urgent.display}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
