# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static bilingual (Norwegian / English) HTML site for **massageart.no**. No build step, no package manager, no framework runtime — `.html` files are deployed directly to an Apache web server. PHP is used only for the contact form (`send_email.php`).

Live site: https://massageart.no — Repo: https://github.com/karen20dec4/MassageArt — Branch: `master`

## Tech Stack

- **CSS:** Bootstrap **3** (not 4, not 5) — `css/bootstrap.min.css`
- **JS:** jQuery 1.11.3 + jQuery UI, OWL Carousel, Nivo Lightbox, jquery.nicescroll, jquery.appear, Animate.css
- **Icons:** Font Awesome 4.x + custom FlatIcon set in `flat-icon/`
- **Fonts:** Google Fonts (Open Sans, Raleway, Playfair Display)
- **Server:** Apache — see `.htaccess` for HTTPS redirect, www→non-www, legacy `/no/*` redirects, gzip/brotli, and cache headers
- **Backend:** `send_email.php` (PHP `mail()` to `contact@massageart.no`)

## Site Layout — Bilingual NO/EN

- **Norwegian (NO):** pages live at the repo **root** (`index.html`, `about.html`, `service.html`, …)
- **English (EN):** mirrored pages in **`en/`** (`en/index.html`, `en/about.html`, …)
- Each page has a fixed bottom-right language switcher, defined inline in that page's `<style>` block.
- SEO: every page carries unique `<title>`, `<meta description>`, `<link rel="canonical">`, and `hreflang` tags for both NO and EN.

**Any content/functionality change must be applied to BOTH the NO file at root and its EN counterpart in `en/`**, unless the user explicitly scopes it to one language. Most filenames match across languages; the exceptions are the blog articles and one landing page:

| Norwegian (root)                                              | English (`en/`)                                                       |
|---------------------------------------------------------------|------------------------------------------------------------------------|
| `index.html`                                                  | `en/index.html`                                                       |
| `about.html`                                                  | `en/about.html`                                                       |
| `service.html` (men)                                          | `en/service.html`                                                     |
| `service-woman.html`                                          | `en/service-woman.html`                                               |
| `service-couple.html`                                         | `en/service-couple.html`                                              |
| `service-vip.html` (Tantrisk Luxury VIP)                      | `en/service-vip.html`                                                 |
| `shop.html` (prices)                                          | `en/shop.html`                                                        |
| `blog.html`                                                   | `en/blog.html`                                                        |
| `faq.html`                                                    | `en/faq.html`                                                         |
| `contact.html`                                                | `en/contact.html`                                                     |
| `ethics.html`                                                 | `en/ethics.html`                                                      |
| `tantric-massage-in-oslo.html`                                | `en/tantric-massage-in-oslo.html`                                     |
| `Hva-er-tantramassasje.html`                                  | `en/What-is-a-Tantra-Massage.html`                                    |
| `harmoni-og-hormonbalanse-gjennom-tantrisk-massasje.html`     | `en/harmony-and-hormonal-balance-through-tantra-massage.html`         |

## Do-Not-Edit Files / Folders

These are archived backups or auto-generated and must not be modified or deployed from:

- `no_OLD/`, `statistikk/`, `test/`
- `contact_.html`, `en/contact_.html`
- `index_3dec2025.html`
- `en/about_orig.html`, `en/index_.html`
- `css/style_orig.css`

Debug/test scaffolding that lives in the repo but must **never be deployed** to the live server:

- `_info.php` — bare `phpinfo()` dump; exposing it publicly leaks server config (security risk).
- `test-email.php`, `test/mail_test.php` — throwaway `mail()` test scripts with a hardcoded personal recipient.

## Conventions

- **Mobile breakpoint:** `max-width: 767px` (Bootstrap 3 xs). Existing mobile-specific overrides may live inline in a page's `<style>` block (e.g. `blog.html` reorders the sidebar via flexbox `order: -1` on mobile).
- **CTA buttons:** class `btn btn-default` (sometimes `btn btn-default view-all`). Each page has a **unique** CTA label in both languages — do not reuse text across pages.

  Current CTA label assignments:

  | Page                              | NO label                                | EN label                              |
  |-----------------------------------|------------------------------------------|----------------------------------------|
  | `shop.html`                       | Bestill din private time nå              | Book your private session now         |
  | `service.html`                    | Bestill din massasje i dag               | Reserve your massage today            |
  | `service-woman.html`              | Bestill din private tantriske massasje   | Book your private tantric massage     |
  | `service-couple.html`             | Opplev ekte avslapning i dag             | Discover true relaxation today        |
  | `service-vip.html`                | Vi håper du kommer på besøk snart!       | We Would Love to Have You Visit Soon! |
  | `faq.html`                        | Send meg en melding nå                   | Send me a message now                 |
  | `Hva-er-tantramassasje.html` / `en/What-is-a-Tantra-Massage.html` | Start din tantriske opplevelse nå | Begin your tantric experience now |

  All CTA buttons link to `contact.html` (relative path from the page's language root).

- **Blog images:** `.webp` in `images/blog/`.
- **Per-page JS:** every page loads `js/common-script.js` plus its own `*-script.js` (`index-script.js`, `contact-script.js`, `service-script.js`, `about-script.js`, …).
- **Visual language:** dark luxury / sensual wellness. Primary CTA accent color `#85ad00` / `#88a800` (olive green). Typography: Raleway (headings), Open Sans (body), Playfair Display italic (taglines).

## Where to Edit What

- **Global styles:** `css/style.css` (~105 KB) — primary custom overrides.
- **Media queries / responsive fixes:** `css/responsive.css` (~46 KB).
- **Inline `<style>` blocks** inside individual HTML files are used for page-specific tweaks (language switcher, occasional mobile reorders) — check there before assuming a rule lives in the shared CSS.
- **Nav menu / footer / contact info:** there is **no template engine**. The `<header>` nav and footer are duplicated in every `*.html` file at root and in `en/`. A change to nav/footer/contact info must be repeated across every page.
- **Contact form:** `js/contact-script.js` handles client validation/submission; the form posts to `send_email.php` (root). From `en/contact.html` the action is `../send_email.php`.
- **Booking & payments:** there is **no online booking platform and no payment integration** — all CTAs link to `contact.html`; primary booking channel is WhatsApp `https://wa.me/4793934188`. Do not assume Stripe/Vipps/Calendly/Booksy exist.
- **Floating call button** (`#floating-call-btn`) and pre-loader (`.pre-loder`) are present on every page.

## Legacy Versions — Do Not "Upgrade" Spontaneously

Bootstrap 3 and jQuery 1.11.3 are EOL but the site depends on both. **Do not migrate to Bootstrap 4/5, jQuery 3+, or swap in a framework unless the user explicitly asks** — too much markup, inline `<style>`, and per-page JS is coupled to these versions.

## Editing Rules

1. **Do not modify code unrelated to the current request.** No spontaneous refactors, style changes, or "while I'm here" cleanups.
2. **Preserve existing formatting** — keep comments, spacing, and indentation exactly as in the surrounding file.
3. **Stay in scope.** If a requested change would ripple into other files/pages, ask before acting.
4. **Show diffs, not whole files**, when proposing edits, to avoid accidental rewrites.
5. **Ask for clarification** on vague requests instead of guessing.

## Common Tasks

- **Preview locally:** open the `.html` file directly in a browser, or serve the repo root with any static file server (`python -m http.server`, etc.). The contact form will not work without PHP — use a PHP-capable host (XAMPP, `php -S localhost:8000`) to test `send_email.php`.
- **Deploy:** copy changed files to the Apache document root on the host. There is no build artifact.
- **No tests, no linters, no CI** are configured in this repo.

## Business Info (for content edits)

- **Location:** Bjørvika, Oslo Sentrum, Norway (mobile outcall — therapist travels to client)
- **Phone / WhatsApp:** +47 939 341 88 — `tel:+4793934188` / `https://wa.me/4793934188`
- **Email (public, contact page):** massageartoslo@gmail.com
- **Email (form recipient, `send_email.php`):** contact@massageart.no
- **Hours:** Mon–Sat 10:00–22:00, Sun 11:00–22:00
- **Socials:** Facebook `https://www.facebook.com/share/17ZKPwMYmU/`, Instagram `https://www.instagram.com/autentisk_tantrisk_massasje`

## Reference Docs in the Repo

- `.copilot/COPILOT_CONTEXT.md` — extended project context (pricing table, performance baseline, UX notes).
- `.copilot/raport-seo-mobile.txt` — PageSpeed Insights mobile report.
