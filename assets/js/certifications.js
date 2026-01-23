(function () {
  const certifications = [
    {
      id: 'word-associate',
      name: 'Word Associate',
      acquired: '2024-06-01',
      tags: ['Microsoft', 'Office', 'Word'],
      certificate: '../../context/docs/cerifications/word/Word Associate.pdf'
    },
    {
      id: 'word-m365-apps',
      name: 'Microsoft Word Microsoft 365 Apps',
      acquired: '2024-06-01',
      tags: ['Microsoft', 'Office', 'Word'],
      certificate: '../../context/docs/cerifications/word/Microsoft Word Microsoft 365 Apps.pdf'
    },
    {
      id: 'powerpoint-cert',
      name: 'PowerPoint Certification',
      acquired: '2024-06-01',
      tags: ['Microsoft', 'Office', 'PowerPoint'],
      certificate: '../../context/docs/cerifications/powerpoint/Cert90564745565.pdf'
    },
    {
      id: 'powerpoint-result',
      name: 'PowerPoint Result',
      acquired: '2024-06-01',
      tags: ['Microsoft', 'Office', 'PowerPoint'],
      certificate: '../../context/docs/cerifications/powerpoint/Result41564732340.pdf'
    },
    {
      id: 'formation-example',
      name: 'Formation: Cloud Basics',
      acquired: '2025-01-01',
      tags: ['Formation', 'Cloud'],
      certificate: null
    },
    {
      id: 'pluralsight-example',
      name: 'Pluralsight: Intro to Regex',
      acquired: '2024-12-01',
      tags: ['Pluralsight', 'Programming'],
      certificate: null
    }
  ];

  const state = {
    activeTag: 'all',
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

  function getVisibleItems() {
    if (state.activeTag === 'all') return certifications;
    return certifications.filter(item => (item.tags || []).some(tag => normaliseTag(tag) === state.activeTag));
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

  function renderFilters() {
    const container = document.getElementById('certifications-tag-filters');
    if (!container) return;

    container.innerHTML = '';

    container.appendChild(createTagButton('all', t('allTags', 'All tags'), state.activeTag === 'all'));

    getUniqueTags(certifications).forEach(tag => {
      container.appendChild(createTagButton(tag, tag, state.activeTag === tag));
    });
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

  function createCard(item) {
    const hasCertificate = Boolean(item.certificate);

    const card = document.createElement('div');
    card.className = `card cert-card${hasCertificate ? ' has-certificate' : ' no-certificate'}`;
    if (hasCertificate) {
      card.setAttribute('role', 'button');
      card.tabIndex = 0;
    }

    const iconWrap = document.createElement('div');
    iconWrap.className = 'card-icon';

    const icon = document.createElement('i');
    icon.className = `fas ${getItemIconClass(item)}`;
    icon.setAttribute('aria-hidden', 'true');
    iconWrap.appendChild(icon);

    const title = document.createElement('h3');
    title.textContent = item.name;

    const meta = document.createElement('p');
    meta.className = 'cert-meta';

    const metaLabel = document.createElement('span');
    metaLabel.className = 'cert-meta-label';
    metaLabel.textContent = t('acquiredLabel', 'Acquired');

    const metaSep = document.createTextNode(': ');

    const metaDate = document.createElement('span');
    metaDate.className = 'cert-date';
    metaDate.textContent = item.acquired;

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

    card.appendChild(iconWrap);
    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(badges);

    if (hasCertificate) {
      const open = () => openModal(item, card);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    }

    return card;
  }

  function renderGrid() {
    const grid = document.getElementById('certifications-grid');
    const empty = document.getElementById('certifications-empty');

    if (!grid) return;

    grid.innerHTML = '';

    const items = getVisibleItems();

    if (empty) {
      empty.hidden = items.length > 0;
    }

    items.forEach(item => {
      grid.appendChild(createCard(item));
    });
  }

  function render() {
    renderFilters();
    renderGrid();
  }

  function openModal(item, triggerEl) {
    if (!item.certificate) return;

    const modal = document.getElementById('cert-modal');
    const title = document.getElementById('cert-modal-title');
    const frame = document.getElementById('cert-modal-frame');
    const link = document.getElementById('cert-modal-link');

    if (!modal || !title || !frame || !link) return;

    const href = encodeURI(item.certificate);

    state.lastFocusedEl = triggerEl || document.activeElement;

    title.textContent = item.name;
    frame.src = href;
    frame.title = item.name;
    link.href = href;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.cert-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    const modal = document.getElementById('cert-modal');
    const frame = document.getElementById('cert-modal-frame');

    if (!modal || !frame) return;
    if (!modal.classList.contains('open')) return;

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    frame.src = 'about:blank';

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

  function init() {
    render();
    initModal();

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
