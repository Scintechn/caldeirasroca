import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import {
  defaultLocale,
  getDictionary,
  hreflangMap,
  isLocale,
  locales,
} from "@/lib/i18n";
import { allPhones, business, registeredOfficeOneLine } from "@/lib/business";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

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
  const url = `${business.siteUrl}/${locale}`;
  return {
    metadataBase: new URL(business.siteUrl),
    title: {
      default: dict.meta.home.title,
      template: `%s · ${dict.meta.siteName}`,
    },
    description: dict.meta.home.description,
    applicationName: dict.meta.siteName,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflangMap[l], `/${l}`]),
      ),
    },
    openGraph: {
      type: "website",
      url,
      siteName: dict.meta.siteName,
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      locale: locale === "pt" ? "pt_PT" : "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: dict.meta.siteName,
    alternateName: business.parentBrand,
    description: dict.meta.home.description,
    url: `${business.siteUrl}/${locale}`,
    telephone: allPhones().map((p) => p.href.replace("tel:", "")),
    email: business.email.display,
    image: `${business.siteUrl}/${locale}/opengraph-image`,
    priceRange: "€€",
    foundingDate: String(business.foundedYear),
    legalName: business.legalName,
    taxID: business.taxId,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.registeredOffice.street,
      postalCode: business.registeredOffice.postalCode,
      addressLocality: business.registeredOffice.locality,
      addressCountry: business.registeredOffice.country,
    },
    areaServed: [
      business.locality,
      ...business.subLocalities,
    ].map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    makesOffer: dict.services.items.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.body,
      },
    })),
  };

  return (
    <html lang={locale} className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-white antialiased">
        <a href="#main" className="skip-link">
          {dict.nav.skipToContent}
        </a>
        <Header locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
        <WhatsAppFab srLabel={dict.finalCta.whatsapp} />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Registered office is also surfaced for crawlers in footer text: {registeredOfficeOneLine()} */}
        <span className="sr-only">{registeredOfficeOneLine()}</span>
      </body>
    </html>
  );
}
