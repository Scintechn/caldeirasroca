import Link from "next/link";
import { Phone } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WhatsAppIcon } from "@/components/icons";
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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-900/95 text-white backdrop-blur supports-[backdrop-filter]:bg-brand-900/80">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-18">
        <Link
          href={`/${locale}`}
          aria-label={dict.meta.siteName}
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
        >
          <Logo variant="light" />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 text-sm font-medium text-white/90 md:flex"
        >
          <Link href={`/${locale}#servicos`} className="hover:text-white">
            {dict.nav.services}
          </Link>
          <Link href={`/${locale}#cobertura`} className="hover:text-white">
            {dict.coverage.title}
          </Link>
          <Link href={`/${locale}#faq`} className="hover:text-white">
            FAQ
          </Link>
          <Link href={`/${locale}/contact`} className="hover:text-white">
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
            className="hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20 sm:inline-flex"
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
