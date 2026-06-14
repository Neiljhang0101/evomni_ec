// PageNotificationTemplates — 通知信範本管理模組
// 範本資料由 PRD_V3/Evomni_通知信範本規格.md 解析產生（35 種範本）。
// 同時供 html/通知信範本管理.html（獨立頁）與 index.html（整合 App）使用。

const NOTIFY_CATEGORIES = /*__TEMPLATES_DATA__*/ [
 {
  "name": "訂單 & 退換貨通知信",
  "full": "一、訂單 & 退換貨通知信",
  "templates": [
   {
    "num": "1-1",
    "name": "訂單建立通知（待付款）",
    "key": "order_created",
    "trigger": "消費者完成結帳，訂單建立",
    "recipient": "消費者",
    "subject": "【{shop_name}】您的訂單已建立，請完成付款 #{order_number}",
    "body": "親愛的 {buyer_name} 您好，\n\n感謝您在 {shop_name} 下單！您的訂單已成立，請於 {payment_deadline} 前完成付款，逾期訂單將自動取消。\n\n━━━━━━━━━━━━━━━━━━━━\n訂單編號：{order_number}\n下單時間：{created_at}\n付款期限：{payment_deadline}\n━━━━━━━━━━━━━━━━━━━━\n\n【訂單明細】\n{order_items_list}\n\n商品小計：{items_subtotal}\n運費：{shipping_fee}\n折扣：-{discount_amount}\n點數折抵：-{points_deducted}\n實付金額：{total_amount}\n\n【付款方式】\n{payment_method}\n\n[立即前往付款] → {payment_url}\n\n若您有任何問題，歡迎聯繫我們：{shop_service_email}\n\n{shop_name} 敬上"
   },
   {
    "num": "1-2",
    "name": "付款成功通知",
    "key": "order_paid",
    "trigger": "金流回調確認付款完成",
    "recipient": "消費者",
    "subject": "【{shop_name}】付款成功！您的訂單 #{order_number} 正在處理中",
    "body": "親愛的 {buyer_name} 您好，\n\n您的訂單付款已確認，我們正在為您備貨中！\n\n━━━━━━━━━━━━━━━━━━━━\n訂單編號：{order_number}\n付款時間：{paid_at}\n付款金額：{paid_amount}\n付款方式：{payment_method}\n━━━━━━━━━━━━━━━━━━━━\n\n【訂單明細】\n{order_items_list}\n\n[查看訂單狀態] → {order_detail_url}\n\n感謝您的購買，若有任何問題請聯繫：{shop_service_email}\n\n{shop_name} 敬上"
   },
   {
    "num": "1-3",
    "name": "訂單處理中通知",
    "key": "order_processing",
    "trigger": "商家後台將訂單標記為處理中",
    "recipient": "消費者",
    "subject": "【{shop_name}】您的訂單 #{order_number} 正在備貨中",
    "body": "親愛的 {buyer_name} 您好，\n\n您的訂單已進入備貨程序，我們會盡快為您出貨！\n\n訂單編號：{order_number}\n\n[查看訂單狀態] → {order_detail_url}\n\n{shop_name} 敬上"
   },
   {
    "num": "1-4",
    "name": "出貨通知",
    "key": "order_shipped",
    "trigger": "後台操作出貨",
    "recipient": "消費者",
    "subject": "【{shop_name}】您的訂單 #{order_number} 已出貨！",
    "body": "親愛的 {buyer_name} 您好，\n\n您的訂單已出貨，預計 {estimated_arrival} 送達。\n\n━━━━━━━━━━━━━━━━━━━━\n訂單編號：{order_number}\n出貨時間：{shipped_at}\n物流廠商：{shipping_company}\n物流單號：{tracking_number}\n預計送達：{estimated_arrival}\n━━━━━━━━━━━━━━━━━━━━\n\n[查詢物流狀態] → {tracking_url}\n\n收件地址：{shipping_address}\n\n若您有任何問題，歡迎聯繫：{shop_service_email}\n\n{shop_name} 敬上"
   },
   {
    "num": "1-5",
    "name": "配送中通知",
    "key": "order_delivering",
    "trigger": "物流更新為配送中",
    "recipient": "消費者",
    "subject": "【{shop_name}】您的訂單 #{order_number} 配送員正在送貨中",
    "body": "親愛的 {buyer_name} 您好，\n\n您的包裹目前正在配送途中，請保持電話暢通以便配送員聯繫。\n\n訂單編號：{order_number}\n物流單號：{tracking_number}\n配送廠商：{shipping_company}\n\n[即時追蹤包裹] → {tracking_url}\n\n{shop_name} 敬上"
   },
   {
    "num": "1-6",
    "name": "送達確認通知",
    "key": "order_delivered",
    "trigger": "物流確認商品已送達（訂單狀態變更為「已送達」）",
    "recipient": "消費者",
    "subject": "【{shop_name}】您的訂單 #{order_number} 已送達，請確認收貨",
    "body": "親愛的 {buyer_name} 您好，\n\n您訂購的商品已送達！請確認收貨，若商品有任何問題，請於確認前聯繫我們。\n\n━━━━━━━━━━━━━━━━━━━━\n訂單編號：{order_number}\n送達時間：{delivered_at}\n━━━━━━━━━━━━━━━━━━━━\n\n[確認收貨] → {confirm_receipt_url}\n\n提醒：若您於 7 天內未確認，系統將自動完成訂單並計入消費紀錄。\n\n若有任何問題，歡迎聯繫：{shop_service_email}\n\n{shop_name} 敬上"
   },
   {
    "num": "1-7",
    "name": "訂單完成通知",
    "key": "order_completed",
    "trigger": "訂單確認完成",
    "recipient": "消費者",
    "subject": "【{shop_name}】訂單 #{order_number} 已完成，感謝您的購買！",
    "body": "親愛的 {buyer_name} 您好，\n\n您的訂單已完成，感謝您選擇 {shop_name}！\n\n訂單編號：{order_number}\n完成時間：{completed_at}\n本次消費累積點數：+{points_earned} 點\n目前點數餘額：{points_balance} 點\n（此區塊於本次累積點數為 0 時不顯示）\n\n期待您的下次光臨，若對本次購物有任何建議，歡迎告訴我們！\n\n[再次購買] → {shop_url}\n\n{shop_name} 敬上"
   },
   {
    "num": "1-8",
    "name": "訂單取消通知",
    "key": "order_cancelled",
    "trigger": "訂單被取消",
    "recipient": "消費者",
    "subject": "【{shop_name}】訂單 #{order_number} 已取消",
    "body": "親愛的 {buyer_name} 您好，\n\n您的訂單已取消。\n\n訂單編號：{order_number}\n取消時間：{cancelled_at}\n取消原因：{cancel_reason}\n\n退款金額：{refund_amount}\n退款方式：{refund_method}\n預計退款時間：{refund_estimated_date}\n（此區塊於退款金額為 0 時不顯示）\n\n已退回點數：+{points_returned} 點\n（此行於退回點數為 0 時不顯示）\n\n若有任何疑問，請聯繫：{shop_service_email}\n\n{shop_name} 敬上"
   },
   {
    "num": "1-9",
    "name": "退貨申請收到通知",
    "key": "return_request_received",
    "trigger": "消費者提交退換貨申請",
    "recipient": "消費者",
    "subject": "【{shop_name}】您的退換貨申請 #{return_number} 已收到",
    "body": "親愛的 {buyer_name} 您好，\n\n我們已收到您的退換貨申請，將於 {review_sla} 個工作天內完成審核並通知您。\n\n━━━━━━━━━━━━━━━━━━━━\n退換貨申請編號：{return_number}\n對應訂單編號：{order_number}\n申請類型：{return_type}（退貨 / 換貨）\n申請原因：{return_reason}\n申請時間：{created_at}\n━━━━━━━━━━━━━━━━━━━━\n\n[查看申請狀態] → {return_detail_url}\n\n{shop_name} 敬上"
   },
   {
    "num": "1-10",
    "name": "退貨申請核准通知",
    "key": "return_request_approved",
    "trigger": "商家核准退換貨申請",
    "recipient": "消費者",
    "subject": "【{shop_name}】退換貨申請 #{return_number} 已核准，請依指示寄回商品",
    "body": "親愛的 {buyer_name} 您好，\n\n您的退換貨申請已核准！請依照以下指示寄回商品。\n\n申請編號：{return_number}\n核准時間：{approved_at}\n\n【退貨寄送說明】\n請於 {return_deadline} 前將商品寄至：\n{return_address}\n收件人：{return_contact}\n電話：{return_phone}\n\n注意事項：\n- 請保持商品原包裝完整\n- 請附上此申請編號於包裹內\n- 建議使用有追蹤號碼的寄送方式\n\n[查看申請詳情] → {return_detail_url}\n\n{shop_name} 敬上"
   },
   {
    "num": "1-11",
    "name": "退貨申請拒絕通知",
    "key": "return_request_rejected",
    "trigger": "商家拒絕退換貨申請",
    "recipient": "消費者",
    "subject": "【{shop_name}】退換貨申請 #{return_number} 處理結果通知",
    "body": "親愛的 {buyer_name} 您好，\n\n感謝您的耐心等待，關於您的退換貨申請，我們很遺憾無法受理。\n\n申請編號：{return_number}\n拒絕原因：{reject_reason}\n\n如有任何疑問，歡迎直接聯繫我們：\n{shop_service_email}\n\n{shop_name} 敬上"
   },
   {
    "num": "1-12",
    "name": "退款完成通知",
    "key": "refund_completed",
    "trigger": "退款處理完成",
    "recipient": "消費者",
    "subject": "【{shop_name}】訂單 #{order_number} 退款已完成",
    "body": "親愛的 {buyer_name} 您好，\n\n您的退款已處理完成，請確認款項是否入帳。\n\n━━━━━━━━━━━━━━━━━━━━\n退款金額：{refund_amount}\n退款方式：{refund_method}\n退款時間：{refunded_at}\n預計入帳：信用卡退款通常需 7–14 個工作天，實際入帳日依各家銀行作業時間為準\n（此行僅於付款方式為「信用卡原路退回」時顯示）\n━━━━━━━━━━━━━━━━━━━━\n\n退回點數：+{points_returned} 點（已存入您的帳戶）\n（此行於退回點數為 0 時不顯示）\n\n若款項遲遲未入帳，請先確認您的銀行帳戶，或聯繫：{shop_service_email}\n\n{shop_name} 敬上"
   },
   {
    "num": "1-13",
    "name": "換貨出貨通知",
    "key": "exchange_shipped",
    "trigger": "換貨商品出貨",
    "recipient": "消費者",
    "subject": "【{shop_name}】換貨商品 #{return_number} 已出貨！",
    "body": "親愛的 {buyer_name} 您好，\n\n您申請的換貨商品已出貨，預計 {estimated_arrival} 送達。\n\n申請編號：{return_number}\n換貨商品：{exchange_product_name}\n物流廠商：{shipping_company}\n物流單號：{tracking_number}\n\n[查詢物流狀態] → {tracking_url}\n\n{shop_name} 敬上"
   },
   {
    "num": "1-14",
    "name": "`closed` 狀態訂單通知",
    "key": "order_closed",
    "trigger": "訂單被標記為已關閉",
    "recipient": "消費者",
    "subject": "【{shop_name}】訂單 #{order_number} 已關閉",
    "body": "親愛的 {buyer_name} 您好，\n\n您的訂單已關閉。\n\n訂單編號：{order_number}\n關閉時間：{closed_at}\n關閉原因：{close_reason}\n\n退款金額：{refund_amount}\n退款方式：{refund_method}\n（此區塊於退款金額為 0 時不顯示）\n\n本訂單已進入終態，不再接受退換貨申請。若有疑問請聯繫：{shop_service_email}\n\n{shop_name} 敬上"
   }
  ]
 },
 {
  "name": "會員相關通知信",
  "full": "二、會員相關通知信",
  "templates": [
   {
    "num": "2-1",
    "name": "入會歡迎信",
    "key": "member_welcome",
    "trigger": "消費者完成會員註冊並驗證 Email",
    "recipient": "消費者",
    "subject": "【{shop_name}】歡迎加入會員！您的專屬好禮已準備好了",
    "body": "親愛的 {member_name} 您好，\n\n恭喜您成為 {shop_name} 的正式會員！\n\n您目前的會員等級：{member_level}\n\n入會禮：已為您存入 {welcome_points} 點數，可於下次消費折抵使用\n（此行於入會贈點為 0 時不顯示）\n\n入會優惠券：{welcome_coupon_code}\n   折扣內容：{welcome_coupon_description}\n   有效期限：{welcome_coupon_expires_at}\n（此區塊於無入會優惠券時不顯示）\n\n[前往會員中心] → {member_center_url}\n\n{shop_name} 敬上"
   },
   {
    "num": "2-2",
    "name": "會員升等通知",
    "key": "member_level_upgraded",
    "trigger": "會員升等時",
    "recipient": "消費者",
    "subject": "【{shop_name}】恭喜升等！您已成為 {new_level} 會員 ",
    "body": "親愛的 {member_name} 您好，\n\n恭喜您升等為 {new_level} 會員！感謝您對 {shop_name} 的支持與信任。\n\n舊等級：{old_level}\n新等級：{new_level}\n升等時間：{upgraded_at}\n等級有效期限：{level_expires_at}\n\n【{new_level} 專屬權益】\n{level_benefits}\n\n升等禮：已為您存入 {upgrade_points} 點數\n（此行於升等禮點數為 0 時不顯示）\n\n[查看會員權益] → {member_center_url}\n\n感謝您的支持，繼續享受專屬好禮！\n\n{shop_name} 敬上"
   },
   {
    "num": "2-3",
    "name": "會員降等通知",
    "key": "member_level_downgraded",
    "trigger": "年度保級條件未達成，會員降等",
    "recipient": "消費者",
    "subject": "【{shop_name}】您的會員等級已調整為 {new_level}",
    "body": "親愛的 {member_name} 您好，\n\n感謝您持續支持 {shop_name}。由於本年度累計消費未達保級門檻，您的會員等級已調整。\n\n原等級：{old_level}\n目前等級：{new_level}\n調整時間：{downgraded_at}\n\n【如何升回 {old_level}？】\n累計消費達 {upgrade_threshold} 即可升等\n\n我們期待您的再次光臨，祝您購物愉快！\n\n[前往購物] → {shop_url}\n\n{shop_name} 敬上"
   },
   {
    "num": "2-4",
    "name": "保級預警通知",
    "key": "member_level_retention_warning",
    "trigger": "距離年度重置 30 天且累計消費尚未達保級門檻",
    "recipient": "消費者",
    "subject": "【{shop_name}】您的 {current_level} 等級即將到期，還差 {amount_needed} 就能保級！",
    "body": "親愛的 {member_name} 您好，\n\n您目前的 {current_level} 等級將於 {level_expires_at} 到期，距今僅剩 {days_left} 天！\n\n本年度累計消費：{current_yearly_spent}\n保級門檻：{retention_threshold}\n還需消費：{amount_needed}\n\n把握最後機會，繼續享受 {current_level} 的專屬好禮！\n\n[前往購物] → {shop_url}\n\n{shop_name} 敬上"
   },
   {
    "num": "2-5",
    "name": "點數即將到期通知",
    "key": "member_points_expiring",
    "trigger": "點數到期前 14 天",
    "recipient": "消費者",
    "subject": "【{shop_name}】您有 {expiring_points} 點即將於 {expiry_date} 到期，快來使用吧！",
    "body": "親愛的 {member_name} 您好，\n\n提醒您，您的點數即將到期，請盡快使用以免損失！\n\n即將到期點數：{expiring_points} 點\n到期日：{expiry_date}\n目前總點數：{total_points} 點\n\n每 {exchange_rate_points} 點可折抵 NT${exchange_rate_value}\n\n[立即使用點數購物] → {shop_url}\n\n{shop_name} 敬上"
   },
   {
    "num": "2-6",
    "name": "生日雙倍點數通知",
    "key": "member_birthday_bonus",
    "trigger": "會員生日當月第一天自動發送",
    "recipient": "消費者",
    "subject": "【{shop_name}】生日快樂 本月消費享雙倍點數！",
    "body": "親愛的 {member_name} 您好，\n\n生日快樂！感謝您一路以來的支持，{shop_name} 為您獻上生日好禮！\n\n本月生日特權：消費享雙倍點數回饋\n活動期間：{birthday_month_start} – {birthday_month_end}\n\n生日優惠券：{birthday_coupon_code}\n   {birthday_coupon_description}\n   有效期限：{birthday_coupon_expires_at}\n（此區塊於無生日優惠券時不顯示）\n\n[前往購物] → {shop_url}\n\n祝您生日快樂，{shop_name} 敬上"
   },
   {
    "num": "2-7",
    "name": "黑名單通知",
    "key": "member_blacklisted",
    "trigger": "商家將會員加入黑名單",
    "recipient": "消費者",
    "subject": "【{shop_name}】您的帳號狀態通知",
    "body": "親愛的會員您好，\n\n您的 {shop_name} 帳號目前已被暫時限制使用，無法進行新訂單。\n\n若您認為此限制有誤，或需要進一步了解，請聯繫我們：\n{shop_service_email}\n\n{shop_name} 敬上"
   }
  ]
 },
 {
  "name": "方案管理通知信",
  "full": "三、方案管理通知信",
  "templates": [
   {
    "num": "3-1",
    "name": "方案即將到期通知（到期前 90 天）",
    "key": "subscription_expiring_90d",
    "trigger": "方案到期前 90 天",
    "recipient": "商家群組信箱（含 Owner，依 13-3 定案）",
    "subject": "【Evomni】您的 {plan_name} 方案將於 {expires_at} 到期，建議提前規劃續約",
    "body": "您好，\n\n提醒您，您的 Evomni {plan_name} 方案將於 {expires_at} 到期（距今約 90 天）。建議您提前與營運輔導顧問聯繫，安排續約事宜。\n\n方案名稱：{plan_name}\n到期日期：{expires_at}\n目前商店：{shop_domain}\n\n[預約方案諮詢] → https://www.webtech.com.tw/contact\n\nEvomni 團隊 敬上"
   },
   {
    "num": "3-2",
    "name": "方案即將到期通知（到期前 30 天）",
    "key": "subscription_expiring_30d",
    "trigger": "方案到期前 30 天",
    "recipient": "商家群組信箱（含 Owner，依 13-3 定案）",
    "subject": "【Evomni】您的 {plan_name} 方案將於 {expires_at} 到期，請盡早聯繫顧問續約",
    "body": "您好，\n\n提醒您，您的 Evomni {plan_name} 方案將於 {expires_at} 到期（距今 30 天），為避免服務中斷，請盡早聯繫營運輔導顧問安排續約。\n\n方案名稱：{plan_name}\n到期日期：{expires_at}\n目前商店：{shop_domain}\n\n到期後若未續約，將進入 14 天寬限期，寬限期結束後部分功能將受限制。\n\n[預約方案諮詢] → https://www.webtech.com.tw/contact\n\nEvomni 團隊 敬上"
   },
   {
    "num": "3-3",
    "name": "方案即將到期通知（到期前 7 天）",
    "key": "subscription_expiring_7d",
    "trigger": "方案到期前 7 天",
    "recipient": "商家群組信箱（含 Owner，依 13-3 定案）",
    "subject": "【Evomni】緊急提醒：您的 {plan_name} 方案將於 7 天後到期",
    "body": "您好，\n\n您的 Evomni {plan_name} 方案僅剩 7 天到期（{expires_at}），請立即聯繫營運輔導顧問確認續約，以確保服務不中斷。\n\n方案名稱：{plan_name}\n到期日期：{expires_at}\n\n[預約方案諮詢] → https://www.webtech.com.tw/contact\n\nEvomni 團隊 敬上"
   },
   {
    "num": "3-4",
    "name": "方案即將到期通知（到期前 1 天）",
    "key": "subscription_expiring_1d",
    "trigger": "方案到期前 1 天",
    "recipient": "商家群組信箱（含 Owner，依 13-3 定案）",
    "subject": "【Evomni】明日到期：{plan_name} 方案請立即確認續約",
    "body": "您好，\n\n您的 Evomni {plan_name} 方案將於明日（{expires_at}）到期，請立即聯繫您的營運輔導顧問確認續約事宜。\n\n到期後將進入 14 天寬限期，期間功能正常運作；寬限期結束後部分功能將受限制。\n\n[預約方案諮詢] → https://www.webtech.com.tw/contact\n\nEvomni 團隊 敬上"
   },
   {
    "num": "3-5",
    "name": "方案到期通知（到期當日）",
    "key": "subscription_expired",
    "trigger": "方案到期當日 09:00",
    "recipient": "商家群組信箱（含 Owner，依 13-3 定案）",
    "subject": "【Evomni】您的 {plan_name} 方案今日到期，目前享有 14 天寬限期",
    "body": "您好，\n\n您的 Evomni {plan_name} 方案已於今日（{expires_at}）到期。\n\n目前進入 14 天寬限期（至 {grace_period_ends_at}），期間所有功能維持正常運作。\n\n寬限期結束後，部分功能將受到限制，請盡快聯繫您的營運輔導顧問確認續約。\n\n[預約方案諮詢] → https://www.webtech.com.tw/contact\n\nEvomni 團隊 敬上"
   },
   {
    "num": "3-6",
    "name": "升級詢問確認信（寄給商家）",
    "key": "upgrade_inquiry_confirmed",
    "trigger": "商家送出升級詢問表單",
    "recipient": "商家（Owner）",
    "subject": "【Evomni】您的升級詢問已收到，我們將盡快與您聯繫",
    "body": "您好，\n\n我們已收到您的升級詢問，Evomni 業務團隊將於 1–2 個工作天內與您聯繫。\n\n━━━━━━━━━━━━━━━━━━━━\n詢問編號：{inquiry_number}\n詢問時間：{created_at}\n目前方案：{current_plan}\n希望升級至：{target_plan}\n留言內容：{inquiry_message}\n━━━━━━━━━━━━━━━━━━━━\n\n如有緊急需求，請直接聯繫：support@evomni.com\n\nEvomni 團隊 敬上"
   },
   {
    "num": "3-7",
    "name": "升級詢問通知（寄給 Evomni 業務）",
    "key": "upgrade_inquiry_internal",
    "trigger": "商家送出升級詢問表單",
    "recipient": "Evomni 業務團隊（`sales@evomni.com`）",
    "subject": "【待處理】新升級詢問 #{inquiry_number}｜{shop_domain}",
    "body": "有新的升級詢問待處理：\n\n━━━━━━━━━━━━━━━━━━━━\n詢問編號：{inquiry_number}\n商家名稱：{shop_name}\n商家網域：{shop_domain}\n聯繫 Email：{owner_email}\n聯繫電話：{owner_phone}\n目前方案：{current_plan}\n希望升級至：{target_plan}\n到期日：{current_plan_expires_at}\n留言：{inquiry_message}\n━━━━━━━━━━━━━━━━━━━━\n\n[前往後台查看] → {admin_inquiry_url}"
   },
   {
    "num": "3-8",
    "name": "升級成功通知",
    "key": "subscription_upgraded",
    "trigger": "Evomni 內部完成方案升級",
    "recipient": "商家（Owner）",
    "subject": "【Evomni】恭喜升級成功！您的 {new_plan} 方案已啟用",
    "body": "您好，\n\n恭喜！您的 Evomni 方案已成功升級。\n\n升級前：{old_plan}\n升級後：{new_plan}\n生效時間：{activated_at}\n新方案到期日：{new_expires_at}\n\n【新方案專屬功能】\n{new_plan_features}\n\n立即前往後台體驗新功能：{admin_url}\n\n感謝您選擇 Evomni，如有任何問題請聯繫您的營運輔導顧問。\n\nEvomni 團隊 敬上"
   }
  ]
 },
 {
  "name": "一頁式商店通知信",
  "full": "四、一頁式商店通知信",
  "templates": [
   {
    "num": "4-1",
    "name": "LP 訂單確認信",
    "key": "lp_order_created",
    "trigger": "消費者於 LP 完成結帳",
    "recipient": "消費者",
    "subject": "【{shop_name}】感謝訂購！您的訂單 #{order_number} 已建立",
    "body": "親愛的 {buyer_name} 您好，\n\n感謝您訂購 {product_name}！\n\n━━━━━━━━━━━━━━━━━━━━\n訂單編號：{order_number}\n商品：{product_name}\n數量：{quantity}\n金額：{total_amount}\n付款方式：{payment_method}\n━━━━━━━━━━━━━━━━━━━━\n\n[立即完成付款] → {payment_url}\n（此 CTA 於付款方式為「貨到付款」時不顯示）\n\n若有任何問題，請聯繫：{shop_service_email}\n\n{shop_name} 敬上"
   },
   {
    "num": "4-2",
    "name": "LP 付款成功確認信",
    "key": "lp_order_paid",
    "trigger": "LP 金流回調確認付款",
    "recipient": "消費者",
    "subject": "【{shop_name}】付款成功！訂單 #{order_number} 正在備貨中",
    "body": "親愛的 {buyer_name} 您好，\n\n您的付款已確認，我們正在為您準備商品！\n\n訂單編號：{order_number}\n付款金額：{paid_amount}\n商品：{product_name}\n預計出貨：{estimated_ship_date}\n\n{shop_name} 敬上"
   },
   {
    "num": "4-3",
    "name": "LP 出貨通知信",
    "key": "lp_order_shipped",
    "trigger": "LP 訂單出貨",
    "recipient": "消費者",
    "subject": "【{shop_name}】您的 {product_name} 已出貨！",
    "body": "親愛的 {buyer_name} 您好，\n\n您訂購的商品已出貨，預計 {estimated_arrival} 送達。\n\n訂單編號：{order_number}\n物流廠商：{shipping_company}\n物流單號：{tracking_number}\n\n[查詢物流] → {tracking_url}\n\n{shop_name} 敬上"
   },
   {
    "num": "4-4",
    "name": "LP 新會員歡迎信（含密碼設定連結）",
    "key": "lp_member_welcome",
    "trigger": "LP 訪客完成結帳後系統自動建立會員帳號（場景②）或 CRM 聯絡人點擊加入（場景③）",
    "recipient": "消費者",
    "subject": "【{shop_name}】設定密碼，開啟您的會員帳號",
    "body": "親愛的 {buyer_name} 您好，\n\n感謝您在 {shop_name} 購物！我們已為您建立會員帳號，設定密碼後即可享有：\n\n- 快速帶入收件資料\n- 查詢歷史訂單\n- 累積點數回饋\n\n[立即設定密碼] → {set_password_link}\n\n此連結將於 {link_expires_at} 後失效（72 小時）。連結過期後，請至登入頁點選「忘記密碼」重新設定密碼，無需聯繫商家。\n\n若您並未在 {shop_name} 購物，請忽略此信。\n\n{shop_name} 敬上"
   },
   {
    "num": "4-5",
    "name": "KOL 報表分享通知信",
    "key": "lp_kol_report_shared",
    "trigger": "商家點擊「發送報表連結給 KOL」",
    "recipient": "KOL（商家自填 Email）",
    "subject": "【{shop_name}】您的合作業績報表已更新，立即查看",
    "body": "Hi {kol_name}，\n\n{shop_name} 已與您分享合作業績報表，歡迎查看您的最新業績數據！\n\n[查看業績報表] → {report_link}\n\n報表有效期限：{report_expires_at}\n（連結到期後，請聯繫商家重新取得）\n\n若有任何問題，請聯繫：{shop_service_email}\n\n{shop_name} 敬上"
   }
  ]
 },
 {
  "name": "顧客邀請信",
  "full": "五、顧客邀請信",
  "templates": [
   {
    "num": "5-1",
    "name": "後台邀請顧客成為會員",
    "key": "member_invitation",
    "trigger": "商家從後台發送會員邀請給顧客",
    "recipient": "被邀請的顧客",
    "subject": "【{shop_name}】邀請您加入會員，享受專屬優惠！",
    "body": "親愛的 {recipient_name} 您好，\n\n{shop_name} 誠摯邀請您加入會員，成為會員後即可享有：\n\n- 消費累積點數，折抵現金\n- 會員專屬優惠與活動\n- 快速查詢訂單記錄\n- 加入即送 {welcome_points} 點數（限新會員，{welcome_points} = 0 時不顯示）\n\n[立即加入會員] → {register_url}\n\n此邀請連結將於 {link_expires_at} 後失效（30 天有效），逾期請向商家重新申請。\n\n若您不希望收到此類信件，請忽略本信，您的資料不會有任何變動。\n\n{shop_name} 敬上"
   }
  ]
 }
];

const NT_T = {
  primary: '#409EFF', textPrimary: '#303133', textRegular: '#606266',
  textSecondary: '#909399', border: '#DCDFE6', bgPage: '#F5F7FA', danger: '#F56C6C',
};

// Sample values for live preview (drawn from spec 參數說明 examples)
const NT_SAMPLE = {
  shop_name: '好好生活選品', buyer_name: '王小明', member_name: '王小明',
  order_number: 'ORD-20260601-001', created_at: '2026/06/01 14:30',
  payment_deadline: '2026/06/01 15:00', items_subtotal: 'NT$1,200', shipping_fee: 'NT$60',
  discount_amount: 'NT$100', points_deducted: 'NT$50', total_amount: 'NT$1,110',
  payment_method: '信用卡一次付清', payment_url: 'https://shop.evomni.com/pay/xxxx',
  shop_service_email: 'service@shop.com', order_items_list: '草莓果醬（250g）× 2 = NT$360\n手工餅乾（綜合）× 1 = NT$840',
  tracking_number: '1234-5678-9012', logistics_company: '黑貓宅急便', shipped_at: '2026/06/02 10:00',
  member_level: '金卡會員', points_balance: '1,280', expiry_date: '2026/12/31',
  plan_name: '電商啟航方案', plan_expiry_date: '2026/08/31', shop_admin_name: '陳老闆',
  set_password_url: 'https://shop.evomni.com/setpwd/xxxx', lp_name: '夏季限定快閃',
  kol_name: '美妝部落客 Amy', report_url: 'https://shop.evomni.com/kol/report/xxxx',
  invite_url: 'https://shop.evomni.com/invite/xxxx', service_phone: '02-1234-5678',
};

const NT_ALL = NOTIFY_CATEGORIES.flatMap((c) =>
  c.templates.map((t) => ({ ...t, category: c.name, categoryFull: c.full }))
);

const ntVarsIn = (text) => {
  const set = new Set();
  (text.match(/\{[a-z_]+\}/g) || []).forEach((v) => set.add(v));
  return [...set];
};

// Render template text with variables substituted by NT_SAMPLE; unknown tokens highlighted.
function NTRendered({ text }) {
  const parts = text.split(/(\{[a-z_]+\})/g);
  return (
    <span style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
      {parts.map((p, i) => {
        const m = p.match(/^\{([a-z_]+)\}$/);
        if (!m) return <React.Fragment key={i}>{p}</React.Fragment>;
        const key = m[1];
        if (NT_SAMPLE[key] !== undefined) return <span key={i} style={{ color: '#9B59B6' }}>{NT_SAMPLE[key]}</span>;
        return <span key={i} style={{ background: '#FDF6EC', color: '#E6A23C', padding: '0 3px', borderRadius: 2 }}>{p}</span>;
      })}
    </span>
  );
}

function NotificationTemplatesPage() {
  const T = NT_T;
  const [activeCat, setActiveCat] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [enabled, setEnabled] = React.useState(() => {
    const m = {}; NT_ALL.forEach((t) => { m[t.key] = true; }); return m;
  });
  const [drafts, setDrafts] = React.useState({}); // key -> {subject, body}
  const [editing, setEditing] = React.useState(null);
  const [previewing, setPreviewing] = React.useState(null);
  const { toasts, show } = useToast();

  const [draftSubject, setDraftSubject] = React.useState('');
  const [draftBody, setDraftBody] = React.useState('');
  const lastField = React.useRef('body');

  const openEdit = (t) => {
    const d = drafts[t.key] || {};
    setDraftSubject(d.subject !== undefined ? d.subject : t.subject);
    setDraftBody(d.body !== undefined ? d.body : t.body);
    setEditing(t);
  };

  const currentText = (t) => {
    const d = drafts[t.key] || {};
    return {
      subject: d.subject !== undefined ? d.subject : t.subject,
      body: d.body !== undefined ? d.body : t.body,
    };
  };
  const isEdited = (t) => {
    const d = drafts[t.key];
    return d && ((d.subject !== undefined && d.subject !== t.subject) || (d.body !== undefined && d.body !== t.body));
  };

  const insertVar = (token) => {
    if (lastField.current === 'subject') setDraftSubject((s) => s + token);
    else setDraftBody((b) => b + token);
  };

  const saveEdit = () => {
    setDrafts((d) => ({ ...d, [editing.key]: { subject: draftSubject, body: draftBody } }));
    setEditing(null);
    show('範本已儲存，將套用於後續發送的通知信', 'success');
  };
  const resetEdit = () => {
    setDraftSubject(editing.subject);
    setDraftBody(editing.body);
    show('已還原為系統預設範本（尚未儲存）', 'info');
  };

  const cats = [{ id: 'all', label: '全部', count: NT_ALL.length }].concat(
    NOTIFY_CATEGORIES.map((c) => ({ id: c.name, label: c.name, count: c.templates.length }))
  );

  const filtered = NT_ALL.filter((t) => {
    if (activeCat !== 'all' && t.category !== activeCat) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!t.name.toLowerCase().includes(q) && !t.key.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const thS = { textAlign: 'left', padding: '10px 14px', fontSize: 13, fontWeight: 600, color: T.textSecondary, borderBottom: `1px solid ${T.border}`, background: T.bgPage, whiteSpace: 'nowrap' };
  const tdS = { padding: '12px 14px', fontSize: 14, color: T.textRegular, borderBottom: `1px solid #EBEEF5`, verticalAlign: 'middle' };
  const btnPlain = { height: 30, padding: '0 12px', background: '#fff', color: T.textPrimary, border: `1px solid ${T.border}`, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 };
  const btnText = { background: 'none', border: 'none', color: T.primary, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, padding: 0 };

  const editDraftVars = editing ? ntVarsIn(draftSubject + '\n' + draftBody) : [];

  return (
    <React.Fragment>
      <ToastStack toasts={toasts} />

      {/* Breadcrumb + title */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: T.textSecondary, marginBottom: 8 }}>
        <span>電商設定</span><span style={{ color: '#C0C4CC' }}>/</span>
        <span style={{ color: T.textPrimary }}>通知信範本</span>
      </nav>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: T.textPrimary, marginBottom: 6 }}>通知信範本管理</h1>
      <p style={{ fontSize: 14, color: T.textRegular, lineHeight: 1.7, marginBottom: 20, maxWidth: 760 }}>
        系統提供 {NT_ALL.length} 種預設通知信範本（訂單／會員／方案／一頁式商店／顧客邀請）。您可自訂主旨與內文，未編輯者將使用系統預設。內文中的
        <span style={{ background: '#FDF6EC', color: '#E6A23C', padding: '0 3px', borderRadius: 2, margin: '0 2px' }}>{'{變數}'}</span>
        會在實際寄送時自動替換為真實資料。
      </p>

      {/* Category tabs + search */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {cats.map((c) => {
            const on = activeCat === c.id;
            return (
              <button key={c.id} onClick={() => setActiveCat(c.id)}
                style={{ height: 32, padding: '0 14px', borderRadius: 9999, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
                  background: on ? '#ECF5FF' : '#fff', color: on ? T.primary : T.textRegular, border: `1px solid ${on ? '#B3D8FF' : T.border}`, fontWeight: on ? 600 : 400 }}>
                {c.label}<span style={{ marginLeft: 6, color: on ? T.primary : T.textSecondary }}>{c.count}</span>
              </button>
            );
          })}
        </div>
        <div style={{ position: 'relative' }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜尋範本名稱或代碼"
            style={{ width: 240, height: 34, padding: '0 12px', border: `1px solid ${T.border}`, fontSize: 13, outline: 'none', fontFamily: 'inherit', background: '#fff' }} />
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: `1px solid ${T.border}`, borderRadius: 3 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['範本名稱', '代碼', '觸發時機', '收件人', '狀態', '操作'].map((h) => <th key={h} style={thS}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.key} onMouseEnter={(e) => e.currentTarget.style.background = '#FAFAFA'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <td style={tdS}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 500, color: T.textPrimary }}>{t.name}</span>
                    {isEdited(t) && <span style={{ fontSize: 11, color: T.primary, background: '#ECF5FF', border: '1px solid #B3D8FF', borderRadius: 2, padding: '0 5px' }}>已自訂</span>}
                  </div>
                  <div style={{ fontSize: 12, color: T.textSecondary, marginTop: 2 }}>{t.num}　{t.categoryFull}</div>
                </td>
                <td style={{ ...tdS, fontFamily: 'monospace', fontSize: 12, color: T.textSecondary }}>{t.key}</td>
                <td style={{ ...tdS, fontSize: 13, maxWidth: 220 }}>{t.trigger}</td>
                <td style={{ ...tdS, whiteSpace: 'nowrap' }}>{t.recipient}</td>
                <td style={tdS}>
                  <Switch checked={enabled[t.key]} onChange={(v) => { setEnabled((m) => ({ ...m, [t.key]: v })); show(`${t.name}已${v ? '啟用' : '停用'}`, v ? 'success' : 'info'); }} />
                </td>
                <td style={tdS}>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <button style={btnText} onClick={() => setPreviewing(t)}>預覽</button>
                    <button style={btnText} onClick={() => openEdit(t)}>編輯</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 &&
              <tr><td colSpan={6} style={{ ...tdS, textAlign: 'center', color: T.textSecondary, padding: '40px 0' }}>找不到符合條件的範本</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Preview Dialog */}
      {previewing && (() => { const ct = currentText(previewing); return (
        <Dialog open={true} title={`預覽：${previewing.name}`} width={620} onClose={() => setPreviewing(null)}
          footer={<button style={{ ...btnPlain, height: 34 }} onClick={() => setPreviewing(null)}>關閉</button>}>
          <div style={{ fontSize: 12, color: T.textSecondary, marginBottom: 6 }}>主旨</div>
          <div style={{ border: `1px solid ${T.border}`, borderRadius: 3, padding: '10px 12px', marginBottom: 16, fontWeight: 600, color: T.textPrimary }}>
            <NTRendered text={ct.subject} />
          </div>
          <div style={{ fontSize: 12, color: T.textSecondary, marginBottom: 6 }}>內文預覽（變數已套用範例值）</div>
          <div style={{ border: `1px solid ${T.border}`, borderRadius: 3, padding: '16px 18px', background: '#fff', fontSize: 14, color: T.textRegular, maxHeight: 420, overflow: 'auto' }}>
            <NTRendered text={ct.body} />
          </div>
        </Dialog>
      ); })()}

      {/* Edit Drawer */}
      <Drawer open={!!editing} title={editing ? `編輯範本：${editing.name}` : ''} width={760} onClose={() => setEditing(null)}>
        {editing && (
          <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16, fontSize: 13, color: T.textSecondary }}>
              <span>代碼：<code style={{ fontFamily: 'monospace', color: T.textRegular }}>{editing.key}</code></span>
              <span>觸發：{editing.trigger}</span>
              <span>收件人：{editing.recipient}</span>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: T.textSecondary, marginBottom: 6 }}>可用變數（點擊插入至上次編輯的欄位；寄送時自動替換）</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {editDraftVars.length === 0 && <span style={{ fontSize: 13, color: T.textSecondary }}>此範本無變數</span>}
                {editDraftVars.map((v) => (
                  <button key={v} onClick={() => insertVar(v)}
                    style={{ height: 26, padding: '0 10px', borderRadius: 9999, fontSize: 12, fontFamily: 'monospace', cursor: 'pointer',
                      background: '#FDF6EC', color: '#E6A23C', border: '1px solid #F5DAB1' }}>{v}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary, marginBottom: 6 }}>主旨</div>
              <input value={draftSubject} onChange={(e) => setDraftSubject(e.target.value)} onFocus={() => lastField.current = 'subject'}
                style={{ width: '100%', height: 40, padding: '0 12px', border: `1px solid ${T.border}`, fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary, marginBottom: 6 }}>內文</div>
              <textarea value={draftBody} onChange={(e) => setDraftBody(e.target.value)} onFocus={() => lastField.current = 'body'} rows={16}
                style={{ width: '100%', padding: '12px', border: `1px solid ${T.border}`, fontSize: 13, outline: 'none', fontFamily: 'ui-monospace, Menlo, Consolas, monospace', lineHeight: 1.7, resize: 'vertical' }} />
            </div>

            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary, marginBottom: 6 }}>即時預覽（變數已套用範例值）</div>
              <div style={{ border: `1px solid ${T.border}`, borderRadius: 3, background: '#FAFAFA' }}>
                <div style={{ padding: '10px 14px', borderBottom: `1px solid ${T.border}`, fontWeight: 600, color: T.textPrimary, fontSize: 14 }}>
                  <NTRendered text={draftSubject} />
                </div>
                <div style={{ padding: '16px 18px', fontSize: 14, color: T.textRegular }}>
                  <NTRendered text={draftBody} />
                </div>
              </div>
            </div>
          </div>
        )}
        {editing &&
          <div style={{ borderTop: `1px solid ${T.border}`, padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <button style={btnPlain} onClick={resetEdit}>還原系統預設</button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={btnPlain} onClick={() => setEditing(null)}>取消</button>
              <button style={{ height: 30, padding: '0 16px', background: T.primary, color: '#fff', border: `1px solid ${T.primary}`, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }} onClick={saveEdit}>儲存</button>
            </div>
          </div>}
      </Drawer>
    </React.Fragment>
  );
}

Object.assign(window, { NotificationTemplatesPage, NOTIFY_CATEGORIES });
