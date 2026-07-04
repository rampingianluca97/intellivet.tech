// FloatingActions — Fixed WhatsApp button + chatbot widget
// Design: WhatsApp green pulse, bottom-right, above mobile nav

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const WA_NUMBER = "5491100000000";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Hola%2C%20quiero%20una%20demo%20de%20IntelliVet`;

export function FloatingActions() {
  const { t } = useLang();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");

  return (
    <>
      {/* Chatbot widget */}
      {chatOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "8rem",
            right: "1.25rem",
            width: "min(320px, calc(100vw - 2.5rem))",
            background: "#fff",
            border: "1px solid var(--iv-border)",
            borderRadius: "8px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
            zIndex: 950,
            overflow: "hidden",
          }}
        >
          {/* Chat header */}
          <div
            style={{
              background: "var(--iv-green-dark)",
              padding: "0.875rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--iv-whatsapp)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  color: "#fff",
                }}
              >
                IntelliVet
              </span>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", padding: "0.25rem" }}
              aria-label="Cerrar chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat body */}
          <div style={{ padding: "1rem", minHeight: "120px" }}>
            <div
              style={{
                background: "#F5F5F0",
                borderRadius: "0 8px 8px 8px",
                padding: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  fontSize: "0.875rem",
                  color: "var(--iv-text)",
                  lineHeight: 1.5,
                }}
              >
                {t.lang === "es"
                  ? "Hola 👋 ¿Tienes alguna pregunta sobre IntelliVet? Escríbeme y te respondo en menos de 1 hora."
                  : "Hi 👋 Any questions about IntelliVet? Write to me and I'll reply in less than 1 hour."}
              </p>
            </div>
          </div>

          {/* Input */}
          <div
            style={{
              padding: "0.75rem 1rem",
              borderTop: "1px solid var(--iv-border)",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <input
              type="text"
              value={chatMsg}
              onChange={(e) => setChatMsg(e.target.value)}
              placeholder={t.lang === "es" ? "Escribe tu pregunta..." : "Type your question..."}
              style={{
                flex: 1,
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
                fontSize: "0.875rem",
                border: "1px solid var(--iv-border)",
                borderRadius: "3px",
                padding: "0.5rem 0.75rem",
                outline: "none",
                color: "var(--iv-text)",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && chatMsg.trim()) {
                  window.open(
                    `${WA_LINK}&text=${encodeURIComponent(chatMsg)}`,
                    "_blank"
                  );
                  setChatMsg("");
                }
              }}
            />
            <a
              href={chatMsg.trim() ? `${WA_LINK}&text=${encodeURIComponent(chatMsg)}` : WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "var(--iv-whatsapp)",
                border: "none",
                borderRadius: "3px",
                padding: "0.5rem 0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                textDecoration: "none",
              }}
              aria-label="Enviar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* WhatsApp floating button */}
      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.25rem",
          zIndex: 900,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.75rem",
        }}
      >
        {/* Chat toggle */}
        <button
          onClick={() => setChatOpen((v) => !v)}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "var(--iv-text)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            transition: "transform 160ms cubic-bezier(0.23,1,0.32,1)",
          }}
          aria-label={t.cta.chat}
        >
          <MessageCircle size={20} color="#fff" />
        </button>

        {/* WhatsApp */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="iv-wa-float"
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--iv-whatsapp)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
            textDecoration: "none",
            transition: "transform 160ms cubic-bezier(0.23,1,0.32,1)",
          }}
          aria-label="WhatsApp"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </>
  );
}
