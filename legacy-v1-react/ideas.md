# IntelliVet Landing Page — Design Ideas

## Scelta di design adottata

**Approccio: "Clinica Viva"** — Caldo, umano, concreto. Non tech, non startup.

### Design Movement
Warm Editorial meets Functional Brutalism — ispirato alle riviste mediche latinoamericane di alta qualità, con influenze tipografiche da stampa europea anni '90. Niente effetti "AI-generated": niente gradienti viola, niente card tutte uguali, niente Inter light su sfondo bianco.

### Core Principles
1. **Umano prima di tutto** — ogni elemento deve sembrare fatto da una persona, non generato. Font con carattere, immagini reali, spaziature irregolari intenzionali.
2. **Gerarchia brutale** — i numeri, i prezzi e le perdite devono essere enormi. Il testo secondario è piccolo. Non esiste via di mezzo.
3. **Verde veterinario come colore di fiducia, non di brand tech** — verde scuro, quasi bosco, non verde menta SaaS.
4. **Urgenza visibile senza essere spam** — il rosso del banner è l'unico elemento aggressivo. Il resto respira.

### Color Philosophy
- Sfondo: bianco caldo leggermente avorio `#FAFAF7` — non bianco puro, che sembra schermo
- Verde primario: `#1A5C3A` — verde veterinario scuro, autorevole
- Verde CTA WhatsApp: `#25D366` — il verde WhatsApp originale
- Rosso urgenza: `#C8102E` — rosso bandiera, non rosso neon
- Testo principale: `#1C1C1C` — quasi nero, non nero puro
- Accento caldo: `#E8A020` — ambra/oro per prezzi barrati e badge
- Grigio testo secondario: `#5C5C5C`

### Layout Paradigm
Asimmetrico e editoriale. Le sezioni non sono tutte centrate. Alcune headline sono allineate a sinistra con un blocco colorato laterale. I testimonial sono disposti in griglia irregolare. Il pricing ha un'offerta dominante che rompe la simmetria.

### Signature Elements
1. **Linea verde verticale** a sinistra delle headline principali — richiama le riviste mediche
2. **Numeri grandi in evidenza** — perdita mensile, numero di cliniche, ore di copertura — trattati come titoli, non come statistiche
3. **Card testimonial con bordo superiore colorato** — ogni clinica ha un colore diverso sul bordo, non tutte uguali

### Interaction Philosophy
Scroll-driven: gli elementi entrano da sinistra o dal basso con transizioni brevi (180–220ms). I bottoni WhatsApp hanno un micro-pulse verde. Il countdown è meccanico, non digitale.

### Animation
- Entrata sezioni: `translateY(20px) opacity(0)` → normale, 200ms ease-out
- Bottoni: `scale(0.97)` on active, 160ms
- Countdown: aggiornamento ogni secondo senza flash
- Nessuna animazione su testo denso o FAQ

### Typography System
- Display/Headline: **Playfair Display** — serif con carattere, autorevole, non tech
- Body: **Source Sans 3** — leggibile, neutro, professionale
- Numeri grandi: **Playfair Display Bold** — i numeri devono sembrare importanti
- Label/Badge: **Source Sans 3 SemiBold uppercase** — piccolo, ordinato
- Gerarchia: H1 = 2.8rem mobile / 4rem desktop | H2 = 1.8rem | Body = 1rem | Small = 0.85rem
