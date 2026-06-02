# Evomni Design System

> Foundations, tokens, iconography, and UI kits for **Evomni** storefronts.
> Default palette is intentionally **monochrome (black / gray / white)** — a
> single `--brand` token swaps in each merchant's brand color later.

---

## 1. Product context

**Evomni** is an **e-commerce storefront-builder platform**. Merchants compose
their customer-facing online store (the **前台 / storefront**) from a shared,
templated component library. This design system governs that storefront layer:
the home/campaign pages, product listing & detail, cart, and checkout that
shoppers see.

The reference store in the source is **"Evomni Cosmetics"** — a cosmetics /
beauty retailer — used here as the canonical sample storefront. Because the
platform serves many merchants, the system is **token-first**: structure,
type, spacing, and the square-cornered aesthetic stay constant, while color is
driven by a small set of `--brand*` variables that each store overrides.

### Design intent (read straight from source)
The source `index.html` encodes a deliberate, opinionated baseline:
- **Charcoal-on-white**, near-monochrome palette (`#303133` primary text).
- **Zero border-radius everywhere** except true pills — a sharp, editorial,
  modern-beauty look (think gallery / fashion lookbook, not playful SaaS).
- **Inter + Noto Sans TC** for bilingual (English / Traditional Chinese) type.
- **Material Icons (Outlined)** for iconography.
- **Minimal, low-opacity shadows** — `soft` and `hover` only.

### Sources given
- **Codebase:** `evomni_frontend/` (mounted, read-only). At time of authoring,
  only `evomni_frontend/index.html` was present — it contains the Tailwind
  theme config (colors, fonts, radius rule, shadows) that this system is built
  from. The referenced `/index.tsx`, `/index.css`, and React component files
  were **not** mounted, so UI-kit screens follow the documented system rather
  than copying exact component source.
- App stack (from source): React 19 + react-router 7, Tailwind (CDN), Google
  Fonts, Material Icons Outlined. Language: `zh-Hant` (Traditional Chinese).

> ⚠️ **To make the UI kits pixel-exact**, re-attach the full storefront source
> (`index.tsx`, `index.css`, and the components folder) via the Import menu.

---

## 2. Content fundamentals

How Evomni storefront copy reads. The reference store is **bilingual**, leading
with **Traditional Chinese (繁體中文)** and pairing short English eyebrows/labels.

- **Voice:** calm, confident, editorial — a premium beauty boutique, not a
  discount marketplace. Lets product and imagery speak; copy stays out of the way.
- **Person:** speaks *to* the shopper (您 / "you"), describes products in the
  third person. Warm but not chatty.
- **Casing:** English UI labels and eyebrows are **UPPERCASE with wide letter-
  spacing** (`SHOP ALL`, `NEW IN`, `BEST SELLERS`). Chinese headings use normal
  weight; emphasis comes from size and spacing, not exclamation.
- **Punctuation:** minimal. No exclamation spam. Prices are clean (`NT$ 1,280`).
- **Bilingual pattern:** a small English eyebrow above a Chinese headline, e.g.
  `NEW ARRIVALS` ⟶ 「春季新品上市」. English = label/system; Chinese = the message.
- **Emoji:** none. The brand voice is restrained and gallery-like.
- **Tone examples:**
  - Hero: `SPRING 2026` / 「煥膚新章 · 春季限定系列」
  - CTA: `加入購物車` · `立即選購` · `SHOP NOW`
  - Section label: `BEST SELLERS` / 「人氣精選」
  - Stock/meta: 「剩餘 3 件」「預計 3–5 個工作天送達」
  - Empty state: 「您的購物車是空的」 / `Your bag is empty`

Default to this restraint. Buttons are verbs (`加入購物車`, `結帳`), labels are
nouns, never use hype words ("amazing", "huge sale!!!").

---

## 3. Visual foundations

The look: **clean editorial monochrome, square corners, generous whitespace,
photography-forward.** Restraint is the brand.

### Color
- **Monochrome by default.** Charcoal `#303133` → grays → white. Color enters
  only through (a) product photography and (b) a merchant's optional `--brand`.
- Neutral scale is **Element-Plus-derived** (`#303133 / #606266 / #909399 /
  #c0c4cc` text; `#dcdfe6 / #e4e7ed / #ebeef5` borders; `#f9fafb / #f5f7fa`
  fills) — well-tested for AA contrast.
- **Primary action = `--brand`**, default charcoal `#303133`. Hover darkens,
  press darkens further. To rebrand a store, override `--brand`, `--brand-hover`,
  `--brand-active`, `--brand-soft` only.
- **Functional colors** (`success / warning / danger / info`) are for **state
  only** — stock, validation, shipping, sale price. Never decorative.

### Type
- **Inter** (Latin) + **Noto Sans TC** (CJK), one family pairing for everything;
  hierarchy comes from **size + weight + spacing**, not extra typefaces.
- Weights 300–700. Headings 600–700 with tight tracking; body 400.
- **Wide-tracked uppercase eyebrows/labels** are the signature type motif.
- Prices use **tabular numerals**.

### Spacing & layout
- **4px base** spacing scale; sections breathe (64–96px vertical rhythm).
- Centered container, max `1280px` (wide campaigns `1440px`), `24px` gutters.
- Grid-led: product grids of 3–4, full-bleed campaign imagery, asymmetric
  editorial splits. Generous negative space is intentional, not empty.

### Corners, borders, elevation
- **Radius = 0 everywhere.** The *only* round things are pills/chips, avatars,
  and toggles (`--radius-pill`). This is the single strongest visual signature —
  never round a card or button.
- **Borders** are hairline `1px` in `--line-400` for inputs/dividers; light
  borders separate cards instead of heavy shadows.
- **Shadows** are rare, soft, and **uncolored**: `--shadow-soft` at rest for
  raised cards, `--shadow-hover` on hover, `--shadow-overlay` for modals/menus.
  Default product cards lean on **borders + hover lift**, not resting shadow.

### Imagery
- **Photography-forward and full-bleed.** Clean studio beauty shots, neutral /
  warm-neutral backgrounds, soft natural light. Square crops to match the
  zero-radius geometry. Images carry the color; UI stays monochrome.

### Motion
- Calm and quick. **Fades and short slides**, `150–400ms`, standard ease
  (`cubic-bezier(0.4,0,0.2,1)`). **No bounce, no spring, no parallax gimmicks.**
- Image hover: gentle zoom or crossfade to a second shot. Card hover: subtle
  lift via shadow + 1px translate.

### Interaction states
- **Hover:** primary buttons darken (`--brand-hover`); ghost/secondary fill with
  `--fill-200`; links underline; cards lift with `--shadow-hover`.
- **Press:** darken further (`--brand-active`); no scale-down on buttons (square,
  grounded feel), subtle `1px` nudge at most.
- **Focus:** visible `2px` outline in `--fg` (or `--brand`) offset by 2px — never
  removed (accessibility).
- **Disabled:** `--fg-disabled` text, `--fill-400` fill, no shadow, `not-allowed`.
- **Selected:** charcoal fill / charcoal 1px ring (swatches, filters, tabs).

### Transparency & blur
- Sparing. Sticky header may use a `backdrop-blur` + 90% white veil when
  overlaying imagery. Modal scrims are `rgba(0,0,0,0.45)`. No frosted-glass
  everywhere — it's an accent, not a theme.

---

## 4. Index — what's in this system

| File / folder | What it is |
|---|---|
| `README.md` | This document — context, content & visual foundations, index |
| `colors_and_type.css` | All design tokens (color, type, spacing, radius, shadow, motion) + semantic type classes |
| `SKILL.md` | Agent-Skill manifest for using this system in Claude Code |
| `preview/` | Small HTML cards that populate the Design System tab |
| `assets/` | Logos and brand marks |
| `ui_kits/storefront/` | The Evomni Cosmetics storefront UI kit (JSX components + interactive `index.html`) |

**Iconography, fonts, and brand assets** are documented in the sections below.

---

## 5. Iconography

- **Primary set: Material Icons — Outlined variant** (from source `index.html`).
  Outlined (not Filled/Rounded/Sharp) matches the thin, square, editorial feel.
  Load: `<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">`
  then `<span class="material-icons-outlined">shopping_bag</span>`.
- **Style:** line icons, ~2px stroke, square terminals. Used at 20–24px in nav,
  product actions, and meta rows. Keep them `--fg` / `--fg-muted`, never colored
  unless conveying a functional state.
- **Common glyphs:** `search`, `shopping_bag`, `favorite_border`, `person_outline`,
  `menu`, `close`, `add`, `remove`, `arrow_forward`, `expand_more`, `local_shipping`,
  `check`, `star` / `star_border`.
- **Emoji:** never. **Unicode symbols:** only neutral typographic ones where apt
  (`×` close, `·` separators, `→`); prefer the icon font for UI affordances.
- **Logo / wordmark:** see `assets/`. The reference store wordmark is the brand
  name set in Inter, letter-spaced, charcoal on white (and white on charcoal).

> The source uses the Material Icons **font** (CDN), so icons are linked from CDN
> rather than copied as SVGs. If you later attach SVG/sprite assets, drop them in
> `assets/icons/` and update this section.

---

## 6. Fonts

Both families are **Google Fonts**, linked from CDN exactly as the source does —
no local font files were shipped in the codebase, so none are vendored here.

- **Inter** — Latin UI + display. Weights 300/400/500/600/700.
- **Noto Sans TC** — Traditional Chinese. Weights 300/400/500/700.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet">
```

> If you need offline/vendored fonts, download these two families from Google
> Fonts into `fonts/` and add `@font-face` rules — they are exact, not substitutes.
