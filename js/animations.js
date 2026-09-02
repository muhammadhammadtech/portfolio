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
