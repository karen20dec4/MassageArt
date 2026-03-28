# Instrucțiuni de Codare (AI Rules) – MassageART Oslo

## Context Proiect
Site static HTML bilingv NO/EN. Fără framework, fără build step.  
- Pagini NO: fișierele din root (`/`)  
- Pagini EN: fișierele din folderul `en/`  
- Arhivă (nu edita): `no_OLD/`, `statistikk/`, `test/`

---

## Reguli de Modificare

1. **Interdicție Modificări Nespecifice**  
   NU modifica, nu șterge și nu rescrie nicio linie de cod care nu are legătură directă cu cerința curentă.

2. **Fără Optimizări Spontane**  
   NU face refactoring, nu optimiza, nu schimba stilul de scriere (ex: arrow functions, class redenumiri) decât dacă se cere explicit: _"Optimizează acest fragment"_.

3. **Păstrare Context**  
   Menține comentariile, spațierea și stilul de indentare exact cum sunt în restul fișierului.

4. **Scope-ul Modificării**  
   Limitează-te strict la funcția sau blocul de cod indicat. Dacă o modificare afectează alte părți, întreabă înainte de a acționa.

5. **Bilingv NO/EN**  
   Orice modificare de conținut sau funcționalitate trebuie aplicată în **ambele** versiuni lingvistice (fișierul din root pentru NO și echivalentul din `en/` pentru EN), cu excepția cazului în care se specifică explicit o singură limbă.

6. **Fișiere Arhivate**  
   NU edita fișierele din `no_OLD/`, `statistikk/`, `test/`, `contact_.html`, `en/contact_.html`, `index_3dec2025.html`, `en/about_orig.html`, `en/index_.html`.

---

## Stil de Răspuns

- Dacă primești o cerință vagă, cere clarificări în loc să presupui și să schimbi codul.
- Arată doar fragmentele de cod care trebuie modificate (**diff format**), nu întreg fișierul, pentru a evita rescrierile accidentale.
- Confirmă întotdeauna ce fișiere vei modifica înainte să începi, mai ales când modificarea afectează mai multe pagini.

---

## Convenții Site

- **Framework CSS:** Bootstrap 3 (nu 4, nu 5)
- **Breakpoint mobil:** `max-width: 767px`
- **Butoane CTA:** `class="btn btn-default"` – fiecare pagină are text unic (vezi `comprehensive-documentation.md`)
- **Language switcher:** definit inline în blocul `<style>` din fiecare pagină
- **Imagini blog:** format `.webp` în `images/blog/`
- **SEO per pagină:** `<title>`, `<meta description>`, `<link rel="canonical">`, hreflang NO+EN
