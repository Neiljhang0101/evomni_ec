# Evomni 產品中心 — Design Brief + UX Spec

> **Version:** 1.1
> **Created:** 2026-05-05
> **Updated:** 2026-05-05 — 新增 Screen 7 產品設定（來源：PRD §6.2 / §6.5）；補充 Confirm 1–4 PM 決策結果
> **Source PRD:** Evomni_Part2_產品中心_PRD_v2.md
> **Downstream tools:** figma-generate-design · design:design-system · design:design-handoff · design:accessibility-review · design:design-critique

---

## Part 1 — Design Brief

### Product Vision

Evomni 產品中心是電商後台的核心管理介面，讓完全不懂程式的店家管理員，能夠自主完成產品上架的全部流程——從填寫名稱、上傳圖片、設定多規格 SKU 矩陣、排程上下架，到監控庫存警示與回應消費者貨到通知訂閱。使用前，商家需要仰賴工程師才能大量上架產品；使用後，一個人就能在 3 分鐘內完成一個多規格產品的建立，在 30 分鐘內用 CSV 批次匯入 200 件產品。

---

### Target User

**Primary（主要）：** 電商店家管理員——每天需要新增/修改產品、追蹤庫存狀況、準備活動檔期產品的業務人員，熟悉 Excel 但不懂程式，使用桌面瀏覽器操作後台。

**Secondary（次要）：** 瀏覽產品頁的消費者——在前台看產品圖片、選規格、訂閱缺貨通知（前台 UI 細節另行定義，本 Spec 聚焦後台）。

---

### Design Goals

| # | Goal | How to test |
|---|---|---|
| 1 | 管理員可在 3 分鐘內完成一個有兩層規格（顏色×尺寸）產品的建立並上架，無需查閱說明 | 請 5 位受測者計時完成「建立含 3 色 × 3 尺寸的 T 恤產品」任務 |
| 2 | 管理員在不看說明的情況下，能找到「批次匯入」功能入口 | First-click test：觀察第一次點擊是否在正確位置 |
| 3 | 低庫存產品在庫存管理頁一眼可辨，管理員不需要水平滾動就能看到警示 | 眼動追蹤或 5 秒測試：受測者能正確說出低庫存產品數量 |
| 4 | 刪除等不可逆操作，管理員不會意外執行（有二次確認且按鈕文字明確） | 觀察任務中是否有意外刪除事件 |
| 5 | 管理員在 CSV 匯入流程中，能看懂錯誤報告並自行修正重傳 | 受測者閱讀錯誤報告後，說出要修正哪幾列以及修正方式 |

---

### Design Principles

1. **效率優先（Efficiency First）** — 高頻操作（搜尋、篩選、Inline 編輯庫存）必須在當前頁面完成，不強迫跳頁；批次操作節省重複點擊。
2. **防呆大於依賴文件（Safe by Default）** — 表單驗證即時反饋；危險操作（刪除、清除 SKU 矩陣）必須二次確認；錯誤訊息說明原因與解法，不只丟代碼。
3. **視覺明確性（Visual Clarity）** — 狀態用顏色 + 文字雙重標示，不依賴顏色單一傳達；資訊密度高的表格用對齊和層次減少認知負擔。
4. **漸進式揭露（Progressive Disclosure）** — 進階設定（溫層、0元產品、SEO）預設收合或置於右側輔助欄；核心流程（名稱、圖片、價格、庫存）最先出現。

---

### Design System Reference

- **Figma Library:** TBD（建議在執行 Figma 前先建立 Token Library）
- **Component framework:** Element Plus（`<el-*>` 元件）
- **Button border-radius:** `0px`（`!rounded-none`，覆寫 Element Plus 預設）
- **Tag border-radius:** `9999px`（`!rounded-full`）
- **Icon set:** Element Plus Icons（內建）
- **Font:** 系統預設 sans-serif（TBD — 建議確認品牌字型後更新）

> ✏️ Copy 待確認：字型尚未指定，Figma 執行前請確認品牌字型規範。

---

### Accessibility Requirements

- **Target WCAG level:** AA
- **Known constraints:**
  - 所有狀態（低庫存警示、錯誤訊息）必須同時使用顏色 + 圖示/文字，不得只用顏色區分
  - 表格必須支援鍵盤導覽（Tab 切換欄位，Enter 確認）
  - Modal / Drawer 開啟時 focus 必須捕捉在對話框內（focus trap）
  - `#F56C6C`（錯誤紅）搭配白色文字對比度需驗證（≥ 4.5:1）
  - 圖片上傳區需有 `aria-label`

---

### Hard Constraints

- ⚠️ 不包含任何結帳、付款、金流 UI
- ⚠️ 不包含會員登入或權限管理 UI（假設已登入狀態）
- ⚠️ 0元產品相關設定在啟航方案中顯示為「鎖定」狀態，不得直接隱藏
- ⚠️ 庫存調整日誌（`stock_adjustment_logs`）不可提供刪除入口

---

### Out of Scope

- 運費規則設定（見 Part2_溫層重量運費設定_PRD.md）
- 行銷活動 / 優惠券模組（Part 4）
- 數據中心詳細報表（產品 PV 趨勢為唯讀顯示）
- 產品評論、產品比較功能
- 前台產品頁完整 UI
- 條件搜尋（改以 Grape.js 範本機制實作）
- Prototype 不需串接真實 API（使用假資料）

---

## Part 2 — Screen Index

| # | Screen Name | Navigation path | Primary user goal |
|---|---|---|---|
| 1 | 產品列表 | 左側導覽 > 產品管理 | 瀏覽所有產品、快速找到目標產品、執行批次操作 |
| 2 | 新增產品 | 產品列表 > 「+ 新增產品」 | 一頁完成產品所有設定後上架 |
| 3 | 編輯產品 | 產品列表 > 點擊產品名稱 / 「編輯」 | 修改已上架產品的任意欄位 |
| 4 | 產品分類管理 | 左側導覽 > 產品分類 | 建立/整理分類樹，調整顯示順序 |
| 5 | 庫存管理 | 左側導覽 > 庫存管理 | 查看/調整庫存，處理貨到通知訂閱 |
| 6 | CSV 批次匯入（Dialog）| 產品列表 > 「批次匯入」 | 一次匯入大量產品，查看驗證結果後確認 |
| 7 | 產品設定 | 左側導覽 > 設定 | 設定全局低庫存閾值、新產品預設值、貨到通知觸發條件 |

---

## Part 3 — Per-Screen UX Spec

---

### Screen 1：產品列表

**Purpose:** 讓管理員在一個頁面總覽所有產品狀態、快速搜尋/篩選，並執行單筆或批次操作。
**Entry points:** 左側導覽點擊「產品管理」；從新增/編輯頁儲存後跳回；從庫存管理麵包屑返回。
**Primary user goal:** 找到目標產品並進行操作（編輯、上下架、刪除）。

#### Information Hierarchy

```
H1 (most prominent): 產品管理
Primary CTA: + 新增產品
Secondary CTA: 批次匯入
Supporting info: 產品數量總計、篩選狀態說明
Filter bar: 搜尋框 + 分類篩選 + 狀態篩選 + 批次操作（勾選後啟用）
Main content: 產品列表表格（主圖、名稱、狀態、庫存、售價、更新時間、操作）
```

#### Actual Copy

**Page / Section Headings**
- Page title: `產品管理`
- Breadcrumb: `產品中心 > 產品管理`

**Button Labels**
- Primary action: `+ 新增產品`
- Secondary action: `批次匯入`
- Edit button (per row): `編輯`
- Copy button tooltip: `複製此產品`
- Delete button tooltip: `刪除`
- Batch action dropdown label: `批次操作`
- Batch action – publish: `批次上架`
- Batch action – unpublish: `批次下架`
- Batch action – move category: `移動分類`
- Batch action – delete: `批次刪除`
- Batch selection indicator: `已選取 {N} 件產品`
- Clear filters: `清除篩選`
- Retry: `重新整理`

**Form Fields (Filters)**
| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 搜尋框（無標籤）| 搜尋產品名稱或 SKU 編號 | — | — |
| 分類（Select）| 所有分類 | — | — |
| 狀態（Select）| 所有狀態 | — | — |

**Empty State（無產品）**
- Headline: `還沒有任何產品`
- Subtext: `新增你的第一件產品，讓消費者開始購物吧`
- CTA label: `新增產品`

**Empty State（搜尋/篩選無結果）**
- Headline: `找不到符合的產品`
- Subtext: `試試看調整關鍵字，或清除篩選條件`
- CTA label: `清除篩選`

**Error States**
| Error condition | Message shown to user |
|---|---|
| 列表載入失敗 | `產品列表載入失敗，請重新整理頁面。若問題持續，請聯繫客服。` |
| 刪除失敗 | `刪除失敗，此產品可能有進行中的訂單。請刷新頁面後再試。` |
| 複製失敗 | `產品複製失敗，請再試一次。` |

**Loading State**
- Loading text: Skeleton loader（5 列），無文字

**Status Labels**
| Status key | Display text | Colour semantic |
|---|---|---|
| published | 已上架 | Success（`#67C23A`，綠） |
| unpublished | 已下架 | Neutral（`#909399`，灰）|
| draft | 草稿 | Warning（`#E6A23C`，黃）|
| scheduled | 已排程 | Info（`#409EFF`，藍）|

**Toast / Notification Messages**
| Trigger | Message |
|---|---|
| 複製產品成功 | `已複製「{產品名稱}」為草稿` |
| 拖曳排序成功 | `產品排序已更新` |
| 批次上架成功 | `已上架 {N} 件產品` |
| 批次下架成功 | `已下架 {N} 件產品` |
| 批次刪除成功（全部） | `已刪除 {N} 件產品` |
| 批次刪除部分成功 | `{M} 件產品有進行中的訂單，無法刪除。其餘 {N} 件已刪除。` |

**Delete Confirmation Modal Copy**
```
標題：確定要刪除「{產品名稱}」嗎？
說明：此操作無法復原。產品將進入回收狀態，已成立的訂單不受影響。
按鈕：[取消]  [刪除產品]（Danger）
```

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 頁面標題（H1）| `產品管理`，28px，`font-weight: 600` | 靜態 |
| 「+ 新增產品」Button | Primary；`!rounded-none`；background: `#303133` | 點擊 → 跳至新增產品頁 |
| 「批次匯入」Button | Secondary；`!rounded-none` | 點擊 → 開啟 CSV 匯入 Dialog |
| 搜尋框（`<el-input>`）| Width: 240px；左側放大鏡 icon；右側清除 × | debounce 300ms 即時過濾列表；按 Enter 觸發搜尋 |
| 分類篩選（`<el-select>`）| 多選；下拉含三層縮排分類樹 | 選擇後更新列表 |
| 狀態篩選（`<el-select>`）| 單選；選項：全部/已上架/已下架/草稿/已排程 | 選擇後更新列表 |
| 批次操作 Dropdown | `<el-dropdown>`；未勾選時整體 Disabled | 勾選產品後啟用；展開顯示批次選項 |
| 產品列表（`<el-table>`）| 欄位：勾選 / 主圖縮圖 / 產品名稱+SKU / 分類 / 狀態 Tag / 庫存 / 售價 / 更新時間 / 操作 | 點擊名稱 → 編輯頁；拖曳列調整 sort_order |
| 主圖縮圖 | 48×48px，`object-fit: cover`，無圖時顯示灰色圖片佔位 icon | 靜態 |
| 狀態 Tag（`<el-tag>`）| `!rounded-full`；四種顏色變體 | 靜態（不可點擊） |
| 庫存數量欄 | 正常：黑色數字；低庫存：`⚠ {N}`，`#F56C6C` 紅色 | 靜態 |
| 售價欄 | 有特價：「NT$ {特價}」紅色 + 「NT$ {原價}」刪除線；0元：`免費` Tag | 靜態 |
| 操作欄 | 「編輯」文字連結（藍）+ 複製 icon + 刪除 icon（紅） | 各自對應操作 |
| 分頁（`<el-pagination>`）| 每頁 20 筆；顯示「共 N 件」 | 切換頁碼重新載入對應頁資料 |
| 刪除確認 Modal | 寬 400px；Danger 確認按鈕 | ESC / 取消關閉；確認執行刪除 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 有產品資料，無篩選 | 產品列表（每頁 20 筆）+ 分頁 |
| Empty（首次）| 帳號下尚無任何產品 | 全頁空狀態插圖 + Copy 如上 |
| Empty（篩選）| 篩選/搜尋後無符合結果 | 表格區域顯示無結果提示 + 清除篩選 CTA |
| Loading | 列表資料載入中 | 5 列 Skeleton loader（欄位寬度匹配實際欄位） |
| Error | API 請求失敗 | 頁面中央顯示錯誤訊息 + 「重新整理」Button |
| Batch select | 勾選 ≥ 1 件產品 | 頂部出現「已選取 N 件產品」Bar + 批次操作 Dropdown 啟用 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「+ 新增產品」 | 跳至 Screen 2（產品建立頁） |
| 點擊「批次匯入」 | 開啟 Screen 6（CSV 匯入 Dialog） |
| 點擊產品名稱 / 「編輯」 | 跳至 Screen 3（產品編輯頁） |
| 點擊「複製」icon | 呼叫 API 複製為草稿；Toast 成功訊息；新草稿出現在列表頂端 |
| 點擊「刪除」icon | 開啟 400px 確認 Modal |
| 勾選產品列 → 點擊批次操作 | Dropdown 展開顯示批次選項 |
| 批次操作「移動分類」 | 開啟 Drawer 選擇目標分類 |
| 拖曳列到新位置 | 松手後 PATCH 排序 API；Toast 確認 |
| Hover「複製」icon | Tooltip：`複製此產品` |
| Hover「刪除」icon | Tooltip：`刪除` |

#### Motion / Transition

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| 刪除確認 Modal 開啟 | Fade in + scale from 95% | 200ms | ease-out |
| 批次操作 Dropdown 展開 | Slide down + fade | 150ms | ease-out |

---

### Screen 2：新增產品

**Purpose:** 讓管理員透過頁簽分區填完產品所有設定（基本資訊、規格定價、進階設定、SEO），並選擇儲存或上架。
**Entry points:** 產品列表點擊「+ 新增產品」。
**Primary user goal:** 完成產品資料填寫並選擇「儲存草稿」或「儲存並上架」。

#### Tab 結構（頁簽）

產品建立/編輯頁採用**頂部 Tab 導覽**組織內容，避免單頁過長。共 4 個頁簽：

| Tab # | 頁簽名稱 | 包含內容 |
|---|---|---|
| 1 | 基本設定（預設顯示）| 產品名稱、產品簡短說明、產品主圖 + 多圖、產品詳細說明（富文本）、產品分類、產品狀態、上下架檔期 |
| 2 | 規格與定價 | 單規格模式（售價/特價/成本/庫存/SKU編號/重量/低庫存閾值）；多規格模式（規格層/規格值/SKU矩陣）；銷售數量顯示設定 |
| 3 | 進階設定 | 溫層屬性（常溫/冷藏/冷凍）、溫層標示顯示 Switch、0元產品 Switch（每人限量/需登入）|
| 4 | 網頁SEO | SEO 標題、SEO 描述、SEO 關鍵字 |

**Tab 行為規則：**
- 預設停在 Tab 1（基本設定）
- 切換 Tab 不觸發儲存，所有 Tab 資料在點擊儲存時一次送出
- 若切換 Tab 前有驗證錯誤，Tab 標籤顯示紅色錯誤指示點（`⚠`）
- 頁面右上角固定顯示「儲存草稿」與「儲存並上架」，無論在哪個 Tab 都可操作

#### Information Hierarchy

```
H1 (most prominent): 新增產品
Breadcrumb: 產品中心 > 產品管理 > 新增產品
Tab Bar: 基本設定 | 規格與定價 | 進階設定 | 網頁SEO（固定在 H1 下方）
Primary CTA: 儲存並上架（右上角，固定，#303133）
Secondary CTA: 儲存草稿（右上角，固定，次要）

Tab 1 — 基本設定（優先順序）：
  1. 產品名稱（Required，最頂部）
  2. 產品主圖（Required）
  3. 產品詳細說明（富文本）
  4. 產品簡短說明
  5. 產品分類 + 產品狀態 + 上下架檔期（右側輔助欄或底部）

Tab 2 — 規格與定價：
  1. 啟用多規格 Toggle（決定下方呈現方式）
  2. 單規格：售價（Required）→ 特價 → 成本價 → 庫存 → SKU 編號 → 重量
  3. 多規格：規格層設定 → SKU 矩陣表格 → 批次填入工具列
  4. 銷售數量顯示模式（底部）

Tab 3 — 進階設定：
  1. 溫層屬性（Radio）
  2. 溫層標示顯示（Switch，冷藏/冷凍時才顯示）
  3. 0元產品（Switch，進階方案）→ 每人限量 → 需登入

Tab 4 — 網頁SEO：
  1. SEO 標題
  2. SEO 描述
  3. SEO 關鍵字
```

#### Actual Copy

**Page / Section Headings**
- Page title: `新增產品`
- Breadcrumb: `產品中心 > 產品管理 > 新增產品`
- 左主欄區塊標題（依序）: `基本資訊` / `產品圖片` / `產品詳細說明` / `規格與定價` / `SEO 設定`
- 右輔助欄區塊標題（依序）: `產品狀態` / `上下架檔期` / `產品分類` / `銷售數量顯示` / `進階設定`

**Button Labels**
- Primary action: `儲存並上架`
- Secondary action: `儲存草稿`
- 啟用多規格 Toggle 標籤: `啟用多規格（如顏色、尺寸）`
- 新增規格層: `+ 新增規格層`
- SKU 批次填入: `套用至所有 SKU`

**Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 產品名稱 * | 例：夏日純棉T恤（最多 100 字） | {N}/100 字 | 請填寫產品名稱 |
| 產品簡短說明 | 選填。顯示於產品列表卡片下方，最多 200 字 | {N}/200 字 | — |
| 產品主圖 * | — | 建議正方形，JPG/PNG/WebP，最大 10MB | 請上傳產品主圖 |
| 產品附圖 | — | 最多 9 張，拖曳調整順序 | — |
| 產品詳細說明 | 請輸入產品詳細說明… | 支援標題、粗體、列表、圖片、影片嵌入 | — |
| 售價（NT$）* | 0 | — | 請填寫售價 |
| 特價（NT$）| — | 留空則不顯示特價 | 特價必須低於售價 |
| 成本價（NT$）| — | 不顯示於前台，僅用於後台毛利計算 | — |
| 庫存數量 * | 0 | 設為 0 時前台顯示「售完」 | 請填寫庫存數量 |
| SKU 編號 | 產品貨號（選填，最多 64 字元） | — | — |
| 重量（公斤）| 例：0.3 | 用於重量運費計算，留空則不啟用重量運費 | — |
| 低庫存通知閾值 | 使用全局設定（5） | 庫存低於此數量時自動發送補貨提醒 Email | — |
| 規格名稱（層1）* | 例：顏色 | 最多 20 字 | 請填寫規格名稱 |
| 規格名稱（層2）| 例：尺寸 | 最多 20 字 | 請填寫規格名稱 |
| 規格值 | 輸入後按 Enter 新增，例：紅色 | 最多 10 個規格值 | 規格值不可重複 |
| SEO 標題 | 留空則自動使用產品名稱 | 建議 60 字元以內（{N}/70）| — |
| SEO 描述 | 留空則自動截取產品說明前 160 字 | 建議 160 字元以內 | — |
| SEO 關鍵字 | 多個關鍵字以逗號分隔，例：純棉, T恤, 夏季 | — | — |
| 產品狀態（Select）| — | — | — |
| 上架時間 | 立即上架（留空）| 設定時間後產品狀態自動改為「已排程」 | — |
| 下架時間 | 永久上架（留空）| — | 下架時間必須晚於上架時間 |
| 產品分類（Tree Select）| 未選擇（產品歸入未分類）| — | — |
| 銷售數量顯示模式（Select）| — | — | — |
| 銷售起始基數 | 0 | 前台顯示數量 = 實際銷售量 + 此基數，常用於初期產品建立社會認同 | — |
| 溫層屬性（Radio）| — | 影響結帳時的運費計算。詳見「金物流串接 > 溫層運費規則」 | — |
| 每人最大領取數量 | 1 | 限制每個會員帳號最多領取幾件，防止濫用 | 請填寫 1–999 之間的數字 |

**Right Panel Select Options**

*產品狀態選項：*
- `草稿`（預設）
- `已上架`
- `已下架`

*銷售數量顯示模式選項：*
- `不顯示`（預設）
- `顯示實際數字`（搭配起始基數）
- `顯示「熱銷中」文字`

*溫層屬性選項：*
- `常溫`（預設）
- `冷藏（7°C 以下）`
- `冷凍（-18°C 以下）`

**System Messages**

| Trigger | Message |
|---|---|
| 啟用多規格（有已填單規格資料）| `啟用多規格後，目前的單規格價格和庫存設定將會清除，並由 SKU 矩陣取代。確定繼續？` |
| 0元產品啟用（有已填售價）| `已啟用免費產品模式，原本的售價設定已清除。` |
| SKU 數量 > 50 | `您目前有 {N} 個 SKU 組合，組合數較多時建議考慮合併部分規格值，以簡化後續維護。` |
| SKU 數量達 100 上限 | `SKU 組合已達 100 個上限，無法繼續新增規格值。請減少規格值數量後再試。` |
| 刪除有 SKU 的規格值 | `刪除「{規格值}」後，相關的 {N} 個 SKU 組合將一併刪除，庫存資料也會清除。確定繼續？` |
| 規格名稱重複 | `此規格名稱已存在，請使用不同的名稱。` |

**Error States**
| Error condition | Message shown to user |
|---|---|
| 儲存失敗（網路/伺服器）| `儲存失敗，請再試一次。若問題持續發生，請聯繫客服。` |
| 圖片上傳失敗 | `圖片上傳失敗。請確認網路連線，或使用 10MB 以內的 JPG/PNG/WebP 圖片。` |
| 離開頁面有未儲存變更 | `您有未儲存的變更，確定要離開嗎？` |

**Loading State**
- 圖片上傳中: 圖片區域顯示進度條 + `{N}%`
- 儲存中: 儲存按鈕顯示 Loading spinner，按鈕文字改為 `儲存中…`，欄位不可編輯

**Status Labels**
| Status key | Display text | Colour semantic |
|---|---|---|
| normal | 常溫 | Neutral |
| cold | 冷藏 | Info（藍）|
| frozen | 冷凍 | Info（藍）|
| free_product_locked | 需升級進階電商包 | Neutral（灰，鎖頭 icon）|

**Toast / Notification Messages**
| Trigger | Message |
|---|---|
| 儲存草稿成功 | `產品已儲存為草稿` |
| 儲存並上架成功 | `產品已上架！消費者現在可以瀏覽並購買此產品。` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 頁簽列（Tab Bar）| `<el-tabs type="border-card">` 或 underline tabs；4 個頁簽：基本設定 / 規格與定價 / 進階設定 / 網頁SEO；固定在 H1 下方 | 點擊切換顯示對應 Tab 內容；有驗證錯誤的 Tab 標籤顯示 `⚠` 紅點 |
| 產品名稱 Input | `<el-input>`；字元計數 0/100；Required | 即時計數；超過 100 字邊框變 `#F56C6C` |
| 主圖上傳區 | 200×200px 正方形拖放區；Required | 呼叫媒體庫 API；上傳中顯示進度條 + 百分比；成功後顯示縮圖 + 「重新上傳」 |
| 附圖上傳列 | 橫向縮圖列表；最多 9 張 | 拖曳調整順序；點擊縮圖放大預覽；每張有刪除 × |
| 富文本編輯器 | 工具列：H2/H3 / 粗體 / 斜體 / 列表 / 圖片 / YouTube / 表格 | 圖片插入按鈕呼叫媒體庫 API |
| 啟用多規格 Switch | `<el-switch>`；標籤：「啟用多規格（如顏色、尺寸）」 | 開啟 → 確認 Dialog → 確認後展開規格設定區 |
| 售價 Input | `<el-input-number>` prefix「NT$」；min=0；Required | 0元產品啟用時隱藏 |
| 特價 Input | `<el-input-number>` prefix「NT$」；Optional | 即時驗證：特價≥售價時紅色邊框 |
| 庫存數量 Input | `<el-input-number>` min=0 | 設為 0 後 Tooltip 提示前台顯示「售完」 |
| 「+ 新增規格層」Button | Secondary；最多 2 層；超過時 Disabled | Disabled 時 Tooltip：「最多設定兩層規格」 |
| 規格值 Tag 輸入 | 輸入 + Enter 新增 Tag；`<el-tag class="!rounded-full">`；每個 Tag 可刪除 | 超過 10 個時顯示警告；刪除有 SKU 的值時彈確認 |
| 規格值圖片上傳 | Tag 右側 icon；點擊呼叫媒體庫；上傳後 Tag 左側顯示 16×16 縮圖 | Tooltip：「規格代表圖顯示於前台選擇器」 |
| SKU 矩陣表格 | `<el-table>`；自動生成笛卡爾積；欄位：SKU 編號/售價/特價/庫存/重量/啟用 | Tab 鍵欄位間切換；所有欄位 Inline 可編輯 |
| 批次填入工具列 | Select 欄位 + InputNumber + 「套用至所有 SKU」Button | 點擊套用後所有 SKU 該欄位填入相同值 |
| 產品狀態 Select | 右輔助欄；草稿/已上架/已下架 | 變更時更新上方狀態指示 |
| 上架時間 DatePicker | `<el-date-picker type="datetime">` | 設定後產品狀態自動顯示「已排程」 |
| 產品分類 TreeSelect | `<el-tree-select>` 多選；顯示三層分類 | 不選則產品歸入「未分類」 |
| 溫層屬性 RadioGroup | 常溫/冷藏/冷凍；預設常溫 | 選冷藏/冷凍後出現「在產品頁顯示溫層標示」Switch |
| 0元產品 Switch | 預設關閉；啟航方案顯示鎖頭 icon | 啟用 → 隱藏價格欄位，顯示每人限量設定 |
| SEO 預覽 | 模擬 Google 搜尋結果呈現標題/描述/URL | 即時更新 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 空白新增頁 | 所有欄位顯示 Placeholder；產品狀態預設「草稿」 |
| 多規格已啟用 | 啟用多規格 Toggle | 規格設定區展開；單規格欄位隱藏；SKU 矩陣顯示 |
| 儲存中 | 點擊儲存按鈕 | 按鈕 Loading 狀態；表單欄位不可編輯 |
| 驗證錯誤 | 必填欄位未填後點擊儲存 | 空白必填欄位邊框變 `#F56C6C`；頁面滾至第一個錯誤；欄位下方顯示錯誤訊息 |
| 圖片上傳中 | 正在上傳主圖 | 上傳進度條 + 百分比；儲存按鈕 Disabled |
| 0元產品啟用 | 0元產品 Switch 開啟 | 售價/特價/成本價欄位隱藏；每人限量 + 需登入 Switch 顯示 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「儲存草稿」 | POST /api/v1/products（status=draft）→ Toast → 跳至產品列表 |
| 點擊「儲存並上架」 | POST /api/v1/products（status=published）→ Toast → 跳至產品列表 |
| 開啟多規格後刪除規格值 | 確認 Dialog → 確認後矩陣列減少 |
| 離開頁面（有未儲存變更）| 瀏覽器原生 `beforeunload` 確認對話框 |
| 點擊麵包屑「產品管理」 | 同上（有未儲存變更觸發確認）→ 跳回產品列表 |

#### Motion / Transition

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| 多規格區塊展開 | Expand（height: 0 → auto）| 250ms | ease-out |
| 規格值 Tag 新增 | Fade in + scale from 80% | 150ms | ease-out |
| 規格值 Tag 刪除 | Fade out + scale to 80% | 150ms | ease-in |
| SKU 矩陣出現 | Fade in | 200ms | ease-out |

---

### Screen 3：編輯產品

**Purpose:** 讓管理員修改已建立產品的任意欄位，並查看產品的銷售/瀏覽數據。
**Entry points:** 產品列表點擊產品名稱或「編輯」按鈕。
**Primary user goal:** 修改特定欄位後儲存，不需要重新填整張表單。

> 📌 假設：編輯頁與新增頁共用相同的頁面元件，包含相同的 4 個 Tab（基本設定 / 規格與定價 / 進階設定 / 網頁SEO）。差異點：頁面標題、CTA 文字、表單預填現有值，以及 Tab 1「基本設定」底部額外顯示唯讀產品數據卡片。以下只列出與新增頁的差異點。

#### Information Hierarchy

```
H1 (most prominent): 編輯產品（右側顯示產品名稱）
Breadcrumb: 產品中心 > 產品管理 > 編輯：{產品名稱}
Primary CTA: 儲存變更
Secondary CTA: 儲存草稿（若目前狀態為已上架，不顯示此選項）

右輔助欄額外顯示（最下方）：
  - 產品數據卡片（PV/UV/銷售量）— 唯讀
```

#### Actual Copy

**Page / Section Headings**
- Page title: `編輯產品`
- Breadcrumb: `產品中心 > 產品管理 > 編輯：{產品名稱}`
- 數據卡片標題: `產品數據`

**Button Labels**
- Primary action: `儲存變更`
- 數據圖表說明文字: `近 30 天 PV / UV 趨勢`

**Read-only Data Fields**
| Field label | Value format |
|---|---|
| 建立時間 | `{YYYY/MM/DD HH:mm}` |
| 最後修改時間 | `{YYYY/MM/DD HH:mm}` |
| 累計銷售數量 | `{N} 件` |
| 累計瀏覽數（PV）| `{N} 次` |

**Special Interaction Messages**
| Trigger | Message |
|---|---|
| 下架「已排程」產品 | `此產品已設定自動上架時間（{YYYY/MM/DD HH:mm}），下架後將清除排程設定。確定要繼續嗎？` |

**Toast / Notification Messages**
| Trigger | Message |
|---|---|
| 儲存變更成功 | `產品已更新` |

#### Component List（與新增頁差異部分）

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 產品數據卡片 | 右輔助欄最下方；顯示建立時間、修改時間、銷售量、PV | 唯讀，不可編輯 |
| 近 30 天折線圖 | `<el-chart>` 折線圖；X 軸：日期；Y 軸：PV / UV | Hover 顯示當日數值 Tooltip |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 載入中（Loading） | 抓取產品資料 | 兩欄 Skeleton loader（模擬表單 + 右側欄）|
| Default | 資料載入成功 | 表單預填現有產品資料 |
| Error（找不到）| 產品 ID 不存在或無權限 | 頁面中央：`找不到此產品` + 「返回產品列表」Button |
| 儲存成功 | 更新 API 200 | Toast「產品已更新」；留在編輯頁 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 修改任意欄位 → 點擊「儲存變更」 | PATCH /api/v1/products/:id → Toast |
| 將狀態改為「已下架」（產品為已排程）| 確認 Dialog（含清除排程提示）→ 確認後執行 |

---

### Screen 4：產品分類管理

**Purpose:** 讓管理員建立/維護產品分類樹（最多三層），調整分類順序，設定各分類的名稱、圖片和 SEO。
**Entry points:** 左側導覽點擊「產品分類」。
**Primary user goal:** 新增分類或調整分類層級與順序。

#### Information Hierarchy

```
H1 (most prominent): 產品分類
Breadcrumb: 產品中心 > 產品分類
Primary CTA: + 新增根分類
Main content: 分類樹（可展開/拖曳）
Right panel: 分類編輯 Drawer（點擊「編輯」後開啟）
```

#### Actual Copy

**Page / Section Headings**
- Page title: `產品分類`
- Breadcrumb: `產品中心 > 產品分類`
- Drawer 標題（編輯）: `編輯分類`
- Drawer 標題（新增子分類）: `新增子分類`

**Button Labels**
- Primary action: `+ 新增根分類`
- 節點：「編輯」（文字按鈕）
- 節點：「+ 子分類」（icon 按鈕，Tooltip：`新增子分類`）
- 節點：「刪除」（icon 按鈕，Tooltip：`刪除分類`）
- Drawer 儲存: `儲存`
- Drawer 取消: `取消`

**Form Fields（分類編輯 Drawer）**
| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 分類名稱 * | 例：女裝（最多 50 字） | — | 請填寫分類名稱 |
| SEO 標題 | 留空則使用分類名稱 | 建議 60 字元以內 | — |
| SEO 描述 | — | 建議 160 字元以內 | — |
| 分類圖片 | — | 建議尺寸 600×300px，顯示於前台分類頁頂部 | — |
| 在前台顯示此分類（Switch）| — | 隱藏後前台選單不顯示，但直連 URL 仍可存取 | — |

**Empty State**
- Headline: `還沒有任何產品分類`
- Subtext: `建立分類可以幫助消費者更快找到想要的產品`
- CTA label: `新增第一個分類`

**Error States**
| Error condition | Message shown to user |
|---|---|
| 分類樹載入失敗 | `分類資料載入失敗，請重新整理頁面。` |
| 儲存分類失敗 | `儲存失敗，請再試一次。` |
| 嘗試超過三層分類 | Tooltip on disabled button：`最多設定三層分類` |

**Loading State**
- Loading text: Skeleton loader（3 列縮排結構，模擬分類樹層級）

**Status Labels**
| Status key | Display text | Colour semantic |
|---|---|---|
| visible | 顯示中 | Success（綠） |
| hidden | 已隱藏 | Neutral（灰）|

**Toast / Notification Messages**
| Trigger | Message |
|---|---|
| 拖曳排序成功 | `分類順序已更新` |
| 儲存分類成功 | `分類已儲存` |
| 嘗試跨層拖曳（阻止）| `不支援跨層移動，請在同一層內調整順序` |

**Delete Confirmation Dialog Copy**

*無子分類，有產品：*
```
標題：刪除「{分類名稱}」
說明：此分類目前有 {N} 件產品，請選擇產品的處理方式：

○ 將產品移至「未分類」
○ 取消與此分類的關聯（產品保留，僅移除分類標籤）

按鈕：[取消]  [刪除分類]（Danger）
```

*有子分類：*
```
標題：刪除「{分類名稱}」
說明：此分類包含 {N} 個子分類，刪除後所有子分類也會一併刪除。
子分類中共有 {M} 件產品需要處理，請選擇產品的處理方式：

○ 將所有產品移至「未分類」
○ 取消與此分類的關聯（產品保留，僅移除分類標籤）

按鈕：[取消]  [刪除分類與所有子分類]（Danger）
```

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 「+ 新增根分類」Button | Primary；`!rounded-none` | 點擊 → 開啟右側 Drawer（新增模式） |
| 分類樹（`<el-tree>`）| 可展開/收合；含拖曳把手 | 展開/收合；同層拖曳排序；跨層拖曳阻止 |
| 分類節點 | 拖曳把手 + 分類名稱 + 產品數 Badge + 顯示/隱藏 Switch + 操作按鈕 | 靜態呈現 + 各按鈕各自觸發操作 |
| 層級縮排 | 層級1：`font-weight:600`；層級2：左縮 16px；層級3：左縮 32px | 視覺層次 |
| 「+ 子分類」按鈕 | icon 按鈕；已三層時 Disabled | Disabled + Tooltip：「最多設定三層分類」 |
| 「刪除」按鈕（節點）| 紅色 icon | 點擊 → 確認 Dialog |
| 顯示/隱藏 Switch（節點）| `<el-switch>` | 切換後即時 PATCH API；前台分類選單即時反應 |
| 分類編輯 Drawer | 600px 寬；從右側滑入 | 不跳頁，分類樹保持可見；X 按鈕 / ESC 關閉 |
| 分類圖片上傳 | 矩形區域（600×300px 建議尺寸）| 呼叫媒體庫 API |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Empty | 無任何分類 | 空狀態插圖 + Copy 如上 |
| Loading | 載入分類樹 | 3 列 Skeleton loader（縮排結構）|
| Default | 有分類資料 | 分類樹 |
| Drawer 開啟（編輯）| 點擊節點「編輯」 | 右側 Drawer 滑入，表單預填現有分類資料 |
| Drawer 開啟（新增）| 點擊「+ 新增根分類」或節點「+ 子分類」 | 右側 Drawer 滑入，空白表單 |
| 拖曳中 | 拖曳分類節點 | 被拖曳項目半透明；有效放置目標高亮 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「+ 新增根分類」 | 右側 Drawer 開啟（新增模式，空白表單）|
| 點擊節點「編輯」 | 右側 Drawer 開啟（編輯模式，預填資料）|
| 點擊節點「+ 子分類」 | 右側 Drawer 開啟（新增子分類模式）|
| 點擊節點「刪除」 | 確認 Dialog 開啟 |
| 拖曳節點到同層新位置 | 松手後 PATCH 排序 API；Toast 確認 |
| 嘗試跨層拖曳 | 節點恢復原位；Toast 警告 |
| Drawer 點擊「儲存」 | POST / PATCH 分類 API；成功後 Drawer 關閉；Toast；分類樹節點即時更新 |

#### Motion / Transition

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| 分類 Drawer 開啟 | 從右側 Slide in | 250ms | ease-in-out |
| 分類 Drawer 關閉 | 向右 Slide out | 200ms | ease-in |
| 分類樹節點展開 | Expand（height animation）| 200ms | ease-out |

---

### Screen 5：庫存管理

**Purpose:** 讓管理員統覽所有產品/SKU 庫存、Inline 調整數量並記錄原因，同時管理消費者的貨到通知訂閱。
**Entry points:** 左側導覽點擊「庫存管理」。
**Primary user goal:** 快速找到低庫存產品，直接在列表中調整庫存數量。

#### Information Hierarchy

```
H1 (most prominent): 庫存管理
Breadcrumb: 產品中心 > 庫存管理
Tab bar: 全部產品 / ⚠ 低庫存（{N}）/ 售完（{N}）/ 貨到通知管理
Search: 搜尋產品名稱
Main content: 庫存表格（可展開各 SKU）
```

#### Actual Copy

**Page / Section Headings**
- Page title: `庫存管理`
- Breadcrumb: `產品中心 > 庫存管理`
- Tab 1: `全部產品`
- Tab 2: `⚠ 低庫存（{N}）`
- Tab 3: `售完（{N}）`
- Tab 4: `貨到通知管理`
- 調整日誌 Drawer 標題: `庫存調整紀錄 — {產品名稱} · {SKU 規格}`

**Button Labels**
- 查看紀錄 (per row): `調整紀錄`
- Inline 編輯確認 icon: （確認 ✓）
- Inline 編輯取消 icon: （取消 ×）
- 手動發送貨到通知: `發送通知`（已通知者顯示為 Disabled）
- 匯出訂閱清單: `匯出 CSV`

**Form Fields（Inline 編輯）**
| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 新庫存數量 | {目前庫存值} | 按 Enter 確認，Esc 取消 | 庫存數量不得為負數 |
| 調整備註 | 填寫調整原因（選填） | 備註將記錄於調整日誌 | — |

**Empty States**

*全部產品 Tab：*
- Headline: `還沒有任何產品`
- Subtext: `新增產品後，庫存資訊會顯示在這裡`
- CTA label: `前往新增產品`

*低庫存 Tab：*
- Headline: `目前沒有低庫存產品`
- Subtext: `所有產品的庫存量都在安全範圍內`
- CTA label: （無 CTA）

*售完 Tab：*
- Headline: `目前沒有售完的產品`
- Subtext: `所有產品都有可用庫存`
- CTA label: （無 CTA）

*貨到通知管理 Tab：*
- Headline: `目前沒有消費者訂閱貨到通知`
- Subtext: `當消費者在缺貨產品頁點擊「貨到通知我」，訂閱資訊會顯示在這裡`
- CTA label: （無 CTA）

**Error States**
| Error condition | Message shown to user |
|---|---|
| 庫存更新失敗 | `庫存更新失敗，請再試一次。` |
| 貨到通知發送失敗 | `通知發送失敗，請稍後再試或聯繫客服。` |

**Loading State**
- Loading text: Skeleton loader（5 列展開結構）

**Status Labels（庫存狀態）**
| Status key | Display text | Colour semantic |
|---|---|---|
| normal | 正常庫存 | Neutral |
| low_stock | ⚠ {N}（低庫存）| Danger（`#F56C6C`，紅）|
| out_of_stock | 0（售完）| Danger（`#F56C6C`，紅）|

**Status Labels（貨到通知）**
| Status key | Display text | Colour semantic |
|---|---|---|
| pending | 待通知 | Warning（黃）|
| auto_notified | 已自動通知 | Success（綠）|
| manual_marked | 已手動標記 | Info（藍）|

**System Confirmation（設庫存為 0）**
```
標題：確定將庫存設為 0？
說明：庫存設為 0 後，前台產品頁將顯示「售完」，消費者將無法將此產品加入購物車。
按鈕：[取消]  [確定設為 0]（Danger）
```

**Toast / Notification Messages**
| Trigger | Message |
|---|---|
| Inline 編輯成功 | `庫存已從 {A} 更新為 {B}，調整紀錄已儲存。` |
| 手動發送貨到通知成功 | `已向 {N} 位訂閱者發送貨到通知 Email。` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Tab 列 | 4 個 Tab；低庫存 Tab 顯示紅色數量 Badge | 點擊切換篩選 |
| 搜尋框 | `<el-input>` 產品名稱搜尋 | debounce 300ms 過濾 |
| 庫存表格 | 欄位：展開箭頭 / 產品名稱（或 SKU 規格）/ 現有庫存 / 低庫存閾值 / 操作 | 點擊展開箭頭顯示各 SKU 列 |
| 低庫存警示 | 庫存數字前顯示 `⚠`；文字色 `#F56C6C` | 靜態 |
| Inline 編輯（點擊庫存數字）| 顯示 `<el-input-number>` + 備註 Input + 確認/取消 icon | 按 Enter 確認；按 Esc 取消；min=0 |
| 「調整紀錄」Button | 每行最右側；文字按鈕 | 點擊 → 右側 Drawer 開啟（顯示 `stock_adjustment_logs`）|
| 調整日誌 Drawer | 600px 寬；表格呈現：時間/調整前後數量/操作人員/備註 | 只讀；X 按鈕關閉 |
| 貨到通知列表 | 產品名稱 / 訂閱人數 / 通知狀態 / 操作 | 點擊產品名稱展開訂閱者清單 |
| 訂閱者清單（展開）| Email / 訂閱時間 | 只讀 |
| 「發送通知」Button | 已通知者 Disabled | Disabled Tooltip：`已發送過通知` |
| 「匯出 CSV」Button | Secondary；icon: download | 點擊 → 下載該產品訂閱者名單 CSV |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 有庫存資料，全部產品 Tab | 庫存表格 |
| Loading | 資料載入中 | 5 列 Skeleton loader |
| Empty（全部）| 無產品 | 空狀態插圖 + Copy 如上 + CTA |
| Empty（低庫存）| 無低庫存 SKU | 空狀態插圖 + Copy 如上（無 CTA）|
| Empty（售完）| 無庫存=0 SKU | 空狀態插圖 + Copy 如上（無 CTA）|
| Empty（貨到通知）| 無訂閱者 | 空狀態插圖 + Copy 如上（無 CTA）|
| Inline 編輯中 | 點擊庫存數字後 | 該格顯示輸入框 + 備註 + 確認/取消 |
| 設庫存為 0 確認 | 輸入 0 後按 Enter | 確認 Modal 出現 |
| Drawer 開啟（調整日誌）| 點擊「調整紀錄」| 右側 Drawer 滑入，顯示日誌表格 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「⚠ 低庫存」Tab | 篩選顯示所有庫存≤閾值的 SKU |
| 點擊展開箭頭（產品列）| 展開顯示各 SKU 的獨立庫存列 |
| 點擊庫存數字 | 進入 Inline 編輯模式 |
| 按 Enter 確認庫存（非 0）| PATCH /api/v1/skus/:id/stock → Toast → 表格即時更新 |
| 按 Enter 確認庫存（= 0）| 確認 Modal 出現 → 確認後執行 |
| 按 Esc | 取消編輯，恢復原值 |
| 點擊「調整紀錄」 | 右側 Drawer 開啟（唯讀日誌）|
| 點擊貨到通知產品名稱 | 展開訂閱者清單 |
| 點擊「發送通知」 | 確認後發送 Email；Toast 確認；通知狀態更新 |
| 點擊「匯出 CSV」 | 下載訂閱者名單 CSV |

---

### Screen 6：CSV 批次匯入（Dialog）

**Purpose:** 讓管理員批次匯入大量產品，支援新增和更新模式，並提供清楚的錯誤報告。
**Entry points:** 產品列表頁點擊「批次匯入」。
**Primary user goal:** 上傳 CSV 後確認匯入，了解有多少筆成功、哪些有問題。

#### Information Hierarchy

```
步驟 1:
  H1: 批次匯入產品
  Secondary action: 下載 CSV 模板
  Main content: 拖放上傳區 + 模式選擇
  Primary CTA: 下一步：驗證資料

步驟 2:
  H1: 驗證結果
  Main content: 匯入摘要 + 錯誤明細
  Secondary action: 下載錯誤報告（CSV）
  Primary CTA: 確認匯入（跳過 {K} 筆錯誤）

步驟 3:
  H1: 匯入完成
  Main content: 成功圖示 + 匯入數量
  Primary CTA: 查看已匯入產品
  Secondary CTA: 關閉
```

#### Actual Copy

**Dialog Titles（各步驟）**
- Step 1: `批次匯入產品`
- Step 2: `驗證結果`
- Step 3: `匯入完成`

**Step 1 — Button Labels & Copy**
- 模板下載 Button: `下載 CSV 模板`
- 拖放區主文字: `將 CSV 檔案拖放至此，或點擊選擇檔案`
- 拖放區次文字: `支援 .csv 格式，檔案大小上限 10MB`
- 拖放區 drag-over 狀態: `放開即上傳`
- 模式選擇標籤: `匯入模式`
- Radio 選項 1: `新增模式` — 說明：`將所有資料作為全新產品新增，SKU 編號重複時會報錯`
- Radio 選項 2: `更新模式` — 說明：`依 SKU 編號比對，自動新增不存在的產品並更新已存在的產品`
- 下一步 Button: `下一步：驗證資料`

**Step 2 — Validation Result Copy**
- 摘要行（成功）: `✅ 可匯入 {N} 筆`
- 摘要行（錯誤）: `❌ 格式有誤 {K} 筆（將略過）`
- 錯誤表格標題: `錯誤明細`
- 錯誤表格欄位: `列號` / `錯誤原因` / `產品名稱`
- 展開更多: `展開查看全部 {K} 筆錯誤`
- 收合: `收合`

**Step 2 — Button Labels**
- Download error report: `下載錯誤報告（CSV）`
- Confirm import: `確認匯入（跳過 {K} 筆錯誤）`（若無錯誤：`確認匯入`）
- Cancel: `取消`

**Step 3 — Completion Copy**
- 成功文字: `成功匯入 {N} 件產品！`
- 說明（若有略過）: `另有 {K} 筆因格式錯誤已略過，可下載錯誤報告查看詳情。`
- View button: `查看已匯入產品`
- Close button: `關閉`

**Error States（格式/大小驗證）**
| Error condition | Message shown to user |
|---|---|
| 非 .csv 格式 | `請上傳 .csv 格式的檔案` |
| 檔案超過 10MB | `檔案大小超過 10MB，請分批上傳或壓縮後重試` |
| CSV 檔案無資料 | `此 CSV 檔案沒有任何資料，請確認內容後重新上傳` |

**Loading State**
- 驗證中文字: `正在驗證資料，請稍候…`
- 驗證進度: Skeleton loader（在 < 3 秒時不顯示文字）

**Toast / Notification Messages**
| Trigger | Message |
|---|---|
| 匯入完成（無錯誤）| `批次匯入完成！已成功匯入 {N} 件產品。` |
| 匯入完成（有略過）| `批次匯入完成。{N} 件產品已匯入，{K} 件因格式錯誤已略過。可下載錯誤報告查看詳情。` |

**Common Error Row Messages（錯誤明細範例）**
| 錯誤類型 | 顯示文字 |
|---|---|
| 售價欄位為空 | `售價欄位不得為空` |
| 分類不存在 | `分類「{名稱}」不存在，請先在後台建立此分類` |
| SKU 編號重複（新增模式）| `SKU 編號「{code}」已存在，新增模式不允許重複 SKU` |
| 庫存數量非整數 | `庫存數量必須為 0 以上的整數` |
| 售價格式錯誤 | `售價必須為數字` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Dialog 容器 | 720px 寬；三步驟 Stepper 頂部顯示進度 | ESC 關閉（步驟 1 可關閉）；步驟 2/3 僅按鈕關閉 |
| 步驟指示器（Stepper）| 上傳 → 驗證 → 完成；當前步驟高亮 | 靜態顯示，不可點擊跳步 |
| 「下載 CSV 模板」Button | Secondary；下載 icon | 點擊下載模板 CSV 檔案 |
| 拖放上傳區 | 虛線外框；雲朵 + 箭頭 icon；限 .csv；10MB | 拖曳進入：框線高亮 + 「放開即上傳」；點擊 → 原生 file picker；上傳後顯示檔名 |
| 模式選擇 Radio Group | 兩個選項；各附說明文字；預設選項 1 | 單選 |
| 「下一步」Button | Primary；disabled 在未選檔案時 | 觸發檔案驗證 API |
| 驗證中 Loading | Dialog 主區域：Skeleton + 文字 | > 3 秒後顯示等待文字 |
| 驗證摘要列 | ✅ / ❌ 圖示 + 數量文字 | 靜態 |
| 錯誤明細表格 | 3 欄；預設顯示前 5 筆 | 「展開查看全部」展開全部列 |
| 「下載錯誤報告」Button | Secondary；下載 icon | 下載錯誤明細 CSV |
| 「確認匯入」Button | Primary；括號說明略過數 | 點擊執行批次匯入 Job |
| 成功圖示 | 大型綠色勾勾 icon | 靜態 |
| 「查看已匯入產品」Button | Primary | 關閉 Dialog → 產品列表頁篩選顯示剛匯入產品 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 步驟 1（初始）| Dialog 開啟 | 模板下載 + 拖放區 + 模式選擇 |
| 步驟 1（已選檔）| 上傳 / 拖放檔案後 | 拖放區顯示檔名 + 大小；「下一步」按鈕啟用 |
| Drag-over | 拖曳 CSV 至上傳區上方 | 上傳區框線變藍色高亮 + 「放開即上傳」 |
| 驗證中 | 點擊「下一步」後 | Skeleton loader + 等待文字（>3s）|
| 步驟 2（有錯誤）| 驗證完成，有錯誤列 | 摘要（成功N/錯誤K）+ 錯誤表格 |
| 步驟 2（全部通過）| 驗證完成，無錯誤 | 摘要（全部可匯入）+ 「確認匯入」（無括號說明）|
| 格式錯誤 | 非 .csv 或超過 10MB | 拖放區顯示紅色邊框 + 錯誤訊息 |
| 步驟 3（完成）| 匯入 Job 完成 | 成功圖示 + 數量 + 兩個 CTA |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「下載 CSV 模板」 | 下載 products_import_template.csv |
| 拖放 CSV 檔案 | 檔案驗證（格式/大小）→ 顯示檔名或錯誤 |
| 點擊上傳區 | 開啟原生 file picker |
| 點擊「下一步」 | POST /api/v1/products/import/validate → 切換至步驟 2 |
| 點擊「確認匯入」 | POST /api/v1/products/import/confirm → 步驟 3 |
| 點擊「查看已匯入產品」 | 關閉 Dialog → 產品列表（已篩選剛匯入批次）|
| 點擊「展開查看全部」 | 錯誤表格展開顯示所有錯誤列 |

#### Motion / Transition

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| Dialog 開啟 | Fade in + scale from 95% | 250ms | ease-out |
| 步驟切換（1→2→3）| 水平 Slide（舊內容向左，新內容從右進入）| 300ms | ease-in-out |
| 拖放 hover | 邊框顏色過渡至高亮藍 | 150ms | ease-out |

---

### Screen 7：產品設定

**Purpose:** 讓管理員在同一頁設定產品中心的全域預設值，避免每次新增產品都要重複填寫相同的基礎設定。
**Entry points:** 左側導覽點擊「設定」。
**Primary user goal:** 設定全局低庫存警示閾值；設定新產品的預設狀態與 URL 格式；確認貨到通知觸發條件。

> 📌 來源：PRD §6.2（進階設定全域預設）+ §6.5（低庫存通知靜默期）；原散落於各功能說明文字，此 Screen 集中管理。

#### Information Hierarchy

```
H1 (most prominent): 產品設定
Primary CTA: 儲存設定（右上角 + 頁底各一）
Main content: 三個設定區塊（低庫存警示 / 新產品預設 / 貨到通知）
```

#### Actual Copy

**Page / Section Headings**
- Page title: `產品設定`
- Breadcrumb: `產品中心 > 設定`
- Section 1: `低庫存警示設定`
- Section 2: `新產品預設設定`
- Section 3: `貨到通知設定`

**Button Labels**
- Save: `儲存設定`
- Saving state: `儲存中…`

**Form Field Labels & Placeholders**

| 欄位 | Label | Placeholder / 預設值 | Helper text |
|---|---|---|---|
| 全局低庫存閾值 | 全局低庫存閾值 | — | 預設 `5`；低於此數量的 SKU 將觸發補貨通知 Email |
| 通知靜默期 | 通知靜默期 | — | 預設「7 天」；同一 SKU 觸發通知後幾天內不重複發送 |
| 通知寄送對象 | 通知寄送對象 | — | 唯讀；顯示目前管理員 Email；連結至全域設定 |
| 新產品預設狀態 | 新產品預設狀態 | — | Radio：草稿（預設）/ 直接上架 |
| 產品 URL Slug 格式 | 產品 URL Slug 格式 | — | Select：產品名稱 / 產品 ID / 產品名稱 + ID |
| Slug 預覽 | — | — | 即時預覽：`https://domain.com/products/{範例}` |
| 貨到通知觸發條件 | 通知觸發條件 | — | Radio：庫存從 0 補貨（預設）/ 庫存超過低庫存閾值 |
| 通知 Email 範本 | 通知 Email 範本 | — | 唯讀預覽；連結至全域設定 > 發信系統 > Email 範本管理 |

**Toast Messages**
- Save success: `設定已儲存`

**Cross-link copy**
- 通知信箱連結: `全域設定 > 電商進階設定 > 通知信箱`
- Email 範本連結: `全域設定 > 發信系統 > Email 範本管理`

#### Component List

| 元件名稱 | 規格/變體 | 互動行為 |
|---|---|---|
| 全局低庫存閾值 | `<el-input-number>` min=0 max=9999；預設 5；suffix「件」 | 直接輸入或 +/- 調整；儲存時寫入全域設定 |
| 通知靜默期 Select | `<el-select>`；選項：3天 / 7天（預設）/ 14天 / 30天 | 選擇後儲存時生效 |
| 通知寄送對象 | 唯讀 Input；顯示管理員 Email | 不可編輯；文字連結跳至全域設定 |
| 新產品預設狀態 | `<el-radio-group>`；草稿 / 直接上架 | 影響每次新增產品的初始 status 值 |
| Slug 格式 Select | `<el-select>`；三個選項 | 選擇後即時更新下方 Slug 預覽 |
| Slug 預覽 | 靜態文字（灰底區塊）| 隨 Select 選項即時變化 |
| 貨到通知觸發條件 | `<el-radio-group>`；兩個選項 | 決定系統何時自動批次發送貨到通知 Email |
| Email 範本預覽 | 唯讀灰底文字區塊 | 顯示範本主旨 + 內文摘要；文字連結跳至全域設定 |
| 儲存設定 Button | Primary；`!rounded-none`；右上角 + 頁底各一 | 點擊 → 所有 Section 設定一次寫入；顯示 Loading → Toast success |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 正常載入，顯示目前設定值 | 三個 Section 展開顯示；Slug 預覽即時顯示 |
| Saving | 點擊「儲存設定」 | 按鈕 disabled + 文字改為「儲存中…」|
| Save success | 儲存完成 | Toast：`設定已儲存`（success 綠色，3 秒消失）|
| Save error | API 回傳錯誤 | Toast：`儲存失敗，請重試`（error 紅色）|

#### Interaction Annotations

- 通知寄送對象欄位：唯讀，點擊藍色連結文字跳至「全域設定 > 電商進階設定 > 通知信箱」（另開或 SPA 跳頁）
- Slug 格式 Select 變更 → 下方 Slug 預覽文字即時更新（無需儲存）
- Email 範本連結文字跳至「全域設定 > 發信系統 > Email 範本管理」
- 頂部和頁底各一個「儲存設定」Button，觸發同一 handler
- 每個 Section 設定值為頁面載入時從後端讀取，儲存時一次 PATCH `/api/v1/settings/product`

---

## Part 4 — Cross-Screen Component Inventory

### Action Components

| 元件 | 變體 | 尺寸 | 狀態 |
|---|---|---|---|
| Button | Primary（`#303133`）/ Secondary / Ghost / Destructive（`#F56C6C`）| Default（中）/ Large（頁面主 CTA）/ Small（表格操作）| Default / Hover / Active / Disabled / Loading |
| Icon Button | Default / Danger | 32×32px | Default / Hover / Active / Disabled |
| Dropdown Button | `<el-dropdown>` | Default | Default / Open / Disabled |
| Toggle Switch | Default / Locked（進階方案鎖定）| — | On / Off / Disabled |

### Display Components

| 元件 | 變體 | 資料欄位 | 狀態 |
|---|---|---|---|
| Status Tag | Published（綠）/ Unpublished（灰）/ Draft（黃）/ Scheduled（藍）/ Low-stock（紅）| 文字標籤 | — |
| Product Thumbnail | 48×48 / 200×200（建立頁預覽）| 圖片 URL；無圖時佔位 icon | Default / Loading / Error |
| SKU Matrix Table Row | Default / Inactive（已停用 SKU）| SKU 編號/售價/特價/庫存/重量/啟用 Toggle | Default / Editing / Error |
| Data Read-only Card | 編輯頁唯讀數據 | 建立時間/修改時間/銷售量/PV | Static |
| PV/UV Line Chart | 折線圖 | X: 日期，Y: PV/UV | Default / Hover tooltip |

### Input Components

| 元件 | 變體 | 狀態 |
|---|---|---|
| Text Input | Default / With prefix / With suffix / With character count / With clear button | Default / Focus / Filled / Error / Disabled |
| Textarea | Default / With character count | Default / Focus / Filled / Error / Disabled |
| Number Input | Default / With prefix（NT$）/ With suffix（公斤）| Default / Focus / Filled / Error（< min）/ Disabled |
| Select（Single）| Default / With indent（分類三層縮排）| Default / Open / Selected / Disabled |
| Select（Multi）| Default | Default / Open / Selected / Disabled |
| Tree Select | 三層分類樹，多選 | Default / Open / Selected |
| Radio Group | Default（含說明文字）| Unselected / Selected / Disabled |
| Date-Time Picker | Default | Default / Open / Selected / Error |
| Rich Text Editor | 完整工具列 | Default / Focus |
| Tag Input | 動態 Tag 新增（Enter 確認）| Default / Tag added / Tag hover / Tag delete / Max reached |
| File Upload（圖片）| 正方形拖放 / 矩形拖放 / 橫向縮圖列表 | Default / Drag-over / Uploading（含進度條）/ Complete / Error |
| File Upload（CSV）| 拖放區 | Default / Drag-over / File selected / Error |

### Navigation Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Sidebar | Expanded（240px）/ Collapsed（60px）| 左側固定導覽；產品管理群組（產品管理/分類/庫存）|
| Breadcrumb | Text links + separator | 最多 4 層；最後一層不可點擊 |
| Tab Bar | Underline tabs | 庫存管理頁使用；支援 Badge（低庫存數量）|
| Step Indicator | Horizontal stepper | CSV 匯入 Dialog 內使用（3 步驟）|

### Feedback Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Toast（`<el-message>`）| Success（綠）/ Error（紅）/ Warning（黃）/ Info（藍）| 成功/資訊 3 秒自動消失；錯誤需手動關閉 |
| Modal（確認對話框）| Danger（刪除/不可逆）/ Warning（帶選項，如分類刪除）| 400px；僅按鈕關閉；focus trap |
| Large Dialog | Default（多步驟流程）| 720px；CSV 匯入使用；步驟 1 可 ESC 關閉 |
| Drawer | Right panel | 600px；分類編輯 / 庫存調整日誌；Slide in from right |
| Empty State | Full-page / In-table / In-tab | 每個情境有對應 Headline + Subtext + CTA（或無 CTA） |
| Loading Skeleton | Table rows / Form layout / Tree structure | 與最終內容結構一致的灰色佔位區塊 |
| Tooltip | Default | 按鈕說明 / 欄位 Helper（`<el-tooltip>`）|
| Progress Bar | Linear | 圖片上傳進度（Inline 於上傳區域內）|

---

## Part 5 — Design System Token Reference

| Decision | Token / Value |
|---|---|
| Primary button background | `#303133` |
| Primary interactive / link / info | `#409EFF` |
| Success / Published | `#67C23A` |
| Warning / Draft | `#E6A23C` |
| Danger / Error / Low-stock | `#F56C6C` |
| Neutral / Unpublished / Disabled text | `#909399` |
| Border colour | `#DCDFE6` |
| Background（頁面）| `#F2F3F5` |
| Surface（卡片/表格）| `#FFFFFF` |
| Button border-radius | `0px`（`!rounded-none`）|
| Tag border-radius | `9999px`（`!rounded-full`）|
| Spacing unit | 4px grid |
| Default font size | 14px |
| Heading（H1）| 28px，`font-weight: 600` |
| Heading（H2 / 區塊標題）| 16px，`font-weight: 600` |
| Table row height | 56px |

> ✏️ Copy 待確認：品牌字型尚未指定，請確認後更新 Figma Library。

---

## Assumptions

> 📌 假設：頁面語言為繁體中文；所有 Button 使用動詞開頭（如「新增產品」而非「產品新增」）。

> 📌 假設：後台整體最小解析度為 1280px，行動裝置後台不做響應式支援；前台消費者頁面另行設計。

> 📌 假設：左側導覽「產品中心」群組包含產品管理、產品分類、庫存管理三個項目，展開/收合為群組行為，與其他後台模組群組（訂單管理、行銷活動等）並列。

> 📌 假設：CSV 匯入後，「查看已匯入產品」功能透過批次匯入 ID 篩選產品列表，顯示剛匯入的產品集合。

> 📌 假設：產品數據折線圖（Screen 3 / 編輯頁）使用 Element Plus Charts 或同等方案；若無圖表套件，替代方案為數字摘要卡（總 PV / 總 UV）。

> 📌 假設：SEO 預覽元件（模擬 Google 搜尋結果）為選填功能，若開發資源有限，可替換為純字元計數欄位。

> ✏️ Copy 待確認：「貨到通知」的中文文案（消費者側按鈕文字「貨到通知我」）需與前台頁面規格對齊，確認後更新本 Spec。

> ✏️ Copy 待確認：0元產品的「每人最大領取數量」是否計入訪客？PRD 中標記為待確認事項，UX 上建議強制登入才可領取（避免需要 fingerprint 去重的複雜邏輯）。

---

*文件結束 — 共 6 個畫面 · WCAG AA · Element Plus*
