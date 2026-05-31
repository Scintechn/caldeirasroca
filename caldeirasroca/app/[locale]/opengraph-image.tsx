import { ImageResponse } from "next/og";
import { defaultLocale, getDictionary, isLocale } from "@/lib/i18n";
import { business } from "@/lib/business";

export const alt = "Assistência Caldeiras Roca · Viana do Castelo";
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
            "linear-gradient(135deg, #1e3a8a 0%, #18254e 60%, #0e1733 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#f97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            R
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>
              Caldeiras Roca
            </div>
            <div
              style={{
                fontSize: 14,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {business.locality}
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
              fontSize: 22,
              fontWeight: 600,
              color: "#fdba74",
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
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              gap: "0.2em",
            }}
          >
            <span>{dict.hero.h1Lead}</span>
            <span style={{ color: "#fdba74" }}>{dict.hero.h1Highlight}</span>
            <span>{dict.hero.h1Tail}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <span>{`Tel. ${business.phone.urgent.display}`}</span>
            <span>{`· WhatsApp ${business.whatsapp.display}`}</span>
          </div>
          <div style={{ display: "flex", gap: 12, fontWeight: 700 }}>
            <span>{dict.hero.badges.warranty}</span>
            <span>·</span>
            <span>{dict.hero.badges.original}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
