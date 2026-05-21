# 美安串接 — Design Brief + UX Spec

> **Version:** 1.0
> **Created:** 2026-05-14
> **用途：** 上傳至 Claude Design，配合文件末尾的 Prompt Cheatsheet 使用

---

## Part 1 — Design Brief

### Product Vision

美安串接讓 Evomni 商家能與美安（Market America）分銷平台無縫對接：系統自動生成符合美安格式的產品 XML Feed、自動識別美安 IBO 帶入的消費者訂單並標記，以及在訂單確認成立後自動傳送至美安 API 計算佣金——取代過去商家手動操作、手動整理 XML、容易漏傳的作業流程。異常時商家可自行補傳，最高權限人員可查看完整 LOG 協助排查。

### Target User

**Primary：** 商家管理員 — 已申請美安串接加費服務的電商後台管理員，需要完成 API 設定、確認訂單傳送狀態、匯出美安格式報表

**Secondary：** Evomni 內部最高權限人員 — 為商家啟用美安功能、查看 API 通訊 LOG、在特殊情況手動補傳訂單

### Design Goals

| # | Goal | How to test |
|---|---|---|
| 1 | 商家完成美安 API 設定後能立即取得 XML Feed URL | 計時商家從進入設定頁到成功複製 XML URL 的時間 |
| 2 | 商家在訂單詳情頁 5 秒內判斷美安訂單傳送狀態 | 觀察商家能否不閱讀說明文字即辨別狀態 A–E |
| 3 | 傳送未完成交易後商家不會誤以為可再次操作 | 確認按鈕消失後，觀察商家是否嘗試重找按鈕 |
| 4 | 商家匯出美安報表時清楚知道匯出範圍 | 詢問商家「你匯出的是哪些訂單」是否答對排除邏輯 |

### Design Principles

1. **狀態透明** — 美安訂單卡片必須用顏色 + 圖示 + 文字三種方式同時傳達狀態，不能只靠顏色
2. **不可逆操作必須攔截** — 取消通知與手動補傳均為無法復原的操作，必須有確認 Dialog；手動補傳需額外輸入確認文字
3. **設定頁複雜度收納** — 三個功能區塊（API 設定 / XML Feed / 欄位說明）以清楚的 Section 區隔，避免視覺混亂

### Design System Reference

- **Component framework：** Element Plus + Vue 3（Evomni 自定義主題）
- **Icon set：** Element Plus Icons
- **Font：** Noto Sans TC
- **Primary color：** `#303133`
- **Brand blue：** `#409EFF`
- **Border radius：** 無（全域 `!rounded-none`）
- **Spacing unit：** 8px grid

### Accessibility Requirements

- **Target WCAG level：** AA
- **Known constraints：**
  - 美安訂單卡片的 5 種狀態需同時使用圖示（✅ ❌ ⏳）與文字說明，不可只靠顏色傳達
  - 密碼欄位（API Key）的「顯示 / 隱藏」切換需支援鍵盤操作
  - 確認 Dialog 內的危險操作按鈕需設計明確視覺差異（非 primary 色）

### Hard Constraints

- ⚠️ API Access Key / Secret Key 儲存後不可在前端顯示明文，一律以 `••••••••••••` 遮罩 + `重新設定` 按鈕呈現
- ⚠️ 「傳送未完成交易至美安」按鈕成功操作後立即消失，不提供重複操作入口
- ⚠️ 最高權限功能區塊（LOG 查看、手動傳送）在非最高權限帳號的頁面完全不渲染（v-if，非 v-show）
- ⚠️ 美安串接設定入口僅在 Evomni 後台已為此商家啟用的情況下顯示於 Sidebar

### Out of Scope

- 美安前台消費者結帳流程的 UI（純後端 Session 標記邏輯）
- 美安 API 錯誤代碼完整文件（由美安官方提供）
- 最高權限啟用商家美安功能的操作頁面（Evomni 內部後台，另行設計）
- 自動重試 Queue 的後台監控介面

---

## Part 2 — Screen Index

| # | Screen Name | Navigation path | Primary user goal |
|---|---|---|---|
| 1 | 美安串接設定頁 | 全域設定 > 美安串接設定 | 填入 API 憑證、查看 XML Feed URL、設定預設分類 |
| 2 | 訂單列表頁（美安標記修改）| 訂單管理 > 訂單列表 | 識別哪些訂單為美安訂單，篩選並匯出 |
| 3 | 訂單詳情頁 — 美安訂單資訊卡片 | 訂單管理 > 點擊美安訂單 | 確認傳送狀態，或在失敗時手動補傳 |
| 4 | 傳送未完成交易確認 Dialog | 訂單詳情頁點擊「傳送未完成交易至美安」| 確認送出取消通知至美安 |
| 5 | 手動傳送確認 Dialog（最高權限）| 訂單詳情頁點擊「手動傳送此訂單至美安」| 最高權限確認補傳特殊訂單 |
| 6 | 美安報表匯出確認 Dialog | 訂單列表頁點擊「匯出美安報表」 | 選擇時間範圍並確認非同步匯出 |

---

## Part 3 — Per-Screen UX Spec

---

### Screen 1: 美安串接設定頁

**Purpose：** 商家管理員填入美安 API 憑證完成串接設定，取得 XML Feed URL 提供美安定期抓取，並設定無分類產品的預設分類名稱。
**Entry points：** 左側 Sidebar > 全域設定 > 美安串接設定（需最高權限先為此商家啟用才顯示此項目）
**Primary user goal：** 填入 API 憑證並儲存，取得 XML Feed URL

#### Information Hierarchy

```
H1 (most prominent): 美安串接設定
H2 (secondary): § API 連線設定 / § 產品目錄 XML Feed / § XML 必填欄位對應說明
Primary CTA: 儲存設定
Secondary CTA: 立即重新生成 XML
Supporting info: 說明 Banner、XML Feed URL、最後更新時間、欄位對應說明表
```

#### Actual Copy

**Page / Section Headings**
- Page title: `美安串接設定`
- Breadcrumb: `全域設定 / 美安串接設定`
- Section 1 title: `API 連線設定`
- Section 2 title: `產品目錄 XML Feed`
- Section 3 title: `XML 必填欄位對應說明`

**說明 Banner（淡灰背景，頁面頂部）**
- `美安（Market America）串接可讓美安 IBO 的導購訂單自動被系統識別並傳送至美安平台。串接完成後，系統將自動維護產品 XML Feed 並識別美安來源的訂單。`

**Form Fields — § API 連線設定**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 美安 Store ID | `請填入美安提供的 Store ID` | Tooltip：`由美安窗口提供，通常為英數字組合` | `請填入美安 Store ID` |
| API Access Key | `請填入 API Access Key` | Tooltip：`由美安窗口提供的 API 存取金鑰` | `請填入 API Access Key` |
| API Secret Key | `請填入 API Secret Key` | Tooltip：`由美安窗口提供的 API 密鑰` | `請填入 API Secret Key` |

**API Key 已儲存狀態顯示**
- 遮罩文字: `••••••••••••`
- 重設連結: `重新設定`（點擊後清空欄位，可重新輸入）

**Button Labels — § API 連線設定**
- Primary action: `儲存設定`

**§ 產品目錄 XML Feed 內容**
- XML Feed URL label: `XML Feed URL`
- URL value（唯讀）: `https://yourstore.com/api/meian/product-feed.xml`（動態，依商家 domain）
- 複製按鈕: `複製網址`
- URL 說明: `此 URL 提供給美安設定定期自動抓取。系統每日凌晨 02:00 自動更新 XML 資料。`
- 最後更新 label: `最後更新：`
- 最後更新 value: `{YYYY/MM/DD HH:mm:ss}`（動態）
- 手動刷新按鈕: `立即重新生成 XML`
- 刷新說明（小字）: `若剛剛修改了產品資料，可點此立即重新生成 XML，無需等待每日排程`

**Form Fields — § XML Feed 設定**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 美安預設分類名稱 | `例：精選產品` | `若產品未設定分類，美安 XML 的 category 欄位將使用此名稱。若產品已設定分類，以實際分類名稱優先。` | — |

**§ XML 必填欄位對應說明（唯讀說明區塊）**

| 美安 XML 欄位 | 對應 Evomni 欄位 | 備註 |
|---|---|---|
| `<category>` | 產品中心 > 分類 | 無分類者用上方「預設分類名稱」填入 |
| `<largeimage>` | 產品第一張圖片 | 僅使用 JPG 格式；系統自動將 PNG/WebP 轉為 JPG |
| `<price>` | 產品 > 定價（原價）| 必須設定定價才能生成 XML；定價 = MSRP |
| `<saleprice>` | 產品 > 售價（實際交易金額）| 若只設定定價未設定售價，產品無法下單 |
| `<description>` | 產品 > 基本資料 > 產品說明 | 需包含純文字（不可只有圖片/影片）|
| `<name>` | 產品名稱 | — |
| `<url>` | 產品前台頁面 URL | 系統自動生成 |

- Warning note: `⚠️ 注意：產品說明如果只有圖片或影片（無文字），美安 XML 驗測將不通過。請確認每件產品至少有一段文字說明。`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存設定成功 | `✅ 美安串接設定已儲存` |
| 儲存設定失敗 | `❌ 儲存失敗，請確認網路連線後重試` |
| 複製 URL 成功 | `已複製網址` |
| XML 手動刷新成功 | `✅ XML 已重新生成` |
| XML 手動刷新失敗 | `❌ XML 生成失敗，請稍後再試` |
| XML 手動刷新逾時 | `XML 生成逾時（超過 60 秒），請稍後再試或聯絡系統管理員` |

**Error States**

| Error condition | Message shown to user |
|---|---|
| 美安 Store ID 未填送出 | `請填入美安 Store ID` |
| API Access Key 未填送出 | `請填入 API Access Key` |
| API Secret Key 未填送出 | `請填入 API Secret Key` |
| API 呼叫失敗 | `❌ 儲存失敗，請確認網路連線後重試` |

**Loading State**
- 手動刷新 XML 時：按鈕顯示 loading spinner，文字改為「生成中…」，按鈕禁用，最長 60 秒

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 說明 Banner | el-alert type="info" :closable=false，背景 #ECF5FF | 靜態顯示 |
| Section 區隔 | el-divider + Section 標題 H2 | 視覺分隔三區塊 |
| Store ID 輸入框 | el-input，寬 400px | 必填驗證，離焦後觸發 |
| API Key 輸入框（初始）| el-input type="password"，prefix PasswordIcon | 顯示 / 隱藏切換 |
| API Key 已儲存狀態 | 唯讀文字 `••••••••••••` + el-link「重新設定」| 點擊「重新設定」清空並恢復輸入框 |
| ℹ Tooltip | el-tooltip，max-width 250px | Hover 顯示說明 |
| 儲存設定按鈕 | el-button type="primary" !rounded-none | 觸發表單驗證與 API 呼叫 |
| XML Feed URL | el-input readonly，全寬，背景 #F5F7FA | — |
| 複製網址按鈕 | el-button size="small" !rounded-none，前置 Copy icon | 點擊複製 URL 至剪貼簿 |
| 最後更新時間 | 靜態文字 #909399 12px | — |
| 立即重新生成 XML | el-button type="default" !rounded-none，:loading 狀態 | 點擊觸發手動 XML 生成 |
| 預設分類名稱輸入框 | el-input，maxlength=50，show-word-limit | 選填 |
| XML 欄位說明表格 | 靜態 table，背景 #F5F7FA，不可編輯 | — |
| Warning Note | el-alert type="warning" :closable=false | 靜態顯示 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 初次設定（未填入任何 API）| 商家首次進入此頁 | 三個 API 欄位空白，XML URL 存在但 XML 尚未生成 |
| 已設定（API Key 遮罩）| 商家曾儲存過 API 憑證 | Store ID 正常顯示，Key 欄位顯示 `••••••••••••` + 重新設定 |
| 手動刷新中 | 點擊「立即重新生成 XML」 | 按鈕 loading，禁用其他操作 |
| 儲存中 | 點擊「儲存設定」 | 按鈕 loading |
| Loading（頁面初始載入）| 進入頁面 | Skeleton 取代三個區塊 |
| Error（頁面載入失敗）| API 失敗 | `無法載入設定，請重新整理頁面` + 重新整理按鈕 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「重新設定」（API Key 旁）| 清空該欄位，恢復輸入框，focus 至欄位 |
| 點擊「複製網址」 | 複製 XML Feed URL，Toast「已複製網址」|
| 點擊「立即重新生成 XML」 | 按鈕 loading → API 呼叫 → 成功 Toast + 更新最後更新時間 |
| 點擊「儲存設定」（有效表單）| 按鈕 loading → API 呼叫 → 成功 Toast |
| 點擊「儲存設定」（無效表單）| 顯示各欄位驗證錯誤，不送出 |

---

### Screen 2: 訂單列表頁（美安標記與篩選修改）

**Purpose：** 在現有訂單列表中新增美安訂單標記欄位與訂單來源篩選，讓商家快速識別和篩選美安訂單，並提供美安報表匯出入口。
**Entry points：** 左側 Sidebar > 訂單管理（現有頁面）
**Primary user goal：** 快速辨識哪些是美安訂單，必要時篩選並匯出

> 📌 此畫面為現有訂單列表頁的修改版，非新增頁面。需在現有 Table 新增欄位、篩選選項與匯出按鈕。

#### Information Hierarchy

```
H1 (most prominent): 訂單管理（現有標題不變）
新增篩選器: 訂單來源（全部 / 美安訂單 / 一般訂單）
新增欄位: 訂單來源（Table column）
新增按鈕: 匯出美安報表（工具列末端）
Primary CTA: 匯出美安報表
```

#### Actual Copy

**新增篩選器**
- Filter label: `訂單來源`
- Select placeholder: `全部`
- Option 1: `全部`
- Option 2: `美安訂單`
- Option 3: `一般訂單`

**Table 新增欄位**
- Column header: `訂單來源`（欄寬 80px）
- 美安訂單 Badge: `美安`（el-tag type="success" !rounded-full）
- 一般訂單: 此欄空白

**新增按鈕（工具列末端）**
- Button: `匯出美安報表`（el-button type="default" !rounded-none）
- Button helper（hover Tooltip）: `僅匯出美安訂單，且排除已取消訂單`

**Empty State（篩選美安訂單後無結果）**
- Headline: `目前沒有美安訂單`
- Subtext: `美安 IBO 帶入的消費者下單後，訂單將自動顯示在這裡`
- CTA label: — （無）

**Status Labels**

| Status key | Display text | Colour semantic |
|---|---|---|
| 美安訂單 | `美安` | Success #67C23A |
| 一般訂單 | （空白）| — |

**Sortable Columns（完整列表）**

> 以下為訂單列表現有欄位 + 新增欄位的排序規格：

| 欄位 | 可排序 | 備注 |
|---|---|---|
| 訂單編號 | ✅ | 現有 |
| 下單時間 | ✅ | 現有，預設排序降序 |
| 訂單來源（美安）| ❌ | 新增欄位 |
| 訂單金額 | ✅ | 現有 |
| 訂單狀態 | ❌ | 現有 |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 訂單來源 Select | el-select，寬 140px，位於篩選列 | 選擇後即時過濾列表 |
| 美安 Badge | el-tag type="success" !rounded-full size="small" 文字「美安」| 靜態顯示 |
| 匯出美安報表按鈕 | el-button type="default" !rounded-none，位於工具列末端 | 點擊開啟匯出確認 Dialog（Screen 6）|
| Tooltip（按鈕說明）| el-tooltip，hover 顯示匯出說明 | Hover 顯示 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default（全部訂單）| 未篩選 | 美安訂單顯示美安 Badge，一般訂單此欄空白 |
| 篩選美安訂單 | 訂單來源 = 美安訂單 | 僅顯示 is_meian_order = true 的訂單 |
| 篩選一般訂單 | 訂單來源 = 一般訂單 | 僅顯示非美安訂單 |
| Empty（篩選後無結果）| 選「美安訂單」但無美安訂單 | Empty State |
| Loading | 篩選 / 換頁時 | Skeleton rows |

#### Interaction Annotations

| User action | Result |
|---|---|
| 選擇「美安訂單」篩選 | 即時過濾，僅顯示美安訂單 |
| 點擊「匯出美安報表」 | 開啟匯出確認 Dialog（Screen 6）|
| 點擊美安訂單列 | 進入訂單詳情頁，顯示美安訂單資訊卡片 |

---

### Screen 3: 訂單詳情頁 — 美安訂單資訊卡片

**Purpose：** 在美安訂單的詳情頁下方顯示獨立卡片，讓商家管理員確認訂單傳送狀態，並在需要時手動補傳或傳送取消通知。
**Entry points：** 訂單管理 > 點擊任一美安訂單（is_meian_order = true 時顯示此卡片）
**Primary user goal：** 確認訂單已成功傳送至美安，或在失敗時執行補救操作

#### Information Hierarchy

```
H1 (most prominent): 美安訂單資訊（卡片標題）
H2 (secondary): 傳送狀態（5 種狀態之一，圖示 + 文字）
Primary CTA: 重新傳送至美安（狀態 B 顯示）/ 傳送未完成交易至美安（狀態 D 顯示）
Supporting info: 傳送時間、錯誤訊息、操作說明
```

#### Actual Copy

**卡片標題**
- `美安訂單資訊`

**美安識別列（所有狀態共有）**
- Label: `美安識別：`
- Value: `✅ 此為美安來源訂單`

**狀態 A — 自動傳送成功**
- 狀態 label: `美安訂單狀態：`
- 狀態 value: `✅ 已傳送至美安`
- 傳送時間 label: `傳送時間：`
- 傳送時間 value: `{YYYY/MM/DD HH:mm:ss}`（動態）
- LOG link（最高權限限定）: `查看傳送 LOG`

**狀態 B — 自動傳送失敗**
- 狀態 label: `美安訂單狀態：`
- 狀態 value: `❌ 傳送失敗`
- 錯誤訊息 label: `錯誤訊息：`
- 錯誤訊息 value: `{美安 API 回傳的錯誤描述}`（動態）
- Button: `重新傳送至美安`（el-button type="primary" !rounded-none）
- LOG link（最高權限限定）: `查看傳送 LOG`

**狀態 C — 尚未傳送（訂單未達確認成立）**
- 狀態 label: `美安訂單狀態：`
- 狀態 value: `⏳ 等待訂單確認成立後自動傳送`

**狀態 D — 訂單已取消，可傳送未完成交易**
- 狀態 label: `美安訂單狀態：`
- 狀態 value: `✅ 已傳送至美安（原確認成立訂單）`
- Button: `傳送未完成交易至美安`（el-button type="warning" !rounded-none）
- Button helper（按鈕下方小字）: `點擊後系統將通知美安此訂單已取消，按鈕點擊後將消失。`

**狀態 E — 已傳送取消通知**
- 狀態 label: `美安訂單狀態：`
- 狀態 value: `✅ 已傳送至美安`
- 取消通知 label: `取消通知：`
- 取消通知 value: `已傳送未完成交易（{YYYY/MM/DD HH:mm}）`

**最高權限額外操作區塊（所有訂單詳情頁，最高權限限定）**
- Button: `手動傳送此訂單至美安`（el-button type="default" !rounded-none）
- Button helper: `用於補傳自動識別失敗的訂單，或特殊情況的人工補傳`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 重新傳送成功 | `✅ 已成功傳送至美安` |
| 重新傳送失敗 | `❌ 傳送失敗：{錯誤描述}，請稍後再試` |
| 重新傳送速率限制 | `操作過於頻繁，請 1 分鐘後再試` |

**Error States**

| Error condition | Message shown to user |
|---|---|
| 重新傳送失敗 | `❌ 傳送失敗：{錯誤描述}，請稍後再試`（Toast） |
| 速率限制（每分鐘超過 3 次）| `操作過於頻繁，請 1 分鐘後再試`（Toast） |

**Loading State**
- 點擊「重新傳送至美安」後：按鈕 loading spinner，文字「傳送中…」，禁止重複點擊

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 美安訂單資訊卡片 | el-card shadow="never"，置於訂單詳情頁下方，美安訂單才渲染（v-if）| — |
| 美安識別列 | icon ✅ + 文字，14px | — |
| 狀態 A 傳送成功列 | icon ✅（#67C23A）+ 狀態文字 14px | — |
| 狀態 B 傳送失敗列 | icon ❌（#F56C6C）+ 狀態文字 14px | — |
| 狀態 C 等待列 | icon ⏳ + 狀態文字 14px，文字 #909399 | — |
| 錯誤訊息（狀態 B）| 12px #F56C6C，el-alert type="error" | — |
| 重新傳送按鈕（狀態 B）| el-button type="primary" !rounded-none，:loading 狀態 | 點擊開始傳送；成功切換為狀態 A |
| 傳送未完成交易按鈕（狀態 D）| el-button type="warning" !rounded-none | 點擊開啟確認 Dialog（Screen 4）|
| 查看傳送 LOG 連結 | el-link type="primary"（最高權限 v-if）| 點擊開啟 LOG 外部連結 |
| 最高權限操作區塊 | el-divider + el-button type="default"（最高權限 v-if）| 點擊開啟手動傳送確認 Dialog（Screen 5）|

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 狀態 A：傳送成功 | meian_transmit_status = success | ✅ 圖示 + 傳送時間 |
| 狀態 B：傳送失敗 | meian_transmit_status = failed | ❌ 圖示 + 錯誤訊息 + 重新傳送按鈕 |
| 狀態 C：等待傳送 | is_meian_order=true，訂單未確認成立 | ⏳ 圖示 + 等待文字 |
| 狀態 D：可傳送取消 | 訂單已取消 + meian_cancel_sent=false | ✅ 傳送成功（原訂單）+ 橘色取消按鈕 |
| 狀態 E：已傳送取消 | meian_cancel_sent=true | ✅ 傳送成功 + 取消通知時間 |
| 重新傳送中 | 點擊「重新傳送」後 | 按鈕 loading |
| 非美安訂單 | is_meian_order=false | 整個卡片不渲染（v-if false）|

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「重新傳送至美安」（狀態 B）| loading → API → 成功切換至狀態 A；失敗保持狀態 B + Toast 錯誤 |
| 點擊「傳送未完成交易至美安」（狀態 D）| 開啟傳送取消確認 Dialog（Screen 4）|
| 點擊「查看傳送 LOG」（最高權限）| 開啟 LOG URL（新分頁）|
| 點擊「手動傳送此訂單至美安」（最高權限）| 開啟手動傳送確認 Dialog（Screen 5）|

---

### Screen 4: 傳送未完成交易確認 Dialog

**Purpose：** 讓商家確認要傳送取消通知給美安，防止誤操作——操作成功後按鈕消失不可重複。
**Entry points：** 訂單詳情頁（狀態 D）點擊「傳送未完成交易至美安」
**Primary user goal：** 確認後送出取消通知，避免誤觸

#### Information Hierarchy

```
H1 (most prominent): 確認傳送取消通知（Dialog 標題）
H2 (secondary): 操作說明 + 警告文字
Primary CTA: 確認傳送
Secondary CTA: 取消
```

#### Actual Copy

**Dialog Title**
- `確認傳送取消通知`

**Body Text**
- `確定要通知美安此訂單（#{訂單編號}）已取消？`

**Warning Text**
- `操作成功後，此按鈕將消失，無法重複操作。`

**Button Labels**
- Primary action: `確認傳送`
- Secondary action: `取消`
- Loading state: `傳送中…`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 傳送成功 | `✅ 已通知美安此訂單已取消` |
| 傳送失敗 | `❌ 通知失敗，請稍後再試` |

**Error States**

| Error condition | Message shown to user |
|---|---|
| API 失敗 | `❌ 通知失敗，請稍後再試`（Toast，Dialog 留存可重試）|

**Loading State**
- 「確認傳送」按鈕顯示 loading spinner，文字「傳送中…」，禁止重複點擊

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Dialog 容器 | el-dialog width="400px" !rounded-none，close-on-click-modal=false | Overlay 點擊不關閉 |
| 訂單編號（動態）| 14px bold，#{訂單編號} | — |
| 警告文字 | el-alert type="warning" :closable=false | 靜態顯示 |
| 取消按鈕 | el-button type="default" !rounded-none | 關閉 Dialog |
| 確認傳送按鈕 | el-button type="warning" !rounded-none，:loading 狀態 | 點擊觸發取消通知 API |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | Dialog 開啟 | 訂單編號、警告文字、兩個按鈕 |
| 傳送中 | 點擊「確認傳送」 | 按鈕 loading，禁止重複點擊 |
| 成功 | API 返回 200 | Dialog 關閉，Toast 成功，詳情頁切換至狀態 E，按鈕消失 |
| 失敗 | API 返回錯誤 | Toast 錯誤，Dialog 留存可重試 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「取消」 | 關閉 Dialog，返回訂單詳情頁，無任何操作 |
| 點擊「確認傳送」 | loading → API → 成功 Toast + Dialog 關閉 + 詳情頁切換狀態 E |

---

### Screen 5: 手動傳送確認 Dialog（最高權限）

**Purpose：** 讓最高權限人員確認要手動補傳特殊訂單至美安，需輸入確認文字防止誤操作。
**Entry points：** 訂單詳情頁（最高權限操作區塊）點擊「手動傳送此訂單至美安」
**Primary user goal：** 輸入確認文字後完成強制補傳

> ⚠️ 此 Dialog 僅最高權限帳號可觸發，其他角色不可見。

#### Information Hierarchy

```
H1 (most prominent): 手動傳送訂單至美安（Dialog 標題）
H2 (secondary): 操作說明 + 確認文字輸入框
Primary CTA: 確認傳送（disabled until 輸入框 = "確認"）
Secondary CTA: 取消
```

#### Actual Copy

**Dialog Title**
- `手動傳送訂單至美安`

**Body Text**
- `此操作將強制傳送訂單 #{訂單編號} 至美安平台。`
- `此為人工補傳操作，請確認此訂單確實為美安來源訂單。`

**Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 請輸入「確認」以繼續 | `確認` | 輸入與「確認」完全相符後才可操作 | `請輸入「確認」後才能執行此操作` |

**Button Labels**
- Primary action: `確認傳送`（disabled until input = "確認"）
- Secondary action: `取消`
- Loading state: `傳送中…`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 手動傳送成功 | `✅ 已手動傳送此訂單至美安` |
| 手動傳送失敗 | `❌ 傳送失敗：{錯誤描述}` |

**Error States**

| Error condition | Message shown to user |
|---|---|
| 未輸入「確認」就試圖操作 | 「確認傳送」按鈕保持 disabled（不顯示錯誤文字，靠 disabled 狀態傳達）|
| API 失敗 | `❌ 傳送失敗：{錯誤描述}`（Toast，Dialog 留存）|

**Loading State**
- 「確認傳送」按鈕顯示 loading spinner，文字「傳送中…」

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Dialog 容器 | el-dialog width="440px" !rounded-none，close-on-click-modal=false | Overlay 點擊不關閉 |
| 警告說明 | el-alert type="warning" :closable=false | 靜態顯示 |
| 確認文字輸入框 | el-input，placeholder="確認"，@input 即時比對 | 輸入等於「確認」時啟用傳送按鈕 |
| 取消按鈕 | el-button type="default" !rounded-none | 關閉 Dialog |
| 確認傳送按鈕 | el-button type="primary" !rounded-none，:disabled（輸入不符）/ :loading 狀態 | disabled 直到輸入 = "確認"；點擊觸發 API |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | Dialog 開啟 | 輸入框空白，確認傳送按鈕 disabled |
| 輸入中（未完全匹配）| 輸入任何內容但不等於「確認」| 確認傳送按鈕保持 disabled |
| 輸入完成（完全匹配）| 輸入框 = "確認" | 確認傳送按鈕啟用 |
| 傳送中 | 點擊「確認傳送」 | 按鈕 loading，禁止重複點擊 |
| 成功 | API 返回 200 | Dialog 關閉，Toast 成功，詳情頁更新為傳送成功狀態 |
| 失敗 | API 返回錯誤 | Toast 錯誤，Dialog 留存 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 輸入任意文字 | 即時比對是否等於「確認」，決定按鈕 disabled 狀態 |
| 點擊「取消」 | 關閉 Dialog，無任何操作 |
| 點擊「確認傳送」（已啟用）| loading → API → 成功 Toast + Dialog 關閉 |

---

### Screen 6: 美安報表匯出確認 Dialog

**Purpose：** 讓商家確認匯出範圍（可選時間篩選），確認後非同步生成美安格式 CSV 並以 Email 寄送。
**Entry points：** 訂單管理列表頁工具列點擊「匯出美安報表」
**Primary user goal：** 設定時間範圍（選填）並確認匯出

#### Information Hierarchy

```
H1 (most prominent): 匯出美安報表（Dialog 標題）
H2 (secondary): 匯出範圍說明（N 筆訂單）
Primary CTA: 確認匯出
Secondary CTA: 取消
Supporting info: 時間篩選器（選填）、排除邏輯說明
```

#### Actual Copy

**Dialog Title**
- `匯出美安報表`

**Body Text**
- `將匯出 {N} 筆美安訂單資料（已排除取消訂單）`
- （時間篩選後動態更新：`符合條件的美安訂單共 {N} 筆`）

**Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 篩選時間範圍 | `不選則匯出全部歷史記錄` | — | — |

**Button Labels**
- Primary action: `確認匯出`
- Secondary action: `取消`
- Loading state: `準備中…`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 匯出啟動成功 | `✅ 美安報表已開始生成，完成後將寄送至您的信箱 📧` |
| 匯出啟動失敗 | `❌ 報表生成失敗，請稍後再試` |

**Error States**

| Error condition | Message shown to user |
|---|---|
| API 失敗 | `❌ 報表生成失敗，請稍後再試`（Toast，Dialog 留存）|

**Loading State**
- 「確認匯出」按鈕顯示 loading spinner，文字「準備中…」

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Dialog 容器 | el-dialog width="480px" !rounded-none，close-on-click-modal=false | Overlay 點擊不關閉 |
| 匯出範圍說明 | 14px #303133，{N} 筆為動態數字 | 選擇時間範圍後即時更新數字 |
| 時間範圍選擇 | el-date-picker type="daterange"，寬 100%，可清空（clearable）| 選擇後更新匯出筆數預覽 |
| 排除說明（小字）| 12px #909399 | 靜態說明「僅匯出美安訂單，且排除已取消訂單」|
| 取消按鈕 | el-button type="default" !rounded-none | 關閉 Dialog |
| 確認匯出按鈕 | el-button type="primary" !rounded-none，:loading 狀態 | 點擊觸發非同步匯出 API |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | Dialog 開啟，未選時間範圍 | 顯示全部美安訂單筆數，日期框空白 |
| 已選時間範圍 | 選擇 daterange | 即時更新匯出筆數為符合條件的數量 |
| 已選時間範圍（無資料）| 選擇無美安訂單的時間區間 | 顯示「所選時間範圍內無美安訂單」，按鈕保持可用（空匯出）|
| 準備中 | 點擊「確認匯出」 | 按鈕 loading |
| 成功 | API 返回 200 | Dialog 關閉，Toast 「美安報表已開始生成，完成後將寄送至您的信箱」|
| 失敗 | API 返回錯誤 | Toast 錯誤，Dialog 留存 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 選擇時間範圍 | 即時更新匯出預計筆數 |
| 清空時間範圍 | 恢復為全部歷史記錄筆數 |
| 點擊「取消」 | 關閉 Dialog |
| 點擊「確認匯出」 | loading → API → 成功 Toast + Dialog 關閉 |

---

## Part 4 — Cross-Screen Component Inventory

### Action Components

| 元件 | 變體 | 尺寸 | 狀態 |
|---|---|---|---|
| Button | Primary / Default / Warning / Disabled | Large / Medium / Small | Default / Hover / Active / Disabled / Loading |
| el-link | Primary / Default | — | Default / Hover |

### Display Components

| 元件 | 變體 | 資料欄位 | 狀態 |
|---|---|---|---|
| 美安訂單資訊卡片 | 5 狀態（A/B/C/D/E）| 傳送狀態、時間、錯誤訊息 | 依狀態呈現不同內容 |
| 美安 Badge（訂單列表）| Success 綠色，小圓角 | 「美安」文字 | — |
| XML 欄位對應說明表 | 唯讀 table，灰底 | 7 欄位說明 | — |
| API Key 遮罩欄位 | 儲存後遮罩顯示 | `••••••••••••` | Default / Re-set |

### Input Components

| 元件 | 變體 | 狀態 |
|---|---|---|
| Text Input | Default / With icon / Password / Readonly | Default / Focus / Filled / Error / Disabled |
| el-date-picker | Daterange（可清空）| Default / Open / Selected / Cleared |
| el-select | Single | Default / Open / Selected |

### Navigation Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Sidebar | Expanded / Collapsed | 全域設定 > 美安串接設定 導覽路徑 |
| Breadcrumb | — | 全域設定 / 美安串接設定 |

### Feedback Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Toast（el-message）| success / error | 操作回饋，3s 自動消失 |
| el-alert | info / warning / error | 說明 Banner、警告說明（不可關閉）|
| Modal / Dialog | 4 種 Dialog（取消確認 / 手動補傳 / 匯出確認）| Overlay，點擊外部不關閉 |
| Loading Skeleton | 設定頁區塊 | 頁面初始載入時顯示 |
| el-tooltip | ℹ 說明 / 按鈕說明 | Hover 觸發 |
| Empty State | 篩選無結果 | Headline + Subtext |

---

## Part 5 — Design System Token Reference

| Decision | Token / Value |
|---|---|
| Primary brand colour | `#303133` |
| Brand blue（互動色）| `#409EFF` |
| Success colour | `#67C23A` |
| Warning colour | `#E6A23C` |
| Danger colour | `#F56C6C` |
| Neutral text | `#606266` |
| Placeholder / disabled text | `#909399` |
| Disabled background | `#F5F7FA` |
| Border colour | `#DCDFE6` |
| Base font | Noto Sans TC |
| Border radius | 0（全域 `!rounded-none`）|
| 美安 Badge 圓角 | `!rounded-full`（唯一例外，以 pill 形狀區別於方形 Tag）|
| Spacing unit | 8px grid |

---

## Assumptions

> 📌 假設：XML Feed URL 含 store hash（如 `/api/meian/{hash}/product-feed.xml`），確保 URL 不可猜測；hash 值由系統生成，設定頁唯讀顯示。

> 📌 假設：手動刷新 XML 的 loading 逾時上限為 60 秒，逾時後顯示錯誤 Toast，用戶可重試。

> 📌 假設：「查看傳送 LOG」連結開啟外部 LOG URL（新分頁），具體 URL 格式由後端決定。

> 📌 假設：報表匯出「所選時間範圍無資料」時仍允許送出（匯出空報表），不顯示 disabled 狀態，僅在 Dialog 內說明「符合條件共 0 筆」。

> 📌 假設：訂單詳情頁的「美安訂單資訊卡片」置於現有卡片群組的最下方，不影響現有欄位佈局。

> ✏️ Copy 待確認：訂單狀態 B「{美安 API 回傳的錯誤描述}」的錯誤訊息格式需與工程確認是否有統一中文化，或直接顯示英文原文。

---

## Part 6 — Claude Design Prompt Cheatsheet

**使用說明：**
1. 將這份 .md 上傳到 Claude Design
2. 找到你想先做的畫面，複製下方對應的 prompt
3. 貼入 Claude Design 對話框，開始生成
4. 在 Claude Design 中直接對話迭代細節

---

### Screen 1 — 美安串接設定頁

```
請幫我設計「美安串接設定」的桌面後台設定頁面 UI。Element Plus 元件，無圓角，Noto Sans TC，左側 Sidebar 導覽（全域設定 > 美安串接設定）。

頁面頂部顯示淡藍色說明 Banner：「美安（Market America）串接可讓美安 IBO 的導購訂單自動被系統識別並傳送至美安平台。」

頁面分三個 Section，以 el-divider 分隔：
§1 API 連線設定：三個輸入欄位（美安 Store ID / API Access Key / API Secret Key），Key 欄位為 password 類型。每個欄位旁有 ℹ tooltip icon。底部「儲存設定」Primary 按鈕。

§2 產品目錄 XML Feed：唯讀 URL 欄位（灰底）+ 「複製網址」small 按鈕；下方顯示最後更新時間；再下方「立即重新生成 XML」Default 按鈕 + 小字說明；「美安預設分類名稱」輸入框 + helper text。

§3 XML 必填欄位對應說明：灰底唯讀說明表格（7 列），底部顯示橘色警告 Alert「產品說明如果只有圖片或影片將不通過驗測」。

請同時設計「API Key 已儲存狀態」：Key 欄位顯示 •••••• + 右側「重新設定」連結。請參考上傳文件中 Screen 1 的規格。
```

---

### Screen 2 — 訂單列表頁（美安修改版）

```
請幫我設計「訂單管理」列表頁的美安修改版 UI。桌面後台，Element Plus，無圓角。此為現有訂單列表頁的修改，請在既有設計基礎上新增美安相關元素。

修改重點：
1. 篩選列新增「訂單來源」Select（全部 / 美安訂單 / 一般訂單）
2. Table 新增「訂單來源」欄（80px 寬）：美安訂單顯示綠色 pill tag「美安」，一般訂單此欄空白
3. 工具列末端新增「匯出美安報表」Default 按鈕

請設計兩個狀態：
A. 全部訂單（混合美安與一般訂單，部分列顯示「美安」tag）
B. 篩選美安訂單後的 Empty State（無美安訂單時，headline「目前沒有美安訂單」）

請參考上傳文件中 Screen 2 的規格。
```

---

### Screen 3 — 訂單詳情頁：美安訂單資訊卡片

```
請幫我設計「訂單詳情頁」下方的「美安訂單資訊」卡片元件，共 5 種狀態。桌面後台，Element Plus，無圓角。

卡片標題「美安訂單資訊」，首行永遠顯示「✅ 此為美安來源訂單」。

請設計以下 5 種狀態（每種獨立呈現）：
A. 成功：「✅ 已傳送至美安」+ 傳送時間 + 「查看傳送 LOG」連結
B. 失敗：「❌ 傳送失敗」+ 錯誤訊息紅字 + 「重新傳送至美安」Primary 按鈕
C. 等待：「⏳ 等待訂單確認成立後自動傳送」灰色文字
D. 可取消：「✅ 已傳送（原確認成立）」+ 橘色「傳送未完成交易至美安」Warning 按鈕 + 小字說明
E. 已取消：「✅ 已傳送」+ 「已傳送未完成交易（YYYY/MM/DD HH:mm）」

卡片最底部保留一個分隔線 + 灰色「手動傳送此訂單至美安」按鈕（最高權限限定，加灰色小字說明）。請參考上傳文件中 Screen 3 的規格。
```

---

### Screen 4 — 傳送未完成交易確認 Dialog

```
請幫我設計「確認傳送取消通知」的 el-dialog 彈窗 UI。Dialog 寬 400px，無圓角，Element Plus。

Dialog 標題「確認傳送取消通知」。Body 文字「確定要通知美安此訂單（#ORD-20260505-001）已取消？」。下方橘色 el-alert warning「操作成功後，此按鈕將消失，無法重複操作。」

底部按鈕：「取消」(Default) 與「確認傳送」(Warning 橘色)。請同時設計「確認傳送」的 loading 狀態。請參考上傳文件中 Screen 4 的規格。
```

---

### Screen 5 — 手動傳送確認 Dialog（最高權限）

```
請幫我設計「手動傳送訂單至美安」的 el-dialog 彈窗 UI。Dialog 寬 440px，無圓角，Element Plus。此為最高權限限定操作。

Dialog 標題「手動傳送訂單至美安」。橘色 el-alert warning 說明「此操作將強制傳送訂單 #ORD-20260505-001 至美安平台。此為人工補傳操作，請確認此訂單確實為美安來源訂單。」

下方輸入框 label「請輸入「確認」以繼續：」，placeholder「確認」。

底部按鈕：「取消」(Default) 與「確認傳送」(Primary)。

請設計兩個狀態：
1. 輸入框空白或非「確認」— 「確認傳送」按鈕 disabled 灰色
2. 輸入框 = "確認" — 「確認傳送」按鈕啟用

請參考上傳文件中 Screen 5 的規格。
```

---

### Screen 6 — 美安報表匯出確認 Dialog

```
請幫我設計「匯出美安報表」的 el-dialog 彈窗 UI。Dialog 寬 480px，無圓角，Element Plus。

Dialog 標題「匯出美安報表」。Body 文字「將匯出 156 筆美安訂單資料（已排除取消訂單）」。

下方「篩選時間範圍」欄位（el-date-picker daterange，可清空，placeholder「不選則匯出全部歷史記錄」）。欄位下方小字灰色說明「僅匯出美安訂單，且排除已取消訂單」。

底部按鈕：「取消」(Default) 與「確認匯出」(Primary)。請同時設計「確認匯出」的 loading 狀態。

請同時設計選取時間範圍後的狀態（Body 文字動態更新為「符合條件的美安訂單共 38 筆」）。請參考上傳文件中 Screen 6 的規格。
```

---

### 完整產品一次生成（可選）

```
請幫我設計「Evomni 美安串接」的完整後台 UI，共 6 個畫面/元件。桌面後台，Element Plus，無圓角，Noto Sans TC，Primary #303133，Brand blue #409EFF。

包含：
1. 美安串接設定頁：三區塊（API 設定 / XML Feed / 欄位說明），API Key 儲存後遮罩
2. 訂單列表頁修改：新增「訂單來源」篩選 + 美安 pill tag + 「匯出美安報表」按鈕
3. 訂單詳情頁美安卡片：5 種狀態（成功 / 失敗+重傳 / 等待 / 可取消 / 已取消）
4. 傳送取消確認 Dialog（橘色 Warning 按鈕 + 不可逆警示）
5. 手動補傳確認 Dialog（最高權限，需輸入「確認」文字啟用按鈕）
6. 美安報表匯出確認 Dialog（日期篩選選填 + 動態筆數）

關鍵設計要點：訂單詳情頁美安卡片的 5 種狀態需清楚區分（圖示 + 顏色 + 文字），所有不可逆操作需有明確警示。請參考上傳的完整 UX Spec 文件。
```
