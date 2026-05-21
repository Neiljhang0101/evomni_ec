# 第三方登入（LINE / Google / Facebook）— Design Brief + UX Spec

> **Version:** 1.0
> **Created:** 2026-05-14
> **PRD 來源：** `PRD/Evomni_第三方登入_PRD.md` v1.0（2026/04/28）
> **用途：** 上傳至 Claude Design，配合文件末尾的 Prompt Cheatsheet 使用

---

## ⚠️ Prototype 整併說明

本規格涉及兩個需整合至**現有 Prototype** 的區塊，設計時請以下列原則處理：

| 畫面 | 現有 Prototype | 整合方式 |
|---|---|---|
| 後台第三方登入憑證設定頁 | `html/金物流串接設定.html`（串接設定後台樣式基準） | 新增頁籤或子頁面，不另建獨立原型 |
| 會員中心帳號設定 > 社群帳號連結 | `html/會員管理後台.html`（已知「帳號設定」被明確列為 Out of Scope） | 新增社群帳號連結卡片至帳號設定頁，後續與會員管理後台 Spec 整併 |
| 前台登入/註冊頁 | 無現有 Prototype — **全新設計** | 獨立生成前台頁面 |
| Email 補全頁、帳號合併確認頁 | 無現有 Prototype — **全新設計** | 依本 Spec 獨立生成 |

---

## Part 1 — Design Brief

### Product Vision

第三方登入讓台灣消費者在 Evomni 電商平台上使用 LINE、Google 或 Facebook 帳號一鍵完成登入或註冊，跳過填寫帳號密碼的摩擦。對於習慣用 LINE 購物的台灣消費者而言，這是降低結帳放棄率的最直接手段。對商家而言，則能在後台設定 OAuth App 憑證、控制各平台的顯示順序與啟停狀態，每個商家擁有獨立的設定空間。

### Target User

**Primary（消費者）：** 台灣線上購物者，習慣使用 LINE 或 Google 帳號，不想記住另一組帳號密碼，希望在結帳時快速通過身份驗證。

**Secondary（商家管理員）：** 電商商家後台管理員，需要在後台填入 OAuth App 憑證並控制哪些社群登入方式對消費者開放。

### Design Goals

| # | Goal | How to test |
|---|---|---|
| 1 | 消費者從點擊「以 LINE 登入」到完成登入在 30 秒內完成（排除第三方授權頁停留時間） | 計時 5 位受測者的操作時間 |
| 2 | 消費者遇到帳號合併確認頁時，能在不看說明文字的情況下正確輸入密碼並完成綁定 | 觀察受測者是否無需引導即可完成 |
| 3 | 商家管理員能在 5 分鐘內完成 LINE 登入的完整設定（含填入憑證、複製 Callback URL、儲存）| 計時測試，記錄卡點 |
| 4 | 消費者能在帳號設定頁看懂哪些社群帳號已連結，並能在不看說明的情況下完成解除連結 | 觀察任務成功率 |

### Design Principles

1. **流程脈絡優先** — OAuth 授權完成後若需要補 Email 或帳號合併，必須提供引導中間頁保持操作上下文，不能直接跳頁或顯示空白狀態
2. **安全感可見** — 帳號合併時清楚說明正在發生什麼、為何需要密碼，讓使用者感到安全而非驚訝
3. **品牌規範遵守** — LINE 綠、Google 白底、Facebook 藍必須符合各平台 Brand Guidelines，不能統一為 Evomni 品牌色
4. **最後一種登入方式保護** — 永遠讓使用者保有至少一種能回來的方式

### Design System Reference

- **Figma Library：** Evomni Design System
- **Component framework：** Element Plus (Vue 3) + Evomni 自定義主題
- **Icon set：** Element Plus Icons；社群平台 Logo 使用官方 SVG
- **Font：** Noto Sans TC（400 / 500 / 600 / 700）

### Accessibility Requirements

- **Target WCAG level：** AA
- **Known constraints：**
  - 所有 Button 最小觸控高度 44px（消費者端 mobile-first）
  - 社群登入 Button 需符合 4.5:1 對比度（LINE 綠 `#06C755` 在白背景上需驗證）
  - 密碼輸入框需支援 show/hide 切換，不依賴顏色傳遞驗證狀態
  - 錯誤訊息需使用文字說明，不僅用紅框表示

### Hard Constraints

- ⚠️ 第三方平台 Button 不得修改為 Evomni 品牌色，必須使用各平台官方品牌色
- ⚠️ 後台停用的平台，前台不渲染對應 Button（非 Disabled 態，而是完全不顯示）
- ⚠️ Callback URL 欄位必須唯讀，不可讓使用者編輯
- ⚠️ access_token 不存入資料庫，設計上不需展示任何 Token 管理介面
- ⚠️ 帳號合併時不能讓使用者「建立第二個帳號」——此路徑引導回原始 Email 登入，不建立新帳號

### Out of Scope

- LINE LIFF（LINE App 內建瀏覽器）的特殊流程（待與前端評估 LIFF SDK 導入成本後決定）
- 商家管理員的後台第三方登入（商家後台沿用現有 Evomni 登入機制）
- Apple Sign In
- 訪客購物車合併邏輯（詳見 Part 4 行銷活動 PRD §8.5.2）
- 密碼重設流程（詳見 Part 6 會員管理）

---

## Part 2 — Screen Index

| # | Screen Name | Navigation path | Primary user goal |
|---|---|---|---|
| 1 | 前台登入/註冊頁 | 直接瀏覽 / 結帳時引導 / 點擊「會員登入」 | 使用社群帳號一鍵登入 |
| 2 | Email 補全頁 | OAuth 授權完成後，平台未提供 Email 時自動跳轉 | 補充 Email 完成帳號建立 |
| 3 | 帳號合併確認頁 | OAuth 授權完成後，Email 已存在時自動跳轉 | 確認並綁定現有帳號 |
| 4 | 會員中心帳號設定（社群帳號連結） | 消費者登入後 > 會員中心 > 帳號設定 | 管理已連結的社群帳號 |
| 5 | 後台第三方登入憑證設定頁 | 後台 > 全域設定 > 電商進階設定 > 第三方登入設定 | 設定 OAuth App 憑證並啟用各平台 |

> 📌 Screen 4 需整併至現有 `html/會員管理後台.html` 的帳號設定頁。Screen 5 需整併至現有串接設定後台樣式基準。

---

## Part 3 — Per-Screen UX Spec

---

### Screen 1：前台登入/註冊頁

**Purpose：** 消費者使用 Email 或社群帳號（LINE / Google / Facebook）登入或快速建立帳號。
**Entry points：** 直接進入 `/login`；結帳流程中被引導（帶 `?redirect_to=/checkout`）；點擊頁頭「會員登入」。
**Primary user goal：** 點擊第三方 Button 快速完成登入，不需填寫任何表單。

#### Information Hierarchy

```
H1（最顯眼）: 歡迎回來
Primary CTA: 登入（Email 登入主按鈕）
分隔線:      或
社群登入區:  以 LINE 登入 / 以 Google 登入 / 以 Facebook 登入
Supporting:  還沒有帳號？立即註冊 ／ 忘記密碼？
```

#### Actual Copy

**Page / Section Headings**
- 頁面標題：`歡迎回來`
- 分隔線文字：`或`

**Button Labels**
- Email 登入主按鈕：`登入`
- LINE：`以 LINE 登入`
- Google：`以 Google 登入`
- Facebook：`以 Facebook 登入`
- Loading 態（LINE）：`正在連接 LINE…`
- Loading 態（Google）：`正在連接 Google…`
- Loading 態（Facebook）：`正在連接 Facebook…`

**Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 電子信箱 | `請輸入您的電子信箱` | — | `請輸入有效的電子信箱格式` |
| 密碼 | `請輸入密碼` | — | `電子信箱或密碼不正確，請重試` |

**Button 樣式規格**

| 平台 | 背景色 | 文字色 | 邊框 | Logo |
|---|---|---|---|---|
| LINE | `#06C755` | `#FFFFFF` | 無 | LINE 官方 SVG（白色版） |
| Google | `#FFFFFF` | `#303133` | `1px solid #DCDFE6` | Google 官方 G Logo SVG |
| Facebook | `#1877F2` | `#FFFFFF` | 無 | Facebook 官方 f Logo SVG（白色版） |

- Button 寬度：100%（撐滿容器）
- Button 高度：44px
- Button 間距：8px
- 無 border-radius（`!rounded-none`）

**Empty State**
- 無（登入頁不存在 empty state）

**Error States**

| Error condition | Message shown to user |
|---|---|
| 授權被使用者取消 | `登入已取消，請重試或使用 Email 登入` |
| 第三方平台服務不可用 | `LINE 登入目前暫時無法使用，請使用 Email 登入或稍後再試`（依平台名稱替換） |
| CSRF state 驗證失敗 | `登入流程出現異常，請重試` |
| Email 帳號密碼錯誤 | `電子信箱或密碼不正確，請重試` |

**Loading State**
- 點擊社群 Button 後：Button 進入 Loading（Element Plus `:loading="true"`），文字改為「正在連接 {平台名稱}…」，防止重複點擊
- 整頁載入：Skeleton（無文字），模擬表單欄位形狀

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 授權取消 | `登入已取消，請重試或使用 Email 登入` |
| 平台服務不可用 | `{平台名稱} 登入目前暫時無法使用，請稍後再試` |
| 異常（state 不符） | `登入流程出現異常，請重新嘗試` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| Email 輸入框 | `<el-input type="email">` 必填 | 失焦後驗證格式 |
| 密碼輸入框 | `<el-input type="password" show-password>` 必填 | show-password 切換可見 |
| 登入主按鈕 | Element Plus Primary，100% 寬，40px 高 | Click 送出 Email 登入表單 |
| 分隔線 | flex row，細線 + 「或」文字，`text-gray-400` | 純視覺元件，無互動 |
| LINE 登入 Button | 背景 `#06C755`，44px 高，100% 寬，左側 Logo SVG 24px | Click → loading 態 → OAuth redirect |
| Google 登入 Button | 白底黑字，Border `#DCDFE6`，44px 高 | Click → loading 態 → OAuth redirect |
| Facebook 登入 Button | 背景 `#1877F2`，44px 高，100% 寬 | Click → loading 態 → OAuth redirect |
| 「忘記密碼？」連結 | `text` type，右側對齊 | Click → 開啟密碼重設頁 |
| 「立即註冊」連結 | `text` type，inline | Click → 導向註冊頁 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 正常進入登入頁 | 表單 + 分隔線 + 社群 Button 列 |
| 所有平台停用 | 後台關閉全部三個平台 | 「或」分隔線與社群 Button 區塊整個隱藏 |
| 部分平台停用 | 後台關閉特定平台 | 僅顯示啟用平台的 Button，不顯示未啟用的 |
| Loading（社群登入） | 點擊任一社群 Button 後 | 對應 Button 進入 loading 態，其他 Button 設為 disabled |
| 僅社群登入模式 | 後台設定「僅顯示社群帳號登入」 | Email 表單、「忘記密碼」、「立即註冊」隱藏，只顯示社群 Button |
| 錯誤（OAuth 回來） | 授權取消或平台服務異常 | Toast 提示，頁面恢復 Default 態 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「以 LINE 登入」 | Button 進入 loading → 302 redirect 至 LINE 授權頁 |
| 點擊「以 Google 登入」 | Button 進入 loading → 302 redirect 至 Google 授權頁 |
| 點擊「以 Facebook 登入」 | Button 進入 loading → 302 redirect 至 Facebook 授權頁 |
| OAuth 授權完成（新用戶） | 自動完成登入 → redirect 至 `redirect_to` 頁面（或會員中心） |
| OAuth 授權完成（無 Email） | 自動跳轉 Screen 2（Email 補全頁） |
| OAuth 授權完成（Email 已存在） | 自動跳轉 Screen 3（帳號合併確認頁） |
| OAuth 授權被取消 | 返回本頁，Toast 提示 |

---

### Screen 2：Email 補全頁

**Purpose：** 當 Facebook 或 LINE 授權未提供 Email 時，引導消費者手動輸入 Email 並完成驗證。
**Entry points：** OAuth 授權完成後由系統自動跳轉（不可手動導航至此頁）。
**Primary user goal：** 輸入 Email 並等待驗證，完成帳號建立。

#### Information Hierarchy

```
H1（最顯眼）: 您好，{顯示名稱}！
H2（說明）:   為了完成帳號建立，請提供您的 Email 地址
Primary CTA:  發送驗證信
Supporting:   [平台 Logo 已連接] ／ 隱私說明文字
```

#### Actual Copy

**Page / Section Headings**
- 平台狀態標籤：`已連接 LINE`（依平台替換）
- 頁面歡迎語：`您好，{顯示名稱}！`
- 說明文字：`為了完成帳號建立，請提供您的 Email 地址。`
- 隱私說明：`您的 Email 僅用於訂單通知，不會分享給第三方。`

**Button Labels**
- Primary：`發送驗證信`
- Loading 態：`發送中…`
- 驗證信等待頁 - 重新發送（倒數中）：`重新發送（{N} 秒後可重送）`
- 驗證信等待頁 - 可重送：`重新發送驗證信`

**Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 電子信箱 | `請輸入您的 Email 地址` | — | `請輸入有效的電子信箱格式` |

**驗證信等待頁 Copy**
- 主要說明：`驗證信已發送至 {email}`
- 次要說明：`請前往您的信箱點擊驗證連結，完成帳號建立。`
- 重新發送說明：`沒有收到？請確認垃圾郵件資料夾，或`

**Error States**

| Error condition | Message shown to user |
|---|---|
| Email 格式不正確 | `請輸入有效的電子信箱格式` |
| Email 已存在於系統 | （不顯示錯誤，直接進入帳號合併確認流程，參見 Screen 3） |
| 同一 IP 嘗試過多 Email | `請求次數過多，請稍後再試` |
| 驗證連結已過期（30 分鐘） | `驗證連結已過期，請重新發起登入` |
| OAuth Session 過期（10 分鐘未完成） | `登入流程已逾時，請重新登入` |
| 發送驗證信失敗 | `驗證信發送失敗，請稍後再試` |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 重新發送成功 | `驗證信已重新發送至 {email}` |

**Button Labels**（錯誤恢復）
- 驗證連結逾時 CTA：`重新登入`

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 平台已連接標籤 | 平台 Logo（24px）+ `已連接 {平台名稱}`，`text-green-600` / 平台色 | 純視覺，無互動 |
| Email 輸入框 | `<el-input type="email">` 必填，即時格式驗證 | 失焦後驗證；格式錯誤顯示紅色錯誤文字 |
| 發送驗證信 Button | Element Plus Primary，100% 寬，44px 高 | Click → loading 態 → 成功後切換為等待頁 |
| 隱私說明文字 | 小字，居中，`text-gray-400` | 純視覺 |
| 驗證信等待頁 | 替換整個表單區域，顯示倒數計時器 | 60 秒倒數；倒數結束後「重新發送」Button 啟用 |
| 重新發送 Button | Secondary，初始 Disabled（倒數中）| 倒數結束後啟用，Click 重送驗證信 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Input 態 | 進入頁面 | 歡迎語 + Email 輸入框 + 發送按鈕 |
| Loading（發送中） | 點擊「發送驗證信」後 | Button loading 態，防止重複點擊 |
| 等待驗證（Sent） | 發送成功後 | 替換為等待頁，顯示 email 地址 + 倒數計時 |
| 可重新發送 | 倒數 60 秒結束後 | 「重新發送驗證信」Button 啟用 |
| 驗證連結過期 | 點擊超過 30 分鐘的驗證連結 | 顯示逾時說明 + 「重新登入」Button |
| Session 過期 | 10 分鐘未完成 Email 補全 | 顯示「登入流程已逾時，請重新登入」+ Button |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「發送驗證信」 | Button loading → 發送驗證信 → 成功後頁面切換為等待頁 |
| 點擊「重新發送驗證信」 | 重送驗證信，Toast 提示，倒數重置為 60 秒 |
| 使用者點擊信中驗證連結 | 若 Email 不存在系統 → 自動建立帳號 → 登入 → redirect；若 Email 已存在 → Screen 3 |
| 點擊「重新登入」（逾時後） | 返回 Screen 1（登入頁） |

---

### Screen 3：帳號合併確認頁

**Purpose：** 當第三方登入的 Email 已對應現有會員帳號時，引導消費者輸入密碼完成帳號綁定。
**Entry points：** OAuth 授權完成後自動跳轉（Email 已存在情境）；Screen 2 Email 驗證完成後（Email 已存在情境）。
**Primary user goal：** 輸入原帳號密碼確認身份，完成社群帳號與現有帳號的綁定。

#### Information Hierarchy

```
H1（最顯眼）: 🔗 找到現有帳號
H2（說明）:   您的 {平台名稱} 帳號的 Email（{部分遮蔽 email}）在我們系統中已有一個帳號
Primary CTA:  確認綁定
Secondary CTA: 取消，不綁定
Supporting:   忘記密碼？發送密碼重設信
```

#### Actual Copy

**Page / Section Headings**
- 頁面標題：`🔗 找到現有帳號`
- 說明段落：`您的 {平台名稱} 帳號的 Email（{te***@gmail.com}）在我們系統中已有一個帳號。`
- 說明續文：`連結後，您可以用 {平台名稱} 或 Email / 密碼兩種方式登入。`

**Button Labels**
- Primary：`確認綁定`
- Loading 態：`驗證中…`
- Secondary：`取消，不綁定`
- 找回密碼連結文字：`不記得密碼？發送密碼重設信`

**Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| 現有帳號密碼 | `請輸入您帳號的密碼` | — | `密碼不正確，您還有 {N} 次嘗試機會` |

**Error States**

| Error condition | Message shown to user |
|---|---|
| 密碼不正確（剩餘嘗試 > 0） | `密碼不正確，您還有 {N} 次嘗試機會` |
| 5 次失敗後帳號鎖定 | `帳號已暫時鎖定 30 分鐘，請稍後再試或使用密碼重設功能` |
| 密碼重設信發送成功 | Toast：`密碼重設信已發送，請查收 Email 後回來繼續操作` |

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 綁定成功 | `{平台名稱} 帳號已成功綁定！` |
| 發送密碼重設信成功 | `密碼重設信已發送，請查收 Email 後回來繼續操作` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 帳號顯示區 | 顯示部分遮蔽的 Email（如 `te***@gmail.com`），`text-gray-500`，不可點擊 | 純視覺，保護帳號隱私 |
| 密碼輸入框 | `<el-input type="password" show-password>` 必填 | show-password 切換；5 次失敗後整個欄位 disabled |
| 確認綁定 Button | Element Plus Primary，100% 寬，44px 高；鎖定時 disabled | Click → loading 態 → 驗證密碼 |
| 取消按鈕 | Element Plus Secondary / Plain | Click → 返回 Screen 1，不綁定任何帳號 |
| 發送密碼重設信連結 | `<el-link>` 小字，居中 | Click → 發送重設信至對應 Email → Toast |
| 錯誤提示文字 | 紅色，不自動消失，顯示剩餘嘗試次數 | 密碼錯誤後渲染 |
| 鎖定狀態提示 | Alert 元件，Warning 樣式 | 5 次失敗後取代錯誤提示文字 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default | 進入帳號合併確認頁 | 說明文字 + 密碼輸入框 + 雙 Button |
| Loading（驗證中） | 點擊「確認綁定」後 | Button loading 態 |
| 密碼錯誤（可重試） | 密碼驗證失敗（< 5 次） | 紅色錯誤提示，顯示剩餘次數 |
| 帳號鎖定 | 5 次密碼錯誤 | 密碼欄位 disabled，確認按鈕 disabled，Warning Alert 說明 |
| 綁定成功 | 密碼驗證通過 | Toast 成功，redirect 至 `redirect_to` 頁面 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「確認綁定」 | loading → 驗證密碼 → 成功：Toast + redirect；失敗：顯示錯誤提示 |
| 點擊「取消，不綁定」 | 返回 Screen 1，OAuth 臨時 Session 清除 |
| 點擊「發送密碼重設信」 | 發送重設信 → Toast；頁面保持，等使用者收信後回來 |

---

### Screen 4：會員中心帳號設定（社群帳號連結）

**Purpose：** 消費者自行管理已連結的社群帳號，可新增連結或解除連結。

> **⚠️ Prototype 整併說明：** 此畫面為 `html/會員管理後台.html` 帳號設定頁的**新增卡片**。目前該 Spec 將「前台會員註冊/登入流程（Prototype #9 第三方登入）」列為 Out of Scope，後續設計時請在帳號設定頁的「社群帳號連結」卡片位置整合本規格，並同步更新 `SPEC/Evomni_會員管理後台-UX-Spec.md`。

**Entry points：** 消費者登入後 > 會員中心 > 帳號設定（會員管理後台的帳號設定頁 Tab / Section）
**Primary user goal：** 查看並管理已連結的社群帳號（新增綁定 / 解除連結）。

#### Information Hierarchy

```
H2（區塊標題）: 社群帳號連結
主要內容:       各平台連結狀態列（LINE / Google / Facebook）
Action:        [連結帳號] / [解除連結]
```

#### Actual Copy

**Section Headings**
- 卡片標題：`社群帳號連結`

**各平台狀態文字**

| 平台 | 已連結顯示 | 未連結顯示 |
|---|---|---|
| LINE | `已連結（{LINE 顯示名稱}）` | `尚未連結` |
| Google | `已連結（{Google 顯示名稱}）` | `尚未連結` |
| Facebook | `已連結（{Facebook 顯示名稱}）` | `尚未連結` |

**Button Labels**
- 未連結 → 連結：`連結帳號`
- 已連結 → 解除：`解除連結`
- Loading（連結中）：`連結中…`
- Loading（解除中）：`解除中…`

**解除連結確認對話框 Copy**
- 標題：`確定要解除 {平台名稱} 帳號的連結嗎？`
- 說明：`解除後，您將無法再使用此 {平台名稱} 帳號登入。請確認您有其他登入方式（Email / 密碼 或 其他社群帳號）可以繼續使用帳號。`
- 取消：`取消`
- 確認：`確定解除連結`

**最後一種登入方式 - Tooltip 文字**
- Tooltip：`無法解除連結，因為您目前沒有設定帳號密碼。請先設定密碼後再解除連結。`

**設定密碼引導區塊（純社群帳號用戶）**
- 說明文字：`您的帳號目前沒有密碼。建議您設定密碼，以便在社群帳號無法使用時仍可登入。`
- CTA：`設定帳號密碼`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 連結成功 | `{平台名稱} 帳號已成功連結！` |
| 解除連結成功 | `{平台名稱} 帳號連結已解除` |

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 社群帳號連結卡片 | `<el-card>` 包覆整個區塊 | 容器元件 |
| 平台列（已連結） | 平台 Logo 24px + 平台名 + 「已連結（{名稱}）」 + `解除連結` Button | 水平 flex 佈局 |
| 平台列（未連結） | 平台 Logo 24px + 平台名 + 「尚未連結」灰字 + `連結帳號` Button | 水平 flex 佈局 |
| 「連結帳號」Button | `el-button plain`，次要操作；後台停用平台時隱藏 | Click → OAuth 授權流程 |
| 「解除連結」Button | `el-button type="text"` 危險色 `#F56C6C`；最後一種方式時 disabled | Click → 解除連結確認 Dialog |
| 解除連結確認 Dialog | `<el-dialog>` 確認型，標題 + 說明 + 雙 Button | 確認後解除；取消後關閉 |
| Tooltip（disabled 狀態） | `<el-tooltip>` 附著在 disabled「解除連結」Button | Hover 顯示說明文字 |
| 設定密碼引導區塊 | Alert Info 樣式，內含 CTA Button | 僅純社群帳號用戶顯示 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| 混合狀態（部分連結） | 有部分平台連結、部分未連結 | 各平台列分別顯示已連結 / 尚未連結 |
| 全部未連結 | 所有平台都未連結 | 三列都顯示「尚未連結」+ 「連結帳號」Button |
| 全部已連結 | 所有平台都已連結 | 三列都顯示「已連結（{名稱}）」+ 「解除連結」Button |
| 最後一種登入保護 | 只剩一種社群連結且無密碼 | 該平台「解除連結」Button disabled + Tooltip |
| 純社群帳號用戶 | 帳號無密碼 | 顯示「設定帳號密碼」引導區塊 |
| Dialog 開啟 | 點擊「解除連結」 | 解除確認 Dialog 覆蓋，背景模糊 |
| Loading（操作中） | 點擊連結 / 解除連結後 | 對應 Button loading，其他 Button disabled |

#### Interaction Annotations

| User action | Result |
|---|---|
| 點擊「連結帳號」 | Button loading → OAuth 授權流程（走完後回到本頁，Toast 成功） |
| 點擊「解除連結」（可解除） | 開啟解除確認 Dialog |
| Dialog 點擊「確定解除連結」 | Dialog 關閉 → loading → 解除成功 → Toast → 頁面更新 |
| Dialog 點擊「取消」 | Dialog 關閉，頁面無變化 |
| Hover disabled「解除連結」 | 顯示 Tooltip 說明原因 |
| 點擊「設定帳號密碼」 | 導向帳號設定的密碼設定區塊（同頁面捲動或 Tab 切換） |

---

### Screen 5：後台第三方登入憑證設定頁

**Purpose：** 商家管理員設定各平台 OAuth App 憑證、啟停各平台，並調整前台登入頁的顯示設定。

> **⚠️ Prototype 整併說明：** 此頁面應整合至現有後台的「全域設定 > 電商進階設定」層級下，樣式與 `html/金物流串接設定.html` 保持一致（相同的卡片佈局、麵包屑樣式、Element Plus 主題）。後續在現有串接設定後台 Prototype 中，新增「第三方登入設定」子頁面。

**Entry points：** 後台 > 左側選單 > 全域設定 > 電商進階設定 > 第三方登入設定
**Primary user goal：** 填入 LINE / Google / Facebook 的 OAuth App 憑證並啟用，讓消費者可以使用第三方登入。

#### Information Hierarchy

```
H1（麵包屑）: 全域設定 > 電商進階設定 > 第三方登入設定
H2（頁面說明）: 頁面說明文字
各平台卡片:    LINE Login（卡片一）/ Google Login（卡片二）/ Facebook Login（卡片三）
底部設定:      前台登入頁設定（Button 順序 + 登入模式）
```

#### Actual Copy

**Page / Section Headings**
- 麵包屑：`全域設定 > 電商進階設定 > 第三方登入設定`
- 頁面說明：`設定第三方登入後，消費者可在您的商店使用社群帳號快速登入。各平台的 App 憑證需在對應的開發者平台申請。`

**LINE Login 卡片**
- 卡片標題：`LINE Login`
- 申請說明：`前往 LINE 開發者後台申請 LINE Login Channel 並取得以下憑證：`
- 外部連結文字：`前往 LINE Developers Console ↗`
- Channel ID label：`Channel ID`
- Channel Secret label：`Channel Secret`
- Callback URL label：`Callback URL`
- Callback URL 說明：`唯讀，請在 LINE Developers Console 填入此 URL`
- Channel ID tooltip：`LINE Login Channel ID，可在 LINE Developers Console > LINE Login 頻道設定中取得`
- Channel Secret tooltip：`點擊右側眼睛 icon 顯示；請妥善保管，不要分享給他人`
- 啟用 Toggle label：`啟用 / 停用`

**Google Login 卡片**
- 卡片標題：`Google Login`
- 申請說明：`前往 Google Cloud Console 建立 OAuth 2.0 用戶端 ID：`
- 外部連結文字：`前往 Google Cloud Console ↗`
- Client ID label：`用戶端 ID`
- Client Secret label：`用戶端密碼`
- Callback URL label：`授權重新導向 URI`
- Callback URL 說明：`唯讀，請在 Google Cloud Console 填入此 URI`

**Facebook Login 卡片**
- 卡片標題：`Facebook Login`
- 申請說明：`前往 Meta 開發者平台建立應用程式並取得以下憑證：`
- 外部連結文字：`前往 Meta Developers ↗`
- App ID label：`應用程式 ID`
- App Secret label：`應用程式密鑰`
- Callback URL label：`有效的 OAuth 重新導向 URI`
- Callback URL 說明：`唯讀，請在 Meta Developers 應用程式設定中填入此 URI`

**Form Fields**

| Field label | Placeholder text | Helper text | Error text |
|---|---|---|---|
| Channel ID | `請輸入 Channel ID` | — | — |
| Channel Secret | `請輸入 Channel Secret` | — | — |
| 用戶端 ID | `請輸入 Client ID` | — | — |
| 用戶端密碼 | `請輸入 Client Secret` | — | — |
| 應用程式 ID | `請輸入 App ID` | — | — |
| 應用程式密鑰 | `請輸入 App Secret` | — | — |

**Button Labels**
- 各卡片測試連線：`測試連線`
- 各卡片儲存：`儲存`
- Callback URL 複製：`複製`

**前台登入頁設定區塊**
- 區塊標題：`前台登入頁設定`
- Button 排序 label：`Button 顯示順序`
- 排序說明：`（拖曳調整順序，僅已啟用的平台會顯示）`
- 登入模式 Radio 選項 1：`同時顯示 Email 登入和社群帳號登入（預設）`
- 登入模式 Radio 選項 2：`僅顯示社群帳號登入（關閉 Email / 密碼登入）`
- 僅社群登入警告：`關閉 Email 登入後，若消費者沒有 LINE / Google / Facebook 帳號將無法登入。請確認此設定符合您的客群需求。`
- 儲存 Button：`儲存顯示設定`

**Toast / Notification Messages**

| Trigger | Message |
|---|---|
| 儲存憑證成功 | `設定已儲存` |
| 複製 Callback URL | `已複製` |
| 測試連線成功 | `連線測試成功，憑證有效` |
| 測試連線失敗 | `連線失敗：{錯誤訊息}，請檢查憑證是否正確` |
| 啟用但憑證未填 | `LINE 已啟用但憑證未填寫，前台將無法使用此登入方式，請確認後儲存`（依平台替換） |

**Info 提示文字**
- Callback URL 未在開發者平台設定警告：`請確認您已在 {平台名稱} 開發者後台將此 Callback URL 加入允許清單，否則登入流程會失敗`

#### Component List

| 元件名稱 | 規格 / 變體 | 互動行為 |
|---|---|---|
| 麵包屑 | `<el-breadcrumb>` 三層 | 點擊可返回上層 |
| 頁面說明文字 | 一般段落文字，`text-gray-600` | 純視覺 |
| 平台卡片（× 3） | `<el-card>` 各平台獨立卡片 | 包覆各平台設定 |
| 啟用 Toggle | `<el-switch>` 卡片右上角，標籤「啟用 / 停用」 | 切換後卡片主體 `opacity: 0.6`（停用）/ 恢復（啟用） |
| 外部連結 | `<el-link target="_blank">` 帶 ↗ icon | 開新分頁 |
| Channel ID 輸入框 | `<el-input>` 輸入後 auto-trim 空白字元 | — |
| Channel Secret 輸入框 | `<el-input type="password" show-password>` | 顯示 / 隱藏切換 |
| Callback URL 輸入框 | `<el-input disabled>` 唯讀 | 不可編輯 |
| 複製 Button | `<el-button>` 文字型，附在 Callback URL 右側 | Click → Clipboard API → Toast「已複製」|
| ℹ Tooltip | `<el-tooltip>` 附著在欄位 label 右側 | Hover 顯示說明文字 |
| 測試連線 Button | Secondary Button | Click → 模擬 Token 交換 → Toast 成功 / 失敗 |
| 儲存 Button | Primary Button，各卡片各有一個 | Click → 儲存該平台設定 |
| 拖曳排序列表 | Sortable 拖曳元件，顯示 LINE / Google / Facebook 順序 | 拖曳改變順序 |
| 登入模式 Radio Group | `<el-radio-group>`，兩個選項 | 選擇「僅社群」時顯示警告 |
| 警告 Alert | `<el-alert type="warning">` 選擇「僅社群」後出現 | 提醒商家確認 |
| 儲存顯示設定 Button | Primary Button | 儲存前台顯示設定 |

#### Screen States

| 狀態 | 觸發條件 | 呈現方式 |
|---|---|---|
| Default（未設定） | 首次進入，憑證欄位空白 | 所有 Toggle 關閉，欄位空白 |
| 啟用但未填憑證 | Toggle 開啟但欄位空白 | Toggle 亮起，欄位顯示 Placeholder |
| 已填憑證且啟用 | 憑證填寫完成且 Toggle 開啟 | 正常狀態，Secret 欄位隱藏 |
| 停用態（特定平台） | Toggle 關閉 | 卡片主體 `opacity: 0.6`，但仍可填寫 |
| Testing（測試中） | 點擊「測試連線」 | Button loading 態 |
| 測試成功 | API 回應成功 | Toast 綠色「連線測試成功，憑證有效」 |
| 測試失敗 | API 回應失敗 | Toast 紅色「連線失敗：{錯誤訊息}」 |
| 儲存 Warning | 啟用但憑證未填 | Toast 橘色警告（允許儲存但警示） |
| 僅社群登入模式 | Radio 切換 | 警告 Alert 出現 |

#### Interaction Annotations

| User action | Result |
|---|---|
| 開啟 Toggle | 卡片恢復 opacity 100%，提示填寫憑證 |
| 關閉 Toggle | 卡片 opacity 0.6，前台隱藏該平台 Button |
| 點擊「複製」（Callback URL） | 複製至剪貼簿，Toast「已複製」 |
| 點擊「測試連線」 | loading → 模擬 Token 交換 → Toast 成功 / 失敗 |
| 點擊「儲存」（各平台） | 儲存該平台設定，憑證加密後寫入 DB，Toast 成功 |
| 拖曳 Button 順序列表 | 即時預覽順序；點「儲存顯示設定」後生效 |
| 選擇「僅社群帳號登入」 | 警告 Alert 出現，提醒商家確認 |
| 點擊「儲存顯示設定」 | 儲存前台顯示偏好，Toast 成功 |

---

## Part 4 — Cross-Screen Component Inventory

### Action Components

| 元件 | 變體 | 尺寸 | 狀態 |
|---|---|---|---|
| 社群登入 Button（LINE） | 純色品牌色背景 | 100% 寬 × 44px | Default / Loading / Disabled |
| 社群登入 Button（Google） | 白底 + 邊框 | 100% 寬 × 44px | Default / Loading / Disabled |
| 社群登入 Button（Facebook） | 純色品牌色背景 | 100% 寬 × 44px | Default / Loading / Disabled |
| Primary Button | Solid | Large（44px）/ Medium（40px） | Default / Loading / Disabled |
| Secondary Button | Plain / Outline | Large / Medium | Default / Loading / Disabled |
| Text Button | 危險色（`#F56C6C`） | 自動 | Default / Disabled |
| 複製 Button | Text + icon | Small | Default / Clicked（Toast） |

### Display Components

| 元件 | 變體 | 資料欄位 | 狀態 |
|---|---|---|---|
| 平台卡片 | LINE / Google / Facebook | 標題 + Toggle + 憑證欄位 + 按鈕 | 啟用 / 停用（opacity 0.6） |
| 平台狀態列 | 已連結 / 未連結 | Logo + 名稱 + 狀態文字 + Button | 已連結 / 未連結 / Loading |
| 帳號顯示（部分遮蔽） | — | 部分遮蔽 Email（如 `te***@gmail.com`） | 純視覺 |
| 設定密碼引導區塊 | Info Alert 樣式 | 說明文字 + CTA | 僅純社群帳號顯示 |

### Input Components

| 元件 | 變體 | 狀態 |
|---|---|---|
| Email 輸入框 | 標準 / 錯誤態 | Default / Focus / Filled / Error |
| 密碼輸入框 | show-password 切換 | Default / Focus / Filled / Error / Disabled（鎖定後）|
| 唯讀 URL 輸入框 | disabled 樣式 | Disabled（固定）|
| 憑證輸入框 | 一般文字 / password show-password | Default / Focus / Filled |
| 拖曳排序列表 | Sortable | Default / Dragging |
| Radio Group | 兩個選項 | Default / Selected |
| Switch（Toggle） | 啟用 / 停用 | On / Off |

### Feedback Components

| 元件 | 變體 | 說明 |
|---|---|---|
| Toast | Success（綠）/ Error（紅）/ Warning（橘）/ Info（藍） | 3 秒自動消失 |
| Alert | Warning | 僅社群登入模式警告 / Callback URL 未設定提醒 |
| Tooltip | 標準 | ℹ icon hover 顯示欄位說明 |
| 確認 Dialog | 危險操作確認型 | 解除社群帳號連結確認 |
| Divider（分隔線） | 含文字「或」 | 登入頁 Email 與社群 Button 之間 |
| 倒數計時器 | 數字倒數 | Email 驗證等待頁，60 秒 |
| Loading Skeleton | 表單型 | 登入頁初始載入 |

---

## Part 5 — Design System Token Reference

| Decision | Token / Value |
|---|---|
| Primary brand colour | `#409EFF`（Element Plus Primary Blue）|
| Success colour | `#67C23A` |
| Danger colour | `#F56C6C` |
| Warning colour | `#E6A23C` |
| 基礎文字色 | `#303133` |
| 次要文字色 | `#606266` |
| 說明文字色 | `#909399` |
| 邊框色 | `#DCDFE6` |
| LINE 品牌色 | `#06C755` |
| Google 按鈕邊框 | `#DCDFE6`（與 Evomni 邊框色一致） |
| Facebook 品牌色 | `#1877F2` |
| 危險操作色 | `#F56C6C` |
| Base font | Noto Sans TC（400 / 500 / 600 / 700）|
| Border radius | 0（`!rounded-none`，Evomni 統一無圓角）|
| Button 高度（消費者端） | 44px（比 Element Plus 預設高 4px，符合手機觸控靶）|
| Button 高度（後台） | 40px（Element Plus 預設）|
| 社群 Button 間距 | 8px |

---

## Assumptions

> 📌 假設：LINE LIFF（LINE App 內建瀏覽器）場景暫不涵蓋。PRD 待確認事項指出需與前端評估 LIFF SDK 導入成本，確認後可能需新增 Screen 6（LIFF 特殊流程）。

> 📌 假設：前台登入頁為手機優先（mobile-first）設計，桌面版為 responsive 縮放，非獨立桌面設計。

> 📌 假設：後台設定頁（Screen 5）為純桌面版，使用 `html/金物流串接設定.html` 的頁面佈局（Sidebar + 主內容區）。

> 📌 假設：消費者端「帳號設定」頁的社群帳號連結卡片（Screen 4）放置在現有「帳號設定」Tab 中的下方，緊接在密碼設定區塊之後。

> 📌 假設：前台登入/註冊為同一頁面（使用 Tab 切換或同一表單），不另設獨立的「僅登入」頁。實際頁面結構以開發端決定為準。

> ✏️ Copy 待確認：「以 LINE 登入」等 Button 文字是否需要中英文並排（如「以 LINE 登入 / Log in with LINE」）？建議以繁中為主，除非有多語系需求。

> ✏️ Copy 待確認：帳號合併確認頁的「不綁定」路徑說明文字。PRD 中指出使用者點「取消」後返回登入頁，但若使用者困惑於「那我的 LINE 帳號怎麼辦」，是否需要更明確的說明？

---

## Part 6 — Claude Design Prompt Cheatsheet

**使用說明：**
1. 將這份文件上傳到 Claude Design
2. 找到你想先做的畫面，複製下方對應的 prompt
3. 貼入 Claude Design 對話框，開始生成
4. 在 Claude Design 中直接對話迭代細節

> 💡 建議：先完成 Evomni Design System onboarding（上傳 codebase 或設計檔），再使用這些 prompts，產出結果會自動套用 Evomni 的無圓角按鈕、Noto Sans TC 字型與 Element Plus 主題。

---

### Screen 1 — 前台登入/註冊頁

```
請幫我設計「前台消費者登入頁」的 UI。這是一個手機優先（mobile-first）的前台頁面，
採用置中卡片佈局，寬度約 400px。

頁面結構從上到下：頁面標題「歡迎回來」→ Email 輸入框 → 密碼輸入框（含忘記密碼連結）
→ 主要「登入」Button → 「還沒有帳號？立即註冊」文字 → 分隔線（細線 + 「或」文字）
→ 社群登入 Button 區（三個按鈕垂直排列，間距 8px）。

三個社群 Button 都是 100% 寬、44px 高、無 border-radius：
- LINE Button：背景 #06C755，白色文字，左側 LINE 官方 Logo SVG
- Google Button：白底黑字，邊框 #DCDFE6，左側 Google G Logo
- Facebook Button：背景 #1877F2，白色文字，左側 Facebook f Logo

請同時生成一個「Loading 態」的變體，顯示其中一個 Button 進入 loading 狀態的樣子。
請參考上傳文件中 Screen 1 的規格。
```

---

### Screen 2 — Email 補全頁

```
請幫我設計「Email 補全頁」的 UI。這是消費者使用 LINE 或 Facebook 登入後，
平台未提供 Email 時顯示的中間引導頁，手機優先、置中卡片佈局。

頁面內容：上方顯示平台 Logo（如 LINE logo）+ 「已連接 LINE」狀態標籤（綠色）
→ 大標題「您好，{顯示名稱}！」→ 說明文字「為了完成帳號建立，請提供您的 Email 地址。」
→ Email 輸入框（Placeholder：請輸入您的 Email 地址）→ 主要 Button「發送驗證信」
→ 底部隱私說明小字「您的 Email 僅用於訂單通知，不會分享給第三方。」

另請生成「驗證信等待頁」的變體：表單替換為「驗證信已發送至 {email}」說明文字
+ 「重新發送（{N} 秒後可重送）」Disabled Button。
請參考上傳文件中 Screen 2 的規格。
```

---

### Screen 3 — 帳號合併確認頁

```
請幫我設計「帳號合併確認頁」的 UI。這是消費者第三方登入後，
Email 已存在現有帳號時顯示的安全確認頁，手機優先、置中卡片佈局。

頁面內容：標題列含鏈結圖示「🔗 找到現有帳號」→ 說明文字顯示部分遮蔽的 Email
（如 te***@gmail.com）並說明系統找到現有帳號 → 告知連結後可以使用兩種方式登入
→ 密碼輸入框（Placeholder：請輸入您帳號的密碼）→ 兩個 Button 水平排列：
主要「確認綁定」+ 次要「取消，不綁定」→ 底部文字連結「不記得密碼？發送密碼重設信」

另請生成「密碼錯誤態」的變體：密碼欄位顯示紅色錯誤文字「密碼不正確，您還有 3 次嘗試機會」。
請參考上傳文件中 Screen 3 的規格。
```

---

### Screen 4 — 會員中心帳號設定（社群帳號連結）

```
請幫我設計「會員中心帳號設定 - 社群帳號連結」卡片 UI，整合至現有的帳號設定頁面中。
這是消費者前台頁面（桌面 responsive），卡片型佈局，使用 Element Plus 元件庫。

社群帳號連結卡片內容：標題「社群帳號連結」→ 三列，每列水平排列：
平台 Logo（24px）+ 平台名稱 + 連結狀態文字 + 操作 Button。

三個狀態要設計：
- 已連結：顯示「已連結（{顯示名稱}）」+ 「解除連結」紅色文字 Button
- 未連結：顯示「尚未連結」灰色文字 + 「連結帳號」次要 Button
- 最後一種登入（disabled）：「解除連結」Button 呈灰色 disabled

另請在卡片下方加入「設定帳號密碼」引導區塊（Info Alert 樣式），
說明純社群帳號用戶建議設定密碼。
請參考上傳文件中 Screen 4 的規格。
```

---

### Screen 5 — 後台第三方登入憑證設定頁

```
請幫我設計「後台第三方登入憑證設定頁」的 UI。這是商家後台管理頁面（桌面），
採用 Sidebar + 主內容區佈局，Element Plus 元件庫，無 border-radius。

頁面結構：麵包屑「全域設定 > 電商進階設定 > 第三方登入設定」→ 頁面說明文字
→ 三個平台設定卡片（垂直排列）→ 前台顯示設定卡片。

每個平台卡片（以 LINE 為例）：
- 卡片右上角有「啟用 / 停用」Toggle（el-switch）
- 外部連結至 LINE Developers Console（新分頁，帶 ↗ icon）
- Channel ID 輸入框（一般文字）
- Channel Secret 輸入框（password 型，show-password 切換，右側眼睛 icon）
- Callback URL 輸入框（唯讀 disabled，右側「複製」Button）
- 底部 Callback URL 說明文字（小字）
- 右下角「測試連線」次要 Button + 「儲存」主要 Button

前台顯示設定卡片：拖曳排序列表（三個平台順序）+ 登入模式 Radio Group（兩個選項）
+ 若選「僅社群」則顯示 Warning Alert + 「儲存顯示設定」Button。
請參考上傳文件中 Screen 5 的規格。
```

---

### 完整產品一次生成（可選）

```
請幫我生成「Evomni 電商平台第三方登入」功能的完整 UI 設計，涵蓋以下 5 個畫面：
1. 前台消費者登入頁（手機，含 LINE / Google / Facebook 三個社群 Button）
2. Email 補全頁（手機，用於 LINE / Facebook 未提供 Email 的場景）
3. 帳號合併確認頁（手機，密碼驗證 + 確認 / 取消 Button）
4. 會員中心帳號設定 - 社群帳號連結卡片（桌面 responsive）
5. 後台第三方登入憑證設定頁（桌面，三個平台卡片 + 前台顯示設定）

設計風格：Element Plus 元件庫、Noto Sans TC 字型、無 border-radius（!rounded-none）、
品牌色 #409EFF。社群 Button 必須使用各平台官方品牌色（LINE #06C755 / Facebook #1877F2 / 
Google 白底）。請參考上傳文件的完整規格。
```
