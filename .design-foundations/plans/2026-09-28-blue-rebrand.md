# Plan: rndmatching Red-to-Blue Rebrand
**Date:** 2026-09-28 · **Status:** complete · **Track:** Standard
**Started:** 2026-09-28 · **Completed:** 2026-09-28 · **Duration:** 1 session
**Workspace:** worktree `.claude/worktrees/blue-rebrand` on branch `feature/blue-rebrand`
**Seed:** `.design-foundations/research/2026-09-28-blue-rebrand.md`
**Entry stage:** Discover (minimal — page-spec inventory of the already-shipped structure, no redesign), then Design — DNA. Full Discover (JTBD/journey mapping) is not run: IA/flows/page structure are unchanged, this is a color-only identity update.

## Context

**Problem:** rndmatching 사이트 전체에서 현재 공존하는 두 브랜드 팔레트(레드 `--color-brand`, 바이올렛 `--color-vbrand`)를 세일즈포스 스타일의 단일 코발트/네이비 블루 스케일로 통합해, B2B 매칭 플랫폼다운 신뢰감·유대감을 전달한다.

**Constraints:**
- 전체 페이지(landing, about, pricing, contact, announcements, admin, signup) 예외 없이 적용
- 브랜드 컬러는 하나의 블루 축 안에서 명도 차이로만 구성(모노크로매틱) — 대비되는 별도 포인트 컬러 없음
- 세일즈포스 Lightning 스타일(네이비 → 코발트 → 라이트 블루 틴트) 참고
- 기존 기능적 색상(성공/에러/경고 등)은 브랜드 색과 별개 — 이번 리브랜딩 대상 아님
- 기존 로고/브랜드 자산 없음(자유도 높음)
- 타이포그래피·레이아웃·IA 변경 없음 — 색상 토큰 교체만

**Success criteria:**
- DESIGN.md에 세일즈포스풍 무드를 만족하는 블루 스케일 토큰이 잠긴 상태로 존재
- 모든 텍스트/배경 조합이 WCAG AA 통과
- 8개 서페이스 그룹의 기존 브랜드 색상 사용처가 전부 새 토큰으로 매핑된 스펙 존재
- 렌더된 목업이 "신뢰감/유대감" 무드를 전달한다는 디자인 리뷰를 통과 — verified at the downstream `/mock` stage (design-review-agent heuristic pass), not a phase in this plan

## Current-state sweep (informs Phase 2 and Phase 3)

`grep` + spot-reads over `app/` + `component/` found:
- **51 files across 8 surface groups** reference `--color-brand` (red) or `--color-vbrand` (violet) as CSS custom properties/Tailwind theme classes: `landing/*`, `about/*`, `pricing/*`, `contact/*`, `announcements/*`, `admin/*`, `shared/*` on red; `signup/*` (10 files) on violet. `app/globals.css` defines both palettes plus signup's extended semantic set (`vaccent` orange, `vok` green, `vink` text, `vmuted`, `vline`, `vbg`).
- **Hard-coded brand hex, not tokens:** `component/landing/Leadership.tsx:4` uses `#e8341a` as one of 4 category colors in a genuine categorical bar chart (`DEPT_PIPELINE`, alongside a blue `#1d4ed8` and a violet `#7c3aed`) — a real data-viz surface, not a token-swap target. `component/landing/Testimonials.tsx:8,15` uses `#e8341a` and `#1d4ed8` purely as decorative avatar-initial colors (no data meaning). `component/landing/LogoStrip.tsx:2` uses `#1d4ed8` as a third-party source's (NTIS) brand color, not rndmatching's own — an open question, not an assumed rename (see Phase 3 Edge cases).
- **Hard-coded brand tint/border hex (not the chart/avatar cases above):** a red border tint `#fbd5ce` recurs across `landing/Hero.tsx:12`, `landing/HowItWorks.tsx:32`, `landing/AlternatingRows.tsx:73,127`, `announcements/AnnouncementDetail.tsx:46,166`, `announcements/LocalDetail.tsx:167`, `pricing/PlanCards.tsx:37`; violet-family tints (`#f6f6ff`/`#dfe0ff`/`#f2f2ff`/`#f7f7ff`/`#c9cbe0`) recur across `signup/IndividualSignupPage.tsx:225`, `signup/TaxonomyPicker.tsx:181,248`, `signup/FileUpload.tsx:30`, `signup/TypeToggle.tsx:49-50`; brand hex also appears inline as `rgba(232,52,26,…)` / `rgba(91,91,239,…)` shadow/focus-ring values in `LoginModal`, `landing/Hero.tsx`, `ContactForm`, `SimpleLoginModal`, `DetailPanel.tsx:242`, `ExpertSignupPage`, `IndividualSignupPage`, `PhaseNav`, `TypeToggle`.
- **Stock Tailwind utility collision:** `component/admin/Queue.tsx:118`, `DetailPanel.tsx:50`, `landing/HowItWorks.tsx:38`, and `announcements/AnnouncementTable.tsx:218` all use stock `blue-50/blue-700` (vs. `violet-50/violet-700` in the admin rows) for badges unrelated to the brand tokens today — but `blue-*` will collide with the new brand blue once it ships.
- **Double-duty and destructive/error uses already in code, all inside `DetailPanel.tsx`:** `bg-brand-light` (currently red-tinted) is used as a *brand accent* tint at lines 65, 132, 242, but as *error/destructive* semantics at line 95 (rejected-item background), line 172 (반려/reject button), and line 193 (rejected-status box). One class, two unrelated meanings, and the error/destructive instances outnumber the accent ones.
- **Hard-coded functional error red, separate from the brand ramp:** `#e0442f`/`#ffece9` in `signup/ConsentSection.tsx:14`, `signup/ExpertSignupPage.tsx:249`, `signup/IndividualSignupPage.tsx:240` — this is functional (validation error), not brand, and must be carried over unchanged.
- **`vaccent` (orange, `#f59042`) is purely decorative** — bullet markers and a bar in `component/signup/TaxonomyPicker.tsx:100,117,143` — not a functional/status color. Only `vok` (green, success ticks) is genuinely functional.

---

### Phase 1: 페이지 스펙 인벤토리
**Stage:** Discover
**Model:** haiku
**Doctrine:** journey
**Gate:** Minimal

**Goal:** Record the existing, unchanged page structure as JOURNEY.md page specs, purely so the downstream mock stage has real per-surface structure to render the new colors against.

**Scope:**
- IN: one page-spec entry per surface group (route, purpose, key sections/components), sourced from the current `app/` + `component/` structure
- OUT: any new page, route, flow, or IA change; no journey/flow redesign

**Constraints:** Documentation of what's already shipped, not a journey redesign — do not alter section order, add pages, or change navigation.

**Produces:** JOURNEY.md — `## Page specs` section, one entry per surface group
**Depends on:** research doc | **Unlocks:** the mock command's page-level rendering (independent of Phase 2/3 — see DAG note below)

**Done when:**
- [ ] DW-1.1: JOURNEY.md exists with a `## Page specs` section containing one complete entry for each of the 8 surface groups

---

### Phase 2: DNA + 토큰 정의
**Stage:** Design
**Model:** fable
**Doctrine:** design-dna, archetypes, foundations, color
**Gate:** Full

**Goal:** Lock a single cobalt/navy blue color scale in DESIGN.md — Salesforce-style, monochromatic, AA-verified — replacing both the red and violet palettes, while explicitly holding type/composition/motion at their current (unchanged) values.

**Scope:**
- IN: seed-hue justification (archetype/family fit — reads as Sage archetype, precise/credible/expert, primary family Swiss/Data-Dense Professional, with a Caregiver inflection for warmth/trust, per `archetypes.md` Part C's mixed-signal rule), tint/shade ramp generation, CTA/accent contrast strategy via shade only, link-color disambiguation from body ink, DESIGN.md write + lock
- OUT: typography, layout/composition, motion, genuinely functional/status colors (success/error/warning/info stay as-is), IA/journey

**Constraints:**
- Hue is pinned (cobalt/navy, per research doc taste signal) — this is a pinned convergence, not a fresh 5-candidate hue-divergence/dealer run
- Monochromatic requirement satisfied via lightness/shade contrast only (`color.md` "accent must contrast surroundings" is met through value, not a second hue)
- Type/Composition/Motion sections in DESIGN.md document the existing shipped implementation as "held," not re-diverged
- `vaccent` (orange) is decorative, not functional — it folds into the blue ramp. Only `vok` (success) plus true error/warning colors stay outside the brand ramp.

**Edge cases:**
- CTA/button shade too close to its surface → must still clear ≥3:1 non-text contrast
- Headings/decorative blue must not read as a clickable link — only a designated link-shade gets link semantics
- Admin (data-dense) surfaces need the ramp's calmer end; marketing hero moments may sit at the ramp's more saturated end — both documented under Register

**Produces:** DESIGN.md (locked) — Color tokens section (full ramp + contrast report) + Type/Composition/Motion marked "held from existing implementation"
**Depends on:** research doc | **Unlocks:** Phase 3

**Done when:**
- [ ] DW-2.1: DESIGN.md exists at project root, contains the CSS custom-property Color token block, direction confirmed by user
- [ ] DW-2.2: All brand-ramp text/background pairs pass WCAG AA (≥4.5:1 body, ≥3:1 large), verified via computed contrast ratio
- [ ] DW-2.3: CTA/accent tokens pass ≥3:1 non-text contrast against adjacent surface using shade difference alone
- [ ] DW-2.4: DESIGN.md's "Never" section names this project's monochromatic-drift risks (no second accent hue; genuinely functional colors stay outside the brand ramp)

---

### Phase 3: 디자인 시스템 롤아웃 스펙
**Stage:** Design
**Model:** sonnet
**Doctrine:** design-systems, data-viz
**Gate:** Full — touches all 8 surfaces, carries real collision risk (see sweep), and is the functional-color safety net; not a low-risk mechanical pass.

**Goal:** Build the alias + component token tier that maps every existing brand-color usage (the sweep above) onto Phase 2's locked blue ramp, per Kholmatova's functional/perceptual pattern split — including the hard-coded hex, the stock-utility collision, and the existing double-duty class.

**Scope:**
- IN: role enumeration (nav, CTA/buttons, links, hover/focus states, brand-colored badges, admin queue/audit indicators) across all 8 surface groups; alias tokens (e.g. `color-text-link`, `color-cta-bg`, `color-nav-active`, `color-error-bg`, `color-error-border`) and component tokens (`button-bg`, `nav-active-indicator`, `admin-badge-bg`); a full old-usage → new-token mapping table covering token refs, the hard-coded tint/border/rgba hex literals, and the avatar/chart hex from the sweep; `Leadership.tsx`'s `DEPT_PIPELINE` categorical chart re-palette (`data-viz` doctrine: keep 4 perceptually distinct, colorblind-safe categories once brand blue is reserved for the brand system — the chart's blue category can no longer coincide with generic "brand blue"); the admin/landing/announcements stock `blue-*`/`violet-*` badge collisions re-paletted so they no longer collide with the new brand blue
- OUT: editing component code (that's `build`'s job), new components, changes to genuinely functional/status color values

**Constraints:**
- Alias/component tokens reference Phase 2's locked ramp only — never a hand-picked hex
- signup's existing `vink`/`vline`/`vbg` fold into the new neutral/ink scale; `vok`, the true error/warning colors (including the hard-coded `#e0442f`/`#ffece9` signup error red), stay functional, explicitly carried over (not dropped); `vaccent` folds into the blue ramp per Phase 2
- Admin reuses the same component tokens as marketing surfaces — no separate admin-only brand hue
- `Testimonials.tsx`'s decorative avatar hex is a plain token-swap target (design-systems only); `Leadership.tsx`'s chart is a data-viz target — don't conflate the two just because they share a hex today
- `LogoStrip.tsx`'s `#1d4ed8` is a third party's (NTIS) source color, not rndmatching's brand — the mapping table must record it as an explicit kept-as-is exception, never silently renamed to a brand token

**Edge cases:**
- `DetailPanel.tsx`'s `bg-brand-light` is split by actual meaning, not by class name: lines 65/132/242 (brand accent tint) map to an accent alias; lines 95/172/193 (rejected-item background, reject button, rejected-status box) map to `color-error-bg`/`color-error-border` or a destructive-action alias instead — the error/destructive instances are the majority use of this class, not the exception
- Any brand-color usage with no clear semantic role is logged as an open question in the mapping table, not guessed

**Produces:** Token tiers (alias + component) appended to DESIGN.md, plus the full mapping table covering every row from the current-state sweep — token-based, hard-coded hex/rgba, and stock-utility collision alike
**Depends on:** Phase 2 (DESIGN.md locked) | **Unlocks:** `build`'s design-system rollout phase

**Done when:**
- [ ] DW-3.1: Every row from the current-state sweep (token-based usages, hard-coded hex/rgba literals, and stock-utility collisions) has a corresponding row in the mapping table, with `LogoStrip.tsx` explicitly logged as a kept-as-is exception rather than silently mapped
- [ ] DW-3.2: All semantic aliases resolve to Phase 2's locked ramp values — no hard-coded hex remains outside the global token tier (LogoStrip's exception excluded)
- [ ] DW-3.3: Genuinely functional color token values — including the hard-coded signup error red — are identical before and after the mapping
- [ ] DW-3.4: Mapping table's collision log is empty — every double-duty and unclear-role usage found in the sweep, including all three `DetailPanel.tsx` error/destructive sites, is resolved to a named token, not deferred

---

## DAG

Phase 1 and Phase 2 both depend only on the research doc and can run independently (Phase 1's only consumer is the mock command, not Phase 2 or 3). Phase 3 depends on Phase 2's locked DESIGN.md. `{1, 2} → 3`.

## Verification plan

- DW-1.1: JOURNEY.md page-spec section has one entry per surface group
- DW-2.1/2.2: confirm DESIGN.md file + CSS token block + computed contrast ratios for every text/background pair in the ramp
- DW-2.3: measure CTA/accent non-text contrast — reject if <3:1
- DW-2.4: read DESIGN.md's Never section for the two named drift risks
- DW-3.1: cross-check the mapping table's row list against every item in the current-state sweep (token usages, tint/border/rgba hex, avatar/chart hex, utility collisions) — any gap is a failure; confirm `LogoStrip.tsx` is logged as an exception, not mapped
- DW-3.2: scan mapping table + resulting tokens for hard-coded hex outside the global tier
- DW-3.3: compare functional-color token values before/after (including the hard-coded signup error red) — must be identical
- DW-3.4: mapping table's collision log must be empty, including all three `DetailPanel.tsx` error/destructive sites (95, 172, 193) resolved separately from its accent-tint sites (65, 132, 242)

**Dirty cases:**
- DESIGN.md missing/unlocked when Phase 3 starts → Phase 3 blocked, flagged; no placeholder tokens substituted
- `DetailPanel.tsx`'s `bg-brand-light` mapped 1:1 to one token regardless of context instead of split by actual meaning → rejected, must produce a distinct `color-error-bg`/destructive alias for its majority (error) uses
- Leadership.tsx's categorical chart collapsed onto brand-blue-only without checking perceptual distinctness/colorblind-safety of the remaining 3 categories → rejected
- `LogoStrip.tsx`'s third-party color silently renamed to a brand token instead of logged as a kept-as-is exception → rejected
- Ramp's darkest navy or lightest tint fails contrast against its paired text/background → that ramp step regenerated, not shipped

## Assumptions

- No dark mode requested or implied by current site — Color tokens section covers light mode only
- "Salesforce style" is a directional reference (navy → cobalt → light-tint structure, monochromatic restraint), not exact hex matching against Salesforce's trademarked palette
- Typography/composition/motion inherit unchanged from the current implementation; DESIGN.md documents them as "held" rather than re-diverging

## Decision log

- Added a minimal Discover phase (Phase 1, JOURNEY.md page-spec inventory) rather than skipping Discover outright — the mock stage's JOURNEY.md gate needs real per-surface structure to render against; this is inventory, not a journey redesign
- Track set to Standard despite landing at 3 (mostly small) phases — the rollout spans 8 distinct surface groups needing a systematic token-tier response, not a single-surface tweak
- Phase 2 archetype read as Sage (primary, precise/credible/expert) with a Caregiver inflection (trust/warmth), landing in the Swiss / Data-Dense Professional family per `archetypes.md` Part C's mixed-signal heuristic
- Corrected the initial sweep (was "~38 files / 7 groups," token-search only) after a CHECK pass found 51 files / 8 groups plus hard-coded hex and a stock-utility collision the token grep missed
- Corrected it again after a second CHECK pass surfaced further hard-coded tint/border/rgba hex, two more stock-utility collision sites, and that `DetailPanel.tsx`'s double duty is really three error/destructive sites outnumbering its accent-tint sites
- Reclassified `vaccent` (orange) from "functional" to "decorative" after finding its only uses are bullet markers/bars, not status — it folds into the blue ramp instead of staying a second accent hue
- Added `data-viz` doctrine to Phase 3, scoped narrowly to `Leadership.tsx`'s categorical chart — its blue category can't be allowed to collide with the new brand-blue system
- `LogoStrip.tsx`'s blue is a third party's (NTIS) source color, not rndmatching's brand — kept as an explicit logged exception rather than folded into the token system

## Execution log

### Phase 1: 페이지 스펙 인벤토리 (Gate: Minimal)
- [x] BUILD: Minimal — produced directly, no discovery pass
- [x] REVIEW: SKIPPED — Minimal gate (design execution evidence is the gate)
- [x] Committed
Commit: a32ecaa
Summary: JOURNEY.md written with `## Page specs` entries for all 8 surface groups (landing, about, pricing, contact, announcements, admin, shared, signup), documenting current structure as-is — no IA/flow changes.

### Phase 2: DNA + 토큰 정의 (Gate: Full)
- [x] BUILD: Discovery + design + production complete
- [x] REVIEW: PASS (1 accepted Major — DNA base-family doctrine-traceability nit, no requirement impact)
- [x] Committed
Commit: 74f8ca1
Summary: DESIGN.md locked — single cobalt/navy ramp (H 251.9°, seed #0176D3, 11 steps), 56/56 WCAG AA contrast pairs pass, monochromatic (no second accent hue), explicit role→step contract, type/composition/motion held as shipped. Signature move: "cobalt means clickable" (brand-600 reserved for interactive elements; brand-800 for non-link brand text).

### Phase 3: 디자인 시스템 롤아웃 스펙 (Gate: Full)
- [x] BUILD: Discovery + design + production complete
- [x] REVIEW: PASS
- [x] Committed
Commit: 4d7e65f
Summary: Alias + component token tiers appended to DESIGN.md, plus the full old-usage → new-token mapping table across all 8 surface groups (51 files, ~350 Tailwind instances, hard-coded hex/rgba literals, stock-utility collisions). DetailPanel's `bg-brand-light` double duty split by actual meaning (4 error/destructive, 2 accent). Leadership.tsx's categorical chart re-paletted to an Okabe-Ito colorblind-safe set. LogoStrip's third-party colors logged as a kept-as-is exception. Functional colors carried over unchanged. Spec only — no component code or globals.css touched.
