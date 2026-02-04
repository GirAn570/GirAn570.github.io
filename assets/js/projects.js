(function () {
  const projects = [
    {
      id: 'power-automate-workflow',
      title: 'Power Automate Workflow',
      date: '2025-11-21',
      type: 'school',
      shortDescription: 'Built an automated workflow using Microsoft Power Automate.',
      longDescription:
        'Built an automated workflow using Microsoft Power Automate. This project focused on designing a reliable flow, handling triggers/actions, and validating the automation end-to-end.',
      pdf: null,
      video: null,
      relatedBadges: ['Power Automate', 'Automation']
    },
    {
      id: 'publication-manager-powerapps',
      title: 'Publication Manager (Power Apps)',
      date: '2025-11-23',
      type: 'school',
      shortDescription: 'Created a Power Apps solution to manage publications and related data.',
      longDescription:
        'Created a Power Apps solution to manage publications and related data. This project focused on building the app UI, structuring data, and implementing a usable management workflow.',
      pdf: null,
      video: null,
      relatedBadges: ['Power Apps', 'Low-code']
    },
    {
      id: 'food-event-project-management',
      title: 'Food Event Project Management',
      date: '2025-10-13',
      type: 'school',
      shortDescription: 'Planned and managed a food event project with clear deliverables and timelines.',
      longDescription:
        'Planned and managed a food event project with clear deliverables and timelines. This project focused on organizing tasks, coordinating roles, tracking progress, and ensuring objectives were met.',
      pdf: null,
      video: null,
      relatedBadges: ['Project Management']
    },
    {
      id: 'grading-management-system',
      title: 'Grading Management System',
      date: '2025-11-17',
      type: 'school',
      shortDescription: 'Designed a system to manage grading data and workflows.',
      longDescription:
        'Designed a system to manage grading data and workflows. This project focused on data organization, handling typical use cases, and building a clear user workflow for managing grades.',
      pdf: null,
      video: null,
      relatedBadges: ['System Design']
    },
    {
      id: 'redm-project',
      title: 'RedM Project',
      date: '',
      type: 'personal',
      shortDescription: 'Personal project built around RedM.',
      longDescription:
        'Online multiplayer gaming server basen on RedM',
      pdf: null,
      video: null,
      relatedBadges: []
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
