/**
 * Mobile Legends Professional Portal JS
 * Handles dynamic data loading, search, filtering, and modals.
 */

let allHeroes = [];
let filteredHeroes = [];
let currentRole = 'all';

// DOM Elements
const heroGrid = document.getElementById('hero-grid');
const searchInput = document.getElementById('hero-search');
const roleChips = document.querySelectorAll('.chip');
const navbar = document.getElementById('navbar');
const modal = document.getElementById('hero-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

// Initial Load
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('data/heroes.json');
    allHeroes = await response.json();
    filteredHeroes = allHeroes;
    renderHeroes();
    initControls();
  } catch (error) {
    console.error('Failed to load heroes:', error);
    heroGrid.innerHTML = '<div class="col-span-full text-center py-10 text-rose-500">Ma\'lumotlarni yuklashda xatolik yuz berdi.</div>';
  }
});

// Scroll Effect for Navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Render Hero Grid
function renderHeroes() {
  if (filteredHeroes.length === 0) {
    heroGrid.innerHTML = '<div class="col-span-full text-center py-20 text-slate-500">Qahramon topilmadi.</div>';
    return;
  }

  heroGrid.innerHTML = filteredHeroes.map(hero => `
        <div class="hero-card animate-fadeInUp" onclick="openHeroDetail('${hero.heroid}')">
            <div class="hero-img-container">
                <img src="${hero.list_image.startsWith('//') ? 'https:' + hero.list_image : hero.list_image}" alt="${hero.name}" loading="lazy">
            </div>
            <div class="hero-card-info">
                <h3 class="hero-name">${hero.name}</h3>
                <span class="hero-role">${hero.type}</span>
            </div>
        </div>
    `).join('');
}

// Initial Controls
function initControls() {
  // Search
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    filterHeroes(term, currentRole);
  });

  // Role Filtering
  roleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      roleChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentRole = chip.dataset.role;
      filterHeroes(searchInput.value.toLowerCase(), currentRole);
    });
  });

  // Modal Close
  modalClose.addEventListener('click', closeHeroModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-overlay')) {
      closeHeroModal();
    }
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeHeroModal();
  });
}

// Filter Logic
function filterHeroes(term, role) {
  filteredHeroes = allHeroes.filter(hero => {
    const matchesTerm = hero.name.toLowerCase().includes(term);
    const matchesRole = role === 'all' || hero.type.split('/').includes(role);
    return matchesTerm && matchesRole;
  });
  renderHeroes();
}

// Open Hero Detail Modal
window.openHeroDetail = function (heroId) {
  const hero = allHeroes.find(h => h.heroid === heroId);
  if (!hero) return;

  modalBody.innerHTML = `
        <div class="hero-detail-header">
            <img src="${hero.list_image.startsWith('//') ? 'https:' + hero.list_image : hero.list_image}" alt="${hero.name}">
            <div class="hero-header-info">
                <span class="hero-role">${hero.type}</span>
                <h2 class="detail-title">${hero.name}</h2>
            </div>
        </div>
        <div class="hero-detail-body">
            <div class="stats-grid">
                <div class="stats-card">
                    <h3 class="detail-section-title">Statistikalar</h3>
                    <div class="space-y-6">
                        ${renderStat('Hujum', hero.phy)}
                        ${renderStat('Sehr', hero.mag)}
                        ${renderStat('Himoya', hero.alive)}
                        ${renderStat('Qiyinchilik', hero.diff)}
                    </div>
                </div>
                <div>
                    <h3 class="detail-section-title">Tavsif</h3>
                    <p class="text-slate-400 leading-relaxed text-lg">${hero.des || 'Ushbu qahramon uchun tavsif mavjud emas.'}</p>
                </div>
            </div>

            <div>
                <h3 class="detail-section-title">Qobiliyatlar (Skills)</h3>
                <div class="skills-container">
                    ${hero.skill.skill.map(s => `
                        <div class="skill-card">
                            <div class="skill-img-wrapper">
                                <img src="${s.icon}" alt="${s.name}">
                            </div>
                            <div class="skill-info">
                                <h4>${s.name}</h4>
                                <p>${s.des.replace(/<font color='(.*?)'>(.*?)<\/font>/g, '<span style="color:$1">$2</span>')}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function renderStat(label, value) {
  return `
        <div class="stat-item">
            <div class="stat-label">
                <span>${label}</span>
                <span>${value}%</span>
            </div>
            <div class="progress-track">
                <div class="progress-fill" style="width: ${value}%"></div>
            </div>
        </div>
    `;
}

function closeHeroModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}
