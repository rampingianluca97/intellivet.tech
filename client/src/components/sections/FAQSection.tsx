// FAQSection v2 — Large text accordion, mobile-first
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: "1.5px solid var(--iv-border)" }}>
      <button
        onClick={onToggle}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", padding: "1.25rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
        aria-expanded={isOpen}
      >
        <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 3.5vw, 1.1rem)", color: "var(--iv-text)", lineHeight: 1.45, flex: 1 }}>
          {q}
        </span>
        <ChevronDown size={20} color="var(--iv-green)" style={{ flexShrink: 0, marginTop: "0.1rem", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms ease" }} />
      </button>
      <div style={{ overflow: "hidden", maxHeight: isOpen ? "400px" : "0", transition: "max-height 220ms cubic-bezier(0.23,1,0.32,1)" }}>
        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.95rem, 3vw, 1.05rem)", color: "var(--iv-text-muted)", lineHeight: 1.65, paddingBottom: "1.25rem" }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="iv-section" style={{ background: "var(--iv-bg-alt)" }}>
      <div className="container">
        <p className="iv-label iv-animate" style={{ marginBottom: "0.75rem" }}>FAQ</p>
        <h2 className="iv-h2 iv-animate" style={{ marginBottom: "2rem" }}>
          {t.faq.title}
        </h2>
        <div className="iv-animate" style={{ maxWidth: "720px" }}>
          {t.faq.items.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
