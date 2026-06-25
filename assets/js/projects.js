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
      if (p.hidden) return false;
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

  function appendVideo(videoWrap, video, title) {
    if (video?.type === 'embed' && video.src) {
      const iframe = document.createElement('iframe');
      iframe.className = 'proj-video-embed';
      iframe.src = video.src;
      iframe.title = title || '';
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      videoWrap.appendChild(iframe);
      return true;
    }

    if (video?.type === 'file' && video.src) {
      const videoEl = document.createElement('video');
      videoEl.className = 'proj-video-file';
      videoEl.controls = true;
      videoEl.src = encodeURI(video.src);
      videoWrap.appendChild(videoEl);
      return true;
    }

    return false;
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
      card.setAttribute('role', 'button');
      card.tabIndex = 0;
      card.setAttribute('aria-label', project.title || '');

      // Logo (contained, with placeholder fallback)
      const imgWrap = document.createElement('div');
      imgWrap.className = 'project-card-image';
      const img = document.createElement('img');
      img.src = project.image || '../../assets/images/projects/placeholder.svg';
      img.alt = project.title || '';
      img.loading = 'lazy';
      imgWrap.appendChild(img);
      card.appendChild(imgWrap);

      // Body
      const body = document.createElement('div');
      body.className = 'project-card-body';

      const topLine = document.createElement('div');
      topLine.className = 'project-card-topline';

      if (project.type) {
        topLine.appendChild(makeBadge(formatType(project.type), 'project-type-badge'));
      }

      if (project.status) {
        const statusClass = norm(project.status) === 'completed' ? 'badge-completed' : 'badge-in-progress';
        topLine.appendChild(makeBadge(formatStatus(project.status), statusClass));
      }

      body.appendChild(topLine);

      // Title
      const title = document.createElement('h3');
      title.className = 'project-card-title';
      title.textContent = project.title || '';
      body.appendChild(title);

      if (project.shortDescription) {
        const desc = document.createElement('p');
        desc.className = 'project-card-description';
        desc.textContent = project.shortDescription;
        body.appendChild(desc);
      }

      const tags = (project.tags || []).slice(0, 4);
      if (tags.length > 0) {
        const tagWrap = document.createElement('div');
        tagWrap.className = 'project-card-tags';
        tags.forEach(tag => tagWrap.appendChild(makeBadge(tag)));
        body.appendChild(tagWrap);
      }

      card.appendChild(body);

      const action = document.createElement('div');
      action.className = 'project-card-action';
      action.innerHTML = '<span>' + t('viewDetails', 'View details') + '</span><i class="fas fa-arrow-right" aria-hidden="true"></i>';
      card.appendChild(action);

      // Whole card opens the modal
      const open = () => openModal(project, card);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });

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

    // Reflection
    const reflectionEl      = document.getElementById('project-modal-reflection');
    const reflectionSection = document.getElementById('project-modal-reflection-section');
    if (reflectionEl && reflectionSection) {
      if (project.reflection) {
        reflectionEl.textContent = project.reflection;
        reflectionSection.hidden = false;
      } else {
        reflectionSection.hidden = true;
      }
    }

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
      const videos = Array.isArray(project.videos) ? project.videos : (project.video ? [project.video] : []);

      videos.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'proj-video-item';

        if (video.label) {
          const label = document.createElement('div');
          label.className = 'proj-video-label';
          label.textContent = video.label;
          videoItem.appendChild(label);
        }

        if (appendVideo(videoItem, video, video.label || project.title || '')) {
          videoWrap.appendChild(videoItem);
        } else if (index === 0 && project.video && appendVideo(videoWrap, project.video, project.title || '')) {
          // Backwards-compatible fallback for older single-video project records.
        }
      });

      if (videoSection) {
        videoSection.hidden = videoWrap.childElementCount === 0;
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
