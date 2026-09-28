# Discovery + Design: Phase 2 - DNA + 토큰 정의

## Artifacts Found / Current State
- `DESIGN.md`: absent. This phase creates and locks it.
- `JOURNEY.md`: present (Phase 1, commit a32ecaa). It has page specs for all 8 surface groups.
- `app/globals.css` `@theme` holds two brand palettes:
  - red `--color-brand` #e8341a / `-hover` #c9280f / `-light` #fef2f0
  - violet signup set `--color-vbrand` #5b5bef, `-2` #8a63f4 (purple, used as the gradient end), `-hover` #4a4ad8, `-soft` #eef0ff
  - plus `vaccent` #f59042 (decorative), `vok` #12b76a (functional), `vink` #141726, `vmuted` #6b7280, `vline` #e6e8f0, `vbg` #f7f8fc
- Usage counts (utility grep over app/ + component/):
  - `text-brand` ×82: mostly **non-link** text (uppercase eyebrows, stat numerals, ✓ glyphs, hero headline `<em>`, the "Korea" logotype). Only 3 are real links (LoginModal signup link, admin Nav hover, LocalTable external link).
  - `bg-brand` ×31: primary buttons (always `text-white`, `hover:bg-brand-hover`), full-bleed closing CTA bands (landing CtaSection, about Cta, pricing banner) with `text-white/80`–`/85` subtext and `border-white/50` ghost buttons, data mini-bars, KPI dots, toggle-on.
  - `bg-brand-light` ×24: soft pill/badge/icon-tile surfaces, the admin selected row, and 3 DetailPanel error sites. Phase 3 splits those.
- Neutrals: the site's ink/chrome is stock Tailwind gray (cool, hue about 264): `gray-900` ink ×55, `gray-500` ×106, `gray-200` borders ×134. Layout body is `bg-white text-gray-900`.
- Type: a single system sans stack (`-apple-system`, Pretendard, Apple SD Gothic Neo, Malgun Gothic). Weights 600/700/800/900 dominate, with arbitrary px sizes from 9 to 44px and negative display tracking.
- Motion: fade-up 0.55s ease, fade-in 0.7s, marquee 28s linear, brand-ping 1.4s, dot-pulse 1.2s, `.reveal`, `transition-colors` defaults. No `prefers-reduced-motion` handling exists.

## Gaps
- palette.mjs builds its solid from the hue's cusp. For seed #0176D3 that gives `accent-9` #0590ff (vivid), whose on-solid text is near-black. The shipped CTAs are white-on-brand, so the script's solid cannot be the CTA. **Resolution:** keep palette.mjs's tints (accent-2/3/5/7/8, verbatim) for steps 50–400. Solve steps 500–950 at the **same hue** (251.9°) in OKLCH using palette.mjs's own conversion and WCAG math. The verifier is saved at `.design-foundations/build/blue-rebrand-phase-2-contrast.mjs`.
- `gray-500` secondary text on the new `brand-100` tint measures 4.26:1. Lightening `brand-100` enough to pass would merge it with `brand-50`. **Resolution:** the target stays 4.5. The pair is banned: secondary text on brand-100 or deeper tints uses `gray-600`. The verifier asserts the ban.
- The existing focus halos are `0 0 0 3px rgba(brand,.07–.08)`, which is decorative and below 3:1. The 3:1 focus indicator is the `brand-600` border or ring. Documented.
- `gray-400` text (×76, 2.54:1 on white) predates this work and is outside the brand ramp. Logged as an open question, not fixed here (out of scope).

## Gate Status
- DESIGN.md: produced and locked in this phase. Direction was confirmed by the user in the parent conversation (cobalt/navy, monochromatic, Salesforce-style, trust/connection).
- JOURNEY.md: present.
- Prerequisites: the research doc and plan are present. No dependency on a prior DESIGN.md. Met.

## DW Verification
| DW-ID | Done-When Item | Status | Evidence |
|-------|---------------|--------|----------|
| DW-2.1 | DESIGN.md at root with the CSS custom-property Color token block, direction confirmed | COVERED | DESIGN.md `## Color tokens` has an `@theme` block of `--color-brand-*` custom properties. Status is "confirmed", per the parent-conversation approval. |
| DW-2.2 | All brand-ramp text/bg pairs pass WCAG AA | COVERED | `blue-rebrand-phase-2-contrast.mjs` exits 0: 40/40 text pairs ≥4.5:1, including composited white/80 on the band. palette.mjs (`--seed #0176D3 --chroma vivid --harmony mono --scheme light`) exits 0. Pairs below 4.5 are listed as banned. |
| DW-2.3 | CTA/accent ≥3:1 non-text vs adjacent surface, by shade only | COVERED | Same verifier: 16/16 non-text pairs ≥3:1 (CTA 600 and hover 700 vs white/gray-50/brand-50/brand-100, toggle, focus ring, selected-row bar, white button on band, ghost border on band). Every step sits at H 250.2–252.8°, so contrast comes from lightness alone. |
| DW-2.4 | "Never" names the monochromatic-drift risks | COVERED | DESIGN.md `## Never` names: no second accent hue (including vbrand-2 purple, vaccent orange, and stock `blue-*`/`violet-*` collisions), functional colors stay outside the ramp, and more. |
**All items COVERED:** YES (4/4)

## Design Decisions
- **Archetype → family** (archetypes.md Part C, mixed-signal rule): Sage is primary (precise, credible, expert: the R&D matching is data-led) and Caregiver inflects **one dimension, color temperature/softness**. Base family is **Data-Dense Professional** (cool hue 220–260, neutral cool-grey chrome) with Swiss's single-accent restraint. The pinned seed H 251.9° sits inside the family's 220–260 cool band. Blue also fits color theory: banks use blue for calm trust, and red overloads analytical contexts (ch09 Pattern 4). That supports leaving red, since the announcements and admin surfaces are analytical.
- **Monochrome via value only** (ch09 "monochromatic = one hue, tints and shades"): an 11-step ramp at a single hue. CTAs separate from surfaces by lightness (ΔL ≥ 0.43 against white).
- **Link disambiguation** (ch09 red flag "blue text on non-link content → use a clearly different shade"): `brand-600` as text is reserved for links and interactive labels. Non-link brand text (eyebrows, numerals, ✓, logotype) moves to navy `brand-800` (ΔL 0.148, 1.88:1 from 600). Inline links also carry an underline. One exception: display-size (≥28px, weight 900) heading emphasis may use 600 as a hero expressive moment, because heading-scale text does not read as a link.
- **Band shade chosen by evidence:** 600 fails white/80 subtext (3.99:1) and 700 fails the white/50 ghost border (2.96:1). 800 passes both (7.00 / 3.70), so bands are `brand-800`.
- **Neutrals are held:** the stock Tailwind gray scale (already cool, H about 264) stays the ink and chrome system. palette.mjs's neutral ramp is not adopted, which avoids a second neutral system and chrome churn.
- **Register:** structure is calm (white/gray chrome, tints for soft states, 600 only on interactive elements). Admin stays at the calm end with no bands and no 500 fills. The marketing hero and closing bands are the saturated/deep moments.
- Type, composition and motion are **held** from the shipped code, documented rather than re-diverged. The dealer was not run: hue is pinned and composition is held.

## Recommendation
BUILD
