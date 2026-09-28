# rndmatching — Red-to-Blue Rebrand

Site-wide color rebrand of rndmatching (a B2B R&D expert-matching platform) from its current red brand color to a Salesforce-style monochromatic cobalt/navy blue scale.

**Date:** 2026-09-28
**Status:** draft

## Open questions
- Exact hex values / shade steps for the new blue scale (dark navy → cobalt → light tint) — to be resolved in the design DNA / plan step.
- Whether typography, spacing, or component shapes change at all, or this is color-only (nothing raised so far suggests more than color).
- Dark mode not discussed — out of scope unless raised later.

## Current state
- `app/globals.css` defines two competing palettes:
  - `--color-brand` (#e8341a, red) + hover/light variants — used across almost the entire site: landing, about, pricing, contact, announcements, admin, shared nav/footer.
  - `--color-vbrand` (#5b5bef, violet-blue) + accent orange/green — used only on the signup pages ("Phase I signup palette").
- No existing logo or brand asset constraints — `public/` only contains default Next.js/Vercel placeholder icons.

## What this is
- **Scope**: entire site — landing, about, pricing, contact, announcements, admin, signup. Everything currently on `--color-brand` (red) moves to the new blue scale; signup's existing violet-blue is also folded into the same scale rather than kept as a separate palette.
- **Color direction**: a single cobalt/navy blue hue, varied by lightness/shade only (monochromatic) — no separate contrasting accent color for CTAs or highlights. Modeled on Salesforce's Lightning Design System blue scale (dark navy ~#032D60 → action blue ~#0176D3 → light blue tints for backgrounds/soft states).
- **Mood**: trust and inter-company connection/bonding, fitting a B2B matching platform. Explicitly moving away from red's harder, more aggressive feel.

## Taste signals
- Monochromatic on purpose — user rejected a contrasting accent color (e.g. warm orange/gold) in favor of shade differences within the blue scale only.
- Reference point: Salesforce's corporate blue, not a warmer/violet blue (signup's current `--color-vbrand` was explicitly called out as *not* the desired direction — too violet).
