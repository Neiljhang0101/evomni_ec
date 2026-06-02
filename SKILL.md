---
name: evomni-design
description: Use this skill whenever building, reviewing, or updating UI for the Evomni SaaS admin backend. Loads the Evomni Design System — covering layout rules, color tokens, typography, spacing, component specs, and 25 ready-to-use React components. Trigger when: creating a new prototype HTML, auditing an existing page for DS compliance, adding a new component, or any task involving Evomni UI/UX.
user-invocable: true
---

# Evomni Design System Skill

## 1. 立即載入規範

首先讀取以下兩個後台設計規範（唯一的 source of truth）：

```
assets/colors_and_type.css      ← 色彩 token 與字型規格（CSS 自訂屬性）
SKILL.md（本技能 §3–7 節）     ← 設計規則、元件庫、Prototype 結構
```

> 注意：前台（storefront）設計系統請改用 `/evomni-design-storefront`，位於 `frontend-design-system/`。

## 2. 技術架構

所有 prototype 使用以下統一技術棧，**不使用 bundler、不使用 CSS framework**：

```html
<!-- React 18 + Babel standalone（CDN，無需 build） -->
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>

<!-- 共用元件（從 ../components/ 匯入） -->
<script type="text/babel" src="../components/Sidebar.jsx"></script>
<script type="text/babel" src="../components/Header.jsx"></script>
<script type="text/babel" src="../components/StatusTag.jsx"></script>
<script type="text/babel" src="../components/SharedUI.jsx"></script>
<script type="text/babel" src="../components/Shared.jsx"></script>
```

所有樣式使用 **React inline style**（`style={{ }}`），不使用 className 或外部 CSS。

## 3. 核心設計規則（必須遵守）

| 規則 | 值 |
|------|----|
| `border-radius` | **全域 `0`**；僅 StatusTag/Badge 用 `9999px` |
| 主內容區 padding | **`40px`**（`<main style={{ padding: 40 }}>` ） |
| 字重 | 只允許 `400`、`500`、`700`；**禁用 `600`** |
| 頁面背景 | `#F5F7FA` |
| 卡片/容器背景 | `#FFFFFF` |
| 字體 | `'Noto Sans TC', sans-serif` |
| 間距基準 | 8px 網格（8、16、24、32、40、48px） |
| Emoji | **禁止**；改用 Unicode 符號（⊘ ⊗ ⊕ ★ 等） |

## 4. 色彩 Token

```js
const DS = {
  primary:       '#303133',  // 主要按鈕、深色文字
  blue:          '#409EFF',  // 連結、選中狀態、焦點
  success:       '#67C23A',
  warning:       '#E6A23C',
  danger:        '#F56C6C',
  info:          '#909399',
  border:        '#DCDFE6',
  borderLight:   '#EBEEF5',
  bg:            '#F5F7FA',  // 頁面背景、表頭
  white:         '#FFFFFF',
  textPrimary:   '#303133',
  textRegular:   '#606266',
  textSecondary: '#909399',
  textDisabled:  '#C0C4CC',
  // 淺底（info/selected）
  blueLightBg:   '#ECF5FF',  // 選中 Radio、info 欄位背景（非 #EFF7FF）
  blueLightBorder: '#B3D8FF',
};
```

## 5. 元件庫

25 個元件分 5 類，互動展示請開啟：
```
component-library/index.html
```

元件分類：
- **Action**：EvoButton（7 variant × 3 size）、EvoIconButton
- **Display**：EvoStatusTag、EvoDataTable、EvoTimeline、EvoInfoCard、EvoAmountDetail
- **Input**：EvoInput、EvoTextarea、EvoSelect、EvoRadioGroup、EvoNumberInput、EvoDatePicker、EvoFileUpload
- **Navigation**：EvoMiniSidebar、EvoTabBar、EvoBreadcrumb、EvoBackLink
- **Feedback**：EvoToast、EvoModal、EvoAlertBanner、EvoTooltip、EvoPopover、EvoLightbox、EvoEmptyState、EvoSkeleton

源碼位於 `component-library/` 資料夾。

## 6. Prototype 標準結構

```jsx
function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar currentPage={...} onNavigate={navigate} collapsed={collapsed} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header onToggleSidebar={...} />
        <main style={{ flex: 1, overflowY: 'auto', padding: 40, background: '#F5F7FA' }}>
          {/* 頁面內容 */}
        </main>
      </div>
    </div>
  );
}
```

## 7. 合規檢查清單

新建或修改 prototype 前，確認：
- [ ] `border-radius` 全域為 `0`（StatusTag 除外）
- [ ] 主內容區 `padding: 40`
- [ ] 字重只有 `400`/`500`/`700`，無 `600`
- [ ] 選中背景用 `#ECF5FF`，非 `#EFF7FF`
- [ ] 頁面背景 `#F5F7FA`
- [ ] 無 Emoji（改用 Unicode 符號）
- [ ] 表格 `fontWeight: 700`（表頭）

## 8. 如何使用此技能

**建立新 prototype：**
> 讀完本技能後，根據 PRD 建立 `html/[模組名稱].html`，遵循第 6 節結構，所有樣式遵循第 3–4 節規則。

**合規審查：**
> 讀完本技能後，審查指定 prototype 是否符合設計規範，列出所有違規並修正。

**擴充元件庫：**
> 讀完本技能後，在 `component-library/` 新增元件，並更新 `SPEC/Evomni_Design_System.md`。

---

---

# PRD Skill — Progressive Interview & PRD Generator

---
name: prd
description: 透過漸進式訪談幫助使用者產出 PRD。適用於新功能模組、子系統或整合需求。觸發時機：使用者說「幫我寫 PRD」、「整理需求文件」、「我有功能想法」、「產出需求規格」，或直接描述一個尚未文件化的產品需求。
user-invocable: true
---

## 使用時機

當需要為新功能或模組建立 PRD，透過 3 輪漸進式訪談收集需求，最後產出符合 Evomni 專案格式的 Markdown PRD 檔案（可直接餵給 `/ux-spec` 或 `/usability-test` 使用）。

## 完整流程

詳細 SOP 請讀 `.claude/commands/prd.md`。

### 快速摘要

**輪次 0 — 快速定性**
- 請使用者用 1–3 句話描述功能
- 判斷文件深度：全新模組 / 子功能 / 整合需求

**輪次 1 — 產品定位（全新模組）**
- 主要使用者、開發階段、系統相依性

**輪次 2 — 功能細節**
- 主要流程、錯誤狀態，以及視需求加問的進階問題（批次操作、通知、排程、權限等）

**輪次 3 — 確認假設**
- 列出推斷假設請使用者確認，並問最關鍵的不確定點

**產出**
- 存為 `PRD/Evomni_[功能名稱]_PRD.md`
- 提示後續：更新 Master PRD、使用 `/ux-spec`、使用 `/usability-test`

## 核心原則

- 分輪訪談，每輪 2–4 個問題，不一次問完
- 推斷不出的欄位標 `⚠️ 待補`，不捏造數字或規則
- 無 Emoji，UI 文案縮寫加括號說明
- 技術規格（DB Schema、API 路由）標明「供工程師參考，可依技術判斷調整」

---

---

# Prototype Iterate Skill — Fix from Usability Report & Re-verify

---
name: prototype-iterate
description: Use this skill after a usability test report exists. Parses the report, applies fixes to the prototype in P0→P1 priority order, re-runs browser simulation to verify fixes, and produces a versioned Delta Report (v2, v3…) showing before/after issue status. Trigger when the user says "根據報告修正 prototype"、"修完再驗一次"、or provides a 易用性測試報告 file path.
user-invocable: true
---

## 使用時機

當易用性測試報告（`SPEC/*-易用性測試報告.md`）已產出，需要：
1. 根據報告問題清單修正 Prototype
2. 重新跑瀏覽器模擬驗證修正效果
3. 產出 Delta 報告（v2、v3…）追蹤修正進度

## 完整流程

詳細 SOP 請讀 `.claude/commands/prototype-iterate.md`。

### 快速摘要

**Step 1 — READ**
- 讀取 `SPEC/*-易用性測試報告.md`（自動抓最新版本，或接受路徑參數）
- 提取問題清單（含 file:line）、P0/P1/P2 分級、原始任務完成率基線
- 印出待修清單，等使用者確認再動工

**Step 2 — FIX**
- 依 P0 → P1 順序修正 Prototype 檔案
- 每個問題：確認仍存在 → 定位 → 修正 → DS 合規檢查 → 記錄修正日誌
- 不批次重寫，逐問題精準修改

**Step 3 — VERIFY**
- 啟動本地 server（檢查 `.claude/launch.json`，否則 `npx serve -p 3333 .`）
- 重跑原始失敗任務（❌ / ⚠️），記錄新結果
- 對原本通過的任務做回歸快速掃描

**Step 4 — DELTA REPORT**
- 存為 `SPEC/[name]-易用性測試報告-v[N+1].md`
- 必含：修正摘要表、問題追蹤表（Issue Tracker）、任務完成率對比、遺留問題、新發現/回歸、下一步行動

## 核心原則

- 修正前先確認問題仍存在（file:line 可能已偏移）
- 驗證用原始任務措辭，比較才有意義
- Delta Report 版本號遞增：v1 → v2 → v3，保持可追溯
- 修完立刻做 DS 合規檢查，防止引入新違規
