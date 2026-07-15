import { useLang } from "@/contexts/LanguageContext";
import { Link } from "wouter";

const BB: React.CSSProperties = {
  fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

// ── Flag SVGs ──────────────────────────────────────────────────────────────
function FlagUK() {
  return (
    <svg width="20" height="14" viewBox="0 0 60 40" aria-hidden="true" style={{ flexShrink: 0, borderRadius: "2px" }}>
      <rect width="60" height="40" fill="#012169"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="12"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="7"/>
    </svg>
  );
}
function FlagES() {
  return (
    <svg width="20" height="14" viewBox="0 0 60 40" aria-hidden="true" style={{ flexShrink: 0, borderRadius: "2px" }}>
      <rect width="60" height="40" fill="#AA151B"/>
      <rect y="10" width="60" height="20" fill="#F1BF00"/>
    </svg>
  );
}

// ── Content definitions ────────────────────────────────────────────────────
type LegalContent = {
  title: string;
  lastUpdated: string;
  sections: { heading: string; body: string }[];
};

const CONTENT: Record<string, { es: LegalContent; en: LegalContent }> = {
  pricing: {
    es: {
      title: "PRECIOS",
      lastUpdated: "Última actualización: junio 2026",
      sections: [
        {
          heading: "Bundle Completo",
          body: "Pago único de configuración: $900 USD. Tarifa mensual: $300 USD/mes. Incluye: agente de chat (WhatsApp, Instagram, Telegram, Web), agente de voz telefónico 24/7, sitio web profesional + SEO (valor $800, incluido gratis), configuración completa por nuestro equipo y reporte mensual por WhatsApp.",
        },
        {
          heading: "Chat Only",
          body: "Pago único de configuración: $500 USD. Tarifa mensual: $150 USD/mes. Incluye: agente de chat (WhatsApp, Instagram, Telegram, Web) y reporte mensual por WhatsApp.",
        },
        {
          heading: "Garantía",
          body: "Ofrecemos una garantía de devolución de 15 días. Si en los primeros 15 días no ves resultados concretos en tu clínica, te devolvemos el pago de configuración sin preguntas. La garantía aplica hasta las primeras 50 llamadas gestionadas por el voice agent o los primeros 30 días del chatbot.",
        },
        {
          heading: "Forma de pago",
          body: "Los pagos se procesan de forma segura a través de Paddle. Aceptamos tarjetas de crédito y débito internacionales. Los precios están expresados en dólares estadounidenses (USD).",
        },
      ],
    },
    en: {
      title: "PRICING",
      lastUpdated: "Last updated: June 2026",
      sections: [
        {
          heading: "Complete Bundle",
          body: "One-time setup fee: $900 USD. Monthly fee: $300 USD/month. Includes: chat agent (WhatsApp, Instagram, Telegram, Web), 24/7 phone voice agent, professional website + SEO (value $800, included free), full setup by our team, and monthly WhatsApp report.",
        },
        {
          heading: "Chat Only",
          body: "One-time setup fee: $500 USD. Monthly fee: $150 USD/month. Includes: chat agent (WhatsApp, Instagram, Telegram, Web) and monthly WhatsApp report.",
        },
        {
          heading: "Guarantee",
          body: "We offer a 15-day money-back guarantee. If within the first 15 days you don't see concrete results in your clinic, we refund the setup fee — no questions asked. The guarantee applies to the first 50 calls handled by the voice agent or the first 30 days of the chatbot.",
        },
        {
          heading: "Payment",
          body: "Payments are processed securely through Paddle. We accept international credit and debit cards. Prices are in US dollars (USD).",
        },
      ],
    },
  },

  terms: {
    es: {
      title: "TÉRMINOS DE SERVICIO",
      lastUpdated: "Última actualización: junio 2026",
      sections: [
        {
          heading: "1. Aceptación de los términos",
          body: "Al contratar los servicios de IntelliVet, aceptas estos términos de servicio en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.",
        },
        {
          heading: "2. Descripción del servicio",
          body: "IntelliVet proporciona soluciones de automatización de comunicaciones para clínicas veterinarias, incluyendo agentes de chat y voz con inteligencia artificial. El servicio se presta de forma continua una vez completada la configuración.",
        },
        {
          heading: "3. Obligaciones del cliente",
          body: "El cliente se compromete a proporcionar información veraz durante el proceso de configuración, a mantener activas las cuentas de mensajería necesarias (WhatsApp Business, Instagram, etc.) y a no utilizar el servicio para fines ilegales o contrarios a las políticas de las plataformas de mensajería.",
        },
        {
          heading: "4. Pagos y facturación",
          body: "El pago de configuración se realiza una sola vez al inicio del servicio. La tarifa mensual se factura de forma recurrente. El cliente puede cancelar el servicio en cualquier momento con un preaviso de 30 días. No se realizan reembolsos de tarifas mensuales ya pagadas, salvo lo establecido en la política de garantía.",
        },
        {
          heading: "5. Limitación de responsabilidad",
          body: "IntelliVet no se responsabiliza de interrupciones del servicio causadas por terceros (plataformas de mensajería, proveedores de telecomunicaciones, etc.), ni de pérdidas de negocio derivadas de dichas interrupciones. La responsabilidad máxima de IntelliVet se limita al importe pagado por el cliente en el último mes de servicio.",
        },
        {
          heading: "6. Modificaciones",
          body: "IntelliVet se reserva el derecho de modificar estos términos con un preaviso de 30 días. El uso continuado del servicio tras la notificación implica la aceptación de los nuevos términos.",
        },
        {
          heading: "7. Ley aplicable",
          body: "Estos términos se rigen por las leyes aplicables en el territorio donde se presta el servicio. Cualquier disputa se resolverá mediante negociación amistosa o, en su defecto, ante los tribunales competentes.",
        },
      ],
    },
    en: {
      title: "TERMS OF SERVICE",
      lastUpdated: "Last updated: June 2026",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          body: "By contracting IntelliVet services, you accept these terms of service in full. If you disagree with any part of these terms, you must not use our services.",
        },
        {
          heading: "2. Service Description",
          body: "IntelliVet provides communication automation solutions for veterinary clinics, including AI-powered chat and voice agents. The service is delivered continuously once setup is complete.",
        },
        {
          heading: "3. Client Obligations",
          body: "The client agrees to provide accurate information during the setup process, to keep the required messaging accounts active (WhatsApp Business, Instagram, etc.), and not to use the service for illegal purposes or in violation of messaging platform policies.",
        },
        {
          heading: "4. Payments and Billing",
          body: "The setup fee is a one-time payment at the start of the service. The monthly fee is billed on a recurring basis. The client may cancel the service at any time with 30 days' notice. Monthly fees already paid are non-refundable, except as provided in the guarantee policy.",
        },
        {
          heading: "5. Limitation of Liability",
          body: "IntelliVet is not liable for service interruptions caused by third parties (messaging platforms, telecom providers, etc.), or for business losses resulting from such interruptions. IntelliVet's maximum liability is limited to the amount paid by the client in the last month of service.",
        },
        {
          heading: "6. Modifications",
          body: "IntelliVet reserves the right to modify these terms with 30 days' notice. Continued use of the service after notification implies acceptance of the new terms.",
        },
        {
          heading: "7. Governing Law",
          body: "These terms are governed by the laws applicable in the territory where the service is provided. Any dispute will be resolved through friendly negotiation or, failing that, before the competent courts.",
        },
      ],
    },
  },

  privacy: {
    es: {
      title: "POLÍTICA DE PRIVACIDAD",
      lastUpdated: "Última actualización: junio 2026",
      sections: [
        {
          heading: "1. Responsable del tratamiento",
          body: "IntelliVet es responsable del tratamiento de los datos personales recogidos a través de este sitio web y de los servicios prestados.",
        },
        {
          heading: "2. Datos que recopilamos",
          body: "Recopilamos los datos que nos proporcionas directamente: nombre, correo electrónico, número de teléfono y datos de la clínica veterinaria. También recopilamos datos de uso del servicio para mejorar la calidad de los agentes de IA.",
        },
        {
          heading: "3. Finalidad del tratamiento",
          body: "Utilizamos tus datos para: prestar el servicio contratado, enviarte comunicaciones relacionadas con el servicio, mejorar nuestros sistemas de IA, y cumplir con obligaciones legales.",
        },
        {
          heading: "4. Base legal",
          body: "El tratamiento de tus datos se basa en la ejecución del contrato de servicios, el cumplimiento de obligaciones legales y, en su caso, tu consentimiento expreso.",
        },
        {
          heading: "5. Conservación de datos",
          body: "Conservamos tus datos durante la vigencia del contrato y durante el período legalmente requerido tras su finalización.",
        },
        {
          heading: "6. Tus derechos",
          body: "Tienes derecho a acceder, rectificar, suprimir, limitar el tratamiento y portar tus datos. Para ejercer estos derechos, contacta con nosotros a través de WhatsApp o correo electrónico.",
        },
        {
          heading: "7. Seguridad",
          body: "Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos contra accesos no autorizados, pérdida o destrucción.",
        },
      ],
    },
    en: {
      title: "PRIVACY POLICY",
      lastUpdated: "Last updated: June 2026",
      sections: [
        {
          heading: "1. Data Controller",
          body: "IntelliVet is the data controller for personal data collected through this website and the services provided.",
        },
        {
          heading: "2. Data We Collect",
          body: "We collect data you provide directly: name, email address, phone number, and veterinary clinic details. We also collect service usage data to improve the quality of our AI agents.",
        },
        {
          heading: "3. Purpose of Processing",
          body: "We use your data to: deliver the contracted service, send service-related communications, improve our AI systems, and comply with legal obligations.",
        },
        {
          heading: "4. Legal Basis",
          body: "Processing of your data is based on the execution of the service contract, compliance with legal obligations, and, where applicable, your explicit consent.",
        },
        {
          heading: "5. Data Retention",
          body: "We retain your data for the duration of the contract and for the legally required period after its termination.",
        },
        {
          heading: "6. Your Rights",
          body: "You have the right to access, rectify, delete, restrict processing, and port your data. To exercise these rights, contact us via WhatsApp or email.",
        },
        {
          heading: "7. Security",
          body: "We apply appropriate technical and organizational measures to protect your data against unauthorized access, loss, or destruction.",
        },
      ],
    },
  },

  refunds: {
    es: {
      title: "POLÍTICA DE REEMBOLSOS",
      lastUpdated: "Última actualización: junio 2026",
      sections: [
        {
          heading: "Garantía de 15 días",
          body: "Ofrecemos una garantía de devolución completa del pago de configuración durante los primeros 15 días del servicio. Si no ves resultados concretos en tu clínica veterinaria, te devolvemos el 100% del pago de configuración, sin preguntas.",
        },
        {
          heading: "Condiciones de la garantía",
          body: "La garantía aplica a las primeras 50 llamadas gestionadas por el voice agent o a los primeros 30 días de funcionamiento del chatbot, lo que ocurra primero. Para solicitar el reembolso, debes contactarnos dentro del período de garantía.",
        },
        {
          heading: "Tarifas mensuales",
          body: "Las tarifas mensuales ya abonadas no son reembolsables, salvo en los casos cubiertos por la garantía de 15 días. Puedes cancelar el servicio en cualquier momento con 30 días de preaviso, y no se te cobrará el siguiente mes.",
        },
        {
          heading: "Proceso de reembolso",
          body: "Para solicitar un reembolso, contacta con nosotros por WhatsApp o correo electrónico indicando tu nombre, clínica y motivo. Procesamos los reembolsos en un plazo de 5 a 10 días hábiles a través del mismo método de pago utilizado.",
        },
        {
          heading: "Contacto",
          body: "Para cualquier consulta sobre reembolsos, contacta con nuestro equipo a través de WhatsApp: +502 5363 8941.",
        },
      ],
    },
    en: {
      title: "REFUND POLICY",
      lastUpdated: "Last updated: June 2026",
      sections: [
        {
          heading: "15-Day Guarantee",
          body: "We offer a full refund of the setup fee within the first 15 days of service. If you don't see concrete results in your veterinary clinic, we refund 100% of the setup fee — no questions asked.",
        },
        {
          heading: "Guarantee Conditions",
          body: "The guarantee applies to the first 50 calls handled by the voice agent or the first 30 days of chatbot operation, whichever comes first. To request a refund, you must contact us within the guarantee period.",
        },
        {
          heading: "Monthly Fees",
          body: "Monthly fees already paid are non-refundable, except as covered by the 15-day guarantee. You may cancel the service at any time with 30 days' notice, and you will not be charged for the following month.",
        },
        {
          heading: "Refund Process",
          body: "To request a refund, contact us via WhatsApp or email with your name, clinic, and reason. We process refunds within 5 to 10 business days through the same payment method used.",
        },
        {
          heading: "Contact",
          body: "For any refund inquiries, contact our team via WhatsApp: +502 5363 8941.",
        },
      ],
    },
  },
};

// ── LegalPage component ────────────────────────────────────────────────────
interface LegalPageProps {
  pageKey: "pricing" | "terms" | "privacy" | "refunds";
}

export default function LegalPage({ pageKey }: LegalPageProps) {
  const { t, toggleLang, lang } = useLang();
  const isEs = lang === "es";
  const content = CONTENT[pageKey][isEs ? "es" : "en"];

  return (
    <div style={{ minHeight: "100vh", background: "#F4F4F2", fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* Navbar */}
      <nav style={{ background: "#fff", borderBottom: "1.5px solid #e5e5e5", padding: "1rem 0", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <img src="/manus-storage/logoIntelliVet_4b97bb80.png" alt="IntelliVet logo" style={{ height: 32, width: "auto" }} />
            <span style={{ ...BB, fontSize: "1.5rem", color: "#111", lineHeight: 1 }}>INTELLIVET</span>
          </Link>
          <button
            onClick={toggleLang}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "0.9rem", color: "#1A5C3A", background: "#F0FFF4", border: "1.5px solid #4CAF78", borderRadius: "3px", padding: "0.4rem 0.75rem", cursor: "pointer", textTransform: "uppercase" }}
          >
            {isEs ? <><FlagUK /> EN</> : <><FlagES /> ES</>}
          </button>
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "0.5rem" }}>{content.lastUpdated}</p>
        <h1 style={{ ...BB, fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#111", lineHeight: 0.95, marginBottom: "3rem" }}>
          {content.title}
        </h1>

        {content.sections.map((section, i) => (
          <div key={i} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ ...BB, fontSize: "clamp(1.1rem, 3vw, 1.4rem)", color: "#003CBD", marginBottom: "0.75rem" }}>
              {section.heading.toUpperCase()}
            </h2>
            <p style={{ fontSize: "1rem", color: "#333", lineHeight: 1.75, maxWidth: 720 }}>
              {section.body}
            </p>
          </div>
        ))}

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #ddd" }}>
          <Link href="/" style={{ ...BB, fontSize: "1rem", color: "#1A5C3A", textDecoration: "none" }}>
            ← {isEs ? "VOLVER AL INICIO" : "BACK TO HOME"}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: "#fff", borderTop: "1.5px solid #e5e5e5", padding: "1.5rem 0", textAlign: "center" }}>
        <p style={{ ...BB, fontSize: "0.85rem", color: "#888" }}>
          © 2026 INTELLIVET. {isEs ? "TODOS LOS DERECHOS RESERVADOS." : "ALL RIGHTS RESERVED."}
        </p>
      </footer>
    </div>
  );
}
