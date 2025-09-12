# Performance Architecture

## Core Web Vitals Optimization Strategy

### Largest Contentful Paint (LCP) < 2.5s
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

### First Input Delay (FID) < 100ms
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

### Cumulative Layout Shift (CLS) < 0.1
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

## Bundle Optimization Strategy
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
