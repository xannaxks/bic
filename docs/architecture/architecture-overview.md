# Architecture Overview

## System Architecture Diagram
```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                             │
├─────────────────────────────────────────────────────────────────┤
│  Browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)      │
│  Mobile Browsers (iOS Safari 14+, Chrome Mobile 90+)           │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  │ HTTPS
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CDN/Edge Layer                             │
├─────────────────────────────────────────────────────────────────┤
│  Global CDN (Cloudflare/Vercel Edge Network)                   │
│  - Static Asset Caching                                        │
│  - Image Optimization                                          │
│  - Gzip/Brotli Compression                                     │
│  - Edge Functions (Optional)                                   │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Application Layer                            │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 15+ Application (Static Site Generation)              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                App Router Structure                     │   │
│  │  ├── app/                                              │   │
│  │  │   ├── layout.tsx (Root Layout)                      │   │
│  │  │   ├── page.tsx (Homepage)                           │   │
│  │  │   ├── [locale]/ (Internationalization)             │   │
│  │  │   ├── about/ (Static Pages)                         │   │
│  │  │   ├── admissions/                                   │   │
│  │  │   ├── academics/                                    │   │
│  │  │   ├── news/                                         │   │
│  │  │   └── search/ (Dynamic Search)                      │   │
│  │  └── components/ (Reusable Components)                 │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Content Layer                               │
├─────────────────────────────────────────────────────────────────┤
│  Headless CMS (Strapi/Contentful/Sanity)                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Content Models:                                        │   │
│  │  ├── Pages (Static Content)                            │   │
│  │  ├── News Articles                                     │   │
│  │  ├── Events                                            │   │
│  │  ├── Media Assets                                      │   │
│  │  ├── Navigation Menus                                  │   │
│  │  └── Translations (i18n Content)                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  External Services:                                             │
│  ├── YouTube API (Video Content)                               │
│  ├── Search Service (Algolia/Elasticsearch)                    │
│  └── Analytics (Google Analytics/Plausible)                    │
└─────────────────────────────────────────────────────────────────┘
```
