import React, { createContext, useContext, useState } from "react";
import { content, Lang } from "@/lib/content";

interface LanguageContextType {
  lang: Lang;
  t: typeof content["es"];
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "es",
  t: content["es"],
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  const toggleLang = () => {
    setLang((prev) => (prev === "es" ? "en" : "es"));
  };

  return (
    <LanguageContext.Provider value={{ lang, t: content[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
