## 版本更新紀錄

| 版本 | 日期 | 修改內容 | 修改人 |
|------|------|----------|--------|
| v1.2 | 2026/05/04 | §6.2 進階設定補齊溫層屬性 UI 規格（`<el-radio-group>` + Tooltip + 溫層 icon 說明）；§8.5 products 表新增 `temperature_layer`、`show_temp_label` 欄位；「數據分析」→「數據中心」名詞統一 | Claude（依廖紫茵授權產出）|
| v1.1 | 2026/05/01 | 新增電商產品 vs CMS 頁面路由架構差異說明（§6.2 callout + §6.6 CSV status 欄備注）；DB Schema `status` 欄位補充 published/unpublished/draft 說明 | Claude（依廖紫茵授權產出）|
| v1.0 | 2026/04/28 | 初稿建立 | 廖紫茵（Claude 依授權產出）|

# Evomni - 產品中心 產品需求文件 (PRD) v1.2

## 1. 文件資訊

| 屬性 | 內容 |
| --- | --- |
| 版本 | v1.0 |
| 日期 | 2026/04/28 |
| 需求來源 | Evomni 新電商系統 Master PRD v1.2（Part 2 P1 補寫）+ 後台左側導覽架構規劃 v1.0 |
| 文件狀態 | **P1 首次完整規格**（取代舊 PRD v3.2）— 涵蓋產品管理、多規格 SKU、分類管理、庫存管理、批次匯入、自動上下架、0元產品、產品圖放大鏡、瀏覽紀錄、貨到通知 |
| 相依 PRD | Part2_溫層重量運費設定_PRD.md（運費規則不在本文件，見附件 PRD）|
| 作者 | 廖紫茵（Claude 依授權產出）|
| 開發時程 | 階段一 5–8月（電商啟航方案）/ 階段二 9–12月（進階電商包）|

---

## 2. 目標與功能總覽

### 2.1 核心願景與相依性

**核心問題：** 商家需要一個結構清晰、操作流暢的產品管理後台，從單品建立、多規格 SKU 設定、分類整理、庫存追蹤到批次上架，全程不需要工程師介入。

**解決方案：** 打造「一頁完成產品設定」的直觀後台，支援最多兩層規格矩陣（最多 100 個 SKU 組合）、拖曳排序、自動上下架排程、CSV 批次匯入、低庫存自動通知，並整合貨到通知訂閱管理。

**Evomni 價值對應：** 產品中心是整個電商系統的資料源頭——訂單依賴產品庫存、行銷活動依賴產品設定、數據中心依賴產品 PV 與銷量。產品中心品質直接決定整個系統的可靠性。

**系統相依性：**
- `媒體庫`：所有產品圖片上傳、裁切、WebP 轉檔皆透過 媒體庫 API
- `發信系統 發信模組`：低庫存通知、貨到通知 Email 皆透過 發信系統 發送
- `Part 3 訂單管理`：下單時讀取 `products.stock`（原子扣減）
- `Part 4 行銷活動`：優惠活動依賴產品 ID 和分類 ID
- `Part 6 會員管理`：貨到通知訂閱關聯 `members.id`
- `Part2_溫層重量運費設定 PRD`：產品溫層欄位和重量欄位與運費計算串接

---

### 2.2 功能總覽表

> 產品中心覆蓋產品全生命週期——從建立、上架、銷售到下架，並包含商家日常的庫存監控與批次維護作業。

| 主功能模組 | 子功能項目 | 功能目的 | 功能詳細描述 | 影響之使用者 |
| --- | --- | --- | --- | --- |
| 產品管理 | 產品列表 | 產品總覽與快速操作 | 表格呈現所有產品，支援關鍵字搜尋、分類篩選、狀態篩選、批次上下架、批次刪除、拖曳排序 | 商家管理員 |
| 產品管理 | 產品建立 | 新增單一產品完整資料 | 設定產品名稱、描述（富文本）、主圖/多圖（最多10張）、價格、特價、成本價、SEO 標題/描述/關鍵字、產品狀態、上下架檔期、溫層設定、重量設定、0元產品開關 | 商家管理員 |
| 產品管理 | 產品編輯 | 修改已建立產品的任意欄位 | 與建立頁相同介面，額外顯示「建立時間」「最後修改時間」「累計銷售數量」「累計瀏覽數（PV）」唯讀欄位 | 商家管理員 |
| 產品管理 | 多規格 SKU | 設定多層規格並生成 SKU 矩陣 | 最多兩層規格（如顏色×尺寸），每個規格值可設定代表圖；系統自動生成所有 SKU 組合，每個 SKU 可獨立設定價格/特價/庫存/重量/SKU 編號；最多 10 個規格值/每層，最多 100 個 SKU 組合 | 商家管理員 |
| 產品管理 | 自動上下架檔期 | 預設產品上下架時間 | 設定「上架時間」和「下架時間」，系統在指定時間自動變更產品狀態；上架時間若留空則立即上架；下架時間若留空則永久上架 | 商家管理員 |
| 產品管理 | 前台銷售數量顯示 | 在前台產品頁顯示銷售量資訊 | 後台可選「顯示實際數字」「顯示『熱銷中』文字」「不顯示」三種模式；顯示數字時可設定起始基數（如已售 + 1000） | 商家管理員、消費者 |
| 產品管理 | 產品瀏覽紀錄 | 追蹤產品頁面 PV 與 UV | 後台每個產品詳情頁顯示近 30 天 PV/UV 趨勢折線圖；列表頁可依總 PV 排序；PV 數據每日凌晨批次彙整至 `product_stats` 表 | 商家管理員 |
| 產品管理 | 產品圖放大鏡 | 提升前台產品圖瀏覽體驗 | 消費者在產品頁 hover 主圖時觸發放大鏡效果，放大倍率固定 2x，放大視窗顯示在主圖右側；行動裝置則改為點擊放大至全螢幕燈箱（Lightbox） | 消費者 |
| 產品管理 | 0元產品設定 | 支援免費產品/贈品上架 | 進階電商包功能；產品定價允許設定為 0 元；結帳時不走金流，直接產生訂單；需設定「最大每人領取數量」（預設 1，最大 999）以防濫用；後台可設定 0 元產品是否需要登入才能購買 | 商家管理員、消費者 |
| 產品分類 | 分類管理 | 建立/編輯產品分類樹 | 最多三層分類（根 → 子 → 孫）；每個分類可設定名稱、SEO 標題、分類圖片、顯示/隱藏；拖曳調整同層排序；分類刪除時若有產品關聯，需選擇「移至未分類」或「取消關聯」 | 商家管理員 |
| 產品分類 | 分類排序 | 調整前台分類顯示順序 | 後台拖曳排序同層分類，即時儲存到 `categories.sort_order` 欄位；前台依 `sort_order ASC` 渲染 | 商家管理員 |
| 庫存管理 | 庫存查看與調整 | 統一管理所有 SKU 庫存 | 庫存管理頁以表格呈現所有產品（含 SKU 展開）的現有庫存量；支援直接在表格內編輯庫存數量（Inline Edit）；每次調整自動寫入 `stock_adjustment_logs`（含調整前/後數量、原因備註、操作人員） | 商家管理員 |
| 庫存管理 | 低庫存通知 | 自動通知商家補貨 | 商家可在「全域設定 > 電商進階設定 > 庫存警示門檻」設定全局低庫存閾值（預設 5）；每個產品/SKU 可覆寫個別閾值；每日凌晨 Cron 掃描庫存 ≤ 閾值的 SKU，透過 發信系統 發送 Email 通知商家；同一 SKU 7 天內只發一次通知 | 商家管理員 |
| 庫存管理 | 貨到通知管理 | 後台查看/管理消費者貨到通知訂閱 | 顯示訂閱特定產品「貨到通知」的會員清單；庫存由 0 補貨（`stock` 從 0 變為 >0）時，自動批次透過 發信系統 發送 Email 給所有訂閱者；後台可手動標記「已通知」；訂閱清單支援匯出 CSV | 商家管理員、消費者 |
| 批次匯入 | CSV 匯入產品 | 大量產品快速上架 | 提供 CSV 模板下載（含所有欄位說明）；上傳後系統進行格式驗證；顯示驗證結果（成功 N 筆 / 錯誤 N 筆 + 錯誤明細）；確認後才執行匯入；支援「新增模式」和「更新模式」（依產品 SKU 編號匹配更新現有產品） | 商家管理員 |
| 批次匯入 | 批次操作 | 對多個產品執行同一操作 | 列表頁勾選多個產品後，可批次執行：上架、下架、刪除（進軟刪除）、移動分類 | 商家管理員 |

---

## 3. 全局功能流程

```mermaid
graph TD
    A[商家進入產品中心] --> B{操作意圖}
    B --> C[建立新產品]
    B --> D[管理現有產品]
    B --> E[CSV 批次匯入]
    B --> F[管理分類]
    B --> G[查看庫存]

    C --> C1[填寫基本資訊]
    C1 --> C2{是否啟用多規格?}
    C2 -- 否 --> C3[設定單一價格/庫存]
    C2 -- 是 --> C4[設定規格層與規格值]
    C4 --> C5[系統生成 SKU 矩陣]
    C5 --> C6[每個 SKU 設定價格/庫存/重量]
    C3 --> C7[設定上下架檔期與狀態]
    C6 --> C7
    C7 --> C8[儲存 → 寫入 products + product_skus]

    D --> D1[搜尋 / 篩選產品]
    D1 --> D2[點擊產品 → 編輯頁]
    D2 --> D3[修改欄位 → 儲存]
    D1 --> D4[批次選取 → 批次操作]

    E --> E1[下載 CSV 模板]
    E1 --> E2[上傳 CSV]
    E2 --> E3[格式驗證]
    E3 -- 有錯誤 --> E4[顯示錯誤報告]
    E4 --> E2
    E3 -- 全部通過 --> E5[預覽匯入清單]
    E5 --> E6[確認匯入 → 批次寫入 DB]

    G --> G1[庫存管理頁]
    G1 --> G2[Inline 編輯庫存]
    G2 --> G3[寫入 stock_adjustment_logs]
    G1 --> G4{庫存 ≤ 閾值?}
    G4 -- 是 --> G5[每日 Cron → 發信系統 發信通知]
    G1 --> G6[查看貨到通知訂閱清單]
    G6 --> G7{庫存由 0 → 正數?}
    G7 -- 是 --> G8[自動發貨到通知 Email]
```

**流程說明：**

產品建立是產品中心最核心的流程。進入建立頁後，商家先填寫基本資訊，接著決定是否啟用多規格。若啟用多規格，系統在商家設定規格層（如「顏色」「尺寸」）和規格值後，自動展開 SKU 矩陣供逐一設定價格與庫存。儲存時系統對 `products` 和 `product_skus` 兩張表進行 Transaction 寫入，確保資料一致。

---

## 4. 功能結構圖

```mermaid
mindmap
  root((產品中心))
    產品管理
      產品列表
        搜尋/篩選
        狀態切換
        拖曳排序
        批次操作
      產品建立/編輯
        基本資訊
          名稱/描述/富文本
          主圖/多圖
          分類
          SEO 設定
        規格與定價
          單規格模式
          多規格 SKU 矩陣
          價格/特價/成本價
          0元產品開關
        產品屬性
          溫層設定
          重量設定
          庫存數量
          低庫存閾值
        前台設定
          銷售數量顯示模式
          產品圖放大鏡
          上下架檔期
        數據唯讀欄位
          累計 PV/UV
          累計銷售數量
    產品分類
      分類樹管理
        最多三層
        拖曳排序
        分類圖片
        SEO 設定
      分類刪除安全
    庫存管理
      庫存列表
        Inline 編輯
        調整日誌
      低庫存通知
        全局閾值
        SKU 個別閾值
        7天防重複
      貨到通知管理
        訂閱清單
        自動觸發發信
        手動標記
    批次匯入
      CSV 模板
      格式驗證
      錯誤報告
      新增/更新模式
```

---

## 5. 使用者故事

**作為商家管理員，** 我想要建立一個有兩層規格（顏色×尺寸）的產品，每個 SKU 可以設定不同售價和庫存，以便於提供完整的產品選擇而不需要建立多個單品。

**作為商家管理員，** 我想要預先設定產品的上下架時間，以便於在活動期間產品自動上架、活動結束後自動下架，不需要在凌晨手動操作。

**作為商家管理員，** 我想要在庫存低於設定值時自動收到 Email 通知，以便於即時補貨，不讓斷貨影響消費者購物。

**作為商家管理員，** 我想要上傳 CSV 批次匯入 100 個產品，以便於新店開張時快速完成產品上架，不需要逐一手動建立。

**作為商家管理員，** 我想要查看哪些消費者訂閱了某個缺貨產品的貨到通知，當補貨完成時系統自動發送通知，以便於快速轉換購買意願。

**作為消費者，** 我想要在產品頁 hover 圖片時能放大查看細節，以便於判斷產品品質再決定是否購買。

**作為消費者，** 我想要看到產品的銷售數量（如「已售 1,234 件」），以便於透過社會認同增加購買信心。

**作為商家管理員，** 我想要設定 0 元產品讓消費者免費領取贈品，以便於搭配行銷活動送出試用品，且可限制每人最多領取 1 件。

---

## 6. UI/UX 與詳細功能需求

### 6.1 產品列表頁

#### A. 核心使用者流程

商家進入產品中心 → 看到產品列表（預設顯示「全部」狀態，依「更新時間 DESC」排序） → 可搜尋/篩選/排序/批次操作 → 點擊產品名稱進入編輯頁，或點擊「+新增產品」進入建立頁。

#### B. 介面佈局與元件拆解（Figma Ready）

**頁面佈局：**
- 頁首：麵包屑（產品中心 > 產品管理） + 右上角「+ 新增產品」主要操作按鈕（`#303133`，`!rounded-none`）
- 篩選列：搜尋輸入框 + 分類下拉 + 狀態下拉 + 批次操作按鈕（Disabled 直到勾選產品）
- 產品列表：`<el-table>` 含勾選欄、主圖縮圖、產品名稱/SKU、分類、狀態 Tag、庫存數、售價、更新時間、操作欄
- 分頁：`<el-pagination>` 每頁 20 筆，顯示總筆數

**元件細節：**

| 元件 | 規格 |
| --- | --- |
| 搜尋框 | `<el-input>` Placeholder：「搜尋產品名稱、SKU 編號」；即時搜尋（debounce 300ms）；可按 Enter 觸發搜尋；清除按鈕（x icon）|
| 分類篩選 | `<el-select>` 顯示「所有分類」預設；下拉選項含縮排的三層分類樹；多選模式 |
| 狀態篩選 | `<el-select>` 選項：全部 / 已上架 / 已下架 / 草稿 / 已排程（含上下架時間） |
| 產品主圖縮圖 | 48×48px 正方形，`object-fit: cover`；無圖時顯示 `<el-icon><Picture /></el-icon>` 灰色佔位 |
| 狀態 Tag | `<el-tag class="!rounded-full">`：已上架=`success`；已下架=`info`；草稿=`warning`；已排程=`#409EFF` primary |
| 庫存欄 | 庫存 ≤ 全局低庫存閾值時，數字變紅色（`#F56C6C`）並加 `⚠` icon |
| 售價欄 | 若有特價則顯示「特價 發信系統$X」（紅字）+ 「原價 發信系統$Y」（刪除線）；0元產品顯示「免費」Tag |
| 操作欄 | 「編輯」文字按鈕（藍色）、「複製」icon 按鈕（Tooltip: 複製此產品）、「刪除」icon 按鈕（紅色，二次確認）|
| 批次操作列 | 勾選後顯示：「已選 N 件產品」+ 批次按鈕（上架/下架/移至分類/刪除）；刪除顯示確認 Modal |

**批次操作 Dropdown 按鈕規格：**
- `<el-dropdown>` + `<el-button>` 觸發
- 下拉選項：批次上架 / 批次下架 / 移動分類（開 Drawer 選擇分類）/ 批次刪除（危險色）

#### C. 互動設計、狀態與系統反饋

- 搜尋無結果：Empty State 圖示 + 「找不到符合的產品」文字 + 「清除篩選」Button
- 刪除確認 Modal：「確定要刪除「{產品名稱}」嗎？此操作無法復原。產品將進入回收狀態，已成立的訂單不受影響。」確認按鈕為 `danger` 色
- 批次刪除時若有產品有進行中訂單，顯示警告：「{N} 件產品有進行中的訂單，無法刪除，其餘產品已刪除」

#### D. 防呆機制與錯誤預防

- 刪除有庫存的產品需二次確認
- 下架已排程產品時彈出提示：「此產品已設定自動上架時間（{日期}），下架後將清除排程。確定要繼續嗎？」

---

### 6.2 產品建立/編輯頁

#### A. 核心使用者流程

點擊「+新增產品」→ 進入產品建立頁（左側主要資訊，右側輔助設定面板）→ 填寫必填欄位 → 決定是否啟用多規格 → 設定庫存 → 設定上架狀態或排程 → 儲存。

#### B. 介面佈局與元件拆解（Figma Ready）

**頁面整體佈局：**
- 頂部：麵包屑（產品中心 > 新增產品 / 編輯：{產品名稱}）+ 右上角操作列（「儲存草稿」次要按鈕 + 「儲存並上架」主要按鈕）
- 左側主欄（寬度約 70%）：基本資訊 → 產品圖片 → 富文本描述 → 規格與定價 → SEO 設定
- 右側輔助欄（寬度約 30%）：產品狀態卡片 → 上下架檔期 → 產品分類 → 銷售數量顯示設定 → 進階設定（0元產品/溫層/重量）

**左側主欄元件：**

| 區塊 | 元件 | 規格 |
| --- | --- | --- |
| 基本資訊 | 產品名稱 | `<el-input>` Required；Placeholder：「請輸入產品名稱（最多 100 字）」；字元計數 0/100；超過時邊框變 `#F56C6C`，提示文字「產品名稱不可超過 100 個字元」|
| 基本資訊 | 產品簡短說明 | `<el-input type="textarea">` Optional；Placeholder：「選填，顯示於產品列表卡片下方（最多 200 字）」；字元計數 |
| 產品圖片 | 主圖上傳 | 呼叫 媒體庫 API；正方形拖放區（200×200px 預覽）；支援 JPG/PNG/WebP；最大 10MB；自動轉 WebP；上傳成功後顯示縮圖；可重新上傳；Required |
| 產品圖片 | 多圖上傳 | 最多 9 張附圖（含主圖共 10 張）；橫向縮圖列表；拖曳調整順序；每張都可刪除；點擊縮圖放大預覽 |
| 富文本描述 | 產品詳細說明 | 富文本編輯器（支援標題 H2/H3、粗體、斜體、列表、圖片插入（呼叫 媒體庫）、YouTube 嵌入、表格）；Placeholder：「請輸入產品詳細說明…」|
| SEO 設定 | SEO 標題 | `<el-input>` Placeholder：「留空則自動使用產品名稱」；字元計數 0/70；超出 60 字時變黃色警告：「建議 SEO 標題在 60 字元內」|
| SEO 設定 | SEO 描述 | `<el-input type="textarea">` Placeholder：「留空則自動截取產品說明前 160 字」；字元計數；超出 160 字警告 |
| SEO 設定 | SEO 關鍵字 | `<el-input>` Placeholder：「多個關鍵字以逗號分隔」|

**右側輔助欄元件：**

| 區塊 | 元件 | 規格 |
| --- | --- | --- |
| 產品狀態 | 狀態切換 | `<el-select>`；選項：已上架 / 已下架 / 草稿；預設「草稿」（新產品）|
| 上下架檔期 | 上架時間 | `<el-date-picker type="datetime">`；Placeholder：「立即上架（留空）」；設定時間後狀態自動切換為「已排程」|
| 上下架檔期 | 下架時間 | `<el-date-picker type="datetime">`；Placeholder：「永久上架（留空）」；下架時間必須晚於上架時間，否則顯示「下架時間必須晚於上架時間」|
| 產品分類 | 分類選擇 | `<el-tree-select>` 多選；顯示三層分類樹；可不選（產品進「未分類」）|
| 銷售數量顯示 | 顯示模式 | `<el-select>` 選項：不顯示 / 顯示實際數字 / 顯示「熱銷中」文字；預設「不顯示」|
| 銷售數量顯示 | 起始基數 | 當模式為「顯示實際數字」時出現；`<el-input-number>` min=0，預設 0；Tooltip：「前台顯示數量 = 實際銷售量 + 此基數，用於初期產品增加社會認同感」|
| 進階設定 | 溫層屬性 | `<el-radio-group>`；選項：常溫 / 冷藏（7°C 以下）/ 冷凍（-18°C 以下）；預設「常溫」；Tooltip（`<el-tooltip>`）：「溫層屬性影響結帳時的運費計算，請至 全域設定 > 金物流串接 > 物流與運費 > 溫層運費規則 完成費率設定」；選擇冷藏/冷凍後產品頁顯示溫層 icon（❄️ 冷凍 / 🌡️ 冷藏）|
| 進階設定 | 溫層說明（前台顯示）| `<el-switch>` 預設 ON（當溫層為冷藏/冷凍時）；標籤：「在產品頁顯示溫層標示」；常溫產品此選項隱藏 |
| 進階設定 | 0元產品 | `<el-switch>` 預設關閉；標籤：「設為免費產品（0 元）」；啟用後隱藏所有價格輸入欄，並顯示「每人最大領取數量」設定；僅進階電商包顯示此選項（啟航方案顯示鎖頭 icon + 「需升級進階電商包」）|
| 進階設定 | 0元每人限量 | `<el-input-number>` min=1，max=999，預設 1；Tooltip：「限制每個會員帳號最多領取幾件，防止濫用」|
| 進階設定 | 0元是否需登入 | `<el-switch>` Tooltip：「開啟後，消費者需登入才能加入購物車免費領取」|

> **📌 架構差異說明（與形象網站不同）：**
>
> **電商產品的前台路由由「上架狀態」直接決定，不需加入選單管理。** 這與形象網站（CMS）的設計邏輯不同：
>
> | 狀態 | 形象網站（CMS 頁面） | 電商產品 |
> |---|---|---|
> | 草稿 | 無前台路徑（未加入選單） | `/products/{slug}` 返回 404 |
> | 已上架 | 需手動加入選單管理才有前台路徑 | `/products/{slug}` 自動啟用，消費者可瀏覽與購買 |
> | 已下架 | 從選單移除後路徑失效 | `/products/{slug}` 保留頁面，顯示「此產品目前無法購買」，不可加入購物車；SEO 權重保留 |
>
> **原因：** 電商產品是「交易型內容」，上架即代表商家宣告此產品可銷售，URL 存在與否不需另一層選單管理決定。CMS 頁面是「導覽型內容」，由設計師透過選單管理決定哪些頁面出現在網站架構中。

#### C. 互動設計、狀態與系統反饋

- 離開頁面前若有未儲存變更，顯示瀏覽器確認對話框：「您有未儲存的變更，確定要離開嗎？」
- 儲存成功：`<el-message>` Toast（`success`）：「產品已儲存」；若為「儲存並上架」則顯示：「產品已上架，消費者現在可以看到此產品」
- 儲存失敗：`<el-message>` Toast（`error`）：「儲存失敗，請重試。若問題持續發生請聯繫客服。」
- 圖片上傳進行中：圖片區域顯示進度條 + 百分比數字

#### D. 防呆機制與錯誤預防

- 產品名稱為 Required，儲存時未填則邊框變紅 + 頁面滾動到第一個錯誤欄位 + 顯示「請填寫產品名稱」
- 主圖為 Required，儲存時未上傳則圖片區域顯示紅色邊框 + 「請上傳產品主圖」
- 0元產品啟用時若價格欄位有值，系統自動清空並 Toast 提示：「已啟用免費產品模式，價格設定已清除」

---

### 6.3 多規格 SKU 設定區塊

#### A. 核心使用者流程

在產品建立/編輯頁的「規格與定價」區塊 → 預設為單規格模式（顯示價格/特價/成本價/庫存） → 勾選「啟用多規格」→ 出現規格設定區 → 新增規格層（如「顏色」）→ 輸入規格值（如「紅色, 藍色, 黑色」）→ 可選上傳各規格值的代表圖 → 新增第二層規格（如「尺寸」）→ 系統自動生成 SKU 矩陣 → 逐一或批次設定 SKU 的價格/庫存。

#### B. 介面佈局與元件拆解（Figma Ready）

**單規格模式（預設）：**

| 元件 | 規格 |
| --- | --- |
| 售價 | `<el-input-number>` Required；prefix 顯示「發信系統$」；min=0；步進 1；Placeholder「0」；0元產品啟用時隱藏 |
| 特價 | `<el-input-number>` Optional；prefix 顯示「發信系統$」；特價必須 < 售價，否則顯示「特價必須低於售價」|
| 成本價 | `<el-input-number>` Optional；Tooltip：「成本價不會顯示於前台，僅用於後台毛利計算」；prefix 顯示「發信系統$」|
| 庫存數量 | `<el-input-number>` min=0；Placeholder「0」；Tooltip：「設為 0 時前台顯示為「售完」」|
| 低庫存閾值 | `<el-input-number>` Optional；Placeholder：「使用全局設定（N）」；Tooltip：「低於此數量時發送低庫存通知 Email」|
| SKU 編號 | `<el-input>` Optional；Placeholder：「產品貨號（選填）」；最多 64 字元 |
| 重量 | `<el-input-number>` Optional；suffix「公斤」；保留 3 位小數（`DECIMAL(8,3)`）；Tooltip：「用於重量運費計算，留空則不啟用重量運費」|

**多規格模式（啟用後）：**

| 元件 | 規格 |
| --- | --- |
| 啟用多規格 Toggle | `<el-switch>` 標籤：「啟用多規格（如顏色、尺寸）」；開啟時將現有單規格庫存數據清空並彈出確認 |
| 規格層新增 | `<el-button class="!rounded-none">` 文字：「+ 新增規格層」；最多新增 2 層；超過 2 層時 Button Disabled + Tooltip：「最多設定兩層規格」|
| 規格層名稱 | `<el-input>` Placeholder：「規格名稱（如：顏色）」；Required；最多 20 字 |
| 規格值輸入 | 動態 Tag 輸入模式（輸入後按 Enter 或逗號確認）；`<el-tag class="!rounded-full">` 每個規格值可刪除；最多 10 個規格值/每層；超過 10 個顯示：「每層最多 10 個規格值」|
| 規格值圖片 | 每個規格值右側有「上傳圖片」icon；點擊呼叫 媒體庫 API 上傳；上傳後 Tag 左側顯示 16×16px 縮圖；Tooltip：「規格代表圖顯示於前台規格選擇器旁」|
| SKU 矩陣表格 | `<el-table>` 自動生成所有排列組合（規格值1 × 規格值2）；每列一個 SKU；每列可輸入：SKU 編號 / 售價 / 特價 / 庫存 / 重量 |
| SKU 矩陣批次填入 | 表格上方「批次填入」工具列：選擇欄位（售價/特價/庫存）+ 輸入值 + 「套用至所有 SKU」Button；Tooltip：「可快速為所有 SKU 設定相同的售價或庫存，再個別調整不同的項目」|
| SKU 啟用/停用 | 每個 SKU 列最後一欄：Toggle；關閉時前台該規格組合顯示為「無此選項」（不顯示於選擇器）|

**SKU 矩陣範例（顏色×尺寸）：**

| SKU 編號 | 顏色 | 尺寸 | 售價（發信系統$）| 特價（發信系統$）| 庫存 | 重量（kg）| 啟用 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TS-RED-S | 紅色 | S | 890 | 790 | 50 | 0.3 | ✅ |
| TS-RED-M | 紅色 | M | 890 | 790 | 80 | 0.35 | ✅ |
| TS-BLK-S | 黑色 | S | 890 | — | 0 | 0.3 | ✅ |

#### C. 互動設計、狀態與系統反饋

- 刪除規格值時若已有 SKU 矩陣：彈出確認對話框「刪除「紅色」規格值將同時刪除 3 個 SKU 組合，相關庫存資料將清除。確定繼續？」
- SKU 數量 > 50 時在矩陣上方顯示黃色提示：「您目前有 {N} 個 SKU 組合，建議考慮是否合併規格值以簡化管理」
- SKU 矩陣表格所有欄位支援 Tab 鍵切換聚焦，提升鍵盤操作效率

#### D. 防呆機制與錯誤預防

- 規格層名稱不可重複（如兩個「顏色」）：即時驗證，出現重複時邊框紅色 + 「規格名稱已存在，請使用不同名稱」
- 規格值不可在同一層內重複（如兩個「紅色」）：即時驗證提示
- SKU 售價為 Required（多規格模式）：儲存時若有 SKU 未填售價，滾動到矩陣並 highlight 空白格

---

### 6.4 產品分類管理

#### A. 核心使用者流程

進入「產品中心 > 產品分類」→ 看到分類樹列表 → 可新增根分類 → 展開後可在其下新增子分類（最多三層）→ 拖曳調整同層排序 → 點擊分類名稱進入編輯頁（名稱/圖片/SEO/顯示狀態）。

#### B. 介面佈局與元件拆解（Figma Ready）

**分類管理頁面佈局：**
- 頁首：麵包屑 + 右上角「+ 新增根分類」Button
- 分類樹：`<el-tree>` 可展開/收合；左側拖曳把手圖示；每個節點顯示：分類名稱 + 產品數量 Badge + 顯示/隱藏 Toggle + 操作按鈕（編輯/新增子分類/刪除）
- 分類層級：以縮排視覺化三層結構；層級1 字體 `font-weight: 600`；層級2 縮排 16px；層級3 縮排 32px

**分類節點操作按鈕：**
- 「編輯」→ 右側 Drawer 開啟（不跳頁，保持分類樹可見）
- 「新增子分類」→ 在該節點下建立子節點（若已三層則 Disabled + Tooltip「最多三層分類」）
- 「刪除」→ 確認對話框，選擇產品處理方式

**分類編輯 Drawer（600px 寬）：**

| 元件 | 規格 |
| --- | --- |
| 分類名稱 | `<el-input>` Required；Placeholder「請輸入分類名稱（最多 50 字）」|
| SEO 標題 | `<el-input>` Placeholder「留空則使用分類名稱」|
| SEO 描述 | `<el-input type="textarea">` |
| 分類圖片 | 呼叫 媒體庫 API；矩形區域（建議尺寸：600×300px）；Tooltip「顯示於前台分類頁頂部」|
| 顯示/隱藏 | `<el-switch>` 標籤：「在前台顯示此分類」；Tooltip「隱藏後前台分類選單不顯示，但已分類產品仍可透過直接連結存取」|

#### C. 互動設計、狀態與系統反饋

- 拖曳排序：拖曳完成後自動 `PATCH /api/v1/categories/reorder`，Toast：「分類順序已更新」
- 拖曳跨層（企圖將層級1分類拖入層級2下方）：系統阻止並恢復原位，Toast：「不支援跨層拖曳，請在同層內調整順序」

#### D. 防呆機制與錯誤預防

**刪除分類確認對話框：**

```
確定要刪除「{分類名稱}」嗎？

此分類目前有 {N} 件產品。請選擇產品的處理方式：
○ 將產品移至「未分類」
○ 取消關聯（產品保留，僅移除此分類標籤）

[取消]  [確定刪除]
```

若分類有子分類，則提示：「此分類有 {N} 個子分類，刪除父分類將同時刪除所有子分類。子分類中共有 {M} 件產品需要處理。」

---

### 6.5 庫存管理頁

#### A. 核心使用者流程

進入「產品中心 > 庫存管理」→ 看到所有產品/SKU 的庫存總覽表 → 可依產品名稱搜尋、依低庫存篩選 → 點擊產品列展開查看各 SKU 庫存 → Inline 修改庫存數量 → 自動記錄 `stock_adjustment_logs`。

#### B. 介面佈局與元件拆解（Figma Ready）

**庫存管理表格：**

| 欄位 | 說明 |
| --- | --- |
| 產品名稱（可展開） | 左側展開箭頭 icon；展開後顯示各 SKU 行 |
| SKU（展開後） | 顯示規格組合（如「紅色 / M」）或單品 SKU 編號 |
| 現有庫存 | 數字；低庫存時顯示 `⚠ {N}（低庫存）`（紅色）|
| 低庫存閾值 | 顯示套用中的閾值（若 SKU 有個別設定顯示個別值，否則顯示「全局: {N}」）|
| Inline 編輯 | 點擊庫存數字進入編輯模式：顯示 `<el-input-number>` + 「備註（選填）」輸入框 + 確認/取消 icon；按 Enter 確認，按 Escape 取消 |
| 調整記錄 | 每行最右側「查看紀錄」Button → 開啟 Drawer 顯示此 SKU 的 `stock_adjustment_logs`（時間/調整前後數量/操作人員/備註）|

**低庫存篩選 Tab：**
- Tab 列：全部產品 / ⚠ 低庫存（N）/ 售完（庫存=0）
- 「低庫存」Tab 顯示所有庫存 ≤ 閾值的 SKU，方便批次處理

**貨到通知管理 Sub-Tab（在庫存管理頁內）：**

| 欄位 | 說明 |
| --- | --- |
| 產品名稱 | 有訂閱貨到通知的產品（庫存 = 0 才會有訂閱）|
| 訂閱人數 | 共 N 位會員訂閱 |
| 訂閱清單 | 點擊展開：顯示各訂閱者的 Email / 訂閱時間 |
| 通知狀態 | 「待通知」（庫存仍 = 0）/ 「已自動通知」（補貨後自動發送）/「已手動標記」|
| 操作 | 「手動發送通知」Button（已通知者 Disabled）；「匯出訂閱清單」Button → CSV |

#### C. 互動設計、狀態與系統反饋

- Inline 編輯確認後 Toast：「庫存已更新（{調整前} → {調整後}），已記錄調整日誌」
- 貨到通知自動觸發條件：`UPDATE products SET stock = {N} WHERE id = {id}` 後，若 `stock` 從 0 變為 > 0，觸發 Queue Job 批次發送貨到通知 Email（透過 發信系統）；Job 完成後更新 `notify_stock_subscribers` 的 `notified_at`

#### D. 防呆機制與錯誤預防

- 庫存調整不允許輸入負數（`min=0`）
- 直接將庫存設為 0 時顯示確認：「將庫存設為 0 後，前台此產品將顯示為「售完」，消費者無法加入購物車。確定繼續？」

---

### 6.6 CSV 批次匯入

#### A. 核心使用者流程

進入產品列表頁 → 點擊「批次匯入」Button → 開啟匯入 Dialog → 下載 CSV 模板 → 填寫後上傳 → 查看驗證結果 → 確認匯入。

#### B. 介面佈局與元件拆解（Figma Ready）

**匯入 Dialog（寬度 720px）：**

**步驟 1 — 上傳檔案：**
- 「下載 CSV 模板」Button（`secondary`，icon: download）
- 拖放上傳區：「將 CSV 檔案拖放於此，或點擊選擇檔案」；支援 `.csv` 檔案；最大 10MB
- 模式選擇：`<el-radio-group>` 「新增模式（全部新增）」/ 「更新模式（依 SKU 編號匹配，新增不存在的，更新已存在的）」
- 「下一步」Button

**步驟 2 — 驗證結果：**

若有錯誤：
```
驗證完成：共 200 筆資料
✅ 可匯入：185 筆
❌ 有誤：15 筆（將跳過）

錯誤明細：
第 23 列：售價欄位為空（產品名稱：女款花漾T恤）
第 45 列：分類「春夏新品」不存在，請先建立分類
第 67 列：SKU 編號重複（TS-RED-M 已存在於系統）
... [展開查看全部 15 筆錯誤]
```

「繼續匯入（跳過錯誤）」Button + 「取消」Button + 「下載錯誤報告」Button（CSV）

**步驟 3 — 完成：**
- 成功圖示 + 「已成功匯入 185 件產品」
- 「查看已匯入產品」Button + 「關閉」Button

**CSV 模板欄位說明：**

| 欄位 | 必填 | 說明 |
| --- | --- | --- |
| product_name | ✅ | 產品名稱 |
| description | ❌ | 純文字描述（不支援 HTML）|
| category_name | ❌ | 分類名稱（必須與後台分類完全匹配）|
| price | ✅ | 售價（整數，0=免費，進階方案）|
| special_price | ❌ | 特價（整數，必須 < price）|
| cost_price | ❌ | 成本價 |
| sku_code | ❌ | SKU 編號（更新模式必填）|
| stock | ✅ | 庫存數量（整數，最小 0）|
| weight_kg | ❌ | 重量（小數，如 0.5）|
| temperature_layer | ❌ | 溫層（常溫/冷藏/冷凍）|
| status | ❌ | 狀態（`published`=已上架 / `unpublished`=已下架 / `draft`=草稿，預設 draft）；**此欄位直接決定前台路由是否啟用，不需加入選單管理**（與 CMS 形象網站架構不同，詳見 §6.2 架構差異說明）|
| spec1_name | ❌ | 第一層規格名稱（如：顏色）|
| spec1_value | ❌ | 第一層規格值（如：紅色）|
| spec2_name | ❌ | 第二層規格名稱（如：尺寸）|
| spec2_value | ❌ | 第二層規格值（如：M）|

> 多規格產品需重複多列（同產品名稱，不同規格值）

#### C. 互動設計、狀態與系統反饋

- 上傳後立即顯示進度條；驗證耗時較長時（>3 秒）顯示 Loading 動畫 + 「正在驗證資料，請稍候…」
- 匯入完成後若有跳過的錯誤列，Toast 顯示：「批次匯入完成。185 件產品已匯入，15 件因格式錯誤已略過。可下載錯誤報告查看詳情。」

#### D. 防呆機制與錯誤預防

- 非 CSV 格式顯示：「請上傳 .csv 格式的檔案」
- 超過 10MB 顯示：「檔案大小超過 10MB，請分批上傳」
- 空白 CSV 顯示：「CSV 檔案沒有資料，請檢查後重試」

---

## 7. 細部邏輯流程圖

### 7.1 多規格 SKU 生成邏輯

```mermaid
graph TD
    A[商家設定規格層] --> B{幾層規格?}
    B -- 一層 --> C[規格層1: 顏色 = 紅/藍/黑]
    B -- 兩層 --> C
    C --> D{有第二層?}
    D -- 否 --> E[SKU列表 = 規格1各值\n共N個SKU]
    D -- 是 --> F[規格層2: 尺寸 = S/M/L]
    F --> G[笛卡爾積 Cross Join\nSKU = 規格1 × 規格2]
    G --> H{SKU 數量 > 100?}
    H -- 是 --> I[顯示錯誤: SKU 組合超過 100 個上限\n請減少規格值]
    H -- 否 --> J[生成 SKU 矩陣表格]
    E --> J
    J --> K[商家逐一填入SKU設定]
    K --> L[儲存時 Transaction 寫入\nproducts + product_skus]
```

### 7.2 自動上下架排程邏輯

```mermaid
graph TD
    A[每分鐘 Scheduled Job] --> B[查詢 products\nWHERE status = scheduled\nAND publish_at <= NOW]
    B --> C{有待上架產品?}
    C -- 是 --> D[UPDATE status = published]
    D --> E[記錄 product_status_logs]
    C -- 否 --> F[結束]

    G[每分鐘 Scheduled Job] --> H[查詢 products\nWHERE status = published\nAND unpublish_at <= NOW\nAND unpublish_at IS NOT NULL]
    H --> I{有待下架產品?}
    I -- 是 --> J[UPDATE status = unpublished]
    J --> K[記錄 product_status_logs]
    I -- 否 --> L[結束]
```

### 7.3 低庫存通知觸發邏輯

```mermaid
graph TD
    A[每日凌晨 00:05 Cron] --> B[查詢所有 SKU\n庫存 ≤ 低庫存閾值]
    B --> C[過濾: 7 天內是否已發過通知?]
    C --> D[查詢 low_stock_notification_logs\nWHERE sku_id = X\nAND sent_at > NOW - 7days]
    D -- 有紀錄 --> E[跳過，不重複通知]
    D -- 無紀錄 --> F[透過 發信系統 發送低庫存通知 Email\n收件人: 商店設定的通知 Email]
    F --> G[寫入 low_stock_notification_logs]
```

### 7.4 貨到通知觸發邏輯

```mermaid
graph TD
    A[庫存更新 API 被呼叫] --> B[UPDATE products.stock]
    B --> C{更新前 stock = 0\n更新後 stock > 0?}
    C -- 否 --> D[結束，不觸發貨到通知]
    C -- 是 --> E[查詢 notify_stock_subscribers\nWHERE product_id = X\nAND notified_at IS NULL]
    E --> F{有訂閱者?}
    F -- 否 --> D
    F -- 是 --> G[推送到 Queue Job]
    G --> H[批次透過 發信系統 發送貨到通知 Email\n每批最多 100 封]
    H --> I[更新 notified_at = NOW]
    I --> J[記錄通知結果 log]
```

---

## 8. 非功能性需求

### 8.1 效能需求

| 指標 | 目標 |
| --- | --- |
| 產品列表頁載入（100 件產品）| ≤ 1 秒 |
| 產品建立/儲存 API 回應時間 | ≤ 500ms |
| CSV 批次匯入（200 筆）| ≤ 30 秒（後台 Job 處理，前台輪詢）|
| SKU 矩陣渲染（100 個 SKU）| ≤ 300ms（前端 Vue 渲染）|
| 圖片上傳（媒體庫 API）| ≤ 5 秒（10MB 以內）|
| 分類樹載入 | ≤ 500ms（最多 3 層 × 50 個節點）|

### 8.2 安全性需求

- 產品 API 全部需驗證 JWT Token（商家身份）
- 產品圖片上傳透過後端轉發至 媒體庫 API，不允許前端直接呼叫 （防止未授權上傳）
- CSV 匯入內容進行 XSS 清除（特別是 description 欄位）
- SKU 庫存調整寫入 `stock_adjustment_logs` 留存審計軌跡（不可刪除）
- 產品軟刪除（`deleted_at` 時間戳），不做物理刪除；已關聯訂單的產品不允許永久刪除

### 8.3 資料一致性

- 產品庫存扣減使用 `SELECT ... FOR UPDATE` 悲觀鎖（與訂單管理 PRD §8.5.1 一致）
- 多規格產品的 `products` 和 `product_skus` 寫入在同一 Transaction 內
- 分類刪除時產品關聯更新也在同一 Transaction 內
- 產品 `total_sold` 欄位由訂單完成後的 Event 更新（非即時，延遲 ≤ 1 分鐘）

### 8.4 瀏覽器/裝置支援

- 後台：Chrome / Edge / Safari 最近兩版；最小解析度 1280px 寬；不支援 IE
- 前台產品頁（放大鏡/貨到通知訂閱）：支援 iOS Safari、Android Chrome；放大鏡在行動裝置改為 Lightbox

### 8.5 資料庫補充規格

**核心資料表結構：**

```sql
-- 產品主表
CREATE TABLE products (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    slug            VARCHAR(100) UNIQUE NOT NULL,
    description     LONGTEXT,
    seo_title       VARCHAR(70),
    seo_description VARCHAR(200),
    seo_keywords    VARCHAR(200),
    status          ENUM('published','unpublished','draft','scheduled') DEFAULT 'draft',
    publish_at      DATETIME NULL,
    unpublish_at    DATETIME NULL,
    temperature_layer ENUM('normal','cold','frozen') DEFAULT 'normal', -- 溫層：常溫/冷藏/冷凍
    show_temp_label TINYINT(1) DEFAULT 1,        -- 前台是否顯示溫層 icon
    is_free         TINYINT(1) DEFAULT 0,       -- 0元產品開關
    free_max_per_user INT DEFAULT 1,             -- 每人最大領取數量
    free_login_required TINYINT(1) DEFAULT 0,
    sales_display_mode ENUM('none','count','hot') DEFAULT 'none',
    sales_count_base INT DEFAULT 0,              -- 銷售基數
    total_sold      INT DEFAULT 0,               -- 累計銷售數量（非即時）
    sort_order      INT DEFAULT 0,
    deleted_at      DATETIME NULL,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_sort_order (sort_order),
    INDEX idx_deleted_at (deleted_at)
);

-- SKU 表
CREATE TABLE product_skus (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id      BIGINT UNSIGNED NOT NULL,
    sku_code        VARCHAR(64),
    spec_values     JSON,   -- {"顏色":"紅色","尺寸":"M"}
    price           INT NOT NULL,
    special_price   INT NULL,
    cost_price      INT NULL,
    stock           INT DEFAULT 0,
    low_stock_threshold INT NULL,    -- NULL 代表使用全局設定
    weight          DECIMAL(8,3) NULL,
    is_active       TINYINT(1) DEFAULT 1,
    deleted_at      DATETIME NULL,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    INDEX idx_product_id (product_id),
    UNIQUE KEY uniq_product_sku (product_id, sku_code)
);

-- 庫存調整日誌（不可刪除）
CREATE TABLE stock_adjustment_logs (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sku_id          BIGINT UNSIGNED NOT NULL,
    before_stock    INT NOT NULL,
    after_stock     INT NOT NULL,
    adjustment      INT NOT NULL,   -- after - before，可為負
    reason          VARCHAR(255),
    operator_id     BIGINT UNSIGNED,  -- 後台操作人員 ID（自動扣減為 NULL）
    source          ENUM('manual','order','return','import') DEFAULT 'manual',
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_sku_id (sku_id),
    INDEX idx_created_at (created_at)
);

-- 產品統計（每日批次彙整）
CREATE TABLE product_stats (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id  BIGINT UNSIGNED NOT NULL,
    date        DATE NOT NULL,
    pv          INT DEFAULT 0,
    uv          INT DEFAULT 0,
    add_to_cart INT DEFAULT 0,
    UNIQUE KEY uniq_product_date (product_id, date),
    INDEX idx_product_id (product_id)
);

-- 貨到通知訂閱
CREATE TABLE notify_stock_subscribers (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id  BIGINT UNSIGNED NOT NULL,
    sku_id      BIGINT UNSIGNED NULL,
    member_id   BIGINT UNSIGNED NULL,
    email       VARCHAR(255) NOT NULL,
    notified_at DATETIME NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_product_id_notified (product_id, notified_at)
);
```

---

## 與團隊溝通摘要

- 這次的規格是關於**產品中心（Part 2）**，是整個電商系統的資料源頭，訂單/行銷/數據全都依賴產品資料，這個模組品質很重要
- **工程師這邊需要注意**：多規格 SKU 建立時，`products` 和 `product_skus` 兩張表必須在同一 Transaction 內寫入；庫存扣減要用 `SELECT FOR UPDATE`（和 Part 3 訂單管理一致）；自動上下架是每分鐘 Cron，不是 Event Scheduler，要確認 Laravel Schedule 有正常跑
- **設計師這邊需要注意**：產品建立頁是「左主欄 + 右輔助欄」兩欄佈局；多規格 SKU 矩陣是這頁最複雜的元件，每個 SKU 列要能 Inline 輸入價格和庫存，手機版降格為 Accordion 展示；產品列表的低庫存警告用紅色 `#F56C6C` + ⚠ icon
- **這個模組依賴**：媒體庫（圖片上傳）、發信系統 發信（低庫存通知/貨到通知）、Part 3 訂單管理（庫存扣減邏輯共用）
- **特別注意**：0 元產品是進階電商包專屬，啟航方案要顯示鎖頭 icon 而不是隱藏；溫層和重量的詳細規則見獨立的 `Part2_溫層重量運費設定_PRD.md`，本文件只涵蓋欄位設定介面
- **目前有 1 個待確認事項**：0 元產品的「每人最大領取數量」是否要限制在「登入會員」才算，還是連訪客下單也算（建議：依裝置 fingerprint + Email 去重，若未登入則強制要求登入）
