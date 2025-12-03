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
      title: 'Hi, I\'m [Your Name]',
      subtitle: 'Cloud Computing Professional',
      description: 'I\'m passionate about cloud technologies and building scalable solutions. With a background in [your background], I specialize in [your skills].',
      cvButton: 'Download CV',
      cvLink: '#'
    },
    sections: {
      certifications: 'My Certifications',
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
      title: 'Bonjour, je suis [Votre Nom]',
      subtitle: 'Professionnel du Cloud Computing',
      description: 'Passionné par les technologies cloud et la création de solutions évolutives. Avec une formation en [votre formation], je me spécialise dans [vos compétences].',
      cvButton: 'Télécharger CV',
      cvLink: '#'
    },
    sections: {
      certifications: 'Mes Certifications',
      workSchool: 'Expérience & Formation',
      projects: 'Projets Personnels',
      viewAll: 'Voir Tout',
      viewDetails: 'Voir les Détails'
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
      title: 'Hallo, ich bin [Ihr Name]',
      subtitle: 'Cloud Computing Experte',
      description: 'Ich bin begeistert von Cloud-Technologien und dem Aufbau skalierbarer Lösungen. Mit einem Hintergrund in [Ihrem Hintergrund] spezialisiere ich mich auf [Ihre Fähigkeiten].',
      cvButton: 'Lebenslauf Herunterladen',
      cvLink: '#'
    },
    sections: {
      certifications: 'Meine Zertifizierungen',
      workSchool: 'Berufserfahrung & Ausbildung',
      projects: 'Persönliche Projekte',
      viewAll: 'Alle Anzeigen',
      viewDetails: 'Details Anzeigen'
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
      title: 'Moien, ech sinn [Äre Numm]',
      subtitle: 'Cloud Computing Expert',
      description: 'Ech sinn begeeschtert vu Cloud-Technologien an dem Opbau vu skaléierbaren Léisungen. Mat engem Hannergrond an [Äre Hannergrond] spezialiséiere ech mech op [Är Fäegkeeten].',
      cvButton: 'CV eroflueden',
      cvLink: '#'
    },
    sections: {
      certifications: 'Meng Zertifizéierungen',
      workSchool: 'Berufferfaarung & Ausbildung',
      projects: 'Perséinlech Projeten',
      viewAll: 'All Gesinn',
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
