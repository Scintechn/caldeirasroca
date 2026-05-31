export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

// hreflang values used in <link rel="alternate" hreflang="...">
export const hreflangMap: Record<Locale, string> = {
  pt: "pt-PT",
  en: "en",
};

export interface Dictionary {
  meta: {
    siteName: string;
    home: { title: string; description: string };
    services: { title: string; description: string };
    contact: { title: string; description: string };
    privacy: { title: string; description: string };
    terms: { title: string; description: string };
  };

  nav: {
    home: string;
    services: string;
    contact: string;
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
  };

  hero: {
    eyebrow: string;
    h1Lead: string;
    h1Highlight: string; // styled accent
    h1Tail: string;
    subline: string;
    primaryCta: string;
    secondaryCta: string;
    badges: { years: string; warranty: string; certified: string; original: string };
  };

  trust: {
    title: string;
    items: Array<{ title: string; body: string }>;
  };

  services: {
    title: string;
    subtitle: string;
    items: Array<{ id: string; name: string; body: string }>;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };

  pricing: {
    title: string;
    subtitle: string;
    callOutLabel: string;
    firstHourLabel: string;
    vatNote: string;
    extrasNote: string;
    ctaButton: string;
  };

  coverage: {
    title: string;
    subtitle: string;
    primaryLocalityLabel: string;
    subLocalitiesLabel: string;
    outsideAreaNote: string;
  };

  faq: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };

  finalCta: {
    title: string;
    body: string;
    whatsapp: string;
    callUrgent: string;
    callScheduling: string;
  };

  contact: {
    intro: string;
    hoursDisclaimer: string;
    form: {
      name: { label: string; placeholder: string; error: string };
      email: { label: string; placeholder: string; error: string };
      phone: { label: string; placeholder: string; hint: string };
      subject: {
        label: string;
        options: Record<"repair" | "maintenance" | "installation" | "quote" | "other", string>;
      };
      message: { label: string; placeholder: string; error: string };
      consent: { label: string; error: string };
      submit: string;
      submitting: string;
      success: string;
      genericError: string;
    };
    altChannels: {
      title: string;
      whatsapp: string;
      callUrgent: string;
      callScheduling: string;
      email: string;
    };
  };

  footer: {
    aboutBlurb: string;
    columns: {
      contact: string;
      hours: string;
      legal: string;
      pages: string;
    };
    legalLinks: {
      privacy: string;
      cookies: string;
      terms: string;
      complaints: string;
    };
    legalEntityLine: string; // includes brand parent + Tecnidom NIF
    copyrightLine: (year: number) => string;
  };

  localeSwitcher: {
    label: string;
    pt: string;
    en: string;
  };
}
