// Evomni Admin — 頁簽搜尋列通用元件
// Props:
//   tabs          Array<{ key, label, count?, dot?, danger? }>
//   activeTab     string
//   onTabChange   (key: string) => void
//   children      optional — 搜尋 / 篩選列內容（呼叫方自行控制 padding 與佈局）
//   style         optional — 覆蓋外層容器樣式

function TabSearchBar({ tabs, activeTab, onTabChange, children, style }) {
  return (
    <div style={{ background: '#fff', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', marginBottom: 16, ...style }}>

      {/* 頁簽列 */}
      <div style={{ display: 'flex', overflowX: 'auto', padding: '0 8px' }}>
        {tabs.map(tab => {
          const isAct = activeTab === tab.key;
          const textColor = isAct ? '#409EFF' : (tab.danger ? '#F56C6C' : '#606266');
          return (
            <div
              key={tab.key}
              onClick={() => onTabChange && onTabChange(tab.key)}
              style={{
                position: 'relative',
                padding: '0 12px',
                minWidth: 88,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                cursor: 'pointer',
                fontSize: 14,
                whiteSpace: 'nowrap',
                color: textColor,
                borderBottom: `2px solid ${isAct ? '#409EFF' : 'transparent'}`,
                transition: 'color 0.15s',
                userSelect: 'none',
              }}
            >
              {tab.label}
              {!tab.dot && tab.count != null && tab.count > 0 && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  minWidth: 18, height: 18, padding: '0 4px',
                  borderRadius: 9999, fontSize: 11, fontWeight: 700,
                  background: isAct ? '#ECF5FF' : (tab.danger ? '#FEF0F0' : '#F5F7FA'),
                  color: isAct ? '#409EFF' : (tab.danger ? '#F56C6C' : '#909399'),
                }}>{tab.count}</span>
              )}
              {tab.dot && (
                <span style={{
                  position: 'absolute', top: 10, right: 6,
                  width: 7, height: 7, borderRadius: '50%', background: '#F56C6C',
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* 搜尋 / 篩選列（選填） */}
      {children}

    </div>
  );
}

Object.assign(window, { TabSearchBar });
