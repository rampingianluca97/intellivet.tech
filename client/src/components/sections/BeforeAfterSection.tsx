// BeforeAfterSection v2 — Large title, readable comparison rows
import { useLang } from "@/contexts/LanguageContext";

export function BeforeAfterSection() {
  const { t } = useLang();

  return (
    <section id="before-after" className="iv-section" style={{ background: "#fff" }}>
      <div className="container">
        <p className="iv-label iv-animate" style={{ marginBottom: "0.75rem" }}>
          {t.lang === "es" ? "El cambio" : "The change"}
        </p>
        <h2 className="iv-h2 iv-animate" style={{ marginBottom: "2rem" }}>
          {t.beforeAfter.title}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--iv-red)" }}>
            {t.beforeAfter.before}
          </p>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--iv-green)" }}>
            {t.beforeAfter.after}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2.5rem" }}>
          {t.beforeAfter.items.map((item, i) => (
            <div key={i} className="iv-animate" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", transitionDelay: `${i * 50}ms` }}>
              <div className="iv-ba-before">
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.9rem, 3vw, 1rem)", color: "#7A1A1A", lineHeight: 1.5 }}>{item.before}</p>
              </div>
              <div className="iv-ba-after">
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.9rem, 3vw, 1rem)", color: "#1A4A2A", lineHeight: 1.5 }}>{item.after}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="iv-animate" style={{ borderLeft: "5px solid var(--iv-green)", paddingLeft: "1.25rem" }}>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontStyle: "italic", fontSize: "clamp(1.05rem, 3.5vw, 1.25rem)", color: "var(--iv-text)", lineHeight: 1.5 }}>
            {t.beforeAfter.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
