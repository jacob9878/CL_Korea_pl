# Design Review: Phase 2 - Cobalt Ledger (DNA + Color Tokens)

## Rendered Evidence (Step 0)
- Screenshot: none — this phase's artifact is a design specification document (DESIGN.md), not a rendered HTML/pixel surface. No-artifact carve-out for the visual-render step; the detector still ran directly against the markdown (see below).
- Surface: `/Users/keonyoung/rndmatching/.claude/worktrees/blue-rebrand/DESIGN.md` (146 lines), cross-checked against `app/globals.css` (current pre-rebrand tokens), `JOURNEY.md` (Phase 1 page-spec inventory), and independently re-executed `.design-foundations/build/blue-rebrand-phase-2-contrast.mjs`.

## Assessment B — Deterministic Detector
- Command: `node /Users/keonyoung/.claude/plugins/cache/rtd/design-for-ai/4.2.0/scripts/detect.mjs /Users/keonyoung/rndmatching/.claude/worktrees/blue-rebrand/DESIGN.md > .design-foundations/build/blue-rebrand-phase-2-review-detect.json`
- Exit: 0 — `"status": "ran"` (the detector accepts markdown input; this is a real run, not N/A)
- Findings: 2 — `em-dash-overuse` (medium), `numbered-section-markers` (advisory)
- Opened only after Assessment A findings were frozen: YES

## Independent Verification
Re-ran `blue-rebrand-phase-2-contrast.mjs` directly (not trusting DESIGN.md's printed numbers): output is byte-for-byte consistent with DESIGN.md's pasted contrast block — same 11 ramp hexes/OKLCH values, same 56 PASS rows, same 4 BANNED rows, exit 0, "56/56 pairs pass." DESIGN.md's contrast claims are independently confirmed, not fabricated or stale.

## Triage
- Baseline (always-on, per this dispatch's explicit `## Doctrine` list): `design-dna`, `archetypes`, `foundations`, `color` (primary `chapter-08-color-science.md` + companion `chapter-09-color-theory.md`, per the two-file rule)
- Dispatched: only the four named doctrines — this artifact is a spec document, not a rendered UI, so `usability`/`journey`/`content-design`/`data-viz`/`behavioral` signals (operable flows, charts, persuasion mechanics) are not present *in this artifact itself* to review
- Not applicable: `checklists.md` (visual audit checklist) was not separately loaded — the dispatch prompt's `## Doctrine` block explicitly scoped four names; those four cover the DNA-generation and color-science ground this phase's DW items test
- Deferred: none beyond the above — four doctrines fully read and applied

## Cross-Pillar Findings (ONE ranked report)

| Severity | Pillar | Problem | Principle | Fix |
|----------|--------|---------|-----------|-----|
| Major | design-dna | DESIGN.md's DNA line names **Data-Dense Professional** as the base family ("DNA: Data-Dense Professional... + color restraint from Swiss"). But `archetypes.md` Part C lists Data-Dense Pro only in Sage's **stretch** column (primary: Editorial Minimalism, Swiss) — and it isn't listed for Caregiver (the inflection archetype) at all. | design-dna.md Remix Rule 1: "Pick the base family from the archetype's *primary* families... The base supplies the default position on ALL four axes." A stretch family may be *borrowed into* an axis, not promoted to base without documented content-pressure override. | Either re-ground the base on Swiss (already primary for Sage, and DESIGN.md already borrows Swiss's single-accent restraint) with Data-Dense Pro's cool-chrome/density treatment folded in as the borrowed axis, or add one sentence naming the content-pressure justification explicitly (archetypes.md's own "Dense tables/numbers → Data-Dense Pro" override table row), since admin/announcements are genuinely data-dense per JOURNEY.md. |
| Minor | detector / copy (register-justified) | Detector flags `em-dash-overuse`: 39 em-dashes in DESIGN.md's body copy. | ai-tells.md copy-tells catalog (via detect.mjs rule `em-dash-overuse`) | Register-justified: DESIGN.md is an internal governance/spec artifact (rationale, contrast tables, token documentation), not user-facing marketing prose — the rule targets AI-generated product/marketing copy. No action needed; flagged for completeness per the dual-blind merge contract. |
| Minor | detector (likely false positive) | Detector flags `numbered-section-markers`: "decorative sequence: 03, 04, 05, 06, 07, 08." | ai-tells.md decorative-numbering catalog (via detect.mjs) | DESIGN.md contains no decorative UI section numbering — this rule targets rendered hero/landing sections styled as "01 02 03." Applied to markdown prose, the "sequence" appears to be an artifact of scanning numeric citations (chapter refs, contrast ratios) rather than a real design tell. No action needed. |
| Minor | color (chapter-08) | `brand-600 on brand-100` measures **4.71:1** against the 4.5:1 AA text target — a 0.21 margin, the thinnest of all 56 checked pairs. | Color Science ch08 — perceptual/implementation fragility at a near-threshold pass | Passes as specified; flag as a regression risk if any of `brand-600`/`brand-100`'s hex values are tweaked later without re-running the verifier. No change required now. |
| Note | color / accessibility (out of scope, pre-existing) | DESIGN.md's own "Open questions" logs `gray-400` (2.54:1, fails AA) and DetailPanel's red reject label (4.25:1, fails AA) as pre-existing, outside the brand ramp, deferred to a later pass. | Color Science ch08 (text contrast) | Correctly scoped out of DW-2.2 (which is brand-ramp-only) and transparently logged rather than silently ignored — no action needed for this phase, but confirm a later phase actually picks these up. |
| Note | process | DW-2.1's "direction confirmed by user" rests on DESIGN.md's own header ("Status: confirmed (locked)") and the discovery doc's claim of "parent conversation" approval — this review has no transcript to independently corroborate that the confirmation genuinely happened outside the artifact's self-assertion. | N/A (reviewer-limitation note, not a design defect) | No design action; noting the evidence boundary for the record. |

## Requirement Fulfillment

### DW-2.1
PREMISE:  DESIGN.md exists at project root, contains the CSS custom-property Color token block, direction confirmed by user
EVIDENCE: `/Users/keonyoung/rndmatching/.claude/worktrees/blue-rebrand/DESIGN.md` exists (146 lines). `## Color tokens` (lines 39–53) contains a fenced ```css @theme { --color-brand-50 ... --color-brand-950 } ``` block of CSS custom properties. Header line 2 reads "Status: confirmed (locked)." (Confirmation is a document self-assertion; see process Note above — no independent transcript available to this review.)
VERDICT:  PASS

### DW-2.2
PREMISE:  All brand-ramp text/background pairs pass WCAG AA (≥4.5:1 body, ≥3:1 large), verified via computed contrast ratio
EVIDENCE: Independently re-ran `.design-foundations/build/blue-rebrand-phase-2-contrast.mjs`; output shows 40 `[text]` pairs at target 4.5:1, all PASS (lowest: brand-600 on brand-100, 4.71:1), plus 4 `BANNED` pairs correctly asserted below 4.5:1 and not shipped (gray-500 on brand-100/200, white on brand-500/400). Exit 0, "56/56 pairs pass." Numbers match DESIGN.md's pasted contrast block exactly.
VERDICT:  PASS

### DW-2.3
PREMISE:  CTA/accent tokens pass ≥3:1 non-text contrast against adjacent surface using shade difference alone
EVIDENCE: Same verifier run: 16 `[non-text]` pairs at target 3:1, all PASS — CTA `brand-600`/hover `brand-700` vs white/gray-50/brand-50/brand-100 (lowest 4.71:1), data bar `brand-500` vs white/gray-100 track (3.65/3.32), toggle-on vs toggle-off (4.31), focus ring (5.34), selected-row bar (5.04), white CTA button vs brand-800 band (10.03), ghost border white/50 on band (3.71). Every ramp step measures within H 250.2–252.8°, confirming contrast is shade/lightness-derived, not hue-derived.
VERDICT:  PASS

### DW-2.4
PREMISE:  DESIGN.md's "Never" section names this project's monochromatic-drift risks (no second accent hue; genuinely functional colors stay outside the brand ramp)
EVIDENCE: `## Never` (lines 126–140) opens with "No second accent hue anywhere in the brand system," naming violet/indigo, orange, warm/gold, teal/cyan, and cross-hue gradients explicitly as banned drift targets, plus stock Tailwind blue/indigo/sky collisions to re-palette. A separate bullet states "Functional colors stay outside the brand ramp, by value, unchanged," naming success (vok/emerald), validation error, admin error, and warning/info explicitly.
VERDICT:  PASS

**All requirements met:** YES

### Edge cases
- **CTA/button shade too close to its surface → must still clear ≥3:1 non-text contrast.** PASS — the closest surface tested (brand-100, the deepest tint CTAs sit against) still measures 4.71:1 non-text, well clear of 3:1.
- **Headings/decorative blue must not read as a clickable link → only a designated link-shade gets link semantics.** PASS — the signature move ("Cobalt means clickable") reserves `brand-600` for interactive elements only, forces non-link brand text (eyebrows, numerals, ✓, logotype) to navy `brand-800`, requires underlines on inline links, and states one narrow, reasoned exception (display-size ≥28px/weight 900 heading emphasis, where size disqualifies a link reading). Matches color-theory ch09's red flag verbatim ("Blue used for non-link text... reserve blue text exclusively for links, or use a clearly different shade").
- **Admin (data-dense) surfaces need the ramp's calmer end; marketing hero moments may sit at the ramp's more saturated end — both documented under Register.** PASS — "Register by surface" (lines 22–25) explicitly places Admin/Announcements at the calm end (tints + 700/800 text, 600 only for selected-row/filter/actions, no bands/500 fills/gradients) and Marketing at the saturated end (moments 1–2), matching design-dna.md's structure-register vs. expressive-moments model.

## Notes (non-blocking)
- The base-family/stretch-family question (see Major row above) is the one place the doctrine trail doesn't fully close — it doesn't affect any DW item or edge case, since the *color* outcome (single hue, restrained, contrast-verified) is sound regardless of which family label is "base."
- Detector findings are both register/domain-mismatch resolutions specific to reviewing a markdown spec rather than a rendered page; re-running the detector against Phase 3's actual rendered surfaces is where `ai-tells.md`'s visual checks (not copy checks) will matter.
- No screenshot/pixel evidence exists for this phase by design (spec-only phase) — noted per the no-artifact carve-out, not a defect.

**Verdict: PASS**
