// HeroSection v2 — Text dominant, no background photo, prices visible immediately
// Reference: Big Luca / Mentecatti style — massive condensed headline, black on white
// Mobile: headline fills the screen, prices + CTA below fold 1

import { useLang } from "@/contexts/LanguageContext";
import { CTABlock } from "@/components/CTABlock";

export function HeroSection() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      style={{
        background: "#fff",
        paddingTop: "2rem",
        paddingBottom: "0",
      }}
    >
      <div className="container">
        {/* Social proof badge */}
        <div
          className="iv-animate"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "#F0FFF4",
            border: "1.5px solid #4CAF78",
            borderRadius: "3px",
            padding: "0.4rem 0.875rem",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--iv-whatsapp)",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "var(--iv-green)",
            }}
          >
            {t.hero.badge}
          </span>
        </div>

        {/* MASSIVE headline */}
        <h1
          className="iv-h1 iv-animate"
          style={{
            marginBottom: "1.25rem",
            maxWidth: "100%",
          }}
        >
          {t.lang === "es" ? (
            <>
              AHORA MISMO,<br />
              ALGUIEN NO<br />
              <span className="iv-highlight-red">RECIBE RESPUESTA.</span>
            </>
          ) : (
            <>
              RIGHT NOW,<br />
              SOMEONE ISN'T<br />
              <span className="iv-highlight-red">GETTING A REPLY.</span>
            </>
          )}
        </h1>

        {/* Subheadline — large body */}
        <p
          className="iv-animate"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "clamp(1.1rem, 4vw, 1.3rem)",
            lineHeight: 1.6,
            color: "#333",
            marginBottom: "2rem",
            maxWidth: "560px",
          }}
        >
          {t.hero.subheadline}
        </p>

        {/* Prices — visible immediately in hero */}
        <div
          className="iv-animate"
          style={{
            background: "var(--iv-bg-dark)",
            borderRadius: "6px",
            padding: "1.5rem",
            marginBottom: "1.75rem",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "0.75rem",
            }}
          >
            {t.lang === "es" ? "Oferta especial — 60% descuento" : "Special offer — 60% discount"}
          </p>

          {/* Bundle price */}
          <div style={{ marginBottom: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap" }}>
              <span className="iv-price-original" style={{ color: "rgba(255,255,255,0.4)" }}>$2,250</span>
              <span className="iv-price-new" style={{ color: "#4CAF78" }}>$900</span>
              <span
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.6)",
                  alignSelf: "center",
                }}
              >
                setup
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
              <span className="iv-price-original" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>$750/mes</span>
              <span className="iv-price-monthly" style={{ color: "#4CAF78" }}>$300/mes</span>
            </div>
          </div>

          {/* Gift line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "0.75rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>🎁</span>
            <span
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "#FFE066",
                lineHeight: 1.4,
              }}
            >
              {t.lang === "es"
                ? "Website profesional + SEO — valor $800 — GRATIS"
                : "Professional Website + SEO — value $800 — FREE"}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="iv-animate" style={{ marginBottom: "1rem" }}>
          <CTABlock variant="hero" showBuy={true} showScarcity={true} />
        </div>
      </div>

      {/* Hero image below fold */}
      <div
        className="iv-animate"
        style={{
          marginTop: "2.5rem",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663411960285/QQumH4UaJLUGXTrd4Ai5Bj/hero_vet_clinic-ZmfvHBsf6AAaYvCYs4WTY2.webp"
          alt="Veterinario atendiendo a un perro"
          style={{
            width: "100%",
            maxHeight: "55vw",
            objectFit: "cover",
            objectPosition: "center 30%",
            display: "block",
          }}
          loading="eager"
        />
        {/* Dark gradient overlay at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top, #fff 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
