# Evomni 新電商系統 — Prototype 開啟說明

## 開啟步驟

### 第一步：解壓縮

將 ZIP 解壓縮到任意資料夾，確認解壓後資料夾內有以下內容：

```
index.html
components/
assets/
PRD差異確認清單（PM討論用）.md
README_PM.md
```

### 第二步：啟動本地伺服器

Prototype 需透過本地伺服器開啟，直接雙擊 index.html 會顯示空白。

**使用 Python（Windows 內建，推薦）：**

1. 在解壓縮後的資料夾空白處，按住 Shift 並右鍵，選擇「在此處開啟 PowerShell 視窗」
2. 輸入以下指令並按 Enter：

```
python -m http.server 8080
```

3. 看到 `Serving HTTP on 0.0.0.0 port 8080` 表示啟動成功

### 第三步：開啟瀏覽器

開啟 Chrome 或 Edge，前往：

```
http://localhost:8080/index.html
```

---

## 注意事項

- 瀏覽期間請保持 PowerShell 視窗開啟，關閉後 Prototype 即無法存取
- 建議使用 Chrome 或 Edge 最新版本，其他瀏覽器可能有顯示差異
- 如畫面顯示空白，請確認是否從解壓縮後的資料夾根目錄啟動伺服器

---

## 如果 Python 指令無效

請嘗試以下指令：

```
python3 -m http.server 8080
```

或確認 Python 是否已安裝：前往 https://www.python.org/downloads/ 下載安裝後再試。
