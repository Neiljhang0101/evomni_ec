// PageDashboard — 儀表板首頁
// 統一 Prototype 入口，提供系統各模組快速概覽與導覽

function PageDashboard({ onNavigate }) {
  const stats = [
    { label: '總產品數', value: '128', sub: '+3 本週新增', color: '#409EFF' },
    { label: '本月訂單', value: '47', sub: '較上月 +8%', color: '#67C23A' },
    { label: '本月成交金額', value: 'NT$ 238,400', sub: '較上月 +12%', color: '#E6A23C' },
    { label: '活躍會員數', value: '1,284', sub: '本月新增 32', color: '#909399' },
  ];

  const quickLinks = [
    { label: '產品管理', desc: '管理所有產品與庫存', page: 'product-list' },
    { label: '全部訂單', desc: '查看與處理訂單', page: 'order-list' },
    { label: '顧客管理', desc: '會員列表與分眾', page: 'customer-management' },
    { label: '優惠活動', desc: '折扣碼與促銷設定', page: 'marketing-promotions' },
    { label: '銷售概覽', desc: '數據分析報表', page: 'analytics-sales' },
    { label: '金物流串接', desc: '金流與物流廠商設定', page: 'gs-payment-logistics' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>儀表板</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #DCDFE6', padding: 24, borderRadius: 3 }}>
            <div style={{ fontSize: 12, color: '#909399', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#909399' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: 24, marginBottom: 16, borderRadius: 3 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>快速前往</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
          {quickLinks.map(item => (
            <div key={item.page} onClick={() => onNavigate(item.page)}
              style={{ padding: '16px', border: '1px solid #DCDFE6', borderRadius: 3, cursor: 'pointer', background: '#fff', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#409EFF'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#DCDFE6'}
            >
              <div style={{ fontWeight: 600, color: '#303133', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: '#909399' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#F0F9EB', border: '1px solid #C2E7B0', padding: '12px 16px', fontSize: 13, color: '#67C23A' }}>
        Prototype 整合版本 — 所有模組已串接為單一入口，請透過左側導覽列切換頁面。
      </div>
    </div>
  );
}
