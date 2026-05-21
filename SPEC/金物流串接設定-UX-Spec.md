# Evomni 金物流串接設定 — Design Brief + UX Spec

> **Version:** 1.0
> **Created:** 2026/05/05
> **來源 PRD：** `Evomni_串接設定後台管理_PRD.md` v1.0 ＋ `Evomni_金物流串接規格_PRD.md` v1.0
> **Prototype：** #8（共 8 個後台頁面）
> **Downstream tools:** figma-generate-design · design:design-system · design:design-handoff · design:accessibility-review · design:design-critique

---

## Part 1 — Design Brief

### Product Vision

Evomni 串接設定中心解決了電商商家最頭痛的一個問題：面對 35 家金流/物流廠商各自不同的申請流程、API 憑證格式、沙箱環境，商家不知道從何設定、出錯後難以排查。串接設定中心以「統一心智模型」解決這個問題——無論哪家廠商，商家都走同一套操作邏輯：看到廠商 → 填憑證 → 測試連線 → 啟用。系統依廠商類型（全自動/設定即用/半人工/人工處理）自動調整顯示哪些設定步驟，讓商家不需要打電話給客服，就能完成所有金物流串接並開始收款。

### Target User

**Primary：** 電商後台管理員（商家店長或技術負責人），需要一次性完成金物流串接設定，之後偶爾回來排查付款異常或調整廠商；具備基本的後台操作能力，但不一定有 API 技術背景。

**Secondary：** 物流作業人員，主要使用「人工處理廠商頁」的手動追蹤號上傳功能，無技術背景。

### Design Goals

| # | Goal | How to test |
|---|---|---|
| 1 | 管理員能在 5 分鐘內完成一家全自動廠商（如綠界）的憑證設定、連線測試、啟用全程，無需查閱說明文件 | 計時可用性測試，目標 < 5 分鐘 |
| 2 | 管理員能一眼看出哪些廠商「連線異常」，並點擊進入確認錯誤原因 | 觀察受測者是否能在 30 秒內指出異常廠商 |
| 3 | 操作員（非管理員）進入串接設定頁時，看到鎖定提示並理解自己沒有編輯權限 | 觀察受測者是否嘗試點擊 Disabled 按鈕 |
| 4 | 物流作業人員能在「手動追蹤號上傳」頁面，不需要說明就能找到待處理的訂單並填入追蹤號 | 計時可用性測試，目標 < 2 分鐘 |
| 5 | 「測試模式」與「正式模式」的視覺差異讓商家不會在測試期間誤以為已正式收款 | 問受測者「現在的設定是測試還是正式？」，答對率 > 95% |

### Design Principles

1. **統一心智模型 > 廠商差異性** — 35 家廠商各有不同，但進入任何廠商頁面，商家都應感覺在做同一件事。Template 化設計，廠商差異藏在資料層，不影響操作流程。
2. **Destructive actions 明顯警示** — 切換至正式模式、確認出貨（不可逆）、刪除 SKU 對照等操作，必須有顯眼的確認機制。
3. **錯誤可自救** — 連線測試失敗必須顯示具體錯誤代碼與解決建議，讓管理員自行排查，不依賴客服。
4. **權限鎖清晰** — 操作員看到的是明確鎖定提示，不是無效的灰色按鈕。進階方案限定功能顯示升級 CTA，不是消失。

### Design System Reference

- **Figma Library：** Evomni Admin Design System（沿用產品中心 Prototype 已建立之 Token）
- **Component framework：** Element Plus 視覺語言（實作為純 React）
- **Icon set：** Element Plus Icons
- **Font：** Noto Sans TC（400 / 500 / 600 / 700）

### Accessibility Requirements

- **Target WCAG level：** AA
- **Known constraints：**
  - Secret / Key 欄位預設遮罩，但必須提供「顯示/隱藏」切換（鍵盤可操作）
  - 廠商狀態 Badge 不能只靠顏色傳達，需搭配文字標籤
  - 連線測試結果 Alert 需加入 ARIA role="alert" 讓 screen reader 讀取
  - Tab 列需支援鍵盤導航（Arrow keys）

### Hard Constraints

- ⚠️ 本模組為**後台管理介面**，不含任何消費者前台付款流程頁面
- ⚠️ 所有 Secret / HashKey / HashIV 欄位在 API 回傳時永遠遮罩，UI 不得顯示明文
- ⚠️ 連線測試速率限制：同一廠商限 5 次/分鐘，超過顯示錯誤提示，不得靜默失敗
- ⚠️ 「操作員」角色無法進行編輯，但可以查看狀態（唯讀）
- ⚠️ 電子發票（ezPay）規格未定（議題 #3），本期 Prototype 僅展示綠界電子發票設定

### Out of Scope

- 消費者前台結帳付款 UI
- 運費規則設定（已由 Prototype #2 產品中心涵蓋溫層/重量運費）
- ezPay 電子發票設定（議題 #3 未定案，預留介面不實作）
- AFTEE 商家申請審核流程（系統外流程，僅在 Info Box 說明）
- 行動版（手機）RWD 適配（後台管理功能，桌機優先）

---

## Part 2 — Screen Index

| # | Screen 名稱 | Navigation 路徑 | Primary User Goal |
|---|---|---|---|
| 1 | 串接設定中心（Hub 總覽） | 全域設定 → 金物流串接 | 一覽所有廠商啟用狀態，快速定位並進入廠商設定 |
| 2 | 全自動廠商設定頁 | Hub → 點擊廠商 Card | 填入 API 憑證、測試連線、啟用廠商 |
| 3 | 設定即用廠商設定頁（銀行金流） | Hub → 點擊銀行廠商 Card | 依申請流程指引完成銀行申請、填入憑證、啟用 |
| 4 | 人工處理廠商設定頁（聖喆國際） | Hub → 物流 Tab → 聖喆國際 Card | 啟用廠商、手動上傳物流追蹤號 |
| 5 | 半人工廠商設定頁（倉儲物流） | Hub → 物流 Tab → BOXFUL/ECFIT Card | 填憑證、設定 SKU 對照表、啟用 |
| 6 | 電子發票設定 | 全域設定 → 金物流串接 → 電子發票設定 Tab | 設定自動開立發票的綠界帳號與規則 |
| 7 | Webhook 管理 | 全域設定 → 金物流串接 → Webhook 管理 | 查詢 Webhook 記錄、排查付款通知失敗問題 |
| 8 | 定期定額設定（進階方案） | Hub → 第三方金流 Tab → 綠界定期定額 Card | 設定循環扣款週期與失敗處理規則 |

---

## Part 3 — Per-Screen UX Spec

---

### Screen 1：串接設定中心（Hub 總覽）

**Purpose：** 以 Tab 分類顯示全部 35 家金物流廠商的啟用狀態 Card Grid，讓管理員一眼掌握串接健康度並快速進入廠商設定。
**Entry points：** 側邊欄「全域設定」→「金物流串接」
**Primary user goal：** 一眼看出哪些廠商已啟用/異常，點擊進入設定

#### Information Hierarchy

```
H1 (most prominent): 串接設定
說明文字: 管理您的金流與物流串接廠商，啟用後即可在結帳流程中使用。
Tab 列 (H2): 銀行金流（N）/ 第三方金流（N）/ 第三方物流（N）
搜尋欄: 搜尋廠商名稱
Primary CTA（每個 Card）: 設定
Supporting info: 廠商 Card Grid（Logo / 名稱 / 類型 Tag / 狀態 Badge）
```

#### Actual Copy

**Page / Section Headings**
- Page title: `串接設定`
- Breadcrumb: `全域設定 / 金物流串接`
- 說明文字: `管理您的金流與物流串接廠商，啟用後即可在結帳流程中使用。`

**Tab 標籤（含已啟用數量 Badge）**
- Tab 1: `銀行金流`（已啟用 N 家時顯示 `銀行金流 3`）
- Tab 2: `第三方金流`（預設選中 Tab）
- Tab 3: `第三方物流`

**Button Labels**
- 廠商 Card CTA: `設定`
- 權限不足時: `🔒 需管理員權限`（Disabled）

**搜尋欄**
- Placeholder: `搜尋廠商名稱`

**廠商類型 Tag 標籤**
- `🤖 全自動`（藍色 Pill）
- `🔧 設定即用`（藍色 Pill）
- `🤝 半人工`（橙色 Pill）
- `👤 人工處理`（灰色 Pill）

**狀態 Badge 文字**

| 狀態 | Badge 文字 | 顏色 |
|---|---|---|
| 未設定 | 未設定 | 灰 `#909399` |
| 設定中 | 設定中 | 橙 `#E6A23C` |
| 已啟用 | 已啟用 | 綠 `#67C23A` |
| 已停用 | 已停用 | 灰 `#909399` |
| 連線異常 | 連線異常 | 紅 `#F56C6C` |

**Empty State — Tab 無任何廠商**
- Headline: `尚未設定任何物流串接`
- Subtext: `點擊廠商卡片開始設定，啟用後消費者可在結帳時選擇對應的物流方式。`
- CTA label: （無，說明文字引導至 Card）

**空搜尋結果**
- Headline: `找不到符合「[關鍵字]」的廠商`
- Subtext: `請確認廠商名稱後再搜尋。`
- CTA label: `清除搜尋`

**Error States**

| Error condition | Message shown to user |
|---|---|
| 頁面載入失敗 | `無法載入廠商狀態，請重新整理頁面。` |
| 權限不足（操作員角色）Toast | `您沒有修改串接設定的權限，請聯繫帳號擁有者。` |

**Loading State**
- Card Grid 顯示 Skeleton（灰色方塊，動態 shimmer）

**Hover State（連線異常 Card）**
- Tooltip: `最近一次連線失敗：[錯誤代碼] — [時間]`

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Tab 列 | 3 個 Tab；Active 下方藍色底線 `#409EFF`；Tab 標籤含已啟用數量 | 切換顯示對應廠商 Card Grid |
| 搜尋欄 | `<el-input>` Placeholder「搜尋廠商名稱」；即時過濾 | 輸入後 300ms debounce 過濾 Card |
| 廠商 Card | 白底；4 欄 Grid；含 Logo（40×40px）/ 廠商名稱 / 類型 Tag / 狀態 Badge / 設定按鈕 | Hover：box-shadow；整個 Card 可點擊 |
| 廠商 Logo 容器 | 40×40px；灰底 `#F5F7FA`；padding 8px | 統一 Logo 尺寸 |
| 廠商類型 Tag | 圓角 Pill；依類型不同顏色（全自動/設定即用/半人工/人工處理）| 純顯示 |
| 狀態 Badge | 圓點 + 文字；5 種狀態對應顏色 | 連線異常時 Hover 顯示 Tooltip |
| 設定按鈕 | `<el-button size="small" class="!rounded-none">`；Primary Black；操作員角色 Disabled | 點擊 → 進入 Screen 2/3/4/5（依廠商類型） |
| 連線異常 Card 頂部紅線 | 4px 高紅色線條；Card 頂部 | 純顯示 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 正常載入，有廠商資料 | 完整 Card Grid |
| Loading | 進入頁面 | Card Grid Skeleton |
| Empty Tab | 某類別完全無廠商（不應發生，為保護態） | 中央 Empty State |
| 搜尋無結果 | 搜尋關鍵字無符合廠商 | 搜尋無結果空狀態 |
| 操作員角色 | 登入者角色為「操作員」| Card 內「設定」按鈕全部 Disabled，顯示 🔒 圖示 |
| 連線異常廠商 | 廠商最後一次 Webhook 或連線測試失敗 | Card 頂部紅色細線，狀態 Badge 為紅色「連線異常」 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊廠商 Card 的「設定」（全自動廠商）| 進入 Screen 2 |
| 點擊廠商 Card 的「設定」（設定即用/銀行）| 進入 Screen 3 |
| 點擊廠商 Card 的「設定」（人工處理/聖喆國際）| 進入 Screen 4 |
| 點擊廠商 Card 的「設定」（半人工/BOXFUL）| 進入 Screen 5 |
| 切換 Tab | 過濾 Card Grid 顯示對應類別 |
| 搜尋廠商 | 即時過濾 Card（跨 Tab 搜尋）|
| Hover 連線異常 Card | 顯示 Tooltip（最後失敗時間與代碼）|

---

### Screen 2：全自動廠商設定頁

**Purpose：** 讓商家填入全自動廠商（綠界、藍新、LINE Pay、AFTEE 等）的 API 憑證、選擇啟用的付款方式、切換測試/正式模式、複製 Webhook URL、執行連線測試，最後啟用串接。
**Entry points：** Hub 總覽 → 全自動廠商 Card 點擊「設定」
**Primary user goal：** 填入正確憑證，通過連線測試後啟用廠商

> 📌 假設：以「綠界科技」作為全自動廠商頁的代表性示範廠商，頁面所有 Copy 以綠界為例。其他廠商填入不同欄位名稱但介面結構相同。

#### Information Hierarchy

```
H1: [廠商 Logo + 名稱]  綠界科技（ECPay）
類型 Tag + 狀態 Badge: 🤖 全自動 ｜ 未設定
右上角啟用 Toggle: 啟用串接
Tab Bar（若廠商有子功能）: 基本設定 / 付款方式 / Webhook
區塊一: 廠商資訊（申請連結、技術文件）
區塊二: API 憑證設定（主要操作區域）
區塊三: 測試/正式模式切換
區塊四: Webhook 設定
區塊五: 連線測試
底部固定 Bar: 取消 / 儲存設定
```

> 📌 假設：全自動廠商設定頁採單頁捲動（非 Tab Bar）形式，因區塊數量為 5，使用 Section Heading 區分較適合。僅在廠商有多個獨立子功能（如綠界有金流+物流+定期定額三個獨立服務）時，各自有各自的獨立設定頁，透過 Hub 分別進入。

#### Actual Copy

**Page / Section Headings**
- Breadcrumb: `串接設定 / 綠界科技（ECPay）`
- Section 1: `廠商資訊`（Collapse，預設展開）
- Section 2: `API 憑證設定`
- Section 3: `測試 / 正式模式`
- Section 4: `Webhook 設定`
- Section 5: `連線測試`

**Button Labels**
- 啟用 Toggle Label: `啟用串接`
- 廠商申請連結: `前往綠界科技申請商家帳號`（外部連結，開新視窗）
- 技術文件連結: `查看 API 串接文件`（外部連結，開新視窗）
- 複製 Webhook URL: `複製`
- 連線測試: `測試連線`
- 底部取消: `取消`
- 底部儲存: `儲存設定`
- 正式模式確認 Dialog 確認: `確認切換`（紅色）
- 正式模式確認 Dialog 取消: `取消`

**測試/正式模式選項文字**
- 選項一: `🧪 測試模式（沙箱）`
- 選項二: `🚀 正式模式（Live）`
- 測試模式說明: `不會真實扣款，適合驗證憑證與付款流程`
- 正式模式說明: `實際收款，確認所有設定正確後再啟用`

**測試模式 Warning Banner**
- `目前為沙箱測試環境，所有交易不會進行實際收款。`

**切換至正式模式確認 Dialog**
- 標題: `確認切換至正式模式`
- 內文: `切換後，所有新訂單的付款將進行真實扣款。請確認您已完成測試並取得正式環境的 API 憑證。`

**Webhook 區塊說明**
- `請將以下 URL 複製至綠界科技後台的「通知網址（ReturnURL）」欄位，系統將透過此網址接收付款結果通知。`
- 複製成功 Toast: `已複製到剪貼簿 ✓`

**啟用前提示（未填憑證時）**
- `請先填入 API 憑證後才能測試連線`

**特殊廠商資訊 Banner（AFTEE）**
- `AFTEE 先享後付需先向廠商申請審核，審核通過（約 1-3 工作天）後廠商將寄送 API Token。`

**特殊廠商資訊 Banner（LINE Pay）**
- `LINE Pay 採兩段式授權，消費者點擊付款後需跳轉至 LINE 確認畫面才完成付款。`

**停用時全頁提示**
- 頁面內容降低 opacity 0.6；頂部顯示灰色 Banner: `此廠商目前已停用，設定更動儲存後需重新啟用才會生效。`

**Form Fields — API 憑證（以綠界為例）**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 特店編號（MerchantID）| 請輸入特店編號 | 向綠界申請後取得，格式為英數字最多 10 碼 | `特店編號不能為空` |
| HashKey | 請輸入 HashKey | 儲存後顯示遮罩，右側可切換顯示 | `HashKey 不能為空` |
| HashIV | 請輸入 HashIV | 儲存後顯示遮罩，右側可切換顯示 | `HashIV 不能為空` |
| ATM 繳費期限（天）| — | 消費者需在此天數內完成 ATM 轉帳，超過自動取消（1–60 天） | `請輸入 1 至 60 的整數` |

**啟用付款方式 Checkbox 選項（綠界）**
- 信用卡一次付清
- 信用卡分期（3/6/12 期）
- ATM 虛擬帳號
- 超商代碼
- 超商條碼

**Error States**

| Error condition | Message shown to user |
|---|---|
| 儲存失敗 | `設定儲存失敗，請重新整理頁面後再試。` |
| 憑證欄位格式錯誤 | `格式不符，請確認是否完整複製自廠商後台` |
| 離頁未儲存 Dialog | `您有未儲存的設定，確認要離開嗎？` |

**連線測試結果**

| 結果 | 顯示訊息 |
|---|---|
| 測試中 | `測試中…`（按鈕 Loading 狀態）|
| 成功 | `連線成功！廠商 API 回應正常，憑證驗證通過。`（綠色 Alert） |
| 憑證格式錯誤 | `連線失敗：API 金鑰格式不符，請確認是否完整複製自廠商後台。`（紅色 Alert）|
| 憑證驗證失敗 | `連線失敗：商店代號或金鑰錯誤（401），請確認填入正確的憑證。`（紅色 Alert）|
| 連線逾時 | `連線失敗：無法連線至廠商伺服器（逾時），請稍後再試或確認廠商服務狀態。`（紅色 Alert）|
| 沙箱憑證用於正式模式 | `連線失敗：偵測到沙箱憑證，請切換至「測試模式」後再測試，或取得正式環境憑證。`（紅色 Alert）|
| 速率限制 | `測試過於頻繁，請稍後再試。`（Toast）|

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存成功 | `設定已儲存 ✓` |
| 複製 Webhook URL | `已複製到剪貼簿 ✓` |
| 啟用廠商成功 | `綠界科技已啟用，消費者結帳時將顯示此付款方式。` |
| 停用廠商成功 | `綠界科技已停用。` |
| 憑證未填時嘗試啟用 | `請先填入 API 憑證後才能啟用。` |

**底部固定 Bar**
- 左側文字: `上次儲存時間：[時間戳]`（`#909399`，12px）

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 頁面 Header | Logo（64×64px）+ 廠商名稱 + 類型 Tag + 狀態 Badge；右側「啟用串接」Switch | Switch OFF → 頁面降彩度 opacity 0.6 |
| 啟用 Switch | `<el-switch>` | 啟用時檢查憑證是否已填，未填 → Toast 警示 |
| Section Collapse（廠商資訊）| `<el-collapse>`；預設展開 | 點擊標題收合/展開 |
| 外部連結按鈕 | `<el-link type="primary">` 開新視窗 | — |
| API 憑證欄位（Secret）| `<el-input>` type="password"；右側眼睛 icon 切換顯示 | 顯示/隱藏明文 |
| 啟用付款方式 Checkbox Group | `<el-checkbox-group>` 多選 | 至少需勾選一種才可儲存 |
| 測試/正式模式 Radio | 大按鈕樣式 Radio Group（2 個選項）| 切換至「正式模式」→ 觸發確認 Dialog |
| 測試模式 Warning Banner | 橘黃色；`#FDF6EC` 背景；`#E6A23C` 文字 | 顯示於頁面頂部（測試模式時） |
| 切換模式確認 Dialog | 含正式說明文字 + 確認（紅色）/ 取消 | 取消 → 回到測試模式選項 |
| Webhook URL Input | `<el-input>` readonly；右側「複製」Button | 點擊複製 → Toast |
| 連線測試按鈕 | `<el-button class="!rounded-none">`；未填憑證時 Disabled | 點擊 → Loading → 顯示 Alert 結果 |
| 連線結果 Alert | `<el-alert>` type="success" 或 "error" | 僅顯示最近一次結果，重新測試後更新 |
| 底部固定 Bar | 固定於頁面底部；左側時間戳 + 右側按鈕組 | 有未儲存變更時「取消」顯示為「放棄變更」 |
| 離頁確認 Dialog | `<el-dialog>` 標準 | 確認離頁 / 繼續編輯 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 初次設定（空白憑證）| 廠商從未設定過 | 憑證欄位空白；測試模式為預設；連線測試 Disabled |
| 已填憑證未啟用 | 憑證已填，Toggle OFF | 連線測試可點擊；底部顯示「儲存設定」|
| 測試模式 | 測試/正式選擇「測試模式」| 頁面頂部顯示橘黃色 Warning Banner |
| 正式模式 | 測試/正式選擇「正式模式」| Warning Banner 消失；確認 Dialog 已通過 |
| 已啟用 | Toggle ON，憑證已儲存 | 狀態 Badge 顯示「已啟用」（綠色）|
| 已停用 | Toggle OFF（曾啟用過） | 全頁降彩度；頂部 Banner 提示已停用 |
| 連線異常 | 最後一次 Webhook 失敗 | 狀態 Badge「連線異常」（紅色）|
| Loading（儲存中）| 點擊「儲存設定」| 按鈕 Loading；頁面不可操作 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊啟用 Switch（有憑證）| 直接切換；若未測試連線 → Warning Dialog 詢問是否確認啟用 |
| 點擊啟用 Switch（無憑證）| Toast 錯誤提示，Switch 不切換 |
| 切換「正式模式」| 確認 Dialog 彈出；取消 → 回測試模式 |
| 點擊「測試連線」| Loading → 10 秒逾時 → 顯示 Alert 結果 |
| 點擊「複製」Webhook URL | 複製到剪貼簿；Toast |
| 點擊「取消」（有變更）| Dialog「您有未儲存的設定，確認要離開嗎？」|
| 點擊「前往綠界科技申請商家帳號」| 開新視窗跳至綠界官方頁面 |

#### Motion / Transition

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| 正式模式確認 Dialog 開啟 | Fade in + scale from 95% | 200ms | ease-out |
| 連線測試結果 Alert 出現 | Fade in | 150ms | ease-out |
| 測試模式 Banner 出現/消失 | Fade in/out | 200ms | ease-in-out |

---

### Screen 3：設定即用廠商設定頁（銀行金流）

**Purpose：** 讓商家依照申請流程 Stepper 完成銀行人工申請、填入核發的商店代碼，啟用串接。無連線測試（銀行無沙箱）。
**Entry points：** Hub 總覽 → 銀行金流 Tab → 廠商 Card 點擊「設定」
**Primary user goal：** 了解申請步驟，取得商店代碼後填入並啟用

> 📌 假設：以「永豐銀行（豐收款）」作為代表性示範廠商。

#### Information Hierarchy

```
H1: [廠商 Logo + 名稱] 永豐銀行（豐收款）
右上角啟用 Toggle: 啟用串接
區塊一（主視覺）: 申請流程指引 Stepper（4 步驟）
區塊二: 憑證設定表單
區塊三: Webhook 設定
說明提示: 此廠商不提供連線測試
底部固定 Bar: 取消 / 儲存設定
```

#### Actual Copy

**Page / Section Headings**
- Breadcrumb: `串接設定 / 永豐銀行（豐收款）`
- Section 1 標題: `申請流程指引`
- Section 2 標題: `憑證設定`
- Section 3 標題: `Webhook 設定`

**申請流程 Stepper（通用模板文字）**
- Step 1: `前往永豐銀行官網申請電商收款服務`（附按鈕「前往申請」→ 開新視窗）
- Step 2: `簽署合約，等待銀行審核（約 5–10 工作天）`
- Step 3: `取得商店代碼與 API 金鑰`（說明文字：「通常由銀行業務以 Email 傳送」）
- Step 4: `將商店代碼填入下方設定表單並儲存，完成後啟用`

**無沙箱說明（Info Alert）**
- `銀行金流不提供沙箱環境，請填入真實商店代碼後直接啟用。首次建議以小金額測試交易確認串接正確。`（橙色 Info Alert）

**啟用前 Warning**
- `此廠商不提供連線測試，啟用前請確認商店代號與金鑰正確。`

**萬事達（Mastercard）特殊說明 Card**
- 標題: `⚠️ 萬事達（Mastercard）不直接提供電商 API`
- 內文: `Mastercard 信用卡收款需透過您已串接的銀行或第三方金流廠商啟用。建議在以下廠商中啟用「信用卡」收款方式：綠界科技 → 信用卡 / 藍新科技 → 信用卡 / 各銀行金流 → 刷卡收款（已含 Mastercard 網路）`
- CTA: `前往設定綠界科技`（Secondary Button）

**元大銀行（支付寶）特殊說明 Card**
- 標題: `⚠️ 此功能需人工開通`
- 內文: `元大銀行支付寶台灣業務需透過 Evomni 客服申請，請聯繫 Evomni 業務團隊以開通此功能。`

**Form Fields — 銀行憑證（通用）**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 商店代號 | 請輸入銀行核發的商店代號 | 通常為 8–16 位英數字，由銀行業務 Email 通知 | `商店代號不能為空` |
| API 金鑰 | 請輸入 API 金鑰 | 儲存後顯示遮罩 | `API 金鑰不能為空` |
| 加密金鑰（如有）| 請輸入加密金鑰 | 部分銀行提供，無則留空 | — |

**Warning Toast（疑似假值）**
- `您填入的商店代號較短，請確認是否為完整的銀行核發代號。`（Warning，非阻擋）

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存成功 | `設定已儲存 ✓` |
| 啟用成功 | `永豐銀行已啟用，消費者結帳時將顯示此付款方式。` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 申請流程 Stepper | `<el-steps>` 垂直方向；4 步驟；全部預設「未完成」狀態 | 純顯示，商家自行追蹤進度 |
| 步驟「前往申請」外部連結按鈕 | `<el-link type="primary">` | 開新視窗 |
| 無沙箱 Info Alert | 橙色；`#FDF6EC` 背景 | 純顯示 |
| 憑證欄位（Secret）| 同 Screen 2，type="password" + 眼睛 icon | — |
| Webhook URL Input | readonly + 複製按鈕 | 同 Screen 2 |
| 啟用 Toggle Warning | Toggle 上方橙色小字提示 | 純顯示 |
| 底部固定 Bar | 同 Screen 2 | — |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 標準（可設定廠商）| 一般銀行金流廠商 | Stepper + 憑證表單 + Webhook |
| 特殊（Mastercard）| 進入 Mastercard 廠商頁 | 隱藏憑證表單；顯示說明 Card |
| 特殊（元大支付寶）| 進入元大廠商頁 | 隱藏憑證表單；顯示人工開通說明 Card |
| 已啟用 | Toggle ON | 狀態 Badge「已啟用」|

---

### Screen 4：人工處理廠商設定頁（聖喆國際）

**Purpose：** 為聖喆國際低溫宅配廠商提供啟用設定、作業流程說明，以及讓物流人員手動上傳物流追蹤號的工具頁。
**Entry points：** Hub 總覽 → 第三方物流 Tab → 低溫超取_聖喆國際 Card 點擊「設定」
**Primary user goal：** 管理員啟用廠商；物流人員找到待上傳追蹤號的訂單並填入

#### Information Hierarchy

```
H1: [廠商 Logo + 名稱] 低溫超取_聖喆國際
說明 Banner: 此廠商採人工協調出貨，系統不直接對接廠商 API
右上角啟用 Toggle: 啟用串接
Tab Bar（主要操作）: 廠商設定 / 手動追蹤號上傳
區塊一（廠商設定 Tab）: 作業流程 Timeline + 廠商聯絡資訊
區塊二（追蹤號 Tab）: 待上傳列表 / 已完成列表
```

#### Actual Copy

**Page / Section Headings**
- Breadcrumb: `串接設定 / 低溫超取_聖喆國際`
- 廠商說明 Banner: `此廠商採人工協調出貨，系統不直接對接廠商 API。`（橙色 Banner `#FEF0E6`）
- 啟用說明 Banner: `啟用後，結帳頁將顯示「低溫宅配（聖喆國際）」選項。訂單成立後，請依以下流程通知廠商出貨，並手動在系統填入物流追蹤號。`

**Tab Bar**
- Tab 1: `廠商設定`
- Tab 2: `手動追蹤號上傳`（有待上傳時顯示數字 Badge：`手動追蹤號上傳 (N)`）

**Tab 1 — 作業流程 Timeline 步驟**
- Step 1: `消費者下單完成`（Tag：`系統自動`，綠色）
- Step 2: `物流人員聯繫聖喆國際確認取件`（Tag：`人工`，橙色）
- Step 3: `廠商出貨，取得冷鏈追蹤單號`（Tag：`人工`，橙色）
- Step 4: `在本系統填入追蹤號（見右側「手動追蹤號上傳」Tab）`（Tag：`人工`，橙色）
- Step 5: `系統自動發送「您的訂單已出貨」通知給消費者`（Tag：`系統自動`，綠色）

**廠商聯絡資訊 Card**
- 廠商名稱: `聖喆國際股份有限公司`
- 服務電話: `（待填入廠商實際電話）`
- 服務信箱: `（待填入廠商實際 Email）`
- 服務時間: `週一至週五 09:00–18:00`
- 備註欄 Label: `自訂備註（如：業務聯絡人姓名）`

**Tab 2 — 手動追蹤號上傳**
- 子 Tab 1: `待上傳追蹤號 (N)`
- 子 Tab 2: `已完成`
- 超時提示: `⚠️ 已超過 48 小時`（追蹤號欄位旁，橙色文字）
- 追蹤號欄位 Placeholder: `輸入追蹤號`

**確認出貨 Dialog**
- 標題: `⚠️ 此操作不可逆`
- 內文: `確認上傳追蹤號 [號碼] 並發送出貨通知給消費者 [姓名]？出貨通知一旦寄出即無法撤回。`
- 確認按鈕: `確認出貨`（Primary）
- 取消按鈕: `取消`

**批次上傳追蹤號**
- 按鈕: `批次輸入追蹤號`
- 支援格式: `Excel / CSV，格式：訂單號, 追蹤號`

**Empty State — 待上傳 Tab（無待處理）**
- Headline: `目前沒有待上傳追蹤號的訂單`
- Subtext: `所有訂單的追蹤號均已上傳，或目前無使用聖喆國際的訂單。`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 確認出貨成功 | `出貨通知已發送 ✓，訂單移至「已完成」` |
| 啟用成功 | `低溫超取_聖喆國際已啟用，結帳頁將顯示此物流選項。` |

**超時列視覺**
- 行背景: `#FEF0F0`（淡紅）；追蹤號欄位旁顯示 `⚠️ 已超過 48 小時`

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 廠商說明 Banner | 橙色背景；含說明文字 | 純顯示 |
| Tab Bar | 廠商設定 / 手動追蹤號上傳；後者有待上傳數字 Badge | 切換顯示對應內容 |
| 作業流程 Timeline | `<el-timeline>`；5 步驟；含「系統自動/人工」Tag | 純顯示 |
| 廠商聯絡資訊 Card | 白底；欄位：名稱/電話/信箱/服務時間/備註 | 備註欄可編輯 |
| 待上傳 Table | 欄位：訂單號/消費者姓名/產品摘要/付款時間/追蹤號欄位/操作 | 追蹤號欄位為 Inline Input |
| 追蹤號 Inline Input | `<el-input>` Placeholder「輸入追蹤號」；填入後出現「確認出貨」按鈕 | — |
| 確認出貨按鈕 | 每列獨立；Primary 藍色 | 開啟確認 Dialog |
| 確認出貨 Dialog | 含「⚠️ 此操作不可逆」警示 | 確認後移至「已完成」Tab |
| 批次上傳按鈕 | Secondary Button | 開啟 CSV/Excel 批次上傳 Dialog |
| 超時列警示 | 整列淡紅背景 + ⚠️ 文字 | 純顯示，不阻擋操作 |
| 子 Tab（待上傳/已完成）| 兩個子 Tab | 切換 Table 內容 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 廠商設定 Tab（預設）| 進入頁面 | Timeline + 聯絡資訊 Card |
| 追蹤號 Tab — 有待上傳 | 有使用聖喆國際的訂單未上傳 | Table 顯示待處理訂單 |
| 追蹤號 Tab — 無待上傳 | 無待處理訂單 | Empty State |
| 超時訂單 | 訂單超過 48 小時未上傳 | 整列淡紅背景 + 警示文字 |
| 確認出貨 Dialog | 點擊確認出貨 | Dialog 覆蓋頁面 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 切換至「手動追蹤號上傳」Tab | 顯示待上傳訂單列表 |
| 輸入追蹤號（任一訂單列）| 該列出現「確認出貨」按鈕 |
| 點擊「確認出貨」| 開啟確認 Dialog（含「⚠️ 此操作不可逆」警示） |
| 確認 Dialog「確認出貨」| 成功後移至「已完成」Tab；Toast |
| 點擊「批次輸入追蹤號」| 開啟批次上傳 Dialog（支援 CSV/Excel）|

---

### Screen 5：半人工廠商設定頁（倉儲物流）

**Purpose：** 讓商家填入 BOXFUL / ECFIT 倉儲 API 憑證、設定本系統 SKU ↔ 倉儲 SKU 對照表，並了解半人工出貨流程。
**Entry points：** Hub 總覽 → 第三方物流 Tab → BOXFUL / ECFIT Card 點擊「設定」（進階方案）
**Primary user goal：** 填入 API 憑證、建立 SKU 對照表後啟用倉儲物流

> 📌 假設：以「BOXFUL 任意存」作為代表示範廠商。

#### Information Hierarchy

```
H1: [Logo + 名稱] 倉儲物流_BOXFUL 任意存
進階方案 Banner（啟航方案）: 升級提示
右上角啟用 Toggle: 啟用串接
區塊一: API 憑證設定（含連線測試）
區塊二: 倉庫資訊設定
區塊三: SKU 對照表管理（主要操作區）
區塊四: 出貨確認流程 Timeline
區塊五: 追蹤號手動補填（Collapse，例外情況）
```

#### Actual Copy

**Page / Section Headings**
- Breadcrumb: `串接設定 / 倉儲物流_BOXFUL 任意存`
- Section 1: `API 憑證設定`
- Section 2: `倉庫資訊`
- Section 3: `SKU 對照表`
- Section 4: `出貨流程說明`
- Section 5: `追蹤號手動補填`（Collapse 標題，預設收合）

**進階方案鎖定 Banner（啟航方案商家）**
- `此功能為進階電商包專屬。🔒 升級後即可啟用倉儲物流串接。`
- CTA: `了解升級方案`（Secondary Button）

**SKU 對照表說明文字**
- `請將本系統的產品 SKU 對應至倉儲廠商的 SKU，以便下單時系統正確通知倉庫揀貨。`

**SKU 對照表 Warning Banner（有未對照 SKU）**
- `有 [N] 個產品 SKU 尚未對照，訂單出貨時可能發生揀貨異常。`
- CTA: `前往設定`（內頁錨點跳轉至 SKU 表格，並反白未對照行）

**出貨流程 Timeline 文字（半人工版）**
- Step 1: `消費者下單完成`（Tag：`系統自動`）
- Step 2: `系統推送訂單至 BOXFUL API`（Tag：`系統自動`）
- Step 3: `倉庫備貨、出貨`（Tag：`廠商作業`，藍色）
- Step 4: `廠商回呼物流追蹤號至本系統`（Tag：`系統自動`）
- Step 5: `系統發送出貨通知至消費者`（Tag：`系統自動`）
- Step 6（例外）: `若廠商未回呼，可至「追蹤號補填」手動處理`（Tag：`人工補救`，橙色）

**SKU 對照表空狀態提示**
- 啟用時旁邊 Warning: `SKU 對照表為空，啟用後可能無法正確通知倉庫出貨。確定要繼續啟用嗎？`

**Form Fields — 倉庫資訊**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 倉庫代碼 | 向廠商取得倉庫代碼 | BOXFUL 倉庫代碼由廠商提供，格式為英數字 | `倉庫代碼不能為空` |
| 預設出貨倉 | 請選擇預設出貨倉 | 多倉庫時可設定預設倉 | — |

**SKU 對照表欄位**
- 欄位：本系統 SKU / 產品名稱（自動帶入）/ 倉儲廠商 SKU / 最後更新時間 / 操作（編輯/刪除）

**CSV 匯入格式說明**
- `格式：系統SKU,倉儲SKU（每行一組）`
- 按鈕: `下載 CSV 模板`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 新增 SKU 對照成功 | `SKU 對照已新增` |
| 批次匯入成功 | `成功匯入 N 筆 SKU 對照` |
| CSV 格式錯誤 | `CSV 格式錯誤：第 [N] 行欄位數不符，請修正後重新上傳。` |
| SKU 不存在 | `找不到此 SKU，請確認產品中心是否已建立此產品。` |
| 啟用（SKU 表空）Warning Dialog | `SKU 對照表為空，出貨可能異常，確定繼續啟用？` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 進階方案 Banner | 含升級 CTA；啟航方案才顯示；進階方案隱藏 | 點 CTA → 跳至方案管理頁 |
| API 憑證設定（同 Screen 2）| — | 含連線測試功能 |
| 倉庫代碼 Input | `<el-input>` | — |
| 預設出貨倉 Select | `<el-select>` 單選；連線成功後動態載入倉庫列表 | — |
| SKU 對照表 Table | 欄位如上；支援行內編輯 | 編輯按鈕 → 行展開為 Input |
| 新增對照按鈕 | `<el-button>` + 圖示 | 新增空白行 |
| 批次匯入按鈕 | `<el-button>` | 開啟 CSV 上傳 Dialog |
| 下載模板連結 | `<el-link>` | 下載 CSV 範本檔 |
| SKU Warning Banner | 橙色；含數量與「前往設定」CTA | — |
| 出貨流程 Timeline | 同 Screen 4 Timeline 但為半人工版本；含「廠商作業」Tag | 純顯示 |
| 追蹤號補填 Collapse | `<el-collapse>` 預設收合；例外情況才展開 | 同 Screen 4 追蹤號功能 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 啟航方案（鎖定）| 商家為電商啟航方案 | 整頁頂部顯示進階方案 Banner；設定區塊 Disabled |
| 進階方案 — 初始設定 | 初次進入，無憑證 | 同 Screen 2 空白狀態 |
| 有未對照 SKU | `N 個 SKU 尚未對照` | SKU 表格頂部 Warning Banner |
| SKU 表為空啟用 | 啟用 Toggle 時 SKU 表空 | Warning Dialog 確認 |

---

### Screen 6：電子發票設定

**Purpose：** 設定電子發票自動開立的綠界帳號、開立時機與捐贈碼。
**Entry points：** 全域設定 → 金物流串接 → 電子發票設定 Tab
**Primary user goal：** 設定並啟用電子發票自動開立，確保每筆訂單付款後自動開立發票

#### Information Hierarchy

```
H1: 電子發票設定
Tab Bar: 綠界科技電子發票 / ezPay 電子發票（鎖定）
說明文字: 電子發票相關說明
區塊一: 基本設定（啟用開關、憑證）
區塊二: 開立規則設定
底部固定 Bar: 儲存設定
```

#### Actual Copy

**Page / Section Headings**
- Page title: `電子發票設定`
- Breadcrumb: `全域設定 / 金物流串接 / 電子發票設定`
- Tab 1: `綠界科技`
- Tab 2: `ezPay`（含 Tag「規格確認中」，灰色 Disabled 狀態）
- Section 1: `帳號與憑證`
- Section 2: `開立規則`
- Section 3: `捐贈設定`

**ezPay Tab 鎖定說明**
- `ezPay 電子發票加費方案規格尚在確認中，開放時將通知您。`

**啟用說明**
- 啟用 Switch Label: `啟用電子發票自動開立`
- 說明文字: `啟用後，每筆訂單付款成功時系統自動呼叫綠界電子發票 API 開立發票，消費者將收到發票通知。`

**Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| MerchantID（發票帳號）| 請輸入綠界特店編號 | 可使用金流帳號同一組，或向綠界申請獨立發票帳號 | `特店編號不能為空` |
| HashKey | 請輸入 HashKey | — | `HashKey 不能為空` |
| HashIV | 請輸入 HashIV | — | `HashIV 不能為空` |
| 環境 | — | — | — |
| 捐贈碼 | 請輸入愛心碼（選填） | 消費者選擇捐贈發票時，預設捐贈至此愛心碼；留空則消費者自行輸入 | `請輸入有效的愛心碼格式` |

**開立時機選項**
- 選項一: `付款成功立即開立（推薦）`
- 選項二: `商家手動觸發開立`

**貨到付款開立時機選項**
- 選項一: `訂單狀態更新為「已送達」後自動開立`
- 選項二: `商家手動開立`

**環境選項**
- 選項一: `測試環境`
- 選項二: `正式環境`

**Error States**

| Error condition | Message shown to user |
|---|---|
| 儲存失敗 | `設定儲存失敗，請重新整理頁面後再試。` |
| 金流帳號未啟用提示 | `提醒：電子發票使用的綠界帳號需與已啟用的綠界金流帳號相同，或確認此帳號已在綠界開通電子發票服務。` |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存成功 | `電子發票設定已儲存 ✓` |
| 啟用成功 | `電子發票自動開立已啟用，後續訂單付款成功後將自動開立發票。` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Tab Bar | 綠界科技（正常）/ ezPay（Disabled + 說明 Tag）| 切換 Tab；ezPay 無法互動 |
| 啟用 Switch | `<el-switch>` 搭配說明文字 | 開啟時啟動發票功能 |
| MerchantID Input | 標準文字輸入 | — |
| HashKey / HashIV Input | type="password" + 眼睛 icon | — |
| 環境 Radio | 測試 / 正式 | — |
| 開立時機 Radio Group | 兩個選項；付款成功立即 / 手動 | — |
| 貨到付款開立時機 Radio Group | 兩個選項 | — |
| 捐贈碼 Input | 選填；格式驗證 | — |
| 底部固定 Bar | 同 Screen 2 | — |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 未啟用 | Switch OFF | 開立規則設定區 Disabled |
| 已啟用 | Switch ON + 憑證填入 | 完整設定 |
| ezPay Tab | 點擊 ezPay Tab | 顯示「規格確認中」說明，其餘內容隱藏 |

---

### Screen 7：Webhook 管理

**Purpose：** 集中管理所有廠商的 Webhook URL，並提供 Webhook 請求記錄查詢供管理員排查付款通知失敗問題。
**Entry points：** 全域設定 → 金物流串接 → Webhook 管理（側邊欄或 Hub 頁導覽）
**Primary user goal：** 查詢失敗的 Webhook 記錄，找出付款通知異常的原因

#### Information Hierarchy

```
H1: Webhook 管理
Tab Bar: Webhook URL 清單 / 請求記錄 / 失敗通知設定
主要操作區（請求記錄 Tab）: 篩選 + Table（含失敗記錄紅色高亮）
```

#### Actual Copy

**Page / Section Headings**
- Page title: `Webhook 管理`
- Breadcrumb: `全域設定 / 金物流串接 / Webhook 管理`
- Tab 1: `Webhook URL 清單`
- Tab 2: `請求記錄`
- Tab 3: `失敗通知設定`
- 記錄保留說明: `Webhook 記錄保留最近 90 天，超過自動清除。`

**Tab 1 — Webhook URL 清單欄位說明**
- 欄位：廠商名稱 / 串接類型 / Webhook URL（可複製）/ 狀態（正常/異常）/ 最後收到請求時間
- 複製按鈕: `複製`（icon）
- 複製成功 Toast: `已複製到剪貼簿 ✓`

**Tab 2 — 篩選欄位**

| 篩選 | 元件 | 選項 |
|---|---|---|
| 廠商 | `<el-select>` 單選 | 全部 / 各廠商名稱 |
| 狀態 | `<el-select>` 單選 | 全部 / 成功 / 失敗 |
| 時間範圍 | `<el-date-picker>` daterange | — |

**Tab 2 — 請求記錄 Table 欄位**
- 欄位：時間 / 廠商 / 請求類型 / 狀態碼 / 訂單號 / 耗時（ms）/ 操作（查看詳情）
- 失敗列背景: `#FEF0F0`（淡紅）
- 狀態碼成功顯示: 綠色（200/201）
- 狀態碼失敗顯示: 紅色（400/500 等）

**查看詳情 Drawer 標題**: `Webhook 請求詳情`
**Drawer 內容欄位**
- Request Header（可展開）
- Request Body（截斷顯示前 1,000 字元；附「查看完整 Payload」連結）
- Response Body
- 耗時 / 廠商回應時間

**Tab 3 — 失敗通知設定**
- Switch Label: `啟用 Webhook 失敗時寄送 Email 通知`
- 通知信箱 Placeholder: `請輸入 Email，多個信箱請換行分隔`
- 觸發條件 Label: `連續失敗 N 次時通知`

**Empty State — 請求記錄（無記錄）**
- Headline: `尚無 Webhook 請求記錄`
- Subtext: `廠商發送 Webhook 通知後，記錄將顯示於此。若廠商已啟用但無記錄，請確認 Webhook URL 已正確填入廠商後台。`

**Error States**

| Error condition | Message shown to user |
|---|---|
| 記錄載入失敗 | `無法載入 Webhook 記錄，請重新整理頁面。` |
| 儲存失敗通知設定失敗 | `設定儲存失敗，請稍後再試。` |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 複製 URL | `已複製到剪貼簿 ✓` |
| 失敗通知設定儲存成功 | `通知設定已儲存 ✓` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Tab Bar | 3 個 Tab；請求記錄為預設 Tab | 切換內容 |
| URL 清單 Table | 含複製 icon 按鈕；狀態（正常綠色/異常紅色）| 複製按鈕 → Toast |
| 篩選列（請求記錄）| 廠商 Select + 狀態 Select + 日期範圍 | 任一篩選變更後立即觸發查詢 |
| 請求記錄 Table | 失敗列整行淡紅背景；狀態碼顏色區分 | 點「查看詳情」→ 開啟右側 Drawer |
| 詳情 Drawer | 右側滑入；寬度 600px；含 Header/Body/Response | 關閉 Drawer → 回列表 |
| Payload 截斷顯示 | 前 1,000 字元 + 「查看完整 Payload」 | 點擊展開顯示完整內容 |
| 失敗通知 Switch | `<el-switch>` | ON → 顯示 Email 輸入與觸發條件 |
| 失敗通知 Email Input | `<el-input>` type="textarea"；Enter 分隔 | — |
| 觸發次數 Input | `<el-input-number>` min=1 max=10 | — |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Tab 1（URL 清單）| 預設 | 廠商 Webhook URL 表格 |
| Tab 2（請求記錄）有記錄 | 有 Webhook 請求歷史 | Table 顯示記錄 |
| Tab 2（請求記錄）空 | 廠商剛設定無請求歷史 | Empty State |
| Tab 2 有失敗記錄 | 某些請求狀態碼非 200 | 失敗列淡紅背景 |
| Drawer 開啟 | 點擊「查看詳情」| 右側 Drawer 滑入 |
| Tab 3（失敗通知）| Switch ON | 顯示 Email + 次數設定 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 切換 Tab | 切換顯示對應內容 |
| 點擊「查看詳情」| 右側 Drawer 展開（Request + Response 詳情）|
| 點擊 URL 清單的「複製」| 複製到剪貼簿；Toast |
| 篩選廠商/狀態/日期 | 即時更新請求記錄 Table |

#### Motion / Transition

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| 詳情 Drawer 開啟/關閉 | Slide from right | 250ms | ease-in-out |

---

### Screen 8：定期定額設定（進階電商包）

**Purpose：** 設定綠界科技信用卡循環扣款的週期、扣款日、失敗處理規則，適合訂閱型產品。
**Entry points：** Hub 總覽 → 第三方金流 Tab → 綠界科技-定期定額 Card 點擊「設定」
**Primary user goal：** 設定循環扣款規則並啟用

#### Information Hierarchy

```
H1: 定期定額設定（綠界科技）
前提條件 Banner（若主版綠界未啟用）: 需先啟用綠界科技一般金流
啟用說明 Alert: 申請加值服務提醒
區塊一: 扣款規則設定
區塊二: 失敗處理設定
底部固定 Bar: 儲存設定
```

#### Actual Copy

**Page / Section Headings**
- Breadcrumb: `串接設定 / 綠界科技-定期定額扣款`
- Section 1: `扣款規則`
- Section 2: `付款失敗處理`

**前提條件 Banner（綠界一般版未啟用）**
- `🔒 此功能需先啟用「綠界科技」一般金流後才可設定。`
- CTA: `前往設定`（藍色文字連結）

**啟用前說明 Alert**（淡紅底）
- `啟用定期定額扣款前，請確認已向綠界科技申請「定期定額扣款」加值服務，此服務需額外向廠商申請且可能有附加費用。`

**進階方案鎖定 Banner（啟航方案）**
- `此功能為進階電商包專屬。🔒 升級後即可設定定期定額扣款。`
- CTA: `了解升級方案`

**Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 扣款週期 | — | 設定消費者訂閱後的扣款頻率 | — |
| 扣款日 | — | 選擇每期扣款日（1-28 日）；不提供 29-31 日以避免月份天數不一致 | — |
| 失敗重試次數 | — | 付款失敗後，系統將在 24 小時後自動重試，最多重試 N 次（0 = 不重試）| `請輸入 0–5 的整數` |

**扣款週期選項**: 每月 / 每季 / 每半年 / 每年
**扣款日 Tooltip**: `不提供 29–31 日，以確保每月均有對應的扣款日（2 月最多 28 天）。`

**失敗後處理方式選項**
- 選項一: `暫停訂閱`—— 保留訂單，等待消費者更新付款方式後繼續
- 選項二: `自動取消訂閱`—— 付款失敗後立即取消，無法復原

**選擇「自動取消訂閱」Warning**
- `選擇此選項後，消費者若付款失敗將自動取消訂閱，此操作無法復原，請謹慎選擇。`（淡黃色 Warning，浮現於選項右側）

**失敗通知 Checkbox**
- `付款失敗時，自動發送 Email 通知消費者更新付款方式`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存成功 | `定期定額設定已儲存 ✓` |
| 啟用成功 | `定期定額扣款已啟用，訂閱型產品可使用此付款方式。` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 前提條件 Banner | 灰色 Info Banner；含連結 | 點「前往設定」→ 跳至綠界科技設定頁 |
| 啟用說明 Alert | 淡紅背景 | 純顯示 |
| 進階方案 Banner | 含升級 CTA；啟航方案才顯示 | — |
| 扣款週期 Radio Group | 4 選項（每月/每季/每半年/每年）| — |
| 扣款日 Select | 1-28；Tooltip 說明為何不含 29-31 | — |
| 失敗重試次數 Number Input | min=0 max=5；Tooltip 說明 | — |
| 失敗後處理方式 Radio Group | 暫停訂閱 / 自動取消 | 選「自動取消」→ 顯示 Warning 文字 |
| 自動取消 Warning | 淡黃色 Info 文字；Right-side of Radio | 選「自動取消」時顯示 |
| 失敗通知 Checkbox | 附說明文字 | — |
| 底部固定 Bar | 同 Screen 2 | — |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 啟航方案（鎖定）| 商家為電商啟航方案 | 進階方案 Banner；設定區塊 Disabled |
| 前提條件未滿足 | 綠界一般版未啟用 | 前提條件 Banner；設定區塊 Disabled |
| 可設定 | 綠界已啟用，進階方案 | 完整表單 |
| 選擇「自動取消訂閱」| Radio 選擇自動取消 | 顯示 Warning 文字 |

---

## Part 4 — Cross-Screen Component Inventory

### Action Components

| 元件 | 變體 | 尺寸 | 狀態 |
|---|---|---|---|
| Button | Primary（黑色）/ Secondary（白框）/ Ghost（藍文字）/ Danger（紅色，正式模式確認）| Default / Small | Default / Hover / Active / Disabled / Loading |
| Switch | Default | — | On / Off / Disabled |
| Text Link（外部）| 藍色；右側開新視窗 icon | — | Default / Hover |
| Icon Button | 複製 icon / 眼睛 icon / 刪除 icon | — | Default / Hover |

### Display Components

| 元件 | 變體 | 資料欄位 | 狀態 |
|---|---|---|---|
| 廠商 Card | 標準 / 連線異常（紅頂條）/ 操作員鎖定 | Logo / 名稱 / 類型 Tag / 狀態 Badge / 設定按鈕 | Default / Hover（shadow）/ Disabled |
| Status Badge | 5 種（未設定/設定中/已啟用/已停用/連線異常）| 圓點 + 文字 | — |
| 廠商類型 Tag | 全自動（藍）/ 設定即用（藍）/ 半人工（橙）/ 人工處理（灰）| Pill 圓角 | — |
| 說明 Banner | Info（藍）/ Warning（橙）/ Danger（紅）/ 鎖定（灰）| 標題 + 說明 + 可選 CTA | — |
| 作業流程 Tag | 系統自動（綠）/ 人工（橙）/ 廠商作業（藍）/ 人工補救（橙）| 圓角小 Tag | — |
| 連線測試 Alert | Success（綠）/ Error（紅）| 含錯誤說明文字 | — |

### Input Components

| 元件 | 變體 | 狀態 |
|---|---|---|
| Text Input（一般）| Default / With icon | Default / Focus / Filled / Error / Disabled |
| Text Input（Secret）| type="password" + 眼睛 icon 切換 | Default / Focus / Filled（遮罩）/ Error |
| Number Input | min/max 各異 | Default / Focus / Error |
| Select（單選）| 含 Placeholder / 含 Tooltip | Default / Open / Selected / Disabled |
| Checkbox Group | 多選 | Default / Partial / All selected |
| Radio Group | 水平 / 垂直 / 大按鈕樣式（模式切換）| Default / Selected |
| Textarea | 帶字元計數 | Default / Focus / Error |
| Date Range Picker | — | Default / Open |

### Navigation Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Sidebar | Expanded（預設）| 含「全域設定 > 金物流串接」路徑 |
| Tab Bar（主）| 2–3 個 Tab；Active 底線藍色 | 用於 Hub 頁（3 tabs）、廠商頁（2 tabs）、Webhook 頁（3 tabs） |
| Breadcrumb | 2–3 層 | 頁面頂部 |
| 底部固定 Bar | 左側時間戳 + 右側按鈕組 | 設定頁固定於畫面底部 |

### Feedback Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Toast | Success（綠）/ Error（紅）/ Warning（橙）/ Info（藍）| 右上角出現，3 秒自動消失 |
| Dialog | 標準確認框 / 含 Textarea（離頁確認）/ 危險操作（紅色按鈕）| 背景 Overlay |
| Alert（Inline）| Success / Error / Info / Warning | 出現在頁面區塊內，有標題與說明 |
| Drawer | 右側滑入；寬度 480px（調整點數）/ 600px（Webhook 詳情）| — |
| Skeleton Loader | Card Grid / Table 列 | 灰色矩形 + shimmer 動效 |
| Empty State | 圖示 + Headline + Subtext + 可選 CTA | 居中對齊 |
| Tooltip | Hover 觸發；欄位說明 / Card 狀態詳情 | — |
| Stepper | 垂直；4 步驟；全部「未完成」狀態 | 銀行金流申請流程 |
| Timeline | 垂直；含類型 Tag | 人工/半人工廠商作業流程 |

---

## Part 5 — Design System Token Reference

| Decision | Token / Value |
|---|---|
| Primary brand colour | `#409EFF`（藍）|
| Success colour | `#67C23A`（綠）|
| Warning colour | `#E6A23C`（橙）|
| Danger colour | `#F56C6C`（紅）|
| Neutral | `#909399`（灰）|
| Page background | `#F2F3F5` |
| Card background | `#FFFFFF` |
| Border colour | `#DCDFE6` |
| Text primary | `#303133` |
| Text secondary | `#606266` |
| Text tertiary | `#909399` |
| Warning Banner background | `#FDF6EC` |
| Info Banner background（淡橙）| `#FEF0E6` |
| 失敗列 Table background | `#FEF0F0` |
| 超時列 Table background | `#FEF0F0` |
| Mastercard 說明 Card background | `#FDF6EC`（橙框）|
| 進階方案 Lock Banner background | `#EFF2F7` |
| Base font | Noto Sans TC（400 / 500 / 600 / 700）|
| Base font size | 14px |
| Border radius（Card）| 0px（方形）|
| Border radius（Tag / Badge）| 9999px（Pill）|
| Border radius（Alert）| 4px |
| Card Grid columns（桌機）| 4 欄 |
| Card Grid columns（平板）| 2 欄 |
| Spacing unit | 8px 倍數 |
| Drawer width（Webhook 詳情）| 600px |
| Fixed Bar height | 60px |
| 連線異常 Card 頂部紅線 | 4px |
| 廠商 Logo 容器 | 40×40px（Hub）/ 64×64px（設定頁）|

---

## Assumptions

> 📌 假設：Hub 總覽頁預設顯示「第三方金流」Tab（使用頻率最高），而非第一個「銀行金流」Tab。可依實際使用數據調整。

> 📌 假設：全自動廠商設定頁（Screen 2）採單頁捲動（5 個 Section），而非 Tab Bar。因所有 Section 屬於同一設定流程的不同步驟，捲動比 Tab 切換更直覺。若廠商有多個獨立服務（綠界金流/物流/定期定額），則各自有獨立設定頁，透過 Hub 分別進入。

> 📌 假設：電子發票設定（Screen 6）作為獨立 Tab 存在，而非嵌入在綠界科技廠商設定頁內。理由：電子發票是跨廠商的系統設定（不僅限於綠界），獨立 Tab 更合適；ezPay 未來開放後可新增第二個設定項目。

> 📌 假設：Webhook 管理（Screen 7）的「請求記錄」設為預設 Tab，因排查問題是最高頻使用情境。

> 📌 假設：半人工廠商設定頁（Screen 5）的「追蹤號手動補填」使用 `<el-collapse>` 預設收合，因此功能為例外情況（廠商未回呼時才用），不應占用視覺重量。

> ✏️ Copy 待確認：Screen 4 聖喆國際廠商聯絡資訊（服務電話與 Email）需填入真實資料。

> ✏️ Copy 待確認：Screen 8 定期定額「失敗重試次數」的 Tooltip——「付款失敗後，系統將在 24 小時後自動重試」——請確認重試間隔是否為 24 小時。

> ✏️ Copy 待確認：各銀行金流廠商的 Stepper 申請流程步驟文字是否需要各銀行個別客製化，或使用通用模板即可。
