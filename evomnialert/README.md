# EvomniAlert

Evomni 系統專用訊息組件。原生 `<dialog>` + [DOMPurify v3](https://github.com/cure53/DOMPurify) 封裝，符合資安合規要求。

## 資料夾內容

```
common/evomnialert/
├─ purify.min.js        DOMPurify v3（必載）
├─ evomnialert.js       核心 JS，匯出 EvomniAlert / SiteAlert（含 inline SVG icons）
├─ evomnialert.css      樣式（必載）
├─ evomnialert.scss     SCSS 原始碼（後端可忽略）
├─ README.md            本說明文件
└─ demo.html            使用範例與 try me 按鈕
```

> icons 採 **inline SVG** 模式內嵌於 `evomnialert.js`，**不依賴任何外部圖片檔**，不需額外部署 icon 資料夾，也避免路徑相對性問題。

---

## 安裝

將整個 `common/evomnialert/` 資料夾部署至站台靜態資源路徑，於頁面載入：

```html
<link rel="stylesheet" href="/common/evomnialert/evomnialert.css">
<script src="/common/evomnialert/purify.min.js"></script>
<script src="/common/evomnialert/evomnialert.js"></script>
```

> 路徑以實際部署位置為準。icons 已內嵌於 JS 中，無須處理外部圖片路徑。

---

## 兩個 API

組件同時提供兩個全域：

| API | 用途 | 是否清洗 HTML | 何時使用 |
|-----|------|-------------|---------|
| `EvomniAlert` | 後端 / AJAX 回應 | ✓ 走 DOMPurify | 訊息內容含動態字串、可能含 HTML |
| `SiteAlert` | 前端靜態內容 | ✗ 走 textContent | 前端寫死的訊息，純文字 |

### 為什麼要分開？

- 後端傳來的字串可能含 HTML，需清洗避免 XSS
- 前端寫死的字串不需要 HTML，用 `textContent` 更安全且不需載入 DOMPurify
- 分開命名可避免前端工程師誤用含 HTML 的字串

---

## `EvomniAlert.show(options)`

```js
const id = EvomniAlert.show({
    type: 'success',          // 'success' | 'error' | 'warning' | 'info'
    title: '送出成功',         // 必填，可含白名單 HTML 標籤
    desc: '我們會盡快聯繫您',   // 選填，可含白名單 HTML 標籤
    duration: 2000,            // 選填，毫秒；顯示 OK 鈕時強制為 0
    confirmButton: false,      // 選填；true 時強制顯示 OK 鈕、停用自動關閉
                               // error 型預設 true；傳入 onConfirm 時也會自動 true
    closeButton: true,         // 選填，右上 X 是否顯示；預設 true
                               // logout 流程預設 false，強制走 OK 鈕確認
    onConfirm: () => {},       // 選填，按 OK 鈕時觸發（非 X 關閉）
    onClose: () => {},         // 選填，關閉時觸發
});
```

### 行為差異

| type | 自動關閉 | OK 鈕 | backdrop 可關 | 佇列優先權 |
|------|---------|------|--------------|-----------|
| success | 2000ms | 無 | ✓ | 一般 |
| info    | 2000ms | 無 | ✓ | 一般 |
| warning | 2000ms | 無 | ✓ | 一般 |
| error   | **不關閉** | **有（`OK`）** | ✗ | **高（插隊）** |

- **error 不自動關閉**、不可 backdrop 關閉；必須按 `OK` 鈕或 `×` 或 ESC
- **ESC 一律可關閉**（瀏覽器原生）
- 多則訊息同時觸發時會排隊，error 會插隊到最前方

---

## `EvomniAlert.fromResponse(res)`

AJAX 回應快捷，約定格式：

```json
{
    "ok": true,
    "type": "success",
    "title": "送出成功",
    "msg": "我們會盡快聯繫您"
}
```

| 欄位 | 必填 | 說明 |
|------|-----|------|
| `ok` | 是 | `true` 推論 success、`false` 推論 error |
| `type` | 否 | 若指定，優先權高於 `ok` 推論 |
| `title` | 否 | 標題，可含白名單 HTML |
| `msg` | 否 | 內容，可含白名單 HTML |

使用範例：

```js
fetch('/api/submit', { method: 'POST', body: formData })
    .then(r => r.json())
    .then(EvomniAlert.fromResponse);
```

---

## `EvomniAlert.logout(options)` / `SiteAlert.logout(options)`

登出慣例：成功圖示 + OK 鈕 + 按 OK 後導向指定頁面。

```js
EvomniAlert.logout({
    redirect: '/',            // 選填，預設 '/'；按 OK 後導向此路徑
    title: '登出成功',         // 選填，預設 '登出成功'
    desc: '',                 // 選填
    onConfirm: () => {},      // 選填，覆寫預設導向行為（例如先清 localStorage 再跳轉）
    onClose: () => {},        // 選填
});
```

### 行為

- **不自動關閉**、**不可 backdrop 關閉**、**無右上 X 按鈕**
- 僅能按 OK 觸發 `onConfirm`（預設 `location.href = redirect`）
- ESC 鍵仍可關閉（視同取消，不會跳轉），保留無障礙 escape hatch

### 差別

| API | 情境 |
|-----|------|
| `SiteAlert.logout()` | 前端自行呼叫（純文字，零 XSS 風險） |
| `EvomniAlert.logout()` | 後端渲染 / 自訂 title 或 desc 含 HTML（走 DOMPurify） |

### 使用範例

```js
// 最簡：登出後跳首頁
document.querySelector('#logout-btn').addEventListener('click', function () {
    SiteAlert.logout();
});

// 帶跳轉路徑
SiteAlert.logout({ redirect: '/zh-tw/member/login' });

// 先清 token 再跳轉
SiteAlert.logout({
    onConfirm: function () {
        localStorage.clear();
        location.href = '/';
    }
});
```

---

## `EvomniAlert.dismiss(id)`

主動移除佇列中的訊息（尚未顯示）或關閉目前顯示中的訊息。

```js
const id = EvomniAlert.show({ type: 'info', title: '載入中...' });

// 非同步完成後關閉
setTimeout(() => EvomniAlert.dismiss(id), 0);
```

---

## `SiteAlert`（前端純文字）

```js
SiteAlert.success(title, desc);   // desc 選填
SiteAlert.error(title, desc);
SiteAlert.warning(title, desc);
SiteAlert.info(title, desc);
```

- 內部使用 `element.textContent`，**不支援 HTML**、零 XSS 風險
- 不依賴 DOMPurify（但仍建議一併載入，以支援 `EvomniAlert`）
- 行為與 `EvomniAlert.show()` 完全一致（自動關閉規則、佇列、ESC 等）

---

## 安全策略（DOMPurify 白名單）

`EvomniAlert` 僅接受以下 HTML 標籤與屬性：

### 允許的標籤

```
<b> <i> <strong> <em> <br> <a> <span>
```

### 允許的屬性

```
href target rel class
```

### 協定白名單

`<a href="...">` 僅允許：

```
http: https: mailto: tel:
```

`javascript:`、`data:`、`vbscript:` 等一律剔除。

### 強制禁止的屬性

```
style onerror onclick onload
```

### 為什麼白名單寫死在 JS？

避免 runtime 覆寫造成資安後門。若需擴充標籤，請走 code review 修改 `evomnialert.js` 內的 `PURIFY_CONFIG`。

---

## 使用範例

### PHP 直接渲染

```php
<?php if ($result['ok']): ?>
<script>
    EvomniAlert.show({
        type: 'success',
        title: <?= json_encode($result['title'], JSON_UNESCAPED_UNICODE) ?>,
        desc: <?= json_encode($result['msg'], JSON_UNESCAPED_UNICODE) ?>
    });
</script>
<?php endif; ?>
```

> 建議使用 `json_encode()` 而非 `htmlspecialchars()`，可正確處理換行、引號與中文。

### AJAX（標準格式）

後端回傳：

```php
header('Content-Type: application/json');
echo json_encode([
    'ok' => true,
    'title' => '送出成功',
    'msg' => '我們會盡快聯繫您'
]);
```

前端：

```js
fetch('/api/submit', { method: 'POST', body: formData })
    .then(r => r.json())
    .then(EvomniAlert.fromResponse)
    .catch(err => SiteAlert.error('網路異常', '請稍後再試'));
```

### AJAX（自訂 type）

```php
echo json_encode([
    'ok' => false,
    'type' => 'warning',        // 不想用 error、可指定 warning
    'title' => '請確認資料',
    'msg' => 'Email 格式不正確'
]);
```

### 含連結的訊息

```js
EvomniAlert.show({
    type: 'info',
    title: '系統通知',
    desc: '請參考 <a href="https://example.com/faq" target="_blank">常見問題</a>'
});
// DOMPurify 會自動為 target="_blank" 補上 rel="noopener noreferrer"
```

### 需要使用者確認後做事

```js
EvomniAlert.show({
    type: 'error',
    title: 'Session 已過期',
    desc: '請重新登入',
    onConfirm: () => {
        location.href = '/login';
    }
});
```

---

## 常見問題

### Q: 未載入 DOMPurify 會怎樣？

`EvomniAlert.show()` 會在 console 顯示警告，並自動降級為 HTML escape（所有標籤變成純文字）。不會 crash、但 HTML 顯示會失效。建議務必載入 `purify.min.js`。

`SiteAlert` 不受影響。

### Q: 可以同時顯示多個訊息嗎？

不行，一次只顯示一則。後來的會排入佇列，前一則關閉後才顯示下一則。error 型會插隊到最前方。

### Q: 如何自訂樣式？

直接覆寫 `.evomnialert-xxx` 相關類別。所有樣式類別以 `.evomnialert` 為前綴，不會與其他元件衝突。

### Q: 為什麼 error 按鈕是英文 `OK`？

中性、不帶語系，可直接給任何語言版本使用，後端不需根據語系動態調整。

---

## 版本資訊

- DOMPurify: v3.4.0
- 瀏覽器支援：所有支援 `<dialog>` 元素的現代瀏覽器（Chrome 37+, Firefox 98+, Safari 15.4+, Edge 79+）
- IE 不支援（`<dialog>` 原生不支援）
