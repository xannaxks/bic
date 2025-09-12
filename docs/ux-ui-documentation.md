# Tongmyong University Website - UX/UI Design Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Design System](#design-system)
3. [Layout Structure](#layout-structure)
4. [Component Specifications](#component-specifications)
5. [Animation & Interaction](#animation--interaction)
6. [Responsive Design](#responsive-design)
7. [Implementation Guidelines](#implementation-guidelines)

---

## Project Overview

### Objective
Complete redesign of Tongmyong University's English website to create a modern, user-friendly, and accessible platform that effectively serves prospective students, current students, faculty, and visitors.

### Target Audience
- **Primary:** Prospective international students
- **Secondary:** Current students, faculty, parents, researchers
- **Tertiary:** Employers, partners, alumni

### Key Improvements
- Modern, clean design replacing outdated video-heavy layout
- Improved navigation and information architecture
- Better accessibility and mobile responsiveness
- Enhanced user journey with clear call-to-actions
- Performance optimization

---

## Design System

### Color Palette

#### Light Theme
```css
:root {
  /* Primary - Light Green (University Brand) */
  --primary: #22c55e;
  --primary-hover: #16a34a;
  --primary-light: #86efac;
  
  /* Secondary - Complementary Blue */
  --secondary: #0ea5e9;
  --secondary-hover: #0284c7;
  
  /* Accent & Status */
  --accent: #f59e0b;
  --destructive: #ef4444;
  --success: #10b981;
  
  /* Neutrals */
  --background: #ffffff;
  --foreground: #0f172a;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --border: #e2e8f0;
  --ring: #22c55e;
  --radius: 0.5rem;
}
```

#### Dark Theme
```css
[data-theme="dark"] {
  --primary: #4ade80;
  --primary-hover: #22c55e;
  --primary-light: #166534;
  --secondary: #38bdf8;
  --secondary-hover: #0ea5e9;
  --accent: #fbbf24;
  --destructive: #f87171;
  --success: #34d399;
  --background: #0f172a;
  --foreground: #f8fafc;
  --card: #1e293b;
  --card-foreground: #f8fafc;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
  --border: #334155;
}
```

### Typography

#### Font System
```css
/* Primary font for all content */
--font-primary: 'Inter', system-ui, sans-serif;

/* Font weights */
--font-weights: 400, 500, 600, 700;

/* Font sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Spacing System
```css
/* Spacing scale */
--space-xs: 4px;       /* 0.25rem */
--space-sm: 8px;       /* 0.5rem */
--space-md: 16px;      /* 1rem */
--space-lg: 32px;      /* 2rem */
--space-xl: 64px;      /* 4rem */
--space-2xl: 128px;    /* 8rem */

/* Container widths */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1400px;
```

### Border Radius & Shadows
```css
/* Border radius */
--radius-sm: 6px;      /* Small elements */
--radius-md: 12px;     /* Cards, buttons */
--radius-lg: 20px;     /* Large cards */
--radius-xl: 28px;     /* Hero sections */
--radius-full: 9999px; /* Pills, avatars */

/* Shadows */
--shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 25px rgba(0,0,0,0.15);
--shadow-xl: 0 20px 40px rgba(0,0,0,0.2);
```

### Animation System
```css
/* Transition durations */
--transition-fast: 150ms ease-in-out;
--transition-normal: 250ms ease-in-out;
--transition-slow: 400ms ease-in-out;

/* Easing curves */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## Layout Structure

### Page Layout Hierarchy
```
1. Utility Navigation Bar (Small, top)
2. Main Navigation Bar (Hidden initially, sticky on scroll)
3. Hero Section (Image carousel with fade transitions)
4. Quick Action Buttons (8 buttons for main user paths)
5. Trust Signals (Statistics with animated bars)
6. News & Media Section (Mixed content grid)
7. Footer (Comprehensive links and information)
```

### 1. Utility Navigation Bar
**Position:** Fixed top, always visible
**Content:** `[Language|Theme] ----------[Search]-------[Login]`

**Components:**
- Language switcher (Korean/Chinese)
- Theme toggle (Light/Dark)
- Search bar (expandable)
- Login button

### 2. Main Navigation Bar
**Position:** Fixed, hidden initially, appears on scroll
**Content:** `[LOGO] [About] [Admissions] [Academics] [Programs] [Student Life] [Research]`

**Features:**
- Logo left-aligned
- Mega menu on hover (desktop only)
- Glass morphism background when sticky
- Burger menu on mobile

### 3. Hero Section
**Layout:**
```
[←] [                                    ] [→]
    [  Image with overlay text           ]
    [  "CREATE POSITIVE CHANGE"          ]
    [  Sub-heading text                  ]
    [  CTA Button                        ]
       [●][○][○][○][○] (slide indicators)
```

**Specifications:**
- 5-6 slides maximum
- Fade transitions (600ms duration)
- Auto-advance every 7 seconds
- Pause on hover
- Touch/swipe support for mobile
- 16:9 aspect ratio images

### 4. Quick Action Buttons
**Layout:** 4x2 grid (desktop), 2x4 grid (mobile)

**Buttons:**
- Undergraduate
- Graduate  
- International Students
- Current Students
- Faculty & Staff
- About TU
- News & Events
- Career Services

### 5. Trust Signals Section
**Layout:** 4-column statistics with animated bars

**Content:**
- Student count (15,000+)
- University ranking (#1 in Busan)
- International presence (45+ countries)
- Employment rate (95%)

**Animation:** Bars grow from 0 to target percentage on scroll

### 6. News & Media Section
**Layout:** Mixed grid of news articles and YouTube video thumbnails

**Content Ratio:**
- 3-4 news articles with images
- 2-3 video highlights with thumbnails
- Alternating placement for visual variety

### 7. Footer
**Comprehensive footer with:**
- Quick links organized by category
- Contact information
- Social media links
- Legal links (Privacy, Terms, Accessibility)

---

## Component Specifications

### Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--primary);
  color: white;
  border-radius: var(--radius-md);
  padding: 12px 24px;
  font-weight: 500;
  transition: all var(--transition-fast);
}

.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: var(--secondary);
  color: white;
  border-radius: var(--radius-md);
  padding: 12px 24px;
  font-weight: 500;
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
  border-radius: var(--radius-md);
  padding: 10px 22px;
  font-weight: 500;
}
```

### Cards

#### News Card
```css
.news-card {
  background: var(--card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
```

#### Quick Action Card
```css
.action-card {
  background: var(--muted);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  text-align: center;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.action-card:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}
```

### Navigation Components

#### Mega Menu
```css
.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100vw;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-md);
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.3s ease;
  pointer-events: none;
}

.nav-item:hover .mega-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

**Mega Menu Content Structure:**
```
[Category 1]         [Category 2]         [Category 3]         [Category 4]
- Sub-item 1         - Sub-item 1         - Sub-item 1         - Sub-item 1
- Sub-item 2         - Sub-item 2         - Sub-item 2         - Sub-item 2
- Sub-item 3         - Sub-item 3         - Sub-item 3         - Sub-item 3

[Bottom CTA Section]
```

---

## Animation & Interaction

### Page Load Sequence
1. **Hero section fades in** (0ms)
2. **Quick actions appear** (200ms stagger)
3. **Navigation appears on scroll** (10% scroll threshold)
4. **Trust signals animate** (50% scroll threshold)
5. **News cards fade up** (100ms stagger on viewport entry)

### Scroll Animations

#### Section Fold Effect
```css
.section {
  transform-origin: top center;
  transition: all var(--transition-normal);
}

.section.scrolled-past {
  transform: perspective(1000px) rotateX(-3deg) scale(0.98);
  opacity: 0.85;
  filter: brightness(0.95);
}
```

#### Element Appear Animation
```css
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Trust Signals Animation
```css
.stat-bar {
  width: 0;
  height: 8px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: var(--radius-full);
}

.stat-bar.animate {
  width: var(--target-width);
}
```

### Sticky Navigation Animation
```css
.main-nav {
  position: fixed;
  top: 0;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.9);
}

.main-nav.sticky {
  transform: translateY(0);
  box-shadow: var(--shadow-md);
}
```

### Back to Top Button
```css
.scroll-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  opacity: 0;
  transform: translateY(100px);
  transition: all 0.3s ease;
  background: var(--primary);
  color: white;
  border-radius: var(--radius-full);
  padding: 12px;
}

.scroll-top.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Hero Carousel Transitions
```css
.carousel-slide {
  opacity: 0;
  transition: opacity 600ms ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.carousel-slide.active {
  opacity: 1;
  position: relative;
}
```

---

## Responsive Design

### Breakpoints
```css
/* Mobile */
@media (max-width: 767px) { }

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1280px) { }
```

### Navigation Responsiveness

#### Desktop (1024px+)
- Full mega menu on hover
- 4-column mega menu layout
- Sticky navigation with glass effect

#### Tablet (768px - 1023px)
- Simplified mega menu
- 2-column mega menu layout
- Touch-friendly spacing

#### Mobile (< 768px)
- Hidden burger menu
- Full-screen overlay navigation
- Simple accordion dropdowns
- No mega menus

### Mobile Navigation Structure
```css
.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--background);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1000;
}

.mobile-nav.open {
  transform: translateX(0);
}
```

### Content Responsiveness

#### Quick Action Buttons
- **Desktop:** 4x2 grid
- **Tablet:** 4x2 grid (smaller cards)
- **Mobile:** 2x4 grid (stacked)

#### Trust Signals
- **Desktop:** 4-column horizontal layout
- **Tablet:** 2x2 grid
- **Mobile:** Single column vertical stack

#### News & Media Section
- **Desktop:** Mixed 3-column grid
- **Tablet:** 2-column grid
- **Mobile:** Single column stack

---

## Implementation Guidelines

### Technology Stack
- **Framework:** Next.js 15+ with App Router
- **Styling:** Tailwind CSS + Shadcn/ui components
- **Icons:** Lucide React
- **Animations:** Framer Motion (optional) or CSS transitions
- **State Management:** React useState/Context for theme/language

### Performance Requirements
- **Core Web Vitals:**
  - LCP < 2.5s
  - FID < 100ms  
  - CLS < 0.1
- **Lighthouse Score:** 90+ on all metrics
- **Image optimization:** Next.js Image component with proper sizing
- **Font optimization:** Preload critical fonts

### Accessibility Requirements
- **WCAG 2.1 AA compliance**
- **Keyboard navigation** for all interactive elements
- **Screen reader support** with proper ARIA labels
- **Color contrast ratios** of 4.5:1 minimum
- **Focus indicators** for all focusable elements
- **Reduced motion support** with `prefers-reduced-motion`

### Browser Support
- **Modern browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile browsers:** iOS Safari 14+, Chrome Mobile 90+
- **Graceful degradation** for older browsers

### SEO Requirements
- **Semantic HTML structure**
- **Proper heading hierarchy** (H1 > H2 > H3)
- **Meta descriptions** for all pages
- **Open Graph tags** for social sharing
- **Structured data** for organization information
- **XML sitemap** and robots.txt

### Content Guidelines
- **Images:** 
  - Hero images: 1920x800px, WebP format
  - News thumbnails: 400x240px, WebP format
  - Profile photos: 200x200px, WebP format
  - Alt text for all images
- **Copy:** 
  - Concise, scannable content
  - Clear call-to-actions
  - Consistent tone and voice
  - Internationalization support

### Development Phases

#### Phase 1: Foundation
1. Set up Next.js project with Tailwind CSS
2. Install and configure Shadcn/ui components
3. Implement design system (colors, typography, spacing)
4. Create basic layout structure

#### Phase 2: Components
1. Build utility navigation bar
2. Create main navigation with mega menus
3. Develop hero carousel component
4. Build quick action buttons grid

#### Phase 3: Content Sections
1. Implement trust signals with animations
2. Create news & media section
3. Build comprehensive footer
4. Add back-to-top functionality

#### Phase 4: Interactions
1. Add scroll animations and triggers
2. Implement sticky navigation behavior
3. Add section fold effects
4. Integrate theme switching functionality

#### Phase 5: Responsive & Polish
1. Implement mobile navigation
2. Test and refine responsive layouts
3. Optimize animations and performance
4. Conduct accessibility audit

#### Phase 6: Content Integration
1. Connect to content management system
2. Implement search functionality
3. Add language switching logic
4. Final testing and deployment

---

## Conclusion

This documentation provides a comprehensive guide for implementing the Tongmyong University website redesign. The design prioritizes user experience, modern aesthetics, and accessibility while maintaining the university's brand identity through the signature light green color palette.

Key success factors:
- **User-centered design** with clear navigation paths
- **Modern aesthetics** with subtle animations and interactions
- **Accessibility-first approach** ensuring inclusive design
- **Performance optimization** for fast loading times
- **Responsive design** working seamlessly across all devices

The implementation should be done in phases, allowing for iterative testing and refinement to ensure the final product meets all user needs and technical requirements.