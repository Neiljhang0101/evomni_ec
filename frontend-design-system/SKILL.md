---
name: evomni-design-storefront
description: Use this skill whenever building, reviewing, or updating UI for the Evomni storefront (前台). Loads the Evomni Frontend Design System — covering the editorial monochrome aesthetic, design tokens, typography, component specs, and the Evomni Cosmetics UI kit. Trigger when: creating a new storefront page/component, auditing a storefront prototype for DS compliance, or any task involving the customer-facing storefront UI/UX.
user-invocable: true
---

# Evomni Frontend Design System Skill

## 1. 立即載入規範

依序讀取以下兩個檔案（唯一的 source of truth）：

```
frontend-design-system/README.md
frontend-design-system/colors_and_type.css
```

README.md 涵蓋：視覺基礎、色彩系統、字型、間距、圓角規則、影子、動態、互動狀態、文案語氣。
colors_and_type.css 涵蓋：全部 CSS 自訂屬性（token）與語意型別類別。

## 2. 技術架構

前台使用以下技術棧（與後台 prototype 完全不同）：

- React 19 + react-router 7
- Tailwind CSS（CDN）
- Google Fonts：Inter + Noto Sans TC
- Material Icons Outlined（CDN）
- 語言：`lang="zh-Hant"`（繁體中文為主，英文眉批/標籤）

## 3. 核心設計規則（必須遵守）

| 規則 | 值 |
|------|----|
| 最小字級 | **14px**；任何 font-size 不得低於 14px（`--t-xs` 已設為 14px）|
| `border-radius` | **全域 `0`**；唯一例外：pills / chips / avatars / toggles 用 `--radius-pill` |
| 色彩策略 | 近無彩色（charcoal / gray / white）；色彩只來自商品攝影或 `--brand` token |
| 主要行動色 | `--brand`（預設 `#303133`）；hover 加深，press 再加深 |
| 功能色 | 僅用於狀態（庫存、驗證、運送、特價），禁止裝飾性使用 |
| 字型配對 | Inter（拉丁）+ Noto Sans TC（中文），僅此兩種 |
| 英文標籤 | **全大寫 + 寬字距**（`SHOP ALL`、`NEW ARRIVALS`），這是最強視覺語言標誌 |
| Emoji | **禁止**；Unicode 中性符號可用（`×`、`·`、`→`） |
| 影子 | 極少使用，僅 `--shadow-soft`（靜止）與 `--shadow-hover`（懸停）；無彩色 |
| 排版容器 | 最大寬 `1280px`（大型活動圖 `1440px`），水平間距 `24px` |

## 4. UI Kit 元件

元件位於：
```
frontend-design-system/ui_kits/storefront/ui.jsx       ← 基礎 UI 元件
frontend-design-system/ui_kits/storefront/sections.jsx ← 頁面區塊元件
```

## 5. 合規檢查清單

新建或修改 storefront prototype 前，確認：
- [ ] `border-radius: 0` 全域套用（pills/avatars 除外）
- [ ] 沒有非 `--brand` 的裝飾性色彩
- [ ] 英文 UI 標籤全大寫加寬字距
- [ ] 無 Emoji
- [ ] 動態效果 150–400ms，standard ease，無 bounce / spring
- [ ] 焦點狀態可見（`2px outline`，符合無障礙）
- [ ] 圖片使用正方形裁切（配合零圓角幾何）

## 6. 如何使用此技能

**建立新 storefront 頁面：**
> 讀完本技能後，根據需求建立頁面，遵循第 3 節規則，從 `ui_kits/storefront/` 引用元件。

**合規審查：**
> 讀完本技能後，審查指定 storefront prototype 是否符合設計規範，列出所有違規並修正。

**與後台設計系統的差異：**
> 後台（admin）使用 `/evomni-design`，前台（storefront）使用 `/evomni-design-storefront`。兩套系統共用相似的色彩命名但視覺語言不同，切勿混用。
