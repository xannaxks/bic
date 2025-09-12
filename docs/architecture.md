# Tongmyong University Website Redesign - Technical Architecture Document

## Executive Summary

This document outlines the comprehensive technical architecture for the Tongmyong University website redesign project. The architecture is designed to deliver a modern, high-performance, accessible, and scalable web platform using Next.js 15+ with App Router, optimized for Core Web Vitals, WCAG 2.1 AA compliance, and international accessibility.

**Key Architectural Decisions:**
- **Framework**: Next.js 15+ with App Router for SSG/SSR capabilities
- **Styling**: Tailwind CSS + Shadcn/ui for consistent design system
- **Performance**: Static site generation with edge optimization
- **Accessibility**: WCAG 2.1 AA compliance with comprehensive testing
- **Internationalization**: Built-in i18n support for English, Korean, and Chinese
- **Deployment**: Edge-optimized hosting with global CDN distribution

## Architecture Overview

### System Architecture Diagram
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

## Technology Stack

### Core Framework & Runtime
```yaml
Frontend Framework: Next.js 15+
- App Router for file-based routing
- Server Components for performance
- Static Site Generation (SSG) for main content
- Server Side Rendering (SSR) for dynamic content
- Streaming and Suspense for improved UX

React Version: React 18+
- Concurrent Features
- Automatic Batching
- Streaming SSR
- React Server Components

Node.js Runtime: Node.js 18+ LTS
- ES2022 Support
- Native ESM Support
- Improved Performance
```

### Styling & Design System
```yaml
CSS Framework: Tailwind CSS 3.4+
- Utility-first approach
- Custom design tokens
- Dark mode support
- Container queries
- Arbitrary value support

Component Library: Shadcn/ui
- Radix UI primitives
- Accessibility built-in
- Customizable with Tailwind
- TypeScript support

Icon System: Lucide React
- Tree-shakeable icons
- Consistent design language
- Scalable vector icons
- TypeScript definitions

Font System: Inter + System Fallbacks
- Variable font support
- Font display: swap
- Preload critical fonts
- WOFF2 format optimization
```

### Development & Build Tools
```yaml
Language: TypeScript 5+
- Strict type checking
- Path mapping
- Incremental compilation
- ESNext features

Build Tool: Next.js built-in (Turbopack)
- Fast refresh
- Optimized bundling
- Tree shaking
- Code splitting

Package Manager: pnpm
- Faster installations
- Efficient disk usage
- Strict node_modules
- Workspace support

Linting & Formatting:
- ESLint with Next.js config
- Prettier for code formatting
- Husky for git hooks
- lint-staged for pre-commit
```

### Performance & Optimization
```yaml
Image Optimization: Next.js Image Component
- WebP/AVIF format conversion
- Responsive image sizing
- Lazy loading
- Priority loading for LCP

Code Splitting:
- Route-based splitting
- Component-based splitting
- Dynamic imports
- Bundle analysis

Caching Strategy:
- Static assets: 1 year cache
- HTML pages: CDN cache with revalidation
- API responses: ISR (Incremental Static Regeneration)
- Browser cache: Service worker precaching
```

### Accessibility & Compliance
```yaml
Standards: WCAG 2.1 AA
- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation
- Screen reader support
- Color contrast compliance

Testing Tools:
- @axe-core/react for automated testing
- eslint-plugin-jsx-a11y for development
- Manual testing with screen readers
- Lighthouse accessibility audits

Implementation:
- Focus management
- Skip navigation links
- Reduced motion support
- High contrast mode support
```

### Internationalization (i18n)
```yaml
Framework: next-intl
- Locale-based routing
- Message interpolation
- Pluralization support
- Date/number formatting

Supported Locales:
- en (English) - Default
- ko (Korean)
- zh (Chinese)

Content Strategy:
- Static translations in locale files
- Dynamic content from CMS
- URL structure: /[locale]/path
- Language detection and fallbacks
```

## Component Architecture

### Component Hierarchy
```
app/
├── layout.tsx (Root Layout)
├── page.tsx (Homepage)
├── globals.css (Global Styles)
├── [locale]/
│   ├── layout.tsx (Locale Layout)
│   └── page.tsx (Localized Homepage)
│
components/
├── ui/ (Shadcn/ui Base Components)
│   ├── button.tsx
│   ├── card.tsx
│   ├── navigation-menu.tsx
│   ├── sheet.tsx (Mobile Menu)
│   └── ...
│
├── layout/
│   ├── header/
│   │   ├── UtilityNavigation.tsx
│   │   ├── MainNavigation.tsx
│   │   ├── MegaMenu.tsx
│   │   └── MobileMenu.tsx
│   └── footer/
│       ├── Footer.tsx
│       └── FooterSection.tsx
│
├── sections/
│   ├── HeroCarousel/
│   │   ├── HeroCarousel.tsx
│   │   ├── HeroSlide.tsx
│   │   ├── CarouselControls.tsx
│   │   └── CarouselIndicators.tsx
│   ├── QuickActions/
│   │   ├── QuickActionsGrid.tsx
│   │   └── ActionButton.tsx
│   ├── TrustSignals/
│   │   ├── TrustSignals.tsx
│   │   ├── StatisticCard.tsx
│   │   └── AnimatedBar.tsx
│   └── NewsMedia/
│       ├── NewsGrid.tsx
│       ├── NewsCard.tsx
│       ├── VideoCard.tsx
│       └── MediaMixer.tsx
│
├── features/
│   ├── search/
│   │   ├── SearchBar.tsx
│   │   ├── SearchResults.tsx
│   │   └── SearchModal.tsx
│   ├── theme/
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   └── language/
│       ├── LanguageProvider.tsx
│       └── LanguageSwitcher.tsx
│
└── common/
    ├── ScrollToTop.tsx
    ├── LoadingSpinner.tsx
    ├── ErrorBoundary.tsx
    └── Image.tsx (Optimized Image Wrapper)
```

### Component Design Patterns

#### 1. Server Components (Default)
```typescript
// app/page.tsx - Homepage Server Component
import { HeroCarousel } from '@/components/sections/HeroCarousel'
import { QuickActionsGrid } from '@/components/sections/QuickActions'
import { TrustSignals } from '@/components/sections/TrustSignals'
import { NewsGrid } from '@/components/sections/NewsMedia'

export default async function HomePage() {
  const heroSlides = await getHeroSlides()
  const newsArticles = await getNewsArticles()
  
  return (
    <main>
      <HeroCarousel slides={heroSlides} />
      <QuickActionsGrid />
      <TrustSignals />
      <NewsGrid articles={newsArticles} />
    </main>
  )
}
```

#### 2. Client Components (Interactive)
```typescript
'use client'
// components/sections/HeroCarousel/HeroCarousel.tsx
import { useState, useEffect } from 'react'
import { HeroSlide } from './HeroSlide'
import { CarouselControls } from './CarouselControls'

interface HeroCarouselProps {
  slides: HeroSlide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 7000)

    return () => clearInterval(timer)
  }, [isAutoPlaying, slides.length])

  return (
    <section 
      className="relative h-[60vh] lg:h-[80vh] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {slides.map((slide, index) => (
        <HeroSlide
          key={slide.id}
          slide={slide}
          isActive={index === currentSlide}
          index={index}
        />
      ))}
      <CarouselControls
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onSlideChange={setCurrentSlide}
      />
    </section>
  )
}
```

#### 3. Compound Components Pattern
```typescript
// components/sections/TrustSignals/TrustSignals.tsx
import { StatisticCard } from './StatisticCard'

const statistics = [
  { label: 'Students', value: 15000, suffix: '+', percentage: 85 },
  { label: 'Ranking in Busan', value: 1, prefix: '#', percentage: 100 },
  { label: 'Countries', value: 45, suffix: '+', percentage: 75 },
  { label: 'Employment Rate', value: 95, suffix: '%', percentage: 95 },
]

export function TrustSignals() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <StatisticCard
              key={stat.label}
              {...stat}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

## Performance Architecture

### Core Web Vitals Optimization Strategy

#### Largest Contentful Paint (LCP) < 2.5s
```typescript
// Image optimization strategy
// components/common/OptimizedImage.tsx
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className 
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
      className={cn("object-cover", className)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}

// Font optimization in app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="preload"
          href="/fonts/inter-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

#### First Input Delay (FID) < 100ms
```typescript
// Code splitting and lazy loading strategy
import { lazy, Suspense } from 'react'

// Lazy load non-critical components
const MegaMenu = lazy(() => import('./MegaMenu'))
const SearchModal = lazy(() => import('../search/SearchModal'))

export function MainNavigation() {
  return (
    <nav>
      <div className="navigation-items">
        {/* Critical navigation items render immediately */}
      </div>
      
      <Suspense fallback={<div className="skeleton-loader" />}>
        <MegaMenu />
      </Suspense>
      
      <Suspense fallback={null}>
        <SearchModal />
      </Suspense>
    </nav>
  )
}

// Optimized event handlers
import { useCallback } from 'react'
import { debounce } from 'lodash-es'

export function SearchBar() {
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      // Perform search
    }, 300),
    []
  )

  return (
    <input
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="Search..."
    />
  )
}
```

#### Cumulative Layout Shift (CLS) < 0.1
```css
/* Prevent layout shift with skeleton loaders */
.skeleton-card {
  @apply bg-muted animate-pulse rounded-lg;
  aspect-ratio: 4/3;
  height: 240px;
}

.hero-carousel {
  /* Fixed aspect ratio prevents layout shift */
  aspect-ratio: 16/9;
  min-height: 60vh;
}

/* Reserve space for images */
.news-card-image {
  aspect-ratio: 5/3;
  @apply bg-muted;
}
```

### Bundle Optimization Strategy
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
  
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ],
      },
    ]
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    
    return config
  },
}

module.exports = nextConfig
```

## Accessibility Architecture

### WCAG 2.1 AA Implementation Strategy

#### Semantic HTML Structure
```typescript
// components/sections/NewsGrid/NewsGrid.tsx
export function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  return (
    <section aria-labelledby="news-section-title">
      <div className="container mx-auto px-4">
        <h2 id="news-section-title" className="text-3xl font-bold mb-8">
          Latest News & Updates
        </h2>
        
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="region"
          aria-label="University news articles"
        >
          {articles.map((article) => (
            <NewsCard 
              key={article.id} 
              article={article}
              aria-describedby={`article-${article.id}-summary`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// components/sections/NewsGrid/NewsCard.tsx
export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[5/3] relative">
        <Image
          src={article.image}
          alt={article.imageAlt || `Image for ${article.title}`}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <header>
          <h3 className="text-xl font-semibold mb-2">
            <Link 
              href={`/news/${article.slug}`}
              className="hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              {article.title}
            </Link>
          </h3>
          
          <time 
            dateTime={article.publishedAt}
            className="text-sm text-muted-foreground"
          >
            {formatDate(article.publishedAt)}
          </time>
        </header>
        
        <p 
          id={`article-${article.id}-summary`}
          className="text-muted-foreground mt-2"
        >
          {article.excerpt}
        </p>
      </div>
    </article>
  )
}
```

#### Keyboard Navigation & Focus Management
```typescript
// components/layout/header/MegaMenu.tsx
'use client'
import { useState, useRef, useEffect } from 'react'

export function MegaMenu({ items }: { items: MenuItem[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedItem, setFocusedItem] = useState(-1)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        setIsOpen(false)
        triggerRef.current?.focus()
        break
        
      case 'ArrowDown':
        event.preventDefault()
        setFocusedItem((prev) => 
          prev < items.length - 1 ? prev + 1 : 0
        )
        break
        
      case 'ArrowUp':
        event.preventDefault()
        setFocusedItem((prev) => 
          prev > 0 ? prev - 1 : items.length - 1
        )
        break
        
      case 'Tab':
        if (!event.shiftKey && focusedItem === items.length - 1) {
          setIsOpen(false)
        }
        break
    }
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onKeyDown={handleKeyDown}
        className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
      >
        Navigation
      </button>
      
      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          className="absolute top-full left-0 bg-white shadow-lg border rounded-md"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {items.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              role="menuitem"
              tabIndex={index === focusedItem ? 0 : -1}
              className={cn(
                "block px-4 py-2 hover:bg-muted focus:bg-muted focus:outline-none",
                index === focusedItem && "bg-muted"
              )}
              onKeyDown={handleKeyDown}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
```

#### Reduced Motion Support
```css
/* Global styles for reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .hero-carousel {
    /* Disable auto-advance for reduced motion users */
    animation: none;
  }
  
  .trust-signals .animated-bar {
    /* Show final state immediately */
    width: var(--target-width) !important;
    transition: none !important;
  }
}

/* Alternative: Respect user preference in JavaScript */
```

```typescript
// hooks/useReducedMotion.ts
import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Usage in components
export function HeroCarousel({ slides }: HeroCarouselProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isAutoPlaying, setIsAutoPlaying] = useState(!prefersReducedMotion)

  // Rest of component logic...
}
```

## Internationalization Architecture

### Locale-based Routing Structure
```
app/
├── [locale]/
│   ├── layout.tsx (Locale-specific layout)
│   ├── page.tsx (Localized homepage)
│   ├── about/
│   │   └── page.tsx
│   ├── admissions/
│   │   └── page.tsx
│   └── news/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
│
├── layout.tsx (Root layout)
├── not-found.tsx
└── globals.css
```

### i18n Configuration
```typescript
// lib/i18n/config.ts
export const locales = ['en', 'ko', 'zh'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  zh: '中文',
}

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  ko: '🇰🇷',
  zh: '🇨🇳',
}

// middleware.ts
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './lib/i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
```

### Translation Management
```typescript
// messages/en.json
{
  "navigation": {
    "home": "Home",
    "about": "About",
    "admissions": "Admissions",
    "academics": "Academics",
    "programs": "Programs",
    "studentLife": "Student Life",
    "research": "Research"
  },
  "hero": {
    "mainHeading": "CREATE POSITIVE CHANGE",
    "subHeading": "Leading innovation in higher education",
    "ctaPrimary": "Apply Now",
    "ctaSecondary": "Learn More"
  },
  "quickActions": {
    "undergraduate": "Undergraduate",
    "graduate": "Graduate",
    "international": "International Students",
    "current": "Current Students",
    "faculty": "Faculty & Staff",
    "about": "About TU",
    "news": "News & Events",
    "career": "Career Services"
  }
}

// Component usage with translations
import { useTranslations } from 'next-intl'

export function QuickActionsGrid() {
  const t = useTranslations('quickActions')
  
  const actions = [
    { key: 'undergraduate', icon: GraduationCap },
    { key: 'graduate', icon: BookOpen },
    { key: 'international', icon: Globe },
    { key: 'current', icon: Users },
    { key: 'faculty', icon: UserCheck },
    { key: 'about', icon: Building },
    { key: 'news', icon: Newspaper },
    { key: 'career', icon: Briefcase },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {actions.map(({ key, icon: Icon }) => (
            <ActionButton
              key={key}
              href={`/${key}`}
              icon={Icon}
              label={t(key)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

## Security Architecture

### Content Security Policy (CSP)
```typescript
// next.config.js - Security headers
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.google-analytics.com",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "img-src 'self' data: https: *.youtube.com *.ytimg.com",
      "font-src 'self' fonts.gstatic.com",
      "connect-src 'self' *.google-analytics.com",
      "frame-src 'self' *.youtube.com",
    ].join('; ')
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

### Input Sanitization & Validation
```typescript
// lib/validation/schemas.ts
import { z } from 'zod'

export const SearchQuerySchema = z.object({
  q: z.string().min(1).max(100).regex(/^[a-zA-Z0-9\s\-_.]+$/),
  category: z.enum(['all', 'news', 'events', 'pages']).optional(),
  limit: z.number().min(1).max(50).optional(),
})

export const ContactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  subject: z.string().min(5).max(100),
  message: z.string().min(10).max(1000),
})

// API route with validation
import { NextRequest, NextResponse } from 'next/server'
import { SearchQuerySchema } from '@/lib/validation/schemas'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())
    
    const validatedQuery = SearchQuerySchema.parse(query)
    
    // Process search...
    const results = await searchContent(validatedQuery)
    
    return NextResponse.json(results)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters' }, 
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
```

## Testing Architecture

### Testing Strategy Overview
```yaml
Testing Pyramid:
├── Unit Tests (70%)
│   ├── Component testing with React Testing Library
│   ├── Utility function testing with Vitest
│   ├── Hook testing with React Hooks Testing Library
│   └── Accessibility testing with jest-axe
│
├── Integration Tests (20%)
│   ├── Page-level testing with Playwright
│   ├── API endpoint testing
│   ├── User flow testing
│   └── Cross-browser compatibility testing
│
└── E2E Tests (10%)
    ├── Critical user journeys
    ├── Form submissions
    ├── Navigation flows
    └── Performance benchmarks
```

### Component Testing Setup
```typescript
// __tests__/components/HeroCarousel.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { HeroCarousel } from '@/components/sections/HeroCarousel'

expect.extend(toHaveNoViolations)

const mockSlides = [
  {
    id: '1',
    title: 'Test Slide 1',
    subtitle: 'Test subtitle',
    image: '/test-image-1.jpg',
    ctaText: 'Learn More',
    ctaLink: '/about'
  },
  {
    id: '2',
    title: 'Test Slide 2',
    subtitle: 'Test subtitle 2',
    image: '/test-image-2.jpg',
    ctaText: 'Apply Now',
    ctaLink: '/admissions'
  }
]

describe('HeroCarousel', () => {
  it('renders all slides', () => {
    render(<HeroCarousel slides={mockSlides} />)
    
    expect(screen.getByText('Test Slide 1')).toBeInTheDocument()
    expect(screen.getByText('Test Slide 2')).toBeInTheDocument()
  })

  it('advances slides automatically', async () => {
    render(<HeroCarousel slides={mockSlides} />)
    
    // First slide should be active
    expect(screen.getByText('Test Slide 1')).toBeVisible()
    
    // Wait for auto-advance (7 seconds + buffer)
    await waitFor(
      () => {
        expect(screen.getByText('Test Slide 2')).toBeVisible()
      },
      { timeout: 8000 }
    )
  })

  it('pauses on hover', async () => {
    const user = userEvent.setup()
    render(<HeroCarousel slides={mockSlides} />)
    
    const carousel = screen.getByRole('region', { name: /hero carousel/i })
    
    // Hover to pause
    await user.hover(carousel)
    
    // Should remain on first slide
    await new Promise(resolve => setTimeout(resolve, 8000))
    expect(screen.getByText('Test Slide 1')).toBeVisible()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<HeroCarousel slides={mockSlides} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<HeroCarousel slides={mockSlides} />)
    
    // Focus on next button and activate
    const nextButton = screen.getByRole('button', { name: /next slide/i })
    await user.click(nextButton)
    
    expect(screen.getByText('Test Slide 2')).toBeVisible()
  })
})
```

### Performance Testing
```typescript
// __tests__/performance/core-web-vitals.test.ts
import { test, expect } from '@playwright/test'

test.describe('Core Web Vitals', () => {
  test('homepage meets LCP requirements', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/')
    
    // Wait for largest contentful paint
    await page.waitForLoadState('networkidle')
    
    const lcp = await page.evaluate(() => {
      return new Promise(resolve => {
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries()
          const lcpEntry = entries[entries.length - 1]
          resolve(lcpEntry.startTime)
        })
        observer.observe({ entryTypes: ['largest-contentful-paint'] })
      })
    })
    
    expect(lcp).toBeLessThan(2500) // 2.5 seconds
  })

  test('homepage meets CLS requirements', async ({ page }) => {
    await page.goto('/')
    
    // Simulate scrolling to trigger any layout shifts
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })
    
    await page.waitForTimeout(2000)
    
    const cls = await page.evaluate(() => {
      return new Promise(resolve => {
        let clsValue = 0
        const observer = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
              clsValue += entry.value
            }
          }
          resolve(clsValue)
        })
        observer.observe({ entryTypes: ['layout-shift'] })
      })
    })
    
    expect(cls).toBeLessThan(0.1)
  })
})
```

## Deployment Architecture

### Deployment Strategy Overview
```
Development → Staging → Production

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Development   │    │     Staging     │    │   Production    │
│                 │    │                 │    │                 │
│ • Local Dev     │───▶│ • Preview Builds│───▶│ • Live Site     │
│ • Hot Reload    │    │ • QA Testing    │    │ • Global CDN    │
│ • Dev Tools     │    │ • Stakeholder   │    │ • Edge Caching  │
│                 │    │   Review        │    │ • Monitoring    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Recommended Hosting Platform: Vercel
```yaml
Primary Choice: Vercel
Reasons:
- Native Next.js optimization
- Global Edge Network
- Automatic performance optimization
- Built-in analytics and monitoring
- Zero-config deployment
- Preview deployments for testing

Alternative: Netlify
- Similar features to Vercel
- Good Next.js support
- Competitive pricing
- Strong CDN network

Fallback: AWS Amplify
- AWS ecosystem integration
- Scalable infrastructure
- Custom domain support
- Branch-based deployments
```

### Build and Deployment Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run linting
        run: pnpm lint
      
      - name: Run type checking
        run: pnpm type-check
      
      - name: Run unit tests
        run: pnpm test
      
      - name: Run accessibility tests
        run: pnpm test:a11y
      
      - name: Build application
        run: pnpm build
      
      - name: Run E2E tests
        run: pnpm test:e2e

  lighthouse:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - name: Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun

  deploy-staging:
    runs-on: ubuntu-latest
    needs: [test, lighthouse]
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel (Preview)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-production:
    runs-on: ubuntu-latest
    needs: [test, lighthouse]
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel (Production)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Environment Configuration
```typescript
// Environment variables structure
// .env.local (development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CMS_URL=http://localhost:1337
NEXT_PUBLIC_ANALYTICS_ID=dev-analytics-id

// .env.production
NEXT_PUBLIC_SITE_URL=https://tongmyong.edu
NEXT_PUBLIC_CMS_URL=https://cms.tongmyong.edu
NEXT_PUBLIC_ANALYTICS_ID=prod-analytics-id
CMS_API_TOKEN=production-cms-token
REVALIDATION_SECRET=production-secret

// lib/env.ts - Environment validation
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_CMS_URL: z.string().url(),
  NEXT_PUBLIC_ANALYTICS_ID: z.string(),
  CMS_API_TOKEN: z.string().optional(),
  REVALIDATION_SECRET: z.string().optional(),
})

export const env = envSchema.parse(process.env)
```

### CDN and Caching Strategy
```typescript
// next.config.js - Caching configuration
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      {
        source: '/:path*.{jpg,jpeg,png,webp,avif,gif,svg,ico}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=60', // 1 day
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=60',
          },
        ],
      },
    ]
  },
}

// ISR (Incremental Static Regeneration) for dynamic content
// app/news/page.tsx
export const revalidate = 3600 // Revalidate every hour

export default async function NewsPage() {
  const articles = await fetchNewsArticles()
  
  return (
    <div>
      {/* News content */}
    </div>
  )
}
```

### Monitoring and Analytics
```typescript
// lib/analytics.ts
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

// Custom performance monitoring
// lib/performance.ts
export function reportWebVitals(metric: any) {
  switch (metric.name) {
    case 'CLS':
    case 'FID':
    case 'FCP':
    case 'LCP':
    case 'TTFB':
      // Send to analytics service
      console.log(metric)
      break
    default:
      break
  }
}

// app/layout.tsx usage
import { reportWebVitals } from '@/lib/performance'

export { reportWebVitals }
```

### Domain and SSL Configuration
```yaml
# Domain setup
Primary Domain: tongmyong.edu
- SSL Certificate: Automatic (Let's Encrypt via Vercel)
- DNS Configuration: A/AAAA records pointing to Vercel
- CNAME for www: www.tongmyong.edu → tongmyong.edu

Subdomain Structure:
- www.tongmyong.edu → Main site
- en.tongmyong.edu → English version (if needed)
- ko.tongmyong.edu → Korean version (if needed)
- zh.tongmyong.edu → Chinese version (if needed)

Alternative: Path-based locales (Recommended)
- tongmyong.edu/ → Default (English)
- tongmyong.edu/ko/ → Korean
- tongmyong.edu/zh/ → Chinese
```

### Error Handling and Fallbacks
```typescript
// app/error.tsx - Error boundary
'use client'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button
          onClick={reset}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

// app/not-found.tsx - 404 page
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link 
          href="/"
          className="bg-primary text-white px-6 py-3 rounded hover:bg-primary/90"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

// app/loading.tsx - Loading fallback
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  )
}
```

## Content Management Integration

### Headless CMS Architecture
```typescript
// Recommended CMS: Strapi or Contentful
// lib/cms/strapi.ts
interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

class StrapiClient {
  private baseUrl: string
  private apiToken?: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_CMS_URL!
    this.apiToken = process.env.CMS_API_TOKEN
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<StrapiResponse<T>> {
    const url = `${this.baseUrl}/api${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiToken && {
          Authorization: `Bearer ${this.apiToken}`,
        }),
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`CMS request failed: ${response.statusText}`)
    }

    return response.json()
  }

  async getHeroSlides(): Promise<HeroSlide[]> {
    const response = await this.request<HeroSlide[]>(
      '/hero-slides?populate=*&sort=order:asc'
    )
    return response.data
  }

  async getNewsArticles(limit = 6): Promise<NewsArticle[]> {
    const response = await this.request<NewsArticle[]>(
      `/news-articles?populate=*&sort=publishedAt:desc&pagination[limit]=${limit}`
    )
    return response.data
  }

  async getEvents(limit = 10): Promise<Event[]> {
    const response = await this.request<Event[]>(
      `/events?populate=*&sort=startDate:asc&pagination[limit]=${limit}`
    )
    return response.data
  }
}

export const cmsClient = new StrapiClient()
```

### Content Models
```typescript
// types/cms.ts
export interface HeroSlide {
  id: string
  title: string
  subtitle: string
  description?: string
  image: {
    url: string
    alternativeText: string
    width: number
    height: number
  }
  ctaPrimary?: {
    text: string
    url: string
  }
  ctaSecondary?: {
    text: string
    url: string
  }
  order: number
  isActive: boolean
}

export interface NewsArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  category: {
    name: string
    slug: string
  }
  featuredImage: {
    url: string
    alternativeText: string
  }
  author?: {
    name: string
    avatar?: {
      url: string
    }
  }
}

export interface Event {
  id: string
  title: string
  slug: string
  description: string
  startDate: string
  endDate?: string
  location: string
  category: {
    name: string
    color: string
  }
  image?: {
    url: string
    alternativeText: string
  }
  registrationUrl?: string
}
```

## File Structure Overview

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

## Development Workflow

### Getting Started
```bash
# Clone repository
git clone <repository-url>
cd tongmyong-university-website

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Start production server
pnpm start
```

### Development Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:ui": "vitest --ui",
    "test:a11y": "jest --testMatch='**/*.a11y.test.{js,ts,tsx}'",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "analyze": "cross-env ANALYZE=true next build",
    "lighthouse": "lhci autorun"
  }
}
```

## Conclusion

This technical architecture provides a comprehensive foundation for the Tongmyong University website redesign project. The architecture prioritizes:

1. **Performance**: Core Web Vitals optimization, efficient caching, and modern build tools
2. **Accessibility**: WCAG 2.1 AA compliance with comprehensive testing
3. **Scalability**: Component-based architecture with clear separation of concerns
4. **Maintainability**: TypeScript, comprehensive testing, and clear documentation
5. **User Experience**: Responsive design, internationalization, and modern interactions
6. **Developer Experience**: Modern tooling, automated workflows, and clear patterns

The architecture supports all requirements outlined in the PRD while providing flexibility for future enhancements and maintenance.

**Next Steps:**
1. Set up development environment using this architecture
2. Begin implementation with Epic 1: Foundation & Core Infrastructure
3. Establish CI/CD pipeline and deployment workflow
4. Implement comprehensive testing strategy
5. Set up monitoring and analytics for production environment

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "Create comprehensive technical architecture document for Tongmyong University website", "status": "completed", "activeForm": "Creating comprehensive technical architecture document for Tongmyong University website"}, {"content": "Review PRD requirements and map to technical solutions", "status": "completed", "activeForm": "Reviewing PRD requirements and mapping to technical solutions"}, {"content": "Define technology stack and framework choices", "status": "completed", "activeForm": "Defining technology stack and framework choices"}, {"content": "Design component architecture and file structure", "status": "completed", "activeForm": "Designing component architecture and file structure"}, {"content": "Document deployment and performance optimization strategies", "status": "in_progress", "activeForm": "Documenting deployment and performance optimization strategies"}]