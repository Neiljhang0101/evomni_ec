# 行銷追蹤碼管理 — Design Brief + UX Spec

> **Version:** 1.0
> **Created:** 2026-05-14
> **用途：** 上傳至 Claude Design，配合文件末尾的 Prompt Cheatsheet 使用

---

## Part 1 — Design Brief

### Product Vision

行銷追蹤碼管理讓電商商家不需要任何程式背景，只要填入一串 ID，就能完成 GA4、Meta Pixel、FB Conversion API、GTM 的完整安裝——系統自動注入追蹤碼、自動帶入標準電商事件參數、自動維護不因系統更版失效。商家從開店第一天就能看到精準的廣告轉換數據，不再因追蹤碼安裝錯誤而浪費廣告預算。

### Target User

**Primary:** 商家管理員 — 具備基本廣告投放知識（懂得在 GA4 / Meta 後台找到 ID），但不具備前端工程能力，希望在不碰程式碼的前提下完成追蹤碼設定。

### Design Goals

| # | Goal | How to test |
|---|---|---|
| 1 | 商家在 5 分鐘內完成 GA4 設定（從進入頁面到看到「儲存成功」Toast）| 計時觀察第一次設定所需時間 |
| 2 | 商家看到「FB Conversion API」時，能理解它與 FB Pixel 的關係，不會因 Disabled 狀態感到困惑 | 詢問用戶：「為什麼這個卡片是灰色的？」|
| 3 | GTM + GA4 同時啟用時，商家看到警示後能說出「需要去 GTM 確認是否有重複安裝」| 情境測試：同時啟用兩者後，詢問用戶：「你接下來會做什麼？」|
| 4 | 事件觸發統計表格讓商家能判斷追蹤碼是否已正確生效（數字 > 0 = 生效）| 觀察商家是否正確解讀「近 7 天觸發次數」欄位 |

### Design Principles

1. **填入即完成** — 商家的心智模型是「填個號碼、按儲存、搞定」，任何超出這個流程的步驟都要有明確說明
2. **依賴關係要視覺化** — FB Conversion API 依賴 FB Pixel，GTM 與 GA4/Pixel 的衝突關係，都必須在介面上立即可見，不能讓商家踩雷後才發現
3. **敏感資訊保護可見** — Access Token 的密碼型輸入、儲存後遮蔽、「重新設定」入口，讓商家知道系統在保護他的憑證
4. **各工具獨立，互不干擾** — 設定 GA4 不應該影響 FB Pixel 的儲存狀態；錯誤也應該只在該卡片範圍內顯示

### Design System Reference

- **Figma Library:** Evomni Design System（Element Plus 為基礎）
- **Component framework:** Element Plus（`<el-card>`, `<el-switch>`, `<el-input>`, `<el-alert>`, `<el-message-box>` 等）
- **Icon set:** Element Plus icons
- **Font:** Noto Sans TC, sans-serif

### Accessibility Requirements

- **Target WCAG level:** AA
- **Known constraints:**
  - 停用確認彈窗（Confirm Dialog）必須支援鍵盤操作（Enter 確認、Esc 取消）
  - 所有狀態 Tag（已啟用/未啟用）不可僅靠顏色區分，需同時有文字標籤
  - 密碼型輸入框（Access Token）的「顯示/隱藏」切換需有 aria-label

### Hard Constraints

- ⚠️ Omnichat 不在本模組範圍內，設計中不可出現任何 Omnichat 相關入口或欄位
- ⚠️ FB Access Token 絕對不可以在前端任何地方明文顯示；儲存後一律遮蔽顯示 `****`
- ⚠️ 事件觸發統計表格僅為「近 7 天統計數字」，設計上不可暗示這是即時 log 或完整原始資料，需加說明文字
- ⚠️ 各追蹤工具的「設定生效」是系統自動處理，不需要商家手動安裝任何程式碼；設計中不應出現「下載」、「貼上程式碼」等暗示

### Out of Scope

- Omnichat 追蹤碼設定
- 自訂事件（Custom Events）設定
- GA4 / FB Pixel 的原始 log 查詢（僅提供統計摘要）
- 前台追蹤碼注入的工程實作細節（後台不顯示）
- 多店鋪切換邏輯（單一商店範圍）

---

## Part 2 — Screen Index

| # | Screen Name | Navigation path | Primary user goal |
|---|---|---|---|
| 1 | 行銷追蹤碼管理 — 主頁 | 全域設定 → 行銷追蹤碼管理 | 總覽四個工具的啟用狀態，進入設定 |
| 2 | GA4 設定卡片（展開狀態）| 主頁 → GA4 開關 ON | 填入 Measurement ID 並儲存 |
| 3 | Meta Pixel 設定卡片（展開狀態）| 主頁 → Meta Pixel 開關 ON | 填入 Pixel ID 並選擇幣別 |
| 4 | FB Conversion API 設定卡片 | 主頁 → CAPI 開關 ON（需先啟用 Pixel）| 填入 Access Token 啟用 Server 端事件 |
| 5 | GTM 設定卡片（展開狀態）+ 重複載入警示 | 主頁 → GTM 開關 ON | 填入 Container ID；了解重複載入風險 |
| 6 | 事件觸發統計表格 | 主頁底部 | 確認各追蹤事件是否已正確觸發 |
| 7 | 停用工具確認彈窗 | 任一卡片 → 開關 OFF → 儲存 | 確認停用某工具並了解後果 |

---

## Part 3 — Per-Screen UX Spec

---

### Screen 1: 行銷追蹤碼管理 — 主頁

**Purpose:** 顯示四個追蹤工具的設定入口與目前啟用狀態，讓商家一眼知道哪些工具已設定、哪些待設定。
**Entry points:** 後台左側導覽 → 全域設定 → 行銷追蹤碼管理
**Primary user goal:** 了解當前設定狀態，選擇要啟用的工具

#### Information Hierarchy

```
H1 (most prominent): 行銷追蹤碼管理
H2 (secondary): 說明文字（告知商家只需填入 ID）
Supporting info: 手動埋碼衝突警示 Callout
Primary CTA: 各卡片的啟用開關（<el-switch>）
Secondary CTA: 各卡片的「儲存此設定」按鈕（展開後顯示）
```

#### Actual Copy

**Page / Section Headings**
- 頁面標題: `行銷追蹤碼管理`
- 說明文字: `在此設定 GA4、Meta Pixel、GTM 等行銷追蹤工具。填入 ID 後系統將自動安裝追蹤碼，無需手動埋設程式碼。`

**警示 Callout（淡藍背景 `#EBF5FF`，頁面頂部）**
`⚠️ 若您先前已在網站 <head> 手動埋設過 GA4 或 FB 像素追蹤碼，請先移除，避免重複觸發導致數據失真。`

**四張卡片標題文字（未展開時）**
| 卡片 | 標題文字 | 狀態 Tag（未啟用）|
|---|---|---|
| 卡片 1 | `Google Analytics 4` | `未啟用`（灰色）|
| 卡片 2 | `Meta（Facebook）Pixel` | `未啟用`（灰色）|
| 卡片 3 | `Meta Conversion API` | `未啟用`（灰色）|
| 卡片 4 | `Google Tag Manager` | `未啟用`（灰色）|

**狀態 Tag 文字與顏色語義**
| 狀態 | 文字 | 顏色 |
|---|---|---|
| 已啟用並儲存 | `已啟用` | Success（綠色 `#67C23A`）|
| 未啟用 | `未啟用` | Neutral（灰色 `#909399`）|
| 已填入但未儲存 | `設定中` | Info（藍色 `#409EFF`）|

**Empty State**（從未設定過任何工具，第一次進入）
- Headline: `尚未設定任何追蹤工具`
- Subtext: `啟用追蹤工具後，系統將自動在您的商店安裝對應的追蹤碼，無需任何程式設定。`
- CTA label: 無（引導商家點擊各卡片的開關）

**Loading State**
- 頁面初始載入: 四個卡片各自顯示 Skeleton 骨架屏，無文字

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 頂部警示 Callout | `<el-alert type="info">`；淡藍背景；不可關閉 | 無互動 |
| 工具設定卡片 × 4 | `<el-card>`；縱向排列；標題列含 logo icon + 名稱 + 狀態 Tag + 開關 | 展開/收合動畫（`<el-collapse-transition>`）|
| 啟用開關 | `<el-switch>`；位於卡片標題列右側 | ON → 展開欄位；OFF → 折疊欄位；OFF + 已儲存 → 觸發停用確認彈窗（Screen 7）|
| 狀態 Tag | `<el-tag>`；三色語義 | 無互動（純顯示）|

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 全未啟用 | 首次進入，無任何設定 | 四張卡片折疊，開關全 OFF，狀態 Tag 全「未啟用」|
| 部分啟用 | 有工具已儲存設定 | 已啟用的卡片 Tag 顯示「已啟用」（綠色）；開關為 ON |
| Loading | 初始載入 | 四張卡片各自 Skeleton 骨架屏 |
| Error | API 載入失敗 | `<el-alert type="error">` 橫幅 + 重試按鈕 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊卡片開關 ON | 卡片展開，顯示欄位設定區域（動畫展開）|
| 點擊已啟用卡片的開關 OFF | 彈出停用確認彈窗（Screen 7）|
| 確認停用 | 卡片折疊，Tag 改為「未啟用」，顯示成功 Toast |

---

### Screen 2: GA4 設定卡片（展開狀態）

**Purpose:** 讓商家填入 GA4 Measurement ID 完成 Google Analytics 追蹤設定。
**Entry points:** 主頁 → Google Analytics 4 卡片 → 開關 ON
**Primary user goal:** 正確填入 Measurement ID 並儲存

#### Information Hierarchy

```
H1 (most prominent): Google Analytics 4（卡片標題）
H2 (secondary): Measurement ID 輸入欄
Primary CTA: 儲存此設定
Secondary CTA: 文章頁發送事件（可選 Toggle）
Supporting info: 如何取得 ID 的 Tooltip 說明
```

#### Actual Copy

**卡片標題**
`Google Analytics 4`

**欄位規格**

| 欄位標籤 | 元件 | Placeholder | Helper text |
|---|---|---|---|
| `Measurement ID` | `<el-input>` | `G-XXXXXXXXXX` | — |
| `追蹤文章頁` | `<el-switch>` | — | `適合有內容行銷策略的商家，開啟後可追蹤部落格文章的瀏覽數據` |

**Measurement ID Tooltip（❓ icon Hover）**
`在 Google Analytics 後台 > 管理 > 資料串流中取得。格式為 G- 開頭後接字母與數字。`

**文章頁追蹤 Toggle 說明（開關下方小字）**
`適合有內容行銷策略的商家，開啟後可追蹤部落格文章的瀏覽數據`

**Button Labels**
- Primary: `儲存此設定`

**Validation Error Messages**
| 情境 | 錯誤文字 |
|---|---|
| ID 格式錯誤（非 G- 開頭）| `請輸入正確的 GA4 Measurement ID 格式，應為 G- 開頭後接字母數字（例：G-ABC123456）` |
| 欄位空白點儲存 | `請填入 Measurement ID 才能啟用 GA4 追蹤` |

**Toast Messages**
| Trigger | Message |
|---|---|
| 儲存成功 | `✅ GA4 設定已儲存，追蹤碼將於頁面重新整理後在前台生效` |
| 儲存失敗 | `❌ 儲存失敗，請確認網路連線後重試` |

**已儲存狀態顯示（開關 ON + 已有 ID）**
- Measurement ID 欄位顯示已填入的 ID（可編輯）
- 卡片 Tag: `已啟用`（綠色）

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 啟用開關 | `<el-switch>`；卡片標題列右側 | ON → 展開欄位；已啟用再切 OFF → 觸發停用確認彈窗 |
| Measurement ID 輸入框 | `<el-input>`；全寬；右側有 ❓ icon | 即時格式驗證（非 G- 開頭時紅框）；失焦後顯示錯誤文字 |
| ❓ Tooltip icon | Measurement ID 欄位右側 | Hover 顯示取得 ID 的說明（最大寬度 300px）|
| 文章頁追蹤 Toggle | `<el-switch>`；附說明小字 | OFF（預設）；ON/OFF 狀態不單獨儲存，與主設定一起儲存 |
| 儲存按鈕 | `<el-button type="primary" class="!rounded-none">`；卡片底部 | 點擊觸發驗證 → 儲存 API → 顯示 Toast |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 展開未填（初次）| 開關剛 ON，尚未輸入任何內容 | 空白 Measurement ID 欄位；儲存按鈕 Disabled |
| 填入中 | 用戶正在輸入 | 格式即時驗證（紅框/正常）|
| 格式錯誤 | 輸入不符 G-XXXXXXXX 格式 | 欄位紅框 + 錯誤文字（欄位下方）|
| 已儲存 | 儲存 API 成功 | Toast 出現；Tag 改為「已啟用」（綠色）|
| 儲存中 | 點擊儲存按鈕後等待 API | 按鈕顯示 Loading 狀態；防止重複點擊 |
| 儲存失敗 | API 回傳錯誤 | Toast 顯示「❌ 儲存失敗」；欄位內容保留 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 在 ID 欄位輸入非 G- 開頭內容 | 欄位即時紅框；失焦後顯示錯誤文字 |
| 欄位空白點「儲存此設定」| 欄位紅框 + 錯誤文字；開關自動回 OFF |
| 輸入正確格式並點「儲存此設定」| Loading → 成功 Toast → Tag 轉綠 |
| Hover ❓ icon | 顯示取得 ID 的說明 Tooltip |
| 將「文章頁追蹤」Toggle 開啟 | 無立即反應；與主設定一起在點「儲存」時生效 |

---

### Screen 3: Meta Pixel 設定卡片（展開狀態）

**Purpose:** 讓商家填入 Meta Pixel ID 與幣別設定，完成 Facebook 廣告轉換追蹤。
**Entry points:** 主頁 → Meta（Facebook）Pixel 卡片 → 開關 ON
**Primary user goal:** 正確填入 Pixel ID 並設定幣別後儲存

#### Information Hierarchy

```
H1 (most prominent): Meta（Facebook）Pixel（卡片標題）
H2 (secondary): Pixel ID 輸入欄
Secondary: 幣別選擇器
Primary CTA: 儲存此設定
Supporting info: 如何取得 Pixel ID 的 Tooltip
```

#### Actual Copy

**卡片標題**
`Meta（Facebook）Pixel`

**欄位規格**

| 欄位標籤 | 元件 | Placeholder | Helper text |
|---|---|---|---|
| `Pixel ID` | `<el-input>` | `例：1234567890123456` | — |
| `幣別` | `<el-select>` | — | `將帶入所有含金額事件的 currency 參數，如 Purchase、ViewContent` |

**Pixel ID Tooltip（❓ icon Hover）**
`在 Meta Events Manager > 資料來源中取得您的 Pixel ID。格式為 15–16 位純數字。`

**幣別選項**
- `TWD — 新台幣`（預設，第一個選項）
- `USD — 美元`
- `HKD — 港幣`

**Button Labels**
- Primary: `儲存此設定`

**Validation Error Messages**
| 情境 | 錯誤文字 |
|---|---|
| Pixel ID 含有非數字字元 | `Pixel ID 應為 15–16 位的純數字，請確認後重新輸入` |
| Pixel ID 位數不足/過多 | `Pixel ID 應為 15–16 位的純數字，請確認後重新輸入` |
| 欄位空白點儲存 | `請填入 Meta Pixel ID 才能啟用像素追蹤` |

**Toast Messages**
| Trigger | Message |
|---|---|
| 儲存成功 | `✅ Meta Pixel 設定已儲存` |
| 儲存失敗 | `❌ 儲存失敗，請確認網路連線後重試` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 啟用開關 | `<el-switch>`；卡片標題列右側 | ON → 展開欄位；ON 後同時解鎖 FB Conversion API 卡片（Screen 4）|
| Pixel ID 輸入框 | `<el-input>`；全寬；右側有 ❓ icon | 即時格式驗證；失焦後顯示錯誤 |
| ❓ Tooltip icon | Pixel ID 欄位右側 | Hover 顯示取得 Pixel ID 說明 |
| 幣別選擇器 | `<el-select>`；預設 TWD | 點擊展開下拉選單；選擇後更新 value |
| 儲存按鈕 | `<el-button type="primary" class="!rounded-none">` | 驗證 → 儲存 → Toast |

**注意：Meta Pixel 開關 ON 後，FB Conversion API 卡片（Screen 4）的 Disabled 狀態解除，開關變為可操作。**

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 展開未填 | 開關剛 ON | 空白輸入框；幣別預設 TWD |
| 格式錯誤 | 輸入非純數字或位數不對 | 欄位紅框 + 錯誤文字 |
| 已儲存 | 儲存 API 成功 | Toast；Tag 轉「已啟用」；FB CAPI 卡片解鎖 |
| 儲存中 | 等待 API | 按鈕 Loading |
| 儲存失敗 | API 錯誤 | Toast 顯示失敗訊息 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 開關 ON | 卡片展開；FB Conversion API 卡片的 Disabled 狀態移除 |
| 輸入非數字內容 | 即時紅框；失焦後顯示錯誤文字 |
| 選擇幣別 | 下拉選單選擇；與 Pixel ID 一起在儲存時生效 |

---

### Screen 4: FB Conversion API 設定卡片

**Purpose:** 讓已啟用 Meta Pixel 的商家進一步填入 Access Token，啟用 Server 端事件追蹤補強 iOS14 後的轉換缺口。
**Entry points:** 主頁（FB Pixel 啟用後此卡片解鎖）→ Conversion API 開關 ON
**Primary user goal:** 填入 Access Token 啟用 Server 端事件去重追蹤

> ⚠️ 此卡片有兩種狀態：
> - **Disabled 狀態**：Meta Pixel 尚未啟用時，整張卡片灰化不可操作
> - **啟用狀態**：Meta Pixel 已啟用後，卡片解鎖可操作

#### Information Hierarchy

```
H1 (most prominent): Meta Conversion API（FB 轉換 API）（卡片標題）
H2 (secondary): Access Token 密碼型輸入欄
Supporting info: CAPI 說明區塊（灰色背景）
Primary CTA: 儲存此設定
```

#### Actual Copy

**卡片標題**
`Meta Conversion API（FB 轉換 API）`

**Disabled 狀態提示文字（卡片標題下方）**
`需先啟用 Meta Pixel 才能使用 Conversion API`

**欄位規格**（啟用後展開）

| 欄位標籤 | 元件 | Placeholder | Helper text |
|---|---|---|---|
| `Access Token` | `<el-input type="password">` | `貼入您的 Meta Business Access Token` | — |

**Access Token Tooltip（❓ icon Hover）**
`在 Meta Events Manager > 設定 > Conversions API > 產生存取權杖中取得。Token 通常為 100 字元以上的長字串。`

**已儲存的 Access Token 顯示**
- 欄位顯示: `••••••••••••••••（已設定）`
- 操作按鈕: `重新設定`（Text Button，點擊清空欄位讓商家重新貼入）

**CAPI 說明區塊（淡灰背景 `#F5F7FA`，欄位上方）**
```
💡 關於 Conversion API

iOS 14 後 Safari 封鎖 Cookie，部分轉換事件無法透過瀏覽器像素捕捉。
Conversion API 從 Server 端傳送事件，可補回遺失的轉換數據。

系統會自動為每個事件加上相同的 event_id，Meta 將自動去除重複。
您可在 Meta Events Manager 觀察「比對率」是否達到 70% 以上。
```

**Button Labels**
- Primary: `儲存此設定`
- Ghost: `重新設定`（已儲存狀態下）

**Validation Error Messages**
| 情境 | 錯誤文字 |
|---|---|
| Token 長度不足（< 50 字元）| `Access Token 格式異常，請確認是否完整複製` |
| 欄位空白點儲存 | `請填入 Access Token 才能啟用 Conversion API` |

**Toast Messages**
| Trigger | Message |
|---|---|
| 儲存成功 | `✅ Conversion API 設定已儲存，Server 端事件追蹤已啟用` |
| 儲存失敗 | `❌ 儲存失敗，請確認網路連線後重試` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 卡片（Disabled 狀態）| 整張卡片灰化；開關 Disabled；標題下顯示提示文字 | 無法操作；像是視覺上存在但不可互動 |
| 啟用開關（解鎖後）| `<el-switch>` | ON → 展開欄位 |
| CAPI 說明區塊 | 淡灰背景；4 段說明文字；箭頭符號 | 無互動（純閱讀）|
| Access Token 輸入框 | `<el-input type="password">`；全寬；右側有 ❓ + 顯示/隱藏切換 | 貼入長字串；儲存後顯示遮蔽 |
| 重新設定按鈕 | Ghost Button；僅在已儲存狀態顯示 | 點擊清空欄位，讓商家重新貼入 Token |
| 儲存按鈕 | `<el-button type="primary" class="!rounded-none">` | 驗證 → 儲存 → Toast |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Disabled（Meta Pixel 未啟用）| FB Pixel 開關 OFF 或未儲存 | 整卡灰化；開關不可點擊；顯示提示文字 |
| 解鎖未展開 | FB Pixel 已啟用，CAPI 開關 OFF | 卡片正常色；開關 OFF；不顯示欄位 |
| 展開未填 | CAPI 開關 ON | 顯示說明區塊 + 空白 Token 輸入框 |
| 已儲存（有 Token）| Token 儲存成功 | Token 欄位顯示 `••••••••`；「重新設定」按鈕出現 |
| 重新設定中 | 點擊「重新設定」按鈕 | 清空欄位，回到「展開未填」狀態 |
| 儲存中 | 等待 API | 按鈕 Loading |

#### Interaction Annotations

| User action | Result |
|---|---|
| 啟用 Meta Pixel（Screen 3）後返回此卡片 | 整卡灰化解除；開關變為可操作 |
| 開關 ON | 展開說明區塊 + Access Token 輸入欄 |
| 貼入 Token 並點「儲存此設定」| 驗證長度 → 儲存 → Token 遮蔽顯示 → Toast |
| 點擊「重新設定」| 清空 Token 欄位，讓商家重新貼入 |

---

### Screen 5: GTM 設定卡片（展開狀態）+ 重複載入警示

**Purpose:** 讓商家填入 GTM Container ID，同時在偵測到與 GA4 / FB Pixel 同時啟用時，顯示重複載入警示。
**Entry points:** 主頁 → Google Tag Manager 卡片 → 開關 ON
**Primary user goal:** 填入 GTM Container ID 並了解與其他工具的衝突風險

#### Information Hierarchy

```
H1 (most prominent): Google Tag Manager（卡片標題）
H2 (secondary): Container ID 輸入欄
Primary CTA: 儲存此設定
警示（條件出現）: 重複載入警示 Alert（橘色 Warning 樣式）
Supporting info: GTM 啟用後的說明文字
```

#### Actual Copy

**卡片標題**
`Google Tag Manager`

**欄位規格**

| 欄位標籤 | 元件 | Placeholder | Helper text |
|---|---|---|---|
| `Container ID` | `<el-input>` | `GTM-XXXXXXX` | — |

**Container ID Tooltip（❓ icon Hover）**
`在 Google Tag Manager 後台，點擊右上角的 Container ID 即可複製。格式為 GTM- 開頭後接 4–8 位英數字。`

**GTM 啟用說明文字（卡片內欄位下方，小字灰色）**
`啟用 GTM 後，您可以在 Google Tag Manager 後台自行安裝其他第三方工具（如 Hotjar、Microsoft Clarity 等），無需每次聯繫工程師。`

**Button Labels**
- Primary: `儲存此設定`

**重複載入警示（`<el-alert type="warning">`，橘色背景）**
條件：GTM 啟用 AND（GA4 啟用 OR FB Pixel 啟用）

```
⚠️ 注意：您同時啟用了 GTM 與 GA4 / Meta Pixel。

如果 GTM 容器內也安裝了相同工具，事件將重複觸發，導致數據失真。

建議：擇一方式使用，避免同時透過本系統與 GTM 安裝相同追蹤碼。
```

**Validation Error Messages**
| 情境 | 錯誤文字 |
|---|---|
| Container ID 格式錯誤（非 GTM- 開頭）| `請輸入正確的 GTM Container ID，格式應為 GTM- 開頭（例：GTM-ABC1234）` |
| 欄位空白點儲存 | `請填入 Container ID 才能啟用 GTM` |

**Toast Messages**
| Trigger | Message |
|---|---|
| 儲存成功（無衝突）| `✅ GTM 設定已儲存，Tag Manager 代碼將在前台生效` |
| 儲存成功（有衝突）| `✅ GTM 設定已儲存。請注意：系統偵測到可能的重複載入，請查看頁面上方的警示說明。` |
| 儲存失敗 | `❌ 儲存失敗，請確認網路連線後重試` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 啟用開關 | `<el-switch>`；卡片標題列右側 | ON → 展開欄位；同時觸發重複載入偵測邏輯 |
| Container ID 輸入框 | `<el-input>`；全寬；右側有 ❓ icon | 即時格式驗證；失焦後顯示錯誤 |
| ❓ Tooltip icon | Container ID 欄位右側 | Hover 顯示說明 |
| GTM 說明文字 | 12px 灰色；欄位下方 | 無互動（純閱讀）|
| 重複載入警示 Alert | `<el-alert type="warning">`；不可關閉；條件顯示 | 偵測到衝突時自動出現於卡片內（輸入欄上方）|
| 儲存按鈕 | `<el-button type="primary" class="!rounded-none">` | 驗證 → 儲存 → 檢查衝突 → Toast |

**排序欄位**：此 Screen 無表格。

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 展開無衝突 | GTM 開關 ON，GA4 和 FB Pixel 均未啟用 | 正常輸入欄；無警示 |
| 展開有衝突 | GTM 開關 ON，同時 GA4 或 FB Pixel 已啟用 | 輸入欄上方出現橘色警示 Alert |
| 儲存有衝突 | 在衝突狀態下點「儲存此設定」| Toast 包含衝突提醒；警示保留顯示 |
| 格式錯誤 | 輸入不符 GTM- 開頭格式 | 欄位紅框 + 錯誤文字 |
| 已儲存 | API 成功 | Toast；Tag 轉「已啟用」|

#### Interaction Annotations

| User action | Result |
|---|---|
| 開關 ON（已有 GA4 或 FB Pixel 啟用）| 卡片展開；同時出現橘色重複載入警示 Alert |
| 開關 ON（無其他工具啟用）| 卡片展開；無警示 |
| 輸入非 GTM- 開頭內容 | 即時紅框；失焦後錯誤文字 |
| 點「儲存此設定」（衝突狀態）| 儲存成功；Toast 含警示提醒；警示 Alert 保留 |

---

### Screen 6: 事件觸發統計表格

**Purpose:** 讓商家確認追蹤碼設定後各事件是否已正確觸發，提供近 7 天的觸發次數摘要。
**Entry points:** 主頁底部（頁面捲動至底）
**Primary user goal:** 確認追蹤碼已生效（看到 > 0 的觸發次數）

#### Information Hierarchy

```
H1 (most prominent): 近 7 天事件觸發統計
H2 (secondary): 統計說明文字（強調數字為統計，非即時）
Supporting info: 各事件的觸發次數表格
```

#### Actual Copy

**區塊標題**
`近 7 天事件觸發統計`

**說明文字**
`以下為系統記錄的事件觸發次數，供您確認追蹤碼設定是否生效。實際數據請以 GA4 / Meta Events Manager 後台為準，本統計每小時更新一次。`

**統計表格欄位標題**
`事件名稱` / `對應 GA4 事件` / `對應 FB Pixel 事件` / `近 7 天觸發次數`

**統計表格資料（示意）**
| 事件名稱 | 對應 GA4 事件 | 對應 FB Pixel 事件 | 近 7 天觸發次數 |
|---|---|---|---|
| 產品頁瀏覽 | `view_item` | `ViewContent` | `1,234 次` |
| 加入購物車 | `add_to_cart` | `AddToCart` | `456 次` |
| 開始結帳 | `begin_checkout` | `InitiateCheckout` | `123 次` |
| 完成購買 | `purchase` | `Purchase` | `89 次` |
| 站內搜尋 | `search` | `Search` | `678 次` |
| 完成會員註冊 | `sign_up` | `CompleteRegistration` | `34 次` |
| 加入心願清單 | `add_to_wishlist` | `AddToWishlist` | `67 次` |

**未啟用工具時欄位顯示**
- 對應欄位顯示: `未啟用`（灰色 `#909399`）

**統計資料載入失敗**
- 觸發次數欄位顯示: `—`（灰色）

**Empty State**（所有工具均未啟用）
- Headline: `尚未啟用任何追蹤工具`
- Subtext: `啟用追蹤工具後，事件觸發統計將顯示於此。`
- CTA label: 無

**Loading State**
- 表格顯示 Skeleton 骨架屏（4 行，各欄寬度與實際欄位一致）

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 說明文字 | 14px 灰色；區塊標題下方 | 無互動 |
| 事件統計表格 | `<el-table>`；7 行固定（不可新增/刪除）；含灰色「未啟用」狀態 | 無互動（純顯示）|
| 最後更新時間 | 12px 灰色；表格右上角 | `資料更新至 YYYY/MM/DD HH:MM`；無互動 |

**排序欄位**（事件統計表格）
| 欄位 | 可排序 | 預設排序 |
|---|---|---|
| 事件名稱 | ❌ | — |
| 對應 GA4 事件 | ❌ | — |
| 對應 FB Pixel 事件 | ❌ | — |
| 近 7 天觸發次數 | ✅ | ✅ 預設降序（觸發次數最高在頂）|

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 所有工具未啟用 | 無任何追蹤工具啟用 | 空狀態提示（取代表格）|
| 部分工具啟用 | 有工具啟用 | 表格正常顯示；未啟用工具的欄位顯示「未啟用」|
| Loading | 初始載入 | 表格 Skeleton 骨架屏 |
| 統計載入失敗 | 統計 API 錯誤 | 觸發次數欄位全顯示「—」；右上角顯示「統計資料暫時無法載入」|
| 追蹤碼剛設定（無觸發）| 所有工具均為 0 次觸發 | 觸發次數欄位顯示 `0 次`（灰色）+ 提示小字「資料需等消費者訪問後才會出現」|

---

### Screen 7: 停用工具確認彈窗

**Purpose:** 當商家將已儲存的追蹤工具開關切回 OFF 並準備儲存時，確認商家了解停用後追蹤碼將從前台移除。
**Entry points:** 任一已啟用的工具卡片 → 開關切 OFF → 點「儲存此設定」
**Primary user goal:** 確認停用某追蹤工具，或取消操作保留設定

#### Information Hierarchy

```
H1 (most prominent): 確認停用 [工具名稱]？
H2 (secondary): 停用後的影響說明
Primary CTA: 確認停用（危險動作）
Secondary CTA: 取消
```

#### Actual Copy

**彈窗標題**（依工具動態替換）
- GA4: `確認停用 Google Analytics 4？`
- Meta Pixel: `確認停用 Meta Pixel？`
- FB Conversion API: `確認停用 Conversion API？`
- GTM: `確認停用 Google Tag Manager？`

**彈窗說明文字（共用）**
`關閉後，追蹤碼將從您的商店前台移除。歷史數據不受影響，日後隨時可重新啟用。`

**FB Pixel 特例說明文字**（FB Pixel 停用時附加）
`注意：停用 Meta Pixel 後，Conversion API 也將同步停用。`

**Button Labels**
- Danger（確認）: `確認停用`
- Secondary（取消）: `取消`

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Confirm Dialog | `<el-message-box confirm>`；寬 440px；居中 | Esc 鍵 = 取消；Enter 鍵 = 確認停用 |
| 確認停用按鈕 | Danger 樣式（紅色背景）；無圓角 | 點擊後執行停用 API → 卡片折疊 → Toast |
| 取消按鈕 | Secondary 樣式 | 點擊關閉彈窗；開關回到 ON；設定不變 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 開啟 | 已啟用工具的開關切 OFF 後點儲存 | 彈窗覆蓋當前頁面 |
| 確認中 | 點擊「確認停用」後等待 API | 按鈕 Loading |
| 關閉（確認）| API 成功 | 彈窗收起；卡片折疊；Tag 改「未啟用」；Toast |
| 關閉（取消）| 點擊「取消」或 Esc | 彈窗收起；開關回到 ON；設定不變 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「確認停用」| API 停用 → 卡片折疊 → 開關 OFF → Tag「未啟用」→ Toast「✅ [工具名稱] 已停用」|
| 點擊「取消」| 彈窗關閉；開關保持 ON；設定不變 |
| 按 Esc | 同「取消」|
| 停用 FB Pixel（已啟用 CAPI）| 彈窗顯示 FB Pixel 特例說明；確認後同步停用 CAPI；兩張卡片都回到未啟用 |

---

## Part 4 — Cross-Screen Component Inventory

### Action Components

| 元件 | 變體 | 尺寸 | 狀態 |
|---|---|---|---|
| Button | Primary / Secondary / Ghost / Text / Danger | Medium / Small | Default / Hover / Active / Disabled / Loading |
| Switch | 有標籤 / 無標籤 | Medium | Off / On / Disabled |

### Display Components

| 元件 | 變體 | 資料欄位 | 狀態 |
|---|---|---|---|
| 工具設定卡片 | 展開 / 折疊 / Disabled（灰化）| 標題 + 狀態 Tag + 開關 + 欄位 | Default / Expanded / Disabled / Error |
| 狀態 Tag | 已啟用（綠）/ 未啟用（灰）/ 設定中（藍）| 文字標籤 | — |
| 說明區塊（CAPI）| 淡灰背景 | 多行說明文字 | — |
| 重複載入警示 Alert | Warning（橘色）| 標題 + 說明文字 | Visible / Hidden（依條件）|
| 手動埋碼衝突警示 | Info（藍色）| 說明文字 | 常駐顯示 |

### Input Components

| 元件 | 變體 | 狀態 |
|---|---|---|
| Text Input | 一般 / 密碼型 / 帶 ❓ icon | Default / Focus / Error / Filled / Disabled |
| Select | 單選下拉（幣別）| Default / Open / Selected / Disabled |
| Switch（設定用）| 卡片內次要開關（如文章頁追蹤）| Off / On |

### Navigation Components

| 元件 | 變體 | 說明 |
|---|---|---|
| 麵包屑 | — | Header 頂部：全域設定 > 行銷追蹤碼管理 |

### Feedback Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Toast | Success / Error | 3 秒自動消失；右上角 |
| Alert Banner | Info（藍，常駐）/ Warning（橘，條件顯示）| 嵌入卡片內；Warning 不可關閉 |
| Confirm Dialog | Danger 確認型 | 停用工具確認；支援鍵盤操作 |
| Empty State | 事件統計無資料 | Headline + Subtext；無 CTA |
| Loading Skeleton | 表格版（事件統計）/ 卡片版 | 波紋動畫效果 |
| Tooltip | 說明型（❓ icon 觸發）| Hover 顯示；最大寬度 300px |

---

## Part 5 — Design System Token Reference

| Decision | Token / Value |
|---|---|
| Primary brand colour | `#303133`（深灰）|
| Secondary / Accent | `#409EFF`（藍）|
| Success colour | `#67C23A` |
| Warning colour | `#E6A23C` |
| Danger colour | `#F56C6C` |
| Text primary | `#303133` |
| Text secondary | `#606266` |
| Text placeholder | `#909399` |
| Border / Divider | `#DCDFE6` |
| Background（主）| `#F5F7FA` |
| Background（容器）| `#FFFFFF` |
| Background（說明區塊）| `#F5F7FA` |
| Background（Info Callout）| `#EBF5FF` |
| Base font | Noto Sans TC，14px Regular |
| H1（頁面標題）| 20px Bold |
| H2（卡片標題）| 16px Bold |
| Helper text | 12px Regular |
| Spacing unit | 8px grid |
| Border radius | 0（無圓角）|

---

## Assumptions

> 📌 假設：四個工具設定卡片採縱向排列（不採 2×2 Grid），因為各卡片展開後欄位高度不一致，縱向排列更易維持對齊感。

> 📌 假設：「儲存此設定」按鈕位於每張卡片底部（僅在卡片展開時顯示），而非頁面底部的全域儲存按鈕——這樣各工具設定互不干擾，符合 PRD 的「各卡片獨立儲存」要求。

> 📌 假設：FB Conversion API 卡片的 Disabled 樣式為整張卡片 `opacity: 0.5`（遵循 Element Plus 慣例），而非隱藏卡片——讓商家知道這個功能存在但有前提條件。

> 📌 假設：重複載入警示出現的時機為「GTM 開關切 ON 時即時出現」（不需等到儲存後才顯示），提早告知商家風險。

> 📌 假設：事件觸發統計中「加入心願清單（add_to_wishlist）」事件顯示，但在啟航方案中若心願清單功能未開啟，該行顯示「未啟用」。

> ✏️ Copy 待確認：停用工具確認彈窗中的「確認停用」按鈕是否使用 Danger 紅色樣式（視覺上是「破壞性操作」），或使用 Primary 深灰色（偏保守）。PRD 未明確指定，建議使用 Danger 紅色以符合「不可逆操作」的 UX 慣例。

---

## Part 6 — Claude Design Prompt Cheatsheet

**使用說明：**
1. 將這份文件上傳到 Claude Design
2. 找到你想先做的畫面，複製下方對應的 prompt
3. 貼入 Claude Design 對話框，開始生成
4. 在 Claude Design 中直接對話迭代細節

> 💡 建議：先套用 Evomni Design System（Element Plus，主色 `#303133`，無圓角）再開始，產出會自動符合品牌風格。

---

### Screen 1 — 行銷追蹤碼管理主頁（所有工具未啟用）

```
請幫我設計「行銷追蹤碼管理」後台設定頁面（全工具未啟用的初始狀態）。
這是桌機後台頁面（1280px 以上），使用 Element Plus，主色 #303133，無圓角，字體 Noto Sans TC。

頁面頂部：
- 頁面標題「行銷追蹤碼管理」（H1 20px Bold）
- 說明文字：「在此設定 GA4、Meta Pixel、GTM 等行銷追蹤工具。填入 ID 後系統將自動安裝追蹤碼，無需手動埋設程式碼。」
- 藍色 Info Callout（#EBF5FF 背景）：「⚠️ 若您先前已在網站 <head> 手動埋設過 GA4 或 FB 像素追蹤碼，請先移除，避免重複觸發導致數據失真。」

頁面主體：四張 el-card 縱向排列（每張卡片間距 16px）：
1. Google Analytics 4 — 標題左側有 GA4 logo icon；右側有「未啟用」灰色 Tag + 啟用開關（OFF 狀態）
2. Meta（Facebook）Pixel — 同上樣式
3. Meta Conversion API（FB 轉換 API）— 整卡灰化（opacity 0.5）；開關 Disabled；標題下顯示小字「需先啟用 Meta Pixel 才能使用 Conversion API」
4. Google Tag Manager — 同卡片 1/2 樣式

頁面底部：「近 7 天事件觸發統計」區塊，空狀態提示「尚未啟用任何追蹤工具」。

請參考上傳文件 Screen 1 的規格。
```

---

### Screen 2 — GA4 設定卡片（展開並填入 ID）

```
請幫我設計「行銷追蹤碼管理」頁面中「Google Analytics 4」設定卡片的展開已填入狀態。

卡片結構（el-card，展開狀態）：
- 標題列：GA4 logo + 「Google Analytics 4」標題（16px Bold）+ 「已啟用」綠色 Tag（#67C23A）+ 啟用開關（ON 狀態）
- 卡片主體（展開）：
  - Measurement ID 輸入欄：標籤「Measurement ID」；輸入框顯示「G-ABC123456」（已填入，可編輯）；右側有 ❓ 問號圖示
  - 追蹤文章頁 Toggle：標籤「追蹤文章頁」；開關 OFF；下方小字「適合有內容行銷策略的商家，開啟後可追蹤部落格文章的瀏覽數據」
- 卡片底部：「儲存此設定」按鈕（Primary，深灰底白字，無圓角）

請同時設計一個 Measurement ID 格式錯誤的狀態：輸入框紅色邊框，輸入框下方錯誤文字「請輸入正確的 GA4 Measurement ID 格式，應為 G- 開頭後接字母數字（例：G-ABC123456）」。

請參考上傳文件 Screen 2 的規格。
```

---

### Screen 3 — Meta Pixel 設定卡片（展開狀態）

```
請幫我設計「Meta（Facebook）Pixel」設定卡片的展開狀態。

卡片結構（el-card，展開）：
- 標題列：Meta logo icon（藍色 f）+ 「Meta（Facebook）Pixel」+ 「已啟用」綠色 Tag + 開關 ON
- 卡片主體：
  - Pixel ID 輸入欄：標籤「Pixel ID」；輸入框顯示「1234567890123456」；右側 ❓ icon
  - 幣別選擇器：標籤「幣別」；下拉已選「TWD — 新台幣」；右側 ❓ icon；下方 Helper text「將帶入所有含金額事件的 currency 參數，如 Purchase、ViewContent」
- 卡片底部：「儲存此設定」按鈕

請同時設計 Pixel ID 格式錯誤狀態：紅色邊框 + 錯誤文字「Pixel ID 應為 15–16 位的純數字，請確認後重新輸入」。

請參考上傳文件 Screen 3 的規格。
```

---

### Screen 4 — FB Conversion API 卡片（Disabled 版 + 啟用版）

```
請幫我設計「Meta Conversion API（FB 轉換 API）」卡片的兩個版本：

版本 A（Disabled，Meta Pixel 未啟用）：
整張 el-card 呈灰化狀態（opacity 0.5 或 filter: grayscale）；開關不可點擊；卡片標題「Meta Conversion API（FB 轉換 API）」下方顯示提示文字「需先啟用 Meta Pixel 才能使用 Conversion API」（灰色小字）。

版本 B（啟用後展開，已填入 Token）：
- 標題列：Meta CAPI icon + 標題 + 「已啟用」綠色 Tag + 開關 ON
- 卡片主體：
  - 說明區塊（淡灰背景 #F5F7FA，圓角 4px，padding 12px）：
    「💡 關於 Conversion API
    iOS 14 後 Safari 封鎖 Cookie，部分轉換事件無法透過瀏覽器像素捕捉。
    Conversion API 從 Server 端傳送事件，可補回遺失的轉換數據。
    系統會自動為每個事件加上相同的 event_id，Meta 將自動去除重複。
    您可在 Meta Events Manager 觀察「比對率」是否達到 70% 以上。」
  - Access Token 欄位：標籤「Access Token」；輸入框顯示「•••••••••••••••（已設定）」；右側有 ❓ icon
  - 「重新設定」Text Button（欄位右下方）
- 卡片底部：「儲存此設定」按鈕

請參考上傳文件 Screen 4 的規格。
```

---

### Screen 5 — GTM 設定卡片 + 重複載入警示

```
請幫我設計「Google Tag Manager」設定卡片的展開狀態，並包含重複載入警示。

這個版本同時啟用了 GTM 和 GA4，需要顯示衝突警示。

卡片結構（el-card，展開）：
- 標題列：GTM logo（藍色方塊）+ 「Google Tag Manager」+ 「已啟用」綠色 Tag + 開關 ON
- 卡片主體：
  - 橘色 Warning Alert（el-alert type="warning"，不可關閉）：
    「⚠️ 注意：您同時啟用了 GTM 與 GA4 / Meta Pixel。
    如果 GTM 容器內也安裝了相同工具，事件將重複觸發，導致數據失真。
    建議：擇一方式使用，避免同時透過本系統與 GTM 安裝相同追蹤碼。」
  - Container ID 輸入欄：標籤「Container ID」；輸入框顯示「GTM-ABC1234」；右側 ❓ icon
  - 說明小字（灰色，12px）：「啟用 GTM 後，您可以在 Google Tag Manager 後台自行安裝其他第三方工具（如 Hotjar、Microsoft Clarity 等），無需每次聯繫工程師。」
- 卡片底部：「儲存此設定」按鈕

請參考上傳文件 Screen 5 的規格。
```

---

### Screen 6 — 事件觸發統計表格

```
請幫我設計「行銷追蹤碼管理」頁面底部的「近 7 天事件觸發統計」區塊。

區塊結構：
- 標題「近 7 天事件觸發統計」（H2 16px Bold）
- 說明文字（灰色 14px）：「以下為系統記錄的事件觸發次數，供您確認追蹤碼設定是否生效。實際數據請以 GA4 / Meta Events Manager 後台為準，本統計每小時更新一次。」
- 右上角顯示「資料更新至 2026/05/13 10:00」灰色小字

表格（el-table，7 行固定，不可互動）：
欄位：事件名稱 / 對應 GA4 事件 / 對應 FB Pixel 事件 / 近 7 天觸發次數

資料（示意）：
| 產品頁瀏覽 | view_item | ViewContent | 1,234 次 |
| 加入購物車 | add_to_cart | AddToCart | 456 次 |
| 開始結帳 | begin_checkout | InitiateCheckout | 123 次 |
| 完成購買 | purchase | Purchase | 89 次 |
| 站內搜尋 | search | Search | 678 次 |
| 完成會員註冊 | sign_up | CompleteRegistration | 34 次 |
| 加入心願清單 | add_to_wishlist | AddToWishlist | 未啟用（灰色）|

「近 7 天觸發次數」欄位可點擊排序（降序圖示）。

請參考上傳文件 Screen 6 的規格。
```

---

### Screen 7 — 停用工具確認彈窗

```
請幫我設計停用追蹤工具的確認彈窗（el-message-box confirm）。

彈窗規格（寬 440px，居中）：
- 標題：「確認停用 Google Analytics 4？」（以 GA4 為例）
- 說明文字：「關閉後，追蹤碼將從您的商店前台移除。歷史數據不受影響，日後隨時可重新啟用。」
- 按鈕（右對齊）：
  - 「確認停用」（Danger 樣式，紅色背景白字，無圓角）
  - 「取消」（Secondary 樣式，白底灰框，無圓角）

請同時設計 Meta Pixel 停用的特例版本，說明文字追加：「注意：停用 Meta Pixel 後，Conversion API 也將同步停用。」

請參考上傳文件 Screen 7 的規格。
```

---

### 整頁完整版（可選）

```
請幫我設計「行銷追蹤碼管理」後台設定頁的完整視圖，展示部分工具已啟用、部分未啟用的混合狀態。

設計規格：桌機後台（1280px+）/ Element Plus / 主色 #303133 / 無圓角 / 字體 Noto Sans TC。

頁面結構由上到下：

1. 頁面標題「行銷追蹤碼管理」+ 說明文字 + 藍色 Callout 警示

2. 四張設定卡片縱向排列：
   - GA4 卡片：展開狀態，已填入 G-ABC123456，「已啟用」綠色 Tag，顯示追蹤文章頁 Toggle（OFF）
   - Meta Pixel 卡片：展開狀態，已填入 Pixel ID，「已啟用」綠色 Tag，幣別 TWD
   - FB Conversion API 卡片：折疊狀態（Pixel 已啟用所以卡片正常色），開關 OFF，「未啟用」灰色 Tag
   - GTM 卡片：折疊狀態，「未啟用」灰色 Tag，開關 OFF

3. 事件觸發統計表格（7 行），GA4 和 FB Pixel 欄位有數字，GTM 欄位顯示「未啟用」

請參考上傳文件的完整規格。
```
