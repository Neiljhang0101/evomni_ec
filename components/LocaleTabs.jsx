// Evomni Admin — LocaleTabs component
// Multi-locale form wrapper. Wraps any locale-specific fields in 繁中/EN tabs.
// Usage:
//   <LocaleTabs locales={['繁中','EN']} renderContent={(locale) => <YourFields locale={locale} />} />

function LocaleTabs({ locales, renderContent }) {
  const [active, setActive] = React.useState(locales[0]);

  return (
    <div style={{ border: 'none', borderRadius: 0, background: '#fff' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex' }}>
        {locales.map(locale => {
          const isActive = locale === active;
          return (
            <button
              key={locale}
              onClick={() => setActive(locale)}
              style={{
                height: 40, padding: '0 20px',
                background: isActive ? '#EFF6FF' : '#fff',
                color: isActive ? '#409EFF' : '#606266',
                border: 'none',
                borderBottom: isActive ? '2px solid #409EFF' : 'none',
                cursor: 'pointer',
                fontFamily: 'Noto Sans TC, sans-serif',
                fontSize: 14,
                fontWeight: isActive ? 700 : 400,
              }}
            >
              {locale}
            </button>
          );
        })}
        {/* Fill remaining space with white */}
        <div style={{ flex: 1, background: '#fff' }} />
      </div>

      {/* Content area — blue background */}
      <div style={{ background: '#EFF6FF', padding: 24 }}>
        {renderContent(active)}
      </div>
    </div>
  );
}

// ── LocaleField: label with optional required marker ──────────────────────
function LocaleField({ label, required, helper, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
        {required && <span style={{ color: '#F56C6C', fontSize: 13 }}>*</span>}
        <span style={{ fontSize: 14, color: '#303133' }}>{label}</span>
      </div>
      {children}
      {helper && (
        <div style={{ fontSize: 12, color: '#909399', marginTop: 4 }}>{helper}</div>
      )}
    </div>
  );
}

// ── ImageUpload: dashed upload box ─────────────────────────────────────────
function ImageUpload({ width = 140, height = 140 }) {
  return (
    <div style={{
      width, height,
      border: '1px dashed #BFDBFE',
      background: '#F0F7FF',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', color: '#93C5FD', fontSize: 28,
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#409EFF'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#BFDBFE'}
    >+</div>
  );
}

Object.assign(window, { LocaleTabs, LocaleField, ImageUpload });
