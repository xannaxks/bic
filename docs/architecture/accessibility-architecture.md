# Accessibility Architecture

## WCAG 2.1 AA Implementation Strategy

### Semantic HTML Structure
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

### Keyboard Navigation & Focus Management
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

### Reduced Motion Support
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
