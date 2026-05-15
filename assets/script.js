/**
 * ML Portal — Mobile Legends Hero Database
 * Frontend-only app. Data loaded from /data/heroes.json.
 */

(() => {
  'use strict';

  const FAV_KEY = 'mlp.favorites.v1';

  const state = {
    heroes: [],
    filtered: [],
    role: 'all',
    search: '',
    sort: 'name',
    favorites: new Set(loadFavorites()),
    heroMeta: new Map(),
    emblemSummary: [],
    talentSummary: [],
  };

  // Cached DOM
  const $ = (id) => document.getElementById(id);
  const heroGrid = $('hero-grid');
  const favGrid = $('favorites-grid');
  const favEmpty = $('favorites-empty');
  const searchInput = $('hero-search');
  const searchClear = $('search-clear');
  const sortSelect = $('sort-select');
  const roleFilters = $('role-filters');
  const resultCount = $('result-count');
  const resetBtn = $('reset-filters');
  const navbar = $('navbar');
  const navLinks = $('nav-links');
  const mobileBtn = $('mobile-menu-btn');
  const modal = $('hero-modal');
  const modalBody = $('modal-body');
  const compareModal = $('compare-modal');
  const compareBody = $('compare-body');
  const toast = $('toast');
  const emblemGrid = $('emblem-grid');

  // Init
  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    $('footer-year').textContent = new Date().getFullYear();
    setupNav();
    setupModalClose();
    setupHomeStats();

    try {
      state.heroes = await loadHeroes();
      const notesText = await loadNotes();
      if (notesText) hydrateHeroNotes(notesText);

      onDataLoaded();
    } catch (err) {
      console.error('Heroes load failed:', err);
      heroGrid.innerHTML = `
        <div class="error-state">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p>Ma'lumotlarni yuklab bo'lmadi. Internet aloqasini tekshiring va qayta urinib ko'ring.</p>
          <button class="btn btn-secondary btn-sm" onclick="location.reload()">Qayta yuklash</button>
        </div>`;
    }
  }

  function onDataLoaded() {
    populateStats();
    populateCompareSelects();
    renderRoleStats();
    renderEmblems();
    applyFilters();
    setupControls();
    renderFavorites();
    setupSmoothScroll();
  }

  // ─── Navbar & UI ─────────────────────────────────────────────
  function setupNav() {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const open = navLinks.classList.contains('open');
      mobileBtn.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Active section tracking
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  function setupSmoothScroll() {
    const sections = ['home', 'heroes', 'favorites', 'guides', 'emblems', 'tools']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.id;
            document.querySelectorAll('.nav-link').forEach((a) =>
              a.classList.toggle('active', a.getAttribute('href') === '#' + id)
            );
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
  }

  function setupModalClose() {
    [modal, compareModal].forEach((m) => {
      if (!m) return;
      m.querySelector('.modal-close').addEventListener('click', () => closeModal(m));
      m.querySelector('.modal-overlay').addEventListener('click', () => closeModal(m));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(modal);
        closeModal(compareModal);
      }
    });
  }

  function openModal(m) {
    m.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(m) {
    if (!m) return;
    m.classList.remove('active');
    if (!modal.classList.contains('active') && !compareModal.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }

  // ─── Stats on home ───────────────────────────────────────────
  function setupHomeStats() {
    // Random-pick CTA on hero section
    const randomCta = $('random-pick-btn');
    if (randomCta) {
      randomCta.addEventListener('click', () => randomPick('all'));
    }
  }

  function populateStats() {
    $('stat-heroes').textContent = state.heroes.length;
    const totalSkills = state.heroes.reduce(
      (n, h) => n + (h.skill?.skill?.length || 0),
      0
    );
    const totalItems = state.heroes.reduce(
      (n, h) => n + (h.gear?.out_pack?.length || 0),
      0
    );
    $('stat-skills').textContent = totalSkills;
    $('stat-items').textContent = totalItems;
  }

  function renderRoleStats() {
    const counts = {};
    state.heroes.forEach((h) => {
      h.type.split('/').forEach((r) => {
        const role = r.trim();
        counts[role] = (counts[role] || 0) + 1;
      });
    });
    const max = Math.max(...Object.values(counts));
    const order = ['Tank', 'Fighter', 'Assassin', 'Mage', 'Marksman', 'Support'];
    const colors = {
      Tank: '#3b82f6', Fighter: '#ef4444', Assassin: '#a855f7',
      Mage: '#06b6d4', Marksman: '#f59e0b', Support: '#10b981',
    };
    const el = $('role-stats');
    if (!el) return;
    el.innerHTML = order.map((role) => {
      const n = counts[role] || 0;
      const pct = Math.round((n / max) * 100);
      return `
        <div class="role-stat-row">
          <span class="role-stat-label">${role}</span>
          <div class="role-stat-bar">
            <div class="role-stat-fill" style="width:${pct}%;background:${colors[role]}"></div>
          </div>
          <span class="role-stat-val">${n}</span>
        </div>`;
    }).join('');
  }

  // ─── Controls ────────────────────────────────────────────────
  function setupControls() {
    searchInput.addEventListener('input', (e) => {
      state.search = e.target.value.toLowerCase().trim();
      searchClear.hidden = !state.search;
      applyFilters();
    });

    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      state.search = '';
      searchClear.hidden = true;
      applyFilters();
      searchInput.focus();
    });

    roleFilters.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      roleFilters.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      state.role = chip.dataset.role;
      applyFilters();
    });

    sortSelect.addEventListener('change', (e) => {
      state.sort = e.target.value;
      applyFilters();
    });

    resetBtn.addEventListener('click', () => {
      state.search = '';
      state.role = 'all';
      state.sort = 'name';
      searchInput.value = '';
      sortSelect.value = 'name';
      searchClear.hidden = true;
      roleFilters.querySelectorAll('.chip').forEach((c, i) =>
        c.classList.toggle('active', i === 0)
      );
      applyFilters();
    });

    // Tools
    $('random-btn').addEventListener('click', () => {
      randomPick($('random-role').value);
    });
    $('compare-btn').addEventListener('click', () => {
      const a = state.heroes.find((h) => h.heroid === $('compare-a').value);
      const b = state.heroes.find((h) => h.heroid === $('compare-b').value);
      if (a && b) showCompare(a, b);
    });
  }

  function applyFilters() {
    let list = state.heroes.filter((h) => {
      const matchName = !state.search || h.name.toLowerCase().includes(state.search);
      const matchRole =
        state.role === 'all' ||
        h.type.split('/').map((r) => r.trim()).includes(state.role);
      return matchName && matchRole;
    });

    list = sortHeroes(list, state.sort);
    state.filtered = list;
    renderHeroes();
    updateResultInfo();
  }

  function sortHeroes(list, mode) {
    const num = (v) => parseInt(v, 10) || 0;
    const sorters = {
      'name': (a, b) => a.name.localeCompare(b.name),
      'name-desc': (a, b) => b.name.localeCompare(a.name),
      'diff-asc': (a, b) => num(a.diff) - num(b.diff),
      'diff-desc': (a, b) => num(b.diff) - num(a.diff),
      'attack': (a, b) => Math.max(num(b.phy), num(b.mag)) - Math.max(num(a.phy), num(a.mag)),
      'durability': (a, b) => num(b.alive) - num(a.alive),
    };
    return [...list].sort(sorters[mode] || sorters.name);
  }

  function updateResultInfo() {
    const n = state.filtered.length;
    const total = state.heroes.length;
    const hasFilter = state.search || state.role !== 'all';
    resultCount.textContent = hasFilter
      ? `${n} ta qahramon topildi (jami ${total} dan)`
      : `Jami ${total} ta qahramon`;
    resetBtn.hidden = !hasFilter;
  }

  // ─── Hero grid ───────────────────────────────────────────────
  function renderHeroes() {
    if (state.filtered.length === 0) {
      heroGrid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-magnifying-glass"></i>
          <p>Bunday qahramon topilmadi.</p>
        </div>`;
      return;
    }
    heroGrid.innerHTML = state.filtered.map(heroCardHtml).join('');
    attachCardHandlers(heroGrid);
  }

  function heroCardHtml(hero) {
    const isFav = state.favorites.has(hero.heroid);
    const img = imgUrl(hero.list_image);
    const diffLabel = difficultyLabel(hero.diff);
    return `
      <article class="hero-card" data-id="${hero.heroid}">
        <button class="fav-btn ${isFav ? 'active' : ''}" data-fav="${hero.heroid}"
          aria-label="Sevimlilarga qo'shish">
          <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
        <div class="hero-img-container">
          <img src="${img}" alt="${escapeHtml(hero.name)}" loading="lazy" decoding="async">
        </div>
        <div class="hero-card-info">
          <span class="hero-role-tag">${escapeHtml(hero.type)}</span>
          <h3 class="hero-name">${escapeHtml(hero.name)}</h3>
          <div class="hero-meta">
            <span class="diff-badge diff-${diffLabel.cls}">${diffLabel.text}</span>
          </div>
        </div>
      </article>`;
  }

  function attachCardHandlers(container) {
    container.querySelectorAll('.hero-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.fav-btn')) return;
        openHeroDetail(card.dataset.id);
      });
    });
    container.querySelectorAll('.fav-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(btn.dataset.fav);
      });
    });
  }

  // ─── Favorites ───────────────────────────────────────────────
  function loadFavorites() {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
    } catch {
      return [];
    }
  }
  function saveFavorites() {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify([...state.favorites]));
    } catch (e) { /* ignore */ }
  }

  function toggleFavorite(id) {
    const hero = state.heroes.find((h) => h.heroid === id);
    if (!hero) return;
    if (state.favorites.has(id)) {
      state.favorites.delete(id);
      showToast(`${hero.name} sevimlilardan olib tashlandi`);
    } else {
      state.favorites.add(id);
      showToast(`${hero.name} sevimlilarga qo'shildi`);
    }
    saveFavorites();
    // Sync all visible cards
    document.querySelectorAll(`[data-fav="${id}"]`).forEach((btn) => {
      const active = state.favorites.has(id);
      btn.classList.toggle('active', active);
      btn.querySelector('i').className = (active ? 'fa-solid' : 'fa-regular') + ' fa-heart';
    });
    renderFavorites();
  }

  function renderFavorites() {
    const list = state.heroes.filter((h) => state.favorites.has(h.heroid));
    if (list.length === 0) {
      favGrid.innerHTML = `
        <div class="empty-state">
          <i class="fa-regular fa-heart"></i>
          <p>Hali sevimli qahramon qo'shilmagan.</p>
        </div>`;
      return;
    }
    favGrid.innerHTML = list.map(heroCardHtml).join('');
    attachCardHandlers(favGrid);
  }

  // ─── Hero detail modal ───────────────────────────────────────
  function openHeroDetail(heroId) {
    const hero = state.heroes.find((h) => h.heroid === heroId);
    if (!hero) return;

    const img = imgUrl(hero.list_image);
    const diffLabel = difficultyLabel(hero.diff);
    const isFav = state.favorites.has(hero.heroid);
    const skills = hero.skill?.skill || [];
    const items = hero.gear?.out_pack || [];
    const buildTip = (hero.gear?.out_pack_tips || '').trim();
    const meta = state.heroMeta.get(normalizeName(hero.name)) || {};
    const emblem = (meta.emblem || '').trim();
    const extraTip = (meta.tip || '').trim();

    modalBody.innerHTML = `
      <div class="hero-detail-header">
        <img src="${img}" alt="${escapeHtml(hero.name)}">
        <div class="hero-header-info">
          <div class="hero-header-tags">
            <span class="hero-role-tag">${escapeHtml(hero.type)}</span>
            <span class="diff-badge diff-${diffLabel.cls}">${diffLabel.text}</span>
          </div>
          <h2 class="detail-title font-orbitron">${escapeHtml(hero.name)}</h2>
          <button class="btn btn-secondary btn-sm fav-toggle ${isFav ? 'active' : ''}" data-fav="${hero.heroid}">
            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            <span>${isFav ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo\'shish'}</span>
          </button>
        </div>
      </div>

      <div class="hero-detail-body">
        ${hero.des ? `
          <div class="detail-block">
            <h3 class="detail-section-title">Tavsif</h3>
            <p class="detail-text">${escapeHtml(hero.des)}</p>
          </div>` : ''}

        <div class="detail-block">
          <h3 class="detail-section-title">Statistikalar</h3>
          <div class="stats-list">
            ${statBar('Hujum (Phys)', hero.phy, '#ef4444')}
            ${statBar('Sehr (Magic)', hero.mag, '#a855f7')}
            ${statBar('Mustahkamlik', hero.alive, '#10b981')}
            ${statBar('Qiyinligi', hero.diff, '#f59e0b')}
          </div>
        </div>

        ${emblem ? `
        <div class="detail-block">
          <h3 class="detail-section-title">Tavsiya etilgan emblema</h3>
          <p class="detail-text">${escapeHtml(emblem)}</p>
        </div>` : ''}

        ${items.length ? `
        <div class="detail-block">
          <h3 class="detail-section-title">Tavsiya etilgan build</h3>
          ${buildTip ? `<p class="build-tip">${escapeHtml(buildTip)}</p>` : ''}
          <div class="build-grid">
            ${items.map((it, i) => `
              <div class="build-item" title="${escapeHtml(it.equip?.name || '')}">
                <div class="build-item-num">${i + 1}</div>
                <div class="build-item-img">
                  <img src="${it.equip?.icon || ''}" alt="${escapeHtml(it.equip?.name || '')}" loading="lazy">
                </div>
                <div class="build-item-name">${escapeHtml(it.equip?.name || '—')}</div>
              </div>
            `).join('')}
          </div>
        </div>` : ''}

        ${skills.length ? `
        <div class="detail-block">
          <h3 class="detail-section-title">Qobiliyatlar (Skills)</h3>
          <div class="skills-container">
            ${skills.map((s, i) => `
              <div class="skill-card">
                <div class="skill-img-wrapper">
                  <img src="${s.icon}" alt="${escapeHtml(s.name)}" loading="lazy">
                  <span class="skill-index">${skillIndex(i, skills.length)}</span>
                </div>
                <div class="skill-info">
                  <h4>${escapeHtml(s.name)}</h4>
                  <p>${sanitizeDes(s.des)}</p>
                  ${s.tips ? `<div class="skill-tip"><i class="fa-solid fa-lightbulb"></i> ${escapeHtml(s.tips)}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>` : ''}

        ${extraTip ? `
        <div class="detail-block">
          <h3 class="detail-section-title">Qo'shimcha maslahat</h3>
          <p class="detail-text rich-text">${sanitizeRichText(extraTip)}</p>
        </div>` : ''}
      </div>`;

    // Wire favorite toggle in modal
    const favToggle = modalBody.querySelector('.fav-toggle');
    if (favToggle) {
      favToggle.addEventListener('click', () => {
        toggleFavorite(hero.heroid);
        const nowFav = state.favorites.has(hero.heroid);
        favToggle.classList.toggle('active', nowFav);
        favToggle.querySelector('i').className =
          (nowFav ? 'fa-solid' : 'fa-regular') + ' fa-heart';
        favToggle.querySelector('span').textContent = nowFav
          ? "Sevimlilardan olib tashlash"
          : "Sevimlilarga qo'shish";
      });
    }

    openModal(modal);
    modal.querySelector('.modal-content').scrollTop = 0;
  }

  // ─── Random pick ─────────────────────────────────────────────
  function randomPick(role) {
    const pool = state.heroes.filter(
      (h) => role === 'all' || h.type.split('/').map((r) => r.trim()).includes(role)
    );
    if (pool.length === 0) return showToast('Bu rol uchun qahramon topilmadi');
    const pick = pool[Math.floor(Math.random() * pool.length)];
    openHeroDetail(pick.heroid);
  }

  // ─── Compare ─────────────────────────────────────────────────
  function populateCompareSelects() {
    const opts = state.heroes
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((h) => `<option value="${h.heroid}">${escapeHtml(h.name)} — ${escapeHtml(h.type)}</option>`)
      .join('');
    const a = $('compare-a');
    const b = $('compare-b');
    a.innerHTML = opts;
    b.innerHTML = opts;
    if (state.heroes[0]) a.value = state.heroes[0].heroid;
    if (state.heroes[1]) b.value = state.heroes[1].heroid;
  }

  function showCompare(a, b) {
    const row = (label, va, vb, color) => {
      const na = parseInt(va, 10) || 0;
      const nb = parseInt(vb, 10) || 0;
      const aWin = na > nb, bWin = nb > na;
      return `
        <tr>
          <td class="cmp-val ${aWin ? 'win' : ''}">${na}%
            <div class="cmp-bar"><div class="cmp-fill" style="width:${na}%;background:${color}"></div></div>
          </td>
          <td class="cmp-label">${label}</td>
          <td class="cmp-val ${bWin ? 'win' : ''}">${nb}%
            <div class="cmp-bar"><div class="cmp-fill" style="width:${nb}%;background:${color}"></div></div>
          </td>
        </tr>`;
    };

    compareBody.innerHTML = `
      <div class="cmp-head">
        <div class="cmp-hero">
          <img src="${imgUrl(a.list_image)}" alt="${escapeHtml(a.name)}">
          <h3>${escapeHtml(a.name)}</h3>
          <span class="hero-role-tag">${escapeHtml(a.type)}</span>
        </div>
        <div class="cmp-vs">VS</div>
        <div class="cmp-hero">
          <img src="${imgUrl(b.list_image)}" alt="${escapeHtml(b.name)}">
          <h3>${escapeHtml(b.name)}</h3>
          <span class="hero-role-tag">${escapeHtml(b.type)}</span>
        </div>
      </div>
      <table class="cmp-table">
        ${row('Hujum', a.phy, b.phy, '#ef4444')}
        ${row('Sehr', a.mag, b.mag, '#a855f7')}
        ${row('Mustahkamlik', a.alive, b.alive, '#10b981')}
        ${row('Qiyinligi', a.diff, b.diff, '#f59e0b')}
      </table>
      <div class="cmp-actions">
        <button class="btn btn-secondary btn-sm" data-open="${a.heroid}">${escapeHtml(a.name)} batafsil</button>
        <button class="btn btn-secondary btn-sm" data-open="${b.heroid}">${escapeHtml(b.name)} batafsil</button>
      </div>`;

    compareBody.querySelectorAll('[data-open]').forEach((btn) => {
      btn.addEventListener('click', () => {
        closeModal(compareModal);
        setTimeout(() => openHeroDetail(btn.dataset.open), 200);
      });
    });

    openModal(compareModal);
  }

  // ─── Helpers ─────────────────────────────────────────────────
  function imgUrl(u) {
    if (!u) return '';
    if (u.startsWith('//')) return 'https:' + u;
    return u;
  }

  function difficultyLabel(v) {
    const n = parseInt(v, 10) || 0;
    if (n <= 40) return { text: 'Oson', cls: 'easy' };
    if (n <= 70) return { text: "O'rtacha", cls: 'med' };
    return { text: 'Qiyin', cls: 'hard' };
  }

  function skillIndex(i, total) {
    if (i === 0) return 'Passive';
    if (i === total - 1) return 'Ultimate';
    return 'Skill ' + i;
  }

  function statBar(label, value, color) {
    const v = parseInt(value, 10) || 0;
    return `
      <div class="stat-item">
        <div class="stat-label">
          <span>${label}</span>
          <span>${v}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${v}%;background:${color}"></div>
        </div>
      </div>`;
  }

  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[c]);
  }

  // Only convert <font color='…'>…</font> spans and escape everything else.
  function sanitizeDes(raw) {
    if (!raw) return '';
    const escaped = escapeHtml(raw);
    return escaped.replace(
      /&lt;font color=&#39;(#[0-9a-fA-F]{3,6})&#39;&gt;([\s\S]*?)&lt;\/font&gt;/g,
      (_, color, inner) => `<span style="color:${color}">${inner}</span>`
    );
  }

  function sanitizeRichText(raw) {
    return sanitizeDes(raw)
      .replace(/&lt;br\s*\/?&gt;/gi, '<br>')
      .replace(/\n/g, '<br>');
  }

  function normalizeName(name) {
    return String(name || '').trim().toLowerCase();
  }

  async function loadHeroes() {
    if (location.protocol !== 'file:') {
      try {
        const res = await fetch('data/heroes.json');
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Fetch heroes failed, trying fallback:', err);
      }
    }

    if (Array.isArray(window.__ML_HEROES__)) {
      return window.__ML_HEROES__;
    }

    throw new Error('Heroes data unavailable');
  }

  async function loadNotes() {
    if (location.protocol !== 'file:') {
      try {
        const res = await fetch('heroes-list.md');
        if (res.ok) return await res.text();
      } catch (err) {
        console.warn('Fetch notes failed, trying fallback:', err);
      }
    }

    if (typeof window.__ML_HERO_NOTES__ === 'string') {
      return window.__ML_HERO_NOTES__;
    }

    return '';
  }

  function matchLine(text, regex) {
    const m = text.match(regex);
    return m ? m[1].trim() : '';
  }

  function hydrateHeroNotes(raw) {
    if (!raw) return;

    const sections = raw.split(/\n##\s+\d+\.\s+/).slice(1);
    sections.forEach((block) => {
      const lines = block.split('\n');
      const name = lines.shift()?.trim();
      if (!name) return;
      const text = lines.join('\n');
      state.heroMeta.set(normalizeName(name), {
        role: matchLine(text, /\*\*Rol:\*\*\s*(.+)/),
        emblem: matchLine(text, /\*\*Emblema:\*\*\s*(.+)/),
        tip: matchLine(text, /\*\*Maslahat:\*\*\s*([\s\S]*)/),
      });
    });

    const tableBlock = raw.match(/\| Emblem \|[\s\S]*?\n\n### Talent tavsiyalari/);
    if (tableBlock) {
      state.emblemSummary = tableBlock[0]
        .split('\n')
        .filter((line) => line.startsWith('| **'))
        .map((line) => {
          const parts = line.split('|').map((part) => part.trim()).filter(Boolean);
          return {
            name: parts[0]?.replace(/\*\*/g, '') || '',
            useFor: parts[1] || '',
            bonus: parts[2] || '',
          };
        });
    }

    const talentBlock = raw.match(/### Talent tavsiyalari[\s\S]*$/);
    if (talentBlock) {
      state.talentSummary = talentBlock[0]
        .split('\n')
        .filter((line) => line.startsWith('- **'))
        .map((line) => {
          const m = line.match(/- \*\*(.+?)\*\*\s*[—–-]\s*(.+)/);
          return m ? { role: m[1], text: m[2] } : null;
        })
        .filter(Boolean);
    }
  }

  function renderEmblems() {
    if (!emblemGrid) return;
    if (!state.emblemSummary.length) {
      emblemGrid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-shield-halved"></i>
          <p>Emblem ma'lumotlari topilmadi.</p>
        </div>`;
      return;
    }

    const colors = {
      Tank: '#3b82f6',
      Fighter: '#ef4444',
      Assassin: '#8b5cf6',
      Mage: '#06b6d4',
      Marksman: '#f59e0b',
      Support: '#10b981',
    };

    emblemGrid.innerHTML = state.emblemSummary.map((item) => {
      const talent = state.talentSummary.find((entry) => entry.role === item.name);
      return `
        <article class="emblem-card">
          <div class="emblem-icon" style="--c:${colors[item.name] || '#3b82f6'}">
            <i class="${emblemIcon(item.name)}"></i>
          </div>
          <h3>${escapeHtml(item.name)} Emblem</h3>
          <p class="emblem-use">${escapeHtml(item.useFor)}</p>
          <p class="emblem-bonus">${escapeHtml(item.bonus)}</p>
          ${talent ? `<div class="emblem-talent"><strong>Talent:</strong> ${escapeHtml(talent.text)}</div>` : ''}
        </article>`;
    }).join('');
  }

  function emblemIcon(name) {
    const icons = {
      Tank: 'fa-solid fa-shield',
      Fighter: 'fa-solid fa-fist-raised',
      Assassin: 'fa-solid fa-mask',
      Mage: 'fa-solid fa-hat-wizard',
      Marksman: 'fa-solid fa-crosshairs',
      Support: 'fa-solid fa-hand-holding-medical',
    };
    return icons[name] || 'fa-solid fa-star';
  }

  let toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }
})();
