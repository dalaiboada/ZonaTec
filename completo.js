// ---------- PRODUCTOS TECNOLÓGICOS ----------
const productsData = [
  { id: 1, name: "MacBook Pro 14\" M3", category: "Laptop", price: 1999, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop", desc: "Potencia extrema con chip M3, 16GB RAM, SSD 512GB y pantalla Liquid Retina XDR. Ideal para profesionales." },
  { id: 2, name: "iPhone 15 Pro Max", category: "Phone", price: 1199, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop", desc: "Cámara de 48MP, chip A17 Pro, batería para todo el día y diseño en titanio." },
  { id: 3, name: "Sony WH-1000XM5", category: "Audio", price: 349, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop", desc: "Cancelación de ruido líder, sonido de alta resolución y 30 horas de autonomía." },
  { id: 4, name: "Logitech MX Master 3S", category: "Accessories", price: 99, image: "https://images.unsplash.com/photo-1615663245857-9bb896550f68?w=400&h=300&fit=crop", desc: "Mouse ergonómico con sensor 8K, scroll magnético y botones personalizables." },
  { id: 5, name: "Samsung Galaxy S24 Ultra", category: "Phone", price: 1299, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop", desc: "Pantalla Dynamic AMOLED 2X, S Pen integrado, cámara 200MP y Snapdragon 8 Gen 3." },
  { id: 6, name: "Dell XPS 15", category: "Laptop", price: 1799, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop", desc: "Ultrabook con panel OLED 3.5K, Intel Core i9 y gráficos NVIDIA RTX." },
  { id: 7, name: "Apple Watch Ultra 2", category: "Wearable", price: 799, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop", desc: "Diseño robusto, GPS de doble frecuencia, 100m resistente al agua." },
  { id: 8, name: "Bose QuietComfort 45", category: "Audio", price: 329, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop", desc: "Cancelación activa de ruido, sonido equilibrado y 24h de batería." },
  { id: 9, name: "Keychron K2 Pro", category: "Accessories", price: 119, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop", desc: "Teclado mecánico inalámbrico, retroiluminación RGB, compatible con Mac/Windows." },
  { id: 10, name: "Anker 735 Charger (GaNPrime)", category: "Accessories", price: 65, image: "https://images.unsplash.com/photo-1605711285791-5109ff82d9b5?w=400&h=300&fit=crop", desc: "Cargador GaN 65W, 2 puertos USB-C + 1 USB-A, carga ultra rápida." },
  { id: 11, name: "Surface Laptop Studio 2", category: "Laptop", price: 2099, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop", desc: "Modo laptop, escenario y estudio, pantalla táctil de 120Hz." },
  { id: 12, name: "Google Pixel Buds Pro", category: "Audio", price: 199, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop", desc: "Cancelación de ruido adaptativa, sonido envolvente y resistencia al agua." },
  { id: 13, name: "PlayStation DualSense Edge", category: "Accessories", price: 199, image: "https://images.unsplash.com/photo-1606318807604-8f7f3e3d8d3b?w=400&h=300&fit=crop", desc: "Controlador profesional con gatillos ajustables, paletas traseras y perfiles intercambiables." },
  { id: 14, name: "Meta Quest 3", category: "Wearable", price: 499, image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&h=300&fit=crop", desc: "Realidad mixta inmersiva, lentes pancake,骁龙 XR2 Gen 2 y controladores táctiles mejorados." },
  { id: 15, name: "ASUS ROG Zephyrus G14", category: "Laptop", price: 1599, image: "https://res.cloudinary.com/dpn3sho2a/image/upload/v1781424944/laptop_y4esvm.jpg", desc: "Gaming laptop con Ryzen 9, RTX 4060, pantalla 165Hz y chasis ultraligero." },
  { id: 16, name: "Samsung Galaxy Chromebook", category: "Laptop", price: 179, image: "https://i.ebayimg.com/images/g/TDEAAeSw8ohqDgrw/s-l1200.webp", desc: "Samsung Computadora portátil Galaxy Chromebook Go de 14 pulgadas, procesador Intel Celeron N4500, 4 GB de RAM, 64 GB de almacenamiento, ChromeOS, XE340XDA-KA2US, portátil para estudiantes." }
];

// ---------- CARRITO ----------
let cart = [];

function saveCart() {
  localStorage.setItem('techsound_cart', JSON.stringify(cart));
  updateCartUI();
}

function loadCart() {
  const stored = localStorage.getItem('techsound_cart');
  if (stored) {
    try { cart = JSON.parse(stored); } catch(e) { cart = []; }
  } else {
    cart = [];
  }
  updateCartUI();
}

function addToCart(product, quantity = 1) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity });
  }
  saveCart();
  showToast(`✓ Añadido: ${product.name}${quantity > 1 ? ' x' + quantity : ''}`, true);
}

function updateQuantity(id, delta) {
  const idx = cart.findIndex(item => item.id === id);
  if (idx !== -1) {
    const newQty = cart[idx].quantity + delta;
    if (newQty <= 0) {
      cart.splice(idx, 1);
    } else {
      cart[idx].quantity = newQty;
    }
    saveCart();
  }
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function updateCartUI() {
  const container = document.getElementById('cartItemsContainer');
  const countSpan = document.getElementById('cartCount');
  const totalSpan = document.getElementById('cartTotal');
  const total = getCartTotal();
  totalSpan.value = total.toFixed(2);
  totalSpan.innerText = `$${total.toFixed(2)}`;
  const itemCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  countSpan.value = itemCount;
  countSpan.innerText = itemCount;

  if (cart.length === 0) {
    container.innerHTML = `<li class="empty-cart"><i class="fas fa-box-open" aria-hidden="true"></i><br/>Carrito vacío</li>`;
    return;
  }
  let html = '';
  cart.forEach(item => {
    html += `
      <li class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${escapeHtml(item.name)}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)} c/u</div>
        </div>
        <div class="cart-item-actions">
          <button class="cart-qty-btn" data-id="${item.id}" data-delta="-1" aria-label="Reducir cantidad">-</button>
          <output class="cart-qty">${item.quantity}</output>
          <button class="cart-qty-btn" data-id="${item.id}" data-delta="1" aria-label="Aumentar cantidad">+</button>
          <button class="remove-item" data-id="${item.id}" aria-label="Eliminar producto"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>
        </div>
      </li>
    `;
  });
  container.innerHTML = html;
  document.querySelectorAll('.cart-qty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.dataset.id);
      const delta = parseInt(btn.dataset.delta);
      updateQuantity(id, delta);
    });
  });
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.dataset.id);
      removeItem(id);
    });
  });
}

function showToast(msg, success = true) {
  let toast = document.createElement('output');
  toast.innerText = msg;
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = success ? '#1DB954' : '#e34c4c';
  toast.style.color = success ? '#000' : '#fff';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '100px';
  toast.style.fontWeight = '600';
  toast.style.zIndex = '9999';
  toast.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
  toast.style.backdropFilter = 'blur(6px)';
  toast.style.fontFamily = 'Inter, sans-serif';
  toast.style.letterSpacing = '0.3px';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 350);
  }, 2000);
}

// ---------- GENERACIÓN DE PDF ----------
async function generateQuotePDF() {
  if (cart.length === 0) {
    showToast('❌ El carrito está vacío. Agrega productos primero.', false);
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const total = getCartTotal();
  const fecha = new Date().toLocaleString();

  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text('TechSound', 20, 30);
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Cotización oficial · Tecnología con estilo', 20, 40);
  doc.setTextColor(29, 185, 84);
  doc.setFontSize(12);
  doc.text(`Fecha: ${fecha}`, 20, 55);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text('Resumen de productos', 20, 75);

  let y = 90;
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text('Producto', 20, y);
  doc.text('Cant.', 130, y);
  doc.text('Precio unit.', 150, y);
  doc.text('Subtotal', 175, y);
  y += 10;

  cart.forEach(item => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    const subtotal = item.price * item.quantity;
    doc.setTextColor(30, 30, 30);
    doc.text(item.name.length > 25 ? item.name.slice(0, 22) + '...' : item.name, 20, y);
    doc.text(`${item.quantity}`, 132, y);
    doc.text(`$${item.price.toFixed(2)}`, 150, y);
    doc.text(`$${subtotal.toFixed(2)}`, 175, y);
    y += 8;
  });

  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(29, 185, 84);
  doc.setFontSize(14);
  doc.text(`TOTAL: $${total.toFixed(2)}`, 20, y);
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text('Gracias por confiar en TechSound · La tecnología suena diferente', 20, y + 12);
  doc.setTextColor(140, 140, 140);
  doc.text('*Cotización generada electrónicamente. Válida por 7 días.', 20, y + 24);

  doc.setFillColor(29, 185, 84);
  doc.circle(190, 25, 4, 'F');

  doc.save(`TechSound_cotizacion_${Date.now()}.pdf`);
  showToast('📄 PDF generado correctamente', true);
}

// ---------- LÓGICA DE BÚSQUEDA Y FILTROS ----------
let currentSearchTerm = "";
let currentCategory = "Todos";
let currentSort = "default";

const allCategoriesSet = new Set(productsData.map(p => p.category));
const categoriesList = ["Todos", ...Array.from(allCategoriesSet).sort()];

function filterProducts() {
  let filtered = productsData.filter(product => {
    if (currentCategory !== "Todos" && product.category !== currentCategory) return false;
    if (currentSearchTerm.trim() !== "") {
      const term = currentSearchTerm.toLowerCase().trim();
      return product.name.toLowerCase().includes(term);
    }
    return true;
  });
  return filtered;
}

function sortProducts(productsArray) {
  const sortedArray = [...productsArray];
  if (currentSort === "price_asc") {
    sortedArray.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price_desc") {
    sortedArray.sort((a, b) => b.price - a.price);
  } else {
    sortedArray.sort((a, b) => a.id - b.id);
  }
  return sortedArray;
}

function renderProducts() {
  let filtered = filterProducts();
  const sorted = sortProducts(filtered);
  const grid = document.getElementById("productsGrid");
  const resultsSpan = document.getElementById("resultsCounter");

  resultsSpan.value = sorted.length;
  resultsSpan.innerText = `${sorted.length} ${sorted.length === 1 ? 'producto' : 'productos'}`;

  if (sorted.length === 0) {
    grid.innerHTML = `<div class="no-results"><i class="fas fa-box-open" aria-hidden="true"></i><br/>No encontramos productos...<br><span style="font-size:0.85rem;">Prueba otra categoría o búsqueda</span></div>`;
    return;
  }

  let gridHTML = "";
  sorted.forEach(product => {
    gridHTML += `
      <article class="product-card" data-id="${product.id}">
        <figure class="card-figure">
          <img src="${product.image}" alt="${product.alt || product.name}" loading="lazy" onerror="this.onerror=null;this.outerHTML='<div class=\\'no-image\\'><i class=\\'fas fa-image\\' aria-hidden=\\'true\\'></i>Imagen no disponible</div>';">
        </figure>
        <div class="card-info">
          <h2 class="product-title">${escapeHtml(product.name)}</h2>
          <span class="product-category"><i class="fas fa-tag" aria-hidden="true"></i> ${product.category}</span>
          <data class="price-value" value="${product.price}">${product.price}</data>
          <button class="add-btn" data-id="${product.id}" data-name="${escapeHtml(product.name)}" data-price="${product.price}" aria-label="Añadir ${escapeHtml(product.name)} al carrito"><i class="fas fa-shopping-cart" aria-hidden="true"></i> Añadir</button>
        </div>
      </article>
    `;
  });
  grid.innerHTML = gridHTML;
}

function escapeHtml(str) {
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function buildCategoriesUI() {
  const container = document.getElementById("categoriesContainer");
  container.innerHTML = "";
  categoriesList.forEach(cat => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "cat-btn";
    if (cat === currentCategory) btn.classList.add("active");
    let icon = "fa-th-large";
    if (cat === "Laptop") icon = "fa-laptop";
    else if (cat === "Phone") icon = "fa-mobile-alt";
    else if (cat === "Audio") icon = "fa-headphones";
    else if (cat === "Accessories") icon = "fa-keyboard";
    else if (cat === "Wearable") icon = "fa-clock";
    btn.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i> ${cat}`;
    btn.addEventListener("click", () => {
      currentCategory = cat;
      updateActiveCategoryUI();
      renderProducts();
    });
    li.appendChild(btn);
    container.appendChild(li);
  });
}

function updateActiveCategoryUI() {
  const btns = document.querySelectorAll(".cat-btn");
  for (let btn of btns) {
    let cleanText = btn.innerText.replace(/[^\w\s]/g, '').trim();
    if (cleanText === currentCategory || (currentCategory === "Todos" && cleanText === "Todos")) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  }
}

// ---------- DELEGACIÓN DE EVENTOS (add + card click) ----------
function setupDelegation() {
  document.getElementById("productsGrid").addEventListener("click", (e) => {
    const addButton = e.target.closest(".add-btn");
    if (addButton) {
      e.stopPropagation();
      const id = parseInt(addButton.dataset.id);
      const name = addButton.dataset.name;
      const price = parseFloat(addButton.dataset.price);
      addToCart({ id, name, price }, 1);
      return;
    }
    const card = e.target.closest(".product-card");
    if (card) {
      const id = parseInt(card.dataset.id);
      showProductDetail(id);
    }
  });
}

// ---------- VISTA DETALLE ----------
let currentProduct = null;
let detailQuantity = 1;

function showProductDetail(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  currentProduct = product;
  detailQuantity = 1;
  document.getElementById("listView").style.display = "none";
  document.getElementById("detailView").style.display = "block";
  document.getElementById("backToShopBtn").hidden = false;

  const container = document.getElementById("detailContainer");
  container.innerHTML = `
    <div class="detail-grid">
      <div class="detail-gallery">
        <figure class="main-figure">
          <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.outerHTML='<div class=\\'no-image\\'><i class=\\'fas fa-image\\' aria-hidden=\\'true\\'></i>Imagen no disponible</div>';">
        </figure>
      </div>
      <div class="detail-info">
        <p class="detail-category"><i class="fas fa-tag" aria-hidden="true"></i> ${product.category}</p>
        <h2 class="detail-title">${escapeHtml(product.name)}</h2>
        <data class="detail-price-value" value="${product.price}">$${product.price.toFixed(2)}</data>
        <p class="detail-description">${escapeHtml(product.desc || "Producto de alta tecnología con calidad premium y diseño innovador. Ideal para los amantes del rendimiento y estilo.")}</p>
        <div class="quantity-selector">
          <button class="qty-btn" id="detailMinus" aria-label="Reducir cantidad">-</button>
          <output class="qty-value" id="detailQty">1</output>
          <button class="qty-btn" id="detailPlus" aria-label="Aumentar cantidad">+</button>
        </div>
        <button class="btn-add-detail" id="detailAddCart" aria-label="Añadir al carrito"><i class="fas fa-cart-plus" aria-hidden="true"></i> Añadir al carrito</button>
      </div>
    </div>
    <h3 class="related-title">🎧 Productos relacionados</h3>
    <div class="related-grid" id="relatedGrid"></div>
  `;

  document.getElementById("detailMinus").addEventListener("click", () => {
    if (detailQuantity > 1) detailQuantity--;
    document.getElementById("detailQty").value = detailQuantity;
    document.getElementById("detailQty").innerText = detailQuantity;
  });
  document.getElementById("detailPlus").addEventListener("click", () => {
    detailQuantity++;
    document.getElementById("detailQty").value = detailQuantity;
    document.getElementById("detailQty").innerText = detailQuantity;
  });
  document.getElementById("detailAddCart").addEventListener("click", () => {
    addToCart({ id: product.id, name: product.name, price: product.price }, detailQuantity);
  });

  const related = productsData.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const relatedGrid = document.getElementById("relatedGrid");
  if (related.length === 0) {
    relatedGrid.innerHTML = "<p style='color:#aaa'>No hay productos relacionados</p>";
  } else {
    let relHtml = "";
    related.forEach(rel => {
      relHtml += `<article class="related-card" data-id="${rel.id}">
        <img src="${rel.image}" alt="${rel.name}" loading="lazy">
        <div class="related-card-info">
          <h3><strong>${escapeHtml(rel.name)}</strong></h3>
          <data value="${rel.price}" style="color:#1DB954">$${rel.price}</data>
        </div>
      </article>`;
    });
    relatedGrid.innerHTML = relHtml;
    document.querySelectorAll('.related-card').forEach(card => {
      card.addEventListener('click', () => {
        const rid = parseInt(card.dataset.id);
        showProductDetail(rid);
      });
    });
  }
}

function backToList() {
  document.getElementById("listView").style.display = "block";
  document.getElementById("detailView").style.display = "none";
  document.getElementById("backToShopBtn").hidden = true;
  renderProducts();
}

// ---------- EVENT LISTENERS ----------
let debounceTimer;
document.getElementById("searchInput").addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    currentSearchTerm = e.target.value;
    renderProducts();
  }, 280);
});

// Custom dropdown
const sortTrigger = document.getElementById("sortSelectTrigger");
const sortOptions = document.getElementById("sortSelectOptions");
const sortWrapper = document.getElementById("sortSelectWrapper");
const sortSelect = document.getElementById("sortSelect");

sortTrigger.addEventListener("click", () => {
  sortWrapper.classList.toggle("open");
});

sortOptions.addEventListener("click", (e) => {
  const opt = e.target.closest(".custom-option");
  if (!opt) return;
  document.querySelectorAll(".custom-option").forEach(o => o.classList.remove("selected"));
  opt.classList.add("selected");
  sortTrigger.textContent = opt.textContent;
  sortSelect.value = opt.dataset.value;
  sortSelect.dispatchEvent(new Event("change"));
  sortWrapper.classList.remove("open");
});

document.addEventListener("click", (e) => {
  if (!sortWrapper.contains(e.target)) {
    sortWrapper.classList.remove("open");
  }
});

sortSelect.addEventListener("change", (e) => {
  currentSort = e.target.value;
  renderProducts();
});

document.getElementById("openCartBtn").addEventListener("click", () => {
  document.getElementById("cartOverlay").classList.add("open");
});

document.getElementById("closeCartBtn").addEventListener("click", () => {
  document.getElementById("cartOverlay").classList.remove("open");
});

document.getElementById("generatePdfBtn").addEventListener("click", generateQuotePDF);

document.getElementById("cartOverlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("cartOverlay")) {
    document.getElementById("cartOverlay").classList.remove("open");
  }
});

document.getElementById("backToShopBtn").addEventListener("click", backToList);

document.getElementById("logoHome").addEventListener("click", backToList);

// ---------- INIT ----------
function init() {
  loadCart();
  buildCategoriesUI();
  renderProducts();
  setupDelegation();
  currentSearchTerm = "";
  document.getElementById("searchInput").value = "";
}

init();
document.getElementById("footerYear").textContent = new Date().getFullYear();