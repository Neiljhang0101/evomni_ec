# Evomni 新電商系統 — 工程師 Q&A 與 PRD 補充說明

> **文件說明：** 本文件模擬前後端工程師逐一閱讀 PRD 後提出的技術疑問（已轉換為需求確認語言），並附上 PM 的正式回覆與規格補充。所有回覆均為最終規格決策，並已同步寫回各子 PRD。
>
> **版本：** v1.0 | **日期：** 2026/04/28 | **整理人：** Claude（依廖紫茵授權產出）

---

## 跨模組全域問題

---

**Q-G01｜所有時間戳記是用 UTC 還是台灣時間（UTC+8）？**

- **工程師問題**：後端儲存時間時要用哪個 Timezone？前台顯示、報表匯出、排程 Cron Job 的凌晨 00:00 是哪個時區的 00:00？

- **PM 回覆（規格決策）**：
  - 後端 DB 儲存一律使用 **UTC**（ISO 8601 格式）
  - 前端顯示、後台報表、NT 信件中的時間 **一律轉換為 UTC+8（台灣時間）**顯示
  - 每日凌晨排程（等級降等、標籤更新）以 **台灣時間 00:00（UTC 16:00）** 為基準
  - Laravel 設定 `APP_TIMEZONE=Asia/Taipei`；DB 連線 timezone 設定 `SET time_zone = '+08:00'`

---

**Q-G02｜記錄刪除是「軟刪除」還是「硬刪除」？**

- **工程師問題**：訂單、會員、優惠券等資料被刪除時，資料庫要保留記錄嗎？

- **PM 回覆（規格決策）**：
  - **訂單、退換貨申請、點數記錄、庫存異動日誌**：**永遠不可硬刪除**，僅標記狀態（`status = 'cancelled'`）
  - **會員**：軟刪除（`deleted_at` 欄位），保留 3 年後才可依個資法申請硬刪除
  - **優惠券 / 行銷活動**：軟刪除，停用不刪除，保留歷史紀錄
  - **產品**：軟刪除（`is_deleted = true`），已關聯的訂單繼續顯示產品名稱快照（訂單建立時快照產品名稱、規格、單價至 `order_items` 表）

---

**Q-G03｜API 是否有版本控制前綴？**

- **工程師問題**：所有後端 API 路徑是 `/api/` 還是 `/api/v1/`？未來升版策略？

- **PM 回覆（規格決策）**：
  - 所有電商模組 API 使用 `/api/v1/` 前綴（為未來版本升級預留空間）
  - Webhook 接收端點**例外**，使用 `/api/webhooks/{vendor}` 不加版本前綴（因廠商 Webhook URL 一旦設定難以更改）

---

## Part 3 訂單管理

---

**Q-3.01｜超時取消與付款 Webhook 同時到達的 Race Condition**

- **工程師問題**：如果「30 分鐘自動取消 Job」和「金流付款成功 Webhook」在同一毫秒執行，可能出現「訂單已被取消，但錢已扣款」的情況，怎麼處理？

- **PM 回覆（規格決策）**：
  - 自動取消 Job 執行前，必須在 **Transaction 內加鎖**：`SELECT * FROM orders WHERE id = X AND status = 'pending_payment' FOR UPDATE`
  - 若狀態不是 `pending_payment`（即已被 Webhook 更新為 `paid`），Job 直接結束，不執行取消
  - Webhook 接收端同理：更新訂單狀態前確認訂單仍在 `pending_payment`；若已 `cancelled`，記錄錯誤 Log 並通知金流廠商發起退款（自動退款流程）
  - **結論**：兩個方向都要做 Guard，都要用 `FOR UPDATE` 樂觀鎖

---

**Q-3.02｜ATM 轉帳的付款超時時間與信用卡 30 分鐘不同，要怎麼區分？**

- **工程師問題**：ATM 轉帳的付款期限通常是 72 小時，但 PRD 寫的「預設 30 分鐘未付款自動取消」，這兩個衝突嗎？

- **PM 回覆（規格決策）**：
  - **超時取消時間依付款方式分開設定**，不是全域統一值：

  | 付款方式 | 預設超時時間（商家可調） |
  | --- | --- |
  | 信用卡 / LINE Pay / 街口 | 30 分鐘 |
  | ATM 虛擬帳號 | 72 小時（3 天） |
  | 超商代碼 | 3 天 |
  | 貨到付款 | 不超時（永遠等待） |

  - 訂單表新增欄位：`expires_at DATETIME`，建立訂單時依付款方式計算並填入
  - 超時取消 Job（Queue Worker）根據 `expires_at` 判斷，不是固定 30 分鐘掃描

---

**Q-3.03｜退款金額計算中的小數點精度問題**

- **工程師問題**：`退貨產品小計 × 折扣分攤率` 可能產生小數，例如折扣 10 元、退 1 件共 3 件，分攤為 3.33...元。最終退款金額要用 FLOOR、ROUND 還是 CEIL？金流廠商退款 API 接受小數嗎？

- **PM 回覆（規格決策）**：
  - 所有金額計算使用**新台幣，無小數位**（整數）
  - 折扣分攤金額使用 **`FLOOR` 取整**（對商家有利，避免多退款）
  - 退款 API 傳入金額一律為整數（單位：新台幣元）
  - 顯示給商家的「預估退款金額」後方加說明文字：「金額已無條件捨去至整數位」
  - 特殊規則：若多件同產品退貨，先逐件計算 `FLOOR`，不可先加總再 `FLOOR`（避免累積誤差偏大）

---

**Q-3.04｜部分退貨後，同一訂單再次退貨的計算基準問題**

- **工程師問題**：消費者先退 2 件，第二次又要退剩下 1 件。第二次退款的折扣分攤，是以「原始訂單」為基準還是「第一次退後的剩餘金額」為基準？

- **PM 回覆（規格決策）**：
  - 每次退款的折扣分攤**永遠以原始訂單的產品小計總額為分母**
  - 計算公式：`退貨折扣分攤 = 本次退貨產品小計 × (原始訂單總折扣 ÷ 原始訂單產品小計)`
  - 系統在 `orders` 表快照 `original_discount_amount` 和 `original_items_subtotal`，不可被後續退款行為改動
  - 系統校驗：所有退款的折扣分攤總和不得超過原始訂單總折扣，超過時以差值補齊最後一筆退款的折扣分攤

---

**Q-3.05｜換貨庫存確認到扣除之間的 Race Condition**

- **工程師問題**：「換貨確認中 → 確認庫存 → 換貨備貨中 → 商家出貨（此時才扣庫存？）」的流程中，從「確認庫存」到實際「扣庫存」有時間差，可能被其他訂單搶走庫存，怎麼處理？

- **PM 回覆（規格決策）**：
  - 庫存扣除時機：商家點擊「確認庫存（換貨確認）」時**即時扣除**（軟佔用），不等到出貨
  - 具體做法：點擊「確認庫存」按鈕 → Transaction 內 `SELECT stock FOR UPDATE` → 確認庫存 > 0 → 扣除 1（`stock -= 1`）→ 更新狀態為「換貨備貨中」
  - 若庫存為 0（被搶走）：Transaction rollback → 後台顯示 `<el-alert type="error">「庫存不足，無法進行換貨，請聯繫消費者協商退款或等候補貨」` → 狀態回到「換貨確認中」

---

**Q-3.06｜ATM 退款需要消費者的銀行帳戶資訊，消費者在哪裡填？系統如何儲存？**

- **工程師問題**：ATM 退款需商家手動輸入消費者銀行帳號，但 PRD 沒有定義消費者的銀行帳戶資訊從哪來、用什麼介面收集。

- **PM 回覆（規格決策）**：
  - **消費者端（前台）**：退換貨申請表單新增「退款銀行帳戶」區塊（**僅在原付款方式為 ATM 轉帳時顯示**）

  | 欄位 | 元件 | 驗證規則 |
  | --- | --- | --- |
  | 銀行名稱 | `<el-select>` | 必填；顯示台灣主要銀行清單 |
  | 分行名稱 | `<el-input>` | 選填；最多 20 字 |
  | 戶名 | `<el-input>` | 必填；最多 20 字 |
  | 帳號 | `<el-input>` | 必填；台灣帳號格式（10-16 位數字）|

  - **商家端（後台）**：退換貨詳情頁顯示消費者填入的帳號資訊，商家確認後手動匯款，並在後台填入「匯款日期」及「匯款金額」紀錄
  - **資料安全**：銀行帳號儲存於 `return_requests` 表，加密儲存（AES-256）；退款完成 90 天後自動遮蔽（`mask_bank_account`）
  - 貨到付款退款流程相同（同樣需要帳戶資訊）

---

**Q-3.07｜電子發票作廢 vs. 折讓的判斷規則**

- **工程師問題**：部分退貨時到底是開折讓還是作廢？跨月發票能折讓嗎？全退後發票已寄給消費者，作廢流程是什麼？

- **PM 回覆（規格決策）**：

  | 情況 | 處理方式 |
  | --- | --- |
  | 全部退貨，發票當月 | 作廢發票 |
  | 全部退貨，跨月或已申報 | 開立折讓單（法規不允許跨月作廢）|
  | 部分退貨（無論是否跨月）| 一律開立折讓單 |
  | 退款金額為 0（產品瑕疵換貨，無金額變動）| 不需操作發票 |

  - 系統在退款確認時自動判斷：`DATEDIFF(NOW(), invoice_issued_at) > 0 AND MONTH(NOW()) != MONTH(invoice_issued_at)` → 強制折讓
  - 折讓單由系統自動呼叫綠界 `DoActionByInvoiceNo` API，商家不需手動操作

---

**Q-3.08｜訂單編號流水號的唯一性機制**

- **工程師問題**：`ORD-YYYYMMDD-XXXXXX` 的 6 位流水號，每天最多 999,999 筆。流水號是每天重置還是全域遞增？分散式部署怎麼保證唯一性？

- **PM 回覆（規格決策）**：
  - 流水號**每天重置**，從 `000001` 開始
  - 使用 Redis `INCR order:counter:YYYYMMDD` 原子遞增保證唯一性（Redis 單執行緒，無 Race Condition）
  - 每天 00:00 Redis key 自然過期（設定 `EXPIREAT` 到隔日 00:00）
  - 999,999 上限：初期業務量不會超過，若未來有需要可延伸為 7 位數
  - Redis 故障降級：改用 `orders` 表的 `SELECT MAX(order_number) FOR UPDATE` 取號（效能較差但保證唯一）

---

**Q-3.09｜後台手動建立訂單的付款流程**

- **工程師問題**：商家後台手動開單（電話接單），付款方式怎麼設定？要走線上金流嗎？

- **PM 回覆（規格決策）**：
  - 後台手動開單**不走線上金流**，付款方式選項：
    1. **貨到付款**（出貨時收款）
    2. **已收款（現場/電話）**：直接標記「已付款」，填入收款方式（現金/匯款）和備註
    3. **待消費者線上付款**：產生訂單並發送付款連結至消費者 Email（使用系統的線上金流）
  - 手動建立的訂單在「已收款（現場）」模式下**跳過電子發票自動開立**，需商家手動操作（因可能是現場開紙本發票）

---

## Part 6 會員管理

---

**Q-6.01｜退款後累計消費金額要不要扣回？**

- **工程師問題**：消費者退款後，用於等級計算的「累計消費金額」要不要減掉退款金額？如果要，是即時扣還是等排程？

- **PM 回覆（規格決策）**：
  - **是，退款後必須扣回累計消費金額**
  - 觸發時機：退換貨的「退款完成」狀態確認後，**即時扣回**（同一 Transaction 內更新 `members.total_spent`）
  - 扣回公式：`total_spent -= 退款金額（不含運費）`（只扣產品退款部分，不扣可退運費）
  - **是否即時降等**：扣回後**立即重新計算等級**（與升等邏輯一致，不等排程）
  - 降等通知：若計算後等級低於目前等級，即時觸發「等級調整通知」NT（注意：非「降等排程信」，是獨立的因退款觸發的降等通知信）
  - `member_level_logs` 必須記錄觸發原因 `change_reason = 'refund_downgrade'`

---

**Q-6.02｜保級預警信「只發一次」的機制怎麼實作？**

- **工程師問題**：「距等級有效期 30 天時發保級預警信，只發一次」，用什麼欄位或機制控制「只發一次」？

- **PM 回覆（規格決策）**：
  - `member_levels`（或相關關聯表）新增欄位：`retention_warning_sent_at DATETIME DEFAULT NULL`
  - 每日 00:00 排程邏輯：`WHERE level_expires_at BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 30 DAY) AND retention_warning_sent_at IS NULL`
  - 發送後更新 `retention_warning_sent_at = NOW()`，下次排程不再選到

---

**Q-6.03｜推薦點數的退款處理**

- **工程師問題**：A 推薦 B，B 首購完成後雙方獲得點數。若 B 之後退款，A 的推薦點數要扣回嗎？B 的被推薦點數呢？

- **PM 回覆（規格決策）**：
  - **A 的推薦點數**：**不扣回**（推薦行為已完成，點數作為推薦人獎勵不應因被推薦人退款而受影響）
  - **B 的被推薦人首購獎勵**：
    - 若 B 全退：**扣回**被推薦點數，`change_type = 'referral_revoked'`
    - 若 B 部分退：**不扣回**（首購行為已達成）
  - 推薦記錄表新增 `is_rewarded BOOLEAN` 欄位，全退扣回後設為 `false`，若 B 日後再次購買且達成「首購」判定，則不再重複發放

---

**Q-6.04｜point_batches 表完整 Schema**

- **工程師問題**：PRD 提到用 `point_batches` 追蹤點數到期，但沒有給出 Schema，工程師無法設計資料庫。

- **PM 回覆（規格決策）** — 以下為正式 Schema：

  ```sql
  CREATE TABLE point_batches (
    id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    member_id     BIGINT UNSIGNED NOT NULL,
    amount        INT UNSIGNED NOT NULL,         -- 本批次原始點數
    remaining     INT UNSIGNED NOT NULL,         -- 剩餘可用點數
    expires_at    DATETIME NOT NULL,             -- 到期時間（NULL = 永久）
    change_type   VARCHAR(50) NOT NULL,          -- 來源類型（見下方 Enum）
    reference_id  BIGINT UNSIGNED DEFAULT NULL,  -- 關聯 ID（訂單ID/調整ID）
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id),
    INDEX idx_member_expires (member_id, expires_at),
    INDEX idx_expires_remaining (expires_at, remaining)
  );
  ```

  **change_type Enum 值：** `order_reward`（消費回饋）、`manual_add`（手動增加）、`manual_deduct`（手動扣除）、`referral_reward`（推薦獎勵）、`referral_revoked`（推薦撤銷）、`birthday_bonus`（生日加倍）、`system_grant`（系統發放）

  **點數扣除邏輯（先到期先扣）：**
  ```sql
  -- 消費者使用點數時，依 expires_at ASC 順序扣除各批次
  SELECT * FROM point_batches
  WHERE member_id = ? AND remaining > 0 AND expires_at > NOW()
  ORDER BY expires_at ASC
  FOR UPDATE
  ```

---

**Q-6.05｜點數餘額查詢效能問題**

- **工程師問題**：每次查詢點數餘額都要 `SUM(remaining) FROM point_batches`，會員多時效能差嗎？

- **PM 回覆（規格決策）**：
  - `members` 表新增 `point_balance INT UNSIGNED DEFAULT 0`（快取欄位）
  - 每次 `point_batches` 增減時，同一 Transaction 內更新 `members.point_balance`
  - 顯示前台/後台餘額時讀 `members.point_balance`（O(1)），不每次 SUM
  - 每日 00:00 排程：掃描當天到期的 `point_batches`，將 `remaining` 歸零，並更新 `members.point_balance`（防止因異常造成快取不一致）
  - 月底對帳排程：`SUM(point_batches.remaining)` 與 `members.point_balance` 比對，若不一致寫 Alert Log 並修正

---

**Q-6.06｜生日欄位設定後不可更改，若用戶填錯有客服補救機制嗎？**

- **工程師問題**：「生日一旦設定後不可更改（防止刷生日禮）」，但現實中用戶確實可能填錯，後端如何處理客服解鎖請求？

- **PM 回覆（規格決策）**：
  - 前台：`birthday` 欄位若已設定，顯示為唯讀不可點擊
  - 後端：`PUT /api/v1/members/{id}/profile` 若包含 `birthday` 且 DB 已有值，返回 `422 BIRTHDAY_ALREADY_SET`
  - **客服解鎖機制**：後台管理員操作介面新增「清除生日」按鈕（需「擁有者」權限），清除後 `birthday = NULL`，前台消費者可重新填入
  - 清除記錄寫入 `member_audit_logs`（操作人、時間、舊值遮蔽後的 hash），不儲存明文舊生日

---

**Q-6.07｜黑名單不攔截訪客結帳的業務合理性確認**

- **工程師問題**：黑名單只針對已登入會員，訪客可以繞過黑名單下單。這個設計是刻意的嗎？

- **PM 回覆（規格決策）**：
  - **是的，刻意設計**。理由：無法 100% 確定訪客就是黑名單會員（同 IP 可能是家人），強制攔截訪客有過度阻攔風險
  - 如需強化：商家可在後台手動標記「此會員的 IP 或手機號碼」作為輔助攔截依據，但這是 Phase 2 功能，本期不開發
  - **本期規格**：黑名單攔截只在「已登入且 `is_blacklisted = true`」時執行，訪客結帳不攔截

---

**Q-6.08｜分眾篩選只支援全 AND 或全 OR，不支援混合邏輯**

- **工程師問題**：目前條件只能「全部 AND」或「全部 OR」，但行銷需求常需要「條件A AND 條件B OR 條件C」的混合邏輯。這是 MVP 限制嗎？

- **PM 回覆（規格決策）**：
  - **是的，是 MVP 限制**，本期只支援全 AND 或全 OR
  - PRD 中明確標注「**v1.0 限制：條件組合僅支援全 AND 或全 OR，不支援混合邏輯，此為 Phase 2 功能**」
  - 工程師在 DB 設計時，分眾篩選條件儲存格式預留 `group_id` 欄位（未來支援分組 AND/OR），但 v1.0 前端只開放全局切換

---

## Part 4 行銷活動

---

**Q-4.01｜購物車挽回的計時起點：加入第一件還是最後一件？**

- **工程師問題**：消費者加入產品 A（11:00），等了 1 小時又加產品 B（12:00）。購物車挽回的「1 小時計時」是從 11:00 還是 12:00 算起？

- **PM 回覆（規格決策）**：
  - 計時從**最後一次購物車異動時間**起算（`carts.last_updated_at`）
  - 每次購物車有任何變動（新增/刪除產品、修改數量），重置計時
  - 這樣設計的原因：消費者正在猶豫中的購物車才觸發，而不是還在添加產品的購物車
  - `carts` 表需有 `last_updated_at DATETIME` 欄位，每次購物車異動時更新

---

**Q-4.02｜訪客購物車是否觸發購物車挽回旅程？**

- **工程師問題**：訪客沒有會員 ID 和 Email，怎麼識別訪客購物車？訪客購物車能觸發挽回 Email 嗎？

- **PM 回覆（規格決策）**：
  - **v1.0 訪客購物車不觸發挽回旅程**（因為無法取得 Email）
  - 訪客購物車使用 Session Cookie 識別（有效期 7 天）
  - 若訪客在同一 Session 中登入，則 Session 購物車與會員購物車合併，**合併後**的會員購物車才納入挽回監控
  - **觸發條件補充（寫回 PRD）**：購物車挽回旅程僅針對「已登入會員的購物車」，訪客不適用

---

**Q-4.03｜優惠券使用 Race Condition：多個分頁同時結帳**

- **工程師問題**：消費者 A 在手機和電腦同時用同一張優惠券結帳（限用一次），兩個請求幾乎同時到達，系統怎麼保證只有一個成功？

- **PM 回覆（規格決策）**：
  - 使用 **DB 樂觀鎖 + 唯一索引**：
    ```sql
    -- coupon_usages 表（每次使用記錄一筆）
    CREATE TABLE coupon_usages (
      id           BIGINT AUTO_INCREMENT PRIMARY KEY,
      coupon_id    BIGINT NOT NULL,
      member_id    BIGINT NOT NULL,
      order_id     BIGINT NOT NULL,
      used_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uq_coupon_member (coupon_id, member_id)  -- 每人每券只能用一次
    );
    ```
  - 結帳時嘗試 `INSERT INTO coupon_usages (coupon_id, member_id, order_id) VALUES (...)` → 若 Duplicate Key 錯誤，回傳 `409 COUPON_ALREADY_USED`
  - 全域使用次數限制（非個人限制）：使用 Redis `INCR coupon:{id}:usage_count` 原子操作，超過上限返回 `409 COUPON_LIMIT_REACHED`

---

**Q-4.04｜優惠計算 5 層優先序：各層計算基準是什麼（原價還是上一層折後價）？**

- **工程師問題**：Layer 2 的滿額折扣，計算基準是產品原始小計還是 Layer 1 折後金額？這影響計算結果很大。

- **PM 回覆（規格決策）**：
  - **每一層的計算基準都是上一層折後的金額**（層層折算，非全部基於原價）
  - 例：原價 1,000 元
    - Layer 1：限時折扣 9 折 → 900 元
    - Layer 2：滿 900 打 95 折 → 855 元（基於 900，不是 1,000）
    - Layer 4：折扣碼 -50 元 → 805 元
    - Layer 5：點數折抵 100 點 = -10 元 → 795 元
  - 若滿額門檻設定為「訂單金額滿 NT$1,000」，判斷基準是 **Layer 1 折後金額**（900 元），而非原始金額（1,000 元）→ **不符合門檻不給折扣**
  - 這個決策對業務影響重大，已確認：**以折後金額為判斷基準**（較嚴格）

---

**Q-4.05｜自動化旅程的 marketing_triggers 表是否需要針對每個旅程類型建立不同 Schema？**

- **工程師問題**：PRD 提到 `marketing_triggers` 表做旅程去重，但各旅程觸發條件不同（購物車 vs 沉睡天數 vs 到期日），一張表能涵蓋嗎？

- **PM 回覆（規格決策）**：
  - 使用單一表 + `journey_type` 欄位區分，Schema：

  ```sql
  CREATE TABLE marketing_journey_logs (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id     BIGINT NOT NULL,
    journey_type  ENUM('cart_recovery', 'sleep_wakeup', 'churn_winback', 'post_purchase', 'points_expiry', 'coupon_expiry'),
    triggered_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    cooldown_ends_at DATETIME NOT NULL,           -- 冷卻期結束時間
    channel       ENUM('email', 'line', 'both'),
    reference_id  BIGINT DEFAULT NULL,            -- 相關資源 ID（cart_id / coupon_id）
    result        ENUM('sent', 'failed', 'skipped'),
    INDEX idx_member_journey (member_id, journey_type, cooldown_ends_at)
  );
  ```

  - 去重查詢：`WHERE member_id = ? AND journey_type = ? AND cooldown_ends_at > NOW()`

---

## 金物流串接規格

---

**Q-P.01｜Webhook 冪等性的「唯一 Key」是哪個欄位？**

- **工程師問題**：PRD 說用 `MerchantTradeNo` 做冪等性判斷，但這是我們系統生成的訂單號，還是廠商產生的交易流水號？如果廠商因網路問題重送相同 Webhook，如何識別是重複？

- **PM 回覆（規格決策）**：
  - `MerchantTradeNo` = 本系統的訂單號（我們填入的），每筆交易唯一
  - 廠商的交易流水號 = `TradeNo`（綠界）/ `TradeSeq`（藍新），為廠商端 ID
  - **冪等性 Key 使用 `MerchantTradeNo + TradeNo 的組合**（雙重保險）
  - 建立 `payment_webhook_logs` 表：
    ```sql
    CREATE TABLE payment_webhook_logs (
      id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
      vendor              VARCHAR(20) NOT NULL,    -- 'ecpay' / 'newebpay' / 'linepay'
      merchant_trade_no   VARCHAR(50) NOT NULL,
      vendor_trade_no     VARCHAR(50),
      received_at         DATETIME DEFAULT CURRENT_TIMESTAMP,
      raw_payload         TEXT,
      verification_result ENUM('pass', 'fail'),
      process_result      ENUM('processed', 'duplicated', 'error'),
      UNIQUE KEY uq_vendor_trade (vendor, merchant_trade_no, vendor_trade_no)
    );
    ```
  - 收到 Webhook 先 INSERT 到此表，若 Duplicate Key 則直接回 `1|OK`（幂等性處理），不再重複更新訂單

---

**Q-P.02｜Webhook 處理的時間限制**

- **工程師問題**：各廠商 Webhook 等待我們回應的超時時間是多少？如果資料庫寫入慢，超時後廠商會重試嗎？

- **PM 回覆（規格決策）**：

  | 廠商 | 回應超時限制 | 重試機制 |
  | --- | --- | --- |
  | 綠界 ECPay | 5 秒 | 最多重試 5 次，間隔 1 分鐘 |
  | 藍新 NewebPay | 10 秒 | 最多重試 3 次 |
  | LINE Pay | 10 秒 | 最多重試 3 次 |

  - **設計原則**：Webhook Endpoint 必須在 **2 秒內** 回應 `1|OK`（先驗簽、先寫 log、先更新訂單狀態），耗時的後續操作（開立發票、NT 發信）放入 **Queue Job** 非同步執行
  - Webhook Controller 的邏輯：驗簽 → 冪等性檢查 → 更新訂單狀態（Transaction）→ 回傳 `1|OK` → Queue 發票 + NT 任務
  - **不能在同步 Webhook 處理中呼叫外部 API**（發票 API、NT 發信 API）

---

**Q-P.03｜物流狀態 Polling 頻率設定**

- **工程師問題**：「物流廠商定期推送狀態 or 系統主動 Polling」，如果是主動 Polling，頻率多少？會不會觸發廠商 API 限流？

- **PM 回覆（規格決策）**：
  - **優先接受廠商 Webhook 推送**（主動推送 > 主動 Polling）
  - 廠商無 Webhook 或 Webhook 失敗時，才啟動主動 Polling
  - Polling 頻率：**每 2 小時**查詢一次狀態為「已出貨」或「配送中」的訂單
  - 批次查詢：每批最多 50 筆訂單（避免單次 API 請求過重）
  - 若廠商 API 返回 429（限流）：指數退避重試（1h, 2h, 4h），並 Alert Log

---

## 一頁式商店

---

**Q-LP.01｜SSR 的技術選擇：Nuxt、ViteSSG 還是 Laravel Blade？**

- **工程師問題**：前端是 Vue 3 + Vite，SSR 要怎麼做？需要額外引入 Nuxt.js 嗎？這個決策影響很大。

- **PM 回覆（規格決策）**：
  - **一頁式商店採用 Laravel Blade + Vue 3 Hydration 方案**（非 Nuxt）
  - 理由：一頁式商店是輕量 3 頁，頁面結構固定，使用 Laravel Inertia.js + Vue 3 SSR 即可，不需要完整 Nuxt.js 框架
  - 技術路徑：Laravel Inertia SSR（`php artisan inertia:start-ssr`）→ Node.js SSR Server 搭 Laravel 同跑
  - 如果 Inertia SSR 評估後有困難，降級方案：Laravel Blade 渲染骨架 HTML + Meta Tags，Vue 3 做 Client-side Hydration，關鍵 SEO 資訊（標題、描述、OG Tags）由 Blade 在 Server 端渲染
  - **工程師評估後決定最終方案**，但需確保 Google PageSpeed Insights LCP ≤ 2.5 秒

---

**Q-LP.02｜一頁式商店與主商店的庫存是共用的嗎？超賣風險？**

- **工程師問題**：同一產品在一頁式商店和主商店同時銷售，庫存共用嗎？如果兩邊同時下單，有超賣風險嗎？

- **PM 回覆（規格決策）**：
  - **庫存共用**（一頁式商店使用的是 `products.stock`，同一張表）
  - 超賣防護：建立訂單時使用 `UPDATE products SET stock = stock - 1 WHERE id = ? AND stock > 0`，若 `affected_rows = 0` 則表示庫存已 0，回傳 `409 OUT_OF_STOCK`
  - 一頁式商店和主商店使用**相同的訂單建立 API**，超賣保護邏輯統一

---

**Q-LP.03｜slug 的命名規則與驗證**

- **工程師問題**：`/lp/{slug}` 的 slug 如何產生？允許哪些字元？最長幾個字？和現有路由衝突怎麼處理？

- **PM 回覆（規格決策）**：
  - slug 由商家手動填入
  - 格式驗證（後端）：`/^[a-z0-9-_]{3,50}$/`（小寫字母、數字、連字號、底線，3-50 字元）
  - 前端輸入時自動將大寫轉小寫，空格轉 `-`
  - 唯一性：`landing_pages` 表 `slug` 欄位設 `UNIQUE INDEX`，重複時提示「此網址已被使用，請更換」
  - 保留字衝突（與系統路由衝突）：`api`、`admin`、`login`、`auth`、`webhook` 等為保留字，slug 設定頁面後端驗證拒絕

---

## Part 2 溫層/重量運費設定

---

**Q-2.01｜產品重量的預設值：如果商家沒有填產品重量欄位**

- **工程師問題**：重量費率以產品重量為基準，但如果商家沒有填產品重量，系統要怎麼計算？

- **PM 回覆（規格決策）**：
  - 產品中心（Part 2）`products` 表必須新增 `weight DECIMAL(8,3)` 欄位（單位：公斤，預設值 `NULL`）
  - 若使用「重量費率」計算，但產品 `weight = NULL`：
    - **結帳頁顯示警告**：`此訂單包含未設定重量的產品，運費以最低費率計算，請聯繫商家確認`
    - 後端以 `weight = 0` 計算（即計入最低重量區間）
  - 商家後台產品設定頁：若啟用了重量計費，產品重量欄位顯示 **`(必填)` 提示**（非強制驗證，不阻止儲存，但顯示醒目提示）

---

**Q-2.02｜購物車頁面是否即時顯示預估運費？計算時機？**

- **工程師問題**：溫層和重量的運費計算在「加入購物車時」還是「進入結帳頁時」？購物車頁有沒有預估運費顯示？

- **PM 回覆（規格決策）**：
  - **加入購物車頁不顯示預估運費**（尚未選擇物流方式/縣市，計算條件不足）
  - **進入結帳頁，選擇物流方式和收件縣市後**，即時呼叫 `/api/v1/orders/calculate-shipping` API 計算運費並顯示
  - 溫層 + 重量計算在此 API 中執行，每次消費者修改收件縣市或配送方式時重新呼叫
  - 購物車頁若有混合溫層產品，顯示 `<el-alert>` 溫層警示（「您的購物車包含不同溫層產品，結帳時將依最高溫層收取運費」）—— **但不顯示具體金額**

---

## 串接設定後台管理

---

**Q-I.01｜API 憑證的加密金鑰管理**

- **工程師問題**：AES-256 加密的金鑰放在哪裡？放在 `.env`？放在 DB？若金鑰洩露，所有商家的金流憑證都暴露，如何保護？

- **PM 回覆（規格決策）**：
  - 加密金鑰存放於 **伺服器環境變數** `.env`，`INTEGRATION_CIPHER_KEY=...`（永遠不進 Git）
  - 生產環境使用 **AWS Secrets Manager** 或 **HashiCorp Vault** 管理金鑰（不存入 `.env` 文件）
  - 加密方式：`openssl_encrypt($plaintext, 'AES-256-GCM', $key, 0, $iv, $tag)` + 將 `iv` 和 `tag` 一起儲存在 DB 欄位
  - API 回傳加密欄位時**永遠遮罩**（`HashKey: ****3F2A`，只顯示後 4 碼，前端無法取得明文）

---

**Q-I.02｜不同商家的 Webhook URL 如何隔離？**

- **工程師問題**：Webhook URL 格式是 `/api/webhooks/payment/{vendor}`，這個 URL 沒有商家 ID，如果平台上有多個商家，同一個 URL 怎麼區分是哪個商家的 Webhook？

- **PM 回覆（規格決策）**：
  - Webhook URL 必須包含商家識別資訊，調整格式為：
    `/api/webhooks/payment/{uuid_token}/{vendor}`
  - `uuid_token` 是每個商家的唯一 Webhook Token（UUID v4），儲存在 `integration_settings` 表
  - 商家的 Webhook URL 在設定頁面顯示時已包含此 Token：
    `https://shop.evomni.com/api/webhooks/payment/f47ac10b-58cc-4372-a567-0e02b2c3d479/ecpay`
  - 此 Token 不公開顯示在商家後台，僅在設定頁顯示並可點擊「重新產生」（重設 Token 需同步更新廠商 Webhook 設定）

---

> **文件版本歷程：**
> | 版本 | 日期 | 說明 |
> | --- | --- | --- |
> | v1.0 | 2026/04/28 | 初版，涵蓋 Part 3 / Part 6 / Part 4 / 金物流 / 一頁式商店 / 溫層運費 / 串接設定共 28 個 Q&A |
