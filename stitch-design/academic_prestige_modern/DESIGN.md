---
name: Academic Prestige Modern
colors:
  surface: '#f7f9ff'
  surface-dim: '#d1dbe8'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#edf4ff'
  surface-container: '#e4effd'
  surface-container-high: '#dfe9f7'
  surface-container-highest: '#d9e3f1'
  on-surface: '#121d26'
  on-surface-variant: '#404942'
  inverse-surface: '#27313c'
  inverse-on-surface: '#e8f2ff'
  outline: '#707971'
  outline-variant: '#c0c9c0'
  surface-tint: '#2d6a48'
  primary: '#003820'
  on-primary: '#ffffff'
  primary-container: '#0f5132'
  on-primary-container: '#84c39b'
  inverse-primary: '#95d4ac'
  secondary: '#755b00'
  on-secondary: '#ffffff'
  secondary-container: '#fed255'
  on-secondary-container: '#735a00'
  tertiary: '#27332c'
  on-tertiary: '#ffffff'
  tertiary-container: '#3e4942'
  on-tertiary-container: '#abb8af'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f1c7'
  primary-fixed-dim: '#95d4ac'
  on-primary-fixed: '#002111'
  on-primary-fixed-variant: '#0f5132'
  secondary-fixed: '#ffe08e'
  secondary-fixed-dim: '#ecc246'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#584400'
  tertiary-fixed: '#d9e6dc'
  tertiary-fixed-dim: '#bdcac1'
  on-tertiary-fixed: '#131e18'
  on-tertiary-fixed-variant: '#3e4943'
  background: '#f7f9ff'
  on-background: '#121d26'
  surface-variant: '#d9e3f1'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  title-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies an academic-corporate hybrid ethos crafted specifically for high-stakes university career management. It balances the institutional trust, authority, and legacy of an academic establishment with the streamlined efficiency, clarity, and precision of top-tier enterprise recruitment software. 

The aesthetic is characterized as Modern Institutional: quiet sophistication, purposeful whitespace, and a high-contrast palette grounded in traditional campus colors. It rejects loud tech-startup trends in favor of structured data views, tactile card containers, and distinct visual milestones for student achievements.

The primary audience includes university placement directors, corporate recruiters, and graduating students navigating pivotal career transitions. The UI evokes confidence, structured progression, and academic dignity without feeling dated or bureaucratic.

## Colors

The palette is rooted in collegiate prestige, anchored by deep forest green, muted antique gold, and an organic warm ivory background. Strict mandate: blue and purple hues are entirely absent across all surface layers, states, and data visualizations.

### Primary & Accent
- **Primary Forest Green (`#0F5132`):** Primary action items, active primary navigation, confident milestones, and high-priority links. Hover states shift slightly deeper (`#0B3D26`).
- **Accent Muted Gold (`#C9A227`):** Academic distinction, KPI highlights, metric badges, and delicate indicator rules.

### Surfaces & Structural Neutrals
- **Page Background (`#F7F5EF`):** Warm ivory providing high reading comfort and tactile separation from pure white components.
- **Card & Surface Background (`#FFFFFF`):** High-density content surfaces, modals, and input fields.
- **Structural Border (`#E5E1D5`):** 1px delineator for all white surface cards, dividers, and table row boundaries.
- **Sidebar & Shell Dark Charcoal (`#1F2A24`):** A deep evergreen charcoal used for structural navigation shells, providing substantial contrast against warm ivory canvas spaces.
- **Text Neutrals:** Headings and primary data text utilize `#1F2933`. Secondary copy, helper strings, and table column headers utilize `#6B7280`. Disabled states use `#9CA3AF`.

### Placement & Workflow Status Badges
Status tokens use explicit, non-blue contextual pairings with soft backgrounds and high-contrast text:
- **Applied (Neutral Evaluation):** Background `#F3F4F6`, Text `#4B5563`, Border `#E5E7EB` (Slate Gray).
- **Shortlisted (Advancing):** Background `#FEF3C7`, Text `#92400E`, Border `#FDE68A` (Warm Amber).
- **Placed / Eligible (Success):** Background `#ECFDF5`, Text `#065F46`, Border `#A7F3D0` (Forest Mint).
- **Rejected / Not Eligible (Termination):** Background `#FEF2F2`, Text `#991B1B`, Border `#FECACA` (Crimson Earth).

## Typography

Typography relies uniformly on the geometric clarity and exceptional tabular legibility of Inter. 

Headers leverage slightly tightened letter spacing to present an authoritative, structured stance. Body text maintains generous line heights to facilitate prolonged review of student resumes, drive statistics, and academic credentials. Data-dense tables and technical specifications rely on the `label-caps` and `label-md` levels with elevated letter-spacing for rapid cognitive scanning without eye fatigue.

## Layout & Spacing

The structural layout uses an institutional desktop-first 12-column grid system paired with a persistent 280px navigation sidebar on desktop. The grid relaxes to an 8-column layout on tablet devices and a unified 4-column flow on mobile viewports.

### Breakpoint Matrix
- **Mobile (< 768px):** Outer canvas margins compress to `margin-sm` (1rem). The navigation converts to an off-canvas drawer accessed via the global warm-ivory header. Cards occupy full viewport width minus safe horizontal margins.
- **Tablet (768px - 1024px):** Grid columns span 8 with `gutter-sm` (1rem). The sidebar collapses into an icon rail (72px wide) with active gold accent pips.
- **Desktop (> 1024px):** Fixed 280px dark charcoal sidebar, fluid 12-column workspace bound by a maximum width of 1440px with `margin` (2rem) and `gutter` (1.5rem).

Data tables, applicant verification matrices, and recruitment pipelines must prioritize horizontal clarity, using standard internal cell padding equivalent to `space-md` vertically and `space-lg` horizontally.

## Elevation & Depth

Visual hierarchy is maintained through crisp structural borders paired with ultra-diffused, ambient depth rather than dramatic drop shadows. Every card container lives on `#F7F5EF` and features an explicit 1px outline in `#E5E1D5`.

- **Flat/Resting Layer (Cards, Metric Containers, Table Wrappers):** `box-shadow: 0 1px 3px 0 rgba(31, 41, 51, 0.04), 0 1px 2px -1px rgba(31, 41, 51, 0.02)`. Grounded, discrete, and clear.
- **Hover/Interactive Layer (Recruitment Drive Cards, Clickable Rows):** `box-shadow: 0 4px 6px -1px rgba(15, 81, 50, 0.05), 0 2px 4px -2px rgba(15, 81, 50, 0.05)`. A slight green-tinted lift indicating immediate responsiveness.
- **Floating/Overlay Layer (Dropdown Menus, Modals, Action Sheets):** `box-shadow: 0 20px 25px -5px rgba(31, 42, 36, 0.1), 0 8px 10px -6px rgba(31, 42, 36, 0.06)`. Deep institutional layering with low opacity to retain cleanliness.

## Shapes

The design system standardizes on an accessible 8px to 12px radius architecture. This range balances welcoming modern ergonomics with corporate rigor:
- **Base Components (8px / `0.5rem`):** Buttons, text inputs, status chips, dropdown menus, and nested table tags.
- **Containers (12px / `0.75rem`):** Surface cards, profile containers, dashboard summary tiles, and dialog modals.
- **Utility Indicators:** Status badge pills use complete capsule radii (`9999px`) to immediately signal distinct metadata categories separate from actionable cards.

## Components

### Buttons
- **Primary:** Background `#0F5132`, Text `#FFFFFF`, border-radius 8px. Hover state shifts to `#0B3D26`. Focus state exhibits a 2px offset ring in `#C9A227`.
- **Secondary / Outline:** Background `#FFFFFF`, Border 1px solid `#0F5132`, Text `#0F5132`. Hover introduces an ivory wash `#F7F5EF`.
- **Tertiary / Subtle:** Background transparent, Text `#1F2933`. Hover background `#F3F1E9`.
- **Destructive:** Background `#FEF2F2`, Border 1px solid `#FECACA`, Text `#991B1B`. Hover background `#FEE2E2`.

### Status Badges & Chips
Badges use 9999px rounded pills with 4px vertical and 10px horizontal padding, set in `label-md` weight.
- **Applied:** `#F3F4F6` surface, `#4B5563` text, `#E5E7EB` border.
- **Shortlisted:** `#FEF3C7` surface, `#92400E` text, `#FDE68A` border.
- **Placed & Eligible:** `#ECFDF5` surface, `#065F46` text, `#A7F3D0` border.
- **Rejected & Not Eligible:** `#FEF2F2` surface, `#991B1B` text, `#FECACA` border.

### Input Fields & Controls
- **Text Inputs & Selects:** Pure white background `#FFFFFF`, 1px border `#E5E1D5`, 8px radius, text `#1F2933`. Placeholder color `#6B7280`. Focused state switches border to `#0F5132` with a 1px focus shadow in `#0F5132`.
- **Checkboxes & Radios:** 18px size. Selected state filled with `#0F5132` with white inner marks. Unchecked border `#E5E1D5`. Focus ring highlights with `#C9A227`.

### Cards & Stat Tiles
- **Standard Card:** Pure white `#FFFFFF` body, 12px radius, 1px solid `#E5E1D5` border, resting ambient shadow.
- **Placement Stat Tile:** Incorporates a top or left-edge 3px indicator accent in `#C9A227` for pivotal metrics (e.g., Placement Percentage, Highest Package Offered). Icon backplates within stat tiles utilize `#F7F5EF` with `#0F5132` icon fills.

### Navigation Shell
- **Desktop Sidebar:** Background `#1F2A24`. Primary text items set in warm ivory (`#F7F5EF`) at 85% opacity.
- **Active Navigation Item:** Surface `#141C18`, text `#FFFFFF`, with a persistent 4px left-hand border accent in `#C9A227`.