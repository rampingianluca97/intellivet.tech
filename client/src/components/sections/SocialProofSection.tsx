// SocialProofSection v2 — Large headline, readable review cards
import { useLang } from "@/contexts/LanguageContext";
import { CTABlock } from "@/components/CTABlock";

function StarRating({ n }: { n: number }) {
  return <span className="iv-stars" aria-label={`${n} stars`}>{"★".repeat(n)}</span>;
}

export function SocialProofSection() {
  const { t } = useLang();
  const reviews = t.socialProof.reviews;

  return (
    <section id="testimonials" className="iv-section" style={{ background: "#fff" }}>
      <div className="container">
        <p className="iv-label iv-animate" style={{ marginBottom: "0.75rem" }}>
          {t.lang === "es" ? "Lo que dicen nuestros clientes" : "What our clients say"}
        </p>
        <h2 className="iv-h2 iv-animate" style={{ marginBottom: "0.5rem" }}>
          {t.lang === "es" ? "MÁS DE 5 CLÍNICAS YA CONFÍAN EN INTELLIVET" : "5+ CLINICS ALREADY TRUST INTELLIVET"}
        </h2>
        <p
          className="iv-animate"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(1rem, 3.5vw, 1.15rem)", color: "var(--iv-text-muted)", marginBottom: "2.5rem" }}
        >
          {t.socialProof.sub}
        </p>

        {/* Reviews grid */}
        <div
          style={{ columns: "1", columnGap: "1rem", marginBottom: "3rem" }}
          className="sm:columns-2 lg:columns-3"
        >
          {reviews.map((r, i) => (
            <div
              key={i}
              className="iv-animate"
              style={{
                breakInside: "avoid",
                marginBottom: "1rem",
                background: "#fff",
                border: "1.5px solid var(--iv-border)",
                borderTop: `5px solid ${r.color}`,
                borderRadius: "3px",
                padding: "1.25rem",
                transitionDelay: `${(i % 6) * 50}ms`,
              }}
            >
              <StarRating n={r.rating} />
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.95rem, 3vw, 1.05rem)", color: "var(--iv-text)", lineHeight: 1.6, margin: "0.6rem 0 0.875rem" }}>
                "{r.text}"
              </p>
              <div style={{ background: "#F0FFF4", border: `1px solid ${r.color}30`, borderRadius: "2px", padding: "0.35rem 0.65rem", marginBottom: "0.875rem", display: "inline-block" }}>
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.85rem", color: r.color }}>
                  ↑ {r.result}
                </span>
              </div>
              <div>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--iv-text)", lineHeight: 1.3 }}>{r.name}</p>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.825rem", color: "var(--iv-text-muted)", lineHeight: 1.4 }}>{r.clinic} — {r.city}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="iv-animate">
          <CTABlock variant="mid" showBuy={false} showScarcity={true} />
        </div>
      </div>
    </section>
  );
}
