/* Evomni Storefront UI Kit — sections & blocks */

const { useState: useStateS } = React;

function AnnouncementBar() {
  return (
    <div style={{ background: "var(--ink-900)", color: "#fff", textAlign: "center",
      font: "400 14px/1 var(--font-sans)", letterSpacing: ".08em", padding: "9px 8px" }}>
      免運門檻 NT$ 1,500 · 全館會員多重好禮
    </div>
  );
}

function Header({ cartCount, onCart, onNav, active = "SHOP" }) {
  const links = [["SHOP", "SHOP"], ["保養", "保養"], ["彩妝", "彩妝"], ["香氛", "香氛"], ["JOURNAL", "JOURNAL"]];
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "18px 40px", borderBottom: "1px solid var(--line-300)", background: "#fff", position: "sticky", top: 0, zIndex: 20 }}>
      <div onClick={() => onNav("home")} style={{ cursor: "pointer" }}>
        <img src="../frontend-design-system/uploads/logo.jpg" alt="Evomni" style={{ height: 36, width: "auto", display: "block" }} />
      </div>
      <nav style={{ display: "flex", gap: 30 }}>
        {links.map(([k, label]) => (
          <a key={k} onClick={() => onNav("home")} style={{
            font: "500 14px/1 var(--font-sans)", letterSpacing: ".06em", textTransform: "uppercase",
            color: "var(--fg)", textDecoration: "none", cursor: "pointer",
            borderBottom: active === k ? "2px solid var(--ink-900)" : "2px solid transparent", paddingBottom: 4,
          }}>{label}</a>
        ))}
      </nav>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Icon name="search" style={{ cursor: "pointer" }} />
        <Icon name="person_outline" style={{ cursor: "pointer" }} />
        <div onClick={onCart} style={{ position: "relative", cursor: "pointer", display: "flex" }}>
          <Icon name="shopping_bag" />
          {cartCount > 0 && (
            <span style={{ position: "absolute", top: -7, right: -8, minWidth: 16, height: 16, padding: "0 4px",
              background: "var(--ink-900)", color: "#fff", borderRadius: 9999, font: "600 14px/20px var(--font-sans)", textAlign: "center",
              minWidth: 20, height: 20 }}>{cartCount}</span>
          )}
        </div>
      </div>
    </header>
  );
}

function Hero({ onShop }) {
  return (
    <section style={{ position: "relative", height: 520, background: "#e9e6e1", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <img src="../assets/img1.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "relative", padding: "0 72px", maxWidth: 620, display: "flex", flexDirection: "column", gap: 22 }}>
        <Eyebrow>Spring 2026 · 春季限定</Eyebrow>
        <h1 style={{ margin: 0, font: "700 56px/1.1 var(--font-sans)", letterSpacing: "-.02em", color: "var(--ink-900)" }}>煥膚新章</h1>
        <p style={{ margin: 0, font: "400 16px/1.6 var(--font-sans)", color: "var(--fg-muted)", maxWidth: 380 }}>
          以植萃科技喚醒肌膚光采。春季限定系列，現正上市。
        </p>
        <div><Button onClick={onShop} iconRight="arrow_forward">立即選購</Button></div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, action, onAction }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 style={{ margin: 0, font: "600 30px/1.2 var(--font-sans)", letterSpacing: "-.01em", color: "var(--ink-900)" }}>{title}</h2>
      </div>
      {action && <a onClick={onAction} style={{ font: "500 14px/1 var(--font-sans)", color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: 4, cursor: "pointer", whiteSpace: "nowrap" }}>{action} →</a>}
    </div>
  );
}

function ProductCard({ product, onOpen, onAdd }) {
  const [hover, setHover] = useStateS(false);
  const [saved, setSaved] = useStateS(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: "#fff", border: hover ? "1px solid transparent" : "1px solid var(--line-300)",
        boxShadow: hover ? "var(--shadow-hover)" : "none", transition: "box-shadow .25s var(--ease), border-color .25s var(--ease)", cursor: "pointer" }}>
      <div onClick={() => onOpen(product)} style={{ position: "relative" }}>
        {product.img
          ? <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4" }}>
              <img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {product.badge && <div style={{ position: "absolute", top: 12, left: 12 }}><Badge tone={product.badgeTone}>{product.badge}</Badge></div>}
              <span onClick={(e) => { e.stopPropagation(); setSaved(!saved); }} style={{ position: "absolute", top: 10, right: 10 }}>
                <Icon name={saved ? "favorite" : "favorite_border"} size={20} style={{ color: saved ? "#303133" : "var(--fg-subtle)" }} />
              </span>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, transform: hover ? "translateY(0)" : "translateY(100%)", transition: "transform .25s var(--ease)" }}>
                <button onClick={(e) => { e.stopPropagation(); onAdd(product); }}
                  style={{ width: "100%", height: 44, border: "none", background: "var(--ink-900)", color: "#fff", font: "500 14px/1 var(--font-sans)", letterSpacing: ".04em", cursor: "pointer" }}>加入購物車</button>
              </div>
            </div>
          : <Photo tint={product.tint} label={product.code}>
              {product.badge && <div style={{ position: "absolute", top: 12, left: 12 }}><Badge tone={product.badgeTone}>{product.badge}</Badge></div>}
              <span onClick={(e) => { e.stopPropagation(); setSaved(!saved); }} style={{ position: "absolute", top: 10, right: 10 }}>
                <Icon name={saved ? "favorite" : "favorite_border"} size={20} style={{ color: saved ? "#303133" : "var(--fg-subtle)" }} />
              </span>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, transform: hover ? "translateY(0)" : "translateY(100%)", transition: "transform .25s var(--ease)" }}>
                <button onClick={(e) => { e.stopPropagation(); onAdd(product); }}
                  style={{ width: "100%", height: 44, border: "none", background: "var(--ink-900)", color: "#fff", font: "500 14px/1 var(--font-sans)", letterSpacing: ".04em", cursor: "pointer" }}>加入購物車</button>
              </div>
            </Photo>
        }
      </div>
      <div onClick={() => onOpen(product)} style={{ padding: "14px 16px 18px", display: "flex", flexDirection: "column", gap: 7 }}>
        <Eyebrow style={{ fontSize: 14, letterSpacing: ".12em" }}>{product.cat}</Eyebrow>
        <div style={{ font: "500 14px/1.4 var(--font-sans)", color: "var(--fg)" }}>{product.name}</div>
        <Price amount={product.price} original={product.original} size={15} />
      </div>
    </div>
  );
}

function ProductGrid({ products, cols = 4, onOpen, onAdd }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24 }}>
      {products.map((p) => <ProductCard key={p.id} product={p} onOpen={onOpen} onAdd={onAdd} />)}
    </div>
  );
}

function EditorialSplit({ onShop }) {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 420 }}>
      <img src="../assets/img5.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ background: "var(--ink-900)", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, padding: "0 64px" }}>
        <Eyebrow style={{ color: "rgba(255,255,255,.6)" }}>The Ritual · 保養儀式</Eyebrow>
        <h2 style={{ margin: 0, font: "600 34px/1.25 var(--font-sans)", letterSpacing: "-.01em" }}>從淨化到滋養，<br/>三步驟完成日常護理</h2>
        <p style={{ margin: 0, font: "400 15px/1.7 var(--font-sans)", color: "rgba(255,255,255,.75)", maxWidth: 380 }}>
          專為亞洲肌膚設計的溫和配方，建立屬於您的每日保養節奏。
        </p>
        <div><button onClick={onShop} style={{ height: 48, padding: "0 26px", background: "#fff", color: "var(--ink-900)", border: "none", font: "500 14px/1 var(--font-sans)", letterSpacing: ".04em", cursor: "pointer", alignSelf: "flex-start" }}>探索系列 →</button></div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    ["客戶服務", ["配送與退貨", "常見問題", "聯絡我們", "門市據點"]],
    ["關於 EVOMNI", ["品牌故事", "成分理念", "永續承諾", "人才招募"]],
    ["會員", ["登入 / 註冊", "我的訂單", "會員權益", "電子報"]],
  ];
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid var(--line-300)", padding: "56px 40px 32px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40, paddingBottom: 40, borderBottom: "1px solid var(--line-200)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <img src="../frontend-design-system/uploads/logo.jpg" alt="Evomni" style={{ height: 28, width: "auto", display: "block", alignSelf: "flex-start" }} />
          <p style={{ margin: 0, font: "400 14px/1.7 var(--font-sans)", color: "var(--fg-subtle)", maxWidth: 260 }}>潔淨植萃 · 科學保養。為每一種肌膚，找到屬於它的答案。</p>
        </div>
        {cols.map(([h, items]) => (
          <div key={h} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ font: "600 14px/1 var(--font-sans)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--fg)" }}>{h}</div>
            {items.map((i) => <a key={i} style={{ font: "400 14px/1 var(--font-sans)", color: "var(--fg-muted)", textDecoration: "none", cursor: "pointer" }}>{i}</a>)}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24 }}>
        <span style={{ font: "400 14px/1 var(--font-sans)", color: "var(--fg-subtle)" }}>© 2026 EVOMNI. Powered by Evomni Commerce.</span>
        <div style={{ display: "flex", gap: 14, color: "var(--fg-subtle)" }}>
          <Icon name="mail_outline" size={18} /><Icon name="public" size={18} /><Icon name="storefront" size={18} />
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { AnnouncementBar, Header, Hero, SectionHeader, ProductCard, ProductGrid, EditorialSplit, Footer });
