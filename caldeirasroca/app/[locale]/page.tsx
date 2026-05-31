import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Flame,
  MapPin,
  PackageCheck,
  Phone,
  Settings2,
  ShieldCheck,
  Sparkles,
  Wrench,
  WhatsAppIcon,
} from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/Faq";
import { ServiceCard } from "@/components/ServiceCard";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { business, whatsappLink } from "@/lib/business";
import {
  defaultLocale,
  getDictionary,
  hreflangMap,
  isLocale,
  locales,
} from "@/lib/i18n";

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

const SERVICE_ICONS = {
  repair: Wrench,
  maintenance: Settings2,
  installation: Flame,
  inspection: ShieldCheck,
  parts: PackageCheck,
  "central-heating": Sparkles,
} as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const t = getDictionary(locale);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_10%,rgba(249,115,22,0.18),transparent_70%),radial-gradient(50%_60%_at_0%_100%,rgba(59,130,246,0.18),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:42px_42px]"
        />
        <Container className="py-16 sm:py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/20">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-400" />
                {t.hero.eyebrow}
              </span>

              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {t.hero.h1Lead}{" "}
                <span className="relative whitespace-nowrap text-accent-400">
                  {t.hero.h1Highlight}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 200 12"
                    className="absolute -bottom-2 left-0 right-0 mx-auto h-2 w-full text-accent-500/70"
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

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                {t.hero.subline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <WhatsAppLink
                  href={whatsappLink()}
                  location="hero"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent-900/30 transition hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 sm:text-lg"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.hero.primaryCta}
                </WhatsAppLink>
                <a
                  href={business.phone.urgent.href}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-base font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 sm:text-lg"
                >
                  <Phone className="h-5 w-5" />
                  {t.hero.secondaryCta} · {business.phone.urgent.display}
                </a>
              </div>

              <ul className="mt-8 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                {[
                  t.hero.badges.years,
                  t.hero.badges.warranty,
                  t.hero.badges.certified,
                  t.hero.badges.original,
                ].map((label) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-white/90 ring-1 ring-white/10"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-none text-accent-400" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hero visual: stacked “fact cards” */}
            <div className="relative">
              <div className="absolute -inset-x-6 -top-6 h-72 -z-10 rounded-3xl bg-gradient-to-br from-accent-500/20 to-brand-700/40 blur-2xl" />

              <div className="grid gap-4 sm:gap-5">
                <FactCard
                  icon={Clock}
                  eyebrow={t.hero.eyebrow}
                  title="24 h · Resposta no próprio dia"
                  body="Linha urgente para Viana do Castelo e concelhos vizinhos, sujeita a disponibilidade técnica efetiva."
                />
                <FactCard
                  icon={ShieldCheck}
                  eyebrow="Garantia"
                  title={`${business.warranty.months} mês de garantia em cada reparação`}
                  body="Se o mesmo problema voltar, voltamos sem custos adicionais."
                  tint="accent"
                />
                <FactCard
                  icon={MapPin}
                  eyebrow="Cobertura"
                  title="Viana do Castelo e arredores"
                  body="Arcos de Valdevez · Caminha · Paredes de Coura · Ponte da Barca · Ponte de Lima"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TRUST */}
      <Section variant="default" id="confianca">
        <Container>
          <header className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              {t.trust.title}
            </h2>
          </header>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.trust.items.map((item) => (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-100"
                >
                  <CheckCircle2 className="h-5 w-5" />
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

      {/* SERVICES */}
      <Section variant="muted" id="servicos">
        <Container>
          <header className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              {t.services.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {t.services.subtitle}
            </p>
          </header>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.items.map((s) => (
              <ServiceCard
                key={s.id}
                Icon={SERVICE_ICONS[s.id as keyof typeof SERVICE_ICONS] ?? Wrench}
                name={s.name}
                body={s.body}
              />
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h3 className="font-display text-xl font-bold text-brand-900">
                {t.services.ctaTitle}
              </h3>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">
                {t.services.ctaBody}
              </p>
            </div>
            <WhatsAppLink
              href={whatsappLink()}
              location="services_cta"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-whatsapp-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-whatsapp-600 sm:text-base"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t.services.ctaButton}
            </WhatsAppLink>
          </div>
        </Container>
      </Section>

      {/* PRICING */}
      <Section variant="default" id="precos">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <header>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              {t.pricing.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {t.pricing.subtitle}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-slate-500">
              {t.pricing.extrasNote}
            </p>
            <div className="mt-6">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
              >
                {t.pricing.ctaButton}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </header>

          <div className="overflow-hidden rounded-3xl bg-brand-900 p-8 text-white shadow-xl sm:p-10">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  {t.pricing.callOutLabel}
                </p>
                <p className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
                  €{business.pricing.callOutFee.amount}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  {t.pricing.firstHourLabel}
                </p>
                <p className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
                  €{business.pricing.firstHourFee.amount}
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-white/70">{t.pricing.vatNote}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppLink
                href={whatsappLink()}
                location="pricing_cta"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-600 sm:text-base"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t.hero.primaryCta}
              </WhatsAppLink>
              <a
                href={business.phone.urgent.href}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15 sm:text-base"
              >
                <Phone className="h-4 w-4" />
                {business.phone.urgent.display}
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* COVERAGE */}
      <Section variant="muted" id="cobertura">
        <Container>
          <header className="max-w-3xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              {t.coverage.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {t.coverage.subtitle}
            </p>
          </header>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_2fr]">
            <article className="rounded-2xl bg-brand-900 p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                {t.coverage.primaryLocalityLabel}
              </p>
              <p className="mt-2 font-display text-3xl font-extrabold">
                {business.locality}
              </p>
              <p className="mt-3 text-sm text-white/80">{business.region} · {business.countryName}</p>
            </article>

            <article className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {t.coverage.subLocalitiesLabel}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {business.subLocalities.map((s) => (
                  <li key={s}>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-800 ring-1 ring-inset ring-brand-100">
                      <MapPin className="h-3.5 w-3.5" />
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-slate-500">{t.coverage.outsideAreaNote}</p>
            </article>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="default" id="faq">
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

      {/* FINAL CTA */}
      <Section variant="dark" id="contacto-rapido" className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t.finalCta.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                {t.finalCta.body}
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-accent-600 sm:text-lg"
              >
                <Phone className="h-5 w-5" />
                {t.finalCta.callUrgent} · {business.phone.urgent.display}
              </a>
              <a
                href={business.phone.schedulingLisbon.href}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-4 text-base font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15 sm:text-lg"
              >
                <Phone className="h-5 w-5" />
                {t.finalCta.callScheduling} · {business.phone.schedulingLisbon.display}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function FactCard({
  icon: Icon,
  eyebrow,
  title,
  body,
  tint = "default",
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  eyebrow: string;
  title: string;
  body: string;
  tint?: "default" | "accent";
}) {
  const bg =
    tint === "accent"
      ? "bg-accent-500 ring-accent-300/30"
      : "bg-white/[0.06] ring-white/10";
  const iconBg =
    tint === "accent" ? "bg-white/15 text-white" : "bg-accent-500/20 text-accent-300";
  return (
    <div className={`rounded-2xl ${bg} p-5 ring-1 backdrop-blur sm:p-6`}>
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className={`inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
            {eyebrow}
          </p>
          <h3 className="mt-1 font-display text-base font-bold leading-snug text-white sm:text-lg">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-white/80">{body}</p>
        </div>
      </div>
    </div>
  );
}
