const state = {
  catalog: null,
  activeCategory: 'all',
  query: '',
  bag: loadBag(),
  currentHeroDrinkId: 'coca-cola-can',
  selectedProduct: null,
  modalQty: 1
};

const elements = {
  // Navigation & Drawer
  bagButton: document.querySelector('#bag-button'),
  bagCount: document.querySelector('#bag-count'),
  bagDrawer: document.querySelector('#bag-drawer'),
  drawerBackdrop: document.querySelector('.drawer-backdrop'),
  deliveryGauge: document.querySelector('#delivery-gauge'),
  gaugeText: document.querySelector('#gauge-text'),
  gaugeFill: document.querySelector('#gauge-fill'),
  bagItemsList: document.querySelector('#bag-items-list'),
  bagSummary: document.querySelector('#bag-summary'),
  bagSubtotalVal: document.querySelector('#bag-subtotal-val'),
  bagDeliveryCaption: document.querySelector('#bag-delivery-caption'),
  startCheckoutBtn: document.querySelector('#start-checkout-btn'),
  checkoutForm: document.querySelector('#checkout-form'),
  cancelCheckoutBtn: document.querySelector('#cancel-checkout-btn'),
  checkoutErrorMsg: document.querySelector('#checkout-error-msg'),
  orderReceiptBox: document.querySelector('#order-receipt-box'),
  receiptOrderId: document.querySelector('#receipt-order-id'),
  receiptTextDetails: document.querySelector('#receipt-text-details'),
  receiptTrackShortcut: document.querySelector('#receipt-track-shortcut'),
  
  // Hero 3D Stage Elements
  heroStage: document.querySelector('#hero-3d-stage'),
  heroCanWrapper: document.querySelector('#hero-can-wrapper'),
  heroMainCan: document.querySelector('#hero-main-can'),
  heroWatermark: document.querySelector('#hero-watermark'),
  heroTitle: document.querySelector('#hero-title'),
  heroCategoryLabel: document.querySelector('#hero-category-label'),
  heroAccentText: document.querySelector('#hero-accent-text'),
  heroDesc: document.querySelector('#hero-desc'),
  heroAddBtn: document.querySelector('#hero-add-btn'),
  canShadow: document.querySelector('#can-shadow'),
  stageSplat: document.querySelector('#stage-splat'),
  ambientGlow: document.querySelector('#ambient-glow'),
  badgePriceVal: document.querySelector('#badge-price-val'),
  heroSpecTemp: document.querySelector('#hero-spec-temp'),
  heroSpecCaffeine: document.querySelector('#hero-spec-caffeine'),
  heroSpecCalories: document.querySelector('#hero-spec-calories'),
  heroSpecRating: document.querySelector('#hero-spec-rating'),
  switcherList: document.querySelector('#can-switcher-list'),

  // Catalog Section
  categoryDock: document.querySelector('#category-dock'),
  searchInput: document.querySelector('#search-input'),
  resultsIndicator: document.querySelector('#results-indicator'),
  drinkGrid: document.querySelector('#drink-grid'),

  // Product Inspection Studio Modal
  productModal: document.querySelector('#product-modal'),
  modalVisualSide: document.querySelector('#modal-visual-side'),
  modalCanImg: document.querySelector('#modal-can-img'),
  modalBadgeTag: document.querySelector('#modal-badge-tag'),
  modalDrinkName: document.querySelector('#modal-drink-name'),
  modalRatingScore: document.querySelector('#modal-rating-score'),
  modalReviewsCount: document.querySelector('#modal-reviews-count'),
  modalCopy: document.querySelector('#modal-copy'),
  modalTileVol: document.querySelector('#modal-tile-vol'),
  modalTileCal: document.querySelector('#modal-tile-cal'),
  modalTileSugar: document.querySelector('#modal-tile-sugar'),
  modalTileTemp: document.querySelector('#modal-tile-temp'),
  modalTagsRow: document.querySelector('#modal-tags-row'),
  modalPriceVal: document.querySelector('#modal-price-val'),
  modalMinusBtn: document.querySelector('#modal-minus-btn'),
  modalPlusBtn: document.querySelector('#modal-plus-btn'),
  modalQtyText: document.querySelector('#modal-qty-text'),
  modalAddToBag: document.querySelector('#modal-add-to-bag'),

  // Order Tracking Modal
  orderModal: document.querySelector('#order-modal'),
  trackForm: document.querySelector('#track-form'),
  trackInput: document.querySelector('#track-input'),
  trackResultContainer: document.querySelector('#track-result-container'),

  // Toast
  toast: document.querySelector('#toast')
};

// Bag Storage
function loadBag() {
  try {
    const raw = localStorage.getItem('pure-sips-vault-bag') || localStorage.getItem('pure-sips-bag') || localStorage.getItem('safra-bag');
    const saved = JSON.parse(raw);
    return Array.isArray(saved) ? saved.filter((item) => typeof item?.id === 'string' && Number.isInteger(item?.quantity) && item.quantity > 0) : [];
  } catch {
    return [];
  }
}

function saveBag() {
  try { localStorage.setItem('pure-sips-vault-bag', JSON.stringify(state.bag)); } catch { /* optional */ }
}

function money(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function productById(id) {
  return state.catalog?.products.find((p) => p.id === id);
}

function matchesProduct(product) {
  const inCat = state.activeCategory === 'all' || product.category === state.activeCategory;
  const queryText = `${product.name} ${product.brand} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
  return inCat && queryText.includes(state.query);
}

// ========================================================
// 3D HERO CAN PHYSICS & MOUSE TRACKING
// ========================================================
function init3DHeroPhysics() {
  const stage = elements.heroStage;
  const canWrapper = elements.heroCanWrapper;
  const shadow = elements.canShadow;
  if (!stage || !canWrapper) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let targetRotX = 0;
  let targetRotY = 0;

  function onMouseMove(e) {
    const rect = stage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    targetRotY = normX * 22; // max 22 deg Y rotation
    targetRotX = -normY * 16; // max 16 deg X tilt
  }

  function renderLoop() {
    // Smooth lerp interpolation for buttery 3D motion
    currentRotX += (targetRotX - currentRotX) * 0.08;
    currentRotY += (targetRotY - currentRotY) * 0.08;

    canWrapper.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateZ(30px)`;
    if (shadow) {
      shadow.style.transform = `translateX(${(-currentRotY * 1.5).toFixed(1)}px) scale(${1 - Math.abs(currentRotX) * 0.01})`;
    }

    requestAnimationFrame(renderLoop);
  }

  stage.addEventListener('mousemove', onMouseMove);
  stage.addEventListener('mouseleave', () => {
    targetRotX = 0;
    targetRotY = 0;
  });

  renderLoop();
}

// ========================================================
// HERO FLAVOR SWITCHER (Spin & Tone Transition)
// ========================================================
function switchHeroDrink(drinkId) {
  const product = productById(drinkId);
  if (!product) return;
  state.currentHeroDrinkId = drinkId;

  // Active button highlight
  document.querySelectorAll('.switcher-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.drink === drinkId);
  });

  // 3D Spin Animation using GSAP or CSS fallback
  const canImg = elements.heroMainCan;
  if (window.gsap) {
    gsap.to(canImg, {
      rotateY: '+=360',
      scale: 0.88,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => {
        canImg.src = product.image;
        gsap.to(canImg, { scale: 1, duration: 0.35, ease: 'back.out(1.5)' });
      }
    });
  } else {
    canImg.style.transform = 'scale(0.8) rotateY(180deg)';
    setTimeout(() => {
      canImg.src = product.image;
      canImg.style.transform = 'scale(1) rotateY(0deg)';
    }, 200);
  }

  // Update Hero Content & Watermark
  elements.heroWatermark.textContent = product.name.toUpperCase();
  elements.heroCategoryLabel.textContent = `${product.brand.toUpperCase()} · ${product.badge.toUpperCase()}`;
  elements.heroAccentText.textContent = product.name.split(' ')[0].toUpperCase();
  elements.heroAccentText.style.color = product.accent;
  elements.heroAccentText.style.textShadow = `0 0 35px ${product.glow}`;
  elements.heroDesc.textContent = product.description;
  elements.badgePriceVal.textContent = money(product.price);

  // Specs
  elements.heroSpecTemp.textContent = product.specs?.temp || '2°C';
  elements.heroSpecCaffeine.textContent = product.specs?.caffeine || '32 mg';
  elements.heroSpecCalories.textContent = product.specs?.calories || '139 kcal';
  elements.heroSpecRating.textContent = `${product.rating} ★`;

  // Radial Backdrop Glow shift
  elements.stageSplat.style.background = `radial-gradient(circle, ${product.glow} 0%, rgba(115,0,28,0.15) 50%, transparent 70%)`;
  elements.ambientGlow.style.background = `radial-gradient(circle, ${product.glow} 0%, transparent 70%)`;
}

// ========================================================
// CATALOG 3D TILT CARDS
// ========================================================
function renderCategories() {
  elements.categoryDock.replaceChildren();
  state.catalog.categories.forEach((cat) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `cat-btn ${cat.id === state.activeCategory ? 'active' : ''}`;
    btn.dataset.category = cat.id;
    btn.innerHTML = `<span>${cat.icon}</span><span>${cat.name}</span>`;
    elements.categoryDock.append(btn);
  });
}

function renderCatalog() {
  const visible = state.catalog.products.filter(matchesProduct);
  elements.drinkGrid.replaceChildren();
  elements.resultsIndicator.textContent = `Displaying ${visible.length} ${visible.length === 1 ? 'chilled beverage' : 'chilled beverages'} in the vault`;

  if (!visible.length) {
    const empty = document.createElement('p');
    empty.className = 'loading-state';
    empty.textContent = 'No cans match that criteria. Try searching for "cola", "sprite" or "energy".';
    elements.drinkGrid.append(empty);
    return;
  }

  const template = document.querySelector('#product-card-template');
  visible.forEach((product) => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.drink-card');
    card.dataset.id = product.id;
    card.style.setProperty('--can-glow', product.glow);

    clone.querySelector('.card-badge').textContent = product.badge;
    clone.querySelector('.card-rating').textContent = `${product.rating} ★`;
    
    const canImg = clone.querySelector('.card-can-img');
    canImg.src = product.image;
    canImg.alt = product.name;

    clone.querySelector('.card-title').textContent = product.name;
    clone.querySelector('.card-desc').textContent = product.description;

    clone.querySelector('.spec-caffeine').textContent = `⚡ ${product.specs?.caffeine || '0 mg'}`;
    clone.querySelector('.spec-cal').textContent = `🔥 ${product.specs?.calories || '140 kcal'}`;

    clone.querySelector('.card-price').textContent = money(product.price);
    clone.querySelector('.card-size').textContent = product.size;

    // Attach 3D Card Tilt Mouse Physics
    attach3DCardTilt(card);

    elements.drinkGrid.append(clone);
  });
}

function attach3DCardTilt(card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((x - centerX) / centerX) * 10;
    const tiltY = -((y - centerY) / centerY) * 10;

    card.style.transform = `perspective(1000px) rotateX(${tiltY.toFixed(2)}deg) rotateY(${tiltX.toFixed(2)}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
  });
}

// ========================================================
// BAG DRAWER & CHECKOUT
// ========================================================
function addToBag(id, quantity = 1) {
  const product = productById(id);
  if (!product) return;
  const existing = state.bag.find((item) => item.id === id);
  if (existing) existing.quantity = Math.min(existing.quantity + quantity, 24);
  else state.bag.push({ id, quantity: Math.min(quantity, 24) });
  saveBag();
  renderBag();
  showToast(`${product.name} (x${quantity}) added to Vault Bag!`);
}

function changeBagQty(id, delta) {
  const item = state.bag.find((i) => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) state.bag = state.bag.filter((i) => i.id !== id);
  saveBag();
  renderBag();
}

function renderBag() {
  if (!state.catalog) return;
  state.bag = state.bag.filter((i) => productById(i.id));
  const totalCount = state.bag.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.bag.reduce((sum, i) => sum + productById(i.id).price * i.quantity, 0);

  elements.bagCount.textContent = totalCount;
  elements.bagSubtotalVal.textContent = money(subtotal);
  elements.startCheckoutBtn.disabled = totalCount === 0;
  elements.startCheckoutBtn.style.opacity = totalCount === 0 ? '0.5' : '1';

  // Free delivery gauge threshold = 6 cans
  const threshold = 6;
  const pct = Math.min((totalCount / threshold) * 100, 100);
  elements.gaugeFill.style.width = `${pct}%`;

  if (totalCount >= threshold) {
    elements.gaugeText.innerHTML = '<strong>🎉 Free cold delivery unlocked!</strong>';
    elements.bagDeliveryCaption.textContent = 'Delivery: FREE (6+ can tier)';
  } else if (totalCount > 0) {
    const left = threshold - totalCount;
    elements.gaugeText.textContent = `Add ${left} more ${left === 1 ? 'can' : 'cans'} to unlock free delivery`;
    elements.bagDeliveryCaption.textContent = 'Delivery: $3.50 (Free for 6+ cans)';
  } else {
    elements.gaugeText.textContent = 'Add 6 cans for free delivery';
    elements.bagDeliveryCaption.textContent = 'Delivery is on us for 6+ cans.';
  }

  elements.bagItemsList.replaceChildren();

  if (!totalCount) {
    const emptyNotice = document.createElement('div');
    emptyNotice.className = 'empty-bag-notice';
    emptyNotice.innerHTML = `
      <i class="ri-cup-line empty-icon"></i>
      <p>Your bag is waiting for ice-cold cans.</p>
    `;
    elements.bagItemsList.append(emptyNotice);
    return;
  }

  state.bag.forEach((item) => {
    const product = productById(item.id);
    const row = document.createElement('article');
    row.className = 'bag-item-card';
    row.dataset.id = product.id;
    row.innerHTML = `
      <div class="bag-item-thumb">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="bag-item-info">
        <h4>${product.name}</h4>
        <p>${product.size} · ${money(product.price)} each</p>
        <div class="item-qty-row">
          <button type="button" class="qty-btn" data-change="-1" aria-label="Decrease quantity">−</button>
          <span>${item.quantity}</span>
          <button type="button" class="qty-btn" data-change="1" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="bag-item-total">
        ${money(product.price * item.quantity)}
      </div>
    `;
    elements.bagItemsList.append(row);
  });
}

function openBag() {
  elements.bagDrawer.classList.add('open');
  elements.drawerBackdrop.classList.add('visible');
  elements.bagDrawer.setAttribute('aria-hidden', 'false');
  elements.bagButton.setAttribute('aria-expanded', 'true');
}

function closeBag() {
  elements.bagDrawer.classList.remove('open');
  elements.drawerBackdrop.classList.remove('visible');
  elements.bagDrawer.setAttribute('aria-hidden', 'true');
  elements.bagButton.setAttribute('aria-expanded', 'false');
}

// ========================================================
// 3D PRODUCT INSPECTION STUDIO MODAL
// ========================================================
function openProductStudio(drinkId) {
  const product = productById(drinkId);
  if (!product) return;
  state.selectedProduct = product;
  state.modalQty = 1;

  elements.modalCanImg.src = product.image;
  elements.modalBadgeTag.textContent = product.badge.toUpperCase();
  elements.modalDrinkName.textContent = product.name;
  elements.modalRatingScore.textContent = product.rating;
  elements.modalReviewsCount.textContent = `(${product.reviews.toLocaleString()} reviews)`;
  elements.modalCopy.textContent = product.description;

  elements.modalTileVol.textContent = product.size;
  elements.modalTileCal.textContent = product.specs?.calories || '139 kcal';
  elements.modalTileSugar.textContent = product.specs?.sugar || '35 g';
  elements.modalTileTemp.textContent = product.specs?.temp || '2°C';

  elements.modalPriceVal.textContent = money(product.price);
  elements.modalQtyText.textContent = state.modalQty;

  elements.modalTagsRow.replaceChildren();
  product.tags.forEach((tag) => {
    const badge = document.createElement('span');
    badge.className = 'tag-badge';
    badge.textContent = `✦ ${tag}`;
    elements.modalTagsRow.append(badge);
  });

  elements.modalVisualSide.style.setProperty('--modal-glow', product.glow);
  openModal('product-modal');
}

// ========================================================
// MODAL MANAGEMENT
// ========================================================
function openModal(modalId) {
  const modal = document.querySelector(`#${modalId}`);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(modalId) {
  const modal = document.querySelector(`#${modalId}`);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach((m) => {
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
  });
}

let toastTimer;
function showToast(msg) {
  elements.toast.textContent = msg;
  elements.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elements.toast.classList.remove('show'), 2600);
}

// ========================================================
// API REQUESTS
// ========================================================
async function requestJson(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request could not be processed.');
  return data;
}

async function submitOrder(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const values = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  elements.checkoutErrorMsg.textContent = '';
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Transmitting Request...</span>';

  try {
    const data = await requestJson('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: values.get('name'),
        email: values.get('email'),
        address: values.get('address'),
        items: state.bag
      })
    });

    state.bag = [];
    saveBag();
    renderBag();
    form.reset();

    // Display receipt inside drawer
    elements.checkoutForm.hidden = true;
    elements.bagSummary.hidden = true;
    elements.bagItemsList.hidden = true;
    elements.deliveryGauge.hidden = true;

    elements.receiptOrderId.textContent = data.order.id;
    elements.receiptTextDetails.textContent = `Thank you, ${values.get('name')}! Order total: ${money(data.order.total)}. Your request is confirmed and routed to our cold-pack depot.`;
    elements.receiptTrackShortcut.dataset.orderId = data.order.id;
    elements.orderReceiptBox.hidden = false;

    showToast('Vault order successfully registered!');
  } catch (err) {
    elements.checkoutErrorMsg.textContent = err.message;
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Place Order Request</span> <i class="ri-check-line"></i>';
  }
}

async function submitTrackOrder(e) {
  e.preventDefault();
  const id = elements.trackInput.value.trim().toUpperCase();
  if (!id) return;
  elements.trackResultContainer.innerHTML = '<p class="loading-state">Locating order in vault radar...</p>';

  try {
    const data = await requestJson(`/api/orders?id=${encodeURIComponent(id)}`);
    const order = data.order;
    const dateFormatted = new Date(order.createdAt).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    elements.trackResultContainer.innerHTML = `
      <div class="track-report-card">
        <span class="track-status-pill">● STATUS: ${order.status.toUpperCase()}</span>
        <div class="track-meta-row">
          <div><small>REFERENCE ID</small><strong>${order.id}</strong></div>
          <div><small>PLACED AT</small><strong>${dateFormatted}</strong></div>
          <div><small>CUSTOMER</small><strong>${order.name}</strong></div>
          <div><small>TOTAL</small><strong>${money(order.total)}</strong></div>
        </div>
        ${order.address ? `<p style="margin-top:10px; font-size:12px; color:var(--text-muted);"><strong style="color:#fff;">DESTINATION:</strong> ${order.address}</p>` : ''}
        <ul class="track-items-summary">
          ${order.items.map((i) => `<li><span>${i.name} × ${i.quantity}</span><strong>${money(i.unitPrice * i.quantity)}</strong></li>`).join('')}
        </ul>
      </div>
    `;
  } catch (err) {
    elements.trackResultContainer.innerHTML = `<div class="track-err">${err.message}</div>`;
  }
}

// ========================================================
// ATTACH DOM EVENTS
// ========================================================
function attachEvents() {
  // Bag open / close
  elements.bagButton.addEventListener('click', () => {
    elements.orderReceiptBox.hidden = true;
    elements.checkoutForm.hidden = true;
    elements.bagSummary.hidden = false;
    elements.bagItemsList.hidden = false;
    elements.deliveryGauge.hidden = false;
    openBag();
  });

  document.querySelectorAll('[data-close-bag]').forEach((btn) => btn.addEventListener('click', closeBag));

  // Modals open/close
  document.querySelectorAll('[data-open-modal]').forEach((btn) => {
    btn.addEventListener('click', () => openModal(btn.dataset.openModal));
  });

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => closeModal(btn.dataset.closeModal));
  });

  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });

  // Global escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBag();
      closeAllModals();
    }
  });

  // Hero Add Button
  elements.heroAddBtn.addEventListener('click', () => {
    addToBag(state.currentHeroDrinkId, 1);
  });

  // Hero Flavor Switcher
  elements.switcherList.addEventListener('click', (e) => {
    const btn = e.target.closest('.switcher-btn');
    if (!btn) return;
    switchHeroDrink(btn.dataset.drink);
  });

  // Category filter
  elements.categoryDock.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    state.activeCategory = btn.dataset.category;
    document.querySelectorAll('.cat-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderCatalog();
  });

  // Search input
  elements.searchInput.addEventListener('input', (e) => {
    state.query = e.target.value.trim().toLowerCase();
    renderCatalog();
  });

  // Grid card interactions (Inspect 3D or Quick Add)
  elements.drinkGrid.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.btn-quick-add');
    if (addBtn) {
      e.stopPropagation();
      const card = addBtn.closest('.drink-card');
      addToBag(card.dataset.id, 1);
      return;
    }

    const card = e.target.closest('.drink-card');
    if (card) {
      openProductStudio(card.dataset.id);
    }
  });

  // Bag item quantity steppers
  elements.bagItemsList.addEventListener('click', (e) => {
    const btn = e.target.closest('.qty-btn');
    if (btn) {
      const card = btn.closest('.bag-item-card');
      changeBagQty(card.dataset.id, Number(btn.dataset.change));
    }
  });

  // Checkout transitions
  elements.startCheckoutBtn.addEventListener('click', () => {
    if (!state.bag.length) return;
    elements.bagSummary.hidden = true;
    elements.checkoutForm.hidden = false;
    elements.checkoutForm.querySelector('input').focus();
  });

  elements.cancelCheckoutBtn.addEventListener('click', () => {
    elements.checkoutForm.hidden = true;
    elements.bagSummary.hidden = false;
  });

  elements.receiptTrackShortcut.addEventListener('click', () => {
    const id = elements.receiptTrackShortcut.dataset.orderId;
    closeBag();
    elements.trackInput.value = id;
    openModal('order-modal');
    elements.trackForm.requestSubmit();
  });

  // Modal Stepper
  elements.modalMinusBtn.addEventListener('click', () => {
    if (state.modalQty > 1) {
      state.modalQty -= 1;
      elements.modalQtyText.textContent = state.modalQty;
    }
  });

  elements.modalPlusBtn.addEventListener('click', () => {
    if (state.modalQty < 24) {
      state.modalQty += 1;
      elements.modalQtyText.textContent = state.modalQty;
    }
  });

  elements.modalAddToBag.addEventListener('click', () => {
    if (state.selectedProduct) {
      addToBag(state.selectedProduct.id, state.modalQty);
      closeModal('product-modal');
    }
  });

  // Forms
  elements.checkoutForm.addEventListener('submit', submitOrder);
  elements.trackForm.addEventListener('submit', submitTrackOrder);
}

// ========================================================
// INITIALIZATION
// ========================================================
async function init() {
  const yearEl = document.querySelector('#current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  try {
    const res = await fetch('/api/catalog');
    if (!res.ok) throw new Error('Catalog service temporarily unavailable.');
    state.catalog = await res.json();
    renderCategories();
    renderCatalog();
    renderBag();
    init3DHeroPhysics();
    attachEvents();
    switchHeroDrink(state.currentHeroDrinkId);
  } catch (err) {
    elements.drinkGrid.innerHTML = `<p class="loading-state">${err.message}</p>`;
  }
}

init();
