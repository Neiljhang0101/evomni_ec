# Evomni Admin UI Kit

## Overview
High-fidelity clickable prototype of the Evomni SaaS admin backend. Built with React + Babel (no build step). Mirrors the Element Plus + Tailwind CSS production stack.

## Screens Included
| Page | Description |
|---|---|
| 儀表板 (Dashboard) | Stats cards + quick actions |
| 產品管理 (Product List) | Search form + data table with status tags, inline edit/delete |
| 文章管理 (Article List) | Article CRUD list |
| 群友管理 (Members) | Member list with status |
| 全域設定 (Global Settings) | Settings form with save state |
| + 8 placeholder pages | Nav-linked stubs |

## Components
| File | Exports |
|---|---|
| `Sidebar.jsx` | `Sidebar` — collapsible 240px left nav |
| `Header.jsx` | `Header` — 48px fixed top bar |
| `StatusTag.jsx` | `StatusTag` — pill-shaped status label |
| `DataTable.jsx` | `DataTable` — table with checkbox, pagination |
| `SearchForm.jsx` | `SearchForm` — filter bar with text/select fields |
| `LocaleTabs.jsx` | `LocaleTabs`, `LocaleField`, `ImageUpload` — multi-locale form wrapper |

## Usage
Open `index.html` directly — no build required.
All components export themselves to `window` and are loaded via `<script type="text/babel" src="...">`.

## Design Tokens Applied
- Zero border radius on all inputs, buttons, cards
- Tags: `border-radius: 9999px` (pill)
- Spacing: 8px grid throughout
- Font: Noto Sans TC (Google Fonts)
- All colors from `colors_and_type.css`
