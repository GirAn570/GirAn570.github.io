(function () {
  const projects = [
    {
      id: 'food-event-project-management',
      title: 'Food Event Project Management',
      date: '2025-10-05',
      type: 'school',
      shortDescription: 'Planned logistics, prep schedule, and budgeting for a two-day food sale during a sports festival.',
      longDescription:
        'Planned the logistics, preparation schedule, and budgeting for a two-day food sale (Pulled Chicken / Pulled Jackfruit sandwiches) during a sports festival. Work included building an MS Planner board (Backlog → Finished), calculating quantities (vegetarian ratio, free meals for referees), defining smoker load scheduling and wood consumption, estimating manpower and setup/cleanup timing, and preparing a clear Excel cost sheet to estimate pricing and profitability. Personas were created to model different visitor needs and service constraints.',
      pdf: null,
      video: null,
      relatedBadges: ['Project Management', 'MS Planner', 'Excel']
    },
    {
      id: 'power-platform',
      title: 'Power Platform',
      date: '',
      type: 'school',
      shortDescription: 'Built some projects using Microsoft Power Platform to design a low-code workflow.',
      longDescription:
        'Built some projects using Microsoft Power Platform. The focus was on designing an end-to-end low-code workflow: data structure, app/flow logic, and a usable interface that supports a clear process from input to output. Using Power automate, I created a workflow that sets me a reminder when to buy new medication and keeps trac of the current number I have. Using power apps I created a Publication Manager app, that helps me trach the monthly orders, inventory, and special orders.',
      pdf: null,
      video: null,
      relatedBadges: ['Power Platform', 'Low-code', 'Automation']
    },
    {
      id: 'grading-management-system',
      title: 'Grading Management System',
      date: '2025-11-17',
      type: 'school',
      shortDescription: 'Planned a grade management web app (Python + SQL + Docker) with personas, user stories, and MoSCoW prioritization.',
      longDescription:
        'Planned a grade management web application where Students can view grades and Professors can create/update grades. The project emphasizes structured planning before coding: personas, at least 12 user stories with acceptance criteria, MoSCoW prioritization, a Planner board workflow, and research on Python frameworks, database integration, secure password hashing, and Docker/Docker Compose. Deliverables include planning and research documents plus a team reflection on collaboration and time management. In the end this project main ojective was not the grading sytem, but to make us realize how important project management is.',
      pdf: null,
      video: null,
      relatedBadges: ['Python', 'Docker', 'SQL', 'System Design']
    },
    {
      id: 'remote-desktop-services-rds',
      title: 'Remote Desktop Services (RDS) Implementation',
      date: '',
      type: 'school',
      shortDescription: 'Implemented a Windows Server 2022 lab with AD DS, DNS, and Remote Desktop Services for centralized student access.',
      longDescription:
        'Implemented a Remote Desktop Services (RDS) lab environment using Windows Server 2022 with Active Directory Domain Services (AD DS) and DNS. The goal was to provide secure, centralized desktop access for students via a session-based RDS deployment. The documentation covers prerequisites, VM/server build steps, domain setup, user/group creation, RDS deployment and collection validation, certificate configuration for RD Web Access, client configuration, and troubleshooting notes.',
      pdf: '../../context/projects/work_school/rds/Lab08_RDS_Implementation_Guilherme_Andrea.pdf',
      video: null,
      relatedBadges: ['Windows Server', 'Microsoft']
    },
    {
      id: 'redm',
      title: 'RedM',
      date: '',
      type: 'personal',
      shortDescription: 'In progress: building and managing an online multiplayer server based on RedM.',
      longDescription:
        'In progress: building and managing an online multiplayer server based on RedM. Work includes server configuration, maintaining resources, and iterating on gameplay and stability based on testing and player feedback. Currently at the early developpement state',
      pdf: null,
      video: null,
      relatedBadges: ['Cloud', 'Project Management']
    }
  ];

  const state = {
    filter: 'all',
    lastFocusedEl: null
  };

  function getLang() {
    return document.documentElement.lang || localStorage.getItem('preferredLanguage') || 'en';
  }

  function t(key, fallback) {
    const lang = getLang();
    const translations = window.languageSwitcher?.translations;
    return translations?.[lang]?.projects?.[key] || fallback;
  }

  function normaliseType(type) {
    return String(type || '').trim().toLowerCase();
  }

  function formatType(type) {
    const norm = normaliseType(type);
    if (norm === 'school') return t('typeSchool', 'School');
    if (norm === 'personal') return t('typePersonal', 'Personal');
    return type || '';
  }

  function compareDates(a, b) {
    const aDate = new Date(a || '1970-01-01').getTime();
    const bDate = new Date(b || '1970-01-01').getTime();
    return aDate - bDate;
  }

  function getVisibleProjects() {
    const filtered = projects.filter(project => {
      if (state.filter === 'all') return true;
      return normaliseType(project.type) === state.filter;
    });

    filtered.sort((a, b) => compareDates(b.date, a.date));
    return filtered;
  }

  function createPill(text) {
    const pill = document.createElement('span');
    pill.className = 'project-pill';
    pill.textContent = text;
    return pill;
  }

  function openModal(project, triggerEl) {
    const modal = document.getElementById('project-modal');
    const title = document.getElementById('project-modal-title');
    const typeEl = document.getElementById('project-modal-type');
    const dateEl = document.getElementById('project-modal-date');
    const descEl = document.getElementById('project-modal-description');
    const pdfLink = document.getElementById('project-modal-pdf');
    const videoWrap = document.getElementById('project-modal-video');
    const badgesEl = document.getElementById('project-modal-badges');

    if (!modal || !title || !typeEl || !dateEl || !descEl || !pdfLink || !videoWrap || !badgesEl) return;

    state.lastFocusedEl = triggerEl || document.activeElement;

    title.textContent = project.title || '';
    typeEl.textContent = formatType(project.type);
    dateEl.textContent = project.date || '';
    const dateRow = dateEl.closest('.proj-modal-meta');
    if (dateRow) dateRow.hidden = !project.date;
    descEl.textContent = project.longDescription || '';

    const pdfSection = pdfLink.closest('.proj-modal-section');
    if (project.pdf) {
      pdfLink.href = encodeURI(project.pdf);
      pdfLink.hidden = false;
      if (pdfSection) pdfSection.hidden = false;
    } else {
      pdfLink.href = '#';
      pdfLink.hidden = true;
      if (pdfSection) pdfSection.hidden = true;
    }

    videoWrap.innerHTML = '';
    const videoSection = videoWrap.closest('.proj-modal-section');
    if (project.video && project.video.type === 'embed' && project.video.src) {
      const iframe = document.createElement('iframe');
      iframe.className = 'proj-video-embed';
      iframe.src = project.video.src;
      iframe.title = project.title || '';
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      videoWrap.appendChild(iframe);
      if (videoSection) videoSection.hidden = false;
    } else if (project.video && project.video.type === 'file' && project.video.src) {
      const video = document.createElement('video');
      video.className = 'proj-video-file';
      video.controls = true;
      video.src = encodeURI(project.video.src);
      videoWrap.appendChild(video);
      if (videoSection) videoSection.hidden = false;
    } else {
      if (videoSection) videoSection.hidden = true;
    }

    badgesEl.innerHTML = '';
    const badgesSection = badgesEl.closest('.proj-modal-section');
    (project.relatedBadges || []).forEach(label => {
      const badge = document.createElement('span');
      badge.className = 'badge badge-tool';
      badge.textContent = label;
      badgesEl.appendChild(badge);
    });

    if (badgesSection) {
      badgesSection.hidden = badgesEl.childElementCount === 0;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.proj-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    if (!modal.classList.contains('open')) return;

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    const videoWrap = document.getElementById('project-modal-video');
    if (videoWrap) videoWrap.innerHTML = '';

    const badgesEl = document.getElementById('project-modal-badges');
    if (badgesEl) badgesEl.innerHTML = '';

    if (state.lastFocusedEl && typeof state.lastFocusedEl.focus === 'function') {
      state.lastFocusedEl.focus();
    }

    state.lastFocusedEl = null;
  }

  function renderList() {
    const list = document.getElementById('projects-list');
    const empty = document.getElementById('projects-empty');
    if (!list) return;

    list.innerHTML = '';

    const items = getVisibleProjects();
    if (empty) empty.hidden = items.length > 0;

    items.forEach(project => {
      const item = document.createElement('div');
      item.className = 'project-item';

      const meta = document.createElement('div');
      meta.className = 'project-meta';
      meta.appendChild(createPill(formatType(project.type)));
      if (project.date) {
        meta.appendChild(createPill(project.date));
      }

      const title = document.createElement('h3');
      title.className = 'project-title';
      title.textContent = project.title || '';

      const desc = document.createElement('p');
      desc.className = 'project-short-description';
      desc.textContent = project.shortDescription || '';

      const actions = document.createElement('div');
      actions.className = 'project-actions';

      const viewMore = document.createElement('button');
      viewMore.type = 'button';
      viewMore.className = 'btn btn-primary';
      viewMore.textContent = t('viewMore', 'View more');
      viewMore.addEventListener('click', () => openModal(project, viewMore));

      actions.appendChild(viewMore);

      item.appendChild(meta);
      item.appendChild(title);
      item.appendChild(desc);
      item.appendChild(actions);

      list.appendChild(item);
    });
  }

  function syncFilterButtons() {
    document.querySelectorAll('.projects-filter-btn').forEach(btn => {
      const filter = btn.getAttribute('data-project-filter') || 'all';
      btn.setAttribute('aria-pressed', filter === state.filter ? 'true' : 'false');
    });
  }

  function setFilter(nextFilter) {
    state.filter = nextFilter;
    syncFilterButtons();
    renderList();
  }

  function initModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    modal.querySelectorAll('[data-project-modal-close]').forEach(el => {
      el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }

  function initFilters() {
    document.querySelectorAll('.projects-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-project-filter') || 'all';
        setFilter(filter);
      });
    });
  }

  function init() {
    initFilters();
    initModal();
    syncFilterButtons();
    renderList();

    document.addEventListener('languageChanged', () => {
      syncFilterButtons();
      renderList();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
