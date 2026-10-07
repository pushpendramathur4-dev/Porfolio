/**
 * Pushpendra Mathur - Portfolio Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle & Interactive Drawer Controller
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const navBackdrop = document.getElementById('nav-backdrop');

  function openMobileNav() {
    if (!navLinks || !mobileToggle) return;
    navLinks.classList.add('mobile-open');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.classList.add('nav-locked');
  }

  function closeMobileNav() {
    if (!navLinks || !mobileToggle) return;
    navLinks.classList.remove('mobile-open');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.classList.remove('nav-locked');
  }

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.contains('mobile-open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileNav);
    }

    // Close menu when clicking link or mobile CTA
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
        closeMobileNav();
      }
    });

    // Close on viewport resize > 992px
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992 && navLinks.classList.contains('mobile-open')) {
        closeMobileNav();
      }
    });
  }

  // 2. Sticky Navbar Active Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // 3. Copy to Clipboard Utility
  window.copyText = function(text, label) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${label} to clipboard!`);
      }).catch(err => {
        fallbackCopyText(text, label);
      });
    } else {
      fallbackCopyText(text, label);
    }
  };

  function fallbackCopyText(text, label) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied ${label} to clipboard!`);
    } catch (err) {
      showToast(`Unable to copy automatically: ${text}`);
    }
    textArea.remove();
  }

  // 4. Toast Notification
  function showToast(message) {
    let toast = document.getElementById('site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'site-toast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;
    
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 5. Interactive Image Upload / Preview for Screenshot Placeholders
  // Allows user to click on any screenshot placeholder box and pick an image to preview instantly, or view in Lightbox if an image exists
  const placeholders = document.querySelectorAll('.screenshot-placeholder');
  placeholders.forEach((placeholder) => {
    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    placeholder.appendChild(fileInput);

    placeholder.addEventListener('click', (e) => {
      // If clicking button or already has image preview, open in high-res lightbox
      const existingImg = placeholder.querySelector('.image-preview');
      if (existingImg && existingImg.getAttribute('src') && window.getComputedStyle(existingImg).display !== 'none') {
        openLightbox(existingImg.src, existingImg.alt || 'Campaign Screenshot');
        return;
      }
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          let previewImg = placeholder.querySelector('.image-preview');
          if (!previewImg) {
            previewImg = document.createElement('img');
            previewImg.className = 'image-preview';
            placeholder.appendChild(previewImg);
          }
          previewImg.src = evt.target.result;
          previewImg.style.display = 'block';
          placeholder.classList.add('has-permanent-image');

          // Hide default placeholder icons & texts
          const icon = placeholder.querySelector('.placeholder-icon');
          const text = placeholder.querySelector('.placeholder-text');
          const hint = placeholder.querySelector('.placeholder-hint');
          if (icon) icon.style.display = 'none';
          if (text) text.style.display = 'none';
          if (hint) hint.style.display = 'none';

          showToast(`Uploaded screenshot preview: ${file.name}`);
        };
        reader.readAsDataURL(file);
      }
    });
  });

  // 6. Lightbox Image Viewer Modal
  function openLightbox(src, caption) {
    let modal = document.getElementById('image-lightbox');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'image-lightbox';
      modal.className = 'image-lightbox-modal';
      modal.innerHTML = `
        <div class="lightbox-dialog">
          <button class="lightbox-close-btn" aria-label="Close Preview">&times;</button>
          <img class="lightbox-img" src="" alt="Campaign Screenshot Preview">
          <div class="lightbox-caption"></div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('lightbox-close-btn')) {
          modal.classList.remove('active');
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
          modal.classList.remove('active');
        }
      });
    }

    const img = modal.querySelector('.lightbox-img');
    const cap = modal.querySelector('.lightbox-caption');
    img.src = src;
    cap.textContent = caption || '';
    modal.classList.add('active');
  }
});
