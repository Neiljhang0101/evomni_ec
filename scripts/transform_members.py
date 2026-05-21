import re, sys, os

src = os.path.join(os.path.dirname(__file__), '..', 'html', '會員管理後台.html')
dst = os.path.join(os.path.dirname(__file__), '..', 'components', 'pages', 'PageMembers.jsx')

with open(src, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract inline script block
match = re.search(r'<script type="text/babel">\n(.*?)\n</script>', content, re.DOTALL)
if not match:
    print("ERROR: could not find script block")
    sys.exit(1)
script = match.group(1)

# Rename conflicting components (longer names first to avoid partial matches)
renames = [
    ('UpgradeLockBanner', 'MemUpgradeLockBanner'),
    ('EmptyState',        'MemEmptyState'),
    ('InfoBanner',        'MemInfoBanner'),
    ('Drawer',            'MemDrawer'),
    ('Dialog',            'MemDialog'),
    ('Toast',             'MemToast'),
    ('Card',              'MemCard'),
]
for old, new in renames:
    script = re.sub(r'\b' + old + r'\b', new, script)

# Replace App function + ReactDOM call with PageMembers
app_start = script.find('\nfunction App() {')
if app_start == -1:
    print("ERROR: could not find App function")
    sys.exit(1)
app_end = script.rfind('ReactDOM.createRoot')
app_end = script.find('\n', script.find(');', app_end)) + 1

new_func = '''
function PageMembers({ currentPage, onNavigate, show }) {
  const showToast = show || (() => {});
  const [page, setPage] = React.useState(currentPage || 'customer-list');
  const [pageData, setPageData] = React.useState(null);

  const MEMBER_PAGE_IDS = new Set([
    'customer-management','customer-list','customer-detail','customer-settings-hub',
    'member-tier','member-points','member-tags','member-blacklist',
    'member-settings','member-notifications','member-segment',
  ]);

  const navigate = (target, data = null) => {
    if (!MEMBER_PAGE_IDS.has(target)) {
      onNavigate(target);
      return;
    }
    setPage(target);
    setPageData(data);
  };

  const renderPage = () => {
    switch (page) {
      case 'customer-list':
      case 'customer-management':   return <CustomerListPage onNavigate={navigate} showToast={showToast} />;
      case 'customer-settings-hub': return <CustomerSettingsHub showToast={showToast} />;
      case 'customer-detail':       return <CustomerDetailPage customer={pageData || SAMPLE_CUSTOMERS[0]} onBack={() => navigate('customer-list')} showToast={showToast} />;
      case 'member-segment':        return <SegmentPage showToast={showToast} />;
      case 'member-tags':           return <CustomerSettingsHub showToast={showToast} initialTab="member-tags" />;
      case 'member-blacklist':      return <BlacklistPage onNavigate={navigate} showToast={showToast} />;
      case 'member-tier':           return <CustomerSettingsHub showToast={showToast} initialTab="member-level" />;
      case 'member-points':         return <CustomerSettingsHub showToast={showToast} initialTab="member-points" />;
      case 'member-settings':       return <CustomerSettingsHub showToast={showToast} initialTab="member-settings" />;
      case 'member-notifications':  return <CustomerSettingsHub showToast={showToast} initialTab="notifications" />;
      default:                      return <CustomerListPage onNavigate={navigate} showToast={showToast} />;
    }
  };

  return renderPage();
}
'''

script = script[:app_start] + new_func

# Add file header
result = '// PageMembers — 會員管理後台模組\n\n' + script

with open(dst, 'w', encoding='utf-8') as f:
    f.write(result)

print(f"Done. Lines: {result.count(chr(10))}")
