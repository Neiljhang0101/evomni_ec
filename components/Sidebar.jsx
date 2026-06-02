// Evomni Admin — Sidebar component
// 240px collapsible left nav, white theme

const SidebarData = [
  {
    id: 'dashboard',
    label: '儀表板',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.9"/>
        <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.9"/>
        <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.9"/>
        <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.9"/>
      </svg>
    )
  },
  {
    id: 'products',
    label: '商品中心',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <rect x="8.5" y="1" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <rect x="1" y="8.5" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <rect x="8.5" y="8.5" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
      </svg>
    ),
    children: [
      { id: 'product-list', label: '商品管理' },
      { id: 'category-management', label: '商品分類' },
      { id: 'inventory-management', label: '庫存管理' },
    ]
  },
  {
    id: 'orders',
    label: '訂單管理',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="1" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="5" y1="11" x2="8.5" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    children: [
      { id: 'order-list', label: '全部訂單' },
      { id: 'order-returns', label: '退換貨申請' },
      { id: 'order-invoice', label: '電子發票管理' },
    ]
  },
  {
    id: 'members',
    label: '顧客',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.9"/>
      </svg>
    ),
    children: [
      { id: 'customer-management', label: '顧客管理' },
      { id: 'member-segment', label: '分眾篩選（依條件挑選特定會員群）' },
      { id: 'member-blacklist', label: '黑名單' },
      { id: 'member-settings', label: '設定' },
    ]
  },
  {
    id: 'marketing',
    label: '行銷中心',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.5L9.6 5.7L14.2 6.1L10.8 9.1L11.9 13.6L8 11.3L4.1 13.6L5.2 9.1L1.8 6.1L6.4 5.7L8 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" opacity="0.9"/>
      </svg>
    ),
    children: [
      { id: 'marketing-promotions', label: '優惠活動' },
      { id: 'gift-items',           label: '贈品管理' },
      { id: 'marketing-journey',    label: '自動化旅程' },
      { id: 'push-logs',            label: '推播記錄' },
      { id: 'marketing-landing',    label: '一頁式商店' },
      { id: 'marketing-ad-tools',   label: '廣告投放工具' },
    ]
  },
  {
    id: 'analytics',
    label: '數據中心',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="8" width="3" height="6" rx="0.5" fill="currentColor" opacity="0.9"/>
        <rect x="6.5" y="5" width="3" height="9" rx="0.5" fill="currentColor" opacity="0.9"/>
        <rect x="11" y="2" width="3" height="12" rx="0.5" fill="currentColor" opacity="0.9"/>
      </svg>
    ),
    children: [
      { id: 'analytics-sales', label: '銷售概覽' },
      { id: 'analytics-products', label: '商品分析' },
      { id: 'analytics-members', label: '會員分析' },
      { id: 'analytics-marketing', label: '行銷成效' },
    ]
  },
  {
    id: 'website-design',
    label: '網站設計',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="2" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <line x1="1" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="1.4" opacity="0.9"/>
        <line x1="4" y1="14" x2="12" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.9"/>
        <line x1="8" y1="12" x2="8" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.9"/>
      </svg>
    ),
    children: [
      { id: 'website-menu',   label: '選單管理' },
      { id: 'system-pages',   label: '系統分頁' },
    ]
  },
  {
    id: 'global-settings',
    label: '全域設定',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <path d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.7 3.3l-1.06 1.06M4.36 11.64l-1.06 1.06M12.7 12.7l-1.06-1.06M4.36 4.36L3.3 3.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.9"/>
      </svg>
    ),
    children: [
      { id: 'gs-system',          label: '系統設定' },
      { id: 'gs-permissions',     label: '權限設定' },
      { id: 'gs-accounts',        label: '帳號設定' },
      { id: 'gs-version',         label: '系統版本' },
      { id: 'gs-ai-plan',         label: 'AI 方案' },
      { id: 'gs-plan-status',     label: '方案狀態' },
      { id: 'gs-ecommerce-store', label: '電商基本設定' },
      {
        id: 'gs-payment-logistics',
        label: '金物流串接',
        children: [
          { id: 'payment-hub',    label: '金流設定' },
          { id: 'gs-temp-freight', label: '物流與運費' },
          { id: 'webhook-mgmt',   label: 'Webhook 管理（訂單事件通知）' },
        ]
      },
      {
        id: 'gs-advanced',
        label: '電商進階設定',
        children: [
          { id: 'gs-third-party-login',   label: '第三方登入設定' },
          { id: 'line-oa',                label: 'LINE OA 設定' },
          { id: 'gs-cart-timeout',        label: '購物車逾時設定' },
          { id: 'gs-stock-alert',         label: '庫存警示門檻' },
          { id: 'gs-member-verification', label: '會員驗證設定' },
        ]
      },
      { id: 'gs-tracking',    label: '行銷追蹤碼' },
      { id: 'gs-newsletter',  label: '電子報' },
      { id: 'gs-msl',         label: '美安串接' },
    ]
  },
];

const NAV_GROUP_MAP = {
  'product-list': 'products', 'category-management': 'products', 'inventory-management': 'products',
  'order-list': 'orders', 'order-returns': 'orders', 'order-invoice': 'orders',
  'order-detail': 'orders', 'rma-list': 'orders', 'rma-detail': 'orders',
  'create-order': 'orders', 'order-settings': 'orders',
  'guest-query': 'orders', 'guest-result': 'orders', 'guest-rma': 'orders',
  'customer-management': 'members', 'customer-list': 'members', 'customer-detail': 'members', 'customer-settings-hub': 'members',
  'member-segment': 'members', 'member-blacklist': 'members', 'member-settings': 'members',
  'member-tags': 'members', 'member-tier': 'members', 'member-points': 'members', 'member-notifications': 'members',
  'marketing-promotions': 'marketing', 'marketing-journey': 'marketing', 'marketing-landing': 'marketing',
  'gift-items': 'marketing', 'gift-item-new': 'marketing', 'gift-item-edit': 'marketing',
  'lp-create-step1': 'marketing', 'lp-create-step2': 'marketing', 'lp-create-step3': 'marketing', 'lp-create-step4': 'marketing',
  'push-logs': 'marketing',
  'marketing-ad-tools': 'marketing',
  'analytics-sales': 'analytics', 'analytics-products': 'analytics', 'analytics-members': 'analytics', 'analytics-marketing': 'analytics',
  'gs-system': 'global-settings', 'gs-permissions': 'global-settings', 'gs-accounts': 'global-settings',
  'gs-version': 'global-settings', 'gs-ai-plan': 'global-settings', 'gs-plan-status': 'global-settings',
  'gs-ecommerce-store': 'global-settings', 'gs-payment-logistics': 'global-settings', 'gs-advanced': 'global-settings',
  'gs-tracking': 'global-settings', 'gs-newsletter': 'global-settings', 'gs-msl': 'global-settings',
  // 網站設計
  'website-menu': 'website-design', 'system-pages': 'website-design',
  // 金物流串接 L3 + sub-pages
  'payment-hub': 'global-settings', 'invoice-settings': 'global-settings', 'webhook-mgmt': 'global-settings',
  'vendor-auto': 'global-settings', 'vendor-bank': 'global-settings', 'vendor-manual': 'global-settings',
  'vendor-semi': 'global-settings', 'recurring': 'global-settings',
  'gs-temp-freight': 'global-settings', 'gs-weight-freight': 'global-settings',
  // 電商進階設定 L3
  'line-oa': 'global-settings', 'gs-third-party-login': 'global-settings',
  'gs-cart-timeout': 'global-settings', 'gs-stock-alert': 'global-settings', 'gs-member-verification': 'global-settings',
  // 電子報 sub-pages
  'gs-newsletter-flydove': 'global-settings',
};

// Auto-build L3 → L2 parent map from SidebarData
const L3_PARENT_MAP = (() => {
  const map = {};
  SidebarData.forEach(l1 => {
    (l1.children || []).forEach(l2 => {
      (l2.children || []).forEach(l3 => {
        map[l3.id] = l2.id;
      });
    });
  });
  return map;
})();

function getActiveSidebarChild(page) {
  if (['order-detail','create-order','guest-query','guest-result','guest-rma','order-settings'].includes(page)) return 'order-list';
  if (['rma-list','rma-detail'].includes(page)) return 'order-returns';
  if (['product-dashboard','product-add','product-edit'].includes(page)) return 'product-list';
  if (['coupon-list','coupon-new','coupon-edit','promotion-list','promotion-new','gift-new','flash-sale-new','bundle-new'].includes(page)) return 'marketing-promotions';
  if (['journey-overview','journey-cart','journey-sleep','journey-loss','journey-post','journey-expiry'].includes(page)) return 'marketing-journey';
  // 金物流串接 L3: 金流設定 sub-pages → highlight payment-hub
  if (['vendor-auto','vendor-bank','vendor-manual','vendor-semi','recurring','invoice-settings'].includes(page)) return 'payment-hub';
  // 金物流串接 L3: 物流與運費 sub-pages → highlight gs-temp-freight
  if (['gs-weight-freight'].includes(page)) return 'gs-temp-freight';
  // payment-hub, webhook-mgmt, gs-temp-freight are L3 items — return as-is (fall through to default)
  if (['customer-list','customer-detail'].includes(page)) return 'customer-management';
  if (['customer-settings-hub','member-tags','member-tier','member-points','member-notifications'].includes(page)) return 'member-settings';
  if (['lp-create-step1','lp-create-step2','lp-create-step3','lp-create-step4'].includes(page)) return 'marketing-landing';
  if (['gs-newsletter-flydove'].includes(page)) return 'gs-newsletter';
  // gs-advanced L3 items: return as-is (fall through)
  if (['gs-msl-detail'].includes(page)) return 'gs-msl';
  return page;
}

function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ flexShrink: 0 }}>
      <rect x="2" y="5" width="7" height="5" rx="1" stroke="#C0C4CC" strokeWidth="1.2" fill="none"/>
      <path d="M3.5 5V3.5a2 2 0 0 1 4 0V5" stroke="#C0C4CC" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function ChevronIcon({ open, size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none"
      style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Sidebar({ currentPage, onNavigate, collapsed }) {
  const activeGroup = NAV_GROUP_MAP[currentPage] || currentPage;
  const activeSidebarChild = getActiveSidebarChild(currentPage);

  const [expanded, setExpanded] = React.useState(() => {
    const initial = {};
    // L1 groups
    SidebarData.forEach(item => {
      if (item.children) initial[item.id] = item.id === activeGroup;
    });
    // L2 parents with L3 children — auto-expand if current page is inside
    const l2Parent = L3_PARENT_MAP[activeSidebarChild];
    if (l2Parent) initial[l2Parent] = true;
    return initial;
  });

  React.useEffect(() => {
    const group = NAV_GROUP_MAP[currentPage] || currentPage;
    const child = getActiveSidebarChild(currentPage);
    const l2Parent = L3_PARENT_MAP[child];
    setExpanded(prev => {
      const next = { ...prev, [group]: true };
      if (l2Parent) next[l2Parent] = true;
      return next;
    });
  }, [currentPage]);

  const toggleGroup = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const ACCENT    = '#4F8EF7';
  const ACCENT_BG = 'rgba(79,142,247,0.08)';
  const BG_HOVER  = '#F5F7FA';
  const TEXT_PRIMARY   = '#303133';
  const TEXT_SECONDARY = '#909399';
  const BORDER = '#DCDFE6';

  const isParentActive = (id) => (NAV_GROUP_MAP[currentPage] || currentPage) === id;

  // Calculate dynamic maxHeight for L1 container, accounting for open L2 sub-groups
  const calcL1MaxHeight = (children) => {
    let h = 0;
    children.forEach(child => {
      h += 44; // L2 row height
      if (child.children && expanded[child.id]) {
        h += child.children.length * 40; // L3 row height
      }
    });
    return h + 'px';
  };

  return (
    <div style={{
      width: collapsed ? 56 : 240, minWidth: collapsed ? 56 : 240,
      height: '100%', background: '#fff', borderRight: `1px solid ${BORDER}`,
      overflow: 'hidden', transition: 'width 0.22s cubic-bezier(.4,0,.2,1), min-width 0.22s cubic-bezier(.4,0,.2,1)',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: collapsed ? 0 : '0 16px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0, overflow: 'hidden' }}>
        <img src="/assets/logo.jpg" alt="Evomni" style={{ height: 28, maxWidth: collapsed ? 36 : 160, objectFit: collapsed ? 'cover' : 'contain', objectPosition: 'left center' }} />
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {SidebarData.map((item) => {
          const parentActive = isParentActive(item.id) || currentPage === item.id;
          const isOpen = !collapsed && expanded[item.id];
          return (
            <div key={item.id}>
              {/* L1 row */}
              <div
                onClick={() => {
                  if (collapsed) {
                    onNavigate(item.children ? item.children[0].id : item.id);
                  } else {
                    item.children ? toggleGroup(item.id) : onNavigate(item.id);
                  }
                }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', padding: collapsed ? 0 : '0 16px', height: 52, cursor: 'pointer', background: parentActive ? BG_HOVER : 'transparent', color: parentActive ? TEXT_PRIMARY : TEXT_SECONDARY, fontSize: 13.5, fontWeight: parentActive ? 500 : 400, userSelect: 'none', transition: 'background 0.15s, color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = BG_HOVER; e.currentTarget.style.color = TEXT_PRIMARY; }}
                onMouseLeave={e => { e.currentTarget.style.background = parentActive ? BG_HOVER : 'transparent'; e.currentTarget.style.color = parentActive ? TEXT_PRIMARY : TEXT_SECONDARY; }}
              >
                {collapsed ? (
                  <span style={{ color: parentActive ? ACCENT : TEXT_SECONDARY, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: parentActive ? ACCENT : TEXT_SECONDARY, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                      <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
                    </div>
                    {item.children && <span style={{ color: TEXT_SECONDARY }}><ChevronIcon open={isOpen} /></span>}
                  </>
                )}
              </div>

              {/* L2 + L3 container */}
              {!collapsed && item.children && (
                <div style={{ overflow: 'hidden', maxHeight: isOpen ? calcL1MaxHeight(item.children) : '0', transition: 'max-height 0.22s cubic-bezier(.4,0,.2,1)' }}>
                  {item.children.map((child) => {
                    if (child.children) {
                      // L2 with L3 children
                      const childIsOpen = expanded[child.id];
                      const anyL3Active = child.children.some(gc => activeSidebarChild === gc.id);
                      return (
                        <div key={child.id}>
                          {/* L2 header row */}
                          <div
                            onClick={() => toggleGroup(child.id)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 0 42px', height: 44, cursor: 'pointer', background: anyL3Active ? ACCENT_BG : 'transparent', color: anyL3Active ? ACCENT : TEXT_SECONDARY, fontSize: 13, fontWeight: anyL3Active ? 500 : 400, borderLeft: `2px solid ${anyL3Active ? ACCENT : 'transparent'}`, transition: 'background 0.15s, color 0.15s', userSelect: 'none' }}
                            onMouseEnter={e => { if (!anyL3Active) { e.currentTarget.style.background = BG_HOVER; e.currentTarget.style.color = TEXT_PRIMARY; }}}
                            onMouseLeave={e => { if (!anyL3Active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = TEXT_SECONDARY; }}}
                          >
                            <span style={{ whiteSpace: 'nowrap' }}>{child.label}</span>
                            <span style={{ color: TEXT_SECONDARY, opacity: 0.7 }}><ChevronIcon open={childIsOpen} size={11} /></span>
                          </div>
                          {/* L3 rows */}
                          <div style={{ overflow: 'hidden', maxHeight: childIsOpen ? child.children.length * 40 + 'px' : '0', transition: 'max-height 0.22s cubic-bezier(.4,0,.2,1)' }}>
                            {child.children.map((grandchild) => {
                              const gcActive = activeSidebarChild === grandchild.id;
                              return (
                                <div
                                  key={grandchild.id}
                                  onClick={() => onNavigate(grandchild.id)}
                                  style={{ display: 'flex', alignItems: 'center', padding: '0 16px 0 58px', height: 40, cursor: 'pointer', background: gcActive ? ACCENT_BG : 'transparent', color: gcActive ? ACCENT : TEXT_SECONDARY, fontSize: 12.5, fontWeight: gcActive ? 500 : 400, borderLeft: `2px solid ${gcActive ? ACCENT : 'transparent'}`, transition: 'background 0.15s, color 0.15s', userSelect: 'none' }}
                                  onMouseEnter={e => { if (!gcActive) { e.currentTarget.style.background = BG_HOVER; e.currentTarget.style.color = TEXT_PRIMARY; }}}
                                  onMouseLeave={e => { if (!gcActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = TEXT_SECONDARY; }}}
                                >
                                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{grandchild.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    } else {
                      // Normal L2 item
                      const active = activeSidebarChild === child.id;
                      return (
                        <div
                          key={child.id}
                          onClick={() => !child.locked && onNavigate(child.id)}
                          title={child.locked ? '此功能為進階電商包專屬，請洽詢升級' : undefined}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 0 42px', height: 44, cursor: child.locked ? 'default' : 'pointer', background: active ? ACCENT_BG : 'transparent', color: active ? ACCENT : child.locked ? '#C0C4CC' : TEXT_SECONDARY, fontSize: 13, fontWeight: active ? 500 : 400, borderLeft: `2px solid ${active ? ACCENT : 'transparent'}`, transition: 'background 0.15s, color 0.15s', userSelect: 'none' }}
                          onMouseEnter={e => { if (!child.locked && !active) { e.currentTarget.style.background = BG_HOVER; e.currentTarget.style.color = TEXT_PRIMARY; }}}
                          onMouseLeave={e => { if (!child.locked && !active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = TEXT_SECONDARY; }}}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {child.label}
                          </span>
                          {child.locked && <LockIcon />}
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { Sidebar, NAV_GROUP_MAP });
