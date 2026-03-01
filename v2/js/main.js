/* ============================================================
   THE BOX VR - Main JavaScript
   Scroll animations, interactions, and UI enhancements
   ============================================================ */

(function() {
  "use strict";

  /* ----------------------------------------------------------
     1. Scroll Reveal Animation (Intersection Observer)
     Reveals elements with .reveal, .reveal-left, .reveal-right,
     .reveal-scale classes when they enter the viewport.
  ---------------------------------------------------------- */
  function initScrollReveal() {
    var revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );

    if (!revealElements.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Stop observing once revealed (one-time animation)
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  /* ----------------------------------------------------------
     2. Navbar Scroll Effect
     Adds .scrolled class to navbar on scroll for visual change.
  ---------------------------------------------------------- */
  function initNavbarScroll() {
    var navbar = document.querySelector('.navbar-thebox');
    if (!navbar) return;

    function handleScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on load
  }

  /* ----------------------------------------------------------
     3. Scroll Progress Bar
     Shows a progress bar at the top indicating scroll position.
  ---------------------------------------------------------- */
  function initScrollProgress() {
    var progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    function updateProgress() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ----------------------------------------------------------
     4. Back to Top Button
     Shows/hides the back-to-top button based on scroll position.
  ---------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.querySelector('.btn-back-top');
    if (!btn) return;

    function toggleVisibility() {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    btn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
  }

  /* ----------------------------------------------------------
     5. Smooth Scroll for Anchor Links
     Handles smooth scrolling for all internal anchor links.
  ---------------------------------------------------------- */
  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    var navbarHeight = 70;

    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var targetPos = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });

          // Close mobile navbar if open
          var navCollapse = document.querySelector('.navbar-collapse.show');
          if (navCollapse) {
            var bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: true });
          }
        }
      });
    });
  }

  /* ----------------------------------------------------------
     6. FAQ Accordion
     Toggles FAQ items open/closed on click.
  ---------------------------------------------------------- */
  function initFAQ() {
    var faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function(item) {
      var question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', function() {
        // Close other items
        faqItems.forEach(function(otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        // Toggle current
        item.classList.toggle('active');
      });
    });
  }

  /* ----------------------------------------------------------
     7. Counter Animation
     Animates numbers counting up when they scroll into view.
  ---------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) {
      observer.observe(counter);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quad
      var easedProgress = 1 - (1 - progress) * (1 - progress);
      var current = Math.floor(easedProgress * target);
      el.textContent = prefix + current.toLocaleString('fr-FR') + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toLocaleString('fr-FR') + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

  /* ----------------------------------------------------------
     8. Parallax Effect on Scroll
     Applies a subtle parallax shift to .parallax-slow elements.
  ---------------------------------------------------------- */
  function initParallax() {
    var elements = document.querySelectorAll('.parallax-slow');
    if (!elements.length) return;

    function updateParallax() {
      var scrollY = window.scrollY;
      elements.forEach(function(el) {
        var speed = parseFloat(el.getAttribute('data-speed')) || 0.3;
        var rect = el.getBoundingClientRect();
        var offset = (rect.top + scrollY) * speed;
        el.style.transform = 'translateY(' + (scrollY * speed - offset) + 'px)';
      });
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
  }

  /* ----------------------------------------------------------
     9. Active Nav Link Highlighting
     Highlights the current page link in the navigation.
  ---------------------------------------------------------- */
  function initActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.navbar-thebox .nav-link');

    navLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var linkPage = href.split('/').pop().split('#')[0] || 'index.html';
      if (linkPage === currentPage) {
        link.classList.add('active');
        // Also set parent dropdown as active
        var parentDropdown = link.closest('.dropdown');
        if (parentDropdown) {
          var dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
          if (dropdownToggle) dropdownToggle.classList.add('active');
        }
      }
    });
  }

  /* ----------------------------------------------------------
     10. Image Lazy Loading Fallback
     Uses IntersectionObserver for images with data-src attribute.
  ---------------------------------------------------------- */
  function initLazyLoad() {
    var lazyImages = document.querySelectorAll('img[data-src]');
    if (!lazyImages.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    lazyImages.forEach(function(img) {
      observer.observe(img);
    });
  }

  /* ----------------------------------------------------------
     11. Typed Text Effect
     Simulates typing animation for elements with .typed-text class.
  ---------------------------------------------------------- */
  function initTypedEffect() {
    var typedElements = document.querySelectorAll('.typed-text');
    if (!typedElements.length) return;

    typedElements.forEach(function(el) {
      var texts = (el.getAttribute('data-texts') || '').split('|');
      if (!texts.length) return;

      var textIndex = 0;
      var charIndex = 0;
      var isDeleting = false;
      var typingSpeed = 80;
      var deletingSpeed = 40;
      var pauseTime = 2000;

      function type() {
        var currentText = texts[textIndex];

        if (isDeleting) {
          el.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
        } else {
          el.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
          setTimeout(function() {
            isDeleting = true;
            type();
          }, pauseTime);
          return;
        }

        if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
      }

      // Start typing with a small delay
      setTimeout(type, 500);
    });
  }

  /* ----------------------------------------------------------
     Initialize All Modules on DOM Ready
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    initNavbarScroll();
    initScrollProgress();
    initBackToTop();
    initSmoothScroll();
    initFAQ();
    initCounters();
    initParallax();
    initActiveNav();
    initLazyLoad();
    initTypedEffect();
  });

})();
