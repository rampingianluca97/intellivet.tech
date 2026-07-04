// UrgencyBanner v2 — Large text, impossible to miss on mobile
// Design: Red background, Barlow Condensed bold, countdown prominent

import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

function getInitialSeconds() {
  const stored = localStorage.getItem("iv_countdown_end");
  if (stored) {
    const end = parseInt(stored, 10);
    const remaining = Math.floor((end - Date.now()) / 1000);
    if (remaining > 0) return remaining;
  }
  const end = Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem("iv_countdown_end", String(end));
  return 24 * 60 * 60;
}

export function UrgencyBanner() {
  const { t } = useLang();
  const [seconds, setSeconds] = useState(getInitialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) { clearInterval(interval); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      style={{
        background: "var(--iv-red)",
        color: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0.6rem 1rem",
        textAlign: "center",
      }}
    >
      {/* Main text */}
      <div
        style={{
          fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1rem, 4.5vw, 1.25rem)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          lineHeight: 1.2,
          marginBottom: "0.2rem",
        }}
      >
        {t.urgencyBanner.text} — {t.urgencyBanner.sub}
      </div>
      {/* Countdown */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.4rem",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(0.85rem, 3.5vw, 1rem)",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        <span>{t.urgencyBanner.countdown}</span>
        <span
          style={{
            fontFamily: "'Barlow Condensed', monospace",
            fontWeight: 900,
            fontSize: "clamp(1rem, 4vw, 1.2rem)",
            background: "rgba(0,0,0,0.3)",
            padding: "0.1rem 0.5rem",
            borderRadius: "2px",
            letterSpacing: "0.1em",
            color: "#fff",
          }}
        >
          {pad(h)}:{pad(m)}:{pad(s)}
        </span>
      </div>
    </div>
  );
}
