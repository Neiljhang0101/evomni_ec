# 訪客訂單查詢 — Design Brief + UX Spec

> **Version:** 1.0
> **Created:** 2026-06-08
> **PRD 來源：** PRD_new/Evomni_Part3_訂單管理_PRD.md（v2.1）§6.5、PRD_new/Evomni_購物車與結帳流程_PRD.md（v1.1）§CC-1
> **適用方案：** 電商啟航方案（前台消費者端）
> **用途：** 上傳至 Claude Design，配合文件末尾的 Prompt Cheatsheet 使用

---

## Part 1 — Design Brief

### Product Vision

訪客訂單查詢頁讓未登入帳號的消費者（訪客）只需輸入訂單編號與收件手機末四碼，即可查詢自己的訂單狀態與物流進度。對於不想建立帳號但透過電商前台完成購物的訪客，這是追蹤包裹的唯一入口。設計目標是在最少欄位輸入的情況下，提供足夠的訂單資訊，同時嚴格保護個人資料不外洩，並在查詢結果頁自然引導訪客轉換為正式會員。

### Target User

**Primary（訪客消費者）：** 完成結帳後未登入或未建立帳號的消費者，想要確認包裹狀態；進入管道通常是結帳確認信的連結、或頁尾「查詢訂單」連結。

**Secondary（已完成訂單的訪客，想申請退換貨）：** 訂單完成後 7 天內，想要透過訪客查詢頁申請退換貨，而不需要建立帳號的消費者。

### Design Goals

| # | Goal | How to test |
|---|---|---|
| 1 | 訪客能在 1 分鐘內找到頁面入口、完成查詢並看到訂單狀態 | 計時觀察從點擊頁尾連結到看到結果的時間 |
| 2 | 查詢失敗時，訪客能理解失敗原因並知道如何重試（不感到被拒絕） | 觀察訪客在驗證失敗後的行為（是否重試、是否放棄） |
| 3 | 訪客能從結果頁確認物流狀態，而不需要額外點擊 | 觀察訪客是否能直接從頁面讀取最新物流事件，不須跳轉 |
| 4 | 訪客查詢成功後，能看到引導加入會員的提示，且不會感到強迫 | 詢問訪客是否注意到會員引導，以及是否感到受到騷擾 |

### Design Principles

1. **最少資料原則** — 只顯示追蹤包裹所需的最少個資（縣市不顯示完整地址，手機號碼遮蔽中段）
2. **即時可見，不需跳轉** — 物流時間軸直接顯示在查詢結果頁，訪客不需額外連結才能看到最新進度
3. **錯誤提示不洩露資訊** — 驗證失敗一律統一文案，不提示是哪個欄位錯誤，防止枚舉攻擊
4. **會員引導為邀請，非阻擋** — 加入會員的引導以 CTA 按鈕呈現，不以遮罩或強制彈窗阻擋查詢流程

### Design System Reference

- **設計系統：** Evomni 前台設計系統（`frontend-design-system/`）
- **字體：** Inter（拉丁文字）+ Noto Sans TC（中文），基礎字級 16px，最小字級 14px
- **圖示：** Material Icons Outlined（CDN）
- **色彩：** CSS 自訂屬性，引用 `colors_and_type.css`
- **彈窗 / 通知：** EvomniAlert（`evomnialert/`）— 所有確認對話、操作回饋均使用此元件
- **頁面背景：** `var(--fill-300)`（米白）
- **頁面最大寬度：** `var(--container)`

### Accessibility Requirements

- **Target WCAG level:** AA
- **Known constraints:**
  - 所有文字最小 14px，不得使用更小字級
  - 表單欄位 focus 狀態需清楚顯示（`border-color: var(--ink-900)`）
  - 訂單狀態 Tag 不能只靠顏色傳達狀態，須附文字標籤
  - 遮蔽的個資（如手機、地址）需附說明文字，不能讓使用者誤以為資料不完整是錯誤

### Hard Constraints

- ⚠️ 禁止使用 Emoji 字元（所有文案、標籤、說明文字）
- ⚠️ 前台頁面不使用後台設計系統（Element Plus、`components/` 資料夾元件）
- ⚠️ 所有彈窗、確認對話、通知訊息一律使用 EvomniAlert，禁止自製
- ⚠️ 查詢結果頁不顯示消費者完整手機號碼或完整地址（個資保護）
- ⚠️ 驗證失敗提示不透露是哪個欄位輸入錯誤（防枚舉攻擊）
- ⚠️ 結果頁不顯示金額細項分解（只顯示訂單總計），保護商業資訊

### Out of Scope

- 已登入會員的訂單查詢（屬會員中心「我的訂單」頁面範疇）
- 退換貨申請表單 UI（訪客點擊後的申請頁面，屬另一個功能模組）
- CAPTCHA 元件的視覺設計（使用 Google reCAPTCHA v3 原生 UI）
- 後台管理員查詢訂單的介面

---

## Part 2 — Screen Index

| # | Screen Name | Navigation path | Primary user goal |
|---|---|---|---|
| 1 | 訪客訂單查詢頁（初始態） | 前台頁尾「查詢訂單」連結 / 結帳確認信連結 | 輸入訂單編號與手機末四碼，送出查詢 |
| 2 | 訂單查詢結果（成功態） | 查詢頁表單送出後，同頁面顯示結果區塊 | 閱讀訂單狀態、查看物流進度、視需要申請退換貨 |

---

## Part 3 — Per-Screen UX Spec

---

### Screen 1: 訪客訂單查詢頁（初始態）

**Purpose:** 訪客輸入訂單編號與收件手機末四碼，通過驗證後顯示訂單資訊。
**Entry points:** 前台商店頁尾「查詢訂單」連結；結帳確認信中的「查詢訂單狀態」按鈕連結
**Primary user goal:** 完成查詢驗證，取得訂單狀態

#### Information Hierarchy

```
H1 (most prominent): 查詢您的訂單
H2 (secondary): 輸入下單時的訂單編號及手機號碼末四碼即可查詢訂單狀態
Primary CTA: 查詢訂單
Supporting info: 表單欄位標籤、輸入提示文字
```

#### Actual Copy

**Page / Section Headings**
- 頁面標題：`查詢您的訂單`
- 說明文字：`輸入下單時的訂單編號及手機號碼末四碼即可查詢訂單狀態`

**Button Labels**
- Primary action：`查詢訂單`

**Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 訂單編號 | `例：ORD-20260427-000001` | 訂單編號格式：ORD-日期-序號，可在確認信中找到 | `請輸入訂單編號` |
| 收件人手機末四碼 | `請輸入 4 位數字` | 下單時填寫的收件手機號碼後四碼 | `請輸入 4 位數字（僅限數字）` |

**Empty State**
- 此頁無空態（頁面以表單形式呈現，初始即為可輸入狀態）

**Error States**

| Error condition | Message shown to user |
|---|---|
| 查詢失敗（訂單不存在或末四碼不符） | `查無此訂單，請確認訂單編號及手機號碼末四碼是否正確。如有問題請聯繫客服。` |
| 訂單編號欄位空白送出 | `請輸入訂單編號` |
| 手機末四碼欄位空白或非數字 | `請輸入 4 位數字（僅限數字）` |
| 手機末四碼不足 4 位 | `手機末四碼須為 4 位數字` |
| 連續失敗 5 次後（觸發 CAPTCHA） | `請完成驗證後再次查詢` |
| 網路 / API 錯誤 | `查詢暫時無法使用，請稍後再試` |

**Loading State**
- 按下「查詢訂單」後：按鈕顯示 Loading Spinner，文字改為 `查詢中...`，按鈕 Disabled 防止重複送出

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 查詢失敗（通用） | 以 inline 錯誤方式顯示，不使用 Toast（避免 Toast 消失後訪客不知失敗原因） |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 頁面容器 | 最大寬度 480px，垂直置中，`var(--fill-300)` 背景 | — |
| 頁面標題 H1 | font-size 28px（桌機）/ 22px（手機），font-weight 700 | — |
| 說明文字 | font-size 16px，`var(--ink-500)` 顏色 | — |
| 文字輸入框（訂單編號） | 全寬，高度 48px，border-radius 8px；輸入時自動轉大寫 | focus 時 border 變 `var(--ink-900)`；輸入非法字元無反應 |
| 文字輸入框（手機末四碼） | 全寬，高度 48px，maxlength="4"，inputmode="numeric" | 只允許輸入數字，非數字字元自動過濾 |
| 欄位錯誤提示 | font-size 14px，`var(--danger-500)` 顏色，欄位下方 | 送出後且驗證失敗時顯示 |
| 全頁錯誤提示 | Alert 樣式，`var(--danger-100)` 背景，`var(--danger-600)` 文字；位於按鈕上方 | 查詢失敗時替換為此提示 |
| 查詢按鈕 | 全寬，高度 52px，Primary 樣式，font-size 16px | Loading 狀態：Spinner 取代文字，Disabled |
| CAPTCHA 區塊（條件顯示） | Google reCAPTCHA v3，第 5 次失敗後出現 | 完成 CAPTCHA 後才能再次送出 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 初始 | 頁面載入後 | 空白表單，說明文字，按鈕可點擊 |
| 部分填寫 | 使用者開始輸入 | 欄位 focus 高亮，尚無錯誤提示 |
| 載入中 | 點擊「查詢訂單」送出後 | 按鈕顯示 Spinner + 「查詢中...」，所有欄位 Disabled |
| 驗證失敗 | 後端回傳查無訂單 | 全頁 Alert 錯誤提示出現；按鈕恢復可點擊；欄位仍保留輸入值 |
| 需 CAPTCHA | 同 IP 連續失敗 5 次 | CAPTCHA 區塊顯示於按鈕上方；未完成 CAPTCHA 時按鈕 Disabled |
| 查詢成功 | 後端驗證通過 | 表單區塊縮到頁面上方（或隱藏），結果區塊展開（Screen 2 進入）|

#### Interaction Annotations

| User action | Result |
|---|---|
| 輸入訂單編號 | 自動轉換為大寫字母（`text-transform: uppercase` 或 JS onInput 處理） |
| 輸入手機末四碼 | 過濾非數字字元，最多 4 個字元 |
| 點擊「查詢訂單」（表單合法） | 按鈕進入 Loading，送出 API 請求 |
| 點擊「查詢訂單」（有空白欄位） | 欄位下方顯示對應錯誤提示，不送出 API |
| 查詢成功 | 頁面滾動至結果區塊（Screen 2）|
| 查詢失敗 | 頁面頂部出現 Alert 紅色錯誤提示，欄位保留輸入值 |

---

### Screen 2: 訂單查詢結果（成功態）

**Purpose:** 顯示訪客訂單的完整狀態資訊，包含商品清單、物流時間軸，以及退換貨與會員引導按鈕。
**Entry points:** Screen 1 查詢驗證通過後，同頁面滾動展開；或從確認信直接帶 token 進入（Session 有效時）
**Primary user goal:** 確認訂單目前狀態與物流進度

#### Information Hierarchy

```
H1 (most prominent): 訂單編號（ORD-XXXXXXXX）
H2 (secondary): 訂單狀態 Tag（視覺上最突出的狀態指示）
Primary CTA: 查看物流（若有物流追蹤號）
Secondary CTA: 申請退換貨（已完成訂單且 7 天內才顯示）
Tertiary CTA: 立即加入會員（常駐引導區）
Supporting info: 下單日期、商品清單、物流時間軸、收件縣市
```

#### Actual Copy

**Page / Section Headings**
- 訂單資訊區標題：`訂單資訊`（視覺輔助，可考慮省略直接顯示訂單編號）
- 商品清單標題：`訂購商品`
- 物流資訊標題：`物流進度`
- 會員引導區標題：`加入會員，下次查詢更方便`

**訂單基本資訊**
- 訂單編號標籤：`訂單編號`
- 下單日期標籤：`下單日期`
- 訂單狀態標籤：`訂單狀態`
- 訂單總計標籤：`訂單總計`

**Status Labels（訂單狀態 Tag）**

| Status key | Display text | Colour semantic |
|---|---|---|
| pending_payment | 待付款 | Warning（橙色） |
| paid | 已付款 | Info（藍色） |
| processing | 備貨中 | Info（藍色） |
| shipped | 已出貨 | Info（藍色） |
| delivering | 配送中 | Info（藍色） |
| delivered | 已送達 | Success（綠色） |
| completed | 已完成 | Neutral（灰色） |
| cancelled | 已取消 | Danger（紅色） |

**商品清單欄位**
- 欄：商品名稱、規格、數量、小計
- 格式：`NT$ X,XXX`

**物流資訊欄位**
- 物流方式標籤：`配送方式`
- 物流追蹤號標籤：`追蹤號碼`
- 查看物流按鈕：`查看物流進度`（外連物流商官網，另開分頁）
- 最新狀態標籤：`最新物流狀態`
- 預計到貨標籤：`預計到貨`（如有資料才顯示）

**個資遮蔽說明**
- 收件地點標籤：`收件地點`
- 遮蔽格式：`[縣市]（地址依個資保護規範不完整顯示）`
- 遮蔽手機（若顯示）：`0912-XXX-XXX`

**申請退換貨引導**
- 按鈕文字：`申請退換貨`
- 說明文字：`訂單完成後 7 天內可申請退換貨`

**訂單已取消時**
- 取消原因標籤：`取消原因`
- 付款逾時文案：`付款逾時，訂單已自動取消，庫存已回補`
- 商家取消文案：`此訂單已由商家取消`

**會員引導區**
- 標題：`加入會員，下次查詢更方便`
- 說明文字：`建立帳號後可隨時查看訂單、管理退換貨，並享受點數回饋`
- 按鈕：`立即加入會員`

**Error States（結果頁特有）**

| Error condition | Message shown to user |
|---|---|
| Session 過期（30 分鐘未操作） | `查詢 Session 已逾時，請重新查詢` + 「重新查詢」按鈕 |
| 物流追蹤號不存在或尚未更新 | `物流資訊尚未更新，請稍後再查詢` |
| 訂單狀態為已取消 | 顯示取消原因，不顯示物流時間軸 |

**Loading State**
- 初次載入結果：顯示 Skeleton（訂單資訊 + 商品清單 + 物流時間軸各有對應 Skeleton 佔位）

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 結果容器 | 最大寬度 640px，白色卡片，border-radius 12px，padding 24px | — |
| 訂單狀態 Tag | Pill 形狀（border-radius 999px），font-size 14px；依狀態對應色彩語意 | Hover 顯示三層 Tooltip（What / Impact / Next Step）|
| 訂單狀態 Tooltip | 三層內容：What / Impact / Next Step；參照 PRD §6.2 訂單狀態 Tag Tooltip 規格 | 桌機 Hover 觸發；手機點擊觸發 |
| 商品清單（簡版） | 商品圖 40×40px + 名稱 + 規格 + 數量 + 小計，垂直排列；無單價欄位 | — |
| 物流時間軸 | 垂直時間軸；每個節點顯示時間 + 狀態文字；最新節點高亮（`var(--primary-600)`）| — |
| 查看物流按鈕 | Secondary Ghost 樣式，有追蹤號才顯示 | 點擊後另開新分頁至物流商官網 |
| 申請退換貨按鈕 | Secondary 樣式，`var(--danger-100)` 背景，僅完成後 7 天內顯示 | 點擊後導向退換貨申請頁（仍需驗證身份）|
| 會員引導區 | 淡藍底色橫幅卡片，位於結果頁最底部 | — |
| 立即加入會員按鈕 | Primary 樣式 | 點擊後導向 `/register`，保留現有訂單資訊的帶入邏輯 |
| 重新查詢連結 | 文字連結樣式 | 點擊後清空結果區塊，表單恢復可輸入狀態 |
| Skeleton 載入佔位 | 模擬訂單卡片版面，灰色漸層動畫 | 資料載入完成後替換 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 載入中 | 查詢驗證通過，等待 API 回傳資料 | Skeleton 佔位顯示 |
| 正常訂單 | 訂單進行中（任何非取消非完成狀態）| 完整顯示商品清單、物流時間軸、訂單總計 |
| 訂單已完成（7天內） | 訂單狀態 completed，下單日距今 ≤ 7 天 | 多顯示「申請退換貨」按鈕 |
| 訂單已完成（7天後） | 訂單狀態 completed，下單日距今 > 7 天 | 不顯示「申請退換貨」按鈕 |
| 訂單已取消 | 訂單狀態 cancelled | 顯示取消原因；隱藏物流時間軸 |
| 待付款（逾時警示） | 訂單狀態 pending_payment | 顯示付款期限倒數或逾時警示 |
| Session 過期 | 查詢後 30 分鐘未操作 | 顯示逾時提示 + 「重新查詢」按鈕，結果區塊模糊化 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「查看物流進度」 | 另開新分頁，導向物流商官網追蹤頁面 |
| 點擊「申請退換貨」 | 導向退換貨申請頁（帶入訂單編號），需再次驗證身份 |
| 點擊「立即加入會員」 | 導向 `/register` 頁，URL 帶 `?from_order=ORD-XXXX` 參數 |
| 點擊「重新查詢」 | 清空結果區塊，頁面回到 Screen 1 表單可輸入狀態，表單欄位清空 |
| Hover 訂單狀態 Tag（桌機） | 顯示三層 Tooltip（What / Impact / Next Step） |
| 點擊訂單狀態 Tag（手機） | 展開 Bottom Sheet 顯示三層說明 |

#### Motion / Transition

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| 查詢成功，結果區塊展開 | Fade in + slide up（從下方 16px 移入）| 300ms | ease-out |
| Skeleton 替換為真實內容 | Fade in | 150ms | ease-out |
| Session 過期模糊化 | Blur 漸增（filter: blur 0 → 4px）| 200ms | ease-in |

---

## Part 4 — Cross-Screen Component Inventory

### Action Components

| 元件 | 變體 | 尺寸 | 狀態 |
|---|---|---|---|
| Button | Primary / Secondary / Ghost / Danger-light | Large (52px) / Medium (44px) | Default / Hover / Active / Disabled / Loading |
| Text Link | Default / Muted | — | Default / Hover / Visited |

### Display Components

| 元件 | 變體 | 資料欄位 | 狀態 |
|---|---|---|---|
| 訂單狀態 Tag | 8 種顏色語意（見 Status Labels）| 文字標籤 | Default / Hover（Tooltip 觸發）|
| 商品清單列 | 簡版（無單價） | 商品圖 / 名稱 / 規格 / 數量 / 小計 | Default |
| 物流時間軸節點 | 完成 / 最新 / 待完成 | 時間 / 狀態文字 | Default / Active（最新節點）|
| 訂單金額列 | 標籤 + 金額 | 左標籤 / 右金額 | Default / 強調（訂單總計加粗）|
| 個資遮蔽顯示 | 手機遮蔽 / 地址遮蔽 | 遮蔽字串 | Default |
| 會員引導橫幅 | 淡藍底色卡片 | 標題 / 說明 / CTA 按鈕 | Default |

### Input Components

| 元件 | 變體 | 狀態 |
|---|---|---|
| Text Input | Default / With error | Default / Focus / Filled / Error / Disabled |
| CAPTCHA 區塊（條件顯示）| Google reCAPTCHA v3 | Default / Verified |

### Navigation Components

| 元件 | 變體 | 說明 |
|---|---|---|
| 前台頁尾連結 | 文字連結 | 「查詢訂單」入口，位於頁尾 Footer |

### Feedback Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Inline Error Alert | Danger 樣式（紅色背景）| 查詢失敗時顯示，位於按鈕上方 |
| Skeleton | 訂單卡片版型 | 查詢載入中時顯示，漸層灰色動畫 |
| Toast（via EvomniAlert） | Success / Error / Info | 操作回饋，3s 自動消失 |

---

## Part 5 — Design System Token Reference

| Decision | Token / Value |
|---|---|
| 主色 | `var(--primary-600)` |
| 背景 | `var(--fill-300)`（米白） |
| 成功色 | `var(--success-600)` |
| 警告色 | `var(--warning-600)` |
| 危險色 | `var(--danger-600)` |
| 資訊色 | `var(--info-600)` |
| 中性色（文字）| `var(--ink-900)`（主文字）/ `var(--ink-500)`（次要文字）|
| 邊框 | `var(--line-200)` |
| 卡片圓角 | `12px` |
| 按鈕高度（Large）| `52px` |
| 基礎字級 | `16px` |
| 最小字級 | `14px` |

---

## Assumptions

> 📌 假設：訪客訂單查詢頁路徑為 `/order-query`，對應前台頁尾「查詢訂單」連結。實際路由請後端確認。

> 📌 假設：查詢成功後同頁面展開結果，不導向另一個 URL（避免訪客無法直接分享連結）。若需要可分享連結，後端需設計 Session token URL 方案。

> 📌 假設：物流時間軸節點文字直接使用後端回傳的物流事件描述，前端不自行對應翻譯。

> 📌 假設：訂單狀態 Tag Tooltip（三層說明）使用 PRD §6.2 的 What / Impact / Next Step 內容，需由後端隨 API 回傳訂單狀態文字。

> ✏️ Copy 待確認：「加入會員，下次查詢更方便」引導區的標題與說明文字是否符合品牌語氣，請 PM 確認後定稿。

> ✏️ Copy 待確認：物流時間軸「最新物流狀態」的文字格式，是否需前端格式化，或直接顯示物流商回傳的原始文字。

---

## Part 6 — Claude Design Prompt Cheatsheet

**使用說明：**
1. 將這份 DOCX 上傳到 Claude Design
2. 找到你想先做的畫面，複製下方對應的 prompt
3. 貼入 Claude Design 對話框，開始生成
4. 在 Claude Design 中直接對話迭代細節

---

### Screen 1 — 訪客訂單查詢頁（初始態）

```
請幫我設計「訪客訂單查詢頁」的 UI。這是 Evomni 電商前台的一個獨立功能頁面，
桌機與手機都需要（響應式），採用 Evomni 前台設計系統（米白背景 #F7F5F2、
Inter + Noto Sans TC、Material Icons Outlined）。

頁面主體是一個垂直置中的查詢表單卡片，最大寬度 480px，白色背景，圓角 12px。
頁面標題 H1「查詢您的訂單」，下方說明文字「輸入下單時的訂單編號及手機號碼末四碼即可查詢訂單狀態」。

表單有兩個欄位：
1. 訂單編號（文字輸入框，placeholder：例：ORD-20260427-000001）
2. 收件人手機末四碼（數字輸入框，maxlength 4，placeholder：請輸入 4 位數字）

最下方是全寬 Primary 按鈕「查詢訂單」（高度 52px）。

請同時設計一個查詢失敗狀態：按鈕上方出現紅色 Alert 橫幅，文字為「查無此訂單，請確認訂單編號及手機號碼末四碼是否正確。如有問題請聯繫客服。」

請參考上傳文件中 Screen 1 的規格。
```

---

### Screen 2 — 訂單查詢結果（成功態）

```
請幫我設計「訪客訂單查詢結果頁」的 UI。這是 Evomni 電商前台的查詢結果區塊，
查詢成功後在同頁面展開，桌機與手機都需要（響應式），採用 Evomni 前台設計系統。

結果區塊為白色卡片（最大寬度 640px，圓角 12px），包含以下分區：

1. 訂單基本資訊：訂單編號（例：ORD-20260427-000001）、下單日期（2026/05/15 14:32）、
   訂單狀態 Tag（「配送中」藍色 Pill）、訂單總計（NT$ 1,580）

2. 訂購商品：商品縮圖（40×40px）+ 名稱 + 規格 + 數量 + 小計，簡潔列表，
   不顯示單價，不顯示折扣明細

3. 物流進度：垂直時間軸，3 個節點（已出貨 / 配送中（最新，高亮）/ 待送達），
   最新節點使用主色。時間軸下方顯示「查看物流進度」按鈕（Secondary Ghost 樣式）

4. 收件地點：「台北市（地址依個資保護規範不完整顯示）」

5. 底部引導橫幅：淡藍色背景，「加入會員，下次查詢更方便」標題 +
   說明文字 + 「立即加入會員」按鈕

請額外設計一個「已完成訂單（7天內）」變體，在第 3 區下方多出
Danger-light 樣式的「申請退換貨」按鈕。

請參考上傳文件中 Screen 2 的規格。
```

---

### 完整功能一次生成（可選）

```
請幫我一次設計「訪客訂單查詢」功能的所有畫面，共兩個主要狀態。
採用 Evomni 前台設計系統（米白背景 #F7F5F2、Inter + Noto Sans TC、Material Icons Outlined）。
所有畫面都需要桌機與手機版本（響應式）。

第一個畫面是查詢表單（初始態）：頁面最大寬度 480px 的白色表單卡片，
標題「查詢您的訂單」，兩個欄位（訂單編號 + 手機末四碼），全寬送出按鈕「查詢訂單」。
需要一個查詢失敗的錯誤狀態。

第二個畫面是查詢結果（成功態）：最大寬度 640px 的白色卡片，
包含訂單基本資訊（狀態 Tag + 訂單編號 + 日期 + 總計）、
商品清單（簡版，只有名稱規格數量小計）、物流時間軸、收件縣市（地址隱碼）、
底部會員引導橫幅。需要「配送中」正常狀態和「已完成可退換貨」狀態兩種變體。

請參考上傳文件中的完整設計規格。
```
