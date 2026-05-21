// PagePayment — 金物流串接設定模組
// 從 html/金物流串接設定.html 抽取，移除外層 Sidebar/Header

function PagePayment({ currentPage, onNavigate }) {
  const [activeNav, setActiveNav] = React.useState('第三方金流');
  const [vendorData, setVendorData] = React.useState(null);

  const VENDOR_CATEGORIES = ['第三方金流', '銀行金流', '第三方物流', '通訊串接'];

  const getCategoryMeta = (cat) => {
    const vendors = (window.HUB_VENDORS || {})[cat] || [];
    return {
      enabledCount: vendors.filter(v => v.status === '已啟用').length,
      hasError: vendors.some(v => v.status === '連線異常'),
    };
  };

  const NAV_LEFT = VENDOR_CATEGORIES.map(c => ({ id: c, label: c, ...getCategoryMeta(c) }));
  const NAV_RIGHT = [
    { id: 'temp-freight',   label: '溫層運費設定' },
    { id: 'weight-freight', label: '重量運費設定' },
    { id: 'invoice',        label: '電子發票設定' },
    { id: 'webhook',        label: 'Webhook 管理（訂單事件通知）' },
  ];

  const navigate = (pg) => {
    if (pg === 'gs-payment-logistics') {
      setActiveNav('第三方金流');
      setVendorData(null);
    } else {
      onNavigate(pg);
    }
  };

  const openVendor = (vendor) => setVendorData(vendor);
  const backToHub  = () => setVendorData(null);

  const renderContent = () => {
    if (vendorData) {
      const { screen } = vendorData;
      const wrap = (child) => <div style={{ padding: 24 }}>{child}</div>;
      if (screen === 'vendor-auto')   return wrap(<VendorAutoScreen   vendor={vendorData} onBack={backToHub} />);
      if (screen === 'vendor-bank')   return wrap(<VendorBankScreen   vendor={vendorData} onBack={backToHub} />);
      if (screen === 'vendor-manual') return wrap(<VendorManualScreen vendor={vendorData} onBack={backToHub} />);
      if (screen === 'vendor-semi')   return wrap(<VendorSemiScreen   vendor={vendorData} onBack={backToHub} />);
      if (screen === 'recurring')     return wrap(<RecurringScreen    onBack={backToHub} />);
      if (screen === 'vendor-lineoa') return wrap(<LineOAScreen       onBack={backToHub} />);
    }

    if (VENDOR_CATEGORIES.includes(activeNav)) {
      return <VendorCategoryPanel category={activeNav} onOpenVendor={openVendor} />;
    }

    switch (activeNav) {
      case 'temp-freight':   return <TempRulesPanel />;
      case 'weight-freight': return <WeightRulesPanel />;
      case 'invoice':        return <div style={{ padding: 24 }}><InvoiceScreen /></div>;
      case 'webhook':        return <div style={{ padding: 24 }}><WebhookScreen /></div>;
      default: return null;
    }
  };

  const renderNavItem = (item) => {
    const isActive = activeNav === item.id;
    const isVendorCat = item.enabledCount !== undefined;
    return (
      <div key={item.id}
        onClick={() => { setActiveNav(item.id); setVendorData(null); }}
        style={{
          padding: '10px 20px 10px 16px', fontSize: 14, cursor: 'pointer', userSelect: 'none',
          color: isActive ? '#409EFF' : (isVendorCat && item.hasError ? '#F56C6C' : '#606266'),
          background: isActive ? '#ECF5FF' : 'transparent',
          borderRight: isActive ? '2px solid #409EFF' : '2px solid transparent',
          fontWeight: isActive ? 600 : 400,
          transition: 'background 0.15s, color 0.15s',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6,
        }}
        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F5F7FA'; }}
        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
        {isVendorCat && item.hasError && (
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#F56C6C', flexShrink: 0 }} title="有廠商連線異常" />
        )}
        {isVendorCat && !item.hasError && item.enabledCount > 0 && (
          <span style={{ fontSize: 11, color: isActive ? '#409EFF' : '#909399', fontWeight: 400, flexShrink: 0 }}>{item.enabledCount}</span>
        )}
      </div>
    );
  };

  return (
    <>
      <PageHeader
        title="金物流串接"
        breadcrumbs={['全域設定', '金物流串接']}
      />

      <div style={{ display: 'flex', gap: 0, minHeight: 'calc(100vh - 200px)' }}>
        <div style={{ width: 160, flexShrink: 0, background: '#fff', border: '1px solid #DCDFE6', borderRight: 'none', paddingTop: 8, borderRadius: '3px 0 0 3px' }}>
          <div style={{ padding: '6px 20px 4px', fontSize: 11, fontWeight: 700, color: '#C0C4CC', letterSpacing: '0.5px' }}>廠商串接</div>
          {NAV_LEFT.map(renderNavItem)}

          <div style={{ height: 1, background: '#EBEEF5', margin: '8px 0' }} />
          <div style={{ padding: '4px 20px 4px', fontSize: 11, fontWeight: 700, color: '#C0C4CC', letterSpacing: '0.5px' }}>功能設定</div>
          {NAV_RIGHT.map(renderNavItem)}
        </div>

        <div style={{ flex: 1, background: '#fff', border: '1px solid #DCDFE6', minWidth: 0, borderRadius: '0 3px 3px 0' }}>
          {renderContent()}
        </div>
      </div>
    </>
  );
}
