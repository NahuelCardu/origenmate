const whatsappNumber = '5493435025440';
const whatsappBaseUrl = `https://wa.me/${whatsappNumber}`;

const products = [
  {
    name: 'Rei Verde',
    image: 'Imagenes/ReiVerde.webp',
    badge: 'Tradicional y rendidora',
    description:
      'Te llevás una yerba rendidora y con mucho sabor. La Rei Verde Tradicional tiene molienda fina, dura más cebadas y no se lava rápido.',
  },
  {
    name: 'Centenaria Amarilla',
    image: 'Imagenes/Centenaria.jpg',
    badge: 'Sabor fuerte',
    description:
      'Es para el que busca un mate con más presencia y sabor fuerte. Tiene muy buena duración, buena espuma y una molienda premium que rinde un montón.',
  },
  {
    name: 'Centenaria Blanca',
    image: 'Imagenes/CentenariaBlanca.webp',
    badge: 'Suave y equilibrada',
    description:
      'Es una yerba suave pero rendidora, ideal si querés un mate más equilibrado y fácil de tomar todos los días.',
  },
  {
    name: 'Verdecita',
    image: 'Imagenes/Verdecita.webp',
    badge: 'Rica espuma',
    description:
      'Te llevás una yerba con buena calidad, rica espuma y que aguanta varios mates sin lavarse rápido. Es una opción muy buena si querés algo rico y distinto sin pagar de más.',
  },
  {
    name: 'Yerba Latina',
    image: 'Imagenes/Latina.webp',
    badge: 'Rinde mucho',
    description:
      'Es rendidora, con sabor intenso y que dura bastante sin lavarse rápido, es una alternativa más económica a marcas más conocidas.',
  },
];

const productGrid = document.getElementById('products-grid');
const contactForm = document.getElementById('contact-form');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

const whatsappLinkForProduct = (productName) => {
  const text = `Hola, me interesa ${productName}. Quiero recibir más información.`;
  return `${whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
};

const createProductCard = (product) => {
  const article = document.createElement('article');
  article.className = 'product-card';
  article.dataset.animate = '';

  article.innerHTML = `
    <div class="product-card__image">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="product-card__body">
      <span class="product-badge">${product.badge}</span>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-card__actions">
        <a class="btn btn--primary" href="${whatsappLinkForProduct(product.name)}" target="_blank" rel="noopener noreferrer">
          <span>Consultar por WhatsApp</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.66 15.02L2 22l4.12-1.32A10 10 0 1 0 12 2Zm4.63 13.58c-.19.54-.98 1-1.56 1.12-.42.09-.97.17-2.82-.6-2.37-.98-3.9-3.38-4.02-3.54-.12-.16-.95-1.26-.95-2.4s.6-1.7.81-1.93c.21-.22.46-.28.61-.28h.44c.14 0 .34-.06.53.4.19.46.64 1.59.7 1.71.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.35.42-.12.12-.25.25-.11.5.13.25.58.96 1.24 1.56.85.77 1.56 1.01 1.81 1.13.25.12.39.1.54-.06.15-.16.64-.74.81-1 .17-.26.34-.22.57-.14.23.08 1.48.7 1.73.83.25.12.41.18.47.29.06.11.06.67-.13 1.21Z"/></svg>
        </a>
      </div>
    </div>
  `;

  return article;
};

products.forEach((product) => {
  productGrid.appendChild(createProductCard(product));
});

const animatedNodes = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

animatedNodes.forEach((node) => observer.observe(node));

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('is-open');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 760) {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const nombre = String(formData.get('nombre') || '').trim();
  const producto = String(formData.get('producto') || '').trim();
  const mensaje = String(formData.get('mensaje') || '').trim();

  const parts = [`Hola, soy ${nombre}.`];
  parts.push(`Me interesa ${producto || 'recibir más información sobre los productos disponibles'}.`);

  if (mensaje) {
    parts.push(mensaje);
  }

  const message = parts.join(' ');
  const url = `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  contactForm.reset();
});
