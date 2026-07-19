document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.testimonials-section');
  const stage = section?.querySelector('.testimonial-marquee');
  const track = section?.querySelector('.testimonial-track');
  const cards = section
    ? Array.from(section.querySelectorAll('.testimonial-card')).slice(0, 4)
    : [];

  if (!section || !stage || !track || cards.length === 0 || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Restore a normal horizontal layout; no pinning or deck stacking.
  stage.style.height = 'auto';
  stage.style.width = 'min(100%, 960px)';
  stage.style.maxWidth = '960px';
  stage.style.margin = '0 auto';
  stage.style.overflow = 'visible';
  track.style.height = 'auto';
  track.style.display = 'grid';
  track.style.width = '100%';
  track.style.gap = window.innerWidth <= 600 ? '20px' : '28px';
  track.style.gridTemplateColumns = window.innerWidth <= 600
    ? '1fr'
    : 'repeat(2, minmax(0, 1fr))';

  cards.forEach((card) => {
    card.style.position = 'relative';
    card.style.top = 'auto';
    card.style.right = 'auto';
    card.style.left = 'auto';
    card.style.width = 'auto';
    card.style.marginBottom = '0';
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(cards, { clearProps: 'transform,opacity' });
    return;
  }

  cards.forEach((card, index) => {
    gsap.fromTo(card,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.12,
        ease: 'power2.out',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none'
        }
      }
    );
  });

  ScrollTrigger.refresh();
});
