import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { business, registeredOfficeOneLine } from "@/lib/business";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-slate-300">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-300/90">
              {dict.footer.aboutBlurb}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {dict.footer.columns.contact}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={business.phone.urgent.href}
                  className="inline-flex items-start gap-2 hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 flex-none text-accent-400" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-slate-400">
                      {business.phone.urgent.label}
                    </span>
                    {business.phone.urgent.display}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={business.phone.schedulingLisbon.href}
                  className="inline-flex items-start gap-2 hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 flex-none text-accent-400" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-slate-400">
                      {business.phone.schedulingLisbon.label}
                    </span>
                    {business.phone.schedulingLisbon.display}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={business.phone.schedulingPorto.href}
                  className="inline-flex items-start gap-2 hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 flex-none text-accent-400" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-slate-400">
                      {business.phone.schedulingPorto.label}
                    </span>
                    {business.phone.schedulingPorto.display}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={business.email.href}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Mail className="h-4 w-4 flex-none text-accent-400" />
                  {business.email.display}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {dict.footer.columns.hours}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300/90">
              <li className="inline-flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 flex-none text-accent-400" />
                <span>24 h · 7 dias / 24 h · 7 days</span>
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent-400" />
                <span>
                  Viana do Castelo · Arcos de Valdevez · Caminha · Paredes de Coura · Ponte da Barca · Ponte de Lima
                </span>
              </li>
            </ul>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-white/90">
              {dict.footer.columns.pages}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href={`/${locale}#servicos`} className="hover:text-white">
                  {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#cobertura`} className="hover:text-white">
                  {dict.coverage.title}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#faq`} className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-white">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {dict.footer.columns.legal}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={business.legal.privacyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {dict.footer.legalLinks.privacy}
                </a>
              </li>
              <li>
                <a
                  href={business.legal.cookiesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {dict.footer.legalLinks.cookies}
                </a>
              </li>
              <li>
                <a
                  href={business.legal.termsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {dict.footer.legalLinks.terms}
                </a>
              </li>
              <li>
                <a
                  href={business.legal.complaintsBookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {dict.footer.legalLinks.complaints}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-400">
          <p className="mb-1">{dict.footer.legalEntityLine}</p>
          <p className="mb-1">
            <span className="sr-only">Sede / Registered office: </span>
            {registeredOfficeOneLine()}
          </p>
          <p>{dict.footer.copyrightLine(year)}</p>
        </div>
      </Container>
    </footer>
  );
}
