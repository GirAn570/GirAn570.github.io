// Language switcher functionality
const translations = {
  en: {
    nav: {
      home: 'Home',
      certifications: 'Certifications',
      workSchool: 'Work/School',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      title: 'Hi, I\'m Andrea GIROTTO',
      subtitle: 'BTS Cloud Computing student',
      description: 'I am a BTS Cloud Computing student at Lycée Guillaume Kroll in Luxembourg with experience in Office 365, Linux and Windows Server 2022, Power Automate, Python, Regex and project management.',
      cvButton: 'Download CV (EN)',
      cvLink: '#'
    },
    sections: {
      certifications: 'Skills overview',
      workSchool: 'Work & Education',
      projects: 'Personal Projects',
      viewAll: 'View All',
      viewDetails: 'View Details'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      certifications: 'Certifications',
      workSchool: 'Travail/Études',
      projects: 'Projets',
      contact: 'Contact'
    },
    hero: {
      title: 'Bonjour, je suis Andrea GIROTTO',
      subtitle: 'Étudiant en BTS Cloud Computing',
      description: 'Je suis étudiant en BTS Cloud Computing au Lycée Guillaume Kroll au Luxembourg avec de l\'expérience sur Office 365, Linux et Windows Server 2022, Power Automate, Python, Regex et la gestion de projet.',
      cvButton: 'Télécharger le CV (EN)',
      cvLink: '#'
    },
    sections: {
      certifications: 'Aperçu des compétences',
      workSchool: 'Expérience & Formation',
      projects: 'Projets personnels',
      viewAll: 'Tout voir',
      viewDetails: 'Voir les détails'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      certifications: 'Zertifizierungen',
      workSchool: 'Beruf/Ausbildung',
      projects: 'Projekte',
      contact: 'Kontakt'
    },
    hero: {
      title: 'Hallo, ich bin Andrea GIROTTO',
      subtitle: 'BTS-Student für Cloud Computing',
      description: 'Ich studiere BTS Cloud Computing am Lycée Guillaume Kroll in Luxemburg und habe Erfahrung mit Office 365, Linux und Windows Server 2022, Power Automate, Python, Regex und Projektmanagement.',
      cvButton: 'Lebenslauf (EN) herunterladen',
      cvLink: '#'
    },
    sections: {
      certifications: 'Kompetenzübersicht',
      workSchool: 'Berufserfahrung & Ausbildung',
      projects: 'Persönliche Projekte',
      viewAll: 'Alle anzeigen',
      viewDetails: 'Details anzeigen'
    }
  },
  lb: {
    nav: {
      home: 'Haaptsäit',
      certifications: 'Zertifizéierungen',
      workSchool: 'Aarbecht/Schoul',
      projects: 'Projeten',
      contact: 'Kontakt'
    },
    hero: {
      title: 'Moien, ech sinn Andrea GIROTTO',
      subtitle: 'BTS Cloud Computing Student',
      description: 'Ech studéiere BTS Cloud Computing am Lycée Guillaume Kroll zu Lëtzebuerg an hunn Erfarung mat Office 365, Linux an Windows Server 2022, Power Automate, Python, Regex an Projetmanagement.',
      cvButton: 'CV (EN) eroflueden',
      cvLink: '#'
    },
    sections: {
      certifications: 'Iwwersiicht vun de Kompetenzen',
      workSchool: 'Berufferfarung & Ausbildung',
      projects: 'Perséinlech Projeten',
      viewAll: 'All gesinn',
      viewDetails: 'Detailer kucken'
    }
  }
};

// Function to update the page content based on selected language
function updateContent(lang) {
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update navigation
  const navLinks = document.querySelectorAll('[data-i18n-nav]');
  navLinks.forEach(link => {
    const key = link.getAttribute('data-i18n-nav');
    if (translations[lang]?.nav?.[key]) {
      link.textContent = translations[lang].nav[key];
      if (link.tagName === 'A' && key === 'cv') {
        link.href = translations[lang].hero.cvLink;
      }
    }
  });
  
  // Update hero section
  const heroTitle = document.querySelector('[data-i18n="hero.title"]');
  const heroSubtitle = document.querySelector('[data-i18n="hero.subtitle"]');
  const heroDescription = document.querySelector('[data-i18n="hero.description"]');
  const cvButton = document.querySelector('[data-i18n="hero.cvButton"]');
  
  if (heroTitle) heroTitle.textContent = translations[lang].hero.title;
  if (heroSubtitle) heroSubtitle.textContent = translations[lang].hero.subtitle;
  if (heroDescription) heroDescription.textContent = translations[lang].hero.description;
  if (cvButton) {
    cvButton.textContent = translations[lang].hero.cvButton;
    cvButton.href = translations[lang].hero.cvLink;
  }
  
  // Update section titles and buttons
  const sectionTitles = document.querySelectorAll('[data-i18n-section]');
  sectionTitles.forEach(element => {
    const key = element.getAttribute('data-i18n-section');
    if (translations[lang]?.sections?.[key]) {
      element.textContent = translations[lang].sections[key];
    }
  });
  
  // Update buttons
  const buttons = document.querySelectorAll('[data-i18n-btn]');
  buttons.forEach(button => {
    const key = button.getAttribute('data-i18n-btn');
    if (translations[lang]?.sections?.[key]) {
      button.textContent = translations[lang].sections[key];
    }
  });
  
  // Update language switcher active state
  document.querySelectorAll('.language-switcher button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    }
  });
  
  // Save language preference
  localStorage.setItem('preferredLanguage', lang);
  
  // Dispatch event for any custom components that need to update
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

// Initialize language
function initLanguage() {
  // Check for saved language preference or use browser language
  const savedLang = localStorage.getItem('preferredLanguage');
  const browserLang = navigator.language.split('-')[0];
  const defaultLang = ['en', 'fr', 'de', 'lb'].includes(browserLang) ? browserLang : 'en';
  const initialLang = savedLang || defaultLang;
  
  // Set up language switcher
  const langButtons = document.querySelectorAll('.language-switcher button');
  langButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const lang = e.target.dataset.lang;
      updateContent(lang);
    });
  });
  
  // Set initial language
  updateContent(initialLang);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initLanguage);

// Export for use in other files if needed
window.languageSwitcher = {
  updateContent,
  initLanguage,
  translations
};
