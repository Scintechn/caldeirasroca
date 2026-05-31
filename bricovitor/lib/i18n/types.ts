export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

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
  };

  nav: {
    home: string;
    services: string;
    contact: string;
    skipToContent: string;
  };

  hero: {
    eyebrow: string;
    h1Lead: string;
    h1Highlight: string;
    h1Tail: string;
    subline: string;
    primaryCta: string;
    secondaryCta: string;
    badges: { years: string; warranty: string; coverage: string; multiservice: string };
  };

  trust: {
    title: string;
    subtitle: string;
    items: ReadonlyArray<{ title: string; body: string }>;
  };

  catalog: {
    anchorTitle: string;
    anchorSubtitle: string;
    catalogTitle: string;
    catalogSubtitle: string;
    viewService: string;
    requestService: string;
    explore: string;
  };

  coverage: {
    title: string;
    subtitle: string;
    districtsLabel: string;
    note: string;
  };

  faq: {
    title: string;
    items: ReadonlyArray<{ q: string; a: string }>;
  };

  finalCta: {
    title: string;
    body: string;
    whatsapp: string;
    callUrgent: string;
  };

  contact: {
    intro: string;
    hoursDisclaimer: string;
    form: {
      name: { label: string; placeholder: string; error: string };
      email: { label: string; placeholder: string; error: string };
      phone: { label: string; placeholder: string; hint: string };
      service: { label: string; placeholderOption: string };
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
      regionalLabel: string;
      email: string;
    };
  };

  serviceDetail: {
    backToCatalog: string;
    problemsTitle: string;
    brandsTitle: string;
    subServicesTitle: string;
    relatedTitle: string;
  };

  footer: {
    aboutBlurb: string;
    columns: {
      contact: string;
      hours: string;
      legal: string;
      services: string;
      coverage: string;
    };
    legalLinks: {
      privacy: string;
      cookies: string;
      terms: string;
      complaints: string;
    };
    legalEntityLine: string;
    copyrightLine: (year: number) => string;
  };

  localeSwitcher: { label: string; pt: string; en: string };
}
