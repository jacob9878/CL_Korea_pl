# Discovery + Design: Phase 3 - 디자인 시스템 롤아웃 스펙

## Artifacts Found / Current State

- **DESIGN.md**: present, locked (Phase 2, commit `74f8ca1`). Cobalt/navy ramp `--color-brand-50`…`--color-brand-950` (11 steps, H 251.9°), explicit Role→step contract table, 56/56 WCAG AA pairs pass, functional colors held (`vok`, emerald, signup error, admin error), `vaccent` folds to `brand-500`. This is the law this phase builds on — no ramp value is re-derived here.
- **JOURNEY.md**: present (Phase 1). 8 surface-group page specs (landing, about, pricing, contact, announcements, admin, shared, signup) — used to confirm every surface group is represented in the sweep below.
- **app/globals.css**: single `@theme` block, 14 old color custom properties (`--color-brand`, `--color-brand-hover`, `--color-brand-light`, `--color-vbrand`, `--color-vbrand-2`, `--color-vbrand-hover`, `--color-vbrand-soft`, `--color-vaccent`, `--color-vok`, `--color-vink`, `--color-vmuted`, `--color-vline`, `--color-vbg`) alongside animation keyframes. No alias/component tier exists yet — Phase 3 is additive spec only; `globals.css` itself is untouched this phase (implementation is a later pass).
- **Component tree**: 49 `.tsx`/`.ts` files under `component/` reference brand/vbrand/vaccent/vok/vink/vmuted/vline/vbg Tailwind classes or the matching CSS custom properties. `app/` route files hold no direct color usages (all color logic lives in `component/`).

## Gaps

A fresh grep sweep (not a re-use of the plan's line numbers — verified against the actual files) found the plan's current-state sweep is directionally correct but has three corrections and two net-new findings:

1. **`DetailPanel.tsx`'s `bg-brand-light` classification is off by one site.** The plan calls lines 65/132/242 "accent" and 95/172/193 "error/destructive." Reading the live file: line 65 is the `else` branch of the status-pill ternary (`PENDING → amber`, `APPROVED → emerald`, `else → bg-brand-light text-brand`) — since the verification's only three statuses are PENDING/APPROVED/REJECTED, that `else` is the **REJECTED status pill**, not an accent use. Corrected split: **65, 95, 172, 193 are error/destructive** (4 sites — REJECTED status pill, NTS-failed background, reject button, rejected-detail box); **132, 242 are accent** (preview-button hover, RoleOption selected state) — 2 sites. The error/destructive majority is even larger than the plan stated. Resolved in the mapping table below, not deferred.
2. **`LogoStrip.tsx` has 8 third-party source colors, not 1.** The plan's Never section names only `#1d4ed8` (NTIS) as the kept-as-is exception. The live `SOURCES` array has 8 entries, each a distinct hex identifying a different data source (NTIS, KIPRIS, DART, RISS, ScienceON, IRIS, 범부처통합연구지원, Korea Tech Portal) — none are rndmatching's brand. All 8 are logged as one kept-as-is exception block; `#1d4ed8` (NTIS) and `#7c3aed` (RISS) are called out individually since they coincide with hues elsewhere in the sweep (old brand-adjacent blue/violet) and must not be confused with those rows.
3. **`ConsentSection.tsx` has an undocumented third tag color.** Neither the plan nor DESIGN.md's Functional colors list mentions the `pay` variant (`bg-[#fff4e6] text-[#e07f16]`) alongside `must` (functional error, held) and `opt` (`bg-vbrand-soft text-vbrand`, brand). This is a genuine Phase-2 blind spot, not a Phase-3 invention — resolved below (§ Surfaced gaps), not guessed at, with rationale.
4. **New collision risk surfaced, not in scope to fix here:** `component/signup/AddressField.tsx:74` and `TaxonomyPicker.tsx:136` use a one-off dark navy `#2b3a55`/`#1f2b40` (a "조회"/"적용" secondary button) that predates both brand palettes and was never part of `--color-brand`/`--color-vbrand`. It isn't touched by this phase's scope (not enumerated, not double-duty, not a stock-utility collision), but now that brand's deep end (`brand-800`/`900`) is also dark navy, it risks reading as "off-brand blue" the way stock `blue-*` did. Logged as an open question for the next accessibility/consistency pass, not resolved here (resolving it would mean inventing a value outside this phase's scope).
5. **Pre-existing signup neutral literals are out of scope, explicitly.** `#edeef2`, `#fcfcfe`, `#d7dae4`, `#f4f5f8`, `#f1f3f7` (TaxonomyPicker table chrome) are hard-coded grays that were never part of either brand palette (`--color-brand`/`--color-vbrand`) — they sit alongside `vline` but aren't the token itself. They're noted so their absence from the mapping table isn't mistaken for an omission; they carry no brand-color role to remap.

No prerequisite is missing: DESIGN.md is locked, JOURNEY.md exists, Phase 2 is committed.

## Gate Status

- DESIGN.md: **locked** (Phase 2, commit `74f8ca1`) — treated as law; every alias below resolves only to its Color tokens block or Role→step table.
- JOURNEY.md: **present** — all 8 surface groups have page specs; the sweep below covers all 8.
- Prerequisites: **met**.

## DW Verification

| DW-ID | Done-When Item | Status | Evidence |
|-------|---------------|--------|----------|
| DW-3.1 | Every sweep row (token usages, hard-coded hex/rgba, stock-utility collisions) has a mapping-table row; `LogoStrip.tsx` logged as kept-as-is | COVERED | `## Usage mapping table` in DESIGN.md, sections A–K; row-count cross-check against this file's sweep (§ Gaps + fresh grep output) below |
| DW-3.2 | All aliases resolve to DESIGN.md's Phase 2 ramp values; no new hex outside the global tier (LogoStrip excepted) | COVERED | `## Alias tokens` + `## Component tokens` sections in DESIGN.md — every `$value` is a `var(--color-brand-*)`/`var(--color-gray-*)` reference or an explicitly-held functional literal; verified by grep for raw `#` hex inside the new sections (only the cited exceptions and the data-viz chart set, which is out of the CSS tier by design-viz/color pillar split) |
| DW-3.3 | Functional color values (incl. hard-coded signup error red) identical before/after | COVERED | `## Usage mapping table` § I "Functional colors (unchanged)" — each row shows old value = new alias value, byte-identical |
| DW-3.4 | Collision log empty — `DetailPanel.tsx` split and every other double-duty/unclear usage resolved to a named token | COVERED | `## Usage mapping table` § E (DetailPanel, corrected 4/2 split) + § D (stock `blue-*`/`violet-*`) + § J (surfaced gaps: ConsentSection triad, resolved with rationale) — no row left as "TBD" |

**All items COVERED:** YES

## Design Decisions

Doctrine applied: `design-systems` (Kholmatova functional/perceptual split, Frost tiers, W3C DTCG-style semantics) and `data-viz` (Munzner channels, Cleveland & McGill perceptual accuracy, Okabe-Ito CVD-safe categorical palette).

1. **Two soft-surface tiers, not one.** DESIGN.md's Role→step table already distinguishes step 50 ("pill, badge, icon tile, selected row") from step 100 ("chip, active filter, soft CTA"). Rather than collapsing every old soft-surface use (`bg-brand-light`, `bg-vbrand-soft`) into one alias, Phase 3 keeps that distinction as two component tokens (`badge-bg` = 50, `chip-bg` = 100) — this is exactly Kholmatova's point that perceptual consistency comes from consistent *token* use, not a single flattened rename.
2. **Same old class, different new step, by role.** `bg-brand` alone appears as a CTA fill (→600), a full-bleed band (→800, per DESIGN.md's own contrast-driven band choice), and nowhere else identically. A blind find-replace of `bg-brand → bg-brand-600` would ship a contrast failure on the CTA bands (DESIGN.md already proved 600/700 fail the white/80 subtext and white/50 ghost border there). The mapping table resolves every `bg-brand`/`text-brand` site by its **component role**, not its old class name — this is the alias/component tier boundary doing its job (design-systems doctrine: "the tier boundary is the design decision layer, not the rename layer").
3. **`DetailPanel.tsx`'s double duty resolved by re-reading the code, not the plan's line numbers.** See § Gaps #1. The corrected 4-error/2-accent split still resolves cleanly: error sites → `color-error-bg`/`color-error-border`/`color-error-text` (held destructive red, never brand); accent sites → `badge-bg`/`border-brand-600` (brand, interactive/selected-state family).
4. **Two stock-collision badges resolve via hue-vs-neutral, not hue-vs-hue.** `company` vs `academic` (Queue.tsx, DetailPanel.tsx) and the two plain-informational chips (HowItWorks.tsx, AnnouncementTable.tsx) can't use a second hue (Never section bans violet/indigo, teal/cyan, and gold as substitutes) and can't collide with brand blue. Resolution: the categorical member that's conceptually "the platform's own domain" (`company`) takes the brand badge tier (`brand-50`/`brand-700` — already the sanctioned admin-badge pattern); the other member and the two plain info chips take the **existing neutral gray scale** (`gray-100`/`gray-700`), which was already held as the ink/chrome system in Phase 2 and isn't a new hue. Distinction by chroma-vs-achromatic rather than hue-vs-hue avoids inventing any new accent.
5. **Data-viz and design-systems avatar hex are NOT the same target, even though they share values today.** `Leadership.tsx`'s `DEPT_PIPELINE` is a genuine categorical bar chart (Munzner: category → color hue; Cleveland & McGill: position/length for the bar length, hue for category ID). It gets a **CVD-safe data palette** (Okabe-Ito, 2008 — cited in `data-viz/references/viz-principles.md`), deliberately avoiding blue/sky-blue (both too close to the new brand hue) and picking 4 mutually-distinct, colorblind-safe hues, with the existing direct text labels serving as the required redundant encoding (color is never the only channel — each bar already carries a department name and count). `Testimonials.tsx`'s avatar-initial background is decorative only (no data value encoded) — it is a **design-systems token-swap**, folded into 3 distinct lightness steps of the single brand ramp (`brand-500`/`700`/`900`), consistent with the DNA's "hierarchy via lightness alone" signature and the Never section's absolute ban on a second hue anywhere in the brand *system* (avatars are decorative UI chrome, not a data encoding, so the monochromatic law applies to them and the chart's CVD carve-out does not).
6. **Testimonials avatar steps corrected for white-text contrast.** The avatar circles render a white initial-letter glyph on the color fill (`text-white` over `style={{ background: t.color }}`) — text-on-background, not a non-text data mark — so the ban on `white on brand-400/500` (DESIGN.md's own contrast report: 2.30 / 3.65, both <4.5) applies. Only steps 600/700/800/900/950 pass white text (5.34/7.13/10.03/13.68/17.33). The three avatars use `brand-600`, `brand-800`, `brand-950` — the widest achievable spread among the five AA-passing steps. (Caught during production, not discovery — an early draft had proposed `brand-500` for one avatar; anchoring required fixing it before this went further, not shipping it as "close enough.")
7. **Surfaced gap (`ConsentSection.tsx`'s `pay` tag) resolved by reuse, not invention.** `#fff4e6`/`#e07f16` was never classified as functional in Phase 2 and was never part of either brand palette. Rather than invent a new hex (forbidden by this phase's constraints) or silently fold it into brand (which would make `opt` and `pay` visually identical, losing the 3-way distinction Gestalt/preattentive design requires), it's consolidated onto the **already-shipped amber warning pair** (`amber-50`/`amber-600`, the exact pair `DetailPanel.tsx` already uses for `PENDING`). This introduces no new value — it reuses stock Tailwind amber already live in this codebase — and preserves must(red)/opt(brand)/pay(amber) as three visually distinct categories.

Where an existing tool replaced hand-rolled work: none needed this phase — Phase 3 produces a token *spec* (markdown + CSS custom-property blocks appended to DESIGN.md), not a rendered mock or a contrast run. `palette.mjs` was Phase 2's tool; this phase only *references* its output (the locked ramp), per the design-systems doctrine's "extend, never replace" rule. No new contrast computation was needed because every alias resolves to a step DESIGN.md already contrast-verified (56/56 pass) — re-verified by reading DESIGN.md's own PASS list for every step this phase's aliases touch (50, 100, 200, 500, 600, 700, 800, 900) and confirming none of them fall in the BANNED list (400/500 as text, gray-500 on 100/200).

## Recommendation

BUILD

---

### Fresh sweep evidence (for the DW-3.1 cross-check)

Commands run against `app/` + `component/` (paths repo-root-relative, this worktree):

```
grep -rlE -- "--color-(v?brand|vaccent|vok|vink|vmuted|vline|vbg)" app component        → 6 files (globals.css + 5 inline var() consumers)
grep -rohE "(bg|text|border|from|to|via|ring|outline|shadow|fill|stroke|decoration|divide|caret|accent|placeholder)-(brand|vbrand)(-[a-z]+)?\b" app component | sort | uniq -c
  → text-brand 82, bg-brand 31, bg-brand-light 24, text-vbrand 20, border-brand 17, bg-brand-hover 13,
    bg-vbrand-soft 10, border-vbrand 7, to-vbrand 6, from-vbrand 6, bg-vbrand 5, accent-vbrand 2, to-brand-light 1
grep -rohE "...-(vaccent|vok|vink|vmuted|vline|vbg)(-[a-z0-9]+)?\b" app component | sort | uniq -c
  → border-vline 23, text-vmuted 22, text-vink 14, bg-vbg 5, text-vok 3, text-vaccent 2, bg-vline 1, bg-vaccent 1
grep -rlE "...(brand|vbrand|vaccent|vok|vink|vmuted|vline|vbg)..." app component | wc -l   → 49 files, all 8 surface groups represented
grep -rnoE "#[0-9a-fA-F]{6}\b" app component | sort | uniq -c   → full hex inventory (58 distinct literals), cross-referenced individually (see mapping table)
```

Every file this sweep found has a corresponding row (individually for hex/rgba/collision/edge cases, by pattern-class for the ~350 plain Tailwind-class instances) in DESIGN.md's `## Usage mapping table`.

## Artifacts

- Discovery + Design: `.design-foundations/build/blue-rebrand-phase-3-discovery.md` (this file)
- Token tiers + mapping table appended to: `DESIGN.md`
