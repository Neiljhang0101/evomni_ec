/* Evomni Storefront UI Kit — primitives
   Exports to window for cross-file <script type="text/babel"> sharing. */

const { useState } = React;

// Material Icon helper
function Icon({ name, size = 22, className = "", style = {} }) {
  return (
    <span className={"material-icons-outlined " + className}
      style={{ fontSize: size, lineHeight: 1, ...style }}>{name}</span>
  );
}

// Button — square, three variants. No radius.
function Button({ variant = "primary", children, full, icon, iconRight, onClick, disabled }) {
  const base = {
    height: 48, padding: "0 26px", border: "1px solid transparent",
    font: "500 16px/1 var(--font-sans)", letterSpacing: ".04em",
    cursor: disabled ? "not-allowed" : "pointer", display: "inline-flex",
    alignItems: "center", justifyContent: "center", gap: 8,
    width: full ? "100%" : "auto", transition: "background .2s var(--ease), color .2s var(--ease)",
  };
  const variants = {
    primary: { background: disabled ? "var(--fill-400)" : "var(--brand)", color: disabled ? "var(--fg-disabled)" : "#fff" },
    ghost: { background: "#fff", color: "var(--fg)", borderColor: "var(--ink-900)" },
    text: { background: "none", color: "var(--fg)", padding: "0 4px", textDecoration: "underline", textUnderlineOffset: 4 },
  };
  const [hover, setHover] = useState(false);
  const hoverStyle = !disabled && hover ? (
    variant === "primary" ? { background: "var(--brand-hover)" } :
    variant === "ghost" ? { background: "var(--fill-200)" } : {}
  ) : {};
  return (
    <button style={{ ...base, ...variants[variant], ...hoverStyle }}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {icon && <Icon name={icon} size={18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={18} />}
    </button>
  );
}

// Badge — functional, uppercase
function Badge({ children, tone = "ink" }) {
  const tones = { ink: "#303133", danger: "#f56c6c", success: "#67c23a", info: "#909399" };
  return (
    <span style={{
      font: "500 14px/1 var(--font-sans)", letterSpacing: ".08em", textTransform: "uppercase",
      background: tones[tone], color: "#fff", padding: "4px 10px", display: "inline-block",
    }}>{children}</span>
  );
}

// Eyebrow label
function Eyebrow({ children, style = {} }) {
  return (
    <div style={{
      font: "500 14px/1 var(--font-sans)", letterSpacing: ".12em",
      textTransform: "uppercase", color: "var(--fg-subtle)", ...style,
    }}>{children}</div>
  );
}

// Price with optional strikethrough original
function Price({ amount, original, size = 16 }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
      <span style={{ font: `500 ${size}px/1 var(--font-sans)`, fontVariantNumeric: "tabular-nums", color: original ? "var(--danger)" : "var(--fg)" }}>
        NT$ {amount.toLocaleString()}
      </span>
      {original && <span style={{ font: "400 14px/1 var(--font-sans)", color: "var(--fg-subtle)", textDecoration: "line-through" }}>NT$ {original.toLocaleString()}</span>}
    </div>
  );
}

// Photo placeholder — tinted neutral block standing in for studio photography.
function Photo({ tint = "#f5f7fa", ratio = "4/5", label, children, style = {} }) {
  return (
    <div style={{
      aspectRatio: ratio, background: tint, position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center", ...style,
    }}>
      <Icon name="image" size={36} style={{ color: "rgba(48,49,51,.18)" }} />
      {label && <span style={{ position: "absolute", bottom: 12, left: 14, font: "400 14px/1 var(--font-mono)", color: "rgba(48,49,51,.4)", letterSpacing: ".04em" }}>{label}</span>}
      {children}
    </div>
  );
}

Object.assign(window, { Icon, Button, Badge, Eyebrow, Price, Photo });
