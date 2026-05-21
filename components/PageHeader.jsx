// Shared page header: title + inline breadcrumb path
// Breadcrumb format: Array<string | { label: string, page: string }>
//   - string → plain text (non-clickable)
//   - { label, page } → clickable; calls onNavigate(page) when clicked
//   - Last item is always rendered as plain text (current page)
// Props:
//   onBack — when provided, renders a ← arrow button to the left of the title
// Usage:
//   <PageHeader title="頁面名稱" breadcrumbs={['父層', '當前']} />
//   <PageHeader title="頁面名稱" onBack={() => nav('list')} breadcrumbs={['父層', '當前']} />
//   <PageHeader title="頁面名稱" onNavigate={nav}
//     breadcrumbs={[{ label: '父層', page: 'parent-page' }, '當前']} />

function PageHeader({ title, breadcrumbs, onNavigate, onBack }) {
  const getLabel = (crumb) => typeof crumb === 'string' ? crumb : crumb.label;
  const getPage  = (crumb) => typeof crumb === 'object' ? crumb.page : null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
      {onBack && (
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#303133',
            fontSize: 18, padding: '4px 6px', display: 'flex', alignItems: 'center',
            lineHeight: 1, flexShrink: 0 }}
        >←</button>
      )}
      <h1 style={{ fontSize: EvoDS.font.pageTitle, fontWeight: 700, color: '#303133' }}>{title}</h1>
      {breadcrumbs && breadcrumbs.length > 0 && (
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
    </div>
  );
}

Object.assign(window, { PageHeader });
