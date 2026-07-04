// ClosingSection v2 — Massive italic headline, dark bg, full CTA
import { useLang } from "@/contexts/LanguageContext";
import { CTABlock } from "@/components/CTABlock";

export function ClosingSection() {
  const { t } = useLang();

  return (
    <section id="closing" className="iv-section" style={{ background: "var(--iv-bg-dark)" }}>
      <div className="container">
        <p
          className="iv-animate"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}
        >
          {t.lang === "es" ? "Última oportunidad" : "Last chance"}
        </p>

        <h2
          className="iv-animate"
          style={{
            fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: "clamp(2.5rem, 10vw, 5rem)",
            color: "#fff",
            lineHeight: 1.0,
            marginBottom: "1.5rem",
            textTransform: "uppercase",
          }}
        >
          {t.closing.headline}
        </h2>

        <p
          className="iv-animate"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(1.05rem, 3.5vw, 1.2rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginBottom: "1rem" }}
        >
          {t.closing.body}
        </p>

        <div
          className="iv-animate iv-scarcity"
          style={{ background: "rgba(245,166,35,0.15)", border: "1.5px solid rgba(245,166,35,0.4)", color: "#FFD580", marginBottom: "2rem" }}
        >
          <span>⚠</span>
          <span>{t.closing.urgency}</span>
        </div>

        <div className="iv-animate">
          <CTABlock variant="footer" showBuy={true} showScarcity={false} />
        </div>
      </div>
    </section>
  );
}
