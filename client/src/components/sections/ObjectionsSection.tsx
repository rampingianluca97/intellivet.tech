// ObjectionsSection v2 — Large Q&A on dark bg
import { useLang } from "@/contexts/LanguageContext";

export function ObjectionsSection() {
  const { t } = useLang();

  return (
    <section id="objections" className="iv-section" style={{ background: "var(--iv-bg-dark)" }}>
      <div className="container">
        <p className="iv-animate" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>
          {t.lang === "es" ? "Tranquilidad" : "Peace of mind"}
        </p>
        <h2 className="iv-h2 iv-animate" style={{ color: "#fff", marginBottom: "0.75rem" }}>
          {t.objections.title}
        </h2>
        <p className="iv-animate" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(1rem, 3.5vw, 1.15rem)", color: "rgba(255,255,255,0.6)", marginBottom: "2.5rem", maxWidth: "520px", lineHeight: 1.6 }}>
          {t.objections.subtitle}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }} className="sm:grid-cols-2">
          {t.objections.items.map((item, i) => (
            <div key={i} className="iv-animate" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", padding: "1.25rem", transitionDelay: `${i * 50}ms` }}>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 3.5vw, 1.1rem)", color: "var(--iv-whatsapp)", marginBottom: "0.5rem", lineHeight: 1.4 }}>{item.q}</p>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.95rem, 3vw, 1.05rem)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
