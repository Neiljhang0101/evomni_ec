// Evomni Admin — SearchForm component
// Generic search/filter bar used above data tables

function SearchForm({ fields, onSearch, onReset }) {
  const [values, setValues] = React.useState({});

  const handleChange = (key, val) => setValues(prev => ({ ...prev, [key]: val }));

  const Btn = ({ children, primary, onClick }) => (
    <button onClick={onClick} style={{
      height: 40, padding: '0 16px',
      background: primary ? '#303133' : '#fff',
      color: primary ? '#fff' : '#303133',
      border: `1px solid ${primary ? '#303133' : '#DCDFE6'}`,
      borderRadius: 0, cursor: 'pointer',
      fontFamily: 'Noto Sans TC, sans-serif', fontSize: 14,
    }}>{children}</button>
  );

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Search fields row */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexWrap: 'nowrap', marginBottom: 12, overflowX: 'auto' }}>
        {fields.map(f => (
          <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
            <label style={{ fontSize: 12, color: '#606266' }}>{f.label}</label>
            {f.type === 'select' ? (
              <select
                value={values[f.key] || ''}
                onChange={e => handleChange(f.key, e.target.value)}
                style={{ height: 40, padding: '0 8px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', background: '#fff', width: 120 }}
              >
                <option value="">請選擇{f.label}</option>
                {(f.options || []).map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : f.type === 'daterange' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input type="text" placeholder="開始日期"
                  style={{ height: 40, padding: '0 8px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', width: 100, outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#409EFF'}
                  onBlur={e => e.target.style.borderColor = '#DCDFE6'} />
                <span style={{ fontSize: 13, color: '#909399' }}>至</span>
                <input type="text" placeholder="結束日期"
                  style={{ height: 40, padding: '0 8px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', width: 100, outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#409EFF'}
                  onBlur={e => e.target.style.borderColor = '#DCDFE6'} />
              </div>
            ) : (
              <input
                type="text"
                placeholder={f.placeholder || `請輸入${f.label}`}
                value={values[f.key] || ''}
                onChange={e => handleChange(f.key, e.target.value)}
                style={{ height: 40, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', width: f.width || 160, outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#409EFF'}
                onBlur={e => e.target.style.borderColor = '#DCDFE6'}
              />
            )}
          </div>
        ))}
        {/* Clear + Search buttons inline */}
        <div style={{ display: 'flex', gap: 8, alignSelf: 'flex-end', flexShrink: 0 }}>
          <Btn onClick={() => { setValues({}); onReset && onReset(); }}>清除</Btn>
          <Btn primary onClick={() => onSearch && onSearch(values)}>搜尋</Btn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SearchForm });
