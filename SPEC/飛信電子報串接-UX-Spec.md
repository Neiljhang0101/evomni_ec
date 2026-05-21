# 飛信電子報串接 — Design Brief + UX Spec

> **Version:** 1.0
> **Created:** 2026-05-14
> **用途：** 上傳至 Claude Design，配合文件末尾的 Prompt Cheatsheet 使用

---

## Part 1 — Design Brief

### Product Vision

飛信電子報串接讓 Evomni 商家無需自行研究 API，就能在後台完成飛信帳號申請、Token 串接、訂閱者名單一鍵同步——從此發送大量 EDM 時不需手動匯出 CSV 再上傳，Evomni 的訂閱者名單與飛信系統隨時保持同步，商家只需前往飛信後台選用最新名單發送即可。

### Target User

**Primary：** 進階電商包商家管理員 — 有定期發送 EDM 需求的電產品牌，希望訂閱者名單與飛信電子報系統保持同步，不想手動匯出 CSV

**Secondary：** 電商啟航方案商家管理員 — 加費串接用戶，同樣需要此功能但透過升級或加費取得

### Design Goals

| # | Goal | How to test |
|---|---|---|
| 1 | 首次使用的商家能在 5 分鐘內完成申請→取 Token→串接的完整流程 | 計時用戶從進入設定頁到看到「已串接」綠色 Banner 的時間 |
| 2 | 商家在 Token 失效時主動發現並知道如何修復，不需聯繫客服 | 模擬 Token 失效狀態，觀察用戶是否能自行完成重設 Token |
| 3 | 商家確認匯出後知道名單在飛信系統中叫什麼名稱 | 訪問商家是否能說出上次匯出在飛信的群組名稱 |

### Design Principles

1. **引導優先，術語後置** — 開通流程的步驟說明要用商家語言（「前往信箱登入」），避免「Token」「API」等術語出現在主標題
2. **狀態一目了然** — 已串接 / 未串接 / Token 失效三種狀態用顏色 + 圖示同時傳達，頂部 Banner 一進頁面就能判斷
3. **不可逆操作需要欄截** — 重新設定 Token 與停用串接均需 Dialog 確認，且說明文字需明確描述後果

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
  - 串接狀態三種顏色（綠/橘/灰）需同時搭配圖示（🟢 / ⚠️ / ❌），不可只靠顏色傳達
  - 步驟引導的編號（①②③④）需提供足夠文字替代，不可僅以數字符號表達層次
  - Token 輸入框（Textarea）需支援鍵盤貼上，不可阻擋 Ctrl+V

### Hard Constraints

- ⚠️ API Token 不可以任何形式顯示在前端（儲存後只顯示「已設定（最後更新：{日期}）」）
- ⚠️ 啟航方案用戶若未加費串接，不顯示開通引導，改顯示升級 CTA（使用 UpgradeLockBanner 元件）
- ⚠️ 「匯出至飛信」按鈕僅在已完成串接時顯示，未串接時完全隱藏（非 disabled）
- ⚠️ 本頁不設計飛信帳號密碼的填寫，飛信帳號創建由系統自動呼叫 API 完成

### Out of Scope

- 飛信後台的 EDM 設計與發送流程（第三方系統）
- 飛信帳號費用查詢、方案選擇（請洽飛信客服）
- 自動排程定時同步（目前為手動觸發一鍵同步）
- 訂閱者名單的分群匯出（整批匯出，不支援條件篩選）

---

## Part 2 — Screen Index

| # | Screen Name | Navigation path | Primary user goal |
|---|---|---|---|
| 1 | 串接設定頁（未串接狀態）| 全域設定 > 電子報 > 飛信電子報設定 | 完成帳號申請 → 取 Token → 貼入完成串接 |
| 2 | 串接設定頁（已串接狀態）| 全域設定 > 電子報 > 飛信電子報設定 | 確認串接狀態、前往飛信後台、查看匯出紀錄 |
| 3 | 訂閱管理頁（匯出功能修改）| 全域設定 > 電子報 > 訂閱管理 | 一鍵將訂閱者名單同步至飛信 |
| 4 | 匯出確認 Dialog | 訂閱管理頁點擊「匯出至飛信」 | 確認匯出範圍並送出 |
| 5 | 重新設定 Token 確認 Dialog | 串接設定頁（已串接）點擊「重新設定 Token」 | 確認中斷現有串接並重設 Token |
| 6 | 停用串接確認 Dialog | 串接設定頁（已串接）點擊「停用飛信串接」 | 確認停用並了解後果（名單不刪除）|

---

## Part 3 — Per-Screen UX Spec

---

### Screen 1: 串接設定頁（未串接狀態）

**Purpose：** 引導商家完成飛信帳號申請、取得 API Token、貼入 Evomni 後台完成串接，全程不需離開後台研究飛信 API。
**Entry points：** 左側 Sidebar > 全域設定 > 電子報 > 飛信電子報設定（首次進入，或停用後重新啟用）
**Primary user goal：** 從零開始完成串接，取得可用的飛信電子報連結

> 📌 此頁包含多個子狀態（申請前 / 申請中 / 申請成功 / 帳號已存在 / 申請失敗 / Token 驗證失敗），以及一個針對啟航方案用戶的升級 CTA 狀態。

#### Information Hierarchy

```
H1 (most prominent): 飛信電子報串接設定
H2 (secondary): 🔗 尚未與飛信電子報完成串接（狀態 Banner）
Primary CTA: 開始使用飛信電子報（申請前）/ 驗證並完成串接（Token 輸入後）
Supporting info: 注意事項 Alert、步驟引導、Token 輸入欄位
```

#### Actual Copy

**Page / Section Headings**
- Page title: `飛信電子報串接設定`
- Breadcrumb: `全域設定 / 電子報 / 飛信電子報設定`

**狀態 Banner（未串接）**
- `🔗 尚未與飛信電子報完成串接`

**產品說明文字**
- `飛信電子報是台灣專業的 EDM 發送服務，適合大量、高頻率的電子報發送。串接後可將 Evomni 的訂閱者名單一鍵同步到飛信系統。`

**注意事項 Alert（el-alert type="info"）**
- 第一條：`網站需已設定正式域名（非測試網域）才能申請飛信帳號`
- 第二條：`飛信帳號費用由飛信電子報方案決定，與 Evomni 方案費用分開計費`
- 第三條：`如有費用或使用問題，請直接聯繫飛信客服`

**Button Labels（申請前）**
- Primary action: `開始使用飛信電子報`
- Loading state: `申請中，請稍候…`

**申請成功後顯示（el-result icon="success"）**
- Title: `飛信帳號申請成功！`
- 說明: `接下來請完成以下步驟取得 API Token：`
- 步驟 ①: `前往您的信箱，使用飛信寄出的帳號密碼登入飛信後台`
- 步驟 ① 連結: `前往飛信後台登入`（開新分頁）
- 步驟 ②: `登入後，點擊右上角「帳號管理」→「API 管理」→「顯示 Token」`
- 步驟 ③: `輸入密碼確認後，複製 Token 代碼`
- 步驟 ④: `回到此頁，將 Token 貼入下方欄位`

**帳號已存在（el-alert type="warning"）**
- `⚠️ 此網站的帳號在飛信系統中已存在。`
- `請直接前往飛信後台登入，取得 API Token 後貼入下方欄位即可完成串接。`
- 連結: `前往飛信後台`（開新分頁）

**申請失敗（el-alert type="error"）**
- `❌ 帳號申請失敗（錯誤代碼：{code}）`
- `可能原因：域名尚未生效、或服務暫時無法使用。`
- `請稍後再試，或聯繫飛信客服：support@flydove.net`
- 次要按鈕: `重新嘗試`

**Token 輸入區塊（申請成功/帳號已存在後顯示）**
- Section title: `貼入 API Token`
- Helper text: `請從飛信後台「帳號管理 > API 管理」取得您的 Token 代碼`

**Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| API Token | `貼入從飛信後台複製的 API Token` | — | 見下方驗證錯誤 |

**Button Labels（Token 驗證）**
- Primary action: `驗證並完成串接`
- Loading state: `驗證中…`

**Token 驗證錯誤**

| Error condition | Message shown to user |
|---|---|
| Token 欄位空白 | `請填入 API Token 才能進行驗證` |
| Token 長度不足（< 20 字元）| `Token 格式異常，請確認是否完整複製` |
| 驗證失敗（飛信 API 回應失敗）| el-alert type="error"：`❌ Token 驗證失敗。請確認：1. 是否完整複製了 Token（頭尾不可有空格）2. Token 是否已過期（飛信 Token 需定期更新）請重新取得 Token 後再試。` |

**啟航方案用戶（UpgradeLockBanner 變體）**
- Banner title: `🔒 此功能為「進階電商包」標配功能`
- Banner body: `升級後即可使用「飛信電子報串接」，一鍵同步訂閱者名單，輕鬆發送大量 EDM`
- CTA: `了解進階電商包`

**Loading State**
- 「開始使用飛信電子報」按鈕按下後：按鈕 loading spinner，文字「申請中，請稍候…」，禁用按鈕
- Token 驗證中：按鈕 loading，文字「驗證中…」

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 狀態 Banner（未串接）| el-alert type="info"，背景 #F4F4F5，圖示 🔗，:closable=false | 靜態顯示 |
| 注意事項 Alert | el-alert type="info"，3 條 ul 清單 | 靜態顯示 |
| 開始使用按鈕 | el-button type="primary" size="large" !rounded-none，:loading 狀態 | 點擊觸發飛信帳號申請 API |
| 申請成功 el-result | el-result icon="success"，含步驟引導 | — |
| 步驟引導列表 | ol 有序清單，①②③④，帶連結行 | — |
| 前往飛信後台連結 | el-link type="primary"，target="_blank" | 開新分頁 |
| 帳號已存在 Alert | el-alert type="warning" :closable=false | — |
| 申請失敗 Alert | el-alert type="error" :closable=false | — |
| Token Textarea | el-input type="textarea" rows=3，:minlength=20 | 貼上觸發即時長度檢查 |
| 驗證並完成串接按鈕 | el-button type="primary" !rounded-none，:loading 狀態 | 點擊觸發表單驗證與飛信 Token 驗證 API |
| Token 驗證失敗 Alert | el-alert type="error" :closable=false，多行文字 | — |
| UpgradeLockBanner（啟航方案）| 同方案管理 UpgradeLockBanner 元件，feature="飛信電子報串接"，required-plan="進階電商包" | 點擊 CTA 導向 /subscription/upgrade |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 初始（未申請）| 首次進入，status=disconnected | 說明文字 + 注意事項 Alert + 「開始使用」按鈕 |
| 申請中 | 點擊「開始使用飛信電子報」 | 按鈕 loading，文字「申請中，請稍候…」|
| 申請成功 | 飛信 API 回應成功 | el-result success + 步驟引導 + Token 輸入框 |
| 帳號已存在 | 飛信 API 回應帳號已存在 | 橘色 Alert + Token 輸入框 |
| 申請失敗 | 飛信 API 回應錯誤 | 紅色 Alert + 「重新嘗試」按鈕 |
| Token 驗證中 | 點擊「驗證並完成串接」 | 按鈕 loading |
| Token 驗證成功 | 飛信 API 驗證通過 | 整頁切換為 Screen 2（已串接狀態）|
| Token 驗證失敗 | 飛信 API 驗證失敗 | 紅色 Alert，Token 欄位保留 |
| 啟航方案用戶 | 帳號方案 = ecommerce_starter，未加費 | 顯示 UpgradeLockBanner，不顯示申請按鈕 |
| Loading（頁面初始）| 進入頁面 | Skeleton 取代 Banner 與說明區塊 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「開始使用飛信電子報」 | 按鈕 loading → API 申請 → 依結果切換為「申請成功 / 帳號已存在 / 申請失敗」狀態 |
| 點擊「前往飛信後台登入」/ 「前往飛信後台」| 開啟飛信後台登入頁（新分頁）|
| 貼入 Token → 點擊「驗證並完成串接」| 本地格式驗證 → API 驗證 → 成功切換 Screen 2 |
| 點擊「重新嘗試」（申請失敗後）| 重新觸發帳號申請 API |
| 點擊「了解進階電商包」（啟航方案）| 導向 /subscription/upgrade |

---

### Screen 2: 串接設定頁（已串接狀態）

**Purpose：** 讓商家管理員確認串接連線狀態、快速跳轉至飛信後台、管理 Token、以及查看歷次名單匯出紀錄。
**Entry points：** Token 驗證成功後自動切換；或日後再次進入全域設定 > 電子報 > 飛信電子報設定
**Primary user goal：** 確認串接正常，必要時快速前往飛信後台發 EDM

#### Information Hierarchy

```
H1 (most prominent): 飛信電子報串接設定
H2 (secondary): 串接狀態 Banner（🟢 連線正常 / ⚠️ Token 失效 / ⚠️ 無法連線）
Primary CTA: 前往飛信後台
Secondary CTA: 重新設定 Token
Supporting info: Token 管理卡片、使用說明卡片、匯出紀錄 Table
```

#### Actual Copy

**Page / Section Headings**
- Page title: `飛信電子報串接設定`
- Breadcrumb: `全域設定 / 電子報 / 飛信電子報設定`
- 左卡片標題: `Token 管理`
- 右卡片標題: `使用說明`
- 匯出紀錄區 title: `匯出紀錄`

**串接狀態 Banner（三種）**

| 狀態 | Banner 文字 | 背景色 |
|---|---|---|
| 連線正常 | `🟢 已與飛信電子報完成串接　串接時間：{YYYY/MM/DD HH:mm}` | #F0FFF4（淡綠）|
| Token 已失效 | `⚠️ Token 已失效，請重新設定 Token 才能使用匯出功能` | #FEF9EC（淡橘）|
| 無法連線飛信 | `⚠️ 無法連線到飛信服務，建議稍後再試` | #F4F4F5（淡灰）|

**Button Labels**
- Primary action: `前往飛信後台`（el-button type="default"，開新分頁）
- Secondary action: `重新設定 Token`（el-button type="default" !rounded-none）
- Destructive action: `停用飛信串接`（el-button type="danger" plain !rounded-none）

**Token 管理卡片內容**
- Token 狀態 label: `API Token：`
- Token 狀態 value（連線正常）: `✅ 已設定（最後更新：{YYYY/MM/DD}）`
- Token 狀態 value（失效）: `❌ Token 已失效，請重新設定`

**使用說明卡片內容**
- 說明 1: `ℹ️ 停用串接不會刪除您在飛信系統的帳號或名單`
- 說明 2: `ℹ️ Token 若過期，系統將在下次進入此頁時顯示警示`
- 說明 3: `ℹ️ 飛信電子報發送費用請洽飛信官方客服`

**匯出紀錄 Table Column Headers**
- `匯出時間` / `匯出筆數` / `狀態` / `飛信群組名` / `操作`

**Status Labels**

| Status key | Display text | Colour semantic |
|---|---|---|
| success | `成功` | Success #67C23A |
| partial_failed | `部分失敗` | Warning #E6A23C |
| failed | `失敗` | Danger #F56C6C |

**操作欄**
- 「查看詳情」連結：點擊展開顯示失敗 Email 清單（若有）

**Empty State — 匯出紀錄**
- Headline: `尚未有匯出記錄`
- Subtext: `點擊「訂閱管理」頁的「匯出至飛信」按鈕，將訂閱者名單同步至飛信電子報系統`
- CTA label: — （無，導向按鈕在另一頁）

**Error States**

| Error condition | Message shown to user |
|---|---|
| 頁面 API 載入失敗 | `無法載入設定，請重新整理頁面` + 重新整理按鈕 |
| Token 靜默驗證失敗（API 5xx）| 顯示「無法連線到飛信服務」橘灰色 Banner（非 Token 問題，不觸發重設引導）|

**Loading State**
- 頁面初始進入：Skeleton 取代兩個卡片 + 匯出紀錄 Table
- Token 靜默驗證中（背景）：頁面正常顯示，驗證完成後更新 Banner 顏色（不阻塞渲染）

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 串接狀態 Banner | el-alert 3 種 type（success/warning/info），:closable=false | 靜態顯示 |
| 前往飛信後台按鈕 | el-button type="default" !rounded-none，suffix ArrowRight icon | 點擊開啟飛信後台（新分頁）|
| 兩欄卡片 Grid | el-row :gutter="16"，各含 el-card shadow="never" | — |
| Token 狀態顯示 | 14px，icon + 文字（✅ / ❌）| — |
| 重新設定 Token 按鈕 | el-button type="default" !rounded-none | 點擊開啟確認 Dialog（Screen 5）|
| 停用飛信串接按鈕 | el-button type="danger" plain !rounded-none | 點擊開啟確認 Dialog（Screen 6）|
| 使用說明清單 | ul，ℹ️ icon + 文字，#606266 13px | — |
| 匯出紀錄 Table | el-table，stripe，highlight-current-row | Row hover 高亮 |
| 狀態 Badge | el-tag，success/warning/danger，size="small" | — |
| 查看詳情連結 | el-link type="primary"，展開失敗 Email 清單 | 點擊展開 el-collapse |
| 失敗 Email 展開 | el-collapse，顯示 failed_emails 陣列 | 展開/收起 |
| Empty State（紀錄）| 置中文字 + 📋 圖示 | — |
| Skeleton | el-skeleton，mimics 兩卡 + Table | 頁面初始載入 |

**Sortable Columns — 匯出紀錄 Table**

| 欄位 | 可排序 | 備注 |
|---|---|---|
| 匯出時間 | ✅ | **預設排序：降序（最新在上）** |
| 匯出筆數 | ❌ | — |
| 狀態 | ❌ | — |
| 飛信群組名 | ❌ | — |
| 操作 | ❌ | — |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 連線正常 | status=connected + Token 靜默驗證通過 | 綠色 Banner，✅ 連線正常 |
| Token 已失效 | 靜默驗證返回 401 | 橘色警示 Banner，Token 卡片顯示 ❌，匯出功能實際上不可用（但按鈕仍在訂閱管理頁）|
| 無法連線飛信 | 靜默驗證返回 5xx/逾時 | 灰色 Banner，無法判斷 Token 狀態，顯示「建議稍後再試」|
| Loading（初始）| 頁面載入中 | Skeleton 取代兩卡 + Table |
| Empty（無匯出紀錄）| flydove_export_logs 無資料 | Empty State |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「前往飛信後台」 | 開啟飛信後台登入頁（新分頁）|
| 點擊「重新設定 Token」 | 開啟重新設定 Token 確認 Dialog（Screen 5）|
| 點擊「停用飛信串接」 | 開啟停用串接確認 Dialog（Screen 6）|
| 點擊「查看詳情」（有失敗紀錄）| 展開顯示失敗 Email 清單 |
| 點擊匯出時間欄排序 | 切換升序 / 降序 |

---

### Screen 3: 訂閱管理頁（匯出至飛信修改）

**Purpose：** 在現有電子報訂閱管理頁新增「匯出至飛信」按鈕，讓商家一鍵將當前訂閱者名單同步至飛信系統。
**Entry points：** 左側 Sidebar > 全域設定 > 電子報 > 訂閱管理（現有頁面修改）
**Primary user goal：** 快速將最新訂閱者名單同步至飛信，讓飛信後台有最新名單可用

> 📌 此為現有訂閱管理頁的修改版，僅在工具列新增「匯出至飛信」按鈕，以及在匯出結果後顯示 Alert。

#### Information Hierarchy

```
新增按鈕: 匯出至飛信（工具列末端，僅已串接時顯示）
匯出結果: 成功 Toast / 部分失敗 Alert / 全部失敗 Alert（操作後顯示）
Supporting info: 0 筆訂閱者防呆提示
```

#### Actual Copy

**新增按鈕**
- Button: `匯出至飛信`（el-button type="default" !rounded-none）

**0 筆訂閱者防呆（點擊匯出但無有效訂閱者）**
- el-message type="warning"：`目前沒有有效訂閱者可匯出`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 匯出進行中（背景 Job）| `正在匯出 {N} 筆名單至飛信，請稍候…`（el-message type="info"）|
| 匯出全部成功 | `✅ 已成功將 {N} 筆訂閱者匯出至飛信電子報系統。飛信後台中可使用名單：『{YYYY-MM-DD HH:mm} 匯出』` |
| 部分失敗（頁頂 Alert）| `⚠️ 匯出部分完成：{成功N} 筆匯出成功，{失敗M} 筆匯出失敗。失敗原因通常為 Email 格式異常。` + 連結「下載失敗名單 CSV」|
| 全部失敗（頁頂 Alert）| `❌ 匯出失敗。可能原因：飛信 API Token 已過期或網路連線問題。請前往「飛信電子報設定」頁重新驗證 Token 後再試。` + 連結「前往設定」|

**Error States**

| Error condition | Message shown to user |
|---|---|
| 無有效訂閱者 | `目前沒有有效訂閱者可匯出`（el-message warning，不送出 API）|
| 全部匯出失敗 | 頁頂 el-alert type="error" + 「前往設定」連結 |

**Loading State**
- 「匯出至飛信」按鈕按下後：開啟確認 Dialog（Screen 4），按鈕本身不 loading

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 匯出至飛信按鈕 | el-button type="default" !rounded-none，位於工具列末端 | 點擊先檢查訂閱者數量，>0 則開啟確認 Dialog；=0 則顯示 warning message |
| 進行中 Toast | el-message type="info" | 確認匯出後顯示，3s 自動消失 |
| 部分失敗 Alert | el-alert type="warning"，置頂，含「下載失敗名單 CSV」el-link | :closable=true |
| 全部失敗 Alert | el-alert type="error"，置頂，含「前往設定」el-link | :closable=true |
| 下載失敗名單 | el-link type="primary" | 點擊下載 CSV 檔（含失敗 Email 清單）|
| 前往設定連結 | el-link type="primary" | 點擊導向 /global-settings/newsletter/flydove |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default（已串接）| 已完成飛信串接 | 工具列顯示「匯出至飛信」按鈕 |
| Default（未串接）| 尚未完成飛信串接 | 「匯出至飛信」按鈕完全隱藏（v-if false）|
| 0 筆訂閱者 | 點擊時名單為空 | el-message warning 提示，不開啟 Dialog |
| 匯出成功 | Job 完成，全部成功 | 成功 Toast 顯示名單筆數與飛信群組名 |
| 部分失敗 | Job 完成，部分失敗 | 橘色頁頂 Alert + 下載 CSV 連結 |
| 全部失敗 | Job 完成，全部失敗 | 紅色頁頂 Alert + 前往設定連結 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「匯出至飛信」（有訂閱者）| 開啟匯出確認 Dialog（Screen 4）|
| 點擊「匯出至飛信」（0 筆）| 顯示 warning message，不開啟 Dialog |
| 點擊「下載失敗名單 CSV」 | 下載含失敗 Email 的 CSV 檔案 |
| 點擊「前往設定」 | 導向飛信串接設定頁（Screen 2）|

---

### Screen 4: 匯出確認 Dialog

**Purpose：** 讓商家確認匯出筆數與飛信群組命名，避免誤操作，並明確知道此次同步在飛信系統的名稱。
**Entry points：** 訂閱管理頁點擊「匯出至飛信」（有效訂閱者 > 0）
**Primary user goal：** 確認後觸發非同步匯出 Job

#### Information Hierarchy

```
H1 (most prominent): 確認匯出（Dialog 標題）
H2 (secondary): 匯出筆數說明 + 飛信群組命名說明
Primary CTA: 確認匯出
Secondary CTA: 取消
```

#### Actual Copy

**Dialog Title**
- `確認匯出`

**Body Text**
- `將匯出 {N} 筆有效訂閱者至飛信電子報系統。`
- `在飛信系統中，此批名單將以「{YYYY-MM-DD HH:mm} 匯出」命名儲存。`

**Button Labels**
- Primary action: `確認匯出`
- Secondary action: `取消`
- Loading state: `匯出中…`

**Toast / Notification Messages**（確認後出現在訂閱管理頁）

| Trigger | Message |
|---|---|
| 匯出 Job 已啟動 | `正在匯出 {N} 筆名單至飛信，請稍候…` |

**Error States**（在訂閱管理頁顯示，不在此 Dialog 內）

| Error condition | Message shown to user |
|---|---|
| API 失敗（Dialog 關閉前）| el-message type="error"：`匯出啟動失敗，請稍後再試` |

**Loading State**
- 「確認匯出」按鈕按下後：Dialog 關閉，匯出 Toast 顯示在訂閱管理頁（非同步 Job）

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Dialog 容器 | el-dialog width="440px" !rounded-none，close-on-click-modal=false | Overlay 點擊不關閉 |
| 匯出筆數說明 | 14px #303133，{N} 為動態數字 | — |
| 飛信群組命名說明 | 14px #606266，群組名顯示為「2026-05-14 10:30 匯出」格式 | — |
| 取消按鈕 | el-button type="default" !rounded-none | 關閉 Dialog |
| 確認匯出按鈕 | el-button type="primary" !rounded-none | 點擊啟動 Job，Dialog 關閉，進行中 Toast 出現 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | Dialog 開啟 | 顯示筆數 + 群組命名 + 兩個按鈕 |
| 送出中 | 點擊「確認匯出」| Dialog 立即關閉，訂閱管理頁顯示進行中 Toast |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「取消」 | 關閉 Dialog，返回訂閱管理頁，不觸發任何 Job |
| 點擊「確認匯出」 | Dialog 關閉 → 後台啟動非同步匯出 Job → 訂閱管理頁顯示進行中 Toast |

---

### Screen 5: 重新設定 Token 確認 Dialog

**Purpose：** 讓商家確認重新設定 Token 的後果（串接中斷、需重新貼入），防止誤操作。
**Entry points：** 已串接狀態頁點擊「重新設定 Token」
**Primary user goal：** 確認中斷現有串接，並準備重新完成 Token 驗證

#### Information Hierarchy

```
H1 (most prominent): 確認重新設定 Token（Dialog 標題）
H2 (secondary): 後果說明
Primary CTA: 繼續重新設定
Secondary CTA: 取消
```

#### Actual Copy

**Dialog Title**
- `確認重新設定 Token`

**Body Text**
- `重新設定 Token 將斷開目前的飛信串接。您需要重新貼入新的 Token 才能恢復使用匯出功能。`

**Button Labels**
- Primary action: `繼續重新設定`
- Secondary action: `取消`

**Toast / Notification Messages**（確認後）

| Trigger | Message |
|---|---|
| 確認後跳轉 Token 輸入頁 | （無 Toast，直接切換至 Screen 1 的 Token 輸入狀態）|

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Dialog 容器 | el-dialog width="400px" !rounded-none，close-on-click-modal=false | — |
| 後果說明文字 | 14px #606266 | — |
| 取消按鈕 | el-button type="default" !rounded-none | 關閉 Dialog，返回已串接狀態頁 |
| 繼續重新設定按鈕 | el-button type="primary" !rounded-none | 點擊清除 Token，切換至 Screen 1（Token 輸入狀態）|

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | Dialog 開啟 | 說明文字 + 兩個按鈕 |
| 確認後 | 點擊「繼續重新設定」| Dialog 關閉，頁面切換至 Screen 1 Token 輸入狀態 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「取消」 | 關閉 Dialog，返回已串接狀態頁（Screen 2），不執行任何操作 |
| 點擊「繼續重新設定」 | 後端清除 Token，切換頁面至 Screen 1 Token 輸入區（保留「帳號已存在」Alert + Token 輸入框）|

---

### Screen 6: 停用串接確認 Dialog

**Purpose：** 讓商家確認停用飛信串接的後果（匯出功能停用，飛信端帳號與名單不受影響），防止誤操作。
**Entry points：** 已串接狀態頁點擊「停用飛信串接」
**Primary user goal：** 確認停用，並理解飛信端資料不被刪除

#### Information Hierarchy

```
H1 (most prominent): 確認停用飛信串接（Dialog 標題）
H2 (secondary): 後果說明（匯出停用 + 飛信端資料保留）
Primary CTA: 確認停用
Secondary CTA: 取消
```

#### Actual Copy

**Dialog Title**
- `確認停用飛信串接`

**Body Text**
- `停用後，「匯出至飛信」功能將無法使用。`
- `您在飛信系統的帳號與名單不受影響。`

**Button Labels**
- Primary action: `確認停用`（el-button type="danger" !rounded-none）
- Secondary action: `取消`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 停用成功 | `已停用飛信串接。如需重新啟用，請再次完成 Token 設定。` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Dialog 容器 | el-dialog width="400px" !rounded-none，close-on-click-modal=false | — |
| 後果說明文字 | 14px #606266，兩段 | — |
| 取消按鈕 | el-button type="default" !rounded-none | 關閉 Dialog |
| 確認停用按鈕 | el-button type="danger" !rounded-none，:loading 狀態 | 點擊觸發停用 API，成功後頁面切換至 Screen 1（未串接狀態）|

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | Dialog 開啟 | 說明文字 + 兩個按鈕 |
| 停用中 | 點擊「確認停用」 | 按鈕 loading |
| 停用成功 | API 返回 200 | Dialog 關閉，Toast 顯示，頁面切換至 Screen 1 未串接狀態 |
| 停用失敗 | API 錯誤 | el-message type="error"：`停用失敗，請稍後再試`，Dialog 留存 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「取消」 | 關閉 Dialog，返回已串接狀態頁 |
| 點擊「確認停用」 | loading → API → 成功 Toast + 切換至 Screen 1 未串接狀態 |

---

## Part 4 — Cross-Screen Component Inventory

### Action Components

| 元件 | 變體 | 尺寸 | 狀態 |
|---|---|---|---|
| Button | Primary / Default / Danger / Danger Plain | Large / Medium / Small | Default / Hover / Active / Disabled / Loading |
| el-link | Primary / Default | — | Default / Hover |

### Display Components

| 元件 | 變體 | 資料欄位 | 狀態 |
|---|---|---|---|
| 串接狀態 Banner | 連線正常（綠）/ Token 失效（橘）/ 無法連線（灰）/ 未串接（灰藍）| 狀態文字、串接時間 | 靜態，每次進頁面後端靜默更新 |
| 匯出紀錄 Table | — | 匯出時間、筆數、狀態、群組名、操作 | Default / Hover / Empty |
| el-result | success | title / 步驟引導 | — |
| Token 狀態顯示 | 連線正常 / 失效 | 文字 + 圖示 + 最後更新日期 | — |

### Input Components

| 元件 | 變體 | 狀態 |
|---|---|---|
| Token Textarea | el-input type="textarea" rows=3 | Default / Focus / Filled / Error |

### Navigation Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Sidebar | Expanded / Collapsed | 全域設定 > 電子報 > 飛信電子報設定 |
| Breadcrumb | — | 全域設定 / 電子報 / 飛信電子報設定 |

### Feedback Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Toast（el-message）| success / info / warning / error | 操作回饋，3s 自動消失 |
| el-alert | info / warning / error（:closable=false）| 頁面內嵌警示，不可關閉 |
| el-alert（匯出結果）| warning / error（:closable=true）| 訂閱管理頁頂部，可關閉 |
| el-result | success | 申請成功後顯示的步驟引導 |
| Modal / Dialog | 4 種（匯出確認 / 重設 Token / 停用 / 無其他）| Overlay，點擊外部不關閉 |
| Empty State | 匯出紀錄為空 | Headline + Subtext |
| Loading Skeleton | 設定頁兩卡 + Table | 頁面初始載入 |
| 步驟引導列表 | ol 有序列表（①②③④）| 申請成功後顯示 |
| UpgradeLockBanner | feature="飛信電子報串接" | 啟航方案用戶看到升級 CTA |

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
| 連線正常 Banner 背景 | `#F0FFF4`（淡綠）|
| Token 失效 Banner 背景 | `#FEF9EC`（淡橘）|
| Border colour | `#DCDFE6` |
| Base font | Noto Sans TC |
| Border radius | 0（全域 `!rounded-none`）|
| Spacing unit | 8px grid |

---

## Assumptions

> 📌 假設：「前往飛信後台」的連結 URL 為固定的飛信登入頁（如 `https://www.flydove.net/login`），若飛信 Token 支援 SSO 自動登入，工程師可升級此行為，設計師按固定連結設計即可。

> 📌 假設：Token 靜默驗證在背景非同步執行，頁面渲染不等待驗證結果，完成後再更新 Banner 顏色。頁面初始渲染時顯示 Skeleton，不顯示「驗證中…」文字。

> 📌 假設：電商啟航方案未加費的用戶，在進入飛信串接設定頁時看到 UpgradeLockBanner，不顯示任何申請流程。加費的啟航方案用戶，行為與進階電商包相同。

> 📌 假設：「帳號已存在」狀態下，使用者直接進入 Token 輸入區（不顯示 el-result success 的申請成功畫面），因為帳號並非剛申請，不需要步驟引導中的「前往信箱取密碼」步驟。

> ✏️ Copy 待確認：飛信客服 Email 是否為 `support@flydove.net`，請向飛信確認正確的客服聯絡資訊。

> ✏️ Copy 待確認：飛信後台的 API 管理路徑是否為「帳號管理 > API 管理 > 顯示 Token」，請向飛信確認步驟說明的正確路徑。

---

## Part 6 — Claude Design Prompt Cheatsheet

**使用說明：**
1. 將這份 .md 上傳到 Claude Design
2. 找到你想先做的畫面，複製下方對應的 prompt
3. 貼入 Claude Design 對話框，開始生成
4. 在 Claude Design 中直接對話迭代細節

---

### Screen 1 — 串接設定頁（未串接狀態）

```
請幫我設計「飛信電子報串接設定」的桌面後台設定頁（未串接狀態）。Element Plus 元件，無圓角，Noto Sans TC，左側 Sidebar 導覽（全域設定 > 電子報 > 飛信電子報設定）。

頁面頂部顯示灰藍色狀態 Banner「🔗 尚未與飛信電子報完成串接」。下方說明文字介紹飛信電子報用途，再下方藍色 info Alert 列出三點注意事項（正式域名要求、獨立計費、客服聯絡）。底部「開始使用飛信電子報」大號 Primary 按鈕。

請同時設計兩個申請後的狀態：
A. 申請成功狀態：el-result success 圖示，title「飛信帳號申請成功！」，下方帶編號步驟引導（①②③④，步驟①有「前往飛信後台登入」連結），最底部顯示 API Token 貼入 Textarea + 「驗證並完成串接」按鈕。
B. 帳號已存在狀態：橘色 warning Alert 說明「此網站帳號在飛信系統中已存在」+ 「前往飛信後台」連結，下方直接顯示 Token 輸入框。

請參考上傳文件中 Screen 1 的規格。
```

---

### Screen 2 — 串接設定頁（已串接狀態）

```
請幫我設計「飛信電子報串接設定」的桌面後台設定頁（已串接狀態）。Element Plus，無圓角，左側 Sidebar 導覽。

頁面頂部顯示淡綠色（#F0FFF4）狀態 Banner「🟢 已與飛信電子報完成串接　串接時間：2026/05/05 14:32」，右側「前往飛信後台」Default 按鈕。

Banner 下方兩欄 Grid 卡片：
左卡「Token 管理」：顯示「API Token：✅ 已設定（最後更新：2026/05/05）」，下方「重新設定 Token」Default 按鈕 + 「停用飛信串接」Danger plain 按鈕。
右卡「使用說明」：三條 ℹ️ 說明文字。

下方「匯出紀錄」Section：el-table 顯示最近 5 筆記錄（欄位：匯出時間、匯出筆數、狀態 Badge、飛信群組名、操作）。狀態 Badge：成功=綠、部分失敗=橘、失敗=紅。

請同時設計「Token 已失效」狀態：頂部 Banner 改為橘色「⚠️ Token 已失效，請重新設定 Token 才能使用匯出功能」，左卡 Token 顯示「❌ Token 已失效」。請參考上傳文件中 Screen 2 的規格。
```

---

### Screen 3 — 訂閱管理頁（匯出至飛信修改）

```
請幫我設計「電子報訂閱管理」頁面的修改版 UI（新增「匯出至飛信」功能）。桌面後台，Element Plus，無圓角。此為現有頁面修改，請在工具列末端新增「匯出至飛信」Default 按鈕。

請同時設計三種匯出結果狀態（顯示在頁面頂部）：
A. 全部成功：綠色 success Toast 浮現「✅ 已成功將 256 筆訂閱者匯出至飛信電子報系統。飛信後台中可使用名單：『2026-05-14 10:30 匯出』」
B. 部分失敗：頁頂橘色 el-alert warning「⚠️ 匯出部分完成：230 筆匯出成功，26 筆匯出失敗。失敗原因通常為 Email 格式異常。」含「下載失敗名單 CSV」連結
C. 全部失敗：頁頂紅色 el-alert error「❌ 匯出失敗。可能原因：飛信 API Token 已過期或網路連線問題。請前往「飛信電子報設定」頁重新驗證 Token 後再試。」含「前往設定」連結

請參考上傳文件中 Screen 3 的規格。
```

---

### Screen 4 — 匯出確認 Dialog

```
請幫我設計「確認匯出」的 el-dialog 彈窗 UI。Dialog 寬 440px，無圓角，Element Plus。

Dialog 標題「確認匯出」。Body 文字兩行：「將匯出 256 筆有效訂閱者至飛信電子報系統。」以及「在飛信系統中，此批名單將以『2026-05-14 10:30 匯出』命名儲存。」第二行文字顏色較淡（#606266），強調群組命名格式。

底部：「取消」Default 按鈕 + 「確認匯出」Primary 按鈕。請參考上傳文件中 Screen 4 的規格。
```

---

### Screen 5 — 重新設定 Token 確認 Dialog

```
請幫我設計「確認重新設定 Token」的 el-dialog 彈窗 UI。Dialog 寬 400px，無圓角，Element Plus。

Dialog 標題「確認重新設定 Token」。Body 文字「重新設定 Token 將斷開目前的飛信串接。您需要重新貼入新的 Token 才能恢復使用匯出功能。」

底部：「取消」Default 按鈕 + 「繼續重新設定」Primary 按鈕。請參考上傳文件中 Screen 5 的規格。
```

---

### Screen 6 — 停用串接確認 Dialog

```
請幫我設計「確認停用飛信串接」的 el-dialog 彈窗 UI。Dialog 寬 400px，無圓角，Element Plus。

Dialog 標題「確認停用飛信串接」。Body 文字兩句：「停用後，「匯出至飛信」功能將無法使用。」以及「您在飛信系統的帳號與名單不受影響。」

底部：「取消」Default 按鈕 + 「確認停用」Danger 紅色按鈕。請參考上傳文件中 Screen 6 的規格。
```

---

### 完整產品一次生成（可選）

```
請幫我設計「Evomni 飛信電子報串接」的完整後台 UI，共 6 個畫面。桌面後台，Element Plus，無圓角，Noto Sans TC，Primary #303133，Brand blue #409EFF。

包含：
1. 串接設定頁（未串接）：狀態 Banner + 申請按鈕 + 申請成功後的步驟引導 + Token 輸入區
2. 串接設定頁（已串接）：綠色連線 Banner + 兩欄卡片（Token 管理 + 使用說明）+ 匯出紀錄 Table，以及 Token 失效的橘色警示狀態
3. 訂閱管理頁修改：工具列新增「匯出至飛信」按鈕 + 三種匯出結果狀態（成功/部分失敗/全部失敗）
4. 匯出確認 Dialog：含匯出筆數與飛信群組命名說明
5. 重新設定 Token 確認 Dialog：後果說明（串接中斷）
6. 停用串接確認 Dialog：後果說明（飛信端資料保留）+ 紅色確認按鈕

關鍵設計要點：未串接 vs. 已串接是兩個完全不同的頁面狀態，需清楚的視覺區分；步驟引導（①②③④）要對不熟悉 API 的商家視覺清晰。請參考上傳的完整 UX Spec 文件。
```
