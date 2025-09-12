# Deployment Architecture

## Deployment Strategy Overview
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

## Recommended Hosting Platform: Vercel
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

## Build and Deployment Pipeline
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

## Environment Configuration
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

## CDN and Caching Strategy
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

## Monitoring and Analytics
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

## Domain and SSL Configuration
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

## Error Handling and Fallbacks
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
