import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Mail, Phone, WhatsAppIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/ContactForm";
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
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflangMap[l], `/${l}/contact`]),
      ),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const t = getDictionary(locale);

  return (
    <Section variant="muted">
      <Container>
        <header className="max-w-3xl">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-brand-900 sm:text-5xl">
            {t.nav.contact}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {t.contact.intro}
          </p>
          <p className="mt-3 inline-flex items-start gap-2 rounded-lg bg-accent-50 px-3 py-2 text-sm text-accent-900 ring-1 ring-inset ring-accent-100">
            <Clock className="mt-0.5 h-4 w-4 flex-none text-accent-700" />
            <span>{t.contact.hoursDisclaimer}</span>
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <ContactForm t={t.contact.form} locale={locale} />
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-brand-900 p-6 text-white sm:p-7">
              <h2 className="font-display text-lg font-bold">
                {t.contact.altChannels.title}
              </h2>
              <ul className="mt-5 space-y-3">
                <li>
                  <WhatsAppLink
                    href={whatsappLink()}
                    location="contact_alt"
                    className="flex w-full items-center gap-3 rounded-xl bg-whatsapp-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-whatsapp-600 sm:text-base"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {t.contact.altChannels.whatsapp}
                    <span className="ml-auto opacity-80">
                      {business.whatsapp.display}
                    </span>
                  </WhatsAppLink>
                </li>
                <li>
                  <a
                    href={business.phone.urgent.href}
                    className="flex w-full items-center gap-3 rounded-xl bg-accent-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-600 sm:text-base"
                  >
                    <Phone className="h-4 w-4" />
                    {t.contact.altChannels.callUrgent}
                    <span className="ml-auto opacity-80">
                      {business.phone.urgent.display}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={business.phone.schedulingLisbon.href}
                    className="flex w-full items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15 sm:text-base"
                  >
                    <Phone className="h-4 w-4" />
                    {t.contact.altChannels.callScheduling}
                    <span className="ml-auto opacity-80">
                      {business.phone.schedulingLisbon.display}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={business.phone.schedulingPorto.href}
                    className="flex w-full items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15 sm:text-base"
                  >
                    <Phone className="h-4 w-4" />
                    {t.contact.altChannels.callScheduling}
                    <span className="ml-auto opacity-80">
                      {business.phone.schedulingPorto.display}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={business.email.href}
                    className="flex w-full items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15 sm:text-base"
                  >
                    <Mail className="h-4 w-4" />
                    {t.contact.altChannels.email}
                    <span className="ml-auto truncate opacity-80">
                      {business.email.display}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
