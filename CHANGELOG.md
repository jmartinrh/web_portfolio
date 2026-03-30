# Changelog — Code Quality Fixes

## HTML (index.html)

### Structural / Semantic

- **`<div class="navbar">` → `<header class="navbar">`**
  The top bar is the page header. Using `<header>` gives it the correct semantic meaning for screen readers and search engines.

- **`<div id="services/portfolio/experiences/contact">` → `<section>`**
  Top-level page sections should use `<section>`, not generic `<div>`. Improves document outline and accessibility.

- **All `<h1 class="sub-title">` section headings → `<h2 class="sub-title">`**
  A page should have exactly one `<h1>` — the main page title ("Hi, I'm Martín"). Section headings like "Portfolio" and "Let's Connect!" are second-level headings and should be `<h2>`. Affects SEO ranking and screen reader navigation.

### Bug Fixes

- **Removed stray `</a>` on Null Core heading (line 216)**
  There was a closing `</a>` with no matching opening tag. Invalid HTML that can confuse parsers and screen readers.

- **Fixed Runiverse lightbox `href`/`src` mismatch**
  One thumbnail showed `Runiverse_stats2.webp` but clicking it opened `Runiverse_combat.webp`. Fixed the `href` to match the thumbnail so the correct image opens in the lightbox.

- **Fixed Racoon Princess carousel structure**
  The "next" button was placed inside `<div class="carousel-track">` and the outer `.portfolio-carousel` div was never closed. Moved the button outside the track and properly closed both divs.

- **Fixed `<ul>` nested directly inside `<ul>` in Species section**
  HTML only allows `<li>` as direct children of `<ul>`. The extra outer `<ul>` wrapper was removed, keeping the valid inner list.

- **Fixed Species "Download Ruleset" link**
  The button said "Download Game v1.0 Ruleset" but linked to `Game Design CV_2025_MRH.pdf` (the CV). Changed to link to `Ruleset Species v1.0.pdf`, which is the actual ruleset file.

- **Removed empty `poster=""` attributes from `<video>` elements**
  An empty `poster` attribute does nothing. Removed from the DND, Null Core, and TWDU video elements.

### Dead Code Removal

- **Removed all large commented-out HTML blocks**
  Removed commented-out: banner section, CV download button, extra services cards, carousel for DND section, commented-out iframes. Commented-out code accumulates over time and makes the file hard to read. Git history preserves it if needed.

- **Removed the empty About section**
  The About section's tab content was commented out, but its container (empty `<h1>`, empty `<div>`s) remained in the live HTML, adding invisible markup and a blank spacing gap on the page.

### Accessibility

- **Added `alt` attributes to experience section images**
  `work-1.png` and `work-2.png` had no `alt` attribute at all (not even an empty one), which is an accessibility violation. Added descriptive alt text for each.

### Performance

- **Added `loading="lazy"` to all below-the-fold images**
  All carousel and portfolio images now lazy-load as the user scrolls, instead of all loading on page open. With ~78 images and large GIFs, this significantly improves initial page load time.

### JavaScript

- **Moved inline `<script>` blocks to `main.js`**
  JavaScript should live in a separate file, not inline in HTML. Keeps concerns separated and allows the browser to cache the script independently.

- **Removed dead `openmenu()` / `closemenu()` functions**
  The mobile menu was refactored to use a CSS checkbox toggle. These two JS functions were never called and were left behind. Removed.

---

## CSS (styles.css)

- **Moved `font-family` from `*` selector to `body`**
  Setting `font-family` on the universal selector `*` overrides inheritance and can affect embedded content (iframes). Setting it on `body` allows it to inherit naturally, which is the correct approach.

- **Fixed undefined CSS variable `--color-dark-gray` in `h1` rule**
  `--color-dark-gray` was never defined in `:root`. Changed to `var(--color-white)`, which is the intended light color for headings on the dark background. Also added the missing semicolon at the end of the rule.

- **Fixed `.container` padding: `0px 0%` → `0`**
  Units should not be specified on zero values — `0px`, `0%`, and `0` are identical. Using bare `0` is the standard.

- **Fixed `.portfolio-challenge div:hover` redundant background**
  The hover state set `background-color: var(--color-teal)`, which is the exact same value as the non-hover state. The background was not changing on hover; only the `transform` had any effect. Removed the redundant declaration.

- **Removed duplicate `margin-bottom` in `.portfolio-details ul li`**
  The rule had `margin-bottom: 0.5rem` followed by `margin-bottom: 0` — the first was silently overridden and never applied. Removed the dead first declaration.

- **Merged `.carousel-track`, `.carousel-track-2`, `.carousel-track-3` into one rule**
  All three had identical declarations (`display: flex`, `gap`, `overflow-x`, `scroll-behavior`). Merged into a grouped selector. Also removed `.carousel-track-3` entirely — it was never used anywhere in the HTML.

- **Fixed `#about` padding: `0px 0` → `0`, and undefined color variable**
  Same zero-unit issue as above. Also fixed the undefined `--color-dark-gray` variable to `--color-light-gray`.

- **Removed double semicolon in `.tab-links`**
  `position: relative;;` was a typo. Removed the extra semicolon.

- **`grid-gap` → `gap` in `.services-list` and `.work-list`**
  `grid-gap` is a deprecated alias. The standard property is `gap`, which works across all modern browsers.

---

## JavaScript (main.js — new file)

- **`var` → `const` for `tablinks` and `tabcontents`**
  These references never change, so `const` is the correct declaration. `var` is function-scoped with hoisting behavior that can cause subtle bugs.

- **`for(tablink of ...)` → `for(let tablink of ...)`**
  Without `let` or `const`, the loop variable leaks into global scope as an implicit global. Added `let` to both loops.

- **`event` parameter made explicit**
  The original `opentab()` relied on the browser's implicit global `window.event`, which is non-standard and does not work in Firefox. Changed the function signature to `opentab(tabname, event)` so the event is passed in explicitly.
