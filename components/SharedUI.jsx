// Evomni Admin — Shared UI components for 金物流串接

const sharedBtns = {
  primary: { height: 40, padding: '0 16px', background: '#303133', color: '#fff', border: '1px solid #303133', borderRadius: 0, cursor: 'pointer', fontFamily: 'Noto Sans TC,sans-serif', fontSize: 14 },
  create:  { height: 40, padding: '0 16px', background: '#409EFF', color: '#fff', border: '1px solid #409EFF', borderRadius: 0, cursor: 'pointer', fontFamily: 'Noto Sans TC,sans-serif', fontSize: 14 },
  plain:   { height: 40, padding: '0 16px', background: '#fff', color: '#303133', border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontFamily: 'Noto Sans TC,sans-serif', fontSize: 14 },
  danger:  { height: 40, padding: '0 16px', background: '#F56C6C', color: '#fff', border: '1px solid #F56C6C', borderRadius: 0, cursor: 'pointer', fontFamily: 'Noto Sans TC,sans-serif', fontSize: 14 },
  text:    { height: 40, padding: '0 8px', background: 'none', color: '#409EFF', border: 'none', cursor: 'pointer', fontFamily: 'Noto Sans TC,sans-serif', fontSize: 14 },
};

// --- Design Tokens ---
const EvoDS = {
  font: {
    pageTitle: 24,   // h1 頁面標題
    listMin:   14,   // 表格 / 列表最小字級
  },
};

function Switch({ checked, onChange, disabled }) {
  return (
    <div onClick={() => !disabled && onChange(!checked)} style={{ width: 44, height: 22, borderRadius: 9999, background: checked ? '#409EFF' : '#C0C4CC', position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1, transition: 'background .2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: checked ? 24 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = React.useState([]);
  const show = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2800);
  };
  return { toasts, show };
}

function ToastStack({ toasts }) {
  const colors = { success: { bg: '#f0f9eb', border: '#c2e7b0', color: '#67C23A' }, error: { bg: '#fef0f0', border: '#fbc4c4', color: '#F56C6C' }, warning: { bg: '#fdf6ec', border: '#f5dab1', color: '#E6A23C' }, info: { bg: '#ecf5ff', border: '#b3d8ff', color: '#409EFF' } };
  return (
    <div style={{ position: 'fixed', top: 64, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8, pointerEvents: 'none' }}>
      {toasts.map(t => { const c = colors[t.type] || colors.info; return <div key={t.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 3, color: c.color, padding: '10px 16px', fontSize: 14, boxShadow: '0 2px 8px rgba(0,0,0,.08)', minWidth: 220 }}>{t.msg}</div>; })}
    </div>
  );
}

const BannerIcons = {
  warning: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L13 13H1L7 1Z" stroke="#E6A23C" strokeWidth="1.4" strokeLinejoin="round"/><line x1="7" y1="5.5" x2="7" y2="8.5" stroke="#E6A23C" strokeWidth="1.4" strokeLinecap="round"/><circle cx="7" cy="10.5" r="0.6" fill="#E6A23C"/></svg>,
  info:    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#E6A23C" strokeWidth="1.4"/><line x1="7" y1="6" x2="7" y2="10" stroke="#E6A23C" strokeWidth="1.4" strokeLinecap="round"/><circle cx="7" cy="4" r="0.6" fill="#E6A23C"/></svg>,
  error:   <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L13 13H1L7 1Z" stroke="#F56C6C" strokeWidth="1.4" strokeLinejoin="round"/><line x1="7" y1="5.5" x2="7" y2="8.5" stroke="#F56C6C" strokeWidth="1.4" strokeLinecap="round"/><circle cx="7" cy="10.5" r="0.6" fill="#F56C6C"/></svg>,
  lock:    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="6.5" width="10" height="7" rx="1" stroke="#909399" strokeWidth="1.4"/><path d="M4 6.5V4.5a3 3 0 0 1 6 0v2" stroke="#909399" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  success: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#67C23A" strokeWidth="1.4"/><path d="M4.5 7l2 2 3-3" stroke="#67C23A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

function Banner({ type = 'warning', children, cta, onCta }) {
  const colors = { warning: { bg: '#FDF6EC', border: '#f5dab1', color: '#E6A23C' }, info: { bg: '#FEF0E6', border: '#fcd5a8', color: '#E6A23C' }, error: { bg: '#FEF0F0', border: '#fbc4c4', color: '#F56C6C' }, lock: { bg: '#EFF2F7', border: '#DCDFE6', color: '#909399' }, success: { bg: '#f0f9eb', border: '#c2e7b0', color: '#67C23A' } };
  const c = colors[type] || colors.warning;
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 3, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: c.color, marginBottom: 16 }}>
      <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{BannerIcons[type] || BannerIcons.warning}</span>
      <span style={{ flex: 1 }}>{children}</span>
      {cta && <button style={{ ...sharedBtns.plain, height: 40, fontSize: 12 }} onClick={onCta}>{cta}</button>}
    </div>
  );
}

function UpgradeLockBanner({ featureName, valueProp, onLearnMore }) {
  return (
    <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', borderLeft: '4px solid #409EFF', padding: 20, marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: '#303133', marginBottom: 8 }}>
        <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
          <rect x="2" y="6.5" width="10" height="7" rx="0" stroke="#303133" strokeWidth="1.4"/>
          <path d="M4 6.5V4.5a3 3 0 0 1 6 0v2" stroke="#303133" strokeWidth="1.4" strokeLinecap="round"/>
          <rect x="5.5" y="9" width="3" height="2.5" rx="0" fill="#303133"/>
        </svg>
        此功能為「進階電商包」專屬
      </div>
      <div style={{ fontSize: 13, color: '#606266', marginBottom: 16 }}>
        升級後即可使用「{featureName}」，{valueProp}
      </div>
      <button style={{ ...sharedBtns.create, height: 36, fontSize: 13, borderRadius: 0 }} onClick={onLearnMore}>了解進階電商包</button>
    </div>
  );
}

function FormField({ label, required, helper, error, children, style }) {
  return (
    <div style={{ marginBottom: 20, ...style }}>
      {label && <label style={{ display: 'block', fontSize: 13, color: '#606266', marginBottom: 6, fontWeight: 500 }}>{label}{required && <span style={{ color: '#F56C6C', marginLeft: 2 }}>*</span>}</label>}
      {children}
      {error && <div style={{ fontSize: 12, color: '#F56C6C', marginTop: 4 }}>{error}</div>}
      {helper && !error && <div style={{ fontSize: 12, color: '#909399', marginTop: 4 }}>{helper}</div>}
    </div>
  );
}

function EInput({ value, onChange, placeholder, disabled, type = 'text', width, style }) {
  const [focused, setFocused] = React.useState(false);
  return <input type={type} value={value ?? ''} onChange={e => onChange?.(e.target.value)} placeholder={placeholder} disabled={disabled} style={{ width: width || '100%', height: 40, padding: '0 10px', border: `1px solid ${focused ? '#409EFF' : '#DCDFE6'}`, borderRadius: 0, fontSize: 14, color: '#303133', outline: 'none', background: disabled ? '#F5F7FA' : '#fff', fontFamily: 'Noto Sans TC,sans-serif', ...style }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />;
}

function PasswordInput({ value, onChange, placeholder, disabled }) {
  const [show, setShow] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input type={show ? 'text' : 'password'} value={value ?? ''} onChange={e => onChange?.(e.target.value)} placeholder={placeholder || '儲存後顯示遮罩'} disabled={disabled} style={{ width: '100%', height: 40, padding: '0 36px 0 10px', border: `1px solid ${focused ? '#409EFF' : '#DCDFE6'}`, borderRadius: 0, fontSize: 14, color: '#303133', outline: 'none', background: disabled ? '#F5F7FA' : '#fff', fontFamily: 'Noto Sans TC,sans-serif' }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      <button onClick={() => setShow(s => !s)} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#909399', display: 'flex', alignItems: 'center' }}>
        {show
          ? <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M1 8s2.5-4 6.5-4 6.5 4 6.5 4-2.5 4-6.5 4S1 8 1 8Z" stroke="currentColor" strokeWidth="1.3"/><circle cx="7.5" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3"/><line x1="2" y1="2" x2="13" y2="13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
          : <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M1 8s2.5-4 6.5-4 6.5 4 6.5 4-2.5 4-6.5 4S1 8 1 8Z" stroke="currentColor" strokeWidth="1.3"/><circle cx="7.5" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3"/></svg>
        }
      </button>
    </div>
  );
}

function ESelect({ value, onChange, options, placeholder, disabled, width }) {
  return <select value={value ?? ''} onChange={e => onChange?.(e.target.value)} disabled={disabled} style={{ width: width || '100%', height: 40, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: value ? '#303133' : '#909399', outline: 'none', background: disabled ? '#F5F7FA' : '#fff', fontFamily: 'Noto Sans TC,sans-serif', cursor: disabled ? 'not-allowed' : 'pointer' }}>{placeholder && <option value="">{placeholder}</option>}{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>;
}

function RadioGroup({ value, onChange, options, vertical }) {
  return (
    <div style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', gap: vertical ? 14 : 24 }}>
      {options.map(o => (
        <label key={o.value} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer', fontSize: 14 }}>
          <input type="radio" checked={value === o.value} onChange={() => onChange(o.value)} style={{ marginTop: 3, accentColor: '#409EFF' }} />
          <div>
            <div style={{ color: '#303133', fontWeight: value === o.value ? 500 : 400 }}>{o.label}</div>
            {o.desc && <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>{o.desc}</div>}
          </div>
        </label>
      ))}
    </div>
  );
}

function CheckboxGroup({ value = [], onChange, options }) {
  const toggle = v => value.includes(v) ? onChange(value.filter(x => x !== v)) : onChange([...value, v]);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {options.map(o => <label key={o.value} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}><input type="checkbox" checked={value.includes(o.value)} onChange={() => toggle(o.value)} /><span>{o.label}</span></label>)}
    </div>
  );
}

function NumberInput({ value, onChange, min, max, disabled, width }) {
  return <input type="number" value={value ?? ''} onChange={e => onChange?.(e.target.value)} min={min} max={max} disabled={disabled} style={{ width: width || 100, height: 40, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', outline: 'none', background: disabled ? '#F5F7FA' : '#fff', fontFamily: 'Noto Sans TC,sans-serif' }} />;
}

function ETabs({ tabs, active, onChange, style }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #DCDFE6', ...style }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => !t.disabled && onChange(t.id)} style={{ height: 48, padding: '0 20px', background: 'none', border: 'none', borderBottom: active === t.id ? '2px solid #409EFF' : '2px solid transparent', color: t.disabled ? '#C0C4CC' : active === t.id ? '#409EFF' : '#606266', cursor: t.disabled ? 'not-allowed' : 'pointer', fontSize: 14, fontFamily: 'Noto Sans TC,sans-serif', fontWeight: active === t.id ? 600 : 400, marginBottom: -1 }}>
          {t.label}
          {t.badge > 0 && <span style={{ marginLeft: 6, background: '#F56C6C', color: '#fff', borderRadius: 9999, padding: '1px 6px', fontSize: 11 }}>{t.badge}</span>}
          {t.tag && <span style={{ marginLeft: 6, background: '#F4F4F5', color: '#909399', borderRadius: 3, padding: '1px 6px', fontSize: 11 }}>{t.tag}</span>}
        </button>
      ))}
    </div>
  );
}

function SectionCard({ title, children, collapsible, defaultOpen = true, extra }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{ background: '#fff', border: '1px solid #DCDFE6', marginBottom: 16, borderRadius: 3 }}>
      {(title || extra || collapsible) && (
        <div style={{ padding: '14px 24px', borderBottom: open ? '1px solid #DCDFE6' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: collapsible ? 'pointer' : 'default' }} onClick={() => collapsible && setOpen(o => !o)}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#303133' }}>{title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {extra}
            {collapsible && <span style={{ color: '#909399', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', display: 'inline-block' }}>▾</span>}
          </div>
        </div>
      )}
      {open && <div style={{ padding: 24 }}>{children}</div>}
    </div>
  );
}

function FixedBar({ lastSaved, onCancel, onSave, saving }) {
  return (
    <div style={{ position: 'sticky', bottom: 0, background: '#fff', borderTop: '1px solid #DCDFE6', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 100, marginTop: 16 }}>
      <span style={{ fontSize: 12, color: '#909399' }}>{lastSaved ? `上次儲存時間：${lastSaved}` : '尚未儲存'}</span>
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={sharedBtns.plain} onClick={onCancel}>取消</button>
        <button style={{ ...sharedBtns.primary, opacity: saving ? 0.7 : 1 }} onClick={onSave} disabled={saving}>{saving ? '儲存中…' : '儲存'}</button>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = { '未設定': '#909399', '設定中': '#E6A23C', '已啟用': '#67C23A', '已停用': '#909399', '連線異常': '#F56C6C', '正常': '#67C23A' };
  const color = map[status] || '#909399';
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />{status}</span>;
}

function VendorTypeTag({ type }) {
  const [show, setShow] = React.useState(false);
  const map = {
    '全自動':  { bg: '#f0f9eb', color: '#67C23A', border: '#c2e7b0', tip: '設定完成後，系統自動處理付款確認與出貨通知，幾乎不需人工介入' },
    '設定即用': { bg: '#ecf5ff', color: '#409EFF', border: '#b3d8ff', tip: '完成基本設定後即可啟用，部分流程需要人工確認' },
    '半人工':  { bg: '#fdf6ec', color: '#E6A23C', border: '#f5dab1', tip: '系統協助部分流程，但出貨或確認仍需手動操作' },
    '人工處理': { bg: '#f4f4f5', color: '#909399', border: '#d3d4d6', tip: '訂單確認及出貨完全需人工操作，適合低訂單量或特殊物流需求' },
  };
  const s = map[type] || map['設定即用'];
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <span style={{ display: 'inline-flex', alignItems: 'center', height: 20, padding: '0 8px', borderRadius: 9999, fontSize: 11, background: s.bg, color: s.color, border: `1px solid ${s.border}`, cursor: 'help' }}>{type}</span>
      {show && s.tip && (
        <div style={{ position: 'absolute', bottom: 'calc(100% + 6px)', left: 0, background: '#303133', color: '#fff', fontSize: 12, padding: '7px 10px', width: 220, lineHeight: 1.6, zIndex: 9999, pointerEvents: 'none', whiteSpace: 'normal' }}>
          {s.tip}
        </div>
      )}
    </span>
  );
}

function WebhookUrlField({ url, onCopy }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <input readOnly value={url} style={{ flex: 1, height: 40, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 12, color: '#606266', background: '#F5F7FA', fontFamily: 'monospace' }} />
      <button style={{ ...sharedBtns.plain, height: 40, whiteSpace: 'nowrap' }} onClick={() => { try { navigator.clipboard.writeText(url); } catch(e) {} onCopy?.(); }}>複製</button>
    </div>
  );
}

function ConnectionTestAlert({ result }) {
  if (!result) return null;
  const s = result.success
    ? { bg: '#f0f9eb', border: '#c2e7b0', color: '#67C23A', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#67C23A" strokeWidth="1.4"/><path d="M4.5 7l2 2 3-3" stroke="#67C23A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg> }
    : { bg: '#fef0f0', border: '#fbc4c4', color: '#F56C6C', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#F56C6C" strokeWidth="1.4"/><path d="M5 5l4 4M9 5l-4 4" stroke="#F56C6C" strokeWidth="1.4" strokeLinecap="round"/></svg> };
  return <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 3, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: s.color, marginTop: 12 }}><span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{s.icon}</span><span>{result.message}</span></div>;
}

function PageHeader({ title, breadcrumbs = [], action }) {
  const getLabel = (b) => typeof b === 'string' ? b : b.label;
  const getClick = (b) => typeof b === 'object' ? b.onClick : null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <h1 style={{ fontSize: EvoDS.font.pageTitle, fontWeight: 700, color: '#303133', margin: 0 }}>{title}</h1>
        {breadcrumbs.length > 0 && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
            {breadcrumbs.map((b, i) => {
              const isLast = i === breadcrumbs.length - 1;
              const label = getLabel(b);
              const onClick = getClick(b);
              return (
                <React.Fragment key={i}>
                  {i > 0 && <span style={{ color: '#C0C4CC' }}>/</span>}
                  {!isLast ? (
                    <span onClick={onClick} style={{ color: '#909399', cursor: onClick ? 'pointer' : 'default' }}
                      onMouseEnter={e => { if (onClick) e.currentTarget.style.color = '#606266'; }}
                      onMouseLeave={e => { if (onClick) e.currentTarget.style.color = '#909399'; }}>
                      {label}
                    </span>
                  ) : (
                    <span style={{ color: '#303133' }}>{label}</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}
      </div>
      {action && <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{action}</div>}
    </div>
  );
}

// ─── Table / List shared styles ───────────────────────────────────────────────
// Canonical table header / cell style — used by all list views.
// Spread and override individual keys when a column needs extra props
// e.g. { ...tableThStyle, whiteSpace: 'nowrap' }
const tableThStyle = {
  background: '#F5F7FA', color: '#303133', fontWeight: 700, fontSize: 14,
  padding: '10px 12px', height: 48, textAlign: 'left',
};
const tableTdStyle = {
  padding: '10px 12px', color: '#606266', fontSize: 14, height: 48, verticalAlign: 'middle',
};

// Row background helpers — use these on every <tr> in a list table.
//   tableRowBg(idx)           → base bg: odd rows #fff, even rows #FAFAFA
//   tableRowHoverBg           → hover color (unified across all tables)
//   tableRowSelectedBg        → checkbox-selected row color
//   tableRowHandlers(idx, isSelected) → {onMouseEnter, onMouseLeave} for <tr>
const tableRowHoverBg    = '#EDF2FF';
const tableRowSelectedBg = '#ECF5FF';
const tableRowBg = (idx) => idx % 2 === 1 ? '#FAFAFA' : '#fff';
const tableRowHandlers = (idx, isSelected) => ({
  onMouseEnter: (e) => { if (!isSelected) e.currentTarget.style.background = tableRowHoverBg; },
  onMouseLeave: (e) => { if (!isSelected) e.currentTarget.style.background = tableRowBg(idx); },
});

// Wraps any <table> with the standard card shadow + radius.
// Handles overflow so horizontal scroll works without clipping the shadow.
function TableWrapper({ children, style }) {
  return (
    <div style={{ background: '#fff', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)', overflow: 'hidden', ...style }}>
      <div style={{ overflowX: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

// For list pages that combine tabs + filters + table inside one card.
// Usage:
//   <ListCard tabs={<ETabs ... />} filters={<div>...</div>}>
//     <table>...</table>
//   </ListCard>
//   <Pagination ... />   ← kept outside the card
function ListCard({ tabs, filters, children, style }) {
  return (
    <div style={{ background: '#fff', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: 16, ...style }}>
      {tabs}
      {filters && <div style={{ padding: '16px 16px 0' }}>{filters}</div>}
      <div style={{ overflowX: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, {
  Switch, useToast, ToastStack, Banner, FormField,
  EInput, PasswordInput, ESelect, RadioGroup, CheckboxGroup,
  NumberInput, ETabs, SectionCard, FixedBar, StatusBadge,
  VendorTypeTag, WebhookUrlField, ConnectionTestAlert, PageHeader,
  sharedBtns, EvoDS,
  tableThStyle, tableTdStyle, TableWrapper, ListCard,
  tableRowBg, tableRowHoverBg, tableRowSelectedBg, tableRowHandlers,
});
