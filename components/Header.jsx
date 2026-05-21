// Evomni Admin — Header component
// 48px fixed top bar: hamburger, breadcrumbs (left), right actions
// Breadcrumb format: Array<string | { label: string, page: string }>
//   - string → plain text (non-clickable)
//   - { label, page } → clickable; calls onNavigate(page) when clicked
//   - Last item is always rendered as plain text (current page)

// 全域方案狀態：window.__evomni_isPro (boolean)
// 切換時廣播 CustomEvent('evomni:planchange', { detail: { isPro } })
if (window.__evomni_isPro === undefined) window.__evomni_isPro = false;

function Header({ breadcrumbs = [], onNavigate, onToggleSidebar }) {
  const getLabel = (crumb) => typeof crumb === 'string' ? crumb : crumb.label;
  const getPage  = (crumb) => typeof crumb === 'object' ? crumb.page : null;

  const [isPro, setIsPro] = React.useState(window.__evomni_isPro);

  React.useEffect(() => {
    const handler = e => setIsPro(e.detail.isPro);
    window.addEventListener('evomni:planchange', handler);
    return () => window.removeEventListener('evomni:planchange', handler);
  }, []);

  const togglePlan = () => {
    const next = !isPro;
    window.__evomni_isPro = next;
    window.dispatchEvent(new CustomEvent('evomni:planchange', { detail: { isPro: next } }));
    setIsPro(next);
  };

  return (
    <div style={{
      height: 48, background: '#fff',
      borderBottom: '1px solid #DCDFE6',
      display: 'flex', alignItems: 'center',
      padding: '0 16px', gap: 12, flexShrink: 0,
    }}>
      {/* Hamburger */}
      <button
        onClick={onToggleSidebar}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#606266', fontSize: 18 }}
      >☰</button>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            const label = getLabel(crumb);
            const page  = getPage(crumb);
            const clickable = !isLast && page && onNavigate;
            return (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ color: '#C0C4CC' }}>/</span>}
                {clickable ? (
                  <span
                    onClick={() => onNavigate(page)}
                    style={{ color: '#409EFF', cursor: 'pointer' }}
                    onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.target.style.textDecoration = 'none'}
                  >{label}</span>
                ) : (
                  <span style={{ color: isLast ? '#303133' : '#909399' }}>{label}</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Plan toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 16, borderRight: '1px solid #DCDFE6' }}>
        <span style={{ fontSize: 12, color: isPro ? '#C0C4CC' : '#303133', fontWeight: isPro ? 400 : 600, transition: 'color .2s', whiteSpace: 'nowrap' }}>電商啟航</span>
        <div
          onClick={togglePlan}
          style={{ width: 36, height: 18, borderRadius: 9, background: isPro ? '#409EFF' : '#C0C4CC', position: 'relative', cursor: 'pointer', transition: 'background .2s', flexShrink: 0 }}
          title={isPro ? '目前：進階電商包（點擊切換為電商啟航）' : '目前：電商啟航（點擊切換為進階電商包）'}
        >
          <div style={{ position: 'absolute', top: 2, left: isPro ? 20 : 2, width: 14, height: 14, borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.25)' }} />
        </div>
        <span style={{ fontSize: 12, color: isPro ? '#409EFF' : '#C0C4CC', fontWeight: isPro ? 600 : 400, transition: 'color .2s', whiteSpace: 'nowrap' }}>進階電商包</span>
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <a href="#" style={{ fontSize: 13, color: '#409EFF', textDecoration: 'none' }}>查看前台 ↗</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, #5B21B6, #EC4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 12, fontWeight: 700,
          }}>A</div>
          <span style={{ fontSize: 13, color: '#606266' }}>系統管理員</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Header });
