# Evomni 通知信範本規格文件

> **文件說明**
> 本文件涵蓋 Evomni 電商系統所有需要提供的通知信範本，包含主旨、內文、參數說明與 CTA 規格。
> 商家可在後台自訂主旨與內文；本文件為系統預設範本。
>
> **參數格式**：`{parameter_name}`
> **條件顯示**：以中文括號標註於對應行／區塊下方，例：「（此行於 X = 0 時不顯示）」

---

## 目錄

- [一、訂單 & 退換貨通知信（14 種）](#一訂單--退換貨通知信)
- [二、會員相關通知信（7 種）](#二會員相關通知信)
- [三、方案管理通知信（8 種）](#三方案管理通知信)
- [四、一頁式商店通知信（5 種）](#四一頁式商店通知信)
- [五、顧客邀請信（1 種）](#五顧客邀請信)
- [六、訂單狀態 Tooltip 文案（closed 狀態）](#六訂單狀態-tooltip-文案)
- [附錄：參數總覽表](#附錄參數總覽表)

---

## 一、訂單 & 退換貨通知信

### 1-1 訂單建立通知（待付款）

| 屬性 | 內容 |
|---|---|
| **template_key** | `order_created` |
| **觸發時機** | 消費者完成結帳，訂單建立 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】您的訂單已建立，請完成付款 #{order_number}
```

**內文**
```
親愛的 {buyer_name} 您好，

感謝您在 {shop_name} 下單！您的訂單已成立，請於 {payment_deadline} 前完成付款，逾期訂單將自動取消。

━━━━━━━━━━━━━━━━━━━━
訂單編號：{order_number}
下單時間：{created_at}
付款期限：{payment_deadline}
━━━━━━━━━━━━━━━━━━━━

【訂單明細】
{order_items_list}

商品小計：{items_subtotal}
運費：{shipping_fee}
折扣：-{discount_amount}
點數折抵：-{points_deducted}
實付金額：{total_amount}

【付款方式】
{payment_method}

[立即前往付款] → {payment_url}

若您有任何問題，歡迎聯繫我們：{shop_service_email}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 | 範例 |
|---|---|---|
| `{shop_name}` | 商家名稱 | 好好生活選品 |
| `{buyer_name}` | 消費者姓名 | 王小明 |
| `{order_number}` | 訂單編號 | ORD-20260601-001 |
| `{created_at}` | 下單時間 | 2026/06/01 14:30 |
| `{payment_deadline}` | 付款期限（依付款方式計算）| 2026/06/01 15:00 |
| `{order_items_list}` | 商品清單，每行格式：商品名稱（規格）× 數量 = NT$金額，例：草莓果醬（250g）× 2 = NT$360；多品項換行排列 | 系統自動組合 |
| `{items_subtotal}` | 商品小計 | NT$1,200 |
| `{shipping_fee}` | 運費 | NT$60 |
| `{discount_amount}` | 折扣金額（0 時不顯示折扣行）| NT$100 |
| `{points_deducted}` | 點數折抵金額（0 時隱藏此行）| NT$50 |
| `{total_amount}` | 實付總金額 | NT$1,110 |
| `{payment_method}` | 付款方式 | 信用卡一次付清 |
| `{payment_url}` | 付款連結（信用卡 / ATM / 超商條碼）| https://... |
| `{shop_service_email}` | 商家客服信箱 | service@shop.com |

**CTA**：`[立即前往付款]` → `{payment_url}`（無付款連結時隱藏）

---

### 1-2 付款成功通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `order_paid` |
| **觸發時機** | 金流回調確認付款完成 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】付款成功！您的訂單 #{order_number} 正在處理中
```

**內文**
```
親愛的 {buyer_name} 您好，

您的訂單付款已確認，我們正在為您備貨中！

━━━━━━━━━━━━━━━━━━━━
訂單編號：{order_number}
付款時間：{paid_at}
付款金額：{paid_amount}
付款方式：{payment_method}
━━━━━━━━━━━━━━━━━━━━

【訂單明細】
{order_items_list}

[查看訂單狀態] → {order_detail_url}

感謝您的購買，若有任何問題請聯繫：{shop_service_email}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{paid_at}` | 付款確認時間 |
| `{paid_amount}` | 實際付款金額 |
| `{order_detail_url}` | 訂單詳情頁連結 |

**CTA**：`[查看訂單狀態]` → `{order_detail_url}`

---

### 1-3 訂單處理中通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `order_processing` |
| **觸發時機** | 商家後台將訂單標記為處理中 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】您的訂單 #{order_number} 正在備貨中
```

**內文**
```
親愛的 {buyer_name} 您好，

您的訂單已進入備貨程序，我們會盡快為您出貨！

訂單編號：{order_number}

[查看訂單狀態] → {order_detail_url}

{shop_name} 敬上
```

---

### 1-4 出貨通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `order_shipped` |
| **觸發時機** | 後台操作出貨 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】您的訂單 #{order_number} 已出貨！
```

**內文**
```
親愛的 {buyer_name} 您好，

您的訂單已出貨，預計 {estimated_arrival} 送達。

━━━━━━━━━━━━━━━━━━━━
訂單編號：{order_number}
出貨時間：{shipped_at}
物流廠商：{shipping_company}
物流單號：{tracking_number}
預計送達：{estimated_arrival}
━━━━━━━━━━━━━━━━━━━━

[查詢物流狀態] → {tracking_url}

收件地址：{shipping_address}

若您有任何問題，歡迎聯繫：{shop_service_email}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{shipped_at}` | 出貨時間 |
| `{shipping_company}` | 物流廠商名稱（黑貓 / 7-11 / 全家 等）|
| `{tracking_number}` | 物流追蹤單號 |
| `{estimated_arrival}` | 商家出貨操作時填寫的預計送達日期（非系統自動計算）|
| `{tracking_url}` | 物流查詢連結 |
| `{shipping_address}` | 完整收件地址 |

**CTA**：`[查詢物流狀態]` → `{tracking_url}`

---

### 1-5 配送中通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `order_delivering` |
| **觸發時機** | 物流更新為配送中 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】您的訂單 #{order_number} 配送員正在送貨中
```

**內文**
```
親愛的 {buyer_name} 您好，

您的包裹目前正在配送途中，請保持電話暢通以便配送員聯繫。

訂單編號：{order_number}
物流單號：{tracking_number}
配送廠商：{shipping_company}

[即時追蹤包裹] → {tracking_url}

{shop_name} 敬上
```

---

### 1-6 送達確認通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `order_delivered` |
| **觸發時機** | 物流確認商品已送達（訂單狀態變更為「已送達」）|
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】您的訂單 #{order_number} 已送達，請確認收貨
```

**內文**
```
親愛的 {buyer_name} 您好，

您訂購的商品已送達！請確認收貨，若商品有任何問題，請於確認前聯繫我們。

━━━━━━━━━━━━━━━━━━━━
訂單編號：{order_number}
送達時間：{delivered_at}
━━━━━━━━━━━━━━━━━━━━

[確認收貨] → {confirm_receipt_url}

提醒：若您於 7 天內未確認，系統將自動完成訂單並計入消費紀錄。

若有任何問題，歡迎聯繫：{shop_service_email}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{delivered_at}` | 物流確認送達時間 |
| `{confirm_receipt_url}` | 確認收貨頁面連結（會員導向訂單詳情頁；訪客導向訪客查詢頁）|

**CTA**：`[確認收貨]` → `{confirm_receipt_url}`

---

### 1-7 訂單完成通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `order_completed` |
| **觸發時機** | 訂單確認完成 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】訂單 #{order_number} 已完成，感謝您的購買！
```

**內文**
```
親愛的 {buyer_name} 您好，

您的訂單已完成，感謝您選擇 {shop_name}！

訂單編號：{order_number}
完成時間：{completed_at}
🎁 本次消費累積點數：+{points_earned} 點
目前點數餘額：{points_balance} 點
（此區塊於本次累積點數為 0 時不顯示）

期待您的下次光臨，若對本次購物有任何建議，歡迎告訴我們！

[再次購買] → {shop_url}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{completed_at}` | 訂單完成時間 |
| `{points_earned}` | 本次累積點數（0 時隱藏點數區塊）|
| `{points_balance}` | 目前點數餘額 |
| `{shop_url}` | 商家官網首頁 |

---

### 1-8 訂單取消通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `order_cancelled` |
| **觸發時機** | 訂單被取消 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】訂單 #{order_number} 已取消
```

**內文**
```
親愛的 {buyer_name} 您好，

您的訂單已取消。

訂單編號：{order_number}
取消時間：{cancelled_at}
取消原因：{cancel_reason}

退款金額：{refund_amount}
退款方式：{refund_method}
預計退款時間：{refund_estimated_date}
（此區塊於退款金額為 0 時不顯示）

已退回點數：+{points_returned} 點
（此行於退回點數為 0 時不顯示）

若有任何疑問，請聯繫：{shop_service_email}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{cancelled_at}` | 取消時間 |
| `{cancel_reason}` | 取消原因（商家備註 or 系統自動）|
| `{refund_amount}` | 退款金額（0 時隱藏退款區塊）|
| `{refund_method}` | 退款方式（信用卡原路退回 / 銀行轉帳 等）|
| `{refund_estimated_date}` | 預計退款到帳日期 |
| `{points_returned}` | 退回點數（0 時隱藏）|

---

### 1-9 退貨申請收到通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `return_request_received` |
| **觸發時機** | 消費者提交退換貨申請 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】您的退換貨申請 #{return_number} 已收到
```

**內文**
```
親愛的 {buyer_name} 您好，

我們已收到您的退換貨申請，將於 {review_sla} 個工作天內完成審核並通知您。

━━━━━━━━━━━━━━━━━━━━
退換貨申請編號：{return_number}
對應訂單編號：{order_number}
申請類型：{return_type}（退貨 / 換貨）
申請原因：{return_reason}
申請時間：{created_at}
━━━━━━━━━━━━━━━━━━━━

[查看申請狀態] → {return_detail_url}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{return_number}` | 退換貨申請編號 |
| `{review_sla}` | 審核天數，商家在後台「退換貨設定」中設定（預設 3 個工作天）|
| `{return_type}` | 申請類型：退貨 or 換貨 |
| `{return_reason}` | 申請原因 |
| `{return_detail_url}` | 退換貨申請詳情頁連結 |

---

### 1-10 退貨申請核准通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `return_request_approved` |
| **觸發時機** | 商家核准退換貨申請 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】退換貨申請 #{return_number} 已核准，請依指示寄回商品
```

**內文**
```
親愛的 {buyer_name} 您好，

您的退換貨申請已核准！請依照以下指示寄回商品。

申請編號：{return_number}
核准時間：{approved_at}

【退貨寄送說明】
請於 {return_deadline} 前將商品寄至：
{return_address}
收件人：{return_contact}
電話：{return_phone}

注意事項：
- 請保持商品原包裝完整
- 請附上此申請編號於包裹內
- 建議使用有追蹤號碼的寄送方式

[查看申請詳情] → {return_detail_url}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{approved_at}` | 核准時間 |
| `{return_deadline}` | 退貨寄送期限 |
| `{return_address}` | 退貨收件地址 |
| `{return_contact}` | 退貨收件人 |
| `{return_phone}` | 退貨收件電話 |

---

### 1-11 退貨申請拒絕通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `return_request_rejected` |
| **觸發時機** | 商家拒絕退換貨申請 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】退換貨申請 #{return_number} 處理結果通知
```

**內文**
```
親愛的 {buyer_name} 您好，

感謝您的耐心等待，關於您的退換貨申請，我們很遺憾無法受理。

申請編號：{return_number}
拒絕原因：{reject_reason}

如有任何疑問，歡迎直接聯繫我們：
{shop_service_email}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{reject_reason}` | 商家填寫的拒絕原因 |

---

### 1-12 退款完成通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `refund_completed` |
| **觸發時機** | 退款處理完成 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】訂單 #{order_number} 退款已完成
```

**內文**
```
親愛的 {buyer_name} 您好，

您的退款已處理完成，請確認款項是否入帳。

━━━━━━━━━━━━━━━━━━━━
退款金額：{refund_amount}
退款方式：{refund_method}
退款時間：{refunded_at}
預計入帳：信用卡退款通常需 7–14 個工作天，實際入帳日依各家銀行作業時間為準
（此行僅於付款方式為「信用卡原路退回」時顯示）
━━━━━━━━━━━━━━━━━━━━

退回點數：+{points_returned} 點（已存入您的帳戶）
（此行於退回點數為 0 時不顯示）

若款項遲遲未入帳，請先確認您的銀行帳戶，或聯繫：{shop_service_email}

{shop_name} 敬上
```

---

### 1-13 換貨出貨通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `exchange_shipped` |
| **觸發時機** | 換貨商品出貨 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】換貨商品 #{return_number} 已出貨！
```

**內文**
```
親愛的 {buyer_name} 您好，

您申請的換貨商品已出貨，預計 {estimated_arrival} 送達。

申請編號：{return_number}
換貨商品：{exchange_product_name}
物流廠商：{shipping_company}
物流單號：{tracking_number}

[查詢物流狀態] → {tracking_url}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{exchange_product_name}` | 換貨商品名稱 + 規格 |

---

### 1-14 `closed` 狀態訂單通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `order_closed` |
| **觸發時機** | 訂單被標記為已關閉 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】訂單 #{order_number} 已關閉
```

**內文**
```
親愛的 {buyer_name} 您好，

您的訂單已關閉。

訂單編號：{order_number}
關閉時間：{closed_at}
關閉原因：{close_reason}

退款金額：{refund_amount}
退款方式：{refund_method}
（此區塊於退款金額為 0 時不顯示）

本訂單已進入終態，不再接受退換貨申請。若有疑問請聯繫：{shop_service_email}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{closed_at}` | 關閉時間 |
| `{close_reason}` | 關閉原因（系統自動帶入，固定為：全額退款完成後自動關閉）|

---

## 二、會員相關通知信

### 2-1 入會歡迎信

| 屬性 | 內容 |
|---|---|
| **template_key** | `member_welcome` |
| **觸發時機** | 消費者完成會員註冊並驗證 Email |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】歡迎加入會員！您的專屬好禮已準備好了
```

**內文**
```
親愛的 {member_name} 您好，

恭喜您成為 {shop_name} 的正式會員！

您目前的會員等級：{member_level}

🎁 入會禮：已為您存入 {welcome_points} 點數，可於下次消費折抵使用
（此行於入會贈點為 0 時不顯示）

🎫 入會優惠券：{welcome_coupon_code}
   折扣內容：{welcome_coupon_description}
   有效期限：{welcome_coupon_expires_at}
（此區塊於無入會優惠券時不顯示）

[前往會員中心] → {member_center_url}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{member_name}` | 會員姓名 |
| `{member_level}` | 會員等級名稱 |
| `{welcome_points}` | 入會贈送點數（0 時隱藏）|
| `{welcome_coupon_code}` | 入會優惠券碼（空值時隱藏）|
| `{welcome_coupon_description}` | 優惠券折扣說明 |
| `{welcome_coupon_expires_at}` | 優惠券有效期限 |
| `{member_center_url}` | 會員中心連結 |

---

### 2-2 會員升等通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `member_level_upgraded` |
| **觸發時機** | 會員升等時 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】恭喜升等！您已成為 {new_level} 會員 🎉
```

**內文**
```
親愛的 {member_name} 您好，

恭喜您升等為 {new_level} 會員！感謝您對 {shop_name} 的支持與信任。

舊等級：{old_level}
新等級：{new_level}
升等時間：{upgraded_at}
等級有效期限：{level_expires_at}

【{new_level} 專屬權益】
{level_benefits}

🎁 升等禮：已為您存入 {upgrade_points} 點數
（此行於升等禮點數為 0 時不顯示）

[查看會員權益] → {member_center_url}

感謝您的支持，繼續享受專屬好禮！

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{old_level}` | 升等前的等級名稱 |
| `{new_level}` | 升等後的等級名稱 |
| `{upgraded_at}` | 升等時間 |
| `{level_expires_at}` | 等級有效期限 |
| `{level_benefits}` | 商家在後台「會員等級管理」中設定的等級描述文字 |
| `{upgrade_points}` | 升等禮點數（0 時隱藏）|

---

### 2-3 會員降等通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `member_level_downgraded` |
| **觸發時機** | 年度保級條件未達成，會員降等 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】您的會員等級已調整為 {new_level}
```

**內文**
```
親愛的 {member_name} 您好，

感謝您持續支持 {shop_name}。由於本年度累計消費未達保級門檻，您的會員等級已調整。

原等級：{old_level}
目前等級：{new_level}
調整時間：{downgraded_at}

【如何升回 {old_level}？】
累計消費達 {upgrade_threshold} 即可升等

我們期待您的再次光臨，祝您購物愉快！

[前往購物] → {shop_url}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{downgraded_at}` | 降等時間 |
| `{upgrade_threshold}` | 升回原等級所需累計消費金額 |

---

### 2-4 保級預警通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `member_level_retention_warning` |
| **觸發時機** | 距離年度重置 30 天且累計消費尚未達保級門檻 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】您的 {current_level} 等級即將到期，還差 {amount_needed} 就能保級！
```

**內文**
```
親愛的 {member_name} 您好，

您目前的 {current_level} 等級將於 {level_expires_at} 到期，距今僅剩 {days_left} 天！

本年度累計消費：{current_yearly_spent}
保級門檻：{retention_threshold}
還需消費：{amount_needed}

把握最後機會，繼續享受 {current_level} 的專屬好禮！

[前往購物] → {shop_url}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{current_level}` | 目前等級名稱 |
| `{level_expires_at}` | 等級到期日 |
| `{days_left}` | 距到期天數 |
| `{current_yearly_spent}` | 本年度累計消費金額 |
| `{retention_threshold}` | 保級所需累計消費金額 |
| `{amount_needed}` | 還需消費金額（`retention_threshold - current_yearly_spent`）|

---

### 2-5 點數即將到期通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `member_points_expiring` |
| **觸發時機** | 點數到期前 14 天 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】您有 {expiring_points} 點即將於 {expiry_date} 到期，快來使用吧！
```

**內文**
```
親愛的 {member_name} 您好，

提醒您，您的點數即將到期，請盡快使用以免損失！

即將到期點數：{expiring_points} 點
到期日：{expiry_date}
目前總點數：{total_points} 點

每 {exchange_rate_points} 點可折抵 NT${exchange_rate_value}

[立即使用點數購物] → {shop_url}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{expiring_points}` | 即將到期的點數數量 |
| `{expiry_date}` | 到期日 |
| `{total_points}` | 目前總點數餘額 |
| `{exchange_rate_points}` | 點數兌換比率（X 點）|
| `{exchange_rate_value}` | 點數兌換金額（Y 元）|

---

### 2-6 生日雙倍點數通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `member_birthday_bonus` |
| **觸發時機** | 會員生日當月第一天自動發送 |
| **收件人** | 消費者 |
| **方案限制** | 進階電商包限定（啟航方案不觸發）|

**主旨**
```
【{shop_name}】生日快樂 🎂 本月消費享雙倍點數！
```

**內文**
```
親愛的 {member_name} 您好，

生日快樂！感謝您一路以來的支持，{shop_name} 為您獻上生日好禮！

🎁 本月生日特權：消費享雙倍點數回饋
活動期間：{birthday_month_start} – {birthday_month_end}

🎫 生日優惠券：{birthday_coupon_code}
   {birthday_coupon_description}
   有效期限：{birthday_coupon_expires_at}
（此區塊於無生日優惠券時不顯示）

[前往購物] → {shop_url}

祝您生日快樂，{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{birthday_month_start}` | 生日月份起始日（如 2026/06/01）|
| `{birthday_month_end}` | 生日月份結束日（如 2026/06/30）|
| `{birthday_coupon_code}` | 生日優惠券碼（空值時隱藏）|
| `{birthday_coupon_description}` | 生日優惠券說明 |
| `{birthday_coupon_expires_at}` | 生日優惠券有效期限 |

---

### 2-7 黑名單通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `member_blacklisted` |
| **觸發時機** | 商家將會員加入黑名單 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】您的帳號狀態通知
```

**內文**
```
親愛的會員您好，

您的 {shop_name} 帳號目前已被暫時限制使用，無法進行新訂單。

若您認為此限制有誤，或需要進一步了解，請聯繫我們：
{shop_service_email}

{shop_name} 敬上
```

> **設計說明**：黑名單信件不揭露具體原因，避免爭議，只提供客服聯繫方式。商家如需說明原因，可在後台備註欄自行撰寫客服腳本。

---

## 三、方案管理通知信

> **收件人說明（13-3 定案）**：到期系列通知（3-1 至 3-5）收件人為商家群組信箱，包含 Owner 及其指定的通知成員；非單一 Owner 帳號。

### 3-1 方案即將到期通知（到期前 90 天）

| 屬性 | 內容 |
|---|---|
| **template_key** | `subscription_expiring_90d` |
| **觸發時機** | 方案到期前 90 天 |
| **收件人** | 商家群組信箱（含 Owner，依 13-3 定案）|

**主旨**
```
【Evomni】您的 {plan_name} 方案將於 {expires_at} 到期，建議提前規劃續約
```

**內文**
```
您好，

提醒您，您的 Evomni {plan_name} 方案將於 {expires_at} 到期（距今約 90 天）。建議您提前與營運輔導顧問聯繫，安排續約事宜。

方案名稱：{plan_name}
到期日期：{expires_at}
目前商店：{shop_domain}

[預約方案諮詢] → https://www.webtech.com.tw/contact

Evomni 團隊 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{plan_name}` | 方案名稱（啟航方案 / 進階電商包）|
| `{expires_at}` | 方案到期日 |
| `{shop_domain}` | 商家網域 |

---

### 3-2 方案即將到期通知（到期前 30 天）

| 屬性 | 內容 |
|---|---|
| **template_key** | `subscription_expiring_30d` |
| **觸發時機** | 方案到期前 30 天 |
| **收件人** | 商家群組信箱（含 Owner，依 13-3 定案）|

**主旨**
```
【Evomni】您的 {plan_name} 方案將於 {expires_at} 到期，請盡早聯繫顧問續約
```

**內文**
```
您好，

提醒您，您的 Evomni {plan_name} 方案將於 {expires_at} 到期（距今 30 天），為避免服務中斷，請盡早聯繫營運輔導顧問安排續約。

方案名稱：{plan_name}
到期日期：{expires_at}
目前商店：{shop_domain}

到期後若未續約，將進入 14 天寬限期，寬限期結束後部分功能將受限制。

[預約方案諮詢] → https://www.webtech.com.tw/contact

Evomni 團隊 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{plan_name}` | 方案名稱（啟航方案 / 進階電商包）|
| `{expires_at}` | 方案到期日 |
| `{shop_domain}` | 商家網域 |

---

### 3-3 方案即將到期通知（到期前 7 天）

| 屬性 | 內容 |
|---|---|
| **template_key** | `subscription_expiring_7d` |
| **觸發時機** | 方案到期前 7 天 |
| **收件人** | 商家群組信箱（含 Owner，依 13-3 定案）|

**主旨**
```
【Evomni】⚠️ 緊急提醒：您的 {plan_name} 方案將於 7 天後到期
```

**內文**
```
您好，

您的 Evomni {plan_name} 方案僅剩 7 天到期（{expires_at}），請立即聯繫營運輔導顧問確認續約，以確保服務不中斷。

方案名稱：{plan_name}
到期日期：{expires_at}

[預約方案諮詢] → https://www.webtech.com.tw/contact

Evomni 團隊 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{plan_name}` | 方案名稱（啟航方案 / 進階電商包）|
| `{expires_at}` | 方案到期日 |

---

### 3-4 方案即將到期通知（到期前 1 天）

| 屬性 | 內容 |
|---|---|
| **template_key** | `subscription_expiring_1d` |
| **觸發時機** | 方案到期前 1 天 |
| **收件人** | 商家群組信箱（含 Owner，依 13-3 定案）|

**主旨**
```
【Evomni】🚨 明日到期：{plan_name} 方案請立即確認續約
```

**內文**
```
您好，

您的 Evomni {plan_name} 方案將於明日（{expires_at}）到期，請立即聯繫您的營運輔導顧問確認續約事宜。

到期後將進入 14 天寬限期，期間功能正常運作；寬限期結束後部分功能將受限制。

[預約方案諮詢] → https://www.webtech.com.tw/contact

Evomni 團隊 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{plan_name}` | 方案名稱（啟航方案 / 進階電商包）|
| `{expires_at}` | 方案到期日 |

---

### 3-5 方案到期通知（到期當日）

| 屬性 | 內容 |
|---|---|
| **template_key** | `subscription_expired` |
| **觸發時機** | 方案到期當日 09:00 |
| **收件人** | 商家群組信箱（含 Owner，依 13-3 定案）|

**主旨**
```
【Evomni】您的 {plan_name} 方案今日到期，目前享有 14 天寬限期
```

**內文**
```
您好，

您的 Evomni {plan_name} 方案已於今日（{expires_at}）到期。

目前進入 14 天寬限期（至 {grace_period_ends_at}），期間所有功能維持正常運作。

寬限期結束後，部分功能將受到限制，請盡快聯繫您的營運輔導顧問確認續約。

[預約方案諮詢] → https://www.webtech.com.tw/contact

Evomni 團隊 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{plan_name}` | 方案名稱（啟航方案 / 進階電商包）|
| `{expires_at}` | 方案到期日 |
| `{grace_period_ends_at}` | 寬限期結束日（到期日 + 14 天）|

---

### 3-6 升級詢問確認信（寄給商家）


| 屬性 | 內容 |
|---|---|
| **template_key** | `upgrade_inquiry_confirmed` |
| **觸發時機** | 商家送出升級詢問表單 |
| **收件人** | 商家（Owner）|

**主旨**
```
【Evomni】您的升級詢問已收到，我們將盡快與您聯繫
```

**內文**
```
您好，

我們已收到您的升級詢問，Evomni 業務團隊將於 1–2 個工作天內與您聯繫。

━━━━━━━━━━━━━━━━━━━━
詢問編號：{inquiry_number}
詢問時間：{created_at}
目前方案：{current_plan}
希望升級至：{target_plan}
留言內容：{inquiry_message}
━━━━━━━━━━━━━━━━━━━━

如有緊急需求，請直接聯繫：support@evomni.com

Evomni 團隊 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{inquiry_number}` | 詢問編號 |
| `{current_plan}` | 目前方案名稱 |
| `{target_plan}` | 希望升級的方案名稱 |
| `{inquiry_message}` | 商家填寫的詢問留言 |

---

### 3-7 升級詢問通知（寄給 Evomni 業務）

| 屬性 | 內容 |
|---|---|
| **template_key** | `upgrade_inquiry_internal` |
| **觸發時機** | 商家送出升級詢問表單 |
| **收件人** | Evomni 業務團隊（`sales@evomni.com`）|

**主旨**
```
【待處理】新升級詢問 #{inquiry_number}｜{shop_domain}
```

**內文**
```
有新的升級詢問待處理：

━━━━━━━━━━━━━━━━━━━━
詢問編號：{inquiry_number}
商家名稱：{shop_name}
商家網域：{shop_domain}
聯繫 Email：{owner_email}
聯繫電話：{owner_phone}
目前方案：{current_plan}
希望升級至：{target_plan}
到期日：{current_plan_expires_at}
留言：{inquiry_message}
━━━━━━━━━━━━━━━━━━━━

[前往後台查看] → {admin_inquiry_url}
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{owner_email}` | 商家 Owner Email |
| `{owner_phone}` | 商家聯繫電話 |
| `{current_plan_expires_at}` | 目前方案到期日 |
| `{admin_inquiry_url}` | Evomni 內部後台的詢問詳情頁連結 |

---

### 3-8 升級成功通知

| 屬性 | 內容 |
|---|---|
| **template_key** | `subscription_upgraded` |
| **觸發時機** | Evomni 內部完成方案升級 |
| **收件人** | 商家（Owner）|

**主旨**
```
【Evomni】恭喜升級成功！您的 {new_plan} 方案已啟用
```

**內文**
```
您好，

恭喜！您的 Evomni 方案已成功升級。

升級前：{old_plan}
升級後：{new_plan}
生效時間：{activated_at}
新方案到期日：{new_expires_at}

【新方案專屬功能】
{new_plan_features}

立即前往後台體驗新功能：{admin_url}

感謝您選擇 Evomni，如有任何問題請聯繫您的營運輔導顧問。

Evomni 團隊 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{old_plan}` | 升級前方案名稱 |
| `{new_plan}` | 升級後方案名稱 |
| `{activated_at}` | 新方案生效時間 |
| `{new_expires_at}` | 新方案到期日 |
| `{new_plan_features}` | Evomni 系統依方案定義靜態帶入，非商家自訂 |
| `{admin_url}` | 商家後台首頁連結 |

---

## 四、一頁式商店通知信

### 4-1 LP 訂單確認信

| 屬性 | 內容 |
|---|---|
| **template_key** | `lp_order_created` |
| **觸發時機** | 消費者於 LP 完成結帳 |
| **收件人** | 消費者 |
| **設定範圍** | 各一頁式商店獨立設定，不繼承主站範本 |

**主旨**
```
【{shop_name}】感謝訂購！您的訂單 #{order_number} 已建立
```

**內文**
```
親愛的 {buyer_name} 您好，

感謝您訂購 {product_name}！

━━━━━━━━━━━━━━━━━━━━
訂單編號：{order_number}
商品：{product_name}
數量：{quantity}
金額：{total_amount}
付款方式：{payment_method}
━━━━━━━━━━━━━━━━━━━━

[立即完成付款] → {payment_url}
（此 CTA 於付款方式為「貨到付款」時不顯示）

若有任何問題，請聯繫：{shop_service_email}

{shop_name} 敬上
```

---

### 4-2 LP 付款成功確認信

| 屬性 | 內容 |
|---|---|
| **template_key** | `lp_order_paid` |
| **觸發時機** | LP 金流回調確認付款 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】付款成功！訂單 #{order_number} 正在備貨中
```

**內文**
```
親愛的 {buyer_name} 您好，

您的付款已確認，我們正在為您準備商品！

訂單編號：{order_number}
付款金額：{paid_amount}
商品：{product_name}
預計出貨：{estimated_ship_date}

{shop_name} 敬上
```

---

### 4-3 LP 出貨通知信

| 屬性 | 內容 |
|---|---|
| **template_key** | `lp_order_shipped` |
| **觸發時機** | LP 訂單出貨 |
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】您的 {product_name} 已出貨！
```

**內文**
```
親愛的 {buyer_name} 您好，

您訂購的商品已出貨，預計 {estimated_arrival} 送達。

訂單編號：{order_number}
物流廠商：{shipping_company}
物流單號：{tracking_number}

[查詢物流] → {tracking_url}

{shop_name} 敬上
```

---

### 4-4 LP 新會員歡迎信（含密碼設定連結）

| 屬性 | 內容 |
|---|---|
| **template_key** | `lp_member_welcome` |
| **觸發時機** | LP 訪客完成結帳後系統自動建立會員帳號（場景②）或 CRM 聯絡人點擊加入（場景③）|
| **收件人** | 消費者 |

**主旨**
```
【{shop_name}】設定密碼，開啟您的會員帳號
```

**內文**
```
親愛的 {buyer_name} 您好，

感謝您在 {shop_name} 購物！我們已為您建立會員帳號，設定密碼後即可享有：

✓ 快速帶入收件資料
✓ 查詢歷史訂單
✓ 累積點數回饋

[立即設定密碼] → {set_password_link}

此連結將於 {link_expires_at} 後失效（72 小時）。連結過期後，請至登入頁點選「忘記密碼」重新設定密碼，無需聯繫商家。

若您並未在 {shop_name} 購物，請忽略此信。

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{set_password_link}` | 一次性密碼設定連結（72 小時有效）|
| `{link_expires_at}` | 連結到期時間 |

**CTA**：`[立即設定密碼]` → `{set_password_link}`（按鈕顏色建議主色系）

---

### 4-5 KOL 報表分享通知信

| 屬性 | 內容 |
|---|---|
| **template_key** | `lp_kol_report_shared` |
| **觸發時機** | 商家點擊「發送報表連結給 KOL」|
| **收件人** | KOL（商家自填 Email）|

**主旨**
```
【{shop_name}】您的合作業績報表已更新，立即查看
```

**內文**
```
Hi {kol_name}，

{shop_name} 已與您分享合作業績報表，歡迎查看您的最新業績數據！

[查看業績報表] → {report_link}

報表有效期限：{report_expires_at}
（連結到期後，請聯繫商家重新取得）

若有任何問題，請聯繫：{shop_service_email}

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{kol_name}` | KOL 姓名 / 暱稱（商家填寫）|
| `{report_link}` | KOL 唯讀業績報表連結（含 Token）|
| `{report_expires_at}` | 報表連結有效期限（預設 30 天）|

**CTA**：`[查看業績報表]` → `{report_link}`

---

## 五、顧客邀請信

### 5-1 後台邀請顧客成為會員

| 屬性 | 內容 |
|---|---|
| **template_key** | `member_invitation` |
| **觸發時機** | 商家從後台發送會員邀請給顧客 |
| **收件人** | 被邀請的顧客 |

**主旨**
```
【{shop_name}】邀請您加入會員，享受專屬優惠！
```

**內文**
```
親愛的 {recipient_name} 您好，

{shop_name} 誠摯邀請您加入會員，成為會員後即可享有：

✓ 消費累積點數，折抵現金
✓ 會員專屬優惠與活動
✓ 快速查詢訂單記錄
✓ 🎁 加入即送 {welcome_points} 點數（限新會員，{welcome_points} = 0 時不顯示）

[立即加入會員] → {register_url}

此邀請連結將於 {link_expires_at} 後失效（30 天有效），逾期請向商家重新申請。

若您不希望收到此類信件，請忽略本信，您的資料不會有任何變動。

{shop_name} 敬上
```

**參數說明**

| 參數 | 說明 |
|---|---|
| `{recipient_name}` | 被邀請者姓名（商家 CRM 中的顧客名稱）|
| `{welcome_points}` | 入會贈送點數（0 時隱藏此行）|
| `{register_url}` | 含 Token 的一次性註冊連結 |
| `{link_expires_at}` | 邀請連結到期時間（發送後 30 天）|

**CTA**：`[立即加入會員]` → `{register_url}`

> **主旨可客製化說明**：主旨預設格式為「【{shop_name}】邀請您加入會員，享受專屬優惠！」，商家可在後台範本設定頁自行修改主旨文字，`{shop_name}` 仍可作為參數使用。

---

## 六、訂單狀態 Tooltip 文案

> **說明**：依 Evomni UX 規範 R8，狀態標籤需提供三層 Tooltip 說明。以下為所有訂單狀態的標準文案，含本次新增的 `closed` 狀態。

### `closed` 狀態 Tooltip

| 層次 | 內容 |
|---|---|
| **What（這是什麼）** | 此訂單已關閉。通常發生在訂單全額退款完成後，或由客服人工終結訂單流程。 |
| **Impact（影響什麼）** | 此訂單已進入最終狀態，不再接受退換貨申請，亦不計入有效消費或點數累積。 |
| **Next Step（如何改變）** | 終態，無法變更。如有疑問請聯繫客服。 |

### 完整訂單狀態 Tooltip 對照表（含 closed）

| 狀態 | What | Impact | Next Step |
|---|---|---|---|
| `pending_payment` 待付款 | 訂單已建立，等待消費者完成付款。 | 庫存已暫時保留；逾期未付款將自動取消並釋放庫存。 | 請消費者於期限內完成付款。 |
| `paid` 已付款 | 付款已確認，等待商家備貨。 | 訂單已納入銷售統計；點數將於訂單完成後發放。 | 請盡快安排出貨。 |
| `processing` 處理中 | 商家已確認訂單並開始備貨。 | 訂單進入出貨流程，消費者無法自行取消。 | 備貨完成後請操作出貨。 |
| `shipped` 已出貨 | 商品已交付物流，正在配送途中。 | 消費者可使用物流單號追蹤包裹。 | 等待物流配送完成。 |
| `delivering` 配送中 | 物流人員正在配送商品。 | 消費者應保持電話暢通。 | 等待消費者確認收貨。 |
| `delivered` 已送達 | 商品已送達收件地址。 | 等待消費者確認收貨；逾期系統自動完成訂單。 | 消費者確認收貨後訂單完成。 |
| `completed` 已完成 | 消費者已確認收貨，訂單完成。 | 點數已發放；訂單計入消費統計。 | 終態，可申請退換貨（依退換貨政策）。 |
| `cancelled` 已取消 | 訂單已取消。 | 庫存已釋放；已付款者將依退款政策退款。 | 終態，如需重新購買請重新下單。 |
| `closed` 已關閉 | 此訂單已關閉。通常發生在全額退款完成後，或由客服人工終結訂單流程。 | 不再接受退換貨申請，不計入有效消費及點數累積。 | 終態，無法變更。如有疑問請聯繫客服。 |

---

## 附錄：參數總覽表

### 商家 / 系統通用參數

| 參數 | 說明 | 來源 |
|---|---|---|
| `{shop_name}` | 商家名稱 | 電商設定 > 基本設定 |
| `{shop_domain}` | 商家網域 | 電商設定 > 基本設定 |
| `{shop_url}` | 商家官網首頁 URL | 系統自動組合 |
| `{shop_service_email}` | 商家客服信箱 | 電商設定 > 基本設定 |
| `{admin_url}` | 商家後台首頁 URL | 系統自動組合 |

### 消費者 / 會員通用參數

| 參數 | 說明 |
|---|---|
| `{buyer_name}` | 消費者姓名（訂單收件人）|
| `{member_name}` | 會員姓名（帳號資料）|
| `{member_email}` | 會員 Email |
| `{member_level}` | 會員等級名稱 |
| `{points_balance}` | 目前點數餘額 |
| `{member_center_url}` | 會員中心頁面連結 |

### 訂單通用參數

| 參數 | 說明 |
|---|---|
| `{order_number}` | 訂單編號 |
| `{created_at}` | 訂單建立時間 |
| `{order_items_list}` | 訂單商品清單；每行格式：商品名稱（規格）× 數量 = NT$金額，例：草莓果醬（250g）× 2 = NT$360；多品項換行排列；使用訂單成立時的快照資料，不從現行商品目錄取值 |
| `{items_subtotal}` | 商品小計 |
| `{shipping_fee}` | 運費 |
| `{discount_amount}` | 折扣金額 |
| `{total_amount}` | 實付總金額 |
| `{payment_method}` | 付款方式名稱 |
| `{order_detail_url}` | 訂單詳情頁連結 |

### 參數使用規則

1. **必填參數**：如 `{order_number}`、`{shop_name}` — 系統一定會帶入，不可留空
2. **條件顯示參數**：如 `{points_earned}`、`{discount_amount}` — 值為 0 或空值時，對應區塊不顯示
3. **商家可自訂文字**：主旨與內文商家可在後台自訂，但參數格式 `{parameter_name}` 必須保留，系統才能正確替換
4. **HTML 格式**：實際信件為 HTML 格式，本文件以純文字呈現內容結構，設計師依此製作 HTML 模板
