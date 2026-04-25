# PLAN DE OPTIMIZARE MOBILE — MassageART Oslo
> Bazat pe raportul PageSpeed Insights: **Performance Score 59/100** (Mobile)
> Generat: 2026-04-25 | Fișier: `.copilot/MOBILE_OPTIMIZATION_PLAN.md`

---

## DIAGNOSTIC: Probleme Identificate

### 🔴 CRITIC #1 — Render-Blocking Resources (economie estimată: ~4,700 ms)

**23 secunde** de blocare totală a render-ului datorită CSS-ului încărcat sincron în `<head>`:

| Fișier | Mărime | Timp blocare |
|---|---|---|
| `css/bootstrap.min.css` | 119 KB | **5,690 ms** |
| `css/style.css` | 103 KB | **4,860 ms** |
| `css/animate.css` | 71 KB | **3,860 ms** |
| `css/responsive.css` | 46 KB | **2,860 ms** |
| `css/jquery-ui.css` | 35 KB | **2,520 ms** |
| `font-awesome/font-awesome.min.css` | 26 KB | **1,690 ms** |
| `flat-icon/flaticon.css` | 3.3 KB | 680 ms |
| `css/owl.carousel.css` | 1.7 KB | 520 ms |
| `css/owl.theme.css` | 1.9 KB | 520 ms |
| Google Fonts (3 cereri separate) | 4.9 KB | **2,250 ms** |

### 🔴 CRITIC #2 — No Cache Headers (1,530 KB fără cache, Cache TTL: None)

Toate resursele statice se re-descarcă la fiecare vizită:

| Resursă | Mărime |
|---|---|
| `js/jquery-ui.min.js` | 235 KB |
| Imagini slider (4 fișiere) | ~580 KB |
| `css/bootstrap.min.css` | 119 KB |
| `css/style.css` | 103 KB |
| `js/jquery-1.11.3.min.js` | 94 KB |
| fontawesome-webfont.woff2 | 63 KB |
| + alte 20 resurse | ~336 KB |

---

## PLAN DE ACȚIUNE (Prioritizat)

---

### ✅ TASK 1 — Browser Caching via `.htaccess`
**Impact: Ridicat | Efort: Mic | Fișier: `.htaccess` (root)**
**Economie estimată: 1,530 KB re-descărcări eliminate**

Adaugă în `.htaccess` (după regulile existente de HTTPS/www):

```apache
# =============================================
# BROWSER CACHING — MassageART Performance Fix
# =============================================
<IfModule mod_expires.c>
    ExpiresActive On

    # HTML — cache scurt (conținut se poate schimba)
    ExpiresByType text/html                    "access plus 1 hour"

    # CSS și JavaScript — 1 an (versionate prin filename dacă se schimbă)
    ExpiresByType text/css                     "access plus 1 year"
    ExpiresByType application/javascript       "access plus 1 year"
    ExpiresByType text/javascript              "access plus 1 year"

    # Imagini — 6 luni
    ExpiresByType image/jpeg                   "access plus 6 months"
    ExpiresByType image/png                    "access plus 6 months"
    ExpiresByType image/webp                   "access plus 6 months"
    ExpiresByType image/svg+xml                "access plus 6 months"
    ExpiresByType image/x-icon                 "access plus 1 year"

    # Fonturi — 1 an
    ExpiresByType font/woff2                   "access plus 1 year"
    ExpiresByType font/woff                    "access plus 1 year"
    ExpiresByType application/font-woff2       "access plus 1 year"
    ExpiresByType application/font-woff        "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
    # CSS, JS, fonturi, imagini — immutable 1 an
    <FilesMatch "\.(css|js|woff|woff2|ttf|eot|jpg|jpeg|png|gif|svg|ico|webp)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
    # HTML — fără cache agresiv
    <FilesMatch "\.html$">
        Header set Cache-Control "public, max-age=3600, must-revalidate"
    </FilesMatch>
</IfModule>
```

---

### ✅ TASK 2 — Eliminare Render-Blocking CSS
**Impact: Critic | Efort: Mediu | Fișiere: toate `*.html`**
**Economie estimată: ~4,700 ms FCP/LCP**

#### 2a. CSS Non-Critic → Async Load

Înlocuiește în `<head>` al fiecărui fișier HTML, pattern-ul:
```html
<!-- ÎNAINTE (render-blocking) -->
<link href="../css/animate.css" rel="stylesheet">
<link href="../css/css3-animation.css" rel="stylesheet">
<link href="../css/owl.carousel.css" rel="stylesheet">
<link href="../css/owl.theme.css" rel="stylesheet">
<link href="../css/jquery-ui.css" rel="stylesheet">
```

Cu varianta async (non-blocking):
```html
<!-- DUPĂ (async, non-blocking) -->
<link rel="preload" href="../css/animate.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="../css/css3-animation.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="../css/owl.carousel.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="../css/owl.theme.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="../css/jquery-ui.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<!-- Fallback pentru browsere fără JS -->
<noscript>
  <link href="../css/animate.css" rel="stylesheet">
  <link href="../css/css3-animation.css" rel="stylesheet">
  <link href="../css/owl.carousel.css" rel="stylesheet">
  <link href="../css/owl.theme.css" rel="stylesheet">
  <link href="../css/jquery-ui.css" rel="stylesheet">
</noscript>
```

> **Notă:** `bootstrap.min.css`, `style.css`, `responsive.css` trebuie să rămână blocante (sunt critice pentru layout). Se optimizează prin Critical CSS Inline (Task 3).

#### 2b. Google Fonts → Async + font-display:swap

```html
<!-- ÎNAINTE (3 cereri blocante) -->
<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Raleway:800,700,600,300' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Playfair+Display:400italic' rel='stylesheet' type='text/css'>
```

```html
<!-- DUPĂ (1 cerere preconnect + async + font-display:swap) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style"
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@300;600;700;800&family=Playfair+Display:ital@1&display=swap"
      onload="this.onload=null;this.rel='stylesheet'">
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@300;600;700;800&family=Playfair+Display:ital@1&display=swap" rel="stylesheet">
</noscript>
```

> **Beneficiu suplimentar:** `display=swap` în URL = `font-display: swap` automat, elimină FOIT (Flash of Invisible Text).

---

### ✅ TASK 3 — Critical CSS Inline
**Impact: Ridicat | Efort: Mediu | Fișier: `en/index.html` (homepage prima)**

Extrage stilurile CSS necesare pentru above-the-fold (header + hero + navbar) și injectează-le direct în `<style>` în `<head>`. Lasă restul CSS să se încarce async.

**Ce să inlinezi:**
- Stiluri navbar (`.navbar`, `.navbar-brand`, `.navbar-header`)
- Hero/banner section (`.banar`, `.hero-section`)  
- Pre-loader (`.pre-loder`)
- Font declarations de bază
- Body background, text color

**Unelte recomandate:**
- [Critical](https://github.com/addyosmani/critical) (Node.js CLI)
- [CriticalCSS](https://jonassebastianohlsson.com/criticalpathcssgenerator/) (online)

---

### ✅ TASK 4 — Optimizare Imagini
**Impact: Ridicat | Efort: Mediu | Folder: `images/`**

#### 4a. Compresie imagini existente (JPEG)
Fișierele slider sunt mari și fără cache:
- `slider-2-about.jpg` — 175 KB → țintă: ≤50 KB
- `slider-1.jpg` — 173 KB → țintă: ≤50 KB
- `home-img1.jpg` — 59 KB → țintă: ≤25 KB
- `slider-0.jpg` — 52 KB → țintă: ≤25 KB

**Unelte:** [Squoosh.app](https://squoosh.app), ImageOptim, TinyPNG

#### 4b. Convertire la WebP
```html
<!-- Folosește <picture> pentru WebP cu fallback JPEG -->
<picture>
  <source srcset="../images/home-1/home-img1.webp" type="image/webp">
  <img src="../images/home-1/home-img1.jpg" alt="..." loading="lazy">
</picture>
```

#### 4c. Lazy Loading pentru imagini below-fold
Adaugă `loading="lazy"` la toate imaginile care nu sunt vizibile la prima încărcare:
```html
<img src="..." alt="..." loading="lazy">
```
> **Excepție:** Hero image (primul slider) → NU adăuga lazy (este LCP element).

#### 4d. Logo PNG → SVG sau WebP
`/images/logo.png` (33 KB) și `/images/home-1/logo.png` (13 KB) pot fi convertite la SVG pentru scalabilitate fără pierdere de calitate.

---

### ✅ TASK 5 — JavaScript Defer/Async
**Impact: Mediu | Efort: Mic | Fișiere: toate `*.html`**

```html
<!-- ÎNAINTE -->
<script src="../js/jquery-1.11.3.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../js/jquery-ui.min.js"></script>
<script src="../js/jquery.nicescroll.js"></script>
```

```html
<!-- DUPĂ — jQuery core rămâne sincron (dependent), restul defer -->
<script src="../js/jquery-1.11.3.min.js"></script>
<script defer src="../js/bootstrap.min.js"></script>
<script defer src="../js/jquery-ui.min.js"></script>
<script defer src="../js/jquery.nicescroll.js"></script>
<script defer src="../js/common-script.js"></script>
<script defer src="../js/index-script.js"></script>
```

> **jquery-ui.min.js (235 KB!)** — dacă nu e folosit datepicker pe pagina respectivă, elimină-l complet.

---

### ✅ TASK 6 — Consolidare CSS (Reducere HTTP Requests)
**Impact: Mediu | Efort: Mare | Fișiere: `css/`**

Mergeți fișierele mici împreună pentru a reduce cererile HTTP:

```
ACTUAL (9 cereri CSS):             DUPĂ (3-4 cereri CSS):
├── bootstrap.min.css       →      ├── bootstrap.min.css (neschimbat)
├── style.css               →      ├── style.min.css (style + responsive + common mergeate)
├── responsive.css          →      ├── icons.min.css (font-awesome + flaticon mergeate)
├── common-style.css        →      └── [animate + owl + jquery-ui → async, vezi Task 2]
├── font-awesome.min.css    →
├── flaticon.css            →
├── animate.css             →      (async)
├── owl.carousel.css        →      (async)
└── jquery-ui.css           →      (async, doar pe paginile care îl folosesc)
```

---

### ✅ TASK 7 — Upgrade jQuery (Opțional, risc mediu)
**Impact: Mic-Mediu | Efort: Mare**

jQuery 1.11.3 (2015) → jQuery 3.7.x
- Fișier mai mic după gzip
- Securitate îmbunătățită
- **Risc:** Posibile breaking changes în cod custom — testare completă necesară

---

## ESTIMARE IMPACT

| Task | Economie estimată | Dificultate | Prioritate |
|---|---|---|---|
| 1. Browser Caching (.htaccess) | 1,530 KB/vizită | ⭐ Ușor | 🔴 Acum |
| 2. Google Fonts async + preconnect | ~750ms FCP | ⭐ Ușor | 🔴 Acum |
| 2. CSS non-critic async | ~2,000ms render | ⭐⭐ Mediu | 🔴 Acum |
| 4. Compresie imagini | ~500 KB/pagină | ⭐ Ușor | 🟠 Săptămâna asta |
| 4. Lazy loading imagini | LCP îmbunătățit | ⭐ Ușor | 🟠 Săptămâna asta |
| 3. Critical CSS inline | FCP -1,000ms | ⭐⭐⭐ Greu | 🟡 Luna asta |
| 5. JS defer | TTI îmbunătățit | ⭐ Ușor | 🟠 Săptămâna asta |
| 6. Consolidare CSS | -6 HTTP requests | ⭐⭐ Mediu | 🟡 Luna asta |

**Scor estimat după Task 1+2+4+5:** ~75-80/100
**Scor estimat după toate task-urile:** ~85-90/100

---

## ORDINE RECOMANDATĂ DE IMPLEMENTARE

```
Săptămâna 1 (quick wins):
  1. .htaccess → cache headers         (30 min)
  2. Google Fonts → 1 cerere async     (15 min per pagină × 13 pagini)
  3. CSS non-critic → preload async    (20 min per pagină × 13 pagini)
  4. JS → defer                        (10 min per pagină × 13 pagini)
  5. Imagini → compresie + lazy load   (2-4 ore)

Săptămâna 2 (optimizări medii):
  6. Consolidare CSS (merge fișiere)
  7. WebP pentru imagini principale

Săptămâna 3+ (optimizări avansate):
  8. Critical CSS inline pe homepage
  9. Evaluare jQuery upgrade
```

---

## NOTE IMPORTANTE

- **Toate paginile `.html` trebuie modificate manual** (EN + NO) — nu există template engine
- Testează în PageSpeed Insights după fiecare task pentru a valida impactul
- Prioritizează `en/index.html` (homepage) — cel mai accesat
- Backup obligatoriu înainte de orice modificare CSS majoră
