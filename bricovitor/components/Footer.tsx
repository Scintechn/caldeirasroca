import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { business, registeredOfficeOneLine } from "@/lib/business";
import { anchorServices } from "@/lib/services";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();
  const anchors = anchorServices();

  return (
    <footer className="border-t border-slate-200 bg-slate-100 text-slate-700">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              {dict.footer.aboutBlurb}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-900">
              {dict.footer.columns.contact}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={business.phone.urgent.href}
                  className="inline-flex items-start gap-2 text-slate-700 hover:text-brand-900"
                >
                  <Phone className="mt-0.5 h-4 w-4 flex-none text-accent-600" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-slate-500">
                      {business.phone.urgent.label}
                    </span>
                    {business.phone.urgent.display}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={business.email.href}
                  className="inline-flex items-center gap-2 text-slate-700 hover:text-brand-900"
                >
                  <Mail className="h-4 w-4 flex-none text-accent-600" />
                  {business.email.display}
                </a>
              </li>
              <li className="pt-2 text-xs uppercase tracking-wider text-slate-500">
                {dict.contact.altChannels.regionalLabel}
              </li>
              {business.phone.regional.slice(0, 4).map((p) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    className="inline-flex items-start gap-2 text-xs text-slate-700 hover:text-brand-900"
                  >
                    <Phone className="mt-0.5 h-3.5 w-3.5 flex-none text-accent-500" />
                    <span>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-500">
                        {p.region}
                      </span>
                      {p.display}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-900">
              {dict.footer.columns.hours}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
              <li className="inline-flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 flex-none text-accent-600" />
                <span>24 h · 7 dias / 24 h · 7 days</span>
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent-600" />
                <span>{business.districtsCovered.join(" · ")}</span>
              </li>
            </ul>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-brand-900">
              {dict.footer.columns.services}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {anchors.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${locale}/servicos/${s.slug}`}
                    className="text-slate-700 hover:text-brand-900"
                  >
                    {s.copy[locale].name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}#catalogo`}
                  className="text-slate-700 hover:text-brand-900"
                >
                  {dict.catalog.explore}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-900">
              {dict.footer.columns.legal}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={business.legal.privacyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 hover:text-brand-900"
                >
                  {dict.footer.legalLinks.privacy}
                </a>
              </li>
              <li>
                <a
                  href={business.legal.cookiesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 hover:text-brand-900"
                >
                  {dict.footer.legalLinks.cookies}
                </a>
              </li>
              <li>
                <a
                  href={business.legal.termsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 hover:text-brand-900"
                >
                  {dict.footer.legalLinks.terms}
                </a>
              </li>
              <li>
                <a
                  href={business.legal.complaintsBookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 hover:text-brand-900"
                >
                  {dict.footer.legalLinks.complaints}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-300 pt-6 text-xs text-slate-500">
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
