(function () {
  const CATEGORIES = ['Certification', 'Courses', 'Formation', 'Visits'];
  const STATUSES = ['Completed', 'In Progress'];

  const certifications = [
    {
      id: 'microsoft-word',
      name: 'Microsoft Word',
      delivered: '17-11-2025',
      category: 'Certification',
      description: 'Microsoft Office certification focused on Word skills.',
      tags: ['Microsoft', 'Office', 'Word'],
      pdf: '../../context/docs/cerifications/word/Word Associate.pdf',
      badgeImage: '../../context/images/skills/docx-associate.png'
    },
    {
      id: 'microsoft-word-expert',
      name: 'Microsoft Word Expert',
      delivered: '19-01-2026',
      category: 'Certification',
      description: 'Microsoft Office expert-level certification focused on advanced Word skills.',
      tags: ['Microsoft', 'Office', 'Word', 'Expert'],
      pdf: '../../context/docs/cerifications/word_expert/Cert70292725488.pdf',
      resultPdf: '../../context/docs/cerifications/word_expert/Result95892732144.pdf',
      badgeImage: '../../context/images/skills/docx-expert.png'
    },
    {
      id: 'word-m365-apps',
      name: 'Microsoft Word Microsoft 365 Apps',
      delivered: '2024-06-01',
      category: 'Courses',
      description: 'Course covering Word features and workflows in Microsoft 365 Apps.',
      tags: ['Microsoft', 'Office', 'Word', 'Microsoft 365'],
      pdf: '../../context/docs/cerifications/word/Microsoft Word Microsoft 365 Apps.pdf',
      badgeImage: ''
    },
    {
      id: 'az-900',
      name: 'Microsoft Azure Fundamentals (AZ-900)',
      delivered: '26-01-2026',
      category: 'Certification',
      description: 'Microsoft Azure fundamentals certification covering core cloud concepts and Azure services.',
      tags: ['Microsoft', 'Azure', 'Cloud', 'AZ-900'],
      pdf: '../../context/docs/cerifications/az900/Cert62492918172.pdf',
      resultPdf: '../../context/docs/cerifications/az900/Result63692737128.pdf',
      badgeImage: '../../context/images/skills/az-900.png'
    },
    {
      id: 'microsoft-powerpoint',
      name: 'Microsoft PowerPoint',
      delivered: '20-10-2025',
      category: 'Certification',
      description: 'Microsoft Office certification focused on PowerPoint skills.',
      tags: ['Microsoft', 'Office', 'PowerPoint'],
      pdf: '../../context/docs/cerifications/powerpoint/Cert90564745565.pdf',
      resultPdf: '../../context/docs/cerifications/powerpoint/Result41564732340.pdf',
      badgeImage: '../../context/images/skills/ppt-associate.png'
    },
    {
      id: 'formation-cloud-basics',
      name: 'Formation: Cloud Basics',
      delivered: '2025-01-01',
      category: 'Formation',
      description: 'Introductory formation covering cloud concepts and terminology.',
      tags: ['Cloud', 'Fundamentals'],
      pdf: null,
      badgeImage: ''
    },
    {
      id: 'visit-example',
      name: 'Company Visit: Data Center Tour',
      delivered: '2024-11-15',
      category: 'Visits',
      description: 'Visit of a data center to understand infrastructure, operations, and security.',
      tags: ['Visit', 'Infrastructure', 'Data Center'],
      pdf: null,
      badgeImage: ''
    }
  ];

  const state = {
    activeTag: 'all',
    activeCategory: 'all',
    activeStatus: 'all',
    view: 'grid',
    sort: 'date-desc',
    lastFocusedEl: null
  };

  function getLang() {
    return document.documentElement.lang || localStorage.getItem('preferredLanguage') || 'en';
  }

  function t(key, fallback) {
    const lang = getLang();
    const translations = window.languageSwitcher?.translations;
    return translations?.[lang]?.certificationsPage?.[key] || fallback;
  }

  function normaliseTag(tag) {
    return String(tag || '').trim();
  }

  function normaliseCategory(category) {
    return String(category || '').trim();
  }

  function normaliseStatus(status) {
    return String(status || '').trim();
  }

  function getItemStatus(item) {
    const explicit = normaliseStatus(item?.status);
    if (explicit) return explicit;
    return item?.pdf ? 'Completed' : 'In Progress';
  }

  function getStatusLabel(status) {
    if (status === 'Completed') return t('statusCompleted', 'Completed');
    if (status === 'In Progress') return t('statusInProgress', 'In Progress');
    return status;
  }

  function getUniqueTags(items) {
    const set = new Set();
    items.forEach(item => {
      (item.tags || []).forEach(tag => {
        const norm = normaliseTag(tag);
        if (norm) set.add(norm);
      });
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }

  function getUniqueCategories(items) {
    const set = new Set();
    items.forEach(item => {
      const norm = normaliseCategory(item.category);
      if (norm) set.add(norm);
    });

    const ordered = CATEGORIES.filter(cat => set.has(cat));
    Array.from(set).forEach(cat => {
      if (!ordered.includes(cat)) ordered.push(cat);
    });
    return ordered;
  }

  function getUniqueStatuses(items) {
    const set = new Set();
    items.forEach(item => {
      const norm = normaliseStatus(getItemStatus(item));
      if (norm) set.add(norm);
    });

    const ordered = STATUSES.filter(status => set.has(status));
    Array.from(set).forEach(status => {
      if (!ordered.includes(status)) ordered.push(status);
    });
    return ordered;
  }

  function getVisibleItems() {
    return certifications.filter(item => {
      const matchesCategory =
        state.activeCategory === 'all' || normaliseCategory(item.category) === state.activeCategory;

      const matchesStatus =
        state.activeStatus === 'all' || getItemStatus(item) === state.activeStatus;

      const matchesTag =
        state.activeTag === 'all' || (item.tags || []).some(tag => normaliseTag(tag) === state.activeTag);

      return matchesCategory && matchesStatus && matchesTag;
    });
  }

  function parseDateMs(value) {
    const str = String(value || '').trim();

    const iso = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (iso) {
      const year = Number(iso[1]);
      const month = Number(iso[2]) - 1;
      const day = Number(iso[3]);
      return Date.UTC(year, month, day);
    }

    const dmy = str.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (dmy) {
      const day = Number(dmy[1]);
      const month = Number(dmy[2]) - 1;
      const year = Number(dmy[3]);
      return Date.UTC(year, month, day);
    }

    const parsed = new Date(str).getTime();
    if (Number.isFinite(parsed)) return parsed;
    return Date.UTC(1970, 0, 1);
  }

  function compareDates(a, b) {
    const aDate = parseDateMs(a);
    const bDate = parseDateMs(b);
    return aDate - bDate;
  }

  function sortItems(items) {
    const next = items.slice();
    const mode = state.sort;

    if (mode === 'date-desc') {
      next.sort((a, b) => compareDates(b.delivered, a.delivered));
      return next;
    }

    if (mode === 'date-asc') {
      next.sort((a, b) => compareDates(a.delivered, b.delivered));
      return next;
    }

    if (mode === 'name-asc') {
      next.sort((a, b) => String(a.name).localeCompare(String(b.name)));
      return next;
    }

    if (mode === 'category-asc') {
      next.sort((a, b) => {
        const aCat = String(a.category || '');
        const bCat = String(b.category || '');
        const byCat = aCat.localeCompare(bCat);
        if (byCat !== 0) return byCat;
        return String(a.name).localeCompare(String(b.name));
      });
      return next;
    }

    return next;
  }

  function createTagButton(tag, label, isActive) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `cert-tag-btn${isActive ? ' active' : ''}`;
    btn.dataset.tag = tag;
    btn.textContent = label;

    btn.addEventListener('click', () => {
      state.activeTag = tag;
      render();
    });

    return btn;
  }

  function createStatusButton(status, label, isActive) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `cert-tag-btn${isActive ? ' active' : ''}`;
    btn.dataset.status = status;
    btn.textContent = label;

    btn.addEventListener('click', () => {
      state.activeStatus = status;
      render();
    });

    return btn;
  }

  function createCategoryButton(category, label, isActive) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `cert-tag-btn${isActive ? ' active' : ''}`;
    btn.dataset.category = category;
    btn.textContent = label;

    btn.addEventListener('click', () => {
      state.activeCategory = category;
      render();
    });

    return btn;
  }

  function renderFilters() {
    const container = document.getElementById('certifications-tag-filters');
    const categoryContainer = document.getElementById('certifications-category-filters');
    const statusContainer = document.getElementById('certifications-status-filters');
    if (!container) return;

    container.innerHTML = '';

    container.appendChild(createTagButton('all', t('allTags', 'All tags'), state.activeTag === 'all'));
    getUniqueTags(certifications).forEach(tag => {
      container.appendChild(createTagButton(tag, tag, state.activeTag === tag));
    });

    if (categoryContainer) {
      categoryContainer.innerHTML = '';
      categoryContainer.appendChild(
        createCategoryButton('all', t('allCategories', 'All categories'), state.activeCategory === 'all')
      );
      getUniqueCategories(certifications).forEach(cat => {
        categoryContainer.appendChild(createCategoryButton(cat, cat, state.activeCategory === cat));
      });
    }

    if (statusContainer) {
      statusContainer.innerHTML = '';
      statusContainer.appendChild(
        createStatusButton('all', t('allStatuses', 'All statuses'), state.activeStatus === 'all')
      );
      getUniqueStatuses(certifications).forEach(status => {
        const label =
          status === 'Completed'
            ? t('statusCompleted', 'Completed')
            : status === 'In Progress'
              ? t('statusInProgress', 'In Progress')
              : status;
        statusContainer.appendChild(createStatusButton(status, label, state.activeStatus === status));
      });
    }
  }

  function getItemIconClass(item) {
    const tags = (item.tags || []).map(tag => normaliseTag(tag).toLowerCase());
    if (tags.includes('powerpoint')) return 'fa-file-powerpoint';
    if (tags.includes('word')) return 'fa-file-word';
    if (tags.includes('cloud')) return 'fa-cloud';
    if (tags.includes('pluralsight')) return 'fa-play';
    if (tags.includes('formation')) return 'fa-graduation-cap';
    return 'fa-certificate';
  }

  function createBadgeEl(className, imageUrl, alt) {
    if (imageUrl) {
      const img = document.createElement('img');
      img.className = className;
      try {
        img.src = new URL(String(imageUrl), document.baseURI).toString();
      } catch (_) {
        img.src = String(imageUrl);
      }
      img.alt = alt || '';
      img.loading = 'lazy';
      img.addEventListener('error', () => {
        const placeholder = document.createElement('div');
        placeholder.className = className;
        placeholder.setAttribute('aria-label', alt || 'Badge');
        img.replaceWith(placeholder);
      });
      return img;
    }

    const placeholder = document.createElement('div');
    placeholder.className = className;
    placeholder.setAttribute('aria-label', alt || 'Badge');
    return placeholder;
  }

  function createCard(item) {
    const hasCertificate = Boolean(item.pdf);
    const status = getItemStatus(item);
    const statusLabel = getStatusLabel(status);

    const card = document.createElement('div');
    card.className = `card cert-card${hasCertificate ? ' has-certificate' : ' no-certificate'}`;
    card.setAttribute('role', 'button');
    card.tabIndex = 0;

    const badge = createBadgeEl('cert-badge', item.badgeImage, item.name);

    const title = document.createElement('h3');
    title.textContent = item.name;

    const category = document.createElement('span');
    category.className = 'cert-card-category';
    category.dataset.category = item.category || '';
    category.textContent = item.category || '';

    const statusPill = document.createElement('span');
    statusPill.className = 'cert-status-pill cert-card-status';
    statusPill.dataset.status = status;
    statusPill.textContent = '';
    statusPill.title = statusLabel;
    statusPill.setAttribute('role', 'img');
    statusPill.setAttribute('aria-label', statusLabel);

    const pillsRow = document.createElement('div');
    pillsRow.className = 'cert-card-pills';
    pillsRow.appendChild(category);
    pillsRow.appendChild(statusPill);

    const meta = document.createElement('p');
    meta.className = 'cert-meta';

    const metaLabel = document.createElement('span');
    metaLabel.className = 'cert-meta-label';
    metaLabel.textContent = t('deliveredLabel', 'Delivered');

    const metaSep = document.createTextNode(': ');

    const metaDate = document.createElement('span');
    metaDate.className = 'cert-date';
    metaDate.textContent = item.delivered;

    meta.appendChild(metaLabel);
    meta.appendChild(metaSep);
    meta.appendChild(metaDate);

    const badges = document.createElement('div');
    badges.className = 'badges';

    (item.tags || []).forEach(tag => {
      const badge = document.createElement('span');
      badge.className = 'badge badge-tool';
      badge.textContent = tag;
      badges.appendChild(badge);
    });

    card.appendChild(badge);
    card.appendChild(pillsRow);
    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(badges);

    const open = () => openModal(item, card);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });

    return card;
  }

  function createListItem(item) {
    const hasCertificate = Boolean(item.pdf);
    const hasResult = Boolean(item.resultPdf);
    const status = getItemStatus(item);
    const statusLabel = getStatusLabel(status);

    const row = document.createElement('div');
    row.className = 'cert-list-item';

    const badge = createBadgeEl('cert-list-badge', item.badgeImage, item.name);

    const content = document.createElement('div');

    const title = document.createElement('div');
    title.className = 'cert-list-title';
    title.textContent = item.name;

    const meta = document.createElement('div');
    meta.className = 'cert-list-meta';

    const catPill = document.createElement('span');
    catPill.className = 'cert-list-meta-pill cert-list-category';
    catPill.dataset.category = item.category || '';
    catPill.textContent = item.category || '';

    const datePill = document.createElement('span');
    datePill.className = 'cert-list-meta-pill cert-list-date';
    datePill.textContent = item.delivered || '';

    const statusPill = document.createElement('span');
    statusPill.className = 'cert-list-meta-pill cert-list-status';
    statusPill.dataset.status = status;
    statusPill.textContent = '';
    statusPill.title = statusLabel;
    statusPill.setAttribute('role', 'img');
    statusPill.setAttribute('aria-label', statusLabel);

    meta.appendChild(catPill);
    meta.appendChild(datePill);
    meta.appendChild(statusPill);

    const desc = document.createElement('p');
    desc.className = 'cert-list-description';
    desc.textContent = item.description || '';

    const tags = document.createElement('div');
    tags.className = 'badges';
    (item.tags || []).forEach(tag => {
      const badgeTag = document.createElement('span');
      badgeTag.className = 'badge badge-tool';
      badgeTag.textContent = tag;
      tags.appendChild(badgeTag);
    });

    const actions = document.createElement('div');
    actions.className = 'cert-list-actions';

    if (hasCertificate || hasResult) {
      const openBtn = document.createElement('button');
      openBtn.type = 'button';
      openBtn.className = 'btn btn-primary';
      openBtn.textContent = t('openPdf', 'Open PDF');
      openBtn.addEventListener('click', () => openModal(item, openBtn));

      actions.appendChild(openBtn);
    }

    if (hasCertificate) {
      const openNewTab = document.createElement('a');
      openNewTab.className = 'btn btn-ghost';
      openNewTab.textContent = t('openNewTab', 'Open in new tab');
      openNewTab.href = encodeURI(item.pdf);
      openNewTab.target = '_blank';
      openNewTab.rel = 'noopener noreferrer';

      actions.appendChild(openNewTab);
    }

    if (hasResult) {
      const openResult = document.createElement('a');
      openResult.className = 'btn btn-ghost';
      openResult.textContent = t('openResult', 'Open result');
      openResult.href = encodeURI(item.resultPdf);
      openResult.target = '_blank';
      openResult.rel = 'noopener noreferrer';

      actions.appendChild(openResult);
    }

    content.appendChild(title);
    content.appendChild(meta);
    content.appendChild(desc);
    content.appendChild(tags);
    if (hasCertificate || hasResult) content.appendChild(actions);

    row.appendChild(badge);
    row.appendChild(content);

    return row;
  }

  function renderGrid() {
    const grid = document.getElementById('certifications-grid');
    const list = document.getElementById('certifications-list');
    const empty = document.getElementById('certifications-empty');

    if (!grid) return;

    grid.innerHTML = '';
    if (list) list.innerHTML = '';

    const items = sortItems(getVisibleItems());

    if (empty) {
      empty.hidden = items.length > 0;
    }

    if (state.view === 'grid') {
      grid.hidden = false;
      if (list) list.hidden = true;
      items.forEach(item => {
        grid.appendChild(createCard(item));
      });
    } else {
      grid.hidden = true;
      if (list) list.hidden = false;
      items.forEach(item => {
        if (list) list.appendChild(createListItem(item));
      });
    }
  }

  function render() {
    renderFilters();
    renderGrid();
    syncControls();
  }

  function syncControls() {
    const gridBtn = document.getElementById('certifications-view-grid');
    const listBtn = document.getElementById('certifications-view-list');
    const sortSelect = document.getElementById('certifications-sort');

    if (gridBtn && listBtn) {
      gridBtn.setAttribute('aria-pressed', state.view === 'grid' ? 'true' : 'false');
      listBtn.setAttribute('aria-pressed', state.view === 'list' ? 'true' : 'false');
    }

    if (sortSelect) {
      sortSelect.value = state.sort;
    }
  }

  function openModal(item, triggerEl) {
    const modal = document.getElementById('cert-modal');
    const title = document.getElementById('cert-modal-title');
    const categoryEl = document.getElementById('cert-modal-category');
    const statusEl = document.getElementById('cert-modal-status');
    const dateEl = document.getElementById('cert-modal-date');
    const descEl = document.getElementById('cert-modal-description');
    const tagsEl = document.getElementById('cert-modal-tags');
    const link = document.getElementById('cert-modal-link');
    const resultLink = document.getElementById('cert-modal-result-link');

    if (!modal || !title || !categoryEl || !statusEl || !dateEl || !descEl || !tagsEl || !link || !resultLink) return;

    state.lastFocusedEl = triggerEl || document.activeElement;

    title.textContent = item.name;
    categoryEl.textContent = item.category || '';
    categoryEl.dataset.category = item.category || '';
    const status = getItemStatus(item);
    const statusLabel = getStatusLabel(status);
    statusEl.textContent = '';
    statusEl.dataset.status = status;
    statusEl.title = statusLabel;
    statusEl.setAttribute('role', 'img');
    statusEl.setAttribute('aria-label', statusLabel);
    dateEl.textContent = item.delivered || '';
    descEl.textContent = item.description || '';
    tagsEl.innerHTML = '';
    (item.tags || []).forEach(tag => {
      const badge = document.createElement('span');
      badge.className = 'badge badge-tool';
      badge.textContent = tag;
      tagsEl.appendChild(badge);
    });

    const badgeBox = modal.querySelector('.cert-modal-badge');
    if (badgeBox) {
      badgeBox.innerHTML = '';
      badgeBox.appendChild(createBadgeEl('cert-modal-badge-img', item.badgeImage, item.name));
    }

    if (item.pdf) {
      const href = encodeURI(item.pdf);
      link.href = href;
      link.hidden = false;
      link.setAttribute('aria-disabled', 'false');
    } else {
      link.href = '#';
      link.hidden = true;
      link.setAttribute('aria-disabled', 'true');
    }

    if (item.resultPdf) {
      const href = encodeURI(item.resultPdf);
      resultLink.href = href;
      resultLink.hidden = false;
      resultLink.setAttribute('aria-disabled', 'false');
    } else {
      resultLink.href = '#';
      resultLink.hidden = true;
      resultLink.setAttribute('aria-disabled', 'true');
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.cert-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    const modal = document.getElementById('cert-modal');

    if (!modal) return;
    if (!modal.classList.contains('open')) return;

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    const badgeBox = modal.querySelector('.cert-modal-badge');
    if (badgeBox) badgeBox.innerHTML = '';

    if (state.lastFocusedEl && typeof state.lastFocusedEl.focus === 'function') {
      state.lastFocusedEl.focus();
    }

    state.lastFocusedEl = null;
  }

  function initModal() {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;

    modal.querySelectorAll('[data-cert-modal-close]').forEach(el => {
      el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }

  function initControls() {
    const gridBtn = document.getElementById('certifications-view-grid');
    const listBtn = document.getElementById('certifications-view-list');
    const sortSelect = document.getElementById('certifications-sort');

    if (gridBtn) {
      gridBtn.addEventListener('click', () => {
        state.view = 'grid';
        render();
      });
    }

    if (listBtn) {
      listBtn.addEventListener('click', () => {
        state.view = 'list';
        render();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', e => {
        state.sort = e.target.value;
        render();
      });
    }
  }

  function init() {
    render();
    initModal();
    initControls();

    document.addEventListener('languageChanged', () => {
      render();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
