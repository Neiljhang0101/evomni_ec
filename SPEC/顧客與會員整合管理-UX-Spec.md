# Evomni — 顧客與會員整合管理 Design Brief + UX Spec

> **Version:** 1.0
> **Created:** 2026-05-05
> **PRD Version:** v1.0（2026/05/04 Una）
> **螢幕數：** 3 個後台頁面
> **Downstream tools:** figma-generate-design · design:design-system · design:design-handoff · design:accessibility-review · design:design-critique

---

## Part 1 — Design Brief

### Product Vision

顧客與會員整合管理是 Evomni 後台「顧客 → 顧客管理」的核心頁面，將原本分散在 CMS 形象站與電商模組中的兩套資料（CMS `contacts` 表單聯絡人、電商 `members` 消費者）以 Email 為識別錨點合併呈現於同一介面。商家管理員不再需要切換兩個後台，即可看到每一位聯絡人從「初次詢問」到「電商購買」的完整旅程，並能精準區分「顧客」（CMS 表單聯絡，尚未成為電商會員）與「會員」（已通過電商會員驗證），進而針對仍是顧客的潛在族群主動寄出入會邀請，提升轉換率。

### Target User

**Primary:** 中小型電產品牌的後台管理員，同時負責 CMS 形象站維護與電商訂單管理，需要在單一介面掌握顧客全旅程以快速做出客服決策或分眾行銷。

### Design Goals

| # | Goal | How to test |
|---|---|---|
| 1 | 管理員能在列表頁一眼區分「顧客」與「會員」，無需點入詳情頁確認身分 | 請受測者說出某列是顧客還是會員，不得點擊任何按鈕，30 秒內正確率達 100% |
| 2 | 管理員能在 2 分鐘內完成篩選「所有純顧客」並批次匯出，無需查閱說明文件 | 計時並觀察是否使用正確篩選器（身分類型 → 顧客），不需提示 |
| 3 | 管理員進入顧客詳情頁後，能立即判斷此人是否有電商購買記錄，不需滾動超過 1 次 | 觀察受測者進入詳情頁後第一個說出的資訊是否包含「電商」或「訂單」相關判斷 |
| 4 | 管理員能在不閱讀任何說明文字的情況下找到並執行「寄送邀請加入會員信」動作 | 請受測者對一位「顧客」寄送邀請，觀察是否需要提示 |

### Design Principles

1. **身分一目了然** — Tag 顏色（顧客灰 / 會員藍）是最重要的視覺識別，出現在列表和詳情頁面的第一屏範圍內
2. **動態可見，非空殼** — 詳情頁依身分類型動態顯示區塊：純顧客不出現電商區塊，純會員不出現 CMS 歷程區塊；不出現空的灰色佔位區塊
3. **資料透明度 > 功能密度** — 合併計算說明、唯讀欄位標示、Tooltip 說明計算基準，優先於增加更多操作功能
4. **操作不可逆前先確認** — 黑名單、批次操作、邀請寄送均需確認步驟

### Design System Reference

- **Figma Library:** Evomni Admin Design System（與產品中心 / 會員管理後台共用）
- **Component framework:** Element Plus (Vue 3)
- **Icon set:** Element Plus 內建圖示 + Lucide Icons
- **Font:** Noto Sans TC

### Accessibility Requirements

- **Target WCAG level:** AA
- **Known constraints:**
  - 顧客（灰）/ 會員（藍）Tag 必須通過 4.5:1 對比度（`#606266` on white = 4.56:1 ✅；`#409EFF` on white = 2.63:1 ⚠️ — Tag 背景用淺藍 `#ECF5FF` 配文字 `#337ecc` 需驗證）
  - 批次操作列出現時需有 `aria-live="polite"` 公告已選筆數
  - 身分 Tag 不能僅靠顏色區分（需有文字「顧客」/「會員」）

### Hard Constraints

- ⚠️ 不設計電商前台的任何頁面（本模組只是後台管理視角）
- ⚠️ Email 欄位在詳情頁為唯讀，不提供編輯入口（Email 是識別錨點）
- ⚠️ 不設計任何金流或交易頁面，訂單記錄只是「列表 + 連結至訂單管理」
- ⚠️ 不使用「用戶」「客戶」術語，系統內全面使用「顧客」「會員」

### Out of Scope

- 電商前台會員個人中心（屬 Part 7）
- 分眾行銷優惠券發送流程（屬 Part 4，批次發券僅顯示入口）
- 點數手動調整操作（屬 Part 6 §6.7）
- 黑名單操作詳細流程（屬 Part 6 §6.7）
- CMS 表單詳情（連結至 CMS 模組）

---

## Part 2 — Screen Index

| # | Screen Name | Navigation path | Primary user goal |
|---|---|---|---|
| 1 | 整合顧客列表頁 | 側邊欄「顧客」→「顧客管理」| 瀏覽、搜尋、篩選所有顧客與會員，識別身分類型，進行批次操作 |
| 2 | 顧客詳情頁 | 列表點擊「查看」→ `/members/:id` | 查看單一聯絡人的完整資料（CMS 互動歷程 + 電商購買記錄），進行編輯或邀請 |
| 3 | 顧客管理設定頁 | 側邊欄「顧客」→「設定」→ `/members/settings` | 自訂列表顯示欄位與預設排序 |

---

## Part 3 — Per-Screen UX Spec

---

### Screen 1: 整合顧客列表頁

**Purpose:** 以單一合併列表顯示所有 CMS 顧客與電商會員，讓管理員能快速搜尋、篩選、識別身分，並進行批次操作或匯出。
**Entry points:** 側邊欄「顧客」→「顧客管理」（主要）；儀表板快速入口
**Primary user goal:** 找到特定顧客/會員或篩選出目標族群

#### Information Hierarchy

```
H1 (most prominent): 顧客管理
H2 (secondary): 篩選區塊（關鍵字 / 標籤 / 狀態 / 身分類型 / 日期）
Primary CTA: 搜尋
Secondary CTA: 匯出全部 / 匯入
Supporting info: 列表資料（Email、姓名、電話、身分 Tag、加入日期、標籤、操作）
Info icon: 合併計算說明（右上角）
```

#### Actual Copy

**Page / Section Headings**
- Page title: `顧客管理`
- Breadcrumb: `顧客 / 顧客管理`
- Filter section: （無標題，直接呈現篩選器）
- 批次操作列（勾選後出現）: `已選 N 筆`

**Button Labels**
- Primary search: `搜尋`
- Clear filters: `清除`
- Export all: `匯出全部`
- Import: `匯入`
- Row action: `查看`
- Batch action 1: `加標籤`
- Batch action 2: `匯出已選`
- Batch action 3（進階方案）: `發送優惠券`
- Cancel batch: `取消選取`

**Form Fields — 篩選區**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| （無 label，關鍵字搜尋） | `請輸入姓名、Email、電話或公司名稱` | — | — |
| 標籤 | `請選擇標籤` | — | — |
| 狀態 | `請選擇狀態` | — | — |
| 身分類型 | `全部` | — | — |
| 起始日期 | `開始日期` | — | — |
| 結束日期 | `結束日期` | — | — |

**Dropdown 選項**

狀態篩選：`全部` / `正常` / `停用` / `黑名單`

身分類型篩選：`全部` / `顧客`（僅 CMS 表單聯絡人）/ `會員`（有電商帳號）

**Empty State（無任何資料，初始狀態）**
- Headline: `尚未有任何顧客或會員資料`
- Subtext: `您的 CMS 表單聯絡人與電商會員將整合顯示於此。開始接收 CMS 表單或邀請顧客加入電商會員後，記錄將自動出現。`
- CTA label: （無 CTA，純提示）

**Empty State（篩選後無符合結果）**
- Headline: `找不到符合條件的記錄`
- Subtext: `請調整篩選條件或關鍵字後再試`
- CTA label: `清除篩選條件`

**Empty State（搜尋關鍵字無結果）**
- Headline: `找不到符合「{{keyword}}」的記錄`
- Subtext: `請確認關鍵字拼寫，或嘗試使用 Email 搜尋`
- CTA label: `清除搜尋`

**Error States**

| Error condition | Message shown to user |
|---|---|
| API / 網路連線失敗 | `載入資料時發生錯誤，請重新整理頁面。若問題持續，請聯繫系統管理員。` + `重新整理`按鈕 |
| 批次操作失敗 | `操作失敗，請稍後再試` |
| 匯出觸發失敗 | `匯出請求失敗，請稍後再試` |

**Loading State**
- 列表區：Skeleton loader，每列呈現灰色條塊，模擬 8 列資料（含 checkbox、Email、姓名等欄位位置）
- Loading text: （無文字，僅 skeleton）

**Status Labels（身分 Tag）**

| Status key | Display text | Colour semantic |
|---|---|---|
| contact_only | `顧客` | Neutral / Info（灰 `#606266`，背景 `#F4F4F5`） |
| member | `會員` | Primary（藍 `#409EFF`，背景 `#ECF5FF`）|

**帳號狀態 Tag（詳情頁用，列表不顯示）**

| Status key | Display text | Colour semantic |
|---|---|---|
| active | `正常` | Success（綠） |
| suspended | `停用` | Neutral（灰） |
| blacklisted | `黑名單` | Danger（紅） |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 匯出按鈕點擊成功 | `報表產生中，完成後將寄送至您的信箱 📧` |
| 批次加標籤成功 | `已成功為 N 筆記錄加上標籤` |
| 批次匯出觸發成功 | `匯出請求已送出，完成後將寄送至您的信箱 📧` |

**Info Tooltip（右上角 ℹ 圖示）**

- Tooltip 內文: `同一 Email 在 CMS 顧客與電商會員中只計算一筆，身分以電商會員為優先。`

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 頁面標題 H1 | 字級 20px / fontWeight 700 | 靜態 |
| 關鍵字搜尋輸入框 | `el-input`，寬度 240px，prefix icon: Search | 輸入後按 Enter 或點擊「搜尋」觸發查詢 |
| 標籤多選下拉 | `el-select multiple`，寬度 160px | 可多選；顯示已選標籤 chips |
| 狀態下拉 | `el-select`，寬度 120px | 單選 |
| 身分類型下拉 | `el-select`，寬度 120px | 單選；預設「全部」 |
| 日期範圍選擇器 | `el-date-picker type="daterange"` | 選取開始/結束日期 |
| 清除按鈕 | `el-button`，plain | 清除所有篩選條件，不觸發搜尋 |
| 搜尋按鈕 | `el-button type="primary"` | 觸發搜尋查詢 |
| 匯出全部按鈕 | `el-button type="primary"` | 觸發非同步匯出，Toast 提示 |
| 匯入按鈕 | `el-button`（白底） | 開啟 CSV 匯入對話框（Dialog） |
| ℹ 合併說明圖示 | Lucide `Info` 16px，color `#909399` | Hover 顯示 Tooltip |
| 資料表格 | `el-table` | 可點擊欄位排序（Email/姓名/加入日期/最後登入日期）；行 Hover 高亮 |
| Checkbox（全選/單選） | `el-checkbox` | 全選/取消全選；勾選後出現批次操作列 |
| 身分 Tag | `el-tag`，`class="!rounded-full"`，size="small" | 靜態顯示；`type="info"`（顧客）/ `type="primary"`（會員） |
| 標籤欄 Tag | `el-tag` size="small"，最多顯示 2 個 | 超過 2 個顯示 `+N`；Hover 顯示全部標籤 Tooltip |
| 操作欄「查看」連結 | `color: #409EFF`，font-size 14px | 點擊進入顧客詳情頁 |
| 批次操作列 | Sticky top bar（已選 N 筆 + 操作按鈕） | 勾選任一列後浮現；取消選取後隱藏 |
| 進階方案鎖定提示（發送優惠券） | `el-tooltip` disabled 按鈕 | Hover tooltip: `此功能需升級至進階電商包` |
| 分頁器 | `el-pagination`，layout="total, prev, pager, next, sizes" | 每頁 20/50/100 筆切換 |
| Loading Skeleton | 8 列 skeleton 條塊 | 資料載入時呈現 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default（有資料）| 正常載入，合併查詢回傳結果 | 列表顯示所有顧客與會員，預設按加入日期由新至舊 |
| Empty（無任何資料）| 帳號從未有表單提交或會員 | 頁面中央顯示 Empty State（上方說明文字）|
| Empty（篩選無結果）| 套用篩選後無符合記錄 | 表格區顯示「找不到符合條件的記錄」+ `清除篩選條件` |
| Empty（搜尋無結果）| 關鍵字搜尋後無符合記錄 | 表格區顯示「找不到符合「{{keyword}}」的記錄」 |
| Loading | 首次載入或篩選/搜尋查詢中 | 表格區呈現 8 列 Skeleton loader |
| Error | API 連線失敗 | 表格區隱藏，顯示錯誤訊息 + `重新整理` 按鈕 |
| 批次選取中 | 已勾選至少 1 筆 | 頁面頂部出現批次操作列：「已選 N 筆 ＋ 操作按鈕群」|
| 進階方案限制 | 啟航方案帳號，發送優惠券按鈕 | 按鈕 Disabled + Hover tooltip 提示升級 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「查看」/ 點擊 Email 欄位 | 導航至 Screen 2：顧客詳情頁（`/members/:id`）|
| 點擊欄位標題（可排序欄）| 切換排序方向（升/降序），箭頭圖示更新 |
| 勾選 Checkbox（任一列）| 出現批次操作列，顯示「已選 N 筆」 |
| 點擊批次操作列「取消選取」| 清除所有勾選，批次操作列消失 |
| 點擊「清除」按鈕 | 清除所有篩選條件（不觸發查詢）|
| 點擊「搜尋」按鈕 | 觸發搜尋/篩選查詢，表格刷新 |
| 點擊「匯出全部」| Toast「報表產生中，完成後將寄送至您的信箱 📧」|
| 點擊「匯入」| 開啟 CSV 匯入 Dialog |
| Hover ℹ 圖示 | 顯示 Tooltip：「同一 Email 在 CMS 顧客與電商會員中只計算一筆...」|
| Hover 標籤欄有 `+N` | 顯示所有標籤的 Tooltip |
| 標籤欄位超過 2 個 tag | 第 3 個起顯示為 `+N`（N = 超出數量）|

#### Motion / Transition

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| 批次操作列出現 | 從頁面頂部 Slide down + fade in | 200ms | ease-out |
| 批次操作列消失 | Slide up + fade out | 150ms | ease-in |
| Skeleton → 資料 | Fade in | 200ms | ease-out |

---

### Screen 2: 顧客詳情頁

**Purpose:** 顯示單一聯絡人的完整資料，依其身分類型（顧客 / 會員 / 顧客轉會員）動態呈現 CMS 互動歷程與電商購買記錄，支援編輯、標籤管理、備註，以及針對純顧客發送入會邀請。
**Entry points:** Screen 1 列表點擊「查看」或 Email 欄位
**Primary user goal:** 快速掌握此聯絡人的完整旅程，決定下一步行動（客服回覆 / 寄邀請 / 查看訂單）

#### Information Hierarchy

```
H1 (most prominent): [聯絡人姓名]（40px 頭像 + 姓名）
H2 (secondary): 身分 Tag + Email + 電話（Header 資訊區）
Primary CTA: 編輯基本資料 / 寄送邀請加入會員信（純顧客時）
Secondary CTA: 返回顧客管理
Supporting info: 六大區塊（基本資料 / 電商會員資訊 / 訂單記錄 / CMS 互動歷程 / 標籤管理 / 備註欄）
Tertiary: [黑名單操作]（次要危險操作）
```

#### Actual Copy

**Page / Section Headings**
- 返回連結: `← 返回顧客管理`
- Header 區塊: （無額外標題，直接顯示姓名+Tag+基本聯絡資料）
- 區塊一標題: `基本資料`
- 區塊二標題: `電商會員資訊`
- 區塊三標題: `訂單記錄`
- 區塊四標題: `CMS 互動歷程`
- 區塊五標題: `標籤管理`
- 區塊六標題: `內部備註`
- 邀請區塊標題: （無標題，卡片說明文字）

**Button Labels**
- Back: `← 返回顧客管理`
- Edit basic info: `編輯基本資料`
- Edit save: `儲存`
- Edit cancel: `取消`
- Send invite: `寄送邀請加入會員信`
- Save notes: `儲存備註`
- View all orders: `查看全部訂單 →`
- View points detail: `查看明細 →`
- View all CMS records: `查看全部 →`
- Add tag: `+ 新增標籤`
- Blacklist（危險操作）: `加入黑名單`（在電商會員資訊區塊內，依 Part 6 §6.7 設計）

**Form Fields — 基本資料（行內編輯模式）**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 姓名 | `請輸入聯絡人姓名` | — | `姓名不能為空` |
| Email | （唯讀，不可編輯）| `Email 為識別錨點，如需修改請聯繫工程師` | — |
| 電話 | `請輸入電話號碼` | — | — |
| 公司 | `請輸入公司名稱` | `CMS 表單填寫欄位；會員無此欄位可留空` | — |

**Form Fields — 內部備註**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| （無 label，區塊標題已說明） | `輸入內部備註，僅後台可見，不對顧客/會員顯示…` | `最後更新：{{date}} by {{admin_name}}` | — |

**Actual Field Labels（各區塊）**

區塊一 — 基本資料：
- `姓名` / `Email` / `電話` / `公司` / `加入來源`

加入來源範例文字：
- `CMS 聯絡表單（2026/02/15）`
- `電商前台自行註冊（2026/03/20）`
- `第三方登入 Google（2026/03/21）`

區塊二 — 電商會員資訊：
- `會員等級` / `點數餘額` / `累計消費` / `購買次數` / `最後購買日` / `帳號狀態` / `加入日期`

區塊二 Tooltip（Hover 數字）：
- 累計消費 Tooltip: `僅計算電商模組內的已完成訂單`
- 購買次數 Tooltip: `僅計算電商模組內的已完成訂單`

區塊三 — 訂單記錄欄位：`訂單編號` / `日期` / `金額` / `狀態`

區塊四 — CMS 互動歷程欄位：`時間` / `表單類型` / `內容摘要（前 50 字）`

**邀請加入會員區塊（純顧客才顯示）**
- 說明文字第一行: `此顧客尚未成為電商會員`
- 說明文字第二行: `寄送邀請信，引導顧客在電商前台完成會員申請。`
- 邀請信主旨（系統自動）: `[商店名稱] 邀請您加入會員，享受專屬優惠！`

**邀請冷卻中（7 天內已發送）**
- 按鈕狀態: Disabled
- Tooltip: `已於 {{N}} 天前寄出邀請，請等待 {{M}} 天後再次寄送`

**標籤管理區塊**
- 系統自動標籤說明: `系統自動標籤（唯讀）`
- 商家標籤說明: `商家自定義標籤（可新增/移除）`
- 新增標籤 placeholder: `選擇或輸入新標籤名稱`

**進階方案限制提示（會員等級，啟航方案）**
- 顯示文字: `升級進階電商包後可查看會員等級`

**Empty State（此顧客無訂單）**
- （區塊三不顯示，純顧客不出現此區塊）

**Empty State（區塊四，顧客無 CMS 表單記錄）**
- （若 contacts 無記錄則整個區塊四不顯示）

**Error States**

| Error condition | Message shown to user |
|---|---|
| 記錄 ID 不存在 | `找不到此顧客/會員記錄` + `返回顧客管理` 按鈕 |
| 詳情頁 API 失敗 | `載入顧客資料時發生錯誤，請重新整理頁面。` + `重新整理` 按鈕 |
| 儲存基本資料失敗 | `儲存失敗，請稍後再試` |
| 邀請信寄送失敗 | `邀請信寄送失敗，請稍後再試` |
| 備註儲存失敗 | `備註儲存失敗，請稍後再試` |

**Loading State**
- 頁面各區塊以 Skeleton 顯示：Header 區一個頭像 skeleton + 兩行文字 skeleton；各區塊以若干行 skeleton 代替

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 基本資料儲存成功 | `資料已更新` |
| 邀請信寄送成功 | `邀請信已寄出至 {{email}}` |
| 標籤新增成功 | `標籤已新增` |
| 標籤移除成功 | `標籤已移除` |
| 備註儲存成功 | `備註已儲存` |
| 備註儲存成功（備份自動附加邀請記錄）| （靜默，無額外 Toast） |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 返回連結 | `← 返回顧客管理`，color `#409EFF`，font-size 14px | 點擊返回 Screen 1 |
| 頭像圓形 | 40×40px，灰色背景，首字母 | 靜態 |
| 姓名文字 | font-size 20px，fontWeight 700 | 靜態 |
| 身分 Tag（Header 區）| 同 Screen 1 Tag 規格 | 靜態 |
| 自定義標籤 Tag（Header 區）| `el-tag`，size="small"，可為複數個 | 靜態顯示 |
| Email / 電話（Header 區）| font-size 14px，color `#606266` | 靜態 |
| 編輯基本資料按鈕 | `el-button`，plain | 點擊展開行內編輯 |
| 區塊容器（el-collapse）| `el-collapse`，每個區塊為一個 collapse-item | 點擊標題可收合/展開；預設全部展開 |
| 基本資料行內編輯 | `el-form`，行內切換 view/edit 模式 | 點擊「編輯」展開；儲存/取消收回 |
| Email 唯讀欄位 | `el-input disabled`，附加說明 Tooltip | Hover 顯示說明 tooltip |
| 電商會員資訊表格 | 兩欄（label / value）表格，`border-bottom: 1px solid #EBEEF5` | 靜態；數字欄 Hover 顯示計算基準 Tooltip |
| 查看明細連結 | color `#409EFF` | 跳至區塊三訂單/點數相關連結 |
| 帳號狀態 Tag（詳情頁）| `el-tag`：正常(success) / 停用(info) / 黑名單(danger) | 靜態 |
| 訂單記錄表格 | `el-table`，最近 5 筆 | 訂單編號可點擊，跳轉至訂單詳情頁 |
| 查看全部訂單連結 | `查看全部訂單 →`，color `#409EFF` | 跳轉至訂單管理頁並帶入此會員篩選 |
| CMS 互動歷程表格 | `el-table`，最近 5 筆 | 靜態列表；「查看全部 →」連結至 CMS 表單記錄 |
| 標籤管理 — 系統標籤 | `el-tag`，disabled 樣式 | 唯讀，不可移除 |
| 標籤管理 — 自定義標籤 | `el-tag`，可點 × 移除 | 點 × 移除；點「+ 新增標籤」展開 el-select |
| 新增標籤 Select | `el-select`，filterable，allow-create | 搜尋已有標籤或直接輸入建立新標籤 |
| 備註 Textarea | `el-input type="textarea"`，autosize `{minRows:3}` | 輸入後點「儲存備註」 |
| 儲存備註按鈕 | `el-button type="primary"` | 觸發備註儲存 API |
| 邀請卡片（純顧客）| `el-alert type="info"`，no-icon，帶按鈕 | 靜態說明 + 主按鈕 |
| 邀請按鈕 | `el-button type="primary"` / `disabled` + Tooltip | 正常：點擊觸發邀請信；冷卻中：disabled |
| 進階方案限制 Banner | `el-alert type="info"`，size small | 顯示在「會員等級」欄位旁，啟航方案時出現 |
| Loading Skeleton | 各區塊獨立 skeleton 條塊 | 資料載入時呈現 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default — 純顧客 | `contacts` 有記錄，`members` 無對應 Email | 顯示：Header + 區塊一 + 區塊四（CMS 歷程）+ 區塊五 + 區塊六 + 邀請卡片；不顯示：區塊二、三 |
| Default — 純會員 | `members` 有記錄，`contacts` 無對應 Email | 顯示：Header + 區塊一 + 區塊二 + 區塊三 + 區塊五 + 區塊六；不顯示：區塊四、邀請卡片 |
| Default — 顧客轉會員 | 兩表均有同 Email 記錄 | 顯示：Header（身分 Tag=會員）+ 全部六個區塊；不顯示：邀請卡片 |
| Loading | 從列表點擊「查看」後，API 回傳前 | 各區塊顯示 Skeleton loader |
| Edit 基本資料 | 點擊「編輯基本資料」 | 區塊一切換為行內表單；姓名/電話/公司變為可編輯 input；出現「儲存」「取消」 |
| 邀請冷卻中 | 7 天內已對此顧客發送邀請 | 邀請按鈕 Disabled；Hover 顯示剩餘天數 Tooltip |
| 邀請已轉換 | 顧客已完成電商會員申請 | 邀請卡片不顯示；身分 Tag 自動更新為「會員」 |
| Error — 記錄不存在 | 訪問無效 :id | 頁面顯示「找不到此顧客/會員記錄」+ 返回按鈕 |
| Error — API 失敗 | 詳情 API 連線失敗 | 頁面顯示錯誤訊息 + 重新整理按鈕 |
| 進階方案（啟航方案限制）| 使用啟航方案的帳號，查看會員等級 | 會員等級欄顯示升級提示 Banner |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「← 返回顧客管理」 | 返回 Screen 1，保留上次的篩選狀態 |
| 點擊「編輯基本資料」 | 區塊一切換至行內編輯模式（欄位變為 input）|
| 點擊「儲存」（編輯模式）| 呼叫更新 API；成功 → Toast「資料已更新」；切回 view 模式 |
| 點擊「取消」（編輯模式）| 放棄修改；切回 view 模式 |
| 點擊「寄送邀請加入會員信」 | Dialog 二次確認 → 確認後呼叫 API → Toast「邀請信已寄出至 {{email}}」；按鈕進入冷卻 disabled |
| 點擊區塊標題（el-collapse）| 收合/展開對應區塊；預設全部展開 |
| Hover 累計消費/購買次數數值 | 顯示 Tooltip：「僅計算電商模組內的已完成訂單」|
| 點擊訂單編號 | 新分頁或同頁跳轉至訂單詳情頁 |
| 點擊「查看全部訂單 →」 | 跳轉至訂單管理頁，帶入此會員 Email 篩選 |
| 點擊「查看明細 →」（點數）| 跳轉至點數記錄（Part 6 §6.6）|
| 點擊 × 移除標籤 | 二次確認 Dialog → 確認後移除；Toast「標籤已移除」|
| 點擊「+ 新增標籤」 | 展開 el-select；可搜尋或輸入新建 |
| 點擊「儲存備註」 | 呼叫備註儲存 API；成功 → Toast「備註已儲存」；更新「最後更新」時間戳 |
| Hover 邀請按鈕（冷卻中）| 顯示 Tooltip：「已於 N 天前寄出邀請，請等待 M 天後再次寄送」|

#### Motion / Transition

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| 區塊 collapse/expand | el-collapse 預設展開動畫 | 250ms | ease-in-out |
| 基本資料 view → edit | Fade in（表單元素出現）| 150ms | ease-out |
| 邀請 Dialog 開啟 | Scale from 95% + fade in | 200ms | ease-out |
| Loading Skeleton → 資料 | Fade in | 200ms | ease-out |

---

### Screen 3: 顧客管理設定頁

**Purpose:** 讓管理員自訂顧客管理列表中要顯示的欄位（最多 8 個）與預設排序，以符合不同商家的使用習慣。
**Entry points:** 側邊欄「顧客」→「設定」（`/members/settings`）
**Primary user goal:** 調整列表顯示欄位，讓最常用的資料出現在列表視圖中

#### Information Hierarchy

```
H1 (most prominent): 顧客管理設定
H2 (secondary): 列表欄位設定（說明文字）
Section 2: 預設排序
Primary CTA: 儲存設定
Supporting info: 欄位核取清單（Email 必選說明）+ 已選 N / 8 計數
```

#### Actual Copy

**Page / Section Headings**
- Page title: `顧客管理設定`
- Breadcrumb: `顧客 / 設定`
- Section 1 title: `列表欄位設定`
- Section 1 description: `選擇顧客管理列表中要顯示的欄位，最多可同時顯示 8 個欄位。`
- Section 2 title: `預設排序`
- 已選計數（動態）: `已選 {{N}} / 8 個欄位`

**欄位選項標籤（含說明）**

| 欄位 label | 說明（顯示在 checkbox 旁）| 預設勾選 | 可否關閉 |
|---|---|---|---|
| `Email` | — | ✅ | ❌（必選，checkbox disabled）|
| `聯絡人姓名` | — | ✅ | ✅ |
| `電話` | — | ✅ | ✅ |
| `身分` | — | ✅ | ✅ |
| `加入日期` | — | ✅ | ✅ |
| `最後登入日期` | — | ✅ | ✅ |
| `公司` | — | ☐ | ✅ |
| `累計消費金額` | `（僅會員有資料）` | ☐ | ✅ |
| `購買次數` | `（僅會員有資料）` | ☐ | ✅ |
| `標籤` | — | ✅ | ✅ |
| `操作` | — | ✅ | ❌（必選，checkbox disabled）|

**預設排序選項**

排序依據下拉：`加入日期` / `最後登入日期` / `累計消費金額` / `聯絡人姓名`

排序方向下拉：`由新至舊` / `由舊至新`（日期類）/ `由高至低` / `由低至高`（金額/數量類）/ `A → Z` / `Z → A`（文字類）

**Button Labels**
- Primary: `儲存設定`

**Error States**

| Error condition | Message shown to user |
|---|---|
| 欄位數超過 8 個 | `最多只能選擇 8 個欄位，請先取消勾選其他欄位` （Toast，第 9 個 checkbox 自動 disabled）|
| 儲存 API 失敗 | `設定儲存失敗，請稍後再試` |

**Loading State**
- Loading text: `載入設定中…`（或 Skeleton）

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存設定成功 | `設定已儲存，顧客管理列表將依新設定顯示` |
| 儲存設定失敗 | `設定儲存失敗，請稍後再試` |
| 欄位已達上限 | `最多只能選擇 8 個欄位，請先取消勾選其他欄位` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 頁面標題 H1 | font-size 20px，fontWeight 700 | 靜態 |
| Section 標題 | font-size 16px，fontWeight 600 | 靜態 |
| 說明文字 | font-size 14px，color `#606266` | 靜態 |
| 已選計數 | font-size 14px，color `#409EFF`，`已選 N / 8 個欄位`，動態更新 | 靜態顯示，勾選/取消時即時更新 |
| 欄位 Checkbox 清單 | `el-checkbox-group`，垂直排列 | 勾選/取消更新計數；達 8 個後其餘未勾選項目 disabled |
| Email Checkbox（必選）| `el-checkbox disabled`，勾選狀態，label 附加「必選」標記 | 不可取消勾選 |
| 操作 Checkbox（必選）| `el-checkbox disabled`，勾選狀態 | 不可取消勾選 |
| 欄位說明文字 | font-size 12px，color `#909399`，顯示在 label 右側（括號內）| 靜態 |
| 預設排序 — 排序依據 | `el-select`，寬度 160px | 單選 |
| 預設排序 — 排序方向 | `el-select`，寬度 120px，選項依排序依據動態更新 | 單選；選了「聯絡人姓名」自動切換為 A→Z/Z→A |
| 儲存設定按鈕 | `el-button type="primary"`，medium | 觸發設定儲存 API |
| 設定卡片容器 | `border: 1px solid #DCDFE6`，padding 24px，background white | 各區塊各自一個卡片 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 正常載入，顯示目前設定值 | 各 Checkbox 依目前設定顯示勾選狀態；計數顯示 |
| Loading | 初次載入設定 | 顯示「載入設定中…」或 Skeleton |
| Error — API 失敗 | 載入設定失敗 | 顯示「載入設定時發生錯誤」+ 重新整理按鈕 |
| 欄位上限（8 個已滿）| 已勾選 8 個欄位 | 其餘未勾選欄位 Checkbox 變為 disabled；計數顯示「已選 8 / 8 個欄位」（色為橙色 `#E6A23C` 作警示）|
| 儲存中 | 點擊「儲存設定」後 API 回傳前 | 按鈕顯示 Loading 狀態 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 勾選欄位 Checkbox | 計數 +1（`已選 N / 8`）；若達 8 個，其餘未勾選項目 disabled |
| 取消勾選欄位 Checkbox | 計數 -1；若原本 disabled 的欄位恢復可勾選 |
| 嘗試勾選第 9 個欄位 | Toast「最多只能選擇 8 個欄位，請先取消勾選其他欄位」；Checkbox 不改變狀態 |
| 切換排序依據下拉 | 排序方向下拉選項隨之更新（日期類：由新至舊/由舊至新；金額類：由高至低/由低至高；文字類：A→Z/Z→A）|
| 點擊「儲存設定」 | 按鈕 Loading；呼叫設定儲存 API；成功 → Toast「設定已儲存，顧客管理列表將依新設定顯示」|

---

## Part 4 — Cross-Screen Component Inventory

### Action Components

| 元件 | 變體 | 尺寸 | 狀態 |
|---|---|---|---|
| Button — Primary | `el-button type="primary"` | Medium（預設） / Large | Default / Hover / Active / Disabled / Loading |
| Button — Secondary | `el-button`（plain）| Medium | Default / Hover / Active / Disabled |
| Button — Text Link | color `#409EFF`，無 border | — | Default / Hover（underline） |
| Button — Danger | `el-button type="danger"` | Medium | Default / Hover / Active / Disabled |
| 二次確認 Dialog 按鈕組 | 取消（plain）+ 確認（primary）| Medium | — |

### Display Components

| 元件 | 變體 | 資料欄位 | 狀態 |
|---|---|---|---|
| 身分 Tag | 顧客（info/灰）/ 會員（primary/藍）| 文字「顧客」/「會員」| 靜態 |
| 帳號狀態 Tag | 正常（success）/ 停用（info）/ 黑名單（danger）| 文字標籤 | 靜態 |
| 自定義標籤 Tag | `el-tag` size="small" | 標籤文字 + × 按鈕（可移除）| Default / Hover（× 高亮）|
| 資料列表表格（列表頁）| `el-table`，多欄 | Email / 姓名 / 電話 / 身分 / 加入日期 / 最後登入 / 標籤 / 操作 | Default / Hover / Selected（勾選）|
| 迷你訂單列表（詳情頁）| 4 欄表格，5 筆 | 訂單編號 / 日期 / 金額 / 狀態 | 靜態 |
| 迷你 CMS 歷程列表 | 3 欄表格，5 筆 | 時間 / 表單類型 / 摘要 | 靜態 |
| 電商會員資訊卡 | 兩欄 key-value 表格 | 等級 / 點數 / 累計消費 / 購買次數 / 最後購買日 / 帳號狀態 / 加入日期 | 靜態；數字 Hover 顯示 Tooltip |
| 邀請卡片（純顧客）| `el-alert type="info"`，帶 CTA 按鈕 | 說明文字 + 按鈕 | Default / 冷卻中（按鈕 Disabled）|
| 合併計算說明 Tooltip | ℹ 圖示 + el-tooltip | 說明文字 | Hover 觸發 |
| 批次操作列 | Sticky bar | 已選 N 筆 + 操作按鈕群 | 顯示（有勾選）/ 隱藏（無勾選）|
| Loading Skeleton | 列表版（8 列）/ 詳情頁版（多區塊）| — | 載入中 |

### Input Components

| 元件 | 變體 | 狀態 |
|---|---|---|
| 文字輸入框 | `el-input`，帶 prefix icon / 不帶 | Default / Focus / Filled / Error / Disabled（Email 唯讀）|
| 多選下拉（標籤篩選）| `el-select multiple` | Default / Open / Selected / Disabled |
| 單選下拉 | `el-select` | Default / Open / Selected |
| 日期範圍選擇器 | `el-date-picker type="daterange"` | Default / Open / Selected |
| Textarea（備註）| `el-input type="textarea"` | Default / Focus / Filled |
| 標籤新增 Select | `el-select filterable allow-create` | Default / Open / Typing |
| Checkbox | `el-checkbox` / `el-checkbox disabled`（必選欄位）| Default / Checked / Disabled |
| Checkbox Group（設定頁）| `el-checkbox-group`，垂直排列 | — |

### Navigation Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Sidebar | Expanded / Collapsed | 「顧客」分組下：顧客管理 / 設定 |
| Breadcrumb | — | 顧客 / 顧客管理；顧客 / 設定 |
| el-collapse（詳情頁區塊）| 展開 / 收合 | 六大區塊各為一個 collapse-item，預設全展開 |
| 分頁器 | `el-pagination` | 列表頁底部 |

### Feedback Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Toast | Success / Error / Warning / Info | 3s auto-dismiss，右下角出現 |
| Dialog（二次確認）| 邀請確認 / 標籤移除確認 / 其他危險操作 | Overlay + 確認文字 + 取消/確認按鈕 |
| Empty State | 列表無資料 / 列表篩選無結果 / 列表搜尋無結果 | Headline + Subtext + CTA（依情況）|
| Error State（頁面級）| 詳情頁 API 失敗 / 列表 API 失敗 | 頁面中央錯誤訊息 + 重試按鈕 |
| Tooltip | 資料說明 / 按鈕說明 / 合併計算說明 / 邀請冷卻說明 | Hover 觸發，el-tooltip |

---

## Part 5 — Design System Token Reference

| Decision | Token / Value |
|---|---|
| Primary brand colour | `#409EFF`（Element Plus primary）|
| Success colour | `#67C23A` |
| Warning colour | `#E6A23C` |
| Danger colour | `#F56C6C` |
| Info / Neutral colour | `#909399` |
| 顧客 Tag 文字色 | `#606266` |
| 顧客 Tag 背景色 | `#F4F4F5` |
| 會員 Tag 文字色 | `#409EFF` |
| 會員 Tag 背景色 | `#ECF5FF` |
| Border colour | `#DCDFE6` |
| Page background | `#F2F3F5` |
| Card background | `#FFFFFF` |
| Base font | Noto Sans TC，14px base，scale: 12 / 14 / 16 / 20px |
| Border radius — Tag | `9999px`（`!rounded-full`）|
| Border radius — Card | `0`（目前設計無圓角 card）|
| Spacing unit | 8px grid（padding: 24px / gap: 16px / 8px）|
| Table row height | 56px |
| Sidebar width | 220px（展開）/ 64px（收合）|

---

## Assumptions

> 📌 假設：列表頁「操作」欄位 checkbox 設定為必選且不可關閉，理由是查看連結是唯一進入詳情頁的直接方式，移除後用戶體驗斷裂。

> 📌 假設：「加入日期」統一以「兩表中較早的時間」為準（PRD §6.1.C 日期篩選邏輯），詳情頁區塊一「加入來源」欄位則分別顯示 CMS 與電商各自的加入時間。

> 📌 假設：電話號碼遮蔽（`0912-****-78`）僅在列表頁實施；詳情頁完整顯示（依 PRD §8.2）。

> 📌 假設：「顧客轉會員」狀況下，Header 的身分 Tag 只顯示「會員」（不顯示「顧客」），但區塊四（CMS 互動歷程）仍顯示。PRD 的身分 Tag 表格「顧客轉會員」欄位為「顯示會員 tag + 附加曾為顧客說明」，設計建議將「曾為顧客」以 Tooltip hover 方式附加在 Tag 旁，避免 Header 資訊過重。

> 📌 假設：設定頁的「排序方向」選項隨「排序依據」動態切換文案（日期類/金額類/文字類），PRD 未明確說明，依常見 UX 慣例實作。

> ✏️ Copy 待確認：邀請加入會員信的完整信件內文（PRD 僅定義主旨與「一鍵前往電商前台註冊連結」，設計稿中 Preview 區塊的信件內文需由 Una 提供草稿）。

> ✏️ Copy 待確認：「加入來源」欄位，第三方登入格式為「第三方登入 Google（2026/03/21）」，是否需要 icon（Google / LINE / Facebook）或文字即可。
