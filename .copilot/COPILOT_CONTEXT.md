# COPILOT_CONTEXT.md — MassageART Oslo
> AI-optimized project context. Last updated: 2026-04-25.
> Repo: https://github.com/karen20dec4/MassageArt | Branch: `master`

---

## 1. TECH STACK

| Layer | Technology |
|---|---|
| **Type** | Static HTML/CSS/JS site (NOT CMS / NOT WordPress) |
| **CSS Framework** | Bootstrap 3 (bootstrap.min.css / bootstrap.min.js) |
| **JS Core** | jQuery 1.11.3 + jQuery UI |
| **Animations** | Animate.css, css3-animation.css, jquery.appear.js |
| **Carousel** | OWL Carousel (owl.carousel.min.js) |
| **Lightbox** | Nivo Lightbox |
| **Scroll** | jquery.nicescroll.js |
| **Icons** | Font Awesome 4.x + FlatIcon custom set |
| **Fonts** | Google Fonts: Open Sans, Raleway, Playfair Display |
| **Backend** | PHP — `send_email.php` (contact form handler, root level) |
| **Maps** | Google Maps iframe embed |
| **SEO Verify** | Google Search Console (`en/googlea28ee453fc5101d2.html`) |
| **Per-page scripts** | `js/index-script.js`, `contact-script.js`, `service-script.js`, `about-script.js`, etc. |

**No build system / no package manager detected.** Pure HTML files deployed directly to web server.

---

## 2. SITEMAP & PAGE HIERARCHY

### Language Structure
- **English version:** `/en/*.html`
- **Norwegian version:** `/*.html` (root — mirror pages via `hreflang`)
- Language switcher: fixed pill widget bottom-right (EN ↔ NO)

### Navigation Menu (both languages)
```
HOME → About Us → Prices → Services▾ → Blog → FAQ → Contact
                              ├─ Tantra Massage for Men
                              ├─ Tantra Massage for Women
                              └─ Tantric Massage for Couples
```

### All Pages (`/en/` — English)
| File | Title / Purpose |
|---|---|
| `index.html` | Homepage (hero, intro, CTA) |
| `about.html` | Our Philosophy / About MassageART |
| `shop.html` | Prices & Session Packages |
| `service.html` | Tantra Massage for Men |
| `service-woman.html` | Tantra Massage for Women |
| `service-couple.html` | Tantric Massage for Couples |
| `contact.html` | Contact + Map + Message Form |
| `blog.html` | Blog listing page |
| `faq.html` | Frequently Asked Questions |
| `ethics.html` | Ethics & Professional Commitment |
| `tantric-massage-in-oslo.html` | SEO landing page |
| `What-is-a-Tantra-Massage.html` | Blog article |
| `harmony-and-hormonal-balance-through-tantra-massage.html` | Blog article |

Norwegian root mirrors: `about.html`, `shop.html`, `service.html`, `service-woman.html`, `service-couple.html`, `contact.html`, etc.

---

## 3. FILE STRUCTURE

```
MassageArt/
├── en/                          # English version (active development)
│   ├── index.html
│   ├── about.html
│   ├── shop.html                # Prices page
│   ├── service.html             # Service: Men
│   ├── service-woman.html       # Service: Women
│   ├── service-couple.html      # Service: Couples
│   ├── contact.html
│   ├── blog.html
│   ├── faq.html
│   ├── ethics.html
│   ├── tantric-massage-in-oslo.html
│   ├── What-is-a-Tantra-Massage.html
│   ├── harmony-and-hormonal-balance-through-tantra-massage.html
│   ├── googlea28ee453fc5101d2.html  # GSC verification
│   ├── index_.html              # Draft/backup
│   ├── about_orig.html          # Backup
│   └── contact_.html            # Draft/backup
│
├── [root *.html]                # Norwegian versions (hreflang="no")
│
├── css/
│   ├── style.css                # Main custom styles (~105KB)
│   ├── style_orig.css           # Backup of style.css
│   ├── responsive.css           # Media queries (~46KB)
│   ├── bootstrap.min.css
│   ├── animate.css
│   ├── css3-animation.css
│   ├── common-style.css
│   ├── jquery-ui.css
│   ├── home-2-style.css
│   ├── home-3-style.css
│   ├── owl.carousel.css
│   ├── owl.theme.css
│   ├── nivo-default.css
│   └── nivo-lightbox.css
│
├── js/
│   ├── jquery-1.11.3.min.js
│   ├── bootstrap.min.js
│   ├── jquery-ui.min.js
│   ├── common-script.js         # Shared across all pages
│   ├── index-script.js          # Homepage specific
│   ├── index-2-script.js
│   ├── index-3-script.js
│   ├── contact-script.js        # Form validation + submission
│   ├── service-script.js
│   ├── about-script.js
│   ├── gallery-script.js
│   ├── gallery-2-script.js
│   ├── gallery-3-script.js
│   ├── shop-details-script.js
│   ├── team-script.js
│   ├── progressbar.js
│   ├── jquery.nicescroll.js
│   ├── jquery.appear.js
│   ├── jquery.animateNumber.min.js
│   ├── nivo-lightbox.min.js
│   └── owl.carousel.min.js
│
├── images/
│   ├── home-1/logo.png          # Navbar logo
│   ├── logo.png                 # Footer logo
│   ├── favicon.png
│   ├── flag_en.png              # Language switcher flag
│   ├── whatsapp-logo-small.png
│   ├── about/
│   └── shop/
│
├── font-awesome/css/font-awesome.min.css
├── flat-icon/flaticon.css
├── send_email.php               # PHP contact form mailer
└── .gitignore
```

> **Drafts/backups naming convention:** `*_orig.html` and `*_.html` (underscore suffix)

---

## 4. KEY FUNCTIONALITIES

### 4.1 Contact Form
- **Location:** `en/contact.html` → section `.leave-message`
- **Fields:** Name (text), Phone (tel), Email (email), Message (textarea) — all `required`
- **Action:** `POST ../send_email.php`
- **Handler:** `js/contact-script.js` (client-side validation + submission)
- **No online booking widget** — all reservations via phone/WhatsApp/email

### 4.2 Booking System
- ⚠️ **No integrated booking platform** (no Booksy, Timely, Acuity, Calendly, etc.)
- All CTA buttons on service/pricing pages link to `contact.html`
- Primary booking channel: WhatsApp `https://wa.me/4793934188`
- Secondary: Phone call `tel:+4793934188`
- Floating call button (`#floating-call-btn`) fixed on all pages

### 4.3 Payments
- ⚠️ **No payment integration detected** (no Stripe, Vipps, PayPal, Klarna, etc.)
- Payments handled in person at time of service

### 4.4 Interactive Elements
| Element | Description |
|---|---|
| Pre-loader | `.pre-loder` spinner div on every page load |
| Language switcher | Fixed pill bottom-right, EN/NO toggle |
| Floating call button | Fixed SVG phone icon → `tel:+4793934188` |
| Bootstrap navbar | Responsive hamburger mobile, dropdown Services menu |
| OWL Carousel | Image/testimonial sliders on homepage |
| Google Maps iframe | Full-width embed on contact page (Bjørvika, Oslo) |
| Animate on scroll | `jquery.appear.js` + `animate.css` for section reveals |
| Number counters | `jquery.animateNumber.min.js` on about page |
| Nice Scroll | Custom scrollbar styling |

### 4.5 SEO Setup
- `<link rel="canonical">` on every page
- `hreflang="en"` + `hreflang="no"` alternate links on all pages
- Meta description + keywords per page
- Proper h1/h2 heading hierarchy on each page

---

## 5. BUSINESS INFORMATION

| Field | Value |
|---|---|
| **Business Name** | MassageART Oslo |
| **Location** | Bjørvika, Oslo Sentrum, Norway |
| **Phone / WhatsApp** | +47 939 341 88 |
| **Email** | massageartoslo@gmail.com |
| **Hours** | Mon–Sat: 10:00–22:00 / Sun: 11:00–22:00 |
| **Facebook** | https://www.facebook.com/share/17ZKPwMYmU/ |
| **Instagram** | https://www.instagram.com/autentisk_tantrisk_massasje |
| **Service model** | Mobile outcall — therapist travels to client's hotel/home |

### Pricing (from `en/shop.html`)
| Package | Duration | Price (NOK) |
|---|---|---|
| Standard | 1h | 1 700 Kr |
| Standard | 1.5h | 2 100 Kr |
| Standard | 2h | 2 700 Kr |
| Deep Energy | 1.5h | 3 200 Kr |
| Deep Energy | 2h | 3 700 Kr |
| Divine Escape VIP | 2.5h | 4 600 Kr |
| Divine Escape VIP | 3h | 5 500 Kr |
| Couples | 1.5h | 4 200 Kr |
| Couples | 2h | 5 300 Kr |
| 4-Hands | 1h | 3 300 Kr |
| 4-Hands | 1.5h | 4 100 Kr |

**Add-ons (à la carte):**
- Goddess Bath: +300/500 Kr
- Harmony Flow: +500 Kr
- Supreme Zen Ritual (Lingam): +700 Kr
- Sensory Ritual: +500 Kr
- Extra 30 minutes: +700 Kr
- **Special 2+1 offer:** buy 2 add-ons, get 3rd free

---

## 6. UX/UI ANALYSIS

### Visual Language
- **Aesthetic:** Dark luxury / sensual wellness — dark backgrounds, olive-gold CTAs
- **Primary accent color:** `#85ad00` / `#88a800` (olive green) for CTA buttons
- **Typography:** Raleway (headings, bold), Open Sans (body/UI), Playfair Display italic (taglines)
- **Imagery:** Atmospheric — candles, silk textures, stones, moody tones
- **Color palette:** Dark charcoal base, olive-green CTAs, white body text

### UX Patterns
- Every service page ends with CTA button → `contact.html`
- Footer repeats full contact info (phone, WhatsApp, email, address, hours) on every page
- Ethics disclaimer (professional/non-sexual) in footer on every page
- Breadcrumb navigation on all inner pages
- Bootstrap 3 responsive grid; mobile hamburger nav

### UX Pain Points / Known Issues
- ⚠️ No online booking system — high conversion friction
- ⚠️ No payment processing
- ⚠️ Language switcher on `/en/` pages links to root `/` (not `/no/`) — inconsistent
- ⚠️ jQuery 1.11.3 is outdated (2015); Bootstrap 3 is EOL
- ⚠️ Draft files (`index_.html`, `contact_.html`, `about_orig.html`) committed to repo
- ⚠️ No shared template/component system — nav/footer duplicated in every HTML file
- ⚠️ Inline styles scattered throughout HTML (not consolidated in CSS)

---

## 7. DEVELOPMENT WORKFLOW NOTES

- **No build pipeline** — edit HTML/CSS/JS files directly, deploy to server
- **Primary CSS:** `css/style.css` (~105KB) — all custom overrides here
- **Responsive CSS:** `css/responsive.css` (~46KB) — all media queries
- **Per-page JS pattern:** every page loads `common-script.js` + its own `*-script.js`
- **Bilingual strategy:** EN = `/en/`, NO = root `/` — full HTML duplicates (no i18n framework)
- **Active branch:** `master` (single branch, no dev/staging branch)
- **Last commit:** 2026-04-13 — "update html sections for massage pages"
- **IDE:** JetBrains (`.idea/` excluded via `.gitignore`)

---

## 8. QUICK REFERENCE — FILES FOR COMMON TASKS

| Task | File(s) to edit |
|---|---|
| Change nav menu | Every `*.html` `<header>` section (no template engine — edit all files) |
| Update prices | `en/shop.html` + Norwegian root `shop.html` |
| Edit contact info | Footer in every HTML file + `en/contact.html` |
| Add a new page | Create `en/newpage.html`, manually add nav link to all pages |
| Global style changes | `css/style.css` (primary) |
| Mobile/responsive fixes | `css/responsive.css` |
| Contact form logic | `js/contact-script.js` + `send_email.php` |
| Add booking widget | `en/contact.html` — replace/augment `.leave-message` section |
| SEO meta tags | `<head>` of each individual HTML file |
| Add blog article | Create new `en/*.html` file, link from `en/blog.html` |

---

## 9. PERFORMANCE BASELINE (PageSpeed Insights, Mobile — 2026-04-25)

| Metric | Value |
|---|---|
| **Performance Score** | **58 / 100** |
| Render-blocking duration | ~4 380 ms (10 CSS files + 3 separate Google Fonts) |
| Cache TTL on static assets | **None** (1 530 KiB re-downloaded each visit) |
| Unused CSS rules | ~365 KiB across `bootstrap.min.css`, `style.css`, `animate.css`, `responsive.css`, `jquery-ui.css`, `font-awesome.min.css` |
| Heaviest JS | `jquery-ui.min.js` (235 KB) — loaded on every page even when unused |
| Heaviest images | `slider/slider-2-about.jpg` (175 KB), `slider/slider-1.jpg` (173 KB) |
| Font display | not `swap` for Flaticon, FontAwesome, Google Fonts |

Full report: `.copilot/raport-seo-mobile.txt`
Active optimization plan: `.copilot/MOBILE_OPTIMIZATION_PLAN.md`

### Files known to have NO build pipeline (manual edits required across all of them)
- All `*.html` at root (NO version)
- All `en/*.html` (EN version)
- `.htaccess` (root) — handles HTTPS redirect, www→non-www, index.html canonicalization

### Backup / draft files to ignore when batch-editing
- `index_3dec2025.html`, `*_orig.html`, `*_.html`, `contact_.html`
- `no_OLD/` (old Norwegian directory — kept for reference)
- `test/` directory
