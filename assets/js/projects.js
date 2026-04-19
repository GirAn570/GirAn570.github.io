(function () {
  const state = {
    typeFilter: 'all',
    statusFilter: 'all',
    lastFocusedEl: null
  };

  // ── Helpers ──────────────────────────────────────────────────

  function getLang() {
    return document.documentElement.lang || localStorage.getItem('preferredLanguage') || 'en';
  }

  function t(key, fallback) {
    const lang = getLang();
    return window.languageSwitcher?.translations?.[lang]?.projects?.[key] || fallback;
  }

  function norm(val) {
    return String(val || '').trim().toLowerCase();
  }

  function formatType(type) {
    const n = norm(type);
    if (n === 'school')   return t('typeSchool', 'School');
    if (n === 'personal') return t('typePersonal', 'Personal');
    return type || '';
  }

  function formatStatus(status) {
    const n = norm(status);
    if (n === 'completed')   return t('statusCompleted', 'Completed');
    if (n === 'in-progress') return t('statusInProgress', 'In Progress');
    return status || '';
  }

  function getProjects() {
    return (window.PROJECTS_DATA || []).filter(p => {
      const typeOk   = state.typeFilter   === 'all' || norm(p.type)   === state.typeFilter;
      const statusOk = state.statusFilter === 'all' || norm(p.status) === state.statusFilter;
      return typeOk && statusOk;
    });
  }

  function makeBadge(text, extraClass) {
    const el = document.createElement('span');
    el.className = 'badge badge-tool' + (extraClass ? ' ' + extraClass : '');
    el.textContent = text;
    return el;
  }

  // ── Card rendering ────────────────────────────────────────────

  function renderGrid() {
    const grid  = document.getElementById('projects-list');
    const empty = document.getElementById('projects-empty');
    if (!grid) return;

    grid.innerHTML = '';

    const items = getProjects();
    if (empty) empty.hidden = items.length > 0;

    items.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';

      // Body
      const body = document.createElement('div');
      body.className = 'project-card-body';

      // Meta row: type + status badges
      const meta = document.createElement('div');
      meta.className = 'project-card-meta';
      meta.appendChild(makeBadge(formatType(project.type)));
      if (project.status) {
        const statusClass = norm(project.status) === 'completed' ? 'badge-completed' : 'badge-in-progress';
        meta.appendChild(makeBadge(formatStatus(project.status), statusClass));
      }

      // Title
      const title = document.createElement('h3');
      title.className = 'project-card-title';
      title.textContent = project.title || '';

      // Short description
      const desc = document.createElement('p');
      desc.className = 'project-card-desc';
      desc.textContent = project.shortDescription || '';

      // Tags
      const tags = document.createElement('div');
      tags.className = 'project-card-tags';
      (project.tags || []).forEach(tag => tags.appendChild(makeBadge(tag)));

      // Action button
      const actions = document.createElement('div');
      actions.className = 'project-card-actions';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-primary';
      btn.textContent = t('viewMore', 'View Details');
      btn.addEventListener('click', () => openModal(project, btn));
      actions.appendChild(btn);

      body.appendChild(meta);
      body.appendChild(title);
      body.appendChild(desc);
      body.appendChild(tags);
      body.appendChild(actions);

      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  // ── Modal ─────────────────────────────────────────────────────

  function openModal(project, triggerEl) {
    const modal   = document.getElementById('project-modal');
    const titleEl = document.getElementById('project-modal-title');
    const typeEl  = document.getElementById('project-modal-type');
    const statusEl= document.getElementById('project-modal-status');
    const descEl  = document.getElementById('project-modal-description');
    const docsEl  = document.getElementById('project-modal-documents');
    const videoWrap = document.getElementById('project-modal-video');
    const tagsEl  = document.getElementById('project-modal-badges');
    if (!modal) return;

    state.lastFocusedEl = triggerEl || document.activeElement;

    // Title
    if (titleEl) titleEl.textContent = project.title || '';

    // Type
    if (typeEl) typeEl.textContent = formatType(project.type);

    // Status
    if (statusEl) {
      statusEl.textContent = formatStatus(project.status);
      const statusClass = norm(project.status) === 'completed' ? 'badge-completed' : 'badge-in-progress';
      statusEl.className = 'badge ' + statusClass;
    }

    // Description
    if (descEl) descEl.textContent = project.longDescription || '';

    // Documents
    if (docsEl) {
      docsEl.innerHTML = '';
      const docsSection = docsEl.closest('.proj-modal-section');
      const docs = project.documents || [];
      if (docs.length > 0) {
        docs.forEach(doc => {
          const a = document.createElement('a');
          a.className = 'proj-modal-doc-link';
          a.href = encodeURI(doc.path);
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.innerHTML = '<i class="fas fa-file-pdf" aria-hidden="true"></i> ' + (doc.label || 'Document');
          docsEl.appendChild(a);
        });
        if (docsSection) docsSection.hidden = false;
      } else {
        if (docsSection) docsSection.hidden = true;
      }
    }

    // Video
    if (videoWrap) {
      videoWrap.innerHTML = '';
      const videoSection = videoWrap.closest('.proj-modal-section');
      if (project.video?.type === 'embed' && project.video.src) {
        const iframe = document.createElement('iframe');
        iframe.className = 'proj-video-embed';
        iframe.src = project.video.src;
        iframe.title = project.title || '';
        iframe.loading = 'lazy';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        videoWrap.appendChild(iframe);
        if (videoSection) videoSection.hidden = false;
      } else if (project.video?.type === 'file' && project.video.src) {
        const video = document.createElement('video');
        video.className = 'proj-video-file';
        video.controls = true;
        video.src = encodeURI(project.video.src);
        videoWrap.appendChild(video);
        if (videoSection) videoSection.hidden = false;
      } else {
        if (videoSection) videoSection.hidden = true;
      }
    }

    // Tags
    if (tagsEl) {
      tagsEl.innerHTML = '';
      const tagsSection = tagsEl.closest('.proj-modal-section');
      (project.tags || []).forEach(tag => tagsEl.appendChild(makeBadge(tag)));
      if (tagsSection) tagsSection.hidden = tagsEl.childElementCount === 0;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.proj-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    const modal = document.getElementById('project-modal');
    if (!modal || !modal.classList.contains('open')) return;

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    const videoWrap = document.getElementById('project-modal-video');
    if (videoWrap) videoWrap.innerHTML = '';

    if (state.lastFocusedEl?.focus) state.lastFocusedEl.focus();
    state.lastFocusedEl = null;
  }

  // ── Filters ───────────────────────────────────────────────────

  function syncFilters() {
    document.querySelectorAll('[data-project-filter]').forEach(btn => {
      const val = btn.getAttribute('data-project-filter');
      btn.setAttribute('aria-pressed', val === state.typeFilter ? 'true' : 'false');
    });
    document.querySelectorAll('[data-project-status]').forEach(btn => {
      const val = btn.getAttribute('data-project-status');
      btn.setAttribute('aria-pressed', val === state.statusFilter ? 'true' : 'false');
    });
  }

  function initFilters() {
    document.querySelectorAll('[data-project-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.typeFilter = btn.getAttribute('data-project-filter');
        syncFilters();
        renderGrid();
      });
    });
    document.querySelectorAll('[data-project-status]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.statusFilter = btn.getAttribute('data-project-status');
        syncFilters();
        renderGrid();
      });
    });
  }

  function initModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    modal.querySelectorAll('[data-project-modal-close]').forEach(el => {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function init() {
    initFilters();
    initModal();
    syncFilters();
    renderGrid();

    document.addEventListener('languageChanged', () => {
      syncFilters();
      renderGrid();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
