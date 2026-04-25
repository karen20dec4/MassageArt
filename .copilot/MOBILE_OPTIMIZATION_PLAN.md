# PLAN DE OPTIMIZARE PERFORMANCE MOBILE — MassageART Oslo
> Sursă: `.copilot/raport-seo-mobile.txt` (PageSpeed Insights, captat 2026-04-25)
> Scor inițial: **Performance = 58 / 100 (Mobile)**
> ✅ După Faza 1: **68 / 100** (+10 pct)
> ✅ După Faza 2: **70 / 100** (+2 pct, LCP 5.9s → 5.4s) — câștig modest pentru că JPG-urile sursă erau deja comprimate
> 🔜 După Faza 3 (de validat): estimat **78-83 / 100** — atacă cele 5 690 ms render-blocking CSS
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
*Rezultat real: 68 → 70 (+2 pct). LCP 5.9s → 5.4s (-500 ms).*

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

**Cleanup follow-up (după primul raport PageSpeed):**
- ✅ `images/home-1/beautifull-spa.jpg` (48 KB) — convertit la WebP q=80 → 28 KB (**−42%**), referințe actualizate în `index.html` + `en/index.html`, JPG sursă șters

---

### 🟠 FAZA 3 — Async non-critical CSS (RISC MIC-MEDIU) — ✅ COMPLETĂ
*Atacă "Render blocking requests" PageSpeed: estimat 2 140 ms economie. Țintă scor: 78-83 / 100.*

**Analiză render-blocking (raport user 2026-04-25):**
- 10 CSS files + 1 Google Fonts blochează render-ul → 5 690 ms cumulat
- Cel mai mare contribuitor: `bootstrap.min.css` (1 340 ms)

**Strategie aleasă (conservatoare dar eficientă):**

| Categorie | Fișier | Decizie | Motiv |
|---|---|---|---|
| **Sync** (rămân blocking) | `bootstrap.min.css` | KEEP | Grid system + utilities, layout fundament above-the-fold |
| **Sync** | `style.css` | KEEP | Site styles: header, nav, hero, slider — toate above-the-fold |
| **Sync** | `responsive.css` | KEEP | Media queries — **CRITIC pentru mobile**, suntem mobile-first |
| **Async** (preload+swap) | `font-awesome.min.css` | ASYNC | Iconițe cu `font-display:swap` — paint OK fără |
| **Async** | `flat-icon/flaticon.css` | ASYNC | Same |
| **Async** | `owl.carousel.css` | ASYNC | Carousel inițializat de JS după DOMContentLoaded |
| **Async** | `owl.theme.css` | ASYNC | Same |
| **Async** | `jquery-ui.css` | ASYNC | Doar widget interactiv (datepicker), nu above-the-fold |
| **Async** | `animate.css` | ASYNC | Animații scroll-triggered prin `jquery.appear` |
| **Async** | `css3-animation.css` | ASYNC | Animații, nu sunt above-the-fold |

**Pattern aplicat (preload + onload swap + noscript fallback):**
```html
<link rel="preload" href="css/animate.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="css/animate.css"></noscript>
```

**Implementare (commit `perf(faza-3)`):**

1. ✅ **Inventar pattern-uri CSS** — 8 pattern-uri distincte în 26 pagini (grupate după ce CSS-uri folosesc); script Python automat detectează și transformă fiecare formă
2. ✅ **Conversie 7 link-uri sync → async** în toate cele 26 pagini: **150 transformări totale**
3. ✅ **3 din 10 CSS rămân render-blocking** (de la 10) — reducere 70% requests blocking
4. ✅ **`<noscript>` fallback** garantează funcționarea pe browserele cu JS dezactivat
5. ✅ **Smoke test:** 18 pagini reprezentative testate → toate 200 OK

**De ce NU am inlinat critical CSS:**
- Cele 3 CSS care rămân sync (`bootstrap` + `style` + `responsive`) conțin deja TOATE stilurile above-the-fold
- Inline-area lor parțială ar fi duplicare cu risc de inconsistență
- Critical CSS extraction proper necesită tooling (Critical, Penthouse) — out of scope pentru iterație manuală
- Câștigul așteptat din async-ul actual (7 din 10 CSS) e ~80% din câștigul total potențial

**Risc rezidual:**
- Posibil FOUC scurt pe owl carousel buttons (nav/dots) între DOMContentLoaded și încărcarea owl.theme.css — **acceptabil**, fundalul slider-ului e setat în `style.css` care e sync
- Posibil flash scurt al icon-urilor FontAwesome/Flaticon — **mitigat** de `font-display:swap` din Faza 1

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

3. **`width` + `height` explicit pe `<img>` (CLS)** — încă neaplicat sistematic

4. **Inline critical CSS extras cu Critical/Penthouse** (opțional, dacă scor < 85 după Faza 3)
   - Ar permite ASYNC inclusiv pentru `bootstrap` + `style` + `responsive`
   - Necesită build pipeline minimal (Node.js) — utilizatorul a refuzat build pipeline; poate fi rulat o singură dată local, fișierele rezultate commit-ate manual

---

### 🟣 FAZA 5 — Replicare în toate paginile (mecanic)
*Aplicăm Fazele 1-4 în:*
- Toate fișierele HTML din root (Norwegian): `index.html`, `about.html`, `contact.html`, `shop.html`, `service*.html`, `blog.html`, `faq.html`, `ethics.html`, `tantric-massage-in-oslo.html`, `Hva-er-tantramassasje.html`, `harmoni-og-hormonbalanse-gjennom-tantrisk-massasje.html`
- Toate fișierele HTML din `/en/`

---

## 4. METRICI ȚINTĂ & PROGRES REAL

| Metrică | Inițial | Faza 1 (validat) | Faza 2 (validat) | Faza 3 (estimat) | Țintă |
|---|---|---|---|---|---|
| **Performance Score** | 58 | **68** ✅ | **70** ✅ | 78-83 | **85+** |
| **LCP** | 5.9 s | îmbunătățit | **5.4 s** ✅ | < 4 s | < 2.5 s |
| **FCP** | > 2 s | îmbunătățit | la fel | îmbunătățit semnificativ | < 1.8 s |
| **TBT** | mare | redus prin `defer` | la fel | la fel | < 200 ms |
| **Total transfer (homepage)** | ~1 530 KiB | ~1 430 KiB | **~290 KiB** (−1.7 MB imagini) | la fel | < 800 KiB |
| **Render-blocking duration** | 4 380 ms | redus parțial | la fel | **~1 700 ms** (-2 140 ms) | < 500 ms |
| **CSS render-blocking files** | 10 | 10 | 10 | **3** ✅ | 1-2 |

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
| 7 | `perf(faza-2): convert 12 large JPG images to WebP @ q=80, update HTML+CSS refs` | ✅ |
| 8 | **`perf(faza-3): async-load 7 non-critical CSS + convert beautifull-spa.jpg`** | ✅ **CURENT** |
| 9 | `perf(faza-4): lazy-load Google Maps iframe + img width/height for CLS` | 🔜 |
| 10 | `perf(faza-4): inline critical CSS via Penthouse` | 🔜 (opțional, dacă scor < 85) |

**Validare PageSpeed după fiecare commit major:**
- După #6 (Faza 1): **58 → 68** (+10) — confirmat de utilizator 2026-04-25
- După #7 (Faza 2 imagini): **68 → 70** (+2, LCP 5.9s → 5.4s) — confirmat de utilizator 2026-04-25
- După #8 (Faza 3 async CSS): TBD — utilizatorul va testa și raporta
- După #9-10: TBD

Fiecare commit este reversibil independent dacă apare o regresie.
