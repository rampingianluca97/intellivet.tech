// NavBar v2 — Solid white bar, large logo, visible language switch
// Positioned below urgency banner, not transparent

import { useLang } from "@/contexts/LanguageContext";

export function NavBar() {
  const { t, toggleLang } = useLang();

  return (
    <nav
      style={{
        background: "#fff",
        borderBottom: "1.5px solid var(--iv-border)",
        padding: "0.875rem 0",
        position: "sticky",
        top: "calc(2.5rem + 1px)",
        zIndex: 100,
      }}
      aria-label="Navigation"
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="14" r="5" fill="var(--iv-green)" opacity="0.9" />
            <circle cx="7" cy="9" r="2.2" fill="var(--iv-green)" opacity="0.7" />
            <circle cx="17" cy="9" r="2.2" fill="var(--iv-green)" opacity="0.7" />
            <circle cx="5" cy="13" r="1.8" fill="var(--iv-green)" opacity="0.5" />
            <circle cx="19" cy="13" r="1.8" fill="var(--iv-green)" opacity="0.5" />
          </svg>
          <div>
            <span style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif", fontWeight: 900, fontSize: "1.4rem", color: "var(--iv-text)", letterSpacing: "-0.01em", lineHeight: 1, display: "block", textTransform: "uppercase" }}>
              {t.nav.logo}
            </span>
            <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 500, fontSize: "0.7rem", color: "var(--iv-text-muted)", display: "block", lineHeight: 1 }}>
              {t.nav.tagline}
            </span>
          </div>
        </div>

        {/* Language switch */}
        <button
          onClick={toggleLang}
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "0.875rem",
            color: "var(--iv-green)",
            background: "#F0FFF4",
            border: "1.5px solid #4CAF78",
            borderRadius: "3px",
            padding: "0.4rem 0.875rem",
            cursor: "pointer",
            letterSpacing: "0.02em",
            transition: "background 150ms ease",
          }}
          aria-label={`Switch to ${t.langSwitch}`}
        >
          {t.langSwitch}
        </button>
      </div>
    </nav>
  );
}
