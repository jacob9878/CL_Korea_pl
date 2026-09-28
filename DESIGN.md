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
