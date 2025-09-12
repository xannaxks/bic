# Security Architecture

## Content Security Policy (CSP)
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

## Input Sanitization & Validation
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
