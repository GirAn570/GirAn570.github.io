// Backup of main.js on 2025-12-03

// Main JavaScript file
// This will be used for any site-wide functionality

document.addEventListener('DOMContentLoaded', () => {
  // Initialize dark mode if preference is set
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Update theme toggle button
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.innerHTML = savedTheme === 'dark' ? '🌞' : '🌙';
  }
  
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
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.innerHTML = newTheme === 'dark' ? '🌞' : '🌙';
  }
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
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleDarkMode);
  }
  
  // Language switcher
  const langButtons = document.querySelectorAll('.language-switcher button');
  langButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const lang = e.target.dataset.lang;
      changeLanguage(lang);
    });
  });
});
