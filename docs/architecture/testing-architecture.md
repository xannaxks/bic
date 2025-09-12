# Testing Architecture

## Testing Strategy Overview
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

## Component Testing Setup
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

## Performance Testing
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
