import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { business } from "@/lib/business";
import { anchorServices } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl.replace(/\/+$/, "");
  const now = new Date();
  const anchors = anchorServices();
  const paths = [
    "",
    "/contact",
    ...anchors.map((s) => `/servicos/${s.slug}`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1.0 : path === "/contact" ? 0.7 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${base}/${l}${path}`]),
        ),
      },
    })),
  );
}
