// Screen2 — 訂單詳情頁（後台）

const MeianStatusTag = ({ status }) => {
  const cfg = {
    success:        { label: '已傳送',         bg: '#F0F9EB', color: '#67C23A', border: '#B3E19D' },
    failed:         { label: '傳送失敗',        bg: '#FEF0F0', color: '#F56C6C', border: '#FAB6B6' },
    pending:        { label: '待傳送',          bg: '#FDF6EC', color: '#E6A23C', border: '#F5DAB1' },
    cancel_pending: { label: '取消通知待傳送', bg: '#FDF6EC', color: '#E6A23C', border: '#F5DAB1' },
    cancel_sent:    { label: '取消通知已傳送', bg: '#F5F7FA', color: '#909399', border: '#DCDFE6' },
  }[status] || { label: status, bg: '#F5F7FA', color: '#909399', border: '#DCDFE6' };
  return (
    <span style={{ display:'inline-flex', alignItems:'center', padding:'2px 10px', borderRadius:9999, fontSize:12, fontWeight:500, background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`, whiteSpace:'nowrap' }}>
      {cfg.label}
    </span>
  );
};

function Screen2OrderDetail({ orders, rmas, onNavigate, onUpdateOrder, tweakStatus, tweakMeianStatus, onAdminNav }) {
  const orderId = window.__protoRoute?.orderId;
  const orderData = orders.find(o => o.id === orderId) || orders[0];
  const [order, setOrderLocal] = React.useState(orderData);

  // Sync when tweakStatus or orderId changes
  React.useEffect(() => {
    const base = orders.find(o => o.id === orderId) || orders[0];
    if (tweakStatus && tweakStatus !== base.status) {
      setOrderLocal({ ...base, status: tweakStatus });
    } else {
      setOrderLocal(base);
    }
  }, [orderId, orders, tweakStatus]);

  const { show, Toast } = useToast();
  const [statusDropOpen, setStatusDropOpen] = React.useState(false);
  const [confirmModal, setConfirmModal]     = React.useState(null); // { newStatus, label }
  const [cancelModal, setCancelModal]       = React.useState(false);
  const [noteVal, setNoteVal]               = React.useState(order?.note || '');
  const [meianCancelModal, setMeianCancelModal] = React.useState(false);
  const [meianSendModal, setMeianSendModal]     = React.useState(null);
  const [meianConfirmTxt, setMeianConfirmTxt]   = React.useState('');
  const [meianLoading, setMeianLoading]         = React.useState(false);
  const statusDropRef = React.useRef(null);

  React.useEffect(() => {
    const h = e => { if (statusDropRef.current && !statusDropRef.current.contains(e.target)) setStatusDropOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  if (!order) return <AdminLayout page="order-list" onNav={onNavigate}><div style={{color:'#909399',padding:40}}>訂單不存在</div></AdminLayout>;

  const oStatus    = ORDER_STATUS[order.status] || {};
  const invStatus  = INVOICE_STATUS[order.invoice] || {};
  const nextStates = NEXT_STATUS[order.status] || [];
  const canCancel  = ['pending_payment','paid','processing'].includes(order.status);
  const canInvoice = ['not_issued','failed'].includes(order.invoice);
  const isWarning  = order.payment === '貨到付款' && order.status === 'completed' && order.invoice === 'not_issued';
  const orderRmas  = rmas.filter(r => r.orderId === order.id);
  const mStatus       = tweakMeianStatus || order.meianStatus || null;
  const showMeianCard = order.isMeian || !!tweakMeianStatus;

  const doUpdateStatus = (newStatus) => {
    onUpdateOrder(order.id, newStatus);
    setOrderLocal(prev => ({ ...prev, status: newStatus,
      timeline: [{ label: `狀態更新為：${ORDER_STATUS[newStatus]?.label}`, time: '2026-05-02 ' + new Date().toTimeString().slice(0,5), operator: '系統管理員' }, ...prev.timeline],
    }));
    show(`訂單狀態已更新，系統通知信已發送`, 'success');
    setStatusDropOpen(false);
  };

  const amountRows = [
    { label: '產品小計', value: `NT$ ${order.subtotal.toLocaleString()}` },
    { label: '運費',     value: order.shipping > 0 ? `NT$ ${order.shipping}` : '免運' },
    ...(order.discount < 0 ? [{ label: `優惠折扣${order.discountCode?`（${order.discountCode}）`:''}`, value: `- NT$ ${Math.abs(order.discount).toLocaleString()}`, valueColor:'#F56C6C' }] : []),
    ...(order.points < 0 ? [{ label: '點數折抵', value: `- NT$ ${Math.abs(order.points).toLocaleString()}`, valueColor:'#F56C6C' }] : []),
    { type: 'divider' },
    { label: '訂單總計', value: `NT$ ${order.total.toLocaleString()}`, type:'total' },
    { label: '已付款金額', value: order.paid > 0 ? `NT$ ${order.paid.toLocaleString()}` : '未付款', type:'paid', valueColor: order.paid > 0 ? '#303133' : '#F56C6C' },
  ];

  const thS = { background:'#F5F7FA', color:'#303133', fontWeight:700, fontSize:EvoDS.font.listMin, padding:'10px 12px', textAlign:'left', borderBottom:'1px solid #DCDFE6' };
  const tdS = { padding:'10px 12px', color:'#606266', borderBottom:'1px solid #EBEEF5', fontSize:EvoDS.font.listMin, verticalAlign:'middle' };

  return (
    <AdminLayout page="order-list" onNav={onAdminNav}>
      <Toast />

      {/* Invoice warning banner */}
      {isWarning && (
        <AlertBanner type="warning"
          message="此訂單尚未開立發票，請點擊「開立發票」完成稅務作業"
          action={{ label:'開立發票', onClick:() => { show('發票開立成功，發票號碼：ZZ-99887766','success'); } }} />
      )}

      {/* Page Header with action buttons */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
          <button onClick={() => onNavigate('order-list')} style={{ background:'none', border:'none', cursor:'pointer', color:'#303133', fontSize:18, padding:'4px 6px', display:'flex', alignItems:'center', lineHeight:1 }}>←</button>
          <h1 style={{ fontSize:20, fontWeight:700, color:'#303133', margin:0 }}>訂單 #{order.id}</h1>
          <EvoTag color={oStatus.color}>{oStatus.label}</EvoTag>
        </div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
          {/* 更新訂單狀態 */}
          {nextStates.filter(s => s !== 'cancelled').length > 0 && (
            <div ref={statusDropRef} style={{ position:'relative' }}>
              <EvoBtn variant="primary" onClick={() => setStatusDropOpen(o=>!o)}>
                更新訂單狀態 {statusDropOpen ? '▲' : '▾'}
              </EvoBtn>
              {statusDropOpen && (
                <div style={{ position:'absolute', top:'calc(100% + 4px)', left:0, zIndex:200, background:'#fff', border:'1px solid #DCDFE6', boxShadow:'0 4px 16px rgba(0,0,0,0.1)', minWidth:160 }}>
                  {nextStates.filter(s => s !== 'cancelled').map(s => (
                    <div key={s} onClick={() => { setConfirmModal({ newStatus:s, label: NEXT_STATUS_LABEL[s] }); setStatusDropOpen(false); }}
                      style={{ padding:'10px 16px', fontSize:14, cursor:'pointer', color:'#303133' }}
                      onMouseEnter={e => e.currentTarget.style.background='#F5F7FA'}
                      onMouseLeave={e => e.currentTarget.style.background='#fff'}>
                      {NEXT_STATUS_LABEL[s]}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {canInvoice && !isWarning && (
            <EvoBtn variant="secondary" onClick={() => show('發票開立成功，發票號碼：ZZ-99887766','success')}>開立發票</EvoBtn>
          )}
          <EvoBtn variant="secondary" onClick={() => show('列印功能開發中','info')}>列印出貨單</EvoBtn>
          {canCancel && (
            <EvoBtn variant="danger" onClick={() => setCancelModal(true)}>取消訂單</EvoBtn>
          )}
        </div>
      </div>

      {/* Main 2-column layout */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, alignItems:'start' }}>
        {/* LEFT */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* Product Table */}
          <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>產品明細</div>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:14 }}>
              <thead>
                <tr>
                  <th style={{ ...thS, width:40, background:'#fff' }}></th>
                  <th style={{ ...thS, background:'#fff', minWidth:160 }}>產品名稱</th>
                  <th style={{ ...thS, width:88, textAlign:'right', background:'#fff' }}>單價</th>
                  <th style={{ ...thS, width:60, textAlign:'center', background:'#fff' }}>數量</th>
                  <th style={{ ...thS, width:88, textAlign:'right', background:'#fff' }}>小計</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i}>
                    <td style={tdS}>
                      <div style={{ width:36, height:36, background:'#F5F7FA', border:'1px solid #DCDFE6', display:'flex', alignItems:'center', justifyContent:'center', color:'#C0C4CC', fontSize:16 }}>◫</div>
                    </td>
                    <td style={tdS}>
                      <div style={{ fontSize:14, color:'#303133' }}>{item.name}</div>
                      {item.spec && <div style={{ fontSize:14, color:'#909399', marginTop:2 }}>{item.spec}</div>}
                    </td>
                    <td style={{ ...tdS, textAlign:'right' }}>NT$ {item.price.toLocaleString()}</td>
                    <td style={{ ...tdS, textAlign:'center' }}>{item.qty}</td>
                    <td style={{ ...tdS, textAlign:'right', fontWeight:500 }}>NT$ {(item.price * item.qty).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Amount Detail */}
          <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>金額明細</div>
            <div style={{ padding:16 }}>
              <AmountDetail rows={amountRows} />
            </div>
          </div>

          {/* Logistics Timeline */}
          <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>物流資訊</div>
            <div style={{ padding:16 }}>
              {order.trackingNo && (
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14, padding:'8px 12px', background:'#F5F7FA', border:'1px solid #DCDFE6' }}>
                  <span style={{ fontSize:14, color:'#606266' }}>物流追蹤號：</span>
                  <a href="#" onClick={e=>e.preventDefault()} style={{ color:'#409EFF', fontSize:14 }}>{order.trackingNo}</a>
                  <span style={{ fontSize:14, color:'#909399' }}>（點擊開啟物流查詢）</span>
                </div>
              )}
              <EvoTimeline events={order.timeline} />
            </div>
          </div>

          {/* RMA History */}
          {orderRmas.length > 0 && (
            <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
              <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>退換貨歷程</div>
              <div style={{ padding:16 }}>
                {orderRmas.map(r => {
                  const rs = RMA_STATUS[r.status] || {};
                  return (
                    <div key={r.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #EBEEF5' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <a href="#" onClick={e=>{e.preventDefault(); onNavigate('rma-detail',{rmaId:r.id});}} style={{ color:'#409EFF', fontSize:14 }}>{r.id}</a>
                        <EvoTag color={r.type==='return'?'warning':'primary'}>{r.type==='return'?'退貨':'換貨'}</EvoTag>
                        <span style={{ fontSize:14, color:'#909399' }}>{r.date}</span>
                      </div>
                      <EvoTag color={rs.color}>{rs.label}</EvoTag>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Customer Info */}
          <InfoCard title="收件人資訊" rows={[
            { label:'收件人', value: order.recipient },
            { label:'手機',   value: order.phone },
            { label:'地址',   value: order.address },
            { label:'配送方式', value: order.delivery },
            { label:'備送說明', value: order.note || '—' },
          ]} />

          {/* Payment Info */}
          <InfoCard title="付款資訊" rows={[
            { label:'付款方式', value: order.payment },
            { label:'付款狀態', value: order.paymentStatus },
            { label:'發票狀態', value: <EvoTag color={invStatus.color} icon={invStatus.icon}>{invStatus.label}</EvoTag> },
            ...(order.invoiceNo ? [{ label:'發票號碼', value: order.invoiceNo }] : []),
          ]} />

          {/* Notes */}
          <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
            <div style={{ padding:'10px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>內部備註</div>
            <div style={{ padding:16 }}>
              <EvoTextarea
                placeholder="填寫商家內部備註，消費者不會看到此內容"
                value={order.note || ''}
                onChange={setNoteVal}
                helper="最多 500 字"
                maxLength={500}
              />
              <div style={{ marginTop:10, display:'flex', justifyContent:'flex-end' }}>
                <EvoBtn variant="primary" size="sm" onClick={() => show('備註已儲存','success')}>儲存備註</EvoBtn>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 美安訂單資訊卡片 */}
      {showMeianCard && mStatus && (
        <div style={{ background:'#fff', border:'1px solid #DCDFE6', marginTop:16 }}>
          <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', background:'#FAFAFA', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:14, fontWeight:700, color:'#303133' }}>美安訂單資訊</span>
            <MeianStatusTag status={mStatus} />
          </div>
          <div style={{ padding:16 }}>
            {mStatus === 'success' && (
              <div>
                <div style={{ fontSize:13, color:'#606266' }}>訂單 {order.id} 已於 2026-04-30 18:10 傳送至美安系統</div>
                <div style={{ fontSize:12, color:'#909399', marginTop:4 }}>確認碼：MA-20260430-00008</div>
              </div>
            )}
            {mStatus === 'failed' && (
              <div>
                <div style={{ fontSize:13, color:'#606266', marginBottom:12 }}>上次傳送失敗：美安 API 回應逾時（Timeout），請確認網路連線後重新嘗試。</div>
                <button onClick={() => { setMeianConfirmTxt(''); setMeianSendModal('retry'); }}
                  style={{ height:32, padding:'0 14px', background:'#F56C6C', color:'#fff', border:'none', borderRadius:0, cursor:'pointer', fontSize:13, fontFamily:'Noto Sans TC,sans-serif' }}>
                  重新傳送
                </button>
              </div>
            )}
            {mStatus === 'pending' && (
              <div>
                <div style={{ fontSize:13, color:'#606266', marginBottom:12 }}>訂單尚未傳送至美安系統，預計於系統下一次排程時自動傳送。</div>
                <button onClick={() => { setMeianConfirmTxt(''); setMeianSendModal('manual'); }}
                  style={{ height:32, padding:'0 14px', background:'#409EFF', color:'#fff', border:'none', borderRadius:0, cursor:'pointer', fontSize:13, fontFamily:'Noto Sans TC,sans-serif' }}>
                  立即手動傳送
                </button>
              </div>
            )}
            {mStatus === 'cancel_pending' && (
              <div>
                <div style={{ fontSize:13, color:'#E6A23C', marginBottom:12 }}>此訂單已取消，取消通知尚未傳送至美安系統。</div>
                <button onClick={() => setMeianCancelModal(true)}
                  style={{ height:32, padding:'0 14px', background:'#E6A23C', color:'#fff', border:'none', borderRadius:0, cursor:'pointer', fontSize:13, fontFamily:'Noto Sans TC,sans-serif' }}>
                  傳送取消通知
                </button>
              </div>
            )}
            {mStatus === 'cancel_sent' && (
              <div>
                <div style={{ fontSize:13, color:'#606266' }}>取消通知已於 2026-04-28 12:15 傳送至美安系統</div>
                <div style={{ fontSize:12, color:'#909399', marginTop:4 }}>確認碼：MA-CANCEL-20260428-003</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirm Status Update Modal */}
      <AdminModal open={!!confirmModal} onClose={() => setConfirmModal(null)}
        title={`確認更新訂單狀態`}
        body={`確定將訂單狀態更新為「${ORDER_STATUS[confirmModal?.newStatus]?.label}」？系統將自動發送通知信給消費者。`}
        confirmLabel="確定更新" cancelLabel="取消"
        onConfirm={() => { doUpdateStatus(confirmModal.newStatus); setConfirmModal(null); }} />

      {/* Cancel Modal */}
      <AdminModal open={cancelModal} onClose={() => setCancelModal(false)}
        title="確定取消此訂單？"
        body="訂單取消後庫存將自動回補。若已付款，系統將自動發起退款。此操作無法復原。"
        confirmLabel="確定取消" cancelLabel="先不取消" danger
        onConfirm={() => { doUpdateStatus('cancelled'); setCancelModal(false); }} />

      {/* Dialog 4 — 美安取消通知確認 */}
      <AdminModal open={meianCancelModal} onClose={() => setMeianCancelModal(false)}
        title="確認傳送取消通知"
        body={`確定將訂單 ${order.id} 的取消通知傳送至美安系統？此操作無法復原。`}
        confirmLabel="確認傳送" cancelLabel="稍後再傳"
        onConfirm={() => { setMeianCancelModal(false); show('取消通知已傳送至美安系統', 'success'); }} />

      {/* Dialog 5 — 美安手動傳送確認（需輸入「確認」解鎖） */}
      {meianSendModal && (
        <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ background:'#fff', width:480, maxWidth:'90vw', boxShadow:'0 8px 32px rgba(0,0,0,0.18)' }}>
            <div style={{ padding:'16px 20px', borderBottom:'1px solid #DCDFE6', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:16, fontWeight:700, color:'#303133' }}>
                {meianSendModal === 'retry' ? '確認重新傳送' : '確認手動傳送'}
              </span>
              <button onClick={() => setMeianSendModal(null)} style={{ background:'none', border:'none', fontSize:20, color:'#909399', cursor:'pointer', lineHeight:1 }}>×</button>
            </div>
            <div style={{ padding:20 }}>
              <div style={{ fontSize:14, color:'#303133', marginBottom:8 }}>
                {meianSendModal === 'retry'
                  ? `確定重新傳送訂單 ${order.id} 至美安系統？`
                  : `確定立即手動傳送訂單 ${order.id} 至美安系統？`}
              </div>
              <div style={{ fontSize:13, color:'#909399', marginBottom:12 }}>請輸入「確認」以解鎖確認按鈕</div>
              <input
                value={meianConfirmTxt}
                onChange={e => setMeianConfirmTxt(e.target.value)}
                placeholder='請輸入「確認」'
                style={{ width:'100%', height:36, border:'1px solid #DCDFE6', borderRadius:0, padding:'0 10px', fontSize:14, fontFamily:'Noto Sans TC,sans-serif', outline:'none', color:'#303133' }}
              />
            </div>
            <div style={{ padding:'12px 20px', borderTop:'1px solid #DCDFE6', display:'flex', justifyContent:'flex-end', gap:8 }}>
              <button onClick={() => setMeianSendModal(null)}
                style={{ height:36, padding:'0 16px', background:'#fff', border:'1px solid #DCDFE6', borderRadius:0, cursor:'pointer', fontSize:14, color:'#606266', fontFamily:'Noto Sans TC,sans-serif' }}>
                取消
              </button>
              <button
                disabled={meianConfirmTxt !== '確認' || meianLoading}
                onClick={() => {
                  setMeianLoading(true);
                  setTimeout(() => {
                    setMeianLoading(false);
                    setMeianSendModal(null);
                    setMeianConfirmTxt('');
                    show(meianSendModal === 'retry' ? '已重新傳送至美安系統' : '已手動傳送至美安系統', 'success');
                  }, 1200);
                }}
                style={{ height:36, padding:'0 16px', background: meianConfirmTxt === '確認' && !meianLoading ? '#409EFF' : '#C0C4CC', color:'#fff', border:'none', borderRadius:0, cursor: meianConfirmTxt === '確認' && !meianLoading ? 'pointer' : 'not-allowed', fontSize:14, fontFamily:'Noto Sans TC,sans-serif', transition:'background 0.15s' }}>
                {meianLoading ? '傳送中...' : (meianSendModal === 'retry' ? '確認重新傳送' : '確認手動傳送')}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

Object.assign(window, { Screen2OrderDetail });
