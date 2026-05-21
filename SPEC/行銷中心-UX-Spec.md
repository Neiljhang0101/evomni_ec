# Evomni 行銷活動模組 — Design Brief + UX Spec

> **Version:** 1.0
> **Created:** 2026/05/12
> **來源 PRD：** `Evomni_Part4_行銷活動_PRD.md` v1.0 + v1.1（工程師補充）
> **Prototype：** 行銷活動後台（共 12 個頁面）
> **Downstream tools:** figma-generate-design · design:design-system · design:design-handoff · design:accessibility-review · design:design-critique

---

## Part 1 — Design Brief

### Product Vision

Evomni 行銷活動模組是電商後台的促銷規則與自動化行銷管理中心。商家管理員可以在單一後台入口管理所有行銷工具：從手動建立折扣代碼、設定滿額贈品，到啟用四條自動化行銷旅程（購物車挽回、沉睡客喚醒、購後產品推薦、點數/券到期提醒）。系統在正確時機自動觸發個人化的 Email 或 LINE 推播，將瀏覽中的訪客轉為訂單、將沉睡會員轉回活躍消費者，讓商家不需要行銷自動化背景也能執行精準的自動化行銷。

### Target User

**Primary：** 中小型電產品牌的後台管理者（店長或行銷專員），需要同時管理數十個行銷活動規則，但不具備行銷自動化平台的操作經驗，期望「設定一次就能自動運作」。

**Secondary：** 電產品牌行銷專員，負責設計促銷活動內容並追蹤效果，需要快速複製上個月活動設定並調整日期。

### Design Goals

| # | Goal | How to test |
|---|---|---|
| 1 | 商家可在 5 分鐘內完成一張優惠券的完整設定並啟用，不需查閱說明文件 | 計時可用性測試：首次使用者建立折扣代碼 |
| 2 | 從自動化行銷旅程列表，商家可在 10 秒內判斷哪個旅程已啟用及其本月轉換率 | 眼動測試或提問：「哪個旅程上個月帶來最多轉換？」|
| 3 | 消費者在購物車頁面不需滾動即可看到距下一層優惠差距（進度條在首屏可見） | 手機（375px 寬）截圖驗證首屏可見性 |
| 4 | LINE OA 設定：商家在 3 個步驟內完成 Token 填寫並通過驗證 | 可用性測試：從進入設定頁到看見「連線成功」 |
| 5 | 商家能從活動列表直接複製現有活動，省去重新填寫所有欄位的時間 | 任務測試：「請複製上個月的免運活動並修改活動期間」|

### Design Principles

1. **預設值降低摩擦** — 每個選填欄位必須有合理的預設值，讓商家「不修改就能直接啟用」的結果也是合理的
2. **數據即時可見** — 旅程的觸發次數、轉換率必須在列表層（不進入設定頁）就可讀取
3. **效率優先** — 核心操作（提交、啟用、停用）必須在首屏可見，不需捲動；支援「複製活動」快速建立
4. **安全透明** — 敏感設定（LINE Token）儲存後遮蔽顯示，並提供清楚的「重新設定」路徑

### Design System Reference

- **Figma Library：** Evomni Admin Design System（沿用已建立之 Token）
- **Component framework：** Element Plus 視覺語言（實作為純 React，不引入 Element Plus 函式庫）
- **Icon set：** Element Plus Icons
- **Font：** Noto Sans TC（400 / 500 / 600 / 700）

### Accessibility Requirements

- **Target WCAG level：** AA
- **Known constraints：**
  - 所有表單欄位必須有可見的 label 及關聯錯誤訊息，不可只依賴 placeholder
  - 狀態 Badge 使用顏色＋文字雙重識別（不可只用顏色）
  - 開關（Switch）必須有可操作的鍵盤焦點狀態
  - 所有顏色組合需達 4.5:1 對比比例
  - Toast 通知需可被 screen reader 讀取（ARIA live region）

### Hard Constraints

- ⚠️ 不包含消費者結帳付款流程 UI（屬於購物車/結帳模組）
- ⚠️ RFM 計算邏輯由 Part 5 數據中心負責，本模組只讀取分群結果標籤，不提供計算設定
- ⚠️ LINE Flex Message 的視覺樣式由後端生成，後台只設定觸發條件與文字內容
- ⚠️ Email 模板的 HTML 視覺設計由 NT 發信模組負責，本模組只觸發發送

### Out of Scope

- 前台產品頁的限時折扣倒數計時（前台產品頁模組負責渲染）
- LINE 官方帳號帳號管理、粉絲管理、訊息配額查看
- Email 模板的 HTML 視覺編輯器
- RFM 分群計算邏輯設定（Part 5 數據中心）
- 進階電商包的升級/付費流程

---

## Part 2 — Screen Index

| # | Screen 名稱 | Navigation 路徑 | Primary User Goal |
|---|---|---|---|
| 1 | 優惠券管理 — 列表頁 | 行銷活動 → 優惠券管理 | 查看、搜尋、新增、停用優惠券 |
| 2 | 優惠券 — 新增/編輯設定頁 | 優惠券管理 → [新增優惠券] / [編輯] | 設定優惠券所有條件並儲存 |
| 3 | 滿額/滿件優惠 — 活動列表頁 | 行銷活動 → 滿額/滿件優惠 | 查看、篩選、新增、管理促銷活動 |
| 4 | 活動 — 新增/編輯設定頁 | 滿額/滿件優惠 → [新增活動] / [編輯] | 設定活動類型、規則條件與期間 |
| 5 | 自動化行銷旅程 — 旅程總覽頁 | 行銷活動 → 自動化行銷 | 一眼掌握所有旅程狀態與效果，快速開關 |
| 6 | 旅程設定 — 購物車未結帳挽回 | 自動化行銷 → [設定] 購物車挽回 | 設定觸發條件、冷卻期、優惠券與訊息內容 |
| 7 | 旅程設定 — 沉睡/流失客喚醒 | 自動化行銷 → [設定] 沉睡/流失喚醒 | 分別設定沉睡客和流失客的旅程條件 |
| 8 | 旅程設定 — 購後推薦 | 自動化行銷 → [設定] 購後推薦 | 設定推薦算法、等待時間、冷卻期 |
| 9 | 旅程設定 — 到期提醒 | 自動化行銷 → [設定] 到期提醒 | 設定點數和優惠券的到期提醒天數 |
| 10 | LINE OA 串接設定頁 | 行銷活動 → LINE OA 設定 | 輸入 LINE OA 憑證並驗證連線 |
| 11 | 推播記錄查詢頁 | 行銷活動 → 推播記錄 | 查詢各旅程的推播發送結果與轉換數據 |
| 12 | 前台：購物車優惠進度條 | 消費者購物車頁（前台元件） | 讓消費者看到距下一層優惠還差多少金額 |

---

## Part 3 — Per-Screen UX Spec

---

### Screen 1：優惠券管理 — 列表頁

**Purpose：** 商家查看所有優惠券、依狀態/類型篩選、新增券或停用/複製現有券。
**Entry points：** 側邊欄 → 行銷活動 → 優惠券管理
**Primary user goal：** 快速找到特定優惠券並執行操作（編輯、停用、複製）

#### Information Hierarchy

```
H1（最顯眼）: 優惠券管理
Tab Bar: 折扣代碼 ｜ 自動發放券
Primary CTA: 新增優惠券（右上角，#303133 按鈕）
Secondary: 搜尋框 ／ 狀態篩選 ／ 類型篩選
Main content: 優惠券 Table
```

#### Actual Copy

**Page / Section Headings**
- 頁面標題：`優惠券管理`
- Tab 1：`折扣代碼`
- Tab 2：`自動發放券`

**Button Labels**
- Primary：`新增優惠券`
- 操作：`編輯` ／ `停用` ／ `複製`
- 停用確認 Modal Primary：`確定停用`
- 停用確認 Modal Cancel：`取消`

**Search & Filter**
- 搜尋框 Placeholder：`搜尋券名稱或優惠券代碼…`
- 狀態篩選預設：`全部狀態`
- 狀態選項：`進行中` ／ `未開始` ／ `已到期` ／ `已停用`
- 類型篩選預設：`全部類型`
- 類型選項：`百分比折扣` ／ `固定金額折扣` ／ `免運`

**Empty State（無任何券）**
- Headline：`尚未建立任何優惠券`
- Subtext：`建立第一張優惠券，讓消費者在結帳時享受折扣或免運優惠。`
- CTA：`新增優惠券`

**Empty State（篩選後 0 結果）**
- Headline：`找不到符合條件的優惠券`
- Subtext：`嘗試調整搜尋關鍵字或篩選條件`
- CTA：`清除篩選`

**Status Labels**

| Status key | Display text | Colour semantic |
|---|---|---|
| active | 進行中 | Success（#67C23A）|
| pending | 未開始 | Neutral（#909399）|
| expired | 已到期 | Danger（#F56C6C）|
| disabled | 已停用 | Neutral（#DCDFE6 背景）|

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 停用成功 | `優惠券已停用` |
| 複製成功 | `已複製為新優惠券草稿，請確認後儲存` |

**停用確認 Modal**
- 標題：`確定停用此優惠券？`
- 說明：`停用後，消費者將無法繼續使用此優惠券。如需重新啟用，請編輯並修改有效期。`

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Tab Bar | 折扣代碼 / 自動發放券；Active tab 底線 #303133 | 切換 Tab 重新載入對應資料 |
| 搜尋框 | Placeholder 文字；寬 280px；即時搜尋 | 輸入後 300ms debounce，即時過濾列表 |
| 狀態篩選 Select | 單選；寬 140px | 選擇後重新過濾列表 |
| 類型篩選 Select | 單選；寬 140px | 選擇後重新過濾列表 |
| 新增優惠券 Button | Primary；右上角 | 導航至 Screen 2（新增模式）|
| 優惠券 Table | 8 欄位（見下方排序規格）| — |
| 狀態 Tag | Success / Neutral / Danger 變體 | 無互動（只顯示）|
| 操作按鈕組 | 文字連結樣式：編輯 ／ 停用 ／ 複製 | 各自觸發對應行為 |
| 停用確認 Modal | 標題 + 說明 + 取消/確定 | 點擊確定後執行停用，顯示 Toast |
| 空狀態元件 | 圖示 + Headline + Subtext + CTA | — |
| Skeleton Loader | 模擬 5 個 Table Row 的灰色佔位 | 資料載入期間顯示 |

**Table 欄位與排序規格（Rule 4）**

| 欄位 | 是否可排序 | 預設排序 | 排序方向 |
|---|---|---|---|
| 券名稱 / 代碼 | ❌ | — | — |
| 類型 | ❌ | — | — |
| 折扣內容 | ❌ | — | — |
| 有效期（結束日）| ✅ | **預設**（由近至遠）| 升冪（最快到期的在前）|
| 使用上限 / 已使用 | ✅ | — | 降冪（已使用量最高的在前）|
| 發放對象 | ❌ | — | — |
| 狀態 | ❌ | — | — |
| 操作 | ❌ | — | — |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 正常載入，有優惠券資料 | Table 顯示優惠券列表 |
| Empty | 該 Tab 無任何優惠券 | 空狀態元件（無任何券）|
| Filtered 0 results | 搜尋/篩選後無符合項目 | 空狀態元件（篩選後 0 結果）|
| Loading | 初次載入 / 切換 Tab | Skeleton Loader |
| Error | API 連線失敗 | 頁面中央顯示：「資料載入失敗，請重新整理頁面，或稍後再試。」＋「重新整理」Button |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「新增優惠券」| 導航至 Screen 2（新增模式）|
| 點擊「編輯」| 導航至 Screen 2（編輯模式，帶入現有資料）|
| 點擊「停用」| 彈出停用確認 Modal |
| 點擊「複製」| 即時複製並顯示 Toast；列表新增一筆「[原名稱]（複本）」草稿 |
| 點擊欄位標題（可排序）| 切換升冪/降冪，標題顯示 ↑ / ↓ 圖示 |
| 切換 Tab | 列表切換至對應分類資料，搜尋/篩選條件重置 |

---

### Screen 2：優惠券 — 新增/編輯設定頁

**Purpose：** 商家設定一張優惠券的所有條件（折扣類型、使用限制、發放設定）並儲存。
**Entry points：** Screen 1 → [新增優惠券] 或 [編輯]
**Primary user goal：** 完成所有必填欄位並儲存/啟用優惠券

> 📌 **Rule 1 適用：** 本頁有 3 個功能區塊（基本設定 / 使用條件 / 發放設定），使用 **Tab Bar** 呈現；Tab 有錯誤時，顯示紅色圓點指示錯誤所在的 Tab。

#### Information Hierarchy

```
H1: 新增優惠券 ／ 編輯優惠券：[券名稱]
麵包屑: 行銷活動 > 優惠券管理 > 新增優惠券
Tab Bar: 基本設定 ｜ 使用條件 ｜ 發放設定
Primary CTA: 儲存（右上角固定，跨 Tab 可見）
Secondary CTA: 取消
```

#### Actual Copy

**頁面標題**
- 新增模式：`新增優惠券`
- 編輯模式：`編輯優惠券：[券名稱]`

**Button Labels**
- Primary：`儲存`
- Secondary：`取消`
- 輔助：`自動生成代碼`（優惠券代碼欄位右側）

**Tab 1 — 基本設定 Form Fields**

| 欄位 label | Placeholder | Helper / Tooltip | Error text |
|---|---|---|---|
| 券名稱 | `輸入優惠券名稱，最多 50 字` | — | `券名稱為必填` |
| 優惠類型 | Radio：百分比折扣 ／ 固定金額折扣 ／ 免運 | — | `請選擇優惠類型` |
| 折扣數值（百分比）| `輸入 1–99 之間的整數` | — | `請輸入 1 到 99 之間的整數` |
| 折扣數值（固定金額）| `輸入折扣金額（NT$）` | — | `折扣金額最少 NT$1` |
| 最高折扣上限（百分比時顯示）| `選填，例：500` | ℹ️ 設定折扣金額的上限。例：設定 9 折且上限 NT$500，即使訂單達 NT$10,000，最多只折 NT$500，不會超過此金額 | — |
| 優惠券代碼 | `英數字 4–20 碼，或點擊右側自動生成` | — | `此代碼已被使用，請更換一個` ／ `代碼需為 4–20 位英數字` |

**Tab 2 — 使用條件 Form Fields**

| 欄位 label | Placeholder | Helper / Tooltip | Error text |
|---|---|---|---|
| 最低訂單金額 | `0（不限金額）` | ℹ️ 消費者的訂單金額需達到此金額才可使用此優惠券。填入 0 代表沒有最低消費限制 | — |
| 適用產品 / 分類 | Radio：全部產品 ／ 指定分類 ／ 指定產品 | — | — |
| 指定分類 / 產品選擇器 | `輸入分類或產品名稱搜尋…` | 此券僅適用於以下產品或分類（選「全部產品」時隱藏）| `請至少選擇一個產品或分類` |
| 排除產品 | `輸入產品名稱搜尋…` | 以下產品不適用此優惠券（即使符合上方條件）| — |
| 可否與其他優惠疊加 | Switch（預設 OFF）| ℹ️ 開啟後，消費者可同時使用此券與其他進行中的活動（如滿額折扣）。關閉（預設）時，此券不可與任何其他活動同時使用；結帳時系統會提示消費者 | — |

**Tab 3 — 發放設定 Form Fields**

| 欄位 label | Placeholder | Helper / Tooltip | Error text |
|---|---|---|---|
| 有效期 | 開始日期 ～ 結束日期 | — | `開始日期不可早於今天` ／ `結束日期必須晚於開始日期` |
| 發放方式 | Radio：手動輸入代碼 ／ 自動發放 | ℹ️ 手動：消費者在結帳時輸入代碼使用。自動：入會、生日、滿額等條件達成時，系統自動發放至會員帳戶 | `請選擇發放方式` |
| 全站使用次數上限 | `0（不限次數）` | ℹ️ 此優惠券在所有消費者合計最多可被使用幾次。填入 0 代表無上限 | `請填入 0 或正整數` |
| 每人使用次數上限 | `預設 1` | ℹ️ 同一位消費者最多可使用幾次。填入 1 代表每人限用一次，不可重複使用 | `最少設定 1 次` |
| 發放對象（自動發放時顯示）| Select：全體會員 ／ 指定等級 ／ 指定分眾標籤 | — | `請選擇發放對象` |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存成功 | `優惠券已儲存` |
| 儲存失敗（網路/系統）| `儲存失敗，請重新嘗試。若問題持續，請聯繫客服。` |
| 代碼重複（即時驗證）| `此優惠券代碼已被使用，請更換一個` |
| 離開未儲存確認 | `尚有未儲存的變更，確定要離開嗎？` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Tab Bar（頁內）| 3 tabs：基本設定 / 使用條件 / 發放設定；Tab 有驗證錯誤時顯示紅色圓點 | 點擊切換 Tab；跨 Tab 的錯誤在提交時統一顯示 |
| 文字輸入框 | 標準 el-input；有 label + helper + error 三層 | focus 顯示藍框；error 顯示紅框 + 錯誤訊息 |
| Radio Group | 橫排；互斥選擇 | 選取後相關欄位顯示/隱藏（條件渲染）|
| 數字輸入框 | el-input-number；有最小/最大值限制 | 直接輸入或 +/- 按鈕 |
| 「自動生成代碼」Button | Ghost 樣式；位於代碼輸入框右側 | 點擊後填入 8 碼隨機英數組合並即時驗證唯一性 |
| 日期區間選擇器 | daterange picker；禁選今天以前的日期 | 點開 Calendar 選擇 |
| Switch 開關 | ON（#303133）/ OFF（#DCDFE6）+ label | 點擊切換；觸發相關欄位顯示/隱藏 |
| 產品搜尋選擇器 | 遠端搜尋 multi-select；輸入後 300ms debounce | 輸入關鍵字即時搜尋產品，可複選 |
| 儲存 Button | Primary；固定在右上角 / 頁面底部 footer | 點擊觸發所有 Tab 的驗證；有錯誤跳至第一個錯誤 Tab |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| New（空白）| 點擊「新增優惠券」| 所有欄位空白，預設值已填入（每人次數上限=1、不可疊加=OFF）|
| Edit | 點擊「編輯」| 帶入現有優惠券資料；「已到期」或「已停用」的券可編輯但儲存時需重新設定有效期 |
| Validation Error | 點擊「儲存」時有必填欄位未填 | 各欄位顯示紅色錯誤訊息；Tab 顯示紅色圓點；頁面不跳轉 |
| Saving | 點擊「儲存」後等待 API 回應 | 儲存 Button 顯示 Loading 狀態；其他欄位 disabled |
| Success | API 回應 200 | Toast 顯示「優惠券已儲存」；跳回 Screen 1 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 選擇「免運」優惠類型 | 折扣數值欄位隱藏；最高折扣上限欄位隱藏 |
| 選擇「百分比折扣」| 折扣數值欄位顯示（1-99）；最高折扣上限欄位顯示 |
| 選擇「自動發放」| 發放對象欄位顯示 |
| 選擇「指定分類/產品」| 產品/分類搜尋選擇器顯示 |
| 切換「可否與其他優惠疊加」| 僅改變 Switch 狀態，無其他欄位變化 |
| 點擊「取消」| 彈出離開確認 Modal（若有修改）；無修改則直接返回 Screen 1 |

---

### Screen 3：滿額/滿件優惠 — 活動列表頁

**Purpose：** 商家查看所有類型的促銷活動，依類型分頁管理，支援新增/編輯/停用/複製。
**Entry points：** 側邊欄 → 行銷活動 → 滿額/滿件優惠
**Primary user goal：** 快速找到特定活動類型並執行操作

> 📌 **Rule 1 適用：** 共 5 個活動分類，使用 **Tab Bar**（贈品活動 / 免運活動 / 折扣活動 / 加購活動 / 組合優惠）。加購活動和組合優惠 Tab 標注「進階」Badge。

#### Information Hierarchy

```
H1: 滿額/滿件優惠
Tab Bar: 贈品活動 ｜ 免運活動 ｜ 折扣活動 ｜ 加購活動（進階）｜ 組合優惠（進階）
Primary CTA: 新增活動
Filter: 活動狀態篩選
Main content: 活動 Table
```

#### Actual Copy

**Page / Section Headings**
- 頁面標題：`滿額/滿件優惠`
- Tabs：`贈品活動` ／ `免運活動` ／ `折扣活動` ／ `加購活動` ／ `組合優惠`
- 進階功能 Badge：`進階電商包`

**Buttons**
- Primary：`新增活動`
- 操作：`編輯` ／ `停用` ／ `複製`

**Filter**
- 狀態篩選預設：`全部狀態`
- 狀態選項：`進行中` ／ `未開始` ／ `已結束` ／ `已停用`

**Empty State（無活動）**
- Headline：`此分類尚無任何活動`
- Subtext：`新增第一個活動，消費者達到設定條件後將自動享有優惠。`
- CTA：`新增活動`

**Empty State（篩選後 0 結果）**
- Headline：`找不到符合條件的活動`
- Subtext：`嘗試調整篩選條件`
- CTA：`清除篩選`

**進階功能鎖定提示（電商啟航方案用戶）**
- Toast/Banner：`此功能需升級至進階電商包才能使用`
- 「加購活動」和「組合優惠」Tab 點擊後顯示 Banner，按鈕 disabled

**Status Labels**

| Status key | Display text | Colour semantic |
|---|---|---|
| active | 進行中 | Success |
| pending | 未開始 | Neutral |
| ended | 已結束 | Neutral（淡）|
| disabled | 已停用 | Neutral |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 停用成功 | `活動已停用` |
| 複製成功 | `已複製為新活動草稿，請確認後儲存` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Tab Bar | 5 tabs；進階 Tab 有「進階電商包」小 Badge | 切換 Tab 載入對應活動列表 |
| 狀態篩選 Select | 單選；寬 140px | 選擇後過濾列表 |
| 新增活動 Button | Primary | 導航至 Screen 4（新增模式，帶入當前 Tab 的活動類型）|
| 活動 Table | 6 欄位（見排序規格）| — |
| 進階功能鎖定 Banner | Info 樣式（#409EFF）；僅進階 Tab 顯示 | 含「了解升級方案」連結 |

**Table 欄位與排序規格（Rule 4）**

| 欄位 | 是否可排序 | 預設排序 | 排序方向 |
|---|---|---|---|
| 活動名稱 | ❌ | — | — |
| 活動期間（結束日）| ✅ | **預設**（由近至遠）| 升冪（最快結束的在前）|
| 活動條件摘要 | ❌ | — | — |
| 適用範圍 | ❌ | — | — |
| 狀態 | ❌ | — | — |
| 操作 | ❌ | — | — |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 正常載入，有活動資料 | Table 顯示活動列表 |
| Empty | 此 Tab 無任何活動 | 空狀態元件 |
| Filtered 0 results | 篩選後無符合項目 | 空狀態元件（篩選後版本）|
| Loading | 切換 Tab / 初次載入 | Skeleton Loader |
| Locked（進階）| 電商啟航方案用戶點擊進階 Tab | Banner 顯示，Table 空白，按鈕 disabled |
| Error | API 失敗 | 錯誤訊息 + 重新整理 Button |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「新增活動」| 導航至 Screen 4（帶入當前 Tab 的活動類型預設）|
| 點擊進階 Tab（無進階方案）| 顯示鎖定 Banner，無法新增活動 |
| 點擊欄位標題（可排序）| 切換排序方向 |

---

### Screen 4：活動 — 新增/編輯設定頁

**Purpose：** 商家設定一個促銷活動的所有條件並儲存。
**Entry points：** Screen 3 → [新增活動] 或 [編輯]
**Primary user goal：** 完成活動基本資訊與規則設定，儲存並可啟用

> 📌 **Rule 1 適用：** 本頁有 2 個主要功能區塊（基本設定 / 活動規則），使用 **Tab Bar**。活動類型在 Screen 3 選擇後帶入，在本頁以唯讀 Badge 顯示。

#### Information Hierarchy

```
H1: 新增[贈品活動] ／ 編輯活動：[活動名稱]
活動類型 Badge: [贈品活動] / [免運活動] / [折扣活動] / [加購活動] / [組合優惠]
Tab Bar: 基本設定 ｜ 活動規則
Primary CTA: 儲存
Secondary CTA: 取消
```

#### Actual Copy

**頁面標題**
- 新增：`新增[活動類型]`（例：`新增贈品活動`）
- 編輯：`編輯活動：[活動名稱]`

**Tab 1 — 基本設定 Form Fields（所有活動類型共用）**

| 欄位 label | Placeholder | Helper / Tooltip | Error text |
|---|---|---|---|
| 活動名稱 | `輸入活動名稱，最多 50 字` | — | `活動名稱為必填` |
| 活動期間 | 開始時間 ～ 結束時間 | — | `請設定活動的開始與結束時間` |
| 適用會員等級 | Checkbox（可複選）；預設全選 | 不勾選代表對全體會員開放 | — |
| 適用產品範圍 | Radio：全部產品 ／ 指定分類 ／ 指定產品 | — | — |
| 產品/分類選擇器 | `輸入產品或分類名稱搜尋…` | （選「指定」後顯示）| `請至少選擇一個產品或分類` |
| 活動說明（前台顯示）| `最多 100 字，顯示於消費者購物車旁的說明文字` | — | — |
| 是否啟用 | Switch（預設 OFF）| ℹ️ 關閉時活動儲存但不生效。開啟後，活動會在設定的期間內自動套用至符合條件的訂單 | — |

**Tab 2 — 活動規則（依活動類型顯示不同欄位）**

**贈品活動規則：**

| 欄位 label | Placeholder | Helper / Tooltip | Error text |
|---|---|---|---|
| 條件類型 | Radio：訂單滿 NT$X 送贈品 ／ 購買滿 N 件送贈品 | — | `請選擇觸發條件類型` |
| 條件數值 | `輸入金額或件數` | — | `請填入大於 0 的數字` |
| 贈品產品 | `搜尋產品名稱…` | 請確保所選產品有足夠庫存 | `請選擇贈品產品` |
| 贈品數量 | `1` | — | `贈品數量最少 1 個` |
| 贈品庫存不足時 | Radio：自動暫停發放贈品（推薦）／ 繼續活動但不附贈品 | ℹ️ 選擇「自動暫停」：當贈品產品庫存歸零，本活動暫停發放贈品，訂單可正常結帳；庫存補齊後自動恢復 | `請選擇庫存不足的處理方式` |

**限時折扣規則（進階電商包）：**

| 欄位 label | Placeholder | Helper / Tooltip | Error text |
|---|---|---|---|
| 折扣類型 | Radio：百分比折扣 ／ 固定金額折扣 | — | `請選擇折扣類型` |
| 折扣數值 | `輸入折扣數值` | — | `請填入有效的折扣數值` |
| 前台倒數計時顯示 | Switch（預設 OFF）| ℹ️ 開啟後，產品頁面在活動期間顯示距活動結束的倒數計時（格式：HH:MM:SS），可提升消費者的購買緊迫感 | — |
| 顯示原價劃除 | Switch（預設 OFF）| ℹ️ 開啟後，產品頁的折扣價旁會以劃除樣式顯示原始售價（例：~~NT$1,000~~ **NT$800**）| — |

**組合優惠（紅配綠）規則（進階電商包）：**

| 欄位 label | Placeholder | Helper / Tooltip | Error text |
|---|---|---|---|
| A 組產品（紅組）| `搜尋分類或產品…` | 例：上衣系列。消費者需從 A 組選購至少 1 件 | `請設定 A 組產品` |
| B 組產品（綠組）| `搜尋分類或產品…` | 例：褲子系列。消費者需從 B 組選購至少 1 件 | `請設定 B 組產品` |
| 優惠條件 | Radio：A+B 各一件享百分比折扣 ／ A+B 各一件享固定金額折扣 | — | `請選擇優惠條件類型` |
| 優惠數值 | `輸入折扣數值` | — | `請填入有效的折扣數值` |

> ⚠️ **PRD 待補：** 免運活動、滿額折扣（多階梯）、滿件折扣、滿額加購、產品加價購、產品組合價的活動規則欄位在 PRD 中僅以功能說明描述，尚無詳細 UI 欄位規格。以下為依 UX 慣例的佔位設計，正式開發前請 PM 補充：
>
> - **免運活動：** 條件金額（滿 NT$X 免運）；適用運送方式選擇
> - **滿額折扣（多階梯）：** 動態新增組合「滿 NT$X 折 Y%／折 NT$Z」的階梯列表（可新增最多 5 階）
> - **滿件折扣：** 條件件數；適用產品範圍；折扣類型＋數值
> - **滿額加購 / 產品加價購 / 產品組合價：** 規格待 PM 補充

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存成功 | `活動已儲存` |
| 儲存並啟用成功 | `活動已儲存並啟用` |
| 儲存失敗 | `儲存失敗，請重新嘗試。若問題持續，請聯繫客服。` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Tab Bar（頁內）| 基本設定 / 活動規則；有錯誤顯示紅色圓點 | 點擊切換 Tab |
| 活動類型 Badge | 唯讀，對應 5 種活動類型；顏色各異 | 無互動 |
| 活動期間選擇器 | datetimerange picker（精確到分鐘）| — |
| 產品/分類搜尋選擇器 | 遠端搜尋，multi-select | 輸入後 300ms debounce |
| Switch 開關 | 參考 Screen 2 | — |
| 數字輸入框 | 有最小值限制 | — |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| New | 從 Screen 3 點擊新增 | 帶入活動類型；基本設定欄位空白，預設值填入 |
| Edit | 從 Screen 3 點擊編輯 | 帶入所有現有資料 |
| Validation Error | 提交時有必填欄位未填 | Tab 紅色圓點；欄位顯示錯誤訊息 |
| Saving | 等待 API | 按鈕 Loading 狀態 |
| Success | API 200 | Toast + 跳回 Screen 3 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 選擇條件類型 Radio | 條件數值 label 動態更新（「滿 NT$___」或「滿 ___件」）|
| 啟用「是否啟用」Switch | 儲存後活動立即生效（在活動期間內）|
| 點擊「取消」| 彈出離開確認 Modal（若有修改）|

---

### Screen 5：自動化行銷旅程 — 旅程總覽頁

**Purpose：** 商家一眼掌握全部 5 條自動化旅程的啟用狀態與本月數據，快速開關旅程。
**Entry points：** 側邊欄 → 行銷活動 → 自動化行銷
**Primary user goal：** 查看旅程效果並快速啟用/停用

#### Information Hierarchy

```
H1: 自動化行銷旅程
副標: 設定一次，系統自動在對的時機觸發行銷訊息
H2（各卡片）: 旅程名稱
卡片資訊: 說明摘要 ／ 本月觸發次數 ／ 轉換率
卡片操作: [啟用開關]  [前往設定]
```

#### Actual Copy

**頁面標題**
- `自動化行銷旅程`
- 副標：`設定觸發條件，系統自動在正確時機發送個人化訊息，無需手動操作`

**旅程卡片文案（5 張）**

| 旅程 | 卡片標題 | 卡片說明 |
|---|---|---|
| 購物車挽回 | `購物車未結帳挽回` | `消費者加入產品後一段時間未結帳，自動發送挽回訊息，可附上專屬折扣碼` |
| 沉睡客喚醒 | `沉睡客喚醒` | `90 天未購買的會員，自動觸發喚醒 Email 或 LINE，帶專屬優惠回來消費` |
| 流失客挽留 | `流失客挽留` | `超過 180 天未購買的高價值會員，觸發更強力的挽留優惠方案` |
| 購後推薦 | `購後推薦再行銷` | `訂單完成後數天，依購買產品推薦相關產品，帶動二次購買` |
| 到期提醒 | `點數 / 優惠券到期提醒` | `點數或優惠券即將到期，主動提醒消費者趁期限前使用` |

**卡片數據標籤**
- `本月觸發：{N} 次`
- `轉換率：{X}%`
- `上次觸發：{YYYY/MM/DD}`

**旅程狀態 Badge**
- 啟用中（綠）
- 已停用（灰）
- 未完成設定（橘色 Warning Badge）

**進階電商包鎖定提示（電商啟航方案用戶）**
- 全部 5 張卡片顯示鎖定遮罩
- 遮罩文字：`此功能需升級至進階電商包才能使用`
- 遮罩內 CTA：`了解升級方案`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 開啟旅程（未完成設定）| `請先完成旅程設定，再啟用此旅程` |
| 開啟旅程（設定完整）| `旅程已啟用，系統將依設定條件自動觸發` |
| 關閉旅程 | `旅程已停用` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 旅程卡片 | 白色容器；寬 100%；含標題/說明/數據/開關/按鈕；進階電商包版有鎖定遮罩 | 點擊卡片主體不跳轉（避免誤觸）|
| 啟用 Switch | ON（#67C23A）/ OFF（#DCDFE6）；位於卡片右上角 | 點擊立即切換（確認 API 後更新）；未設定時彈出提示 Toast |
| 「前往設定」Button | Secondary；位於卡片右下角 | 導航至對應旅程設定頁（Screen 6–9）|
| 旅程狀態 Badge | 啟用中 / 已停用 / 未完成設定（含 warning icon）| 無互動 |
| 數據標籤 | 灰色小字；3 個數據項目 | 無互動；Skeleton 載入中 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 正常載入 | 5 張旅程卡片；各自顯示啟用狀態和本月數據 |
| Loading | 初次載入 | 卡片骨架（Skeleton Loader）|
| Locked | 電商啟航方案用戶 | 全部卡片顯示鎖定遮罩 |
| 部分未設定 | 有旅程啟用 Switch 被點擊但設定不完整 | Toast 提示；Switch 恢復 OFF |
| Error | API 失敗 | 錯誤訊息 Banner |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「前往設定」| 導航至對應旅程設定頁 |
| 開啟啟用 Switch（設定完整）| Switch 切換為 ON；Badge 更新為「啟用中」|
| 開啟啟用 Switch（設定不完整）| Toast 提示；Switch 保持 OFF |
| 關閉啟用 Switch | 彈出確認：「確定停用此旅程？停用後旅程不再自動觸發，已排入的訊息不受影響。」|

---

### Screen 6：旅程設定 — 購物車未結帳挽回

**Purpose：** 設定購物車挽回旅程的觸發條件、冷卻期、附加優惠券及訊息參數。
**Entry points：** Screen 5 → [前往設定] 購物車挽回
**Primary user goal：** 完整設定旅程條件並啟用

> 📌 **Rule 1 適用：** 本頁有 3 個功能區塊（觸發條件 / 訊息設定 / 旅程數據），使用 **Tab Bar**。

#### Information Hierarchy

```
H1: 購物車未結帳挽回 — 旅程設定
麵包屑: 行銷活動 > 自動化行銷 > 購物車未結帳挽回
Tab Bar: 觸發條件 ｜ 訊息設定 ｜ 旅程數據
Primary CTA: 儲存設定（跨 Tab 固定）
旅程啟用 Switch: 右上角
```

#### Actual Copy

**Tab 1 — 觸發條件 Form Fields**

| 欄位 label | Placeholder / 預設值 | Helper / Tooltip | Error text |
|---|---|---|---|
| 旅程啟用 | Switch（預設 OFF）| ℹ️ 開啟後，系統依以下設定自動偵測符合條件的購物車並發送挽回訊息 | — |
| 觸發等待時間 | `1` 小時（可選：分鐘 / 小時）| ℹ️ 消費者將產品加入購物車後，等待多久才發送挽回訊息。計時從最後一次修改購物車時起算。最短 30 分鐘，最長 24 小時 | `最短 30 分鐘，最長 24 小時` |
| 冷卻期 | `7` 天 | ℹ️ 同一位消費者在此天數內即使再次加入購物車，也不會重複收到挽回訊息，避免造成打擾。預設 7 天 | `最短 1 天，最長 90 天` |
| 最低購物車金額 | `0`（不限）| ℹ️ 購物車總金額低於此金額的消費者不觸發挽回旅程。填入 0 代表不限制金額 | — |
| 是否附上優惠券 | Switch（預設 OFF）| ℹ️ 開啟後，挽回訊息中會附上一張專屬優惠碼，吸引消費者回來結帳 | — |
| 附上的優惠券 | Select（搜尋現有優惠券）| 建議選擇「每人限用 1 次」的折扣代碼券，以確保每人只使用一次 | `請選擇一張優惠券` |

**Tab 2 — 訊息設定 Form Fields**

| 欄位 label | Placeholder / 預設值 | Helper / Tooltip | Error text |
|---|---|---|---|
| Email 主旨 | `🛒 您有產品等待帶走！` | 可插入變數：`{會員姓名}`、`{購物車產品數}`、`{購物車金額}` | — |
| 問候段落 | `Hi {會員姓名}，您的購物車還有 {購物車產品數} 件產品正在等您！` | — | — |
| 同時發送 LINE 推播 | Switch（預設 OFF）| ℹ️ 開啟後，已綁定 LINE 的消費者同時收到 LINE 卡片訊息。需先至「LINE OA 設定」完成連線 | — |

**LINE OA 未設定提示（Switch 開啟但 LINE OA 未連線）**
- Warning Banner：`LINE OA 尚未完成連線設定，無法發送 LINE 推播。` ＋ `前往 LINE OA 設定` 連結

**Tab 3 — 旅程數據（Read-only）**
- `本月觸發次數：{N} 次`
- `Email 發送成功率：{X}%`
- `LINE 推播點擊率：{X}%`（若 LINE 啟用）
- `最終轉換（完成結帳）：{N} 次（{X}%）`
- 「查看完整推播記錄」→ 連結至 Screen 11

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存成功 | `購物車挽回旅程設定已儲存` |
| 儲存成功且啟用 | `旅程設定已儲存並啟用，系統將依設定條件自動觸發` |
| 儲存失敗 | `儲存失敗，請重新嘗試。若問題持續，請聯繫客服。` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Tab Bar（頁內）| 觸發條件 / 訊息設定 / 旅程數據 | 點擊切換 Tab |
| 旅程啟用 Switch | 大尺寸；ON（#67C23A）/ OFF（#DCDFE6）| 點擊切換；聯動 Screen 5 的卡片狀態 |
| 時間單位 Select | 分鐘 / 小時 | 與數字輸入框搭配 |
| 優惠券搜尋 Select | 遠端搜尋現有折扣代碼券；僅在「附上優惠券」開啟後顯示 | 輸入後 300ms debounce |
| Email 主旨輸入框 | 支援插入變數 chip（點擊插入）| — |
| 問候段落 Textarea | 可插入變數 | — |
| LINE 未設定 Warning Banner | Warning 樣式（#E6A23C）；含連結 | 點擊連結跳至 Screen 10 |
| 數據面板 | 4 個數字指標；唯讀 | Skeleton 載入中 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| New（未設定）| 首次進入 | 所有欄位預設值；啟用 Switch OFF |
| Set（已設定）| 已儲存過設定 | 帶入現有設定值 |
| Active | 旅程已啟用 | 啟用 Switch ON；Tab 3 顯示累積數據 |
| LINE 未設定 | 開啟 LINE Switch 但 LINE OA 未連線 | Warning Banner 顯示 |
| Saving | 點擊儲存 | 按鈕 Loading |
| Error | API 失敗 | 錯誤 Toast |

#### Interaction Annotations

| User action | Result |
|---|---|
| 開啟「是否附上優惠券」Switch | 顯示優惠券搜尋 Select |
| 開啟「同時發送 LINE」Switch（LINE 未連線）| 顯示 Warning Banner；Switch 保持 ON（提醒去設定）|
| 點擊「前往 LINE OA 設定」| 導航至 Screen 10 |
| 點擊「查看完整推播記錄」| 導航至 Screen 11（預篩選：購物車挽回）|

---

### Screen 7：旅程設定 — 沉睡/流失客喚醒

**Purpose：** 分別設定沉睡客（90 天未購）和流失客（180 天未購）的自動喚醒旅程條件。
**Entry points：** Screen 5 → [前往設定] 沉睡喚醒 / 流失挽留
**Primary user goal：** 分別啟用兩條旅程並設定冷卻期與優惠券

> 📌 **Rule 1 適用：** 本頁有 2 條獨立旅程，使用 **Tab Bar**（沉睡客旅程 / 流失客旅程）。

#### Information Hierarchy

```
H1: 沉睡 / 流失客喚醒旅程設定
麵包屑: 行銷活動 > 自動化行銷 > 沉睡/流失客喚醒
Tab Bar: 沉睡客旅程（90天）｜ 流失客旅程（180天）
Primary CTA: 儲存設定
```

#### Actual Copy

**Tab 說明（位於 Tab Bar 下方）**
- 沉睡客 Tab 說明：`90–180 天未下訂的會員，系統每日自動偵測並觸發喚醒訊息`
- 流失客 Tab 說明：`超過 180 天未下訂的會員，系統每日自動偵測並觸發強力挽留訊息`

**Tab 1 — 沉睡客旅程 Form Fields**

| 欄位 label | Placeholder / 預設值 | Helper / Tooltip | Error text |
|---|---|---|---|
| 旅程啟用 | Switch（預設 OFF）| — | — |
| 每日發送時間 | `10:00` | ℹ️ 排程在每天此時間發送喚醒訊息。建議選擇上午 9:00–11:00 時段，避免深夜時段打擾消費者 | — |
| 冷卻期 | `30` 天 | ℹ️ 同一位沉睡客在此天數內只觸發一次喚醒訊息，避免重複打擾。預設 30 天 | `最短 1 天，最長 90 天` |
| 沉睡喚醒優惠券 | Select（選現有優惠券）| 選填。建議搭配 9 折或 NT$50 折扣，提高回購機率 | — |
| 同時發送 LINE 推播 | Switch（預設 OFF）| ℹ️ 同 Screen 6 的說明 | — |

**Tab 2 — 流失客旅程 Form Fields**

| 欄位 label | Placeholder / 預設值 | Helper / Tooltip | Error text |
|---|---|---|---|
| 旅程啟用 | Switch（預設 OFF）| — | — |
| 每日發送時間 | `10:00` | ℹ️ 同上 | — |
| 冷卻期 | `30` 天 | ℹ️ 同一位流失客在此天數內只觸發一次挽留訊息 | `最短 1 天，最長 90 天` |
| 流失挽留優惠券 | Select（選現有優惠券）| 選填。建議設定比沉睡客更強力的優惠（如 85 折或 NT$100 折扣） | — |
| RFM 連動篩選 | Switch（預設 OFF）| ℹ️ 開啟後，此旅程只針對「歷史上高消費（RFM 評分高）的流失客」觸發，避免對低價值流失客過度行銷浪費行銷預算。RFM 分群由數據中心每日自動計算 | — |
| 同時發送 LINE 推播 | Switch（預設 OFF）| ℹ️ 同 Screen 6 的說明 | — |

**Email 主旨（固定，後台不可修改）**
- 沉睡喚醒：`{會員姓名}，我們想念您！回來看看有什麼新品 🎁`
- 流失挽留：`{會員姓名}，我們為您保留了一份專屬優惠`

> ✏️ **Copy 待確認：** Email 主旨是否開放商家自訂（PRD 顯示為固定範本）。如開放，需在此頁面新增主旨輸入框。

**Toast**

| Trigger | Message |
|---|---|
| 儲存成功 | `沉睡/流失客旅程設定已儲存` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Tab Bar（頁內）| 沉睡客旅程 / 流失客旅程；各自有獨立啟用 Switch 狀態 | 點擊切換 Tab |
| 時間選擇器 | el-time-picker；24 小時制 | 點開選擇時間 |
| 優惠券 Select | 同 Screen 6 | — |
| RFM 連動 Switch | 僅流失客 Tab 顯示 | 開啟後顯示說明：「僅針對 RFM 評分中、高等級的流失客觸發」|

#### Screen States

同 Screen 6 模式（New / Set / Active / Saving / Error）

#### Interaction Annotations

| User action | Result |
|---|---|
| 切換 Tab | 兩條旅程設定各自獨立儲存；Tab 各有啟用 Switch 狀態顯示 |
| 開啟「RFM 連動」Switch | 顯示說明區塊：「此旅程將只觸發 {N} 位符合 RFM 高評分的流失客（數字來自數據中心）」|

---

### Screen 8：旅程設定 — 購後推薦

**Purpose：** 設定訂單完成後的產品推薦旅程，包含推薦算法選擇、等待天數、冷卻期。
**Entry points：** Screen 5 → [前往設定] 購後推薦
**Primary user goal：** 設定推薦條件並啟用自動推薦旅程

> 📌 **Rule 1 適用：** 本頁有 3 個功能區塊（觸發條件 / 推薦規則 / 旅程數據），使用 **Tab Bar**。

#### Information Hierarchy

```
H1: 購後推薦再行銷 — 旅程設定
麵包屑: 行銷活動 > 自動化行銷 > 購後推薦
Tab Bar: 觸發條件 ｜ 推薦規則 ｜ 旅程數據
Primary CTA: 儲存設定
```

#### Actual Copy

**Tab 1 — 觸發條件 Form Fields**

| 欄位 label | Placeholder / 預設值 | Helper / Tooltip | Error text |
|---|---|---|---|
| 旅程啟用 | Switch（預設 OFF）| — | — |
| 訂單完成後等待天數 | `3` 天 | ℹ️ 訂單狀態變為「已完成」後等待幾天才發送推薦訊息。可依產品特性調整：消耗品（保養品）建議 14–30 天，耐用品（3C）建議 3–7 天 | `最少 1 天，最多 60 天` |
| 冷卻期 | `14` 天 | ℹ️ 同一位會員在此天數內只觸發一次購後推薦，避免重複打擾 | `最少 1 天，最多 60 天` |
| 是否附上優惠券 | Switch（預設 OFF）| — | — |
| 附上的優惠券 | Select（搜尋現有優惠券）| 選填；附券可提升推薦產品的點擊率 | `請選擇一張優惠券` |
| 同時發送 LINE 推播 | Switch（預設 OFF）| ℹ️ 同 Screen 6 的說明 | — |

**Tab 2 — 推薦規則 Form Fields**

| 欄位 label | 說明 |
|---|---|
| 推薦產品來源 | Radio：自動算法 ／ 手動設定交叉銷售規則 |
| 自動算法說明（唯讀資訊卡）| ℹ️ 系統依以下優先序推薦：①產品後台手動設定的「常買產品」→ ②同分類近 30 天熱銷前 3 件 → ③全站近 30 天熱銷前 5 件。已購過或已售完/下架的產品不推薦 |

> ⚠️ **PRD 待補：** 選擇「手動設定交叉銷售規則」後的 UI——商家需為每個產品設定「購買此產品的人也常買哪些產品」的映射管理界面——在 PRD 中僅被提及，尚無詳細規格。以下為佔位設計：一個產品搜尋選擇器，選擇主產品後可設定 1–5 個推薦產品。正式開發前請 PM 補充此功能的完整規格。

**Tab 3 — 旅程數據（Read-only）**
同 Screen 6 Tab 3 格式，加入「含推薦產品連結點擊率」欄位。

**Toast**

| Trigger | Message |
|---|---|
| 儲存成功 | `購後推薦旅程設定已儲存` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Tab Bar（頁內）| 觸發條件 / 推薦規則 / 旅程數據 | — |
| 自動算法說明卡 | Info 樣式（淡藍背景）；3 步優先序說明 | 唯讀 |
| 推薦產品來源 Radio | 自動算法 / 手動設定 | 選「手動設定」後顯示 PRD 待補的交叉銷售管理區塊 |

#### Screen States

同 Screen 6 模式

#### Interaction Annotations

| User action | Result |
|---|---|
| 選「手動設定交叉銷售規則」| 顯示 PRD 待補的產品映射管理 UI（佔位）|
| 選「自動算法」| 顯示自動算法說明卡；隱藏手動設定區塊 |

---

### Screen 9：旅程設定 — 到期提醒

**Purpose：** 設定點數和優惠券的到期提醒天數，讓系統自動提醒消費者在期限前使用。
**Entry points：** Screen 5 → [前往設定] 到期提醒
**Primary user goal：** 分別啟用點數和優惠券的到期提醒，設定提醒提前天數

#### Information Hierarchy

```
H1: 點數 / 優惠券到期提醒 — 旅程設定
麵包屑: 行銷活動 > 自動化行銷 > 到期提醒
主要內容: 兩個設定區塊（點數到期提醒 ＋ 優惠券到期提醒）
Primary CTA: 儲存設定
```

#### Actual Copy

**Section 1 — 點數到期提醒**

| 欄位 label | Placeholder / 預設值 | Helper / Tooltip | Error text |
|---|---|---|---|
| 啟用點數到期提醒 | Switch（預設 OFF）| — | — |
| 提醒提前天數 | `30` 天（與會員管理點數設定同步）| ℹ️ 在點數到期前幾天，系統自動發送提醒訊息。此設定與「會員管理 → 點數設定」中的點數有效期連動，如需修改到期規則，請至會員管理模組 | — |
| 點數有效期（唯讀同步顯示）| 唯讀顯示：`點數有效期：{N} 天（由會員管理設定）` | — | — |
| 同時發送 LINE 推播 | Switch（預設 OFF）| ℹ️ 同 Screen 6 的說明 | — |

**Section 2 — 優惠券到期提醒**

| 欄位 label | Placeholder / 預設值 | Helper / Tooltip | Error text |
|---|---|---|---|
| 啟用優惠券到期提醒 | Switch（預設 OFF）| — | — |
| 提醒提前天數 | `7` 天 | ℹ️ 消費者帳戶中「尚未使用且即將到期」的優惠券，在到期前幾天自動發送提醒。每張券只通知一次 | `最少 1 天，最多 30 天` |
| 同時發送 LINE 推播 | Switch（預設 OFF）| ℹ️ 同 Screen 6 的說明 | — |

**Toast**

| Trigger | Message |
|---|---|
| 儲存成功 | `到期提醒旅程設定已儲存` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 設定區塊 Card | 白色容器；Section 1 和 Section 2 各一張；有分區標題和說明 | — |
| 點數有效期唯讀欄位 | Gray background；帶「前往點數設定」連結 | 點擊連結導航至會員管理 → 點數設定 |
| 所有 Switch | 同前 | 點擊切換；開啟後相關欄位顯示 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 正常載入 | 兩個 Section 各自顯示 Switch 狀態和提醒天數 |
| 點數設定未設定 | Part 6 未設定點數有效期 | 唯讀欄位顯示：`點數有效期：尚未設定，請先至會員管理設定` |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「前往點數設定」連結 | 導航至 Part 6 會員管理 → 點數設定頁 |
| 開啟點數到期提醒 Switch | 顯示提醒提前天數欄位和 LINE 推播 Switch |
| 開啟優惠券到期提醒 Switch | 顯示提醒提前天數欄位和 LINE 推播 Switch |

---

### Screen 10：LINE OA 串接設定頁

**Purpose：** 商家輸入 LINE Official Account 的 API 憑證，完成電商系統與 LINE OA 的連線。
**Entry points：** 側邊欄 → 行銷活動 → LINE OA 設定
**Primary user goal：** 輸入憑證、驗證連線成功

#### Information Hierarchy

```
H1: LINE OA 串接設定
連線狀態 Badge: 已連線（綠）/ 未設定（灰）/ 連線失敗（紅）
主要內容: 憑證輸入表單
Primary CTA: 驗證連線
Secondary CTA: 儲存設定
```

#### Actual Copy

**頁面標題**
- `LINE OA 串接設定`
- 副標：`完成設定後，系統即可透過您的 LINE 官方帳號自動推播行銷訊息給已綁定 LINE 的消費者`

**Form Fields**

| 欄位 label | Placeholder | Helper / Tooltip | Error text |
|---|---|---|---|
| LINE Channel ID | `請輸入 Channel ID（純數字）` | 在 LINE Developers Console 的「Messaging API」頁面找到 Channel ID | `Channel ID 為必填` |
| LINE Channel Secret | `請輸入 Channel Secret` | 儲存後以 ●●●●●●●● 顯示；點擊「重新設定」可清空並重新輸入 | `Channel Secret 為必填` |
| LINE Channel Access Token | `請輸入 Long-lived Channel Access Token` | 儲存後以 ●●●●●●●● 顯示；Access Token 需在 LINE Developers Console 手動生成 | `Channel Access Token 為必填` |

**Webhook URL（唯讀）**
- Label：`Webhook URL（請複製至 LINE Developers Console）`
- Value：`https://[your-domain]/api/webhooks/line`（附「複製」Button）
- Tooltip：ℹ️ 請將此 URL 設定至 LINE Developers Console → Messaging API → Webhook URL 欄位，並開啟「Use webhook」選項，系統才能接收消費者點擊 LINE 訊息後的回傳事件

**「重新設定」確認提示**
- `確定要重新設定 {Channel Secret / Access Token}？重新設定後，目前憑證將被清除，需重新輸入並驗證連線。`

**驗證成功 Alert**
- `LINE OA 連線成功！帳號名稱：{OA 名稱}，目前追蹤人數：{N} 人`

**驗證失敗 Alert**
- `連線失敗（錯誤碼：{code}）。請確認 Channel Access Token 是否正確，並確保 LINE 官方帳號已在 LINE Developers Console 啟用「Messaging API」功能。`

**常見錯誤碼說明**
- 401：`Token 無效或已過期，請至 LINE Developers Console 重新生成 Long-lived Access Token`
- 403：`帳號權限不足，請確認此 Channel Access Token 對應的 LINE OA 已啟用 Messaging API`

**Button Labels**
- `驗證連線`（Primary）
- `儲存設定`（Secondary；僅保存但不驗證）
- `重新設定`（文字連結；位於已遮蔽的密碼欄位旁）
- `複製`（Webhook URL 旁）

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 複製 Webhook URL 成功 | `已複製 Webhook URL` |
| 儲存成功 | `設定已儲存` |
| 驗證中 | `驗證連線中，請稍候…` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 連線狀態 Badge | 已連線（Success）/ 未設定（Neutral）/ 連線失敗（Danger）| 無互動；頁面頂部顯示 |
| 密碼輸入框 | type="password"；儲存後顯示 ●●●●●●●● + 「重新設定」連結 | 點擊「重新設定」→ 確認 Modal → 清空欄位 |
| Webhook URL 唯讀框 | disabled input + 「複製」Button | 點擊複製按鈕複製至剪貼簿 |
| 「驗證連線」Button | Primary | 呼叫 LINE API 驗證，顯示 Success / Error Alert |
| 驗證結果 Alert | Success（綠）/ Error（紅）| 顯示在 Button 下方 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 未設定 | 首次進入 | 所有輸入欄位空白；Webhook URL 顯示；連線狀態 Badge 顯示「未設定」|
| 已設定（未驗證）| 有儲存過但未驗證 | 密碼欄位顯示 ●●●●●●●●；Badge 顯示「未設定」（未驗證成功）|
| 驗證中 | 點擊「驗證連線」| Button Loading；表單 disabled；Toast「驗證連線中…」|
| 已連線 | 驗證成功 | Badge「已連線（綠）」；Success Alert 顯示帳號名稱和追蹤人數 |
| 連線失敗 | 驗證失敗 | Badge「連線失敗（紅）」；Error Alert 含錯誤碼說明 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「驗證連線」| 儲存憑證 + 呼叫 LINE API 驗證，顯示結果 Alert |
| 點擊「重新設定」| 彈出確認 Modal；確認後清空對應欄位 |
| 點擊「複製」（Webhook URL）| 複製至剪貼簿 + Toast 確認 |

---

### Screen 11：推播記錄查詢頁

**Purpose：** 商家查詢各自動化旅程的推播發送紀錄及轉換數據，評估行銷效果。
**Entry points：** 側邊欄 → 行銷活動 → 推播記錄；或從各旅程設定頁 Tab 3 的連結
**Primary user goal：** 依旅程類型和時間篩選，查看推播效果數據

#### Information Hierarchy

```
H1: 推播記錄
篩選工具列: 日期範圍 ／ 旅程類型 ／ 發送管道
Main content: 推播記錄 Table（預設按發送時間由新至舊）
```

#### Actual Copy

**Page Title**
- `推播記錄`

**Filter Labels**
- 日期範圍 Placeholder：`選擇日期範圍`
- 旅程類型 Placeholder：`全部旅程`
- 旅程選項：`購物車未結帳挽回` ／ `沉睡客喚醒` ／ `流失客挽留` ／ `購後推薦再行銷` ／ `點數到期提醒` ／ `優惠券到期提醒`
- 發送管道 Placeholder：`全部管道`
- 管道選項：`Email` ／ `LINE`

**Empty State（無記錄）**
- Headline：`尚無推播記錄`
- Subtext：`自動化行銷旅程啟用後，每次觸發的推播結果將記錄在此頁面`
- CTA：`前往設定旅程`

**Empty State（篩選後 0 結果）**
- Headline：`找不到符合條件的推播記錄`
- Subtext：`嘗試調整日期範圍或篩選條件`
- CTA：`清除篩選`

**Table 欄位名稱**
- `發送時間` ／ `旅程名稱` ／ `發送管道` ／ `發送對象` ／ `成功發送` ／ `失敗 / 退信` ／ `開信 / 點擊率` ／ `最終轉換（下單）`

**數據格式**
- 開信率（Email）：`{X}%`
- 點擊率（LINE）：`{X}%`
- 管道欄位：Email（藍 Badge）/ LINE（綠 Badge）
- 轉換欄位：`{N} 人（{X}%）`
- 失敗/退信欄位：若為 0 顯示 `—`

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 日期範圍選擇器 | daterange picker；最多查詢近 12 個月 | 選擇後重新載入資料 |
| 旅程類型 Select | 單選；含「全部旅程」選項 | 選擇後過濾列表 |
| 發送管道 Select | 單選；Email / LINE / 全部 | 選擇後過濾列表 |
| 推播記錄 Table | 8 欄位（見排序規格）| — |
| 旅程名稱 | 文字，非連結 | 無互動（點擊列不展開）|
| 管道 Badge | Email（藍）/ LINE（綠）| 無互動 |

**Table 欄位與排序規格（Rule 4）**

| 欄位 | 是否可排序 | 預設排序 | 排序方向 |
|---|---|---|---|
| 發送時間 | ✅ | **預設**（由新至舊）| 降冪 |
| 旅程名稱 | ❌ | — | — |
| 發送管道 | ❌ | — | — |
| 發送對象（人數）| ✅ | — | 降冪（由多至少）|
| 成功發送 | ✅ | — | 降冪 |
| 失敗 / 退信 | ✅ | — | 降冪 |
| 開信 / 點擊率 | ✅ | — | 降冪（由高至低）|
| 最終轉換 | ✅ | — | 降冪（由高至低）|

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 正常載入 | 顯示近 30 天的推播記錄，按發送時間由新至舊 |
| Empty | 無任何推播記錄 | 空狀態元件（無記錄版本）|
| Filtered 0 results | 篩選後無符合 | 空狀態元件（篩選後版本）|
| Loading | 初次載入 / 更改篩選 | Skeleton Loader（5 筆）|
| Error | API 失敗 | 錯誤訊息 + 重新整理 Button |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「前往設定旅程」（空狀態）| 導航至 Screen 5（旅程總覽頁）|
| 點擊排序欄位標題 | 切換升冪/降冪；顯示 ↑ / ↓ 圖示 |
| 更改篩選條件 | 重新載入 Table 資料（Skeleton 過渡）|

---

### Screen 12：前台 — 購物車優惠進度條

**Purpose：** 在消費者購物車頁面顯示距下一層優惠（免運/折扣/贈品）的差距，激勵加購。
**Entry points：** 消費者點擊「購物車」進入購物車頁面（前台）
**Primary user goal：** 消費者一眼知道再消費多少錢可以達到下一層優惠

> 📌 **假設：** 此元件固定顯示在購物車產品列表下方、結帳按鈕上方的區域，確保在手機首屏（375px）可見。

#### Information Hierarchy

```
H2: [優惠進度說明文字]
Progress Bar: [進度條]
Supporting text: [當前金額 / 目標金額 / 差距說明]
```

#### Actual Copy

**進度條文案（依狀態動態顯示）**

| 情境 | 主文案 | 進度條說明 |
|---|---|---|
| 距免運（未達到）| `再購 NT$ {差額} 即可免運！` | 進度條顯示當前佔免運門檻的百分比 |
| 已達免運 | `✅ 已達免運門檻` | 進度條滿格（綠色）|
| 距下一層折扣（未達到）| `再購 NT$ {差額} 享 {折扣說明}` | 例：`再購 NT$300 享 9 折優惠` |
| 已達折扣 | `✅ 已享 {折扣說明}` | 進度條滿格（綠色）|
| 距贈品（未達到）| `再購 NT$ {差額} 可獲贈 {贈品名稱}` | — |
| 已獲得贈品 | `✅ 已獲贈 {贈品名稱}` | — |
| 已達所有最高層優惠 | `您已享有所有目前活動的優惠 🎉` | 無進度條 |
| 購物車無任何進行中優惠 | （此元件不顯示）| — |

**已達到優惠的樣式規則**
- 顏色：`#67C23A`（Success 綠）
- Icon：✅ + 綠色文字

**未達到優惠的樣式規則**
- 顏色：`#409EFF`（藍）或主色系
- 進度條背景：`#DCDFE6`；進度條填充：`#303133`

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 優惠進度條容器 | 白色卡片；全寬；圓角 0（遵循 UI Guideline）| 無互動（純顯示）|
| Progress Bar | `<el-progress>`；高 8px；顯示進度百分比 | 購物車金額變動時即時更新（re-render）|
| 優惠說明文字 | 14px Regular；颜色依達成狀態（綠/黑）| 無互動 |
| 已達成優惠 Badge | ✅ + 綠色文字；帶 fadeIn 動畫（達成瞬間）| 無互動 |

**顯示優先序（若同時有多個進行中優惠）**
1. 免運進度（最高優先）
2. 滿額折扣進度
3. 贈品活動進度

每次只顯示「下一個未達到的優惠」的進度條，避免畫面過長。

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 有進行中優惠 | 商家設有符合產品的活動 | 顯示最近一個未達到優惠的進度條 |
| 已達所有優惠 | 購物車金額超過所有活動門檻 | 顯示「您已享有所有優惠 🎉」|
| 無進行中優惠 | 無適用的滿額/免運活動 | 此元件不渲染（不佔空間）|
| 購物車為空 | 消費者未加入任何產品 | 此元件不渲染 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 加入產品至購物車 | 進度條即時更新百分比和差額文字（無頁面刷新）|
| 刪除購物車產品 | 進度條退回至較低百分比；若跌破優惠門檻，顯示提醒文字 |

---

## Part 4 — Cross-Screen Component Inventory

### Action Components

| 元件 | 變體 | 尺寸 | 狀態 |
|---|---|---|---|
| Button | Primary（#303133 背景）/ Secondary（白底黑框）/ Ghost（無框）/ Danger（#F56C6C）| Large / Medium / Small | Default / Hover / Active / Disabled / Loading |
| Switch | 啟用（#67C23A）/ 停用（#DCDFE6）/ 旅程啟用（大尺寸，#67C23A）| Standard / Large | ON / OFF / Disabled |
| Icon Button | 文字連結樣式（編輯/停用/複製）| Small | Default / Hover / Disabled |

### Display Components

| 元件 | 變體 | 資料欄位 | 狀態 |
|---|---|---|---|
| StatusTag | 進行中（Success）/ 未開始（Neutral）/ 已到期（Danger）/ 已停用（Neutral）/ 已結束（Neutral 淡）| 文字標籤 | — |
| JourneyCard | 啟用中 / 已停用 / 未完成設定 / 鎖定（進階）| 標題 / 說明 / 觸發次數 / 轉換率 / Switch / Button | Default / Hover / Locked |
| DataMetricGroup | 唯讀 | 數字指標組（4–5 個）| Loading（Skeleton）/ Filled |
| AlertBanner | Success（綠）/ Error（紅）/ Warning（橘）/ Info（藍）| Icon + 文字 + 可選連結 | — |
| ProgressBar | 前台購物車版 | 百分比 + 說明文字 | 未達成 / 達成（綠）|

### Input Components

| 元件 | 變體 | 狀態 |
|---|---|---|
| Text Input | 標準 / 密碼（type=password）/ 唯讀（disabled）/ With Copy Button | Default / Focus / Filled / Error / Disabled |
| Number Input | 含最小/最大值 + 單位 Select | Default / Focus / Error / Disabled |
| Textarea | 標準；含字數計數 | Default / Focus / Error |
| Select | 單選 / 多選 / 遠端搜尋（300ms debounce）| Default / Open / Selected / Disabled |
| Date Picker | daterange / datetimerange | Default / Open / Selected |
| Time Picker | 24 小時制 | Default / Open / Selected |
| Radio Group | 橫排 / 縱列 | Default / Selected / Disabled |
| Checkbox Group | 橫排 | Default / Checked / Disabled |

### Navigation Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Sidebar（行銷活動節點）| Expanded | 包含：優惠券管理 / 滿額優惠 / 自動化行銷 / LINE OA 設定 / 推播記錄 |
| Tab Bar（頁層）| 2–5 tabs；含 Error Dot 變體 | 後台頁內功能分區；Active tab 底線 #303133 |
| Breadcrumb | 2–4 層 | 固定於 Header 下方 |

### Feedback Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Toast | Success / Error / Warning / Info | 右上角彈出；3 秒自動消失；ARIA live region |
| Modal | 確認型（含說明 + 取消/確定）| Overlay + 白色容器；Esc 鍵關閉 |
| Empty State | 無資料版 / 篩選後 0 結果版 | 插圖 + Headline + Subtext + CTA Button |
| Loading Skeleton | Table Row 版 / Card 版 / 數據指標版 | 模擬最終內容的灰色佔位 |
| InfoCard | 說明卡（自動算法說明）| 淡藍背景（#F4F8FF）；ℹ️ icon + 說明文字 |
| Tooltip | ℹ️ icon 觸發；hover 顯示 | 最大寬 280px；自動定位避免溢出視窗 |

---

## Part 5 — Design System Token Reference

| Decision | Token / Value |
|---|---|
| Primary brand colour | `#303133` |
| Link / Focus colour | `#409EFF` |
| Success colour | `#67C23A` |
| Warning colour | `#E6A23C` |
| Danger colour | `#F56C6C` |
| Primary text | `#303133` |
| Secondary text | `#606266` |
| Placeholder text | `#909399` |
| Border / Divider | `#DCDFE6` |
| Page background | `#F5F7FA` |
| Card / Container background | `#FFFFFF` |
| Base font | `Noto Sans TC（400 / 500 / 600 / 700）` |
| H1 font size | `20px Bold` |
| H2 font size | `16px Bold` |
| Body font size | `14px Regular` |
| Border radius | `0px`（設計系統無圓角）|
| Spacing unit | `8px` 網格（邊距為 8px 的倍數）|
| Content padding | `24px`（Main Content 內邊距）|

---

## PRD 待補清單

以下功能在 PRD 中僅被提及，尚無詳細規格，正式開發前請 PM 補充：

| # | 功能名稱 | 出現在哪個 Screen | 缺少什麼 |
|---|---|---|---|
| 1 | 免運活動詳細欄位規格 | Screen 4 | 活動規則 Tab 的完整欄位（門檻金額、適用運送方式選擇）|
| 2 | 滿額折扣（多階梯）欄位規格 | Screen 4 | 多階梯新增/刪除 UI 規格 |
| 3 | 滿件折扣欄位規格 | Screen 4 | 件數條件、適用產品範圍、折扣欄位 |
| 4 | 滿額加購欄位規格 | Screen 4 | 完整欄位規格（進階電商包）|
| 5 | 產品加價購欄位規格 | Screen 4 | 完整欄位規格（進階電商包）|
| 6 | 產品組合價欄位規格 | Screen 4 | 完整欄位規格（進階電商包）|
| 7 | 手動交叉銷售規則管理 UI | Screen 8 | 產品→推薦產品映射管理界面 |
| 8 | Email 主旨/訊息模板是否開放商家自訂 | Screen 7 | 沉睡/流失客旅程的 Email 主旨是否可修改 |

---

## Assumptions

> 📌 **假設 1：** 行銷活動 Sidebar 的 5 個主導航入口（優惠券管理 / 滿額/滿件優惠 / 自動化行銷 / LINE OA 設定 / 推播記錄）均獨立呈現，點擊即導航至對應列表頁。

> 📌 **假設 2：** 優惠券新增/編輯頁（Screen 2）採用獨立頁面而非 Dialog，理由是 3-Tab 的設定內容在 Dialog 中空間不足。

> 📌 **假設 3：** 進階電商包功能（加購活動 / 組合優惠 / 自動化旅程）對電商啟航方案用戶「可見但鎖定」，不完全隱藏，以展示進階方案差異化。

> 📌 **假設 4：** 所有 5 條自動化旅程均屬「進階電商包」專屬，電商啟航方案用戶進入自動化行銷頁面後看到鎖定狀態。

> 📌 **假設 5：** 自動化旅程設定頁的「旅程數據」Tab（Screen 6–8）顯示的是全期累計數據，搭配「查看完整推播記錄」連結至 Screen 11 進行詳細篩選。

> 📌 **假設 6：** LINE OA 是否已連線的狀態顯示在 LINE OA 設定頁的頂部 Badge，並同步顯示於各旅程設定頁的「同時發送 LINE 推播」Switch 說明中。

> 📌 **假設 7：** 購物車優惠進度條（Screen 12）屬於前台元件，此 UX Spec 提供設計規格；實際渲染由前台購物車頁面工程師實作，不在後台行銷活動模組範圍內。

> ✏️ **Copy 待確認 1：** 自動化旅程的 Email 主旨（沉睡/流失客）是否開放商家自訂修改，或固定為系統預設範本（PRD §6.3.2C 顯示為固定）。

> ✏️ **Copy 待確認 2：** 購後推薦的 Email 主旨「您可能也需要這些 🛍️」是否開放商家修改，以符合品牌語調。

> ✏️ **Copy 待確認 3：** LINE OA 未連線時，各旅程設定頁的「同時發送 LINE 推播」Switch 是否應完全隱藏（vs. 顯示但附 Warning Banner）。PRD 未說明，建議顯示並附 Banner 以保持設定流程完整。
