Siz frontend engineer sifatida `c:\Users\User\Documents\GitHub\mbl` loyihasini yakunlaysiz.

Loyiha: Mobile Legends qahramonlar bazasi. Frontend-only static site bo'ladi va Vercel free tier'da ishlashi kerak.

Kontekst

- `index.html` to'liq qayta yozilgan va yangi section/modallar bilan tayyor.
- `assets/script.js` to'liq qayta yozilgan va ishlash logikasi ulangan.
- Asosiy qolgan ish: `assets/styles.css` ni yangi HTML/JS ga mos qilib to'liq yakunlash.
- Qo'shimcha deploy/static fayllar ham kerak: `vercel.json`, `manifest.json`, `robots.txt`.

Muhim cheklovlar

- `data/heroes.json` o'zgarmaydi.
- `fetch_heroes.js` o'zgarmaydi.
- `server.js` o'zgarmaydi.
- `package.json` ga build script qo'shish shart emas.
- Bu pure static frontend bo'ladi.
- UI matnlari o'zbek tilida qoladi.
- Dizayn dark theme bo'ladi.

Data manbai

- `data/heroes.json`
- Taxminan 124 hero mavjud.
- Har bir hero obyektida quyidagilar bor:
  - `name`
  - `type`
  - `phy`
  - `mag`
  - `alive`
  - `diff`
  - `des`
  - `skill.skill[]`
  - `gear.out_pack[]`

Bajarilgan ishlar

- `index.html` yangi struktura bilan tayyor:
  - navbar
  - home
  - heroes
  - favorites
  - guides
  - tools
  - 2 ta modal
  - toast
  - footer
- `assets/script.js` da quyidagilar ulangan:
  - localStorage favorites
  - search
  - sort
  - role filter
  - random hero pick
  - compare modal
  - hero detail modal
  - role stats
  - real build rendering
  - mobile menu
  - toast

Vazifa

1. `index.html` va `assets/script.js` ni chuqur o'qing.
2. HTML va JS ishlatayotgan barcha class/id/holatlarni aniqlang.
3. `assets/styles.css` ni to'liq qayta yozing yoki shunday darajada yangilangki, yangi UI to'liq ishlasin.
4. `vercel.json`, `manifest.json`, `robots.txt` yarating.
5. Yakunda loyiha Vercel static deploy uchun tayyor bo'lsin.

Dizayn yo'nalishi

- Asosiy fon: `#020617`
- Accent: blue/purple
- Glassmorphism kartalar
- Orbitron + Inter shriftlar
- Premium gaming UI hissi
- Professional, toza, zamonaviy ko'rinish
- Hover va entrance animatsiyalar silliq bo'lsin
- 60fps ga yaqin transition/animation ishlating
- Keraksiz og'ir effektlar qo'shmang

Saqlanishi kerak bo'lgan vizual yo'nalish

- CSS variables saqlansin yoki yaxshilansin
- `--primary: #3b82f6`
- dark theme
- shaffof blur kartalar
- gradient text
- yengil glow'lar

Responsive talablar

- Desktop
- Tablet
- Mobile
- Asosiy breakpoint'lar:
  - `768px`
  - `480px`
- Mobile menu:
  - `.nav-links.open` holatida ko'rinsin
  - boshqa paytda mobile'da yashirin bo'lsin
  - dropdown/fixed panel ko'rinishida bo'lsin

Aniq styling talablari

- Hero card image balandligi: `280px` dan `320px` gacha
- Card image ustida pastga qarab gradient overlay bo'lsin
- Card info pastga absolute joylashsin
- Modal:
  - `max-width: 1100px`
  - scrollable
  - radius katta: `2rem` yoki `3rem`
- Compare modal biroz ixchamroq bo'lsin
- Toast bottom-center chiqsin va slide/fade animatsiyaga ega bo'lsin
- Buttonlar aniq states ga ega bo'lsin:
  - default
  - hover
  - active
  - focus-visible
- Input/select'larda accessible focus ring bo'lsin

HTML/JS ishlatayotgan selectorlar

Layout/Nav:

- `#navbar`
- `#navbar.scrolled`
- `.nav-inner`
- `.nav-brand`
- `.nav-logo`
- `.nav-links`
- `.nav-links.open`
- `.nav-link`
- `.nav-link.active`
- `.mobile-btn`

Home:

- `.home-section`
- `.hero-glow`
- `.home-grid`
- `.home-text`
- `.hero-title`
- `.grad-blue`
- `.home-lead`
- `.home-cta`
- `.stat-row`
- `.stat-block`
- `.stat-num`
- `.stat-label-sm`
- `.home-art`
- `.art-glow`
- `.art-ring`
- `.ring-1`
- `.ring-2`
- `.ring-3`
- `.art-core`

Common sections:

- `.section`
- `.section-alt`
- `.section-header`
- `.section-subtitle`
- `.section-title`
- `.section-description`
- `.btn`
- `.btn-primary`
- `.btn-secondary`
- `.btn-sm`
- `.font-orbitron`
- `.sr-only`

Heroes controls:

- `.controls-container`
- `.search-wrapper`
- `.search-icon`
- `.search-input`
- `.search-clear`
- `.controls-row`
- `.filter-chips`
- `.chip`
- `.chip.active`
- `.sort-wrapper`
- `.sort-select`
- `.result-info`
- `.link-btn`

Hero grid/cards:

- `.hero-grid`
- `.hero-card`
- `.hero-img-container`
- `.hero-card-info`
- `.hero-name`
- `.hero-role-tag`
- `.hero-meta`
- `.diff-badge`
- `.diff-easy`
- `.diff-med`
- `.diff-hard`
- `.fav-btn`
- `.fav-btn.active`
- `.loading-state`
- `.spinner`
- `.empty-state`
- `.error-state`

Hero detail modal:

- `.modal`
- `.modal.active`
- `.modal-overlay`
- `.modal-content`
- `.modal-content-sm`
- `.modal-close`
- `.hero-detail-header`
- `.hero-header-info`
- `.hero-header-tags`
- `.detail-title`
- `.hero-detail-body`
- `.detail-block`
- `.detail-section-title`
- `.detail-text`
- `.stats-list`
- `.stat-item`
- `.stat-label`
- `.progress-track`
- `.progress-fill`
- `.build-tip`
- `.build-grid`
- `.build-item`
- `.build-item-num`
- `.build-item-img`
- `.build-item-name`
- `.skills-container`
- `.skill-card`
- `.skill-img-wrapper`
- `.skill-index`
- `.skill-info h4`
- `.skill-info p`
- `.skill-tip`
- `.fav-toggle`
- `.fav-toggle.active`

Guides:

- `.guide-grid`
- `.guide-card`
- `.guide-icon`
- `.guide-role`
- `.guide-list`

Tools:

- `.tools-grid`
- `.tool-card`
- `.tool-icon`
- `.tool-actions`
- `.role-stats`
- `.role-stat-row`
- `.role-stat-label`
- `.role-stat-bar`
- `.role-stat-fill`
- `.role-stat-val`

Compare modal:

- `.cmp-head`
- `.cmp-hero`
- `.cmp-vs`
- `.cmp-table`
- `.cmp-val`
- `.cmp-val.win`
- `.cmp-label`
- `.cmp-bar`
- `.cmp-fill`
- `.cmp-actions`

Toast/Footer:

- `.toast`
- `.toast.show`
- `.site-footer`
- `.footer-inner`
- `.footer-brand`
- `.footer-text`
- `.footer-meta`

CSS uchun funksional expectation

- `hero-grid` auto-fill responsive grid bo'lsin
- Card hover'da ozgina ko'tarilsin va scale/glow bersin
- Navbar scroll bo'lganda background va blur kuchaysin
- Modal ochilganda overlay fade bo'lsin
- Compare table chiroyli va o'qilishi oson bo'lsin
- Skill card va build item'lar bir xil tizimda ko'rinsin
- Empty/error/loading state'lar alohida dizayn bilan chiqsin

Qo'shimcha fayllar

`vercel.json` quyidagiga mos bo'lsin:

```json
{
  "headers": [
    {
      "source": "/data/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=86400"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "cleanUrls": true
}
```

`manifest.json` talablari:

- `name`: `ML Portal`
- `short_name`: `MLP`
- `theme_color`: `#020617`
- `background_color`: `#020617`
- `display`: `standalone`
- `start_url`: `/`
- 192 va 512 o'lchamli icon yozilsin
- SVG yoki data URI ishlatish mumkin
- sodda, ishlaydigan PWA manifest bo'lsin

`robots.txt`:

```txt
User-agent: *
Allow: /
```

Verifikatsiya

- `index.html` va `assets/script.js` dagi barcha class'lar CSS bilan qamrab olinganini tekshiring
- Broken selector qolmasin
- Layout mobile'da buzilmasin
- Modal ichidagi kontent overflow qilsa ham chiroyli scroll bo'lsin
- Static deploy'da ishlashiga zid bo'lgan backend dependency qo'shmang

Yakuniy natija

Quyidagi fayllar tayyor bo'lishi kerak:

- `assets/styles.css`
- `vercel.json`
- `manifest.json`
- `robots.txt`

Yakuniy javob formati

- Avval qisqa nima qilganingizni ayting
- Keyin qaysi fayllarni o'zgartirganingizni sanang
- So'ng muhim dizayn/texnik qarorlarni 3-6 bandda qisqacha yozing
- Agar biror joyda taxmin ishlatilgan bo'lsa, aniq ko'rsating

Muhim eslatma

Bu prompt bilan ishlayotgan AI kod yozishi kerak, faqat tavsiya bermasligi kerak. Natijada deployga tayyor frontend fayllar chiqishi kerak.
