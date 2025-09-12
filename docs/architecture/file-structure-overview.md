# File Structure Overview

```
tongmyong-university-website/
├── .github/
│   └── workflows/
│       ├── deploy.yml
│       ├── test.yml
│       └── lighthouse.yml
│
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── admissions/
│   │   ├── academics/
│   │   ├── programs/
│   │   ├── student-life/
│   │   ├── research/
│   │   ├── news/
│   │   └── search/
│   ├── api/
│   │   ├── search/
│   │   └── revalidate/
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
│
├── components/
│   ├── ui/ (Shadcn/ui components)
│   ├── layout/
│   ├── sections/
│   ├── features/
│   └── common/
│
├── lib/
│   ├── cms/
│   ├── i18n/
│   ├── utils/
│   ├── validation/
│   └── constants/
│
├── hooks/
│   ├── useReducedMotion.ts
│   ├── useIntersectionObserver.ts
│   └── useLocalStorage.ts
│
├── types/
│   ├── cms.ts
│   ├── navigation.ts
│   └── common.ts
│
├── messages/ (i18n translations)
│   ├── en.json
│   ├── ko.json
│   └── zh.json
│
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── __tests__/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── e2e/
│
├── docs/
│   ├── README.md
│   ├── CONTRIBUTING.md
│   ├── DEPLOYMENT.md
│   └── ACCESSIBILITY.md
│
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── middleware.ts
└── playwright.config.ts
```
