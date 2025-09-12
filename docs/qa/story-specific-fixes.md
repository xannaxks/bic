# Story-Specific Fix Guide
## Quick Reference for Developers

---

## Story 1.1: Project Setup ⚠️

### Fix 1: Remove @next/font warning
```bash
# Terminal
pnpm remove @next/font
# The functionality is now built into Next.js
```

### Fix 2: Update Dev Agent Record in story file
```markdown
## Dev Agent Record
### Completion Date: 2025-09-12
### Implemented By: James (Dev Agent)
### Verified Components:
- ✅ Next.js 15.5.3 with App Router
- ✅ Tailwind CSS 4.1.13 configured
- ✅ Shadcn/ui components ready
- ✅ TypeScript strict mode
- ✅ Testing framework (Vitest)
```

---

## Story 1.2: Core Layout ✅ (Minor improvements)

### Add test for skip navigation
```typescript
// __tests__/components/layout/utility-navigation.test.tsx
it('should focus main content when skip link is clicked', () => {
  const { getByText } = render(<UtilityNavigation />);
  const skipLink = getByText('Skip to main content');
  
  fireEvent.click(skipLink);
  
  const mainContent = document.getElementById('main-content');
  expect(document.activeElement).toBe(mainContent);
});
```

---

## Story 1.3: Main Navigation 🔴 CRITICAL

### Fix 1: CSS Animation Classes (MUST FIX)
**File:** `components/layout/header/main-navigation.tsx`  
**Line:** ~20-28

```diff
- className={`fixed top-14 left-0 right-0 z-40 transition-all duration-300 ${
-   shouldShowNavigation
-     ? "transform translate-y-0 opacity-100"
-     : "transform -translate-y-full opacity-0"
- }`}
+ className={`fixed top-14 left-0 right-0 z-40 transition-all duration-300 ${
+   shouldShowNavigation
+     ? "translate-y-0 opacity-100"
+     : "-translate-y-full opacity-0"
+ }`}
```

### Fix 2: Add useScrollPosition tests
```typescript
// __tests__/hooks/use-scroll-position.test.ts
import { renderHook, act } from '@testing-library/react';
import { useScrollPosition } from '@/hooks/useScrollPosition';

describe('useScrollPosition', () => {
  it('should detect scroll direction', () => {
    const { result } = renderHook(() => useScrollPosition());
    
    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });
    
    expect(result.current.isScrolled).toBe(true);
  });
});
```

---

## Story 1.4: Homepage Layout 🔴 CRITICAL

### Must Add: Homepage tests
**Create:** `__tests__/app/[locale]/page.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/[locale]/page';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  // Add required messages
};

describe('HomePage', () => {
  const renderPage = () => {
    return render(
      <NextIntlClientProvider messages={messages} locale="en">
        <HomePage />
      </NextIntlClientProvider>
    );
  };

  it('should render hero carousel', () => {
    renderPage();
    expect(screen.getByTestId('hero-carousel')).toBeInTheDocument();
  });

  it('should render trust signals section', () => {
    renderPage();
    expect(screen.getByTestId('trust-signals')).toBeInTheDocument();
  });

  it('should render quick actions', () => {
    renderPage();
    expect(screen.getByTestId('quick-actions')).toBeInTheDocument();
  });

  it('should render news section', () => {
    renderPage();
    expect(screen.getByTestId('news-events')).toBeInTheDocument();
  });
});
```

### Add data-testid attributes
```typescript
// components/sections/hero/HeroCarousel.tsx
<div data-testid="hero-carousel" className="...">

// components/sections/home/TrustSignals.tsx
<section data-testid="trust-signals" className="...">

// components/sections/QuickActions/QuickActionsSection.tsx
<section data-testid="quick-actions" className="...">

// components/sections/home/NewsEventsSection.tsx
<section data-testid="news-events" className="...">
```

---

## Story 2.1: Hero Carousel ✅

### Optimization: Add loading state
```typescript
// components/sections/hero/HeroCarousel.tsx
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  // Simulate content load
  const timer = setTimeout(() => setIsLoading(false), 100);
  return () => clearTimeout(timer);
}, []);

if (isLoading) {
  return <div className="h-[600px] bg-gray-100 animate-pulse" />;
}
```

---

## Story 2.2: Hero Content ✅

### Add ARIA labels
```typescript
// components/sections/hero/HeroContent.tsx
<button 
  className="btn-primary"
  aria-label="Apply now for admissions"
>
  Apply Now
</button>
```

---

## Story 2.3: Trust Signals ✅

### Performance: Optimize counter animation
```typescript
// components/sections/home/TrustSignals.tsx
// Use Intersection Observer instead of useEffect
const [ref, inView] = useIntersectionObserver({
  threshold: 0.1,
  triggerOnce: true,
});

useEffect(() => {
  if (inView) {
    startCountAnimation();
  }
}, [inView]);
```

---

## Story 2.4: Quick Actions ✅

### Add keyboard navigation
```typescript
// components/sections/QuickActions/ActionButton.tsx
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
  role="button"
  tabIndex={0}
>
```

---

## Story 3.1: Desktop Mega Menu ✅

### Add focus trap
```typescript
// components/layout/header/MegaMenu.tsx
import { FocusTrap } from '@/hooks/useFocusTrap';

<FocusTrap active={isOpen}>
  <div className="mega-menu">
    {/* menu content */}
  </div>
</FocusTrap>
```

---

## Story 3.2: Mobile Navigation ✅

### Add swipe gestures
```bash
pnpm add react-swipeable
```

```typescript
// components/layout/header/MobileNavigation.tsx
import { useSwipeable } from 'react-swipeable';

const handlers = useSwipeable({
  onSwipedLeft: () => setIsOpen(false),
  onSwipedRight: () => setIsOpen(true),
});
```

---

## Story 3.3: Search Functionality ✅

### Add debouncing
```typescript
// components/features/search/SearchBar.tsx
import { useDebouncedValue } from '@/hooks/useDebounce';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebouncedValue(searchTerm, 300);

useEffect(() => {
  if (debouncedSearch) {
    performSearch(debouncedSearch);
  }
}, [debouncedSearch]);
```

---

## Story 3.4: Theme/Language Switching ✅

### Persist language preference
```typescript
// components/features/language/LanguageSwitcher.tsx
const handleLanguageChange = (locale: string) => {
  // Set cookie
  document.cookie = `locale=${locale};path=/;max-age=31536000`;
  
  // Update route
  router.push(pathname, { locale });
};
```

---

## Story 3.5: Back to Top ✅

### Add smooth scroll polyfill
```typescript
// components/layout/BackToTopButton.tsx
const scrollToTop = () => {
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // Fallback for older browsers
    window.scrollTo(0, 0);
  }
};
```

---

## Story 4.1-4.5: Content & Media ✅

### Add loading states for all async content
```typescript
// Generic loading component
// components/common/ContentLoader.tsx
export const ContentLoader = () => (
  <div className="space-y-4">
    <div className="h-4 bg-gray-200 rounded animate-pulse" />
    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
  </div>
);
```

---

## Story 5.1: Core Web Vitals ✅

### Add monitoring
```typescript
// app/layout.tsx
import { reportWebVitals } from '@/lib/web-vitals';

export function reportWebVitals(metric) {
  console.log(metric);
  // Send to analytics
}
```

---

## Story 5.2: Accessibility ✅

### Add automated testing
```json
// package.json
"scripts": {
  "test:a11y": "pa11y http://localhost:3000 --reporter cli"
}
```

---

## Story 5.3: SEO ✅

### Add structured data
```typescript
// app/[locale]/layout.tsx
export const metadata = {
  other: {
    'script:ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Tongmyong University',
      // ... more structured data
    }),
  },
};
```

---

## Story 5.4: Cross-Browser Testing ✅

### Add Playwright tests
```bash
pnpm add -D @playwright/test
npx playwright install
```

```typescript
// tests/cross-browser.spec.ts
import { test, expect, devices } from '@playwright/test';

test.use(devices['iPhone 12']);
test('mobile responsiveness', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('mobile.png');
});
```

---

## Story 5.5: Launch Preparation ✅

### Add health check endpoint
```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
}
```

---

## 🚨 Pre-Launch Checklist

```bash
# 1. Fix critical issues
npm run fix:story-1.3
npm run fix:story-1.4

# 2. Run all tests
pnpm test
pnpm test:e2e
pnpm test:a11y

# 3. Build and analyze
pnpm build
pnpm analyze

# 4. Security check
pnpm audit
pnpm audit fix

# 5. Performance check
pnpm lighthouse
```

---

## 📱 Testing Commands

```bash
# Create all test files
mkdir -p __tests__/{components,hooks,app,integration,e2e}

# Run specific story tests
pnpm test -- story-1.3
pnpm test -- story-1.4

# Coverage report
pnpm test -- --coverage --coverageReporters=html

# Watch mode for development
pnpm test -- --watch
```

---

**Remember:** Fix CRITICAL issues first, then HIGH priority, then the rest.