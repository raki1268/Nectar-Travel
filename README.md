# Nectar-Travel
nectar-travel/
├── .gitignore
├── package.json
├── tailwind.config.js
├── README.md
├── SETUP.md
├── IMAGE_CHECKLIST.md
├── QUICK_REFERENCE.md (本文件)
│
├── public/
│   ├── index.html (自动创建)
│   └── images/
│       ├── hero/
│       ├── tours/
│       ├── categories/
│       ├── cruise/
│       ├── ticket/
│       └── about/
│
└── src/
    ├── index.js
    ├── index.css
    ├── App.jsx
    │
    ├── styles/
    │   └── GlobalStyles.jsx
    │
    ├── config/
    │   ├── themes.js
    │   └── siteConfig.js
    │
    ├── data/
    │   ├── tours.json
    │   ├── categories.json
    │   └── content.json
    │
    └── components/
        ├── layout/
        │   ├── Header.jsx
        │   ├── Footer.jsx
        │   └── ThemeSwitcher.jsx
        │
        ├── common/
        │   ├── HoverImageCard.jsx
        │   ├── NavButton.jsx
        │   ├── SafetyModal.jsx
        │   └── MembershipModal.jsx
        │
        └── views/
            ├── HomeView.jsx
            ├── ListView.jsx
            ├── DetailView.jsx
            ├── AboutView.jsx
            ├── CategoryLandingView.jsx
            └── ProductGridView.jsx
