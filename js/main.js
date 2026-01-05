// QbitsOnly - Main JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('nav');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Add scroll effect to header
  let lastScroll = 0;
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.feature-card, .lesson-module, .lesson-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Code syntax highlighting for lesson pages
if (document.querySelector('.lesson-content pre code')) {
  document.querySelectorAll('.lesson-content pre code').forEach(block => {
    // Simple syntax highlighting can be added here
    block.parentElement.style.position = 'relative';
  });
}

// Copy code button functionality
document.querySelectorAll('pre code').forEach((block) => {
  const button = document.createElement('button');
  button.className = 'copy-code-btn';
  button.textContent = 'Copy';
  button.style.cssText = `
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 6px 12px;
    background: rgba(0, 212, 255, 0.2);
    border: 1px solid var(--primary);
    border-radius: 4px;
    color: var(--primary);
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.3s;
  `;
  
  button.addEventListener('click', () => {
    navigator.clipboard.writeText(block.textContent).then(() => {
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 2000);
    });
  });
  
  block.parentElement.style.position = 'relative';
  block.parentElement.appendChild(button);
});

