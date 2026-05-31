import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    siteName: "BricoVitor · Home repairs · 24 h",
    home: {
      title: "BricoVitor — Home repairs & 24-hour technical assistance",
      description:
        "Since 2005, certified technicians across mainland Portugal: boilers, water heaters, AC, plumbing, electrical, solar, locksmith and more. 24-hour urgent line.",
    },
    services: {
      title: "Home-repair services · BricoVitor",
      description:
        "Complete catalogue of home-repair assistance across mainland Portugal — boilers, water heaters, AC, plumbing, electrical, solar, locksmith, drain unclogging and more.",
    },
    contact: {
      title: "Contact BricoVitor — Request home assistance",
      description:
        "Reach us by WhatsApp, urgent phone line or form. 10-district coverage across mainland Portugal. Same-day response.",
    },
  },

  nav: {
    home: "Home",
    services: "Services",
    contact: "Contact",
    skipToContent: "Skip to content",
  },

  hero: {
    eyebrow: "Since 2005 · Same-day response",
    h1Lead: "One number.",
    h1Highlight: "Any breakdown",
    h1Tail: ". At your door, today.",
    subline:
      "Team of certified technicians across boilers, water heaters, air conditioning, plumbing, electrical, solar, locksmith, drain unclogging and more. We cover 10 districts of mainland Portugal, 24 hours a day.",
    primaryCta: "Request help on WhatsApp",
    secondaryCta: "Call the urgent line",
    badges: {
      years: "20+ years on the ground",
      warranty: "Written warranty",
      coverage: "10 districts",
      multiservice: "Multi-service",
    },
  },

  trust: {
    title: "Why we're who you call when something stops working",
    subtitle:
      "We don't improvise. Every technician is trained on what they do, with original parts and back-office support.",
    items: [
      {
        title: "Multi-disciplinary, certified team",
        body: "Technicians trained per discipline: boilers, AC, electrical, plumbing. Insurance and professional certifications up to date.",
      },
      {
        title: "Original parts and approved materials",
        body: "We work only with original parts and approved materials. Longer life, fewer return visits.",
      },
      {
        title: "Written warranty on every intervention",
        body: "1 month on repairs, 6 months on installations, 2 to 5 years' manufacturer warranty on new equipment.",
      },
      {
        title: "Same-day response across 10 districts",
        body: "Lisbon, Porto, Braga, Setúbal, Aveiro, Coimbra, Viana do Castelo, Vila Real, Viseu and Guarda. 24-h urgent line.",
      },
    ],
  },

  catalog: {
    anchorTitle: "Our most requested services",
    anchorSubtitle:
      "These are the calls we get most often — dedicated teams, parts in stock and a clear procedure from diagnosis to completion.",
    catalogTitle: "Full catalogue of home assistance",
    catalogSubtitle:
      "Don't see what you need? Talk to us — we probably do it. Our team covers the main domestic and commercial breakdowns.",
    viewService: "View details",
    requestService: "Request this service",
    explore: "View full catalogue",
  },

  coverage: {
    title: "Where we operate",
    subtitle: "10 districts of mainland Portugal, with local teams and central back-office.",
    districtsLabel: "Districts with active coverage",
    note: "Same-day availability depends on the type of fault, time of the request and team in the area — we always confirm before dispatch.",
  },

  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "Are you available at weekends and on public holidays?",
        a: "The urgent line 936 408 200 runs 24 h a day, every day including public holidays, subject to technician availability. For non-urgent work, we recommend scheduling during the week.",
      },
      {
        q: "In how many districts do you operate?",
        a: "We cover 10 districts: Aveiro, Braga, Coimbra, Guarda, Lisbon, Porto, Setúbal, Viana do Castelo, Vila Real and Viseu. For other areas, get in touch first — we can sometimes cover them.",
      },
      {
        q: "Do you quote before starting work?",
        a: "Yes, always. The technician arrives, diagnoses on site and presents a quote for your approval before going ahead. No approval, no work.",
      },
      {
        q: "What warranty do you offer?",
        a: "Repairs: 1 month written. Installations: 6 months. New equipment: 2 to 5 years' manufacturer warranty. If the same problem recurs within the warranty window, we come back at no extra cost.",
      },
      {
        q: "How long until you arrive?",
        a: "For urgent calls we aim for the same day, often within hours. The exact time depends on the location, time of request and team in the area — we always confirm a window before dispatch.",
      },
      {
        q: "Do you only work for private customers?",
        a: "No. We serve private customers, condominiums, shops and businesses. For annual contracts (e.g. AC maintenance for offices and condominiums) we offer specific terms — get in touch.",
      },
    ],
  },

  finalCta: {
    title: "Got a breakdown? We're one tap away.",
    body: "WhatsApp for quick triage, phone if you'd rather talk now. Same-day response across 10 districts of mainland Portugal.",
    whatsapp: "Request help on WhatsApp",
    callUrgent: "Call the urgent line",
  },

  contact: {
    intro:
      "Tell us what's going on: type of fault, equipment (brand/model if you know it), call-out address. Same business-day response.",
    hoursDisclaimer:
      "24-h cover is subject to actual technician availability for dispatch. For emergencies, WhatsApp and the urgent line are the fastest channels.",
    form: {
      name: {
        label: "Name",
        placeholder: "How should we address you?",
        error: "Please tell us your name.",
      },
      email: {
        label: "Email",
        placeholder: "name@example.com",
        error: "Please give us a valid email so we can reply.",
      },
      phone: {
        label: "Phone",
        placeholder: "+351 …",
        hint: "Optional — speeds up contact.",
      },
      service: {
        label: "Which service do you need?",
        placeholderOption: "Select the type of service…",
      },
      message: {
        label: "Description",
        placeholder:
          "What's happening, on what equipment, for how long, and the call-out address…",
        error: "Please describe the issue briefly (at least 10 characters).",
      },
      consent: {
        label:
          "I accept the privacy policy and the processing of my data to respond to this request.",
        error: "You must accept the privacy policy.",
      },
      submit: "Send request",
      submitting: "Sending…",
      success:
        "We've received your request. We'll be in touch as soon as possible. For emergencies, please reach us via WhatsApp or phone right away.",
      genericError:
        "We couldn't send your request. Please try again shortly or reach us by WhatsApp or phone.",
    },
    altChannels: {
      title: "Prefer another channel?",
      whatsapp: "Chat on WhatsApp",
      callUrgent: "Urgent line · 24 h",
      regionalLabel: "Regional lines",
      email: "Email us",
    },
  },

  serviceDetail: {
    backToCatalog: "Back to catalogue",
    problemsTitle: "Symptoms we treat most often",
    brandsTitle: "Brands we service",
    subServicesTitle: "What we do exactly",
    relatedTitle: "Related services",
  },

  footer: {
    aboutBlurb:
      "Home-repair company since 2005. Technical teams across 10 districts of mainland Portugal, original parts and written warranty on every intervention.",
    columns: {
      contact: "Contact",
      hours: "Availability",
      legal: "Legal",
      services: "Services",
      coverage: "Coverage",
    },
    legalLinks: {
      privacy: "Privacy policy",
      cookies: "Cookie policy",
      terms: "Terms of service",
      complaints: "Complaints book",
    },
    legalEntityLine:
      "BricoVitor is a brand operated by Tecnidom Lda · Tax ID 514303417 · Praceta Serra de Baixo nº1B, 2725-142 Algueirão-Mem Martins, Portugal",
    copyrightLine: (year) =>
      `© ${year} BricoVitor · Tecnidom Lda. All rights reserved.`,
  },

  localeSwitcher: { label: "Language", pt: "Português", en: "English" },
};
