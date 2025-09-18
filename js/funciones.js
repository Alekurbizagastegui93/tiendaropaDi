// Variables globales
let carrito = [];
let currentGalleryImages = [];
let currentGalleryIndex = 0;
let productos = [
    {
        id: 1,
        nombre: "Vestido Elegante",
        precio: "s/89.99",
        precioOriginal: "s/120.00",
        categoria: "mujer",
        imagen: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        icono: "fas fa-female"
    },
    {
        id: 2,
        nombre: "Camisa Casual",
        precio: "s/45.99",
        precioOriginal: "s/60.00",
        categoria: "hombre",
        imagen: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        icono: "fas fa-male"
    },
    {
        id: 3,
        nombre: "Collar de Perlas",
        precio: "s/35.99",
        precioOriginal: "s/50.00",
        categoria: "accesorios",
        imagen: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        icono: "fas fa-gem"
    },
    {
        id: 4,
        nombre: "Blazer Premium",
        precio: "s/129.99",
        precioOriginal: "s/180.00",
        categoria: "mujer",
        imagen: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        icono: "fas fa-female"
    },
    {
        id: 5,
        nombre: "Jeans Modernos",
        precio: "s/69.99",
        precioOriginal: "s/90.00",
        categoria: "hombre",
        imagen: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        icono: "fas fa-male"
    },
    {
        id: 6,
        nombre: "Reloj Elegante",
        precio: "s/199.99",
        precioOriginal: "s/250.00",
        categoria: "accesorios",
        imagen: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        icono: "fas fa-clock"
    },
    {
        id: 7,
        nombre: "Falda de Seda",
        precio: "s/75.99",
        precioOriginal: "s/95.00",
        categoria: "mujer",
        imagen: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        icono: "fas fa-female"
    },
    {
        id: 8,
        nombre: "Chaqueta de Cuero",
        precio: "s/159.99",
        precioOriginal: "s/200.00",
        categoria: "hombre",
        imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        icono: "fas fa-male"
    }
];

// Funciones principales
function cargarProductos(productosFiltrados = productos) {
    const grid = document.getElementById('productosGrid');
    grid.innerHTML = '';

    if (productosFiltrados.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #999;">No se encontraron productos</p>';
        return;
    }

    productosFiltrados.forEach(producto => {
        const descuento = Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100);
        
        const productCard = `
            <div class="product-card">
                <div class="product-image" onclick="showProductModal(${producto.id})" style="cursor: pointer;">
                    <div class="sale-badge">-${descuento}%</div>
                    <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; background: linear-gradient(45deg, #ff6b6b, #ffd93d); color: white; font-size: 3rem;">
                        <i class="${producto.icono}"></i>
                    </div>
                    <div class="product-overlay">
                        <i class="fas fa-eye"></i>
                        <span>Ver Detalles</span>
                    </div>
                </div>
                <div class="product-info">
                    <h4>${producto.nombre}</h4>
                    <div class="product-price">
                        <span class="current-price">${producto.precio}</span>
                        <span class="old-price">${producto.precioOriginal}</span>
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart" onclick="agregarAlCarrito(${producto.id})">
                            <i class="fas fa-shopping-bag"></i> Agregar al Carrito
                        </button>
                        <button class="view-details" onclick="showProductModal(${producto.id})">
                            <i class="fas fa-info-circle"></i> Detalles
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += productCard;
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    actualizarCarrito();
    mostrarNotificacion('Producto agregado al carrito');
    
    // Efecto visual en el botón
    const buttons = document.querySelectorAll(`button[onclick="agregarAlCarrito(${id})"]`);
    buttons.forEach(button => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'translateY(-2px)';
        }, 150);
    });
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
    mostrarNotificacion('Producto eliminado del carrito', 'info');
}

function actualizarCarrito() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Actualizar contador
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;

    // Actualizar items del carrito
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; margin-top: 50px;">Tu carrito está vacío</p>';
    } else {
        cartItems.innerHTML = carrito.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <i class="${item.icono}"></i>
                </div>
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>
                    <div class="cart-item-price">${item.precio} x ${item.cantidad}</div>
                </div>
                <button onclick="eliminarDelCarrito(${item.id})" style="background: none; border: none; color: #ff6b6b; cursor: pointer; font-size: 1.2rem; padding: 5px;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    // Actualizar total
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    cartTotal.textContent = total.toFixed(2);

    // Animación del contador del carrito
    if (totalItems > 0) {
        cartCount.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            cartCount.style.animation = '';
        }, 500);
    }
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.classList.toggle('open');
    
    // Prevenir scroll del body cuando el carrito está abierto
    if (sidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

function scrollToCategories() {
    document.getElementById('categorias').scrollIntoView({
        behavior: 'smooth'
    });
}

function mostrarCategoria(categoria) {
    // Filtrar productos por categoría
    const productosFiltrados = productos.filter(p => p.categoria === categoria);
    cargarProductos(productosFiltrados);

    // Scroll suave a la sección de productos
    document.getElementById('productos').scrollIntoView({
        behavior: 'smooth'
    });

    // Actualizar título de la sección
    const sectionTitle = document.querySelector('#productos .section-title');
    const categoryNames = {
        'mujer': 'Ropa Femenina',
        'hombre': 'Ropa Masculina',
        'accesorios': 'Accesorios'
    };
    sectionTitle.textContent = categoryNames[categoria] || 'Productos Destacados';
    
    // Cambiar subtítulo
    const sectionSubtitle = document.querySelector('#productos .section-subtitle');
    sectionSubtitle.innerHTML = `
        <span onclick="cargarProductos()" style="color: #667eea; cursor: pointer; text-decoration: underline;">
            Ver todos los productos
        </span> | Categoría: ${categoryNames[categoria]}
    `;
}

function buscarProductos() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        cargarProductos();
        return;
    }

    const productosFiltrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(searchTerm) || 
        p.categoria.toLowerCase().includes(searchTerm)
    );

    cargarProductos(productosFiltrados);

    // Scroll a productos si hay resultados
    if (productosFiltrados.length > 0) {
        document.getElementById('productos').scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Actualizar título
    const sectionTitle = document.querySelector('#productos .section-title');
    sectionTitle.textContent = `Resultados de búsqueda: "${searchTerm}"`;
    
    const sectionSubtitle = document.querySelector('#productos .section-subtitle');
    sectionSubtitle.innerHTML = `
        <span onclick="cargarProductos(); document.querySelector('#productos .section-title').textContent='Productos Destacados'; document.querySelector('#productos .section-subtitle').textContent='Los favoritos de nuestros clientes';" 
              style="color: #667eea; cursor: pointer; text-decoration: underline;">
            Ver todos los productos
        </span> | ${productosFiltrados.length} productos encontrados
    `;
}

function suscribirNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarNotificacion('Por favor ingresa un email válido', 'error');
        return;
    }

    mostrarNotificacion('¡Gracias por suscribirte! Recibirás nuestras últimas ofertas.');
    event.target.reset();
    
    // Efecto visual en el botón
    const button = event.target.querySelector('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> ¡Suscrito!';
    button.style.background = '#4CAF50';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '#ff6b6b';
    }, 2000);
}

function procederCheckout() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío', 'error');
        return;
    }

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const itemsCount = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    mostrarNotificacion(`Procesando compra de ${itemsCount} productos por ${total.toFixed(2)}. ¡Gracias por tu compra!`);
    
    // Simular proceso de compra
    const checkoutBtn = document.querySelector('.checkout-btn');
    const originalText = checkoutBtn.innerHTML;
    checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    checkoutBtn.disabled = true;
    
    setTimeout(() => {
        carrito = [];
        actualizarCarrito();
        toggleCart();
        checkoutBtn.innerHTML = originalText;
        checkoutBtn.disabled = false;
        mostrarNotificacion('¡Compra completada exitosamente!', 'success');
    }, 3000);
}

function mostrarNotificacion(mensaje, tipo = 'success') {
    // Crear notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${tipo === 'error' ? '#ff6b6b' : tipo === 'info' ? '#667eea' : '#4CAF50'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10001;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        font-size: 0.9rem;
    `;
    
    const iconos = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="fas ${iconos[tipo] || iconos.success}"></i>
        ${mensaje}
    `;

    document.body.appendChild(notification);

    // Eliminar después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Efectos de scroll
function handleScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Efecto parallax suave en hero
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const speed = scrolled * 0.3;
    hero.style.transform = `translateY(${speed}px)`;
}

// Función para animar elementos al hacer scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.category-card, .product-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}

// Función para animar testimonios con efecto de aparición escalonada
function animateTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 200;
        
        if (cardTop < window.innerHeight - cardVisible) {
            // Aplicar animación con delay escalonado
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}

// Función para agregar efecto de hover mejorado a testimonios
function addTestimonialHoverEffects() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Event Listeners
window.addEventListener('scroll', () => {
    handleScroll();
    animateOnScroll();
    animateTestimonials();
});

// Búsqueda con Enter
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscarProductos();
            }
        });
    }
});

// Cerrar carrito con ESC o click fuera
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('cartSidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});

// Cerrar carrito al hacer click fuera de él
document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('cartSidebar');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (sidebar && sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && 
        !cartIcon.contains(e.target)) {
        toggleCart();
    }
});

// Scroll suave para enlaces de navegación
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos iniciales
    cargarProductos();
    actualizarCarrito();
    
    // Agregar estilos adicionales para animaciones
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        
        .product-card, .category-card, .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .product-card.animated, .category-card.animated, .testimonial-card.animated {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .testimonial-card {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(additionalStyles);
    
    // Inicializar efectos de testimonios
    addTestimonialHoverEffects();
    
    // Inicializar efectos de productos
    addProductHoverEffects();
    
    // Animar elementos iniciales
    setTimeout(animateOnScroll, 100);
    setTimeout(animateTestimonials, 200);
    
    // Cerrar modales con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeGallery();
        }
    });
    
    // Cerrar modales al hacer click fuera
    document.addEventListener('click', function(e) {
        const productModal = document.getElementById('productModal');
        const galleryModal = document.getElementById('galleryModal');
        
        if (e.target === productModal) {
            closeModal();
        }
        if (e.target === galleryModal) {
            closeGallery();
        }
    });
});

// Función para resetear vista de productos
function resetearVistaProductos() {
    const sectionTitle = document.querySelector('#productos .section-title');
    const sectionSubtitle = document.querySelector('#productos .section-subtitle');
    
    sectionTitle.textContent = 'Productos Destacados';
    sectionSubtitle.textContent = 'Los favoritos de nuestros clientes';
    
    cargarProductos();
    
    document.getElementById('productos').scrollIntoView({
        behavior: 'smooth'
    });
}

// ==================== MODAL FUNCTIONS ====================

// Mostrar modal de producto
function showProductModal(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;

    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    const descuento = Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100);
    
    modalBody.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" onclick="openImageGallery('${producto.imagen}')">
            </div>
            <div class="product-detail-info">
                <h2>${producto.nombre}</h2>
                <div class="product-detail-price">
                    <span class="current-price">${producto.precio}</span>
                    <span class="old-price">${producto.precioOriginal}</span>
                    <span class="discount-badge">-${descuento}%</span>
                </div>
                <div class="product-detail-description">
                    <p>Descubre este increíble producto de nuestra colección ${producto.categoria}. 
                    Fabricado con los mejores materiales y diseñado para ofrecerte comodidad y estilo. 
                    Perfecto para cualquier ocasión.</p>
                </div>
                <div class="product-actions">
                    <button class="btn-primary" onclick="agregarAlCarrito(${producto.id}); closeModal();">
                        <i class="fas fa-shopping-bag"></i> Agregar al Carrito
                    </button>
                    <button class="btn-secondary" onclick="openImageGallery('${producto.imagen}')">
                        <i class="fas fa-images"></i> Ver Galería
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Abrir galería de imágenes
function openImageGallery(mainImage) {
    currentGalleryImages = [mainImage];
    currentGalleryIndex = 0;
    
    const galleryModal = document.getElementById('galleryModal');
    const galleryImage = document.getElementById('galleryImage');
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    
    galleryImage.src = mainImage;
    galleryImage.alt = 'Imagen del producto';
    
    // Generar miniaturas
    galleryThumbnails.innerHTML = currentGalleryImages.map((img, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeImage(${index})">
            <img src="${img}" alt="Miniatura ${index + 1}">
        </div>
    `).join('');
    
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar galería
function closeGallery() {
    const galleryModal = document.getElementById('galleryModal');
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cambiar imagen en galería
function changeImage(direction) {
    if (typeof direction === 'number') {
        currentGalleryIndex = direction;
    } else {
        currentGalleryIndex += direction;
        if (currentGalleryIndex < 0) currentGalleryIndex = currentGalleryImages.length - 1;
        if (currentGalleryIndex >= currentGalleryImages.length) currentGalleryIndex = 0;
    }
    
    const galleryImage = document.getElementById('galleryImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    galleryImage.src = currentGalleryImages[currentGalleryIndex];
    
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentGalleryIndex);
    });
}

// ==================== FORM VALIDATION ====================

// Validar formulario de newsletter
function validateNewsletterForm(form) {
    const email = form.querySelector('input[type="email"]');
    const formGroup = email.closest('.form-group') || createFormGroup(email);
    
    // Limpiar estados anteriores
    formGroup.classList.remove('error', 'success');
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showFieldError(formGroup, 'El email es requerido');
        return false;
    }
    
    if (!emailRegex.test(email.value)) {
        showFieldError(formGroup, 'Ingresa un email válido');
        return false;
    }
    
    showFieldSuccess(formGroup, 'Email válido');
    return true;
}

// Crear grupo de formulario si no existe
function createFormGroup(input) {
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
    input.parentNode.insertBefore(formGroup, input);
    formGroup.appendChild(input);
    return formGroup;
}

// Mostrar error en campo
function showFieldError(formGroup, message) {
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    
    let errorMsg = formGroup.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        formGroup.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
    
    // Efecto shake
    formGroup.classList.add('shake');
    setTimeout(() => formGroup.classList.remove('shake'), 500);
}

// Mostrar éxito en campo
function showFieldSuccess(formGroup, message) {
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    
    let successMsg = formGroup.querySelector('.success-message');
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        formGroup.appendChild(successMsg);
    }
    successMsg.textContent = message;
}

// ==================== DYNAMIC EFFECTS ====================

// Mostrar loading spinner
function showLoading() {
    const spinner = document.getElementById('loadingSpinner');
    spinner.classList.add('active');
}

// Ocultar loading spinner
function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    spinner.classList.remove('active');
}

// Aplicar efecto de entrada a elementos
function applyEntranceEffect(element, effect = 'fade-in') {
    element.classList.add(effect);
    setTimeout(() => element.classList.remove(effect), 1000);
}

// Efecto de partículas en botones
function addParticleEffect(button) {
    const rect = button.getBoundingClientRect();
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width/2}px;
        top: ${rect.top + rect.height/2}px;
        width: 4px;
        height: 4px;
        background: #667eea;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: particleExplode 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 600);
}

// Efecto de hover mejorado para productos
function addProductHoverEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const image = card.querySelector('.product-image img');
        const addButton = card.querySelector('.add-to-cart');
        
        card.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
            this.style.transform = 'translateY(0)';
        });
        
        if (addButton) {
            addButton.addEventListener('click', function() {
                addParticleEffect(this);
            });
        }
    });
}

// ==================== ENHANCED INTERACTIONS ====================

// Mejorar función de suscripción con validación
function suscribirNewsletter(event) {
    event.preventDefault();
    
    if (!validateNewsletterForm(event.target)) {
        return;
    }
    
    const email = event.target.querySelector('input[type="email"]').value;
    const button = event.target.querySelector('button');
    const originalText = button.innerHTML;
    
    // Mostrar loading
    showLoading();
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Suscribiendo...';
    button.disabled = true;
    
    // Simular envío
    setTimeout(() => {
        hideLoading();
        button.innerHTML = '<i class="fas fa-check"></i> ¡Suscrito!';
        button.style.background = '#4CAF50';
        
        mostrarNotificacion('¡Gracias por suscribirte! Recibirás nuestras últimas ofertas.', 'success');
        
        // Resetear formulario
        setTimeout(() => {
            event.target.reset();
            button.innerHTML = originalText;
            button.style.background = '#ff6b6b';
            button.disabled = false;
        }, 2000);
    }, 1500);
}