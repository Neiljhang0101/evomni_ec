import re, sys, os

src = os.path.join(os.path.dirname(__file__), '..', 'html', '行銷中心.html')
dst = os.path.join(os.path.dirname(__file__), '..', 'components', 'pages', 'PageMarketing.jsx')

with open(src, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract inline script block
match = re.search(r'<script type="text/babel">\n(.*?)\n</script>', content, re.DOTALL)
if not match:
    print("ERROR: could not find script block")
    sys.exit(1)
script = match.group(1)

# Rename PAGE_MAP -> MKT_PAGE_MAP
script = re.sub(r'\bPAGE_MAP\b', 'MKT_PAGE_MAP', script)

# Rename EmptyState -> MktEmptyState
script = re.sub(r'\bEmptyState\b', 'MktEmptyState', script)

# Remove emojis from string literals
for em in ['📭','🎫','🎁','🔒','📊','📈','🔗','✅','⚠️','❌']:
    script = script.replace(f"'{em}'", "''")
    script = script.replace(f'"{em}"', '""')

# Fix AdvancedBanner emoji span
script = script.replace(
    '<span style={{ fontSize: 16 }}>🔒</span>',
    '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{display:"inline-block",verticalAlign:"middle"}}><rect x="2" y="6.5" width="10" height="7" rx="0" stroke="#E6A23C" strokeWidth="1.4"/><path d="M4 6.5V4.5a3 3 0 0 1 6 0v2" stroke="#E6A23C" strokeWidth="1.4" strokeLinecap="round"/></svg>'
)

# Replace App function + ReactDOM call
# Find the App function start
app_start = script.find('\nfunction App() {')
if app_start == -1:
    print("ERROR: could not find App function")
    sys.exit(1)
app_end = script.rfind('ReactDOM.createRoot')
app_end = script.find('\n', script.find(');', app_end)) + 1
before_app = script[:app_start]
new_app = '\nfunction PageMarketing({ currentPage, onNavigate, show }) {\n  const showToast = show || (() => {});\n  const PageComponent = MKT_PAGE_MAP[currentPage] || MKT_PAGE_MAP[\'coupon-list\'];\n  return <PageComponent onNavigate={onNavigate} show={showToast} />;\n}'
script = before_app + new_app

# Add file header
result = '// PageMarketing — 行銷中心模組\n\n' + script

with open(dst, 'w', encoding='utf-8') as f:
    f.write(result)

print(f"Done. Lines: {result.count(chr(10))}")
