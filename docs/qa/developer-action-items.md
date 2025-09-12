# Developer Action Items - QA Review
## Tongmyong University Website Project

**Generated:** 2025-09-12  
**For:** Development Team  
**Priority:** Fixes required before and after launch  

---

## 🔴 CRITICAL - Fix Before Launch

### Story 1.3: Main Navigation Bar
**File:** `components/layout/header/main-navigation.tsx`

#### Issue 1: CSS Class Bug
```typescript
// CURRENT (Line ~25-27) - BROKEN
className={`fixed top-14 left-0 right-0 z-40 transition-all duration-300 ${
  shouldShowNavigation
    ? "transform translate-y-0 opacity-100"
    : "transform -translate-y-full opacity-0"
}`}

// FIXED - Remove redundant 'transform' class
className={`fixed top-14 left-0 right-0 z-40 transition-all duration-300 ${
  shouldShowNavigation
    ? "translate-y-0 opacity-100"
    : "-translate-y-full opacity-0"
}`}
```

#### Issue 2: Missing Tests
Create: `__tests__/components/layout/main-navigation.test.tsx`
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { MainNavigation } from '@/components/layout/header/main-navigation';

describe('MainNavigation', () => {
  it('should show/hide based on scroll position', () => {
    // Mock scroll behavior
    // Test visibility toggle
  });

  it('should apply glass morphism on scroll', () => {
    // Test backdrop-filter application
  });

  it('should handle mobile menu toggle', () => {
    // Test hamburger menu functionality
  });
});
```

### Story 1.4: Basic Homepage Layout  
**File:** `app/[locale]/page.tsx`

#### Issue: No Unit Tests
Create: `__tests__/app/homepage.test.tsx`
```typescript
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/[locale]/page';

describe('HomePage', () => {
  it('should render all homepage sections', () => {
    render(<HomePage />);
    // Test for HeroCarousel presence
    // Test for TrustSignals presence
    // Test for QuickActions presence
    // Test for NewsEventsSection presence
  });

  it('should be responsive', () => {
    // Test mobile/tablet/desktop layouts
  });
});
```

---

## 🟡 HIGH PRIORITY - Fix Within 1 Week

### Story 1.1: Project Setup
**File:** `i18n/request.ts`

#### Issue: Hardcoded Locale
```typescript
// CURRENT - Hardcoded
export default getRequestConfig(async () => {
  const locale = 'en'; // <-- PROBLEM
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

// FIXED - Dynamic locale detection
import { cookies, headers } from 'next/headers';

export default getRequestConfig(async () => {
  // Check cookie first
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('locale');
  
  // Fallback to accept-language header
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language');
  
  let locale = 'en'; // default
  
  if (localeCookie?.value && ['en', 'ko', 'zh'].includes(localeCookie.value)) {
    locale = localeCookie.value;
  } else if (acceptLanguage) {
    const detectedLocale = acceptLanguage.split(',')[0].split('-')[0];
    if (['en', 'ko', 'zh'].includes(detectedLocale)) {
      locale = detectedLocale;
    }
  }
  
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

### Story 1.2: Core Layout
**File:** `components/layout/header/utility-navigation.tsx`

#### Add Missing Tests
Create: `__tests__/components/features/theme-toggle.test.tsx`
```typescript
describe('ThemeToggle', () => {
  it('should toggle between light and dark modes', () => {
    // Test theme switching
    // Verify localStorage persistence
    // Check CSS class application
  });
});
```

Create: `__tests__/components/features/language-switcher.test.tsx`
```typescript
describe('LanguageSwitcher', () => {
  it('should switch languages and update routes', () => {
    // Test locale switching
    // Verify cookie setting
    // Check route updates
  });
});
```

---

## 🟢 MEDIUM PRIORITY - Complete Within 2 Weeks

### Story 2.1: Hero Carousel
**File:** `components/sections/hero/HeroCarousel.tsx`

#### Add Performance Tests
```typescript
// __tests__/components/sections/hero/hero-carousel.performance.test.tsx
import { measureRender } from '@testing-library/react';

describe('HeroCarousel Performance', () => {
  it('should render within 100ms', () => {
    // Measure initial render time
  });
  
  it('should not cause layout shifts', () => {
    // Test CLS score
  });
});
```

#### Add Lazy Loading
```typescript
// components/sections/hero/HeroCarousel.tsx
import dynamic from 'next/dynamic';

// Lazy load heavy carousel library
const Carousel = dynamic(() => import('@/lib/carousel'), {
  loading: () => <div className="h-[600px] bg-gray-100 animate-pulse" />,
  ssr: false // Only if needed
});
```

### Story 2.3: Trust Signals
**File:** `components/sections/home/TrustSignals.tsx`

#### Optimize Animation Performance
```typescript
// CURRENT - Multiple state updates
useEffect(() => {
  counters.forEach((counter, index) => {
    setTimeout(() => {
      // Animation logic
    }, index * 100);
  });
}, []);

// OPTIMIZED - Use RAF and batch updates
useEffect(() => {
  let rafId: number;
  const animate = () => {
    // Batch all counter updates
    rafId = requestAnimationFrame(animate);
  };
  animate();
  return () => cancelAnimationFrame(rafId);
}, []);
```

### Story 3.2: Mobile Navigation
**File:** `components/layout/header/mobile-navigation.tsx`

#### Add Touch Gesture Support
```typescript
// Add swipe-to-close functionality
import { useSwipeable } from 'react-swipeable';

const handlers = useSwipeable({
  onSwipedLeft: () => setIsOpen(false),
  trackMouse: false,
  preventDefaultTouchmoveEvent: true,
});

return (
  <div {...handlers} className="mobile-nav">
    {/* navigation content */}
  </div>
);
```

---

## 🔵 LOW PRIORITY - Nice to Have

### Global Test Coverage Improvements

#### 1. Create Test Utilities
**File:** `__tests__/utils/test-helpers.tsx`
```typescript
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <NextIntlClientProvider messages={messages} locale="en">
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
};

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });
```

#### 2. Add Visual Regression Tests
```bash
# Install dependencies
pnpm add -D @playwright/test

# Create playwright.config.ts
```

```typescript
// tests/visual/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});
```

#### 3. Add Accessibility Tests
```typescript
// __tests__/accessibility/a11y.test.tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

## 📋 Testing Checklist

### Minimum Test Coverage Goals
- [ ] Unit Tests: 70% coverage
- [ ] Integration Tests: Critical user flows
- [ ] E2E Tests: Happy paths
- [ ] Accessibility Tests: All pages
- [ ] Performance Tests: Core Web Vitals

### Test Files to Create (Priority Order)
1. `__tests__/components/layout/main-navigation.test.tsx`
2. `__tests__/app/homepage.test.tsx`
3. `__tests__/components/features/theme-toggle.test.tsx`
4. `__tests__/components/features/language-switcher.test.tsx`
5. `__tests__/components/sections/hero/hero-carousel.test.tsx`
6. `__tests__/components/sections/home/trust-signals.test.tsx`
7. `__tests__/components/sections/QuickActions/quick-actions.test.tsx`
8. `__tests__/components/layout/footer/footer.test.tsx`
9. `__tests__/integration/user-flows.test.tsx`
10. `__tests__/e2e/critical-paths.test.tsx`

---

## 🚀 Quick Fix Commands

```bash
# Run tests with coverage
pnpm test -- --coverage

# Fix ESLint issues
pnpm lint --fix

# Type check
pnpm tsc --noEmit

# Check accessibility
pnpm exec pa11y http://localhost:3000

# Bundle analysis
pnpm build && pnpm analyze
```

---

## 📊 Monitoring Setup

### Add These Before Launch
```typescript
// app/layout.tsx - Add monitoring
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🎯 Definition of Done Checklist

Before marking any story as complete:
- [ ] All acceptance criteria met
- [ ] Unit tests written and passing
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Accessibility tested (keyboard nav, screen reader)
- [ ] Responsive on all breakpoints
- [ ] Performance metrics acceptable
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Deployed to staging

---

**Note:** Focus on CRITICAL and HIGH priority items first. The project can launch with MEDIUM and LOW priority items scheduled for post-launch sprints.