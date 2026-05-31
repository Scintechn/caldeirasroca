/**
 * Single source of truth for BricoVitor business facts.
 *
 * BricoVitor is the parent multi-service repair brand operated by
 * Tecnidom Lda — covers boilers, water heaters, AC, plumbing, electrical,
 * locksmith, solar, blinds, drains and more across mainland Portugal.
 *
 * See docs/landing-spec-direction.md §4a for the intake methodology.
 */

export const business = {
  brandName: "BricoVitor",
  tagline: "Reparações ao domicílio · 24 horas",
  legalName: "Tecnidom Lda",
  taxId: "514303417",
  foundedYear: 2005,

  region: "Portugal Continental",
  country: "PT",
  countryName: "Portugal",
  districtsCovered: [
    "Aveiro",
    "Braga",
    "Coimbra",
    "Guarda",
    "Lisboa",
    "Porto",
    "Setúbal",
    "Viana do Castelo",
    "Vila Real",
    "Viseu",
  ] as const,

  registeredOffice: {
    street: "Praceta Serra de Baixo nº1B",
    postalCode: "2725-142",
    locality: "Algueirão-Mem Martins",
    country: "PT",
  },

  phone: {
    urgent: {
      display: "936 408 200",
      href: "tel:+351936408200",
      label: "Linha urgente · 24 h",
    },
    regional: [
      { region: "Lisboa centro", display: "210 006 109", href: "tel:+351210006109" },
      { region: "Lisboa", display: "211 450 255", href: "tel:+351211450255" },
      { region: "Porto centro", display: "220 035 909", href: "tel:+351220035909" },
      { region: "Porto", display: "221 450 015", href: "tel:+351221450015" },
      { region: "Braga", display: "253 775 023", href: "tel:+351253775023" },
      { region: "Vila Nova de Famalicão", display: "252 091 775", href: "tel:+351252091775" },
      { region: "Aveiro", display: "234 314 884", href: "tel:+351234314884" },
      { region: "São João da Madeira", display: "256 026 025", href: "tel:+351256026025" },
      { region: "Vila Nova de Cerveira", display: "258 322 066", href: "tel:+351258322066" },
      { region: "Valença", display: "251 948 051", href: "tel:+351251948051" },
    ],
  },

  whatsapp: {
    number: "351936408200",
    display: "+351 936 408 200",
    defaultMessage:
      "Bem-vindo à BricoVitor. De forma a realizar uma melhor triagem do seu serviço, indique por favor: Nome, Tipo de Serviço e Localidade. Somos o seu parceiro de confiança, onde e quando mais precisa.",
  },

  email: {
    display: "geral@bricovitor.pt",
    href: "mailto:geral@bricovitor.pt",
  },

  hours: {
    is24x7: true,
  },

  warranty: {
    repairMonths: 1,
    installationMonths: 6,
    equipmentYearsMin: 2,
    equipmentYearsMax: 5,
  },

  legal: {
    privacyUrl: "https://tecnidom.pt/politica-de-privacidade/",
    cookiesUrl: "https://tecnidom.pt/politica-de-cookies/",
    termsUrl: "https://tecnidom.pt/condicoes-contratuais-de-prestacao-de-servicos/",
    complaintsBookUrl: "https://www.livroreclamacoes.pt/Inicio/",
  },

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bricovitor.pt",
} as const;

export type Business = typeof business;

export function whatsappLink(message?: string): string {
  const text = message ?? business.whatsapp.defaultMessage;
  return `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(text)}`;
}

export function registeredOfficeOneLine(): string {
  const o = business.registeredOffice;
  return `${o.street}, ${o.postalCode} ${o.locality}, ${o.country}`;
}

export function allPhones() {
  return [
    business.phone.urgent,
    ...business.phone.regional.map((r) => ({
      display: r.display,
      href: r.href,
      label: r.region,
    })),
  ];
}
