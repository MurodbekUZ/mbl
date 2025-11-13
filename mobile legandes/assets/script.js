/* global TailwindCSS */

// Qahramonlar, buildlar va skinlar uchun ma'lumotlar bazasi (demo ma'lumotlar)
const heroes = [
  {
    id: "fanny",
    name: "Fanny",
    role: "Assassin",
    class: "Assassin",
    image:
      "https://avatars.mds.yandex.net/i?id=28f219fdc50c054230fbfa57f33078fd_l-4937726-images-thumbs&n=13",
    hp: 65,
    atk: 95,
    def: 40,
    magic: 20,
    description:
      "Kabel bilan tezkor rotatsiya qiluvchi assassin. Aniqlik talab qiladigan yuqori skill darajali qahramon.",
    skills: [
      {
        icon: "⚡️",
        name: "Steel Cable",
        desc: "Ikki nuqta orasida uchish va raqiblarni kesib o‘tish uchun kabel ishlatadi.",
        cooldown: "8s",
      },
      {
        icon: "🗡",
        name: "Cut Throat",
        desc: "Burst zarba: HP past bo‘lgan raqiblar uchun qo‘shimcha zarar.",
        cooldown: "12s",
      },
      {
        icon: "🌀",
        name: "Tornado Strike",
        desc: "Area of effect zarba, kabel bilan kombinatsiyada maksimal zarar beradi.",
        cooldown: "7s",
      },
    ],
    builds: [
      {
        type: "Attack",
        items: [
          "Blade of Despair",
          "Endless Battle",
          "Hunter Strike",
          "Malefic Roar",
          "Sea Halberd",
          "Windtalker",
        ],
      },
      {
        type: "Hybrid",
        items: [
          "Bloodlust Axe",
          "War Axe",
          "Endless Battle",
          "Oracle",
          "Malefic Roar",
          "Immortality",
        ],
      },
    ],
    emblems: "Assassin Emblem (High and Dry), Battle Spell: Retribution / Execute",
    combos:
      "Steel Cable x2 → Tornado Strike → Steel Cable → Cut Throat. Ganki oldidan stack to‘plang.",
    skins: [
      {
        name: "Royal Student",
        tier: "Elite",
        release: "2020-04-12",
        image:
          "https://images.pexels.com/photos/7915493/pexels-photo-7915493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        video:
          "https://assets.mixkit.co/videos/preview/mixkit-abstract-neon-lights-on-a-dark-background-916-large.mp4",
      },
    ],
  },
  {
    id: "gusion",
    name: "Gusion",
    role: "Mage/Assassin",
    class: "Mage",
    image:
      "https://i.ytimg.com/vi/jO3rspDJiMc/oar2.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLAj8eZnEg5rY_7RxJPgGaPpXOSsYg",
    hp: 55,
    atk: 85,
    def: 45,
    magic: 95,
    description:
      "Yuqori tezkor combo mage. Kunai to‘plami bilan sekunda ichida raqibni yo‘q qiladi.",
    skills: [
      {
        icon: "✨",
        name: "Sword Spike",
        desc: "Kunai bilan raqibni markalaydi va qaytib kelganda zarar ko‘payadi.",
        cooldown: "9s",
      },
      {
        icon: "🎯",
        name: "Shadowblade Slaughter",
        desc: "5 ta kunai otadi, qaytganda yana zarar yetkazadi.",
        cooldown: "8s",
      },
      {
        icon: "💠",
        name: "Incandescence",
        desc: "Skillar qayta yuklanadi, combo imkoniyatini beradi.",
        cooldown: "32s",
      },
    ],
    builds: [
      {
        type: "Magic",
        items: [
          "Calamity Reaper",
          "Magic Shoes",
          "Lightning Truncheon",
          "Divine Glaive",
          "Holy Crystal",
          "Blood Wings",
        ],
      },
      {
        type: "Attack",
        items: [
          "Feather of Heaven",
          "Clock of Destiny",
          "Lightning Truncheon",
          "Concentrated Energy",
          "Genius Wand",
          "Immortality",
        ],
      },
    ],
    emblems: "Mage Emblem (Mystery Shop), Battle Spell: Execute / Flicker",
    combos:
      "Sword Spike → Shadowblade Slaughter → Incandescence → Shadowblade Slaughter → Sword Spike.",
    skins: [
      {
        name: "Moonlight Sonata",
        tier: "Epic",
        release: "2021-09-20",
        image:
          "https://images.pexels.com/photos/7130566/pexels-photo-7130566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        video:
          "https://assets.mixkit.co/videos/preview/mixkit-fantasy-transparent-portal-27036-large.mp4",
      },
    ],
  },
  {
    id: "selena",
    name: "Selena",
    role: "Assassin/Mage",
    class: "Mage",
    image:
      "https://avatars.mds.yandex.net/i?id=9bc9788dbcfd9fd4f558b2a26e52738f_l-12528090-images-thumbs&n=13",
    hp: 60,
    atk: 88,
    def: 45,
    magic: 92,
    description:
      "Abyssal order malikasi. Traplar va burst combo bilan raqiblarni kuzatib, bir zumda yo‘q qiladi.",
    skills: [
      {
        icon: "🐍",
        name: "Abyssal Trap",
        desc: "Trap joylaydi, faollashganda vision beradi va raqibni sekinlashtirib zararlaydi.",
        cooldown: "12s",
      },
      {
        icon: "🎯",
        name: "Abyssal Arrow",
        desc: "Uzun masofali strel: trapga tegsa masofa va stun davomiyligi ortadi.",
        cooldown: "13s",
      },
      {
        icon: "👁️",
        name: "Abyssal Form",
        desc: "Selena demon shakliga o‘tib, skilllari yangilanadi va burst zarar oshadi.",
        cooldown: "6s",
      },
      {
        icon: "💥",
        name: "Soul Eater",
        desc: "Demon shaklidagi qisqa muddatli buff: keyingi zarba massiv burst va lifesteal beradi.",
        cooldown: "8s",
      },
    ],
    builds: [
      {
        type: "Magic",
        items: [
          "Clock of Destiny",
          "Lightning Truncheon",
          "Holy Crystal",
          "Divine Glaive",
          "Glowing Wand",
          "Winter Truncheon",
        ],
      },
      {
        type: "Hybrid",
        items: [
          "Feather of Heaven",
          "Calamity Reaper",
          "Concentrated Energy",
          "Genius Wand",
          "Immortality",
          "Blood Wings",
        ],
      },
    ],
    emblems: "Mage Emblem (Mystery Shop), Battle Spell: Flicker",
    combos:
      "Abyssal Trap → Abyssal Arrow → Abyssal Form → Soul Eater + Garotte kombo.",
    skins: [
      {
        name: "Starfall Knight",
        tier: "Epic",
        release: "2021-03-28",
        image:
          "https://avatars.mds.yandex.net/i?id=9bc9788dbcfd9fd4f558b2a26e52738f_l-12528090-images-thumbs&n=13",
      },
    ],
  },
  {
    id: "tigreal",
    name: "Tigreal",
    role: "Tank",
    class: "Tank",
    image:
      "https://avatars.mds.yandex.net/i?id=c6336cb53139fd1e57e6a2cc9f0886c7_l-5488376-images-thumbs&n=13",
    hp: 95,
    atk: 40,
    def: 90,
    magic: 30,
    description:
      "Jamoa janglari uchun mukammal tank. Crowd control va frontline nazoratida yetakchi.",
    skills: [
      {
        icon: "🛡",
        name: "Fearless",
        desc: "Passive: Har to‘rtinchi zarba ekstra knockback beradi.",
        cooldown: "-",
      },
      {
        icon: "🌀",
        name: "Sacred Hammer",
        desc: "Ikki bosqichli knockback, raqiblarni xavfli hududga joylashtirish uchun.",
        cooldown: "14s",
      },
      {
        icon: "🌩",
        name: "Implosion",
        desc: "Raqiblarni markazga tortadi va stun beradi.",
        cooldown: "45s",
      },
    ],
    builds: [
      {
        type: "Defense",
        items: [
          "Dominance Ice",
          "Antique Cuirass",
          "Guardian Helmet",
          "Immortality",
          "Athena's Shield",
          "Brute Force Breastplate",
        ],
      },
      {
        type: "Hybrid",
        items: [
          "Courage Mask",
          "Dominance Ice",
          "Oracle",
          "Fleeting Time",
          "Immortality",
          "Thunder Belt",
        ],
      },
    ],
    emblems: "Tank Emblem (Concussive Blast), Battle Spell: Flicker",
    combos: "Flicker → Implosion → Sacred Hammer → Team follow-up.",
    skins: [
      {
        name: "Lightborn Defender",
        tier: "Legend",
        release: "2022-07-01",
        image:
          "https://images.pexels.com/photos/9671537/pexels-photo-9671537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        video:
          "https://assets.mixkit.co/videos/preview/mixkit-neon-equalizer-3568-large.mp4",
      },
    ],
  },
  {
    id: "layla",
    name: "Layla",
    role: "Marksman",
    class: "Marksman",
    image:
      "https://vkplay.ru/hotbox/content_files/UgcStories/2025/07/09/ea860e64990b44b6b26bc998890ae36e.png",
    hp: 60,
    atk: 92,
    def: 35,
    magic: 20,
    description:
      "Uzoq masofali marksman. O‘yin so‘ngida juda kuchli, ammo boshida himoya talab etadi.",
    skills: [
      {
        icon: "🔭",
        name: "Malefic Bomb",
        desc: "Uzoq masofadan zarar yetkazadi, turretga ham kuchaytirilgan zarba.",
        cooldown: "5s",
      },
      {
        icon: "🧲",
        name: "Void Projectile",
        desc: "AoE zarba va slow effekti, crowd control bilan sinergiya qiladi.",
        cooldown: "7s",
      },
      {
        icon: "💥",
        name: "Destruction Rush",
        desc: "Ultras uzun masofali zarba, teamfight yakunlash uchun ideal.",
        cooldown: "34s",
      },
    ],
    builds: [
      {
        type: "Attack",
        items: [
          "Demon Hunter Sword",
          "Golden Staff",
          "Wind of Nature",
          "Malefic Roar",
          "Berserker's Fury",
          "Blade of Despair",
        ],
      },
      {
        type: "Jungle",
        items: [
          "Swift Boots",
          "Windtalker",
          "Corrosion Scythe",
          "Demon Hunter Sword",
          "Golden Staff",
          "Immortality",
        ],
      },
    ],
    emblems: "Marksman Emblem (Weakness Finder), Battle Spell: Flicker / Inspire",
    combos: "Positioning → Void Projectile → Basic attacks → Destruction Rush finisher.",
    skins: [
      {
        name: "Bunny Babe",
        tier: "Elite",
        release: "2020-12-18",
        image:
          "https://images.pexels.com/photos/9702058/pexels-photo-9702058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        video:
          "https://assets.mixkit.co/videos/preview/mixkit-abstract-blue-neon-lines-10-large.mp4",
      },
    ],
  },
  {
    id: "lucas",
    name: "Lucas",
    role: "Fighter/Mage",
    class: "Fighter",
    image:
      "https://static.gosugamers.net/63/bd/0b/7c5728aecda0d9998e67d108afb536d9d24eda710286f7c6f9a70aeb11.jpg",
    hp: 82,
    atk: 78,
    def: 68,
    magic: 74,
    description:
      "Hyper-tech jangchi. Energiya maydonlarini boshqarib, qisqa muddatda burst va crowd-control kombinatsiyalari hosil qiladi.",
    skills: [
      {
        icon: "🛰",
        name: "Photon Dash",
        desc: "Lucas lazerli qanotlarini faollashtirib, oldinga zarba bilan irg‘ib boradi va izidan energiya izi qoldiradi.",
        cooldown: "10s",
      },
      {
        icon: "🛡️",
        name: "Quantum Guard",
        desc: "360° energiya qalqoni hosil qiladi, zararning bir qismini so‘rib oladi va qaytarilgan zararni AOE tarzida tarqatadi.",
        cooldown: "14s",
      },
      {
        icon: "🌌",
        name: "Void Collapse",
        desc: "Ulti: Markazga tortuvchi giper-bo‘shliq ochadi, keyin portlash bilan raqiblarni stun va slow qiladi.",
        cooldown: "42s",
      },
    ],
    builds: [
      {
        type: "Hybrid",
        items: [
          "War Axe",
          "Bloodlust Axe",
          "Dominance Ice",
          "Hunter Strike",
          "Oracle",
          "Immortality",
        ],
      },
      {
        type: "Magic",
        items: [
          "Clock of Destiny",
          "Lightning Truncheon",
          "Calamity Reaper",
          "Genius Wand",
          "Divine Glaive",
          "Immortality",
        ],
      },
    ],
    emblems:
      "Fighter Emblem (Festival of Blood) yoki Mage Emblem (Mystery Shop); Battle Spell: Flicker / Petrify",
    combos:
      "Photon Dash bilan engage → Quantum Guard faollashtirib zararni yutish → Void Collapse bilan jamoaviy stun → Hunter Strike va War Axe stacklari bilan to‘liq burst.",
    skins: [
      {
        name: "Celestial Vanguard",
        tier: "Epic",
        release: "2024-11-11",
        image:
          "https://static.gosugamers.net/63/bd/0b/7c5728aecda0d9998e67d108afb536d9d24eda710286f7c6f9a70aeb11.jpg",
        video:
          "https://wallpapers.com/images/hd/mobile-legends-logo-over-earth-8ir7z2e4a2enyfzl.jpg",
      },
    ],
  },
  {
    id: "beatrix",
    name: "Beatrix",
    role: "Marksman",
    class: "Marksman",
    image: "https://i.ytimg.com/vi/R2aNT8LtDWE/maxresdefault.jpg",
    hp: 68,
    atk: 96,
    def: 48,
    magic: 35,
    description:
      "Qurol ustasi marksman: Beatrix jang maydonida turli qurollarni almashtirib, har xil vaziyatlar uchun mos zarba beradi.",
    skills: [
      {
        icon: "🔫",
        name: "Masterful Guns",
        desc: "Passive: Har bir qurol o‘ziga xos basic attack va skill effektini beradi, almashtirilganda qo‘shimcha zarar paydo bo‘ladi.",
        cooldown: "-",
      },
      {
        icon: "⚙️",
        name: "Renner / Bennett",
        desc: "Snayper yoki mortar rejimiga o‘tib, uzoq masofadan katta burst yoki AOE bombardimon amalga oshiradi.",
        cooldown: "10s",
      },
      {
        icon: "🧨",
        name: "Nibiru / Wesker",
        desc: "Yaqin masofada shrapnel yoki shotgun bilan yuqori DPS beradi, minion va junglerlarni tez tozalaydi.",
        cooldown: "7s",
      },
      {
        icon: "🎯",
        name: "Master Fate",
        desc: "Ulti: Tanlangan qurolga qarab yakuniy super zarba beradi — snayper o‘qi, mortar yomg‘iri yoki ko‘p barrel burst.",
        cooldown: "45s",
      },
    ],
    builds: [
      {
        type: "Attack",
        items: [
          "Blade of Despair",
          "Malefic Roar",
          "Demon Hunter Sword",
          "Scarlet Phantom",
          "Windtalker",
          "Immortality",
        ],
      },
      {
        type: "Hybrid",
        items: [
          "War Axe",
          "Haas's Claws",
          "Golden Staff",
          "Wind of Nature",
          "Sea Halberd",
          "Immortality",
        ],
      },
    ],
    emblems:
      "Marksman Emblem (Weakness Finder), Battle Spell: Flicker / Inspire",
    combos:
      "Renner bilan uzoqdan poke → qurolni Weskerga almashtirib burst → Nibiru bilan DPS → Master Fate orqali yakuniy zarba.",
    skins: [
      {
        name: "Dawn Mercenary",
        tier: "Elite",
        release: "2022-04-15",
        image: "https://i.ytimg.com/vi/R2aNT8LtDWE/maxresdefault.jpg",
      },
    ],
  },
  {
    id: "angela",
    name: "Angela",
    role: "Support",
    class: "Support",
    image:
      "https://wallpapers.com/images/hd/angela-mobile-legends-loading-screen-j5rx3v0oapqzueaz.jpg",
    hp: 75,
    atk: 35,
    def: 55,
    magic: 80,
    description:
      "Qo‘llab-quvvatlovchi support. Jamoaga shield va healing beradi, global ulti bilan hammani qutqaradi.",
    skills: [
      {
        icon: "💚",
        name: "Love Waves",
        desc: "Shifo va zarar kombinatsiyasi, stack yig‘ganda effekt kuchayadi.",
        cooldown: "6s",
      },
      {
        icon: "🧶",
        name: "Puppet-on-a-String",
        desc: "Targetni bog‘laydi va movement speed pasaytiradi.",
        cooldown: "12s",
      },
      {
        icon: "🫶",
        name: "Heartguard",
        desc: "Global ulti, hamkor qahramonni yurakli shield bilan himoya qiladi.",
        cooldown: "60s",
      },
    ],
    builds: [
      {
        type: "Support",
        items: [
          "Demon Shoes",
          "Enchanted Talisman",
          "Dominion Ice",
          "Oracle",
          "Immortality",
          "Fleeting Time",
        ],
      },
      {
        type: "Hybrid",
        items: [
          "Demon Shoes",
          "Clock of Destiny",
          "Glowing Wand",
          "Ice Queen Wand",
          "Immortality",
          "Dominion Ice",
        ],
      },
    ],
    emblems: "Support Emblem (Aiding Hand), Battle Spell: Flameshot / Flicker",
    combos: "Love Waves stack → Puppet-on-a-String → Heartguard bilan jamoani qo‘llab-quvvatlash.",
    skins: [
      {
        name: "Floral Elf",
        tier: "Elite",
        release: "2019-08-05",
        image:
          "https://images.pexels.com/photos/7134988/pexels-photo-7134988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        video:
          "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-made-of-data-5139-large.mp4",
      },
    ],
  },
  {
    id: "aamon",
    name: "Aamon",
    role: "Assassin",
    class: "Assassin",
    image: "https://static.zerochan.net/Aamon.full.3491191.jpg",
    hp: 58,
    atk: 94,
    def: 42,
    magic: 88,
    description:
      "Coalescence imperatori: soyada yashirinib, shardlardan foydalangan holda raqiblarni bir zumda yo‘q qiladi.",
    skills: [
      {
        icon: "🗡️",
        name: "Soul Shards",
        desc: "Passive: Dagger sochilganda shardlar qo‘shiladi, to‘planib teleport zarbasini kuchaytiradi.",
        cooldown: "-",
      },
      {
        icon: "💠",
        name: "Slayer Shards",
        desc: "Oldinga uchta shard otadi, raqibga tegsa ko‘rinmaslikni qayta faollashtiradi va bonus zarar beradi.",
        cooldown: "7s",
      },
      {
        icon: "🌫️",
        name: "Invisible Armor",
        desc: "Qisqa muddatli yopinish, harakat tezligini oshiradi va keyingi hujumni qo‘shimcha burstga aylantiradi.",
        cooldown: "12s",
      },
      {
        icon: "🌌",
        name: "Endless Shards",
        desc: "Ulti: Shardlarni to‘liq quvvatlar, hududga ko‘plab pichoq yog‘diradi va markazdagi raqibga massiv zarar beradi.",
        cooldown: "48s",
      },
    ],
    builds: [
      {
        type: "Attack",
        items: [
          "Genius Wand",
          "Clock of Destiny",
          "Lightning Truncheon",
          "Holy Crystal",
          "Divine Glaive",
          "Blood Wings",
        ],
      },
      {
        type: "Hybrid",
        items: [
          "Calamity Reaper",
          "Feather of Heaven",
          "Concentrated Energy",
          "Glowing Wand",
          "Immortality",
          "Winter Truncheon",
        ],
      },
    ],
    emblems: "Assassin Emblem (High and Dry); Battle Spell: Execute / Flicker",
    combos:
      "Invisible Armor → Slayer Shards → Endless Shards → Soul Shards bilan qayta joylashish va yakuniy zarba.",
    skins: [
      {
        name: "Coalescence Sovereign",
        tier: "Legendary",
        release: "2023-06-30",
        image: "https://static.zerochan.net/Aamon.full.3491191.jpg",
      },
      {
        name: "Night Sword",
        tier: "Epic",
        release: "2022-10-12",
        image:
          "https://i.ytimg.com/vi/32TOe6rZi-Y/maxresdefault.jpg",
      },
    ],
  },
  {
    id: "yin",
    name: "Yin",
    role: "Fighter/Assassin",
    class: "Fighter",
    image: "https://i.pinimg.com/originals/eb/79/11/eb791190b4456e5d24bca31a878b391e.jpg",
    hp: 76,
    atk: 88,
    def: 62,
    magic: 48,
    description:
      "Shafqatsiz jangchi, soxta jang san'atlari ustasi. Dushmanlarni alohida arenaga tortib, yakka jangda mag‘lub etishda maxsus.",
    skills: [
      {
        icon: "🥋",
        name: "Leave It to Me",
        desc: "Passive: Yin combo qo‘llaganda ATK va harakat tezligi qisqa muddatga oshadi.",
        cooldown: "-",
      },
      {
        icon: "👣",
        name: "Charged Punch",
        desc: "Oldinga tezkor zarba, raqibga tegsa jang rejimini boshlab, yana bir zarba berish imkonini yaratadi.",
        cooldown: "7s",
      },
      {
        icon: "🔥",
        name: "Instant Blast",
        desc: "Bir necha tez turtki va yakuniy eksploziv zarba. Raqibni orqaga suradi va true damage beradi.",
        cooldown: "11s",
      },
      {
        icon: "🌀",
        name: "My Turn",
        desc: "Ulti: Yin raqibni yakka duel arenaga tortadi, ko‘rsatkichlari kuchayadi va raqibni yakunlash uchun katta burst beradi.",
        cooldown: "48s",
      },
    ],
    builds: [
      {
        type: "Attack",
        items: [
          "War Axe",
          "Bloodlust Axe",
          "Hunter Strike",
          "Blade of Despair",
          "Malefic Roar",
          "Immortality",
        ],
      },
      {
        type: "Defense",
        items: [
          "Cursed Helmet",
          "Dominance Ice",
          "Antique Cuirass",
          "Athena's Shield",
          "Immortality",
          "Brute Force Breastplate",
        ],
      },
    ],
    emblems: "Fighter Emblem (Festival of Blood), Battle Spell: Flicker / Vengeance",
    combos:
      "Charged Punch → Instant Blast → My Turn (duel arenasi) → Charged Punch qaytadan → Basic + Burst bilan yakunlash.",
    skins: [
      {
        name: "Jujutsu Master",
        tier: "Epic",
        release: "2023-09-12",
        image: "https://i.pinimg.com/originals/eb/79/11/eb791190b4456e5d24bca31a878b391e.jpg",
      },
    ],
  },
];

const buildTypes = ["Attack", "Defense", "Magic", "Hybrid", "Jungle", "Support"];

const communityBuilds = [
  {
    player: "eSportsAli",
    hero: "Fanny",
    details: "Malefic Roar + Hunter Strike kombinatsiyasi bilan 78% win-rate.",
    votes: 128,
  },
  {
    player: "MythicSara",
    hero: "Angela",
    details: "Fleeting Time bilan ulti cooldown qisqaradi, Heartguard uchun ideal.",
    votes: 94,
  },
];

const topHeroes = [
  { name: "Lancelot", winRate: "56%" },
  { name: "Fanny", winRate: "54%" },
  { name: "Harith", winRate: "53%" },
  { name: "Gusion", winRate: "52%" },
  { name: "Balmond", winRate: "51%" },
  { name: "Layla", winRate: "49%" },
  { name: "Xavier", winRate: "49%" },
  { name: "Tigreal", winRate: "48%" },
  { name: "Kaja", winRate: "47%" },
  { name: "Angela", winRate: "47%" },
];

const heroCarouselData = [
  {
    heroId: "fanny",
    highlight: "Kabel kombinatsiyalari bilan yuqori mobil burst.",
    winRate: "54%",
  },
  {
    heroId: "gusion",
    highlight: "Kunai combo mage, qattiq burst va resetlar.",
    winRate: "52%",
  },
  {
    heroId: "beatrix",
    highlight: "Qurol almashtirish orqali har bir vaziyatga tayyor.",
    winRate: "55%",
  },
];

const heroClasses = ["Fighter", "Mage", "Assassin", "Tank", "Support", "Marksman"];

/**
 * Navbar va scroll interaktivligi
 */
const navLinks = document.querySelectorAll(".nav-link");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    const expanded = mobileMenuToggle.getAttribute("aria-expanded") === "true";
    mobileMenuToggle.setAttribute("aria-expanded", (!expanded).toString());
    mobileMenu.classList.toggle("open");

    if (mobileMenu.classList.contains("open")) {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
    } else {
      mobileMenu.style.maxHeight = "0px";
    }
  });
}

document.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  if (window.scrollY > 64) {
    navbar.classList.add("shadow-[0_10px_40px_rgba(37,99,235,0.25)]");
    navbar.classList.add("border-indigo-500/60");
  } else {
    navbar.classList.remove("shadow-[0_10px_40px_rgba(37,99,235,0.25)]");
    navbar.classList.remove("border-indigo-500/60");
  }
});

/**
 * Qahramon karuseli
 */
const carouselContainer = document.getElementById("hero-carousel");
let currentCarouselIndex = 0;

const renderCarousel = () => {
  if (!carouselContainer) return;

  const carouselEntry = heroCarouselData[currentCarouselIndex];
  const hero =
    heroes.find((candidate) => candidate.id === carouselEntry.heroId) || {};
  const imageSource =
    hero.image ||
    `https://source.unsplash.com/random/640x360?${encodeURIComponent(
      hero.name || "mobile legends"
    )}`;
  const roleLabel = hero.role || "Mobile Legends Hero";
  const displayName = hero.name || "MLBB Hero";
  carouselContainer.innerHTML = `
    <article class="carousel-slide">
      <div class="relative rounded-2xl overflow-hidden border border-blue-500/40">
        <img src="${imageSource}" alt="${displayName}" class="h-56 w-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent"></div>
        <div class="absolute bottom-4 left-4 flex flex-col gap-2">
          <span class="badge">${roleLabel}</span>
          <h4 class="text-2xl font-semibold">${displayName}</h4>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <p class="text-slate-300">${carouselEntry.highlight}</p>
        <p class="text-sm text-blue-300">Win-rate: ${carouselEntry.winRate}</p>
      </div>
    </article>
  `;
};

const handleCarouselNavigation = (direction) => {
  if (direction === "next") {
    currentCarouselIndex =
      (currentCarouselIndex + 1) % heroCarouselData.length;
  } else {
    currentCarouselIndex =
      (currentCarouselIndex - 1 + heroCarouselData.length) %
      heroCarouselData.length;
  }
  renderCarousel();
};

if (carouselContainer) {
  renderCarousel();
  const carouselButtons = document.querySelectorAll(".carousel-btn");
  carouselButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      handleCarouselNavigation(btn.dataset.direction);
    });
  });
  setInterval(() => handleCarouselNavigation("next"), 6500);
}

/**
 * Qahramonlar bo‘limi
 */
const heroGrid = document.getElementById("hero-grid");
const heroFilters = document.getElementById("hero-filters");

const renderHeroFilters = () => {
  if (!heroFilters) return;
  const buttons = ["Barchasi", ...heroClasses]
    .map(
      (cls, idx) => `
      <button
        class="secondary-btn text-xs tracking-[0.18em] ${idx === 0 ? "filter-active" : ""}"
        data-filter="${cls}"
      >
        ${cls}
      </button>
    `
    )
    .join("");
  heroFilters.innerHTML = buttons;
};

const createStatBar = (label, value) => `
  <div>
    <div class="flex items-center justify-between text-xs text-slate-300 mb-1">
      <span>${label}</span>
      <span>${value}%</span>
    </div>
    <div class="stat-bar"><span style="width: ${value}%"></span></div>
  </div>
`;

const renderHeroCard = (hero) => `
  <article class="hero-card glow-border" data-class="${hero.class}">
    <div class="hero-card-header">
      <img src="${
        hero.image ||
        `https://source.unsplash.com/random/300x300?${encodeURIComponent(
          hero.name
        )},game`
      }" alt="${hero.name}" loading="lazy" />
      <div>
        <p class="text-sm text-blue-300 uppercase tracking-[0.3em]">${hero.role}</p>
        <h3 class="text-2xl font-semibold">${hero.name}</h3>
        <p class="text-sm text-slate-300 mt-2">${hero.description}</p>
      </div>
    </div>
    <div class="hero-card-body">
      <div class="hero-stats">
        ${createStatBar("HP", hero.hp)}
        ${createStatBar("ATK", hero.atk)}
        ${createStatBar("DEF", hero.def)}
        ${createStatBar("MAGIC", hero.magic)}
      </div>
      <div class="skill-grid">
        ${hero.skills
          .map(
            (skill) => `
          <div class="skill">
            <div class="skill-icon">${skill.icon}</div>
            <h4>${skill.name} · ${skill.cooldown}</h4>
            <p>${skill.desc}</p>
          </div>
        `
          )
          .join("")}
      </div>
      <div class="card-footer">
        <span class="tag">Emblem & Spell</span>
        <p>${hero.emblems}</p>
      </div>
      <div class="card-footer">
        <span class="tag">Kombolar</span>
        <p>${hero.combos}</p>
      </div>
      <div class="card-footer">
        <span class="tag">Skin preview</span>
        <div class="flex gap-3">
          ${hero.skins
            .map(
              (skin) => {
                const link = skin.video || skin.image;
                if (link) {
                  return `<a class="text-blue-300 hover:text-blue-200 underline text-xs" href="${link}" target="_blank" rel="noreferrer">${skin.name}</a>`;
                }
                return `<span class="text-blue-300 text-xs">${skin.name}</span>`;
              }
            )
            .join("")}
        </div>
      </div>
    </div>
  </article>
`;

const renderHeroes = (filter = "Barchasi") => {
  if (!heroGrid) return;
  const filtered =
    filter === "Barchasi"
      ? heroes
      : heroes.filter((hero) => hero.class === filter);
  heroGrid.innerHTML = filtered.map((hero) => renderHeroCard(hero)).join("");
};

if (heroGrid && heroFilters) {
  renderHeroFilters();
  renderHeroes();

  heroFilters.addEventListener("click", (event) => {
    const target = event.target.closest("button[data-filter]");
    if (!target) return;

    heroFilters
      .querySelectorAll("button[data-filter]")
      .forEach((btn) => btn.classList.remove("filter-active"));
    target.classList.add("filter-active");
    renderHeroes(target.dataset.filter);
  });
}

/**
 * Buldlar bo‘limi
 */
const buildHeroSelect = document.getElementById("build-hero-select");
const buildTypeFilters = document.getElementById("build-type-filters");
const buildList = document.getElementById("build-list");

const renderBuildSelect = () => {
  if (!buildHeroSelect) return;
  const options = heroes
    .map((hero) => `<option value="${hero.id}">${hero.name}</option>`)
    .join("");
  buildHeroSelect.innerHTML = options;
};

const renderBuildTypeFilters = () => {
  if (!buildTypeFilters) return;
  buildTypeFilters.innerHTML = buildTypes
    .map(
      (type) => `
      <button class="secondary-btn text-xs tracking-[0.18em]" data-build="${type}">
        ${type}
      </button>
    `
    )
    .join("");
};

const placeholderItemImage =
  "https://images.pexels.com/photos/8045708/pexels-photo-8045708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const renderBuildCard = (heroName, build) => `
  <article class="build-card glow-border" data-type="${build.type}">
    <header class="flex items-center justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.3em] text-blue-400/80">${build.type} build</p>
        <h3 class="text-xl font-semibold">${heroName}</h3>
      </div>
      <span class="badge">Meta</span>
    </header>
    <div class="item-grid">
      ${build.items
        .map(
          (item) => `
        <div class="item">
          <img src="${placeholderItemImage}&t=${encodeURIComponent(item)}" alt="${item}" loading="lazy" />
          <div class="item-tooltip">
            <strong>${item}</strong>
            <p>Damage va utility balansini oshiradi. Stack bilan qo‘shimcha effektlar beradi.</p>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
    <footer class="text-sm text-slate-300">
      <p>Qahramonning agressiv potensialini maksimal oshiradi. Junglera yoki gold lane uchun moslashuvchan kombinatsiya.</p>
    </footer>
  </article>
`;

const updateBuilds = (heroId, typeFilter) => {
  if (!buildList) return;
  const hero = heroes.find((h) => h.id === heroId) || heroes[0];
  const builds = hero.builds.filter((build) =>
    typeFilter ? build.type === typeFilter : true
  );
  buildList.innerHTML = builds
    .map((build) => renderBuildCard(hero.name, build))
    .join("");
};

if (buildHeroSelect && buildTypeFilters && buildList) {
  renderBuildSelect();
  renderBuildTypeFilters();
  updateBuilds(buildHeroSelect.value);

  buildHeroSelect.addEventListener("change", (event) => {
    updateBuilds(event.target.value);
  });

  buildTypeFilters.addEventListener("click", (event) => {
    const target = event.target.closest("button[data-build]");
    if (!target) return;

    const currentHero = buildHeroSelect.value;
    buildTypeFilters
      .querySelectorAll("button[data-build]")
      .forEach((btn) => btn.classList.remove("filter-active"));
    target.classList.add("filter-active");
    const type = target.dataset.build;
    updateBuilds(currentHero, type);
  });
}

/**
 * Skinlar bo‘limi
 */
const skinGallery = document.getElementById("skin-gallery");

const renderSkinCard = (heroName, skin) => `
  <article class="skin-card glow-border">
    <img src="${skin.image}" alt="${skin.name}" loading="lazy" />
    <video muted loop class="skin-preview">
      <source src="${skin.video}" type="video/mp4" />
    </video>
    <div class="skin-overlay">
      <h3 class="text-lg font-semibold">${skin.name}</h3>
      <p class="text-sm text-blue-300">${heroName}</p>
      <div class="skin-meta">
        <span>${skin.tier}</span>
        <span>${skin.release}</span>
      </div>
    </div>
  </article>
`;

const renderSkins = () => {
  if (!skinGallery) return;
  const skins = heroes
    .flatMap((hero) =>
      hero.skins.map((skin) => ({ heroName: hero.name, ...skin }))
    )
    .slice(0, 9);
  skinGallery.innerHTML = skins
    .map((skin) => renderSkinCard(skin.heroName, skin))
    .join("");

  skinGallery.querySelectorAll(".skin-card").forEach((card) => {
    const video = card.querySelector("video");
    if (!video) return;
    card.addEventListener("mouseenter", () => {
      video.currentTime = 0;
      video.play().catch(() => {
        /* Autoplay bloklangan bo‘lsa ham xatolik chiqarmaymiz */
      });
    });
    card.addEventListener("mouseleave", () => {
      video.pause();
    });
  });
};

renderSkins();

/**
 * Jamoa bo‘limi
 */
const communityBuildsContainer = document.getElementById("community-builds");

const renderCommunityBuilds = () => {
  if (!communityBuildsContainer) return;
  communityBuildsContainer.innerHTML = communityBuilds
    .map(
      (entry) => `
    <div class="p-4 border border-blue-500/30 rounded-xl bg-slate-900/60 flex flex-col gap-2">
      <div class="flex items-center justify-between text-sm text-blue-200">
        <span>${entry.player}</span>
        <span class="vote-count">Ovoz: ${entry.votes}</span>
      </div>
      <p class="text-sm text-slate-200">${entry.hero}</p>
      <p class="text-xs text-slate-300">${entry.details}</p>
    </div>
  `
    )
    .join("");
};

renderCommunityBuilds();

const buildForm = document.getElementById("build-form");
const playerHeroSelect = document.getElementById("player-hero");

const renderPlayerHeroSelect = () => {
  if (!playerHeroSelect) return;
  playerHeroSelect.innerHTML = heroes
    .map((hero) => `<option value="${hero.name}">${hero.name}</option>`)
    .join("");
};

renderPlayerHeroSelect();

if (buildForm) {
  buildForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const player = document.getElementById("player-name").value.trim();
    const hero = document.getElementById("player-hero").value;
    const details = document.getElementById("build-details").value.trim();

    if (!player || !details) {
      alert("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    communityBuilds.unshift({
      player,
      hero,
      details,
      votes: Math.floor(Math.random() * 50) + 10,
    });
    renderCommunityBuilds();
    buildForm.reset();
  });
}

/**
 * Top 10 qahramon ro‘yxati
 */
const topHeroesList = document.getElementById("top-heroes");
if (topHeroesList) {
  topHeroesList.innerHTML = topHeroes
    .map(
      (hero) => `
      <li>
        <span>${hero.name}</span>
        <span class="vote-count">${hero.winRate}</span>
      </li>
    `
    )
    .join("");
}

/**
 * Scroll animatsiyalari
 */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll(".observe").forEach((section) => observer.observe(section));

/**
 * Navbar active holatini yangilash
 */
const sections = document.querySelectorAll("section[id]");

const updateActiveNav = () => {
  let activeId = null;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 180) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  });
};

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

/**
 * Mobile menyu linklari bosilganda menyuni yopish
 */
mobileMenu?.addEventListener("click", (event) => {
  const target = event.target.closest(".mobile-link");
  if (!target) return;

  mobileMenu.classList.remove("open");
  mobileMenu.style.maxHeight = "0px";
  mobileMenuToggle?.setAttribute("aria-expanded", "false");
});

/**
 * Helper: filtr indicatori
 */
document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (target.matches(".filter-active")) {
    // filter tugmasi allaqachon aktiv bo‘lsa, o‘zgarish kiritmaymiz
    return;
  }
});

