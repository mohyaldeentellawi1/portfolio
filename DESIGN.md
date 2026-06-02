# Design Reference — Pixel-Perfect Guide

> **Rule #1:** Never hardcode pixel values as arbitrary Tailwind classes (e.g. `h-[72px]`) when a canonical class exists (`h-20`). Always use the canonical class. Check Tailwind docs before reaching for brackets.
> **Rule #2:** Never hardcode colors. Always use CSS variable tokens via Tailwind (`text-foreground`, `bg-primary`, etc.).
> **Rule #3:** Every interactive element must have a `transition-*` class and a visible focus state (`focus-visible:ring-2 focus-visible:ring-ring`).
> **Rule #4:** Buttons use `rounded-none` (the Button component base). Cards and containers use `rounded-lg` maximum. Circles (avatars, icon buttons, play buttons) use `rounded-full`. Review cards use inline `borderRadius: "8px"`.

---

## Breakpoints

| Name | Min-width | Prefix |
|------|-----------|--------|
| Mobile | < 640px | _(default, no prefix)_ |
| sm | 640px | `sm:` |
| md | 768px | `md:` |
| lg | 1024px | `lg:` |
| xl | 1280px | `xl:` |
| 2xl | 1536px | `2xl:` |

**Mobile-first always.** Write base styles for mobile, then layer `md:` / `lg:` overrides.

---

## Fonts & i18n

| Variable | Font | Usage |
|---|---|---|
| `--font-inter` | Inter | Default for `ltr` (English) — applied to `html` globally |
| `--font-cairo` | Cairo | Applied to `html:lang(ar)` for Arabic (RTL) |

```css
html { @apply font-inter; }
html:lang(ar) { @apply font-cairo; }
```

The layout sets `dir="rtl"` on `<html>` when locale is `ar`. Components must not hard-code directional classes that break in RTL. Use `dir="ltr"` only for content that must always be LTR (phone numbers, emails, code).

---

## Color System

All colors use `oklch` and are mapped to CSS variables. Use Tailwind token classes only.

### Light Mode
All neutrals share hue **286** (violet-blue) and proportionally scaled chroma derived from the base background `#f9f9ff`.

| Token | Raw Value | Tailwind class | Usage |
|---|---|---|---|
| `--background` | `oklch(0.984 0.007 286)` | `bg-background` | Page background (`#f9f9ff`) |
| `--foreground` | `oklch(0.145 0.007 286)` | `text-foreground` | Primary text |
| `--primary` | `oklch(0.5 0.134 242.749)` | `bg-primary` | Buttons, CTA, highlights (blue) |
| `--primary-foreground` | `oklch(0.977 0.013 236.62)` | `text-primary-foreground` | Text on primary bg |
| `--secondary` | `oklch(0.955 0.010 286)` | `bg-secondary` | Secondary fills |
| `--secondary-foreground` | `oklch(0.210 0.007 286)` | `text-secondary-foreground` | Text on secondary |
| `--muted` | `oklch(0.958 0.008 286)` | `bg-muted` | Subtle fills, hover states |
| `--muted-foreground` | `oklch(0.556 0.006 286)` | `text-muted-foreground` | Secondary/dimmed text |
| `--accent` | `oklch(0.958 0.008 286)` | `bg-accent` | Same as muted in light mode |
| `--accent-foreground` | `oklch(0.205 0.007 286)` | `text-accent-foreground` | Text on accent |
| `--border` | `oklch(0.912 0.008 286)` | `border-border` | Dividers, card borders |
| `--input` | `oklch(0.912 0.008 286)` | `border-input` | Input field borders |
| `--ring` | `oklch(0.700 0.008 286)` | `ring-ring` | Focus rings |
| `--card` | `oklch(0.984 0.007 286)` | `bg-card` | Card backgrounds |
| `--card-foreground` | `oklch(0.145 0.007 286)` | `text-card-foreground` | Text inside cards |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `bg-destructive` | Errors, delete actions |

### Dark Mode (`.dark`)
Dark mode uses a **dark blue-tinted** background (not neutral grey) to give depth.

| Token | Raw Value |
|---|---|
| `--background` | `oklch(0.155 0.015 242)` |
| `--foreground` | `oklch(0.985 0 0)` |
| `--card` | `oklch(0.21 0.012 242)` |
| `--card-foreground` | `oklch(0.985 0 0)` |
| `--popover` | `oklch(0.21 0.012 242)` |
| `--primary` | `oklch(0.443 0.11 240.79)` |
| `--primary-foreground` | `oklch(0.977 0.013 236.62)` |
| `--secondary` | `oklch(0.274 0.006 286.033)` |
| `--secondary-foreground` | `oklch(0.985 0 0)` |
| `--muted` | `oklch(0.269 0 0)` |
| `--muted-foreground` | `oklch(0.708 0 0)` |
| `--accent` | `oklch(0.269 0 0)` |
| `--accent-foreground` | `oklch(0.985 0 0)` |
| `--destructive` | `oklch(0.704 0.191 22.216)` |
| `--border` | `oklch(1 0 0 / 10%)` |
| `--input` | `oklch(1 0 0 / 15%)` |
| `--ring` | `oklch(0.556 0 0)` |

### Opacity modifiers
Use Tailwind's slash syntax for semi-transparent variants:
- `bg-background/75` → 75% opaque background (nav blur backdrop)
- `bg-primary/85` → hover state for primary button
- `bg-primary/10` → icon bubble background, video play button
- `border-border/60` → subtle divider
- `border-border/40` → very subtle divider (mobile menu items, stats row)

### Blue Chart Palette
```
chart-1: oklch(0.828 0.111 230.318)   ← lightest blue
chart-2: oklch(0.685 0.169 237.323)
chart-3: oklch(0.588 0.158 241.966)
chart-4: oklch(0.5  0.134 242.749)    ← same as --primary
chart-5: oklch(0.443 0.11  240.79)   ← darkest blue / dark mode primary
```

---

## Typography

### Type Scale (Tailwind defaults, 1rem = 16px)

| Class | Size | Line Height | Use for |
|---|---|---|---|
| `text-[10px]` | 10px | — | Skill chip labels |
| `text-[11px]` | 11px | — | Project tech tag labels |
| `text-xs` | 12px | 16px | Section labels (uppercase), captions, copyright |
| `text-sm` | 14px | 20px | Nav links, body small, button text, form inputs |
| `text-base` | 16px | 24px | Body copy, contact info |
| `text-lg` | 18px | 28px | Sub-headings (skills strip) |
| `text-xl` | 20px | 28px | Contact form sub-heading |
| `text-2xl` | 24px | 32px | Stat values |
| `text-3xl` | 30px | 36px | Section headings |

### Font Weight
| Class | Weight | Use for |
|---|---|---|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Nav links, info links |
| `font-semibold` | 600 | Card titles, sub-headings, footer copy, stat labels |
| `font-bold` | 700 | Brand name, page/section headings |

The Button component uses `font-semibold` with `text-xs uppercase tracking-widest`.

### Tracking (letter-spacing)
| Class | Value | Use for |
|---|---|---|
| `tracking-tight` | -0.025em | Brand name, headings |
| `tracking-normal` | 0 | Body, UI |
| `tracking-wide` | 0.025em | Section labels (uppercase) |
| `tracking-widest` | 0.1em | Button labels (via Button component) |

---

## Border Radius

`--radius` is set to `0.625rem` (10px) in CSS. Tailwind maps it as:
- `rounded-sm` → `calc(var(--radius) * 0.6)` ≈ 6px
- `rounded-md` → `calc(var(--radius) * 0.8)` = 8px
- `rounded-lg` → `var(--radius)` = 10px
- `rounded-xl`, `rounded-2xl`, etc. → proportionally larger (available but rarely needed)

| Use case | Class | Notes |
|---|---|---|
| Buttons (via Button component) | `rounded-none` | Base class on Button — square corners by design |
| Small interactive icons, badges, tags | `rounded` | 4px |
| Icon bubbles (contact), skill chips | `rounded-sm` | ~6px |
| Dropdowns, tooltips | `rounded-md` | ~8px |
| Cards, panels, section containers | `rounded-lg` | 10px |
| Review card bodies | inline `borderRadius: "8px"` | Explicit inline to avoid Tailwind rounding |
| Circular elements | `rounded-full` | Avatars, nav icon buttons, play button, dot indicators |

---

## Spacing & Sizing (1 unit = 4px)

| Tailwind | px | Common use |
|---|---|---|
| `1` | 4px | Icon gap, fine spacing |
| `2` | 8px | Tight padding, icon margin |
| `3` | 12px | Small component padding |
| `4` | 16px | Button padding-x (sm size) |
| `5` | 20px | Nav vertical padding |
| `6` | 24px | Card padding, section gap, horizontal padding base |
| `8` | 32px | Section element gap, card padding (md) |
| `9` | 36px | Button height (sm), icon button size |
| `10` | 40px | Button height (default), social link size, icon bubble size, input height |
| `13` | 52px | Subscribe form outer height |
| `14` | 56px | Section bottom padding (`py-14`) |
| `20` | 80px | Nav bar height (`h-20`) |
| `25` | 100px | Section top padding (`pt-25`) |

**Max content width:** `max-w-7xl` (1280px) — always center with `mx-auto`.

---

## Z-Index Scale

| Layer | Value | Class | Use for |
|---|---|---|---|
| Base | 0 | — | Default stacking |
| Raised | 10 | `z-10` | Center review card |
| Overlay | 20 | `z-20` | Dropdowns, tooltips |
| Modal | 40 | `z-40` | Dialogs, drawers |
| Navigation | 50 | `z-50` | Fixed nav — always on top |

---

## Transitions & Animation

**Default transition:** `transition-colors duration-200`

| Effect | Classes | Use for |
|---|---|---|
| Color change | `transition-colors duration-200` | Link/button hover text color, icon buttons |
| All properties | `transition-all duration-300` | Nav scroll state, mobile drawer, review cards |
| Opacity | `transition-opacity duration-200` | Projects grid page change fade |
| Transform | `transition-transform duration-500` | Project image scale on hover |
| Smooth ease | `ease-in-out` | Mobile drawer (pair with `duration-300`) |

**Micro-interactions:**
- Nav brand: `hover:opacity-80`
- Skill chips: `hover:scale-105`
- Project card image: `group-hover:scale-105 transition-transform duration-500`
- Video placeholder inner: `group-hover:scale-105 transition-transform duration-300`

**Active indicator (nav links):**
The active/inactive state uses opacity (not scale transform):
```
after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:bg-primary
isActive  → after:opacity-100
inactive  → after:opacity-0
```
Requires `relative` on the `<button>` or `<a>`.

**Loading spinner:**
```
h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin
```

---

## Shadows

| Class | Use for |
|---|---|
| `shadow-sm` | Cards, section containers |
| `shadow-md` | Portrait image, hover elevation on project cards |
| `shadow-none` | Reset |

---

## Focus States (Accessibility — never skip)

The Button component uses a ring variant:
```
focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30
```

All other interactive elements (icon buttons, inputs, links):
```
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
```

Use `focus-visible:` (not `focus:`) so keyboard users see the ring but mouse clicks don't.

---

## Component Patterns

### Navigation

| Property | Value |
|---|---|
| Position | `fixed inset-x-0 top-0 z-50` |
| Height | `h-20` (80px) |
| Max width inner | `max-w-7xl mx-auto` |
| Horizontal padding | `px-6 sm:px-8 lg:px-10` |
| Background (default) | transparent (no class) |
| Background (scrolled or drawer open) | `backdrop-blur-md bg-background/75 border-b border-border/60 shadow-sm` |
| Scroll threshold | 24px (`window.scrollY > 24`) |
| Transition | `transition-all duration-300` |
| Brand text | `text-xl font-bold tracking-tight text-foreground transition-opacity duration-200 hover:opacity-80` |
| Nav links | `text-sm font-medium` + opacity-based active underline (see Transitions) |
| Link gap | `gap-8` |
| Desktop CTA | Button component `size="default"` with `bg-primary text-primary-foreground hover:bg-primary/80` |
| Mobile breakpoint | Links/CTA hidden below `md` (768px) |
| Theme toggle | `h-9 w-9 rounded border border-border text-foreground hover:bg-muted` + focus ring |
| Locale toggle | Same as theme toggle, displays `AR`/`EN` label, `text-xs font-semibold` |
| Hamburger | `h-9 w-9 rounded-md`, `Menu`/`X` icon at `size={18}`, hidden above `md` |
| Mobile drawer animation | `max-h-0 opacity-0` → `max-h-screen opacity-100`, `transition-all duration-300 ease-in-out` |
| Mobile drawer padding | `px-6 sm:px-8 pb-6 pt-4` |
| Mobile link | `py-3 text-sm font-medium border-b border-border/40 last:border-0` |
| Mobile CTA | Button component `w-full mt-4` |
| Body scroll lock | `document.body.style.overflow = menuOpen ? "hidden" : ""` |

### Button Component

The `<Button>` from `components/ui/button.tsx` uses **base-ui** and **cva**:

**Base classes** (all variants):
```
inline-flex shrink-0 items-center justify-center rounded-none border border-transparent
bg-clip-padding text-xs font-semibold tracking-widest whitespace-nowrap uppercase
transition-all outline-none select-none
focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30
active:not-aria-[haspopup]:translate-y-px
disabled:pointer-events-none disabled:opacity-50
```

| Variant | Additional classes |
|---|---|
| `default` | `bg-primary text-primary-foreground hover:bg-primary/80` |
| `outline` | `border-border bg-transparent hover:bg-muted hover:text-foreground` |
| `secondary` | `bg-secondary text-secondary-foreground hover:bg-[color-mix(...)]` |
| `ghost` | `hover:bg-muted hover:text-foreground` |
| `destructive` | `bg-destructive/10 text-destructive hover:bg-destructive/20` |
| `link` | `text-primary underline underline-offset-4` |

| Size | Classes |
|---|---|
| `default` | `h-10 gap-1.5 px-6` |
| `sm` | `h-9 gap-1 px-4` |
| `lg` | `h-11 gap-1.5 px-8` |
| `xs` | `h-7 gap-1 px-3` |
| `icon` | `size-10` |
| `icon-sm` | `size-9` |

### Input Component

The `<Input>` from `components/ui/input.tsx` uses **base-ui** and renders a bottom-border-only style:

```
h-10 w-full min-w-0 border border-transparent border-b-input bg-transparent
px-0 py-1 text-sm text-foreground placeholder:text-muted-foreground
transition-[color,border-color] outline-none
focus-visible:border-b-ring
disabled:pointer-events-none disabled:opacity-50
```

This is used by default across the app (e.g. dialogs, dashboard).

### Custom Form Inputs (Contact form)

The Send Message form uses a custom input class (not the `<Input>` component) to get a full-border look:

```
w-full h-10 rounded border border-input bg-background px-3 text-sm text-foreground
placeholder:text-muted-foreground transition-colors duration-200
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
```

Textarea variant adds `resize-none py-2.5` and `rows={6}`.

### Subscribe Form (Footer)

The subscribe form uses a composite input-with-embedded-button pattern:

```
/* Outer wrapper — visual input container */
flex h-13 w-full items-center rounded border border-input bg-background pr-1.5
transition-colors duration-200 focus-within:ring-2 focus-within:ring-ring

/* Inner text input */
h-full flex-1 bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none

/* Embedded Button */
<Button size="sm" className="shrink-0 h-9 mx-1.5" />
```

### Section Layout

All main sections follow this structure:

```
<section id="..." className="flex items-center pt-25 py-14 px-6 sm:px-8 lg:px-10">
  <div className="mx-auto w-full max-w-7xl">
    <div className="bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm">
      ...
    </div>
  </div>
</section>
```

| Property | Value |
|---|---|
| Top padding | `pt-25` (100px — clears fixed nav) |
| Bottom padding | `py-14` (56px) |
| Horizontal padding | `px-6 sm:px-8 lg:px-10` |
| Content max-width | `max-w-7xl mx-auto` |
| Container | `bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm` |

### About Section

| Property | Value |
|---|---|
| Top grid | `grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center` |
| Image column | `flex flex-col items-center gap-6` |
| Portrait | `relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72 rounded-full overflow-hidden border border-border/40 shadow-md` |
| Portrait image | `next/image` with `fill` + `object-cover` + `priority` |
| Social links row | `flex items-center gap-3` |
| Social link | `flex h-10 w-10 items-center justify-center rounded border border-border bg-background transition-colors duration-200 hover:bg-muted hover:border-border/80` + focus ring |
| Bio column | `flex flex-col gap-6` |
| Section heading | `text-3xl font-bold tracking-tight text-foreground leading-snug` |
| Body text | `text-base text-muted-foreground leading-relaxed` |
| Stats row | `grid grid-cols-3 gap-4 pt-2 border-t border-border/40` |
| Stat value | `text-2xl font-bold tracking-tight text-foreground` |
| Stat label | `text-xs text-muted-foreground` |
| Divider | `my-10 border-t border-border/40` |
| Section label (intro) | `text-xs font-semibold uppercase tracking-wide text-primary` |
| Video placeholder | `group relative w-full mx-auto aspect-video overflow-hidden rounded-lg border border-border bg-muted cursor-pointer` |
| Video inner (animated) | `absolute inset-0 flex flex-col items-center justify-center gap-4 transition-transform duration-300 group-hover:scale-105` |
| Play button circle | `flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/20 transition-colors duration-200 group-hover:bg-primary/20` |
| Play icon | Lucide `<Play />` with `text-primary` |

### Projects Section

**Skills strip** (above the divider):
```
/* Strip container */
overflow-x-auto scrollbar-none   (always dir="ltr")

/* Skill chip */
bg-muted dark:bg-background rounded-sm flex flex-col items-center gap-2
h-20 w-20 shrink-0 justify-center transition-colors duration-200 hover:scale-105

/* Icon: 36×36 */
/* Label */
text-[10px] font-medium text-muted-foreground text-center leading-none whitespace-nowrap
```

**Section heading:**
```
text-3xl font-bold tracking-tight text-foreground max-w-2xl leading-relaxed
```

**Projects grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

### Project Card (`project-item.tsx`)

```
/* Article */
group flex flex-col rounded-lg border border-border bg-background shadow-sm
transition-shadow duration-300 hover:shadow-md overflow-hidden

/* Image frame */
aspect-square w-full relative overflow-hidden

/* Image */
object-contain transition-transform duration-500 group-hover:scale-105

/* Empty placeholder */
aspect-square w-full bg-linear-to-br from-primary/10 via-muted to-muted/60
```

Overlaid elements (positioned absolute inside the image wrapper):

| Element | Classes |
|---|---|
| Tech tags (top-left) | `absolute top-3 left-3 flex flex-wrap gap-1.5` |
| Tag chip | `inline-flex items-center rounded bg-card/90 backdrop-blur-sm border border-border/40 px-2 py-0.5 text-[11px] font-medium text-foreground` |
| Title + type row (bottom) | `absolute bottom-3 left-3 right-3 flex items-center gap-2 justify-between` (always `dir="ltr"`) |
| Title badge | `inline-flex items-center rounded bg-card/90 backdrop-blur-sm border border-border/40 px-2.5 py-1 text-sm font-semibold text-foreground transition-colors duration-200 group-hover:text-primary` |
| Type badge | `inline-flex items-center rounded bg-primary/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground` |

### Reviews Section

**Layout:**

```
/* Outer section follows standard section layout */

/* Top bar (Add Review button) */
flex justify-end mb-6

/* Header row — [prev-btn] | [title + dots] | [next-btn] */
flex items-start justify-between gap-4 mb-16

/* Navigation buttons */
flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border
text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground + focus ring

/* Dot indicators */
rounded-full h-1 w-5
active   → bg-primary
inactive → bg-border hover:bg-muted-foreground
transition-all duration-300

/* Cards container */
flex items-center justify-center gap-8 overflow-hidden
```

**Review card** (`review-item.tsx`):

| Property | Value |
|---|---|
| Outer wrapper | `relative shrink-0 w-80 transition-all duration-500 ease-in-out` |
| Center card | `z-10 scale-100 opacity-100` |
| Side cards | `z-0 scale-90 opacity-50` → `opacity-100` on hover |
| Accent layer (side only) | `absolute inset-0 bg-primary/50 hover:bg-primary`, `borderRadius: "8px"`, rotated `±7.35deg` |
| Card body | `relative flex flex-col justify-center gap-6 border border-border bg-card p-8 h-80`, `borderRadius: "8px"` |
| Quote text (center) | `flex-1 leading-relaxed text-foreground text-base line-clamp-6` |
| Quote text (side) | `text-sm line-clamp-6` |
| Quote marks | `font-serif text-primary` |
| Author name | `text-sm font-semibold text-primary` |

### Contact Section

```
/* Inner grid */
grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20

/* Left column — contact info */
flex flex-col gap-8

/* Heading */
text-3xl font-bold tracking-tight text-foreground leading-relaxed

/* Sub-text */
text-base text-muted-foreground leading-relaxed

/* Info rows container */
flex flex-col gap-5

/* Individual info row */
flex items-center gap-4

/* Icon bubble */
flex h-10 w-10 shrink-0 items-center justify-center rounded bg-primary/10 text-primary

/* Value link */
text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground

/* Right column — form */
flex flex-col gap-6

/* Sub-heading */
text-xl font-bold tracking-tight text-foreground
```

### Footer

```
border-t border-border bg-card px-6 sm:px-8 lg:px-10 py-12

/* Inner */
mx-auto max-w-7xl flex flex-col gap-8

/* Copy + form row */
flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6

/* Copy heading */
text-base font-semibold text-foreground

/* Copy sub-text */
text-sm text-muted-foreground max-w-s leading-relaxed

/* Bottom divider + copyright */
border-t border-border/60 pt-6
text-xs text-muted-foreground text-center   (always dir="ltr")
```

---

## Grid Systems

| Columns | Classes |
|---|---|
| 1 col (mobile default) | `grid grid-cols-1` |
| 2 col from lg | `grid grid-cols-1 lg:grid-cols-2` |
| 3 col from lg | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| Auto responsive | `grid grid-cols-3` (stats row inside card) |

**Gap:** `gap-6` between cards, `gap-8` between section elements.

---

## Sections (Anchor IDs)

| Section | ID | Nav label |
|---|---|---|
| Hero / Top | `#` | — |
| About Me | `#about` | About Me |
| Projects | `#project` | Project |
| Reviews | `#reviews` | Reviews |
| Contact | `#contact` | Contact |
| Tech Blog | `/tech-blog` | Tech Blog (route, not anchor) |

---

## Responsive Patterns Cheat-Sheet

| Need | Pattern |
|---|---|
| Hide on mobile, show desktop | `hidden md:flex` / `hidden md:block` |
| Show on mobile, hide desktop | `flex md:hidden` / `block md:hidden` |
| Full-width mobile, auto desktop | `w-full lg:w-auto` |
| Stack on mobile, row on desktop | `flex flex-col lg:flex-row` |
| Larger padding on desktop | `px-6 sm:px-8 lg:px-10` |
| Larger container padding | `p-8 md:p-10 lg:p-14` |
| Larger text on desktop | `text-3xl lg:text-4xl` |
| Force LTR inside RTL layout | `dir="ltr"` attribute on element |
