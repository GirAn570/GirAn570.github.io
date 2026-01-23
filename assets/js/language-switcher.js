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
      cvLink: 'assets/docs/CV-English.pdf'
    },
    sections: {
      certifications: 'Skills overview',
      workSchool: 'Work & Education',
      projects: 'Personal Projects',
      contact: 'Contact',
      contactCta: 'Contact Me',
      contactDescription: 'If you would like to contact me, you can use the information below.',
      viewAll: 'View All',
      viewDetails: 'View Details',
      sendMessage: 'Send Message'
    },
    certificationsPage: {
      intro: 'A curated list of certifications, formations and courses.',
      filterTitle: 'Filter by tag',
      allTags: 'All tags',
      acquiredLabel: 'Acquired',
      noResults: 'No certifications match this tag.',
      openNewTab: 'Open in new tab',
      close: 'Close'
    },
    skills: {
      sysAdminTitle: 'System Administration',
      sysAdminTech: 'Linux & Windows Server 2022',
      sysAdminDesc: 'Configuration and management of server environments',
      programmingTitle: 'Programming & Automation',
      programmingTech: 'Python, Regex, Power Automate',
      programmingDesc: 'Automation and problem-solving',
      softTitle: 'Soft Skills',
      softDesc: 'Problem solving, good listener, curious, fast learner, team work'
    },
    timeline: {
      educationHeading: 'Education',
      workHeading: 'Work Experience',
      btsTitle: 'BTS Cloud Computing',
      btsOrg: 'Lycée Guillaume Kroll',
      btsDate: '2025 - Present',
      btsDesc: 'Currently pursuing a degree in Cloud Computing with focus on cloud infrastructure and services.',
      physicsTitle: 'Bachelor in Physics',
      physicsOrg: 'Université de Luxembourg',
      physicsDate: '2024 - 2025',
      physicsDesc: 'Studied Physics, developing strong analytical and problem-solving skills.',
      baccalaureateTitle: 'European Baccalaureate',
      baccalaureateOrg: 'Ecole Internationale de Differdange',
      baccalaureateDate: '2017 - 2024',
      baccalaureateDesc: 'Completed the European Baccalaureate with an overall grade of 72/100.',
      cgpoTitle: 'Summer Job - Quality Control',
      cgpoOrg: 'CGPO (State Personnel and Organization Management Center)',
      cgpoDate: '2x One month in 2022 & 2023',
      cgpoDesc: 'Quality control of digitized documents and systematic filing of physical archives.',
      klepperTitle: 'Internship - Order Processing',
      klepperOrg: 'Klepper S.A. (Household appliance distributor)',
      klepperDate: '2x One week in 2021 & 2022',
      klepperDesc: 'Quality control, order preparation, and administrative document management.'
    },
    projects: {
      placeholderTitle: 'Projects',
      placeholderDesc: 'Detailed project descriptions will be added here as they are documented.'
    },
    contact: {
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn'
    },
    form: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      successAlert: 'Thank you for your message! I will get back to you soon.'
    },
    footer: {
      subtitle: 'BTS Cloud Computing student',
      quickLinks: 'Quick Links',
      connect: 'Connect',
      allRights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    error404: {
      title: 'Page Not Found',
      message: 'Sorry, the page you\'re looking for doesn\'t exist or has been moved.',
      backHome: 'Back to Home'
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
      cvLink: 'assets/docs/CV-English.pdf'
    },
    sections: {
      certifications: 'Aperçu des compétences',
      workSchool: 'Expérience & Formation',
      projects: 'Projets personnels',
      contact: 'Contact',
      contactCta: 'Me contacter',
      contactDescription: 'Si vous souhaitez me contacter, vous pouvez utiliser les informations ci-dessous.',
      viewAll: 'Tout voir',
      viewDetails: 'Voir les détails',
      sendMessage: 'Envoyer le message'
    },
    certificationsPage: {
      intro: 'Une sélection de certifications, formations et cours.',
      filterTitle: 'Filtrer par tag',
      allTags: 'Tous les tags',
      acquiredLabel: 'Obtenu',
      noResults: 'Aucune certification ne correspond à ce tag.',
      openNewTab: 'Ouvrir dans un nouvel onglet',
      close: 'Fermer'
    },
    skills: {
      sysAdminTitle: 'Administration système',
      sysAdminTech: 'Linux & Windows Server 2022',
      sysAdminDesc: 'Configuration et gestion d\'environnements serveur',
      programmingTitle: 'Programmation & Automatisation',
      programmingTech: 'Python, Regex, Power Automate',
      programmingDesc: 'Automatisation et résolution de problèmes',
      softTitle: 'Compétences interpersonnelles',
      softDesc: 'Résolution de problèmes, bonne écoute, curieux, apprentissage rapide, travail en équipe'
    },
    timeline: {
      educationHeading: 'Formation',
      workHeading: 'Expérience professionnelle',
      btsTitle: 'BTS Cloud Computing',
      btsOrg: 'Lycée Guillaume Kroll',
      btsDate: '2025 - Présent',
      btsDesc: 'Actuellement en formation Cloud Computing axée sur l\'infrastructure et les services cloud.',
      physicsTitle: 'Bachelor en Physique',
      physicsOrg: 'Université de Luxembourg',
      physicsDate: '2024 - 2025',
      physicsDesc: 'Études de physique, développant des compétences analytiques et de résolution de problèmes.',
      baccalaureateTitle: 'Baccalauréat européen',
      baccalaureateOrg: 'École Internationale de Differdange',
      baccalaureateDate: '2017 - 2024',
      baccalaureateDesc: 'Obtention du Baccalauréat européen avec une note globale de 72/100.',
      cgpoTitle: 'Job d\'été - Contrôle qualité',
      cgpoOrg: 'CGPO (Centre de gestion du personnel et de l\'organisation de l\'État)',
      cgpoDate: '2x un mois en 2022 & 2023',
      cgpoDesc: 'Contrôle qualité de documents numérisés et classement systématique d\'archives physiques.',
      klepperTitle: 'Stage - Préparation de commandes',
      klepperOrg: 'Klepper S.A. (Distributeur d\'électroménager)',
      klepperDate: '2x une semiane en 2021 & 2022',
      klepperDesc: 'Contrôle qualité, préparation de commandes et gestion administrative de documents.'
    },
    projects: {
      placeholderTitle: 'Projets',
      placeholderDesc: 'Les descriptions détaillées des projets seront ajoutées ici au fur et à mesure.'
    },
    contact: {
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn'
    },
    form: {
      name: 'Nom',
      email: 'Email',
      subject: 'Sujet',
      message: 'Message',
      successAlert: 'Merci pour votre message ! Je vous répondrai bientôt.'
    },
    footer: {
      subtitle: 'Étudiant en BTS Cloud Computing',
      quickLinks: 'Liens rapides',
      connect: 'Réseaux',
      allRights: 'Tous droits réservés.',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions d\'utilisation'
    },
    error404: {
      title: 'Page introuvable',
      message: 'Désolé, la page que vous recherchez n\'existe pas ou a été déplacée.',
      backHome: 'Retour à l\'accueil'
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
      cvLink: 'assets/docs/CV-English.pdf'
    },
    sections: {
      certifications: 'Fähigkeiten-Überblick',
      workSchool: 'Beruf & Ausbildung',
      projects: 'Persönliche Projekte',
      contact: 'Kontakt',
      contactCta: 'Kontakt aufnehmen',
      contactDescription: 'Wenn Sie mich kontaktieren möchten, können Sie die folgenden Informationen verwenden.',
      viewAll: 'Alle anzeigen',
      viewDetails: 'Details anzeigen',
      sendMessage: 'Nachricht senden'
    },
    certificationsPage: {
      intro: 'Eine Auswahl an Zertifizierungen, Weiterbildungen und Kursen.',
      filterTitle: 'Nach Tag filtern',
      allTags: 'Alle Tags',
      acquiredLabel: 'Erworben',
      noResults: 'Keine Zertifizierungen passen zu diesem Tag.',
      openNewTab: 'In neuem Tab öffnen',
      close: 'Schließen'
    },
    skills: {
      sysAdminTitle: 'Systemadministration',
      sysAdminTech: 'Linux & Windows Server 2022',
      sysAdminDesc: 'Konfiguration und Verwaltung von Serverumgebungen',
      programmingTitle: 'Programmierung & Automatisierung',
      programmingTech: 'Python, Regex, Power Automate',
      programmingDesc: 'Automatisierung und Problemlösung',
      softTitle: 'Soziale Kompetenzen',
      softDesc: 'Problemlösung, gutes Zuhören, neugierig, schnelles Lernen, Teamarbeit'
    },
    timeline: {
      educationHeading: 'Ausbildung',
      workHeading: 'Berufserfahrung',
      btsTitle: 'BTS Cloud Computing',
      btsOrg: 'Lycée Guillaume Kroll',
      btsDate: '2025 - Heute',
      btsDesc: 'Derzeit in Ausbildung im Bereich Cloud Computing mit Fokus auf Cloud-Infrastruktur und -Dienste.',
      physicsTitle: 'Bachelor in Physik',
      physicsOrg: 'Université de Luxembourg',
      physicsDate: '2024 - 2025',
      physicsDesc: 'Physikstudium mit Entwicklung starker analytischer und problemlösender Fähigkeiten.',
      baccalaureateTitle: 'Europäisches Abitur',
      baccalaureateOrg: 'Ecole Internationale de Differdange',
      baccalaureateDate: '2017 - 2024',
      baccalaureateDesc: 'Abschluss des Europäischen Abiturs mit einer Gesamtnote von 72/100.',
      cgpoTitle: 'Sommerjob - Qualitätskontrolle',
      cgpoOrg: 'CGPO (Staatliches Personalverwaltungszentrum)',
      cgpoDate: '2x ein monat in 2022 & 2023',
      cgpoDesc: 'Qualitätskontrolle digitalisierter Dokumente und systematische Archivierung physischer Unterlagen.',
      klepperTitle: 'Praktikum - Auftragsbearbeitung',
      klepperOrg: 'Klepper S.A. (Haushaltsgeräte-Distributor)',
      klepperDate: '2x eine woche in 2021 & 2022',
      klepperDesc: 'Qualitätskontrolle, Auftragsvorbereitung und administrative Dokumentenverwaltung.'
    },
    projects: {
      placeholderTitle: 'Projekte',
      placeholderDesc: 'Detaillierte Projektbeschreibungen werden hier hinzugefügt, sobald sie dokumentiert sind.'
    },
    contact: {
      emailLabel: 'E-Mail',
      linkedinLabel: 'LinkedIn'
    },
    form: {
      name: 'Name',
      email: 'E-Mail',
      subject: 'Betreff',
      message: 'Nachricht',
      successAlert: 'Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.'
    },
    footer: {
      subtitle: 'BTS-Student für Cloud Computing',
      quickLinks: 'Schnellzugriff',
      connect: 'Verbinden',
      allRights: 'Alle Rechte vorbehalten.',
      privacy: 'Datenschutzerklärung',
      terms: 'Nutzungsbedingungen'
    },
    error404: {
      title: 'Seite nicht gefunden',
      message: 'Entschuldigung, die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.',
      backHome: 'Zur Startseite'
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
      cvLink: 'assets/docs/CV-English.pdf'
    },
    sections: {
      certifications: 'Iwwersiicht vun de Fäegkeeten',
      workSchool: 'Aarbecht & Ausbildung',
      projects: 'Perséinlech Projeten',
      contact: 'Kontakt',
      contactCta: 'Kontaktéiert mech',
      contactDescription: 'Wann Dir mat mir a Kontakt triede wëllt, kënnt Dir déi folgend Informatioun benotzen.',
      viewAll: 'Alles gesinn',
      viewDetails: 'Detailer kucken',
      sendMessage: 'Noriicht schécken'
    },
    certificationsPage: {
      intro: 'Eng Auswiel u Zertifizéierungen, Formatiounen a Coursen.',
      filterTitle: 'No Tag filteren',
      allTags: 'All Tags',
      acquiredLabel: 'Kritt',
      noResults: 'Keng Zertifizéierung passt zu dësem Tag.',
      openNewTab: 'An engem neien Tab opmaachen',
      close: 'Zoumaachen'
    },
    skills: {
      sysAdminTitle: 'Systemadministratioun',
      sysAdminTech: 'Linux & Windows Server 2022',
      sysAdminDesc: 'Konfiguratioun a Gestioun vu Serverëmfeld',
      programmingTitle: 'Programméierung & Automatiséierung',
      programmingTech: 'Python, Regex, Power Automate',
      programmingDesc: 'Automatiséierung a Problemléisung',
      softTitle: 'Soft Skills',
      softDesc: 'Problemléisung, gutt nolauschteren, virwëtzeg, séier léieren, Teamaarbecht'
    },
    timeline: {
      educationHeading: 'Ausbildung',
      workHeading: 'Aarbechtserfarung',
      btsTitle: 'BTS Cloud Computing',
      btsOrg: 'Lycée Guillaume Kroll',
      btsDate: '2025 - Elo',
      btsDesc: 'Momentan an der Ausbildung am Cloud Computing mat Fokus op Cloud-Infrastruktur an -Servicer.',
      physicsTitle: 'Bachelor a Physik',
      physicsOrg: 'Université de Luxembourg',
      physicsDate: '2024 - 2025',
      physicsDesc: 'Physikstudium, staark analytesch a problemléisend Fäegkeeten entwéckelt.',
      baccalaureateTitle: 'Europäescht Baccalauréat',
      baccalaureateOrg: 'Ecole Internationale de Differdange',
      baccalaureateDate: '2017 - 2024',
      baccalaureateDesc: 'Europäescht Baccalauréat ofgeschloss mat enger Gesamtnot vu 72/100.',
      cgpoTitle: 'Summerjob - Qualitéitskontroll',
      cgpoOrg: 'CGPO (Centre de gestion du personnel et de l\'organisation de l\'État)',
      cgpoDate: '2x ee mount am 2022 & 2023',
      cgpoDesc: 'Qualitéitskontroll vun digitaliséierten Dokumenter a systematesch Archivéierung vu physesche Dokumenter.',
      klepperTitle: 'Stage - Bestellungsveraarbechtung',
      klepperOrg: 'Klepper S.A. (Elektrogeräter-Distributeur)',
      klepperDate: '2x eng woch am 2021 & 2022',
      klepperDesc: 'Qualitéitskontroll, Virbereedung vu Bestellungen an administrativ Dokumenteverwaltung.'
    },
    projects: {
      placeholderTitle: 'Projeten',
      placeholderDesc: 'Detailléiert Projetbeschreiwunge ginn hei bäigefüügt wann se dokumentéiert sinn.'
    },
    contact: {
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn'
    },
    form: {
      name: 'Numm',
      email: 'Email',
      subject: 'Sujet',
      message: 'Noriicht',
      successAlert: 'Merci fir Är Noriicht! Ech melle mech geschwënn bei Iech.'
    },
    footer: {
      subtitle: 'BTS Cloud Computing Student',
      quickLinks: 'Schnellzougang',
      connect: 'Verbannen',
      allRights: 'All Rechter reservéiert.',
      privacy: 'Dateschutz-Richtlinn',
      terms: 'Benotzungsbedéngungen'
    },
    error404: {
      title: 'Säit net fonnt',
      message: 'Pardon, d\'Säit déi Dir sicht existéiert net méi oder gouf verréckelt.',
      backHome: 'Zréck op d\'Haaptsäit'
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

  // Update section texts using data-i18n="sections.xxx"
  const sectionTextEls = document.querySelectorAll('[data-i18n^="sections."]');
  sectionTextEls.forEach(el => {
    const fullKey = el.getAttribute('data-i18n');
    const key = fullKey.split('.')[1];
    if (translations[lang]?.sections?.[key]) {
      el.textContent = translations[lang].sections[key];
    }
  });

  // Update footer texts
  const footerTextEls = document.querySelectorAll('[data-i18n^="footer."]');
  footerTextEls.forEach(el => {
    const fullKey = el.getAttribute('data-i18n');
    const key = fullKey.split('.')[1];
    if (translations[lang]?.footer?.[key]) {
      el.textContent = translations[lang].footer[key];
    }
  });

  // Update skills cards
  const skillsEls = document.querySelectorAll('[data-i18n^="skills."]');
  skillsEls.forEach(el => {
    const fullKey = el.getAttribute('data-i18n');
    const key = fullKey.split('.')[1];
    if (translations[lang]?.skills?.[key]) {
      el.textContent = translations[lang].skills[key];
    }
  });

  // Update timeline items
  const timelineEls = document.querySelectorAll('[data-i18n^="timeline."]');
  timelineEls.forEach(el => {
    const fullKey = el.getAttribute('data-i18n');
    const key = fullKey.split('.')[1];
    if (translations[lang]?.timeline?.[key]) {
      el.textContent = translations[lang].timeline[key];
    }
  });

  // Update projects section
  const projectsEls = document.querySelectorAll('[data-i18n^="projects."]');
  projectsEls.forEach(el => {
    const fullKey = el.getAttribute('data-i18n');
    const key = fullKey.split('.')[1];
    if (translations[lang]?.projects?.[key]) {
      el.textContent = translations[lang].projects[key];
    }
  });

  const certificationsPageEls = document.querySelectorAll('[data-i18n^="certificationsPage."]');
  certificationsPageEls.forEach(el => {
    const fullKey = el.getAttribute('data-i18n');
    const key = fullKey.split('.')[1];
    if (translations[lang]?.certificationsPage?.[key]) {
      el.textContent = translations[lang].certificationsPage[key];
    }
  });

  // Update 404 page texts
  const errorEls = document.querySelectorAll('[data-i18n^="error404."]');
  errorEls.forEach(el => {
    const fullKey = el.getAttribute('data-i18n');
    const key = fullKey.split('.')[1];
    if (translations[lang]?.error404?.[key]) {
      el.textContent = translations[lang].error404[key];
    }
  });

  // Update contact labels
  const contactEls = document.querySelectorAll('[data-i18n^="contact."]');
  contactEls.forEach(el => {
    const fullKey = el.getAttribute('data-i18n');
    const key = fullKey.split('.')[1];
    if (translations[lang]?.contact?.[key]) {
      el.textContent = translations[lang].contact[key];
    }
  });

  // Update form labels
  const formEls = document.querySelectorAll('[data-i18n^="form."]');
  formEls.forEach(el => {
    const fullKey = el.getAttribute('data-i18n');
    const key = fullKey.split('.')[1];
    if (translations[lang]?.form?.[key]) {
      el.textContent = translations[lang].form[key];
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
