document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Navbar ---
  const navbar = document.getElementById('navbar');
  
  let lastScrollY = window.scrollY;
  
  const handleScroll = () => {
    // Add background when scrolled
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide navbar if scrolled down past 150px. Show only if near the top.
    if (window.scrollY > 150) {
      navbar.classList.add('navbar-hidden');
    } else {
      navbar.classList.remove('navbar-hidden');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  let isMenuOpen = false;

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      
      if (isMenuOpen) {
        navLinks.classList.add('active');
        // Change icon to close (X)
        mobileMenuBtn.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
      } else {
        navLinks.classList.remove('active');
        // Change icon back to hamburger
        mobileMenuBtn.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
      }
    });
  }

  // --- Set Current Year in Footer ---
  const yearSpans = document.querySelectorAll('#current-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });

  // Keep all placeholder social links pointed at the portfolio owner's profiles.
  document.querySelectorAll('a[href="https://github.com"]').forEach(link => {
    link.href = 'https://github.com/muhammadhammadtech';
  });
  document.querySelectorAll('a[href="https://linkedin.com"]').forEach(link => {
    link.href = 'https://www.linkedin.com/in/muhammadhammadtech/';
  });

  if (!document.querySelector('script[src="js/chatbot.js"]')) {
    const chatbotScript = document.createElement('script');
    chatbotScript.src = 'js/chatbot.js';
    document.body.appendChild(chatbotScript);
  }

});
