# PLAN DE OPTIMIZARE PERFORMANCE MOBILE — MassageART Oslo
> Sursă: `.copilot/raport-seo-mobile.txt` (PageSpeed Insights, captat 2026-04-25)
> Scor inițial: **Performance = 58 / 100 (Mobile)**
> ✅ După Faza 1 (validat 2026-04-25): **68 / 100** (+10 pct)
> 🔜 După Faza 2 (de validat): estimat **73-76 / 100** (+5-8 pct, economie 1.48 MB pe imagini)
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

### 🟢 FAZA 1 — Quick wins server-side & `<head>` (RISC ZERO) — ✅ COMPLETĂ
*Estimare inițială: +15-20 puncte. **Rezultat real: +10 puncte (58 → 68).***

Status implementare (commit-uri `perf(faza-1)`):

1. ✅ **`.htaccess` — Cache lifetimes + GZIP + Brotli + Keep-Alive + headere securitate**
   - `mod_expires`: 1 an pentru CSS/JS/imagini/fonturi, 1 oră pentru HTML
   - `Cache-Control: public, max-age=31536000, immutable` pe assets statice
   - `mod_deflate` + `mod_brotli` pentru text/CSS/JS/SVG/JSON/fonturi
   - MIME types `.webp`, `.avif`, `.woff2`
   - `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`

2. ✅ **Google Fonts — combinare într-un singur request + preconnect + swap**
   - 3 link-uri separate → 1 cerere `css2?family=Open+Sans:wght@400;600&family=Playfair+Display:ital@1&family=Raleway:wght@300;600;700;800&display=swap`
   - Adăugat `<link rel="preconnect" href="https://fonts.googleapis.com">` + `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
   - **Aplicat în toate cele 26 de pagini active** (NO + EN)

3. ✅ **`font-display: swap` pentru fonturile locale**
   - Adăugat în `flat-icon/flaticon.css` și `font-awesome/css/font-awesome.min.css`

4. ✅ **`defer` pe toate scripturile JS locale**
   - 148 tag-uri `<script src="js/..."` → `<script src="js/..." defer>`
   - Verificat: NU există inline `$(...)` / `jQuery(...)` care ar fi rupt cu defer
   - Scripturile IE-only (`html5shiv`, `respond` din CDN extern, în condiționale `<!--[if lt IE 9]>`) lăsate intacte

5. ✅ **Preload LCP image + `fetchpriority="high"`** (homepage NO + EN)
   - `<link rel="preload" as="image" href="images/home-1/slider/slider-0.webp" fetchpriority="high">` (path-ul a devenit `.webp` după Faza 2)

6. ⏭️ **`width` + `height` pe `<img>` (CLS)** — încă neaplicat, pentru Faza 3

---

### 🟡 FAZA 2 — Optimizare imagini WebP (RISC MIC) — ✅ COMPLETĂ
*Strategie hibridă confirmată cu utilizatorul: **WebP la `q=80` doar pe imaginile JPG > 80 KB.***

**Test preliminar pe `slider-1.jpg` (1920×1080, 172 KB JPEG):**

| Calitate WebP | Mărime | vs JPG |
|---|---:|---:|
| q=95 | 341 KB | **+98%** ❌ |
| q=90 *(propus inițial)* | 232 KB | **+35%** ❌ |
| q=85 | 167 KB | −3% (nesemnificativ) |
| q=82 | 144 KB | −16% ✅ |
| **q=80** *(ales)* | **132 KB** | **−25% ✅** |

⚠️ JPG-urile sursă erau deja agresiv comprimate (≈q75-80). La q=90 WebP-ul ar fi fost MAI MARE decât JPG-ul, contraproductiv pentru PageSpeed.

**Implementare (commit `perf(faza-2)`):**

1. ✅ **Generare WebP cu `cwebp -q 80 -m 6 -mt`** pentru 13 imagini > 80 KB
   - Inclus suplimentar `slider-0.jpg` (52 KB) deoarece este LCP — convertit pentru consistență cu `slider-1.webp`
   - 2 imagini convertite inițial dar **orfane** (fără referințe în HTML/CSS/JS active): `summer-sales.jpg`, `home-1/slider/slider-2.jpg` — WebP-urile orfane șterse, JPG-urile lăsate intacte

2. ✅ **Rezultate conversie (12 imagini active):**

   | Fișier | JPG | WebP | Economie |
   |---|---:|---:|---:|
   | about/about-us | 425 KB | 94 KB | **−78%** |
   | about/about-us-2 | 419 KB | 100 KB | **−76%** |
   | about/slider/slider-2-about | 175 KB | 10 KB | **−94%** 🏆 |
   | home-1/slider/slider-1 | 172 KB | 129 KB | −25% |
   | home-1/slider/slider-0 (LCP) | 51 KB | 25 KB | −52% |
   | contact/contact | 161 KB | 84 KB | −48% |
   | service/banar-woman | 131 KB | 54 KB | −59% |
   | news-bg | 128 KB | 10 KB | **−92%** |
   | service/banar | 111 KB | 48 KB | −56% |
   | service/banar-couple | 108 KB | 30 KB | −72% |
   | blog/Emotions_and_Tantra | 106 KB | 70 KB | −34% |
   | blog/tantric_massage | 88 KB | 47 KB | −46% |
   | **TOTAL** | **2 459 KB** | **701 KB** | **−71%** (≈ 1.7 MB economisiți) |

3. ✅ **Înlocuire referințe `.jpg` → `.webp` (19 înlocuiri în 7 fișiere):**
   - HTML: `index.html`, `en/index.html`, `about.html`, `en/about.html`, `blog.html`, `en/blog.html` (preload + `<img src>`)
   - CSS: `css/style.css` (7 background-image URLs: `.item-0`, `.item-1`, `.contact-bg`, `.banar-woman`, `.banar`, `.banar-couple`, `.news-bg`)
   - **Strategie:** înlocuire directă (nu `<picture>`), conform cerinței utilizatorului. WebP are suport mobile ~97% în 2026.

4. ✅ **Ștergere JPG-uri convertite** (12 fișiere) — eliminat dublajul de assets, repo dim. `images/` 5.6 MB → 3.9 MB.

5. ✅ **Smoke test HTTP local:** toate paginile (NO+EN) răspund 200, toate WebP-urile servesc, vechile JPG-uri răspund 404 (confirmare că nicio referință stale nu a rămas).

**De NU s-a făcut în Faza 2 (mutat în Faza 3):**
- `loading="lazy"` + `decoding="async"` sistematic pe imaginile sub fold
- `<picture>` cu fallback JPG (decis explicit cu user să mergem direct pe WebP)
- Optimizare logo PNG
- `image-set()` în CSS pentru fallback (renunțat — WebP support 97%+ pe mobile)

---

### 🟠 FAZA 3 — Critical CSS path (RISC MEDIU) — 🔜 URMĂTOARE
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

4. **`width` + `height` explicit pe toate `<img>` (CLS)** — mutat din Faza 1
   - Adăugăm atribute explicite pe imaginile fără ele (logo, slider thumbnails, about, services)

5. **Font Awesome subset** (opțional, dacă e timp)
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

## 4. METRICI ȚINTĂ & PROGRES REAL

| Metrică | Inițial | După Faza 1 (validat) | După Faza 2 (estimat) | Țintă |
|---|---|---|---|---|
| **Performance Score** | 58 | **68** ✅ | 73-76 | **85+** |
| **LCP** | > 4 s | îmbunătățit | îmbunătățit (-25 KB pe LCP) | < 2.5 s |
| **FCP** | > 2 s | îmbunătățit | la fel ca Faza 1 | < 1.8 s |
| **TBT** | mare | redus prin `defer` | la fel | < 200 ms |
| **Total transfer (homepage)** | ~1 530 KiB | ~1 430 KiB | **~270 KiB** (−1 160 KiB doar imagini) | < 800 KiB |
| **Render-blocking duration** | 4 380 ms | redus | redus | < 500 ms |

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

## 6. ORDINEA REALĂ DE LIVRARE (commits)

| # | Commit | Status |
|---|---|---|
| 1 | `perf: add cache headers, gzip and security headers in .htaccess` | ✅ |
| 2 | `perf: combine google fonts in single request with display=swap + preconnect` (homepage NO) | ✅ |
| 3 | `perf: add font-display swap for local icon fonts (flaticon, font-awesome)` | ✅ |
| 4 | `perf: defer non-critical JS scripts` (homepage NO) | ✅ |
| 5 | `perf: preload LCP hero image` (homepage NO) | ✅ |
| 6 | `perf(faza-1): replicate Google Fonts combine + defer JS across all NO + EN pages` | ✅ |
| 7 | **`perf(faza-2): convert 12 large JPG images to WebP @ q=80, update HTML+CSS refs`** | ✅ **CURENT** |
| 8 | `perf(faza-3): async-load non-critical CSS (animate, jquery-ui, owl, nivo)` | 🔜 |
| 9 | `perf(faza-3): inline critical above-the-fold CSS` | 🔜 |
| 10 | `perf(faza-3): add explicit width/height on img tags for CLS` | 🔜 |

**Validare PageSpeed după fiecare commit major:**
- După #6: **58 → 68** (+10) — confirmat de utilizator 2026-04-25
- După #7: TBD — utilizatorul va testa și raporta
- După #8-9: TBD

Fiecare commit este reversibil independent dacă apare o regresie.
