// Evomni Admin — Header component
// 48px fixed top bar: hamburger, breadcrumbs (left), right actions
// Breadcrumb format: Array<string | { label: string, page: string }>
//   - string → plain text (non-clickable)
//   - { label, page } → clickable; calls onNavigate(page) when clicked
//   - Last item is always rendered as plain text (current page)

// 全域方案狀態：window.__evomni_isPro (boolean)
// 切換時廣播 CustomEvent('evomni:planchange', { detail: { isPro } })
if (window.__evomni_isPro === undefined) window.__evomni_isPro = false;

// 前台頁面路徑 — 相對於 index.html 所在目錄
const _htmlRoot = 'html/';

const FRONTEND_PAGES = [
  { label: '前台導覽 · 全部頁面', url: _htmlRoot + '前台導覽.html', route: '所有前台畫面總覽', overview: true },
  { label: '商品列表', url: _htmlRoot + '商品列表.html', route: '/products' },
  { label: '商品詳情', url: _htmlRoot + '商品詳情.html', route: '/products/:slug' },
  { label: '購物車', url: _htmlRoot + '購物車.html', route: '/cart' },
  { label: '結帳頁', url: _htmlRoot + '結帳頁.html', route: '/checkout' },
  { label: '訂單確認頁', url: _htmlRoot + '訂單確認頁.html', route: '/order/confirmed' },
  { label: '會員中心', url: _htmlRoot + '會員中心.html', route: '/account' },
  { label: '訪客訂單查詢', url: _htmlRoot + '訪客訂單查詢.html', route: '/order-query' },
  { label: '會員登入 / 認證流程', url: _htmlRoot + '會員登入.html', route: '/login · /forgot · /reset · /verify · /resend' },
  { label: '一頁式商店', url: _htmlRoot + '一頁式商店.html', route: '/lp/:slug（銷售頁 · 規格加購 · 結帳）' },
];

function Header({ breadcrumbs = [], onNavigate, onToggleSidebar }) {
  const getLabel = (crumb) => typeof crumb === 'string' ? crumb : crumb.label;
  const getPage  = (crumb) => typeof crumb === 'object' ? crumb.page : null;

  const [isPro, setIsPro] = React.useState(window.__evomni_isPro);
  const [showFrontendMenu, setShowFrontendMenu] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    if (!showFrontendMenu) return;
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setShowFrontendMenu(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [showFrontendMenu]);

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
        {/* 查看前台 dropdown */}
        <div ref={menuRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowFrontendMenu(s => !s)}
            style={{
              background: showFrontendMenu ? '#ECF5FF' : 'none',
              border: '1px solid #409EFF', cursor: 'pointer',
              padding: '4px 10px', fontSize: 12, color: '#409EFF',
              display: 'flex', alignItems: 'center', gap: 4,
              fontFamily: 'inherit', whiteSpace: 'nowrap', borderRadius: 0,
              transition: 'background .15s',
            }}
          >
            查看前台
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#409EFF" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 8L8 2M8 2H4M8 2V6"/>
            </svg>
          </button>
          {showFrontendMenu && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 4px)', right: 0,
              background: '#fff', border: '1px solid #DCDFE6',
              boxShadow: '0 4px 16px rgba(0,0,0,.1)',
              zIndex: 1000, minWidth: 192,
            }}>
              <div style={{ padding: '7px 14px 6px', fontSize: 11, color: '#909399', borderBottom: '1px solid #F0F0F0', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                前台 Prototype
              </div>
              {FRONTEND_PAGES.map(page => (
                <a
                  key={page.url}
                  href={page.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowFrontendMenu(false)}
                  onMouseEnter={e => { e.currentTarget.style.background = page.overview ? '#E8F1FF' : '#F5F7FA'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = page.overview ? '#F5F9FF' : '#fff'; }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '9px 14px', textDecoration: 'none',
                    borderBottom: '1px solid #F0F0F0', background: page.overview ? '#F5F9FF' : '#fff',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: page.overview ? 600 : 500, color: page.overview ? '#409EFF' : '#303133' }}>{page.label}</div>
                    <div style={{ fontSize: 11, color: '#909399', marginTop: 2 }}>{page.route}</div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#C0C4CC" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M2 10L10 2M10 2H5M10 2V7"/>
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
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
