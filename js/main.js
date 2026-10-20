/**
 * PROPOSTA COMERCIAL: ARTHUR MÓVEIS CERQUILHO
 * Animações com GSAP + ScrollTrigger e interações de conversão
 */

document.addEventListener('DOMContentLoaded', () => {
  // Se estiver em modo de impressão ou prefers-reduced-motion, garanta que nada é ocultado
  if (window.matchMedia('print').matches) {
    makeEverythingVisible();
    return;
  }

  initAnimations();
  initScrollInteractions();
});

// Eventos de impressão do navegador
window.addEventListener('beforeprint', () => {
  makeEverythingVisible();
});

function makeEverythingVisible() {
  document.querySelectorAll('*').forEach(el => {
    el.style.opacity = '';
    el.style.transform = '';
  });
}

function initAnimations() {
  // Se GSAP não estiver disponível (ex: offline), garante que tudo fica visível
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    makeEverythingVisible();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Animação do Hero
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    gsap.fromTo(
      heroContent.children,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2
      }
    );
  }

  // Revelação de seções ao rolar a página (ScrollTrigger)
  const animSections = document.querySelectorAll('.section:not(.section-hero)');
  animSections.forEach(section => {
    const header = section.querySelector('.section-header');
    const content = section.querySelector('.section-inner > *:not(.section-header)');

    if (header) {
      gsap.fromTo(
        header,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    if (content) {
      gsap.fromTo(
        content,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  // Efeito sutil de hover nos cards
  const interactiveCards = document.querySelectorAll('.benefit-card, .diag-card, .pricing-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { duration: 0.2, ease: 'power1.out' });
    });
  });
}

function initScrollInteractions() {
  const topNav = document.getElementById('top-nav');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sombra na navbar após rolar
    if (topNav) {
      if (scrollY > 50) {
        topNav.style.backgroundColor = 'rgba(11, 15, 23, 0.95)';
        topNav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.25)';
      } else {
        topNav.style.backgroundColor = 'rgba(11, 15, 23, 0.85)';
        topNav.style.boxShadow = 'none';
      }
    }
  });
}
