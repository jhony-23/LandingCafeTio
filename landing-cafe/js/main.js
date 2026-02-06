/*
  Cafe Tio — main.js
  - Scroll suave y activo en el navbar
  - Animaciones básicas al hacer scroll
  - Menú móvil con transición
*/

(function() {
  const nav = document.getElementById('navbar');
  const navMenu = document.getElementById('navMenu');
  const navToggle = document.getElementById('navToggle');
  const links = Array.from(document.querySelectorAll('.nav-link'));

  // Scroll suave manual para mayor control (aunque CSS lo hace también)
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Cerrar menú en móvil al navegar
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Estado scrolled del navbar
  const onScroll = () => {
    const scrolled = window.scrollY > 20;
    nav.classList.toggle('scrolled', scrolled);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú móvil toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Observador para secciones: activa link y revela tarjetas
  const sectionIds = ['#inicio', '#acerca', '#procesos', '#productos'];
  const sections = sectionIds.map(id => document.querySelector(id)).filter(Boolean);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = '#' + (entry.target.id || '');
      if (entry.isIntersecting && id) {
        // Estado activo del menú
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
        // Revelar elementos internos
        entry.target.querySelectorAll('.reveal, .process-card').forEach(el => {
          el.classList.add('in');
          el.classList.add('revealed');
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px', threshold: 0.1 });

  sections.forEach(sec => io.observe(sec));

  // Marcar contenido inicial como visible (hero)
  document.querySelectorAll('#inicio .reveal, #inicio .process-card').forEach(el => {
    el.classList.add('in');
    el.classList.add('revealed');
  });

  // Construye enlaces de WhatsApp para botones de compra desde un número centralizado
  const waNumber = (document.body.dataset.waNumber || '').replace(/\s+/g, '');
  const waText = (document.body.dataset.waText || 'Hola me encantaria comprar').trim();
  const buyButtons = Array.from(document.querySelectorAll('.buy-btn'));
  buyButtons.forEach(btn => {
    const card = btn.closest('.product-card');
    const title = btn.dataset.product || card?.querySelector('.product-title')?.textContent?.trim() || '';
    const desc = card?.querySelector('.product-text')?.textContent?.trim() || '';
    const price = card?.querySelector('.product-price')?.textContent?.trim() || '';
    const imgSrc = card?.querySelector('img')?.getAttribute('src') || '';
    const imgUrl = imgSrc ? new URL(imgSrc, window.location.href).href : '';

    const lines = [
      `${waText} ${title}`.trim(),
      desc ? `Descripción: ${desc}` : '',
      price ? `Precio: ${price}` : '',
      imgUrl ? `Imagen: ${imgUrl}` : ''
    ].filter(Boolean);

    const msg = encodeURIComponent(lines.join('\n'));
    if (waNumber) {
      btn.setAttribute('href', `https://wa.me/${waNumber}?text=${msg}`);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener');
    }
  });
})();
