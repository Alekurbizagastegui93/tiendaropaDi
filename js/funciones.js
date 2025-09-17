// Variables globales
let carrito = [];
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
                <div class="product-image">
                    <div class="sale-badge">-${descuento}%</div>
                    <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; background: linear-gradient(45deg, #ff6b6b, #ffd93d); color: white; font-size: 3rem;">
                        <i class="${producto.icono}"></i>
                    </div>
                </div>
                <div class="product-info">
                    <h4>${producto.nombre}</h4>
                    <div class="product-price">
                        <span class="current-price">${producto.precio}</span>
                        <span class="old-price">${producto.precioOriginal}</span>
                    </div>
                    <button class="add-to-cart" onclick="agregarAlCarrito(${producto.id})">
                        <i class="fas fa-shopping-bag"></i> Agregar al Carrito
                    </button>
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
    const elements = document.querySelectorAll('.category-card, .product-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}

// Event Listeners
window.addEventListener('scroll', () => {
    handleScroll();
    animateOnScroll();
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
        
        .product-card, .category-card {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .product-card.animated, .category-card.animated {
            animation: fadeInUp 0.6s ease forwards;
        }
    `;
    document.head.appendChild(additionalStyles);
    
    // Animar elementos iniciales
    setTimeout(animateOnScroll, 100);
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