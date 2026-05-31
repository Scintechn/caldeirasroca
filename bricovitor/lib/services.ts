/**
 * Service catalog data — drives both the home grid and the per-service detail pages.
 *
 * "anchor" services have a dedicated detail page (/servicos/[slug]).
 * "catalog" services appear on the home grid and the /servicos overview, but
 * point at the contact form rather than a deep page.
 */

import type { Locale } from "./i18n";

export type ServiceTier = "anchor" | "catalog";

export interface ServiceCopy {
  name: string;
  short: string; // 1-sentence card description
  detail?: {
    heroLead: string;
    heroHighlight: string;
    heroTail: string;
    intro: string;
    subServices: ReadonlyArray<{ title: string; body: string }>;
    problemsTitle: string;
    problems: ReadonlyArray<string>;
    brandsTitle?: string;
    brands?: ReadonlyArray<string>;
    ctaTitle: string;
    ctaBody: string;
  };
}

export interface Service {
  slug: string;
  tier: ServiceTier;
  iconKey:
    | "flame"
    | "droplet"
    | "snowflake"
    | "wrench"
    | "zap"
    | "lock"
    | "sun"
    | "key"
    | "fan"
    | "drain"
    | "doorOpen"
    | "shutter"
    | "video"
    | "chimney"
    | "tool"
    | "truck";
  copy: Record<Locale, ServiceCopy>;
}

export const services: ReadonlyArray<Service> = [
  {
    slug: "caldeiras",
    tier: "anchor",
    iconKey: "flame",
    copy: {
      pt: {
        name: "Caldeiras",
        short: "Reparação, manutenção e instalação de caldeiras a gás e a gasóleo. Multimarca.",
        detail: {
          heroLead: "Sem caldeira?",
          heroHighlight: "Vamos hoje",
          heroTail: ", multimarca, com peças certificadas.",
          intro:
            "Reparamos, mantemos e instalamos caldeiras a gás e a gasóleo de praticamente qualquer marca europeia. Diagnóstico ao domicílio, peças originais e garantia escrita em todas as intervenções.",
          subServices: [
            { title: "Reparação ao domicílio", body: "Diagnóstico, substituição de peças e resolução de avarias em caldeiras murais e de chão." },
            { title: "Manutenção anual", body: "Revisão, limpeza e afinação para reduzir consumos e prevenir falhas críticas." },
            { title: "Instalação e arranque", body: "Substituição, instalação e arranque de caldeiras novas em uso doméstico ou industrial." },
            { title: "Caldeiras de condensação e ventiladas", body: "Especialistas em equipamentos modernos de alta eficiência, com formação dedicada." },
          ],
          problemsTitle: "Sintomas mais frequentes que tratamos",
          problems: [
            "Caldeira não acende ou apaga sozinha",
            "Pressão baixa ou perda de água",
            "Água quente intermitente ou fria",
            "Barulhos anormais no aquecimento",
            "Códigos de erro no display",
          ],
          brandsTitle: "Marcas que reparamos",
          brands: [
            "Roca", "BaxiRoca", "Vulcano", "Junkers", "Vaillant", "Ferroli",
            "Ariston", "Sime", "Chaffoteaux et Maury", "Saunier Duval",
            "Beretta", "Riello", "Viessmann", "Buderus", "De Dietrich",
            "Immergás", "Domusa", "Biasi",
          ],
          ctaTitle: "Caldeira parada? Fale connosco agora.",
          ctaBody: "Resposta no próprio dia em todo o continente. Garantia de 1 mês nas reparações e 6 meses nas instalações.",
        },
      },
      en: {
        name: "Boilers",
        short: "Multi-brand repair, maintenance and installation of gas and oil boilers.",
        detail: {
          heroLead: "Boiler down?",
          heroHighlight: "We come today",
          heroTail: ", any brand, certified parts.",
          intro:
            "We repair, maintain and install gas and oil boilers across virtually every European brand. On-site diagnosis, original parts, written warranty on every intervention.",
          subServices: [
            { title: "On-site repair", body: "Diagnosis, part replacement and breakdown resolution for wall-hung and floor-standing boilers." },
            { title: "Annual maintenance", body: "Inspection, cleaning and tuning to cut consumption and prevent critical failures." },
            { title: "Installation & commissioning", body: "Replacement, installation and commissioning of new boilers for domestic or industrial use." },
            { title: "Condensing and forced-draught", body: "Specialists in modern high-efficiency equipment, with brand-specific training." },
          ],
          problemsTitle: "Symptoms we treat most often",
          problems: [
            "Boiler won't ignite or shuts itself off",
            "Low pressure or water loss",
            "Intermittent or cold hot water",
            "Abnormal noises during heating",
            "Error codes on the display",
          ],
          brandsTitle: "Brands we service",
          brands: [
            "Roca", "BaxiRoca", "Vulcano", "Junkers", "Vaillant", "Ferroli",
            "Ariston", "Sime", "Chaffoteaux et Maury", "Saunier Duval",
            "Beretta", "Riello", "Viessmann", "Buderus", "De Dietrich",
            "Immergás", "Domusa", "Biasi",
          ],
          ctaTitle: "Boiler stopped working? Talk to us now.",
          ctaBody: "Same-day response across mainland Portugal. 1-month repair warranty, 6-month installation warranty.",
        },
      },
    },
  },
  {
    slug: "esquentadores",
    tier: "anchor",
    iconKey: "droplet",
    copy: {
      pt: {
        name: "Esquentadores",
        short: "Reparação e instalação de esquentadores a gás. Vulcano, Junkers, Cointra e mais.",
        detail: {
          heroLead: "Banho frio?",
          heroHighlight: "Hoje é o último",
          heroTail: ", esquentador a funcionar no próprio dia.",
          intro:
            "Esquentadores a gás natural, butano e propano. Reparação, instalação, substituição e manutenção preventiva — todas as marcas, peças originais, atendimento no próprio dia.",
          subServices: [
            { title: "Reparação ao domicílio", body: "Acendimento, gás, temperatura, fluxo. Diagnosticamos e substituímos peças no local." },
            { title: "Instalação e substituição", body: "Recomendação técnica e instalação de equipamento adequado ao seu caudal e gás." },
            { title: "Conversão de gás", body: "Conversão de butano para gás natural ou vice-versa, em segurança e por profissional certificado." },
            { title: "Manutenção anual", body: "Revisão para evitar consumos altos e garantir segurança da combustão." },
          ],
          problemsTitle: "Sintomas mais frequentes que tratamos",
          problems: [
            "Esquentador não liga ou apaga durante o banho",
            "Pouco caudal ou temperatura instável",
            "Cheiro a gás",
            "Chama amarela ou irregular",
            "Fugas de água",
          ],
          brandsTitle: "Marcas que reparamos",
          brands: ["Vulcano", "Junkers", "Cointra", "Saunier Duval", "Ariston", "Bosch", "Beretta", "Fagor", "Roca"],
          ctaTitle: "Sem água quente? Resolvemos hoje.",
          ctaBody: "Linha urgente 24 h. Peças originais, técnicos certificados e garantia de 1 mês em cada reparação.",
        },
      },
      en: {
        name: "Water heaters",
        short: "Gas water-heater repair and installation. Vulcano, Junkers, Cointra and more.",
        detail: {
          heroLead: "Cold shower?",
          heroHighlight: "Make today the last one",
          heroTail: " — water heater fixed same day.",
          intro:
            "Natural gas, butane and propane water heaters. Repair, installation, replacement and preventive maintenance — every brand, original parts, same-day service.",
          subServices: [
            { title: "On-site repair", body: "Ignition, gas, temperature, flow. We diagnose and replace parts on the spot." },
            { title: "Installation & replacement", body: "Technical recommendation and installation of equipment matched to your flow and gas type." },
            { title: "Gas conversion", body: "Butane-to-natural-gas conversion (or vice versa), safely, by a certified professional." },
            { title: "Annual maintenance", body: "Service to avoid high consumption and ensure safe combustion." },
          ],
          problemsTitle: "Symptoms we treat most often",
          problems: [
            "Heater won't ignite or shuts off mid-shower",
            "Low flow or unstable temperature",
            "Smell of gas",
            "Yellow or uneven flame",
            "Water leaks",
          ],
          brandsTitle: "Brands we service",
          brands: ["Vulcano", "Junkers", "Cointra", "Saunier Duval", "Ariston", "Bosch", "Beretta", "Fagor", "Roca"],
          ctaTitle: "No hot water? We fix it today.",
          ctaBody: "24-h urgent line. Original parts, certified technicians, 1-month warranty on every repair.",
        },
      },
    },
  },
  {
    slug: "ar-condicionado",
    tier: "anchor",
    iconKey: "snowflake",
    copy: {
      pt: {
        name: "Ar condicionado",
        short: "Reparação, instalação e manutenção de splits e VRV. Domestico e comercial.",
        detail: {
          heroLead: "Calor a mais?",
          heroHighlight: "Frio em horas",
          heroTail: ", split ou VRV, doméstico ou comercial.",
          intro:
            "Reparação, instalação e manutenção de equipamentos de ar condicionado split, multi-split e VRV. Doméstico, comércio e escritórios. Cargas de gás, fugas, limpezas e contratos anuais.",
          subServices: [
            { title: "Reparação e diagnóstico", body: "Avarias eléctricas, fugas de gás, problemas de compressor, drenagem e controlo." },
            { title: "Instalação de splits", body: "Dimensionamento, instalação e arranque com garantia de mão de obra." },
            { title: "Manutenção e limpeza", body: "Limpeza profunda, filtros e desinfeção. Recomendado uma vez por ano." },
            { title: "Carga e fuga de gás", body: "Deteção de fugas e recarga conforme regulamento europeu de fluidos refrigerantes." },
          ],
          problemsTitle: "Sintomas mais frequentes que tratamos",
          problems: [
            "Não arrefece (ou não aquece)",
            "Ruído anormal ou vibração",
            "Pingos de água na unidade interior",
            "Cheiro a humidade ao ligar",
            "Equipamento não liga ou desliga sozinho",
          ],
          ctaTitle: "Ar condicionado a falhar? Marque hoje.",
          ctaBody: "Equipas com formação Daikin, Mitsubishi, LG, Samsung. Resposta no próprio dia e contratos de manutenção anual.",
        },
      },
      en: {
        name: "Air conditioning",
        short: "Split and VRV repair, installation and maintenance. Domestic and commercial.",
        detail: {
          heroLead: "Too hot?",
          heroHighlight: "Cool in hours",
          heroTail: " — split or VRV, home or office.",
          intro:
            "Repair, installation and maintenance of split, multi-split and VRV air-conditioning units. Domestic, retail and offices. Gas recharge, leak detection, cleans and annual contracts.",
          subServices: [
            { title: "Repair & diagnosis", body: "Electrical faults, gas leaks, compressor issues, drainage and controls." },
            { title: "Split installation", body: "Sizing, installation and commissioning with workmanship warranty." },
            { title: "Maintenance & cleaning", body: "Deep clean, filters and disinfection. Recommended once a year." },
            { title: "Gas recharge & leak detection", body: "Leak detection and recharge per EU refrigerant regulation." },
          ],
          problemsTitle: "Symptoms we treat most often",
          problems: [
            "Won't cool (or won't heat)",
            "Abnormal noise or vibration",
            "Water dripping from indoor unit",
            "Musty smell when starting",
            "Unit won't start or shuts off on its own",
          ],
          ctaTitle: "AC playing up? Book today.",
          ctaBody: "Teams trained on Daikin, Mitsubishi, LG, Samsung. Same-day response and annual maintenance contracts.",
        },
      },
    },
  },
  {
    slug: "canalizacao",
    tier: "anchor",
    iconKey: "wrench",
    copy: {
      pt: {
        name: "Canalização urgente",
        short: "Roturas, fugas, ligações, ferro e PEX. Canalizador 24 h em todo o continente.",
        detail: {
          heroLead: "Fuga em casa?",
          heroHighlight: "Canalizador no local",
          heroTail: ", 24 horas, todos os dias.",
          intro:
            "Canalizador profissional para urgências e obras agendadas. Reparações em ferro, PVC, PEX, multicamada e cobre. Roturas, fugas, ligações e remodelações.",
          subServices: [
            { title: "Reparação de fugas", body: "Deteção de origem, isolamento e substituição da peça defeituosa, sem partir paredes desnecessariamente." },
            { title: "Substituição de tubagem", body: "Ferro envelhecido, PEX ou multicamada — execução limpa e por etapas." },
            { title: "Torneiras e misturadoras", body: "Substituição, reparação e instalação em cozinha, casa de banho e exterior." },
            { title: "Ligações a equipamentos", body: "Máquina de lavar, esquentador, caldeira, autoclismo, biénos sanitários." },
          ],
          problemsTitle: "Sintomas mais frequentes que tratamos",
          problems: [
            "Fuga de água em parede ou teto",
            "Pressão baixa em torneiras",
            "Cheiros vindos dos canos",
            "Ruído nas tubagens",
            "Aumento súbito do consumo de água",
          ],
          ctaTitle: "Fuga? Cada minuto conta.",
          ctaBody: "Canalizador no local. Diagnóstico claro, orçamento antes da reparação, garantia escrita.",
        },
      },
      en: {
        name: "Emergency plumbing",
        short: "Leaks, breaks, fittings, iron and PEX pipework. Plumber on call 24 h.",
        detail: {
          heroLead: "Leak at home?",
          heroHighlight: "Plumber on site",
          heroTail: ", 24 hours, every day.",
          intro:
            "Professional plumber for emergencies and scheduled work. Repairs in iron, PVC, PEX, multilayer and copper. Leaks, breaks, fittings and remodels.",
          subServices: [
            { title: "Leak repair", body: "Origin detection, isolation and replacement of the faulty part — without breaking walls unnecessarily." },
            { title: "Pipe replacement", body: "Aged iron, PEX or multilayer — clean, phased execution." },
            { title: "Taps and mixers", body: "Replacement, repair and installation in kitchen, bathroom and outdoors." },
            { title: "Appliance connections", body: "Washing machine, water heater, boiler, toilet, sanitary fittings." },
          ],
          problemsTitle: "Symptoms we treat most often",
          problems: [
            "Water leak in wall or ceiling",
            "Low pressure at taps",
            "Smells coming from pipes",
            "Noise in pipework",
            "Sudden spike in water bill",
          ],
          ctaTitle: "A leak? Every minute counts.",
          ctaBody: "Plumber on site. Clear diagnosis, written quote before the repair, written warranty.",
        },
      },
    },
  },
  {
    slug: "eletricista",
    tier: "catalog",
    iconKey: "zap",
    copy: {
      pt: {
        name: "Eletricista urgente",
        short: "Avarias, quadros, fugas elétricas, instalação. 24 h.",
      },
      en: {
        name: "Emergency electrician",
        short: "Faults, panels, electrical leaks, installation. 24 h.",
      },
    },
  },
  {
    slug: "desentupimentos",
    tier: "catalog",
    iconKey: "drain",
    copy: {
      pt: {
        name: "Desentupimentos",
        short: "Esgotos, sanitas, lavatórios, banheiras. Equipa de alta pressão.",
      },
      en: {
        name: "Drain unclogging",
        short: "Sewers, toilets, sinks, baths. High-pressure team.",
      },
    },
  },
  {
    slug: "termoacumuladores",
    tier: "catalog",
    iconKey: "droplet",
    copy: {
      pt: {
        name: "Termoacumuladores",
        short: "Reparação, instalação e substituição de termoacumuladores elétricos.",
      },
      en: {
        name: "Water tanks",
        short: "Electric hot-water tank repair, installation and replacement.",
      },
    },
  },
  {
    slug: "paineis-solares",
    tier: "catalog",
    iconKey: "sun",
    copy: {
      pt: {
        name: "Painéis solares",
        short: "Assistência a sistemas solares térmicos e bombas de calor.",
      },
      en: {
        name: "Solar panels",
        short: "Service for solar thermal systems and heat pumps.",
      },
    },
  },
  {
    slug: "abertura-de-portas",
    tier: "catalog",
    iconKey: "key",
    copy: {
      pt: {
        name: "Abertura de portas",
        short: "Serralheiro urgente para portas trancadas, perda de chaves e fechaduras avariadas.",
      },
      en: {
        name: "Door opening",
        short: "Emergency locksmith for locked doors, lost keys and broken locks.",
      },
    },
  },
  {
    slug: "portoes",
    tier: "catalog",
    iconKey: "doorOpen",
    copy: {
      pt: {
        name: "Portões automáticos",
        short: "Reparação de motores, comandos e mecanismos de portões.",
      },
      en: {
        name: "Automatic gates",
        short: "Repair of gate motors, remotes and mechanisms.",
      },
    },
  },
  {
    slug: "estores",
    tier: "catalog",
    iconKey: "shutter",
    copy: {
      pt: {
        name: "Estores",
        short: "Reparação de estores manuais e elétricos. Fitas, motores e mecanismos.",
      },
      en: {
        name: "Blinds & shutters",
        short: "Manual and electric blind/shutter repair. Belts, motors and mechanisms.",
      },
    },
  },
  {
    slug: "autoclismos",
    tier: "catalog",
    iconKey: "wrench",
    copy: {
      pt: {
        name: "Autoclismos",
        short: "Reparação de autoclismos, fugas, mecanismos e substituição.",
      },
      en: {
        name: "Toilet mechanisms",
        short: "Toilet flush repair, leaks, mechanisms and replacement.",
      },
    },
  },
  {
    slug: "limpeza-chamines",
    tier: "catalog",
    iconKey: "chimney",
    copy: {
      pt: {
        name: "Limpeza de chaminés",
        short: "Limpeza e manutenção de chaminés, recuperadores e salamandras.",
      },
      en: {
        name: "Chimney cleaning",
        short: "Chimney, stove and fireplace cleaning and maintenance.",
      },
    },
  },
  {
    slug: "inspecao-video-esgotos",
    tier: "catalog",
    iconKey: "video",
    copy: {
      pt: {
        name: "Inspeção vídeo de esgotos",
        short: "Inspeção CCTV de tubagens para diagnóstico exato sem partir.",
      },
      en: {
        name: "Sewer video inspection",
        short: "CCTV inspection of pipework for exact diagnosis without breaking anything.",
      },
    },
  },
  {
    slug: "fechaduras-magneticas",
    tier: "catalog",
    iconKey: "lock",
    copy: {
      pt: {
        name: "Fechaduras magnéticas",
        short: "Instalação de fechaduras magnéticas e controlo de acessos.",
      },
      en: {
        name: "Magnetic locks",
        short: "Magnetic-lock installation and access control.",
      },
    },
  },
  {
    slug: "montagem-moveis",
    tier: "catalog",
    iconKey: "tool",
    copy: {
      pt: {
        name: "Montagem de móveis",
        short: "Montagem profissional de móveis, cozinhas e armários.",
      },
      en: {
        name: "Furniture assembly",
        short: "Professional assembly of furniture, kitchens and cabinets.",
      },
    },
  },
  {
    slug: "bombas-agua",
    tier: "catalog",
    iconKey: "droplet",
    copy: {
      pt: {
        name: "Bombas de água",
        short: "Reparação e substituição de bombas de água e grupos hidropressores.",
      },
      en: {
        name: "Water pumps",
        short: "Repair and replacement of water pumps and pressure-boosting groups.",
      },
    },
  },
  {
    slug: "mini-escavadoras",
    tier: "catalog",
    iconKey: "truck",
    copy: {
      pt: {
        name: "Aluguer de mini-escavadoras",
        short: "Aluguer com manobrador para pequenas obras e movimentações de terra.",
      },
      en: {
        name: "Mini excavator rental",
        short: "Rental with operator for small works and earth moving.",
      },
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function anchorServices(): ReadonlyArray<Service> {
  return services.filter((s) => s.tier === "anchor");
}
