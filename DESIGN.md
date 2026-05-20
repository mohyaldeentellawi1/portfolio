# Design Reference — Pixel-Perfect Guide

> **Rule #1:** Never hardcode pixel values as arbitrary Tailwind classes (e.g. `h-[72px]`) when a canonical class exists (`h-18`). Always use the canonical class. Check Tailwind docs before reaching for brackets.
> **Rule #2:** Never hardcode colors. Always use CSS variable tokens via Tailwind (`text-foreground`, `bg-primary`, etc.).
> **Rule #3:** Every interactive element must have a `transition-*` class and a visible focus state (`focus-visible:ring-2 focus-visible:ring-ring`).
> **Rule #4:** Border radius is **4px** (`rounded`) for all buttons and interactive elements. Containers use `rounded-lg` maximum. Never use `rounded-xl`, `rounded-2xl`, `rounded-3xl`, or `rounded-4xl` anywhere in the codebase. Circles (avatars, icon buttons) use `rounded-full`.

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

## Color System

All colors use `oklch` and are mapped to CSS variables. Use Tailwind token classes only.

### Light Mode
| Token | Raw Value | Tailwind class | Usage |
|---|---|---|---|
| `--background` | `oklch(1 0 0)` | `bg-background` | Page background |
| `--foreground` | `oklch(0.145 0 0)` | `text-foreground` | Primary text |
| `--primary` | `oklch(0.5 0.134 242.749)` | `bg-primary` | Buttons, CTA, highlights (blue) |
| `--primary-foreground` | `oklch(0.977 0.013 236.62)` | `text-primary-foreground` | Text on primary bg |
| `--secondary` | `oklch(0.967 0.001 286.375)` | `bg-secondary` | Secondary fills |
| `--secondary-foreground` | `oklch(0.21 0.006 285.885)` | `text-secondary-foreground` | Text on secondary |
| `--muted` | `oklch(0.97 0 0)` | `bg-muted` | Subtle fills, hover states |
| `--muted-foreground` | `oklch(0.556 0 0)` | `text-muted-foreground` | Secondary/dimmed text |
| `--border` | `oklch(0.922 0 0)` | `border-border` | Dividers, card borders |
| `--input` | `oklch(0.922 0 0)` | `border-input` | Input field borders |
| `--ring` | `oklch(0.708 0 0)` | `ring-ring` | Focus rings |
| `--card` | `oklch(1 0 0)` | `bg-card` | Card backgrounds |
| `--card-foreground` | `oklch(0.145 0 0)` | `text-card-foreground` | Text inside cards |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `bg-destructive` | Errors, delete actions |

### Dark Mode (`.dark`)
| Token | Raw Value |
|---|---|
| `--background` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.985 0 0)` |
| `--primary` | `oklch(0.443 0.11 240.79)` |
| `--muted` | `oklch(0.269 0 0)` |
| `--muted-foreground` | `oklch(0.708 0 0)` |
| `--border` | `oklch(1 0 0 / 10%)` |
| `--card` | `oklch(0.205 0 0)` |

### Opacity modifiers
Use Tailwind's slash syntax for semi-transparent variants:
- `bg-background/75` → 75% opaque background (nav blur backdrop)
- `bg-primary/85` → hover state for primary button
- `border-border/60` → subtle divider
- `border-border/40` → very subtle divider (mobile menu items)

### Blue Chart Palette
```
chart-1: oklch(0.828 0.111 230.318)   ← lightest blue
chart-2: oklch(0.685 0.169 237.323)
chart-3: oklch(0.588 0.158 241.966)
chart-4: oklch(0.5  0.134 242.749)    ← same as --primary
chart-5: oklch(0.443 0.11  240.79)   ← darkest blue
```

---

## Typography

| Variable | Font | Usage |
|---|---|---|
| `--font-sans` | Inter | Body, UI, headings — default everywhere |
| `--font-mono` | Geist Mono | Code blocks only |

`html` already has `font-sans` applied globally. Never override it on body/containers.

### Type Scale (Tailwind defaults, 1rem = 16px)

| Class | Size | Line Height | Use for |
|---|---|---|---|
| `text-xs` | 12px | 16px | Labels, captions, badges |
| `text-sm` | 14px | 20px | Nav links, body small, button text |
| `text-base` | 16px | 24px | Body copy |
| `text-lg` | 18px | 28px | Sub-headings, lead text |
| `text-xl` | 20px | 28px | Brand name, section intros |
| `text-2xl` | 24px | 32px | Card titles |
| `text-3xl` | 30px | 36px | Section headings |
| `text-4xl` | 36px | 40px | Page headings |
| `text-5xl` | 48px | 48px | Hero headings |
| `text-6xl` | 60px | 60px | Display / XL hero |

### Font Weight
| Class | Weight | Use for |
|---|---|---|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Button labels, nav links, UI labels |
| `font-semibold` | 600 | Card titles, sub-headings |
| `font-bold` | 700 | Brand name, page headings |

### Tracking (letter-spacing)
| Class | Value | Use for |
|---|---|---|
| `tracking-tight` | -0.025em | Brand name, large headings |
| `tracking-normal` | 0 | Body, UI |
| `tracking-wide` | 0.025em | Uppercase labels, badges |

---

## Border Radius

**Standard: 4px everywhere.** The global `--radius` CSS variable exists but is intentionally kept small. Do not escalate to `xl` or above — that creates an overly soft, bubbly look that breaks the design language.

| Use case | Class | px | When to use |
|---|---|---|---|
| Buttons, inputs, badges, tags | `rounded` | 4px | All interactive elements |
| Small dropdowns, tooltips, chips | `rounded-md` | ~8px | Only when `rounded` feels too sharp |
| Cards, panels, large containers | `rounded-lg` | 10px | Section containers, video frame, image frame |
| Circular elements | `rounded-full` | 9999px | Avatars, icon-only buttons, play buttons |
| **NEVER use** | `rounded-xl` `rounded-2xl` `rounded-3xl` `rounded-4xl` | — | Banned — breaks design consistency |

---

## Spacing & Sizing (1 unit = 4px)

| Tailwind | px | Common use |
|---|---|---|
| `1` | 4px | Icon gap, fine spacing |
| `2` | 8px | Tight padding, icon margin |
| `3` | 12px | Small component padding |
| `4` | 16px | Button padding-x base |
| `5` | 20px | Nav vertical padding |
| `6` | 24px | Card padding, section gap |
| `8` | 32px | Between sections elements |
| `9` | 36px | Button/input height |
| `10` | 40px | Button/input height large, Mobile CTA height |
| `18` | 72px | Nav bar height |
| `20` | 80px | Section vertical padding |
| `24` | 96px | Large section gap |

**Max content width:** `max-w-7xl` (1280px) — always center with `mx-auto`.

---

## Z-Index Scale

| Layer | Value | Class | Use for |
|---|---|---|---|
| Base | 0 | — | Default stacking |
| Raised | 10 | `z-10` | Cards on hover |
| Overlay | 20 | `z-20` | Dropdowns, tooltips |
| Modal | 40 | `z-40` | Dialogs, drawers |
| Navigation | 50 | `z-50` | Fixed nav — always on top |

---

## Transitions & Animation

**Default transition:** `transition-colors duration-200`

| Effect | Classes | Use for |
|---|---|---|
| Color change | `transition-colors duration-200` | Link/button hover text color |
| All properties | `transition-all duration-300` | Nav scroll state, drawer open/close |
| Opacity | `transition-opacity duration-200` | Fades |
| Transform | `transition-transform duration-200` | Scale effects, underline slides |
| Easing | `ease-in-out` | Drawers, panels (pair with `duration-300`) |

**Micro-interactions (press feedback):**
- Buttons: `active:scale-[0.97]` (desktop CTA), `active:scale-[0.98]` (full-width mobile)

**Underline hover (nav links):**
```
after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px
after:scale-x-0 after:bg-primary
after:transition-transform after:duration-200
hover:after:scale-x-100
```
Requires `relative` on the anchor.

---

## Shadows

| Class | Use for |
|---|---|
| `shadow-sm` | Cards, subtle elevation |
| `shadow-md` | Dropdowns, popovers |
| `shadow-lg` | Modals, floating panels |
| `shadow-none` | Reset |

---

## Focus States (Accessibility — never skip)

Every interactive element must have a visible focus ring:
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
| Height | `h-18` (72px) |
| Max width inner | `max-w-7xl mx-auto` |
| Horizontal padding | `px-6 sm:px-8 lg:px-10` |
| Background (default) | transparent (no class) |
| Background (scrolled) | `backdrop-blur-md bg-background/75 border-b border-border/60 shadow-sm` |
| Scroll threshold | 24px (`window.scrollY > 24`) |
| Transition | `transition-all duration-300` |
| Brand text | `text-xl font-bold tracking-tight text-foreground` |
| Nav links | `text-sm font-medium text-muted-foreground hover:text-foreground` + underline slide effect |
| Link gap | `gap-8` |
| Desktop CTA | `h-9 rounded bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/85 active:scale-[0.97]` |
| Mobile breakpoint | Links/CTA hidden below `md` (768px) |
| Hamburger size | `h-9 w-9`, SVG `18×18`, stroke `1.6`, `rounded` |
| Mobile drawer bg | Inherits header backdrop |
| Mobile link padding | `py-3`, `border-b border-border/40 last:border-0` |
| Mobile CTA | `h-10 w-full rounded`, full-width |
| Body scroll lock | Lock `overflow: hidden` on body when drawer open |

### Buttons

| Variant | Classes |
|---|---|
| Primary | `h-9 rounded bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/85 active:scale-[0.97] transition-colors duration-200` |
| Primary Full-width | `h-10 w-full rounded bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/85 active:scale-[0.98] transition-colors duration-200` |
| Ghost | `h-9 rounded px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200` |
| Outline | `h-9 rounded border border-border px-4 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200` |
| Icon | `h-9 w-9 rounded flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-200` |

All buttons: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`

### About Section

| Property | Value |
|---|---|
| Section height | `min-h-screen flex items-center` |
| Section padding | `py-24 px-6 sm:px-8 lg:px-10` |
| Background orbs | 3× `absolute rounded-full bg-primary/10 blur-3xl`, `pointer-events-none`, `aria-hidden` |
| Orb sizes | top-left `h-125 w-125`, bottom-right `h-96 w-96`, center `h-72 w-72 bg-primary/5` |
| Content wrapper | `relative z-10 mx-auto w-full max-w-7xl` |
| **Container** | `bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm` |
| Top grid | `grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center` |
| Image frame | `relative h-64 w-64` → `md:h-80 md:w-80` → `lg:h-96 lg:w-full lg:max-w-sm`, `rounded-full overflow-hidden border border-border/40 shadow-md` (circle portrait) |
| Image | `next/image` with `fill` + `object-cover` + `priority` |
| Section label | `text-xs font-semibold uppercase tracking-wide text-primary` |
| Section heading | `text-3xl lg:text-4xl font-bold tracking-tight text-foreground` |
| Body text | `text-base text-muted-foreground leading-relaxed` |
| Stats row | `grid grid-cols-3 gap-4 pt-2 border-t border-border/40` |
| Stat value | `text-2xl font-bold tracking-tight text-foreground` |
| Stat label | `text-xs text-muted-foreground` |
| Divider | `my-10 border-t border-border/40` |
| **Video placeholder** | `group relative w-full max-w-2xl mx-auto aspect-video overflow-hidden rounded-lg border border-border bg-muted cursor-pointer` |
| Video play button | `h-16 w-16 rounded-full bg-primary/10 border border-primary/20 group-hover:bg-primary/20` (circle — `rounded-full` is correct here) |
| Video play icon | Lucide `<Play />`, `text-primary`, `ml-1` for optical center |
| Video hover | `group` on container, `group-hover:scale-105 transition-transform duration-300` on inner |

### Cards

| Property | Value |
|---|---|
| Background | `bg-card text-card-foreground` |
| Border | `border border-border` |
| Radius | `rounded-lg` (max allowed for containers) |
| Padding | `p-6` |
| Shadow | `shadow-sm` |
| Hover elevation | `hover:shadow-md transition-shadow duration-200` |

### Section Layout

```
<section id="about" className="py-20 px-6 sm:px-8 lg:px-10">
  <div className="mx-auto max-w-7xl">
    ...
  </div>
</section>
```

| Property | Value |
|---|---|
| Vertical padding | `py-20` (80px) |
| Horizontal padding | `px-6 sm:px-8 lg:px-10` |
| Content max-width | `max-w-7xl mx-auto` |
| Section heading | `text-3xl font-bold tracking-tight text-foreground` |
| Section sub-text | `text-base text-muted-foreground` |

### Forms & Inputs

| Property | Value |
|---|---|
| Height | `h-9` (small) / `h-10` (default) |
| Border | `border border-input` |
| Radius | `rounded` (4px) |
| Padding | `px-3` |
| Text | `text-sm text-foreground placeholder:text-muted-foreground` |
| Focus | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring` |
| Background | `bg-background` |

---

## Grid Systems

| Columns | Classes |
|---|---|
| 1 col (mobile default) | `grid grid-cols-1` |
| 2 col from md | `grid grid-cols-1 md:grid-cols-2` |
| 3 col from lg | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| Auto-fill cards | `grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))]` |

**Gap:** `gap-6` between cards, `gap-8` between sections.

---

## Sections (Anchor IDs)

| Section | ID | Nav label |
|---|---|---|
| Hero / Top | `#` | — |
| About Me | `#about` | About Me |
| Projects | `#project` | Project |
| Reviews | `#reviews` | Reviews |
| Contact | `#contact` | Contact |

---

## Responsive Patterns Cheat-Sheet

| Need | Pattern |
|---|---|
| Hide on mobile, show desktop | `hidden md:flex` / `hidden md:block` |
| Show on mobile, hide desktop | `flex md:hidden` / `block md:hidden` |
| Full-width mobile, auto desktop | `w-full md:w-auto` |
| Stack on mobile, row on desktop | `flex flex-col md:flex-row` |
| Larger padding on desktop | `px-6 sm:px-8 lg:px-10` |
| Larger text on desktop | `text-3xl lg:text-5xl` |
