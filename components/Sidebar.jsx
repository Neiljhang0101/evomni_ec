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
    label: '產品中心',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <rect x="8.5" y="1" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <rect x="1" y="8.5" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <rect x="8.5" y="8.5" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
      </svg>
    ),
    children: [
      { id: 'product-list', label: '產品管理' },
      { id: 'category-management', label: '產品分類' },
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
      { id: 'member-segment', label: '分眾篩選' },
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
      { id: 'analytics-products', label: '產品分析' },
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
      { id: 'gs-system',           label: '系統設定' },
      { id: 'gs-permissions',      label: '權限設定' },
      { id: 'gs-accounts',         label: '帳號設定' },
      { id: 'gs-version',          label: '系統版本' },
      { id: 'gs-ai-plan',          label: 'AI 方案' },
      { id: 'gs-plan-status',      label: '方案狀態' },
      { id: 'gs-ecommerce-store',  label: '電商基本設定' },
      { id: 'gs-payment-logistics',label: '金物流串接' },
      { id: 'gs-advanced',         label: '電商進階設定' },
      { id: 'gs-tracking',         label: '行銷追蹤碼' },
      { id: 'gs-newsletter',       label: '電子報' },
      { id: 'gs-msl',              label: '美安串接' },
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
  'gs-tracking': 'global-settings',
  'gs-newsletter': 'global-settings',
  'gs-msl': 'global-settings',
  // 網站設計
  'website-menu':  'website-design',
  'system-pages':  'website-design',
  // 金物流串接 sub-pages
  'payment-hub': 'global-settings', 'invoice-settings': 'global-settings', 'webhook-mgmt': 'global-settings',
  'vendor-auto': 'global-settings', 'vendor-bank': 'global-settings', 'vendor-manual': 'global-settings',
  'vendor-semi': 'global-settings', 'recurring': 'global-settings',
  // 電商進階設定 sub-pages
  'line-oa': 'global-settings', 'gs-third-party-login': 'global-settings',
  'gs-cart-timeout': 'global-settings', 'gs-stock-alert': 'global-settings', 'gs-member-verification': 'global-settings',
  // 電子報 sub-pages
  'gs-newsletter-flydove': 'global-settings',
};

function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ flexShrink: 0 }}>
      <rect x="2" y="5" width="7" height="5" rx="1" stroke="#C0C4CC" strokeWidth="1.2" fill="none"/>
      <path d="M3.5 5V3.5a2 2 0 0 1 4 0V5" stroke="#C0C4CC" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
      style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Sidebar({ currentPage, onNavigate, collapsed }) {
  const activeGroup = NAV_GROUP_MAP[currentPage] || currentPage;

  const [expanded, setExpanded] = React.useState(() => {
    const initial = {};
    SidebarData.forEach(item => {
      if (item.children) initial[item.id] = item.id === activeGroup;
    });
    return initial;
  });

  // Keep the active group expanded when navigating
  React.useEffect(() => {
    const group = NAV_GROUP_MAP[currentPage] || currentPage;
    setExpanded(prev => ({ ...prev, [group]: true }));
  }, [currentPage]);

  const toggleGroup = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const ACCENT = '#4F8EF7';
  const ACCENT_BG = 'rgba(79,142,247,0.08)';
  const BG_HOVER = '#F5F7FA';
  const TEXT_PRIMARY = '#303133';
  const TEXT_SECONDARY = '#909399';
  const BORDER = '#DCDFE6';

  // Determine which child should be highlighted
  // Map our internal page IDs back to the sidebar child ID
  const activeSidebarChild = (() => {
    if (['order-detail','create-order','guest-query','guest-result','guest-rma','order-settings'].includes(currentPage)) {
      return 'order-list';
    }
    if (['rma-list','rma-detail'].includes(currentPage)) {
      return 'order-returns';
    }
    if (['product-dashboard','product-add','product-edit'].includes(currentPage)) {
      return 'product-list';
    }
    if (['coupon-list','coupon-new','coupon-edit','promotion-list','promotion-new','gift-new','flash-sale-new','bundle-new'].includes(currentPage)) {
      return 'marketing-promotions';
    }
    if (['journey-overview','journey-cart','journey-sleep','journey-loss','journey-post','journey-expiry'].includes(currentPage)) {
      return 'marketing-journey';
    }
    if (['payment-hub','invoice-settings','webhook-mgmt','vendor-auto','vendor-bank','vendor-manual','vendor-semi','recurring','gs-temp-freight','gs-weight-freight'].includes(currentPage)) {
      return 'gs-payment-logistics';
    }
    if (['customer-list','customer-detail'].includes(currentPage)) {
      return 'customer-management';
    }
    if (['customer-settings-hub','member-tags','member-tier','member-points','member-notifications'].includes(currentPage)) {
      return 'member-settings';
    }
    if (['lp-create-step1','lp-create-step2','lp-create-step3','lp-create-step4'].includes(currentPage)) {
      return 'marketing-landing';
    }
    if (['gs-newsletter-flydove'].includes(currentPage)) {
      return 'gs-newsletter';
    }
    if (['line-oa','gs-third-party-login','gs-cart-timeout','gs-stock-alert','gs-member-verification'].includes(currentPage)) {
      return 'gs-advanced';
    }
    if (['gs-msl-detail'].includes(currentPage)) {
      return 'gs-msl';
    }
    return currentPage;
  })();

  const isParentActive = (id) => (NAV_GROUP_MAP[currentPage] || currentPage) === id;

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

              {!collapsed && item.children && (
                <div style={{ overflow: 'hidden', maxHeight: isOpen ? item.children.length * 52 + 'px' : '0', transition: 'max-height 0.22s cubic-bezier(.4,0,.2,1)' }}>
                  {item.children.map((child) => {
                    const active = activeSidebarChild === child.id;
                    return (
                      <div
                        key={child.id}
                        onClick={() => !child.locked && onNavigate(child.id)}
                        title={child.locked ? '此功能為進階電商包專屬，請洽詢升級' : undefined}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 0 42px', height: 52, cursor: child.locked ? 'default' : 'pointer', background: active ? ACCENT_BG : 'transparent', color: active ? ACCENT : child.locked ? '#C0C4CC' : TEXT_SECONDARY, fontSize: 13, fontWeight: active ? 500 : 400, borderLeft: `2px solid ${active ? ACCENT : 'transparent'}`, transition: 'background 0.15s, color 0.15s', userSelect: 'none' }}
                        onMouseEnter={e => { if (!child.locked && !active) { e.currentTarget.style.background = BG_HOVER; e.currentTarget.style.color = TEXT_PRIMARY; } }}
                        onMouseLeave={e => { if (!child.locked && !active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = TEXT_SECONDARY; } }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                          {child.label}
                        </span>
                        {child.locked && <LockIcon />}
                      </div>
                    );
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
