// GuaranteeSection v2 — Large text, shield, clear limits
import { Shield } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export function GuaranteeSection() {
  const { t } = useLang();

  return (
    <section id="guarantee" style={{ background: "#fff", paddingBottom: "0" }}>
      <div className="container" style={{ paddingBottom: "3rem" }}>
        <div className="iv-animate iv-guarantee" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--iv-green)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Shield size={24} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(1.5rem, 6vw, 2rem)", color: "var(--iv-green)", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                {t.guarantee.title}
              </h3>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 3.5vw, 1.15rem)", color: "var(--iv-text)", lineHeight: 1.55, marginBottom: "0.75rem" }}>
                {t.guarantee.body}
              </p>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.9rem, 3vw, 1rem)", color: "var(--iv-text-muted)", lineHeight: 1.55, fontStyle: "italic" }}>
                {t.guarantee.limit}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
