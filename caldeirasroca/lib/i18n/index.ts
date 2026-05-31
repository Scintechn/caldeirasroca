import { pt } from "./pt";
import { en } from "./en";
import type { Dictionary, Locale } from "./types";

export { locales, defaultLocale, hreflangMap } from "./types";
export type { Dictionary, Locale } from "./types";

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return value === "pt" || value === "en";
}
