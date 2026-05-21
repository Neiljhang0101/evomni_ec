# 如何開啟 HTML 原型

本資料夾內的 `.html` 檔案為高保真設計原型。由於原型透過 `<script src="*.jsx">` 載入外部元件，需從**專案根目錄**啟動本地伺服器才能正常運作（直接用瀏覽器開啟會因 CORS 限制而失敗）。

> **目前可開啟的原型檔案（開啟後請見各頁網址）：**
> - `http://localhost:8080/html/產品中心.html` — 產品列表、新增/編輯、分類管理、庫存管理、CSV 匯入
> - `http://localhost:8080/html/訂單管理.html` — 訂單列表、訂單詳情、退換貨
> - `http://localhost:8080/html/金物流串接設定.html` — 金流/物流串接設定
> - `http://localhost:8080/html/會員管理後台.html` — 顧客管理、會員分群、黑名單
> - `http://localhost:8080/html/數據中心.html` — 數據分析儀表板
> - `http://localhost:8080/html/行銷中心.html` — 行銷活動管理
> - `http://localhost:8080/html/方案管理與升級流程.html` — 方案狀態、比較、升級詢問、內部後台開通
> - `http://localhost:8080/html/admin/index.html` — 後台總覽（儀表板）

---

## 開啟方式：啟動本地伺服器

### ⚠️ 重要：必須從專案根目錄啟動

伺服器**必須**從專案根目錄（`evomni_ec/`）啟動，**不能**在 `html/` 子目錄內執行，否則元件路徑會失效、頁面空白。

### 使用 Python（已內建）

```bash
# 切換到專案根目錄（evomni_ec 資料夾）
cd C:\Users\Neil\Desktop\evomni_ec

# 啟動伺服器
python -m http.server 8080
```

開啟瀏覽器前往對應網址，例如：`http://localhost:8080/html/產品中心.html`

### 使用 Node.js（需先安裝）

```bash
# 切換到專案根目錄（evomni_ec 資料夾）
cd C:\Users\Neil\Desktop\evomni_ec

# 全域安裝 serve（只需一次）
npm install -g serve

# 啟動伺服器
serve .
```

開啟瀏覽器前往：`http://localhost:3000/html/產品中心.html`

---

## 常見問題

| 問題 | 解法 |
|------|------|
| 開啟後畫面空白 | **確認伺服器是從專案根目錄（`evomni_ec/`）啟動**，而非 `html/` 子目錄 |
| 元件 404 / JSX 載入失敗 | 同上，伺服器啟動路徑錯誤導致 `../components/` 路徑無法解析 |
| 圖片（LOGO）無法顯示 | 確認從根目錄啟動，`/assets/logo.jpg` 需以根目錄為基準 |
| 樣式跑版 | 請使用 Chrome 或 Edge 最新版本開啟 |
| 互動無效果 | 部分互動需要 JavaScript，請確認瀏覽器未封鎖腳本執行 |
| 修改元件後沒有更新 | 按 `Ctrl+Shift+R`（強制重新整理，清除快取）|

---

## 注意事項

- `.html` 原型僅供**設計參考**，請勿直接複製代碼至生產環境
- 開發時請依照原型視覺規格，使用 Vue 3 + Element Plus + Tailwind CSS 重現
- 如有設計規格問題，請參考同資料夾的 `README.md`
