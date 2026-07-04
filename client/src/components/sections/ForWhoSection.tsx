// ForWhoSection v2 — Large title, readable qualification lists
import { Check, X } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { CTABlock } from "@/components/CTABlock";

export function ForWhoSection() {
  const { t } = useLang();

  return (
    <section id="for-who" className="iv-section" style={{ background: "var(--iv-bg-alt)" }}>
      <div className="container">
        <p className="iv-label iv-animate" style={{ marginBottom: "0.75rem" }}>
          {t.lang === "es" ? "Calificación" : "Qualification"}
        </p>
        <h2 className="iv-h2 iv-animate" style={{ marginBottom: "2rem" }}>
          {t.forWho.title}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="md:grid-cols-2">
          <div className="iv-animate iv-card" style={{ borderTop: "5px solid var(--iv-green)" }}>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--iv-green)", marginBottom: "1.25rem" }}>
              {t.forWho.forLabel}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {t.forWho.forItems.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                  <Check size={18} color="var(--iv-green)" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
                  <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.95rem, 3vw, 1.05rem)", color: "var(--iv-text)", lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="iv-animate iv-card" style={{ borderTop: "5px solid var(--iv-text-muted)", transitionDelay: "60ms" }}>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--iv-text-muted)", marginBottom: "1.25rem" }}>
              {t.forWho.notForLabel}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {t.forWho.notForItems.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                  <X size={18} color="var(--iv-text-muted)" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
                  <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.95rem, 3vw, 1.05rem)", color: "var(--iv-text-muted)", lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="iv-animate" style={{ marginTop: "2.5rem" }}>
          <CTABlock variant="mid" showBuy={false} showScarcity={false} />
        </div>
      </div>
    </section>
  );
}
