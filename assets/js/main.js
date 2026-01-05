// Main JavaScript file
// This will be used for any site-wide functionality

function updateThemeToggleButtons(theme) {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  if (!themeToggles.length) return;

  themeToggles.forEach(btn => {
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');

    const icon = btn.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-moon', 'fa-sun');
      icon.classList.add(theme === 'dark' ? 'fa-sun' : 'fa-moon');
      return;
    }

    btn.textContent = theme === 'dark' ? '🌞' : '🌙';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize dark mode if preference is set
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Update theme toggle button
  updateThemeToggleButtons(savedTheme);
  
  // Set active language in language switcher
  const currentLang = document.documentElement.lang || 'en';
  const activeLangBtn = document.querySelector(`.language-switcher button[data-lang="${currentLang}"]`);
  if (activeLangBtn) {
    activeLangBtn.classList.add('active');
  }
});

// Function to toggle dark mode
function toggleDarkMode() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Update the theme
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update the toggle button
  updateThemeToggleButtons(newTheme);
}

// Function to change language
function changeLanguage(lang) {
  // This will be handled by the language-switcher.js
  // The actual implementation will depend on how you handle translations
  console.log(`Language changed to: ${lang}`);
  
  // Update active state of language buttons
  document.querySelectorAll('.language-switcher button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    }
  });
}

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Dark mode toggle
  const themeToggles = document.querySelectorAll('.theme-toggle');
  if (themeToggles.length) {
    themeToggles.forEach(btn => {
      btn.addEventListener('click', toggleDarkMode);
    });
  }
  
  // Language switcher
  const langButtons = document.querySelectorAll('.language-switcher button');
  langButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const lang = e.target.dataset.lang;
      changeLanguage(lang);
    });
  });

  // Mobile navigation
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobilePanel = document.querySelector('.mobile-nav-panel');
  const mobileLinks = mobilePanel ? mobilePanel.querySelectorAll('a[data-i18n-nav]') : [];

  function setMobileNavOpen(isOpen) {
    if (!mobileNav || !mobileToggle) return;
    mobileNav.classList.toggle('open', isOpen);
    mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileNav.classList.contains('open');
      setMobileNavOpen(!isOpen);
    });

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', () => setMobileNavOpen(false));
    }

    if (mobileLinks.length) {
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => setMobileNavOpen(false));
      });
    }

    document.addEventListener('click', (e) => {
      if (!mobileNav.classList.contains('open')) return;
      if (mobilePanel && !mobilePanel.contains(e.target) && !mobileToggle.contains(e.target)) {
        setMobileNavOpen(false);
      }
    });
  }
});
