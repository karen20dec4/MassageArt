# MassageART Oslo – Comprehensive Site Documentation

## Overview
**Site:** https://massageart.no  
**Repository:** https://github.com/karen20dec4/MassageArt  
**Type:** Static HTML website (no build step, no framework)  
**Language:** Bilingual – Norwegian (NO) and English (EN)

---

## Directory Structure

```
MassageArt/
├── *.html              # Norwegian (NO) pages – root level
├── en/                 # English (EN) mirror pages
├── no_OLD/             # Old/archived Norwegian pages – DO NOT edit
├── css/                # Stylesheets (bootstrap, style.css, responsive.css, css3-animation.css)
├── js/                 # JavaScript (jquery, bootstrap, common-script.js)
├── images/             # All site images
│   ├── blog/           # Blog article images
│   ├── home-1/         # Home page images (logo, hero)
│   └── ...
├── font-awesome/       # Icon font
├── flat-icon/          # Flat icon font
├── statistikk/         # Traffic statistics HTML pages (auto-generated, do not edit)
└── test/               # Test files (not live)
```

---

## Active Pages

### Norwegian (NO) – root level
| File | URL | Description |
|------|-----|-------------|
| `index.html` | / | Home page |
| `about.html` | /about.html | About us |
| `service.html` | /service.html | Tantra massage for men |
| `service-woman.html` | /service-woman.html | Tantra massage for women |
| `service-couple.html` | /service-couple.html | Tantra massage for couples |
| `shop.html` | /shop.html | Prices |
| `blog.html` | /blog.html | Blog index |
| `faq.html` | /faq.html | FAQ |
| `contact.html` | /contact.html | Contact |
| `ethics.html` | /ethics.html | Ethics statement |
| `Hva-er-tantramassasje.html` | /Hva-er-tantramassasje.html | Blog article: What is tantra massage |
| `harmoni-og-hormonbalanse-gjennom-tantrisk-massasje.html` | /harmoni-og-... | Blog article: Hormonal balance |
| `tantric-massage-in-oslo.html` | /tantric-massage-in-oslo.html | Landing page |

### English (EN) – `en/` folder
| File | URL | Description |
|------|-----|-------------|
| `en/index.html` | /en/ | Home page |
| `en/about.html` | /en/about.html | About us |
| `en/service.html` | /en/service.html | Tantra massage for men |
| `en/service-woman.html` | /en/service-woman.html | Tantra massage for women |
| `en/service-couple.html` | /en/service-couple.html | Tantra massage for couples |
| `en/shop.html` | /en/shop.html | Prices |
| `en/blog.html` | /en/blog.html | Blog index |
| `en/faq.html` | /en/faq.html | FAQ |
| `en/contact.html` | /en/contact.html | Contact |
| `en/ethics.html` | /en/ethics.html | Ethics statement |
| `en/What-is-a-Tantra-Massage.html` | /en/What-is-a-Tantra-Massage.html | Blog article |
| `en/harmony-and-hormonal-balance-through-tantra-massage.html` | /en/harmony-... | Blog article |
| `en/tantric-massage-in-oslo.html` | /en/tantric-... | Landing page |

---

## CSS Architecture
- **`css/bootstrap.min.css`** – Bootstrap 3 grid system
- **`css/style.css`** – Main site styles
- **`css/responsive.css`** – Responsive overrides
- **`css/css3-animation.css`** – Animations

Bootstrap 3 breakpoints:
- Mobile: `< 768px` (xs)
- Tablet: `768px–991px` (sm)
- Desktop: `992px–1199px` (md)
- Large: `≥ 1200px` (lg)

---

## Language Switcher
Each page has a fixed language switcher (bottom-right corner), defined inline in each file's `<style>` block:

```html
<div class="language-switcher">
    <a href="en/page.html"><span>EN</span></a>
    <div class="separator"></div>
    <a href="page.html" class="active"><img src="images/flag_no.png" alt="Norwegian"><span>NO</span></a>
</div>
```

---

## CTA Buttons ("Book Now" / "Bestill Nå")

Each page has a unique CTA button text. Current assignments:

### Norwegian (NO)
| File | Button Text |
|------|-------------|
| `shop.html` | Bestill din private time nå |
| `service.html` | Bestill din massasje i dag |
| `faq.html` | Send meg en melding nå |
| `service-woman.html` | Bestill din private tantriske massasje |
| `service-couple.html` | Opplev ekte avslapning i dag |
| `Hva-er-tantramassasje.html` | Start din tantriske opplevelse nå |

### English (EN)
| File | Button Text |
|------|-------------|
| `en/shop.html` | Book your private session now |
| `en/service.html` | Reserve your massage today |
| `en/faq.html` | Send me a message now |
| `en/service-woman.html` | Book your private tantric massage |
| `en/service-couple.html` | Discover true relaxation today |
| `en/What-is-a-Tantra-Massage.html` | Begin your tantric experience now |

All CTA buttons link to `contact.html` (NO) or `contact.html` (EN, relative path).  
CSS class pattern: `class="btn btn-default"` or `class="btn btn-default view-all"`.

---

## Mobile-Specific Changes
- **blog.html sidebar reorder:** On screens `≤ 767px`, the `.sidebar` (article index list "Blogginnlegg") is displayed _above_ the articles using CSS flexbox order. Implemented via inline `<style>` in `blog.html`:
  ```css
  @media (max-width: 767px) {
      .blog-content .row .container { display: flex; flex-direction: column; }
      .blog-content .row .container .sidebar { order: -1; }
  }
  ```

---

## Important Notes
- **`no_OLD/`** – archived backup folder; do not edit or deploy from here
- **`statistikk/`** – auto-generated server stats; do not edit
- **`contact_.html`** and **`en/contact_.html`** – backup/draft versions; not linked
- **`index_3dec2025.html`** – archived index backup; not linked
- The site uses **Bootstrap 3** (not Bootstrap 4 or 5)
- Images in `images/blog/` use `.webp` format for performance
- SEO: Each page has unique `<title>`, `<meta description>`, canonical URL, and hreflang tags

---

## Contact Info
- **Location:** Bjørvika, Oslo Sentrum, Norge
- **Phone:** (+47) 939 341 88
- **WhatsApp:** https://wa.me/4793934188
- **Email:** massageartoslo@gmail.com
