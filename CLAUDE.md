# Evomni 新電商系統 — 專案記憶檔（Claude 上下文）

本文件供 Claude 在每次對話中快速載入專案關鍵背景。每次新增重要決策或時程異動，請更新此檔。

---

## 最高原則（所有輸出均適用）

**禁止使用 Emoji。** 所有 Claude 產出的文件、程式碼、回覆、PRD、UX Spec、報告，一律不得出現 Emoji 字元。無論任何情境，除非使用者明確要求，否則此規則不得覆寫。

**UI 文案禁止使用專有縮寫或英文術語。** 凡 UI 上出現的標籤、欄位名稱、狀態文字、說明文字，若涉及英文縮寫（如 PV、UV、GMV、SKU、RMA、API 等）或專業術語，一律改以白話中文標示，並在括號內附上原始縮寫供工程師參考。範例：「不重複訪客數（UV）」、「產品總流量（PV）」、「成交金額（GMV）」。此規則適用於所有 prototype、PRD 截圖描述、UX Spec 文案章節。

---

## Prototype 開發準則

### 設計系統選用規則（必須遵守）

本專案有兩套獨立設計系統，**絕對不可混用**：

| 情境 | 使用的設計系統 | Skill 指令 |
|------|--------------|-----------|
| **前台（消費者端）** Prototype | `frontend-design-system/` | `/evomni-design-storefront` |
| **後台（管理員端）** Prototype | `SPEC/ui-ux-design-specification.md` + `components/` | `/evomni-design` |

**前台字級最小值規則：所有文字不得小於 14px。** `--t-xs` token 已設為 14px，inline style 中的 font 值亦同。違規字級（10px / 11px / 12px / 13px）一律提升至 14px。

**前台 Prototype 技術棧（`frontend-design-system/SKILL.md` 為準）：**
- React 18 + Babel standalone CDN
- 字體：Inter（拉丁）+ Noto Sans TC（中文）
- 圖示：Material Icons Outlined（CDN）
- 色彩：CSS 自訂屬性，引用 `../frontend-design-system/colors_and_type.css`
- 元件：引用 `../frontend-design-system/ui_kits/storefront/ui.jsx` 與 `sections.jsx`
- 頁面背景：`var(--fill-300)`（米白，非灰色）
- 基礎字級：16px（非後台的 14px）
- 英文 UI 標籤：全大寫 + 寬字距（`CART`、`CHECKOUT`、`ORDER SUMMARY`）

**後台 Prototype 技術棧（維持現行）：**
- React 18 + Babel standalone CDN，所有樣式用 inline style
- 引用 `../components/`（Sidebar、Header、StatusTag、SharedUI、Shared）
- App 骨架：`<main style={{ padding: 40, background: '#F5F7FA' }}>`
- 字體：Noto Sans TC，基礎字級 14px

### 前台彈窗／通知規則（必須遵守）

所有前台 Prototype 的彈窗、確認對話、toast 通知，一律使用 `evomnialert/` 元件，**禁止自製 modal、confirm panel 或 toast**。

**引用方式（頁面 `<head>` 內，Babel 之後）：**

```html
<link rel="stylesheet" href="../evomnialert/evomnialert.css">
<script src="../evomnialert/evomnialert.js"></script>
```

**呼叫規則：**

| 情境 | 呼叫方式 |
|------|---------|
| 靜態文字通知（成功、警告、資訊） | `SiteAlert.success/error/warning/info(title, desc)` |
| 需要使用者按 OK 確認後才執行動作 | `EvomniAlert.show({ type, title, desc, onConfirm })` |
| AJAX 後端回應 | `EvomniAlert.fromResponse(res)` |
| 登出流程 | `SiteAlert.logout({ redirect })` |

`SiteAlert` 用純文字（前端寫死的字串）；`EvomniAlert.show()` 用於含動態字串或需 `onConfirm` callback 的情境。元件說明詳見 `evomnialert/README.md`。

### 判斷依據

頁面屬於「消費者會直接看到、操作的介面」→ 前台 DS。
頁面屬於「商家後台管理、數據、設定」→ 後台 DS。
不確定時，看 `前台開發計畫_checklist.md`：有列的頁面一律用前台 DS。

---

## 開發階段時程

| 階段 | 方案 | 開發期 | 整合測試期 | 目標上線 |
| --- | --- | --- | --- | --- |
| 階段一 | 電商啟航方案 | 5月 – 7月（12 週）| 8月 | 8月底 |
| 階段二 | 進階電商包 | 9月 – 11月（12 週）| 12月 | 12月底 |

**說明：**
- 階段一以電商啟航方案功能為主要驗收範圍，8 月進行內部整合測試，目標 8 月底正式上線
- 階段二以進階電商包完整功能為驗收範圍，12 月進行內部整合測試，目標 12 月底正式上線
- 兩個階段採相同的技術架構基礎，若開發進度超前，可在階段一一次性完成更多進階功能，兩個版本都有工程師可爭取的額外激勵
- 文件撰寫原則：**不強調某階段不做什麼**，以正向描述目標為主；工程師若能提前完成進階功能一樣歡迎

---

## 文件集說明

所有 PRD 位於 `PRD_new/` 資料夾。Master PRD（`PRD_new/Evomni_新電商系統_Master_PRD.md`）是所有子文件的導覽入口，章節結構如下：

- §1 文件資訊
- §2 產品背景與目標
- §3 產品定位與核心架構（含系統邊界圖、功能流程圖、功能結構圖）
- §4 方案架構與功能分層（功能分層總表含 Prototype 欄位）
- §5 模組開發依賴圖
- §6 子文件索引與狀態
- §7 待確認與未定案事項
- §8 版本紀錄

---

## PRD 撰寫規則（重要）

- 技術規格（DB Schema、API 路由）為建議參考，工程師可依技術判斷調整，重大變更請回寫文件
- 所有文件納入 Git 版控
- 模組縮寫已全面改為中文（媒體庫、發信系統、文章管理模組、數據中心、會員認證模組）
- 修改任何 PRD 後，必須連動確認 Master PRD §6 子文件索引與 §8 版本紀錄是否同步

---

## 關鍵架構決策（已定案）

- **CMS 形象站產品 vs 電商產品中心**：分離架構 + 橋接推送（`products.cms_product_id`），詳見 `PRD_new/Evomni_形象產品與電商商品整合架構規劃.md`
- **文章管理跨站**：共用文章管理模組，以 `display_scope` 欄位（`cms` / `ecommerce` / `both`）區分
- **條件搜尋**：已移出本期開發範圍，改以 Grape.js 範本機制實作
