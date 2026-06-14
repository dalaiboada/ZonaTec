import featuredProducts from "./data.js"

function renderFeaturedProducts() {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;
  let html = "";
  featuredProducts.forEach(prod => {
    html += `
      <article class="product-card">
        <figure class="card-figure">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy" onerror="this.onerror=null;this.outerHTML='<div class=\\'no-image\\'><i class=\\'fas fa-image\\' aria-hidden=\\'true\\'></i>Imagen no disponible</div>';">
        </figure>
        <div class="card-info">
          <h2 class="product-title">${escapeHtml(prod.name)}</h2>
          <span class="product-category"><i class="fas fa-tag" aria-hidden="true"></i> ${prod.category}</span>
          <data class="price-value" value="${prod.price}">${prod.price}</data>
          <button class="add-btn" data-name="${escapeHtml(prod.name)}" data-price="${prod.price}"><i class="fas fa-shopping-cart" aria-hidden="true"></i> Añadir</button>
        </div>
      </article>
    `;
  });
  grid.innerHTML = html;
}

function escapeHtml(str) {
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// toast notification (estilo spotify)
function showToast(message, isSuccess = true) {
  let toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "28px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.backgroundColor = isSuccess ? "#1DB954" : "#e74c3c";
  toast.style.color = isSuccess ? "#000" : "#fff";
  toast.style.fontWeight = "600";
  toast.style.padding = "12px 24px";
  toast.style.borderRadius = "100px";
  toast.style.fontSize = "0.85rem";
  toast.style.zIndex = "9999";
  toast.style.boxShadow = "0 8px 20px rgba(0,0,0,0.4)";
  toast.style.backdropFilter = "blur(8px)";
  toast.style.fontFamily = "Inter, sans-serif";
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    setTimeout(() => toast.remove(), 350);
  }, 2200);
}

// interactividad botones productos destacados (delegación)
document.addEventListener("click", (e) => {
  const addBtn = e.target.closest(".add-btn");
  if (addBtn) {
    window.location.href = "./catalogo.html";
    e.preventDefault();
  }
  // botón "Explorar tienda" / "Tienda completa"
  if (e.target.closest("#exploreBtn") || e.target.closest("#shopDemoBtn")) {
    e.preventDefault();
    window.location.href = "./catalogo.html";
  }
  if (e.target.closest("#offersBtn")) {
    e.preventDefault();
    document.getElementById("productos-destacados")?.scrollIntoView({ behavior: "smooth" });
  }
});


// smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const targetId = this.getAttribute("href");
    if (targetId !== "#" && targetId !== "") {
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// formulario contacto
const contactForm = document.getElementById("contactForm");
const contactSubmit = document.getElementById("contactSubmit");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    contactSubmit.disabled = true;
    contactSubmit.innerHTML = "Enviando...";
    formStatus.className = "form-status";
    formStatus.textContent = "";

    try {
      const data = new FormData(contactForm);
      const res = await fetch(contactForm.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        formStatus.className = "form-status success";
        formStatus.textContent = "¡Mensaje enviado con éxito! Te responderemos pronto.";
        contactForm.reset();
      } else {
        formStatus.className = "form-status error";
        formStatus.textContent = "Hubo un problema al enviar. Inténtalo de nuevo.";
      }
    } catch {
      formStatus.className = "form-status error";
      formStatus.textContent = "Error de conexión. Revisa tu internet.";
    } finally {
      contactSubmit.disabled = false;
      contactSubmit.innerHTML = "Enviar mensaje <i class='fas fa-arrow-right'></i>";
    }
  });
}

// cargar productos
renderFeaturedProducts();

document.getElementById("footerYear").textContent = new Date().getFullYear();
