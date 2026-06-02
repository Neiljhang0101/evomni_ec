# 選單管理模組 — 工程規格文件

> **Version:** 3.0
> **建立日期：** 2026/05/28
> **更新日期：** 2026/05/29
> **基準來源：** `components/pages/PageWebsiteDesign.jsx`（index.html 整合版，以此為正式開發依據）
> **適用對象：** 前端工程師、後端工程師
> **關聯模組：** 網站設計 > 選單管理（Sidebar: `website-design > website-menu`）

---

## 1. 功能概覽

選單管理讓設計師／網站管理員建立並維護前台導覽選單的樹狀結構。

核心行為：
- 以 Modal 新增選單節點（8 種類型，含多步驟選擇流程）
- 以拖曳方式調整節點順序與層級
- 每個語系（繁中 / EN）維護獨立選單結構，各語系有獨立可見度開關
- 點擊節點名稱即開啟右側設定面板（含基本設定與 SEO 兩個 Tab）
- JSON 格式匯入 / 匯出

---

## 2. 節點資料結構

### 2.1 MenuNode（前端資料格式）

```ts
interface MenuNode {
  id:       string;          // 唯一識別碼
  name:     string;          // 前台顯示名稱
  type:     MenuNodeType;    // 節點類型（見 2.2）
  url?:     string;          // 僅 type='link' 使用；其他類型由系統自動產生
  visible:  boolean;         // 前台可見度（false = 選單隱藏，但直連網址仍可訪問）
  openMode: 'same' | 'new'; // 換頁 | 另開新視窗
  children: MenuNode[];      // 子節點陣列（允許遞迴巢狀）
  // 設定面板儲存的額外欄位
  desc?:     string;         // 列表簡介
  seoTitle?: string;         // SEO 標題
  seoDec?:   string;         // SEO 描述
  // 來源參考 ID（後端用於關聯實際內容）
  sourceId?: string;
}
```

### 2.2 MenuNodeType（節點類型定義）

| type | 中文名稱 | 說明 | 色彩（text / bg）| 是否可有子節點 |
|---|---|---|---|---|
| `group` | 群組 | 純導覽群組，無對應內容頁 | `#909399` / `#F5F5F5` | 是 |
| `link` | 自訂連結 | 指向外部或自訂網址 | `#E6A23C` / `#FDF6EC` | 否 |
| `article-list` | 文章列表 | 對應文章分類（顯示該分類下所有文章列表）| `#409EFF` / `#ECF5FF` | 是 |
| `article-page` | 文章單頁 | 對應單篇文章內容頁 | `#409EFF` / `#ECF5FF` | 否 |
| `product-list` | 產品列表 | 對應產品分類（顯示該分類下所有產品列表）| `#67C23A` / `#F0F9EB` | 是 |
| `product-page` | 產品單頁 | 對應單一產品內容頁 | `#67C23A` / `#F0F9EB` | 否 |
| `form` | 表單 | 對應指定表單頁面 | `#9B59B6` / `#F5EEFB` | 否 |
| `system-page` | 系統分頁 | 系統固定頁面（隱私權政策、服務條款等）| `#303133` / `#F5F7FA` | 否 |

### 2.3 MenuStore（後端儲存結構）

```ts
interface MenuStore {
  menus: {
    [lang: string]: MenuNode[];  // lang: 'zh' | 'en' | 其他語系碼
  };
  langVisible: {
    [lang: string]: boolean;     // 各語系的前台可見度（全域開關）
  };
}
```

**說明：**
- `langVisible` 是語系層級的全域開關，與節點層級的 `visible` 獨立運作
- 語系可見度關閉時，整個語系的選單對前台不顯示，不論節點個別 `visible` 設定為何

---

## 3. 頁面 Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [H1] 選單管理  網站設計 / 選單管理                    [匯入] [匯出]          │
│  [操作說明橫幅 — 深灰背景 #606266，白字]                                      │
├───────────────────────────────┬─────────────────────────────────────────────┤
│  左側卡片（flex: 0 0 40%）     │  右側卡片（flex: 0 0 calc(60% - 8px)）      │
│                               │                                             │
│  [繁中] [EN]  顯示中 [Switch] │  設定面板（點擊節點名稱後顯示）              │
│  ─────────────────────────── │  或                                         │
│  選單架構 [···] [新增項目]    │  空狀態提示                                 │
│  可拖曳列項調整順序；點擊…     │                                             │
│  ─────────────────────────── │                                             │
│  選單樹（樹狀節點列表）        │                                             │
│  [新增主選單項目]（底部）      │                                             │
└───────────────────────────────┴─────────────────────────────────────────────┘
```

- 兩張卡片：白色背景，`border-radius: 3px`，`box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08)`
- 卡片間距：`gap: 16px`
- 頁面 padding：`padding: 40px`（Admin layout 主內容區）
- 最小字級：14px（全頁）

---

## 4. 頁面頂部

### 4.1 標題列

```
[H1 選單管理]  網站設計 / 選單管理           [匯入] [匯出]
```

- H1：font-size 24px，font-weight 700
- 麵包屑：color `#C0C4CC`（分隔符）、`#909399`（父層）、`#303133`（當前）
- 匯入 / 匯出按鈕：次要樣式（白底，border `#DCDFE6`），height 36px，`border-radius: 0`

### 4.2 操作說明橫幅

`background: #606266`，白字，`padding: 12px 16px`，`margin-bottom: 16px`

說明文字（三點）：
1. 點擊左側「新增項目」可選擇 8 種類型加入選單；每個列項的 + 圖示可直接新增子項
2. 眼睛圖示切換前台可見度；點擊名稱進入設定，可在設定頁調整開啟方式
3. 語系頁籤管理多語系選單；「複製架構」將項目預設為隱藏狀態

---

## 5. 左側卡片 — 選單樹

### 5.1 語系 Tab 列

```
[繁中] [EN]              顯示中 [Switch]
```

- Tab 切換時清空 `selectedId`（右側設定面板回到空狀態）
- **可見度 Switch**：控制 `langVisible[lang]`，切換前台整個語系選單的顯示狀態；Switch 左側顯示文字「顯示中」或「已隱藏」

### 5.2 樹狀列表頂部工具列

```
選單架構  [···]              [新增項目]
```

- **「···」 Kebab 選單**（三點按鈕）：展開後顯示：
  - 「複製架構」：將當前語系的樹狀結構複製至剪貼板，顯示 Toast「選單架構已複製」
  - 「貼上架構」：將剪貼板架構貼入當前語系，遞迴將所有節點 `visible` 設為 `false`，顯示 Toast「選單架構已貼上（預設全部隱藏）」（剪貼板為空時灰色不可點擊）
  - 點擊頁面其他處關閉選單
- **「新增項目」按鈕**：主要樣式（`background: #409EFF`，白字），開啟新增 Modal，`defaultParent = null`

提示文字（工具列下方）：「可拖曳列項調整順序；點擊名稱進入設定」，font-size 14px，color `#909399`，`background: #FAFBFC`

### 5.3 樹狀節點 Row

每個節點列高 48px，由左至右元件：

| 位置 | 元件 | 說明 |
|---|---|---|
| 1 | 拖曳把手（6 點）| cursor: grab；觸發拖曳（見第 7 節） |
| 2 | 展開／折疊箭頭 | 有子節點時顯示；無子節點時 `visibility: hidden`（仍佔位）；點擊 toggle `expanded[id]` |
| 3 | 節點名稱（flex: 1）| 點擊設定 `selectedId`，右側顯示設定面板；overflow hidden |
| 4 | 類型標籤（Badge）| 依 type 顏色設定（見 2.2）；`font-size: 14px`，`padding: 2px 6px` |
| 5 | 可見度 icon（眼睛）| 點擊切換 `node.visible`；`visible=false` 時顯示警告色 `#E6A23C`，`visible=true` 時顯示 `#909399` |
| 6 | 新增子項目（+）| 開啟新增 Modal，`defaultParent = node.id` |
| 7 | 刪除（垃圾桶）| 刪除節點及其所有子節點；若刪除的是 `selectedId` 則清空選擇 |

**節點視覺狀態：**

| 狀態 | 背景色 | 左側邊框 | 名稱顏色 | 名稱樣式 |
|---|---|---|---|---|
| 正常 | `#FFFFFF` | transparent | `#303133` | — |
| Hover | `#F5F7FA` | transparent | `#303133` | — |
| Active（已選取）| `#ECF5FF` | `2px solid #409EFF` | `#409EFF` | font-weight 500 |
| 拖曳中 | `#FFFFFF` | — | — | opacity 0.35 |
| visible=false | `#FFFFFF` | transparent | `#909399` | text-decoration: line-through |

**縮排規則：** `padding-left = 12 + depth × 22`（px）

### 5.4 新增主選單項目（樹底部）

- 樣式：`border-top: 1px dashed #DCDFE6`，藍色文字 `#409EFF`，hover 時背景 `#ECF5FF`
- 行為：等同「新增項目」按鈕，`defaultParent = null`（加入第一層）

### 5.5 空語系提示

當 `menus[lang]` 為空陣列時顯示：

> 此語系尚未建立選單
> 點擊「新增項目」或「複製架構」開始建立

---

## 6. 右側卡片 — 節點設定面板

### 6.1 空狀態（未選取任何節點）

置中顯示佔位圖示（表格形 SVG，opacity 0.25）+ 文字：

> 選擇左側選單項目以編輯設定
> 點擊項目名稱即可進入設定頁面

### 6.2 設定面板 Header

```
[節點名稱 H2 16px Bold]  [類型標籤（帶色彩邊框）]
[基本設定] [網頁 SEO]     ← Tab bar，active 下底線 #409EFF
```

### 6.3 基本設定 Tab

#### A. 內容連結資訊橫幅（僅限 article-page / product-page / form）

顯示於所有欄位之前。`background: #ECF5FF`，`border: 1px solid #B3D8FF`

| type | 顯示模組名稱 | 說明文字 |
|---|---|---|
| `article-page` | 文章管理 | 「此項目連結至文章內容頁，頁面版面由文章管理模組控制。在此僅設定選單顯示名稱、網址與可見度等屬性。」|
| `product-page` | 產品中心 | 「此項目連結至產品內容頁，頁面版面由產品中心模組控制。在此僅設定選單顯示名稱、網址與可見度等屬性。」|
| `form` | 表單管理 | 「此項目連結至表單頁面，表單欄位與設計由表單管理模組控制。在此僅設定選單顯示名稱、網址與可見度等屬性。」|

橫幅右側有「前往 [模組名稱] 編輯」按鈕。

#### B. 欄位定義

| 欄位名稱 | 元件 | 說明 | 備註 |
|---|---|---|---|
| 標題 | Text Input | 前台選單顯示名稱 | 必填 |
| 自訂網址 | Text Input | 覆蓋系統自動生成的路徑 | 選填，placeholder: `/about-us`；label 後附「（留空使用系統自動生成）」說明 |
| 前台可見度 | Switch + 說明列 | 控制選單列表是否顯示此節點 | 說明文字：「僅影響選單顯示；直接輸入網址仍可瀏覽」|
| 開啟方式 | Radio Group（帶邊框卡片式）| 換頁（same）/ 另開新視窗（new）| 選中卡片邊框 `#409EFF`，背景 `#ECF5FF` |
| 列表圖片 | 上傳區 | 顯示於列表頁的縮圖 | 說明文字：「建議 800×450，JPG / PNG / WebP」|
| 列表簡介 | Textarea（4 行）| 顯示於列表頁的摘要文字 | 選填，placeholder 提示 |
| 頁面設計 | 按鈕列（含說明文字）| 開啟頁面設計器 | **不顯示於 article-page / product-page / form** |

**開啟方式選項：**
- `same`：「換頁」，說明文字「在相同視窗開啟」
- `new`：「另開新視窗」，說明文字「以新分頁開啟連結」

### 6.4 網頁 SEO Tab

| 欄位名稱 | 元件 | Placeholder | Helper 文字 |
|---|---|---|---|
| SEO 標題 | Text Input | 留空將使用頁面標題 | 建議 30–60 個字元 |
| SEO 描述 | Textarea（4 行）| 留空將使用頁面摘要 | 建議 70–160 個字元 |
| 社群分享圖片（OG Image）| 上傳區 | 點擊上傳 OG 圖片（建議 1200×630）| — |

### 6.5 設定面板 Footer（所有 Tab 共用）

- **儲存設定**（primary button，`background: #409EFF`）：呼叫 `PATCH /menus/{lang}/nodes/{id}`，成功後 Toast「設定已儲存」
- **取消**（secondary button）：捨棄變更，不關閉面板

---

## 7. 新增項目 Modal

**Modal 規格：** 固定大小 800 × 660px，垂直置中，背景遮罩 `rgba(0,0,0,0.4)`

### 7.1 類型選擇格（Grid 4 欄 × 2 列）

依序排列 8 種類型（見 2.2），每格顯示類型中文名稱。

已選類型：邊框改為對應顏色 `1.5px solid`，背景改為對應 bg 色，文字改為對應 color；未選時邊框 `#DCDFE6`，白底，`color: #606266`。

### 7.2 各類型動態表單

#### 群組（group）
```
* 群組名稱 [Text Input，placeholder: 輸入前台顯示的群組文字]
```

#### 自訂連結（link）
```
* 連結名稱 [Text Input，placeholder: 顯示於前台的名稱]
* 連結網址 [Text Input，placeholder: https://...]
```

#### 文章列表 / 產品列表 / 表單 / 系統分頁

顯示 Checkbox 清單（含全選 Header Row）：
- 全選 Header：`background: #FAFBFC`，勾選框支援三態（全選 / 全不選 / indeterminate）；右側顯示「已選 N / M 項」
- 清單最大高度：280px，超出時可捲動
- 已選取列：`background: #ECF5FF`

#### 文章單頁 / 產品單頁（兩步驟流程）

**步驟一 — 選擇分類：**
- 顯示分類列表，每行：分類名稱 + 「N 筆 →」（右對齊）
- 點擊任一分類進入步驟二，hover 背景 `#ECF5FF`

**步驟二 — 選擇頁面：**
- 「← 返回分類」按鈕（藍色文字）
- 搜尋框（關鍵字即時過濾，無需按 Enter）
- Checkbox 清單（同上，支援全選三態）

### 7.3 加入到（所有類型均顯示）

```
加入到 [Select]
  ├─ 第一層（主選單）  // value='root'
  ├─ [各頂層節點名稱]  // value=nodeId
```

由「+」按鈕觸發時，`defaultParent = node.id`（預設選中該父節點）

### 7.4 Modal Footer

- **「新增至選單」**（primary，flex: 1，height 38px）
- **「取消」**（secondary，height 38px）

### 7.5 Modal 送出邏輯

- **群組 / 自訂連結**：每次新增 1 個節點
- **其他類型（多選）**：依勾選數量批量新增
- 每個節點初始值：`{ visible: true, openMode: 'same', children: [] }`
- **空值驗證：**
  - 群組名稱不可空
  - 自訂連結兩個欄位均不可空
  - 其他類型至少選擇 1 項（`items.length === 0` 時 return，不關閉 Modal）
- 新增成功後關閉 Modal，顯示 Toast：「已新增 N 個項目」（success）

---

## 8. 拖曳排序

### 8.1 技術方式

HTML5 Drag and Drop API（`draggable`、`onDragStart`、`onDragOver`、`onDrop`、`onDragEnd`），事件在節點 div 層設定，`e.stopPropagation()` 防止冒泡。

### 8.2 行為規格

| 事件 | 行為 |
|---|---|
| dragStart | 記錄 `draggingId`；`dataTransfer.effectAllowed = 'move'`；節點 opacity 降至 0.35 |
| dragOver | 計算 `e.clientY` 相對於目標節點高度的中線，決定 `pos: 'before' \| 'after'`；更新 `dragOver: { id, pos }`；`e.preventDefault()` |
| dragLeave | 清空 `dragOver` |
| drop | 執行 `wmMove(tree, srcId, dstId, dragOver.pos)`；清空拖曳狀態 |
| dragEnd | 清空 `draggingId` 和 `dragOver` |

### 8.3 視覺回饋

- 拖曳中的節點：`opacity: 0.35`，`transition: opacity .15s`
- Drop 目標 before 位置：目標節點**上方** `position: absolute`，`top: 0`，`height: 2px`，`background: #409EFF`，`z-index: 10`
- Drop 目標 after 位置：目標節點**下方** `position: absolute`，`bottom: 0`，`height: 2px`，`background: #409EFF`，`z-index: 10`
- 藍線的左側起點對齊該節點的縮排位置（`left: pl`）

### 8.4 移動邏輯

```
wmMove(tree, srcId, dstId, pos):
  1. 若 srcId === dstId，直接返回（不執行）
  2. 找出 src 節點（wmFind）
  3. 從樹中刪除 src（wmDelete，遞迴）
  4. 在 dstId 前（before）或後（after）插入 src（wmInsertAdjacentTo，遞迴）
```

**限制：**
- 不可拖曳到自身
- 跨語系不可拖曳（拖曳僅作用於當前語系的樹）

---

## 9. 匯入 / 匯出（JSON）

### 9.1 匯出

- **觸發：** 頂部「匯出」按鈕
- **範圍：** 當前語系（`menus[lang]`）
- **格式：** JSON，美化排版（`JSON.stringify(data, null, 2)`）
- **編碼：** UTF-8
- **檔名：** `menu-{lang}-{YYYY-MM-DD}.json`（例：`menu-zh-2026-05-29.json`）
- **機制：** Blob → `URL.createObjectURL` → 隱形 `<a>` 點擊下載 → `revokeObjectURL`
- **Toast：** 「選單已匯出」（success）

**操作流程：**
1. 確認當前語系 Tab（繁中 / EN）
2. 點擊右上角「匯出」按鈕
3. 瀏覽器自動下載 JSON 檔案
4. 顯示 Toast「選單已匯出」

**匯出 JSON 結構（MenuNode 陣列，含遞迴巢狀）：**

```json
[
  {
    "id": "node-001",
    "name": "關於我們",
    "type": "group",
    "visible": true,
    "openMode": "same",
    "children": [
      {
        "id": "node-002",
        "name": "公司介紹",
        "type": "article-page",
        "visible": true,
        "openMode": "same",
        "sourceId": "article-cat-01",
        "children": []
      }
    ]
  }
]
```

### 9.2 匯入

- **觸發：** 頂部「匯入」按鈕（hidden `<input type="file" accept=".json">`）
- **接受檔案類型：** 僅 `.json` 副檔名；檔案選擇器自動過濾非 JSON 檔案
- **檔案編碼：** UTF-8
- **檔案大小上限：** 建議 5 MB（超出時顯示 warning Toast，仍可繼續）
- **解析：** `FileReader.readAsText` → `JSON.parse`
- **驗證：** 多層（見下表）
- **行為：** 驗證通過後以匯入資料**立即覆蓋**當前語系選單（`menus[lang] = data`）；前端不顯示確認對話框，操作無法復原
- **Toast：** 成功「選單已匯入」；失敗見下表

**操作流程：**
1. 切換至目標語系 Tab
2. 點擊右上角「匯入」按鈕，開啟作業系統檔案選擇器
3. 選擇符合格式的 `.json` 檔案（本系統匯出產生或自行符合格式規範的 JSON）
4. 系統讀取、解析、驗證
5. 驗證通過 → 當前語系選單立即被覆蓋，顯示 Toast「選單已匯入」
6. 驗證失敗 → 顯示對應 error Toast，選單不變動

**驗證規則（依序執行，任一層失敗即中止）：**

| 層級 | 驗證項目 | 失敗 Toast |
|---|---|---|
| 第一層 | 副檔名為 `.json`（由 `accept` 屬性限制）| 檔案選擇器不顯示非 JSON 檔案 |
| 第二層 | `FileReader` 可讀取為文字（無例外）| 「檔案讀取失敗，請確認檔案未損毀」（error）|
| 第三層 | `JSON.parse` 不拋出例外（合法 JSON 語法）| 「檔案格式錯誤，請上傳正確的 JSON 檔案」（error）|
| 第四層 | `Array.isArray(data) === true` | 「檔案格式錯誤，請上傳正確的 JSON 檔案」（error）|

**錯誤情境對照：**

| 錯誤類型 | 常見原因 | Toast 訊息 |
|---|---|---|
| 讀取失敗 | 檔案損毀或系統存取權限不足 | 檔案讀取失敗，請確認檔案未損毀 |
| 無效 JSON | 手動編輯時破壞格式（漏逗號、多引號等）| 檔案格式錯誤，請上傳正確的 JSON 檔案 |
| 根結構非陣列 | 匯入物件格式 JSON 或他系統匯出檔 | 檔案格式錯誤，請上傳正確的 JSON 檔案 |

**工程師注意：**
- 系統僅驗證最外層為陣列，不逐節點檢查 `type` 欄位合法性；節點資料異常時前台渲染結果可能不如預期
- `sourceId` 若指向目標站台不存在的文章、產品或表單，節點仍會建立，前台連結可能 404
- 匯入後選單狀態僅存於前端 state，需整頁儲存（`PUT /api/menus`）才會同步至後端

---

## 10. 語系複製（複製 / 貼上架構）

- **操作路徑：** 左側樹狀列表工具列 > 「···」Kebab 選單 > 「複製架構」
- **複製：** 將當前語系的完整樹結構（deep copy）存入 React state（`menuClipboard`）
  - Toast：「選單架構已複製」
- **貼上：** Kebab 選單 > 「貼上架構」（剪貼板有資料時才可點擊）
  - 遞迴將所有節點的 `visible` 設為 `false`
  - Toast：「選單架構已貼上（預設全部隱藏）」
- **注意：** 跨語系貼上可用（先切到目標語系，再貼上）

> 注意（工程師）：自訂網址（`url`）貼上後是否需要依語系路徑自動調整前綴（例如 `/en/about`）尚未定案，目前原樣貼上，請與 PM 確認後再實作。

---

## 11. 節點類型的頁面設計連結規則

| type | 設定面板「基本設定」Tab 行為 |
|---|---|
| `group` | 顯示「頁面設計」按鈕列（說明文字 + 「開啟設計器」按鈕）|
| `link` | 顯示「頁面設計」按鈕列 |
| `article-list` | 顯示「頁面設計」按鈕列 |
| `product-list` | 顯示「頁面設計」按鈕列 |
| `system-page` | 顯示「頁面設計」按鈕列 |
| `article-page` | **不顯示**「頁面設計」，改顯示「文章管理」內容連結橫幅與「前往文章管理編輯」按鈕 |
| `product-page` | **不顯示**「頁面設計」，改顯示「產品中心」內容連結橫幅與「前往產品中心編輯」按鈕 |
| `form` | **不顯示**「頁面設計」，改顯示「表單管理」內容連結橫幅與「前往表單管理編輯」按鈕 |

---

## 12. API 建議端點

> 以下為實作邏輯推算的建議端點，需後端確認後定案。

| 方法 | 路徑 | 說明 |
|---|---|---|
| GET | `/api/menus?lang={lang}` | 取得指定語系的完整選單樹 |
| PUT | `/api/menus?lang={lang}` | 儲存整棵選單樹（覆蓋）|
| PATCH | `/api/menus/{lang}/nodes/{id}` | 更新單一節點的設定欄位（設定面板儲存）|
| GET | `/api/menus/export?lang={lang}` | 匯出指定語系為 JSON |
| POST | `/api/menus/import?lang={lang}` | 匯入 JSON 覆蓋指定語系 |
| GET | `/api/article-categories` | 取得文章分類清單（新增 Modal 用）|
| GET | `/api/article-categories/{id}/pages` | 取得分類下的文章單頁清單 |
| GET | `/api/product-categories` | 取得產品分類清單 |
| GET | `/api/product-categories/{id}/pages` | 取得分類下的產品單頁清單 |
| GET | `/api/forms` | 取得表單清單 |
| GET | `/api/system-pages` | 取得系統分頁清單 |

**儲存策略：**
- 拖曳排序、新增節點、刪除節點等操作在前端即時更新 state，不即時送 API
- 語系架構的最終儲存由 `PUT /api/menus` 觸發（可搭配離開頁面前自動儲存或明確「儲存選單」按鈕）
- 節點設定面板的儲存獨立呼叫 `PATCH /api/menus/{lang}/nodes/{id}`

---

## 13. Toast 訊息規格

| 觸發操作 | Toast 文字 | 類型 |
|---|---|---|
| 節點設定儲存成功 | 設定已儲存 | success |
| 新增項目成功 | 已新增 N 個項目 | success |
| 刪除節點 | 項目已移除 | info |
| 複製選單架構 | 選單架構已複製 | success |
| 貼上選單架構 | 選單架構已貼上（預設全部隱藏）| success |
| 匯出成功 | 選單已匯出 | success |
| 匯入成功 | 選單已匯入 | success |
| 匯入格式錯誤 | 檔案格式錯誤，請上傳正確的 JSON 檔案 | error |

---

## 14. 待確認項目（實作前需與 PM / 設計師確認）

| 項目 | 說明 | 優先度 |
|---|---|---|
| 「換頁」詞彙 | 開啟方式中「換頁」正式名稱，建議改為「同視窗開啟」，待 PM 定案 | 高 |
| 語系自訂網址 | 複製 / 貼上架構時，自訂網址是否自動調整路徑前綴 | 高 |
| 整頁儲存觸發時機 | PUT /api/menus 應由「儲存選單」按鈕觸發、頁面離開前自動觸發、或兩者皆有 | 高 |
| 批量刪除 | 多選 + 批量刪除功能尚未實作 | 中 |
| 展開 / 收合全部 | 一鍵展開所有節點 / 收合所有節點 | 中 |
| 前台預覽連結 | 每個節點右側加「前往前台」icon | 中 |
| 拖曳觸控支援 | 觸控裝置的拖曳替代方案 | 低 |

---

## 15. 與獨立 Prototype 的差異說明

`html/選單管理.html` 為早期獨立測試版本，設計較為簡化（4 種類型、無 Modal、無設定面板）。本文件以 `components/pages/PageWebsiteDesign.jsx`（index.html 整合版）為正式開發依據，功能較完整，兩者不應混用。
