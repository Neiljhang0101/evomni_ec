# Evomni 會員管理後台 — Design Brief + UX Spec

> **Version:** 1.1
> **Created:** 2026/05/05　｜　**Updated:** 2026/05/05
> **來源 PRD：** `Evomni_Part6_會員管理_PRD.md` v1.5 ＋ `Evomni_顧客與會員整合管理_PRD.md` v1.0
> **Prototype：** #6（共 9 個後台頁面）
> **Downstream tools:** figma-generate-design · design:design-system · design:design-handoff · design:accessibility-review · design:design-critique

---

## Part 1 — Design Brief

### Product Vision

Evomni 會員管理後台讓電商商家在單一介面同時掌管 CMS 形象站顧客與電商會員的完整資料。過去商家需要切換兩個系統才能了解一個人的完整旅程——從填寫詢問單到首次購買、到累積成高價值客；現在透過以 Email 為錨點的整合視圖，商家可以在 3 分鐘內找到任何一位顧客、看清他的消費軌跡、並直接採取行動（調整點數、加標籤、發優惠券、列黑名單）。會員等級與點數的自動化規則讓商家不需人工介入，系統每日排程自動升降等、到期提醒；進階分眾篩選器讓精準行銷不再依靠 Excel，多條件組合後一鍵接入行銷活動模組。

### Target User

**Primary：** 電商後台管理員（商家店長或行銷專員），每日需查看會員狀況、處理客服問題（點數補償、黑名單）、以及定期執行分眾行銷，對系統操作熟悉但不具備技術背景。

**Secondary：** 客服人員，主要使用顧客詳情頁查看訂單與備忘錄，偶爾調整點數。

### Design Goals

| # | Goal | How to test |
|---|---|---|
| 1 | 管理員可在 1 分鐘內透過關鍵字搜尋到特定顧客並開啟詳情頁 | 計時可用性測試，目標 < 60 秒 |
| 2 | 管理員不需查閱說明就能完成「手動調整點數」並確認預覽後送出 | 觀察操作路徑，是否需要說明文件 |
| 3 | 「顧客」與「會員」的身分差異對管理員一眼可辨 | 請受測者指出身分類型，答對率 > 95% |
| 4 | 分眾篩選器新增 3 個條件並預覽人數，整體操作 < 2 分鐘 | 計時測試，進階方案功能 |
| 5 | 加入黑名單操作有足夠的確認機制，避免誤操作 | 測試中製造誤觸情境，看系統是否攔截 |

### Design Principles

1. **Data Clarity（資料清晰）先於功能豐富** — 同一個人只顯示一筆記錄，身分 Tag 顏色一眼判斷，不讓管理員在重複資料中搜索。
2. **Destructive actions 三道防線** — 加黑名單、批次操作等不可逆行為必須有確認框 + 強制填寫原因，防呆機制不得省略。
3. **Progressive Disclosure（漸進揭露）** — 啟航方案看不到進階功能（分眾篩選、等級系統），介面不留灰色佔位，保持乾淨。
4. **操作結果即時回饋** — 任何寫入操作（儲存、調整點數、加標籤）必須有 Toast 確認，讓管理員清楚知道成功與否。

### Design System Reference

- **Figma Library：** Evomni Admin Design System（沿用產品中心 Prototype 已建立之 Token）
- **Component framework：** Element Plus 視覺語言（實作為純 React，不引入 Element Plus 函式庫）
- **Icon set：** Element Plus Icons（`<i class="el-icon-...">` 語意）
- **Font：** Noto Sans TC（400 / 500 / 600 / 700）

### Accessibility Requirements

- **Target WCAG level：** AA
- **Known constraints：**
  - 所有色彩組合需通過 4.5:1 對比比例
  - 表格、表單元件需支援鍵盤導覽（Tab 鍵可遍歷）
  - 狀態 Tag 不能僅靠顏色傳達語意，需搭配文字標籤
  - Toast 通知需可被 screen reader 讀取（ARIA live region）

### Hard Constraints

- ⚠️ 本模組為**後台管理介面**，不含任何消費者前台頁面（前台個人中心另見 Prototype #7）
- ⚠️ 不顯示 Evomni 方案名稱（「電商啟航方案」「進階電商包」）給消費者或後台非必要情境
- ⚠️ 黑名單操作不得支援批次（每次只能處理單一會員）
- ⚠️ Email 欄位為識別錨點，後台不允許修改（唯讀）

### Out of Scope

- 消費者前台個人中心（Prototype #7）
- 前台會員註冊/登入流程（Prototype #9 第三方登入）
- 貨到通知管理（已整合於 Prototype #2 產品中心）
- 會員保固/報修（Phase 2，規格待補）
- 全域設定 > 電商進階設定 > 會員驗證方式設定（簡訊 OTP 服務商設定，Prototype #1）

---

## Part 2 — Screen Index

| # | Screen 名稱 | Navigation 路徑 | Primary User Goal |
|---|---|---|---|
| 1 | 顧客管理（整合列表） | 側邊欄 → 顧客 → 顧客管理 | 搜尋/篩選並找到特定顧客或會員 |
| 2 | 顧客/會員詳情頁 | 顧客管理列表 → 點擊「查看」 | 查看完整資料、操作（點數/標籤/備註/黑名單） |
| 3 | 會員等級設定 | 側邊欄 → 會員管理 → 等級設定（進階方案） | 設定升降等規則與等級權益 |
| 4 | 點數設定 | 側邊欄 → 會員管理 → 點數設定 | 設定消費回饋、折抵比率、到期規則 |
| 5 | 分眾標籤管理 | 側邊欄 → 會員管理 → 標籤管理 | 查看系統自動標籤規則、建立/管理自定義標籤 |
| 6 | 分眾篩選器 | 側邊欄 → 會員管理 → 分眾篩選（進階方案） | 多條件組合篩選會員，接入行銷活動 |
| 7 | 黑名單管理 | 側邊欄 → 會員管理 → 黑名單管理 | 查看黑名單列表、解除黑名單 |
| 8 | 會員設定 | 側邊欄 → 會員管理 → 設定 | 啟用/停用整個會員功能、設定驗證機制（Email/人工）、選擇前台可編輯欄位、開關行為功能 |
| 9 | 通知信管理 | 側邊欄 → 會員管理 → 通知信管理 | 管理 9 種會員 Email 通知的開關與模板 |

---

## Part 3 — Per-Screen UX Spec

---

### Screen 1：顧客管理（整合列表）

**Purpose：** 整合顯示 CMS 顧客與電商會員，讓管理員透過搜尋/篩選快速定位目標聯絡人，並執行批次操作或匯出。
**Entry points：** 側邊欄「顧客」→「顧客管理」
**Primary user goal：** 找到特定顧客或會員並進入詳情頁

#### Information Hierarchy

```
H1 (most prominent): 顧客管理
H2 (secondary): 篩選列（關鍵字 / 標籤 / 狀態 / 身分類型 / 日期）
Primary CTA: 搜尋（黑色按鈕）
Secondary CTA: 匯出全部 / 匯入
Supporting info: 資料列表 Table（Email / 姓名 / 電話 / 身分 / 加入日期 / 最後登入 / 標籤）
```

#### Actual Copy

**Page / Section Headings**
- Page title: `顧客管理`
- Breadcrumb: `顧客 / 顧客管理`
- Info tooltip (右上角): `同一 Email 在 CMS 顧客與電商會員中只計算一筆，身分以電商會員為優先。`

**Button Labels**
- Primary action: `搜尋`
- Secondary actions: `匯出全部`、`匯入`
- Batch actions（勾選後顯示）: `加標籤`、`匯出已選`、`發送優惠券`（進階方案）、`取消選取`

**Form Fields — 篩選列**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 關鍵字 | 請輸入姓名、Email、電話或公司名稱 | — | — |
| 標籤 | 請選擇標籤（可多選） | — | — |
| 狀態 | 全部 | — | — |
| 身分類型 | 全部 | — | — |
| 加入日期（起） | 開始日期 | — | — |
| 加入日期（迄） | 結束日期 | — | — |

**篩選器 — 狀態選項：** 全部 / 正常 / 停用 / 黑名單
**篩選器 — 身分類型選項：** 全部 / 顧客 / 會員

**Empty State**
- Headline: `目前沒有任何顧客或會員`
- Subtext: `當消費者填寫 CMS 表單或在電商前台完成會員申請後，會自動出現在這裡。`
- CTA label: `（無 CTA，不含新增按鈕）`

**篩選後無結果 Empty State**
- Headline: `找不到符合條件的記錄`
- Subtext: `請確認關鍵字是否正確，或嘗試清除篩選條件。`
- CTA label: `清除篩選條件`

**Error States**

| Error condition | Message shown to user |
|---|---|
| API 連線失敗 | `無法載入顧客資料，請重新整理頁面。若問題持續發生，請聯繫技術支援。` |
| 匯出失敗 | `匯出失敗，請稍後再試。` |

**Loading State**
- Loading text: Skeleton loader（列表行顯示灰色區塊），無文字

**Status Labels — 身分 Tag**

| Status key | Display text | Colour semantic |
|---|---|---|
| 顧客 | 顧客 | Neutral（`#606266` 灰） |
| 會員 | 會員 | Info（`#409EFF` 藍） |

**Status Labels — 帳號狀態**

| Status key | Display text | Colour semantic |
|---|---|---|
| 正常 | 正常 | Success（綠） |
| 停用 | 停用 | Neutral（灰） |
| 黑名單 | 黑名單 | Danger（紅） |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 點擊「匯出全部」或「匯出已選」 | `報表產生中，完成後將寄送至您的信箱 📧` |
| 批次加標籤成功 | `已成功為 N 位顧客/會員套用標籤` |
| 匯入完成 | `成功匯入 N 筆顧客資料` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 搜尋輸入框 | width: 全寬；Placeholder: 如上 | 按下「搜尋」按鈕或 Enter 觸發查詢 |
| 標籤多選下拉 | `<el-select>` multiple，顯示已選數量 | 選擇後需點「搜尋」才觸發篩選 |
| 狀態下拉 | `<el-select>` single | 同上 |
| 身分類型下拉 | `<el-select>` single（全部 / 顧客 / 會員） | 同上 |
| 日期範圍選擇器 | `<el-date-picker>` type="daterange" | 選擇後需點「搜尋」 |
| 清除按鈕 | 白色 Ghost Button | 清空所有篩選條件，重新查詢 |
| 搜尋按鈕 | 黑色 Primary Button | 觸發 API 查詢 |
| 匯出全部按鈕 | 藍色 Button，右上角 | Toast「報表產生中」 |
| 匯入按鈕 | 白色 Button，右上角 | 開啟匯入 Dialog |
| Table 全選 Checkbox | 勾選後顯示批次操作工具列 | 選取當頁全部資料列 |
| 資料列 Checkbox | — | 選取單筆資料 |
| 身分 Tag | 圓角 Pill；顧客（灰）/ 會員（藍） | 僅顯示，無互動 |
| 「查看」操作連結 | `color: #409EFF` | 點擊 → 進入顧客詳情頁（Screen 2） |
| 標籤欄 | 最多顯示 2 個 Tag，超過顯示 `+N`；Hover 顯示全部 Tooltip | — |
| 批次操作工具列 | 勾選後滑出；含已選數量提示 | 加標籤 / 匯出已選 / 發優惠券（進階）/ 取消選取 |
| 分頁器 | 每頁 20 筆；顯示總筆數 | 切換頁碼觸發 API |
| Info 圖示 Tooltip | 右上角 `ℹ`；Hover 顯示說明文字 | Hover on desktop |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 正常載入，有資料 | 完整 Table 顯示，分頁器顯示總筆數 |
| Loading | 初次進入或觸發搜尋 | Table 列顯示 Skeleton，按鈕 Disabled |
| Empty（全空） | 商家尚無任何顧客/會員資料 | 中央 Empty State（如上 Copy） |
| Empty（篩選後） | 篩選條件無符合結果 | 列表區顯示「找不到符合條件的記錄」+ 清除篩選連結 |
| Batch select | 已勾選 1 筆以上 | 頂部出現批次操作工具列，顯示「已選 N 筆」 |
| Error | API 失敗 | 列表區替換為錯誤訊息 + 重新整理按鈕 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「查看」或點擊 Email 欄位 | 導向 Screen 2（顧客詳情頁） |
| 勾選任一 Checkbox | 出現批次操作工具列 |
| 點擊「加標籤」（批次） | 開啟標籤選擇 Dialog（下拉選擇現有標籤），確認後套用 |
| 點擊「發送優惠券」（批次，進階方案） | 跳轉至行銷活動模組優惠券發送介面，帶入已選會員 |
| 點擊「匯出全部/已選」 | 觸發非同步匯出，Toast 通知 |
| Hover 標籤欄的 `+N` | 顯示 Tooltip 完整標籤列表 |
| Table 欄位標題點擊（Email / 姓名 / 加入日期 / 最後登入） | 切換升序/降序排序 |

---

### Screen 2：顧客/會員詳情頁

**Purpose：** 查看單一顧客或會員的完整資料（基本資料、電商資訊、訂單歷程、CMS 互動歷程）並執行管理操作。
**Entry points：** Screen 1 列表的「查看」連結
**Primary user goal：** 了解這個人的完整背景，並執行操作（調整點數、加標籤、加黑名單、發邀請）

#### Information Hierarchy

```
H1 (most prominent): 顧客姓名 + 身分 Tag + 狀態 Tag
H2 (secondary): 電商會員 KPI 卡片列（累計消費 / 購買次數 / 平均客單價 / 最後購買日）
Primary CTA: 調整點數（進入 Drawer）
Secondary CTA: 發送優惠券 / 加入/移除黑名單 / 調整等級
Supporting info: 基本資料 / 訂單記錄 / 點數記錄 / CMS 互動歷程 / 標籤 / 備註
```

#### Actual Copy

**Page / Section Headings**
- 返回連結: `← 返回顧客管理`
- 基本資料區塊標題: `基本資料`
- 電商會員資訊區塊標題: `電商會員資訊`
- 訂單記錄區塊標題: `訂單記錄`
- CMS 互動歷程區塊標題: `CMS 互動歷程（N 筆表單提交記錄）`
- 標籤區塊標題: `標籤`
- 備註區塊標題: `內部備註（不對顧客/會員顯示）`
- 邀請區塊標題: `💡 此顧客尚未成為電商會員`
- 系統自動標籤說明: `系統自動標籤（唯讀）`
- 商家標籤說明: `商家自定義標籤（可編輯）`

**Button Labels**
- 返回: `← 返回顧客管理`
- 編輯基本資料: `編輯基本資料`
- 儲存基本資料: `儲存`
- 取消編輯: `取消`
- 調整點數: `調整點數`
- 發送優惠券: `發送優惠券`
- 加入黑名單: `加入黑名單`
- 移除黑名單: `解除黑名單`
- 調整等級（Human override）: `調整等級`
- 查看全部訂單: `查看全部訂單 →`
- 查看全部 CMS 歷程: `查看全部 →`
- 邀請加入會員: `寄送邀請加入會員信`
- 儲存備註: `儲存備註`
- 新增標籤: `+ 新增標籤`

**Form Fields — 基本資料編輯**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 姓名 | 請輸入姓名 | — | `姓名為必填欄位` |
| Email | — | 此欄位為識別錨點，如需修改請聯繫工程師 | — |
| 電話 | 請輸入電話號碼 | — | `請輸入有效的電話號碼` |
| 公司 | 請輸入公司名稱 | CMS 顧客欄位 | — |

**Form Fields — 調整點數 Drawer**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 調整類型 | — | — | — |
| 調整數量 | — | 最多一次調整 99,999 點 | `請輸入有效的點數數量（1–99,999）` |
| 調整原因 | 請填寫調整原因，例：客服補償、活動獎勵 | 最多 200 字 | `原因為必填欄位，請至少輸入 1 個字` |

**調整點數 — 預覽確認文字**
- `確定為會員 [姓名] [增加/扣除] [N] 點，調整後餘額為 [X] 點。`

**備註欄 Placeholder**
- `記錄內部備忘，例：此會員曾反映配送問題，已補償 100 點。`

**邀請加入會員 — 說明文字**
- `寄送邀請信，引導顧客在電商前台完成會員申請。`

**Empty State — 訂單記錄（無訂單）**
- Headline: `此會員尚無訂單記錄`
- Subtext: `完成首次購買後，訂單將自動出現在這裡。`
- CTA label: （無）

**Empty State — 點數記錄（無異動）**
- Headline: `尚無點數異動記錄`
- Subtext: `會員消費、手動調整或推薦回饋後，記錄將顯示於此。`
- CTA label: （無）

**Empty State — CMS 互動歷程（無表單記錄）**
- 此區塊整體隱藏（純電商前台註冊的會員不顯示此區塊）

**Error States**

| Error condition | Message shown to user |
|---|---|
| API 載入失敗 | `無法載入顧客資料，請重新整理頁面。` |
| 調整點數送出失敗 | `點數調整失敗，請稍後再試。如問題持續，請聯繫技術支援。` |
| 儲存基本資料失敗 | `儲存失敗，請確認欄位格式正確後再試。` |
| 邀請信寄送失敗 | `邀請信寄送失敗，請確認 Email 有效後再試。` |

**Loading State**
- 進入頁面時：各區塊顯示 Skeleton（頭像、KPI 卡片、Table 列）

**Status Labels — 帳號狀態**

| Status key | Display text | Colour semantic |
|---|---|---|
| 正常 | 正常 | Success（綠） |
| 停用 | 停用 | Neutral（灰） |
| 黑名單 | 黑名單 | Danger（紅） |

**Status Labels — 系統自動標籤**

| Status key | Display text | Colour |
|---|---|---|
| new_customer | 新客 | `#67C23A`（綠） |
| active | 活躍客 | `#409EFF`（藍） |
| high_value | 高價值客 | `#E6A23C`（金） |
| dormant | 沉睡客 | `#909399`（灰） |
| lost | 流失客 | `#F56C6C`（紅） |
| category_fan | 品類愛好者 | `#409EFF`（藍） |

**Status Labels — 訂單狀態 Tag**

| Status key | Display text | Colour semantic |
|---|---|---|
| completed | 已完成 | Success |
| cancelled | 已取消 | Neutral |
| refunded | 已退款 | Warning |
| pending | 待付款 | Warning |
| processing | 處理中 | Info |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存基本資料成功 | `資料已更新` |
| 調整點數成功（增加） | `已成功為 [姓名] 增加 N 點，目前餘額 X 點` |
| 調整點數成功（扣除） | `已成功扣除 [姓名] N 點，目前餘額 X 點` |
| 儲存備註成功 | `備註已儲存` |
| 邀請信寄送成功 | `邀請信已寄至 email@example.com` |
| 新增標籤成功 | `標籤已套用` |
| 移除標籤成功 | `標籤已移除` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 頁面標題列 | 姓名（H1 大字）+ 身分 Tag + 狀態 Tag + 操作按鈕組（右側） | — |
| 操作按鈕組 | 調整點數（Primary）/ 發優惠券 / 加入黑名單（Danger 輪廓）/ 調整等級 | 各對應下方互動 |
| 基本資料 Card | 欄位：姓名 / Email / 電話 / 公司 / 加入來源；右上角「編輯基本資料」 | 點擊「編輯」→ 欄位變為 Input |
| KPI 卡片列 | 4 欄（累計消費 / 購買次數 / 平均客單價 / 最後購買日）；僅會員顯示 | 唯讀 |
| 電商會員資訊 Card | 等級（進階顯示名稱）/ 點數餘額 / 累計消費 / 購買次數 / 最後購買日 / 帳號狀態 / 加入日期；唯讀 | 「查看明細 →」連結跳至點數記錄 Tab |
| 訂單記錄 Table | 欄位：訂單編號（連結）/ 日期 / 金額 / 狀態；顯示最近 5 筆 | 點訂單編號 → 跳至訂單詳情 |
| 「查看全部訂單 →」 連結 | 文字連結 `#409EFF` | 跳至訂單管理頁，帶入會員 ID 篩選 |
| CMS 互動歷程列表 | 欄位：時間 / 表單類型 / 內容摘要；顯示最近 5 筆；有記錄才顯示此區塊 | — |
| 標籤區塊 | 系統自動 Tag（唯讀）+ 自定義 Tag（可刪除，右側 ×）+ 「+ 新增標籤」 | 點 × 移除；點「+ 新增」開啟 Tag 選擇 Select |
| 備註 Textarea | 多行文字；底部顯示「最後更新：時間 by 管理員名」 | 點「儲存備註」送出 |
| 邀請加入會員 Banner | 背景 `#EFF2F7`；僅純顧客身分顯示 | 點按鈕 → 確認框 → 寄送邀請信 |
| 調整點數 Drawer | 右側滑入；含調整類型 Radio / 數量 Input / 原因 Textarea / 預覽文字 / 確認送出按鈕 | 關閉 Drawer → 不儲存 |
| 加入黑名單 Dialog | 含原因 Textarea（必填）+ 確認 Checkbox + 確認按鈕 | 見 Screen 7 規格 |
| 解除黑名單 Confirm Dialog | `el-message-box confirm` | 確認後解除 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 純顧客（無電商會員資料）| `members` 無對應 Email | 隱藏：KPI 卡片列 / 電商會員資訊 / 訂單記錄；顯示：邀請加入會員 Banner |
| 純會員（無 CMS 記錄）| `contacts` 無對應 Email | 隱藏：CMS 互動歷程區塊 |
| 顧客轉會員 | 兩表均有記錄 | 完整顯示所有區塊 |
| 黑名單會員 | `is_blacklisted = true` | 頁面頂部顯示 Danger Banner「此會員目前在黑名單中」；操作按鈕改為「解除黑名單」 |
| 編輯基本資料 | 點擊「編輯基本資料」 | 各欄位變為 Input；顯示「儲存 / 取消」；Email 維持唯讀 |
| 調整點數 Drawer 開啟 | 點擊「調整點數」 | 右側 Drawer 滑入，背景頁面不可操作 |
| Loading | 初次進入 | 各區塊 Skeleton |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「調整點數」 | 開啟右側 Drawer（調整點數表單） |
| 點擊「加入黑名單」 | 開啟 Dialog（含原因 Textarea + 確認 Checkbox） |
| 點擊「解除黑名單」 | 開啟 `el-message-box confirm` 確認框 |
| 點擊「編輯基本資料」 | 欄位 inline 切換為編輯模式 |
| 點擊「儲存」（基本資料）| API 更新，Toast 確認，欄位回唯讀 |
| 點擊訂單編號 | 跳轉至訂單詳情頁（新頁或 Router 導航） |
| 點擊「查看全部訂單 →」 | 跳轉至訂單管理頁並帶入此會員篩選 |
| 點擊標籤 ×（自定義標籤）| 即時移除標籤；Toast 確認 |
| 點擊「+ 新增標籤」 | 展開 Tag Select 下拉（可選現有或輸入新標籤名稱） |
| 點擊「寄送邀請加入會員信」 | 二次確認框 → 確認後觸發 NT 寄信 |
| 點擊「儲存備註」 | API 儲存；Toast「備註已儲存」 |

#### Motion / Transition

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| 調整點數 Drawer 開啟/關閉 | Slide from right | 250ms | ease-in-out |
| 加入黑名單 Dialog 開啟 | Fade in + scale from 95% | 200ms | ease-out |

---

### Screen 3：會員等級設定（進階電商包）

**Purpose：** 商家設定最多 5 個會員等級的名稱、升等條件、保級規則與專屬權益。
**Entry points：** 側邊欄「會員管理」→「等級設定」（僅進階方案顯示此選單項目）
**Primary user goal：** 新增/編輯等級設定，儲存後系統自動計算升降等

#### Information Hierarchy

```
H1 (most prominent): 會員等級設定
說明文字（H2 level）: 設定會員升等條件與專屬權益說明
Primary CTA: 新增等級
Secondary CTA: 儲存設定
Supporting info: 等級列表（可拖曳排序）
```

#### Actual Copy

**Page / Section Headings**
- Page title: `會員等級設定`
- Breadcrumb: `會員管理 / 等級設定`
- 說明文字: `設定會員升等條件與專屬權益。設定儲存後，系統將於每日凌晨 00:00 重新計算所有會員等級。`
- 等級表單 Dialog 標題（新增）: `新增等級`
- 等級表單 Dialog 標題（編輯）: `編輯等級`

**Button Labels**
- Primary CTA: `新增等級`
- Secondary CTA: `儲存設定`
- Dialog 確認: `儲存`
- Dialog 取消: `取消`
- 刪除等級: `刪除等級`

**Form Fields — 等級設定 Dialog**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 等級名稱 | 請輸入等級名稱，例：銀卡、金卡 VIP | 最多 10 字 | `等級名稱為必填欄位（最多 10 字）` |
| 等級圖示 | — | 支援 PNG / SVG，建議 64×64px | `請上傳有效的圖片格式（PNG / SVG）` |
| 升等條件 — 累計消費金額 | 請輸入金額 | 消費者累計消費達此金額自動升等 | `升等金額必須高於前一等級的門檻（NT$ X）` |
| 升等條件 — 購買次數 | 請輸入次數 | 購買次數達此數字自動升等 | `請輸入有效的購買次數` |
| 累計計算方式 | — | 「永久累計」不受時間限制；「年度累計」每年 1/1 重置 | — |
| 保級條件 — 金額 | 請輸入金額 | 在設定期間內累計消費達此金額可維持等級；留空代表永久不降等 | — |
| 保級條件 — 期間 | 請選擇期間 | — | — |
| 等級有效期 | — | 若設定有效月數，期間未達保級條件將自動降等 | `請輸入有效的月數（最少 1 個月）` |
| 專屬折扣 | 0–99 | 此等級消費享有額外 X% 折扣；0 代表無專屬折扣 | `請輸入 0–99 的整數` |
| 免運門檻調整 | NT$ | 此等級的免運門檻（低於商店預設時才有效）；留空代表沿用商店預設 | — |
| 入會/升等禮說明 | 請輸入升等禮說明 | 將出現在 NT 升等通知信中，最多 100 字 | — |

**累計計算方式選項：** 永久累計 / 年度累計（每年 1 月 1 日重置）
**等級有效期選項：** 永久 / 自訂月數

**Empty State — 無等級**
- Headline: `尚未設定任何會員等級`
- Subtext: `新增至少一個等級，系統才會啟動自動升降等機制。啟航方案會員僅享基礎點數回饋，不含等級系統。`
- CTA label: `新增第一個等級`

**Error States**

| Error condition | Message shown to user |
|---|---|
| 升等金額未遞增 | `升等金額必須高於前一等級的門檻（NT$ X），請修正後再儲存` |
| 超過 5 個等級 | `最多只能設定 5 個等級` |
| 儲存失敗 | `設定儲存失敗，請重新整理頁面後再試` |
| 刪除有會員的等級 | `此等級目前有 N 位會員，刪除後這些會員將自動降至前一等級，確定要繼續？` |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存設定成功 | `等級設定已更新，系統將於今晚 00:00 重新計算所有會員等級` |
| 新增等級成功 | `等級「[等級名稱]」已新增` |
| 刪除等級成功 | `等級已刪除` |

**Status Labels**

| Status key | Display text | Colour semantic |
|---|---|---|
| enabled（啟用）| 啟用中 | Success（綠） |
| disabled（停用）| 已停用 | Neutral（灰） |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 等級列表 Table | 欄位：拖曳 Handle / 等級名稱 / 升等條件摘要 / 保級條件 / 折扣 / 狀態 Switch / 操作 | 拖曳排序（`drag handle` 圖示） |
| 新增等級按鈕 | Primary Button；等級已達 5 個時 Disabled | 開啟等級設定 Dialog |
| 等級設定 Dialog | 內含多組欄位（詳見上方 Form Fields） | 儲存前執行升等金額遞增驗證 |
| 啟用/停用 Switch | `<el-switch>` | 即時切換；停用的等級不觸發自動升等 |
| 拖曳排序 Handle | 表格左側「⠿」圖示 | 拖曳後更新等級順序（影響升等優先序） |
| 圖示上傳 | `<el-upload>` 支援 PNG/SVG | 上傳後預覽縮圖 |
| 升等條件選擇 | `<el-select>`（累計消費金額 / 購買次數）+ `<el-input-number>` | 動態切換 |
| 刪除等級按鈕 | Danger Ghost Button | 開啟確認 Dialog（含影響會員數提示） |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default（有等級）| 已設定 1 個以上等級 | 完整 Table 顯示，可拖曳排序 |
| Empty（無等級）| 初次進入，尚未設定任何等級 | 中央 Empty State |
| Dialog Open（新增/編輯）| 點擊新增或編輯 | Dialog 覆蓋頁面 |
| Max reached（5 個等級）| 等級數量已達上限 | 「新增等級」按鈕 Disabled + Tooltip「已達 5 個等級上限」 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「新增等級」 | 開啟空白等級設定 Dialog |
| 點擊等級行「編輯」 | 開啟預填等級設定 Dialog |
| 點擊等級行「刪除」 | 開啟確認 Dialog（提示受影響會員數） |
| 拖曳等級 Handle | 重新排序等級列表（影響升等優先序） |
| 切換 Switch（啟用/停用）| 即時更新狀態；Toast 確認 |
| Dialog「儲存」 | 驗證欄位 → 驗證通過後 API 儲存 |

---

### Screen 4：點數設定

**Purpose：** 設定消費回饋比率、點數折抵規則（進階）、有效期與到期提醒天數。
**Entry points：** 側邊欄「會員管理」→「點數設定」
**Primary user goal：** 調整點數規則並儲存生效

#### Information Hierarchy

```
H1 (most prominent): 點數設定
Primary CTA: 儲存設定
Supporting info: 各設定欄位（分為「基礎點數」/ 「點數折抵（進階）」/ 「到期設定」三區塊）
```

#### Actual Copy

**Page / Section Headings**
- Page title: `點數設定`
- Breadcrumb: `會員管理 / 點數設定`
- 區塊一標題: `基礎點數回饋`
- 區塊二標題: `點數折抵設定`（進階方案，附 Tag「進階方案」）
- 區塊三標題: `點數有效期與提醒`
- 進階方案 Tag: `進階方案`（藍色 Pill Tag，標示僅進階方案生效的設定）

**Button Labels**
- Primary CTA: `儲存設定`

**Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 消費回饋比率 | — | 消費者每消費 NT$1 自動獲得 X 點。例：設定為 1，消費 NT$500 可獲得 500 點；設定為 0 則停用點數回饋 | `請輸入 0–100 的整數` |
| 單筆訂單最高回饋點數 | — | 單筆訂單最多回饋此點數；輸入 0 代表無上限 | `請輸入 0 或以上的整數` |
| 推薦人獎勵點數 | — | 推薦人成功邀請新會員首購後獲得的點數 | `請輸入有效的點數數量` |
| 被推薦人獎勵點數 | — | 被推薦新會員完成首購後獲得的點數 | `請輸入有效的點數數量` |
| 兌換比率（進階方案）| — | 消費者使用 X 點可折抵 NT$1。例：設定為 100，則 1,000 點可折抵 NT$10 | `請輸入 1 以上的整數` |
| 單筆最多折抵比例（進階方案）| — | 每筆訂單最多折抵訂單金額的 X%（0–100） | `請輸入 0–100 的整數` |
| 使用點數最低訂單金額 | — | 訂單金額需達此門檻才可使用點數折抵 | `請輸入有效的金額` |
| 點數有效期 | — | 留空或選擇「永久」代表點數永不過期 | — |
| 點數到期提醒提前天數 | — | 系統在點數到期前 X 天發送提醒通知（10–60 天）；此設定值與行銷活動「點數到期提醒旅程」共用 | `請輸入 10–60 的整數` |

**點數有效期選項：** 永久 / 自訂月數
**跨 PRD 連動提示（卡片 Info Banner）**
- `ℹ️ 此設定值與「行銷活動 → 自動化旅程 → 點數到期提醒旅程」中的天數設定共用，修改此處將同步更新。`

**Error States**

| Error condition | Message shown to user |
|---|---|
| 儲存失敗 | `設定儲存失敗，請重新整理頁面後再試` |
| 兌換比率未設定（進階方案）| `兌換比率為必填欄位（最小值為 1）` |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存成功 | `點數設定已更新，新規則立即生效` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 設定區塊 Card | 白色 Card，三個區塊依序排列 | — |
| 進階方案 Tag | 藍色 Pill，置於區塊標題右側 | Hover 顯示 Tooltip「此功能僅進階電商包包含」 |
| 數字輸入框 | `<el-input-number>` min/max 各異 | 失焦時驗證，超出範圍邊框紅色 |
| 點數有效期選擇器 | Radio（永久 / 自訂）+ 月數 Input | 選「永久」時月數 Input 隱藏 |
| Info Banner（跨 PRD 連動）| `#EFF2F7` 背景，ℹ️ 圖示 | 純提示，無互動 |
| Tooltip（❓ 圖示）| Hover 顯示欄位說明 | 消費回饋比率旁、兌換比率旁各一個 |
| 儲存設定按鈕 | Primary Button，固定於頁面底部 | 觸發全頁欄位驗證後 API 儲存 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 啟航方案 | 商家為啟航方案 | 點數折抵設定區塊欄位顯示為灰色 Disabled 狀態，附進階方案 Tag |
| 進階方案 | 商家為進階方案 | 全部欄位啟用 |
| Loading | 進入頁面時載入現有設定 | 欄位 Skeleton |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「儲存設定」 | 全頁表單驗證 → 通過後 API 儲存 → Toast |
| 切換「點數有效期」至「永久」 | 月數 Input 隱藏，設定值清除 |
| Hover ❓ 圖示 | 顯示欄位說明 Tooltip |

---

### Screen 5：分眾標籤管理

**Purpose：** 查看系統自動標籤規則（唯讀），以及建立、編輯、刪除商家自定義標籤。
**Entry points：** 側邊欄「會員管理」→「標籤管理`
**Primary user goal：** 建立新的自定義標籤，供後續顧客管理批次操作使用

#### Information Hierarchy

```
H1 (most prominent): 標籤管理
H2 (secondary) Tab 1: 系統自動標籤（唯讀，含規則說明）
H2 (secondary) Tab 2: 商家自定義標籤（可新增/編輯/刪除）
Primary CTA: 新增標籤
Supporting info: 標籤列表（名稱 / 顏色 / 說明 / 套用人數）
```

> 📌 假設：本頁使用 Tab 切換「系統標籤」與「自定義標籤」，因兩者屬性差異大（唯讀 vs 可編輯），適合分頁管理。

#### Actual Copy

**Page / Section Headings**
- Page title: `標籤管理`
- Breadcrumb: `會員管理 / 標籤管理`
- Tab 1: `系統自動標籤`
- Tab 2: `商家自定義標籤`
- 系統標籤說明: `以下標籤由系統每日凌晨 02:00 自動計算套用，規則不可修改。標籤結果可用於顧客管理篩選及行銷活動分眾。`

**Button Labels**
- Primary CTA: `新增標籤`
- 標籤行編輯: `編輯`
- 標籤行刪除: `刪除`
- Dialog 儲存: `儲存`
- Dialog 取消: `取消`

**系統自動標籤說明列表**

| 標籤名稱 | 顏色 | 自動判斷規則說明 |
|---|---|---|
| 新客 | 綠 `#67C23A` | 首次完成購買後 30 天內 |
| 活躍客 | 藍 `#409EFF` | 近 30 天內有完成訂單 |
| 高價值客 | 金 `#E6A23C` | 近 365 天消費 > 所有活躍會員平均 ×2，且至少 2 筆完成訂單 |
| 沉睡客 | 灰 `#909399` | 最後完成訂單距今 90–180 天 |
| 流失客 | 紅 `#F56C6C` | 最後完成訂單距今超過 180 天（或從未購買且加入超過 180 天）|
| 品類愛好者 | 藍 `#409EFF` | 同一產品分類完成訂單次數 ≥ 3 次（自動識別最高頻分類）|

**Form Fields — 新增/編輯自定義標籤 Dialog**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 標籤名稱 | 請輸入標籤名稱 | 最多 15 字；不可與系統標籤同名 | `標籤名稱為必填欄位` / `此名稱與系統標籤重複，請使用其他名稱` / `標籤名稱最多 15 字` |
| 標籤顏色 | — | 選擇標籤顏色（預設灰色） | — |
| 說明備註 | 請輸入內部說明，例：VIP 客戶、合作廠商 | 最多 50 字；僅後台可見，不對顧客/會員顯示 | — |

**Empty State — 自定義標籤（無標籤）**
- Headline: `尚未建立任何自定義標籤`
- Subtext: `建立標籤後，可在顧客詳情頁或批次操作中套用至顧客/會員。`
- CTA label: `新增第一個標籤`

**Error States**

| Error condition | Message shown to user |
|---|---|
| 儲存失敗 | `標籤儲存失敗，請稍後再試` |
| 刪除失敗 | `標籤刪除失敗，請稍後再試` |
| 刪除已套用的標籤 | `此標籤目前套用於 N 位顧客/會員。刪除後標籤將自動移除，確定繼續？` |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 新增標籤成功 | `標籤「[名稱]」已建立` |
| 編輯標籤成功 | `標籤已更新` |
| 刪除標籤成功 | `標籤已刪除` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Tab 切換列 | 「系統自動標籤」/ 「商家自定義標籤」 | 切換顯示內容 |
| 系統標籤說明 Banner | Info 背景；純文字說明 | 唯讀 |
| 系統標籤列表 | Table：Tag 預覽 / 名稱 / 規則說明 / 連動旅程（進階）| 唯讀，無操作欄 |
| 自定義標籤列表 | Table：Tag 預覽 / 名稱 / 說明 / 套用人數 / 操作 | 操作：編輯 / 刪除 |
| 新增標籤按鈕 | Primary Button，右上角 | 開啟新增 Dialog |
| 標籤顏色選擇器 | `<el-color-picker>` | 選擇後即時預覽標籤外觀 |
| 標籤預覽 | 列表中以圓角 Pill Tag 呈現 | 唯讀 |
| 新增/編輯 Dialog | 含名稱、顏色、說明欄位 | 儲存前驗證名稱不重複 |
| 刪除確認 Dialog | 顯示受影響人數（若有） | 確認後刪除 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Tab 1 — 系統標籤 | 預設 Tab | 6 個系統標籤唯讀說明列表 |
| Tab 2 — 自定義（有標籤）| 已建立至少 1 個自定義標籤 | 標籤列表 Table |
| Tab 2 — 自定義（空）| 無任何自定義標籤 | Empty State |
| Dialog 開啟（新增）| 點擊「新增標籤」 | 空白 Dialog |
| Dialog 開啟（編輯）| 點擊標籤行「編輯」 | 預填 Dialog |

#### Interaction Annotations

| User action | Result |
|---|---|
| 切換 Tab | 切換顯示系統 / 自定義標籤內容 |
| 點擊「新增標籤」 | 開啟空白新增 Dialog |
| 點擊「編輯」 | 開啟預填編輯 Dialog |
| 點擊「刪除」 | 開啟刪除確認 Dialog（顯示影響人數） |
| 調整顏色選擇器 | 即時更新 Dialog 內的標籤預覽 |

---

### Screen 6：分眾篩選器（進階電商包）

**Purpose：** 以多條件組合動態篩選出目標會員群組，預覽人數後可接入行銷活動或儲存為分眾群組。
**Entry points：** 側邊欄「會員管理」→「分眾篩選」（僅進階方案顯示）
**Primary user goal：** 建立多條件篩選，預覽符合人數，並發送優惠券或儲存為群組

#### Information Hierarchy

```
H1 (most prominent): 分眾篩選
條件列表（可動態新增）: AND / OR 邏輯選擇器 + 條件行組合
Primary CTA: 預覽符合人數
Secondary CTA: 發送優惠券 / 儲存為分眾群組
Supporting info: 篩選結果（符合 N 人提示）
```

#### Actual Copy

**Page / Section Headings**
- Page title: `分眾篩選`
- Breadcrumb: `會員管理 / 分眾篩選`
- 說明文字: `設定多個條件篩選出目標顧客/會員，預覽符合人數後可發送優惠券或儲存為群組以便日後重複使用。`
- 邏輯選擇器說明: `符合以下`
- AND 選項: `所有條件（AND）`
- OR 選項: `任一條件（OR）`

**Button Labels**
- 新增條件: `+ 新增條件`
- 預覽人數: `預覽符合人數`
- 發送優惠券: `發送優惠券`
- 儲存群組: `儲存為分眾群組`
- 刪除條件行: `×`（每行右側）
- 已儲存群組列表標題: `已儲存的分眾群組`
- 套用群組: `套用`

**篩選欄位選項（條件行 — 欄位 Select）**

| 欄位名稱 | 說明 |
|---|---|
| 累計消費金額 | 所有完成訂單的消費總額 |
| 購買次數 | 完成訂單的總筆數 |
| 最後購買日距今天數 | 最後一筆完成訂單到今天的天數 |
| 會員等級 | 當前等級（需進階方案已開啟等級設定）|
| 會員標籤 | 包含系統自動標籤與商家自定義標籤 |
| 產品分類購買記錄 | 曾在此分類下完成訂單 |
| 加入日期 | 成為顧客/會員的日期 |
| 身分類型 | 顧客 / 會員 |

**比較運算子選項（依欄位類型動態切換）**
- 數字欄位：大於 / 小於 / 等於 / 介於
- 日期欄位：在過去 N 天內 / 超過 N 天 / 介於
- 標籤欄位：包含 / 不包含
- 等級欄位：等於 / 不等於

**結果預覽文字**
- Loading 中: `計算中...`
- 有結果: `符合條件的顧客/會員共 **N 人**（其中會員 X 人可接收優惠券）`
- 零結果: `目前沒有符合所有條件的顧客/會員，請調整篩選條件。`

**儲存群組 Dialog**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 群組名稱 | 請為此分眾群組命名 | 最多 30 字 | `群組名稱為必填欄位` |

**Empty State — 無條件（初始進入）**
- Headline: `尚未新增任何篩選條件`
- Subtext: `點擊「+ 新增條件」開始設定分眾條件。`
- CTA label: `+ 新增條件`

**Error States**

| Error condition | Message shown to user |
|---|---|
| 預覽 API 失敗 | `預覽失敗，請稍後再試` |
| 發送優惠券（無會員符合）| `目前篩選結果中沒有會員可接收優惠券（顧客尚未完成電商會員申請）` |
| 儲存群組失敗 | `群組儲存失敗，請稍後再試` |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存群組成功 | `分眾群組「[名稱]」已儲存` |

> ✏️ Copy 待確認：「發送優惠券」跳轉後是否需要 Toast 提示，或直接跳轉至行銷活動頁即可？

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 邏輯選擇器 Radio | 「所有條件（AND）」/ 「任一條件（OR）」 | 切換後影響預覽計算邏輯 |
| 條件行 | 3 個元件：欄位 Select + 運算子 Select + 值 Input/Select；右側 × 刪除 | 欄位切換後動態更換運算子與值元件類型 |
| 「+ 新增條件」按鈕 | Ghost Button，藍色文字 | 新增一行空白條件 |
| 「預覽符合人數」按鈕 | Primary Button | API 計算，顯示 Loading 後呈現結果 |
| 結果預覽區 | 結果文字 + N 人數字（加粗）| 唯讀 |
| 「發送優惠券」按鈕 | Primary Button；需先預覽後才 Enabled | 跳轉至行銷活動優惠券發送介面，帶入篩選條件 |
| 「儲存為分眾群組」按鈕 | Secondary Button | 開啟命名 Dialog |
| 已儲存群組列表 | 摺疊 Section；列出已儲存群組（名稱 / 條件數 / 建立日期）| 點「套用」帶入儲存的條件 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Empty（無條件）| 初始進入 | 中央 Empty State + 「+ 新增條件」 |
| 有條件（未預覽）| 已新增至少 1 個條件 | 條件列表；「發送優惠券」Disabled |
| 預覽中 | 點擊「預覽符合人數」 | 按鈕 Loading；結果區顯示「計算中...」 |
| 已預覽（有結果）| 計算完成 | 顯示符合人數；「發送優惠券」Enabled |
| 已預覽（零結果）| 計算完成，0 人符合 | 顯示零結果提示；「發送優惠券」Disabled |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「+ 新增條件」 | 新增一行空白條件行 |
| 點擊條件行 × | 移除該條件行；若只剩一行，× 仍可點擊（允許清空所有條件） |
| 切換條件欄位 | 運算子 Select 重置；值欄位動態切換類型（Input / Select / DatePicker）|
| 點擊「預覽符合人數」 | API 計算，Loading 後顯示結果 |
| 點擊「發送優惠券」 | 跳轉行銷活動模組，帶入當前篩選條件 |
| 點擊「儲存為分眾群組」 | 開啟命名 Dialog |
| 點擊已儲存群組「套用」 | 將該群組條件填入當前篩選器 |

---

### Screen 7：黑名單管理

**Purpose：** 集中查看所有黑名單會員列表，並執行解除黑名單操作。
**Entry points：** 側邊欄「會員管理」→「黑名單管理」
**Primary user goal：** 查看黑名單列表，確認各會員加入原因，必要時解除黑名單

#### Information Hierarchy

```
H1 (most prominent): 黑名單管理
Supporting info: 黑名單列表 Table（姓名 / Email / 手機 / 加入日期 / 原因 / 操作人 / 操作）
```

#### Actual Copy

**Page / Section Headings**
- Page title: `黑名單管理`
- Breadcrumb: `會員管理 / 黑名單管理`
- 說明文字: `黑名單會員無法在本商店完成結帳。加入或解除黑名單請於顧客管理頁的會員詳情中操作。`

**Button Labels**
- 解除黑名單: `解除黑名單`（Primary）

**加入黑名單 Dialog（從會員詳情頁觸發，規格置於此統一定義）**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 加入原因 | 請詳細說明將此會員加入黑名單的原因，例：惡意退貨 X 次、疑似詐騙下單等。此記錄不對消費者顯示，僅供內部查核。 | 最少 10 字，最多 300 字 | `原因為必填欄位，請至少輸入 10 個字` |
| 確認操作 | 我確認此操作，加入黑名單後該會員將無法在本商店下單 | — | `請先勾選確認才能執行此操作` |

**解除黑名單 Confirm Dialog**
- 標題: `解除黑名單確認`
- 內文: `確定要解除 [姓名] 的黑名單？解除後，該會員可以再次在本商店下單。如有疑慮，建議維持黑名單狀態。`
- 確認按鈕: `確定解除`
- 取消按鈕: `取消`

**Empty State — 無黑名單會員**
- Headline: `目前沒有任何黑名單會員`
- Subtext: `如需將會員加入黑名單，請前往顧客管理的會員詳情頁執行操作。`
- CTA label: `前往顧客管理`

**Error States**

| Error condition | Message shown to user |
|---|---|
| API 載入失敗 | `無法載入黑名單資料，請重新整理頁面。` |
| 解除黑名單失敗 | `解除黑名單失敗，請稍後再試。` |

**Loading State**
- Skeleton loader（Table 列灰色區塊）

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 解除黑名單成功 | `已解除 [姓名] 的黑名單，該會員現在可以正常下單` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 黑名單 Table | 欄位：姓名（連結）/ Email / 手機（遮蔽中間 4 碼）/ 加入日期 / 加入原因 / 操作人 / 操作 | — |
| 姓名連結 | 文字連結 `#409EFF` | 點擊 → 跳轉至 Screen 2（顧客詳情頁） |
| 加入原因欄 | 文字截斷（顯示前 30 字）；Hover 顯示完整 Tooltip | Hover on desktop |
| 「解除黑名單」按鈕 | Primary Button，每行一個 | 開啟解除確認 Dialog |
| 解除確認 Dialog | `el-message-box confirm` 規格 | 確認 → API 解除；成功後移除該列 |
| 說明 Info Banner | 頁面頂部；告知加入黑名單需至詳情頁操作 | 純提示 |
| 分頁器 | 每頁 20 筆 | — |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default（有黑名單）| 有至少一位黑名單會員 | 完整 Table 顯示 |
| Empty（無黑名單）| 目前無任何黑名單會員 | 中央 Empty State |
| Loading | 進入頁面 | Table 列 Skeleton |
| Confirm Dialog 開啟 | 點擊某行「解除黑名單」 | Dialog 覆蓋頁面 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊會員姓名 | 跳轉至顧客詳情頁（Screen 2） |
| Hover 加入原因欄 | 顯示完整原因 Tooltip |
| 點擊「解除黑名單」 | 開啟確認 Dialog（含會員姓名） |
| Dialog「確定解除」 | API 解除；成功後該列從 Table 移除；Toast 確認 |
| Empty State「前往顧客管理」 | 跳轉至 Screen 1（顧客管理） |

---

### Screen 8：會員設定

**Purpose：** 集中管理會員模組的全局控制，包含：啟用/停用整個會員功能、設定新會員驗證方式（Email 自動 / 人工審核）、選擇前台會員可自行編輯的欄位，以及開關自動建帳號、推薦計畫、生日雙倍點數等行為。
**Entry points：** 側邊欄「會員管理」→「設定」
**Primary user goal：** 控制前台會員體驗的全局行為，儲存後立即生效

#### Information Hierarchy

```
H1 (most prominent): 會員設定
H2 (區塊一，置頂): 啟用會員功能（主開關）
H2 (區塊二): 驗證機制
H2 (區塊三): 帳號建立設定
H2 (區塊四): 前台會員可編輯欄位
H2 (區塊五): 推薦功能設定
H2 (區塊六，進階方案): 進階設定
Primary CTA: 儲存設定
Supporting info: 各功能說明文字、Radio 說明、Checkbox 列表
```

#### Actual Copy

**Page / Section Headings**
- Page title: `會員設定`
- Breadcrumb: `會員管理 / 設定`
- 頁面說明: `管理會員模組的全局行為設定。所有設定修改後立即生效。`
- 區塊一標題: `啟用會員功能`
- 區塊二標題: `驗證機制`
- 區塊二說明: `選擇消費者在前台申請會員時的驗證方式。切換後僅影響新申請，已啟用的既有會員不受影響。`
- 區塊三標題: `帳號建立設定`
- 區塊四標題: `前台會員可編輯欄位`
- 區塊四說明: `勾選的欄位，會員可在前台「個人中心」自行修改。取消勾選後，欄位在前台顯示為唯讀。`
- 區塊五標題: `推薦功能設定`
- 區塊六標題: `進階設定`（進階電商包，啟航方案顯示鎖定 Banner）

**Button Labels**
- Primary: `儲存設定`
- 停用會員功能 Dialog 確認: `確認停用`（紅色 Danger）
- 停用會員功能 Dialog 取消: `取消`
- 關閉自動成為會員 Dialog 確認: `確認關閉`（紅色 Danger）
- 關閉自動成為會員 Dialog 取消: `取消`
- 切換人工驗證 Dialog 確認: `確認切換`
- 切換人工驗證 Dialog 取消: `取消`

**功能卡片文案（Switch 類）**

| 功能 | 標題 | 說明文字 |
|---|---|---|
| 啟用會員功能 | `啟用會員功能` | `關閉後，電商前台將移除登入與會員註冊入口，所有需要登入才能使用的功能將停用。現有會員帳號資料不會被刪除，重新開啟後可繼續使用。` |
| 自動成為會員 | `自動成為會員` | `消費者完成首次購買後，系統自動以購買 Email 建立會員帳號，並以系統信件發送帳號開通通知與初始密碼。關閉後，訪客需自行至前台手動註冊。` |
| 推薦計畫 | `推薦計畫` | `開啟後，會員個人中心顯示「推薦連結」；被推薦人首購完成後，雙方自動獲得點數獎勵。推薦人與被推薦人獎勵點數請至「點數設定」調整。` |
| 生日雙倍點數 | `生日雙倍點數` | `開啟後，會員在其生日所在月份完成的訂單，回饋點數自動 × 2。生日賀卡 Email 亦於生日月份第 1 天自動發送（需於「通知信管理」確認生日賀卡通知為開啟狀態）。` |

**驗證機制 Radio 選項文案**

| 選項 | 標題 | 說明文字 |
|---|---|---|
| 電子郵件驗證（預設）| `電子郵件驗證` | `系統自動寄出驗證信，消費者點擊信中連結後帳號立即啟用。無額外費用。` |
| 人工驗證 | `人工驗證` | `消費者填寫申請表後，帳號進入「待審核」狀態，由後台管理員手動核准或拒絕。核准後系統自動發送歡迎信並啟用帳號。` |

**電子郵件驗證進階設定連結**
- 連結文字: `▶ 進階設定（有效期、重發冷卻）`
- 連結目標: 全域設定 → 電商進階設定 → 會員驗證設定

**人工驗證提示（選擇人工驗證後出現）**
- Alert 文字: `開啟人工驗證後，後台會員列表將新增「待審核」狀態篩選，請至會員列表審核新申請。`
- Alert type: `warning`

**前台會員可編輯欄位 Checkbox 列表**

| 欄位 label | 預設狀態 |
|---|---|
| `姓名` | ✅ 勾選 |
| `電話` | ✅ 勾選 |
| `生日` | ✅ 勾選 |
| `性別` | ✅ 勾選 |
| `大頭照` | ✅ 勾選 |
| `預設收件地址` | ✅ 勾選 |
| `公司` | ☐ 未勾選 |

**Email 唯讀說明（Checkbox 列表下方）**
- Alert 文字: `Email 為帳號識別錨點，永遠不可由會員自行修改，不受此設定影響。`
- Alert type: `info`，size: small

**Switch 狀態標籤**
- 開啟狀態: `已開啟`
- 關閉狀態: `已關閉`

**進階功能鎖定 Banner**
- 文字: `此功能需升級至進階電商包方可使用。`
- 連結文字: `了解升級方案`

**確認 Dialog 文案**

| Dialog | 標題 | 說明文字 | 確認按鈕 |
|---|---|---|---|
| 停用會員功能 | `確認停用會員功能？` | `停用後，電商前台將移除登入與會員註冊入口。現有會員將無法登入前台，但帳號資料不會被刪除，重新開啟後可繼續使用。` | `確認停用`（紅色）|
| 關閉自動成為會員 | `確認關閉自動成為會員？` | `關閉後，訪客首購將不再自動建立會員帳號。已建立的會員帳號不受影響。` | `確認關閉`（紅色）|
| 切換至人工驗證 | `切換為人工驗證？` | `切換後，所有新申請的會員帳號將進入「待審核」狀態，需由後台管理員手動審核。切換不影響已啟用的既有會員帳號。` | `確認切換` |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存成功 | `會員設定已更新，設定立即生效` |
| 儲存失敗 | `儲存設定失敗，請稍後再試。` |

**Error States**

| Error condition | Message shown to user |
|---|---|
| 頁面 API 載入失敗 | `載入設定時發生錯誤，請重新整理頁面。` |
| 儲存失敗（API 錯誤）| `儲存設定失敗，請稍後再試。` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 啟用會員功能 Switch | `<el-switch>`；置頂；關閉時卡片邊框轉紅 `#F56C6C`（視覺警示）| 由開→關：先彈確認 Dialog；確認後才關閉；切換後儲存按鈕高亮 |
| 驗證機制 Radio Group | `<el-radio-group>`；垂直排列；每個選項下方有 `<p class="text-sm text-gray-500">` 說明文字 | 切換至「人工驗證」：先彈確認 Dialog；確認後才切換；下方出現 Warning Alert |
| 電子郵件驗證進階設定連結 | color `#409EFF`，font-size 12px；「電子郵件驗證」選中時顯示 | 跳轉至 §6.10 全域設定頁 |
| 人工驗證 Warning Alert | `<el-alert type="warning" show-icon>`；選擇人工驗證後出現 | 靜態提示 |
| 功能 Switch（帳號建立/推薦/進階）| `<el-switch>`；開啟 `#409EFF` / 關閉 `#DCDFE6`；Label「已開啟」/「已關閉」顯示於右側 | 切換後儲存按鈕高亮；關閉「自動成為會員」先彈確認 Dialog |
| 前台可編輯欄位 Checkbox Group | `<el-checkbox-group>`；垂直排列；7 個選項 | 切換後儲存按鈕高亮 |
| Email 唯讀說明 Alert | `<el-alert type="info" show-icon>` size="small"；Checkbox Group 下方 | 靜態說明 |
| 功能說明卡片 | Card 容器（白底 + `1px #DCDFE6` 邊框）；包含標題、說明文字、Switch / Radio / Checkbox | — |
| 鎖定 Banner（進階區塊） | `<el-alert type="info" show-icon>` | 啟航方案時顯示，Switch 灰色 disabled；「了解升級方案」文字連結 |
| 儲存按鈕 | `<el-button type="primary">` | 有任何變更時 Active（藍色）；無變更時 disabled 視覺（仍可點，不執行） |
| 確認 Dialog | `el-message-box confirm` | 3 種觸發情境（見 Actual Copy）|

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default（啟航方案，Email 驗證）| 啟航方案 + 預設 Email 驗證 | 全部 6 個區塊顯示；進階設定區塊顯示鎖定 Banner + 灰色 Switch；驗證 Radio 選中「電子郵件驗證」|
| Default（進階方案）| 商家使用進階電商包 | 進階設定區塊正常可操作 |
| 人工驗證已啟用 | 驗證機制設定為「人工驗證」| 驗證 Radio 選中「人工驗證」；Radio 下方顯示 Warning Alert |
| 會員功能已停用 | 「啟用會員功能」Switch 關閉 | 卡片邊框紅色警示；其他所有設定 disabled（置灰）；頁面頂部顯示警示 Banner `目前會員功能已停用，前台不提供登入與註冊。`|
| Loading | 進入頁面讀取設定 | 各區塊 Skeleton |
| Confirm Dialog 開啟 | 三種觸發情境之一 | Dialog 覆蓋頁面；確認或取消後 Dialog 關閉 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「啟用會員功能」Switch（由開→關）| 先彈確認 Dialog；確認後關閉；其他所有設定 disabled；頁面頂部出現停用警示 Banner |
| 點擊「啟用會員功能」Switch（由關→開）| 直接開啟（無需確認）；其他設定恢復可操作 |
| 點擊驗證機制 Radio（選「人工驗證」）| 先彈確認 Dialog；確認後切換；Radio 下方出現 Warning Alert |
| 點擊驗證機制 Radio（選「電子郵件驗證」）| 直接切換（無需確認）；Warning Alert 消失；進階設定連結出現 |
| 點擊「進階設定連結」（Email 驗證）| 跳轉至全域設定 → 會員驗證設定頁（§6.10）|
| 切換任一 Checkbox（前台可編輯欄位）| 儲存按鈕高亮 |
| 點擊任一功能 Switch（帳號建立/推薦）| 切換狀態；儲存按鈕高亮 |
| 點擊「自動成為會員」Switch（由開→關）| 先彈確認 Dialog；確認後才關閉 |
| 點擊「了解升級方案」（鎖定 Banner）| 跳轉至方案管理頁 |
| 點擊「儲存設定」 | API 儲存；成功 Toast；失敗 Toast |

---

### Screen 9：通知信管理

**Purpose：** 管理所有由會員模組觸發的系統 Email，讓商家可個別開關每種通知，並自訂郵件主旨與內文模板。
**Entry points：** 側邊欄「會員管理」→「通知信管理」
**Primary user goal：** 調整哪些會員通知要發送，並自訂 Email 模板內容

#### Information Hierarchy

```
H1 (most prominent): 通知信管理
H2 (each row): 通知名稱 + 觸發說明
Primary CTA (per row): 編輯模板
Secondary (per row): Switch 開關
Supporting info: 方案 Tag（兩方案 / 進階方案）
```

#### Actual Copy

**Page / Section Headings**
- Page title: `通知信管理`
- Breadcrumb: `會員管理 / 通知信管理`
- 頁面說明: `管理會員相關的自動發信。關閉通知後，對應事件觸發時系統將不發送 Email，直到您重新開啟。`

**通知項目標題與說明**

| # | 通知名稱（顯示） | 觸發說明（列表副文字） | 方案 Tag |
|---|---|---|---|
| 1 | `歡迎信` | `消費者完成 Email 驗證或第三方帳號首次登入後自動發送` | `兩方案` |
| 2 | `帳號開通通知` | `首購後系統自動建帳號時發送；需搭配「設定 › 自動成為會員」開啟` | `兩方案` |
| 3 | `升等恭喜通知` | `消費者達升等門檻後自動發送，信中含新等級名稱與專屬權益` | `進階方案` |
| 4 | `保級預警通知` | `等級距到期日 30 天內且未達保級條件時發送` | `進階方案` |
| 5 | `降等通知` | `等級到期後未達保級條件，系統自動降等後發送` | `進階方案` |
| 6 | `點數到期提醒` | `點數即將到期前發送；提前天數由「點數設定」控制` | `兩方案` |
| 7 | `生日賀卡` | `會員生日月份第 1 天發送；需搭配「設定 › 生日雙倍點數」開啟` | `進階方案` |
| 8 | `推薦獎勵通知（推薦人）` | `被推薦人完成首購後，通知推薦人點數已到帳` | `兩方案` |
| 9 | `推薦獎勵通知（被推薦人）` | `首購完成後，通知被推薦人點數已到帳` | `兩方案` |

**Switch 狀態標籤**（同 Screen 8）
- 開啟: `已開啟`
- 關閉: `已關閉`

**進階方案通知鎖定 Tooltip**（啟航方案 Hover 鎖定 Switch 時）
- `此通知類型僅進階電商包可使用`

**模板編輯 Drawer 標題**: `[通知名稱] — 模板編輯`（例：`升等恭喜通知 — 模板編輯`）

**模板編輯 Drawer 欄位**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 郵件主旨 | `請輸入郵件主旨，最多 100 字` | `可使用變數：{{member_name}}、{{shop_name}}` | `主旨為必填欄位` |
| 郵件內文 | —（富文字編輯器）| `最多 3,000 字。點擊上方變數按鈕快速插入。` | `內文為必填欄位` |

**Drawer 按鈕標籤**
- 插入變數 Chips（依通知類型不同）: `{{member_name}}` `{{shop_name}}` `{{level_name}}` `{{points_amount}}` `{{points_expire_date}}` `{{reward_points}}` 等
- `預覽 Email`
- `還原為預設模板`
- `取消`
- `儲存模板`

**還原預設模板確認 Dialog**
- 內文: `確定要還原為預設模板嗎？目前的自訂內容將會遺失，且無法復原。`
- 確認: `還原預設`（Danger）
- 取消: `取消`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 通知開關切換（開啟）| `[通知名稱] 已開啟，系統將於條件觸發時自動發送` |
| 通知開關切換（關閉）| `[通知名稱] 已關閉，條件觸發時將不發送 Email` |
| 模板儲存成功 | `[通知名稱] 模板已更新` |
| 模板儲存失敗 | `模板儲存失敗，請稍後再試` |
| 還原預設成功 | `已還原為預設模板` |

**Error States**

| Error condition | Message shown to user |
|---|---|
| 頁面載入失敗 | `無法載入通知設定，請重新整理頁面。` |
| 模板儲存失敗 | `模板儲存失敗，請稍後再試。如問題持續，請聯絡客服。` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 通知列 Card | 白底 Card；左側：通知名稱（粗體）+ 觸發說明（灰色小字）；右側：方案 Tag + Switch + 「編輯模板」按鈕 | — |
| 方案 Tag | `兩方案`（藍色）/ `進階方案`（金色）；`<el-tag size="small">` | 純顯示 |
| 通知 Switch | `<el-switch>`；進階方案通知在啟航方案時灰色 disabled | 切換後即時呼叫 API 儲存開關狀態；成功 Toast；失敗 Toast + 回復前狀態 |
| 「編輯模板」按鈕 | Ghost Button（白框藍字）；每列一個 | 點擊 → 打開右側 Drawer |
| 模板編輯 Drawer | `<el-drawer direction="rtl" size="600px">`；包含主旨輸入、富文字編輯器、變數 Chip 列、預覽、還原、儲存 | 點擊「×」或「取消」關閉；有未儲存變更時，關閉前詢問是否放棄 |
| 變數插入 Chips | Tag 樣式 Chips，依通知類型動態顯示 | 點擊後將變數字串插入光標位置 |
| 富文字編輯器 | Quill.js 或等效（支援：粗體、斜體、連結、有序/無序清單、換行）；禁止嵌入 `<script>` | — |
| 預覽面板 | Drawer 內展開（手風琴或分頁）；以管理員資訊帶入變數渲染預覽 | 不實際發信 |
| 還原確認 Dialog | `el-message-box confirm` | 確認後清除 Drawer 編輯器內容並載入預設模板 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default（啟航方案）| 使用啟航方案 | 全部 9 列顯示；進階方案通知（#3/#4/#5/#7）Switch 灰色鎖定；方案 Tag `進階方案` |
| Default（進階方案）| 使用進階電商包 | 全部 9 列正常可操作 |
| Loading | 進入頁面 | 通知列 Skeleton（9 列灰色區塊）|
| Drawer 開啟 | 點擊某列「編輯模板」| Drawer 從右側滑入；背景 overlay 半透明 |
| Drawer 未儲存關閉 | Drawer 開啟時有修改未儲存、點擊關閉 | 確認框：`「有尚未儲存的變更，確定要放棄？」`；[放棄變更] [繼續編輯] |
| 頁面錯誤 | API 載入失敗 | 頁面中央錯誤提示 + 重試按鈕 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊通知 Switch | 即時呼叫 API 切換開關；成功 Toast；失敗時 Switch 恢復原狀 + 錯誤 Toast |
| 點擊「編輯模板」 | 右側 Drawer 滑入，載入該通知目前的主旨與內文模板 |
| 點擊變數 Chip | 將 `{{variable}}` 插入富文字編輯器游標位置 |
| 點擊「預覽 Email」 | Drawer 內展開預覽面板，渲染最終 Email 外觀 |
| 點擊「還原為預設模板」 | 確認 Dialog；確認後替換 Drawer 內容為預設模板 |
| 點擊「儲存模板」 | API 儲存；成功 Toast + Drawer 關閉；失敗 Toast |
| Drawer 關閉（有未儲存）| 確認放棄或繼續編輯 Dialog |

#### Motion / Transition

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| Drawer 開啟 | 從右側滑入 | 250ms | ease-in-out |
| Drawer 關閉 | 向右滑出 | 200ms | ease-in |
| Switch 切換 | 滑動 Toggle 動畫（CSS transition）| 150ms | ease-out |

---

## Part 4 — Cross-Screen Component Inventory

### Action Components

| 元件 | 變體 | 尺寸 | 狀態 |
|---|---|---|---|
| Button | Primary（黑色 or 藍色）/ Secondary（白框）/ Ghost（藍字）/ Danger（紅框） | Default / Small | Default / Hover / Active / Disabled / Loading |
| Text Link | 藍色文字連結 `#409EFF` | — | Default / Hover / Visited |
| Icon Button | × 刪除 / + 新增 / 編輯 / 拖曳 | — | Default / Hover / Disabled |

### Display Components

| 元件 | 變體 | 資料欄位 | 狀態 |
|---|---|---|---|
| KPI Card | 4 欄統計卡片 | 主數字 / 副文字 / 趨勢 | Default |
| Status Tag（Pill） | 顧客（灰）/ 會員（藍）/ 帳號狀態（綠/灰/紅）/ 系統標籤（6色）/ 方案 Tag（藍/金）| 文字 | — |
| Table Row | 標準 / Hover 高亮 | 依各頁面欄位定義 | Default / Hover / Selected |
| Info Banner | 藍底（ℹ️）/ 黃底（⚠️）/ 紅底（黑名單警示）/ 藍底（進階功能鎖定）| 標題 + 說明 | — |
| 設定功能卡片 | 白底 Card + Switch + 說明文字（Screen 8）| — | Default / Locked（進階鎖定）|
| 通知列 Card | 左：通知名稱 + 說明；右：方案 Tag + Switch + 編輯按鈕（Screen 9）| — | Default / Locked |

### Input Components

| 元件 | 變體 | 狀態 |
|---|---|---|
| Text Input | Default / With icon / With error | Default / Focus / Filled / Error / Disabled |
| Number Input | With min/max / Without spinner | Default / Focus / Error |
| Textarea | Default / With char count | Default / Focus / Error |
| Select（Single）| 含 Placeholder | Default / Open / Selected / Disabled |
| Select（Multiple）| 顯示已選數量 | Default / Open / Has selection / Disabled |
| Date Range Picker | — | Default / Open |
| Color Picker | 圓形色盤 | Default / Open |
| Switch | — | On / Off / Disabled（方案鎖定）|
| Checkbox | Single（確認用）| Default / Checked / Error |
| Radio Group | 水平排列 | Default / Selected |
| 富文字編輯器 | 基礎格式（粗體/斜體/連結/清單）；禁止 `<script>`（Screen 9）| Default / Focus |
| 變數插入 Chip | Tag 樣式；依通知類型動態顯示（Screen 9）| Default / Hover |

### Navigation Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Sidebar | Expanded（預設）/ 含子選單展開 | 依方案動態顯示進階功能選單項目 |
| Breadcrumb | 2–3 層 | 頁面頂部 |
| Tab Bar | 2 個 Tab（Screen 5）| Active Tab 底線藍色 `#409EFF` |
| 返回連結 | 文字 + ← 箭頭 | 回上一頁 |

### Feedback Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Toast | Success（綠）/ Error（紅）/ Info（藍）/ Warning（黃）| 右上角出現，3 秒自動消失 |
| Modal / Dialog | 標準確認框（含 Textarea 的黑名單 Dialog）| 背景 Overlay 0.5 不透明 |
| Confirm Dialog | `el-message-box confirm` 樣式 | 含標題 / 內文 / 確認 / 取消 |
| Drawer | 右側滑入 — 兩種尺寸：480px（調整點數，Screen 2）/ 600px（通知模板編輯，Screen 9）| 覆蓋頁面右側；有未儲存變更時關閉需確認 |
| Skeleton Loader | Table 列版本 / Card 版本 | 灰色矩形區塊，動態 shimmer |
| Empty State | 無圖示版 / 含圖示版 | 中央對齊；Headline + Subtext + CTA |
| Tooltip | 文字 Hover 提示 | 標籤完整文字 / 說明文字 |

---

## Part 5 — Design System Token Reference

| Decision | Token / Value |
|---|---|
| Primary brand colour | `#409EFF`（藍） |
| Success colour | `#67C23A`（綠）|
| Warning colour | `#E6A23C`（橙）|
| Danger colour | `#F56C6C`（紅）|
| Neutral / Info | `#909399`（灰）|
| Page background | `#F2F3F5` |
| Card background | `#FFFFFF` |
| Border colour | `#DCDFE6` |
| Text primary | `#303133` |
| Text secondary | `#606266` |
| Text tertiary | `#909399` |
| Base font | Noto Sans TC（400 / 500 / 600 / 700） |
| Base font size | 14px |
| Border radius（Card）| 0px（方形，沿用產品中心風格）|
| Border radius（Tag）| 9999px（圓角 Pill）|
| Spacing unit | 8px 倍數 |
| Sidebar width | 220px |
| Table row height | 52px |
| Drawer width（點數調整）| 480px |
| Drawer width（模板編輯）| 600px |

---

## Assumptions

> 📌 假設：Screen 5 標籤管理採 Tab Bar 結構分開「系統標籤」與「自定義標籤」，因兩者屬性差異大（唯讀 vs 可編輯）。若設計師認為單頁捲動更合適，可調整為兩個 Section Card。

> 📌 假設：Screen 8（會員設定）的設定功能卡片採垂直堆疊配置（一個功能一張 Card），而非橫向並排，以便在說明文字較長時不擠壓 Switch 操作區。

> 📌 假設：「啟用會員功能」關閉後，同頁其他所有設定 disabled（置灰），但不隱藏，讓商家知道重新開啟後仍保有原設定值。

> 📌 假設：切換至「人工驗證」需要確認 Dialog，但切換回「電子郵件驗證」不需要（返回較安全狀態無需確認）。

> 📌 假設：「前台會員可編輯欄位」的「密碼修改」入口不列入此設定控制（密碼永遠允許修改，不可由商家關閉），以避免商家誤操作導致會員無法重設密碼。

> 📌 假設：Screen 9（通知信管理）的模板編輯 Drawer 採 600px 寬度（較 480px 點數 Drawer 更寬），以提供足夠的富文字編輯空間。

> ✏️ Copy 待確認：Screen 9 通知信預設模板的主旨與內文內容尚未定義，PRD 僅提供變數列表。建議 PM 在進入 Figma 前提供每種通知的預設信件草稿，以便 Prototype 展示時不顯示空白。

> 📌 假設：分眾篩選器（Screen 6）的「已儲存群組」以摺疊 Section 呈現於篩選器下方，不獨立為子頁面。

> 📌 假設：會員等級設定（Screen 3）的新增/編輯使用 Dialog 而非 Inline Row 展開，因欄位數量較多（約 9 個欄位），Dialog 有更充足的空間。

> 📌 假設：黑名單管理頁（Screen 7）不提供在此頁加入黑名單的入口，加入操作統一從顧客詳情頁執行，以確保操作有完整脈絡。

> ✏️ Copy 待確認：Screen 6 分眾篩選器，「發送優惠券」跳轉至行銷活動後是否需要 Toast 提示「已帶入 N 人篩選條件」，或由行銷活動模組自行處理提示？

> ✏️ Copy 待確認：Screen 3 等級設定，「累計計算方式」的兩個選項——「永久累計」與「年度累計（每年 1/1 重置）」——請確認用詞是否符合商家習慣。

> ✏️ Copy 待確認：點數有效期的設定說明文字，建議加入「設定變更僅影響未來產生的點數，已有點數的到期日不受影響」說明，請確認此為正確行為。
