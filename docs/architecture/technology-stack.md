# Technology Stack

## Core Framework & Runtime
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

## Styling & Design System
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

## Development & Build Tools
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

## Performance & Optimization
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

## Accessibility & Compliance
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

## Internationalization (i18n)
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
