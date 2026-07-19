document.addEventListener('DOMContentLoaded', () => {
  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Keep the About journey hidden on initial page load. Reveal it only after
  // the user starts scrolling down to the section, with its own staggered delay.
  const aboutStoryElements = document.querySelectorAll('.about-story-reveal');
  if (aboutStoryElements.length) {
    const revealAboutStory = () => {
      if (window.scrollY <= 0) return;

      let remaining = false;
      aboutStoryElements.forEach(el => {
        if (el.classList.contains('active')) return;

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
          el.classList.add('active');
        } else {
          remaining = true;
        }
      });

      if (!remaining) window.removeEventListener('scroll', revealAboutStory);
    };

    window.addEventListener('scroll', revealAboutStory, { passive: true });
  }

  // --- Number Counter Animation ---
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const counterOptions = {
    threshold: 0.5
  };
  
  const animateCounter = (el) => {
    const target = +el.getAttribute('data-target');
    const duration = 2000; // ms
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;
    
    // Extract any existing span (like the + or %)
    const spanNode = el.querySelector('span');
    const spanHTML = spanNode ? spanNode.outerHTML : '';
    
    const easeOutQuad = t => t * (2 - t);
    
    const counterInterval = setInterval(() => {
      currentFrame++;
      const progress = easeOutQuad(currentFrame / totalFrames);
      const currentVal = Math.round(target * progress);
      
      el.innerHTML = currentVal + ' ' + spanHTML;
      
      if (currentFrame === totalFrames) {
        clearInterval(counterInterval);
        el.innerHTML = target + ' ' + spanHTML; // Ensure it ends exactly on target
      }
    }, frameRate);
  };
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, counterOptions);
  
  statNumbers.forEach(num => {
    counterObserver.observe(num);
  });
});
