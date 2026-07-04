// StepsSection v2 — Large numbered steps, clean
import { useLang } from "@/contexts/LanguageContext";

export function StepsSection() {
  const { t } = useLang();

  return (
    <section id="steps" className="iv-section" style={{ background: "#fff" }}>
      <div className="container">
        <p className="iv-label iv-animate" style={{ marginBottom: "0.75rem" }}>
          {t.lang === "es" ? "El proceso" : "The process"}
        </p>
        <h2 className="iv-h2 iv-animate" style={{ marginBottom: "2.5rem" }}>
          {t.steps.title}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {t.steps.items.map((step, i) => (
            <div key={i} className="iv-animate" style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", paddingBottom: i < t.steps.items.length - 1 ? "2rem" : "0", transitionDelay: `${i * 80}ms` }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--iv-green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "1.4rem", color: "#fff" }}>{step.num}</span>
                </div>
                {i < t.steps.items.length - 1 && (
                  <div style={{ width: 2, flex: 1, minHeight: "2rem", background: "var(--iv-border)", marginTop: "0.5rem" }} />
                )}
              </div>
              <div style={{ paddingTop: "0.875rem" }}>
                <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(1.05rem, 3.5vw, 1.2rem)", color: "var(--iv-text)", marginBottom: "0.4rem", lineHeight: 1.35 }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.95rem, 3vw, 1.05rem)", color: "var(--iv-text-muted)", lineHeight: 1.6 }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
