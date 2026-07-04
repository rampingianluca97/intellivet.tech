// PainSection v2 — Large text, aggressive style, no small text
import { PhoneOff, MessageCircle, Moon, Users } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const ICONS = [PhoneOff, MessageCircle, Moon, Users];

export function PainSection() {
  const { t } = useLang();

  return (
    <section id="pain" className="iv-section" style={{ background: "var(--iv-bg-alt)" }}>
      <div className="container">
        <p className="iv-label iv-animate" style={{ marginBottom: "0.75rem" }}>
          {t.lang === "es" ? "El problema" : "The problem"}
        </p>
        <h2 className="iv-h2 iv-animate" style={{ marginBottom: "2rem" }}>
          {t.pain.title}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
          {t.pain.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={i}
                className="iv-animate"
                style={{
                  background: "#fff",
                  borderLeft: "5px solid var(--iv-red)",
                  borderRadius: "3px",
                  padding: "1.25rem 1.25rem 1.25rem 1.5rem",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#FFF0F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color="var(--iv-red)" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 3.5vw, 1.1rem)", color: "var(--iv-text)", marginBottom: "0.3rem", lineHeight: 1.4 }}>
                      {item.headline}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.95rem, 3vw, 1.05rem)", color: "var(--iv-text-muted)", lineHeight: 1.55 }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="iv-animate"
          style={{ borderLeft: "5px solid var(--iv-green)", paddingLeft: "1.25rem" }}
        >
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontStyle: "italic", fontSize: "clamp(1.1rem, 4vw, 1.35rem)", color: "var(--iv-text)", lineHeight: 1.45 }}>
            {t.pain.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
