/**
 * Single source of truth for business facts. Every page imports from here.
 *
 * Source brand: "Assistência Caldeiras Roca" — service brand operated by
 * Tecnidom Lda (the legal entity), under the BricoVitor parent brand.
 *
 * Service area for THIS page: Viana do Castelo district. On-site / mobile
 * call-out service; no public showroom is claimed because none was verified
 * during §4a intake. See docs/landing-spec-direction.md §4a.
 */

export const business = {
  brandName: "Assistência Caldeiras Roca",
  parentBrand: "BricoVitor",
  legalName: "Tecnidom Lda",
  taxId: "514303417",
  foundedYear: 2005,

  // Locality this landing page targets. Sub-localities are the towns of the
  // Viana do Castelo district served from the same call-out radius.
  locality: "Viana do Castelo",
  district: "Viana do Castelo",
  region: "Minho",
  country: "PT",
  countryName: "Portugal",
  subLocalities: [
    "Arcos de Valdevez",
    "Caminha",
    "Paredes de Coura",
    "Ponte da Barca",
    "Ponte de Lima",
  ] as const,

  // Registered office — Tecnidom Lda, near Sintra. Disclosed in footer
  // for legal compliance, NOT presented as a Viana storefront.
  registeredOffice: {
    street: "Praceta Serra de Baixo nº1B",
    postalCode: "2725-142",
    locality: "Algueirão-Mem Martins",
    country: "PT",
  },

  // Phones from the source page, all public.
  phone: {
    urgent: {
      display: "936 408 200",
      href: "tel:+351936408200",
      label: "Linha urgente",
    },
    schedulingLisbon: {
      display: "210 006 109",
      href: "tel:+351210006109",
      label: "Agendamento",
    },
    schedulingPorto: {
      display: "220 035 909",
      href: "tel:+351220035909",
      label: "Agendamento (alternativo)",
    },
  },

  whatsapp: {
    number: "351936408200", // digits-only for wa.me
    display: "+351 936 408 200",
    // Pre-filled triage message provided by the business. Keep verbatim.
    defaultMessage:
      "Bem-vindo à BricoVitor. De forma a realizar uma melhor triagem do seu serviço, indique por favor: Nome, Tipo de Serviço e Localidade. Somos o seu parceiro de confiança, onde e quando mais precisa.",
  },

  email: {
    display: "geral@bricovitor.pt",
    href: "mailto:geral@bricovitor.pt",
  },

  // Hours per current site disclaimer: 24h subject to technician availability.
  // We model it as 24/7 with a disclaimer surfaced in the UI, not as fixed
  // weekday hours. See dict.contact.hoursDisclaimer.
  hours: {
    is24x7: true,
  },

  pricing: {
    callOutFee: { amount: 43, currency: "EUR" },
    firstHourFee: { amount: 35, currency: "EUR" },
    note: "Valores acrescidos de IVA à taxa legal em vigor. Variam conforme a complexidade da intervenção e o eventual fornecimento de peças.",
  },

  warranty: {
    months: 1,
  },

  // External legal links (the operator's existing policies on tecnidom.pt).
  // We surface these in the footer rather than re-hosting copies.
  legal: {
    privacyUrl: "https://tecnidom.pt/politica-de-privacidade/",
    cookiesUrl: "https://tecnidom.pt/politica-de-cookies/",
    termsUrl: "https://tecnidom.pt/condicoes-contratuais-de-prestacao-de-servicos/",
    complaintsBookUrl: "https://www.livroreclamacoes.pt/Inicio/",
  },

  // The canonical production URL of the rebuilt page. Update once a real
  // domain is wired up in Vercel.
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://assistencia-caldeira-roca.pt",
} as const;

export type Business = typeof business;

/** Build a wa.me link with an optional override of the pre-filled message. */
export function whatsappLink(message?: string): string {
  const text = message ?? business.whatsapp.defaultMessage;
  return `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(text)}`;
}

/** One-line address string for legal footers and structured data. */
export function registeredOfficeOneLine(): string {
  const o = business.registeredOffice;
  return `${o.street}, ${o.postalCode} ${o.locality}, ${o.country}`;
}

/** Every phone number as a flat array — for structured data + footer. */
export function allPhones() {
  return [
    business.phone.urgent,
    business.phone.schedulingLisbon,
    business.phone.schedulingPorto,
  ];
}
