// Evomni Admin — DataTable + Pagination component

function DataTable({ columns, data, onEdit, onDelete }) {
  const [selected, setSelected] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [colWidths, setColWidths] = React.useState(() =>
    columns.map(col => col.width || col.minWidth || 120)
  );
  const [hoverResizer, setHoverResizer] = React.useState(null);
  const dragging = React.useRef(null);
  const total = data.length;

  const onResizeStart = (e, colIndex) => {
    e.preventDefault();
    dragging.current = { colIndex, startX: e.clientX, startWidth: colWidths[colIndex] };

    const onMouseMove = (ev) => {
      if (!dragging.current) return;
      const { colIndex, startX, startWidth } = dragging.current;
      const newWidth = Math.max(60, startWidth + (ev.clientX - startX));
      setColWidths(prev => {
        const next = [...prev];
        next[colIndex] = newWidth;
        return next;
      });
    };

    const onMouseUp = () => {
      dragging.current = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const toggleAll = () => {
    setSelected(selected.length === data.length ? [] : data.map((_, i) => i));
  };
  const toggleRow = (i) => {
    setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <div>
    <TableWrapper>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: 40 }} />
          {colWidths.map((w, i) => <col key={i} style={{ width: w }} />)}
          <col style={{ width: 120 }} />
        </colgroup>
        <thead>
          <tr>
            <th style={tableThStyle}>
              <input type="checkbox" checked={selected.length === data.length && data.length > 0}
                onChange={toggleAll} style={{ accentColor: '#303133' }} />
            </th>
            {columns.map((col, i) => (
              <th key={col.key} style={{ ...tableThStyle, position: 'relative' }}>
                <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 8 }}>
                  {col.label}
                </span>
                <div
                  onMouseDown={(e) => onResizeStart(e, i)}
                  onMouseEnter={() => setHoverResizer(i)}
                  onMouseLeave={() => setHoverResizer(null)}
                  style={{
                    position: 'absolute', right: 0, top: 0, bottom: 0, width: 5,
                    cursor: 'col-resize', userSelect: 'none',
                    background: hoverResizer === i ? '#409EFF' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                />
              </th>
            ))}
            <th style={tableThStyle}>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((row, pi) => {
            const i = (currentPage - 1) * pageSize + pi;
            return (
              <tr key={i}
                style={{ background: selected.includes(i) ? tableRowSelectedBg : tableRowBg(i) }}
                {...tableRowHandlers(i, selected.includes(i))}
              >
                <td style={tableTdStyle}>
                  <input type="checkbox" checked={selected.includes(i)} onChange={() => toggleRow(i)} style={{ accentColor: '#303133' }} />
                </td>
                {columns.map(col => (
                  <td key={col.key} style={{ ...tableTdStyle, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {col.render ? col.render(row[col.key], row) : row[col.key] || '—'}
                  </td>
                ))}
                <td style={tableTdStyle}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => onEdit && onEdit(row)} style={textBtnStyle('#409EFF')}>編輯</button>
                    <button onClick={() => onDelete && onDelete(row)} style={textBtnStyle('#F56C6C')}>刪除</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableWrapper>
    <Pagination
      total={total}
      page={currentPage}
      pageSize={pageSize}
      pageSizes={[10, 20, 50]}
      onChange={setCurrentPage}
      onPageSizeChange={ps => { setPageSize(ps); setCurrentPage(1); }}
      style={{ padding: '10px 12px' }}
    />
    </div>
  );
}

const textBtnStyle = (color) => ({
  background: 'none', border: 'none', color, cursor: 'pointer',
  fontSize: 14, fontFamily: 'inherit', padding: 0,
});

Object.assign(window, { DataTable });
