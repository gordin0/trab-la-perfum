/* ============================================================
   LE PARFUM — JavaScript Principal
   Módulos: Dados, Carrinho, Auth, UI, Pedidos, Admin
   ============================================================ */

'use strict';

// ── Dados dos Produtos ──────────────────────────────────────
const PRODUCTS = [
  { id: 1,  brand: 'Chanel',      name: 'N°5 Eau de Parfum',      emoji: '🌸', price: 589.90, oldPrice: null,   category: 'feminino',  notes: ['Aldeído','Jasmim','Rosa','Sândalo'],    ml: [30,50,100], desc: 'O perfume mais icônico do mundo. Uma composição floral-aldeídica atemporal criada em 1921 por Ernest Beaux. Elegância pura em cada gota.', badge: null,   rating: 5, reviews: 248 },
  { id: 2,  brand: 'Dior',        name: 'Sauvage Eau de Toilette', emoji: '🌊', price: 479.90, oldPrice: null,   category: 'masculino', notes: ['Bergamota','Pimenta','Ambroxan'],       ml: [60,100,200], desc: 'Inspirado nas paisagens áridas do deserto ao entardecer. Uma fragrância fresca, crua e magnética.', badge: 'novo', rating: 5, reviews: 312 },
  { id: 3,  brand: 'YSL',         name: 'Black Opium',             emoji: '☕', price: 399.90, oldPrice: 449.90, category: 'feminino',  notes: ['Café','Baunilha','Flor Branca'],        ml: [30,50,90],  desc: 'Uma fragrância viciante que combina café negro e baunilha com flores brancas. Ousada e sedutora.', badge: 'sale', rating: 4, reviews: 189 },
  { id: 4,  brand: 'Tom Ford',    name: 'Oud Wood',                emoji: '🪵', price: 899.90, oldPrice: null,   category: 'unissex',   notes: ['Oud','Sândalo','Baunilha','Âmbar'],     ml: [50,100],    desc: 'Uma das madeiras mais raras e preciosas do mundo transformada em perfume. Quente, rico e sofisticado.', badge: 'exclusivo', rating: 5, reviews: 97 },
  { id: 5,  brand: 'Lancôme',     name: 'La Vie Est Belle',        emoji: '🌺', price: 349.90, oldPrice: null,   category: 'feminino',  notes: ['Íris','Pralinê','Patchouli'],           ml: [30,50,75,100], desc: 'A fragrância da felicidade. Um bouquet floral gourmand que celebra a beleza da vida.', badge: null, rating: 4, reviews: 276 },
  { id: 6,  brand: 'Creed',       name: 'Aventus',                 emoji: '🍍', price: 1299.90, oldPrice: null,  category: 'masculino', notes: ['Abacaxi','Bétula','Musgo de Carvalho'], ml: [50,100,250], desc: 'Celebrando força, sucesso e poder. Uma fragrância frutada-amadeirada que se tornou lendária.', badge: 'exclusivo', rating: 5, reviews: 143 },
  { id: 7,  brand: 'Guerlain',    name: 'Mon Guerlain',            emoji: '💜', price: 329.90, oldPrice: 379.90, category: 'feminino',  notes: ['Lavanda','Baunilha','Almíscar'],        ml: [30,50,100], desc: 'Uma ode à feminilidade francesa. Lavanda provençal encontra baunilha cremosa numa composição irresistível.', badge: 'sale', rating: 4, reviews: 164 },
  { id: 8,  brand: 'Hermès',      name: 'Terre d\'Hermès',         emoji: '🌍', price: 549.90, oldPrice: null,   category: 'masculino', notes: ['Laranja','Pimenta','Cedro','Vetiver'],  ml: [50,100,200], desc: 'Uma viagem sensorial pela terra. Cítrico, mineral e amadeirado — a essência da masculinidade refinada.', badge: null, rating: 5, reviews: 201 },
  { id: 9,  brand: 'Maison Margiela', name: 'Replica: Jazz Club', emoji: '🎷', price: 469.90, oldPrice: null,   category: 'unissex',   notes: ['Rum','Tabaco','Baunilha','Almíscar'],   ml: [30,100],    desc: 'Feche os olhos e imagine um clube de jazz em Nova York nos anos 50. Quente, fumegante e irresistível.', badge: 'novo', rating: 5, reviews: 118 },
  { id: 10, brand: 'Versace',     name: 'Eros',                    emoji: '⚡', price: 289.90, oldPrice: 329.90, category: 'masculino', notes: ['Hortelã','Maçã Verde','Baunilha'],      ml: [30,50,100,200], desc: 'Inspirado no deus grego do amor. Uma fragrância fresca e intensa que exala confiança e sensualidade.', badge: 'sale', rating: 4, reviews: 234 },
  { id: 11, brand: 'Jo Malone',   name: 'Peony & Blush Suede',     emoji: '🌷', price: 699.90, oldPrice: null,   category: 'feminino',  notes: ['Peônia','Camurça','Maçã','Rosa'],       ml: [30,100],    desc: 'Uma ode às flores inglesas. Peônias em plena floração sobre um fundo suave de camurça rosada.', badge: null, rating: 5, reviews: 87 },
  { id: 12, brand: 'Paco Rabanne','name': 'Invictus',              emoji: '🏆', price: 259.90, oldPrice: null,   category: 'masculino', notes: ['Toranja','Louro','Âmbar'],              ml: [50,100,150,200], desc: 'Para o homem que não conhece limites. Fresco, aquático e poderoso como um troféu olímpico.', badge: null, rating: 4, reviews: 298 },
];

const CATEGORIES = [
  { id: 'todos',    name: 'Todos',      icon: '✨', count: PRODUCTS.length },
  { id: 'feminino', name: 'Feminino',   icon: '🌸', count: PRODUCTS.filter(p=>p.category==='feminino').length },
  { id: 'masculino',name: 'Masculino',  icon: '🌊', count: PRODUCTS.filter(p=>p.category==='masculino').length },
  { id: 'unissex',  name: 'Unissex',    icon: '⚖️', count: PRODUCTS.filter(p=>p.category==='unissex').length },
  { id: 'exclusivo',name: 'Exclusivos', icon: '👑', count: PRODUCTS.filter(p=>p.badge==='exclusivo').length },
];

// ── Storage Helpers ─────────────────────────────────────────
const Storage = {
  get: (key, def = null) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; } },
  set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
  remove: (key) => { try { localStorage.removeItem(key); } catch {} },
};

// ── Estado Global ───────────────────────────────────────────
const State = {
  cart:     Storage.get('lp_cart', []),
  wishlist: Storage.get('lp_wishlist', []),
  user:     Storage.get('lp_user', null),
  orders:   Storage.get('lp_orders', []),
  clients:  Storage.get('lp_clients', [
    { id: 1, name: 'Ana Silva',    email: 'ana@email.com',    phone: '(11) 99999-0001', city: 'São Paulo',    orders: 3, total: 1289.70, since: '2024-01-15' },
    { id: 2, name: 'Carlos Souza', email: 'carlos@email.com', phone: '(21) 98888-0002', city: 'Rio de Janeiro', orders: 1, total: 479.90, since: '2024-03-08' },
    { id: 3, name: 'Mariana Costa',email: 'mari@email.com',   phone: '(31) 97777-0003', city: 'Belo Horizonte', orders: 5, total: 2340.50, since: '2023-11-22' },
  ]),
  adminOrders: Storage.get('lp_admin_orders', [
    { id: '#001', client: 'Ana Silva',     date: '10/06/2025', items: 2, total: 'R$ 969,80', status: 'done',     payment: 'Cartão' },
    { id: '#002', client: 'Carlos Souza',  date: '11/06/2025', items: 1, total: 'R$ 479,90', status: 'shipped',  payment: 'PIX' },
    { id: '#003', client: 'Mariana Costa', date: '12/06/2025', items: 3, total: 'R$ 1.249,70',status: 'approved', payment: 'Cartão' },
    { id: '#004', client: 'João Pereira',  date: '13/06/2025', items: 1, total: 'R$ 899,90', status: 'pending',  payment: 'Boleto' },
    { id: '#005', client: 'Fernanda Lima', date: '14/06/2025', items: 2, total: 'R$ 648,80', status: 'canceled', payment: 'PIX' },
  ]),
  save() {
    Storage.set('lp_cart', this.cart);
    Storage.set('lp_wishlist', this.wishlist);
    Storage.set('lp_user', this.user);
    Storage.set('lp_orders', this.orders);
    Storage.set('lp_clients', this.clients);
    Storage.set('lp_admin_orders', this.adminOrders);
  }
};

// ── Utilitários UI ──────────────────────────────────────────
const UI = {
  fmt: (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  toast(msg, type = 'info') {
    const c = document.getElementById('toast-container');
    if (!c) return;
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3200);
  },
  openModal(id)  { document.getElementById(id)?.classList.add('open'); document.body.style.overflow = 'hidden'; },
  closeModal(id) { document.getElementById(id)?.classList.remove('open'); document.body.style.overflow = ''; },
  openCart()  { document.getElementById('cart-overlay')?.classList.add('open'); document.getElementById('cart-drawer')?.classList.add('open'); document.body.style.overflow = 'hidden'; },
  closeCart() { document.getElementById('cart-overlay')?.classList.remove('open'); document.getElementById('cart-drawer')?.classList.remove('open'); document.body.style.overflow = ''; },
};

// ── Carrinho ────────────────────────────────────────────────
const Cart = {
  add(productId, ml) {
    const p = PRODUCTS.find(x => x.id === productId);
    if (!p) return;
    const size = ml || p.ml[0];
    const key = `${productId}-${size}`;
    const existing = State.cart.find(x => x.key === key);
    if (existing) {
      existing.qty++;
    } else {
      State.cart.push({ key, productId, ml: size, qty: 1, price: p.price, name: p.name, brand: p.brand, emoji: p.emoji });
    }
    State.save();
    Cart.updateUI();
    UI.toast(`${p.name} adicionado ao carrinho! 🛍️`, 'success');
  },
  remove(key) {
    State.cart = State.cart.filter(x => x.key !== key);
    State.save(); Cart.updateUI(); Cart.renderDrawer();
  },
  updateQty(key, delta) {
    const item = State.cart.find(x => x.key === key);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    State.save(); Cart.updateUI(); Cart.renderDrawer();
  },
  total() { return State.cart.reduce((s, i) => s + i.price * i.qty, 0); },
  count() { return State.cart.reduce((s, i) => s + i.qty, 0); },
  updateUI() {
    document.querySelectorAll('.cart-count').forEach(el => {
      const n = Cart.count();
      el.textContent = n;
      el.style.display = n > 0 ? 'flex' : 'none';
    });
  },
  renderDrawer() {
    const el = document.getElementById('cart-items');
    if (!el) return;
    if (State.cart.length === 0) {
      el.innerHTML = `<div class="cart-empty"><span class="cart-empty-icon">🛍️</span><p>Seu carrinho está vazio</p><small>Adicione produtos para continuar</small></div>`;
    } else {
      el.innerHTML = State.cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-img">${item.emoji}</div>
          <div class="cart-item-info">
            <div class="cart-item-brand">${item.brand}</div>
            <div class="cart-item-name">${item.name} <small style="color:var(--gray)">${item.ml}ml</small></div>
            <div class="cart-item-price">${UI.fmt(item.price * item.qty)}</div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="Cart.updateQty('${item.key}',-1)">−</button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn" onclick="Cart.updateQty('${item.key}',1)">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="Cart.remove('${item.key}')" title="Remover">✕</button>
        </div>`).join('');
    }
    const subtotal = Cart.total();
    const ship = subtotal >= 500 ? 0 : 29.90;
    const total = subtotal + ship;
    const footerEl = document.getElementById('cart-footer-info');
    if (footerEl) {
      footerEl.innerHTML = `
        <div class="cart-subtotal"><span>Subtotal</span><span>${UI.fmt(subtotal)}</span></div>
        <div class="cart-subtotal"><span>Frete ${ship === 0 ? '🎉 Grátis' : ''}</span><span>${ship === 0 ? 'Grátis' : UI.fmt(ship)}</span></div>
        <div class="cart-total"><span>Total</span><span>${UI.fmt(total)}</span></div>`;
    }
  },
  clear() { State.cart = []; State.save(); Cart.updateUI(); Cart.renderDrawer(); }
};

// ── Wishlist ────────────────────────────────────────────────
const Wishlist = {
  toggle(id) {
    const idx = State.wishlist.indexOf(id);
    if (idx >= 0) { State.wishlist.splice(idx, 1); UI.toast('Removido dos favoritos'); }
    else          { State.wishlist.push(id);        UI.toast('Adicionado aos favoritos ❤️', 'success'); }
    State.save();
    document.querySelectorAll(`.product-wishlist[data-id="${id}"]`).forEach(el => {
      el.classList.toggle('active', State.wishlist.includes(id));
      el.textContent = State.wishlist.includes(id) ? '❤️' : '🤍';
    });
  },
  isActive: (id) => State.wishlist.includes(id),
};

// ── Auth ────────────────────────────────────────────────────
const Auth = {
  login(email, password) {
    const clients = State.clients;
    const found = clients.find(c => c.email === email);
    // Admin
    if (email === 'admin@leperfum.com' && password === 'admin123') {
      State.user = { name: 'Administrador', email, role: 'admin', initials: 'AD' };
      State.save(); Auth.updateUI();
      UI.closeModal('auth-modal');
      UI.toast('Bem-vindo, Administrador! 👑', 'success');
      setTimeout(() => { window.location.href = 'pages/admin.html'; }, 800);
      return true;
    }
    if (found && password.length >= 4) {
      State.user = { name: found.name, email: found.email, role: 'client', initials: found.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) };
      State.save(); Auth.updateUI();
      UI.closeModal('auth-modal');
      UI.toast(`Bem-vindo(a), ${found.name.split(' ')[0]}! 🌸`, 'success');
      return true;
    }
    UI.toast('E-mail ou senha incorretos.', 'error');
    return false;
  },
  register(data) {
    const exists = State.clients.find(c => c.email === data.email);
    if (exists) { UI.toast('Este e-mail já está cadastrado.', 'error'); return false; }
    const newClient = {
      id: Date.now(), name: data.name, email: data.email,
      phone: data.phone || '', city: data.city || '',
      orders: 0, total: 0, since: new Date().toISOString().split('T')[0]
    };
    State.clients.push(newClient);
    State.user = { name: data.name, email: data.email, role: 'client', initials: data.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) };
    State.save(); Auth.updateUI();
    UI.closeModal('auth-modal');
    UI.toast(`Cadastro realizado! Bem-vindo(a), ${data.name.split(' ')[0]}! 🎉`, 'success');
    return true;
  },
  logout() {
    State.user = null; State.save(); Auth.updateUI();
    UI.toast('Até logo! 👋');
    if (window.location.pathname.includes('admin') || window.location.pathname.includes('profile')) {
      window.location.href = '../index.html';
    }
  },
  updateUI() {
    const authBtn = document.getElementById('auth-btn');
    const userMenu = document.getElementById('user-menu');
    const userName = document.getElementById('user-name');
    if (State.user) {
      if (authBtn) authBtn.style.display = 'none';
      if (userMenu) { userMenu.style.display = 'flex'; }
      if (userName) userName.textContent = State.user.name.split(' ')[0];
    } else {
      if (authBtn) authBtn.style.display = 'flex';
      if (userMenu) userMenu.style.display = 'none';
    }
  }
};

// ── Produtos UI ─────────────────────────────────────────────
const ProductsUI = {
  renderCard(p, large = false) {
    const isWished = Wishlist.isActive(p.id);
    const badgeMap = { novo: 'badge-new', sale: 'badge-sale', exclusivo: 'badge-gold' };
    const badgeLabelMap = { novo: 'Novo', sale: 'Oferta', exclusivo: '★ Exclusivo' };
    return `
      <div class="product-card fade-in" data-id="${p.id}">
        <div class="product-image">
          <div class="product-badges">${p.badge ? `<span class="badge ${badgeMap[p.badge]}">${badgeLabelMap[p.badge]}</span>` : ''}</div>
          <span class="product-emoji">${p.emoji}</span>
          <button class="product-wishlist ${isWished ? 'active' : ''}" data-id="${p.id}" onclick="Wishlist.toggle(${p.id})">${isWished ? '❤️' : '🤍'}</button>
        </div>
        <div class="product-info">
          <div class="product-brand">${p.brand}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-notes">${p.notes.slice(0,3).join(' · ')}</div>
          <div class="product-footer">
            <div>
              ${p.oldPrice ? `<span class="product-price-old">${UI.fmt(p.oldPrice)}</span>` : ''}
              <span class="product-price">${UI.fmt(p.price)}</span>
            </div>
            <button class="add-to-cart-btn" onclick="Cart.add(${p.id})">+ Carrinho</button>
          </div>
        </div>
      </div>`;
  },
  renderGrid(products, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = products.map(p => ProductsUI.renderCard(p)).join('');
    observeFadeIn();
  }
};

// ── Checkout ────────────────────────────────────────────────
const Checkout = {
  placeOrder(formData) {
    if (State.cart.length === 0) { UI.toast('Seu carrinho está vazio!', 'error'); return; }
    const order = {
      id: `#${String(Date.now()).slice(-4)}`,
      client: formData.name || (State.user ? State.user.name : 'Visitante'),
      email: formData.email || (State.user ? State.user.email : ''),
      items: State.cart.map(i => ({ ...i })),
      total: Cart.total() + (Cart.total() >= 500 ? 0 : 29.90),
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'pending',
      payment: formData.payment || 'Cartão',
      address: `${formData.street}, ${formData.city} - ${formData.state}`,
    };
    State.orders.push(order);
    State.adminOrders.unshift({
      id: order.id, client: order.client, date: order.date,
      items: order.items.length, total: UI.fmt(order.total),
      status: 'pending', payment: order.payment
    });
    if (State.user) {
      const client = State.clients.find(c => c.email === State.user.email);
      if (client) { client.orders++; client.total += order.total; }
    }
    Cart.clear();
    State.save();
    return order;
  }
};

// ── Animações de entrada ─────────────────────────────────────
function observeFadeIn() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => obs.observe(el));
}

// ── Navbar scroll ────────────────────────────────────────────
function initNavbarScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 50 ? 'rgba(10,10,10,0.99)' : 'rgba(10,10,10,0.96)';
  });
}

// ── Scroll to top ─────────────────────────────────────────────
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Mobile Menu ───────────────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.getElementById('mobile-menu');
  const close = document.getElementById('mobile-menu-close');
  if (!hamburger || !menu) return;
  hamburger.addEventListener('click', () => menu.classList.add('open'));
  close?.addEventListener('click', () => menu.classList.remove('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// ── Auth Modal ────────────────────────────────────────────────
function initAuthModal() {
  const tabs = document.querySelectorAll('.modal-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.auth-form').forEach(f => f.classList.add('hidden'));
      document.getElementById(`${tab.dataset.tab}-form`)?.classList.remove('hidden');
    });
  });

  // Login
  document.getElementById('login-submit')?.addEventListener('click', () => {
    const email = document.getElementById('login-email').value.trim();
    const pass  = document.getElementById('login-password').value;
    if (!email || !pass) { UI.toast('Preencha todos os campos.', 'error'); return; }
    Auth.login(email, pass);
  });

  // Register
  document.getElementById('register-submit')?.addEventListener('click', () => {
    const name  = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass  = document.getElementById('reg-password').value;
    const phone = document.getElementById('reg-phone')?.value.trim();
    const city  = document.getElementById('reg-city')?.value.trim();
    if (!name || !email || !pass) { UI.toast('Preencha nome, e-mail e senha.', 'error'); return; }
    if (pass.length < 4) { UI.toast('Senha deve ter ao menos 4 caracteres.', 'error'); return; }
    Auth.register({ name, email, password: pass, phone, city });
  });

  // Fechar modais ao clicar fora
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) UI.closeModal(overlay.id);
    });
  });
}

// ── Newsletter ────────────────────────────────────────────────
function initNewsletter() {
  document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input && input.value.includes('@')) {
      UI.toast('Obrigado! Você receberá nossas novidades em breve. 🌸', 'success');
      input.value = '';
    } else {
      UI.toast('Digite um e-mail válido.', 'error');
    }
  });
}

// ── Máscara de telefone ───────────────────────────────────────
function maskPhone(input) {
  input.addEventListener('input', () => {
    let v = input.value.replace(/\D/g, '');
    if (v.length <= 10) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else                v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    input.value = v;
  });
}

// ── Máscara de CEP ────────────────────────────────────────────
function maskCEP(input) {
  input.addEventListener('input', () => {
    let v = input.value.replace(/\D/g, '');
    v = v.replace(/(\d{5})(\d{0,3})/, '$1-$2');
    input.value = v;
  });
}

// ── Busca CEP ─────────────────────────────────────────────────
async function fetchCEP(cep) {
  try {
    const r = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g,'')}/json/`);
    const d = await r.json();
    if (!d.erro) return d;
  } catch {}
  return null;
}

// ── Expor globalmente ─────────────────────────────────────────
window.Cart     = Cart;
window.Wishlist = Wishlist;
window.Auth     = Auth;
window.UI       = UI;
window.State    = State;
window.PRODUCTS = PRODUCTS;
window.CATEGORIES = CATEGORIES;
window.ProductsUI = ProductsUI;
window.Checkout   = Checkout;
window.fetchCEP   = fetchCEP;
window.maskPhone  = maskPhone;
window.maskCEP    = maskCEP;
window.observeFadeIn = observeFadeIn;

// ── Init Global ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateUI();
  Cart.renderDrawer();
  Auth.updateUI();
  initNavbarScroll();
  initScrollTop();
  initMobileMenu();
  initAuthModal();
  initNewsletter();

  // Inputs de telefone
  document.querySelectorAll('input[type="tel"]').forEach(maskPhone);
  document.querySelectorAll('input[name="cep"]').forEach(maskCEP);

  // Fade-in inicial
  setTimeout(observeFadeIn, 100);
});
