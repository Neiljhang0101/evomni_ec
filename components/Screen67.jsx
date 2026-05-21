// Screen 6 — 訪客訂單查詢頁（前台）
// Screen 7 — 訪客訂單查詢結果頁（前台）
// Screen 8 — 後台手動建立訂單
// Screen 9 — 訂單模組設定頁

// ── Screen 6: Guest Query ─────────────────────────────────────────────────────
function Screen6GuestQuery({ onNavigate }) {
  const [orderId, setOrderId]     = React.useState('');
  const [phone4,  setPhone4]      = React.useState('');
  const [loading, setLoading]     = React.useState(false);
  const [error,   setError]       = React.useState('');
  const [idError, setIdError]     = React.useState(false);
  const [phError, setPhError]     = React.useState(false);

  const handleQuery = () => {
    setIdError(!orderId.trim());
    setPhError(!phone4.trim() || phone4.trim().length !== 4 || !/^\d+$/.test(phone4));
    if (!orderId.trim() || !phone4.trim() || phone4.trim().length !== 4 || !/^\d+$/.test(phone4)) return;

    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      // Simulate: ORD-20260429-000019 + last 4 of 0955-567-890 = 7890
      if (orderId.trim().toUpperCase() === 'ORD-20260429-000019' && phone4.trim() === '7890') {
        onNavigate('guest-result', { orderId: 'ORD-20260429-000019' });
      } else {
        setError('查無此訂單，請確認訂單編號及手機號碼末四碼是否正確。如有問題請聯繫客服。');
      }
    }, 1200);
  };

  return (
    <div style={{ minHeight:'100vh', background:'#F5F7FA', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:24 }}>
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:32 }}>
        <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#5B21B6,#EC4899)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:16, fontWeight:700 }}>e</div>
        <span style={{ fontSize:18, fontWeight:700, color:'#303133' }}>Evomni</span>
      </div>

      {/* Card */}
      <div style={{ background:'#fff', border:'1px solid #DCDFE6', width:'100%', maxWidth:480, padding:'32px 32px 28px' }}>
        <h1 style={{ fontSize:22, fontWeight:700, color:'#303133', marginBottom:6, textAlign:'center' }}>查詢訂單</h1>
        <p style={{ fontSize:14, color:'#909399', textAlign:'center', marginBottom:28, lineHeight:1.6 }}>
          輸入下單時的訂單編號及手機號碼末四碼即可查詢訂單狀態
        </p>

        {/* Order ID */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:13, color:'#606266', marginBottom:6 }}>訂單編號</div>
          <div style={{ height:44, border:`1px solid ${idError?'#F56C6C':'#DCDFE6'}`, display:'flex', alignItems:'center', background:'#fff', transition:'border-color 0.2s' }}>
            <input
              placeholder="例：ORD-20260427-000001"
              value={orderId}
              onChange={e => { setOrderId(e.target.value.toUpperCase()); setIdError(false); setError(''); }}
              onKeyDown={e => e.key==='Enter' && handleQuery()}
              style={{ flex:1, height:'100%', border:'none', outline:'none', padding:'0 14px', fontSize:14, color:'#303133', fontFamily:'inherit', background:'transparent' }}
            />
          </div>
          {idError && <div style={{ fontSize:12, color:'#F56C6C', marginTop:4 }}>請輸入訂單編號</div>}
          <div style={{ fontSize:12, color:'#909399', marginTop:4 }}>訂單編號在您收到的確認信中可以找到</div>
        </div>

        {/* Phone last 4 */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:13, color:'#606266', marginBottom:6 }}>手機號碼末四碼</div>
          <div style={{ height:44, border:`1px solid ${phError?'#F56C6C':'#DCDFE6'}`, display:'flex', alignItems:'center', background:'#fff', transition:'border-color 0.2s' }}>
            <input
              placeholder="輸入下單時填寫的手機號碼最後 4 碼"
              value={phone4}
              maxLength={4}
              onChange={e => { setPhone4(e.target.value.replace(/\D/g,'')); setPhError(false); setError(''); }}
              onKeyDown={e => e.key==='Enter' && handleQuery()}
              style={{ flex:1, height:'100%', border:'none', outline:'none', padding:'0 14px', fontSize:14, color:'#303133', fontFamily:'inherit', background:'transparent', letterSpacing:'0.3em' }}
            />
          </div>
          {phError && <div style={{ fontSize:12, color:'#F56C6C', marginTop:4 }}>請輸入 4 位數字</div>}
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding:'10px 14px', background:'#fef0f0', border:'1px solid #fbc4c4', fontSize:13, color:'#F56C6C', marginBottom:16, lineHeight:1.6 }}>{error}</div>
        )}

        {/* Submit */}
        <EvoBtn variant="primary" fullWidth loading={loading} onClick={handleQuery} style={{ height:44, fontSize:15 }}>
          {loading ? '查詢中…' : '查詢'}
        </EvoBtn>
      </div>
    </div>
  );
}

// ── Screen 7: Guest Result ────────────────────────────────────────────────────
function Screen7GuestResult({ orders, rmas, onNavigate }) {
  const orderId = window.__protoRoute?.orderId;
  const order   = orders.find(o => o.id === orderId) || orders[2];
  const oStatus = ORDER_STATUS[order?.status] || {};
  const [sessionExpired, setSessionExpired] = React.useState(false);

  if (!order) return null;

  const daysSinceOrder = Math.floor((Date.now() - new Date(order.date.split(' ')[0])) / 86400000);
  const isEligibleStatus = order.status === 'completed' || order.status === 'delivered';
  const canApplyRMA = isEligibleStatus && daysSinceOrder <= 7;
  const rmaExpired  = isEligibleStatus && daysSinceOrder > 7;
  const hasTracking  = !!order.trackingNo;

  return (
    <div style={{ minHeight:'100vh', background:'#F5F7FA', padding:'32px 16px' }}>
      {/* Header */}
      <div style={{ maxWidth:600, margin:'0 auto', marginBottom:16 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#5B21B6,#EC4899)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:13, fontWeight:700 }}>e</div>
            <span style={{ fontSize:15, fontWeight:700, color:'#303133' }}>Evomni</span>
          </div>
          <a href="#" onClick={e=>{e.preventDefault(); onNavigate('guest-query');}} style={{ fontSize:13, color:'#409EFF', textDecoration:'none' }}>重新查詢</a>
        </div>
        {/* Breadcrumb */}
        <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#909399' }}>
          <a href="#" onClick={e=>{e.preventDefault(); onNavigate('guest-query');}} style={{ color:'#409EFF', textDecoration:'none' }}>訂單查詢</a>
          <span>›</span>
          <span style={{ color:'#303133', fontWeight:500 }}>查詢結果</span>
        </div>
      </div>

      <div style={{ maxWidth:600, margin:'0 auto', display:'flex', flexDirection:'column', gap:16 }}>
        {/* Order Header */}
        <div style={{ background:'#fff', border:'1px solid #DCDFE6', padding:20 }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12 }}>
            <div>
              <div style={{ fontSize:12, color:'#909399', marginBottom:4 }}>您的訂單</div>
              <div style={{ fontSize:18, fontWeight:700, color:'#303133' }}>#{order.id}</div>
            </div>
            <EvoTag color={oStatus.color}>{oStatus.label}</EvoTag>
          </div>
          <div style={{ display:'flex', gap:16, fontSize:13, color:'#909399' }}>
            <span>下單日期：{order.date}</span>
          </div>
          <div style={{ marginTop:8, fontSize:12, color:'#C0C4CC' }}>為保護您的個人資料，部分資訊已遮蔽顯示。</div>
        </div>

        {/* Product List */}
        <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
          <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>產品清單</div>
          <div style={{ padding:'4px 0' }}>
            {order.items.map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 16px', borderBottom: i < order.items.length-1 ? '1px solid #EBEEF5':'none' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:36, height:36, background:'#F5F7FA', border:'1px solid #DCDFE6', display:'flex', alignItems:'center', justifyContent:'center', color:'#C0C4CC', fontSize:16, flexShrink:0 }}>◫</div>
                  <div>
                    <div style={{ fontSize:13, color:'#303133' }}>{item.name}</div>
                    {item.spec && <div style={{ fontSize:11, color:'#909399', marginTop:2 }}>{item.spec}</div>}
                  </div>
                </div>
                <div style={{ fontSize:13, color:'#606266', flexShrink:0, marginLeft:12 }}>× {item.qty}</div>
              </div>
            ))}
          </div>
          <div style={{ padding:'10px 16px', borderTop:'1px solid #EBEEF5', display:'flex', justifyContent:'space-between', fontSize:14, fontWeight:700, color:'#303133' }}>
            <span>訂單總計</span>
            <span>NT$ {order.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Shipping Address (masked) */}
        <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
          <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>收件資訊</div>
          <div style={{ padding:'12px 16px', display:'flex', flexDirection:'column', gap:8 }}>
            {[
              { label:'收件人', value: order.recipient.charAt(0) + '*'.repeat(order.recipient.length - 1) },
              { label:'手機',   value: order.phone.replace(/(\d{4})-(\d{3})-(\d{3})/, '$1-***-$3') },
              { label:'地址',   value: (order.city || '') + '（完整地址已遮蔽）' },
              { label:'配送方式', value: order.delivery },
            ].map(row => (
              <div key={row.label} style={{ display:'flex', gap:12, fontSize:13 }}>
                <span style={{ color:'#909399', flexShrink:0, minWidth:60 }}>{row.label}</span>
                <span style={{ color:'#303133' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logistics */}
        <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
          <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>物流資訊</div>
          <div style={{ padding:16 }}>
            {hasTracking ? (
              <>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, padding:'8px 12px', background:'#F5F7FA', border:'1px solid #DCDFE6' }}>
                  <div>
                    <span style={{ fontSize:13, color:'#909399' }}>物流追蹤號：</span>
                    <span style={{ fontSize:13, color:'#303133', fontWeight:500 }}>{order.trackingNo}</span>
                  </div>
                  <EvoBtn variant="ghost" size="sm" onClick={() => alert('連結至物流商官網')}>查看物流 ↗</EvoBtn>
                </div>
                <EvoTimeline events={order.timeline.slice(0, 4)} />
              </>
            ) : (
              <div style={{ fontSize:13, color:'#909399', textAlign:'center', padding:'20px 0' }}>
                商家尚未出貨，請耐心等待
              </div>
            )}
          </div>
        </div>

        {/* CTA area */}
        <div style={{ background:'#fff', border:'1px solid #DCDFE6', padding:20 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'#303133', marginBottom:14 }}>接下來你可以</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {canApplyRMA && (
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid #EBEEF5' }}>
                <div>
                  <div style={{ fontSize:13, color:'#303133', fontWeight:500 }}>收到產品有問題？</div>
                  <div style={{ fontSize:12, color:'#909399', marginTop:2 }}>收貨後 7 天內可申請退換貨</div>
                </div>
                <EvoBtn variant="primary" size="sm" onClick={() => onNavigate('guest-rma', { orderId: order.id })}>申請退換貨</EvoBtn>
              </div>
            )}
            {rmaExpired && (
              <div style={{ padding:'12px 0', borderBottom:'1px solid #EBEEF5' }}>
                <div style={{ fontSize:13, color:'#909399', fontWeight:500 }}>退換貨申請期限已過</div>
                <div style={{ fontSize:12, color:'#C0C4CC', marginTop:2 }}>退換貨申請需於收貨後 7 天內提出，此訂單已超過申請期限。</div>
              </div>
            )}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0' }}>
              <div>
                <div style={{ fontSize:13, color:'#303133', fontWeight:500 }}>想更方便管理訂單？</div>
                <div style={{ fontSize:12, color:'#909399', marginTop:2 }}>加入會員，隨時查看所有訂單記錄</div>
              </div>
              <EvoBtn variant="secondary" size="sm">立即加入會員</EvoBtn>
            </div>
          </div>
        </div>
      </div>

      {/* Session expired overlay */}
      {sessionExpired && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
          <div style={{ background:'#fff', padding:32, maxWidth:360, textAlign:'center' }}>
            <div style={{ width:48, height:48, borderRadius:'50%', background:'#F5F7FA', border:'2px solid #EBEEF5', margin:'0 auto 12px' }}/>
            <div style={{ fontSize:16, fontWeight:700, color:'#303133', marginBottom:8 }}>查詢連結已逾時</div>
            <div style={{ fontSize:13, color:'#909399', marginBottom:20, lineHeight:1.6 }}>查詢連結已逾時（30 分鐘），請重新查詢訂單。</div>
            <EvoBtn variant="primary" fullWidth onClick={() => onNavigate('guest-query')}>重新查詢</EvoBtn>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Screen 8: Create Order ────────────────────────────────────────────────────
function Screen8CreateOrder({ orders, onNavigate, onCreateOrder, onAdminNav }) {
  const { show, Toast } = useToast();
  const [custType, setCustType]   = React.useState('guest');
  const [payment,  setPayment]    = React.useState('cod');
  const [delivery, setDelivery]   = React.useState('宅配（黑貓）');
  const [items,    setItems]      = React.useState([{ name:'藍牙耳機 Pro', spec:'白色', price:2680, qty:1 }]);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const subtotal = items.reduce((s,i) => s + i.price * i.qty, 0);

  return (
    <AdminLayout page="order-list" onNav={onAdminNav}>
      <Toast />
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <button onClick={() => onNavigate('order-list')} style={{ background:'none', border:'none', cursor:'pointer', color:'#303133', fontSize:18, padding:'4px 6px', display:'flex', alignItems:'center', lineHeight:1 }}>←</button>
        <h1 style={{ fontSize:20, fontWeight:700, color:'#303133', margin:0 }}>新增訂單</h1>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, alignItems:'start' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* 客戶資訊 */}
          <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>客戶資訊</div>
            <div style={{ padding:16 }}>
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:13, color:'#606266', marginBottom:8 }}>客戶類型</div>
                <RadioGroup card options={[{label:'訪客',value:'guest'},{label:'會員',value:'member'}]} value={custType} onChange={setCustType} />
              </div>
              {custType === 'member' ? (
                <EvoInput label="搜尋會員" placeholder="輸入姓名或手機號碼搜尋" helper="輸入 2 字以上開始搜尋" />
              ) : (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  <EvoInput label="姓名" placeholder="收件人姓名" />
                  <EvoInput label="手機" placeholder="09XXXXXXXX" />
                  <div style={{ gridColumn:'1/-1' }}><EvoInput label="Email（選填）" placeholder="example@email.com" /></div>
                </div>
              )}
            </div>
          </div>

          {/* 收件資訊 */}
          <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>收件資訊</div>
            <div style={{ padding:16, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <EvoSelect label="縣市" placeholder="請選擇縣市" options={[{label:'台北市',value:'tp'},{label:'新北市',value:'ntc'},{label:'台中市',value:'tc'},{label:'台南市',value:'tainan'},{label:'高雄市',value:'ks'}]} />
              <EvoSelect label="鄉鎮市區" placeholder="請選擇鄉鎮市區" options={[{label:'信義區',value:'xy'},{label:'大安區',value:'da'}]} />
              <div style={{ gridColumn:'1/-1' }}><EvoInput label="地址" placeholder="輸入詳細地址（路名、門牌號碼）" /></div>
            </div>
          </div>

          {/* 產品清單 */}
          <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>產品清單</div>
            <div style={{ padding:16 }}>
              {items.map((item, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:'1px solid #EBEEF5' }}>
                  <div style={{ flex:1, fontSize:13, color:'#303133' }}>{item.name}{item.spec&&<span style={{color:'#909399'}}> ({item.spec})</span>}</div>
                  <div style={{ fontSize:13, color:'#606266', flexShrink:0 }}>NT$ {item.price.toLocaleString()}</div>
                  <div style={{ display:'flex', alignItems:'center', border:'1px solid #DCDFE6', flexShrink:0 }}>
                    <button onClick={() => setItems(it=>it.map((x,j)=>j===i?{...x,qty:Math.max(1,x.qty-1)}:x))} style={{width:28,height:28,border:'none',cursor:'pointer',background:'#F5F7FA',fontSize:14}}>−</button>
                    <span style={{width:32,textAlign:'center',fontSize:13}}>{item.qty}</span>
                    <button onClick={() => setItems(it=>it.map((x,j)=>j===i?{...x,qty:x.qty+1}:x))} style={{width:28,height:28,border:'none',cursor:'pointer',background:'#F5F7FA',fontSize:14}}>+</button>
                  </div>
                  <button onClick={() => setItems(it=>it.filter((_,j)=>j!==i))} style={{background:'none',border:'none',color:'#F56C6C',cursor:'pointer',fontSize:13,padding:0,flexShrink:0}}>移除</button>
                </div>
              ))}
              <div style={{ marginTop:12 }}>
                <EvoBtn variant="ghost" size="sm" onClick={() => setItems(it=>[...it,{name:'快充充電線',spec:'USB-C',price:400,qty:1}])}>+ 加入產品</EvoBtn>
              </div>
            </div>
          </div>

          {/* 備註 */}
          <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>備註</div>
            <div style={{ padding:16 }}>
              <EvoTextarea placeholder="電話接單或現場特殊需求，消費者不會看到此備註" helper="選填，最多 500 字" />
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* 付款與物流 */}
          <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>付款與物流</div>
            <div style={{ padding:16 }}>
              <div style={{ marginBottom:14 }}>
                <EvoSelect label="付款方式" value={payment} onChange={setPayment} options={[
                  {label:'貨到付款',value:'cod'},
                  {label:'已收款（現場/電話）',value:'paid'},
                  {label:'待消費者線上付款',value:'online'},
                ]} />
                {payment==='paid'&&<div style={{fontSize:12,color:'#909399',marginTop:6,lineHeight:1.6}}>直接標記已付款。若為現場紙本發票，請手動補開，系統不會自動開立電子發票。</div>}
                {payment==='online'&&<div style={{fontSize:12,color:'#409EFF',marginTop:6,lineHeight:1.6}}>系統將產生付款連結，發送至消費者的 Email。</div>}
              </div>
              <EvoSelect label="物流方式" value={delivery} onChange={setDelivery} options={[
                {label:'宅配（黑貓）',value:'宅配（黑貓）'},
                {label:'超商取貨（7-11）',value:'超商取貨（7-11）'},
                {label:'超商取貨（全家）',value:'超商取貨（全家）'},
              ]} />
            </div>
          </div>

          {/* Amount preview */}
          <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>金額預覽</div>
            <div style={{ padding:16 }}>
              <AmountDetail rows={[
                { label:'產品小計', value:`NT$ ${subtotal.toLocaleString()}` },
                { label:'運費', value:'計算中' },
                { type:'divider' },
                { label:'預估總計', value:`NT$ ${subtotal.toLocaleString()} +`, type:'total' },
              ]} />
              <div style={{ fontSize:11, color:'#909399', marginTop:8, lineHeight:1.6 }}>實際金額於訂單建立後由系統計算。折扣優惠不適用於手動建立的訂單。</div>
            </div>
          </div>

          <EvoBtn variant="create" fullWidth onClick={() => setConfirmOpen(true)} style={{ height:40 }}>確認建立訂單</EvoBtn>
        </div>
      </div>

      <AdminModal open={confirmOpen} onClose={() => setConfirmOpen(false)}
        title="確認建立訂單"
        body="訂單建立後會立即佔用庫存。確認建立？"
        confirmLabel="確認建立" cancelLabel="返回修改"
        onConfirm={() => { show('訂單已建立！訂單編號：ORD-20260502-000099','success'); setTimeout(()=>onNavigate('order-list'),1500); }} />
    </AdminLayout>
  );
}

// ── Screen 9: Order Settings ──────────────────────────────────────────────────
function Screen9OrderSettings({ onNavigate, onAdminNav }) {
  const { show, Toast } = useToast();
  const [creditTimeout, setCreditTimeout] = React.useState(30);
  const [atmTimeout,    setAtmTimeout]    = React.useState(72);

  return (
    <AdminLayout page="order-settings" onNav={onAdminNav}>
      <Toast />
      <PageHeader title="訂單設定" breadcrumbs={['首頁','全域設定','訂單設定']} />

      <div style={{ maxWidth:600, display:'flex', flexDirection:'column', gap:16 }}>
        {/* 付款逾時設定 */}
        <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
          <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>付款逾時設定</div>
          <div style={{ padding:24, display:'flex', flexDirection:'column', gap:20 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                <div style={{ fontSize:13, color:'#606266' }}>信用卡 / LINE Pay 逾時（分鐘）</div>
                <span title="超過設定時間仍未付款，系統將自動取消訂單並回補庫存。貨到付款不受此影響。" style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:15, height:15, borderRadius:'50%', background:'#909399', color:'#fff', fontSize:10, cursor:'help', flexShrink:0 }}>ℹ</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ display:'flex', border:'1px solid #DCDFE6', height:36 }}>
                  <button onClick={() => setCreditTimeout(v=>Math.max(1,v-1))} style={{width:32,height:'100%',border:'none',cursor:'pointer',background:'#F5F7FA',fontSize:16}}>−</button>
                  <div style={{width:1,background:'#DCDFE6'}}/>
                  <input type="number" value={creditTimeout} onChange={e=>setCreditTimeout(Math.max(1,Math.min(1440,+e.target.value||1)))} style={{width:64,height:'100%',border:'none',outline:'none',textAlign:'center',fontSize:14,color:'#303133',fontFamily:'inherit',background:'transparent'}}/>
                  <div style={{width:1,background:'#DCDFE6'}}/>
                  <button onClick={() => setCreditTimeout(v=>Math.min(1440,v+1))} style={{width:32,height:'100%',border:'none',cursor:'pointer',background:'#F5F7FA',fontSize:16}}>+</button>
                </div>
                <span style={{ fontSize:14, color:'#606266' }}>分鐘</span>
              </div>
              <div style={{ fontSize:12, color:'#909399', marginTop:4 }}>建議值：30 分鐘（範圍：1–1440）</div>
            </div>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                <div style={{ fontSize:13, color:'#606266' }}>ATM 轉帳逾時（小時）</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ display:'flex', border:'1px solid #DCDFE6', height:36 }}>
                  <button onClick={() => setAtmTimeout(v=>Math.max(1,v-1))} style={{width:32,height:'100%',border:'none',cursor:'pointer',background:'#F5F7FA',fontSize:16}}>−</button>
                  <div style={{width:1,background:'#DCDFE6'}}/>
                  <input type="number" value={atmTimeout} onChange={e=>setAtmTimeout(Math.max(1,Math.min(168,+e.target.value||1)))} style={{width:64,height:'100%',border:'none',outline:'none',textAlign:'center',fontSize:14,color:'#303133',fontFamily:'inherit',background:'transparent'}}/>
                  <div style={{width:1,background:'#DCDFE6'}}/>
                  <button onClick={() => setAtmTimeout(v=>Math.min(168,v+1))} style={{width:32,height:'100%',border:'none',cursor:'pointer',background:'#F5F7FA',fontSize:16}}>+</button>
                </div>
                <span style={{ fontSize:14, color:'#606266' }}>小時</span>
              </div>
              <div style={{ fontSize:12, color:'#909399', marginTop:4 }}>ATM 轉帳有較長等待時間。建議值：72 小時（範圍：1–168）</div>
            </div>
          </div>
        </div>

        <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
          <EvoBtn variant="secondary" onClick={() => { setCreditTimeout(30); setAtmTimeout(72); }}>恢復預設值</EvoBtn>
          <EvoBtn variant="primary" onClick={() => show('設定已儲存，新設定將套用於之後建立的訂單','success')}>儲存設定</EvoBtn>
        </div>
      </div>
    </AdminLayout>
  );
}

// ── Screen 8F: Frontend RMA Application ──────────────────────────────────────
function Screen8FrontendRMA({ orders, onNavigate }) {
  const orderId = window.__protoRoute?.orderId;
  const order   = orders.find(o => o.id === orderId) || orders[2];

  const [rmaType,    setRmaType]    = React.useState('return');
  const [reason,     setReason]     = React.useState('');
  const [detail,     setDetail]     = React.useState('');
  const [detailErr,  setDetailErr]  = React.useState(false);
  const [submitted,  setSubmitted]  = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const reasonOptions = [
    { label: '請選擇原因', value: '' },
    { label: '產品瑕疵或損壞', value: '產品瑕疵或損壞' },
    { label: '收到產品與描述不符', value: '收到產品與描述不符' },
    { label: '尺寸或規格不符', value: '尺寸或規格不符' },
    { label: '包裝損壞', value: '包裝損壞' },
    { label: '其他原因', value: '其他原因' },
  ];

  const handleSubmit = () => {
    if (!reason) return;
    if (!detail.trim()) { setDetailErr(true); return; }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div style={{ minHeight:'100vh', background:'#F5F7FA', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ background:'#fff', border:'1px solid #DCDFE6', width:'100%', maxWidth:480, padding:'40px 32px', textAlign:'center' }}>
          <div style={{ width:52, height:52, borderRadius:'50%', background:'#F0F9EB', border:'2px solid #B3E19D', margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, color:'#67C23A' }}>
            <span style={{ color:'#67C23A', fontWeight:700, fontSize:20 }}>v</span>
          </div>
          <div style={{ fontSize:18, fontWeight:700, color:'#303133', marginBottom:8 }}>申請已送出</div>
          <div style={{ fontSize:13, color:'#909399', lineHeight:1.7, marginBottom:24 }}>
            我們已收到您的{rmaType === 'return' ? '退貨' : '換貨'}申請。商家將於 1–3 個工作天內審核，審核結果將寄送至您的 Email。
          </div>
          <EvoBtn variant="secondary" fullWidth onClick={() => onNavigate('guest-result', { orderId: order?.id })}>返回訂單查詢</EvoBtn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:'100vh', background:'#F5F7FA', padding:'32px 16px' }}>
      {/* Header */}
      <div style={{ maxWidth:540, margin:'0 auto', marginBottom:16 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#5B21B6,#EC4899)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:13, fontWeight:700 }}>e</div>
            <span style={{ fontSize:15, fontWeight:700, color:'#303133' }}>Evomni</span>
          </div>
          <a href="#" onClick={e=>{e.preventDefault(); onNavigate('guest-result', { orderId: order?.id });}} style={{ fontSize:13, color:'#409EFF', textDecoration:'none' }}>← 返回訂單</a>
        </div>
        {/* Breadcrumb */}
        <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#909399' }}>
          <a href="#" onClick={e=>{e.preventDefault(); onNavigate('guest-query');}} style={{ color:'#409EFF', textDecoration:'none' }}>訂單查詢</a>
          <span>›</span>
          <a href="#" onClick={e=>{e.preventDefault(); onNavigate('guest-result', { orderId: order?.id });}} style={{ color:'#409EFF', textDecoration:'none' }}>查詢結果</a>
          <span>›</span>
          <span style={{ color:'#303133', fontWeight:500 }}>申請退換貨</span>
        </div>
      </div>

      <div style={{ maxWidth:540, margin:'0 auto' }}>
        <div style={{ background:'#fff', border:'1px solid #DCDFE6', padding:'28px 28px 24px' }}>
          <h1 style={{ fontSize:20, fontWeight:700, color:'#303133', marginBottom:4 }}>申請退換貨</h1>
          {order && <div style={{ fontSize:13, color:'#909399', marginBottom:24 }}>訂單：{order.id}</div>}

          {/* Type */}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:13, color:'#606266', fontWeight:500, marginBottom:10 }}>申請類型</div>
            <div style={{ display:'flex', gap:12 }}>
              {[{value:'return',label:'退貨','desc':'退還產品並退款'},{value:'exchange',label:'換貨',desc:'換一件新產品'}].map(t => (
                <div key={t.value} onClick={() => setRmaType(t.value)}
                  style={{ flex:1, padding:'12px 14px', border:`2px solid ${rmaType===t.value?'#409EFF':'#DCDFE6'}`, cursor:'pointer', background: rmaType===t.value ? '#ECF5FF' : '#fff', transition:'all 0.15s' }}>
                  <div style={{ fontSize:14, fontWeight:700, color: rmaType===t.value ? '#409EFF' : '#303133', marginBottom:2 }}>{t.label}</div>
                  <div style={{ fontSize:12, color:'#909399' }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:13, color:'#606266', fontWeight:500, marginBottom:6 }}>申請原因</div>
            <select value={reason} onChange={e => setReason(e.target.value)}
              style={{ width:'100%', height:40, border:`1px solid ${!reason && submitting ? '#F56C6C' : '#DCDFE6'}`, padding:'0 10px', fontSize:13, color: reason ? '#303133' : '#909399', fontFamily:'inherit', background:'#fff', outline:'none', borderRadius:0 }}>
              {reasonOptions.map(o => <option key={o.value} value={o.value} disabled={o.value===''} style={{ color: o.value ? '#303133' : '#909399' }}>{o.label}</option>)}
            </select>
          </div>

          {/* Detail */}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:13, color:'#606266', fontWeight:500, marginBottom:6 }}>問題說明（必填）</div>
            <textarea
              placeholder="請詳細描述問題，例如：產品破損位置、不符合描述的細節等"
              value={detail}
              onChange={e => { setDetail(e.target.value); setDetailErr(false); }}
              rows={4}
              style={{ width:'100%', border:`1px solid ${detailErr ? '#F56C6C' : '#DCDFE6'}`, padding:'8px 12px', fontSize:13, color:'#303133', fontFamily:'inherit', resize:'vertical', outline:'none', boxSizing:'border-box', borderRadius:0 }}
            />
            {detailErr && <div style={{ fontSize:12, color:'#F56C6C', marginTop:4 }}>請填寫問題說明</div>}
          </div>

          {/* Photo upload hint */}
          <div style={{ marginBottom:24, padding:'12px 14px', background:'#F5F7FA', border:'1px solid #DCDFE6', fontSize:12, color:'#909399', lineHeight:1.7 }}>
            如需上傳照片，審核通過後系統將以 Email 通知您上傳方式。
          </div>

          {/* Notice */}
          <div style={{ marginBottom:24, padding:'10px 14px', background:'#FDF6EC', border:'1px solid #FAECD8', fontSize:12, color:'#E6A23C', lineHeight:1.7 }}>
            收貨後 7 天內可申請退換貨。商家將於 1–3 個工作天審核您的申請。
          </div>

          <EvoBtn variant="primary" fullWidth loading={submitting} onClick={handleSubmit} style={{ height:44, fontSize:15 }}>
            {submitting ? '送出中…' : '送出申請'}
          </EvoBtn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Screen6GuestQuery, Screen7GuestResult, Screen8CreateOrder, Screen8FrontendRMA, Screen9OrderSettings });
