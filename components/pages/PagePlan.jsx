// PagePlan — 方案管理與升級模組

// ─── Color tokens ─────────────────────────────────────────────────────────────
const PLAN_C = {
  blue:     '#409EFF',
  green:    '#67C23A',
  warning:  '#E6A23C',
  danger:   '#F56C6C',
  text:     '#303133',
  sub:      '#606266',
  muted:    '#909399',
  disabled: '#F5F7FA',
  border:   '#DCDFE6',
  light:    '#EBEEF5',
};

// ─── Locked features data ─────────────────────────────────────────────────────
const FEATURES_INCLUDED = [
  '產品管理（上限 1,000 件）', '訂單管理', '會員系統', '金物流串接',
  '基礎數據分析', '關鍵意見領袖（KOL）分潤管理', '產品廣告小幫手',
];
const FEATURES_LOCKED = [
  { name: '一頁式商店',         tip: '建立專屬銷售頁，搭配限時促銷與加購設計，大幅提升單頁轉換率' },
  { name: '自動化行銷旅程',     tip: '根據顧客行為自動觸發個人化行銷訊息，不需人工操作' },
  { name: '進階會員分眾系統',   tip: '依消費頻率、金額、類型自動分群，精準推播每個客層' },
  { name: '會員消費習慣分群（RFM）',  tip: '識別忠實客、高風險流失客，即時採取對應行動' },
  { name: '購後產品自動推薦',   tip: '根據購買紀錄智慧推薦下一件最可能購買的產品' },
  { name: '沉睡客自動喚醒',     tip: '自動偵測沉睡顧客並發送個人化喚醒訊息，降低流失' },
  { name: '進階促銷活動成效分析', tip: '深度拆解每場促銷的投資報酬率（ROI）與顧客參與度' },
  { name: '倉儲物流串接',       tip: '整合倉儲系統，自動同步庫存與出貨狀態' },
  { name: '站內搜尋關鍵字分析', tip: '追蹤顧客搜尋意圖，優化產品標題與分類' },
];

// ─── Mock upgrade records (Screen 6) ─────────────────────────────────────────
const MOCK_RECORDS = [
  { id: '#U001', merchant: '森林咖啡有限公司', current: '電商啟航方案', target: '進階電商包', time: '2026-05-14 09:23', status: 'pending',     contact: '王小明', phone: '0912-345-678' },
  { id: '#U002', merchant: '海洋運動用品',     current: '電商啟航方案', target: '進階電商包', time: '2026-05-13 15:47', status: 'in_progress', contact: '李美玲', phone: '0987-654-321' },
  { id: '#U003', merchant: '山岳戶外生活',     current: '電商啟航方案', target: '進階電商包', time: '2026-05-10 11:02', status: 'completed',   contact: '陳大偉', phone: '0934-567-890' },
  { id: '#U004', merchant: '花藝工坊',         current: '電商啟航方案', target: '進階電商包', time: '2026-05-08 16:30', status: 'completed',   contact: '吳雅惠', phone: '0956-789-012' },
  { id: '#U005', merchant: '美妝星球',         current: '電商啟航方案', target: '進階電商包', time: '2026-05-05 10:15', status: 'cancelled',   contact: '鄭志遠', phone: '0978-901-234' },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
function IcoLock({ size = 14, color = PLAN_C.muted }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="2" y="6.5" width="10" height="7" rx="0" stroke={color} strokeWidth="1.4"/>
      <path d="M4 6.5V4.5a3 3 0 0 1 6 0v2" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="5.5" y="9" width="3" height="2.5" rx="0" fill={color}/>
    </svg>
  );
}
function PlanIcoCheck({ size = 14, color = PLAN_C.green }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke={color} strokeWidth="1.4"/>
      <path d="M4.5 7l2 2 3-3" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IcoRefresh({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M12 7a5 5 0 1 1-1.5-3.5" stroke={PLAN_C.sub} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M12 2v3h-3" stroke={PLAN_C.sub} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function PlanIcoWarn({ size = 14, color = PLAN_C.warning }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M7 1L13 13H1L7 1Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
      <line x1="7" y1="5.5" x2="7" y2="8.5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="7" cy="10.5" r="0.7" fill={color}/>
    </svg>
  );
}
function IcoError({ size = 14, color = PLAN_C.danger }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke={color} strokeWidth="1.4"/>
      <line x1="5" y1="5" x2="9" y2="9" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="9" y1="5" x2="5" y2="9" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function IcoSuccess({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={PLAN_C.green} strokeWidth="2.5"/>
      <path d="M14 24l7 7 13-13" stroke={PLAN_C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IcoMail({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="3" width="11" height="8" stroke={PLAN_C.muted} strokeWidth="1.3"/>
      <path d="M1.5 3l5.5 4.5L12.5 3" stroke={PLAN_C.muted} strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  );
}
function IcoSearch({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke={PLAN_C.muted} strokeWidth="1.3"/>
      <line x1="9.5" y1="9.5" x2="13" y2="13" stroke={PLAN_C.muted} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
function IcoArrow({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function PlanProgress({ pct, color = PLAN_C.blue, height = 6, showText = true }) {
  const safeP = Math.min(100, Math.max(0, pct));
  return (
    <div>
      <div style={{ height, background: PLAN_C.light }}>
        <div style={{ height: '100%', width: `${safeP}%`, background: color, transition: 'width 0.3s' }} />
      </div>
      {showText && <div style={{ fontSize: 11, color: PLAN_C.muted, marginTop: 3 }}>{safeP}%</div>}
    </div>
  );
}

function PlanAlert({ type, children }) {
  const cfg = {
    warning: { bg: '#fdf6ec', border: '#f5dab1', icon: <PlanIcoWarn color={PLAN_C.warning} /> },
    error:   { bg: '#fef0f0', border: '#fbc4c4', icon: <PlanIcoWarn color={PLAN_C.danger} /> },
    info:    { bg: '#ecf5ff', border: '#b3d8ff', icon: <PlanIcoCheck color={PLAN_C.blue} /> },
    success: { bg: '#f0f9eb', border: '#c2e7b0', icon: <PlanIcoCheck color={PLAN_C.green} /> },
  };
  const s = cfg[type] || cfg.info;
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, padding: '10px 14px', marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
      <div style={{ flexShrink: 0, marginTop: 1 }}>{s.icon}</div>
      <div style={{ color: PLAN_C.sub, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function PlanTag({ type = 'info', size = 'md', children }) {
  const cfg = {
    info:    { bg: '#ecf5ff', color: PLAN_C.blue,    border: '#b3d8ff' },
    warning: { bg: '#fdf6ec', color: PLAN_C.warning, border: '#f5dab1' },
    success: { bg: '#f0f9eb', color: PLAN_C.green,   border: '#c2e7b0' },
    danger:  { bg: '#fef0f0', color: PLAN_C.danger,  border: '#fbc4c4' },
    neutral: { bg: '#F5F7FA', color: PLAN_C.muted,   border: PLAN_C.border  },
  };
  const s = cfg[type] || cfg.info;
  const pad = size === 'sm' ? '1px 6px' : '2px 8px';
  const fs  = size === 'sm' ? 11 : 12;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: pad, background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontSize: fs, fontWeight: 500, lineHeight: 1.6, flexShrink: 0 }}>
      {children}
    </span>
  );
}

function PlanTooltip({ content, children }) {
  const [show, setShow] = React.useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && content && (
        <div style={{ position: 'absolute', bottom: '100%', left: 0, marginBottom: 6, background: PLAN_C.text, color: '#fff', padding: '8px 12px', fontSize: 12, lineHeight: 1.6, width: 220, zIndex: 9999, boxShadow: '0 2px 8px rgba(0,0,0,.15)', pointerEvents: 'none' }}>
          {content}
        </div>
      )}
    </span>
  );
}

function PlanBtn({ children, onClick, variant = 'plain', size = 'md', disabled = false, loading = false, style: extra }) {
  const h = size === 'sm' ? 32 : 40;
  const fs = size === 'sm' ? 13 : 14;
  const px = size === 'sm' ? 12 : 16;
  const variants = {
    primary: { background: PLAN_C.blue,    color: '#fff', borderColor: PLAN_C.blue    },
    dark:    { background: PLAN_C.text,    color: '#fff', borderColor: PLAN_C.text    },
    plain:   { background: '#fff',    color: PLAN_C.text, borderColor: PLAN_C.border  },
    muted:   { background: PLAN_C.disabled, color: PLAN_C.muted, borderColor: PLAN_C.light },
  };
  const v = variants[disabled ? 'muted' : variant] || variants.plain;
  return (
    <button
      onClick={!disabled && !loading ? onClick : undefined}
      style={{ height: h, padding: `0 ${px}px`, background: v.background, color: v.color, border: `1px solid ${v.borderColor}`, borderRadius: 0, cursor: (disabled || loading) ? 'not-allowed' : 'pointer', fontFamily: 'Noto Sans TC, sans-serif', fontSize: fs, fontWeight: 400, display: 'inline-flex', alignItems: 'center', gap: 6, opacity: (disabled || loading) ? 0.7 : 1, ...extra }}>
      {loading && <span style={{ width: 13, height: 13, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />}
      {children}
    </button>
  );
}

function PlanFormInput({ label, value, onChange, placeholder, disabled, error, required }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <div style={{ fontSize: 13, color: PLAN_C.sub, marginBottom: 6 }}>{label}{required && <span style={{ color: PLAN_C.danger }}> *</span>}</div>}
      <input
        value={value} onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder} disabled={disabled}
        style={{ width: '100%', height: 36, padding: '0 10px', border: `1px solid ${error ? PLAN_C.danger : PLAN_C.border}`, borderRadius: 0, fontSize: 14, outline: 'none', background: disabled ? PLAN_C.disabled : '#fff', fontFamily: 'Noto Sans TC, sans-serif', color: disabled ? PLAN_C.muted : PLAN_C.text }}
      />
      {error && <div style={{ fontSize: 12, color: PLAN_C.danger, marginTop: 4 }}>{error}</div>}
    </div>
  );
}

function PlanFormSelect({ label, value, onChange, options, required }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <div style={{ fontSize: 13, color: PLAN_C.sub, marginBottom: 6 }}>{label}{required && <span style={{ color: PLAN_C.danger }}> *</span>}</div>}
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ width: '100%', height: 36, padding: '0 10px', border: `1px solid ${PLAN_C.border}`, borderRadius: 0, fontSize: 14, background: '#fff', fontFamily: 'Noto Sans TC, sans-serif', color: PLAN_C.text, outline: 'none' }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function PlanFormTextarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <div style={{ fontSize: 13, color: PLAN_C.sub, marginBottom: 6 }}>{label}</div>}
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        style={{ width: '100%', padding: '8px 10px', border: `1px solid ${PLAN_C.border}`, borderRadius: 0, fontSize: 14, resize: 'vertical', fontFamily: 'Noto Sans TC, sans-serif', color: PLAN_C.text, outline: 'none' }} />
    </div>
  );
}

function PlanModalShell({ open, onClose, title, width = 480, children, footer }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
      <div style={{ background: '#fff', width, maxWidth: '94vw', border: `1px solid ${PLAN_C.border}`, display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${PLAN_C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>{title}</span>
          {onClose && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: PLAN_C.muted, fontSize: 18, lineHeight: 1, padding: 2 }}>x</button>
          )}
        </div>
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>{children}</div>
        {footer && <div style={{ padding: '12px 20px', borderTop: `1px solid ${PLAN_C.border}`, display: 'flex', justifyContent: 'flex-end', gap: 8, flexShrink: 0 }}>{footer}</div>}
      </div>
    </div>
  );
}

// ─── Local Toast ──────────────────────────────────────────────────────────────
function usePlanToast() {
  const [items, setItems] = React.useState([]);
  const show = (msg, type = 'success') => {
    const id = Date.now();
    setItems(t => [...t, { id, msg, type }]);
    setTimeout(() => setItems(t => t.filter(x => x.id !== id)), 3000);
  };
  return { items, show };
}
function PlanToastList({ items }) {
  const cfg = { success: { bg:'#f0f9eb',border:'#c2e7b0',color:PLAN_C.green }, error:{bg:'#fef0f0',border:'#fbc4c4',color:PLAN_C.danger}, warning:{bg:'#fdf6ec',border:'#f5dab1',color:PLAN_C.warning}, info:{bg:'#ecf5ff',border:'#b3d8ff',color:PLAN_C.blue} };
  return (
    <div style={{ position:'fixed',top:64,right:24,zIndex:9999,display:'flex',flexDirection:'column',gap:8,pointerEvents:'none' }}>
      {items.map(t => { const s=cfg[t.type]||cfg.info; return <div key={t.id} style={{ background:s.bg,border:`1px solid ${s.border}`,color:s.color,padding:'10px 16px',fontSize:14,boxShadow:'0 2px 8px rgba(0,0,0,.08)',minWidth:220 }}>{t.msg}</div>; })}
    </div>
  );
}

// ─── Demo Nav ─────────────────────────────────────────────────────────────────
const PLAN_DEMO_TABS = [
  { group: '商家後台', items: [
    { id: 'plan-normal',   label: 'S1 方案狀態（正常）' },
    { id: 'plan-warning',  label: 'S1 方案狀態（30天）' },
    { id: 'plan-critical', label: 'S1 方案狀態（7天）' },
    { id: 'plan-expired',  label: 'S1 方案狀態（已到期）' },
    { id: 'lock-banner',   label: 'S2 Lock Banner' },
    { id: 'compare-plans', label: 'S3 方案比較' },
    { id: 'success',       label: 'S5 詢問成功' },
  ]},
  { group: '內部後台', items: [
    { id: 'internal-list', label: 'S6+7 升級紀錄' },
  ]},
];

function PlanDemoNav({ current, onChange }) {
  const btnStyle = (id) => ({
    height: 36, padding: '0 10px', fontSize: 12, cursor: 'pointer',
    border: `1px solid ${current === id ? PLAN_C.blue : PLAN_C.border}`,
    background: current === id ? '#ecf5ff' : '#fff',
    color: current === id ? PLAN_C.blue : PLAN_C.sub, borderRadius: 0,
    fontFamily: 'Noto Sans TC, sans-serif', whiteSpace: 'nowrap',
  });
  return (
    <div style={{ background: '#fff', borderBottom: `1px solid ${PLAN_C.border}`, padding: '10px 0', flexShrink: 0, marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: PLAN_C.muted, marginRight: 4, whiteSpace: 'nowrap' }}>Prototype Demo</span>
        {PLAN_DEMO_TABS[0].items.map(t => (
          <button key={t.id} onClick={() => onChange(t.id)} style={btnStyle(t.id)}>{t.label}</button>
        ))}
        <div style={{ width: 1, height: 20, background: PLAN_C.border, margin: '0 4px', flexShrink: 0 }} />
        {PLAN_DEMO_TABS[1].items.map(t => (
          <button key={t.id} onClick={() => onChange(t.id)} style={btnStyle(t.id)}>{t.label}</button>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 1: 方案狀態頁 ──────────────────────────────────────────────────────

function PlanStatusPage({ planState, onOpenInquiry, onCompare }) {
  const scenarios = {
    'plan-normal':   { days: 231, expiry: '2026/12/31', pct: 63, tokenPct: 25 },
    'plan-warning':  { days: 25,  expiry: '2026/06/08', pct: 7,  tokenPct: 68 },
    'plan-critical': { days: 5,   expiry: '2026/05/19', pct: 1,  tokenPct: 85 },
    'plan-expired':  { days: 0,   expiry: '2026/05/10', pct: 0,  tokenPct: 100 },
  };
  const sc = scenarios[planState] || scenarios['plan-normal'];

  const barColor = sc.days <= 7 ? PLAN_C.danger : sc.days <= 30 ? PLAN_C.warning : PLAN_C.blue;
  const tokenColor = sc.tokenPct >= 90 ? PLAN_C.danger : sc.tokenPct >= 70 ? PLAN_C.warning : PLAN_C.blue;
  const isExpired = planState === 'plan-expired';

  const alertBlock = () => {
    if (planState === 'plan-warning') return (
      <PlanAlert type="warning">您的方案將於 {sc.expiry} 到期，請盡早聯絡營運輔導顧問續約</PlanAlert>
    );
    if (planState === 'plan-critical' || planState === 'plan-expired') return (
      <PlanAlert type="error">您的方案剩餘 {sc.days} 天即到期，請立即聯絡營運輔導顧問</PlanAlert>
    );
    return null;
  };

  return (
    <div style={{ position: 'relative' }}>
      {planState === 'plan-critical' && (
        <div style={{ background: '#fef0f0', border: `1px solid ${PLAN_C.danger}`, padding: '10px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <PlanIcoWarn color={PLAN_C.danger} />
            <span style={{ color: PLAN_C.danger, fontWeight: 500 }}>方案明日到期，請立即確認續約事宜</span>
          </div>
          <PlanBtn variant="plain" size="sm" onClick={onOpenInquiry}>聯絡營運輔導顧問</PlanBtn>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ background: '#fff', border: `1px solid ${PLAN_C.border}` }}>
          <div style={{ padding: 20 }}>
            {alertBlock()}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>主機方案</span>
              <button onClick={() => {}} style={{ background: 'none', border: 'none', cursor: 'pointer', color: PLAN_C.sub, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}><IcoRefresh /> 重新整理</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: PLAN_C.muted }}>方案名稱</span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>Evomni 主機服務</span>
              <span style={{ fontSize: 12, color: PLAN_C.muted }}>到期日</span>
              <span style={{ fontSize: 14 }}>{sc.expiry}</span>
              <span style={{ fontSize: 12, color: PLAN_C.muted }}>剩餘天數</span>
              <span style={{ fontSize: 14, color: barColor, fontWeight: 500 }}>剩餘 {sc.days} 天</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: PLAN_C.sub }}>到期進度</span>
                <span style={{ fontSize: 12, color: barColor }}>{sc.days} 天</span>
              </div>
              <PlanProgress pct={sc.pct} color={barColor} showText={false} />
            </div>
            {sc.days <= 90 && sc.days > 30 && (
              <p style={{ fontSize: 12, color: PLAN_C.muted, marginBottom: 12 }}>方案將於 {sc.expiry} 到期，建議提前規劃續約</p>
            )}
          </div>
          <div style={{ borderTop: `1px solid ${PLAN_C.border}`, padding: '12px 20px' }}>
            <PlanBtn variant="plain" onClick={onOpenInquiry}>聯絡營運輔導顧問續約</PlanBtn>
          </div>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${PLAN_C.border}` }}>
          <div style={{ padding: 20 }}>
            {alertBlock()}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>AI 方案</span>
              <button onClick={() => {}} style={{ background: 'none', border: 'none', cursor: 'pointer', color: PLAN_C.sub, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}><IcoRefresh /> 重新整理</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: PLAN_C.muted }}>方案名稱</span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>Evomni AI 方案</span>
              <span style={{ fontSize: 12, color: PLAN_C.muted }}>到期日</span>
              <span style={{ fontSize: 14 }}>{sc.expiry}</span>
              <span style={{ fontSize: 12, color: PLAN_C.muted }}>剩餘天數</span>
              <span style={{ fontSize: 14, color: barColor, fontWeight: 500 }}>剩餘 {sc.days} 天</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: PLAN_C.sub }}>到期進度</span>
                <span style={{ fontSize: 12, color: barColor }}>{sc.days} 天</span>
              </div>
              <PlanProgress pct={sc.pct} color={barColor} showText={false} />
            </div>
            <div style={{ marginTop: 16, marginBottom: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: PLAN_C.sub }}>AI Token 使用量</span>
                <span style={{ fontSize: 12, color: tokenColor }}>1,250,000 / 5,000,000 tokens</span>
              </div>
              <PlanProgress pct={sc.tokenPct} color={tokenColor} showText={false} />
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${PLAN_C.border}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <PlanBtn variant="plain" onClick={onOpenInquiry}>聯絡營運輔導顧問續約</PlanBtn>
            <a href="#" style={{ fontSize: 13, color: PLAN_C.blue }}>查看 AI 使用詳情 &rarr;</a>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${PLAN_C.border}` }}>
        <div style={{ padding: 20 }}>
          {alertBlock()}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>電商方案</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <PlanTag type="info">電商啟航方案</PlanTag>
                <span style={{ fontSize: 13, color: PLAN_C.sub }}>到期日：{sc.expiry}</span>
                <span style={{ fontSize: 13, color: barColor, fontWeight: 500 }}>剩餘 {sc.days} 天</span>
              </div>
            </div>
            <button onClick={() => {}} style={{ background: 'none', border: 'none', cursor: 'pointer', color: PLAN_C.sub, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}><IcoRefresh /> 重新整理</button>
          </div>
          <div style={{ marginBottom: 16 }}>
            <PlanProgress pct={sc.pct} color={barColor} showText={false} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: PLAN_C.sub, marginBottom: 10 }}>已包含功能</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {FEATURES_INCLUDED.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                    <PlanIcoCheck size={14} />
                    <span style={{ color: PLAN_C.sub }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: PLAN_C.sub, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>進階電商包專屬功能</span>
                <IcoLock size={13} color={PLAN_C.muted} />
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {FEATURES_LOCKED.map(f => (
                  <li key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                    <PlanTooltip content={f.tip}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'help' }}>
                        <IcoLock size={14} color={PLAN_C.muted} />
                        <span style={{ color: PLAN_C.muted }}>{f.name}</span>
                      </span>
                    </PlanTooltip>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${PLAN_C.border}`, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <PlanBtn variant="primary" onClick={onCompare}>了解進階電商包並升級 &rarr;</PlanBtn>
          <PlanBtn variant="plain" onClick={onOpenInquiry}>聯絡營運輔導顧問續約</PlanBtn>
        </div>
      </div>

      {isExpired && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ textAlign: 'center', padding: 40 }}>
            <IcoError size={56} color={PLAN_C.danger} />
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>您的電商啟航方案已到期</div>
            <div style={{ fontSize: 14, color: PLAN_C.sub, marginBottom: 24 }}>功能已暫停，請立即聯絡營運輔導顧問恢復服務</div>
            <PlanBtn variant="primary" onClick={onOpenInquiry}>聯絡營運輔導顧問</PlanBtn>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Screen 2: UpgradeLockBanner 元件 ─────────────────────────────────────────

function LockBannerPage() {
  return (
    <div>
      <div style={{ fontSize: 14, color: PLAN_C.sub, marginBottom: 20, padding: '10px 14px', background: '#ecf5ff', border: '1px solid #b3d8ff' }}>
        以下為 UpgradeLockBanner 元件展示，此元件嵌入於任何鎖定功能頁面頂部。
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 13, color: PLAN_C.muted, marginBottom: 10, fontWeight: 500 }}>變體 1：預設（無預覽截圖）</div>
        <div style={{ background: PLAN_C.disabled, border: `1px solid ${PLAN_C.border}`, borderLeft: `4px solid ${PLAN_C.blue}`, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: PLAN_C.text, marginBottom: 8 }}>
            <IcoLock size={15} color={PLAN_C.text} />
            <span>此功能為「進階電商包」專屬</span>
          </div>
          <div style={{ fontSize: 13, color: PLAN_C.sub, marginBottom: 16 }}>
            升級後即可使用「自動化行銷旅程」，讓行銷工作自動化、用數據驅動再行銷
          </div>
          <PlanBtn variant="primary" size="sm">了解進階電商包</PlanBtn>
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 13, color: PLAN_C.muted, marginBottom: 10, fontWeight: 500 }}>變體 2：帶模糊預覽截圖（show-preview=true）</div>
        <div style={{ background: PLAN_C.disabled, border: `1px solid ${PLAN_C.border}`, borderLeft: `4px solid ${PLAN_C.blue}`, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: PLAN_C.text, marginBottom: 8 }}>
            <IcoLock size={15} color={PLAN_C.text} />
            <span>此功能為「進階電商包」專屬</span>
          </div>
          <div style={{ fontSize: 13, color: PLAN_C.sub, marginBottom: 16 }}>
            升級後即可使用「會員消費習慣分群（RFM）」，識別高價值客群，把行銷預算花在刀口上
          </div>
          <PlanBtn variant="primary" size="sm">了解進階電商包</PlanBtn>
          <div style={{ marginTop: 16, padding: 8, border: `1px solid ${PLAN_C.border}` }}>
            <div style={{ height: 120, background: 'linear-gradient(135deg, #e8f4ff 0%, #f0f0f0 100%)', filter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: PLAN_C.muted }}>
              功能預覽截圖
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 13, color: PLAN_C.muted, marginBottom: 10, fontWeight: 500 }}>各功能 Banner 文案一覽</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {FEATURES_LOCKED.map(f => (
            <div key={f.name} style={{ background: PLAN_C.disabled, border: `1px solid ${PLAN_C.border}`, borderLeft: `3px solid ${PLAN_C.blue}`, padding: '12px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                <IcoLock size={13} color={PLAN_C.text} />
                <span>{f.name}</span>
              </div>
              <div style={{ fontSize: 12, color: PLAN_C.sub }}>{f.tip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 3: 方案比較頁 ─────────────────────────────────────────────────────

function ComparePlansPage({ onOpenInquiry }) {
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>升級您的電商方案</h1>
      <p style={{ fontSize: 14, color: PLAN_C.sub, marginBottom: 28 }}>根據您的使用需求，選擇最適合的方案：</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div style={{ background: '#fff', border: `1px solid ${PLAN_C.border}` }}>
          <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 12 }}>
              <PlanTag type="neutral">目前的方案</PlanTag>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>電商啟航方案</div>
            <div style={{ fontSize: 12, color: PLAN_C.muted, marginBottom: 12 }}>適合電商起步，建立完整上架、收款、出貨流程</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: PLAN_C.text, marginBottom: 20 }}>
              NT$29,800 <span style={{ fontSize: 13, fontWeight: 400, color: PLAN_C.muted }}>/ 年</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {FEATURES_INCLUDED.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: PLAN_C.sub }}>
                  <PlanIcoCheck size={14} color={PLAN_C.green} /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ borderTop: `1px solid ${PLAN_C.border}`, padding: '16px 24px' }}>
            <PlanBtn variant="muted" disabled style={{ width: '100%', justifyContent: 'center' }}>目前方案</PlanBtn>
          </div>
        </div>

        <div style={{ background: '#fff', border: `2px solid ${PLAN_C.warning}` }}>
          <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 12 }}>
              <PlanTag type="warning">推薦升級</PlanTag>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>進階電商包</div>
            <div style={{ fontSize: 12, color: PLAN_C.muted, marginBottom: 12 }}>為成長期電商打造，進階行銷、數據分析與自動化全面升級</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: PLAN_C.text, marginBottom: 20 }}>
              NT$39,800 <span style={{ fontSize: 13, fontWeight: 400, color: PLAN_C.muted }}>/ 年</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: PLAN_C.text }}>
                <PlanIcoCheck size={14} color={PLAN_C.blue} /> 所有電商啟航方案功能
              </li>
              {FEATURES_LOCKED.map(f => (
                <li key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: PLAN_C.sub }}>
                  <PlanIcoCheck size={14} color={PLAN_C.blue} /> {f.name}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ borderTop: `1px solid ${PLAN_C.border}`, padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <PlanBtn variant="primary" onClick={onOpenInquiry} style={{ width: '100%', justifyContent: 'center' }}>聯絡營運輔導顧問詢問升級</PlanBtn>
            <div style={{ position: 'relative' }}>
              <PlanTooltip content="線上升級功能即將推出，敬請期待">
                <PlanBtn variant="muted" disabled style={{ width: '100%', justifyContent: 'center' }}>即將推出</PlanBtn>
              </PlanTooltip>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '16px 0', borderTop: `1px solid ${PLAN_C.border}` }}>
        <span style={{ fontSize: 14, color: PLAN_C.sub }}>不確定哪個方案適合您？</span>
        {' '}
        <a href="https://www.webtech.com.tw/contact" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: PLAN_C.blue }}>預約方案諮詢</a>
      </div>
    </div>
  );
}

// ─── Screen 4: 升級詢問 Dialog ────────────────────────────────────────────────

function UpgradeInquiryDialog({ open, onClose, onSuccess }) {
  const [form, setForm] = React.useState({
    contact: '王小明',
    phone: '',
    timeSlot: 'any',
    note: '',
    confirmed: false,
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.contact.trim()) e.contact = '請輸入聯絡人姓名';
    if (!form.phone.trim()) e.phone = '請輸入有效的聯絡電話（例：0912345678）';
    else if (!/^09\d{8}$/.test(form.phone.replace(/[-\s]/g, ''))) e.phone = '請輸入有效的聯絡電話（例：0912345678）';
    if (!form.confirmed) e.confirmed = '請確認資訊正確後勾選';
    return e;
  };

  const submit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1200);
  };

  const timeSlotOpts = [
    { value: 'any',      label: '任何時間' },
    { value: 'morning',  label: '早上 9:00–12:00' },
    { value: 'afternoon',label: '下午 1:00–5:00' },
  ];

  return (
    <PlanModalShell open={open} onClose={onClose} title="升級詢問" width={560}
      footer={<>
        <PlanBtn variant="plain" onClick={onClose}>取消</PlanBtn>
        <PlanBtn variant="primary" loading={loading} onClick={submit}>{loading ? '送出中...' : '送出詢問'}</PlanBtn>
      </>}>
      <div style={{ fontSize: 13, color: PLAN_C.sub, marginBottom: 20, padding: '10px 14px', background: '#ecf5ff', border: '1px solid #b3d8ff' }}>
        我們已幫您預填以下資訊，確認後送出即可：
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: PLAN_C.sub, marginBottom: 6 }}>商家名稱</div>
        <div style={{ height: 36, padding: '0 10px', background: PLAN_C.disabled, border: `1px solid ${PLAN_C.border}`, display: 'flex', alignItems: 'center', fontSize: 14, color: PLAN_C.muted }}>
          森林咖啡有限公司
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 13, color: PLAN_C.sub, marginBottom: 6 }}>目前方案</div>
          <div style={{ height: 36, padding: '0 10px', background: PLAN_C.disabled, border: `1px solid ${PLAN_C.border}`, display: 'flex', alignItems: 'center', fontSize: 14, color: PLAN_C.muted }}>電商啟航方案</div>
        </div>
        <div>
          <div style={{ fontSize: 13, color: PLAN_C.sub, marginBottom: 6 }}>目標方案</div>
          <div style={{ height: 36, padding: '0 10px', background: PLAN_C.disabled, border: `1px solid ${PLAN_C.border}`, display: 'flex', alignItems: 'center', fontSize: 14, color: PLAN_C.muted }}>進階電商包</div>
        </div>
      </div>

      <PlanFormInput label="聯絡人" value={form.contact} onChange={v => set('contact', v)} required
        error={errors.contact} />
      <PlanFormInput label="聯絡電話" value={form.phone} onChange={v => { set('phone', v); setErrors(e => ({ ...e, phone: '' })); }}
        placeholder="請輸入您的聯絡電話" required error={errors.phone} />
      <PlanFormSelect label="方便聯絡時段" value={form.timeSlot} onChange={v => set('timeSlot', v)} options={timeSlotOpts} />
      <PlanFormTextarea label="備註（選填）" value={form.note} onChange={v => set('note', v)} placeholder="如有特殊需求請說明" rows={2} />

      <div>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={form.confirmed} onChange={e => { set('confirmed', e.target.checked); setErrors(er => ({ ...er, confirmed: '' })); }}
            style={{ marginTop: 3, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: PLAN_C.sub }}>我確認以上資訊正確</span>
        </label>
        {errors.confirmed && <div style={{ fontSize: 12, color: PLAN_C.danger, marginTop: 4 }}>{errors.confirmed}</div>}
      </div>
    </PlanModalShell>
  );
}

// ─── Screen 5: 詢問送出成功 ──────────────────────────────────────────────────

function SuccessPage({ onHome, onPlanStatus }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0' }}>
      <IcoSuccess size={60} />
      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>詢問已送出</div>
      <div style={{ fontSize: 14, color: PLAN_C.sub, textAlign: 'center', marginBottom: 12, lineHeight: 1.7 }}>
        我們的營運輔導顧問將在 1 個工作天內與您聯繫，<br />
        請留意您的聯絡電話 0912-345-678
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: PLAN_C.muted, marginBottom: 28 }}>
        <IcoMail size={13} />
        <span>確認信已寄送至您的信箱 it@world-group.com.tw</span>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <PlanBtn variant="primary" onClick={onHome}>返回後台首頁</PlanBtn>
        <PlanBtn variant="plain" onClick={onPlanStatus}>返回方案狀態頁</PlanBtn>
      </div>
    </div>
  );
}

// ─── Screen 6: 內部後台 — 升級紀錄列表 ───────────────────────────────────────

const PLAN_STATUS_MAP = {
  pending:     { label: '待處理', type: 'warning' },
  in_progress: { label: '處理中', type: 'info' },
  completed:   { label: '已開通', type: 'success' },
  cancelled:   { label: '已取消', type: 'neutral' },
};

function InternalUpgradeListPage({ onOpenConfirm, showToast }) {
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [searchInput, setSearchInput] = React.useState('');
  const [sortAsc, setSortAsc] = React.useState(false);

  const filtered = MOCK_RECORDS
    .filter(r => filterStatus === 'all' || r.status === filterStatus)
    .filter(r => !search || r.merchant.includes(search))
    .slice()
    .sort((a, b) => sortAsc ? a.time.localeCompare(b.time) : b.time.localeCompare(a.time));

  const statusOpts = [
    { value: 'all',         label: '全部狀態' },
    { value: 'pending',     label: '待處理' },
    { value: 'in_progress', label: '處理中' },
    { value: 'completed',   label: '已開通' },
    { value: 'cancelled',   label: '已取消' },
  ];

  const thStyle = { padding: '10px 14px', textAlign: 'left', fontSize: EvoDS.font.listMin, fontWeight: 500, color: PLAN_C.sub, borderBottom: `1px solid ${PLAN_C.border}`, background: PLAN_C.disabled, whiteSpace: 'nowrap' };
  const tdStyle = { padding: '12px 14px', fontSize: EvoDS.font.listMin, borderBottom: `1px solid ${PLAN_C.border}`, verticalAlign: 'middle' };

  return (
    <div>
      <div style={{ background: '#fdf6ec', border: `1px solid #f5dab1`, padding: '8px 14px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: PLAN_C.warning }}>
        <PlanIcoWarn size={13} />
        此頁面為 Evomni 內部後台，僅供業務、PM、技術支援人員使用
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          style={{ height: 36, padding: '0 10px', border: `1px solid ${PLAN_C.border}`, borderRadius: 0, fontSize: 13, fontFamily: 'Noto Sans TC, sans-serif', color: PLAN_C.text, width: 140, outline: 'none' }}>
          {statusOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <div style={{ display: 'flex', gap: 0, flex: 1, maxWidth: 340 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><IcoSearch /></span>
            <input value={searchInput} onChange={e => setSearchInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setSearch(searchInput)}
              placeholder="搜尋商家名稱..."
              style={{ width: '100%', height: 36, padding: '0 10px 0 32px', border: `1px solid ${PLAN_C.border}`, borderRadius: 0, fontSize: 13, fontFamily: 'Noto Sans TC, sans-serif', outline: 'none' }} />
          </div>
          <PlanBtn variant="plain" size="sm" onClick={() => setSearch(searchInput)} style={{ borderLeft: 'none' }}>搜尋</PlanBtn>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${PLAN_C.border}`, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>商家名稱</th>
              <th style={thStyle}>目前方案</th>
              <th style={thStyle}>目標方案</th>
              <th style={{ ...thStyle, cursor: 'pointer' }} onClick={() => setSortAsc(!sortAsc)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  詢問時間
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d={sortAsc ? 'M2 7l3-4 3 4' : 'M2 3l3 4 3-4'} stroke={PLAN_C.sub} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </th>
              <th style={thStyle}>狀態</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '48px 0', textAlign: 'center', color: PLAN_C.muted, fontSize: 13 }}>
                  {search ? `找不到符合「${search}」的升級紀錄` : '目前沒有升級紀錄'}
                </td>
              </tr>
            ) : filtered.map((r, i) => {
              const s = PLAN_STATUS_MAP[r.status];
              const canProcess = r.status === 'pending' || r.status === 'in_progress';
              return (
                <tr key={r.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 500 }}>{r.merchant}</div>
                    <div style={{ fontSize: 12, color: PLAN_C.muted }}>{r.id}</div>
                  </td>
                  <td style={{ ...tdStyle, color: PLAN_C.sub }}>{r.current}</td>
                  <td style={{ ...tdStyle, color: PLAN_C.sub }}>{r.target}</td>
                  <td style={{ ...tdStyle, color: PLAN_C.muted }}>{r.time}</td>
                  <td style={tdStyle}><PlanTag type={s.type} size="sm">{s.label}</PlanTag></td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    {canProcess ? (
                      <PlanBtn variant="primary" size="sm" onClick={() => onOpenConfirm(r)}>處理</PlanBtn>
                    ) : (
                      <PlanBtn variant="plain" size="sm" onClick={() => showToast(`${r.merchant} — 已於 ${r.time} ${s.label}`, 'info')}>查看</PlanBtn>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, fontSize: 13, color: PLAN_C.sub }}>
        <span>共 {filtered.length} 筆</span>
        <div style={{ display: 'flex', gap: 0 }}>
          {['<', '1', '>'].map((p, i) => (
            <button key={i} style={{ width: 32, height: 32, border: `1px solid ${PLAN_C.border}`, borderRight: i === 2 ? `1px solid ${PLAN_C.border}` : 'none', background: p === '1' ? PLAN_C.text : '#fff', color: p === '1' ? '#fff' : PLAN_C.sub, cursor: 'pointer', fontSize: 13, fontFamily: 'Noto Sans TC, sans-serif', borderRadius: 0 }}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 7: 確認開通 Dialog ────────────────────────────────────────────────

function ConfirmActivationDialog({ open, record, onClose, onSuccess }) {
  const [newDate, setNewDate] = React.useState('');
  const [note, setNote] = React.useState('');
  const [dateError, setDateError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const confirm = () => {
    if (!newDate) { setDateError('請選擇新到期日'); return; }
    setDateError('');
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(record); }, 1200);
  };

  if (!record) return null;

  return (
    <PlanModalShell open={open} onClose={onClose} title="確認方案開通" width={480}
      footer={<>
        <PlanBtn variant="plain" onClick={onClose}>取消</PlanBtn>
        <PlanBtn variant="primary" loading={loading} onClick={confirm}>{loading ? '開通中...' : '確認開通'}</PlanBtn>
      </>}>

      <div style={{ background: PLAN_C.disabled, padding: '14px 16px', marginBottom: 20, border: `1px solid ${PLAN_C.border}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 12px', fontSize: 13 }}>
          <span style={{ color: PLAN_C.muted }}>商家</span>
          <span style={{ fontWeight: 500 }}>{record.merchant}</span>
          <span style={{ color: PLAN_C.muted }}>升級</span>
          <span style={{ color: PLAN_C.sub }}>{record.current} <span style={{ margin: '0 4px' }}>&rarr;</span> {record.target}</span>
          <span style={{ color: PLAN_C.muted }}>聯絡人</span>
          <span>{record.contact}</span>
          <span style={{ color: PLAN_C.muted }}>聯絡電話</span>
          <span>{record.phone}</span>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: PLAN_C.sub, marginBottom: 6 }}>新到期日 <span style={{ color: PLAN_C.danger }}>*</span></div>
        <input type="date" value={newDate} onChange={e => { setNewDate(e.target.value); setDateError(''); }}
          min={new Date().toISOString().split('T')[0]}
          style={{ width: '100%', height: 36, padding: '0 10px', border: `1px solid ${dateError ? PLAN_C.danger : PLAN_C.border}`, borderRadius: 0, fontSize: 14, fontFamily: 'Noto Sans TC, sans-serif', outline: 'none', color: PLAN_C.text }} />
        {dateError && <div style={{ fontSize: 12, color: PLAN_C.danger, marginTop: 4 }}>{dateError}</div>}
      </div>

      <PlanFormTextarea label="付款確認說明（選填）" value={note} onChange={setNote}
        placeholder="請輸入收款備注，例如：匯款後五碼 xxxxx" rows={2} />

      <div style={{ background: '#fdf6ec', border: `1px solid #f5dab1`, padding: '10px 14px', display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
        <PlanIcoWarn size={14} color={PLAN_C.warning} />
        <span style={{ color: PLAN_C.sub }}>確認後將立即解鎖商家的進階電商包功能，並自動寄出開通通知信</span>
      </div>
    </PlanModalShell>
  );
}

// ─── PagePlan ─────────────────────────────────────────────────────────────────

function PagePlan({ currentPage, onNavigate, show }) {
  const [activeDemo, setActiveDemo] = React.useState('plan-normal');
  const [showInquiry, setShowInquiry]     = React.useState(false);
  const [showConfirm, setShowConfirm]     = React.useState(false);
  const [confirmRecord, setConfirmRecord] = React.useState(null);
  const { items: toasts, show: showLocalToast } = usePlanToast();

  const showToast = show || showLocalToast;

  const switchDemo = (id) => {
    setActiveDemo(id);
  };

  const renderContent = () => {
    if (activeDemo.startsWith('plan')) {
      return (
        <PlanStatusPage planState={activeDemo}
          onOpenInquiry={() => setShowInquiry(true)}
          onCompare={() => switchDemo('compare-plans')} />
      );
    }
    if (activeDemo === 'lock-banner') return <LockBannerPage />;
    if (activeDemo === 'compare-plans') {
      return <ComparePlansPage onOpenInquiry={() => setShowInquiry(true)} />;
    }
    if (activeDemo === 'success') {
      return <SuccessPage onHome={() => onNavigate && onNavigate('dashboard')} onPlanStatus={() => switchDemo('plan-normal')} />;
    }
    if (activeDemo === 'internal-list') {
      return (
        <InternalUpgradeListPage
          showToast={showToast}
          onOpenConfirm={r => { setConfirmRecord(r); setShowConfirm(true); }} />
      );
    }
    return null;
  };

  const getPageTitle = () => {
    if (activeDemo.startsWith('plan')) return '方案狀態';
    if (activeDemo === 'lock-banner') return 'UpgradeLockBanner 元件';
    if (activeDemo === 'compare-plans') return null;
    if (activeDemo === 'success') return null;
    if (activeDemo === 'internal-list') return '方案升級紀錄';
    return '';
  };

  const title = getPageTitle();

  return (
    <div>
      <PlanDemoNav current={activeDemo} onChange={switchDemo} />
      {title && <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>{title}</h1>}
      {renderContent()}

      <UpgradeInquiryDialog
        open={showInquiry}
        onClose={() => setShowInquiry(false)}
        onSuccess={() => { setShowInquiry(false); switchDemo('success'); }} />
      <ConfirmActivationDialog
        open={showConfirm}
        record={confirmRecord}
        onClose={() => { setShowConfirm(false); setConfirmRecord(null); }}
        onSuccess={r => {
          setShowConfirm(false);
          setConfirmRecord(null);
          showToast(`已成功開通 ${r.merchant} 的進階電商包`, 'success');
        }} />

      <PlanToastList items={toasts} />
    </div>
  );
}
