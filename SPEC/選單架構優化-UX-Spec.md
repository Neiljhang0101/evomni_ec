# Evomni 選單混合內容前台顯示 — Design Brief + UX Spec

> **Version:** 1.0
> **Created:** 2026/05/28
> **來源 PRD：** `PRD_new/evomni-選單架構優化.md` v1.0
> **Prototype 範圍：** 4 個畫面（3 個前台模板 + 1 個後台元件）
> **Downstream tools:** figma-generate-design · design:design-system · design:design-handoff · design:accessibility-review

---

## Part 1 — Design Brief

### Product Vision

Evomni CMS 前台選單系統需要一套明確的「樣式驅動渲染」邏輯，確保當設計師在後台建立包含多種內容類型（文章分類、單頁）的混合選單時，訪客永遠不會看到空白的父層頁面。依後台選單樣式設定（有導覽 / 無導覽），系統自動決定：呈現完整導覽清單讓訪客自由切換，或執行「首項直通」讓訪客直接進入最重要的第一筆內容。設計師對樣式的選擇直接決定前台動線，不需工程師額外處理 edge case，並透過後台防呆提示預防孤兒頁面（訪客無法進入的子節點）的出現。

### Target User

**Primary：** 網站訪客，透過前台主選單瀏覽 Evomni CMS 網站，期望點擊選單後立即看到相關內容，而非空白頁面或令人困惑的架構頁。

**Secondary：** 後台設計師 / 網站管理員，在「選單管理」設定選單結構與樣式時，需要即時了解其樣式選擇對前台動線的影響，避免建立出孤兒頁面。

### Design Goals

| # | Goal | How to test |
|---|---|---|
| 1 | 訪客點擊有左側選單樣式的父選單後，能在 3 秒內辨識出左側導覽列並點擊切換到 Child 2 | 計時可用性測試，目標 < 3 秒找到並點擊 |
| 2 | 訪客點擊無導覽樣式的父選單後，直接看到 Child 1 的內容，而非空白頁或「找不到頁面」 | 觀察受測者反應，目標 100% 無空白頁到達 |
| 3 | 後台設計師在選擇「無樣式」且有多個子節點時，看到警告提示後能正確說明前台會發生什麼 | 問受測者「如果你選無樣式，Child 2 會怎樣？」，答對率 > 90% |
| 4 | 訪客在左側選單中點擊 Level 3 子節點後，主內容區切換至對應內容，且麵包屑同步更新 | 觀察麵包屑是否正確反映當前節點層級 |
| 5 | 文章列表頁的空狀態清楚告知訪客此分類目前沒有內容，不顯示任何技術錯誤訊息 | 觀察受測者是否理解空狀態文字，目標 100% 理解 |

### Design Principles

1. **樣式決定動線** — 後台選擇的「列表樣式」是前台行為的唯一控制開關，前台不另做邏輯推斷。
2. **訪客不看到空頁面** — 任何選單路徑都必須終止在有內容的頁面；即使孤兒節點存在，首項直通也提供出口。
3. **導覽與內容各司其職** — 左側或上方導覽區只顯示選單連結，主內容區只顯示節點內容，兩者嚴格分離，不互相干擾。
4. **後台即時警示** — 防呆提示在設計師做出影響前台的選擇時立即顯示，且為非阻斷式，尊重設計師的最終決定。

### Design System Reference

- **前台範本：** Evomni CMS 前台模板系統（基於 Grape.js 範本；具體視覺樣式由商家佈景主題決定，本 Spec 以中性基礎樣式為設計框架）
- **後台元件：** Evomni Admin Design System（沿用產品中心 Prototype 已建立之 Token）
- **Component framework：** Element Plus 視覺語言（後台部分）
- **Icon set：** Element Plus Icons
- **Font：** 後台 Noto Sans TC（400 / 500 / 600）；前台由佈景主題決定

### Accessibility Requirements

- **Target WCAG level：** AA
- **Known constraints：**
  - 左側選單的 active 狀態不能只靠顏色區分，必須搭配字重加粗或左側 accent bar 等非顏色指標
  - Tab Bar 的 active tab 需搭配下底線或背景色加文字標示，不能只依賴顏色
  - 警告框（後台）文字需有足夠對比度（黃色背景搭配深色文字，最低 4.5:1）
  - 麵包屑需加入 `aria-label` 與 `aria-current="page"` 標記

### Hard Constraints

- ⚠️ 無導覽樣式時，**前台不得出現任何文字或提示**告知訪客「其他子節點被隱藏了」；孤兒節點的存在對訪客完全透明
- ⚠️ 後台防呆警告為**非阻斷式**，設計師看到提示後仍可選擇維持「無樣式」並儲存；警告不阻止儲存操作
- ⚠️ 文章列表與導覽列的資料來源嚴格分離，子節點名稱不得混入文章清單中
- ⚠️ 本 Spec 涵蓋渲染邏輯的模板設計，不涵蓋各佈景主題的視覺客製化範圍

### Out of Scope

- 選單管理後台的完整介面（節點新增、排序、刪除等操作）
- 文章列表的分頁邏輯與篩選功能
- 產品列表頁的渲染邏輯（本 PRD 僅涵蓋文章分類與單頁節點類型）
- 前台搜尋功能
- 行動版（手機）RWD 詳細設計（本 Spec 以桌機寬度為主要框架）

---

## Part 2 — Screen Index

| # | Screen 名稱 | Navigation 路徑 | Primary User Goal |
|---|---|---|---|
| 1 | 前台內容頁 — 左側選單樣式 | 點擊主選單（後台列表樣式設為「左側選單」） | 在左側導覽找到目標子節點並切換至對應內容 |
| 2 | 前台內容頁 — 上方標籤樣式 | 點擊主選單（後台列表樣式設為「上方選單」） | 透過上方標籤切換至目標子節點的內容 |
| 3 | 前台內容頁 — 無樣式首項直通 | 點擊主選單（後台列表樣式設為「無」） | 直接進入 Child 1 的內容，無需額外操作 |
| 4 | 後台選單設定 — 孤兒節點警告提示 | 選單管理 → 編輯父節點 → 列表樣式選「無」 | 即時了解無樣式設定對前台的影響，避免產生孤兒頁面 |

---

## Part 3 — Per-Screen UX Spec

---

### Screen 1: 前台內容頁 — 左側選單樣式

**Purpose：** 訪客點擊一個包含多個子節點的父選單後，左側出現完整導覽清單，主內容區預設顯示 Child 1 的內容；訪客可點擊左側任一子節點切換主內容。
**Entry points：** 點擊主導覽列的父選單項目（該節點後台「列表樣式」設為「左側選單」）
**Primary user goal：** 在左側導覽中找到目標子節點，點擊後看到對應內容

#### Information Hierarchy

```
H1 (most prominent): [父選單名稱，如：關於我們]
H2 (secondary):      [當前主內容節點標題，如：公司動態]
Primary CTA:         左側導覽列子節點連結（導覽式，非傳統 Button）
Supporting info:     麵包屑（首頁 > 父選單 > 子節點）、文章列表條目
```

#### Actual Copy

**Page / Section Headings**
- 頁面標題（H1）: `[父選單名稱]`（由後台選單設定決定，範例：`關於我們`）
- 主內容區標題（H2）: `[當前節點名稱]`（範例：`公司動態`）
- 左側欄標頭: `[父選單名稱]`（與 H1 一致）

**Button Labels（左側導覽連結）**
- 子節點連結: `[子節點名稱]`（範例：`公司動態`、`關於我們`、`服務流程`）
- 有子節點的展開項: `[展開箭頭圖示] [子節點名稱]`

**麵包屑**
- 父選單層: `首頁 > [父選單名稱]`
- 子節點層: `首頁 > [父選單名稱] > [子節點名稱]`

**Form Fields：** 不適用（純瀏覽頁面）

**Empty State（文章分類節點下無任何文章）**
- Headline: `此分類目前沒有任何文章`
- Subtext: `相關內容即將更新，歡迎稍後再來瀏覽`
- CTA label: 無（訪客無權新增內容）

**Error States**
| Error condition | Message shown to user |
|---|---|
| 節點內容載入失敗（API 逾時 / 網路中斷） | `頁面內容暫時無法顯示，請重新整理頁面。若問題持續，請聯繫網站管理員。` |
| 節點路徑不存在（404） | `找不到您要瀏覽的頁面，請確認網址是否正確，或回到首頁重新瀏覽。` |

**Loading State**
- Loading text: 骨架屏（Skeleton），無文字；左側導覽列先行顯示，主內容區顯示條目骨架

**Status Labels（左側導覽）**
| Status key | Display text | Colour semantic |
|---|---|---|
| active | 當前瀏覽中的節點（左側 accent bar + 字重加粗） | Brand accent |
| has-children | 有子節點（以展開箭頭圖示標示） | Neutral |
| expanded | 子節點已展開（箭頭旋轉 90 度） | Neutral |

**Toast / Notification Messages：** 不適用（純瀏覽頁面，無操作類 Toast）

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 左側導覽列（Side Navigation） | 多層巢狀；父節點 + 子節點縮排 16px；active 狀態：左側 accent bar 3px + 字重 600；hover 狀態：淺背景 | 點擊子節點：主內容換頁 + active 狀態更新 + 麵包屑更新；點擊有子節點的項目：展開或收合子層 |
| 麵包屑（Breadcrumb） | 以「>」分隔；末層文字不可點；非末層文字可點並有 hover 底線 | 點擊非末層節點：導航至該層頁面 |
| 文章列表（Article List） | 垂直清單；每條顯示：標題（14–16px 加粗）、發布日期（12px 次要色）、摘要（14px，選配）；hover 有底線 | 點擊條目：導航至文章詳頁 |
| 單頁內容區（Static Page Content） | 顯示 Grape.js 編輯器輸出的 HTML 富文本；全段落排版 | 無互動（純靜態閱讀） |
| 骨架屏（Loading Skeleton） | 左側導覽：3 條短橫線骨架；主內容：5 條文章條目骨架 | 資料載入完成後以 fade-out 替換為真實內容（150ms ease-out） |
| 空狀態（Empty State） | 居中圖示 + Headline + Subtext；無 CTA 按鈕 | 無互動 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 預設（Default） | 訪客點擊父選單，API 回傳成功 | 左側顯示完整導覽，主內容顯示 Child 1 內容，Child 1 為 active |
| 子節點切換（Child Selected） | 訪客點擊左側 Child N 連結 | 主內容切換至 Child N 內容；left-nav active 狀態更新；麵包屑末層更新 |
| 子節點展開（Sub-children Expanded） | 點擊有子節點的 Child（如 Child 2 下有 Child 2-1） | 左側展開顯示 Child 2-1、Child 2-2...；主內容顯示 Child 2 內容 |
| 深層節點選取（Level 3 Selected） | 訪客點擊 Level 3 子節點 | 主內容切換至 Level 3 節點內容；麵包屑更新為三層 |
| 空狀態（Empty） | 當前節點為文章分類但無文章 | 主內容區顯示空狀態；左側導覽正常可操作 |
| 載入中（Loading） | 節點切換後資料尚未回傳 | 主內容區顯示骨架屏；左側導覽保持可操作 |
| 錯誤（Error） | API 逾時或 404 | 主內容區顯示錯誤訊息；左側導覽保持可操作 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊左側 Child N 連結 | 主內容導航至 Child N；left-nav active 更新；麵包屑末層更新 |
| 點擊有子節點的 Child（展開箭頭區域） | 左側展開子節點清單；主內容同步顯示該 Child 的內容 |
| 點擊麵包屑中間層節點 | 導航至該層父選單頁，重置為預設狀態（顯示 Child 1） |
| 點擊文章列表條目 | 導航至文章詳頁（另一個獨立頁面） |
| 點擊 Header 主選單其他項目 | 離開本頁，導航至其他選單節點 |

---

### Screen 2: 前台內容頁 — 上方標籤樣式

**Purpose：** 訪客進入父選單後，在主內容上方看到水平標籤列，各標籤對應一個子節點；預設顯示第一個標籤的內容，訪客可點擊切換。
**Entry points：** 點擊主導覽列的父選單項目（後台「列表樣式」設為「上方選單」）
**Primary user goal：** 點擊上方標籤切換至目標子節點的內容

#### Information Hierarchy

```
H1 (most prominent): [父選單名稱]
Primary CTA:         標籤列各子節點標籤按鈕
H2 (secondary):      [當前標籤對應節點的內容標題]
Supporting info:     麵包屑、文章列表條目
```

#### Actual Copy

**Page / Section Headings**
- 頁面標題（H1）: `[父選單名稱]`（範例：`公司資訊`）
- 主內容標題: `[當前標籤對應節點名稱]`（範例：`公司動態`）

**Button Labels（標籤列）**
- 各標籤: `[子節點名稱]`（範例：`公司動態`、`關於我們`、`服務流程`）

**麵包屑**
- `首頁 > [父選單名稱] > [當前標籤名稱]`

**Empty State（選取的標籤對應節點無內容）**
- Headline: `此分類目前沒有任何文章`
- Subtext: `相關內容即將更新，歡迎稍後再來瀏覽`
- CTA label: 無

**Error States**
| Error condition | Message shown to user |
|---|---|
| 節點內容載入失敗 | `頁面內容暫時無法顯示，請重新整理頁面。若問題持續，請聯繫網站管理員。` |
| 節點路徑不存在 | `找不到您要瀏覽的頁面，請確認網址是否正確，或回到首頁重新瀏覽。` |

**Loading State**
- 標籤列立即完整顯示所有標籤；主內容區顯示骨架屏

**Status Labels（標籤列）**
| Status key | Display text | Colour semantic |
|---|---|---|
| active tab | 當前選取標籤（下底線 2px + 字重加粗） | Brand accent |
| inactive tab | 未選取標籤 | Neutral（text-secondary） |

**Toast / Notification Messages：** 不適用

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 標籤列（Tab Bar） | 水平排列；標籤數量 = 子節點數量（設計基準 2–8 個）；active 以下底線 2px + 字重 600 標示；hover 有淺背景 | 點擊標籤：主內容切換 + active 狀態更新 + 麵包屑更新；鍵盤 ArrowLeft / ArrowRight 移動焦點 |
| 麵包屑（Breadcrumb） | 與 Screen 1 相同規格 | 與 Screen 1 相同 |
| 文章列表（Article List） | 與 Screen 1 相同規格 | 與 Screen 1 相同 |
| 單頁內容區（Static Page Content） | 與 Screen 1 相同規格 | 與 Screen 1 相同 |
| 骨架屏（Loading Skeleton） | 模擬標籤列（4 個佔位矩形）+ 主內容文章條目 | 資料載入後 fade-out 替換 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 預設（Default） | 訪客點擊父選單，API 回傳成功 | 標籤列顯示所有子節點標籤；Tab 1 active；主內容顯示 Child 1 內容 |
| 標籤切換（Tab Selected） | 訪客點擊 Tab N | 主內容切換至 Tab N 節點內容；active Tab 更新；麵包屑末層更新 |
| 空狀態（Empty） | 當前標籤對應節點無內容 | 主內容顯示空狀態；標籤列正常顯示 |
| 載入中（Loading） | 標籤切換後資料尚未回傳 | 主內容區顯示骨架屏；標籤列保持可操作 |
| 錯誤（Error） | API 逾時或 404 | 主內容區顯示錯誤訊息；標籤列保持可操作 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊 Tab N | 主內容切換至 Tab N 內容；active Tab 更新；麵包屑末層更新 |
| 鍵盤 ArrowLeft / ArrowRight | Tab 焦點左移 / 右移；按 Enter 確認切換內容 |
| 點擊麵包屑中間層 | 導航至該層父選單頁 |
| 點擊文章列表條目 | 導航至文章詳頁 |

---

### Screen 3: 前台內容頁 — 無樣式首項直通

**Purpose：** 後台列表樣式設為「無」時，訪客點擊父選單後直接看到 Child 1 的完整內容；頁面無任何左側導覽或上方標籤，Child 2 及後續子節點對訪客不可見、不提示。
**Entry points：** 點擊主導覽列的父選單項目（後台「列表樣式」設為「無」）
**Primary user goal：** 直接閱讀 Child 1 的內容，無需額外操作

#### Information Hierarchy

```
H1 (most prominent): [Child 1 節點名稱 / 文章分類標題 / 單頁標題]
Primary CTA:         無（訪客被直通至內容，無選單可切換）
Supporting info:     麵包屑（首頁 > 父選單名稱）、文章列表條目
```

> 📌 假設：URL 行為依 PRD §6 建議，採用 301 Redirect 至 /parent/child-1，或讓 /parent 的 Canonical URL 指向 /parent/child-1。麵包屑中的「父選單」節點仍顯示，以維持訪客的位置感。✏️ URL 策略待 SEO 與工程師確認。

#### Actual Copy

**Page / Section Headings**
- 頁面標題（H1）: `[Child 1 節點名稱]`（由 Child 1 的標題決定，範例：`公司動態`）

**麵包屑**
- `首頁 > [父選單名稱]`（顯示父選單維持脈絡感；末層顯示父選單名稱而非 Child 1 名稱）

**Empty State（Child 1 為文章分類但無文章）**
- Headline: `此分類目前沒有任何文章`
- Subtext: `相關內容即將更新，歡迎稍後再來瀏覽`
- CTA label: 無

**重要設計原則：** 頁面上不出現任何文字提示訪客「此選單下還有其他子節點」。

**Error States**
| Error condition | Message shown to user |
|---|---|
| Child 1 節點不存在（設定錯誤） | `找不到您要瀏覽的頁面，請確認網址是否正確，或回到首頁重新瀏覽。` |
| API 載入失敗 | `頁面內容暫時無法顯示，請重新整理頁面。若問題持續，請聯繫網站管理員。` |

**Loading State**
- 全頁骨架屏（無側欄 / 無標籤列骨架，只有全寬內容骨架）

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 麵包屑（Breadcrumb） | 兩層（首頁 > 父選單名稱）；末層（父選單名稱）不可點 | 點擊「首頁」：導航至首頁 |
| 文章列表（Article List） | 全寬版面（無側欄佔位）；每條顯示標題、日期、摘要；hover 有底線 | 點擊條目：導航至文章詳頁 |
| 單頁內容區（Static Page Content） | 全寬；顯示 Grape.js 富文本 | 純靜態閱讀 |
| 骨架屏（Loading Skeleton） | 全寬單欄；模擬文章條目清單 | 載入完成後 fade-out |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 預設（Default） | 訪客點擊父選單，API 成功直通 Child 1 | 全寬頁面直接顯示 Child 1 內容；無任何導覽元件 |
| 空狀態（Empty） | Child 1 為文章分類但無文章 | 全寬空狀態；無導覽元件 |
| 載入中（Loading） | 首次載入 | 全寬骨架屏 |
| 錯誤（Error） | Child 1 不存在或 API 失敗 | 全寬錯誤訊息 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊文章列表條目 | 導航至文章詳頁 |
| 點擊麵包屑「首頁」 | 導航至網站首頁 |
| 點擊麵包屑「[父選單名稱]」 | 此為末層（不可點擊） |
| 使用瀏覽器上一頁 | 標準瀏覽器行為 |

---

### Screen 4: 後台選單設定 — 孤兒節點警告提示

**Purpose：** 當後台設計師對一個「有 2 個以上子節點」的父節點選擇「無樣式」列表樣式時，系統即時顯示黃色警告提示，說明前台只會顯示 Child 1，其餘子節點對訪客不可見。
**Entry points：** 選單管理 → 點擊父節點「編輯」→ 展開「列表樣式」設定 → 選擇「無」
**Primary user goal：** 了解「無樣式」設定的前台影響，決定是否維持或改選其他樣式

#### Information Hierarchy

```
H1 (page level):     選單管理（後台全域頁面標題）
Warning Alert:       最顯眼的語境元件 — 黃色警告框 + 圖示 + 說明 + 建議行動
Radio Group:         列表樣式選擇（觸發警告的控制點）
Primary CTA:         儲存按鈕（非阻斷，警告存在時仍可點擊）
```

#### Actual Copy

**Page / Section Headings**
- 樣式設定區塊標籤: `列表樣式`
- 警告框標題: `注意`

**警告提示文字**
- 主要說明: `您目前選擇「無樣式」。前台將僅顯示第一順位的內容（[Child 1 名稱]），其餘子選單（[Child 2 名稱]、[Child 3 名稱]...）將無法被訪客看見。`
- 建議行動: `若需讓訪客自由瀏覽所有子內容，請改選「左側選單」或「下拉選單」樣式。`

**Button Labels（Radio Group 選項）**
- `無樣式`（選取後觸發警告，條件：子節點數 ≥ 2）
- `左側選單`
- `下拉選單`
- `上方標籤`

**Button Labels（操作）**
- 主要操作: `儲存設定`
- 取消: `取消`

**Error States**
| Error condition | Message shown to user |
|---|---|
| 儲存失敗（API 異常） | `設定儲存失敗，請稍後再試。若問題持續，請重新整理頁面。` |

**Loading State**
- 儲存按鈕顯示 Loading 旋轉圖示 + 文字變為 `儲存中...`

**Toast / Notification Messages**
| Trigger | Message |
|---|---|
| 儲存成功 | `選單設定已更新` |
| 儲存失敗 | `儲存失敗，請重新操作` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 樣式選擇器（Radio Group） | 4 個選項：無樣式 / 左側選單 / 下拉選單 / 上方標籤；單選；垂直或水平排列 | 選「無樣式」且子節點 ≥ 2：即時顯示警告框；選其他選項：警告框即時消失 |
| 警告框（Warning Alert） | 黃色背景（`$warning-50`）+ 深色邊框（`$warning-300`）；左側警告圖示；標題 + 說明段落；非阻斷式（無關閉按鈕） | 唯讀顯示；Radio 切換至非「無樣式」時自動隱藏（transition 150ms） |
| 儲存按鈕（Primary Button） | Primary；Medium 尺寸；Loading 狀態：旋轉圖示 + 文字 `儲存中...` | 點擊：API 儲存；成功顯示 Toast；失敗顯示 Toast |
| 子節點清單預覽（選配元件）| 文字清單，顯示各子節點名稱與類型（文章分類 / 單頁）；僅用於輔助設計師確認受影響節點 | 唯讀 |
| Toast（操作回饋） | Success / Error 變體；右上角或頁面頂部；3 秒自動消失 | 自動消失；可手動關閉 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 無警告（Normal） | 當前選取樣式為「左側選單」/ 「下拉選單」/ 「上方標籤」 | 警告框不顯示；Radio Group 顯示當前選取樣式 |
| 顯示警告（Warning） | 選取「無樣式」且子節點數 ≥ 2 | 樣式選擇器下方即時出現黃色警告框 |
| 無警告（單一子節點） | 選取「無樣式」但子節點數 = 1 | 不顯示警告（只有一個子節點時無孤兒問題） |
| 儲存中（Saving） | 點擊「儲存設定」 | 儲存按鈕顯示 Loading 狀態；其他欄位鎖定 |
| 儲存成功（Success） | API 回傳 200 | Toast：`選單設定已更新`（3 秒後自動消失） |
| 儲存失敗（Error） | API 回傳錯誤 | Toast：`儲存失敗，請重新操作` |

#### Interaction Annotations

| User action | Result |
|---|---|
| 從「左側選單」切換至「無樣式」（子節點 ≥ 2） | 警告框即時出現（fade-in 150ms），顯示孤兒節點說明與 Child 1 名稱 |
| 從「無樣式」切換至其他選項 | 警告框即時消失（fade-out 150ms） |
| 點擊「儲存設定」（警告框存在時） | 設定仍可儲存，警告框不阻斷操作；儲存成功後 Toast 顯示 |
| 閱讀警告後決定維持「無樣式」並儲存 | 儲存成功；下次重新編輯此節點時，若仍為「無樣式」則警告框再次顯示 |

#### Motion / Transition

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| 警告框出現（選取無樣式） | Fade-in + 向下展開（max-height 0 → auto） | 150ms | ease-out |
| 警告框消失（切換為其他樣式） | Fade-out + 向上收合（max-height auto → 0） | 150ms | ease-in |
| Toast 出現 | Fade-in + 向下滑入 8px | 200ms | ease-out |

---

## Part 4 — Cross-Screen Component Inventory

### Action Components

| 元件 | 變體 | 尺寸 | 狀態 |
|---|---|---|---|
| Button（後台） | Primary / Secondary / Ghost | Large / Medium / Small | Default / Hover / Active / Disabled / Loading |
| Tab（前台 Screen 2） | Default / Active | Standard height 40px | Default / Hover / Active / Focused / Disabled |
| Radio（後台 Screen 4） | Default / Selected | Standard | Default / Hover / Selected / Disabled |

### Display Components

| 元件 | 變體 | 資料欄位 | 狀態 |
|---|---|---|---|
| 文章列表條目 | 標準（含日期 + 摘要） / 精簡（僅標題） | 標題、發布日期、摘要（選配）、分類標籤（選配） | Default / Hover |
| 警告框（Alert） | Warning（黃色，非阻斷） | 警告圖示 + 標題 + 說明文字 + 動態子節點名稱 | Visible / Hidden（transition） |
| 麵包屑 | 2 層 / 3 層 | 節點名稱（可點層有 hover 底線）/ 末層名稱（不可點） | Default |

### Navigation Components

| 元件 | 變體 | 說明 |
|---|---|---|
| 左側選單（Side Navigation） | 展開（Expanded）/ 可收合（Collapsible）| 前台 Screen 1；支援多層巢狀展開；active 狀態以 accent bar + bold 標示 |
| 標籤列（Tab Bar） | 水平排列 / 捲動（Tab 數量 > 8） | 前台 Screen 2；active 以下底線 + bold 標示 |
| 麵包屑（Breadcrumb） | 2 層 / 3 層 | 所有前台 Screen |

### Feedback Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Toast | Success / Error / Warning / Info | 後台操作回饋；3 秒自動消失；可手動關閉 |
| Warning Alert | Warning（黃色，非阻斷） | 後台 Screen 4；孤兒節點即時提示；無關閉按鈕 |
| 空狀態（Empty State） | 前台文章分類無內容版 | Headline + Subtext；無 CTA 按鈕（訪客不可操作） |
| 骨架屏（Loading Skeleton） | 左側選單版（Screen 1）/ 標籤列版（Screen 2）/ 全寬版（Screen 3） | 各版本骨架結構對應各 Screen 的實際版面 |

---

## Part 5 — Design System Token Reference

| Decision | Token / Value |
|---|---|
| 警告框背景色 | `$warning-50`（淺黃，參考 #FFFBEB） |
| 警告框邊框色 | `$warning-300`（中黃） |
| 警告圖示色 | `$warning-600`（深黃 / 橙黃） |
| 左側選單 active accent bar | `$brand-primary` |
| Tab active 下底線 | `$brand-primary` |
| 麵包屑可點層文字色 | `$text-secondary` + hover 底線 |
| 麵包屑末層文字色 | `$text-primary`（不可點） |
| 空狀態文字色 | `$text-secondary` |
| 骨架屏基底色 | `$neutral-100` |
| 骨架屏動畫高亮色 | `$neutral-200`（shimmer 動畫） |

---

## Assumptions

> 📌 假設：前台頁面的 H1 顯示「父選單名稱」，子節點名稱作為 H2 或主內容標題。若佈景主題設計師偏好以 Child 1 名稱作為 H1，本 Spec 的麵包屑與 accessibility 標記需相應調整。

> 📌 假設：無樣式首項直通（Screen 3）的麵包屑末層顯示「父選單名稱」而非「Child 1 名稱」，目的是讓訪客知道自己在哪個主選單下，即使 URL 已重定向至 /parent/child-1。✏️ 麵包屑末層顯示邏輯待 SEO 策略與工程師確認。

> 📌 假設：後台警告框不需要「關閉（X）」按鈕，設計師透過切換 Radio 選項讓警告自動消失，避免「手動關閉後忘記警告存在」的問題。

> 📌 假設：標籤列（Screen 2）的標籤數量以 2–8 個為設計基準；超過 8 個標籤時需要水平捲動處理，此邊緣案例超出本 Spec 範圍，標記為實作時由工程師與設計師判斷。

> ✏️ Copy 待確認：後台警告框中動態插入的子節點名稱（`[Child 1 名稱]`、`[Child 2 名稱]`）是否從 API 即時取得？若是，需確認後端欄位名稱與回傳格式。

---

## Part 6 — Claude Design Prompt Cheatsheet

**使用說明：**
1. 將這份文件上傳至 Claude Design
2. 找到你想先做的畫面，複製下方對應的 prompt
3. 貼入 Claude Design 對話框，開始生成
4. 在 Claude Design 中直接對話迭代細節

---

### Screen 1 — 前台內容頁（左側選單樣式）

```
請幫我設計「前台內容頁 — 左側選單樣式」的 UI 框架。這是一個桌機版網站前台頁面，版面由左右兩欄組成：左側固定欄為多層導覽清單（Side Navigation），寬度約 200–240px；右側主內容區為文章列表。左側導覽顯示父選單名稱作為標頭，下方列出所有子節點連結（例如：公司動態、關於我們、服務流程），當前 active 節點以左側 3px accent bar 加粗體字標示，hover 有淺背景。右側主內容區預設顯示第一個子節點的文章列表，每條文章包含標題（加粗）、發布日期（次要色小字）、摘要（選配）。頁面最上方有麵包屑（首頁 > 關於我們 > 公司動態）。請同時設計：(1) 空狀態（主內容區顯示「此分類目前沒有任何文章」）、(2) 載入中骨架屏（左側導覽 3 條短橫骨架 + 右側 5 條文章條目骨架）。請參考上傳文件中 Screen 1 的完整規格。
```

---

### Screen 2 — 前台內容頁（上方標籤樣式）

```
請幫我設計「前台內容頁 — 上方標籤樣式」的 UI 框架。這是一個桌機版網站前台頁面，版面為全寬單欄。頁面標題（H1）下方有一排水平標籤列（Tab Bar），每個標籤對應一個子節點（例如：公司動態、關於我們、服務流程），第一個標籤為 active 狀態（下底線 2px + 字重加粗），其他標籤為 inactive。標籤列下方顯示 active 標籤對應子節點的文章列表，每條包含標題、發布日期、摘要。頁面最上方有麵包屑。請同時設計：(1) 空狀態（Tab 下方顯示「此分類目前沒有任何文章」）、(2) 標籤切換時的載入中骨架屏（標籤列保持可見，主內容顯示 5 條條目骨架）。請參考上傳文件中 Screen 2 的完整規格。
```

---

### Screen 3 — 前台內容頁（無樣式首項直通）

```
請幫我設計「前台內容頁 — 無樣式首項直通」的 UI 框架。這是一個桌機版網站前台頁面，無左側選單，也無上方標籤列。頁面為全寬單欄，直接顯示第一個子節點的文章列表（例如：「公司動態」的 10 篇文章），每條包含標題、發布日期、摘要。頁面最上方有兩層麵包屑（首頁 > 關於我們），末層（關於我們）不可點擊。頁面上沒有任何提示告知訪客此選單下還有其他子節點。請同時設計：(1) 空狀態（全寬顯示「此分類目前沒有任何文章」）、(2) 載入中骨架屏（全寬單欄條目骨架，無側欄或標籤骨架）。請參考上傳文件中 Screen 3 的完整規格。
```

---

### Screen 4 — 後台選單設定（孤兒節點警告提示）

```
請幫我設計「後台選單設定 — 孤兒節點警告提示」元件。這是一個桌機版後台管理介面，使用 Element Plus 視覺語言。在「列表樣式」設定區塊中，有一組 Radio Group（選項：無樣式 / 左側選單 / 下拉選單 / 上方標籤）。請設計兩種狀態：(1) Normal 狀態：選取「左側選單」，Radio Group 下方無任何警告，頁面底部有「儲存設定」Primary Button。(2) Warning 狀態：選取「無樣式」，Radio Group 下方即時出現黃色非阻斷式警告框，框內有警告圖示、標題「注意」、說明文字（前台將僅顯示第一順位的內容「公司動態」，其餘子選單「關於我們」、「服務流程」將無法被訪客看見）、以及建議改選「左側選單」的說明。警告框無關閉按鈕。警告框下方仍有可操作的「儲存設定」Button（警告不阻斷儲存）。請參考上傳文件中 Screen 4 的完整規格。
```

---

### 完整產品一次生成（可選）

```
請幫我設計「Evomni CMS 選單混合內容顯示」系統的四個相關介面。核心邏輯是「樣式驅動渲染」：後台選單樣式設定（左側選單 / 上方標籤 / 無樣式）決定前台的渲染行為。需設計：(1) 前台左側選單版 — 左右兩欄，左側多層導覽，右側文章列表，active 以 accent bar 標示；(2) 前台上方標籤版 — 全寬單欄，主內容上方有水平 Tab Bar，active tab 以下底線標示；(3) 前台無樣式首項直通版 — 全寬單欄，無任何導覽元件，直接顯示第一子節點的內容；(4) 後台警告元件 — Element Plus 語言，黃色非阻斷警告框，在選取「無樣式」且有多個子節點時顯示於 Radio Group 下方。所有前台版本需包含麵包屑、文章列表空狀態、載入骨架屏。請參考上傳文件中各 Screen 的完整規格。
```
