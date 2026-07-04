// VSLSection v2 — Clean placeholder, large text, no temp buttons
import { useLang } from "@/contexts/LanguageContext";

export function VSLSection() {
  const { t } = useLang();

  return (
    <section id="vsl" style={{ background: "#fff", paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
      <div className="container">
        <div className="iv-animate" style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div
            style={{
              background: "#111",
              borderRadius: "6px",
              aspectRatio: "16/9",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,92,58,0.35) 0%, rgba(0,0,0,0.7) 100%)" }} aria-hidden="true" />

            {/* Play icon */}
            <div style={{ position: "relative", zIndex: 1, width: 72, height: 72, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)" aria-hidden="true">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>

            <h3 style={{ position: "relative", zIndex: 1, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(1.4rem, 5vw, 2rem)", color: "#fff", marginBottom: "0.5rem", textAlign: "center", padding: "0 1rem", textTransform: "uppercase" }}>
              {t.vsl.title}
            </h3>

            <span style={{ position: "relative", zIndex: 1, fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--iv-whatsapp)", background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)", padding: "0.25rem 0.75rem", borderRadius: "2px", marginBottom: "1rem" }}>
              {t.vsl.subtitle}
            </span>

            <p style={{ position: "relative", zIndex: 1, fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.9rem, 3vw, 1rem)", color: "rgba(255,255,255,0.55)", textAlign: "center", maxWidth: "440px", padding: "0 1.5rem", lineHeight: 1.55 }}>
              {t.vsl.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
