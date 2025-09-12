# Component Architecture

## Component Hierarchy
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

## Component Design Patterns

### 1. Server Components (Default)
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

### 2. Client Components (Interactive)
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

### 3. Compound Components Pattern
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
