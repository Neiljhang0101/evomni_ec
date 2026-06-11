// PageOrders — 訂單管理模組
// 從 html/訂單管理.html 抽取
// 注意：此模組的 Screen 元件使用 AdminLayout（含自己的 Sidebar+Header），
// 因此 PageOrders 由統一 App 在「無外層 layout」的情況下直接渲染整個視窗。

// ─── Tweaks 面板（Prototype 開發工具）────────────────────────────────────────
const TWEAK_DEFAULTS = {
  "orderStatus": "",
  "rmaStatus": "",
  "meianStatus": ""
};

function TweaksPanel({ tweaks, setTweak, onClose }) {
  const orderStatusOpts = [
    {value:'',              label:'（跟隨列表點選）'},
    {value:'pending_payment',label:'待付款'},
    {value:'paid',          label:'已付款'},
    {value:'processing',    label:'處理中'},
    {value:'shipped',       label:'已出貨'},
    {value:'in_transit',    label:'配送中'},
    {value:'delivered',     label:'已送達'},
    {value:'completed',     label:'已完成'},
    {value:'cancelled',     label:'已取消'},
    {value:'refunded',      label:'已退款'},
    {value:'closed',        label:'已關閉'},
  ];
  const rmaStatusOpts = [
    {value:'',                   label:'（跟隨列表點選）'},
    {value:'pending_review',     label:'待商家審核'},
    {value:'rejected',           label:'審核拒絕'},
    {value:'pending_return',     label:'待消費者寄回'},
    {value:'in_transit',         label:'產品運送中'},
    {value:'pending_inspection', label:'待商家驗收'},
    {value:'inspection_failed',  label:'驗收異常'},
    {value:'inspection_passed',  label:'驗收完成'},
    {value:'refund_processing',  label:'退款處理中'},
    {value:'refund_completed',   label:'退款完成'},
    {value:'exchange_confirming',label:'換貨確認中'},
    {value:'exchange_preparing', label:'換貨備貨中'},
    {value:'exchange_shipped',   label:'換貨已出貨'},
    {value:'exchange_completed', label:'換貨完成'},
  ];

  const selStyle = { width:'100%', height:32, border:'1px solid #DCDFE6', borderRadius:0, fontSize:13, color:'#303133', padding:'0 8px', background:'#fff', fontFamily:'Noto Sans TC,sans-serif', outline:'none' };

  return (
    <div style={{ position:'fixed', bottom:20, right:20, zIndex:5000, background:'#fff', border:'1px solid #DCDFE6', boxShadow:'0 4px 20px rgba(0,0,0,0.14)', width:260, fontFamily:'Noto Sans TC,sans-serif' }}>
      <div style={{ padding:'12px 14px', borderBottom:'1px solid #DCDFE6', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#303133' }}>
        <span style={{ fontSize:13, fontWeight:700, color:'#fff' }}>Tweaks</span>
        <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.6)', cursor:'pointer', fontSize:18, padding:0, lineHeight:1 }}>×</button>
      </div>
      <div style={{ padding:14 }}>
        <div style={{ fontSize:11, color:'#909399', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:10 }}>訂單詳情 — 狀態預覽</div>
        <select value={tweaks.orderStatus} onChange={e => setTweak('orderStatus', e.target.value)} style={selStyle}>
          {orderStatusOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <div style={{ fontSize:11, color:'#C0C4CC', marginTop:4, lineHeight:1.5 }}>切換以預覽不同訂單狀態的操作按鈕組</div>

        <div style={{ borderTop:'1px solid #EBEEF5', margin:'14px 0' }} />

        <div style={{ fontSize:11, color:'#909399', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:10 }}>退換貨詳情 — 狀態預覽</div>
        <select value={tweaks.rmaStatus} onChange={e => setTweak('rmaStatus', e.target.value)} style={selStyle}>
          {rmaStatusOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <div style={{ fontSize:11, color:'#C0C4CC', marginTop:4, lineHeight:1.5 }}>切換以預覽不同審核狀態的操作區塊</div>

        <div style={{ borderTop:'1px solid #EBEEF5', margin:'14px 0' }} />

        <div style={{ fontSize:11, color:'#909399', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:10 }}>美安訂單卡片 — 狀態預覽</div>
        <select value={tweaks.meianStatus} onChange={e => setTweak('meianStatus', e.target.value)} style={selStyle}>
          {[
            {value:'',              label:'（跟隨訂單 isMeian 設定）'},
            {value:'success',       label:'已傳送'},
            {value:'failed',        label:'傳送失敗'},
            {value:'pending',       label:'待傳送'},
            {value:'cancel_pending',label:'取消通知待傳送'},
            {value:'cancel_sent',   label:'取消通知已傳送'},
          ].map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <div style={{ fontSize:11, color:'#C0C4CC', marginTop:4, lineHeight:1.5 }}>切換以預覽訂單詳情頁的美安資訊卡狀態</div>

        <div style={{ borderTop:'1px solid #EBEEF5', margin:'14px 0' }} />

        <div style={{ fontSize:11, color:'#909399', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:8 }}>快捷導覽</div>
        <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
          {[
            {label:'訂單列表', screen:'order-list'},
            {label:'訂單詳情', screen:'order-detail', extra:{orderId:'ORD-20260430-000008'}},
            {label:'退換貨列表', screen:'rma-list'},
            {label:'退換貨詳情', screen:'rma-detail', extra:{rmaId:'RMA-20260502-000003'}},
            {label:'訪客查詢頁', screen:'guest-query'},
            {label:'退換貨申請（前台）', screen:'guest-rma', extra:{orderId:'ORD-20260429-000019'}},
            {label:'新增訂單', screen:'create-order'},
            {label:'電子發票管理', screen:'order-invoice'},
            {label:'訂單設定', screen:'order-settings'},
          ].map(item => (
            <button key={item.screen} onClick={() => { window.__tweakNav && window.__tweakNav(item.screen, item.extra||{}); }}
              style={{ textAlign:'left', padding:'5px 8px', background:'#F5F7FA', border:'1px solid #DCDFE6', cursor:'pointer', fontSize:12, color:'#606266', fontFamily:'Noto Sans TC,sans-serif', borderRadius:0 }}>
              → {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PageOrders ───────────────────────────────────────────────────────────────
// 此模組保有自己的 AdminLayout（透過 Screen 元件），由統一 App 在最外層渲染
const ORDER_SCREENS = new Set([
  'order-list','order-detail','rma-list','rma-detail',
  'guest-query','guest-result','guest-rma','create-order','order-invoice','order-settings',
]);

function PageOrders({ currentPage: initialPage, onNavigate }) {
  const [orders, setOrders] = React.useState(ORDERS_INIT);
  const [rmas,   setRmas]   = React.useState(RMAS_INIT);
  const resolveScreen = (p) => p === 'order-returns' ? 'rma-list' : (p || 'order-list');
  const [route,  setRoute]  = React.useState({ screen: resolveScreen(initialPage) });
  const [tweaksVisible, setTweaksVisible] = React.useState(false);
  const [tweaks, setTweaksState] = React.useState(TWEAK_DEFAULTS);

  const setTweak = (key, val) => {
    setTweaksState(t => ({ ...t, [key]: val }));
    window.parent.postMessage({ type:'__edit_mode_set_keys', edits: { [key]: val } }, '*');
  };

  const navigate = (screen, params={}) => {
    if (ORDER_SCREENS.has(screen)) {
      window.__protoRoute = { screen, ...params };
      setRoute({ screen, ...params });
    } else {
      onNavigate(screen);
    }
  };

  window.__tweakNav = (screen, extra={}) => navigate(screen, extra);

  const adminNav = React.useCallback((pageId) => {
    const routeMap = {
      'order-list':    'order-list',
      'order-returns': 'rma-list',
      'rma-list':      'rma-list',
      'order-invoice': 'order-invoice',
      'order-settings':'order-settings',
    };
    navigate(routeMap[pageId] || pageId);
  }, []);

  const updateOrder = (orderId, newStatus) => {
    setOrders(os => os.map(o => o.id===orderId ? { ...o, status:newStatus } : o));
  };

  const updateRMA = (rmaId, newStatus) => {
    setRmas(rs => rs.map(r => r.id===rmaId ? { ...r, status:newStatus } : r));
  };

  React.useEffect(() => {
    const handler = e => {
      if (e.data?.type === '__activate_edit_mode')   setTweaksVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type:'__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const commonProps = { orders, rmas, onNavigate: navigate, onAdminNav: adminNav };

  const renderScreen = () => {
    switch (route.screen) {
      case 'order-list':
        return <Screen1OrderList {...commonProps} onUpdateOrder={updateOrder} />;
      case 'order-detail':
        return <Screen2OrderDetail {...commonProps} onUpdateOrder={updateOrder} tweakStatus={tweaks.orderStatus||null} tweakMeianStatus={tweaks.meianStatus||null} />;
      case 'rma-list':
        return <Screen3RMAList {...commonProps} />;
      case 'rma-detail':
        return <Screen4RMADetail {...commonProps} onUpdateRMA={updateRMA} tweakRMAStatus={tweaks.rmaStatus||null} />;
      case 'guest-query':
        return <Screen6GuestQuery onNavigate={navigate} />;
      case 'guest-result':
        return <Screen7GuestResult {...commonProps} />;
      case 'guest-rma':
        return <Screen8FrontendRMA orders={orders} onNavigate={navigate} />;
      case 'create-order':
        return <Screen8CreateOrder {...commonProps} />;
      case 'order-invoice':
        return (
          <AdminLayout page="order-invoice" onNav={adminNav}>
            <PageHeader title="電子發票管理" />
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 0', color:'#909399', fontSize:14 }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom:16, opacity:0.35 }}>
                <rect x="8" y="4" width="32" height="40" rx="3" stroke="#909399" strokeWidth="2" fill="none"/>
                <line x1="15" y1="15" x2="33" y2="15" stroke="#909399" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="15" y1="22" x2="33" y2="22" stroke="#909399" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="15" y1="29" x2="25" y2="29" stroke="#909399" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <div style={{ fontWeight:500, color:'#606266', marginBottom:6 }}>電子發票管理</div>
              <div style={{ fontSize:13, color:'#C0C4CC' }}>此功能尚在開發中，即將推出</div>
            </div>
          </AdminLayout>
        );
      case 'order-settings':
        return <Screen9OrderSettings {...commonProps} />;
      default:
        return <Screen1OrderList {...commonProps} onUpdateOrder={updateOrder} />;
    }
  };

  return (
    <div style={{ height:'100vh', overflow:'hidden' }}>
      {renderScreen()}
      {tweaksVisible && (
        <TweaksPanel tweaks={tweaks} setTweak={setTweak}
          onClose={() => { setTweaksVisible(false); window.parent.postMessage({type:'__edit_mode_dismissed'},'*'); }} />
      )}
    </div>
  );
}
