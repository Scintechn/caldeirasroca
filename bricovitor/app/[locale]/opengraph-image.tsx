import { ImageResponse } from "next/og";
import { defaultLocale, getDictionary, isLocale } from "@/lib/i18n";
import { business } from "@/lib/business";

export const alt = "BricoVitor · Reparações ao domicílio · 24 h";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #fffbeb 100%)",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
              color: "#020617",
            }}
          >
            B
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: -0.5,
                color: "#0f172a",
              }}
            >
              BricoVitor
            </div>
            <div
              style={{
                fontSize: 14,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#64748b",
              }}
            >
              {business.tagline}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#b45309",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {dict.hero.eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 70,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: "#0f172a",
              gap: "0.2em",
            }}
          >
            <span>{dict.hero.h1Lead}</span>
            <span style={{ color: "#d97706" }}>{dict.hero.h1Highlight}</span>
            <span>{dict.hero.h1Tail}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            color: "#475569",
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <span>{`Tel. ${business.phone.urgent.display}`}</span>
            <span>{`· WhatsApp ${business.whatsapp.display}`}</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            <span>{dict.hero.badges.coverage}</span>
            <span style={{ color: "#cbd5e1" }}>·</span>
            <span>{dict.hero.badges.warranty}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
