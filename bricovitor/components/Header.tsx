import Link from "next/link";
import { Phone, WhatsAppIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { Container } from "@/components/ui/Container";
import { business, whatsappLink } from "@/lib/business";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 text-brand-900 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-18">
        <Link
          href={`/${locale}`}
          aria-label={dict.meta.siteName}
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <Logo />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 text-sm font-medium text-brand-700 md:flex"
        >
          <Link href={`/${locale}#servicos`} className="hover:text-brand-900">
            {dict.nav.services}
          </Link>
          <Link href={`/${locale}#cobertura`} className="hover:text-brand-900">
            {dict.coverage.title}
          </Link>
          <Link href={`/${locale}#faq`} className="hover:text-brand-900">
            FAQ
          </Link>
          <Link href={`/${locale}/contact`} className="hover:text-brand-900">
            {dict.nav.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher
            current={locale}
            labels={{ pt: dict.localeSwitcher.pt, en: dict.localeSwitcher.en }}
            srLabel={dict.localeSwitcher.label}
          />
          <a
            href={business.phone.urgent.href}
            className="hidden items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-brand-900 ring-1 ring-slate-200 transition hover:bg-slate-200 sm:inline-flex"
            aria-label={`${business.phone.urgent.label}: ${business.phone.urgent.display}`}
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {business.phone.urgent.display}
          </a>
          <WhatsAppLink
            href={whatsappLink()}
            location="header"
            className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-whatsapp-600 sm:px-4"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            WhatsApp
          </WhatsAppLink>
        </div>
      </Container>
    </header>
  );
}
