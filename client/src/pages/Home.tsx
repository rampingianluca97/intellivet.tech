// IntelliVet Landing v5
// Changes from v4:
// 1. EVERYTHING uppercase (text-transform: uppercase on all body/display text)
// 2. Language switch with flag emojis (🇪🇸 ES / 🇬🇧 EN)
// 3. Removed social proof badge from hero
// 4. Ticker + countdown moved to top as extension of red bar; WhatsApp bubble fixed bottom-right
// 5. Subheadline in Bebas Neue uppercase, large, like banner font
// 6. CTA block: full-width no white margins, veterinary green/blue colors, Mentecatti-style card

import { useEffect, useState, useRef } from "react";
import { useLang } from "@/contexts/LanguageContext";

/* ── EXIT / SCROLL / TIMER POPUP ── */
function LeadPopup() {
  const { t } = useLang();
  const isEs = t.lang === "es";
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const shown = useRef(false);

  // Popup countdown: 48h from first show
  const [popSecs, setPopSecs] = useState(48 * 3600);
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setPopSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [visible]);
  const ph = String(Math.floor(popSecs / 3600)).padStart(2, "0");
  const pm = String(Math.floor((popSecs % 3600) / 60)).padStart(2, "0");
  const ps = String(popSecs % 60).padStart(2, "0");

  const show = () => {
    if (shown.current) return;
    shown.current = true;
    setVisible(true);
  };

  useEffect(() => {
    // Already shown this session?
    if (sessionStorage.getItem("iv_popup_shown")) { shown.current = true; return; }

    // Trigger 1: 60 seconds timer
    const timer = setTimeout(show, 60000);

    // Trigger 2: scroll to ~50% of page
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total >= 0.5) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Trigger 3: exit intent (mouse leaves viewport upward)
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) show();
    };
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const close = () => {
    setVisible(false);
    sessionStorage.setItem("iv_popup_shown", "1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    setSubmitted(true);
    sessionStorage.setItem("iv_popup_shown", "1");
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
        backdropFilter: "blur(4px)",
        animation: "iv-popup-in 280ms cubic-bezier(0.23,1,0.32,1)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <style>{`
        @keyframes iv-popup-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes iv-popup-card-in {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div
        style={{
          background: "linear-gradient(160deg, #0D3B2E 0%, #1A5C3A 60%, #0A2A1F 100%)",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "440px",
          padding: "2.5rem 2rem",
          position: "relative",
          animation: "iv-popup-card-in 300ms cubic-bezier(0.23,1,0.32,1)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close button */}
        <button
          onClick={close}
          style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", fontFamily: "'Bebas Neue', sans-serif" }}
          aria-label="Cerrar"
        >
          ×
        </button>

        {!submitted ? (
          <>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "#FFE600", color: "#000", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(0.85rem, 3.5vw, 1rem)", letterSpacing: "0.08em", padding: "0.3rem 0.875rem", borderRadius: "3px", marginBottom: "1.25rem" }}>
              {isEs ? "OFERTA EXCLUSIVA" : "EXCLUSIVE OFFER"}
            </div>

            {/* Headline */}
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 9vw, 3rem)", color: "#fff", lineHeight: 1.0, marginBottom: "0.5rem", letterSpacing: "0.02em" }}>
              {isEs ? "ESPERA — ANTES DE IRTE" : "WAIT — BEFORE YOU LEAVE"}
            </h3>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 7vw, 2.2rem)", color: "#7DEFA8", lineHeight: 1.0, marginBottom: "1.25rem" }}>
              {isEs ? "15% DE DESCUENTO ADICIONAL" : "EXTRA 15% DISCOUNT"}
            </p>

            {/* Body */}
            <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)", color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              {isEs
                ? "Deja tu email y te enviamos un código de descuento adicional del 15% válido por 48 horas."
                : "Leave your email and we'll send you an extra 15% discount code valid for 48 hours."}
            </p>

            {/* Countdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>
                {isEs ? "Válido por:" : "Valid for:"}
              </span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", color: "#FFE600", background: "rgba(0,0,0,0.3)", padding: "0.1rem 0.5rem", borderRadius: "2px", letterSpacing: "0.1em" }}>
                {ph}:{pm}:{ps}
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={isEs ? "Tu nombre" : "Your name"}
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  borderRadius: "4px",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontFamily: "Georgia, serif",
                  fontSize: "1rem",
                  outline: "none",
                }}
              />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={isEs ? "tu@email.com" : "your@email.com"}
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  borderRadius: "4px",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontFamily: "Georgia, serif",
                  fontSize: "1rem",
                  outline: "none",
                }}
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder={isEs ? "Tu teléfono (ej. +502 5363 8941)" : "Your phone (e.g. +502 5363 8941)"}
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  borderRadius: "4px",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontFamily: "Georgia, serif",
                  fontSize: "1rem",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  background: "linear-gradient(180deg, #2ECC71 0%, #27AE60 100%)",
                  color: "#fff",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.1rem, 5vw, 1.4rem)",
                  letterSpacing: "0.06em",
                  padding: "1rem",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(46,204,113,0.4)",
                }}
              >
                {isEs ? "QUIERO MI 15% DE DESCUENTO" : "GET MY 15% DISCOUNT"}
              </button>
            </form>

            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", textAlign: "center", marginTop: "0.875rem" }}>
              {isEs ? "Sin spam. Solo tu código de descuento." : "No spam. Just your discount code."}
            </p>
          </>
        ) : (
          /* Success state */
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)", color: "#7DEFA8", lineHeight: 1.0, marginBottom: "0.75rem" }}>
              {isEs ? "¡LISTO!" : "DONE!"}
            </h3>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1rem, 4vw, 1.2rem)", color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              {isEs
                ? `Gracias, ${name}. Te enviamos el código al ${email}. Válido por 48 horas.`
                : `Thanks, ${name}. We sent the code to ${email}. Valid for 48 hours.`}
            </p>
            <button
              onClick={close}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "0.06em", color: "rgba(255,255,255,0.6)", background: "none", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "4px", padding: "0.6rem 1.5rem", cursor: "pointer" }}
            >
              {isEs ? "CERRAR" : "CLOSE"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const WA = "50253638941"; // +502 5363 8941
const WA_LINK = `https://wa.me/${WA}?text=Hola%2C%20quiero%20una%20demo%20de%20IntelliVet`;
const CALL_LINK = "tel:+50253638941"; // +502 5363 8941

/* ── COUNTDOWN ── */
function useCountdown() {
  const [secs, setSecs] = useState(() => {
    // Always reset to 24h fresh — clear any old stored value
    localStorage.removeItem("iv_end");
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

/* ── SCROLL REVEAL ── */
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

/* ── BEBAS STYLE ── */
const BB: React.CSSProperties = {
  fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

/* ══════════════════════════════════════════
   UNIFIED CTA CARD — v2
   Single font system: Bebas Neue display, Georgia body
   Full-width, dark green gradient, no white margins
   ══════════════════════════════════════════ */
function CTACard({ showBuy = false, showScarcity = false }: { showBuy?: boolean; showScarcity?: boolean }) {
  const { t } = useLang();
  const isEs = t.lang === "es";

  /* Shared button style — ALL THREE identical size */
  const btnBase: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    width: "100%",
    padding: "1.1rem 1.5rem",
    borderRadius: "6px",
    textDecoration: "none",
    border: "none",
    fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
    fontSize: "clamp(1.2rem, 5.5vw, 1.6rem)",
    letterSpacing: "0.06em",
    lineHeight: 1,
    cursor: "pointer",
    transition: "opacity 150ms",
  };

  return (
    <div style={{
      background: "linear-gradient(160deg, #0D3B2E 0%, #1A5C3A 60%, #0A2A1F 100%)",
      width: "100%",
      padding: "3rem 1.5rem",
    }}>
      <div className="iv-ctacard-wrap" style={{ maxWidth: "480px", margin: "0 auto" }}>

        {/* ── TOP: badges + plan name + savings (full width on desktop) ── */}
        <div className="iv-ctacard-top">
        {/* ── TOP BADGES — max size before wrapping ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", marginBottom: "1.5rem", flexWrap: "nowrap", width: "100%" }}>
          <span style={{ background: "#FFE600", color: "#000", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1rem, 4.6vw, 1.5rem)", letterSpacing: "0.04em", padding: "0.45rem 0.875rem", borderRadius: "3px", whiteSpace: "nowrap", flex: "1", textAlign: "center" }}>
            60% DESCUENTO
          </span>
          <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1rem, 4.6vw, 1.5rem)", letterSpacing: "0.04em", padding: "0.45rem 0.875rem", borderRadius: "3px", whiteSpace: "nowrap", flex: "1", textAlign: "center" }}>
            {isEs ? "OFERTA ESPECIAL" : "SPECIAL OFFER"}
          </span>
        </div>

        {/* ── PLAN NAME ── */}
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 14vw, 5.5rem)", color: "#fff", textAlign: "center", lineHeight: 0.95, marginBottom: "1rem", letterSpacing: "0.02em" }}>
          {isEs ? "BUNDLE COMPLETO" : "COMPLETE BUNDLE"}
        </p>

        {/* ── SAVINGS PILL ── */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span style={{ background: "#FFE600", color: "#000", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem, 5.5vw, 1.6rem)", letterSpacing: "0.06em", padding: "0.5rem 1.5rem", borderRadius: "30px" }}>
            {isEs ? "AHORRAS $1,350 HOY" : "YOU SAVE $1,350 TODAY"}
          </span>
        </div>

        </div>{/* end iv-ctacard-top */}
        {/* ── COLUMNS: prices left, checklist right ── */}
        <div className="iv-ctacard-cols">
        <div className="iv-ctacard-prices">
        {/* ── SETUP PRICE ── */}
        <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.6rem, 7vw, 2.5rem)", color: "#FFE600", textDecoration: "line-through", textDecorationColor: "#CC0000", textDecorationThickness: "3px", letterSpacing: "0.04em" }}>
            $2,250
          </span>
        </div>
        <div style={{ textAlign: "center", marginBottom: "0.25rem" }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(5.5rem, 24vw, 10rem)", color: "#7DEFA8", lineHeight: 0.88, letterSpacing: "0.01em" }}>$900</span>
        </div>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem, 5.5vw, 1.8rem)", color: "rgba(255,255,255,0.9)", textAlign: "center", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
          {isEs ? "PAGO ÚNICO DE SETUP" : "ONE-TIME SETUP"}
        </p>

        {/* ── THEN label — replaces divider, clarifies sequence ── */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1rem, 4.5vw, 1.4rem)", color: "#fff", letterSpacing: "0.2em", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)", padding: "0.3rem 1.25rem", borderRadius: "30px" }}>
            {isEs ? "+ LUEGO" : "+ THEN"}
          </span>
        </div>

        {/* ── MONTHLY PRICE ── */}
        <div style={{ textAlign: "center", marginBottom: "0.25rem" }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem, 5.5vw, 1.8rem)", color: "#FFE600", textDecoration: "line-through", textDecorationColor: "#CC0000", textDecorationThickness: "3px", letterSpacing: "0.04em" }}>
            $750/{isEs ? "MES" : "MO"}
          </span>
        </div>
        <div style={{ textAlign: "center", marginBottom: "0.25rem" }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 11vw, 4.5rem)", color: "#7DEFA8", lineHeight: 0.95, letterSpacing: "0.01em" }}>$300/{isEs ? "MES" : "MO"}</span>
        </div>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1rem, 4.5vw, 1.3rem)", color: "rgba(255,255,255,0.9)", textAlign: "center", letterSpacing: "0.1em", marginBottom: "2.5rem" }}>
          {isEs ? "MENSUAL — CANCELA CUANDO QUIERAS" : "MONTHLY — CANCEL ANYTIME"}
        </p>

        {/* ── GIFT BOX ── */}
        <div style={{ background: "rgba(255,230,0,0.1)", border: "2px solid rgba(255,230,0,0.5)", borderRadius: "6px", padding: "1.5rem", marginBottom: "2rem", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎁</div>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 7vw, 2.2rem)", color: "#FFE600", lineHeight: 1.1, letterSpacing: "0.04em" }}>
            {isEs ? "WEBSITE PROFESIONAL + SEO" : "PROFESSIONAL WEBSITE + SEO"}
          </p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem, 5.5vw, 1.6rem)", color: "rgba(255,230,0,0.75)", letterSpacing: "0.06em", marginTop: "0.35rem" }}>
            {isEs ? "VALOR $800 — INCLUIDO GRATIS" : "VALUE $800 — INCLUDED FREE"}
          </p>
        </div>

        </div>{/* end iv-ctacard-prices */}
        <div className="iv-ctacard-checklist">
        {/* ── INCLUDES CHECKLIST ── */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {t.pricing.bundle.includes.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1rem" }}>
              <span style={{ width: 34, height: 34, borderRadius: "50%", background: "#4CAF78", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", color: "#fff" }}>✓</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem, 5.5vw, 1.6rem)", color: "#fff", letterSpacing: "0.04em", lineHeight: 1.2 }}>{item.toUpperCase()}</span>
            </li>
          ))}
        </ul>

        {/* ── GUARANTEE duplicate for desktop right column ── */}
        <div className="iv-guarantee-desktop-copy" style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <span style={{ fontSize: "2rem", flexShrink: 0, lineHeight: 1 }}>🛡️</span>
            <div>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 7vw, 2.2rem)", color: "#FFE600", letterSpacing: "0.04em", lineHeight: 1, marginBottom: "0.75rem" }}>
                {isEs ? "GARANTÍA DE 15 DÍAS" : "15-DAY GUARANTEE"}
              </p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.3rem, 6vw, 1.8rem)", color: "#fff", lineHeight: 1.2, marginBottom: "0.875rem", letterSpacing: "0.04em" }}>
                {isEs ? "SI EN 15 DÍAS NO VES RESULTADOS CONCRETOS EN TU CLÍNICA, TE DEVOLVEMOS EL SETUP — SIN PREGUNTAS." : "IF IN 15 DAYS YOU DON'T SEE CONCRETE RESULTS, WE REFUND THE SETUP — NO QUESTIONS ASKED."}
              </p>
              <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(0.9rem, 3.5vw, 1.05rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, fontStyle: "italic" }}>
                {isEs ? "La garantía aplica hasta las primeras 50 llamadas gestionadas por el voice agent o los primeros 30 días del chatbot." : "Guarantee applies to the first 50 calls handled by the voice agent or the first 30 days of the chatbot."}
              </p>
            </div>
          </div>
        </div>
        </div>{/* end iv-ctacard-checklist */}
        </div>{/* end iv-ctacard-cols */}
        {/* ── BOTTOM: buttons + guarantee (full width on desktop) ── */}
        <div className="iv-ctacard-bottom">
        {/* ── BUTTONS — ALL IDENTICAL SIZE ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {/* WhatsApp */}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ ...btnBase, background: "linear-gradient(180deg, #2ECC71 0%, #27AE60 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(46,204,113,0.45)" }}>
            <WAIcon size={24} />
            {t.cta.whatsapp.toUpperCase()}
          </a>

          {/* Call — same size, white outline, phone icon white SVG */}
          <a href={CALL_LINK} style={{ ...btnBase, background: "transparent", border: "2.5px solid rgba(255,255,255,0.55)", color: "#fff" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            {t.cta.call.toUpperCase()}
          </a>

          {/* Buy now — same size, amber */}
          {showBuy && (
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ ...btnBase, background: "linear-gradient(180deg, #F5A623 0%, #E09010 100%)", color: "#000", boxShadow: "0 4px 16px rgba(245,166,35,0.35)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="black" aria-hidden="true"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.45 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
              {t.cta.buy.toUpperCase()}
            </a>
          )}
        </div>

        {/* ── GUARANTEE — always visible inside the card, below buttons ── */}
        <div className="iv-guarantee-block" style={{ marginTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <span style={{ fontSize: "2rem", flexShrink: 0, lineHeight: 1 }}>🛡️</span>
            <div>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 7vw, 2.2rem)", color: "#FFE600", letterSpacing: "0.04em", lineHeight: 1, marginBottom: "0.75rem" }}>
                {isEs ? "GARANTÍA DE 15 DÍAS" : "15-DAY GUARANTEE"}
              </p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.3rem, 6vw, 1.8rem)", color: "#fff", lineHeight: 1.2, marginBottom: "0.875rem", letterSpacing: "0.04em" }}>
                {isEs
                  ? "SI EN 15 DÍAS NO VES RESULTADOS CONCRETOS EN TU CLÍNICA, TE DEVOLVEMOS EL SETUP — SIN PREGUNTAS."
                  : "IF IN 15 DAYS YOU DON'T SEE CONCRETE RESULTS, WE REFUND THE SETUP — NO QUESTIONS ASKED."}
              </p>
                <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(0.9rem, 3.5vw, 1.05rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, fontStyle: "italic" }}>
                {isEs
                  ? "La garantía aplica hasta las primeras 50 llamadas gestionadas por el voice agent o los primeros 30 días del chatbot."
                  : "Guarantee applies to the first 50 calls handled by the voice agent or the first 30 days of the chatbot."}
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

/* ── TICKER ── */
function Ticker() {
  const { t } = useLang();
  const countdown = useCountdown();
  const regularItems = [
    "OFERTA ESPECIAL",
    "60% DESCUENTO",
    "SOLO 3 LUGARES ESTE MES",
    "INTELLIVET",
  ];
  // Build the track: regular items interspersed with the highlighted timer (with label)
  const buildTrack = () => {
    const track: { text: string; highlight: boolean }[] = [];
    regularItems.forEach(item => {
      track.push({ text: item, highlight: false });
      track.push({ text: `TERMINA EN: ${countdown}`, highlight: true });
    });
    return track;
  };
  const single = buildTrack();
  const all = [...single, ...single]; // duplicate for seamless loop

  return (
    <div style={{ background: "#CC0000", overflow: "hidden", padding: "0.85rem 0", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, pointerEvents: "none" }}>
      <div style={{ display: "flex", width: "max-content", animation: "iv-ticker 18s linear infinite", willChange: "transform" }}>
        {all.map((item, i) => (
          <span key={i} style={{ ...BB, fontSize: "clamp(1.4rem, 6vw, 2rem)", color: item.highlight ? "#000" : "#fff", background: item.highlight ? "#FFE600" : "transparent", whiteSpace: "nowrap", padding: item.highlight ? "0.1em 0.6em" : "0 3rem", margin: item.highlight ? "0 1.5rem" : "0", borderRadius: item.highlight ? "2px" : "0", display: "flex", alignItems: "center", gap: "2rem", lineHeight: 1 }}>
            {item.text}
            {!item.highlight && <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.5)", display: "inline-block", flexShrink: 0 }} />}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── REVIEW CAROUSEL ── */
function ReviewCarousel() {
  const { t } = useLang();
  const doubled = [...t.socialProof.reviews, ...t.socialProof.reviews];
  return (
    <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)", maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)", pointerEvents: "none" }}>
      <div style={{ display: "flex", gap: "1.25rem", animation: "iv-carousel 40s linear infinite", willChange: "transform", width: "max-content" }}>
        {doubled.map((r, i) => (
          <div key={i} style={{ background: "#fff", border: "1.5px solid var(--iv-border)", borderTop: `5px solid ${r.color}`, borderRadius: "4px", padding: "1.5rem", width: 320, flexShrink: 0 }}>
            {/* Stars */}
            <div style={{ color: "var(--iv-amber)", fontSize: "1.3rem", marginBottom: "0.75rem" }}>★★★★★</div>
            {/* Review text — Georgia italic, readable */}
            <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1rem, 4.5vw, 1.2rem)", color: "#222", lineHeight: 1.6, marginBottom: "1rem", fontStyle: "italic" }}>"{r.text}"</p>
            {/* Result badge */}
            <div style={{ background: "#F0FFF4", border: `1.5px solid ${r.color}`, borderRadius: "3px", padding: "0.4rem 0.75rem", marginBottom: "1rem", display: "inline-block" }}>
              <span style={{ ...BB, fontSize: "clamp(0.9rem, 4vw, 1.1rem)", color: r.color }}>↑ {r.result.toUpperCase()}</span>
            </div>
            {/* Author */}
            <p style={{ ...BB, fontSize: "clamp(1rem, 4.5vw, 1.2rem)", color: "#111" }}>{r.name.toUpperCase()}</p>
            <p style={{ ...BB, fontSize: "clamp(0.85rem, 3.5vw, 1rem)", color: "#888", marginTop: "0.15rem" }}>{r.clinic.toUpperCase()} — {r.city.toUpperCase()}</p>
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
      <button onClick={() => setOpen(v => !v)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", padding: "1.5rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ ...BB, fontSize: "clamp(1.2rem, 5.5vw, 1.6rem)", color: "var(--iv-black)", flex: 1, lineHeight: 1.2 }}>{q.toUpperCase()}</span>
        <span style={{ ...BB, fontSize: "1.75rem", color: "var(--iv-green)", flexShrink: 0, transition: "transform 200ms", transform: open ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block" }}>+</span>
      </button>
      <div style={{ overflow: "hidden", maxHeight: open ? "500px" : "0", transition: "max-height 220ms cubic-bezier(0.23,1,0.32,1)" }}>
        <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1rem, 4.5vw, 1.25rem)", color: "#444", lineHeight: 1.65, paddingBottom: "1.5rem" }}>{a}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   HOME
   ══════════════════════════════════════════ */
export default function Home() {
  const { t, toggleLang, lang } = useLang();
  const isEs = lang === "es";
  useReveal();

  return (
    <div style={{ background: "var(--iv-white)", overflowX: "hidden" }}>

      {/* ── TICKER (fixed top) ── */}
      <Ticker />

      {/* Spacer for ticker only */}
      <div style={{ height: "3.5rem" }} aria-hidden="true" />

      {/* ── NAVBAR ── */}
      <nav style={{ background: "#fff", borderBottom: "1.5px solid var(--iv-border)", padding: "1rem 0", position: "sticky", top: "3.5rem", zIndex: 100 }}>
        <div className="iv-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img src="/logo.png" alt="IntelliVet logo" style={{ height: 36, width: "auto", objectFit: "contain" }} />
            <span style={{ ...BB, fontSize: "1.75rem", color: "var(--iv-black)", lineHeight: 1 }}>INTELLIVET</span>
          </div>
          {/* Language switch with flags */}
          <button onClick={toggleLang} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--iv-green)", background: "#F0FFF4", border: "1.5px solid #4CAF78", borderRadius: "3px", padding: "0.45rem 0.875rem", cursor: "pointer", textTransform: "uppercase" }}>
            {lang === "es" ? (
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <svg width="20" height="14" viewBox="0 0 60 40" aria-hidden="true" style={{ flexShrink: 0, borderRadius: "2px" }}>
                  <rect width="60" height="40" fill="#012169"/>
                  <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8"/>
                  <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="4"/>
                  <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="12"/>
                  <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="7"/>
                </svg>
                EN
              </span>
            ) : (
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <svg width="20" height="14" viewBox="0 0 60 40" aria-hidden="true" style={{ flexShrink: 0, borderRadius: "2px" }}>
                  <rect width="60" height="40" fill="#AA151B"/>
                  <rect y="10" width="60" height="20" fill="#F1BF00"/>
                </svg>
                ES
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero" style={{ background: "#fff", padding: "1rem 0 0" }}>
        <div className="iv-wrap iv-hero-desktop">

          {/* MASSIVE headline */}
          <h1 className="iv-display iv-fade iv-hero-headline" style={{ marginBottom: "1.5rem" }}>
            {t.lang === "es" ? (
              <>AHORA MISMO,<br />ALGUIEN NO<br /><span className="iv-recibe" style={{ background: "#003CBD", color: "#fff", padding: "0 0.1em", display: "inline" }}>RECIBE RESPUESTA.</span></>
            ) : (
              <>RIGHT NOW,<br />SOMEONE ISN'T<br /><span className="iv-recibe" style={{ background: "#003CBD", color: "#fff", padding: "0 0.1em", display: "inline" }}>GETTING A REPLY.</span></>
            )}
          </h1>

          {/* Subheadline — Bebas Neue uppercase, large, like banner */}
          <p className="iv-fade iv-hero-sub" style={{ ...BB, fontSize: "clamp(1.5rem, 6.5vw, 2.5rem)", color: "#333", lineHeight: 1.2, marginBottom: "3rem", maxWidth: "560px" }}>
            {t.lang === "es"
              ? <>CUANDO TU CLÍNICA NO CONTESTA WHATSAPP, INSTAGRAM O LLAMADAS, ESE CLIENTE BUSCA OTRA VETERINARIA. INTELLIVET RESPONDE POR TI <span style={{ textDecoration: "underline", textDecorationColor: "#003CBD", textDecorationThickness: "3px" }}>24 HORAS AL DÍA</span> — <span style={{ textDecoration: "underline", textDecorationColor: "#003CBD", textDecorationThickness: "3px" }}>INCLUSO DE NOCHE.</span></>
              : <>WHEN YOUR CLINIC DOESN'T ANSWER WHATSAPP, INSTAGRAM OR CALLS, THAT CLIENT FINDS ANOTHER VET. INTELLIVET RESPONDS FOR YOU <span style={{ textDecoration: "underline", textDecorationColor: "#003CBD", textDecorationThickness: "3px" }}>24 HOURS A DAY</span> — <span style={{ textDecoration: "underline", textDecorationColor: "#003CBD", textDecorationThickness: "3px" }}>EVEN AT NIGHT.</span></>}
          </p>
        </div>

        {/* CTA CARD — full width, no white margins */}
        <div className="iv-fade">
          <CTACard showBuy={true} showScarcity={true} />
        </div>

        {/* Hero photo — hidden on desktop */}
        <div className="iv-fade iv-hero-img-desktop" style={{ position: "relative", overflow: "hidden" }}>
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663411960285/QQumH4UaJLUGXTrd4Ai5Bj/hero_vet_clinic-ZmfvHBsf6AAaYvCYs4WTY2.webp" alt="Veterinario con perro" style={{ width: "100%", maxHeight: "60vw", objectFit: "cover", objectPosition: "center 30%", display: "block" }} loading="eager" />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, #fff, transparent)" }} aria-hidden="true" />
        </div>
      </section>

      {/* ══ VSL ══ */}
      <section id="vsl" className="iv-vsl-desktop" style={{ background: "#fff", padding: "5rem 0" }}>
        <div className="iv-vsl-bg" style={{ backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411960285/QQumH4UaJLUGXTrd4Ai5Bj/hero_vet_clinic-ZmfvHBsf6AAaYvCYs4WTY2.webp)" }} />
        <div className="iv-wrap iv-vsl-content">
          <div className="iv-fade" style={{ background: "#111", borderRadius: "6px", aspectRatio: "16/9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,92,58,0.4) 0%, rgba(0,0,0,0.7) 100%)" }} aria-hidden="true" />
            <div style={{ position: "relative", zIndex: 1, width: 80, height: 80, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)" aria-hidden="true"><polygon points="5,3 19,12 5,21" /></svg>
            </div>
            <h3 style={{ position: "relative", zIndex: 1, ...BB, fontSize: "clamp(1.5rem, 6vw, 2.5rem)", color: "#fff", textAlign: "center", padding: "0 1.5rem" }}>{t.vsl.title.toUpperCase()}</h3>
            <span style={{ position: "relative", zIndex: 1, ...BB, fontSize: "0.9rem", color: "var(--iv-wa)", marginTop: "0.75rem" }}>{t.vsl.subtitle.toUpperCase()}</span>
            <p style={{ position: "relative", zIndex: 1, fontFamily: "Georgia, serif", fontSize: "clamp(0.9rem, 3vw, 1rem)", color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: "400px", padding: "0.75rem 1.5rem 0", lineHeight: 1.55, textTransform: "uppercase" }}>{t.vsl.description}</p>
          </div>
        </div>
      </section>

      {/* ══ PAIN ══ */}
      <section id="pain" style={{ background: "#fff", padding: "0" }}>

        {/* Intro row — navy-teal veterinary blue */}
        <div style={{ background: "linear-gradient(135deg, #002A9E 0%, #003CBD 100%)", padding: "3rem 0" }}>
          <div className="iv-wrap">
            <p className="iv-label iv-fade" style={{ color: "rgba(255,255,255,0.55)", marginBottom: "0.75rem" }}>
              {t.lang === "es" ? "EL PROBLEMA" : "THE PROBLEM"}
            </p>
            <h2 className="iv-title iv-fade" style={{ color: "#fff" }}>
              {t.pain.title.toUpperCase()}
            </h2>
          </div>
        </div>

        {/* Pain items — alternating white / light gray rows, editorial style */}
        {t.pain.items.map((item, i) => {
          const isEven = i % 2 === 0;
          const accents = ["#003CBD", "#003CBD", "#003CBD", "#003CBD"];
          return (
            <div
              key={i}
              className="iv-fade"
              style={{
                background: isEven ? "#fff" : "#F4F4F2",
                borderLeft: `6px solid ${accents[i]}`,
                padding: "2rem 0",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div className="iv-wrap">
                {/* Big number */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem" }}>
                  <span style={{
                    fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                    fontSize: "clamp(3.5rem, 16vw, 6rem)",
                    color: accents[i],
                    lineHeight: 0.85,
                    flexShrink: 0,
                    opacity: 0.25,
                    userSelect: "none",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ paddingTop: "0.25rem" }}>
                    <p style={{ ...BB, fontSize: "clamp(1.4rem, 6.5vw, 2.2rem)", color: "var(--iv-black)", lineHeight: 1.05, marginBottom: "0.5rem" }}>
                      {item.headline.toUpperCase()}
                    </p>
                    <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1rem, 4.5vw, 1.25rem)", color: "#444", lineHeight: 1.6 }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Closing — navy-teal veterinary blue */}
        <div style={{ background: "linear-gradient(135deg, #002A9E 0%, #003CBD 100%)", padding: "3rem 0" }}>
          <div className="iv-wrap">
            <div className="iv-fade">
              <p style={{ ...BB, fontSize: "clamp(1.6rem, 7.5vw, 3rem)", color: "#fff", lineHeight: 1.05, marginBottom: "0.5rem" }}>
                {t.lang === "es" ? "EL PROBLEMA NO ES QUE FALTEN CLIENTES." : "THE PROBLEM ISN'T A LACK OF CLIENTS."}
              </p>
              <p style={{ ...BB, fontSize: "clamp(1.6rem, 7.5vw, 3rem)", color: "#FFE600", lineHeight: 1.05 }}>
                {t.lang === "es" ? "EL PROBLEMA ES QUE MUCHOS NO RECIBEN RESPUESTA A TIEMPO." : "THE PROBLEM IS THAT MANY DON'T GET A TIMELY RESPONSE."}
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* ══ SOCIAL PROOF ══ */}
      <section id="testimonials" className="iv-sec" style={{ background: "#fff", paddingBottom: "0", paddingTop: "3rem" }}>
        <div className="iv-wrap">
          <p className="iv-label iv-fade" style={{ marginBottom: "1rem" }}>{t.lang === "es" ? "RESULTADOS REALES" : "REAL RESULTS"}</p>
          <h2 className="iv-title iv-fade" style={{ marginBottom: "0.75rem" }}>
            {t.lang === "es" ? "MÁS DE 5 CLÍNICAS YA CONFÍAN EN INTELLIVET" : "5+ CLINICS ALREADY TRUST INTELLIVET"}
          </h2>
          <p className="iv-fade" style={{ ...BB, fontSize: "clamp(1.2rem, 5.5vw, 1.6rem)", color: "#555", marginBottom: "3rem" }}>{t.socialProof.sub.toUpperCase()}</p>
        </div>
        <div className="iv-fade"><ReviewCarousel /></div>
        {/* CTA after reviews — full width */}
        <div className="iv-fade" style={{ marginTop: "3rem" }}>
          <CTACard showBuy={true} showScarcity={false} />
        </div>
      </section>

      {/* ══ DEMO ══ */}
      <section id="demo" className="iv-sec" style={{ background: "var(--iv-gray)" }}>
        <div className="iv-wrap">
          <p className="iv-label iv-fade" style={{ marginBottom: "1rem" }}>{t.lang === "es" ? "CÓMO FUNCIONA" : "HOW IT WORKS"}</p>
          <h2 className="iv-title iv-fade" style={{ marginBottom: "3rem" }}>{t.demo.title.toUpperCase()}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="iv-fade" style={{ background: "#fff", border: "1.5px solid var(--iv-border)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ background: "var(--iv-green)", padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                <span style={{ ...BB, fontSize: "1.3rem", color: "#fff" }}>{t.demo.whatsapp.label.toUpperCase()}</span>
              </div>
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663411960285/QQumH4UaJLUGXTrd4Ai5Bj/whatsapp_mockup-mPiw65Zms66Agxp5GyY4UH.webp" alt="WhatsApp demo" style={{ width: "100%", maxHeight: "400px", objectFit: "cover", objectPosition: "top" }} loading="lazy" />
              <p style={{ ...BB, fontSize: "clamp(1.2rem, 5.5vw, 1.6rem)", color: "#333", padding: "1.25rem" }}>{t.demo.whatsapp.description.toUpperCase()}</p>
            </div>
            <div className="iv-fade" style={{ background: "#fff", border: "1.5px solid var(--iv-border)", borderRadius: "4px", padding: "2rem", transitionDelay: "80ms" }}>
              <div style={{ background: "linear-gradient(160deg, #0D3B2E 0%, #1A5C3A 100%)", borderRadius: "8px", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </div>
                <p style={{ ...BB, fontSize: "1.5rem", color: "#fff", textAlign: "center" }}>{t.lang === "es" ? "LLAMADA ENTRANTE — 23:14" : "INCOMING CALL — 23:14"}</p>
                <p style={{ ...BB, fontSize: "clamp(1rem, 4.5vw, 1.3rem)", color: "rgba(255,255,255,0.6)", textAlign: "center" }}>{t.lang === "es" ? "INTELLIVET RESPONDE AUTOMÁTICAMENTE" : "INTELLIVET ANSWERS AUTOMATICALLY"}</p>
                <div style={{ background: "var(--iv-wa)", borderRadius: "20px", padding: "0.5rem 1.5rem", ...BB, fontSize: "1rem", color: "#fff" }}>{t.lang === "es" ? "ATENDIDA ✓" : "ANSWERED ✓"}</div>
              </div>
              <p style={{ ...BB, fontSize: "clamp(1.2rem, 5.5vw, 1.6rem)", color: "#333" }}>{t.demo.phone.description.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ROI ══ */}
      <section id="roi" className="iv-sec" style={{ background: "linear-gradient(160deg, #002A9E 0%, #003CBD 60%, #002080 100%)", paddingBottom: "0" }}>
        <div className="iv-wrap">
          <p className="iv-fade" style={{ ...BB, fontSize: "clamp(1rem, 4.5vw, 1.3rem)", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>{t.lang === "es" ? "CALCULADORA DE PÉRDIDAS" : "LOSS CALCULATOR"}</p>
          <h2 className="iv-title iv-fade" style={{ color: "#fff", marginBottom: "3rem" }}>{t.roi.title.toUpperCase()}</h2>
          <ROICalc />
        </div>
        <div className="iv-fade" style={{ marginTop: "3rem" }}>
          <CTACard showBuy={true} showScarcity={false} />
        </div>
      </section>

      {/* ══ BEFORE/AFTER ══ */}
      <section id="before-after" className="iv-sec" style={{ background: "#fff", paddingTop: "3rem" }}>
        <div className="iv-wrap">
          <p className="iv-label iv-fade" style={{ marginBottom: "1rem" }}>{t.lang === "es" ? "EL CAMBIO" : "THE CHANGE"}</p>
          <h2 className="iv-title iv-fade" style={{ marginBottom: "3rem" }}>{t.beforeAfter.title.toUpperCase()}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <p style={{ ...BB, fontSize: "clamp(0.85rem, 3.5vw, 1rem)", color: "var(--iv-red)" }}>{t.beforeAfter.before.toUpperCase()}</p>
            <p style={{ ...BB, fontSize: "clamp(0.85rem, 3.5vw, 1rem)", color: "var(--iv-green)" }}>{t.beforeAfter.after.toUpperCase()}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "3rem" }}>
            {t.beforeAfter.items.map((item, i) => (
              <div key={i} className="iv-fade" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", transitionDelay: `${i * 50}ms` }}>
                <div style={{ background: "#FFF5F5", borderLeft: "4px solid var(--iv-red)", padding: "1rem", borderRadius: "2px" }}>
                  <p style={{ ...BB, fontSize: "clamp(1rem, 4.5vw, 1.3rem)", color: "#7A1A1A", lineHeight: 1.2 }}>{item.before.toUpperCase()}</p>
                </div>
                <div style={{ background: "#F0FFF4", borderLeft: "4px solid var(--iv-green)", padding: "1rem", borderRadius: "2px" }}>
                  <p style={{ ...BB, fontSize: "clamp(1rem, 4.5vw, 1.3rem)", color: "#1A4A2A", lineHeight: 1.2 }}>{item.after.toUpperCase()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="iv-fade" style={{ background: "linear-gradient(160deg, #002A9E 0%, #003CBD 60%, #002080 100%)", borderRadius: "6px", padding: "1.75rem", textAlign: "center" }}>
            <p style={{ ...BB, fontSize: "clamp(1.4rem, 6.5vw, 2.2rem)", color: "#fff", lineHeight: 1.1 }}>{t.beforeAfter.closing.toUpperCase()}</p>
          </div>
        </div>
      </section>

      {/* ══ FOR WHO ══ */}
      <section id="for-who" style={{ background: "linear-gradient(180deg, #002A9E 0%, #003CBD 50%, #0050FF 100%)", paddingBottom: "0" }}>
        <div className="iv-wrap" style={{ paddingTop: "4rem", paddingBottom: "3rem" }}>
          <p className="iv-fade" style={{ ...BB, fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)", color: "rgba(255,255,255,0.55)", letterSpacing: "0.14em", marginBottom: "0.75rem" }}>{t.lang === "es" ? "¿PARA QUIÉN ES?" : "WHO IS IT FOR?"}</p>
          <h2 className="iv-title iv-fade" style={{ color: "#fff", marginBottom: "3rem" }}>{t.forWho.title.toUpperCase()}</h2>

          {/* FOR — full list with large check + white text */}
          <div className="iv-fade" style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#4CAF78", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </div>
              <p style={{ ...BB, fontSize: "clamp(1.2rem, 5.5vw, 1.6rem)", color: "#4CAF78", letterSpacing: "0.06em" }}>{t.forWho.forLabel.toUpperCase()}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {t.forWho.forItems.map((item, i) => (
                <div key={i} className="iv-fade" style={{ display: "flex", alignItems: "flex-start", gap: "1rem", background: "rgba(76,175,120,0.1)", border: "1px solid rgba(76,175,120,0.3)", borderRadius: "4px", padding: "1rem 1.25rem", transitionDelay: `${i * 40}ms` }}>
                  <span style={{ color: "#4CAF78", fontSize: "1.3rem", flexShrink: 0, lineHeight: 1.2, ...BB }}>✓</span>
                  <span style={{ ...BB, fontSize: "clamp(1.2rem, 5.5vw, 1.6rem)", color: "#fff", lineHeight: 1.2 }}>{item.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* NOT FOR — visible but clearly secondary */}
          <div className="iv-fade">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </div>
              <p style={{ ...BB, fontSize: "clamp(1.2rem, 5.5vw, 1.6rem)", color: "rgba(255,255,255,0.8)", letterSpacing: "0.06em" }}>{t.forWho.notForLabel.toUpperCase()}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {t.forWho.notForItems.map((item, i) => (
                <div key={i} className="iv-fade" style={{ display: "flex", alignItems: "flex-start", gap: "1rem", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "4px", padding: "0.875rem 1.25rem", transitionDelay: `${i * 40}ms` }}>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", flexShrink: 0, lineHeight: 1.2, ...BB }}>✗</span>
                  <span style={{ ...BB, fontSize: "clamp(1rem, 4.5vw, 1.3rem)", color: "rgba(255,255,255,0.8)", lineHeight: 1.2 }}>{item.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="iv-fade">
          <CTACard showBuy={true} showScarcity={false} />
        </div>
      </section>

      {/* ══ STEPS ══ */}
      <section id="steps" className="iv-sec" style={{ background: "#fff" }}>
        <div className="iv-wrap">
          <p className="iv-label iv-fade" style={{ marginBottom: "1rem" }}>{t.lang === "es" ? "EL PROCESO" : "THE PROCESS"}</p>
          <h2 className="iv-title iv-fade" style={{ marginBottom: "3rem" }}>{t.steps.title.toUpperCase()}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {t.steps.items.map((step, i) => (
              <div key={i} className="iv-fade" style={{ display: "flex", gap: "1.75rem", alignItems: "flex-start", paddingBottom: i < t.steps.items.length - 1 ? "3rem" : "0", transitionDelay: `${i * 80}ms` }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--iv-green)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(26,92,58,0.25)" }}>
                    <span style={{ ...BB, fontSize: "1.8rem", color: "#fff" }}>{step.num}</span>
                  </div>
                  {i < t.steps.items.length - 1 && <div style={{ width: 2, flex: 1, minHeight: "2.5rem", background: "var(--iv-border)", marginTop: "0.5rem" }} />}
                </div>
                <div style={{ paddingTop: "1.1rem" }}>
                  <p style={{ ...BB, fontSize: "clamp(1.3rem, 6vw, 1.8rem)", color: "var(--iv-black)", marginBottom: "0.6rem", lineHeight: 1.1 }}>{step.title.toUpperCase()}</p>
                  <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.05rem, 4.5vw, 1.3rem)", color: "#555", lineHeight: 1.65 }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OBJECTIONS — Interactive accordion ══ */}
      <ObjectionsSection t={t} BB={BB} />

      {/* ══ FAQ ══ */}
      <section id="faq" className="iv-sec" style={{ background: "var(--iv-gray)" }}>
        <div className="iv-wrap">
          <p className="iv-label iv-fade" style={{ marginBottom: "1rem" }}>FAQ</p>
          <h2 className="iv-title iv-fade" style={{ marginBottom: "2.5rem" }}>{t.faq.title.toUpperCase()}</h2>
          <div className="iv-fade" style={{ maxWidth: "720px" }}>
            {t.faq.items.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* ══ CLOSING ══ */}
      <section id="closing" className="iv-sec" style={{ background: "linear-gradient(160deg, #002A9E 0%, #003CBD 60%, #002080 100%)", paddingBottom: "0" }}>
        <div className="iv-wrap">
          <p className="iv-fade" style={{ ...BB, fontSize: "clamp(1rem, 4.5vw, 1.3rem)", color: "rgba(255,255,255,0.55)", marginBottom: "1rem" }}>{t.lang === "es" ? "ÚLTIMA OPORTUNIDAD" : "LAST CHANCE"}</p>
          <h2 className="iv-title iv-fade" style={{ color: "#fff", marginBottom: "1.5rem", fontSize: "clamp(2rem, 9vw, 4rem)" }}>{t.closing.headline.toUpperCase()}</h2>
          <p className="iv-fade" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1rem, 4.5vw, 1.3rem)", color: "rgba(255,255,255,0.85)", marginBottom: "1.25rem", lineHeight: 1.6 }}>{t.closing.body}</p>
          <div className="iv-fade" style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,230,0,0.12)", border: "1.5px solid rgba(255,230,0,0.4)", color: "#FFE600", ...BB, fontSize: "clamp(1.1rem, 5vw, 1.5rem)", padding: "0.75rem 1rem", borderRadius: "3px", marginBottom: "2.5rem" }}>
            ⚠ {t.closing.urgency}
          </div>
        </div>
        <div className="iv-fade">
          <CTACard showBuy={true} showScarcity={false} />
        </div>
      </section>

      {/* ── LEAD POPUP ── */}
      <LeadPopup />

      {/* ── FOOTER ── */}
      <footer style={{ background: "#F4F4F2", borderTop: "2px solid var(--iv-border)", padding: "2rem 0", textAlign: "center" }}>
        <p style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)", color: "#555", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
          © 2026 INTELLIVET. {isEs ? "TODOS LOS DERECHOS RESERVADOS." : "ALL RIGHTS RESERVED."}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem 1.5rem" }}>
          {[
            { path: "/pricing", es: "PRECIOS", en: "PRICING" },
            { path: "/terms", es: "TÉRMINOS", en: "TERMS" },
            { path: "/privacy", es: "PRIVACIDAD", en: "PRIVACY" },
            { path: "/refunds", es: "REEMBOLSOS", en: "REFUNDS" },
          ].map((link) => (
            <a
              key={link.path}
              href={link.path}
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: "clamp(0.8rem, 3vw, 0.95rem)", color: "#888", textDecoration: "none", letterSpacing: "0.06em" }}
            >
              {isEs ? link.es : link.en}
            </a>
          ))}
        </div>
      </footer>

      {/* ── WHATSAPP BUBBLE (bottom-right, white icon) ── */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.25rem",
          zIndex: 900,
          width: 62,
          height: 62,
          borderRadius: "50%",
          background: "var(--iv-wa)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
          textDecoration: "none",
          animation: "iv-pulse 2.5s ease-in-out infinite",
          color: "#fff",
        }}
        aria-label="WhatsApp"
      >
        <WAIcon size={30} />
      </a>
    </div>
  );
}

/* ── OBJECTIONS SECTION — Interactive accordion ── */
function ObjectionsSection({ t, BB }: { t: any; BB: React.CSSProperties }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // first open by default

  return (
    <section id="objections" style={{ background: "linear-gradient(180deg, #002A9E 0%, #003CBD 50%, #0050FF 100%)", padding: "0" }}>

      {/* Header */}
      <div style={{ padding: "4rem 0 2.5rem" }}>
        <div className="iv-wrap">
          <p className="iv-fade" style={{ ...BB, fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)", color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em", marginBottom: "0.75rem" }}>
            {t.lang === "es" ? "TRANQUILIDAD" : "PEACE OF MIND"}
          </p>
          <h2 className="iv-title iv-fade" style={{ color: "#fff", marginBottom: "0.75rem" }}>
            {t.objections.title.toUpperCase()}
          </h2>
          <p className="iv-fade" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.05rem, 4.5vw, 1.3rem)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
            {t.objections.subtitle}
          </p>
        </div>
      </div>

      {/* Accordion items */}
      <div className="iv-wrap" style={{ paddingBottom: "4rem" }}>
        {t.objections.items.map((item: any, i: number) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className="iv-fade"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.15)",
                transitionDelay: `${i * 40}ms`,
              }}
            >
              {/* Question row — tappable */}
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "1.5rem 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {/* Left: colored dot + question */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1 }}>
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: isOpen ? "#FFE600" : "rgba(255,255,255,0.35)",
                    flexShrink: 0,
                    marginTop: "0.5rem",
                    transition: "background 200ms",
                  }} />
                  <p style={{
                    ...BB,
                    fontSize: "clamp(1.2rem, 5.5vw, 1.6rem)",
                    color: isOpen ? "#FFE600" : "rgba(255,255,255,0.9)",
                    lineHeight: 1.15,
                    transition: "color 200ms",
                  }}>
                    {item.q.toUpperCase()}
                  </p>
                </div>
                {/* Right: + / - icon */}
                <span style={{
                  ...BB,
                  fontSize: "2rem",
                  color: isOpen ? "#FFE600" : "rgba(255,255,255,0.5)",
                  flexShrink: 0,
                  lineHeight: 1,
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 220ms cubic-bezier(0.23,1,0.32,1), color 200ms",
                  display: "inline-block",
                }}>
                  +
                </span>
              </button>

              {/* Answer — animated open/close */}
              <div style={{
                overflow: "hidden",
                maxHeight: isOpen ? "400px" : "0",
                transition: "max-height 280ms cubic-bezier(0.23,1,0.32,1)",
              }}>
                <div style={{
                  paddingLeft: "1.625rem", // align with question text
                  paddingBottom: "1.5rem",
                }}>
                  <p style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(1.05rem, 4.5vw, 1.3rem)",
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.65,
                  }}>
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}

/* ── ROI CALCULATOR ── */
function ROICalc() {
  const { t } = useLang();
  const [missed, setMissed] = useState(2);
  const [value, setValue] = useState(100);
  const loss = missed * value * 4;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ ...BB, fontSize: "clamp(1rem, 4.5vw, 1.3rem)", color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem" }}>{t.roi.resultLabel.toUpperCase()}</p>
        <div style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: "clamp(4rem, 18vw, 9rem)", color: "#60A5FA", lineHeight: 1 }}>${loss.toLocaleString()}</div>
        <p style={{ ...BB, fontSize: "clamp(1.1rem, 5vw, 1.5rem)", color: "rgba(255,255,255,0.6)", marginTop: "0.25rem" }}>{t.roi.resultSuffix.toUpperCase()}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <label style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1rem, 4vw, 1.15rem)", color: "rgba(255,255,255,0.8)" }}>{t.roi.lostLabel}</label>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.75rem", color: "#fff" }}>{missed}</span>
          </div>
          <input type="range" min={1} max={10} value={missed} onChange={e => setMissed(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--iv-wa)", cursor: "pointer" }} />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <label style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1rem, 4vw, 1.15rem)", color: "rgba(255,255,255,0.8)" }}>{t.roi.valueLabel}</label>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.75rem", color: "#fff" }}>${value}</span>
          </div>
          <input type="range" min={30} max={300} step={10} value={value} onChange={e => setValue(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--iv-wa)", cursor: "pointer" }} />
        </div>
      </div>
      <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1rem, 4vw, 1.15rem)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{t.roi.conclusion}</p>
    </div>
  );
}
