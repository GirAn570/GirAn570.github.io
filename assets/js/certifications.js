(function () {
  const CATEGORIES = ['Certification', 'Courses', 'Formation', 'Visits'];

  const certifications = [
    {
      id: 'word-associate',
      name: 'Word Associate',
      delivered: '2024-06-01',
      category: 'Certification',
      description: 'Microsoft Office certification focused on Word skills.',
      tags: ['Microsoft', 'Office', 'Word'],
      pdf: '../../context/docs/cerifications/word/Word Associate.pdf',
      badgeImage: ''
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
      id: 'powerpoint-cert',
      name: 'PowerPoint Certification',
      delivered: '2024-06-01',
      category: 'Certification',
      description: 'Microsoft Office certification focused on PowerPoint skills.',
      tags: ['Microsoft', 'Office', 'PowerPoint'],
      pdf: '../../context/docs/cerifications/powerpoint/Cert90564745565.pdf',
      badgeImage: ''
    },
    {
      id: 'powerpoint-result',
      name: 'PowerPoint Result',
      delivered: '2024-06-01',
      category: 'Courses',
      description: 'Result report for the PowerPoint assessment.',
      tags: ['Microsoft', 'Office', 'PowerPoint'],
      pdf: '../../context/docs/cerifications/powerpoint/Result41564732340.pdf',
      badgeImage: ''
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

  function getVisibleItems() {
    return certifications.filter(item => {
      const matchesCategory =
        state.activeCategory === 'all' || normaliseCategory(item.category) === state.activeCategory;

      const matchesTag =
        state.activeTag === 'all' || (item.tags || []).some(tag => normaliseTag(tag) === state.activeTag);

      return matchesCategory && matchesTag;
    });
  }

  function compareDates(a, b) {
    const aDate = new Date(a || '1970-01-01').getTime();
    const bDate = new Date(b || '1970-01-01').getTime();
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
      img.src = imageUrl;
      img.alt = alt || '';
      img.loading = 'lazy';
      return img;
    }

    const placeholder = document.createElement('div');
    placeholder.className = className;
    placeholder.setAttribute('aria-label', alt || 'Badge');
    return placeholder;
  }

  function createCard(item) {
    const hasCertificate = Boolean(item.pdf);

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
    card.appendChild(category);
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

    meta.appendChild(catPill);
    meta.appendChild(datePill);

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

    if (hasCertificate) {
      const openBtn = document.createElement('button');
      openBtn.type = 'button';
      openBtn.className = 'btn btn-primary';
      openBtn.textContent = t('openPdf', 'Open PDF');
      openBtn.addEventListener('click', () => openModal(item, openBtn));

      const openNewTab = document.createElement('a');
      openNewTab.className = 'btn btn-ghost';
      openNewTab.textContent = t('openNewTab', 'Open in new tab');
      openNewTab.href = encodeURI(item.pdf);
      openNewTab.target = '_blank';
      openNewTab.rel = 'noopener noreferrer';

      actions.appendChild(openBtn);
      actions.appendChild(openNewTab);
    }

    content.appendChild(title);
    content.appendChild(meta);
    content.appendChild(desc);
    content.appendChild(tags);
    if (hasCertificate) content.appendChild(actions);

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
    const dateEl = document.getElementById('cert-modal-date');
    const descEl = document.getElementById('cert-modal-description');
    const tagsEl = document.getElementById('cert-modal-tags');
    const link = document.getElementById('cert-modal-link');

    if (!modal || !title || !categoryEl || !dateEl || !descEl || !tagsEl || !link) return;

    state.lastFocusedEl = triggerEl || document.activeElement;

    title.textContent = item.name;
    categoryEl.textContent = item.category || '';
    categoryEl.dataset.category = item.category || '';
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
