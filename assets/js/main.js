// Main JavaScript file
// This will be used for any site-wide functionality

function updateThemeToggleButtons(theme) {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  if (!themeToggles.length) return;

  themeToggles.forEach(btn => {
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');

    let icon = btn.querySelector('i');
    if (!icon) {
      btn.textContent = '';
      icon = document.createElement('i');
      icon.setAttribute('aria-hidden', 'true');
      icon.classList.add('fas');
      btn.appendChild(icon);
    } else {
      icon.setAttribute('aria-hidden', 'true');
      if (!icon.classList.contains('fas') && !icon.classList.contains('fa-solid')) {
        icon.classList.add('fas');
      }
    }

    icon.classList.remove('fa-moon', 'fa-sun');
    icon.classList.add(theme === 'dark' ? 'fa-sun' : 'fa-moon');
  });
}

// Function to toggle dark mode
function toggleDarkMode() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeToggleButtons(newTheme);
}

// Function to change language
function changeLanguage(lang) {
  document.querySelectorAll('.language-switcher button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Restore saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeToggleButtons(savedTheme);

  // Mark active language button
  const currentLang = document.documentElement.lang || 'en';
  const activeLangBtn = document.querySelector(`.language-switcher button[data-lang="${currentLang}"]`);
  if (activeLangBtn) activeLangBtn.classList.add('active');

  // Dark mode toggles
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleDarkMode);
  });

  // Language switcher buttons
  document.querySelectorAll('.language-switcher button').forEach(button => {
    button.addEventListener('click', (e) => {
      changeLanguage(e.target.dataset.lang);
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
      setMobileNavOpen(!mobileNav.classList.contains('open'));
    });

    if (mobileOverlay) mobileOverlay.addEventListener('click', () => setMobileNavOpen(false));

    mobileLinks.forEach(link => link.addEventListener('click', () => setMobileNavOpen(false)));

    document.addEventListener('click', (e) => {
      if (!mobileNav.classList.contains('open')) return;
      if (mobilePanel && !mobilePanel.contains(e.target) && !mobileToggle.contains(e.target)) {
        setMobileNavOpen(false);
      }
    });
  }
});
