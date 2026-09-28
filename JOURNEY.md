# JOURNEY.md — rndmatching Blue Rebrand

Specification document for user journeys, information architecture, and page structure. This document is current-state inventory only — existing page structure as shipped, no journey redesign or IA changes.

Date: 2026-09-28
Status: Phase 1 — Page Spec Inventory

---

## Page specs

### 1. Landing (marketing site entry point)

**Route:** `/` (app/page.tsx → LandingPage component)

**Purpose:** Public-facing hero and persuasion sequence for the rndmatching platform — introduce R&D consortium matching value, build credibility, and drive signup/login CTAs.

**Key sections (in order):**
- **Nav**: Global navigation with logo, menu links (회사 소개, 가격 정책, 문의하기), and login/signup CTA
- **Hero**: Value proposition with headline, subheading, primary CTA (로그인 / 가입), and decorative hero mockup component
- **LogoStrip**: Partner/customer logos (NTIS integration callout)
- **HowItWorks**: Process flow with numbered steps and illustrative content (3 phases: 기술분야 발굴 → 컨소시엘 매칭 → 과제수행)
- **CaseStudy**: Single featured case study with metrics and description
- **AlternatingRows**: Left-right alternating content blocks showcasing platform features, benefits, and use cases
- **Testimonials**: Customer/expert testimonials with avatar initials and quotes
- **Leadership**: Team leadership intro with categorical chart (DEPT_PIPELINE by department color)
- **CtaSection**: Secondary call-to-action block with headline and links
- **Footer**: Navigation links, copyright, contact info

**Interactive states:** LoginModal (context-triggered, appears on login CTA click); all links are functional

**Entry points:** Direct URL, top-nav links from other pages

**Primary CTA:** "가입하기" (signup), "로그인" (login)

---

### 2. About (company info)

**Route:** `/about` (app/about/page.tsx → AboutPage component)

**Purpose:** Build trust and credibility by describing company mission, problem statement, team, and timeline. Supports recruitment and partnership goals.

**Key sections (in order):**
- **Nav**: Shared nav with "회사 소개" marked active
- **Hero**: Page headline "CL Korea" with subheading, call-to-action triggers login modal, large background image
- **Problem**: Context-setting section explaining the R&D matching problem and market gap
- **Stats**: Key metrics and KPIs (companies matched, projects funded, team size, etc.)
- **Values**: Company values/mission statement with visual reinforcement
- **Team**: Team member profiles with photos, names, and roles
- **Timeline**: Historical milestones and company growth trajectory
- **Cta**: Secondary call-to-action with headline and login button
- **Footer**: Shared footer

**Interactive states:** SimpleLoginModal (triggered by login CTAs)

**Entry points:** Top-nav link from landing or any page

**Primary CTA:** "로그인" (login)

---

### 3. Pricing (pricing page)

**Route:** `/pricing` (app/pricing/page.tsx → PricingPage component)

**Purpose:** Present pricing tiers, compare plan features, and answer FAQs. Drive conversion through pricing transparency.

**Key sections (in order):**
- **Nav**: Shared nav with "가격 정책" marked active
- **Title/Hero**: Heading "R&D 성과에 맞는 합리적인 요금제" with supporting description
- **PlanCards**: 3 pricing tiers (Basic, Pro, Enterprise) with features, pricing, and "시작하기" CTA buttons
- **CompareTable**: Feature comparison matrix across all tiers (rows = features, columns = tiers)
- **Faq**: Frequently asked questions and answers (collapsible sections)
- **Cta banner**: Large block with headline "지금 바로 시작하세요", subheading, and two buttons (signup CTA in white, demo request link)
- **Footer**: Shared footer

**Interactive states:** SimpleLoginModal (triggered by signup CTAs); demo request link navigates to /contact

**Entry points:** Top-nav link from landing or any page

**Primary CTA:** "무료로 시작하기" (free signup), "데모 신청하기" (demo request)

---

### 4. Contact (contact form / sales)

**Route:** `/contact` (app/contact/page.tsx → ContactPage component)

**Purpose:** Capture sales inquiries, demo requests, and support questions. Route inbound leads to sales team.

**Key sections:**
- **Nav**: Shared nav with "문의하기" marked active
- **Title/Hero**: Heading "무엇이든 물어보세요" with supporting text about response time and availability
- **Main grid** (two-column layout on desktop, stacked on mobile):
  - **ContactForm** (left): Multi-field form (name, email, company, message, optional fields); submit button with validation and success feedback
  - **InfoSidebar** (right): Contact details (email, phone, business hours, social links, office address)
- **Footer**: Shared footer

**Interactive states:** SimpleLoginModal (triggered by login CTA in nav); form validation and submission feedback

**Entry points:** Top-nav link, CTA links from pricing/about pages

**Primary CTA:** Form submission

---

### 5. Announcements (R&D announcement hub)

**Route:** `/announcements` (app/announcements/page.tsx → AnnouncementsPage component)

**Purpose:** Real-time aggregation and browsing of government R&D project announcements via IRIS integration. Primary value-delivery surface for existing users.

**Key sections:**
- **Nav**: Announcements-specific nav (separate from landing nav)
- **Hub** (main content):
  - **Page headline**: "정부부처별 R&D 사업공고" with description and IRIS sync status badge
  - **KPI row**: Four cards displaying key metrics (total active count, closing-soon count, saved count, partner agencies count)
  - **Department cards grid**: 4-column grid of clickable department cards; each card shows icon, department name, description, and active count; links to `/announcements/org/[dept]`
  - **Tabs/views** (implemented via routes): All announcements table view, org-specific table view, local (city) announcements view
- **Footer**: Announcements-specific footer

**Sub-routes and detail pages:**
- `/announcements/all`: Table view of all IRIS announcements with filters and search
- `/announcements/org/[dept]`: Table view filtered by selected government department
- `/announcements/notice/[id]`: Detail page for a single announcement with reformatted document body
- `/announcements/local/[city]`: Local announcements table for city
- `/announcements/local/[city]/[idx]`: Detail page for a local announcement

**Interactive states:** Favorite-toggling (star icon), table sorting/pagination, search filtering

**Entry points:** Top-nav (login required), deep links from emails/shares

**Primary CTA:** None (information browsing); secondary: email signup, notification setup

---

### 6. Admin (verification and approval dashboard)

**Route:** `/admin` (app/admin/page.tsx → AdminConsole component)

**Purpose:** Internal verification and approval workflow for institution/company registration and role assignment. Admin-only surface.

**Key sections:**
- **Nav**: Admin console header with reset button
- **Page title**: "기관 인증 검증" with description
- **StatsRow**: Summary statistics (pending count, approved count, rejected count, total count)
- **Main grid** (two-column layout):
  - **Left column**:
    - **Queue**: Filtered list of verification requests with kind filter (all/company/academic) and status filter (PENDING/APPROVED/REJECTED); search by organization name; each row shows org name, status, submission date; clicking selects for detail view
    - **AuditLog**: Chronological log of approvals, rejections, and admin actions
  - **Right column**:
    - **DetailPanel**: Selected verification detail view with submitted documents, org info, form fields, and action buttons (approve with role assignment, reject with reason); includes document preview modal trigger
- **Toast notifications**: Success/error feedback for actions

**Interactive states:** Row selection, filter toggles, document preview modal, approve/reject action dialogs

**Entry points:** Admin-only route (authentication required)

**Primary CTA:** Approve / Reject actions

---

### 7. Shared (reusable components across pages)

**Route:** N/A (component library, not a standalone page)

**Purpose:** Consistent navigation, footer, and modal components used across marketing (landing, about, pricing, contact) and announcements surfaces.

**Components:**
- **Nav** (shared version): Global top navigation bar with logo, menu links (회사 소개, 가격 정책, 문의하기), login button; used by about, pricing, contact pages; alternate landing-specific nav exists (landing/Nav.tsx with different styling)
- **Footer** (shared version): Footer with navigation links, copyright, and legal links; used by about, pricing, contact pages; landing and announcements have their own footer variants
- **SimpleLoginModal**: Modal dialog for login/signup with email/password form; triggered by login CTAs across pages; used by about, pricing, contact, announcements

**Purpose in journey:** Ensure consistent header, footer, and modal experience across the marketing/informational part of the site (not the app-like surfaces like admin/announcements).

---

### 8. Signup (registration flow for two user types)

**Route:** `/signup` (app/signup/page.tsx → IndividualSignupPage component) and `/signup/expert` (app/signup/expert/page.tsx → ExpertSignupPage component)

**Purpose:** Multi-step registration flow for two distinct user roles — individual (企業 company/institution rep) and expert (技術 specialist/researcher). Drive user onboarding.

**Key sections (both pages share structure):**
- **PhaseNav**: Progress indicator showing current phase (Type selection → Details → Consent) and phase navigation
- **TypeToggle**: Toggle between "기업담당자" (company representative) and "전문가" (expert) roles; switching re-routes between /signup and /signup/expert
- **PhaseSteps**: Current phase content:
  - **Phase 1 (Type selection)**: Already shown in TypeToggle
  - **Phase 2 (Details form)**: Context-specific fields (company/individual details, taxonomy picker for expertise, file upload for credentials)
  - **Phase 3 (Consent)**: Multi-item consent form (ToS, privacy, optional 3rd-party sharing, age verification, marketing opt-in) with expandable document modals
- **TaxonomyPicker**: Multi-select picker for expertise/interest areas (displayed inline in Phase 2)
- **FileUpload**: Document/credential upload component (company cert, degree, etc.)
- **ConsentSection**: Checkbox-based consent items with expandable full-text or table-format documents
- **PerksSidebar** (Individual page only): Callout highlighting benefits of signup
- **Success screen**: Confirmation page after successful submission

**Interactive states:** Phase navigation, type toggle, form validation, file upload progress, consent expansion, success confirmation

**Entry points:** Direct URL, CTA links from pricing/landing pages, email invitations

**Primary CTA:** Submit form (phase progression), final signup confirmation

**Specific details by type:**
- **IndividualSignupPage**: Collects company name, business registration number, org type, focus field, manager name/title, email, phone, expertise taxonomy, file upload (optional), and consents
- **ExpertSignupPage**: Collects name, birth date, email, phone, affiliation, department/title, address, expertise taxonomy, degree, career, credentials, and consents (including expert code of conduct)

Both share the same consent items and taxonomy picker, with different field labels and flows appropriate to each role.

---

## Current constraints

- **No IA changes**: Navigation structure, routes, and site organization remain unchanged from current implementation
- **No flow redesign**: Multi-step processes (signup phases, announcements filtering, admin approval workflow) are documented as-is
- **No new pages**: This inventory captures existing surfaces only
- **Shared component variants**: Some components (Nav, Footer) have both shared and page-specific versions; both are documented under their origin surface group (landing, announcements, etc.)

---

## Notes for design phases

This spec exists to provide JOURNEY.md structure for the design system and mock phases — specifically, page-level context and section order for rendering and evaluating the new blue color palette against real surfaces. The next phase (DNA + tokens) will lock DESIGN.md with the brand color ramp; the rendering phase will apply those tokens across these documented surfaces.
