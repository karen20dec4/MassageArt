# PLAN DE OPTIMIZARE PERFORMANCE MOBILE — MassageART Oslo
> Sursă: `.copilot/raport-seo-mobile.txt` (PageSpeed Insights, captat 2026-04-25)
> Scor curent: **Performance = 58 / 100 (Mobile)**
> Țintă realistă: **85+ / 100** fără modificarea structurii sau a funcționalității site-ului.
> Aplicabil pentru: site static HTML/CSS/JS (Bootstrap 3 + jQuery 1.11.3 + OWL + Animate.css)
>
> ⚠️ **Constrângeri impuse de proiect** (per cerere utilizator):
> - NU modificăm structura site-ului (nav, footer, layout, pagini)
> - NU schimbăm framework-ul (rămâne Bootstrap 3, jQuery 1.11.3, OWL)
> - NU adăugăm build pipeline (rămâne deploy direct de fișiere)
> - Toate optimizările trebuie să fie reversibile și să păstreze identic comportamentul vizual

---

## 1. PROBLEME IDENTIFICATE (sumar din raport)

| # | Problemă | Economie estimată | Impact metrică |
|---|---|---|---|
| 1 | Render-blocking resources (10 fișiere CSS + 3 Google Fonts) | **~4 380 ms** | LCP, FCP |
| 2 | Cache TTL = `None` pentru toate resursele (1 530 KiB) | repeat-view massive | LCP, FCP |
| 3 | Unused CSS rules (≈ 365 KiB nefolosit) | **~365 KiB** | LCP, FCP |
| 4 | Font display nu este `swap` (Flaticon, FontAwesome, Google Fonts) | ~120 ms | FCP |
| 5 | Imagini neoptimizate (JPG mari fără WebP/AVIF, fără preload pentru LCP) | ~400 KiB + LCP | LCP |
| 6 | jQuery + jQuery-UI + Bootstrap JS încărcate sincron în `<head>`/sus | ~365 KiB blocant | TBT |
| 7 | Lipsă `width`/`height` pe imagini → CLS | — | CLS |

---

## 2. PRIORITIZARE (Effort vs. Impact)

```
                    IMPACT MARE
                        │
     Cache headers ●    │    ● Defer JS  ● Critical CSS inline
                        │
     Font-display swap● │    ● WebP imagini  ● Preload LCP
                        │
     Combine GFonts  ●  │    ● Async non-critical CSS
─────────────────────────┼─────────────────────────────────
                        │
     Keep-Alive      ●  │    ● Eliminare unused CSS rules
                        │
                    IMPACT MIC
       EFFORT MIC       │       EFFORT MARE
```

---

## 3. PLAN DE EXECUȚIE — 5 FAZE

### 🟢 FAZA 1 — Quick wins server-side & `<head>` (RISC ZERO)
*Estimare: +15-20 puncte PageSpeed; aplicabil în toate paginile odată cu `.htaccess`.*

1. **`.htaccess` — Cache lifetimes** (rezolvă problema #2)
   - `mod_expires`: 1 an pentru CSS/JS/imagini/fonturi cu hash sau care nu se schimbă des
   - `Cache-Control: public, max-age=31536000, immutable` pentru assets statice
   - HTML: `max-age=3600, must-revalidate` (fresh la modificări de conținut)

2. **`.htaccess` — Compresie GZIP/Brotli** (rezolvă parte din #1, #3)
   - `mod_deflate` pentru `text/html`, `text/css`, `application/javascript`, `image/svg+xml`, `application/json`, `text/xml`
   - Reduce CSS-urile mari cu 70-80% (style.css 103 KB → ~20 KB pe wire)

3. **`.htaccess` — Keep-Alive & headere securitate**
   - `Header set Connection keep-alive`
   - `Header set X-Content-Type-Options nosniff`

4. **Google Fonts — combinare într-un singur request + swap** (rezolvă #4)
   - Înlocuim 3 link-uri separate cu **un singur** `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@300;600;700;800&family=Playfair+Display:ital@1&display=swap`
   - Adăugăm `<link rel="preconnect" href="https://fonts.googleapis.com">` + `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`

5. **`font-display: swap` pentru fonturile locale** (rezolvă #4)
   - Override `@font-face` pentru Flaticon (în `flat-icon/flaticon.css` sau `<style>` inline)
   - Override `@font-face` pentru FontAwesome (declarație nouă cu `font-display: swap`)

6. **`defer` pe scripturile JS** (rezolvă #6)
   - Adăugăm `defer` la `bootstrap.min.js`, `owl.carousel.min.js`, `jquery.appear.js`, `jquery.animateNumber.min.js`, `index-script.js` și restul scripturilor per-pagină
   - jQuery + jQuery-UI rămân fără `defer` doar dacă există `<script>` inline care le folosesc; preferabil mutăm jQuery în `defer` și verificăm
   - Alternativ minim invaziv: mutăm toate `<script>` din header la finalul `<body>` (dacă nu sunt deja) și adăugăm `defer`

7. **Preload LCP image + `fetchpriority="high"`** (rezolvă #5 parțial)
   - Identificat: `images/home-1/slider/slider-0.jpg` este background-ul primului slide hero (LCP candidate pe homepage)
   - `<link rel="preload" as="image" href="images/home-1/slider/slider-0.jpg" fetchpriority="high">` în `<head>` pe `index.html`
   - Pentru paginile interne se identifică LCP-ul respectiv (banner h1 / hero secundar)

8. **`width` + `height` pe toate `<img>`** (rezolvă #7, CLS)
   - Adăugăm atribute explicite pe imaginile fără ele (logo, slider thumbnails, about, services)

---

### 🟡 FAZA 2 — Optimizare imagini (RISC MIC)
*Estimare: +5-10 puncte; reduce LCP cu 1-2 secunde.*

1. **Conversie WebP cu fallback** pentru imaginile JPG mari (>30 KB):
   - `slider/slider-0.jpg` (52 KB) → slider-0.webp (~15 KB)
   - `slider/slider-1.jpg` (173 KB) → slider-1.webp (~40 KB)
   - `slider/slider-2.jpg` → slider-2.webp
   - `about/slider/slider-1-about.jpg` (28 KB), `slider-2-about.jpg` (175 KB)
   - `home-1/home-img1.jpg` (59 KB), `beautifull-spa.jpg` (48 KB), `home-massage.jpg` (36 KB)
   - `images/logo.png` (33 KB) → versiune mai mică WebP/PNG optimizat

2. **`<picture>` element** acolo unde se folosește `<img>` direct (about-slider etc.)
   - Pentru `background-image` în CSS, folosim `image-set()` cu fallback JPG sau strategie CSS feature query

3. **`loading="lazy"` + `decoding="async"`** pe toate imaginile sub fold
   - Imaginile din hero (above the fold) primesc `loading="eager"` + `fetchpriority="high"`
   - Toate celelalte: `loading="lazy" decoding="async"`

4. **Logo PNG → versiune mai mică** (33 KB e mult pentru logo)
   - Optimizare cu compressie PNG sau conversie SVG dacă e posibil

---

### 🟠 FAZA 3 — Critical CSS path (RISC MEDIU)
*Estimare: +10-15 puncte; reduce FCP cu 2-3 secunde.*

1. **Inline critical CSS** în `<head>`:
   - Extras manual: reset + tipografie + nav + hero + above-the-fold (≈ 8-12 KB)
   - Plasat ca `<style>` direct în `<head>` înainte de orice `<link rel="stylesheet">`

2. **Async load pentru CSS non-critic** (pattern preload+swap):
   ```html
   <link rel="preload" href="css/animate.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
   <noscript><link rel="stylesheet" href="css/animate.css"></noscript>
   ```
   Aplicat pe: `animate.css`, `jquery-ui.css`, `nivo-lightbox.css`, `owl.carousel.css`, `owl.theme.css`, `css3-animation.css`

3. **Eliminare `jquery-ui.css` și `jquery-ui.min.js` din paginile care NU folosesc UI components**
   - Verificat per pagină: `index.html`, `about.html`, `service*.html`, `shop.html`, `blog.html`, `faq.html`, `ethics.html` — probabil nu folosesc datepicker/slider UI
   - `contact.html` — verificat dacă are nevoie

4. **Font Awesome subset** (opțional, dacă e timp)
   - Generăm un subset doar cu iconițele folosite (probabil ~10-15 din ~600+)
   - Reducere: 26 KB → ~5 KB

---

### 🔵 FAZA 4 — JS non-blocking & lazy-load resurse externe (RISC MIC)
*Estimare: +5 puncte TBT/INP.*

1. **Lazy-load Google Maps iframe** (`contact.html`)
   - `<iframe loading="lazy" ...>` (deja standard, dar verificăm)
   - Opțional: pattern "click-to-load" cu placeholder static (mai agresiv)

2. **Eliminare scripturi neutilizate per pagină**
   - `jquery.animateNumber.min.js` — folosit doar pe `about.html` (counters)
   - `nivo-lightbox.min.js` — folosit doar dacă există galerie lightbox
   - `owl.carousel.min.js` — folosit doar pe paginile cu carousel (homepage, blog)

3. **Mutare scripturi la finalul `<body>`** (dacă încă nu sunt acolo)

---

### 🟣 FAZA 5 — Replicare în toate paginile (mecanic)
*Aplicăm Fazele 1-4 în:*
- Toate fișierele HTML din root (Norwegian): `index.html`, `about.html`, `contact.html`, `shop.html`, `service*.html`, `blog.html`, `faq.html`, `ethics.html`, `tantric-massage-in-oslo.html`, `Hva-er-tantramassasje.html`, `harmoni-og-hormonbalanse-gjennom-tantrisk-massasje.html`
- Toate fișierele HTML din `/en/`

---

## 4. METRICI ȚINTĂ

| Metrică | Curent (estimat din raport) | Țintă |
|---|---|---|
| **Performance Score** | 58 | **85+** |
| **LCP** | > 4 s | < 2.5 s |
| **FCP** | > 2 s | < 1.8 s |
| **TBT** | mare | < 200 ms |
| **CLS** | necunoscut | < 0.1 |
| **Total transfer (homepage)** | ~1 530 KiB | < 800 KiB |
| **Render-blocking duration** | 4 380 ms | < 500 ms |

---

## 5. CHECKLIST DE VALIDARE (după fiecare fază)

- [ ] Site se încarcă vizual identic (homepage + contact + service + shop)
- [ ] Slider hero funcționează (auto-play, săgeți)
- [ ] Meniu mobile (hamburger) deschide/închide corect
- [ ] Dropdown "Tjenester / Services" funcționează
- [ ] Formular contact trimite corect (POST → `send_email.php`)
- [ ] Floating call button vizibil
- [ ] Language switcher funcțional
- [ ] Google Maps iframe încarcă pe contact
- [ ] OWL Carousel rotește corect
- [ ] Animațiile `animate.css` la scroll funcționează (jquery.appear)
- [ ] Re-rulat PageSpeed Insights → scor și diferențe documentate

---

## 6. ORDINEA RECOMANDATĂ DE LIVRARE (commits)

1. `perf: add cache headers, gzip and security headers in .htaccess`
2. `perf: combine google fonts in single request with display=swap + preconnect`
3. `perf: add font-display swap for local icon fonts (flaticon, font-awesome)`
4. `perf: defer non-critical JS scripts`
5. `perf: preload LCP hero image + add width/height on images (CLS)`
6. `perf: add WebP variants for hero/slider/about images with picture fallback`
7. `perf: async-load non-critical CSS (animate, jquery-ui, owl, nivo)`
8. `perf: inline critical above-the-fold CSS`
9. `perf: replicate optimizations to all NO + EN pages`

Fiecare commit este reversibil independent dacă apare o regresie.
