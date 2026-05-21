# Evomni 溫層/重量運費設定 — Design Brief + UX Spec

> **Version:** 1.0  
> **Created:** 2026-05-14  
> **Source PRD:** `PRD/Evomni_Part2_溫層重量運費設定_PRD.md`  
> **Downstream tools:** figma-generate-design · design:design-system · design:design-handoff · design:accessibility-review · design:design-critique

---

## Part 1 — Design Brief

### Product Vision

溫層/重量運費設定模組讓 Evomni 電商後台的商家管理員能夠為生鮮食品（需冷藏/冷凍配送）和大型產品（依重量計費）設定精確的運費規則，並在消費者結帳時自動套用正確費率。這解決了食品類和重型產品商家長期面臨的痛點：實際收到的運費金額與物流成本不符。商家只需一次性設定費率表，系統便自動在每筆訂單結帳時選用正確規則，無需人工介入。

### Target User

**Primary:** 中小型電產品牌的後台管理者，需要設定溫層或重量運費規則以反映實際物流成本，並確保消費者結帳時看到正確金額。

**Secondary:** 消費者（前台購物車和結帳頁），需要清楚理解運費計算依據，以及混溫層產品的分批結帳建議。

### Design Goals

| # | Goal | How to test |
|---|---|---|
| 1 | 商家管理員可在 5 分鐘內完成溫層運費全套設定（啟用 + 三溫層費率 + 存檔），無需查閱說明文件 | 計時觀察任務完成時間；是否在 5 分鐘內成功儲存 |
| 2 | 商家管理員設定重量費率階梯時，不需要手動輸入每個階梯的最小值（系統自動帶入上一行的最大值）| 觀察是否發生輸入錯誤或商家困惑為何下限無法編輯 |
| 3 | 消費者在購物車頁看到混溫層警示時，能清楚理解為何運費較高，以及可以做什麼 | 問卷：請使用者以自己的話解釋 Warning Banner 的含義 |
| 4 | 消費者在結帳頁看到運費計算依據，無須點擊任何按鈕即可了解費用組成 | 觀察是否有消費者主動詢問客服「為什麼運費這麼高」|

### Design Principles

1. **自動化優先** — 凡是系統能幫商家算的，就不要讓商家手填。重量階梯的最小值自動帶入；結帳時自動選最高溫層；免運門檻自動比較。
2. **漸進揭露** — 未啟用溫層/重量運費時，相關欄位全部收起或 disabled，不增加視覺負擔。
3. **錯誤預防勝於錯誤提示** — 階梯範圍連續性、至少保留一個階梯等規則，在 UI 層即阻止商家填出無效費率表，而非儲存後才報錯。
4. **前台清晰溝通** — 消費者不應需要理解「溫層優先邏輯」或「重量費率計算」的技術細節；看到的訊息應直接告訴他們運費金額和原因。

### Design System Reference

- **Figma Library:** Evomni Design System（待確認是否已建立；若無，則 build from scratch）
- **Component framework:** Element Plus（el-form, el-input-number, el-radio-group, el-switch, el-table, el-collapse, el-alert, el-tooltip, el-tabs）
- **Icon set:** Element Plus Icons + 溫層符號（❄️ 冷凍、🌡️ 冷藏，需附帶文字標籤）
- **Font:** 依 Evomni 整體系統設定（TBD）

### Accessibility Requirements

- **Target WCAG level:** AA
- **Known constraints:**
  - 後台設定頁：Chrome 110+，桌機 1280px+，鍵盤導航需支援 Tab 鍵在表單欄位間正確切換
  - 前台結帳頁：RWD，支援 375px+ 手機螢幕
  - 所有顏色組合須通過 4.5:1 對比比率（包含警示橙色文字）
  - 溫層 icon 必須附帶可見文字標籤（不可只依賴 emoji，螢幕閱讀器需能讀出語義）

### Hard Constraints

- ⚠️ 本模組不包含物流商 API 接口設定（屬金物流串接規格）
- ⚠️ 已下單的訂單不受運費規則修改影響，訂單記錄當時運費，不重算
- ⚠️ 重量費率不支援離島以外的特殊地區個別設定（僅本島/離島兩種費率）
- ⚠️ 購物車頁不顯示具體運費金額（消費者選擇物流方式後才在結帳頁計算）

### Out of Scope

- 分拆購物車功能（前台「分拆購物車」按鈕 — 選填功能，本期可能不實作）
- 物流商 API 串接設定頁面
- 促銷折扣與運費互動邏輯（屬行銷模組）
- 後台訂單詳情的運費明細顯示

---

## Part 2 — Screen Index

| # | Screen Name | Navigation path | Primary user goal |
|---|---|---|---|
| 1 | 產品編輯頁 — 運送設定區塊 | 後台 → 產品中心 → 新增/編輯產品 → 運送設定區塊 | 為單一產品設定溫層屬性與重量 |
| 2 | 物流與運費設定 — 溫層運費規則 Tab | 後台 → 全域設定 → 金物流串接 → 物流與運費 → Tab「溫層運費規則」 | 設定全店冷藏/冷凍運費費率 |
| 3 | 物流與運費設定 — 重量運費規則 Tab | 後台 → 全域設定 → 金物流串接 → 物流與運費 → Tab「重量運費規則」 | 設定全店重量階梯費率 |
| 4 | 前台購物車 — 混溫層警示 Banner | 消費者前台 → 購物車頁面 | 了解混溫層對運費的影響 |
| 5 | 前台結帳頁 — 運費顯示區塊 | 消費者前台 → 結帳頁面 → 選擇物流後觸發計算 | 確認運費金額與計算依據 |

---

## Part 3 — Per-Screen UX Spec

---

### Screen 1: 產品編輯頁 — 運送設定區塊

**Purpose:** 商家管理員為單一產品設定溫層屬性（常溫/冷藏/冷凍）和產品重量，供系統在結帳時自動計算運費使用。  
**Entry points:** 後台 → 產品中心 → 點擊「新增產品」或點擊既有產品 → 產品編輯頁 → 捲動至「運送設定」區塊  
**Primary user goal:** 標記此產品需要冷藏/冷凍配送，並填寫重量供運費計算使用

#### Information Hierarchy

```
H1 (most prominent): 產品編輯頁標題（由 Part 2 產品中心定義）
H2 (secondary): 運送設定（區塊標題）
Supporting info: 溫層 Tooltip 說明、重量欄位 helper text、未設定重量警示
Primary CTA: 儲存（由 Part 2 產品中心統一的儲存按鈕控制）
```

#### Actual Copy

**Page / Section Headings**
- 區塊標題: `運送設定`
- 溫層欄位標籤: `溫層屬性`
- 重量欄位標籤: `產品重量`
- 前台溫層標示欄位標籤: `前台溫層標示`

**Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 溫層屬性 | — | 影響結帳時的運費計算。請選擇產品需要的配送溫度。 | — （必選，預設常溫，無需顯示錯誤）|
| 前台溫層標示 | — | 開啟後，產品頁會顯示溫層圖示（❄️ 冷凍 / 🌡️ 冷藏）。僅冷藏或冷凍產品適用。 | — |
| 產品重量 | `例：500` | 若您的商店啟用重量計費，建議填寫此欄位。未填寫時將套用系統預設重量。 | 請輸入大於 0 的數值 |

**溫層屬性 Radio 選項**
- `常溫` （預設選中）
- `冷藏（7°C 以下）`
- `冷凍（-18°C 以下）`

**前台溫層標示 Switch Labels**
- OFF 狀態標籤: `不顯示溫層圖示`
- ON 狀態標籤: `顯示溫層圖示於產品頁`

**Tooltip 內容 — 溫層屬性 ℹ 圖示**
> `溫層屬性影響結帳時的運費計算。選擇「冷藏」或「冷凍」後，消費者結帳時系統將自動套用對應的低溫配送費率，而非一般運費。冷藏/冷凍產品需要特殊低溫物流，運費通常較高。`

**重量單位 Select 選項**
- `公克 (g)`
- `公斤 (kg)`

**多規格產品 — 規格 Table 重量欄位 helper text**
- `各規格可設定不同重量；未填寫時繼承產品主重量`

**未設定重量 Warning Alert（已啟用重量計費且此產品重量為空時顯示）**
- Alert 內文: `此產品尚未設定重量。若您已啟用重量運費，系統將以預設重量計算此產品的運費，可能導致費用不準確。`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存成功 | `產品運送設定已儲存` |
| 儲存失敗 | `儲存失敗，請重新整理頁面後再試。如問題持續，請聯繫客服。` |

#### Component List

| 元件名稱 | 規格/變體 | 互動行為 |
|---|---|---|
| 運送設定 區塊容器 | `<el-card>` 或有 border 的 section，標題「運送設定」 | 固定展開，不可收起 |
| 溫層屬性 RadioGroup | `<el-radio-group>` 水平排列；三選一：常溫 / 冷藏（7°C 以下）/ 冷凍（-18°C 以下）| 選擇任一選項；預設選中「常溫」|
| 溫層 Tooltip | `<el-tooltip>` ℹ 圖示緊接「溫層屬性」標籤後方；hover 觸發，delay 300ms | 顯示溫層說明文字（見 Actual Copy）|
| 前台溫層標示 Switch | `<el-switch>`；僅在選擇冷藏或冷凍時顯示（選常溫則隱藏） | 切換 ON/OFF；ON 時產品頁顯示溫層 icon |
| 產品重量 Input | `<el-input-number>` min=0，precision=2 + `<el-select>` 公克/公斤；內聯排列 | 數字輸入 + 單位選擇；若商店未啟用重量計費，欄位顯示但標注「選填」|
| 未設定重量 Warning Alert | `<el-alert type="warning">`；僅在啟用重量計費且重量為空時顯示 | 靜態警示，無關閉按鈕 |
| 多規格重量欄 | 同「產品重量 Input」，出現在規格 Table 每行末欄 | 各規格獨立輸入；未填則繼承產品主重量 |

**多規格 Table — Sortable Columns 規格**

| 欄位 | 是否可排序 | 說明 |
|---|---|---|
| 規格名稱 | ❌ | 固定顯示順序，不允許排序 |
| 價格 | ❌ | 非此 Table 主要功能 |
| 重量 | ❌ | 為表單輸入欄位，非排序列表 |
| 操作 | ❌ | 操作欄不排序 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default — 常溫 | 預設狀態或已選常溫 | 三個溫層 Radio 顯示；前台溫層標示 Switch 隱藏；重量欄位顯示 |
| 冷藏/冷凍已選 | 使用者選擇冷藏或冷凍 | 前台溫層標示 Switch 顯示（150ms fade-in）|
| 重量未填 + 已啟用重量計費 | 商店已啟用重量運費，此產品重量為空 | 顯示 Warning Alert「此產品尚未設定重量…」|
| Loading | 進入頁面時載入產品資料 | 表單欄位顯示 Skeleton loader |
| Saving | 按下儲存按鈕 | 儲存按鈕 loading 狀態（由 Part 2 產品中心統一控制）|

#### Interaction Annotations

| User action | Result |
|---|---|
| 選擇「冷藏」或「冷凍」| 前台溫層標示 Switch 出現（150ms ease-out fade-in）|
| 選擇「常溫」| 前台溫層標示 Switch 隱藏（150ms ease-out fade-out）|
| Hover 溫層屬性 ℹ 圖示 | 顯示 Tooltip 說明文字（delay 300ms）|
| 切換重量單位（公克 ↔ 公斤）| 數字保持不變，僅單位標籤更新（換算由使用者自行輸入）|

> 📌 假設：「運送設定」嵌入於 Part 2 產品中心產品編輯頁作為區塊（section），非獨立 Tab。若 Part 2 採用 Tab Bar 結構，「運送設定」應改為一個獨立 Tab 呈現。

---

### Screen 2: 物流與運費設定 — 溫層運費規則 Tab

**Purpose:** 商家管理員設定全店冷藏/冷凍產品的基礎運費、離島運費和免運門檻，使系統能在結帳時自動套用正確溫層費率。  
**Entry points:** 後台 → 全域設定 → 金物流串接 → 物流與運費 → 點擊 Tab「溫層運費規則」  
**Primary user goal:** 啟用並設定冷藏/冷凍的運費費率

#### Information Hierarchy

```
H1 (most prominent): 溫層運費規則（Tab 標題 / 頁面主標題）
H2 (secondary): 常溫設定 / 冷藏設定 / 冷凍設定（三個 Collapse 面板標題）
Primary CTA: 儲存設定
Secondary CTA: 取消
Supporting info: 頁面說明文字、各面板欄位 helper text
```

#### Actual Copy

**Page / Section Headings**
- Tab 標籤: `溫層運費規則`
- 頁面說明文字: `設定不同溫層產品的運費規則。結帳時，系統依訂單中最高溫層自動套用對應費率。若您的產品無需溫層管理，可略過此設定。`
- 常溫面板標題: `常溫設定`
- 冷藏面板標題: `冷藏設定`
- 冷凍面板標題: `冷凍設定`

**常溫面板展開內容**
- 說明文字: `常溫產品使用一般運費設定（目前基礎運費：NT$ [從金物流設定讀取]）。如需修改常溫運費，請前往「一般運費設定」。`
- 連結文字: `前往一般運費設定 →`

**Button Labels**
- Primary: `儲存設定`
- Secondary: `取消`

**Form Fields — 冷藏設定**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 啟用冷藏運費 | — | 未啟用時，冷藏產品套用一般常溫運費。 | — |
| 本島基礎運費 | `例：150` | 消費者選擇本島地址時的冷藏配送費。 | 請填寫本島基礎運費（NT$ 0 以上）|
| 離島基礎運費 | `例：250` | 消費者選擇離島地址（澎湖、金門、馬祖）時的冷藏配送費。 | 請填寫離島基礎運費（NT$ 0 以上）|
| 本島免運門檻 | `例：1500` | 訂單金額達此金額時，本島冷藏運費免收。填 0 代表不設免運。 | 請輸入 0 或以上的金額 |
| 離島免運門檻 | `例：2500` | 訂單金額達此金額時，離島冷藏運費免收。填 0 代表不設免運。 | 請輸入 0 或以上的金額 |
| 前台說明文字 | `例：冷藏產品採低溫宅配，運費 NT$150 起` | 選填。此文字將顯示在前台結帳頁的運費說明區。最多 50 字。 | 已超過 50 字上限，請縮短文字 |

**冷凍設定面板** — 欄位與冷藏完全相同，另加：
- 面板提示文字（欄位上方）: `冷凍配送費用通常高於冷藏，建議設定較高的基礎運費以反映實際物流成本。`

**Switch Labels — 冷藏**
- OFF: `未啟用，冷藏產品套用常溫費率`
- ON: `已啟用冷藏費率`

**Switch Labels — 冷凍**
- OFF: `未啟用，冷凍產品套用常溫費率`
- ON: `已啟用冷凍費率`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存成功 | `溫層運費設定已儲存，將套用至所有新訂單` |
| 儲存失敗 — 網路 | `儲存失敗，請確認網路連線後再試。如問題持續，請聯繫客服。` |
| 儲存失敗 — 驗證 | `部分欄位填寫有誤，請檢查紅色標示的欄位後再儲存。` |

**Error States**

| Error condition | Message shown to user |
|---|---|
| API 載入失敗 | `無法載入溫層運費設定，請重新整理頁面。如問題持續，請聯繫客服。` |
| 本島運費未填（啟用時）| `請填寫本島基礎運費` |
| 離島運費未填（啟用時）| `請填寫離島基礎運費` |

**Loading State**
- 載入文字: skeleton only（無文字，欄位以灰色區塊替代）

#### Component List

| 元件名稱 | 規格/變體 | 互動行為 |
|---|---|---|
| Tab Bar | `<el-tabs>`；含「溫層運費規則」（選中）和「重量運費規則」兩個 Tab | 點擊「重量運費規則」Tab → 切換至 Screen 3 |
| 頁面說明文字 | `<p>` 灰色小字，位於 Tab 內容頂部 | 靜態說明 |
| 常溫 Collapse 面板 | `<el-collapse-item>` 預設展開；標題「常溫設定」| 可手動收起/展開 |
| 冷藏 Collapse 面板 | `<el-collapse-item>` 預設展開；標題「冷藏設定」| 可手動收起/展開 |
| 冷藏 啟用 Switch | `<el-switch>`；OFF → 冷藏所有欄位 disabled（灰色，值保留）| ON：欄位 enabled（200ms ease-out 展開動畫）；OFF：欄位 disabled |
| 基礎運費 Input | `<el-input-number>` NT$ 前綴，min=0，precision=0 | 數字輸入；啟用開關 OFF 時 disabled |
| 免運門檻 Input | `<el-input-number>` NT$ 前綴，min=0，precision=0 | 0 代表不設免運；啟用開關 OFF 時 disabled |
| 前台說明文字 Input | `<el-input>` type=text，maxlength=50，show-word-limit=true | 啟用開關 OFF 時 disabled |
| 冷凍 Collapse 面板 | 同冷藏面板，欄位完全相同 | 同冷藏面板 |
| 頁底操作列 | Sticky footer；「儲存設定」Primary Button + 「取消」Secondary Button | 儲存：呼叫 API，按鈕顯示 loading；取消：觸發確認 Dialog |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default — 全部未啟用 | 首次進入，冷藏和冷凍均為 OFF | 三個 Collapse 展開；冷藏/冷凍欄位 disabled（灰色）|
| 冷藏已啟用 | 冷藏 Switch → ON | 冷藏欄位 enabled，可輸入費率 |
| 冷凍已啟用 | 冷凍 Switch → ON | 冷凍欄位 enabled；顯示「冷凍費用通常高於冷藏」提示 |
| 驗證失敗 | 按儲存後必填欄位為空 | 對應欄位 border 變紅 + 顯示錯誤文字 |
| Saving | 按下「儲存設定」| 儲存按鈕顯示 spinner loading 狀態 |
| Loading | 初次載入 | 頁面欄位顯示 Skeleton loader |
| API 載入失敗 | 無法取得設定值 | 頁面中央顯示錯誤訊息 + 「重新整理」按鈕 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊 Tab「重量運費規則」| 切換至 Screen 3（Tab 切換，同一頁面）|
| 切換冷藏 Switch → ON | 冷藏欄位區域 enabled（200ms ease-out 動畫）|
| 切換冷藏 Switch → OFF | 冷藏欄位 disabled，值保留但不提交 |
| 點擊「前往一般運費設定 →」| 導覽至金物流串接 > 一般運費設定頁 |
| 點擊「儲存設定」| 執行欄位驗證；有錯誤則高亮紅色；無錯誤則呼叫 API 儲存 |
| 點擊「取消」| Confirm Dialog：「確定放棄未儲存的變更？」→ 確認後恢復上次儲存值 |
| 點擊 Collapse 面板 Header | 展開/收起面板（150ms ease-out）|

---

### Screen 3: 物流與運費設定 — 重量運費規則 Tab

**Purpose:** 商家管理員設定全店依產品重量計費的多階梯費率，使系統能在結帳時根據購物車總重量自動計算運費。  
**Entry points:** 後台 → 全域設定 → 金物流串接 → 物流與運費 → Tab「重量運費規則」；或從 Screen 2 點擊 Tab 切換  
**Primary user goal:** 啟用重量運費並建立多階梯費率表

#### Information Hierarchy

```
H1 (most prominent): 重量運費規則（Tab 標題）
H2 (secondary): 全域設定 / 重量費率階梯（兩個 Section 標題）
Primary CTA（新增）: + 新增費率階梯
Primary CTA（儲存）: 儲存設定
Secondary CTA: 取消
Supporting info: 頁面說明文字、費率範例區塊、各欄位 helper text
```

#### Actual Copy

**Page / Section Headings**
- Tab 標籤: `重量運費規則`
- 頁面說明文字: `設定依產品總重量計費的運費規則。結帳時，系統加總購物車內所有產品的重量（重量 × 數量），查找對應費率階梯並自動計算運費。`
- 全域設定區塊標題: `全域設定`
- 費率階梯區塊標題: `重量費率階梯`

**全域設定 Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 啟用重量運費 | — | 啟用後，系統將依產品重量計算運費，而非固定費率。 | — |
| 重量單位 | — | 整個商店統一使用同一單位。產品重量欄位的填寫單位也會跟著改變。 | 請選擇重量單位 |
| 產品未設定重量時的預設重量 | `例：500` | 產品未填重量時，系統以此預設值計算重量費率。建議填入您產品的平均重量。 | 請輸入大於 0 的數值 |
| 當重量運費與一般運費並存時 | — | 若產品同時符合一般運費和重量運費，系統依此規則決定最終運費。 | 請選擇一種計算方式 |

**重量單位 Radio 選項**
- `公克 (g)`
- `公斤 (kg)`

**並存規則 Radio 選項**
- `取兩者較高值（確保運費不低於成本）`
- `使用重量運費（忽略一般費率）`
- `使用一般運費（忽略重量費率）`

**Tooltip — 並存規則 ℹ 圖示**
> `當您同時設定了一般運費（例如固定 NT$60）和重量運費（例如 5kg 以上 NT$200），系統需要決定以哪個為準。建議選擇「取兩者較高值」，確保大型產品的運費不低於實際物流成本。`

**費率階梯 Table — 欄位 Helper**
- 重量下限欄位 helper: `第一行固定為 0。後續行自動帶入上一行的重量上限。`
- 重量上限欄位 helper: `填 0 代表無上限，即此重量以上均套用此費率（最後一個階梯必須填 0）`
- 本島運費欄位 helper: `NT$0 代表此重量段免運`
- 離島運費欄位 helper: `NT$0 代表此重量段免運`

**Button Labels**
- `+ 新增費率階梯`
- `儲存設定`
- `取消`

**刪除行按鈕 Tooltip（禁用狀態）:** `至少需要保留一個費率階梯`

**費率範例區塊標題:** `費率設定範例（僅供參考）`

**費率範例 Table 內容（淺紫背景 #f5f0ff）:**
```
重量範圍              本島運費    離島運費
0 – 1 kg             NT$100     NT$200
1 kg – 5 kg          NT$180     NT$320
5 kg – 15 kg         NT$300     NT$500
15 kg 以上            NT$500     NT$800
```

**Empty State — 費率階梯（已啟用但無任何階梯）**
- Headline: `尚未設定任何費率階梯`
- Subtext: `至少需要一個費率階梯，重量計費才能正常運作。`
- CTA label: `+ 新增費率階梯`

**Error States**

| Error condition | Message shown to user |
|---|---|
| 啟用重量運費但無費率階梯 | `請至少設定一個費率階梯，才能儲存重量運費設定。` |
| 費率階梯重量範圍不連續 | `第 [N] 行的重量下限（[X]）與上一行的重量上限（[Y]）不一致，請修正後再儲存。` |
| 最後一階上限不為 0 | `最後一個費率階梯的重量上限必須填 0（代表無上限），以涵蓋所有超重訂單。` |
| 預設重量未填（啟用時）| `請填寫產品未設定重量時的預設重量` |
| API 載入失敗 | `無法載入重量運費設定，請重新整理頁面。如問題持續，請聯繫客服。` |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存成功 | `重量運費設定已儲存，將套用至所有新訂單` |
| 儲存失敗 | `儲存失敗，請確認所有欄位填寫正確後再試。` |
| 刪除費率行 | `費率階梯已刪除` |

#### Component List

| 元件名稱 | 規格/變體 | 互動行為 |
|---|---|---|
| Tab Bar | `<el-tabs>`；此頁「重量運費規則」Tab 選中 | 點擊「溫層運費規則」→ 切換至 Screen 2 |
| 全域設定 Section | 標題「全域設定」，含啟用開關、重量單位、預設重量、並存規則四個欄位 | 容器，無特殊互動 |
| 啟用重量運費 Switch | `<el-switch>`；OFF → 全域設定欄位和費率 Table 全部 disabled | ON：啟用所有欄位；OFF：全部 disabled |
| 重量單位 RadioGroup | `<el-radio-group>` 水平；公克 / 公斤 | 選擇後更新全店重量單位顯示 |
| 預設重量 Input | `<el-input-number>` min=0.01，precision=2 + 單位（跟隨重量單位設定）| 數字輸入 |
| 並存規則 RadioGroup | `<el-radio-group>` 垂直三選一 | 選擇決定結帳計算邏輯 |
| 並存規則 Tooltip | `<el-tooltip>` ℹ 圖示，hover 觸發，delay 300ms | 顯示說明文字 |
| 費率範例區塊 | `<div>` 淺紫背景（#f5f0ff），含說明標題 + 示範 Table | 靜態展示，不可互動 |
| 費率階梯 Table | `<el-table>` 動態行；欄：重量下限（唯讀）、重量上限、本島運費（NT$）、離島運費（NT$）、刪除按鈕 | 動態新增/刪除行；最少保留 1 行 |
| + 新增費率階梯 Button | `<el-button>` Secondary + 圖示；位於 Table 下方 | 在 Table 末尾新增空行；新行重量下限自動帶入前一行的上限值 |
| 刪除行 Button | 危險紅色 Icon Button；每行最後欄；行數 = 1 時 disabled | 立即刪除該行；後續各行重量下限自動重算 |
| 頁底操作列 | Sticky footer；「儲存設定」Primary + 「取消」Secondary | 儲存：驗證後呼叫 API；取消：Confirm Dialog |

**費率階梯 Table — Sortable Columns 規格**

| 欄位 | 是否可排序 | 說明 |
|---|---|---|
| 重量下限 | ❌ | 固定由小到大，不允許排序 |
| 重量上限 | ❌ | 同上 |
| 本島運費 | ❌ | 費率表為有序結構，不排序 |
| 離島運費 | ❌ | 同上 |
| 操作（刪除）| ❌ | 操作欄不排序 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default — 未啟用 | 初次進入或 Switch OFF | Switch OFF；全域欄位和 Table disabled（灰色）|
| 已啟用 — 無費率階梯 | Switch ON 但 Table 無任何行 | Table 顯示 Empty State（Headline + CTA）|
| 已啟用 — 有費率階梯 | Switch ON + 至少一行費率 | Table 顯示費率行；唯一行時刪除按鈕 disabled |
| 驗證失敗 | 按儲存後發現錯誤 | 對應欄位 border 紅色 + 顯示錯誤文字 |
| Saving | 按下「儲存設定」| 儲存按鈕 loading spinner |
| Loading | 初次載入 | 頁面顯示 Skeleton loader |
| API 載入失敗 | 無法取得設定值 | 頁面中央錯誤訊息 + 「重新整理」按鈕 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊 Tab「溫層運費規則」| 切換至 Screen 2 |
| 切換「啟用重量運費」→ ON | 全域欄位和 Table 啟用；若 Table 無行則顯示 Empty State |
| 切換「啟用重量運費」→ OFF | 全域欄位和 Table disabled；值保留但不提交 |
| 點擊「+ 新增費率階梯」| Table 末尾新增空行；新行重量下限自動填入前一行上限值 |
| 輸入重量上限值（某行）| 下一行（若存在）的重量下限欄位自動同步更新 |
| 點擊「刪除」（行數 > 1）| 立即刪除該行；後續各行重量下限自動重算 |
| 點擊「刪除」（僅剩 1 行）| 按鈕 disabled；hover 顯示 Tooltip：「至少需要保留一個費率階梯」|
| 點擊「儲存設定」| 執行驗證（連續性、最後一階上限為 0 等）；通過後呼叫 API |
| 點擊「取消」| Confirm Dialog 確認放棄變更 |

---

### Screen 4: 前台購物車 — 混溫層警示 Banner

**Purpose:** 當消費者購物車內同時含有常溫和冷藏/冷凍產品時，告知消費者最高溫層費率將被套用，並建議可分批結帳。  
**Entry points:** 消費者前台 → 點擊購物車圖示 → 購物車頁面（僅在混溫層條件成立時顯示此 Banner）  
**Primary user goal:** 理解購物車有混溫層產品，了解目前將套用的溫層費率，以及是否需要分批結帳

#### Information Hierarchy

```
H1 (most prominent): 購物車產品列表（由前台購物車模組定義）
H2 (secondary): 混溫層警示 Banner（產品列表下方，運費摘要上方）
Primary CTA: 前往結帳（由前台購物車模組定義，不受 Banner 阻擋）
Secondary CTA: 分拆購物車（選填功能，若未實作則不顯示）
Supporting info: Banner 說明文字、產品縮圖上的溫層 icon
```

#### Actual Copy

**混溫層 Warning Banner — 常溫 + 冷藏**（`<el-alert type="warning">`，橙色，不可關閉）
- Banner 標題: `您的購物車包含不同溫層的產品`
- Banner 內文: `購物車內同時有常溫與冷藏產品。系統將依最高溫層（冷藏）計算運費。如需分開配送，建議分批結帳，分別選擇適合的物流方式。`

**混溫層 Warning Banner — 含冷凍產品**
- Banner 標題: `您的購物車包含不同溫層的產品`
- Banner 內文: `購物車內同時有常溫與冷凍產品。系統將依最高溫層（冷凍）計算運費。如需分開配送，建議分批結帳，分別選擇適合的物流方式。`

**購物車頁運費說明（無論是否混溫層，依 PRD §8.5.2 不顯示具體金額）**
- 說明文字: `實際運費將於選擇物流方式後顯示`

> ⚠️ PRD 待補：「分拆購物車」按鈕在 PRD 中僅被標注為「選填功能，若未實作則不顯示按鈕」，尚無任何功能規格。以下為依 UX 慣例補充的佔位設計，正式開發前請 PM 確認是否列入本期範圍，並補充分拆邏輯。

**（若實作）分拆購物車 Button**
- 按鈕文字: `分拆購物車`

**（若實作）分拆購物車 Confirm Dialog**
- Dialog 標題: `分拆購物車`
- Dialog 內文: `系統將依溫層將購物車拆成兩筆訂單，一筆常溫、一筆冷藏/冷凍。分拆後需分別完成結帳。確定要繼續嗎？`
- 確認 CTA: `確定分拆`
- 取消: `取消`

#### Component List

| 元件名稱 | 規格/變體 | 互動行為 |
|---|---|---|
| 混溫層 Warning Banner | `<el-alert type="warning">` 橙色；有標題 + 內文；無關閉按鈕；僅混溫層時顯示 | 靜態警示，不可手動關閉 |
| 分拆購物車 Button（選填）| `<el-button>` Ghost/Outline 樣式；位於 Banner 內或 Banner 下方 | 點擊 → 彈出 Confirm Dialog |
| Confirm Dialog（選填）| `<el-dialog>` 小型；含標題、說明、確認/取消 | 確認 → 執行分拆邏輯（PRD 待補）；取消 → 關閉 |
| 溫層 Icon Badge（購物車產品行）| ❄️ 冷凍 / 🌡️ 冷藏，帶文字標籤；顯示於產品縮圖角落 | 無互動，純顯示 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 無混溫層 | 購物車內所有產品溫層一致 | 不顯示 Warning Banner |
| 混溫層（含冷藏，無冷凍）| 購物車同時有常溫 + 冷藏產品 | 顯示冷藏版 Banner |
| 混溫層（含冷凍）| 購物車含冷凍產品（無論是否有冷藏）| 顯示冷凍版 Banner |
| 空購物車 | 無任何產品 | 不顯示 Banner（由購物車空狀態處理）|

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「分拆購物車」（若實作）| 彈出 Confirm Dialog |
| Confirm Dialog「確定分拆」| 執行分拆邏輯（PRD 待補）|
| Confirm Dialog「取消」| 關閉 Dialog，購物車不變 |
| 點擊「前往結帳」| 正常導覽至結帳頁；混溫層警示不阻擋結帳 |

---

### Screen 5: 前台結帳頁 — 運費顯示區塊

**Purpose:** 消費者選擇物流方式和地址後，清楚看到運費金額及計算依據（溫層費率或重量費率），建立對費用的理解和信任。  
**Entry points:** 消費者前台 → 購物車頁 → 「前往結帳」→ 結帳頁面 → 選擇物流方式和縣市後系統觸發運費計算  
**Primary user goal:** 確認運費金額及其計算原因，確認後送出訂單

#### Information Hierarchy

```
H1 (most prominent): 結帳頁主流程（由前台結帳模組定義）
H2 (secondary): 費用明細區塊（Order Summary）
運費行: 運費：NT$ XXX
計算依據說明: [小字，灰色，緊接運費金額下方]
Primary CTA: 確認訂單（由結帳模組定義）
```

#### Actual Copy

**運費行 — 溫層費率（冷藏）**
- 標籤: `運費`
- 金額: `NT$ XXX`
- 計算依據說明文字: `冷藏產品低溫配送`

**運費行 — 溫層費率（冷凍）**
- 計算依據說明文字: `冷凍產品低溫配送`

**運費行 — 重量費率**
- 計算依據說明文字: `產品總重量 X.X [公克/公斤]（依重量費率計算）`

**運費行 — 免運**
- 金額: `NT$ 0`
- 計算依據說明文字: `訂單金額達免運門檻，運費免收`

**尚未選擇物流方式（佔位文字）**
- 運費行: `請先選擇物流方式與配送地址`

**運費計算中（Loading 狀態）**
- 金額位置: `計算中…`

**未設定重量產品 Warning Alert**（`<el-alert type="warning">`）
- Alert 內文: `此訂單包含未設定重量的產品，運費以最低費率計算，可能與實際物流成本有差異。`

**商家自訂說明文字**（選填，商家在 Screen 2 填寫時顯示）
- 顯示格式: `[商家填寫的說明文字，最多 50 字]`（灰色小字，位於計算依據下方）

**Error States**

| Error condition | Message shown to user |
|---|---|
| 運費計算 API 失敗 | `運費計算暫時無法使用，請重新整理頁面。如問題持續，請聯繫客服。` |

**Loading State**
- 金額位置顯示: `計算中…` 或 Skeleton 短條（無文字版本）

#### Component List

| 元件名稱 | 規格/變體 | 互動行為 |
|---|---|---|
| 費用明細區塊 | Order Summary 的一部分；RWD，手機版顯示於畫面底部固定區域 | 無特殊互動 |
| 運費行 | 左：「運費」標籤；右：金額；下方：計算依據說明（小字灰色） | 無互動；物流方式或縣市改變時自動更新 |
| 計算依據說明 | `<p>` 小字灰色；緊接運費金額下方 | 無互動；由 API 回傳後填入 |
| 運費計算 Loading | 金額位置顯示「計算中…」或 Skeleton 短條 | 呼叫 `/api/v1/orders/calculate-shipping` 期間顯示 |
| 未設定重量 Warning | `<el-alert type="warning">`；位於費用明細區塊上方 | 靜態警示，無關閉按鈕 |
| 商家自訂說明文字 | `<p>` 小字灰色；位於計算依據說明下方；僅商家填寫時顯示 | 無互動 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 尚未選擇物流 | 消費者未選擇物流方式或縣市 | 運費行顯示「請先選擇物流方式與配送地址」|
| 計算中 | 呼叫計算 API 中 | 金額顯示「計算中…」或 Skeleton |
| 溫層費率已計算 | API 回傳溫層費率結果 | 金額 + 冷藏/冷凍說明文字（150ms fade-in）|
| 重量費率已計算 | API 回傳重量費率結果 | 金額 + 總重量說明文字 |
| 免運 | API 回傳 NT$0（達免運門檻）| NT$0 + 免運說明文字 |
| 有未設定重量產品 | 訂單含 weight = NULL 的產品 | Warning Alert 顯示 |
| API 計算失敗 | API 回傳錯誤 | 錯誤訊息文字 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 選擇物流方式或縣市 | 呼叫 `/api/v1/orders/calculate-shipping`；運費進入「計算中」狀態 |
| API 計算完成 | 更新運費金額和計算依據說明文字（150ms fade-in）|
| 修改購物車產品後重新進入結帳頁 | 重新觸發計算 API，更新運費 |

---

## Part 4 — Cross-Screen Component Inventory

### Action Components

| 元件 | 變體 | 尺寸 | 狀態 |
|---|---|---|---|
| Button | Primary（品牌色）/ Secondary（白底邊框）/ Ghost / Destructive（紅）| Large / Medium / Small | Default / Hover / Active / Disabled / Loading |
| Switch (`<el-switch>`) | 帶 ON/OFF 狀態標籤 | — | Default / Checked / Disabled |
| RadioGroup (`<el-radio-group>`) | 水平 / 垂直 | — | Default / Selected / Disabled |
| 刪除行 Button | Icon only（垃圾桶圖示）| Small | Default / Disabled（最後一行時）|

### Display Components

| 元件 | 變體 | 資料欄位 | 狀態 |
|---|---|---|---|
| 費率階梯 Table Row | 重量費率行 | 重量下限（唯讀）、重量上限、本島運費、離島運費、刪除按鈕 | Default / Error（欄位驗證失敗時）|
| 費率範例 Table | 靜態（淺紫背景 #f5f0ff）| 重量範圍、本島運費、離島運費 | 純展示 |
| 溫層 Icon Badge | ❄️ 冷凍 / 🌡️ 冷藏（帶文字標籤）| 文字：「冷凍」/「冷藏」| 靜態 |
| Warning Banner | `<el-alert type="warning">` 橙色 | 標題 + 說明文字 | 顯示 / 隱藏 |

### Input Components

| 元件 | 變體 | 狀態 |
|---|---|---|
| 數字 Input (`<el-input-number>`) | 帶 NT$ 前綴（運費）/ 帶單位後綴（重量）| Default / Focus / Filled / Error / Disabled |
| 文字 Input (`<el-input>`) | 單行 / 帶字數顯示（show-word-limit）| Default / Focus / Filled / Error / Disabled |
| Select (`<el-select>`) | 單選（重量單位）| Default / Open / Selected / Disabled |

### Navigation Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Tab Bar (`<el-tabs>`) | 含「溫層運費規則」和「重量運費規則」兩個 Tab | 位於物流與運費設定頁頂部（Screen 2 / Screen 3 共用）|
| Collapse (`<el-collapse>`) | 可展開/收起面板 | 用於溫層設定的三個面板（常溫/冷藏/冷凍）|

### Feedback Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Toast | Success / Error / Warning | 3 秒自動消失；位於畫面右上角 |
| Confirm Dialog (`<el-dialog>`) | 小型確認對話框 | 「取消」操作時確認是否放棄變更；「分拆購物車」確認 |
| Alert Banner (`<el-alert>`) | Warning（橙色）/ Info（藍/灰色）| Warning：混溫層警示、未設定重量警示；Info：頁面說明文字 |
| Tooltip (`<el-tooltip>`) | Hover 觸發，delay 300ms | 溫層屬性 ℹ、並存規則 ℹ、禁用刪除按鈕說明 |
| Loading Skeleton | 表單欄位版 / 表格版 | 初次載入時顯示，外形 mimics 實際內容 layout |
| Empty State | 費率階梯空狀態（已啟用但無任何行）| Headline + Subtext + CTA Button |

---

## Part 5 — Design System Token Reference

| Decision | Token / Value |
|---|---|
| 警示橙色（Warning Banner 背景/文字）| Element Plus `--el-color-warning` |
| 費率範例區塊背景 | `#f5f0ff`（淺紫，如 PRD 指定）|
| 主要按鈕色 | 依 Evomni 品牌色（TBD）|
| 冷凍 icon 色調 | 藍色（`--el-color-primary` 或 Element Plus info 色）|
| 冷藏 icon 色調 | 中等藍色 / 品牌色（TBD）|
| Border Radius | 依 Element Plus 預設（`4px`）|
| 表單欄位間距 | `16px`（`--el-form-item-margin-bottom`）|
| 小字說明文字（helper text / 計算依據）| `--el-text-color-secondary`（灰色）|

---

## PRD 待補清單

以下功能在 PRD 中被提及但尚無詳細規格，請 PM 在進入 Figma 設計階段前確認：

| 功能名稱 | 出現在 Screen | 缺少哪些規格 |
|---|---|---|
| 分拆購物車 | Screen 4（前台購物車）| 是否列入本期開發範圍？若實作：分拆 API/邏輯為何？分拆後如何引導消費者完成兩筆獨立訂單的結帳流程？ |

---

## Assumptions

> 📌 假設：「運送設定」區塊嵌入於 Part 2 產品中心產品編輯頁作為一個 section（非獨立 Tab）。若 Part 2 採 Tab Bar 結構（符合 UX Spec Rule 1 的三個以上功能區塊），「運送設定」應改為獨立 Tab。

> 📌 假設：溫層運費規則和重量運費規則共用同一「物流與運費設定」頁面，以 Tab Bar（Screen 2/3）切換顯示。PRD 路徑明確標示為 Tab，此規格依此設計。

> 📌 假設：「取消」按鈕觸發 Confirm Dialog，保護商家已填寫但未儲存的費率設定不被意外丟失。若 UX 測試顯示此 Dialog 造成摩擦，可移除改為直接恢復值。

> 📌 假設：購物車頁不顯示具體運費金額（依 PRD §8.5.2），因此 Screen 4 的混溫層 Banner 不顯示預估運費數字，僅說明將套用的溫層費率種類。

> 📌 假設：溫層 icon（❄️ 冷凍、🌡️ 冷藏）為附帶可見文字標籤的 badge，非純 emoji，確保 WCAG AA 螢幕閱讀器可正確讀出語義。

> ✏️ Copy 待確認：並存規則三選一的選項文字（「取兩者較高值」/「使用重量運費（忽略一般費率）」/「使用一般運費（忽略重量費率）」）— 建議與商家實際用語對齊，確認是否夠口語易懂。

> ✏️ Copy 待確認：前台結帳頁計算依據說明文字（「冷藏產品低溫配送」/「冷凍產品低溫配送」）— 確認是否需加上運費細節（如「低溫配送 NT$150」），或維持簡短說明即可。
