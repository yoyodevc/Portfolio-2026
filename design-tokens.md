# design-tokens.md

> Design system for a dual-theme (dark + light) minimal portfolio.
> All Tailwind config, component classes, and Motion animations derive from these tokens.
> Never hardcode a color or font size — reference a token name instead.

---

## 🎨 Color Palette

### Base (Neutral)

| Token Name       | Light Mode  | Dark Mode   | Usage                          |
|------------------|-------------|-------------|--------------------------------|
| `--color-bg`     | `#F8F8F6`   | `#0E0E0E`   | Page background                |
| `--color-surface`| `#FFFFFF`   | `#161616`   | Cards, modals, elevated panels |
| `--color-border` | `#E4E4E0`   | `#2A2A2A`   | Dividers, card outlines        |
| `--color-text`   | `#111110`   | `#EDEDE9`   | Primary body text              |
| `--color-muted`  | `#888884`   | `#5A5A56`   | Captions, metadata, labels     |

### Accent

| Token Name          | Value     | Usage                                     |
|---------------------|-----------|-------------------------------------------|
| `--color-accent`    | `#4B6BFB` | CTAs, active states, links, focus rings   |
| `--color-accent-dim`| `#1E2F8A` | Hover darken in dark mode                 |
| `--color-accent-tint`| `#EEF1FF` | Accent background wash in light mode      |

> **Palette rationale:** Near-white `#F8F8F6` feels warm and paper-like, avoiding the sterile harshness of pure white. `#0E0E0E` is dark without being void-black — details stay readable. The single accent `#4B6BFB` (indigo-blue) is confident without being loud. No gradients, no multi-accent noise.

---

## 🔤 Typography

### Typeface Pairings

| Role       | Family                  | Source         | Notes                                      |
|------------|-------------------------|----------------|--------------------------------------------|
| **Display**| `DM Sans`               | Fontsource     | Geometric, slightly quirky. Used for name, hero headline, section titles. Set tight (`tracking-tight`). |
| **Body**   | `Inter`                 | Fontsource     | Neutral workhorse. Used for paragraphs, descriptions, UI labels. |
| **Mono**   | `JetBrains Mono`        | Fontsource     | Tech stack tags, code snippets, version numbers. |

> **Pairing rationale:** DM Sans has subtle personality in its letter shapes without being decorative — it signals craft without shouting. Inter keeps body copy frictionless. JetBrains Mono grounds the "developer" identity without overusing code aesthetic everywhere.

### Type Scale

| Token         | Size     | Weight  | Line Height | Usage                        |
|---------------|----------|---------|-------------|------------------------------|
| `text-hero`   | `4.5rem` | 700     | 1.05        | Your name / hero headline    |
| `text-title`  | `2rem`   | 600     | 1.2         | Section headings             |
| `text-lead`   | `1.125rem`| 400    | 1.7         | Hero subtext, about copy     |
| `text-base`   | `1rem`   | 400     | 1.6         | General body                 |
| `text-small`  | `0.875rem`| 400    | 1.5         | Tags, meta, captions         |
| `text-mono`   | `0.8rem` | 500     | 1.4         | Stack tags, code labels      |

---

## 📐 Spacing Scale

Uses Tailwind's default 4px base. Named steps for semantic use:

| Token      | Value   | Usage                              |
|------------|---------|------------------------------------|
| `space-xs` | `4px`   | Icon gaps, tag padding             |
| `space-sm` | `8px`   | Inline element spacing             |
| `space-md` | `16px`  | Card padding, input padding        |
| `space-lg` | `32px`  | Section inner padding              |
| `space-xl` | `64px`  | Section vertical gap               |
| `space-2xl`| `128px` | Top-of-page hero breathing room    |

---

## 🔲 Layout

- **Max content width:** `768px` (prose) / `1100px` (full layout)
- **Grid:** 12-column, CSS Grid. Projects use a 2-col grid on md+, 1-col on mobile.
- **Border radius:** `rounded-xl` (12px) for cards. `rounded-full` for tags only. Nothing else rounded.
- **Shadows:** Avoid drop shadows in dark mode. In light mode: `shadow-sm` only on cards on hover.

---

## ✨ Signature Element

> **Cursor-tracking accent glow on the hero name.**
>
> A soft radial glow in `--color-accent` follows the cursor position over the hero section, casting a subtle light behind the display text. In dark mode this reads as a lit-from-within effect; in light mode it's a faint ink-wash. Implemented via `mousemove` + CSS `radial-gradient` on a pseudo-element. Respects `prefers-reduced-motion` (static fallback: no glow).
>
> This is the **one expressive moment** — everything else stays still and typographic.

---

## 🌗 Theme Switching

- Default: **system preference** via `prefers-color-scheme`
- Toggle: a single icon button in the nav (sun / moon), stored in `localStorage`
- Implementation: `data-theme="dark"` on `<html>`, CSS custom properties swap via `[data-theme="dark"] { ... }`
- No flash on load: inline script in `<head>` reads `localStorage` before paint

---

## 🚫 Anti-tokens (what NOT to use)

- No `#FF0000` reds for errors — use `#E05B5B` (softer)
- No `font-weight: 800` or above — max is 700
- No `border-radius` above 12px on content blocks
- No more than 2 accent uses per viewport
- No `box-shadow` with spread above `4px`