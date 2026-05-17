# MassageART Oslo — Extended Site Documentation

> Purpose: help a future AI coding agent understand the site quickly and make safe edits.
> Status: verified against repo state on 2026-05-17. The seed for this file was
> `copilot-logs-screenshoots/comprehensive-documentation.md`; every claim below was
> re-checked against the current files. Items that could not be fully verified are marked
> **Needs verification**.

---

## 1. Project Overview

| Field | Value |
|---|---|
| **Site** | https://massageart.no |
| **Repo** | https://github.com/karen20dec/MassageArt (branch `master`) |
| **Type** | Static HTML/CSS/JS — **no build step, no framework runtime, no package manager** |
| **Languages** | Norwegian (NO, default) at root, English (EN) under `/en/` |
| **CSS framework** | Bootstrap **3** (do not upgrade to 4/5) |
| **JS** | jQuery 1.11.3 + jQuery UI, OWL Carousel, Nivo Lightbox, jquery.nicescroll, jquery.appear, Animate.css |
| **Icons** | Font Awesome 4.x + custom FlatIcon set in `flat-icon/` |
| **Fonts** | Google Fonts: Open Sans, Raleway, Playfair Display |
| **Server** | Apache (`.htaccess` handles HTTPS, www→non-www, legacy `/no/*` redirects, gzip/brotli, cache headers) |
| **Backend** | `send_email.php` — PHP `mail()` to `contact@massageart.no` |
| **Booking / payments** | None integrated. All CTAs lead to `contact.html`; primary booking channel is WhatsApp. |

**How to edit:** open the `.html` / `.css` / `.js` files directly and deploy them to the Apache document root. There is no build artifact, no transpiler, no CI. Bootstrap 3 and jQuery 1.11.3 are EOL but the markup is deeply coupled to both — do **not** silently migrate.

---

## 2. Folder and File Structure

```
MassageArt/
├── *.html                     # Norwegian (NO) pages — root level (ACTIVE)
├── en/                        # English (EN) mirror pages (ACTIVE)
├── css/                       # All stylesheets (ACTIVE)
├── js/                        # All client-side scripts (ACTIVE)
├── images/                    # All site images (ACTIVE)
│   ├── home-1/                # Home hero, services, logos
│   ├── about/                 # About-page imagery
│   ├── blog/                  # Blog article + thumb images (.webp preferred)
│   ├── contact/               # Contact-page imagery
│   ├── footer/, gallery/, …   # Other section assets
├── font-awesome/              # Font Awesome 4.x bundle (vendor — do not edit)
├── flat-icon/                 # FlatIcon custom set (vendor — do not edit)
├── fonts/                     # Local font files (vendor — do not edit)
├── cgi-bin/                   # Apache cgi-bin (likely empty — do not edit)
├── send_email.php             # Contact-form mail handler (ACTIVE)
├── test-email.php             # Standalone PHP mail smoke test (DEV ONLY)
├── _info.php                  # phpinfo()-style probe (DEV ONLY — remove before prod if sensitive)
├── sitemap.xml                # XML sitemap (ACTIVE — see §9)
├── robots.txt                 # Allow all + disallow /no_OLD/, points to sitemap (ACTIVE)
├── llms.txt                   # Intentionally empty marker (ACTIVE)
├── .htaccess                  # Apache rewrites, headers, caching (ACTIVE)
├── CLAUDE.md                  # AI agent (Claude Code) guidance — ACTIVE
├── extended-documentation.md  # This file — ACTIVE
├── no_OLD/                    # ARCHIVE — old Norwegian pages. Disallowed in robots.txt. Do NOT edit/deploy.
├── test/                      # Dev sandbox (mail_test). Do NOT edit/deploy.
└── .copilot/                  # COPILOT_CONTEXT.md + raport-seo-mobile.txt (reference docs)
```

### Files that should NOT be edited / deployed

| File / folder | Reason |
|---|---|
| `no_OLD/` | Archived old NO site. Blocked by `robots.txt`. |
| `test/` | Mail-test sandbox. |
| `contact_.html`, `en/contact_.html` | Draft/backup versions, not linked. |
| `index_3dec2025.html` | Dated archive of the homepage. |
| `en/about_orig.html`, `en/index_.html` | Backup/draft variants. |
| `css/style_orig.css` | Backup of `style.css`. |
| `en/googlea28ee453fc5101d2.html`, `googlea28ee453fc5101d2.html` | Google Search Console verification — leave untouched. |
| `_info.php`, `test-email.php` | Dev/diagnostic scripts. Verify with owner before publishing or removing. |
| `temp.txt` | Scratch file. Safe to ignore. |
| `font-awesome/`, `flat-icon/`, `fonts/`, `js/jquery*.min.js`, `js/bootstrap.min.js`, `js/owl.carousel.min.js`, `js/nivo-lightbox.min.js`, `js/jquery.nicescroll.js`, `css/bootstrap.min.css`, `css/animate.css`, `css/jquery-ui.css`, `css/owl.*.css`, `css/nivo-*.css` | Third-party vendor bundles. Edit our own CSS/JS, not these. |

---

## 3. Active Pages

All NO pages live at the repo root; their EN counterpart lives in `en/`. Most filenames mirror across languages — the three exceptions are the long-form articles.

### Norwegian (NO) — root level

| File | URL | Purpose | EN counterpart |
|---|---|---|---|
| `index.html` | `/` | Home page | `en/index.html` |
| `about.html` | `/about.html` | About / philosophy | `en/about.html` |
| `service.html` | `/service.html` | Tantra massage **for men** | `en/service.html` |
| `service-woman.html` | `/service-woman.html` | Tantra massage **for women** | `en/service-woman.html` |
| `service-couple.html` | `/service-couple.html` | Tantra massage **for couples** | `en/service-couple.html` |
| `service-vip.html` | `/service-vip.html` | Tantrisk Luxury VIP (Devine Escape) | `en/service-vip.html` |
| `shop.html` | `/shop.html` | Prices & packages | `en/shop.html` |
| `blog.html` | `/blog.html` | Blog index (single-page list, see §6) | `en/blog.html` |
| `faq.html` | `/faq.html` | FAQ | `en/faq.html` |
| `contact.html` | `/contact.html` | Contact + form + map | `en/contact.html` |
| `ethics.html` | `/ethics.html` | Ethics & professional commitment | `en/ethics.html` |
| `tantric-massage-in-oslo.html` | `/tantric-massage-in-oslo.html` | SEO landing page | `en/tantric-massage-in-oslo.html` |
| `Hva-er-tantramassasje.html` | `/Hva-er-tantramassasje.html` | Long-form article: "What is tantramassasje?" | `en/What-is-a-Tantra-Massage.html` |
| `harmoni-og-hormonbalanse-gjennom-tantrisk-massasje.html` | `/harmoni-og-...` | Long-form article: hormonal balance | `en/harmony-and-hormonal-balance-through-tantra-massage.html` |

### English (EN) — `en/` folder

| File | URL | Purpose | NO counterpart |
|---|---|---|---|
| `en/index.html` | `/en/` | Home page | `index.html` |
| `en/about.html` | `/en/about.html` | About / philosophy | `about.html` |
| `en/service.html` | `/en/service.html` | Tantra massage **for men** | `service.html` |
| `en/service-woman.html` | `/en/service-woman.html` | Tantra massage **for women** | `service-woman.html` |
| `en/service-couple.html` | `/en/service-couple.html` | Tantra massage **for couples** | `service-couple.html` |
| `en/service-vip.html` | `/en/service-vip.html` | Tantric Luxury VIP (Devine Escape) | `service-vip.html` |
| `en/shop.html` | `/en/shop.html` | Prices & packages | `shop.html` |
| `en/blog.html` | `/en/blog.html` | Blog index | `blog.html` |
| `en/faq.html` | `/en/faq.html` | FAQ | `faq.html` |
| `en/contact.html` | `/en/contact.html` | Contact + form + map | `contact.html` |
| `en/ethics.html` | `/en/ethics.html` | Ethics statement | `ethics.html` |
| `en/tantric-massage-in-oslo.html` | `/en/tantric-massage-in-oslo.html` | SEO landing page | `tantric-massage-in-oslo.html` |
| `en/What-is-a-Tantra-Massage.html` | `/en/What-is-a-Tantra-Massage.html` | Long-form article | `Hva-er-tantramassasje.html` |
| `en/harmony-and-hormonal-balance-through-tantra-massage.html` | `/en/harmony-...` | Long-form article | `harmoni-og-hormonbalanse-...` |

---

## 4. Bilingual Structure

- **Language root rule:** NO at `/`, EN at `/en/`. The `lang="…"` attribute on `<html>` reflects this (`lang="no"` at root, `lang="en"` in `en/`).
- **Relative path differences:** EN pages reference assets with `../` prefix (e.g. `../css/style.css`, `../images/logo.png`, `../js/jquery-1.11.3.min.js`). NO pages reference them directly (`css/style.css`, `images/logo.png`, `js/...`).
- **Contact form action:**
  - NO: `<form action="send_email.php" method="POST">`
  - EN: `<form action="../send_email.php" method="POST">`
  Same PHP handler for both.
- **Language switcher** (fixed bottom-right on every page, defined inline in each file's `<style>` block):

  Norwegian page → switcher points "EN" at the EN sibling, "NO" marked active (no flag image on EN link, NO link shows `flag_no.png`):
  ```html
  <div class="language-switcher">
      <a href="en/<page>.html"><span>EN</span></a>
      <div class="separator"></div>
      <a href="<page>.html" class="active"><img src="images/flag_no.png" alt="Norwegian"><span>NO</span></a>
  </div>
  ```
  English page → reverse, with `flag_en.png` on the active EN link and "NO" linking back up one level:
  ```html
  <div class="language-switcher">
      <a href="<page>.html" class="active"><img src="../images/flag_en.png" alt="English"><span>EN</span></a>
      <div class="separator"></div>
      <a href="../<page>.html"><span>NO</span></a>
  </div>
  ```
  > **Drift observed:** on `en/index.html` the EN link is `/en` (absolute) and the NO link is `../`; on `en/blog.html` both links are absolute URLs (`https://massageart.no/en/blog.html` and `https://massageart.no/blog.html`). Mixed styles across pages, all functional. **Needs verification** whether you should standardize to relative paths when editing.

- **Filename mismatches across languages** (the only three you must remember):
  | NO filename | EN filename |
  |---|---|
  | `Hva-er-tantramassasje.html` | `What-is-a-Tantra-Massage.html` |
  | `harmoni-og-hormonbalanse-gjennom-tantrisk-massasje.html` | `harmony-and-hormonal-balance-through-tantra-massage.html` |
  | (NO uses Norwegian words, e.g. menu labels "TJENESTER / OM OSS / PRISER") | (EN uses "Services / About Us / Prices") |

- **Bilingual edit rule:** any content / functionality / structural change must be applied to BOTH the NO file at root and its EN counterpart in `en/`, unless the user explicitly scopes it to one language.

---

## 5. Navigation, Footer, and Repeated Blocks

There is **no template engine**. Every HTML page contains a hand-duplicated header, footer, language switcher, pre-loader, and floating call button. Any change to these blocks must be repeated across all active pages (NO root + `en/`).

### Repeated blocks (present on every active page)

| Block | Element / class | Where it lives |
|---|---|---|
| Pre-loader | `<div class="pre-loder"><div class="loding"></div></div>` | Top of `<body>` |
| Header / navbar | `<header class="common-header">` with `.navbar` inside | Top of `<body>` after pre-loader |
| Footer | `<footer>` with `.victoria` + `.footer-about` columns | Bottom of `<body>` |
| Language switcher | `<div class="language-switcher">` | Sibling of footer (fixed-positioned) |
| Floating call button | `<a id="floating-call-btn" href="tel:+4793934188">` | Sibling of footer (fixed-positioned) |
| Google Maps iframe | Only on `contact.html` / `en/contact.html` | Inside the contact section |

### Nav menu (must stay in sync between every NO page and every EN page)

| NO label | NO link | EN label | EN link |
|---|---|---|---|
| HJEM | `.` | HOME | `.` |
| OM OSS | `about.html` | About Us | `about.html` |
| PRISER | `shop.html` | Prices | `shop.html` |
| TJENESTER ▾ | dropdown | Services ▾ | dropdown |
| — Tantra Massasje for Menn | `service.html` | — Tantra Massage for Men | `service.html` |
| — Tantra Massasje for Kvinner | `service-woman.html` | — Tantra Massage for Women | `service-woman.html` |
| — Tantric Massasje for Par | `service-couple.html` | — Tantric Massage for Couples | `service-couple.html` |
| — Tantrisk Luxury VIP | `service-vip.html` | — Tantric Luxury VIP | `service-vip.html` |
| BLOGG | `blog.html` | Blog | `blog.html` |
| FAQ | `faq.html` | FAQ | `faq.html` |
| KONTAKT | `contact.html` | Contact | `contact.html` |

### Footer (must stay in sync)

The footer has two columns:
1. **Logo + "Important Notice" / "Viktig Merknad"** paragraph linking to `ethics.html` ("Read more / Les mer").
2. **About / Om MassageART OSLO** block listing: address (Bjørvika, Oslo Sentrum / Norge | Norway), phone `tel:+4793934188`, WhatsApp `https://wa.me/4793934188`, email `mailto:massageartoslo@gmail.com`, plus social links (Facebook + Instagram) under "Follow Us" / "Følg oss".

> **Consistency note:** on some pages (e.g. `blog.html`) the "Follow Us / Følg oss" block is absent from the footer. **Needs verification** before adding it back as part of a global footer update.

### Inline `<style>` blocks per page

Each HTML page carries an inline `<style>` block in `<head>` for:
- the **language switcher** appearance,
- occasional page-specific tweaks (e.g. `blog.html` reorders the sidebar above articles on mobile via `.blog-content .row .container { display:flex; flex-direction:column; } .sidebar { order: -1; }` at `max-width: 767px`),
- on `index.html` and `en/index.html`, an extensive critical-CSS inline block for above-the-fold rendering (hero + header — see §8).

When you change the language switcher or any shared inline rule, do it everywhere — there is no shared source for these inline blocks.

---

## 6. Blog / Article System

The blog is **a single-page list** at `blog.html` (NO) / `en/blog.html` (EN). Most "articles" rendered in the list are inline content blocks identified by anchor IDs on the `blog.html` page itself; only three of them link out to dedicated standalone pages.

### Articles that exist as standalone HTML files

| NO standalone file | EN standalone file | Linked from blog.html via |
|---|---|---|
| `Hva-er-tantramassasje.html` | `en/What-is-a-Tantra-Massage.html` | `<article id="Hva-er-tantramassasje">` (NO) / `id="What-is-a-Tantra-Massage"` (EN) |
| `harmoni-og-hormonbalanse-gjennom-tantrisk-massasje.html` | `en/harmony-and-hormonal-balance-through-tantra-massage.html` | `<article id="gjennom-tantrisk-massasje">` (NO) / `id="Balance-through-tantra-massage"` (EN) |
| `tantric-massage-in-oslo.html` | `en/tantric-massage-in-oslo.html` | `<article id="Therapeutic-Tantric-Massage-in-Oslo">` (both) |

### Inline-only "articles" (anchors inside `blog.html`)

These show up in the right-hand sidebar and as `<article>` blocks within the page; they do **not** have their own URL:

- `#Emotions-and-Tantra`
- `#What-to-expect`
- `#Male-Energy-Work`
- `#Techniques-and-rituals`
- `#Essential-ingredients`
- `#What-is-Tantra`
- `#Tantric-Massage`

### Sidebar (`<aside class="sidebar">`)

A right-rail "Blogginnlegg" (NO) / "Blog Posts" (EN) list. Each `<li>` is a hash-anchor (`#anchor-id`) to the matching `<article id="…">`. On mobile (`max-width: 767px`), CSS flexbox `order: -1` moves the sidebar **above** the article list.

### SEO oddity to be aware of

`Hva-er-tantramassasje.html` declares `<link rel="canonical" href="https://massageart.no/tantric-massage-in-oslo.html">` (not its own URL), and the EN equivalent `en/What-is-a-Tantra-Massage.html` canonicals to `en/tantric-massage-in-oslo.html`. This treats the article as a duplicate-content variant of the landing page. **Needs verification** before copying this pattern — the other article pair (`harmoni-…` / `harmony-…`) uses self-canonicals as expected.

### Checklist — adding a new standalone blog article

Do all of the following, in both languages:

1. **Decide filenames**. Use kebab-case, descriptive Norwegian for the NO file (e.g. `min-nye-artikkel.html`), and a translated English filename for the EN version. Keep them at the language root (NOT in a subfolder).
2. **Copy an existing article** as the template:
   - NO: copy `harmoni-og-hormonbalanse-gjennom-tantrisk-massasje.html` (cleanest self-canonical pattern).
   - EN: copy `en/harmony-and-hormonal-balance-through-tantra-massage.html`.
3. In each copy, update `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<link rel="canonical">` (to the new page's own URL), and both `<link rel="alternate" hreflang>` entries (NO + EN must cross-reference each other).
4. Replace the article body, hero image, and any inline `<style>` overrides as needed.
5. Update the CTA button text (must be unique per page — see §7 table).
6. Verify the **header nav**, **footer**, **language switcher**, **pre-loader**, **floating call button**, and JS includes match the rest of the site (copy from a recent service page if in doubt).
7. **Add to `blog.html`** AND **`en/blog.html`**:
   - Add a new `<article id="...">` block inside `<section class="news col col-md-9">` with the big image, post-meta, headline, lead text, and a "Les mer" / "Read more" link to the standalone file.
   - Add a matching `<li><a href="#new-anchor-id">…</a></li>` to the right-hand sidebar list.
8. **Add new images** to `images/blog/` — prefer `.webp` for the in-article hero/cards. Optimize for mobile.
9. **Add the new URLs to `sitemap.xml`** (root + `/en/`). Set a sensible `<priority>` (existing NO blog entries use `1.0`, EN entries `0.8`).
10. **Local smoke test**: open both new pages, click the language switcher, verify nav/footer, click the new entry on blog index in both languages.

---

## 7. Service Pages and CTA Logic

### Service pages

| File | Audience | EN counterpart |
|---|---|---|
| `service.html` | Men | `en/service.html` |
| `service-woman.html` | Women | `en/service-woman.html` |
| `service-couple.html` | Couples | `en/service-couple.html` |
| `service-vip.html` | Luxury VIP (premium, Devine Escape) | `en/service-vip.html` |

These pages share the same header/footer/switcher pattern, each have `<body id="service">`, and each load `js/common-script.js` + `js/service-script.js`. The shared `#service .services .section-title p { margin-bottom: 20px; }` rule in `css/style.css` controls paragraph spacing on all four; tune that one rule to change rhythm site-wide for service pages.

The VIP page additionally defines a small inline `<style>` block (`.vip-included`, `.vip-prices`) for the "What is included / Hva er inkludert" + price card on the page itself. It uses the generic `.banar` hero class (same background image as `service.html`); to give VIP its own banner image, add `images/service/banar-vip.webp` and a matching `.banar-vip` rule in `css/style.css`, then switch the class in both `service-vip.html` files.

### CTA buttons (verified against current files, 2026-05-17)

Each page has a **unique** CTA label — do not reuse text across pages. All CTAs link to `contact.html` (relative path from the page's language root), use class `btn btn-default`, and currently carry inline `style="background-color: #85ad00; color: black;"` (olive green).

| Page | NO label (root) | EN label (`en/`) |
|---|---|---|
| `shop.html` | Bestill din private time nå | Book your private session now |
| `service.html` | Bestill din massasje i dag | Reserve your massage today |
| `service-woman.html` | Bestill din private tantriske massasje | Book your private tantric massage |
| `service-couple.html` | Opplev ekte avslapning i dag | Discover true relaxation today |
| `service-vip.html` | Vi håper du kommer på besøk snart! | We Would Love to Have You Visit Soon! |
| `faq.html` | Send meg en melding nå | Send me a message now |
| `Hva-er-tantramassasje.html` / `en/What-is-a-Tantra-Massage.html` | Start din tantriske opplevelse nå | Begin your tantric experience now |
| `harmoni-…` / `harmony-…` | Bestill time | Book Your Session |
| `tantric-massage-in-oslo.html` / `en/tantric-massage-in-oslo.html` | Bestill Din Økt | Book Your Session |

> The article and landing-page CTAs (`Bestill time`, `Bestill Din Økt`, `Book Your Session`) are shorter and more generic than the per-service buttons; the longer landing-page CTAs use slightly different inline styles (`margin-top: 25px; padding: 10px 20px; font-size: 16px;`). When updating CTA text, keep the inline style intact.

### Booking is not online

There is **no booking widget, no calendar, no payment integration**. Every CTA leads to `contact.html`, which surfaces the contact form, phone, WhatsApp, and email. Floating call button (`#floating-call-btn` → `tel:+4793934188`) is present on every page. Do not introduce Stripe/Vipps/Calendly/Booksy without explicit instruction.

---

## 8. CSS, JavaScript, and Assets

### CSS files (`css/`)

| File | Role | Notes |
|---|---|---|
| `bootstrap.min.css` | Bootstrap 3 grid + components | Vendor — do not edit. |
| `style.css` (~109 KB) | Main custom site styles | **Primary file for global look-and-feel edits.** |
| `responsive.css` (~49 KB) | Mobile / responsive overrides | **Primary file for media-query / breakpoint fixes.** |
| `css3-animation.css` | Custom CSS animations | |
| `animate.css` | Animate.css vendor library | Vendor — do not edit. |
| `common-style.css` | Small shared layout helpers | |
| `home-2-style.css`, `home-3-style.css` | Alternative home variants | **Needs verification** whether any active page uses these. |
| `owl.carousel.css`, `owl.theme.css` | OWL Carousel | Vendor — do not edit. |
| `nivo-lightbox.css`, `nivo-default.css` | Nivo Lightbox | Vendor — do not edit. |
| `jquery-ui.css` | jQuery UI styling | Vendor — do not edit. |
| `style_orig.css` | **Backup — do not deploy or edit.** | |

Bootstrap 3 breakpoints used throughout:
- xs (mobile) `< 768px` — `@media (max-width: 767px)`
- sm (tablet) `768px – 991px`
- md (desktop) `992px – 1199px`
- lg `≥ 1200px`

Inline `<style>` blocks in individual HTML pages override the shared CSS for page-specific tweaks (language switcher, mobile sidebar reorder, hero critical CSS on the homepages). Always check the inline block of the page you are editing before assuming a rule lives in `style.css`.

### JavaScript files (`js/`)

| File | Role |
|---|---|
| `jquery-1.11.3.min.js` | jQuery core (every page loads this) — vendor |
| `jquery-ui.min.js` | jQuery UI — vendor; **Needs verification** whether any active page still needs it |
| `bootstrap.min.js` | Bootstrap 3 plugins (dropdown, collapse) — vendor |
| `common-script.js` | Shared helpers, loaded on most non-homepage pages |
| `index-script.js` | Homepage interactions (also loaded by `Hva-er-tantramassasje.html`) |
| `index-2-script.js`, `index-3-script.js` | Alternative homepage variants — **Needs verification** whether referenced |
| `about-script.js` | About-page logic (number counters etc.) |
| `service-script.js` | Service pages |
| `contact-script.js` | Contact-form validation + UI |
| `gallery-script.js`, `gallery-2-script.js`, `gallery-3-script.js` | Image galleries |
| `shop-details-script.js`, `team-script.js`, `progressbar.js` | Component scripts |
| `owl.carousel.min.js` | OWL Carousel — vendor |
| `nivo-lightbox.min.js` | Nivo Lightbox — vendor |
| `jquery.nicescroll.js`, `jquery.appear.js`, `jquery.animateNumber.min.js` | Vendor jQuery plugins |

Per-page JS pattern:
- Every active page loads `jquery-1.11.3.min.js` (and usually `bootstrap.min.js`) with `defer`.
- Each page additionally loads `common-script.js` and/or its own `*-script.js` per the table above.
- Homepages (`index.html`, `en/index.html`) also load `owl.carousel.min.js`, `jquery.appear.js`, `jquery.animateNumber.min.js`, `index-script.js`.

### Images and other assets (`images/`)

| Path | What it holds |
|---|---|
| `images/home-1/` | Home hero (`slider/slider-0*.webp`, `slider-1*.webp`), services tiles, brand logo (`logo.png`), backgrounds. |
| `images/about/` | About-page hero, slider, watermarks. |
| `images/blog/` | Blog article images. **Prefer `.webp`** for new article hero images (existing pattern). |
| `images/blog/thumb/`, `images/blog/news/`, `images/blog/gallery/` | Card thumbnails, side widgets, in-article galleries. |
| `images/contact/` | Contact-page hero + watermarks. |
| `images/footer/` | Footer payment/city decoration images. |
| `images/gallery/`, `images/gallery-3/` | Standalone gallery sets. |
| `images/shop/`, `images/shop-details/` | Shop/pricing imagery. |
| `images/service/`, `images/team/`, `images/news-letter-*` | Section imagery. |
| `images/flag_en.png`, `images/flag_no.png` | Language switcher flags. |
| `images/whatsapp-logo-small.png` | Footer WhatsApp icon. |
| `images/logo.png`, `images/logo_old.png` | Footer logo (`logo.png` active; `_old` is backup). |
| `images/favicon.png` | Favicon (referenced from `<head>`). |
| `images/apple-touch-icon.png` | Apple touch icon — **Needs verification** that file exists (the `<head>` references it). |

Font Awesome icons live in `font-awesome/css/font-awesome.min.css`; the custom FlatIcon set is loaded via `flat-icon/flaticon.css`. Both are preloaded asynchronously from each page's `<head>`.

### Brand / visual tokens

- Primary CTA accent: `#85ad00` (also `#88a800` in some inline copy).
- Typography: Raleway (headings), Open Sans (body/UI), Playfair Display italic (taglines).
- Aesthetic: dark luxury / sensual wellness — dark charcoal backgrounds, olive-gold accents.

---

## 9. SEO Structure

Every active page has a consistent `<head>` SEO block. The exact pattern (verified on `service.html` / `en/service.html`):

```html
<title>{Unique title — page topic + brand}</title>
<meta name="description" content="{Unique 130–160 char summary}">
<meta name="keywords" content="{comma-separated keywords}">
<meta name="author" content="MassageART">

<link rel="canonical" href="https://massageart.no/{path-to-this-page}" />
<link rel="alternate" hreflang="en" href="https://massageart.no/en/{en-filename}" />
<link rel="alternate" hreflang="no" href="https://massageart.no/{no-filename}" />
```

Homepages (`index.html`, `en/index.html`) additionally carry:
- `<link rel="alternate" hreflang="x-default" href="https://massageart.no/" />`
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- Twitter card meta tags
- Schema.org JSON-LD `HealthAndBeautyBusiness` with name, address, phone, hours, sameAs (Facebook + Instagram).

### Sitemap

`sitemap.xml` (root) lists all NO root pages with `<priority>1.0</priority>` and all EN pages with `0.8`. Most entries carry `lastmod 2026-05-12`; the two VIP entries (`/service-vip.html`, `/en/service-vip.html`) were added with `lastmod 2026-05-17`.

> **Missing from sitemap (2026-05-17):** `Hva-er-tantramassasje.html` and `en/What-is-a-Tantra-Massage.html`. **Needs verification / fix** if those should be indexed; they exist on disk and are linked from `blog.html`.

### Robots & LLMs

- `robots.txt`: `Allow: /` + `Disallow: /no_OLD/` + `Sitemap: https://massageart.no/sitemap.xml`.
- `llms.txt`: intentionally blank ("massageart.no does not use a Learning Management System").

### SEO oddity (repeated from §6)

Two article pages canonical to the landing page rather than to themselves:
- `Hva-er-tantramassasje.html` → canonical `https://massageart.no/tantric-massage-in-oslo.html`
- `en/What-is-a-Tantra-Massage.html` → canonical `https://massageart.no/en/tantric-massage-in-oslo.html`

This is intentional only if these articles are treated as supplementary variants. **Needs verification.**

---

## 10. Contact / Form Logic

### Pages

- `contact.html` (NO) and `en/contact.html` (EN) carry the form.
- `contact_.html` and `en/contact_.html` are drafts/backups — **not linked, not deployed.**

### Form markup (verified)

NO:
```html
<form class="form-inline" action="send_email.php" method="POST">
    <input id="name"    name="name"    required>
    <input id="phone"   name="phone"   type="tel"   required>
    <input id="email"   name="email"   type="email" required>
    <textarea id="message" name="message" required></textarea>
</form>
```

EN: identical, except `action="../send_email.php"`.

### Handler — `send_email.php` (root)

- Receives POST, sanitizes `name`/`phone`/`email`/`message`, builds an email body, sends via PHP `mail()` to `contact@massageart.no` with subject `MassageArt.no - Formular contact`.
- On success: prints a green confirmation + meta-refresh redirect to `contact.html` (2 s).
- On failure: prints a red error + meta-refresh redirect to `contact.html`.
- The redirect path is hard-coded to `contact.html`; submissions from `en/contact.html` will currently redirect to the NO contact page. **Needs verification** whether you should make the redirect language-aware when next touched.
- Client-side validation lives in `js/contact-script.js`.

### Contact channels (shown in footer of every page)

| Channel | Value |
|---|---|
| Phone | `+47 939 341 88` → `tel:+4793934188` |
| WhatsApp | `https://wa.me/4793934188` |
| Public email | `massageartoslo@gmail.com` (in footer + JSON-LD) |
| Form-submission target email | `contact@massageart.no` (only inside `send_email.php`) |
| Address | Bjørvika, Oslo Sentrum, Norge / Norway |

Floating call button (`#floating-call-btn`) on every page links to the phone number.

---

## 11. Safe Editing Checklist

Before pushing any change, walk through this list:

- [ ] **Identify all affected files.** If the change is content/structure, you almost certainly need to touch the NO file at root **and** the EN sibling in `en/`.
- [ ] **Is this a nav/footer/language-switcher/pre-loader/floating-call-button edit?** If yes, the change must be replicated across **every** active NO and EN page — there is no template engine.
- [ ] **Are you adding/renaming/removing a page?** Update:
  - the NAV menu on every active page (NO + EN),
  - the corresponding `<link rel="alternate" hreflang>` cross-references,
  - `sitemap.xml`,
  - `blog.html` / `en/blog.html` if it's an article,
  - the language switcher on the new page itself.
- [ ] **Did you keep the inline `<style>` block intact?** Especially the language-switcher rules and any page-specific overrides.
- [ ] **Did you preserve `<link rel="canonical">`, `hreflang` pair, `<meta description>`, and `<title>`** when copying an existing page as a template? Each must be unique per URL.
- [ ] **CTA text uniqueness:** if you added a new CTA, make sure the label is not already used by another page (cross-check §7).
- [ ] **Asset paths:** EN pages use `../` prefix; NO pages don't. Double-check after copy/paste.
- [ ] **No accidental edits** to `no_OLD/`, `test/`, `_orig`/`_`-suffixed backup files, vendor CSS/JS bundles, or Google verification HTML.
- [ ] **Local smoke test:**
  - Open the changed NO page and the EN sibling in a browser.
  - Click the language switcher both ways.
  - Click the nav menu items and verify they resolve.
  - Click the CTA button — it should land on the right `contact.html`.
  - Submit the contact form in a PHP-capable local server (`php -S localhost:8000`) to verify `send_email.php` action paths.
- [ ] **Mobile check** at `<768px`: language switcher, hamburger nav, floating call button, hero, footer layout.

---

## 12. Common Tasks

### 12.1 Add a new blog article

See the detailed §6 checklist. Summary: create matching NO + EN `.html` files at language root, update SEO/hreflang/canonical, add an `<article>` block + sidebar `<li>` to both `blog.html` and `en/blog.html`, add images to `images/blog/`, update `sitemap.xml`.

### 12.2 Add a new page (non-article)

1. Create the page at the appropriate language root (NO at `/`, EN inside `en/`).
2. Use an existing page (e.g. `about.html` / `en/about.html`) as the template; keep the header/footer/switcher/pre-loader/floating-call-button blocks intact.
3. Update `<title>`, `<meta description>`, `<meta keywords>`, `<link rel="canonical">`, both `hreflang` alternates.
4. If the page should appear in the main nav, add a `<li>` to the navbar `<ul>` on **every** active page in both languages.
5. Add the new URLs to `sitemap.xml`.
6. Smoke test in browser (both languages).

### 12.3 Update / add a menu item

1. Decide the label and target URL for both languages.
2. Edit the `<ul class="nav navbar-nav">` block in **every** active HTML file (NO root and `en/`). There is no shared partial.
3. If the new item targets a new page, follow §12.2 in parallel.
4. Verify the dropdown for "Tjenester / Services" still renders correctly if you touched that branch.

### 12.4 Replace an image

1. Drop the new file into the matching `images/...` subfolder. Prefer `.webp` for hero / blog imagery; keep approximately the same dimensions to avoid layout shifts.
2. Update `<img src="...">` (and any `srcset`, `media`, `<link rel="preload" as="image">` directives in the `<head>` for LCP images) on the affected pages.
3. If the image is in the header hero (homepages), check the inline critical-CSS block and the `<link rel="preload">` mobile/desktop variants in `<head>`.
4. Keep `alt` text descriptive and language-appropriate (NO file → Norwegian alt; EN → English).
5. Smoke test in browser at desktop and mobile widths.

### 12.5 Change contact details (phone / WhatsApp / email / address)

- Phone (`tel:+4793934188`), WhatsApp (`https://wa.me/4793934188`), email (`massageartoslo@gmail.com`), address (Bjørvika, Oslo Sentrum / Norge | Norway) appear in:
  - The footer of **every** active page (NO root + `en/`).
  - The `#floating-call-btn` on every page (phone only).
  - The Schema.org JSON-LD on `index.html` and `en/index.html`.
  - The Open Graph `og:url` (only homepages).
- For the form-submission recipient address (`contact@massageart.no`), edit `send_email.php` only.
- Update every occurrence — grep the repo for the old value before replacing.

### 12.6 Edit SEO metadata for a page

1. Edit the `<title>`, `<meta name="description">`, optional `<meta name="keywords">`, and (for the homepage) Open Graph / Twitter / JSON-LD blocks.
2. Make sure `<link rel="canonical">` points to the page's own URL **except** in the two known article-as-variant cases (see §6 / §9).
3. Keep both `<link rel="alternate" hreflang="en|no">` entries in sync between the NO and EN files (each must reference the other's exact URL).
4. If the URL itself changed, update `sitemap.xml` and any internal links that point to the old URL.

---

## AI Agent Quick Start

A 60-second orientation before touching anything:

1. **Two language roots.** Everything at `/` is Norwegian; everything under `/en/` is English. EN files use `../` for asset paths.
2. **No build, no templates.** Edit HTML directly. Nav, footer, language switcher, pre-loader, and floating-call-button are hand-duplicated in every page — change them everywhere.
3. **Read CLAUDE.md** first if it exists (it does); it carries the canonical editing rules.
4. **Bilingual edits in pairs.** A content/structural change in `foo.html` almost always needs the matching change in `en/foo.html` (and vice versa). The three known filename mismatches across languages are listed in §3 / §4.
5. **Do NOT touch:** `no_OLD/`, `test/`, `*_orig.html`, `*_.html`, `index_3dec2025.html`, `style_orig.css`, vendor bundles, Google verification HTML.
6. **Do NOT upgrade Bootstrap 3 / jQuery 1.11.3.** EOL but load-bearing.
7. **CTA buttons are unique per page.** Do not reuse labels — see §7 table. All link to `contact.html`.
8. **Booking is offline.** No Stripe/Vipps/Calendly. CTAs lead to the contact form; primary channel is WhatsApp.
9. **SEO surface per page:** `<title>`, `<meta description>`, `<link rel="canonical">`, `hreflang=en|no` pair, plus OG/Twitter/JSON-LD on homepages. Mirror canonical/hreflang correctly when adding a page.
10. **After any edit:** run through §11 Safe Editing Checklist. If you added or moved a URL, update `sitemap.xml` too.
