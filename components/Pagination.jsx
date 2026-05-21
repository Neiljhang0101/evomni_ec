// Evomni Admin — 統一分頁元件

function Pagination({ total, page = 1, pageSize = 20, pageSizes = [20, 50, 100], onChange, onPageSizeChange, style }) {
  const [goTo, setGoTo] = React.useState('');
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const nums = React.useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const delta = 2;
    const left = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);
    const result = [1];
    if (left > 2) result.push('...');
    for (let i = left; i <= right; i++) result.push(i);
    if (right < totalPages - 1) result.push('...');
    result.push(totalPages);
    return result;
  }, [page, totalPages]);

  const handleGoTo = () => {
    const n = parseInt(goTo, 10);
    if (!isNaN(n) && n >= 1 && n <= totalPages) onChange && onChange(n);
    setGoTo('');
  };

  const btnBase = {
    width: 32, height: 32, border: '1px solid #DCDFE6', borderRadius: 4,
    cursor: 'pointer', fontSize: 13, fontFamily: 'inherit',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    lineHeight: 1, padding: 0,
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, fontSize: 13, color: '#606266', flexWrap: 'wrap', ...style }}>

      {/* 總筆數 */}
      <span style={{ color: '#909399', whiteSpace: 'nowrap' }}>共 {total} 項</span>

      {/* 每頁筆數下拉 */}
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
        <select
          value={pageSize}
          onChange={e => onPageSizeChange && onPageSizeChange(Number(e.target.value))}
          style={{
            height: 32, paddingLeft: 10, paddingRight: 26,
            border: '1px solid #DCDFE6', borderRadius: 4,
            fontSize: 13, color: '#606266', background: '#fff',
            appearance: 'none', WebkitAppearance: 'none',
            cursor: 'pointer', outline: 'none', fontFamily: 'inherit',
          }}
        >
          {pageSizes.map(s => <option key={s} value={s}>{s}項/頁</option>)}
        </select>
        <span style={{ position: 'absolute', right: 8, pointerEvents: 'none', color: '#C0C4CC', fontSize: 10, lineHeight: 1 }}>▼</span>
      </div>

      {/* 上一頁 */}
      <button
        onClick={() => page > 1 && onChange && onChange(page - 1)}
        disabled={page <= 1}
        style={{ ...btnBase, background: '#fff', color: page > 1 ? '#606266' : '#C0C4CC', cursor: page > 1 ? 'pointer' : 'not-allowed' }}
      >&#8249;</button>

      {/* 頁碼 */}
      {nums.map((n, i) =>
        n === '...' ? (
          <span key={`e${i}`} style={{ width: 32, textAlign: 'center', color: '#C0C4CC', letterSpacing: 1 }}>...</span>
        ) : (
          <button
            key={n}
            onClick={() => onChange && onChange(n)}
            style={{
              ...btnBase,
              border: `1px solid ${n === page ? '#409EFF' : '#DCDFE6'}`,
              background: n === page ? '#409EFF' : '#fff',
              color: n === page ? '#fff' : '#606266',
            }}
          >{n}</button>
        )
      )}

      {/* 下一頁 */}
      <button
        onClick={() => page < totalPages && onChange && onChange(page + 1)}
        disabled={page >= totalPages}
        style={{ ...btnBase, background: '#fff', color: page < totalPages ? '#606266' : '#C0C4CC', cursor: page < totalPages ? 'pointer' : 'not-allowed' }}
      >&#8250;</button>

      {/* 跳頁 */}
      <span style={{ color: '#606266', whiteSpace: 'nowrap' }}>前往</span>
      <input
        type="number"
        min={1}
        max={totalPages}
        value={goTo}
        onChange={e => setGoTo(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleGoTo()}
        onBlur={handleGoTo}
        style={{
          width: 48, height: 32, border: '1px solid #DCDFE6', borderRadius: 4,
          textAlign: 'center', fontSize: 13, color: '#606266', outline: 'none',
          fontFamily: 'inherit', background: '#fff',
        }}
        onFocus={e => e.target.style.borderColor = '#409EFF'}
      />
      <span style={{ color: '#606266' }}>頁</span>
    </div>
  );
}

Object.assign(window, { Pagination });
