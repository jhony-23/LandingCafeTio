/*
  Aurum Café — main.js
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
})();
