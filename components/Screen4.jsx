// Screen4 — 退換貨詳情頁（後台）

function Screen4RMADetail({ rmas, orders, onNavigate, onUpdateRMA, tweakRMAStatus, onAdminNav }) {
  const rmaId   = window.__protoRoute?.rmaId;
  const rmaData = rmas.find(r => r.id === rmaId) || rmas[0];
  const [rma, setRmaLocal] = React.useState(rmaData);

  React.useEffect(() => {
    const base = rmas.find(r => r.id === rmaId) || rmas[0];
    if (tweakRMAStatus && tweakRMAStatus !== base.status) {
      setRmaLocal({ ...base, status: tweakRMAStatus });
    } else {
      setRmaLocal(base);
    }
  }, [rmaId, rmas, tweakRMAStatus]);

  const { show, Toast } = useToast();
  const [rejectOpen,    setRejectOpen]    = React.useState(false);
  const [rejectReason,  setRejectReason]  = React.useState('');
  const [rejectError,   setRejectError]   = React.useState(false);
  const [anomalyOpen,   setAnomalyOpen]   = React.useState(false);
  const [anomalyText,   setAnomalyText]   = React.useState('');
  const [anomalyError,  setAnomalyError]  = React.useState(false);
  const [confirmModal,  setConfirmModal]  = React.useState(null);
  const [lightboxOpen,  setLightboxOpen]  = React.useState(false);
  const [lightboxIdx,   setLightboxIdx]   = React.useState(0);
  const [addressInput,  setAddressInput]  = React.useState(rma?.returnAddress || '');
  const [addressSaved,  setAddressSaved]  = React.useState(false);

  if (!rma) return <AdminLayout page="rma-list" onNav={onNavigate}><div style={{color:'#909399',padding:40}}>申請不存在</div></AdminLayout>;

  const rs       = RMA_STATUS[rma.status] || {};
  const order    = orders.find(o => o.id === rma.orderId);
  const isReturn = rma.type === 'return';
  const isClosed = ['rejected','refund_completed','exchange_completed'].includes(rma.status);

  const doAction = (newStatus, msg) => {
    onUpdateRMA(rma.id, newStatus);
    setRmaLocal(prev => ({
      ...prev, status: newStatus,
      timeline: [{ label: msg, time: '2026-05-02 ' + new Date().toTimeString().slice(0,5), operator:'系統管理員' }, ...prev.timeline],
    }));
    show(msg, 'success');
  };

  // Refund rows
  const refundRows = rma.refund ? [
    { label: `退貨產品小計`, value: `NT$ ${rma.refund.subtotal.toLocaleString()}` },
    { label: '折扣分攤',     value: rma.refund.discountShare > 0 ? `- NT$ ${rma.refund.discountShare}` : '—', labelColor:'#909399', valueColor:'#909399' },
    { label: '運費退還',     value: rma.refund.shipping > 0 ? `NT$ ${rma.refund.shipping}` : '不退運費', valueColor: rma.refund.shipping > 0 ? '#303133' : '#909399', labelColor: rma.refund.shipping <= 0 ? '#909399' : '#606266' },
    { type: 'divider' },
    { label: '預估退款金額', value: `NT$ ${rma.refund.total.toLocaleString()}`, type:'total' },
    ...(rma.refund.points > 0 ? [{ label:'退還點數', value:`${rma.refund.points} 點`, type:'paid' }] : []),
  ] : [];

  // Action buttons based on status
  const ActionArea = () => {
    if (isClosed) {
      return (
        <div style={{ padding:16, background:'#F5F7FA', border:'1px solid #DCDFE6', fontSize:13, color:'#909399', textAlign:'center' }}>
          此申請已結案 — {rs.label}
        </div>
      );
    }

    return (
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {/* 待商家審核 */}
        {rma.status === 'pending_review' && (
          <>
            <div style={{ display:'flex', gap:8 }}>
              <EvoBtn variant="create" fullWidth onClick={() => setConfirmModal({ action:'approve_return', label:'核准退貨' })}>核准退貨</EvoBtn>
              {rma.type === 'exchange' && <EvoBtn variant="create" fullWidth onClick={() => setConfirmModal({ action:'approve_exchange', label:'核准換貨' })}>核准換貨</EvoBtn>}
            </div>
            <EvoBtn variant="danger" fullWidth onClick={() => { setRejectOpen(true); setAnomalyOpen(false); }}>拒絕</EvoBtn>
            {rejectOpen && (
              <div style={{ marginTop:4 }}>
                <EvoTextarea label="拒絕原因（必填）" placeholder="請說明拒絕原因，系統將自動通知消費者"
                  error={rejectError ? '請填寫拒絕原因，才能提交審核結果' : undefined}
                  maxLength={300} onChange={setRejectReason} rows={3} />
                <div style={{ display:'flex', gap:8, marginTop:8, justifyContent:'flex-end' }}>
                  <EvoBtn variant="secondary" size="sm" onClick={() => { setRejectOpen(false); setRejectError(false); }}>取消</EvoBtn>
                  <EvoBtn variant="danger" size="sm" onClick={() => {
                    if (!rejectReason.trim()) { setRejectError(true); return; }
                    doAction('rejected','已拒絕申請，系統已通知消費者拒絕原因');
                    setRejectOpen(false);
                  }}>確認拒絕</EvoBtn>
                </div>
              </div>
            )}
          </>
        )}

        {/* 待消費者寄回 */}
        {rma.status === 'pending_return' && (
          <>
            <div style={{ marginBottom:4 }}>
              <EvoInput label="退貨地址" placeholder="請填寫消費者應寄回的地址"
                value={addressInput} onChange={v => { setAddressInput(v); setAddressSaved(false); }}
                helper="填寫後系統將通知消費者退貨地址" />
            </div>
            {addressSaved && (
              <div style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 10px', background:'#F0F9EB', border:'1px solid #B3E19D', fontSize:13, color:'#67C23A', marginBottom:4 }}>
                <span style={{ fontWeight:700 }}>v</span> 退貨地址已儲存，系統通知信已發送
              </div>
            )}
            <EvoBtn variant="primary" fullWidth onClick={() => {
              if (!addressInput.trim()) { show('請填寫退貨地址','error'); return; }
              setAddressSaved(true);
              show('退貨地址已儲存，系統通知信已發送','success');
            }}>確認退貨地址已填寫</EvoBtn>
          </>
        )}

        {/* 產品運送中 */}
        {rma.status === 'in_transit' && (
          <EvoBtn variant="primary" fullWidth onClick={() => setConfirmModal({ action:'received', label:'確認已收到產品' })}>確認已收到產品</EvoBtn>
        )}

        {/* 待商家驗收 */}
        {rma.status === 'pending_inspection' && (
          <>
            <EvoBtn variant="primary" fullWidth onClick={() => setConfirmModal({ action:'inspection_pass', label:'驗收通過' })}>驗收通過</EvoBtn>
            <EvoBtn variant="danger" fullWidth onClick={() => { setAnomalyOpen(true); setRejectOpen(false); }}>驗收異常</EvoBtn>
            {anomalyOpen && (
              <div style={{ marginTop:4 }}>
                <EvoTextarea label="異常說明（必填）" placeholder="請描述產品異常狀況，系統將自動通知消費者"
                  error={anomalyError ? '請填寫異常說明，才能標記驗收異常' : undefined}
                  maxLength={500} onChange={setAnomalyText} rows={3} />
                <div style={{ display:'flex', gap:8, marginTop:8, justifyContent:'flex-end' }}>
                  <EvoBtn variant="secondary" size="sm" onClick={() => { setAnomalyOpen(false); setAnomalyError(false); }}>取消</EvoBtn>
                  <EvoBtn variant="danger" size="sm" onClick={() => {
                    if (!anomalyText.trim()) { setAnomalyError(true); return; }
                    doAction('inspection_failed','已標記驗收異常，系統已通知消費者');
                    setAnomalyOpen(false);
                  }}>確認驗收異常</EvoBtn>
                </div>
              </div>
            )}
          </>
        )}

        {/* 換貨確認中 */}
        {rma.status === 'exchange_confirming' && (
          <EvoBtn variant="primary" fullWidth onClick={() => setConfirmModal({ action:'confirm_stock', label:'確認換貨庫存' })}>確認換貨庫存</EvoBtn>
        )}

        {/* 換貨備貨中 */}
        {rma.status === 'exchange_preparing' && (
          <>
            <EvoInput label="換貨物流單號" placeholder="輸入換貨產品的物流追蹤號碼"
              helper="填寫後消費者將收到換貨出貨通知" />
            <EvoBtn variant="primary" fullWidth onClick={() => setConfirmModal({ action:'exchange_ship', label:'填寫換貨出貨資訊' })}>填寫換貨出貨資訊</EvoBtn>
          </>
        )}

        {/* 退款處理中 */}
        {rma.status === 'refund_processing' && (
          <div style={{ padding:12, background:'#ecf5ff', border:'1px solid #b3d8ff', fontSize:13, color:'#409EFF', textAlign:'center', lineHeight:1.6 }}>
            系統自動處理退款中，請稍候…
          </div>
        )}
      </div>
    );
  };

  // Action confirm handler
  const handleConfirm = () => {
    if (!confirmModal) return;
    const actionMap = {
      approve_return:   ['pending_return',       '已核准退貨申請，系統通知信已發送'],
      approve_exchange: ['exchange_confirming',  '已核准換貨申請，系統通知信已發送'],
      received:         ['pending_inspection',   '已標記收到產品，請進行驗收'],
      inspection_pass:  ['refund_processing',    '驗收完成，庫存已自動回補，退款處理中'],
      confirm_stock:    ['exchange_preparing',   '換貨庫存已確認，請備貨並填寫出貨資訊'],
      exchange_ship:    ['exchange_shipped',      '換貨產品已出貨，消費者收到通知'],
    };
    const [ns, msg] = actionMap[confirmModal.action] || [];
    if (ns) doAction(ns, msg);
    setConfirmModal(null);
  };

  return (
    <AdminLayout page="rma-list" onNav={onAdminNav}>
      <Toast />

      {/* Page header */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, flexWrap:'wrap' }}>
        <button onClick={() => onNavigate('rma-list')} style={{ background:'none', border:'none', cursor:'pointer', color:'#303133', fontSize:18, padding:'4px 6px', display:'flex', alignItems:'center', lineHeight:1 }}>←</button>
        <h1 style={{ fontSize:20, fontWeight:700, color:'#303133', margin:0 }}>退換貨申請 #{rma.id}</h1>
        <EvoTag color={rs.color}>{rs.label}</EvoTag>
        <EvoTag color={isReturn ? 'warning' : 'primary'}>{isReturn ? '退貨' : '換貨'}</EvoTag>
      </div>

      {/* Flow StepBar */}
      {(() => {
        const returnSteps = [
          { key: 'pending_review',    label: '待審核' },
          { key: 'pending_return',    label: '待寄回' },
          { key: 'in_transit',        label: '產品運送中' },
          { key: 'pending_inspection',label: '待驗收' },
          { key: 'refund_processing', label: '退款處理中' },
          { key: 'refund_completed',  label: '退款完成' },
        ];
        const exchangeSteps = [
          { key: 'pending_review',      label: '待審核' },
          { key: 'exchange_confirming', label: '換貨確認中' },
          { key: 'exchange_preparing',  label: '換貨備貨中' },
          { key: 'exchange_shipped',    label: '換貨已出貨' },
          { key: 'exchange_completed',  label: '換貨完成' },
        ];
        const statusOrder = {
          pending_review: 0, pending_return: 1, in_transit: 2,
          pending_inspection: 3, inspection_failed: 3, inspection_passed: 3,
          refund_processing: 4, refund_completed: 5,
          exchange_confirming: 1, exchange_preparing: 2, exchange_shipped: 3, exchange_completed: 4,
        };
        const steps = isReturn ? returnSteps : exchangeSteps;
        const isRejected = rma.status === 'rejected';
        const currentIdx = isRejected ? 0 : (statusOrder[rma.status] ?? 0);
        return (
          <div style={{ background:'#fff', border:'1px solid #DCDFE6', padding:'16px 24px', marginBottom:16 }}>
            <div style={{ display:'flex', alignItems:'center' }}>
              {steps.map((step, i) => {
                const isDone    = i < currentIdx;
                const isActive  = i === currentIdx;
                const isFailed  = isRejected && i === 0;
                const dotColor  = isFailed ? '#F56C6C' : isDone ? '#67C23A' : isActive ? '#409EFF' : '#DCDFE6';
                const textColor = isFailed ? '#F56C6C' : isDone ? '#67C23A' : isActive ? '#409EFF' : '#C0C4CC';
                return (
                  <React.Fragment key={step.key}>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flex:'0 0 auto' }}>
                      <div style={{ width:24, height:24, borderRadius:'50%', background: isDone ? '#67C23A' : isActive ? '#409EFF' : isFailed ? '#F56C6C' : '#F5F7FA', border:`2px solid ${dotColor}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color: (isDone || isActive || isFailed) ? '#fff' : '#C0C4CC', fontWeight:700 }}>
                        {isDone ? '✓' : isFailed ? '✕' : i + 1}
                      </div>
                      <div style={{ fontSize:11, color: textColor, marginTop:5, whiteSpace:'nowrap', fontWeight: isActive ? 700 : 400 }}>{step.label}</div>
                    </div>
                    {i < steps.length - 1 && (
                      <div style={{ flex:1, height:2, background: isDone ? '#67C23A' : '#EBEEF5', margin:'0 4px', marginBottom:16 }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {isRejected && (
              <div style={{ marginTop:8, padding:'6px 10px', background:'#FEF0F0', border:'1px solid #FDE2E2', fontSize:12, color:'#F56C6C' }}>
                此申請已於審核階段遭拒絕
              </div>
            )}
          </div>
        );
      })()}

      {/* 2-column layout */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, alignItems:'start' }}>
        {/* LEFT */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* Application Info */}
          <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>申請資訊</div>
            <div style={{ padding:16 }}>
              <div style={{ display:'flex', gap:16, marginBottom:12 }}>
                <div>
                  <div style={{ fontSize:12, color:'#909399', marginBottom:4 }}>申請原因</div>
                  <div style={{ fontSize:14, color:'#303133' }}>{rma.reason}</div>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, color:'#909399', marginBottom:4 }}>申請類型</div>
                  <EvoTag color={isReturn?'warning':'primary'}>{isReturn?'退貨':'換貨'}</EvoTag>
                </div>
              </div>
              {rma.description && (
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:12, color:'#909399', marginBottom:4 }}>詳細說明</div>
                  <div style={{ fontSize:13, color:'#606266', lineHeight:1.7, padding:'10px 12px', background:'#F5F7FA' }}>{rma.description}</div>
                </div>
              )}
              {/* Images */}
              {rma.images && rma.images.length > 0 && (
                <div>
                  <div style={{ fontSize:12, color:'#909399', marginBottom:8 }}>附件圖片（{rma.images.length} 張）</div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {rma.images.map((img, i) => (
                      <div key={i} onClick={() => { setLightboxIdx(i); setLightboxOpen(true); }}
                        style={{ width:80, height:72, background:'#F5F7FA', border:'1px solid #DCDFE6', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontSize:11, color:'#909399', gap:4, padding:4 }}
                        onMouseEnter={e => e.currentTarget.style.borderColor='#409EFF'}
                        onMouseLeave={e => e.currentTarget.style.borderColor='#DCDFE6'}>
                        <div style={{ width:32, height:24, background:'#DCDFE6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:'#909399' }}>◫</div>
                        <span style={{ wordBreak:'break-all', textAlign:'center', lineHeight:1.3 }}>{img}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Refund Calculation (return only) */}
          {isReturn && rma.refund && (
            <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
              <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', background:'#FAFAFA', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ fontSize:14, fontWeight:700, color:'#303133' }}>退款計算明細</div>
                <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:16, height:16, borderRadius:'50%', background:'#909399', color:'#fff', fontSize:10, cursor:'help' }} title="退款金額依原訂單折扣比例分攤計算。若部分退貨且剩餘訂單仍達免運門檻，不退運費。實際退款需商家確認後執行。">ℹ</span>
              </div>
              <div style={{ padding:16 }}>
                <AmountDetail rows={refundRows} helpText="實際退款金額需商家確認後執行。退還點數將於退款完成後自動回補至會員帳戶。" />
              </div>
            </div>
          )}

          {/* Operation Timeline */}
          <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>操作記錄</div>
            <div style={{ padding:16 }}><EvoTimeline events={rma.timeline} /></div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Action Area */}
          <div style={{ background:'#fff', border:'1px solid #DCDFE6' }}>
            <div style={{ padding:'12px 16px', borderBottom:'1px solid #DCDFE6', fontSize:14, fontWeight:700, color:'#303133', background:'#FAFAFA' }}>商家操作區</div>
            <div style={{ padding:16 }}><ActionArea /></div>
          </div>

          {/* Original Order Summary */}
          {order && (
            <InfoCard title="原訂單摘要" rows={[
              { label:'訂單編號', value: <a href="#" onClick={e=>{e.preventDefault(); onNavigate('order-detail',{orderId:order.id});}} style={{color:'#409EFF',fontSize:13}}>{order.id}</a> },
              { label:'下單日期', value: order.date },
              { label:'產品',     value: order.items.map(i=>i.name).join('、') },
              { label:'訂單金額', value: `NT$ ${order.total.toLocaleString()}` },
              { label:'付款方式', value: order.payment },
            ]} />
          )}

          {/* Applicant Info */}
          <InfoCard title="申請人資訊" rows={[
            { label:'姓名',  value: rma.applicant },
            { label:'手機',  value: rma.phone },
            { label:'Email', value: rma.email },
          ]} />
        </div>
      </div>

      {/* Confirm Modal */}
      <AdminModal open={!!confirmModal} onClose={() => setConfirmModal(null)}
        title={`確認：${confirmModal?.label}`}
        body={
          confirmModal?.action === 'inspection_pass'
            ? '驗收完成後，庫存將自動回補，系統將觸發退款流程。'
            : confirmModal?.action === 'approve_return'
            ? '核准後，系統將通知消費者退貨地址，並等待消費者寄回產品。'
            : confirmModal?.action === 'approve_exchange'
            ? '核准後，系統將通知消費者退貨地址，換貨流程開始進行。'
            : '確定執行此操作？'
        }
        confirmLabel="確認" cancelLabel="取消"
        onConfirm={handleConfirm} />

      {/* Lightbox */}
      {lightboxOpen && (
        <div onClick={() => setLightboxOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2000 }}>
          <button onClick={() => setLightboxOpen(false)} style={{ position:'absolute', top:20, right:20, background:'none', border:'none', color:'#fff', fontSize:30, cursor:'pointer', padding:0 }}>×</button>
          {lightboxIdx > 0 && <button onClick={e=>{e.stopPropagation();setLightboxIdx(i=>i-1);}} style={{ position:'absolute', left:20, background:'rgba(255,255,255,0.15)', border:'none', color:'#fff', fontSize:28, cursor:'pointer', padding:'14px 18px' }}>‹</button>}
          <div onClick={e=>e.stopPropagation()} style={{ textAlign:'center' }}>
            <div style={{ width:440, height:320, background:'#2a2a2a', display:'flex', alignItems:'center', justifyContent:'center', color:'#888', fontSize:14 }}>
              <div style={{color:'#aaa',textAlign:'center'}}><div style={{fontSize:13,marginBottom:8}}>{rma.images[lightboxIdx]}</div><div style={{fontSize:11,color:'#666'}}>← → 切換</div></div>
            </div>
            <div style={{ color:'#888', fontSize:13, marginTop:10 }}>{lightboxIdx+1} / {rma.images.length}</div>
          </div>
          {lightboxIdx < rma.images.length-1 && <button onClick={e=>{e.stopPropagation();setLightboxIdx(i=>i+1);}} style={{ position:'absolute', right:20, background:'rgba(255,255,255,0.15)', border:'none', color:'#fff', fontSize:28, cursor:'pointer', padding:'14px 18px' }}>›</button>}
        </div>
      )}
    </AdminLayout>
  );
}

Object.assign(window, { Screen4RMADetail });
