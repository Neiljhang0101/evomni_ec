# 方案管理與升級流程 — Design Brief + UX Spec

> **Version:** 1.0
> **Created:** 2026-05-14
> **用途：** 上傳至 Claude Design，配合文件末尾的 Prompt Cheatsheet 使用

---

## Part 1 — Design Brief

### Product Vision

方案管理與升級流程讓商家管理員能在全域設定中一眼看清所有訂閱方案（主機、AI、電商）的狀態與到期日，並在遇到任何鎖定功能時透過統一的升級引導元件快速送出升級詢問——取代過去各頁面散落的「聯絡客服」按鈕與不透明的人工流程。升級後，商家立即解鎖功能；Evomni 內部人員也能在同一個後台確認收款、一鍵完成開通，無需手動修改資料庫。

### Target User

**Primary：** 商家管理員 — 中小型電產品牌負責人或行銷主管，需要主動管理 Evomni 訂閱方案、了解功能邊界，並在必要時決定升級

**Secondary：** Evomni 業務 / PM — 在內部後台處理商家升級申請、確認收款後一鍵開通方案

### Design Goals

| # | Goal | How to test |
|---|---|---|
| 1 | 商家在方案狀態頁 30 秒內找到所有方案的到期日 | 計時用戶找到三個方案到期日的時間 |
| 2 | 商家點擊鎖定功能後能在 2 步內送出升級詢問 | 觀察用戶從 Lock Banner 到詢問送出的步驟數 |
| 3 | 商家在方案接近到期時能主動看到警示並採取行動 | 模擬剩餘 20 天場景，觀察是否注意到警示並點擊續約 |
| 4 | Evomni 人員確認付款後 1 分鐘內完成方案開通 | 計時從看到待處理申請到完成開通的總操作時間 |

### Design Principles

1. **摘要優先，細節可達** — 方案狀態頁只顯示最關鍵資訊（名稱、到期日、天數），細節連結至現有設定頁，不重複開發
2. **鎖定功能必須說清楚** — Lock Banner 必須告知「這是什麼功能」「屬於哪個方案」「怎麼升級」，不能只有按鈕
3. **預填降低摩擦** — 升級詢問表單自動帶入所有可知資訊，用戶只需補填聯絡電話與確認勾選

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
  - 到期進度條三段顏色（藍/橘/紅）需同時搭配圖示或文字標籤，不可只靠顏色傳達語意
  - 所有互動元件需支援鍵盤操作（Tab / Enter / Esc）
  - 唯讀欄位需有明確視覺區別（灰底），不可僅靠 disabled 屬性

### Hard Constraints

- ⚠️ 方案狀態頁不顯示詳細 Token 使用記錄（保留在現有 AI 設定頁 `/global-settings/ai`）
- ⚠️ 自助線上付款（第二階段）不在此次設計範圍，僅保留灰色「即將推出」按鈕佔位
- ⚠️ 升級詢問表單的「商家名稱 / 目前方案 / 目標方案」三欄唯讀，不可修改
- ⚠️ Evomni 內部後台（升級紀錄管理）與商家後台視覺分離，不混用

### Out of Scope

- 線上金流付款流程（第二階段）
- 方案降級功能
- 商家後台查看升級申請進度追蹤頁
- 主機方案與 AI 方案的線上升級（目前僅支援聯絡續約）

---

## Part 2 — Screen Index

| # | Screen Name | Navigation path | Primary user goal |
|---|---|---|---|
| 1 | 方案狀態頁 | 全域設定 > 方案狀態 | 查看所有訂閱方案狀態與到期日 |
| 2 | UpgradeLockBanner 元件（全系統共用） | 任何鎖定功能頁面（嵌入元件） | 了解鎖定原因並進入升級流程 |
| 3 | 方案比較頁 | /subscription/upgrade | 比較兩方案功能差異，選擇升級行動 |
| 4 | 升級詢問 Dialog | 方案比較頁點擊「聯絡營運輔導顧問詢問升級」 | 送出升級詢問 |
| 5 | 詢問送出成功畫面 | 表單送出成功後 | 確認詢問已送出，了解後續步驟 |
| 6 | 內部後台 — 升級紀錄列表 | Evomni 內部後台 > 升級紀錄 | 查看所有升級申請，找到待處理項目 |
| 7 | 內部後台 — 確認開通 Dialog | 升級紀錄列表點擊「處理」 | 確認付款並一鍵開通商家方案 |

---

## Part 3 — Per-Screen UX Spec

---

### Screen 1: 方案狀態頁

**Purpose：** 彙整商家所有訂閱方案（主機、AI、電商）的狀態、到期日、剩餘天數於一頁，提供續約與升級入口。
**Entry points：** 左側 Sidebar > 全域設定 > 方案狀態
**Primary user goal：** 確認目前所有方案有效期，及早發現到期風險

#### Information Hierarchy

```
H1 (most prominent): 方案狀態
H2 (secondary): 主機方案 卡片 / AI 方案 卡片 / 電商方案 卡片
Primary CTA: 了解進階電商包並升級 →
Secondary CTA: 聯絡營運輔導顧問續約
Supporting info: 方案名稱、到期日、剩餘天數進度條、功能清單、到期警示 Alert
```

#### Actual Copy

**Page / Section Headings**
- Page title: `方案狀態`
- Breadcrumb: `全域設定 / 方案狀態`
- Card title 1: `主機方案`
- Card title 2: `AI 方案`
- Card title 3: `電商方案`

**Button Labels**
- Primary action（電商升級）: `了解進階電商包並升級 →`
- Secondary action（續約）: `聯絡營運輔導顧問續約`
- Link（AI 詳情）: `查看 AI 使用詳情 →`
- Icon button（重整）: `重新整理` (aria-label)

**Card Content — 主機 / AI 方案卡片（共用結構）**
- 到期日 label: `到期日：`
- 到期日 value: `{YYYY/MM/DD}`（動態）
- 剩餘天數 label: `剩餘 {N} 天`
- AI Token 進度 label: `AI Token 使用量`
- AI Token 進度 sublabel: `{used} / {total} tokens`

**Card Content — 電商方案卡片**
- 方案名稱: `電商啟航方案`（動態）
- 到期資訊: `到期日：{YYYY/MM/DD}　剩餘 {N} 天`
- Section heading（已包含）: `已包含功能`
- Section heading（鎖定）: `進階電商包專屬功能 🔒`
- 已包含功能清單:
  - `產品管理（無上限）`
  - `訂單管理`
  - `會員系統`
  - `金物流串接`
  - `一頁式商店`
  - `基礎數據分析`
  - `KOL 分潤管理`
  - `產品廣告小幫手`
- 進階專屬功能清單:
  - `自動化行銷旅程`
  - `進階會員分眾系統`
  - `RFM 會員價值分群`
  - `購後產品自動推薦`
  - `沉睡客自動喚醒`
  - `進階促銷活動成效分析`
  - `倉儲物流串接`
  - `站內搜尋關鍵字分析`

**Tooltip 內容 — 鎖定功能 Hover**

| 功能名稱 | Tooltip 文字（25 字以內）|
|---|---|
| 自動化行銷旅程 | `根據顧客行為自動觸發個人化行銷訊息，不需人工操作` |
| 進階會員分眾系統 | `依消費頻率、金額、類型自動分群，精準推播每個客層` |
| RFM 會員價值分群 | `識別忠實客、高風險流失客，即時採取對應行動` |
| 購後產品自動推薦 | `根據購買紀錄智慧推薦下一件最可能購買的產品` |
| 沉睡客自動喚醒 | `自動偵測沉睡顧客並發送個人化喚醒訊息，降低流失` |
| 進階促銷活動成效分析 | `深度拆解每場促銷的 ROI 與顧客參與度` |
| 倉儲物流串接 | `整合倉儲系統，自動同步庫存與出貨狀態` |
| 站內搜尋關鍵字分析 | `追蹤顧客搜尋意圖，優化產品標題與分類` |

**到期警示文字（依剩餘天數）**

| 剩餘天數 | 警示類型 | 顯示文字 |
|---|---|---|
| ≤ 90 天，> 30 天 | 卡片底部輕提示 | `方案將於 {YYYY/MM/DD} 到期，建議提前規劃續約` |
| ≤ 30 天 | el-alert type="warning" | `您的 {方案名稱} 將於 {YYYY/MM/DD} 到期，請盡早聯絡營運輔導顧問續約` |
| ≤ 7 天 | el-alert type="error" | `您的 {方案名稱} 剩餘 {N} 天即到期，請立即聯絡營運輔導顧問` |
| ≤ 1 天 | 同上 + 後台頂部全域橫幅 | `{方案名稱} 明日到期，請立即確認續約事宜　[聯絡營運輔導顧問]` |
| 已到期（全頁遮罩） | el-result 遮罩 | Headline: `您的 {方案名稱} 已到期` / Subtext: `功能已暫停，請立即聯絡營運輔導顧問恢復服務` |

**Empty State — 純 CMS（無電商方案）**
- Headline: `尚未啟用電商方案`
- Subtext: `啟用電商方案即可開始建立產品、接受訂單與管理會員`
- CTA label: `了解電商方案`

**Error States**

| Error condition | Message shown to user |
|---|---|
| API 失敗 | `無法載入方案狀態，請重新整理頁面` + `重新整理` 按鈕 |

**Loading State**
- Loading text: skeleton only（三個卡片區域顯示 el-skeleton，無文字）

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 主機 / AI 方案卡片 | el-card shadow="hover"，兩欄 grid，min-height 160px | Hover 顯示陰影 |
| 電商方案卡片 | el-card shadow="hover"，橫向全寬 | Hover 顯示陰影 |
| 剩餘天數進度條 | el-progress，藍 #409EFF / 橘 #E6A23C（≤30天）/ 紅 #F56C6C（≤7天）| 靜態顯示，顏色動態切換 |
| AI Token 進度條 | el-progress，藍色，顯示使用百分比 | 靜態顯示 |
| 功能清單（已包含）| ul + CircleCheck icon（#67C23A），文字 #606266 | — |
| 功能清單（鎖定）| ul + 🔒 icon，文字 #909399 | Hover 觸發 Tooltip |
| 鎖定功能 Tooltip | el-tooltip，content 一句話說明，max-width 200px | Hover 顯示 / 離開隱藏 |
| 升級 CTA 按鈕 | el-button type="primary" !rounded-none | 點擊導向 /subscription/upgrade |
| 續約 CTA 按鈕 | el-button type="default" !rounded-none | 點擊開啟升級詢問 Dialog（Screen 4）|
| 查看 AI 使用詳情 | el-link type="primary" | 點擊導向 /global-settings/ai |
| 重整圖示 | el-icon Refresh，卡片右上角 | 點擊清除快取，重新呼叫 API |
| 到期輕提示（≤90天）| 卡片底部 `<p>` 文字，#909399 12px | — |
| 到期 Alert（≤30天）| el-alert type="warning"，卡片上方 | — |
| 危急 Alert（≤7天）| el-alert type="error"，卡片上方 | — |
| 全域橫幅（≤1天）| el-notification 置頂，含 CTA 按鈕 | 點擊 CTA 開啟詢問 Dialog |
| 全頁到期遮罩 | el-overlay，背景 rgba(255,255,255,0.92)，置中 el-result | 遮罩不可關閉，唯一操作為聯絡按鈕 |
| Skeleton | el-skeleton，mimics 主機+AI 兩欄 + 電商全寬 | 資料載入中顯示 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default（健康）| 所有方案剩餘 > 90 天 | 三卡片正常顯示，藍色進度條，無警示 |
| Default（純 CMS）| 帳號無電商方案 | 主機+AI 卡片正常，電商區塊顯示 Empty State |
| Default（進階電商包）| 已升級進階電商包 | 電商卡片全部打勾，不顯示鎖定清單，不顯示升級 CTA |
| 警示（≤90天）| 任一方案剩餘 ≤90 天且 >30 天 | 該卡片底部輕提示文字，進度條仍藍 |
| 警示（≤30天）| 任一方案剩餘 ≤30 天 | 進度條橘色 + el-alert type="warning" |
| 危急（≤7天）| 任一方案剩餘 ≤7 天 | 進度條紅色 + el-alert type="error" |
| 緊急（≤1天）| 任一方案剩餘 ≤1 天 | 同危急 + 後台頂部全域橫幅 |
| 已到期 | 方案 expires_at < 今日 | 全頁遮罩覆蓋，唯一操作為「聯絡營運輔導顧問」|
| Loading | API 呼叫中 | Skeleton 取代三個卡片區域 |
| Error | API 返回錯誤 | 錯誤提示 + 重新整理按鈕 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「了解進階電商包並升級 →」 | 導向 /subscription/upgrade |
| 點擊「聯絡營運輔導顧問續約」 | 開啟升級詢問 Dialog（Screen 4），target 帶入現有方案續約 |
| Hover 鎖定功能項目 | 顯示一句話 Tooltip 說明功能價值 |
| 點擊「查看 AI 使用詳情 →」 | 導向 /global-settings/ai |
| 點擊重整圖示 | 清除前端快取，重新呼叫 API，顯示 Skeleton |
| 點擊到期遮罩「聯絡營運輔導顧問」| 開啟升級詢問 Dialog |
| 點擊全域橫幅 CTA | 開啟升級詢問 Dialog |

---

### Screen 2: UpgradeLockBanner 元件（全系統共用）

**Purpose：** 全系統統一的鎖定功能升級提示元件，取代各頁面各自實作的升級說明，提供一致視覺與行為。
**Entry points：** 全系統任何顯示鎖定功能的頁面（數據中心進階分析、行銷自動化、會員分眾等）
**Primary user goal：** 了解此功能為何被鎖定，並決定是否進入升級流程

#### Information Hierarchy

```
H1 (most prominent): 🔒 此功能為「{required-plan}」專屬
H2 (secondary): 升級後即可使用「{feature-name}」，{value prop 一句話}
Primary CTA: 了解 {required-plan}
Supporting info: 無（元件精簡，不放多餘資訊）
```

#### Actual Copy

**Banner 標題**
- `🔒 此功能為「{required-plan}」專屬`（例：`🔒 此功能為「進階電商包」專屬`）

**Banner 說明文字**
- `升級後即可使用「{feature-name}」，{value-prop}`

**各功能對應 value-prop 說明**

| feature-name | value-prop 文字 |
|---|---|
| 自動化行銷旅程 | `讓行銷工作自動化、用數據驅動再行銷` |
| 進階會員分眾系統 | `精準觸達每個消費層級的顧客，提升再購率` |
| RFM 會員價值分群 | `識別高價值客群，把行銷預算花在刀口上` |
| 購後產品自動推薦 | `在最對的時機推薦最可能購買的產品` |
| 沉睡客自動喚醒 | `自動找回三個月沒來的顧客，降低流失率` |
| 進階促銷活動成效分析 | `深度拆解每場活動的 ROI，精準優化下次促銷` |
| 倉儲物流串接 | `統一管理庫存與出貨，告別人工對帳` |
| 站內搜尋關鍵字分析 | `追蹤顧客搜尋意圖，優化產品能見度` |

**Button Labels**
- Primary action: `了解進階電商包`

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Banner 容器 | el-card，背景 #F5F7FA，左側 4px solid #409EFF，padding 20px | — |
| 標題 | 🔒 icon + 文字 14px bold #303133 | — |
| 說明文字 | 13px #606266，最多 2 行 | — |
| CTA 按鈕 | el-button type="primary" !rounded-none，「了解進階電商包」| 點擊導向 /subscription/upgrade?from={feature-name} |
| 功能預覽截圖（optional）| show-preview=true 時顯示，blur(4px) 模糊預覽，8px padding，邊框 1px #DCDFE6 | 靜態展示 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 用戶方案不含此功能 | Banner 全顯示 |
| With Preview | show-preview prop = true | Banner 下方顯示模糊功能截圖 |
| Hidden | 用戶方案已包含此功能 | 元件不渲染（v-if false） |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「了解進階電商包」 | 導向 /subscription/upgrade，query param ?from={feature-name} |

---

### Screen 3: 方案比較頁

**Purpose：** 並排展示電商啟航方案與進階電商包的功能差異，協助商家決策，並提供升級詢問入口。
**Entry points：** 任何 UpgradeLockBanner CTA 點擊；方案狀態頁「了解進階電商包並升級 →」按鈕
**Primary user goal：** 理解升級後能獲得哪些新功能，並送出升級詢問

#### Information Hierarchy

```
H1 (most prominent): 升級您的電商方案
H2 (secondary): 電商啟航方案 卡片 vs 進階電商包 卡片（兩欄並排）
Primary CTA: 聯絡營運輔導顧問詢問升級
Secondary CTA: 立即線上升級（即將推出，灰色）
Supporting info: 功能差異清單、方案價格、底部諮詢連結
```

#### Actual Copy

**Page / Section Headings**
- Page title: `升級您的電商方案`
- Subtitle: `根據您的使用需求，選擇最適合的方案：`

**Card 1 — 電商啟航方案（當前方案）**
- Badge: `✦ 您目前的方案`
- Plan name: `電商啟航方案`
- Price: `NT$29,800 / 年` ✏️ 待確認：價格是否對外顯示
- Feature list:
  - `產品管理（無上限）`
  - `訂單管理`
  - `會員系統`
  - `金物流串接`
  - `一頁式商店`
  - `基礎數據分析`
  - `KOL 分潤管理`
  - `產品廣告小幫手`
- Button: `目前方案` (disabled)

**Card 2 — 進階電商包（推薦升級）**
- Badge: `✦ 推薦升級`
- Plan name: `進階電商包`
- Price: `NT$39,800 / 年` ✏️ 待確認
- Feature list item 1: `所有電商啟航方案功能`
- 新增功能:
  - `自動化行銷旅程`
  - `進階會員分眾系統`
  - `RFM 會員價值分群`
  - `購後產品自動推薦`
  - `沉睡客自動喚醒`
  - `進階促銷活動成效分析`
  - `倉儲物流串接`
  - `站內搜尋關鍵字分析`
- Button 1: `聯絡營運輔導顧問詢問升級` (primary)
- Button 2: `即將推出` (disabled，第二階段自助付款預留位)

**Bottom Section**
- Text: `不確定哪個方案適合您？`
- Link: `預約 15 分鐘通話諮詢` ✏️ 待確認：連結目標（Calendly / 內部預約頁）

**Error States**

| Error condition | Message shown to user |
|---|---|
| API 失敗 | `無法載入方案資訊，請重新整理` + `重新整理` 按鈕 |

**Loading State**
- Loading text: skeleton only（兩個並排卡片 skeleton）

**Toast / Notification Messages**（此頁無 Toast）

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 頁面標題 | H1 24px #303133 | — |
| 副標題 | 16px #606266 | — |
| 兩欄 Grid 容器 | display grid，gap 24px，響應式（≤768px 改單欄）| — |
| 當前方案卡片 | el-card，邊框 1px #DCDFE6，el-tag type="info" 標籤 | — |
| 推薦升級卡片 | el-card，邊框 2px solid #E6A23C，el-tag type="warning" 標籤 | — |
| 方案 Badge | el-tag，info / warning 對應兩卡 | — |
| 功能清單（啟航方案）| ul + CircleCheck icon #67C23A | — |
| 功能清單（進階電商包）| ul + CircleCheck icon #409EFF；首條「所有啟航方案功能」加粗 | — |
| 目前方案按鈕 | el-button disabled type="info" !rounded-none，「目前方案」| 不可點擊 |
| 詢問升級按鈕 | el-button type="primary" !rounded-none | 點擊開啟升級詢問 Dialog（Screen 4）|
| 自助升級按鈕（佔位）| el-button type="info" disabled !rounded-none，「即將推出」| 不可點擊；Tooltip「線上升級功能即將推出」|
| 底部諮詢連結 | el-link type="primary" | 點擊開啟諮詢連結 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default（啟航方案用戶）| 當前方案為 ecommerce_starter | 左卡片 disabled，右卡片可操作 |
| Loading | 資料載入中 | Skeleton 兩卡片 |
| Error | API 失敗 | 錯誤提示 + 重新整理按鈕 |
| 已升級（進階電商包）| 方案已是 ecommerce_advanced | 顯示「✅ 您已是進階電商包用戶，所有功能均已解鎖」提示，不顯示升級 CTA |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「聯絡營運輔導顧問詢問升級」 | 開啟升級詢問 Dialog（Screen 4）|
| 點擊「即將推出」按鈕 | Tooltip 提示「線上升級功能即將推出，敬請期待」|
| 點擊「預約 15 分鐘通話諮詢」 | 開啟諮詢連結（新分頁）|
| 點擊「目前方案」 | 無反應（disabled 狀態）|

---

### Screen 4: 升級詢問 Dialog

**Purpose：** 讓商家以預填資訊快速送出升級詢問，Evomni 業務收到通知後聯繫報價。
**Entry points：** 方案比較頁點擊「聯絡營運輔導顧問詢問升級」；方案狀態頁「聯絡營運輔導顧問續約」
**Primary user goal：** 送出升級詢問，等待業務聯繫

#### Information Hierarchy

```
H1 (most prominent): 升級詢問（Dialog 標題）
H2 (secondary): 預填說明文字
Primary CTA: 送出詢問
Secondary CTA: 取消
Supporting info: 唯讀預填欄位、可修改欄位、確認 Checkbox
```

#### Actual Copy

**Dialog Title**
- `升級詢問`

**Helper Text**
- `我們已幫您預填以下資訊，確認後送出即可：`

**Form Fields**

| Field label | Placeholder / 預填值 | 唯讀？ | Error text |
|---|---|---|---|
| 商家名稱 | {自動帶入商家名稱} | ✅ 唯讀 | — |
| 目前方案 | 電商啟航方案 | ✅ 唯讀 | — |
| 目標方案 | 進階電商包 | ✅ 唯讀 | — |
| 聯絡人 | {自動帶入帳號姓名} | ❌ 可修改 | `請輸入聯絡人姓名` |
| 聯絡電話 | 請輸入您的聯絡電話 | ❌ 必填 | `請輸入有效的聯絡電話（例：0912345678）` |
| 方便聯絡時段 | 任何時間（預設）| ❌ 下拉選單 | — |
| 備註 | 如有特殊需求請說明 | ❌ 選填 | — |

**聯絡時段選項：** `任何時間` / `早上 9:00–12:00` / `下午 1:00–5:00`

**Checkbox**
- Label: `我確認以上資訊正確`
- Error（未勾選送出）: `請確認資訊正確後勾選`

**Button Labels**
- Primary action: `送出詢問`
- Secondary action: `取消`
- Loading state: `送出中…`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 送出成功 | Dialog 關閉，跳轉至成功畫面（Screen 5）|
| 送出失敗 | `送出失敗，請稍後再試或直接聯絡客服 service@evomni.com` （el-message type="error"）|

**Error States**

| Error condition | Message shown to user |
|---|---|
| 聯絡電話格式錯誤 | `請輸入有效的聯絡電話（例：0912345678）` |
| 聯絡人未填 | `請輸入聯絡人姓名` |
| Checkbox 未勾選 | `請確認資訊正確後勾選` |
| API 失敗 | `送出失敗，請稍後再試或直接聯絡客服 service@evomni.com` |

**Loading State**
- 「送出詢問」按鈕顯示 loading spinner，文字改為「送出中…」，禁止重複點擊

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Dialog 容器 | el-dialog width="560px" !rounded-none，close-on-click-modal=false | Overlay 點擊不關閉 |
| Helper Text | 14px #606266，margin-bottom 16px | — |
| 唯讀輸入框 | el-input disabled，背景 #F5F7FA，文字 #909399 | 視覺灰底區別可修改欄位 |
| 可修改輸入框 | el-input，正常樣式 | 離焦後觸發驗證 |
| 聯絡時段 Select | el-select，寬 100%，3 選項 | 下拉選擇 |
| 備註 Textarea | el-input type="textarea" rows=3 | 選填 |
| 確認 Checkbox | el-checkbox | 勾選後啟用「送出詢問」按鈕 |
| 取消按鈕 | el-button type="default" !rounded-none | 關閉 Dialog，返回方案比較頁 |
| 送出詢問按鈕 | el-button type="primary" !rounded-none，:loading 狀態 | 點擊觸發表單驗證與 API 呼叫 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | Dialog 開啟 | 預填欄位填入，Checkbox 未勾選，送出按鈕可用（因 Checkbox 後啟用）|
| Checkbox 未勾選送出 | 直接點擊「送出詢問」 | Checkbox 紅框 + 錯誤提示 |
| 電話格式錯誤 | 輸入非有效電話格式離焦 | 電話欄位紅框 + 錯誤文字 |
| 送出中 | 點擊「送出詢問」有效表單 | 按鈕 loading spinner，禁止重複點擊 |
| 送出成功 | API 返回 200 | Dialog 關閉，跳轉 Screen 5 |
| 送出失敗 | API 返回錯誤 | el-message type="error"，Dialog 留存 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「取消」 | 關閉 Dialog，回到方案比較頁 |
| 修改聯絡人姓名 | 即時更新欄位值 |
| 輸入聯絡電話後離焦 | 驗證格式，格式錯誤顯示紅框 |
| 勾選確認 Checkbox | 啟用「送出詢問」按鈕 |
| 點擊「送出詢問」（有效表單）| loading → API → 成功跳轉 Screen 5 |
| 點擊「送出詢問」（無效表單）| 顯示各欄位驗證錯誤，不送出 |

---

### Screen 5: 詢問送出成功畫面

**Purpose：** 確認商家的升級詢問已成功送出，並告知後續步驟。
**Entry points：** 升級詢問 Dialog 送出成功後自動跳轉
**Primary user goal：** 確認詢問已送出，知道何時會有人聯繫

#### Information Hierarchy

```
H1 (most prominent): 詢問已送出（el-result title）
H2 (secondary): 後續說明（1 個工作天內聯繫）
Primary CTA: 返回後台首頁
Secondary CTA: 返回方案狀態頁（el-link）
Supporting info: 確認信寄送提示
```

#### Actual Copy

**Page / Section Headings**
- el-result title: `詢問已送出`

**el-result sub-title**
- `我們的營運輔導顧問將在 1 個工作天內與您聯繫，請留意您的聯絡電話 {phone}`

**Notice Text**
- `確認信已寄送至您的信箱 {email}`

**Button Labels**
- Primary action: `返回後台首頁`
- Secondary link: `返回方案狀態頁`

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| el-result | icon="success"，全頁垂直置中 | — |
| 確認信提示 | 14px #909399，icon: el-icon-Message | — |
| 返回首頁按鈕 | el-button type="primary" !rounded-none | 點擊導向 /dashboard |
| 返回方案狀態連結 | el-link type="primary" | 點擊導向 /global-settings/subscription |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 詢問送出成功後 | el-result success 圖示 + 所有確認文字 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「返回後台首頁」 | 導向 /dashboard |
| 點擊「返回方案狀態頁」 | 導向 /global-settings/subscription |

---

### Screen 6: 內部後台 — 升級紀錄列表

> **⚠️ 此畫面為 Evomni 內部後台，非商家後台。僅供業務、PM、技術支援人員使用。**

**Purpose：** 讓 Evomni 業務 / PM 查看所有商家的升級詢問申請，找到待處理項目進行開通。
**Entry points：** Evomni 內部後台 > 升級紀錄
**Primary user goal：** 快速找到待處理升級申請並進行開通操作

#### Information Hierarchy

```
H1 (most prominent): 方案升級紀錄
H2 (secondary): 篩選器列 + 申請列表
Primary CTA: 處理（待處理申請的操作按鈕）
Secondary CTA: 查看（已完成申請）
Supporting info: 商家名稱、方案、詢問時間、狀態 Badge
```

#### Actual Copy

**Page / Section Headings**
- Page title: `方案升級紀錄`

**篩選區**
- 狀態下拉 placeholder: `全部狀態`
- 狀態選項: `全部狀態` / `待處理` / `處理中` / `已開通` / `已取消`
- 搜尋 placeholder: `搜尋商家名稱…`
- Button: `搜尋`

**Table Column Headers**
- `商家名稱` / `目前方案` / `目標方案` / `詢問時間` / `狀態` / `操作`

**Status Labels**

| Status key | Display text | Colour semantic |
|---|---|---|
| pending | `待處理` | Warning #E6A23C |
| in_progress | `處理中` | Info #409EFF |
| completed | `已開通` | Success #67C23A |
| cancelled | `已取消` | Neutral #909399 |

**Operation Buttons**
- pending / in_progress: `處理` (primary small)
- completed / cancelled: `查看` (default small)

**Empty State**
- Headline: `目前沒有升級紀錄`
- Subtext: `商家送出升級詢問後會在這裡顯示`
- CTA label: —（內部頁無額外 CTA）

**Filtered Empty State**
- Headline: `找不到符合條件的升級紀錄`
- Subtext: `請嘗試調整搜尋條件`

**Error States**

| Error condition | Message shown to user |
|---|---|
| API 失敗 | `無法載入升級紀錄，請重新整理頁面` + `重新整理` 按鈕 |

**Loading State**
- Loading text: skeleton table rows（3–5 行）

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 頁面標題 | H1 20px #303133 | — |
| 狀態篩選 Select | el-select 寬 160px，5 選項 | 選擇後即時過濾列表 |
| 搜尋框 | el-input 寬 240px，prefix icon Search | Enter 或點搜尋按鈕觸發 |
| 搜尋按鈕 | el-button !rounded-none | 觸發列表過濾 |
| 資料表格 | el-table 寬 100%，stripe=true，highlight-current-row | Row hover 高亮 |
| 詢問時間欄 | 可排序，預設降序（最新在上）✅ | 點擊欄位標題切換升/降序 |
| 狀態 Badge | el-tag，variant per status，size="small" | — |
| 處理按鈕 | el-button type="primary" size="small" !rounded-none | 點擊開啟確認開通 Dialog（Screen 7）|
| 查看按鈕 | el-button type="default" size="small" !rounded-none | 點擊開啟唯讀詳情 Dialog |
| Empty State | 置中文字 + icon | 列表為空時顯示 |
| Pagination | el-pagination，每頁 20 筆，layout="total, prev, pager, next" | 切換頁數重新載入 |

**Sortable Columns（Rule 4 合規）**

| 欄位 | 可排序 | 備注 |
|---|---|---|
| 商家名稱 | ❌ | — |
| 目前方案 | ❌ | — |
| 目標方案 | ❌ | — |
| 詢問時間 | ✅ | **預設排序：降序（最新在上）** |
| 狀態 | ❌ | — |
| 操作 | ❌ | — |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default（有資料）| 有升級紀錄 | 完整列表，待處理在最上方（預設排序） |
| Empty | 無任何升級紀錄 | Empty State |
| Filtered Empty | 篩選後無結果 | Filtered Empty State |
| Loading | 資料載入中 | Skeleton rows |
| Error | API 失敗 | 錯誤提示 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 選擇狀態篩選 | 即時過濾列表，不需點搜尋 |
| 輸入商家名稱 + Enter | 過濾列表 |
| 點擊詢問時間欄標題 | 切換升序 / 降序 |
| 點擊「處理」按鈕 | 開啟確認開通 Dialog（Screen 7）|
| 點擊「查看」按鈕 | 開啟唯讀申請詳情 Dialog |

---

### Screen 7: 內部後台 — 確認開通 Dialog

> **⚠️ 此 Dialog 為 Evomni 內部後台操作，非商家可見。**

**Purpose：** 讓 Evomni 人員在確認收款後，填入新到期日與付款備注，一鍵完成方案開通並觸發通知信。
**Entry points：** 升級紀錄列表點擊「處理」按鈕
**Primary user goal：** 填入新到期日，確認開通商家方案

#### Information Hierarchy

```
H1 (most prominent): 確認方案開通（Dialog 標題）
H2 (secondary): 商家資訊摘要（唯讀）+ 到期日欄位（必填）
Primary CTA: 確認開通
Secondary CTA: 取消
Supporting info: 付款確認說明（選填）、操作警告文字
```

#### Actual Copy

**Dialog Title**
- `確認方案開通`

**商家資訊顯示（唯讀）**
- `商家：{商家名稱}`
- `升級：電商啟航方案 → 進階電商包`
- `聯絡人：{聯絡人姓名}`
- `聯絡電話：{聯絡電話}`

**Form Fields**

| Field label | Placeholder | Helper text | Error text |
|---|---|---|---|
| 新到期日 | 請選擇新到期日 | — | `請選擇新到期日` |
| 付款確認說明 | 請輸入收款備注，例如：匯款後五碼 xxxxx | 選填 | — |

**Warning Text**
- `⚠️ 確認後將立即解鎖商家的進階電商包功能，並自動寄出開通通知信`

**Button Labels**
- Primary action: `確認開通`
- Secondary action: `取消`
- Loading state: `開通中…`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 確認開通成功 | `✅ 已成功開通 {商家名稱} 的進階電商包` |
| 確認開通失敗 | `開通失敗，請重試。如問題持續請聯絡技術支援` |

**Error States**

| Error condition | Message shown to user |
|---|---|
| 新到期日未選 | `請選擇新到期日` |
| API 失敗 | `開通失敗，請重試。如問題持續請聯絡技術支援`（inline error） |

**Loading State**
- 「確認開通」按鈕顯示 loading spinner，文字改為「開通中…」，禁止重複點擊

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Dialog 容器 | el-dialog width="480px" !rounded-none，close-on-click-modal=false | Overlay 點擊不關閉 |
| 商家資訊區塊 | 唯讀顯示，背景 #F5F7FA，padding 16px，border-radius 0 | — |
| 新到期日 | el-date-picker type="date"，寬 100%，:disabledDate 禁止選今日以前 | 點擊開啟日曆 |
| 付款確認說明 | el-input type="textarea" rows=2 | 選填 |
| 操作警告 | el-alert type="warning" :closable=false | 靜態顯示 |
| 取消按鈕 | el-button type="default" !rounded-none | 關閉 Dialog，不執行任何操作 |
| 確認開通按鈕 | el-button type="primary" !rounded-none，:loading 狀態 | 點擊觸發驗證與開通 API |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | Dialog 開啟 | 商家資訊顯示，到期日空白待填 |
| 到期日未選就送出 | 點擊「確認開通」 | 日期選擇器紅框 + 錯誤提示 |
| 開通中 | 點擊「確認開通」有效表單 | 按鈕 loading，禁止重複點擊 |
| 成功 | API 返回 200 | Dialog 關閉，Toast 成功訊息，列表該行狀態更新為「已開通」|
| 失敗 | API 返回錯誤 | inline error message，Dialog 留存，可重試 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 選擇新到期日 | 日期選擇器更新，清除驗證錯誤 |
| 輸入付款確認說明 | 即時更新欄位值 |
| 點擊「取消」 | 關閉 Dialog，返回升級紀錄列表 |
| 點擊「確認開通」（有效）| loading → API → 成功 Toast，Dialog 關閉，列表更新狀態 |
| 點擊「確認開通」（未選到期日）| 日期欄位紅框錯誤提示，不送出 |

---

## Part 4 — Cross-Screen Component Inventory

### Action Components

| 元件 | 變體 | 尺寸 | 狀態 |
|---|---|---|---|
| Button | Primary / Default / Disabled | Large / Medium / Small | Default / Hover / Active / Disabled / Loading |
| el-link | Primary / Default | — | Default / Hover |

### Display Components

| 元件 | 變體 | 資料欄位 | 狀態 |
|---|---|---|---|
| 方案卡片（主機/AI） | 正常 / 警示（橘）/ 危急（紅）/ 到期（遮罩）| 方案名稱、到期日、剩餘天數、進度條 | Default / Hover |
| 電商方案卡片 | 啟航方案 / 進階電商包（已升級）/ 無電商（Empty）| 方案名稱、到期、功能清單 | Default / Hover |
| 進度條 | 藍色（正常）/ 橘色（≤30天）/ 紅色（≤7天）| 剩餘天數百分比 | — |
| el-tag / Badge | info / warning / success / neutral | 狀態文字 | — |
| el-table row | 升級紀錄行 | 商家名稱、目前方案、目標方案、詢問時間、狀態、操作 | Default / Hover / Selected |
| UpgradeLockBanner | 無預覽 / 有預覽（show-preview）| 功能名稱、方案名稱、value prop | Default / Hidden |
| el-result | success | title、sub-title | — |

### Input Components

| 元件 | 變體 | 狀態 |
|---|---|---|
| Text Input | Default / Disabled（唯讀）/ With error | Default / Focus / Filled / Error / Disabled |
| Textarea | Default | Default / Focus / Filled |
| el-select | Single select | Default / Open / Selected / Disabled |
| el-date-picker | Date type | Default / Open / Selected / Disabled |
| el-checkbox | 單一勾選 | Default / Checked / Error（未勾選送出）|

### Navigation Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Sidebar | Expanded / Collapsed | 全域設定 > 方案狀態 導覽路徑 |
| Breadcrumb | — | 全域設定 / 方案狀態 |

### Feedback Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Toast（el-message）| success / error | 操作回饋，3s 自動消失 |
| el-alert | warning / error | 到期警示，嵌入卡片內 |
| el-notification | warning（置頂）| ≤1 天到期全域橫幅 |
| Modal / Dialog | 升級詢問 / 確認開通 | Overlay，點擊外部不關閉 |
| Empty State | 無資料 / 篩選無結果 | Headline + Subtext（+ CTA 選用）|
| Loading Skeleton | 卡片 / Table rows | Mimics 最終內容佈局 |
| 全頁到期遮罩 | — | el-overlay + el-result，僅保留單一 CTA |
| el-tooltip | 鎖定功能說明 | Hover 觸發，max-width 200px |

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
| Card shadow（hover）| Element Plus shadow-hover |
| 進階電商包卡片邊框 | `2px solid #E6A23C`（強調升級推薦）|

---

## Assumptions

> 📌 假設：方案狀態頁 AI Token 進度條數值從現有 AI 設定 API 取用，不另建新 endpoint。

> 📌 假設：價格（NT$29,800 / NT$39,800）標示於方案比較頁，若商業決策不對外顯示價格，則移除並改為「聯絡我們取得報價」。

> 📌 假設：「預約 15 分鐘通話諮詢」連結目標待 PM 確認（Calendly / 內部預約頁 / mailto）。

> 📌 假設：Evomni 內部後台升級紀錄頁路由、登入機制與商家後台分離，本 spec 不設計內部後台登入流程。

> 📌 假設：純 CMS 帳號（無電商方案）的電商卡片顯示「了解電商方案」CTA，連結目標待 PM 確認（官網方案頁 / 內部介紹頁）。

> ✏️ Copy 待確認：到期遮罩的確切文案需確認功能是「全部暫停」還是「僅特定功能暫停」。

---

## Part 6 — Claude Design Prompt Cheatsheet

**使用說明：**
1. 將這份 .md 上傳到 Claude Design
2. 找到你想先做的畫面，複製下方對應的 prompt
3. 貼入 Claude Design 對話框，開始生成
4. 在 Claude Design 中直接對話迭代細節

---

### Screen 1 — 方案狀態頁

```
請幫我設計「方案狀態」的後台管理頁面 UI。這是桌面後台，使用 Element Plus 元件、Noto Sans TC 字體、無圓角（border-radius: 0）。

頁面佈局：左側 Sidebar 導覽（全域設定 > 方案狀態），右側主內容區。主內容分三區：頂部兩欄並排（主機方案卡片 + AI 方案卡片），底部橫向全寬（電商方案卡片）。

主機/AI 方案卡片：el-card，顯示方案名稱、到期日、剩餘天數進度條（藍色 #409EFF），以及「聯絡營運輔導顧問續約」按鈕。AI 方案卡片額外包含 Token 使用量進度條與「查看 AI 使用詳情 →」連結。

電商方案卡片：橫向全寬，左側顯示已包含功能清單（綠色 ✅ icon），右側顯示進階電商包專屬功能清單（🔒 icon，文字灰化 #909399），最底部顯示「了解進階電商包並升級 →」主要 CTA 按鈕。

請同時設計「≤30 天到期警示」狀態：進度條轉橘色 #E6A23C，卡片上方顯示 el-alert type="warning"。請參考上傳文件中 Screen 1 的規格。
```

---

### Screen 2 — UpgradeLockBanner 元件

```
請幫我設計一個可複用的「功能鎖定升級提示」元件（UpgradeLockBanner）。這是嵌入在各功能頁面的元件，非獨立頁面。Element Plus 元件，無圓角。

元件外觀：el-card 容器，背景 #F5F7FA，左側 4px solid 藍色邊框 #409EFF，padding 20px。內容由上而下：第一行「🔒 此功能為「進階電商包」專屬」（14px bold #303133），第二行說明文字「升級後即可使用「自動化行銷旅程」，讓行銷工作自動化、用數據驅動再行銷」（13px #606266），底部「了解進階電商包」主要 CTA 按鈕（Primary，無圓角）。

請同時設計帶有模糊預覽截圖的變體：元件底部附加一張 blur(4px) 模糊功能預覽圖，搭配 8px padding 與淺灰邊框。請參考上傳文件中 Screen 2 的規格。
```

---

### Screen 3 — 方案比較頁

```
請幫我設計「升級您的電商方案」的桌面後台頁面 UI。Element Plus，無圓角，左側 Sidebar 導覽。

主內容：H1 標題「升級您的電商方案」，副標「根據您的使用需求，選擇最適合的方案：」，下方兩欄並排方案卡片。

左卡片（電商啟航方案）：灰色 info badge「✦ 您目前的方案」，顯示功能清單（✅ icon），底部 disabled 按鈕「目前方案」。

右卡片（進階電商包）：金色邊框 #E6A23C，warning badge「✦ 推薦升級」，功能清單（✅ icon），底部兩個按鈕：「聯絡營運輔導顧問詢問升級」（Primary）、「即將推出」（disabled 灰色，第二階段自助付款佔位）。

頁面最底部顯示「不確定哪個方案適合您？預約 15 分鐘通話諮詢」連結列。請參考上傳文件中 Screen 3 的規格。
```

---

### Screen 4 — 升級詢問 Dialog

```
請幫我設計「升級詢問」的 el-dialog 彈窗 UI。Dialog 寬 560px，無圓角，Element Plus。

Dialog 標題「升級詢問」，頂部 helper text「我們已幫您預填以下資訊，確認後送出即可：」。

表單內容：
- 商家名稱（唯讀，灰底 #F5F7FA）
- 目前方案（唯讀，顯示「電商啟航方案」）
- 目標方案（唯讀，顯示「進階電商包」）
- 聯絡人（可修改，預填帳號姓名）
- 聯絡電話（必填，空白等待輸入）
- 方便聯絡時段（el-select，預設「任何時間」）
- 備註（el-textarea，選填）

底部：勾選 Checkbox「我確認以上資訊正確」，右側「取消」與「送出詢問」按鈕。

請同時設計錯誤狀態：聯絡電話欄位紅框 + 錯誤提示文字。請參考上傳文件中 Screen 4 的規格。
```

---

### Screen 5 — 詢問送出成功畫面

```
請幫我設計「詢問已送出」的成功確認頁面 UI。桌面後台，Element Plus，無圓角，使用 el-result 元件。

畫面以 el-result success 圖示置中呈現，title「詢問已送出」，sub-title「我們的營運輔導顧問將在 1 個工作天內與您聯繫，請留意您的聯絡電話 09XX-XXX-XXX」。下方一行小字「確認信已寄送至您的信箱 xxx@example.com」（#909399）。

底部按鈕：「返回後台首頁」（Primary 按鈕），旁邊「返回方案狀態頁」（el-link）。請參考上傳文件中 Screen 5 的規格。
```

---

### Screen 6 — 內部後台：升級紀錄列表

```
請幫我設計「方案升級紀錄」的內部後台管理列表頁。桌面後台，Element Plus，無圓角。注意：這是 Evomni 內部後台，設計風格與商家後台相同但為內部工具。

頁面頂部：H1「方案升級紀錄」，下方篩選列包含狀態下拉（全部狀態 / 待處理 / 處理中 / 已開通 / 已取消）、商家名稱搜尋框、「搜尋」按鈕。

主內容：el-table，欄位為「商家名稱 / 目前方案 / 目標方案 / 詢問時間（可排序，預設降序）/ 狀態 / 操作」。狀態 Badge 顏色：待處理=橘、處理中=藍、已開通=綠、已取消=灰。操作欄：待處理/處理中顯示「處理」按鈕（Primary small），已完成/取消顯示「查看」按鈕（Default small）。

底部 el-pagination。請同時設計 Empty State 畫面。請參考上傳文件中 Screen 6 的規格。
```

---

### Screen 7 — 內部後台：確認開通 Dialog

```
請幫我設計「確認方案開通」的 el-dialog 彈窗 UI。Dialog 寬 480px，無圓角，Element Plus，內部後台工具。

Dialog 標題「確認方案開通」。頂部唯讀資訊區塊（背景 #F5F7FA，padding 16px）：顯示「商家：OO有限公司 / 升級：電商啟航方案 → 進階電商包 / 聯絡人：XXX / 聯絡電話：09XX-XXX-XXX」。

下方表單：「新到期日」（el-date-picker，必填）、「付款確認說明」（el-textarea，選填，placeholder「請輸入收款備注，例如：匯款後五碼 xxxxx」）。

表單下方 el-alert type="warning"：「⚠️ 確認後將立即解鎖商家的進階電商包功能，並自動寄出開通通知信」。

底部：「取消」按鈕 + 「確認開通」Primary 按鈕。請同時設計到期日未填的錯誤狀態，以及「確認開通」loading 狀態。請參考上傳文件中 Screen 7 的規格。
```

---

### 完整產品一次生成（可選）

```
請幫我設計「Evomni 方案管理與升級流程」的完整 UI，共 7 個畫面/元件。這是一個桌面電商後台，使用 Element Plus，無圓角（border-radius: 0），Noto Sans TC 字體，Primary color #303133，Brand blue #409EFF。

包含：
1. 方案狀態頁（全域設定 > 方案狀態）：三方案卡片（主機/AI/電商），剩餘天數進度條，到期警示 Alert
2. UpgradeLockBanner 元件：嵌入式功能鎖定提示，左側藍色邊框卡片樣式
3. 方案比較頁（/subscription/upgrade）：啟航方案 vs 進階電商包兩欄並排，金色邊框推薦卡片
4. 升級詢問 Dialog：預填表單，唯讀欄位灰底，確認 Checkbox
5. 詢問送出成功畫面：el-result success 置中呈現
6. 內部後台升級紀錄列表：篩選 + el-table + 狀態 Badge + 分頁
7. 內部後台確認開通 Dialog：唯讀商家資訊 + 到期日選擇 + 警告文字

請以商家後台（Screens 1–5）和內部後台（Screens 6–7）分兩組呈現，保持視覺一致。請參考上傳的完整 UX Spec 文件。
```
