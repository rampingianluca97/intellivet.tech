// IntelliVet Landing v3 — BRUTAL MINIMAL
// Single-file approach for maximum control.
// Sections are clearly delimited with comments — move them freely.
// Design: Bebas Neue display, Inter body, huge text, massive spacing.
// Banner: scrolling ticker. Reviews: horizontal auto-carousel.

import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

/* ── CONSTANTS ── */
const WA = "5491100000000"; // ← replace with real number
const WA_LINK = `https://wa.me/${WA}?text=Hola%2C%20quiero%20una%20demo%20de%20IntelliVet`;
const CALL_LINK = "tel:+5491100000000"; // ← replace with real number

/* ── BODY TEXT STYLE (Georgia, centered, large) ── */
const BODY_STYLE: React.CSSProperties = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "clamp(1.2rem, 5vw, 1.5rem)",
  lineHeight: 1.65,
  color: "#222",
  textAlign: "center" as const,
};

const BODY_STYLE_LEFT: React.CSSProperties = {
  ...BODY_STYLE,
  textAlign: "left" as const,
};

/* ── COUNTDOWN HOOK ── */
function useCountdown() {
  const [secs, setSecs] = useState(() => {
    const stored = localStorage.getItem("iv_end");
    if (stored) {
      const rem = Math.floor((parseInt(stored) - Date.now()) / 1000);
      if (rem > 0) return rem;
    }
    const end = Date.now() + 24 * 3600 * 1000;
    localStorage.setItem("iv_end", String(end));
    return 24 * 3600;
  });
  useEffect(() => {
    const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

/* ── SCROLL REVEAL HOOK ── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.06 }
    );
    const run = () => document.querySelectorAll(".iv-fade:not(.visible)").forEach(el => obs.observe(el));
    run();
    const t = setTimeout(run, 400);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);
}

/* ── WA ICON ── */
function WAIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ── UNIFIED CTA BLOCK ── */
/* Dark bg, dashed white border, prices + buttons. IDENTICAL everywhere. */
function CTABlock({ showBuy = false, showScarcity = false }: { showBuy?: boolean; showScarcity?: boolean; }) {
  const { t } = useLang();
  return (
    <div className="iv-cta-block">
      {/* Offer label */}
      <p style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", marginBottom: "1rem", textAlign: "center" }}>
        {t.lang === "es" ? "OFERTA ESPECIAL — 60% DESCUENTO" : "SPECIAL OFFER — 60% DISCOUNT"}
      </p>
      {/* Prices */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "0.25rem" }}>
          <span className="iv-strike" style={{ color: "rgba(255,255,255,0.3)" }}>$2,250</span>
          <span className="iv-price" style={{ color: "#4CAF78" }}>$900</span>
          <span style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "rgba(255,255,255,0.45)", alignSelf: "center" }}>setup</span>
        </div>
        <div style={{ display: "inline-flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          <span className="iv-strike" style={{ color: "rgba(255,255,255,0.3)", fontSize: "1rem" }}>$750/mes</span>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 9vw, 3.5rem)", color: "#4CAF78", lineHeight: 1 }}>$300/mes</span>
        </div>
      </div>
      {/* Gift */}
      <div style={{ borderTop: "1px dashed rgba(255,255,255,0.2)", paddingTop: "1.25rem", marginBottom: "1.75rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
        <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>🎁</span>
        <p style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)", color: "#FFE066", lineHeight: 1.45 }}>
          {t.lang === "es" ? "Website profesional + SEO — valor $800 — INCLUIDO GRATIS" : "Professional Website + SEO — value $800 — INCLUDED FREE"}
        </p>
      </div>
      {/* Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="iv-btn-wa">
          <WAIcon size={22} />
          {t.cta.whatsapp}
        </a>
        <a href={CALL_LINK} className="iv-btn-call" style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}>
          📞 {t.cta.call}
        </a>
        {showBuy && (
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="iv-btn-buy" style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.3)" }}>
            🛒 {t.cta.buy}
          </a>
        )}
      </div>
      {/* Microcopy */}
      <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.9rem, 3.5vw, 1rem)", color: "rgba(255,255,255,0.45)", textAlign: "center", lineHeight: 1.5, marginTop: "1rem" }}>
        {t.cta.microcopy}
      </p>
      {/* Scarcity */}
      {showScarcity && (
        <div className="iv-scarcity" style={{ justifyContent: "center", marginTop: "0.75rem", width: "100%" }}>
          ⚠ {t.lang === "es" ? "Solo 3 lugares este mes — 60% descuento" : "Only 3 spots this month — 60% off"}
        </div>
      )}
    </div>
  );
}

/* ── TICKER BANNER ── */
function Ticker() {
  const { t } = useLang();
  const countdown = useCountdown();
  const items = [
    `${t.urgencyBanner.text}`,
    `${t.urgencyBanner.sub}`,
    `${t.urgencyBanner.countdown} ${countdown}`,
    `60% DESCUENTO`,
    `SOLO 3 LUGARES`,
  ];
  // Duplicate for seamless loop
  const all = [...items, ...items];
  return (
    <div className="iv-ticker-wrap" aria-live="off" aria-label="Urgency banner">
      <div className="iv-ticker-track">
        {all.map((item, i) => (
          <span key={i} className="iv-ticker-item">
            {item}
            <span className="iv-ticker-dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── REVIEW CAROUSEL ── */
function ReviewCarousel() {
  const { t } = useLang();
  const reviews = t.socialProof.reviews;
  const doubled = [...reviews, ...reviews]; // seamless loop

  return (
    <div className="iv-carousel-wrap" aria-label="Testimonials">
      <div className="iv-carousel-track">
        {doubled.map((r, i) => (
          <div key={i} className="iv-review-card" style={{ borderTop: `4px solid ${r.color}` }}>
            <div className="iv-stars" aria-label="5 stars">★★★★★</div>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "clamp(0.95rem, 3.5vw, 1.05rem)", color: "#222", lineHeight: 1.6, margin: "0.75rem 0 0.875rem" }}>
              "{r.text}"
            </p>
            <div style={{ background: "#F0FFF4", borderRadius: "2px", padding: "0.3rem 0.6rem", marginBottom: "0.75rem", display: "inline-block" }}>
              <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.8rem", color: r.color }}>
                ↑ {r.result}
              </span>
            </div>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#111" }}>{r.name}</p>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "0.8rem", color: "#888", marginTop: "0.15rem" }}>{r.clinic} — {r.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── FAQ ITEM ── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1.5px solid var(--iv-border)" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", padding: "1.5rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 4vw, 1.15rem)", color: "var(--iv-black)", lineHeight: 1.45, flex: 1 }}>{q}</span>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", color: "var(--iv-green)", flexShrink: 0, transition: "transform 200ms", transform: open ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block" }}>+</span>
      </button>
      <div style={{ overflow: "hidden", maxHeight: open ? "500px" : "0", transition: "max-height 220ms cubic-bezier(0.23,1,0.32,1)" }}>
        <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "clamp(1rem, 3.5vw, 1.1rem)", color: "#555", lineHeight: 1.65, paddingBottom: "1.5rem" }}>{a}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const { t, toggleLang } = useLang();
  useReveal();

  return (
    <div style={{ background: "var(--iv-white)", overflowX: "hidden" }}>

      {/* ── TICKER BANNER (fixed) ── */}
      <Ticker />

      {/* Spacer for fixed ticker */}
      <div style={{ height: "3.5rem" }} aria-hidden="true" />

      {/* ── NAVBAR ── */}
      <nav style={{ background: "#fff", borderBottom: "1.5px solid var(--iv-border)", padding: "1rem 0", position: "sticky", top: "3.5rem", zIndex: 100 }}>
        <div className="iv-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.75rem", letterSpacing: "0.04em", color: "var(--iv-black)", lineHeight: 1 }}>
            IntelliVet
          </span>
          <button
            onClick={toggleLang}
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "var(--iv-green)", background: "#F0FFF4", border: "1.5px solid #4CAF78", borderRadius: "3px", padding: "0.45rem 1rem", cursor: "pointer" }}
          >
            {t.langSwitch}
          </button>
        </div>
      </nav>

      {/* ══ SECTION 1: HERO ══ */}
      <section id="hero" style={{ background: "#fff", padding: "4rem 0 0" }}>
        <div className="iv-wrap">

          {/* Social proof pill */}
          <div className="iv-fade" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#F0FFF4", border: "1.5px solid #4CAF78", borderRadius: "3px", padding: "0.45rem 1rem", marginBottom: "2rem" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--iv-wa)", display: "inline-block" }} />
            <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--iv-green)" }}>{t.hero.badge}</span>
          </div>

          {/* MASSIVE headline */}
          <h1 className="iv-display iv-fade" style={{ marginBottom: "1.5rem" }}>
            {t.lang === "es" ? (
              <>AHORA MISMO,<br />ALGUIEN NO<br /><span style={{ background: "var(--iv-red)", color: "#fff", padding: "0 0.1em", display: "inline" }}>RECIBE RESPUESTA.</span></>
            ) : (
              <>RIGHT NOW,<br />SOMEONE ISN'T<br /><span style={{ background: "var(--iv-red)", color: "#fff", padding: "0 0.1em", display: "inline" }}>GETTING A REPLY.</span></>
            )}
          </h1>

          {/* Subheadline */}
          <p className="iv-body iv-fade" style={{ marginBottom: "3rem", maxWidth: "520px" }}>
            {t.hero.subheadline}
          </p>

          {/* Prices block */}
          <div className="iv-fade" style={{ background: "#0A0A0A", borderRadius: "6px", padding: "2rem", marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>
              {t.lang === "es" ? "OFERTA ESPECIAL — 60% DESCUENTO" : "SPECIAL OFFER — 60% DISCOUNT"}
            </p>
            <div style={{ marginBottom: "0.5rem" }}>
              <span className="iv-strike" style={{ color: "rgba(255,255,255,0.35)" }}>$2,250</span>
              <div className="iv-price" style={{ color: "#4CAF78" }}>$900 <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 500, fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)", color: "rgba(255,255,255,0.5)", verticalAlign: "middle" }}>setup</span></div>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="iv-strike" style={{ color: "rgba(255,255,255,0.35)", fontSize: "1rem" }}>$750/mes</span>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 9vw, 4rem)", color: "#4CAF78", lineHeight: 1 }}>$300/mes</div>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.25rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>🎁</span>
              <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(0.95rem, 3.5vw, 1.05rem)", color: "#FFE066", lineHeight: 1.45 }}>
                {t.lang === "es" ? "Website profesional + SEO — valor $800 — INCLUIDO GRATIS" : "Professional Website + SEO — value $800 — INCLUDED FREE"}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="iv-fade">
            <CTABlock showBuy={true} showScarcity={true} />
          </div>
        </div>

        {/* Hero photo — below fold */}
        <div className="iv-fade" style={{ marginTop: "4rem", position: "relative", overflow: "hidden" }}>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663411960285/QQumH4UaJLUGXTrd4Ai5Bj/hero_vet_clinic-ZmfvHBsf6AAaYvCYs4WTY2.webp"
            alt="Veterinario con perro"
            style={{ width: "100%", maxHeight: "60vw", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
            loading="eager"
          />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, #fff, transparent)" }} aria-hidden="true" />
        </div>
      </section>

      {/* ══ SECTION 2: VSL ══ */}
      <section id="vsl" style={{ background: "#fff", padding: "5rem 0" }}>
        <div className="iv-wrap">
          <div className="iv-fade" style={{ background: "#111", borderRadius: "6px", aspectRatio: "16/9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,92,58,0.4) 0%, rgba(0,0,0,0.7) 100%)" }} aria-hidden="true" />
            <div style={{ position: "relative", zIndex: 1, width: 80, height: 80, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)" aria-hidden="true"><polygon points="5,3 19,12 5,21" /></svg>
            </div>
            <h3 style={{ position: "relative", zIndex: 1, fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 6vw, 2.5rem)", color: "#fff", textAlign: "center", padding: "0 1.5rem", letterSpacing: "0.04em" }}>
              {t.vsl.title}
            </h3>
            <span style={{ position: "relative", zIndex: 1, fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--iv-wa)", marginTop: "0.75rem" }}>
              {t.vsl.subtitle}
            </span>
            <p style={{ position: "relative", zIndex: 1, fontFamily: "'Inter', system-ui, sans-serif", fontSize: "clamp(0.9rem, 3vw, 1rem)", color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: "400px", padding: "0.75rem 1.5rem 0", lineHeight: 1.55 }}>
              {t.vsl.description}
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: PAIN ══ */}
      <section id="pain" className="iv-sec" style={{ background: "var(--iv-gray)" }}>
        <div className="iv-wrap">
          <p className="iv-label iv-fade" style={{ marginBottom: "1rem" }}>{t.lang === "es" ? "El problema" : "The problem"}</p>
          <h2 className="iv-title iv-fade" style={{ marginBottom: "3rem" }}>{t.pain.title}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" }}>
            {t.pain.items.map((item, i) => (
              <div key={i} className="iv-fade" style={{ background: "#fff", borderLeft: "5px solid var(--iv-red)", padding: "1.5rem 1.5rem 1.5rem 1.75rem", borderRadius: "2px", transitionDelay: `${i * 60}ms` }}>
                <p className="iv-body-b" style={{ marginBottom: "0.4rem" }}>{item.headline}</p>
                <p className="iv-body">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="iv-fade" style={{ borderLeft: "5px solid var(--iv-green)", paddingLeft: "1.5rem" }}>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontStyle: "italic", fontSize: "clamp(1.1rem, 4.5vw, 1.4rem)", color: "var(--iv-black)", lineHeight: 1.5 }}>
              {t.pain.closing}
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4: SOCIAL PROOF ══ */}
      <section id="testimonials" className="iv-sec" style={{ background: "#fff" }}>
        <div className="iv-wrap">
          <p className="iv-label iv-fade" style={{ marginBottom: "1rem" }}>{t.lang === "es" ? "Resultados reales" : "Real results"}</p>
          <h2 className="iv-title iv-fade" style={{ marginBottom: "0.75rem" }}>
            {t.lang === "es" ? "MÁS DE 5 CLÍNICAS YA CONFÍAN EN INTELLIVET" : "5+ CLINICS ALREADY TRUST INTELLIVET"}
          </h2>
          <p className="iv-body iv-fade" style={{ marginBottom: "3rem" }}>{t.socialProof.sub}</p>
        </div>
        {/* Full-bleed carousel */}
        <div className="iv-fade" style={{ paddingBottom: "0.5rem" }}>
          <ReviewCarousel />
        </div>
        <div className="iv-wrap" style={{ marginTop: "3rem" }}>
          <div className="iv-fade">
            <CTABlock showBuy={false} showScarcity={true} />
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: DEMO ══ */}
      <section id="demo" className="iv-sec" style={{ background: "var(--iv-gray)" }}>
        <div className="iv-wrap">
          <p className="iv-label iv-fade" style={{ marginBottom: "1rem" }}>{t.lang === "es" ? "Cómo funciona" : "How it works"}</p>
          <h2 className="iv-title iv-fade" style={{ marginBottom: "3rem" }}>{t.demo.title}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* WhatsApp */}
            <div className="iv-fade" style={{ background: "#fff", border: "1.5px solid var(--iv-border)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ background: "var(--iv-green)", padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <WAIcon size={20} />
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", color: "#fff", letterSpacing: "0.04em" }}>{t.demo.whatsapp.label}</span>
              </div>
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663411960285/QQumH4UaJLUGXTrd4Ai5Bj/whatsapp_mockup-mPiw65Zms66Agxp5GyY4UH.webp" alt="WhatsApp demo" style={{ width: "100%", maxHeight: "400px", objectFit: "cover", objectPosition: "top" }} loading="lazy" />
              <p className="iv-body" style={{ padding: "1.25rem" }}>{t.demo.whatsapp.description}</p>
            </div>
            {/* Phone */}
            <div className="iv-fade" style={{ background: "#fff", border: "1.5px solid var(--iv-border)", borderRadius: "4px", padding: "2rem", transitionDelay: "80ms" }}>
              <div style={{ background: "#111", borderRadius: "8px", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--iv-green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "1.5rem" }}>📞</span>
                </div>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", color: "#fff", letterSpacing: "0.04em", textAlign: "center" }}>
                  {t.lang === "es" ? "LLAMADA ENTRANTE — 23:14" : "INCOMING CALL — 23:14"}
                </p>
                <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
                  {t.lang === "es" ? "IntelliVet responde automáticamente" : "IntelliVet answers automatically"}
                </p>
                <div style={{ background: "var(--iv-wa)", borderRadius: "20px", padding: "0.5rem 1.5rem", fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>
                  {t.lang === "es" ? "Atendida ✓" : "Answered ✓"}
                </div>
              </div>
              <p className="iv-body">{t.demo.phone.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 6: ROI ══ */}
      <section id="roi" className="iv-sec" style={{ background: "#0A0A0A" }}>
        <div className="iv-wrap">
          <p className="iv-fade" style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1rem" }}>
            {t.lang === "es" ? "Calculadora de pérdidas" : "Loss calculator"}
          </p>
          <h2 className="iv-title iv-fade" style={{ color: "#fff", marginBottom: "3rem" }}>{t.roi.title}</h2>
          <ROICalc />
          <div className="iv-fade" style={{ marginTop: "3rem" }}>
            <CTABlock showBuy={false} showScarcity={false} />
          </div>
        </div>
      </section>

      {/* ══ SECTION 7: BEFORE/AFTER ══ */}
      <section id="before-after" className="iv-sec" style={{ background: "#fff" }}>
        <div className="iv-wrap">
          <p className="iv-label iv-fade" style={{ marginBottom: "1rem" }}>{t.lang === "es" ? "El cambio" : "The change"}</p>
          <h2 className="iv-title iv-fade" style={{ marginBottom: "3rem" }}>{t.beforeAfter.title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--iv-red)" }}>{t.beforeAfter.before}</p>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--iv-green)" }}>{t.beforeAfter.after}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "3rem" }}>
            {t.beforeAfter.items.map((item, i) => (
              <div key={i} className="iv-fade" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", transitionDelay: `${i * 50}ms` }}>
                <div className="iv-ba-before"><p className="iv-body">{item.before}</p></div>
                <div className="iv-ba-after"><p className="iv-body">{item.after}</p></div>
              </div>
            ))}
          </div>
          <div className="iv-fade" style={{ borderLeft: "5px solid var(--iv-green)", paddingLeft: "1.5rem" }}>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontStyle: "italic", fontSize: "clamp(1.1rem, 4.5vw, 1.4rem)", color: "var(--iv-black)", lineHeight: 1.5 }}>
              {t.beforeAfter.closing}
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 8: FOR WHO ══ */}
      <section id="for-who" className="iv-sec" style={{ background: "var(--iv-gray)" }}>
        <div className="iv-wrap">
          <p className="iv-label iv-fade" style={{ marginBottom: "1rem" }}>{t.lang === "es" ? "¿Para quién es?" : "Who is it for?"}</p>
          <h2 className="iv-title iv-fade" style={{ marginBottom: "3rem" }}>{t.forWho.title}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="iv-fade" style={{ background: "#fff", borderTop: "5px solid var(--iv-green)", borderRadius: "3px", padding: "1.75rem" }}>
              <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--iv-green)", marginBottom: "1.25rem" }}>{t.forWho.forLabel}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {t.forWho.forItems.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span style={{ color: "var(--iv-green)", fontWeight: 700, fontSize: "1.1rem", flexShrink: 0, lineHeight: 1.4 }}>✓</span>
                    <span className="iv-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="iv-fade" style={{ background: "#fff", borderTop: "5px solid #ccc", borderRadius: "3px", padding: "1.75rem", transitionDelay: "60ms" }}>
              <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: "1.25rem" }}>{t.forWho.notForLabel}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {t.forWho.notForItems.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span style={{ color: "#aaa", fontWeight: 700, fontSize: "1.1rem", flexShrink: 0, lineHeight: 1.4 }}>✗</span>
                    <span className="iv-body" style={{ color: "#888" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="iv-fade" style={{ marginTop: "3rem" }}>
            <CTABlock showBuy={false} showScarcity={false} />
          </div>
        </div>
      </section>

      {/* ══ SECTION 9: PRICING ══ */}
      <section id="pricing" className="iv-sec" style={{ background: "#fff" }}>
        <div className="iv-wrap">
          <p className="iv-label iv-fade" style={{ marginBottom: "1rem" }}>{t.lang === "es" ? "Precios" : "Pricing"}</p>
          <h2 className="iv-title iv-fade" style={{ marginBottom: "1rem" }}>{t.pricing.title}</h2>
          <div className="iv-fade iv-scarcity" style={{ marginBottom: "3rem" }}>⚠ {t.pricing.urgency}</div>

          {/* Bundle */}
          <div className="iv-fade" style={{ border: "3px solid var(--iv-green)", borderRadius: "6px", overflow: "hidden", marginBottom: "1.5rem", boxShadow: "0 8px 32px rgba(26,92,58,0.1)" }}>
            <div style={{ background: "var(--iv-green)", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.1rem, 5vw, 1.5rem)", color: "#fff", letterSpacing: "0.06em" }}>{t.pricing.bundle.badge}</span>
              <span style={{ background: "var(--iv-amber)", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.06em", padding: "0.2rem 0.6rem", borderRadius: "2px" }}>−60%</span>
            </div>
            <div style={{ padding: "2rem" }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 8vw, 3rem)", color: "var(--iv-black)", letterSpacing: "0.02em", marginBottom: "1.5rem" }}>{t.pricing.bundle.name}</h3>
              <div style={{ marginBottom: "0.75rem" }}>
                <span className="iv-strike">{t.pricing.bundle.setupOriginal}</span>
                <div className="iv-price">{t.pricing.bundle.setupPrice} <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 500, fontSize: "1rem", color: "#888", verticalAlign: "middle" }}>setup</span></div>
              </div>
              <div style={{ marginBottom: "2rem" }}>
                <span className="iv-strike" style={{ fontSize: "1rem" }}>{t.pricing.bundle.retainerOriginal}</span>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 8vw, 3rem)", color: "var(--iv-green)", lineHeight: 1 }}>{t.pricing.bundle.retainerPrice}</div>
                <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "0.9rem", color: "#888", marginTop: "0.25rem" }}>{t.pricing.bundle.voiceNote}</p>
              </div>
              <div style={{ background: "#F0FFF4", border: "1.5px solid #4CAF78", borderRadius: "3px", padding: "1.25rem", marginBottom: "2rem", display: "flex", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>🎁</span>
                <div>
                  <p className="iv-body-b" style={{ color: "var(--iv-green)", marginBottom: "0.3rem" }}>{t.pricing.bundle.gift}</p>
                  <p className="iv-body" style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>{t.pricing.bundle.giftNote}</p>
                </div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {t.pricing.bundle.includes.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span style={{ color: "var(--iv-green)", fontWeight: 700, fontSize: "1.1rem", flexShrink: 0, lineHeight: 1.4 }}>✓</span>
                    <span className="iv-body">{item}</span>
                  </li>
                ))}
              </ul>
              <CTABlock showBuy={true} showScarcity={true} />
            </div>
          </div>

          {/* Chat Only */}
          <div className="iv-fade" style={{ border: "1.5px solid var(--iv-border)", borderRadius: "4px", overflow: "hidden", transitionDelay: "80ms" }}>
            <div style={{ background: "var(--iv-gray)", padding: "0.75rem 1.5rem", borderBottom: "1px solid var(--iv-border)" }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", letterSpacing: "0.06em", color: "#888" }}>{t.pricing.chatOnly.badge}</span>
            </div>
            <div style={{ padding: "1.75rem" }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 7vw, 2.5rem)", color: "var(--iv-black)", letterSpacing: "0.02em", marginBottom: "1.25rem" }}>{t.pricing.chatOnly.name}</h3>
              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                <div>
                  <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: "0.2rem" }}>Setup</p>
                  <span className="iv-strike" style={{ fontSize: "0.9rem" }}>{t.pricing.chatOnly.setupOriginal}</span>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 7vw, 2.5rem)", color: "var(--iv-black)", lineHeight: 1 }}>{t.pricing.chatOnly.setupPrice}</div>
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: "0.2rem" }}>{t.lang === "es" ? "Mensual" : "Monthly"}</p>
                  <span className="iv-strike" style={{ fontSize: "0.9rem" }}>{t.pricing.chatOnly.retainerOriginal}</span>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 7vw, 2.5rem)", color: "var(--iv-black)", lineHeight: 1 }}>{t.pricing.chatOnly.retainerPrice}</div>
                </div>
              </div>
              <p className="iv-body" style={{ fontStyle: "italic", marginBottom: "1.5rem" }}>{t.pricing.chatOnly.note}</p>
              <a href={`https://wa.me/${WA}?text=Chat%20Only`} target="_blank" rel="noopener noreferrer" className="iv-btn-call">{t.pricing.chatOnly.cta}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 10: GUARANTEE ══ */}
      <section style={{ background: "var(--iv-gray)", padding: "4rem 0" }}>
        <div className="iv-wrap">
          <div className="iv-fade iv-guarantee">
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem" }}>
              <span style={{ fontSize: "2.5rem", flexShrink: 0 }}>🛡️</span>
              <div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.8rem, 7vw, 3rem)", color: "var(--iv-green)", letterSpacing: "0.02em", marginBottom: "0.75rem" }}>{t.guarantee.title}</h3>
                <p className="iv-body-b" style={{ marginBottom: "0.75rem" }}>{t.guarantee.body}</p>
                <p className="iv-body" style={{ fontStyle: "italic", fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>{t.guarantee.limit}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 11: OBJECTIONS ══ */}
      <section id="objections" className="iv-sec" style={{ background: "#0A0A0A" }}>
        <div className="iv-wrap">
          <p className="iv-fade" style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1rem" }}>
            {t.lang === "es" ? "Tranquilidad" : "Peace of mind"}
          </p>
          <h2 className="iv-title iv-fade" style={{ color: "#fff", marginBottom: "0.75rem" }}>{t.objections.title}</h2>
          <p className="iv-body iv-fade" style={{ color: "rgba(255,255,255,0.55)", marginBottom: "3rem", maxWidth: "520px" }}>{t.objections.subtitle}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {t.objections.items.map((item, i) => (
              <div key={i} className="iv-fade" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "3px", padding: "1.5rem", transitionDelay: `${i * 50}ms` }}>
                <p className="iv-body-b" style={{ color: "var(--iv-wa)", marginBottom: "0.5rem" }}>{item.q}</p>
                <p className="iv-body" style={{ color: "rgba(255,255,255,0.65)" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 12: STEPS ══ */}
      <section id="steps" className="iv-sec" style={{ background: "#fff" }}>
        <div className="iv-wrap">
          <p className="iv-label iv-fade" style={{ marginBottom: "1rem" }}>{t.lang === "es" ? "El proceso" : "The process"}</p>
          <h2 className="iv-title iv-fade" style={{ marginBottom: "3rem" }}>{t.steps.title}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {t.steps.items.map((step, i) => (
              <div key={i} className="iv-fade" style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", paddingBottom: i < t.steps.items.length - 1 ? "2.5rem" : "0", transitionDelay: `${i * 80}ms` }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--iv-green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", color: "#fff", letterSpacing: "0.02em" }}>{step.num}</span>
                  </div>
                  {i < t.steps.items.length - 1 && <div style={{ width: 2, flex: 1, minHeight: "2rem", background: "var(--iv-border)", marginTop: "0.5rem" }} />}
                </div>
                <div style={{ paddingTop: "1rem" }}>
                  <p className="iv-body-b" style={{ marginBottom: "0.4rem" }}>{step.title}</p>
                  <p className="iv-body">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 13: FAQ ══ */}
      <section id="faq" className="iv-sec" style={{ background: "var(--iv-gray)" }}>
        <div className="iv-wrap">
          <p className="iv-label iv-fade" style={{ marginBottom: "1rem" }}>FAQ</p>
          <h2 className="iv-title iv-fade" style={{ marginBottom: "2.5rem" }}>{t.faq.title}</h2>
          <div className="iv-fade" style={{ maxWidth: "720px" }}>
            {t.faq.items.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* ══ SECTION 14: CLOSING ══ */}
      <section id="closing" className="iv-sec" style={{ background: "#0A0A0A" }}>
        <div className="iv-wrap">
          <p className="iv-fade" style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1rem" }}>
            {t.lang === "es" ? "Última oportunidad" : "Last chance"}
          </p>
          <h2 className="iv-display iv-fade" style={{ color: "#fff", marginBottom: "1.5rem" }}>{t.closing.headline}</h2>
          <p className="iv-body iv-fade" style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1.25rem" }}>{t.closing.body}</p>
          <div className="iv-fade iv-scarcity" style={{ background: "rgba(245,166,35,0.12)", border: "1.5px solid rgba(245,166,35,0.4)", color: "#FFD580", marginBottom: "2.5rem" }}>
            ⚠ {t.closing.urgency}
          </div>
          <div className="iv-fade">
            <CTABlock showBuy={true} showScarcity={false} />
          </div>
        </div>
      </section>

      {/* Spacer so last section isn't hidden behind fixed bottom bar */}
      <div className="iv-bottom-spacer" aria-hidden="true" />

      {/* ── FOOTER ── */}
      <footer style={{ background: "#050505", padding: "2rem 0", textAlign: "center" }}>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.25)" }}>
          © 2025 IntelliVet. Todos los derechos reservados.
        </p>
      </footer>

      {/* ── FIXED BOTTOM BAR ── */}
      {/* Always visible while scrolling — red bg, WhatsApp CTA */}
      <div className="iv-bottom-bar">
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
          <WAIcon size={22} />
          {t.lang === "es" ? "CONTÁCTANOS AHORA" : "CONTACT US NOW"}
        </a>
      </div>
    </div>
  );
}

/* ── ROI CALCULATOR (inline component) ── */
function ROICalc() {
  const { t } = useLang();
  const [missed, setMissed] = useState(2);
  const [value, setValue] = useState(100);
  const loss = missed * value * 4;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Result first — massive */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.5rem" }}>
          {t.roi.resultLabel}
        </p>
        <div className="iv-roi-num">${loss.toLocaleString()}</div>
        <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 4vw, 1.2rem)", color: "rgba(255,255,255,0.5)", marginTop: "0.25rem" }}>
          {t.roi.resultSuffix}
        </p>
      </div>
      {/* Sliders */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <label style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 600, fontSize: "clamp(1rem, 4vw, 1.1rem)", color: "rgba(255,255,255,0.7)" }}>{t.roi.lostLabel}</label>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.75rem", color: "#fff" }}>{missed}</span>
          </div>
          <input type="range" min={1} max={10} value={missed} onChange={e => setMissed(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--iv-wa)", cursor: "pointer" }} />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <label style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 600, fontSize: "clamp(1rem, 4vw, 1.1rem)", color: "rgba(255,255,255,0.7)" }}>{t.roi.valueLabel}</label>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.75rem", color: "#fff" }}>${value}</span>
          </div>
          <input type="range" min={30} max={300} step={10} value={value} onChange={e => setValue(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--iv-wa)", cursor: "pointer" }} />
        </div>
      </div>
      <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "clamp(1rem, 4vw, 1.1rem)", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
        {t.roi.conclusion}
      </p>
    </div>
  );
}
