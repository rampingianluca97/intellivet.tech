// ROISection v2 — Massive loss number, dark bg, slider simple
import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { CTABlock } from "@/components/CTABlock";

export function ROISection() {
  const { t } = useLang();
  const [missed, setMissed] = useState(2);
  const [value, setValue] = useState(100);
  const loss = missed * value * 4;

  return (
    <section id="roi" className="iv-section" style={{ background: "var(--iv-bg-dark)" }}>
      <div className="container">
        <p
          className="iv-animate"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "0.75rem" }}
        >
          {t.lang === "es" ? "Calculadora de pérdidas" : "Loss calculator"}
        </p>
        <h2 className="iv-h2 iv-animate" style={{ color: "#fff", marginBottom: "2rem" }}>
          {t.roi.title}
        </h2>

        {/* Loss result — MASSIVE */}
        <div
          className="iv-animate"
          style={{ textAlign: "center", marginBottom: "2rem", padding: "2rem", background: "rgba(0,0,0,0.3)", borderRadius: "6px" }}
        >
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>
            {t.roi.resultLabel}
          </p>
          <div className="iv-roi-result">${loss.toLocaleString()}</div>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", marginBottom: "1rem" }}>
            {t.roi.resultSuffix}
          </p>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.95rem, 3vw, 1.05rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.55, marginBottom: "1.5rem" }}>
            {t.roi.conclusion}
          </p>
        </div>

        {/* Sliders */}
        <div className="iv-animate" style={{ display: "flex", flexDirection: "column", gap: "1.75rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <label style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600, fontSize: "clamp(0.95rem, 3vw, 1.05rem)", color: "rgba(255,255,255,0.8)" }}>
                {t.roi.lostLabel}
              </label>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "1.5rem", color: "#fff" }}>{missed}</span>
            </div>
            <input type="range" min={1} max={10} value={missed} onChange={(e) => setMissed(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--iv-whatsapp)", cursor: "pointer" }} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <label style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600, fontSize: "clamp(0.95rem, 3vw, 1.05rem)", color: "rgba(255,255,255,0.8)" }}>
                {t.roi.valueLabel}
              </label>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "1.5rem", color: "#fff" }}>${value}</span>
            </div>
            <input type="range" min={30} max={300} step={10} value={value} onChange={(e) => setValue(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--iv-whatsapp)", cursor: "pointer" }} />
          </div>
        </div>

        <div className="iv-animate">
          <CTABlock variant="mid" showBuy={false} showScarcity={false} />
        </div>
      </div>
    </section>
  );
}
