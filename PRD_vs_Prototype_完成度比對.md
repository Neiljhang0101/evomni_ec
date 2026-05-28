# PRD vs Prototype 完成度比對

> 報告日期：2026-05-28
> 工作目錄：C:\Users\Neil\Desktop\evo_ec_ux
> 比對範圍：27 份 PRD 文件 vs 16 個 Prototype 來源（React 元件 + 獨立 HTML）
> 本文件禁止使用 Emoji，全文採繁體中文。

---

## 目錄

1. 儀表板（Dashboard）
2. 商品中心 — 商品管理
3. 商品中心 — 商品分類
4. 商品中心 — 庫存管理
5. 溫層重量運費設定
6. 訂單管理
7. 行銷中心 — 優惠活動（優惠券 + 促銷活動）
8. 行銷中心 — 贈品管理
9. 行銷中心 — 自動旅程
10. 行銷中心 — 一頁式商店（Landing Page）
11. 數據中心
12. 廣告投放工具
13. 行銷追蹤碼管理
14. 會員管理後台
15. 顧客與會員整合管理
16. 金物流串接設定
17. 方案管理與升級流程
18. 飛信電子報串接
19. 美安串接
20. 第三方登入
21. 串接設定後台管理（整合中心）
22. 全域設定 — 電商設定
23. 前台會員登入
24. 會員前台個人中心
25. 購物車與結帳流程
26. 優惠計算引擎技術規格
27. CMS 選單 SEO 保護機制
28. 形象產品與電商商品整合架構
29. 後台左側導覽架構

---

## 1. 儀表板（Dashboard）

**對應 Prototype 檔案**：`components/pages/PageDashboard.jsx`（由 `index.html` 載入，路由 `dashboard`）
**對應 PRD 文件**：`PRD_new/儀表板_Dashboard_需求規格_v1.0_20260521.md`

### PRD 要求但 Prototype 未完成

- 三種客戶情境切換邏輯（純電商 / CMS+電商 / 純 CMS）在 Prototype 中未見情境分流 UI
- 輔助統計區塊（CMS 形象站專屬：詢問單統計、文章瀏覽量、頁面流量）未見實作
- Sitemap 按鈕（次要樣式，連結至 XML 檔）未見
- 各 KPI 卡片的載入時間須 ≤ 1.5 秒需求為非功能性需求，Prototype 未涉及但已知
- 時間範圍篩選器（今日 / 昨日 / 本週 / 本月 / 自訂）未見於 Prototype

### Prototype 有但 PRD 未提及

- 快速導覽入口格（Quick Navigation Grid），列出商品管理、訂單管理、行銷中心等入口（見 `産品中心.html` 同樣手法）
- 低庫存警示列表（直接呈現在 Dashboard 主畫面）

### 已對齊

- KPI 卡片：總銷售金額（GMV）、訂單筆數、平均客單價、訂單完成率（見 `數據中心.html` 資料結構）
- Delta 趨勢指示（與前期比較）及 Tooltip 說明

---

## 2. 商品中心 — 商品管理

**對應 Prototype 檔案**：`html/産品中心.html`（`ProductListPage`、`AddEditProductPage` 元件）
**對應 PRD 文件**：`PRD_new/Evomni_Part2_商品中心_PRD.md`

### PRD 要求但 Prototype 未完成

- 多規格（庫存單位 / SKU）矩陣設定（最多 2 層規格、100 組庫存單位）：Prototype `AddEditProductPage` 介面已有規格設定區塊，但多規格批次建立流程（規格矩陣一次性建立）未見完整實作
- 自動排程上下架（`published_at` 定時發布）：表單欄位未見日期時間選擇器
- 商品瀏覽記錄（View History / 前台瀏覽數顯示）：Prototype 商品列表未見此欄位
- 商品放大鏡功能（商品圖片前台 Zoom）：為前台功能，後台 Prototype 未涵蓋
- 商品 0 元設定需登入邏輯：為前台購物流程，後台 Prototype 未涵蓋
- 銷售數量顯示欄位（商品列表中「已售出」欄位）：Prototype 列表欄位未見
- CSV 批次匯入完整流程（範本下載 / 驗證 / 預覽 / 確認 / 新增＋更新模式）：Prototype 僅有「匯入」按鈕，流程步驟未實作

### Prototype 有但 PRD 未提及

- Dashboard 上方 KPI 卡片（產品總數、低庫存警示、本月銷售額、待處理貨到通知）整合在産品中心首頁
- 快速導覽格（Quick Navigation Grid）：連結至商品管理、庫存管理等子頁

### 已對齊

- 商品列表：搜尋（關鍵字 / 分類 / 價格 / 狀態 / 日期）、分頁
- 商品新增 / 編輯表單：名稱、描述（富文本）、價格、庫存、圖片、狀態
- 批次操作：上架 / 下架（Prototype 有批次選取機制）
- 商品狀態：已上架 / 已下架 / 草稿

---

## 3. 商品中心 — 商品分類

**對應 Prototype 檔案**：`html/産品中心.html`（`CategoryManagementPage` 元件）
**對應 PRD 文件**：`PRD_new/Evomni_Part2_商品中心_PRD.md`（§ 商品分類章節）

### PRD 要求但 Prototype 未完成

- 三層樹狀結構（根分類 → 子分類 → 孫分類）：Prototype `CategoryManagementPage` 顯示分類列表，但三層巢狀拖曳排序尚未見完整實作
- 拖曳排序（Drag & Drop 調整分類順序）：Prototype 未見 DnD 行為

### Prototype 有但 PRD 未提及

- 無額外超出規格功能

### 已對齊

- 分類列表呈現
- 分類新增 / 編輯 / 刪除基本操作

---

## 4. 商品中心 — 庫存管理

**對應 Prototype 檔案**：`html/産品中心.html`（`InventoryManagementPage` 元件）
**對應 PRD 文件**：`PRD_new/Evomni_Part2_商品中心_PRD.md`（§ 庫存管理章節）

### PRD 要求但 Prototype 未完成

- 低庫存通知：7 日重複通知去重機制（業務邏輯，非 UI 可見）
- 貨到通知：前台消費者填寫信箱 / 手機申請貨到通知；後台匯出申請名單（CSV）：Prototype 未見匯出操作按鈕
- 庫存異動紀錄（Log）：每筆庫存調整的歷史記錄頁面未見

### Prototype 有但 PRD 未提及

- 低庫存警示（KPI 卡片）在 Dashboard 首頁直接呈現

### 已對齊

- 庫存列表：商品名稱、庫存數量、低庫存閾值、狀態顯示
- 庫存內聯編輯（Inline Edit）

---

## 5. 溫層重量運費設定

**對應 Prototype 檔案**：`html/金物流串接設定.html` 中的 `FreightSettingsScreen.jsx`（`TempRulesPanel`、`WeightRulesPanel` 元件）；`html/溫層重量運費設定.html`（獨立頁面）
**對應 PRD 文件**：`PRD_new/Evomni_Part2_溫層重量運費設定_PRD.md`

### PRD 要求但 Prototype 未完成

- 混溫警示：購物車若同時包含不同溫層商品，前台顯示警告或強制拆單邏輯（為前台流程，後台 Prototype 未涵蓋）
- 以最高溫層計費規則說明文字（後台規則說明 callout）：Prototype 未見
- 重量運費：與一般費率比較顯示（節省金額提示）：Prototype 未見

### Prototype 有但 PRD 未提及

- 無額外超出規格功能

### 已對齊

- 溫層運費：三種溫層（常溫 / 冷藏 / 冷凍）設定面板
- 重量運費：階梯計費設定（每公斤計費 / 每件商品重量設定）

---

## 6. 訂單管理

**對應 Prototype 檔案**：`html/訂單管理.html`（`Screen1`～`Screen4`、`Screen67` 元件）
**對應 PRD 文件**：`PRD_new/Evomni_Part3_訂單管理_PRD.md`

### PRD 要求但 Prototype 未完成

- 手動建立訂單（後台手動輸入顧客資料 + 商品 + 付款方式新增訂單）：Prototype Screen 未見此流程
- 退貨（退款退貨申請 / 11 種退款退貨狀態機）：Prototype `Screen67` 有退款退貨狀態機（14 種狀態），但前台消費者退款退貨申請頁（前台入口）未在後台 Prototype 中呈現
- 電子發票：自動開立 / 作廢 / 折讓（僅後台顯示發票狀態，實際開立流程未見完整步驟）
- 貨到付款（現金）訂單的付款確認流程（後台手動標記已付款）：Prototype 狀態切換有模擬，但完整付款確認 UI 未見
- 批次列印揀貨單、出貨單：Prototype 未見批次列印操作
- 批次更新出貨狀態（Excel / CSV 匯入更新）：Prototype 未見
- 訪客查詢訂單（前台：訂單編號 + 手機末 4 碼）：為前台功能，後台 Prototype 未涵蓋
- 通知設定（13 種通知事件的開關管理）：Prototype 未見通知事件設定頁面

### Prototype 有但 PRD 未提及

- TweaksPanel（Prototype 狀態切換調整面板）：為開發輔助工具，不屬生產功能
- 美安訂單卡片（`Screen3` 中的美安整合訂單詳情區塊）：跨模組整合展示

### 已對齊

- 訂單列表：多欄位搜尋（狀態 / 日期 / 金額 / 發票狀態）、分頁
- 訂單詳情：品項 / 金額明細 / 物流狀態時間軸 / 發票資訊 / 退款退貨歷史
- 8 種訂單狀態（待付款 / 已付款 / 準備中 / 已出貨 / 配送中 / 已送達 / 已完成 / 已取消）
- 退款退貨審核流程（後台多狀態審核）

---

## 7. 行銷中心 — 優惠活動（優惠券 + 促銷活動）

**對應 Prototype 檔案**：`html/行銷中心.html` + `components/pages/PageMarketing.jsx`
**對應 PRD 文件**：`PRD_new/Evomni_Part4_行銷活動_PRD.md`

### PRD 要求但 Prototype 未完成

- 閃購（限時折扣）活動完整建立表單：Prototype 有「新增限時折扣活動」按鈕及進階鎖定標示，但完整表單（倒數計時顯示設定、前台標籤設定）未見
- 組合優惠（A+B 組合）完整建立表單：同上，有入口及鎖定標示，表單未見
- 加購品（加價購）完整建立表單：Prototype `PromotionFormPage` 有「加購活動」類型選項，但完整加購設定流程（加購品庫存設定、前台呈現位置）未見
- 全店折扣 + 會員分級三模式設定（選最優 / 疊最後 / 疊多組）：Prototype 未見此設定頁
- 滿額 / 滿件贈品的「贈品送出時機」可自訂設定（折扣前 / 折扣後 / 折抵後）：Prototype 未見
- 結帳頁金額明細顯示規格（各優惠層級拆行說明）：為前台結帳流程，後台 Prototype 未涵蓋
- 免運優惠整單 vs 部分免運設定：Prototype `PromotionFormPage` 有「免運活動」但設定細節（指定商品免運 / 整單免運）未見
- 回饋活動（消費集點 / 購物金回饋）管理頁面：Prototype 未見獨立回饋活動管理入口

### Prototype 有但 PRD 未提及

- 優惠活動統一列表頁（`UnifiedDiscountListPage`）：整合顯示優惠券 + 促銷活動，附優惠計算流程圖入口連結
- 優惠類型選擇 Dialog（`DiscountTypePickerDialog`）：選擇後跳轉對應新增頁，設計清晰

### 已對齊

- 優惠券管理列表：搜尋（名稱 / 代碼）、狀態篩選、折扣類型篩選
- 優惠券新增 / 編輯（3 Tab：基本設定 / 使用條件 / 發放設定）
- 折扣代碼 vs 自動發放券兩種類型
- 百分比折扣 / 固定金額折扣 / 免運費三種折扣方式
- 最高折扣上限欄位
- 觸發發放時機（帳號啟用 / 首購 / 等級升級 / 生日 / 滿額）
- 發放對象（全體 / 指定等級 / 指定分眾標籤）
- 進階功能鎖定標示（生日贈券、滿額贈券標示「進階」）
- 排除產品選擇器
- 可疊加 / 互斥開關
- 每人使用次數上限
- 促銷活動列表（贈品活動 / 免運活動 / 折扣活動 / 限時折扣 / 加購活動 / 組合優惠各 Tab）
- 進階功能 Tab 升級鎖定 Banner

---

## 8. 行銷中心 — 贈品管理

**對應 Prototype 檔案**：`components/pages/PageMarketing.jsx`（`GiftItemsPage` 元件）
**對應 PRD 文件**：`PRD_new/Evomni_Part4_行銷活動_PRD.md`（§ 贈品品項章節）

### PRD 要求但 Prototype 未完成

- 贈品共用上限設定（軟上限 10 / 硬上限 15，超過第 11 組阻擋提示）：Prototype 未見此設定
- 贈品品項被多個活動引用時的提示（`usedIn` 欄位有資料，但衝突提示未見）

### Prototype 有但 PRD 未提及

- 贈品列表欄位「使用於幾個活動」（`usedIn` 計數）：對管理者實用

### 已對齊

- 贈品品項列表：名稱、品號（庫存單位）、庫存數量、狀態
- 搜尋（名稱 / 品號）
- 新增 / 編輯 / 停用贈品品項

---

## 9. 行銷中心 — 自動旅程

**對應 Prototype 檔案**：`components/pages/PageMarketing.jsx`（Journey 相關元件）、`html/行銷中心.html`
**對應 PRD 文件**：`PRD_new/Evomni_Part4_行銷活動_PRD.md`（§ 自動旅程章節）

### PRD 要求但 Prototype 未完成

- 5 種旅程的完整設定表單：Prototype 有旅程概覽（Journey Overview）頁及 5 個旅程子頁（`journey-cart`、`journey-sleep`、`journey-loss`、`journey-post`、`journey-expiry`），但實際旅程設定表單（觸發條件設定、推播訊息設定、傳送時機設定）未見完整 UI
- LINE OA 整合設定（LINE 官方帳號綁定 / 頻道 Token）：`line-oa` 路由有對應，但 Prototype 實際 UI 內容未見
- 推播記錄（`push-logs` 頁面）：已有 `PUSH_LOGS_DATA` 資料結構，UI 列表基本實作

### Prototype 有但 PRD 未提及

- 推播成效報表（發送數 / 成功數 / 失敗數 / 開信率 / 轉換人數）在推播記錄頁已有欄位設計

### 已對齊

- 5 種旅程類型入口（購物車未結帳挽回 / 沉睡客喚醒 / 流失客挽留 / 購後推薦再行銷 / 點數到期提醒）
- 進階電商包鎖定標示（所有旅程均為進階功能）
- 推播記錄列表（時間 / 旅程名稱 / 通路 / 目標人數 / 成功 / 失敗 / 開信率 / 轉換）

---

## 10. 行銷中心 — 一頁式商店（Landing Page）

**對應 Prototype 檔案**：`components/pages/PageMarketing.jsx`（`marketing-landing`、`lp-create-step1`～`lp-create-step4`、`lp-detail-v2` 等路由）
**對應 PRD 文件**：`PRD_new/Evomni_一頁式商店_PRD.md`

### PRD 要求但 Prototype 未完成

- 分潤管理（KOL 分潤）：每個 Landing Page 可綁定 KOL、設定佣金比例、自動計算分潤、可分享唯讀報表連結：為進階功能，Prototype 有分潤概念（進階鎖定）但詳細設定表單未見
- 購物車放棄追蹤（Landing Page 專屬）：Prototype 未見此設定
- Landing Page 多頁管理 Dashboard（KPI：瀏覽 / 加購 / 結帳 / 完成率）：Prototype 有 Landing Page 列表（`marketing-landing`），但 KPI 統計頁未見
- Grape.js 編輯器整合：實際編輯器未見（Prototype 僅有 4 步驟建立流程的佈局 UI）
- 溫層物流繼承設定（Landing Page 使用主站物流設定）：Prototype 未見
- 通知 / 文案自訂設定：Prototype 未見

### Prototype 有但 PRD 未提及

- 4 步驟引導式建立流程（step1～step4）設計清晰
- Landing Page 詳情頁（`lp-detail-v2`）顯示頁面基本資訊

### 已對齊

- Landing Page 管理列表
- 4 步驟建立流程入口
- 進階電商包功能標示

---

## 11. 數據中心

**對應 Prototype 檔案**：`html/數據中心.html` + `components/pages/PageAnalytics.jsx`
**對應 PRD 文件**：`PRD_new/Evomni_Part5_數據中心_PRD.md`

### PRD 要求但 Prototype 未完成

- 銷售概覽：熱力圖（購買時段分佈，進階功能）：Prototype 未見
- 銷售概覽：流量來源分析（進階功能）：Prototype 未見
- 商品分析：轉換漏斗（商品頁 → 加購 → 結帳 → 完成，進階功能）：Prototype 未見
- 商品分析：搜尋關鍵字分析（進階功能）：Prototype 未見
- 商品分析：庫存周轉率（進階功能）：Prototype 未見
- 商品分析：緩銷商品列表：Prototype 未見
- 商品分析：商品類別銷售佔比：Prototype 未見
- 會員分析：同期群組（Cohort）分析（進階功能）：Prototype 未見
- 會員分析：RFM 會員價值分群（進階功能）：Prototype 未見
- 行銷成效：廣告投資報酬率（進階功能）：Prototype 未見
- 行銷成效：應收回饋餘額分析（進階功能）：Prototype 未見
- 行銷成效：旅程績效統計（每種自動旅程的成效）：Prototype 未見

### Prototype 有但 PRD 未提及

- 升級鎖定 Banner（`UpgradeLockBanner`）元件在各進階指標旁已實作

### 已對齊

- 4 個分析分頁入口（銷售概覽 / 商品分析 / 會員分析 / 行銷成效）
- 銷售概覽：4 個 KPI 卡片（總銷售金額 / 訂單筆數 / 平均客單價 / 訂單完成率），Delta 趨勢，Tooltip 說明
- 銷售概覽：銷售趨勢折線圖
- 銷售概覽：付款方式分佈
- 商品分析：熱銷商品 Top 20 列表
- 會員分析：新增 / 回購趨勢圖
- 時間範圍選擇器

---

## 12. 廣告投放工具

**對應 Prototype 檔案**：`html/廣告投放工具.html` + `components/pages/PageAdTools.jsx`
**對應 PRD 文件**：`PRD_new/Evomni_廣告投放工具_PRD.md`

### PRD 要求但 Prototype 未完成

- UTM 模板儲存上限 20 組（Prototype 儲存邏輯已實作，但上限提示未見）
- 短網址點擊統計報表（詳細歷史）：Prototype 有今日 / 本月計數器，但完整時間維度報表（7 天 / 30 天趨勢圖）未見

### Prototype 有但 PRD 未提及

- 廣告來源分析（第三個 Tab）：轉換漏斗（工作階段 → 加購 → 結帳 → 完成）+ 依來源 / 媒介 / 活動 / 廣告內容分組的明細表格，含可展開子行（按廣告活動名稱展開）+ 點擊訂單數連結開啟 Drawer 查看訂單清單：此功能超出 PRD 的「短網址點擊統計」範圍，屬 UTM 轉換歸因報表，PRD 中僅提及「UTM 轉換報告」與「短網址點擊追蹤」，但 Prototype 實作已相當完整

### 已對齊

- UTM 生成器：目標頁面選擇（特定產品頁 / 分類頁 / 首頁 / 一頁式商店 / 自訂 URL）
- UTM 5 個欄位（來源 / 媒介 / 廣告活動 / 廣告內容 / 關鍵字）
- 平台快速模板（Facebook / LINE Ads / Google Ads / EDM / LINE OA 推播）
- 生成完整連結即時預覽
- 複製完整連結 / 複製短網址 / 下載 QR Code（PNG）
- 儲存為模板（含模板命名）
- 廣告活動名稱含中文時顯示警告
- 必填欄位驗證
- 產品目錄 Feed：Facebook 產品目錄 Feed（CSV）+ Google Merchant Center Feed（XML）
- Feed URL 顯示（含 Token 安全遮罩）+ 複製連結
- Feed 範圍設定（全部上架產品 / 指定分類）
- 更新頻率設定（即時 / 每小時 / 每天）
- 立即重新生成 Feed + 下載預覽
- Feed URL Token 重新生成（含確認 Dialog）
- 上次更新時間 + 產品數量

---

## 13. 行銷追蹤碼管理

**對應 Prototype 檔案**：`html/行銷追蹤碼管理.html`
**對應 PRD 文件**：`PRD_new/Evomni_行銷追蹤碼管理_PRD.md`

### PRD 要求但 Prototype 未完成

- 無明顯缺漏（所有主要功能已實作）

### Prototype 有但 PRD 未提及

- 多種 Demo 預設情境（初始狀態 / GA4 展開中 / GA4 已啟用 / Pixel+自訂轉換介面程式介面設定中 / GTM 衝突警示 / 全部已啟用）切換器：為 Prototype 開發輔助工具
- 各追蹤碼 ID 格式的即時驗證函數（格式不符即時報錯）

### 已對齊

- 4 個可摺疊的 ToolCard（GA4 / Meta Pixel / Meta 自訂轉換介面程式介面 / GTM），各有啟用開關
- GA4：評估 ID 欄位、電子商務事件追蹤勾選框
- Meta Pixel：Pixel ID、幣別選擇
- Meta 自訂轉換介面程式介面：Access Token 輸入框（Textarea）
- GTM：容器 ID、與 GA4/Pixel 同時啟用時的衝突警告
- 事件統計表：7 個事件類型（GA4 事件名稱 / Pixel 事件名稱 / 近 7 日觸發次數）

---

## 14. 會員管理後台

**對應 Prototype 檔案**：`html/會員管理後台.html`
**對應 PRD 文件**：`PRD_new/Evomni_Part6_會員管理_PRD.md`

### PRD 要求但 Prototype 未完成

- 會員等級系統（5 個等級、自動升降等、有效期）：為進階功能，Prototype 有 UpgradeLockBanner，但完整等級設定 UI 未見
- 分眾標籤（自動標籤 / 手動標籤 / 進階多條件篩選）：Prototype 未見完整分眾標籤管理頁
- 會員點數管理（消費集點規則 / 點數調整 / 兌換記錄）：Prototype 未見
- 購物金管理（發放 / 餘額 / 歷史）：Prototype 未見
- 推薦獎勵（推薦新會員回饋）：Prototype 未見
- 會員黑名單管理：Prototype 未見
- 通知設定（13 種通知事件開關）：Prototype 未見通知設定頁
- 3 個全局開關（啟用會員系統 / 啟用訪客結帳 / 自動建立帳號）：Prototype 未見全局設定區

### Prototype 有但 PRD 未提及

- 共用 UI 元件展示（Input / Select / Textarea / Toast / Dialog / Drawer / FormRow / Card / EmptyState）：為 Prototype UI 元件庫，非生產功能

### 已對齊

- 會員管理入口架構（後台左側導覽對應）
- 基礎共用元件庫（可供其他 Prototype 元件重用）

---

## 15. 顧客與會員整合管理

**對應 Prototype 檔案**：`components/pages/PageMembers.jsx`
**對應 PRD 文件**：`PRD_new/Evomni_顧客與會員整合管理_PRD.md`

### PRD 要求但 Prototype 未完成

- 統一顧客列表：Email 作為錨點欄位、顧客 / 會員 / 顧客轉會員身份標籤（三種身份識別）：Prototype 已有列表，但三種身份標籤樣式是否完整實作需確認
- 顧客詳情：6 個區段（基本資料 / 訂單歷史 / 互動記錄 / 分眾標籤 / 點數購物金 / 備註）：Prototype 詳情頁區段是否完整覆蓋待確認
- 設定頁：欄位自訂、預設排序、訪客轉會員自動關聯、邀請冷卻期、新顧客 / 新會員預設標籤：Prototype 未見此設定頁

### Prototype 有但 PRD 未提及

- 無超出規格功能

### 已對齊

- 顧客 / 會員列表（搜尋、分頁）
- 顧客詳情頁基本結構

---

## 16. 金物流串接設定

**對應 Prototype 檔案**：`html/金物流串接設定.html`（`HubScreen.jsx`、`VendorAutoScreen.jsx`、`VendorOtherScreens.jsx`、`UtilScreens.jsx`）
**對應 PRD 文件**：`PRD_new/Evomni_金物流串接規格_PRD.md`

### PRD 要求但 Prototype 未完成

- 紅陽金流（進階功能）：Prototype 左側導覽未見，有 UpgradeLockBanner 機制
- 統一數網物流（進階功能）：同上
- 收單銀行金流（14 家銀行轉帳）：Prototype 有「銀行金流」分類，但各銀行實際串接設定頁未見逐一實作
- 電子發票：自動開立 / 作廢 / 折讓設定詳細流程：`UtilScreens.jsx` 有 `InvoiceScreen`，但完整設定流程需確認
- Webhook 管理（多事件類型、測試觸發、傳送紀錄）：`UtilScreens.jsx` 有 `WebhookScreen`，但事件設定細節需確認

### Prototype 有但 PRD 未提及

- 串接商整體啟用數量計數（左側導覽顯示「第三方金流（3）」等數量標示）
- 整合中心（HubScreen）：首頁 Dashboard 顯示各類別串接狀態概覽

### 已對齊

- 左側導覽：第三方金流 / 銀行金流 / 第三方物流 / 通訊串接 分類，含錯誤指示燈
- 自動開通（Plug-and-Play）廠商設定頁（`VendorAutoScreen`）：綠界 / LINE Pay 等
- 半手動廠商設定頁：API 金鑰輸入、測試連線
- 電子發票設定（`InvoiceScreen`）
- Webhook 管理（`WebhookScreen`）
- 溫層運費設定（`TempRulesPanel`）
- 重量運費設定（`WeightRulesPanel`）

---

## 17. 方案管理與升級流程

**對應 Prototype 檔案**：`html/方案管理與升級流程.html`
**對應 PRD 文件**：`PRD_new/Evomni_方案管理與升級流程_PRD.md`

### PRD 要求但 Prototype 未完成

- 方案到期警告（90 / 30 / 7 / 1 天倒數提示）：Prototype 有 FEATURES_INCLUDED / FEATURES_LOCKED 列表，但到期警告不同天數倒數 UI 未見
- 方案比較頁（升級引導頁，並列顯示各方案功能差異）：Prototype 未見
- 未來自助付款升級流程：PRD 明確為未來規劃，Prototype 未涵蓋
- 升級記錄管理頁：Prototype 有 `MOCK_RECORDS`（商家 / 目前方案 / 目標方案 / 時間 / 狀態 / 聯絡人 / 電話），基本列表結構已有

### Prototype 有但 PRD 未提及

- 鎖定功能清單（FEATURES_LOCKED）直接列出 8 項進階功能描述

### 已對齊

- 電商啟航方案功能列表（FEATURES_INCLUDED 8 項）
- 升級記錄表格（商家 / 目前方案 / 目標方案 / 時間 / 狀態 / 聯絡人 / 電話）
- 系統全域的 UpgradeLockBanner 鎖定 Banner 元件

---

## 18. 飛信電子報串接

**對應 Prototype 檔案**：`html/飛信電子報串接設定.html`
**對應 PRD 文件**：`PRD_new/Evomni_飛信電子報串接_PRD.md`

### PRD 要求但 Prototype 未完成

- 一鍵申請帳號（API 直接申請，非手動輸入 Token）：Prototype S1 有申請流程（`apply` 狀態機：initial / applying / success / account_exists / failed），但一鍵申請 API 邏輯需確認是否串接
- 快速登入連結（直接跳轉飛信後台）：Prototype 未見

### Prototype 有但 PRD 未提及

- 升級鎖定 Banner 選項（Prototype S1 有 `showUpgradeBanner` 選項，暗示可能需要進階方案）

### 已對齊

- 3 個畫面（S1 未串接 / S2 已串接 / S3 訂閱管理）
- Token 輸入 / 驗證流程（含取得 Token 步驟說明 StepsGuide）
- 整合狀態 Banner（未串接 / 已串接 / Token 過期 / 離線）
- S2 已串接：Token 管理卡片（重置 Token / 停用整合）、匯出紀錄表格（時間 / 數量 / 狀態 / 分眾 / 明細）
- S3 訂閱管理：訂閱者列表（勾選 / 會員編號 / 姓名 / 信箱 / 日期 / 狀態）、搜尋、匯出 CSV、匯出至飛信按鈕

---

## 19. 美安串接

**對應 Prototype 檔案**：`html/美安串接設定.html`
**對應 PRD 文件**：`PRD_new/Evomni_美安串接_PRD.md`

### PRD 要求但 Prototype 未完成

- 功能啟用開關（僅系統管理員可見）：Prototype S1 有整合設定，但管理員專屬開關未明確展示
- Session 識別訂單歸因（前台購買流程追蹤）：為前台邏輯，後台 Prototype 未涵蓋
- 訂單自動傳送（確認付款後自動發送至美安）：為後端邏輯，Prototype 手動操作已呈現
- 手動重新傳送 / 取消傳送：Prototype S2 訂單列表有操作入口
- 美安格式報表匯出：Prototype 未見
- API 通訊記錄（傳送 Log）：Prototype 未見

### Prototype 有但 PRD 未提及

- XML Feed 欄位對應表（category / largeimage / price / saleprice / description / name / url，含資料來源與備註說明）

### 已對齊

- S1 API 連線設定：Store ID / API Access Key（含遮罩 / 顯示切換）/ API Secret Key（含遮罩）/ 驗證儲存
- XML Feed 連結 + 立即刷新 + 上次更新時間
- S2 訂單列表
- S3 訂單詳情 + 美安卡片

---

## 20. 第三方登入

**對應 Prototype 檔案**：`html/第三方登入.html`
**對應 PRD 文件**：`PRD_new/Evomni_第三方登入_PRD.md`

### PRD 要求但 Prototype 未完成

- 登入按鈕樣式選項（品牌樣式 / 僅文字 / 僅圖示）：Prototype S5 後台設定有按鈕順序拖曳，但按鈕樣式 radio 選項未見
- 社群帳號強制綁定邏輯（帳號安全：必須保留至少一種登入方式才可解除綁定）：PRD 有此規則，Prototype S4 的 SocialLinkCard unbind 行為是否有防呆未見明確提示

### Prototype 有但 PRD 未提及

- 帳號鎖定狀態（嘗試 3 次後鎖定，Prototype S3 有鎖定狀態展示）：PRD 前台登入 PRD 有帳號鎖定，但第三方登入帳號合併確認頁的鎖定為額外考量

### 已對齊

- S1 前台登入頁：登入 / 註冊分頁、信箱 + 密碼、LINE / Google / Facebook 社群按鈕（含載入狀態）
- S2 Email 補全頁：驗證信發送、60 秒倒數重發
- S3 帳號合併確認：密碼驗證、錯誤狀態（密碼錯誤 / 帳號鎖定）
- S4 帳號設定（社群帳號連結）：每個平台綁定 / 解除綁定的 SocialLinkCard
- S5 後台設定：各平台 Client ID / Secret（含遮罩 / 眼睛切換）/ 回調網址（唯讀 + 複製）/ 測試連線 / 儲存 / 啟用停用切換；按鈕順序拖曳；登入模式 radio（社群 + 一般 / 純社群）

---

## 21. 串接設定後台管理（整合中心）

**對應 Prototype 檔案**：`html/金物流串接設定.html`（`HubScreen.jsx`）
**對應 PRD 文件**：`PRD_new/Evomni_串接設定後台管理_PRD.md`

### PRD 要求但 Prototype 未完成

- 14 家銀行付款 + 14 家第三方付款完整廠商列表（逐一實作設定頁）：Prototype 結構完整，但並非所有廠商均有對應設定頁，以代表性廠商為主
- 7 家物流廠商設定頁：同上
- 4 種廠商類型（自動 / 即插即用 / 半手動 / 手動）完整分類標示：Prototype `HubScreen` 有分類，但 4 種類型標示是否全覆蓋需確認

### Prototype 有但 PRD 未提及

- 整合中心首頁 Dashboard（各類別串接狀態數量概覽 + 錯誤提示）

### 已對齊

- 左側導覽分類（第三方金流 / 銀行金流 / 第三方物流 / 通訊串接）
- 廠商啟用計數標示（每類別括號內數量）
- 錯誤指示燈（廠商設定有問題時顯示紅點）
- 自動開通廠商設定流程

---

## 22. 全域設定 — 電商設定

**對應 Prototype 檔案**：`components/pages/PageAdvanced.jsx`（`gs-cart-timeout`、`gs-stock-alert`、`gs-member-verification` 等路由）；`components/pages/PagePayment.jsx`
**對應 PRD 文件**：`PRD_new/Evomni_全域設定_電商設定_PRD.md`

### PRD 要求但 Prototype 未完成

- 電商基本設定：幣別設定（v1.0 單一幣別，v2.0 多幣別）：Prototype 未見幣別設定 UI
- 電商基本設定：訂單前綴設定（首次儲存後唯讀）：Prototype 未見
- 電商基本設定：發票公司名稱（新欄位）：Prototype 未見
- 電商進階設定（各子頁路由已定義）：購物車逾時（`gs-cart-timeout`）、庫存警示閾值（`gs-stock-alert`）、會員驗證設定（`gs-member-verification`）已有對應路由，UI 內容需確認完整度

### Prototype 有但 PRD 未提及

- LINE OA 設定（`line-oa` 路由）已在 Prototype 結構中定義

### 已對齊

- 電商進階設定子頁結構（購物車逾時 / 庫存警示 / 第三方登入設定 / LINE OA 設定 / 會員驗證設定）

---

## 23. 前台會員登入

**對應 Prototype 檔案**：`html/第三方登入.html`（S1、S2 畫面部分涵蓋）
**對應 PRD 文件**：`PRD_new/Evomni_前台會員登入_PRD.md`

### PRD 要求但 Prototype 未完成

- 忘記密碼完整 4 步驟流程（輸入信箱 / 發送重置信 / 設定新密碼 / 完成）：Prototype 未見專屬忘記密碼流程頁
- 帳號驗證頁（`/verify-email` 路由）：Prototype 未見
- 重發驗證信（60 秒倒數）：Prototype S2 有倒數，但此 PRD 的重發是獨立頁面功能
- 安全機制：3 層防護（前端節流 / IP 速率限制 / 動態驗證碼）：後端邏輯，Prototype 未涵蓋
- 2 層鎖定機制（5 次失敗 → 15 分鐘封鎖 → 第 6 次 → 自動停用 + 信件通知）：PRD 規格，Prototype 第三方登入 S3 僅模擬帳號合併確認頁鎖定，非完整登入鎖定流程
- `redirect_url` 參數支援：為技術規格，Prototype 未涵蓋

### Prototype 有但 PRD 未提及

- 社群登入帳號合併確認頁（S3）、Email 補全頁（S2）在此 PRD 未明確定義（屬 Evomni_第三方登入_PRD 範疇）

### 已對齊

- 前台登入頁基本樣式（`/login` 路由，非 Modal）
- 信箱 + 密碼輸入
- 社群登入按鈕（LINE / Google / Facebook）

---

## 24. 會員前台個人中心

**對應 Prototype 檔案**：`components/pages/PageMembers.jsx`（前台個人中心部分）
**對應 PRD 文件**：`PRD_new/Evomni_會員前台個人中心_PRD.md`

### PRD 要求但 Prototype 未完成

- 訂單歷史（前台）：列表 + 詳情 + 退款退貨申請（前台入口）：Prototype 後台為主，前台 Prototype 未見
- 個人資料（姓名 / 電話 / 生日 / 頭像 / 地址簿）：Prototype 未見前台個人中心 UI
- 點數 / 購物金（餘額 / 歷史 / 兌換，含待確認狀態）：Prototype 未見前台錢包頁
- 優惠券清單（可用 / 已使用 / 已到期）：Prototype 未見前台優惠券列表
- 願望清單（進階功能）：Prototype 未見
- 通知偏好設定（前台）：Prototype 未見
- 社群帳號連結（前台）：`html/第三方登入.html` S4 有 SocialLinkCard 設計

### Prototype 有但 PRD 未提及

- 無超出規格功能

### 已對齊

- 社群帳號連結管理（S4）已有完整 Prototype

---

## 25. 購物車與結帳流程

**對應 Prototype 檔案**：尚未建立（無對應 HTML / JSX 檔案）
**對應 PRD 文件**：`PRD_new/Evomni_購物車與結帳流程_PRD.md`

### PRD 要求但 Prototype 未完成

- 全部功能（Prototype 尚未建立）：購物車機制 / 結帳步驟 / 庫存鎖定 / 60 分鐘購物車逾時 / 訪客結帳（含購後轉帳號流程）/ 0 元商品需登入 / Landing Page 結帳路由 / Landing Page 折扣規則限制

### Prototype 有但 PRD 未提及

- 無

### 已對齊

- 無

---

## 26. 優惠計算引擎技術規格

**對應 Prototype 檔案**：`html/優惠計算流程圖.html`（靜態流程圖）
**對應 PRD 文件**：`PRD_new/Evomni_優惠計算引擎_技術規格_PRD.md`

> 本文件為技術規格文件，定義後端計算邏輯，非直接對應 UI。
> Prototype 以靜態 HTML 流程圖呈現 11 步驟計算順序，作為溝通工具使用。

### PRD 要求但 Prototype 未完成

- 11 步驟計算引擎後端實作（技術規格，Prototype 非生產代碼）
- API 介面契約（`POST /api/promotion/calculate`）
- 退款追回計算規格（Mode A / Mode B）
- 訂單優惠快照（`promotion_snapshot_json`）
- 各步驟邊界規則（高風險場景 10 條）

### Prototype 有但 PRD 未提及

- 無

### 已對齊

- 11 步驟計算順序流程圖（靜態 HTML 圖示）已與 PRD 定義吻合

---

## 27. CMS 選單 SEO 保護機制

**對應 Prototype 檔案**：尚未建立
**對應 PRD 文件**：`PRD_new/Evomni_CMS選單SEO保護與路由邏輯_PRD.md`

> 本模組屬 CMS 形象網站選單管理模組，非電商模組，目前 Prototype 未涵蓋。

### PRD 要求但 Prototype 未完成

- 全部功能：未加入選單 Warning Callout / 移除節點 Warning 確認彈窗 / 301 Redirect 機制 / 重新導向管理後台入口 / 全域 SEO 保護設定

### 已對齊

- 無

---

## 28. 形象產品與電商商品整合架構

**對應 Prototype 檔案**：尚未建立
**對應 PRD 文件**：`PRD_new/Evomni_形象產品與電商商品整合架構規劃.md`

> 本文件為架構規劃文件，定義 CMS 産品與電商商品的橋接機制。目前 Prototype 以純電商後台為主，CMS 產品管理頁未在此 Prototype 中實作。

### PRD 要求但 Prototype 未完成

- CMS 産品頁「推送至電商」按鈕（含 2 步驟確認 Modal）
- 電商商品建立頁「從形象産品匯入」快速入口（Drawer）
- 後台左側導覽「形象網站 / 電商網站」分隔標籤（Scenario 3 同時開通）
- 批次推送功能（Phase 2）

### 已對齊

- 無（Prototype 範疇為純電商，未涵蓋 CMS 橋接場景）

---

## 29. 後台左側導覽架構

**對應 Prototype 檔案**：`index.html`（`NAV_GROUP_MAP`）+ `components/Sidebar.jsx`
**對應 PRD 文件**：`PRD_new/Evomni_後台左側導覽架構規劃.md`

### PRD 要求但 Prototype 未完成

- CMS 形象站區段選單（Scenario 3 同時開通時）：Prototype 目前僅呈現電商後台選單
- 進階電商包限定功能的導覽顯示條件（部分功能需升級才顯示選單入口）：Prototype 多以 UpgradeLockBanner 取代隱藏入口的做法

### Prototype 有但 PRD 未提及

- `NAV_GROUP_MAP` 完整路由對應（`gift-items`、`coupon-list`、`promotion-list`、旅程頁、`gs-newsletter-flydove`、`gs-temp-freight`、`gs-weight-freight` 等）

### 已對齊

- 電商後台主要導覽項目（儀表板 / 商品中心 / 訂單管理 / 行銷中心 / 數據中心 / 會員管理 / 全域設定）
- 多層巢狀選單結構（含二、三層子選單）
- 側欄展開 / 收合行為

---

## 最終總表

| # | 模組名稱 | Prototype 狀態 | 完成度 |
|---|---------|---------------|-------|
| 1 | 儀表板（Dashboard） | 已建立（PageDashboard.jsx） | 部分完成 |
| 2 | 商品中心 — 商品管理 | 已建立（産品中心.html） | 部分完成 |
| 3 | 商品中心 — 商品分類 | 已建立（産品中心.html） | 部分完成 |
| 4 | 商品中心 — 庫存管理 | 已建立（産品中心.html） | 部分完成 |
| 5 | 溫層重量運費設定 | 已建立（金物流串接設定.html / FreightSettingsScreen.jsx） | 部分完成 |
| 6 | 訂單管理 | 已建立（訂單管理.html） | 部分完成 |
| 7 | 行銷中心 — 優惠活動 | 已建立（行銷中心.html + PageMarketing.jsx） | 部分完成 |
| 8 | 行銷中心 — 贈品管理 | 已建立（PageMarketing.jsx） | 部分完成 |
| 9 | 行銷中心 — 自動旅程 | 已建立（PageMarketing.jsx） | 部分完成 |
| 10 | 行銷中心 — 一頁式商店 | 已建立（PageMarketing.jsx） | 部分完成 |
| 11 | 數據中心 | 已建立（數據中心.html + PageAnalytics.jsx） | 部分完成 |
| 12 | 廣告投放工具 | 已建立（廣告投放工具.html + PageAdTools.jsx） | 完整 |
| 13 | 行銷追蹤碼管理 | 已建立（行銷追蹤碼管理.html） | 完整 |
| 14 | 會員管理後台 | 已建立（會員管理後台.html） | 部分完成 |
| 15 | 顧客與會員整合管理 | 已建立（PageMembers.jsx） | 部分完成 |
| 16 | 金物流串接設定 | 已建立（金物流串接設定.html） | 部分完成 |
| 17 | 方案管理與升級流程 | 已建立（方案管理與升級流程.html） | 部分完成 |
| 18 | 飛信電子報串接 | 已建立（飛信電子報串接設定.html） | 完整 |
| 19 | 美安串接 | 已建立（美安串接設定.html） | 部分完成 |
| 20 | 第三方登入 | 已建立（第三方登入.html） | 完整 |
| 21 | 串接設定後台管理（整合中心） | 已建立（金物流串接設定.html — HubScreen） | 部分完成 |
| 22 | 全域設定 — 電商設定 | 已建立（PageAdvanced.jsx 路由架構） | 部分完成 |
| 23 | 前台會員登入 | 已建立（第三方登入.html 部分畫面） | 部分完成 |
| 24 | 會員前台個人中心 | 已建立（第三方登入.html S4） | 部分完成 |
| 25 | 購物車與結帳流程 | 尚未建立 | 尚未建立 |
| 26 | 優惠計算引擎技術規格 | 已建立（優惠計算流程圖.html — 靜態圖） | 部分完成 |
| 27 | CMS 選單 SEO 保護機制 | 尚未建立 | 尚未建立 |
| 28 | 形象産品與電商商品整合架構 | 尚未建立 | 尚未建立 |
| 29 | 後台左側導覽架構 | 已建立（index.html + Sidebar.jsx） | 部分完成 |

---

## 整體觀察與建議

### 超出 PRD 規格的亮點

1. **廣告投放工具 — 廣告來源分析 Tab**：Prototype 實作了完整的 UTM 轉換歸因報表（工作階段 → 加購 → 結帳 → 完成漏斗 + 可展開的來源明細表 + 訂單 Drawer），超出 PRD「短網址點擊統計」的定義範圍，屬正向超出規格，建議補回 PRD。
2. **行銷中心 — 優惠活動統一列表**：整合顯示優惠券與促銷活動，含優惠計算流程圖入口連結，對使用者體驗有正向效果，PRD 未明確定義此統一列表視圖。
3. **各模組的 UpgradeLockBanner 元件**：系統性地實作方案升級鎖定機制，覆蓋所有進階功能，Prototype 設計已超前 PRD 對此元件的說明深度。

### 主要缺口（建議優先補齊）

1. **購物車與結帳流程**：完全未建立 Prototype，為電商核心流程，影響最終呈現完整性。
2. **會員前台個人中心**：大量前台 UI（訂單歷史 / 個人資料 / 點數 / 優惠券）尚未有 Prototype，與後台管理功能同等重要。
3. **訂單管理**：手動建立訂單、批次列印 / 批次更新等操作型功能未見，影響實際使用場景展示。
4. **數據中心**：進階分析功能（熱力圖 / Cohort / RFM / 廣告投資報酬率）雖標示為進階，但 UpgradeLockBanner 展示也可增強方案差異感知。
5. **全域設定 — 電商基本設定**：幣別 / 訂單前綴 / 發票公司名稱等基礎欄位缺失，影響功能可用性驗收。
