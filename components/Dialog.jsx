// Evomni Admin — Unified Dialog / Modal / Drawer Component
// Single source of truth for all popup styles

// ── Style tokens ──────────────────────────────────────────────────────────────
const DIALOG_OVERLAY = {
  position: 'fixed', inset: 0,
  background: 'rgba(0,0,0,0.45)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 2000,
};

const DIALOG_SHELL = {
  background: '#fff',
  border: '1px solid #DCDFE6',
  borderRadius: 0,
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  display: 'flex', flexDirection: 'column',
  maxHeight: '85vh', maxWidth: '90vw',
  animation: 'evo-modal-in 0.2s ease',
};

const DIALOG_HEADER = {
  padding: '16px 24px',
  borderBottom: '1px solid #DCDFE6',
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  flexShrink: 0,
};

const DIALOG_BODY = {
  padding: '20px 24px',
  flex: 1, overflowY: 'auto',
  fontSize: 14, color: '#606266', lineHeight: 1.75,
};

const DIALOG_FOOTER = {
  padding: '12px 24px',
  borderTop: '1px solid #DCDFE6',
  display: 'flex', justifyContent: 'flex-end', gap: 8,
  flexShrink: 0,
};

// ── Button styles (for use in Dialog footer) ──────────────────────────────────
const dialogBtns = {
  default: {
    height: 32, padding: '0 16px', fontSize: 14,
    fontFamily: 'Noto Sans TC,sans-serif', cursor: 'pointer', borderRadius: 0,
    background: '#fff', color: '#606266', border: '1px solid #DCDFE6',
  },
  primary: {
    height: 32, padding: '0 16px', fontSize: 14,
    fontFamily: 'Noto Sans TC,sans-serif', cursor: 'pointer', borderRadius: 0,
    background: '#303133', color: '#fff', border: '1px solid #303133',
  },
  confirm: {
    height: 32, padding: '0 16px', fontSize: 14,
    fontFamily: 'Noto Sans TC,sans-serif', cursor: 'pointer', borderRadius: 0,
    background: '#409EFF', color: '#fff', border: '1px solid #409EFF',
  },
  danger: {
    height: 32, padding: '0 16px', fontSize: 14,
    fontFamily: 'Noto Sans TC,sans-serif', cursor: 'pointer', borderRadius: 0,
    background: '#F56C6C', color: '#fff', border: '1px solid #F56C6C',
  },
};

// ── Close button ──────────────────────────────────────────────────────────────
function DialogCloseBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: '#C0C4CC', fontSize: 20, lineHeight: 1,
        padding: '0 2px', display: 'flex', alignItems: 'center',
      }}
    >
      &times;
    </button>
  );
}

// ── Base Dialog ───────────────────────────────────────────────────────────────
// Use for form dialogs, settings panels, multi-field content.
// Props (new API):
//   open        boolean
//   title       string
//   width       number   (default 440)
//   onClose     fn       — renders × button; backdrop click also closes
//   children    node     — body content
//   footer      node     — button row (use dialogBtns.* for styles)
// Legacy props (backwards compat with old SharedUI.Dialog):
//   onConfirm   fn
//   onCancel    fn       — also used as onClose if onClose is absent
//   confirmText string   (default '確定')
//   cancelText  string   (default '取消')
//   confirmDanger bool   — red confirm button
function Dialog({
  open, title, width = 440, onClose, children, footer,
  onConfirm, onCancel, confirmText = '確定', cancelText = '取消', confirmDanger,
}) {
  if (!open) return null;
  const handleClose = onClose || onCancel;
  const resolvedFooter = footer || (onConfirm || onCancel ? (
    <React.Fragment>
      {onCancel && <button style={dialogBtns.default} onClick={onCancel}>{cancelText}</button>}
      {onConfirm && (
        <button style={confirmDanger ? dialogBtns.danger : dialogBtns.confirm} onClick={onConfirm}>
          {confirmText}
        </button>
      )}
    </React.Fragment>
  ) : null);
  return (
    <div
      style={DIALOG_OVERLAY}
      onClick={e => e.target === e.currentTarget && handleClose?.()}
    >
      <div style={{ ...DIALOG_SHELL, width }}>
        <div style={DIALOG_HEADER}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#303133' }}>{title}</span>
          {handleClose && <DialogCloseBtn onClick={handleClose} />}
        </div>
        <div style={DIALOG_BODY}>{children}</div>
        {resolvedFooter && <div style={DIALOG_FOOTER}>{resolvedFooter}</div>}
      </div>
    </div>
  );
}

// ── Confirm / Alert Dialog ────────────────────────────────────────────────────
// Matches 提視窗.png design: title bar + type icon + message + cancel / confirm.
// Props:
//   open          boolean
//   title         string    (default '提示')
//   message       node      — text or JSX shown next to icon
//   type          'warning' | 'danger' | 'info' | 'success'  (default 'warning')
//   onConfirm     fn
//   onCancel      fn        — also called on backdrop/× click
//   confirmText   string    (default '確定')
//   cancelText    string    (default '取消')
//   confirmDanger boolean   — use red button instead of blue
//   width         number    (default 420)
const CONFIRM_ICONS = {
  warning: { color: '#E6A23C', symbol: '!' },
  danger:  { color: '#F56C6C', symbol: '!' },
  info:    { color: '#409EFF', symbol: 'i' },
  success: { color: '#67C23A', symbol: '✓' },
};

function ConfirmDialog({
  open,
  title = '提示',
  message,
  type = 'warning',
  onConfirm,
  onCancel,
  confirmText = '確定',
  cancelText = '取消',
  confirmDanger = false,
  width = 420,
}) {
  if (!open) return null;
  const icon = CONFIRM_ICONS[type] || CONFIRM_ICONS.warning;
  const confirmStyle = confirmDanger ? dialogBtns.danger : dialogBtns.confirm;
  return (
    <div
      style={DIALOG_OVERLAY}
      onClick={e => e.target === e.currentTarget && onCancel?.()}
    >
      <div style={{ ...DIALOG_SHELL, width }}>
        <div style={DIALOG_HEADER}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#303133' }}>{title}</span>
          <DialogCloseBtn onClick={onCancel} />
        </div>
        <div style={{ padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{
              width: 20, height: 20, borderRadius: '50%', background: icon.color,
              color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1,
            }}>
              {icon.symbol}
            </span>
            <span style={{ fontSize: 14, color: '#303133', lineHeight: 1.75 }}>{message}</span>
          </div>
        </div>
        <div style={DIALOG_FOOTER}>
          <button style={dialogBtns.default} onClick={onCancel}>{cancelText}</button>
          <button style={confirmStyle} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}

// ── Drawer ────────────────────────────────────────────────────────────────────
// Right-sliding side panel.
// Props:
//   open    boolean
//   title   string
//   width   number  (default 520)
//   onClose fn      — backdrop click also closes
//   children node
function Drawer({ open, title, width = 520, onClose, children }) {
  if (!open) return null;
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 2000 }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width,
          background: '#fff', borderLeft: '1px solid #DCDFE6',
          display: 'flex', flexDirection: 'column',
          animation: 'evo-drawer-in 0.25s ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={DIALOG_HEADER}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#303133' }}>{title}</span>
          <DialogCloseBtn onClick={onClose} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>{children}</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  Dialog, ConfirmDialog, Drawer, dialogBtns,
  DIALOG_OVERLAY, DIALOG_SHELL, DIALOG_HEADER, DIALOG_BODY, DIALOG_FOOTER,
});
