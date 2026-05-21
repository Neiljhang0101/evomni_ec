// Evomni Admin — StatusTag component

function StatusTag({ type, children }) {
  const styles = {
    success: { bg: '#f0f9eb', color: '#67C23A', border: '#c2e7b0' },
    warning: { bg: '#fdf6ec', color: '#E6A23C', border: '#f5dab1' },
    danger:  { bg: '#fef0f0', color: '#F56C6C', border: '#fbc4c4' },
    info:    { bg: '#f4f4f5', color: '#909399', border: '#d3d4d6' },
    primary: { bg: '#ecf5ff', color: '#409EFF', border: '#b3d8ff' },
  };
  const s = styles[type] || styles.info;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      height: 22, padding: '0 10px', borderRadius: 9999,
      fontSize: 12, border: `1px solid ${s.border}`,
      background: s.bg, color: s.color,
    }}>{children}</span>
  );
}

Object.assign(window, { StatusTag });
