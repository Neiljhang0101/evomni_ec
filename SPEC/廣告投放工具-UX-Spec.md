# 廣告投放工具（產品廣告小幫手）— Design Brief + UX Spec

> **Version:** 1.0
> **Created:** 2026-05-14
> **用途：** 上傳至 Claude Design，配合文件末尾的 Prompt Cheatsheet 使用
> **備注：** 本功能原名「產品廣告小幫手」，v2.0 更名為「廣告投放工具」

---

## Part 1 — Design Brief

### Product Vision

廣告投放工具讓 Evomni 商家完成廣告追蹤碼設定後，能在後台一站式完成廣告投放的三大操作：生成帶 UTM 標籤的追蹤連結（含短網址和 QR Code）、複製產品目錄 Feed URL 讓廣告平台自動維護最新產品資料、並透過訂單維度的廣告來源報表判斷哪個廣告活動 ROI 最高。商家不再需要在多個工具間跳轉，「買電商系統就附贈廣告工具」是本功能的核心定位。

### Target User

**Primary：** 商家管理員 — 中小型電產品牌的行銷負責人，會投放 Facebook / Google / LINE 廣告，希望追蹤廣告帶來的訂單 ROI，但不熟悉技術細節

### Design Goals

| # | Goal | How to test |
|---|---|---|
| 1 | 商家能在 3 分鐘內生成帶 UTM 的追蹤連結並複製 | 計時用戶從進入 UTM Tab 到複製連結的時間 |
| 2 | 商家能在 5 分鐘內完成 Facebook Feed 設定（複製 URL 到廣告平台）| 計時從進入 Feed Tab 到成功複製 Feed URL 的時間 |
| 3 | 商家能正確說出哪個廣告活動帶來最多訂單 | 請商家讀取廣告來源分析報表並回答問題，答對率目標 90%+ |
| 4 | 商家不會混淆「廣告投放工具」與「行銷工具設定」的功能邊界 | 觀察商家是否嘗試在本頁設定 Pixel ID |

### Design Principles

1. **即時反饋** — UTM 網址生成器右側預覽需即時更新（debounce 200ms），讓商家不需點擊就能看到最終連結
2. **功能邊界清楚** — 頁面頂部 info banner 明確說明追蹤碼設定在「行銷工具設定」，避免商家找錯地方
3. **複製即用** — Feed URL 和短網址的「複製」按鈕視覺要比所有其他操作更突出，因為這是商家最終目的

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
  - UTM 必填欄位需同時用 `*` 星號與顏色區分，不可只靠顏色
  - QR Code 預覽圖需提供 `alt text`（QR Code：{短網址}）
  - 廣告來源分析報表的轉換漏斗需同時顯示數字與百分比，不可只靠條狀長短傳達

### Hard Constraints

- ⚠️ 廣告追蹤碼（Facebook Pixel ID / GA4 Measurement ID / LINE Tag）不在此頁設定，必須在頁面頂部明確標示並連結至行銷工具設定
- ⚠️ Feed URL 含 token 保護，不可在前端顯示無 token 的 Feed URL
- ⚠️ 短網址格式固定為 `{store_domain}/go/{6碼英數}`，不可自訂 code
- ⚠️ UTM 模板最多 20 個，超過時需提示並引導刪除

### Out of Scope

- 廣告帳號連結（Facebook Business Manager 帳號授權、Google Ads 帳號連結）
- 廣告活動自動創建（自動在廣告平台建立廣告）
- A/B 測試工具
- 廣告預算追蹤（ROI 計算含廣告費用）——目前僅追蹤訂單 GMV，不含廣告支出

---

## Part 2 — Screen Index

| # | Screen Name | Navigation path | Primary user goal |
|---|---|---|---|
| 1 | UTM 網址生成器（Tab 1）| 行銷管理 > 廣告投放工具 > UTM 網址生成器 | 生成帶 UTM 標籤的追蹤連結、短網址、QR Code |
| 2 | 儲存 UTM 模板 Dialog | UTM 生成器點擊「儲存為模板」 | 儲存常用 UTM 參數組合，方便重複使用 |
| 3 | 產品目錄 Feed（Tab 2）| 行銷管理 > 廣告投放工具 > 產品目錄 Feed | 複製 Facebook/Google Feed URL 到廣告平台 |
| 4 | 廣告來源分析（Tab 3）| 行銷管理 > 廣告投放工具 > 廣告來源分析 | 查看各廣告活動帶來的訂單數與 GMV |
| 5 | 廣告來源訂單清單 Drawer | 廣告來源分析點擊某維度的「訂單數」| 查看此廣告來源下的具體訂單明細 |

---

## Part 3 — Per-Screen UX Spec

---

### Screen 1: UTM 網址生成器（Tab 1）

**Purpose：** 讓商家選擇目標頁面、填寫 UTM 參數後即時生成追蹤連結，提供完整 URL、短網址、QR Code 三種輸出格式。
**Entry points：** 行銷管理 > 廣告投放工具（預設開啟此 Tab）
**Primary user goal：** 生成帶 UTM 標籤的追蹤連結並複製，用於廣告投放

#### Information Hierarchy

```
H1 (most prominent): 廣告投放工具
Tab Navigation: UTM 網址生成器 / 產品目錄 Feed / 廣告來源分析
Info Banner: 廣告追蹤碼設定入口提示
Left Panel: 目標頁面 + UTM 參數填寫
Right Panel: 完整連結 + 短網址 + QR Code（即時預覽）
Primary CTA: 複製完整連結 / 複製短網址
Secondary CTA: 下載 QR Code（PNG）/ 儲存為模板
```

#### Actual Copy

**Page / Tab Headings**
- Page title: `廣告投放工具`
- Breadcrumb: `行銷管理 / 廣告投放工具`
- Tab 1: `UTM 網址生成器`
- Tab 2: `產品目錄 Feed`
- Tab 3: `廣告來源分析`

**Info Banner（頁面頂部，Tab 切換後持續顯示）**
- `ℹ️ 廣告追蹤碼（Facebook Pixel / GA4 / LINE Tag）設定請前往`「行銷管理 > 行銷工具設定」`，不在此頁設定。`
- 連結: `前往行銷工具設定 →`

**Left Panel — 目標頁面區塊**
- Section title: `目標頁面`
- 頁面類型 label: `頁面類型`
- 頁面類型選項: `特定產品頁` / `產品分類頁` / `商店首頁` / `一頁式商店` / `自訂 URL`

**第二層選擇（依頁面類型顯示）**

| 頁面類型 | 第二層欄位 label | Placeholder |
|---|---|---|
| 特定產品頁 | `選擇產品` | `搜尋產品名稱或 SKU…` |
| 產品分類頁 | `選擇分類` | `選擇產品分類` |
| 商店首頁 | — | — |
| 一頁式商店 | `選擇一頁式商店` | `選擇已建立的一頁式商店` |
| 自訂 URL | `路徑` | `輸入路徑，如 /products 或 /sale` |

**Left Panel — UTM 參數區塊**
- Section title: `UTM 參數`

| Field label | Placeholder text | Required | Helper text |
|---|---|---|---|
| 來源（utm_source）| `如 facebook、google、line…` | ✅ | — |
| 媒介（utm_medium）| `如 paid、email、social…` | ✅ | — |
| 廣告活動（utm_campaign）| `廣告活動名稱，如 2026winter` | ✅ | `建議使用英文 + 數字，避免中文 URL Encode 問題` |
| 廣告內容（utm_content）| `選填，用於區分同一活動中的不同廣告素材` | ❌ | — |
| 關鍵字（utm_term）| `選填，通常用於關鍵字廣告（SEM）的關鍵字` | ❌ | — |

**utm_source 自動補全選項：** `facebook` / `google` / `line` / `instagram` / `email` / `sms` / `qrcode`

**utm_medium 自動補全選項：** `paid` / `cpc` / `cpm` / `organic` / `social` / `email` / `sms` / `banner`

**防呆提示文字**
- 空格自動替換 Tooltip: `空格已自動替換為底線，以確保 URL 格式正確`
- 中文 campaign Warning（非阻擋）: `廣告活動名稱建議使用英文，避免中文在部分廣告平台無法正確讀取`

**Left Panel — 快速模板區塊**
- Section title: `快速模板`
- 模板按鈕: `Facebook 廣告` / `LINE Ads` / `Google Ads` / `EDM（電子報）` / `LINE OA 推播`

| 模板 | 自動填入 utm_source | 自動填入 utm_medium |
|---|---|---|
| Facebook 廣告 | `facebook` | `paid` |
| LINE Ads | `line` | `paid` |
| Google Ads | `google` | `cpc` |
| EDM（電子報）| `email` | `email` |
| LINE OA 推播 | `line` | `social` |

- Button: `儲存為模板`（已儲存 20 個時 disabled）
- Button disabled tooltip（已達上限）: `最多只能儲存 20 個模板，請先刪除不使用的模板`

**Right Panel — 預覽與輸出區塊**
- Section title: `生成的完整連結`
- URL textarea（readonly）: 即時顯示完整 URL
- Button: `複製完整連結`
- Section title: `短網址`
- Short URL display: `{store_domain}/go/{6碼英數}`
- Button: `複製短網址`
- Section title: `QR Code`
- QR Code（128×128px，白底黑色，即時生成）
- Button: `下載 QR Code（PNG）`
- Section title: `點擊統計（短網址）`
- Stats: `今日 {N} 次　本月 {N} 次`
- Stats subtext（未生成短網址時）: `點擊「複製短網址」後開始統計`

**Button Labels（已達條件時 disabled）**
- `複製完整連結`（utm_source / utm_medium / utm_campaign 未填時 disabled）
- `複製短網址`（同上）
- `下載 QR Code（PNG）`（同上）

**Validation Errors**
| Error condition | Message shown |
|---|---|
| utm_source 未填，點擊複製 | 欄位紅框 + `請填寫廣告來源（utm_source）` |
| utm_medium 未填，點擊複製 | 欄位紅框 + `請填寫廣告媒介（utm_medium）` |
| utm_campaign 未填，點擊複製 | 欄位紅框 + `請填寫廣告活動名稱（utm_campaign）` |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 複製完整連結 | `連結已複製` |
| 複製短網址（首次，需 API 生成）| 按鈕 loading → 生成完成 → `短網址已複製` |
| 複製短網址（已生成）| `短網址已複製` |
| 下載 QR Code | `QR Code 已下載` |
| 儲存模板成功 | `模板「{模板名稱}」已儲存` |

**Error States**

| Error condition | Message shown |
|---|---|
| 短網址 API 生成失敗 | `短網址生成失敗，請稍後再試` |
| 複製 API 失敗（瀏覽器限制）| `複製失敗，請手動選取並複製` |

**Loading State**
- 複製短網址（首次生成）：按鈕 loading，文字「生成中…」≤ 300ms

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Tab 導覽 | el-tabs type="card"，3 個 Tab | 點擊切換 Tab 內容 |
| Info Banner | el-alert type="info" :closable=false，含前往設定連結 | 點擊連結跳轉行銷工具設定 |
| 頁面類型 Select | el-select，5 選項 | 選擇後顯示對應第二層元件 |
| 產品搜尋 Select | el-select remote filterable，即時搜尋產品 | 輸入關鍵字即時搜尋 |
| 分類樹狀 Select | el-tree-select | 展開分類層級 |
| 一頁式商店 Select | el-select | 顯示已建立的一頁式商店列表 |
| 自訂 URL 輸入 | el-input | — |
| utm_source Autocomplete | el-autocomplete，7 個預設建議 | 輸入自動補全，可自由輸入 |
| utm_medium Autocomplete | el-autocomplete，8 個預設建議 | 輸入自動補全，可自由輸入 |
| utm_campaign / content / term | el-input | 輸入即時更新右側預覽 |
| utm_campaign 中文 Warning | el-alert type="warning"，inline，非阻擋 | 輸入中文後自動顯示 |
| 快速模板按鈕 | el-button-group，5 個 el-button type="default" !rounded-none | 點擊自動填入 source+medium |
| 儲存為模板按鈕 | el-button type="default" !rounded-none | 點擊開啟模板儲存 Dialog |
| 完整 URL Textarea | el-input type="textarea" readonly，auto-height | — |
| 複製完整連結按鈕 | el-button type="default" !rounded-none，:disabled | Clipboard API 複製 |
| 短網址顯示 | el-input readonly | — |
| 複製短網址按鈕 | el-button type="primary" !rounded-none，:loading，:disabled | 首次觸發 API，後續直接複製 |
| QR Code 預覽 | 前端 qrcode 套件，128×128px，白底黑色 | 即時更新 |
| 下載 QR Code 按鈕 | el-button type="default" !rounded-none，:disabled | 下載 300×300px PNG |
| 點擊統計顯示 | 靜態文字，#909399 12px | — |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Initial（空白）| 進入 Tab，無任何輸入 | 右側 URL 框空白，所有複製按鈕 disabled |
| 填寫 source + medium | 兩必填欄位已填，campaign 未填 | 右側 URL 即時預覽，複製按鈕仍 disabled（campaign 未填）|
| 三必填欄位已填 | source + medium + campaign 都有值 | 右側 URL 完整，複製按鈕 enabled，QR Code 即時顯示 |
| 短網址首次生成中 | 點擊「複製短網址」（未有短網址）| 按鈕 loading，文字「生成中…」|
| 已生成短網址 | API 返回短網址 | 顯示短網址 URL + 點擊統計 |
| 模板快速填入 | 點擊平台模板按鈕 | source + medium 自動填入對應值 |
| Loading（頁面）| 進入頁面時 | Skeleton 取代兩個 Panel |

#### Interaction Annotations

| User action | Result |
|---|---|
| 選擇頁面類型 | 顯示對應第二層選擇元件，右側 URL 即時更新 |
| 在任何 UTM 欄位輸入 | 右側完整 URL 即時更新（debounce 200ms）|
| 輸入包含空格的 UTM 值 | 自動替換為底線，Tooltip 提示 |
| 輸入中文 utm_campaign | 顯示非阻擋橘色 Warning |
| 點擊平台快速模板 | source + medium 欄位自動填入 |
| 點擊「複製完整連結」 | 複製 URL → Toast「連結已複製」|
| 點擊「複製短網址」（首次）| loading → API → 顯示短網址 → Toast「短網址已複製」|
| 點擊「下載 QR Code（PNG）」 | 下載高解析度 PNG |
| 點擊「儲存為模板」 | 開啟模板儲存 Dialog（Screen 2）|
| 點擊「前往行銷工具設定 →」| 導向行銷管理 > 行銷工具設定 |

---

### Screen 2: 儲存 UTM 模板 Dialog

**Purpose：** 讓商家為當前的 UTM 參數組合命名並儲存，方便日後快速重複使用。
**Entry points：** UTM 網址生成器左側面板點擊「儲存為模板」
**Primary user goal：** 命名並儲存 UTM 模板

#### Information Hierarchy

```
H1 (most prominent): 儲存 UTM 模板（Dialog 標題）
H2 (secondary): 當前參數預覽
Primary CTA: 儲存模板
Secondary CTA: 取消
```

#### Actual Copy

**Dialog Title**
- `儲存 UTM 模板`

**Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 模板名稱 | `如「LINE Ads 冬季活動」` | — | `請填入模板名稱` |

**當前參數預覽（唯讀顯示）**
- Section label: `目前參數：`
- `來源：{utm_source}`
- `媒介：{utm_medium}`
- `活動：{utm_campaign}`（若有填）
- `廣告內容：{utm_content}`（若有填）
- `關鍵字：{utm_term}`（若有填）

**Button Labels**
- Primary action: `儲存模板`
- Secondary action: `取消`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存成功 | `模板「{模板名稱}」已儲存` |
| 儲存失敗（API 錯誤）| `儲存失敗，請稍後再試` |

**Error States**

| Error condition | Message shown |
|---|---|
| 模板名稱空白 | 欄位紅框 + `請填入模板名稱` |
| 模板名稱重複 | `已有相同名稱的模板，請使用其他名稱` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Dialog 容器 | el-dialog width="480px" !rounded-none | Overlay 點擊不關閉 |
| 模板名稱輸入 | el-input，maxlength=50，show-word-limit | — |
| 當前參數顯示 | 唯讀 list，背景 #F5F7FA，padding 12px | — |
| 取消按鈕 | el-button type="default" !rounded-none | 關閉 Dialog |
| 儲存模板按鈕 | el-button type="primary" !rounded-none | 觸發驗證與儲存 API |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | Dialog 開啟 | 名稱欄空白，當前參數已顯示 |
| 名稱空白送出 | 點擊儲存但名稱未填 | 欄位紅框 + 錯誤文字 |
| 儲存成功 | API 返回 200 | Dialog 關閉，Toast 確認 |

---

### Screen 3: 產品目錄 Feed（Tab 2）

**Purpose：** 讓商家複製 Facebook Catalog 和 Google Merchant Center 的 Feed URL，設定更新頻率與範圍，讓廣告平台自動維護最新產品目錄。
**Entry points：** 廣告投放工具 Tab 導覽 > 產品目錄 Feed
**Primary user goal：** 複製 Feed URL 並貼到廣告平台（Facebook Business Manager / Google Merchant Center）

#### Information Hierarchy

```
H1 (most prominent): 廣告投放工具（同頁標題）
Tab: 產品目錄 Feed（已選中）
主內容: Facebook 產品目錄 Feed 卡片（上）/ Google Merchant Center Feed 卡片（下）
Primary CTA: 複製連結（兩張卡片各自有）
Secondary CTA: 立即重新生成 Feed / 下載 CSV/XML 預覽
```

#### Actual Copy

**Facebook Catalog Feed 卡片**
- Card header: `🔵 Facebook 產品目錄 Feed`
- Feed URL label: `Feed URL（複製此連結到 Facebook Business Manager）：`
- 唯讀 URL: `https://yourstore.com/feeds/facebook-catalog.csv?token=XXXX`
- Button: `複製連結`

- Section title: `Feed 範圍`
- Radio 1: `全部上架產品（共 {N} 件）`
- Radio 2: `指定分類`（選擇後出現分類多選器）
- 指定分類 placeholder: `選擇要包含在廣告目錄的分類（可多選）`

- Section title: `更新頻率`
- Radio 1: `即時生成（每次廣告平台抓取時重新生成）`
- Radio 2（預設選中）: `每小時更新（推薦）`
- Radio 3: `每天更新（每日 00:10 台灣時間）`

- 上次更新（有資料）: `上次更新：{YYYY/MM/DD HH:mm}　產品數量：{N} 件`
- 上次更新（從未生成）: `尚未生成，請點擊「立即重新生成 Feed」`
- Button: `立即重新生成 Feed`
- Button: `下載 CSV 預覽`

- Info link: `ℹ️ 如何在 Facebook Business Manager 設定產品目錄`
- Link: `查看說明 ↗`（開新分頁）

- Token 管理（摺疊區塊）:
  - Label: `Feed URL Token 管理`
  - 說明: `如果 Feed URL 外洩，可重新生成 Token 讓舊 URL 立即失效。`
  - Button: `重新生成 Feed Token`

**Google Merchant Center Feed 卡片（同結構）**
- Card header: `🟢 Google Merchant Center Feed`
- Feed URL label: `Feed URL（複製此連結到 Google Merchant Center）：`
- 唯讀 URL: `https://yourstore.com/feeds/google-merchant.xml?token=XXXX`
- Button: `複製連結`
- （以下結構與 Facebook 卡片相同，URL 和說明連結不同）
- Info link: `ℹ️ 如何在 Google Merchant Center 設定產品 Feed`
- Button: `下載 XML 預覽`

**儲存設定按鈕**（兩張卡片共用，在頁面底部）
- Button: `儲存設定`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 複製 Feed URL | `Feed URL 已複製` |
| 儲存 Feed 設定 | `✅ Feed 設定已儲存` |
| 立即重新生成（一般量）| `Feed 已重新生成，共 {N} 件產品` |
| 立即重新生成（大量 >1000 件）| `Feed 正在後台生成中，大量產品可能需要 1-2 分鐘，完成後會自動更新狀態` |
| 生成完成但有產品被排除 | `Feed 已生成，共 {N} 件產品。有 {M} 件產品因無主圖而被排除。[查看產品]` |
| 重新生成 Token 成功 | `Feed Token 已重新生成，請將新的 Feed URL 更新至廣告平台` |

**重新生成 Token 確認 Dialog**
- Dialog title: `確認重新生成 Feed Token`
- Body: `重新生成後，目前的 Feed URL 將立即失效。您需要將新的 Feed URL 更新至廣告平台，否則廣告平台將無法正常抓取產品目錄。`
- Warning note: `⚠️ 此操作無法復原`
- Buttons: `取消` / `確認重新生成`

**Error States**

| Error condition | Message shown |
|---|---|
| Feed 生成失敗 | `Feed 生成失敗，請稍後再試` |
| 儲存設定失敗 | `儲存失敗，請確認網路連線後重試` |

**Loading State**
- 立即重新生成 Feed：按鈕 loading，文字「生成中…」
- 頁面初始載入：Skeleton 兩個卡片

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Facebook Feed 卡片 | el-card shadow="never"，全寬 | — |
| Google Feed 卡片 | el-card shadow="never"，全寬 | — |
| Feed URL 輸入框 | el-input readonly，prefix lock icon，背景 #F5F7FA | — |
| 複製連結按鈕 | el-button type="primary" !rounded-none | Clipboard API 複製，Toast |
| Feed 範圍 RadioGroup | el-radio-group，2 選項 | 選「指定分類」顯示 TreeSelect |
| 分類多選器 | el-tree-select multiple，可選多個分類 | — |
| 更新頻率 RadioGroup | el-radio-group，3 選項，預設「每小時」| — |
| 上次更新 | 14px #909399 | — |
| 立即重新生成按鈕 | el-button type="default" !rounded-none，:loading 狀態 | 點擊觸發 Feed 生成 API |
| 下載預覽按鈕 | el-button type="default" !rounded-none | 下載前 100 筆 CSV/XML |
| 說明連結 | el-link type="primary"，target="_blank" | 開啟說明文件新分頁 |
| Token 管理摺疊 | el-collapse，預設收起 | 展開顯示重新生成 Token 按鈕 |
| 重新生成 Token 按鈕 | el-button type="danger" plain !rounded-none | 點擊開啟確認 Dialog |
| 儲存設定按鈕 | el-button type="primary" !rounded-none，頁面底部 | 儲存 Feed 範圍與頻率設定 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 首次使用（從未生成）| Feed 尚未生成 | 上次更新顯示「尚未生成，請點擊立即重新生成 Feed」|
| 正常（已生成）| Feed 已生成 | 顯示上次更新時間與產品數量 |
| 指定分類模式 | 選擇「指定分類」Radio | 顯示分類多選器 |
| 重新生成中 | 點擊「立即重新生成 Feed」| 按鈕 loading |
| 大量生成（>1000 件）| Feed 生成超過 30 秒 | Toast 提示後台生成中 |
| Loading（頁面初始）| 頁面載入 | Skeleton 兩個卡片 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「複製連結」 | 複製 Feed URL → Toast「Feed URL 已複製」|
| 選擇「指定分類」 | 顯示分類多選 TreeSelect |
| 點擊「立即重新生成 Feed」 | 按鈕 loading → API → 成功 Toast + 更新上次更新時間 |
| 點擊「下載 CSV 預覽」 | 下載前 100 筆產品的 Feed 檔案 |
| 點擊「查看說明 ↗」 | 開啟廣告平台設定說明（新分頁）|
| 點擊「重新生成 Feed Token」 | 開啟確認 Dialog |
| 點擊「儲存設定」 | 儲存 Feed 範圍與更新頻率設定 |

---

### Screen 4: 廣告來源分析（Tab 3）

**Purpose：** 以 UTM 維度呈現各廣告來源帶來的訂單轉換漏斗數據，讓商家根據訂單 GMV 評估廣告 ROI，決定加碼或停投。
**Entry points：** 廣告投放工具 Tab 導覽 > 廣告來源分析
**Primary user goal：** 找到帶來最多訂單的廣告來源，評估投放效益

#### Information Hierarchy

```
H1 (most prominent): 廣告投放工具（同頁標題）
Tab: 廣告來源分析（已選中）
篩選列: 時間範圍 + 分組維度
H2: 轉換漏斗（全部來源）
H3: UTM 來源轉換報表（Table）
Primary CTA: 匯出報表
Supporting info: 各維度的訂單數（可點擊展開 Drawer）
```

#### Actual Copy

**定位說明 Banner（Tab 頂部）**
- `📊 本報表呈現各廣告來源帶來的實際成立訂單數據，定位為 GA4 的補充，非取代。GA4 追蹤使用者行為事件，本報表追蹤已成立訂單的廣告歸因，兩者可同時使用。`

**篩選列**
- 時間範圍 label: `時間範圍`
- 快速選項: `近 7 天` / `近 30 天` / `本月` / `上月`
- Date picker placeholder: `選擇日期範圍`
- 分組維度 label: `分組方式`
- 維度選項: `依來源（utm_source）` / `依媒介（utm_medium）` / `依廣告活動（utm_campaign）` / `依廣告內容（utm_content）`

**Button Labels**
- Primary action: `匯出報表`

**Section — 轉換漏斗**
- Section title: `轉換漏斗（所選時間範圍 · 全部來源）`
- 漏斗行 1: `工作階段　{N}`
- 漏斗行 2: `加入購物車　{N}　({N}%)`
- 漏斗行 3: `進入結帳　{N}　({N}%)`
- 漏斗行 4: `訂單完成　{N}　({N}%)`

**Table Column Headers**
- `來源 / 維度` / `工作階段數` / `加入購物車` / `進入結帳` / `訂單數` / `轉換率` / `訂單 GMV` / `平均訂單金額`

**「直接流量 / 無追蹤標籤」最後一列**
- 列標題: `直接流量 / 無追蹤標籤`
- Tooltip: `這些訂單來自直接輸入網址、書籤、或未加追蹤標籤的連結`

**展開子維度**（展開某一 utm_source 後顯示）
- 展開欄位依分組維度決定（展開 source → 顯示各 campaign；展開 campaign → 顯示各 content）

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 匯出報表 | `報表產生中，完成後將寄送至您的信箱 📧` |

**警告提示**
- 超過 90 天 Warning: `選擇超過 90 天的數據可能需要較長時間載入。建議改用數據中心的詳細報表查看長期趨勢。`
- 前往數據中心連結: `前往數據中心`

**Empty State（無 UTM 數據）**
- Headline: `近 {N} 天尚無廣告來源數據`
- Subtext: `請在廣告連結加上 UTM 參數，並使用 UTM 網址生成器產生追蹤連結。`
- CTA label: `前往 UTM 網址生成器`

**Loading State**
- 篩選後重新載入：Table 顯示 Skeleton rows，漏斗顯示 Skeleton 進度條

**Error States**

| Error condition | Message shown |
|---|---|
| API 查詢失敗 | `無法載入廣告來源數據，請重新整理頁面` + 重新整理按鈕 |

**Sortable Columns**

| 欄位 | 可排序 | 備注 |
|---|---|---|
| 來源 / 維度 | ❌ | — |
| 工作階段數 | ✅ | — |
| 加入購物車 | ✅ | — |
| 進入結帳 | ✅ | — |
| 訂單數 | ✅ | **預設排序：降序（最多訂單在上）** |
| 轉換率 | ✅ | — |
| 訂單 GMV | ✅ | — |
| 平均訂單金額 | ✅ | — |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 定位說明 Banner | el-alert type="info" :closable=false | — |
| 時間範圍 DatePicker | el-date-picker type="daterange"，clearable | 選擇後觸發報表重新載入 |
| 快速時間選項 | el-radio-group，4 選項（近7天預設）| 點擊後更新日期範圍 + 觸發重載 |
| 分組維度 Select | el-select，4 選項，預設「依來源」| 選擇後觸發報表重新載入 |
| 超過 90 天 Warning | el-alert type="warning"，inline | 選擇超過 90 天後顯示 |
| 匯出報表按鈕 | el-button type="default" !rounded-none | 點擊觸發非同步匯出，Toast |
| 轉換漏斗 | 4 行 el-progress 橫向，搭配數字標籤 | 靜態顯示，無互動 |
| 廣告來源分析 Table | el-table，stripe，expandable rows | Row hover 高亮 |
| 訂單數（可點擊）| el-button link type="primary" | 點擊開啟廣告來源訂單 Drawer（Screen 5）|
| Row 展開按鈕 | el-table expandable，左側箭頭 | 展開顯示下一維度層的子資料 |
| 無追蹤標籤列 | 置於 Table 最後，含 el-tooltip | Hover 顯示 Tooltip 說明 |
| Empty State | — | 無 UTM 數據時顯示 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default（近 7 天，有數據）| 預設狀態 | 漏斗 + Table 顯示數據 |
| 篩選中 | 選擇時間範圍或分組維度後 | Table skeleton rows，漏斗 skeleton |
| 展開子維度 | 點擊 Row 展開箭頭 | 顯示子維度資料行 |
| 超過 90 天 | 選擇 > 90 天範圍 | 顯示橘色 Warning Banner |
| Empty（無 UTM 數據）| 所選時間無廣告來源訂單 | Empty State（3 要素）|
| Error | API 失敗 | 錯誤提示 + 重新整理 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 選擇快速時間選項 | 更新日期範圍，重新載入 Table + 漏斗 |
| 切換分組維度 | 重新載入 Table，維度欄標題隨之更新 |
| 點擊某行「訂單數」數字 | 開啟廣告來源訂單 Drawer（Screen 5）|
| 點擊展開箭頭（某 utm_source）| 展開顯示此來源下各 utm_campaign 的細項 |
| 點擊「匯出報表」 | Toast「報表產生中，完成後將寄送至您的信箱 📧」|
| 點擊「前往 UTM 網址生成器」（Empty State）| 切換至 UTM 網址生成器 Tab |
| 點擊「前往數據中心」（90天警示）| 導向數據中心報表 |

---

### Screen 5: 廣告來源訂單清單 Drawer

**Purpose：** 展示特定廣告來源（UTM 維度）在所選時間範圍內帶來的具體訂單清單，讓商家確認數字背後的真實訂單。
**Entry points：** 廣告來源分析 Table 點擊某維度的「訂單數」數字
**Primary user goal：** 查看此廣告來源的訂單明細，確認 GMV 組成

#### Information Hierarchy

```
H1 (most prominent): {維度值} 的訂單清單（Drawer 標題）
H2 (secondary): 訂單總數 + GMV
Supporting info: 訂單清單 Table（編號、金額、時間）
CTA: 查看訂單（連結至訂單管理）
```

#### Actual Copy

**Drawer Title**
- `{維度值} 的訂單清單`（例：`facebook 的訂單清單` / `2026winter 的訂單清單`）

**Summary Bar**
- `共 {N} 筆訂單　訂單 GMV：NT$ {total}`
- `時間範圍：{start_date} – {end_date}`

**Table Column Headers**
- `訂單編號` / `訂單金額` / `下單時間` / `操作`

**操作欄**
- `查看訂單`（el-link，點擊在新分頁或跳轉至訂單詳情）

**Empty State（此廣告來源無訂單）**
- Headline: `此廣告來源在所選時間範圍內無訂單`
- Subtext: `請確認 UTM 參數是否正確設定，或嘗試調整時間範圍`
- CTA label: — （無）

**Loading State**
- Skeleton Table rows（3–5 行）

**Sortable Columns**

| 欄位 | 可排序 | 備注 |
|---|---|---|
| 訂單編號 | ❌ | — |
| 訂單金額 | ✅ | — |
| 下單時間 | ✅ | **預設排序：降序（最新在上）** |
| 操作 | ❌ | — |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Drawer 容器 | el-drawer width="520px"，:close-on-click-modal=true | 點擊外部關閉 |
| Summary Bar | 兩行文字，14px / 12px | — |
| 訂單 Table | el-table，stripe | Row hover 高亮 |
| 查看訂單連結 | el-link type="primary" | 點擊在新分頁開啟訂單詳情 |
| 下單時間排序 | 可排序，預設降序 | 點擊切換升/降序 |
| Skeleton | el-skeleton rows | Drawer 開啟時顯示 |
| Empty State | — | 無訂單時顯示 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Loading | Drawer 開啟時 | Skeleton Table rows |
| Default（有訂單）| API 返回資料 | Summary Bar + 訂單清單 Table |
| Empty（無訂單）| 此維度無訂單 | Empty State |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊訂單金額排序 | 切換升/降序 |
| 點擊「查看訂單」 | 在新分頁開啟訂單詳情頁 |
| 點擊 Drawer 外側 | 關閉 Drawer，返回廣告來源分析 Table |

---

## Part 4 — Cross-Screen Component Inventory

### Action Components

| 元件 | 變體 | 尺寸 | 狀態 |
|---|---|---|---|
| Button | Primary / Default / Danger / Link | Large / Medium / Small | Default / Hover / Active / Disabled / Loading |
| el-link | Primary | — | Default / Hover |

### Display Components

| 元件 | 變體 | 資料欄位 | 狀態 |
|---|---|---|---|
| QR Code 預覽 | 128×128px（預覽）/ 300×300px（下載）| 短網址 | 即時更新 |
| 轉換漏斗 | 4 stage 橫向進度條 | 工作階段/加購/結帳/完成 | — |
| Feed 卡片 | Facebook（藍）/ Google（綠）| Feed URL、更新時間、產品數 | 正常 / 生成中 / 從未生成 |
| 廣告來源 Table | 可展開 Row | 8 個數據欄位 | Default / Expanded / Hover |

### Input Components

| 元件 | 變體 | 狀態 |
|---|---|---|
| el-autocomplete | utm_source / utm_medium | Default / Focus / Filled / Error |
| el-input | utm_campaign / content / term；URL readonly | Default / Focus / Filled / Error / Readonly |
| el-select / el-tree-select | 頁面類型 / 分類選擇 / 分組維度 | Default / Open / Selected |
| el-radio-group | Feed 範圍 / 更新頻率 | Default / Selected |
| el-date-picker | daterange | Default / Open / Selected |

### Navigation Components

| 元件 | 變體 | 說明 |
|---|---|---|
| el-tabs | type="card"，3 Tab | 廣告投放工具三大功能入口 |
| Sidebar | Expanded / Collapsed | 行銷管理 > 廣告投放工具 |

### Feedback Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Toast（el-message）| success / info / warning / error | 操作回饋，3s 自動消失 |
| el-alert | info（定位說明）/ warning（中文 campaign、>90天）| :closable=false |
| Dialog | 儲存模板 / 重新生成 Token | 兩種 Dialog |
| Drawer | 廣告來源訂單清單 | width 520px |
| Empty State | UTM 無數據 / Drawer 無訂單 | Headline + Subtext + CTA |
| Skeleton | UTM Panel / Feed 卡片 / Table rows | 頁面/資料載入中 |
| el-tooltip | 無追蹤標籤說明 / UTM 空格替換 | Hover 觸發 |

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
| Spacing unit | 8px grid |
| QR Code background | 白色 `#FFFFFF`，前景 `#000000` |
| Feed 卡片 Facebook accent | `#1877F2`（Facebook 藍，用於卡片 header 圖示）|
| Feed 卡片 Google accent | `#34A853`（Google 綠，用於卡片 header 圖示）|

---

## Assumptions

> 📌 假設：廣告投放工具頁面路徑為 `/marketing/ad-tools`，位於「行銷管理」下，Tab 1（UTM 生成器）為預設展開 Tab。

> 📌 假設：UTM 模板的查看與刪除功能（管理已儲存的 20 個模板）以 Popover 或 Drawer 形式在「儲存為模板」按鈕旁提供入口，未在本 spec 完整展開；設計師可自行決定管理 UI 形式。

> 📌 假設：廣告來源分析的「工作階段數」數據來源為系統 Session 記錄（非 GA4），需與工程確認數據來源的準確度說明是否需要在 UI 上附加說明。

> 📌 假設：Feed 卡片的「重新生成 Feed Token」功能以摺疊方式收起，避免商家誤觸；僅在有意使用時展開操作。

> ✏️ Copy 待確認：「查看說明」連結目標（Facebook Business Manager 設定產品目錄、Google Merchant Center 設定 Feed）是否有中文說明文件 URL，或指向 Evomni 自製教學。

---

## Part 6 — Claude Design Prompt Cheatsheet

**使用說明：**
1. 將這份 .md 上傳到 Claude Design
2. 找到你想先做的畫面，複製下方對應的 prompt
3. 貼入 Claude Design 對話框，開始生成
4. 在 Claude Design 中直接對話迭代細節

---

### Screen 1 — UTM 網址生成器（Tab 1）

```
請幫我設計「廣告投放工具 — UTM 網址生成器」的桌面後台頁面 UI。Element Plus，無圓角，Noto Sans TC，左側 Sidebar 導覽（行銷管理 > 廣告投放工具）。

頁面頂部顯示 el-tabs 3 個 Tab（UTM 網址生成器 / 產品目錄 Feed / 廣告來源分析），下方 info Alert「廣告追蹤碼設定請前往行銷管理 > 行銷工具設定」。

Tab 1 主要佈局：左右分欄（5:4 比例）。

左側 Panel：
- Section「目標頁面」：頁面類型 Select（5 選項）+ 第二層產品搜尋框
- Section「UTM 參數」：5 個輸入欄位（utm_source / utm_medium / utm_campaign 為必填，加 * 標示；utm_content / utm_term 為選填）
- Section「快速模板」：5 個 Default 按鈕（Facebook 廣告 / LINE Ads / Google Ads / EDM / LINE OA 推播）
- 底部「儲存為模板」按鈕

右側 Panel（預覽與輸出）：
- Section「生成的完整連結」：readonly textarea + 「複製完整連結」按鈕
- Section「短網址」：短網址顯示 + 「複製短網址」Primary 按鈕
- Section「QR Code」：128×128 QR Code 圖示預覽（白底黑色）+ 「下載 QR Code（PNG）」按鈕
- Section「點擊統計（短網址）」：今日 N 次 / 本月 N 次

請同時設計「UTM 填寫完整後」的狀態：右側 URL 顯示完整追蹤連結，所有複製按鈕 enabled，QR Code 顯示。請參考上傳文件中 Screen 1 的規格。
```

---

### Screen 2 — 儲存 UTM 模板 Dialog

```
請幫我設計「儲存 UTM 模板」的 el-dialog 彈窗 UI。Dialog 寬 480px，無圓角，Element Plus。

Dialog 標題「儲存 UTM 模板」。頂部「模板名稱」輸入框，placeholder「如『LINE Ads 冬季活動』」。

下方唯讀參數預覽區塊（背景 #F5F7FA，padding 12px）：
「目前參數：
來源：line
媒介：paid
活動：2026winter」

底部：「取消」Default 按鈕 + 「儲存模板」Primary 按鈕。請同時設計名稱欄位空白的錯誤狀態。請參考上傳文件中 Screen 2 的規格。
```

---

### Screen 3 — 產品目錄 Feed（Tab 2）

```
請幫我設計「廣告投放工具 — 產品目錄 Feed」的桌面後台頁面 UI。Element Plus，無圓角，左側 Sidebar，Tab 2 已選中。

頁面主內容分兩個 el-card，上下排列：

上方卡片「🔵 Facebook 產品目錄 Feed」：
- Feed URL 唯讀輸入框（含鎖頭 icon，背景灰），右側「複製連結」Primary 按鈕
- Feed 範圍 Radio（全部上架產品 / 指定分類）
- 更新頻率 Radio 三選一（即時 / 每小時（預設選中）/ 每天）
- 上次更新：2026/05/14 10:00　產品數量：245 件
- 「立即重新生成 Feed」Default 按鈕 + 「下載 CSV 預覽」Default 按鈕
- 藍色說明連結「如何在 Facebook Business Manager 設定產品目錄 查看說明 ↗」

下方卡片「🟢 Google Merchant Center Feed」：（同結構，換 Google 相關文字）

頁面底部：「儲存設定」Primary 按鈕。請參考上傳文件中 Screen 3 的規格。
```

---

### Screen 4 — 廣告來源分析（Tab 3）

```
請幫我設計「廣告投放工具 — 廣告來源分析」的桌面後台頁面 UI。Element Plus，無圓角，左側 Sidebar，Tab 3 已選中。

頂部 info Alert（定位說明），下方篩選列：左側時間範圍快速按鈕（近 7 天 / 近 30 天 / 本月 / 上月）+ DatePicker，右側「分組方式」Select，最右「匯出報表」Default 按鈕。

中間「轉換漏斗（所選時間範圍 · 全部來源）」：4 行橫向 el-progress 進度條，從上到下遞減（工作階段 2,450 / 加入購物車 890（36.3%）/ 進入結帳 420（17.1%）/ 訂單完成 185（7.6%））。

下方 el-table 轉換報表，欄位：來源/維度、工作階段數、加入購物車、進入結帳、訂單數（可點擊的藍色連結）、轉換率、訂單 GMV、平均訂單金額。Table 含展開箭頭，最後一列為「直接流量 / 無追蹤標籤」（灰色）。

訂單數 Column 預設降序排列。請同時設計 Empty State（無 UTM 數據）。請參考上傳文件中 Screen 4 的規格。
```

---

### Screen 5 — 廣告來源訂單清單 Drawer

```
請幫我設計「廣告來源訂單清單」的 el-drawer 右側彈出面板 UI。Drawer 寬 520px，Element Plus，無圓角。

Drawer 標題「facebook 的訂單清單」。標題下方 Summary：「共 185 筆訂單　訂單 GMV：NT$ 423,800」以及「時間範圍：2026/05/07 – 2026/05/14」。

主內容為 el-table：欄位「訂單編號 / 訂單金額 / 下單時間 / 操作」。操作欄顯示「查看訂單」藍色連結。下單時間預設降序排列。

底部保留滾動空間（可能有較多訂單）。請參考上傳文件中 Screen 5 的規格。
```

---

### 完整產品一次生成（可選）

```
請幫我設計「Evomni 廣告投放工具」的完整後台 UI，共 5 個畫面。桌面後台，Element Plus，無圓角，Noto Sans TC，Primary #303133，Brand blue #409EFF。

頁面結構：左側 Sidebar + 右側主內容，頂部 el-tabs 3 個 Tab。

包含：
1. Tab 1 UTM 網址生成器：左右分欄（UTM 參數填寫 / 即時預覽），含完整連結 + 短網址 + QR Code + 點擊統計
2. Tab 1 附屬：儲存模板 Dialog（名稱輸入 + 當前參數預覽）
3. Tab 2 產品目錄 Feed：Facebook + Google 兩個 Feed 卡片，各含 Feed URL 複製、範圍設定、頻率設定
4. Tab 3 廣告來源分析：轉換漏斗（4 stage el-progress）+ UTM 維度轉換報表 Table（展開功能）
5. Tab 3 附屬：訂單清單 Drawer（點擊訂單數後展開）

關鍵設計：UTM 生成器右側預覽區要即時感，複製按鈕視覺要突出；Feed 卡片要有 Facebook 藍和 Google 綠的視覺區分；廣告來源 Table 的訂單數列要視覺可點擊（藍色連結）。請參考上傳的完整 UX Spec 文件。
```
