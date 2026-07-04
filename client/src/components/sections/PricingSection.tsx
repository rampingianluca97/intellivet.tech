// PricingSection v2 — Massive prices, Bundle dominant, mobile-first
import { Check, Gift } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { CTABlock } from "@/components/CTABlock";

const WA_NUMBER = "5491100000000";

export function PricingSection() {
  const { t } = useLang();
  const { bundle, chatOnly } = t.pricing;

  return (
    <section id="pricing" className="iv-section" style={{ background: "var(--iv-bg-alt)" }}>
      <div className="container">
        <p className="iv-label iv-animate" style={{ marginBottom: "0.75rem" }}>
          {t.lang === "es" ? "Precios" : "Pricing"}
        </p>
        <h2 className="iv-h2 iv-animate" style={{ marginBottom: "0.75rem" }}>
          {t.pricing.title}
        </h2>
        <div className="iv-animate iv-scarcity" style={{ marginBottom: "2.5rem" }}>
          <span>⚠</span><span>{t.pricing.urgency}</span>
        </div>

        {/* Bundle — dominant */}
        <div
          className="iv-animate"
          style={{ border: "3px solid var(--iv-green)", borderRadius: "6px", background: "#fff", overflow: "hidden", marginBottom: "1.25rem", boxShadow: "0 6px 24px rgba(26,92,58,0.12)" }}
        >
          {/* Badge */}
          <div style={{ background: "var(--iv-green)", padding: "0.75rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(1rem, 4vw, 1.2rem)", letterSpacing: "0.06em", color: "#fff", textTransform: "uppercase" }}>
              {bundle.badge}
            </span>
            <span style={{ background: "var(--iv-amber)", color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "1rem", letterSpacing: "0.06em", padding: "0.2rem 0.6rem", borderRadius: "2px" }}>
              −60%
            </span>
          </div>

          <div style={{ padding: "1.75rem" }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 7vw, 2.5rem)", color: "var(--iv-text)", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              {bundle.name}
            </h3>

            {/* Setup */}
            <div style={{ marginBottom: "0.75rem" }}>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "var(--iv-text-muted)", marginBottom: "0.2rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>Setup</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap" }}>
                <span className="iv-price-original">{bundle.setupOriginal}</span>
                <span className="iv-price-new">{bundle.setupPrice}</span>
              </div>
            </div>

            {/* Monthly */}
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "var(--iv-text-muted)", marginBottom: "0.2rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
                {t.lang === "es" ? "Mensual" : "Monthly"}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap" }}>
                <span className="iv-price-original">{bundle.retainerOriginal}</span>
                <span className="iv-price-monthly">{bundle.retainerPrice}</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.85rem", color: "var(--iv-text-muted)", marginTop: "0.25rem" }}>{bundle.voiceNote}</p>
            </div>

            {/* Gift */}
            <div style={{ background: "#F0FFF4", border: "1.5px solid #4CAF78", borderRadius: "4px", padding: "1rem 1.25rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <Gift size={22} color="var(--iv-green)" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
              <div>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(0.95rem, 3vw, 1.05rem)", color: "var(--iv-green)", marginBottom: "0.3rem" }}>{bundle.gift}</p>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.875rem, 2.8vw, 0.95rem)", color: "var(--iv-text-muted)", lineHeight: 1.5 }}>{bundle.giftNote}</p>
              </div>
            </div>

            {/* Includes */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {bundle.includes.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <Check size={16} color="var(--iv-green)" style={{ flexShrink: 0, marginTop: "0.15rem" }} />
                  <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.95rem, 3vw, 1.05rem)", color: "var(--iv-text)", lineHeight: 1.45 }}>{item}</span>
                </li>
              ))}
            </ul>

            <CTABlock variant="mid" showBuy={true} showScarcity={true} />
          </div>
        </div>

        {/* Chat Only — secondary, compact */}
        <div className="iv-animate" style={{ border: "1.5px solid var(--iv-border)", borderRadius: "4px", background: "#fff", overflow: "hidden", transitionDelay: "80ms" }}>
          <div style={{ background: "#F4F4F2", padding: "0.6rem 1.25rem", borderBottom: "1px solid var(--iv-border)" }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.08em", color: "var(--iv-text-muted)", textTransform: "uppercase" }}>
              {chatOnly.badge}
            </span>
          </div>
          <div style={{ padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(1.5rem, 6vw, 2rem)", color: "var(--iv-text)", textTransform: "uppercase", marginBottom: "1rem" }}>
              {chatOnly.name}
            </h3>
            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <div>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "var(--iv-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, marginBottom: "0.2rem" }}>Setup</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                  <span className="iv-price-original" style={{ fontSize: "0.9rem" }}>{chatOnly.setupOriginal}</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "1.75rem", color: "var(--iv-text)" }}>{chatOnly.setupPrice}</span>
                </div>
              </div>
              <div>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "var(--iv-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, marginBottom: "0.2rem" }}>
                  {t.lang === "es" ? "Mensual" : "Monthly"}
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                  <span className="iv-price-original" style={{ fontSize: "0.9rem" }}>{chatOnly.retainerOriginal}</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "1.75rem", color: "var(--iv-text)" }}>{chatOnly.retainerPrice}</span>
                </div>
              </div>
            </div>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "var(--iv-text-muted)", marginBottom: "1.25rem", fontStyle: "italic" }}>{chatOnly.note}</p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hola%2C%20quiero%20info%20sobre%20Chat%20Only`}
              target="_blank" rel="noopener noreferrer"
              className="iv-btn-call"
              style={{ fontSize: "0.9rem" }}
            >
              {chatOnly.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
