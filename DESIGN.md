# Design: Cobalt Ledger
**Date:** 2026-09-28 · **Status:** confirmed (locked)
**Archetype:** Sage (primary: precise, credible, expert), with a Caregiver inflection on one dimension only, color temperature/softness (trust, warmth) · **Register:** calm structure · expressive at: the landing hero, the closing CTA bands, and the signup primary action
**Grounding:** Salesforce Lightning's navy → action-blue → pale-tint value ladder + IBM Carbon's rule that one interactive blue is reserved for interaction
**DNA:** Data-Dense Professional (cool hue 220–260, cool-grey chrome) + color restraint from Swiss (a single accent, no tints of a second hue) · **Dominant axis:** color strategy
**Composition:** held from the shipped implementation (not dealt; `dealer.mjs` was not run because this is a pinned, color-only convergence)
**Pins:** hue = cobalt, seed `#0176D3` (OKLCH 0.563 0.167 **251.9°**) · harmony = mono · chroma = vivid (tints) · type / composition / motion = **held** as shipped. Pinned values are user law.

## Direction
rndmatching connects companies, institutions and R&D experts for government consortia. The identity moves from an aggressive red to a single cobalt/navy blue, read as institutional trust and steady inter-company connection. The red was also a poor fit for the analytical surfaces (announcements, admin); color theory ch09 notes that red degrades analytical performance and that blue signals calm trust. One hue runs from pale tint to deep navy. Hierarchy and CTA emphasis come from **lightness alone**. There is no second accent hue.

## Signature move
**Cobalt means clickable.** `brand-600` as text, outline or ring appears only on interactive elements: links, buttons, the active nav item, focus, toggle-on, the selected row. Brand text that is not interactive (eyebrows, stat numerals, ✓ glyphs, the "Korea" logotype) is set in navy `brand-800`. In running text, links also carry an underline. Non-link brand text is never underlined and never shows `cursor-pointer`.
- *One sanctioned exception:* heading emphasis at display size (≥28px, weight 900, e.g. the hero `<em>` "AI가 최적화", or the CaseStudy 44px numerals) may use `brand-600`. At heading scale it does not read as a link, and it is the hero's saturated moment.

## Expressive moments
Everywhere else holds the calm structure register: white / `gray-50` surfaces, gray ink, `brand-50`/`brand-100` for soft states, and `brand-600` only on interactive elements.
1. **Landing hero** (dial: medium-high). Primary CTA is `brand-600` with a `brand-700` hover. The status pill is a `brand-50` fill with a `brand-200` border and `brand-800` text. The live ping dot is `brand-500`. The display `<em>` is `brand-600`. This is the ramp's most saturated end.
2. **Closing CTA bands** (landing CtaSection, about Cta, pricing banner; dial: high). Full-bleed `brand-800` with white headline, `white/80` subtext, a white button with `brand-600` label, and a `white/50` ghost border. The band shade was chosen by evidence: 600 fails white/80 subtext (3.99:1) and 700 fails the white/50 ghost border (2.96:1). 800 passes both (7.00 / 3.70).
3. **Signup primary action** (PhaseNav CTA, logo tile, submit; dial: medium). The shipped two-stop gradient shape is held but recolored within one hue: `brand-600 → brand-700`. The old purple end (`vbrand-2` #8a63f4) is removed.

**Register by surface.**
- **Admin** (data-dense, analytical) sits at the calm end: tints 50/100 plus `brand-700`/`800` text for badges, and `brand-600` only for the selected-row inset bar, active filter and actions. No bands, no `brand-500` fills, no gradients.
- **Announcements** follows admin: calm, with `brand-500` KPI dots only.
- **Marketing** (landing, about, pricing, contact) may use moments 1–2.

## Type (held from existing implementation)
- Family: a single system sans stack, `-apple-system, BlinkMacSystemFont, "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif` (`--font-sans` in `app/globals.css`). No display/body split.
- Scale: arbitrary px steps as shipped, from 9–13px UI and labels (`text-[13px]`, `text-xs`, `text-[11px]`) through 15–17px body/CTA to display 30/32/36/40/44px. Not re-derived.
- Weights: 500 / 600 / 700 / 800 / 900 (bold, extrabold and black dominate). Display tracking is negative (`-1px`, `-1.5px`). Eyebrows are uppercase with `tracking-wide`.
- Leading: `leading-relaxed` for body, `1.12`–`1.15` for display.
- Ink: `gray-900` #111827 (`--foreground`), with secondary text in `gray-500`/`600`/`700`.

## Color tokens
The brand ramp is a single hue, H 251.9° (every step measures 250.2–252.8°; the spread is sRGB rounding). The block below is written for Tailwind v4's `@theme` in `app/globals.css`, so `bg-brand-600`, `text-brand-800` and similar resolve.
- Steps 50–400 are `palette.mjs --seed "#0176D3" --chroma vivid --harmony mono --scheme light` output verbatim (accent-2 / 3 / 5 / 7 / 8).
- Steps 500–950 are solved at the same hue with palette.mjs's OKLab math. The script's cusp solid (`accent-9` #0590ff) only takes near-black text, and every shipped CTA is white-on-brand.

```css
@theme {
  /* rndmatching brand ramp — cobalt/navy, monochromatic, H 251.9 (seed #0176D3) */
  --color-brand-50:  #f4f9ff; /* oklch 0.980 0.010 252.8 — soft surface (pill, icon tile, selected row) */
  --color-brand-100: #e6f2ff; /* oklch 0.956 0.022 250.2 — soft surface, stronger (chip, active filter) */
  --color-brand-200: #c7e1ff; /* oklch 0.900 0.050 252.1 — tint border (decorative) */
  --color-brand-300: #97c8ff; /* oklch 0.818 0.094 251.8 — decorative only */
  --color-brand-400: #65afff; /* oklch 0.740 0.138 251.8 — decorative only */
  --color-brand-500: #2188e8; /* oklch 0.620 0.170 251.8 — data bars, dots, markers (non-text) */
  --color-brand-600: #006cc3; /* oklch 0.529 0.159 252.1 — INTERACTIVE: CTA fill, link, focus, toggle-on */
  --color-brand-700: #0059a1; /* oklch 0.461 0.137 251.7 — CTA hover/pressed, admin badge text */
  --color-brand-800: #00437c; /* oklch 0.381 0.113 251.8 — non-link brand text, CTA bands */
  --color-brand-900: #002e59; /* oklch 0.300 0.090 252.2 — deep navy (headline accents on tint) */
  --color-brand-950: #001b37; /* oklch 0.220 0.064 251.2 — deepest navy */
}
```

**Role → step** (the contract that Phase 3's alias and component tokens resolve to):

| Role | Step | Replaces |
|---|---|---|
| CTA / primary button fill (white label) | 600 | `brand` #e8341a, `vbrand` #5b5bef |
| CTA hover / pressed | 700 | `brand-hover` #c9280f, `vbrand-hover` #4a4ad8 |
| Link text, active nav item, interactive label | 600 (+ underline in running text) | `text-brand` on links |
| Non-link brand text (eyebrow, numeral, ✓, logotype) | 800 | `text-brand` on non-links |
| Focus ring / outline-button border / toggle-on / selected-row bar | 600 | `border-brand`, `var(--color-brand)` inset |
| Focus halo (decorative, paired with the 600 border) | 600 at 8–12% alpha | `rgba(232,52,26,.07–.08)`, `rgba(91,91,239,…)` |
| Soft surface (pill, badge, icon tile, selected row) | 50 | `brand-light` #fef2f0 (brand uses only) |
| Soft surface, stronger (chip, active filter, soft CTA) | 100 | `vbrand-soft` #eef0ff |
| Tint border on soft surfaces | 200 | `#fbd5ce`, `#dfe0ff`, `#c9cbe0` |
| Data bar / KPI dot / live dot / bullet marker | 500 | `bg-brand` bars/dots, `vaccent` #f59042 |
| Full-bleed CTA band | 800 | `bg-brand` bands |
| Signup gradient | 600 → 700 | `vbrand` → `vbrand-2` #8a63f4 |
| Brand-tinted shadow | 600 at the shipped alpha | `rgba(232,52,26,.35)`, `rgba(91,91,239,.28)` |

**Neutrals (held, outside the brand ramp).** The ink and chrome system stays the stock Tailwind gray scale, which is already cool (H ≈ 264): `gray-900` #111827 ink, `gray-600` #4b5563, `gray-500` #6b7280, `gray-200` #e5e7eb borders, `gray-50` #f9fafb surfaces. palette.mjs's hue-tinted neutral ramp is deliberately **not** adopted, so there is one neutral system and no chrome churn. Signup's `vink`/`vmuted`/`vline`/`vbg` fold into this gray scale in Phase 3.

**Functional colors (held, unchanged, outside the brand ramp):**
- `vok` #12b76a (success tick)
- emerald-* (approve / NTS OK)
- signup validation error `#e0442f` / `#ffece9`
- admin error `#fecaca` border / `red-800` text
- the red tint `#fef2f0`, which survives **only** as the error/destructive background at DetailPanel lines 95/172/193, never as brand

Phase 3 carries these over by value.

Contrast (verifier `.design-foundations/build/blue-rebrand-phase-2-contrast.mjs`, WCAG 2.x, exit 0, 56/56):
```
TEXT ≥4.5:1
PASS brand-600 on white 5.34 · on gray-50 5.11 · on brand-50 5.04 · on brand-100 4.71
PASS brand-700 on white 7.13 · on gray-50 6.83 · on brand-50 6.74 · on brand-100 6.29
PASS brand-800 on white 10.03 · on gray-50 9.60 · on brand-50 9.48 · on brand-100 8.84
PASS brand-900 on white 13.68 · on gray-50 13.09 · on brand-50 12.93 · on brand-100 12.06
PASS brand-950 on white 17.33 · on gray-50 16.58 · on brand-50 16.37 · on brand-100 15.27
PASS white on brand-600 5.34 · 700 7.13 · 800 10.03 · 900 13.68 · 950 17.33
PASS white/80 on brand-800 6.98 · on 900 9.21 · on 950 11.28 (composited)
PASS brand-100 on brand-800 8.84 · 900 12.06 · 950 15.27
PASS brand-200 on brand-800 7.47 · 900 10.19 · 950 12.91
PASS brand-600 label on white button 5.34
PASS gray-900 on brand-50 16.76 · on brand-100 15.64
PASS gray-600 on brand-50 7.14 · on brand-100 6.66
PASS gray-500 on brand-50 4.57
NON-TEXT ≥3:1 (shade difference only — single hue)
PASS CTA 600 vs white 5.34 · gray-50 5.11 · brand-50 5.04 · brand-100 4.71
PASS CTA hover 700 vs white 7.13 · gray-50 6.83 · brand-50 6.74 · brand-100 6.29
PASS data bar/dot 500 vs white 3.65 · vs gray-100 track 3.32
PASS toggle-on 600 vs gray-200 off 4.31 · focus ring 600 vs white 5.34
PASS selected-row bar 600 vs brand-50 5.04 · outline border 600 vs white 5.34
PASS white button vs brand-800 band 10.03 · ghost border white/50 on band 3.71
BANNED (asserted <4.5, never shipped): gray-500 on brand-100 4.26 · gray-500 on brand-200 3.60
                                       white on brand-500 3.65 · white on brand-400 2.30
info: link 600 vs non-link navy 800 1.88:1 (OKLab ΔL 0.148) · link 600 vs ink gray-900 3.32:1
info: brand-200 tint border vs white 1.34:1 (decorative; the badge is identified by its text)
```
palette.mjs source run (`--seed "#0176D3" --chroma vivid --harmony mono --scheme light`, exit 0): accent-11 on neutral-2 5.68 · accent-11 on accent-2 5.68 · accent-on-solid on accent-9 5.96 · neutral-11 on neutral-2 5.67 · neutral-12 on neutral-2 12.9: all PASS.

## Space, shape, depth (held from existing implementation)
- Spacing: the Tailwind 4px scale plus fractional steps as shipped (`py-3.25`, `px-4.5`, `mt-1.75`). Section padding runs `py-20`–`py-24 px-10`.
- Radius: buttons and inputs `rounded-[10px]`, cards `rounded-2xl` / `rounded-[14px]`, pills and dots `rounded-full`, small chips `rounded-md` / `rounded-lg`.
- Borders: 1px `gray-200` (1.5px on some admin buttons). Shadows: `shadow-sm` / `shadow` / `shadow-lg` and the ink-tinted `rgba(20,23,38,.05–.06)` stack. Brand-tinted shadows move to `brand-600` at the same alpha; the shadow shape does not change.
- Only the color values inside these tokens change.

## Motion (held from existing implementation)
- Timing: `transition-colors` default (150ms) for hover. `duration-300`/`700`/`1000` for bars. `fade-up` 0.55s ease, `fade-in` 0.7s ease, `.reveal` 0.55s ease. Marquee 28s linear. `brand-ping` 1.4s ease-out (now on a `brand-500` dot). `dot-pulse` 1.2s stagger.
- Allowed: hover color shifts (600 → 700), scroll reveals, marquee, ping, bar width. Never: new motion introduced by this rebrand.
- prefers-reduced-motion: none today. Held; see Open questions.

## Never (this project's tells at risk)
- **No second accent hue anywhere in the brand system.** Every brand-colored pixel resolves to `--color-brand-*` at H ≈ 252°. That rules out:
  - violet/indigo: `vbrand` #5b5bef, the violet-2 gradient end #8a63f4, stock `violet-*` badges
  - orange: `vaccent` #f59042 folds to `brand-500`
  - a warm or gold "pop" CTA color
  - a teal or cyan "friendly" secondary
  - gradients that cross hues. Signup's gradient stays within 600 → 700.
- **Stock Tailwind `blue-*` / `indigo-*` / `sky-*` never stand in for brand.** They sit a few degrees off the ramp and read as drift. Existing collisions (`blue-50/700` badges in admin Queue/DetailPanel, landing HowItWorks, AnnouncementTable) must be re-paletted in Phase 3.
- **Functional colors stay outside the brand ramp, by value, unchanged.** That covers success (`vok`, emerald), validation error (`#e0442f`/`#ffece9`), admin error (`#fecaca`, `red-800`, the `#fef2f0` error background) and warning/info. Error/destructive states never borrow a brand tint. The `bg-brand-light` double duty in DetailPanel ends: its error sites keep red, and its accent sites go blue.
- **No blue text that is not interactive at body/UI size, except `brand-800`.** `brand-600` text means link. Headings, eyebrows, numerals and check glyphs never use 600 below display size, and are never underlined.
- **No text on `brand-400`/`500`**, and no `gray-500` secondary text on `brand-100`/`200` (use `gray-600`). These pairs are measured below 4.5:1 and banned.
- **No `brand-600`/`700` bands** where the band carries white/80 subtext or white/50 ghost borders; bands are `brand-800`.
- **Admin never uses bands, 500 fills or gradients.** Its calm end is part of the register, not a preference.
- No saturated brand background behind long text; bands carry at most two lines of copy (ch09 content-density rule).
- `LogoStrip.tsx`'s `#1d4ed8` is a third party's (NTIS) color, not brand. Never rename it into the ramp.

## Open questions
- `text-gray-400` (#9ca3af, 2.54:1 on white, ×76 uses) predates this rebrand, is outside the brand ramp, and fails AA for text. Flag it for a separate accessibility pass (out of scope here).
- No `prefers-reduced-motion` handling for fade-up, reveal, marquee or ping. Motion is held; flag it for a separate pass.
- DetailPanel's reject button (line 172) currently uses `text-brand` red for a destructive label. Phase 3 needs a functional destructive text color from the held error family; `#e8341a` is 4.25:1 on white and fails AA at 14px.
- Dark mode is not requested, so the ramp is light-scheme only.
- **(Phase 3)** `signup/AddressField.tsx:74` and `signup/TaxonomyPicker.tsx:136` use a one-off dark navy `#2b3a55`/`#1f2b40` (a "조회"/"적용" secondary button) that predates both brand palettes and was never `--color-brand`/`--color-vbrand`. Now that brand's deep end (`brand-800`/`900`) is also dark navy, this risks reading as off-brand drift the way stock `blue-*` did. Not in Phase 3's enumerated scope (not double-duty, not a named collision) — flagged for the next consistency pass, not resolved here.
- **(Phase 3)** `signup/TaxonomyPicker.tsx`'s table-chrome grays (`#edeef2`, `#fcfcfe`, `#d7dae4`, `#f4f5f8`, `#f1f3f7`) and `AlternatingRows.tsx`'s repeated `#10b981` "connected" dot were never part of either brand palette (`--color-brand`/`--color-vbrand`). They carry no brand-color role and are intentionally absent from the mapping table below, not omitted by oversight.

---

## Alias tokens

Semantic tier (Kholmatova, *Design Systems* 2017; W3C DTCG stable Oct 2025). Every value below is a reference into the Color tokens block above or the Role→step contract — none is a new hex. Expressed as CSS custom properties (this project's actual delivery mechanism is Tailwind v4 `@theme`, not a Style Dictionary/DTCG pipeline, so the alias tier is written the way it will really ship).

```css
/* --- Interactive (brand, "cobalt means clickable") --- */
--color-text-link:            var(--color-brand-600); /* + underline in running text */
--color-cta-bg:                var(--color-brand-600);
--color-cta-bg-hover:          var(--color-brand-700);
--color-nav-active-text:       var(--color-brand-600);
--color-focus-ring:            var(--color-brand-600);
--color-toggle-on:             var(--color-brand-600);
--color-selected-row-bar:      var(--color-brand-600);

/* --- Non-interactive brand text --- */
--color-text-brand-strong:     var(--color-brand-800); /* eyebrow, numeral, ✓, logotype, non-link text */
--color-text-brand-display:    var(--color-brand-600); /* sanctioned exception: display-scale (>=28px, weight 900) heading emphasis only */

/* --- Surfaces --- */
--color-surface-badge:         var(--color-brand-50);  /* pill / badge / icon tile / selected-row fill */
--color-surface-chip:          var(--color-brand-100); /* chip / active filter / soft CTA — stronger tier */
--color-border-tint:           var(--color-brand-200); /* decorative border on soft surfaces */
--color-data-mark:             var(--color-brand-500); /* data bar / KPI dot / live dot / bullet marker (non-text) */
--color-band-bg:               var(--color-brand-800); /* full-bleed CTA band (600/700 fail white/80 + white/50 there) */

/* --- Gradient (signup primary action, held shape, recolored) --- */
--color-gradient-start:         var(--color-brand-600);
--color-gradient-end:           var(--color-brand-700);

/* --- Decorative alpha (rgba shadows/focus halos — brand-600's RGB triple, original alpha kept per site) --- */
--rgb-brand-600:                0, 108, 195; /* #006cc3 */

/* --- Neutral fold (signup vink/vline/vbg/vmuted -> stock gray, held) --- */
--color-text-ink:               var(--color-gray-900); /* was vink #141726 */
--color-text-muted:             var(--color-gray-500); /* was vmuted #6b7280 */
--color-border-neutral:         var(--color-gray-200);  /* was vline #e6e8f0 */
--color-surface-neutral-tint:   var(--color-gray-50);   /* was vbg #f7f8fc */
--color-surface-badge-neutral:  var(--color-gray-100);  /* the "not brand" side of a 2-way categorical badge */
--color-text-badge-neutral:     var(--color-gray-700);

/* --- Functional (held, unchanged values, formalized as tokens for the first time) --- */
--color-success-bg:             #eaf7f0; /* held — was already this literal, now named */
--color-success-text:           var(--color-vok, #12b76a); /* held */
--color-error-bg-signup:        #ffece9; /* held — signup validation error */
--color-error-text-signup:      #e0442f; /* held — signup validation error */
--color-error-bg-admin:         #fef2f0; /* held — the ONLY surviving use of the old brand-light hex; never brand after this phase */
--color-error-border-admin:     #fecaca; /* held */
--color-error-text-admin:       var(--color-red-800); /* held, stock Tailwind red-800 */
--color-warning-bg:             var(--color-amber-50);  /* held (PENDING today); also absorbs ConsentSection's undocumented "pay" tag, see mapping table §J */
--color-warning-text:           var(--color-amber-600); /* held */
```

## Component tokens

Scoped to the components that actually consume the alias tier (Frost atoms/molecules; component tokens reference alias tokens only, never globals directly).

```css
/* Buttons */
--button-bg:                 var(--color-cta-bg);
--button-bg-hover:            var(--color-cta-bg-hover);
--button-text:                #ffffff;
--button-outline-border:      var(--color-focus-ring);

/* Nav */
--nav-logo-text:               var(--color-text-brand-strong);
--nav-active-indicator:        var(--color-nav-active-text);
--nav-cta-bg:                   var(--color-cta-bg);
--nav-cta-bg-hover:            var(--color-cta-bg-hover);

/* Badges / chips (two soft-surface tiers, per DESIGN.md Role->step 50 vs 100) */
--badge-bg:                    var(--color-surface-badge);   /* pill/badge/icon tile/selected-row */
--badge-text:                  var(--color-brand-700);       /* admin badge text, per Role->step */
--badge-border:                var(--color-border-tint);
--chip-bg:                     var(--color-surface-chip);    /* chip/active filter/soft CTA — stronger */
--chip-text:                   var(--color-brand-700);

/* Admin: two-way categorical badge (company vs academic) — hue-vs-neutral, not hue-vs-hue */
--admin-badge-bg-company:      var(--badge-bg);
--admin-badge-text-company:    var(--badge-text);
--admin-badge-bg-academic:     var(--color-surface-badge-neutral);
--admin-badge-text-academic:   var(--color-text-badge-neutral);

/* Admin: plain informational chip (HowItWorks "과제 12건", AnnouncementTable dept tag) */
--info-chip-bg:                 var(--color-surface-badge-neutral);
--info-chip-text:               var(--color-text-badge-neutral);

/* CTA band (full-bleed) */
--cta-band-bg:                  var(--color-band-bg);
--cta-band-headline:            #ffffff;
--cta-band-subtext:             rgb(255 255 255 / 0.8);
--cta-band-ghost-border:        rgb(255 255 255 / 0.5);
--cta-band-button-bg:            #ffffff;
--cta-band-button-text:          var(--color-cta-bg);

/* Selected / interactive states */
--selected-row-bar:              var(--color-selected-row-bar);
--toggle-on-bg:                  var(--color-toggle-on);
--focus-ring-shadow:             rgb(var(--rgb-brand-600) / 0.08); /* per-site alpha kept, see mapping table */
--shadow-brand:                  rgb(var(--rgb-brand-600) / 0.35); /* per-site alpha kept, see mapping table */

/* Signup gradient CTA (PhaseNav pill, logo tile, submit button — shape held) */
--signup-gradient-start:         var(--color-gradient-start);
--signup-gradient-end:           var(--color-gradient-end);

/* Destructive (DetailPanel reject flow — never brand) */
--destructive-bg:                var(--color-error-bg-admin);
--destructive-border:            var(--color-error-border-admin);
--destructive-text:              var(--color-error-text-admin);

/* Success (formalized, held) */
--success-bg:                    var(--color-success-bg);
--success-text:                  var(--color-success-text);

/* Warning (formalized, held; also the ConsentSection "pay" resolution) */
--warning-bg:                    var(--color-warning-bg);
--warning-text:                  var(--color-warning-text);
```

**Data-viz categorical palette (Leadership.tsx `DEPT_PIPELINE`) — not part of the CSS token tier.** Chart color is a separate concern from brand/UI color (`data-viz` doctrine: "brand palette / UI color palette → core color mode; data-viz → truthful, CVD-safe encoding"). These are plain array literals in the component, not CSS custom properties:

```
Okabe & Ito (2008), "Color Universal Design" — CVD-safe categorical set, excluding both blues (too close to the new brand hue, H 251.9°):
  #D55E00  vermillion       (was #e8341a — 산업통상자원부)
  #CC79A7  reddish purple   (was #1d4ed8 — 과학기술정보통신부)
  #009E73  bluish green     (was #059669 — 중소벤처기업부; kept green-family but shifted off stock emerald)
  #E69F00  orange           (was #7c3aed — 환경부)
```
Redundant encoding already present: every bar carries a direct department-name label and a count (Knaflic/WCAG 1.4.1 — color is never the only channel here).

---

## Usage mapping table

Every row from the fresh Phase 3 sweep (see `.design-foundations/build/blue-rebrand-phase-3-discovery.md`). Grouped by kind, per the Verification plan's cross-check method. "New token" resolves only to the alias/component tier above, which itself resolves only to DESIGN.md's locked ramp — except the two rows explicitly marked EXCEPTION (never renamed).

### A. Global CSS custom properties (`app/globals.css`)

| Old | Value | New alias | Resolves to |
|---|---|---|---|
| `--color-brand` | `#e8341a` | `--color-cta-bg` (context: CTA) / `--color-band-bg` (context: band) / `--color-text-brand-strong` (context: non-link text) — **role-dependent, see §B** | brand-600 / brand-800 / brand-800 |
| `--color-brand-hover` | `#c9280f` | `--color-cta-bg-hover` | brand-700 |
| `--color-brand-light` | `#fef2f0` | `--color-surface-badge` (accent contexts) / `--color-error-bg-admin` (error contexts, held) — **role-dependent, see §E** | brand-50 / #fef2f0 (unchanged) |
| `--color-vbrand` | `#5b5bef` | `--color-text-link` / `--color-gradient-start` — role-dependent | brand-600 |
| `--color-vbrand-2` | `#8a63f4` | `--color-gradient-end` | brand-700 |
| `--color-vbrand-hover` | `#4a4ad8` | (unused in current sweep — no live class references `vbrand-hover`; no token needed) | n/a |
| `--color-vbrand-soft` | `#eef0ff` | `--color-surface-chip` | brand-100 |
| `--color-vaccent` | `#f59042` | `--color-data-mark` (bullet markers/bars, per Phase 2's fold) | brand-500 |
| `--color-vok` | `#12b76a` | `--color-success-text` | **held, unchanged** |
| `--color-vink` | `#141726` | `--color-text-ink` | gray-900 |
| `--color-vmuted` | `#6b7280` | `--color-text-muted` | gray-500 |
| `--color-vline` | `#e6e8f0` | `--color-border-neutral` | gray-200 |
| `--color-vbg` | `#f7f8fc` | `--color-surface-neutral-tint` | gray-50 |

### B. Tailwind utility-class patterns (by role, ~350 instances across 49 files, all 8 surface groups)

| Old class(es) | Role | New token | Step | Representative sites |
|---|---|---|---|---|
| `text-brand`, `text-vbrand` (link/interactive label) | interactive text | `--color-text-link` | 600 + underline | Nav active item, "약관·고지 전문 보기" toggle (ConsentSection:63), Leadership ✓ marks, HowItWorks score |
| `text-brand`, `text-vbrand` (eyebrow/numeral/logotype, non-link) | non-link brand text | `--color-text-brand-strong` | 800 | `CL<span class="text-brand">Korea</span>` (all 4 Nav variants), section eyebrows (Leadership, Testimonials, PricingPage, CaseStudy) |
| `text-brand` at display scale (CaseStudy.tsx:38, 44px numerals) | sanctioned exception | `--color-text-brand-display` | 600 | CaseStudy metric numerals |
| `bg-brand`, `bg-vbrand`→gradient start (CTA button fill) | CTA fill | `--button-bg` | 600 | Nav CTA, PlanCards Standard-tier button, toggle switch "on" |
| `bg-brand-hover` | CTA hover | `--button-bg-hover` | 700 | Nav CTA hover, PlanCards button hover |
| `bg-brand` (full-bleed section, `CtaSection.tsx:9`, `Cta.tsx:3`, `PricingPage.tsx:40`) | CTA band | `--cta-band-bg` | **800**, not 600 — DESIGN.md's own contrast evidence: 600/700 fail white/80 subtext & white/50 ghost border there | landing CtaSection, about Cta, pricing banner |
| `border-brand` | interactive border/outline | `--button-outline-border` / `--focus-ring-shadow` | 600 | PlanCards Standard border, focus states |
| `bg-brand-light` (accent contexts only — see §E for the DetailPanel split) | soft surface / badge | `--badge-bg` | 50 | Hero status pill, PlanCards "2개월 무료" pill, HowItWorks "소재기업" chip, PricingPage toggle chip |
| `bg-vbrand-soft`, hover:`bg-vbrand-soft` | soft surface, stronger tier | `--chip-bg` | 100 | ConsentSection "opt" tag bg, FileUpload hover state, TypeToggle icon tile |
| `from-vbrand to-vbrand-2` (gradient) | signup primary action | `--signup-gradient-start` / `--signup-gradient-end` | 600 → 700 | ExpertSignupPage/IndividualSignupPage submit buttons, PhaseNav CTA + logo tile |
| `accent-vbrand` (native checkbox accent) | interactive control | `--color-toggle-on` | 600 | ConsentSection "전체 동의" + per-item checkboxes |
| `border-vline`, `bg-vbg`, `text-vink`, `text-vmuted` | neutral fold | `--color-border-neutral` / `--color-surface-neutral-tint` / `--color-text-ink` / `--color-text-muted` | gray-200 / gray-50 / gray-900 / gray-500 | all 10 signup files |

### C. Hard-coded hex/rgba literals

| Old literal | Context | Sites | New value |
|---|---|---|---|
| `#fbd5ce` (border tint) | soft-surface decorative border, paired with `bg-brand-light` | Hero.tsx:12, HowItWorks.tsx:32, AlternatingRows.tsx:73/127, AnnouncementDetail.tsx:46/166, LocalDetail.tsx:167, PlanCards.tsx:37 | `--color-border-tint` → brand-200 |
| `#f6f6ff` / `#dfe0ff` / `#f2f2ff` / `#f7f7ff` / `#c9cbe0` (violet tint family) | soft-surface gradient/border on signup cards | IndividualSignupPage.tsx:225, TaxonomyPicker.tsx:181/248, FileUpload.tsx:30, TypeToggle.tsx:49-50 | `--color-surface-chip` (brand-100) for fills; `--color-border-tint` (brand-200) for borders |
| `rgba(232,52,26,.08)` (focus ring) | input focus halo | LoginModal.tsx:46/56, ContactForm.tsx:6, SimpleLoginModal.tsx:51/59 | `rgb(var(--rgb-brand-600) / 0.08)` |
| `rgba(232,52,26,.35)` (button shadow) | CTA hover shadow | Hero.tsx:38 | `rgb(var(--rgb-brand-600) / 0.35)` |
| `rgba(232,52,26,.07)` (selected-state shadow) | RoleOption selected halo | DetailPanel.tsx:242 | `rgb(var(--rgb-brand-600) / 0.07)` — **note: this site's border/bg (`border-brand bg-brand-light`) is the accent half of §E's split** |
| `rgba(91,91,239,.28)` (gradient button shadow) | signup CTA shadow | ExpertSignupPage.tsx:136/256, IndividualSignupPage.tsx:112/244, PhaseNav.tsx:36 | `rgb(var(--rgb-brand-600) / 0.28)` |
| `rgba(91,91,239,.12)` (card shadow) | TypeToggle selected-card halo | TypeToggle.tsx:49 | `rgb(var(--rgb-brand-600) / 0.12)` |
| `#e8341a` (avatar) | Testimonials decorative avatar, speaker 1 | Testimonials.tsx:8 | brand-600 (design-systems token-swap, §G) |
| `#1d4ed8` (avatar) | Testimonials decorative avatar, speaker 2 | Testimonials.tsx:15 | brand-800 (§G) |
| `#059669` (avatar) | Testimonials decorative avatar, speaker 3 | Testimonials.tsx:22 | brand-950 (§G) |
| `#e8341a` / `#1d4ed8` / `#059669` / `#7c3aed` (chart) | Leadership `DEPT_PIPELINE` categories | Leadership.tsx:4-7 | Okabe-Ito 4-set, §F above — **data-viz target, not the same resolution as the avatar row above despite sharing 3 of the 4 hex values** |
| `#e0442f` / `#ffece9` | signup validation error | ConsentSection.tsx:14, ExpertSignupPage.tsx:249, IndividualSignupPage.tsx:240 | **held, unchanged** — `--color-error-text-signup` / `--color-error-bg-signup` |
| `#fecaca` (border) + `red-800` (text) | admin destructive | DetailPanel.tsx:95/172/193 | **held, unchanged** — `--destructive-border` / `--destructive-text`, see §E |

### D. Stock Tailwind utility collisions (never brand, per Never section)

| Old classes | Context | Sites | New tokens |
|---|---|---|---|
| `bg-blue-50 text-blue-700` (company) / `bg-violet-50 text-violet-700` (academic) | 2-way categorical kind badge | Queue.tsx:118, DetailPanel.tsx:50 | company → `--admin-badge-bg-company`/`--admin-badge-text-company` (brand-50/700); academic → `--admin-badge-bg-academic`/`--admin-badge-text-academic` (gray-100/700) — hue-vs-neutral, no second hue introduced |
| `bg-blue-50 text-blue-700 border-blue-200` | plain info chip ("과제 12건 ✓") | HowItWorks.tsx:38 | `--info-chip-bg`/`--info-chip-text` (gray-100/700) |
| `bg-blue-50 text-blue-700` | plain info chip (department tag) | AnnouncementTable.tsx:218 | `--info-chip-bg`/`--info-chip-text` (gray-100/700) |

### E. `DetailPanel.tsx`'s `bg-brand-light` double duty — corrected split (see Discovery § Gaps #1)

| Line | What it renders | Verdict | New token |
|---|---|---|---|
| 65 | REJECTED status pill (`else` branch of the status ternary) | **error/destructive** (plan mis-stated this as accent) | `--destructive-bg`/`--destructive-text` |
| 95 | NTS-check-failed background (`bg-brand-light border-[#fecaca] text-red-800`) | error/destructive | `--destructive-bg`/`--destructive-border`/`--destructive-text` |
| 132 | "미리보기" preview-button hover state | accent | `--badge-bg` hover / `border-brand-600` |
| 172 | 반려 (reject) button | error/destructive | `--destructive-bg`/`--destructive-border`/`--destructive-text` |
| 193 | rejected-status detail box | error/destructive | `--destructive-bg`/`--destructive-border` |
| 242 | RoleOption selected state (MANAGER/ADMIN picker) | accent | `--badge-bg` (border-brand-600 + brand-50 fill) |

Corrected count: **4 error/destructive, 2 accent** (plan said 3/3). Collision resolved for every site; none deferred.

### F. Data-viz re-palette (Leadership.tsx `DEPT_PIPELINE`)

See Component tokens § "Data-viz categorical palette" above. 4 Okabe-Ito (2008) CVD-safe hues, none overlapping the new brand hue (H 251.9°), redundant-encoded via direct department-name + count labels already present in the markup (Munzner categorical channel + Knaflic/WCAG 1.4.1 redundancy rule).

### G. Design-systems token-swap (Testimonials.tsx decorative avatars)

Not the chart target (§F) despite sharing 3 of 4 hex values today. Purely decorative, no data encoded → folds into the single brand hue. The avatar glyph is white text on the fill, so only white-text-passing steps qualify (600/700/800/900/950 — never 400/500, which DESIGN.md's contrast report bans for white text at 2.30/3.65): `#e8341a`→brand-600, `#1d4ed8`→brand-800, `#059669`→brand-950 — the widest spread among the five valid steps.

### H. Kept-as-is exception (never renamed)

| File | Values | Verdict |
|---|---|---|
| `LogoStrip.tsx` `SOURCES` array | `#1d4ed8` (NTIS), `#dc2626` (KIPRIS), `#0369a1` (DART), `#7c3aed` (RISS), `#059669` (ScienceON), `#b45309` (IRIS), `#be185d` (범부처통합연구지원), `#374151` (Korea Tech Portal) | **EXCEPTION — kept as-is.** All 8 are third-party data-source identifiers, not rndmatching's brand. `#1d4ed8` and `#7c3aed` coincide with hues used elsewhere in this sweep (old blue/violet) but must not be confused with those rows or silently renamed into the brand ramp. |

### I. Functional colors (unchanged — before/after identical)

| Token | Value before | Value after | Held because |
|---|---|---|---|
| `vok` / `--color-success-text` | `#12b76a` | `#12b76a` | success tick, functional |
| success tint bg | `#eaf7f0` (hard-coded, now named `--color-success-bg`) | `#eaf7f0` | pairs with `vok`, functional |
| signup validation error text | `#e0442f` | `#e0442f` | functional error |
| signup validation error bg | `#ffece9` | `#ffece9` | functional error |
| admin destructive bg | `#fef2f0` (the old `brand-light` hex — survives ONLY here) | `#fef2f0` | functional error/destructive, never brand after this phase |
| admin destructive border | `#fecaca` | `#fecaca` | functional error/destructive |
| admin destructive text | `red-800` (stock Tailwind) | `red-800` | functional error/destructive |
| `AlternatingRows.tsx` "connected" dot | `#10b981` (×4, ConnectRow) | `#10b981` | functional-adjacent (live/connected signal, same family as `vok`/emerald); was never part of either brand palette, not touched |

### J. Surfaced gaps beyond the plan's original sweep (resolved, not deferred)

| Finding | Resolution | Rationale |
|---|---|---|
| `ConsentSection.tsx` `opt` tag (`bg-vbrand-soft text-vbrand`) | `--chip-bg`/`--chip-text` (brand-100/700) | Same fold as every other `vbrand-soft` use (§B) |
| `ConsentSection.tsx` `pay` tag (`bg-[#fff4e6] text-[#e07f16]`) — undocumented in Phase 2, not part of `vaccent` (different hex) | `--warning-bg`/`--warning-text` (amber-50/600, the exact pair `DetailPanel.tsx` already ships for PENDING) | Never classified as functional in Phase 2; folding it to brand would make `opt`/`pay` visually identical (loses the must/opt/pay 3-way distinction); inventing a new hex is out of scope. Reusing an already-shipped functional pair introduces no new value and restores 3-way distinctness. |

### K. Explicitly out of scope (logged so the absence isn't mistaken for an omission)

- `text-gray-400` (#9ca3af, ×76) — predates rebrand, already flagged in DESIGN.md's Open questions, not a brand-color usage.
- `signup/TaxonomyPicker.tsx` table-chrome grays (`#edeef2`, `#fcfcfe`, `#d7dae4`, `#f4f5f8`, `#f1f3f7`) — never part of either brand palette.
- `signup/AddressField.tsx:74` / `TaxonomyPicker.tsx:136` dark navy `#2b3a55`/`#1f2b40` — flagged as an open question (Open questions section above), not resolved: not enumerated in this phase's scope, no double-duty or named collision to resolve.
- Decorative/unrelated literals with no brand role: `#0a0a0a`/`#1a1a2e` (dark section backgrounds), `#ff5f57`/`#febc2e`/`#28c840` (HeroMockup macOS-style traffic-light dots), `#9ca3af` (icon stroke), `#f9fafb` (DocPreviewModal texture) — none reference brand or vbrand, no action.
