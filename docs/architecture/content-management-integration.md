# Content Management Integration

## Headless CMS Architecture
```typescript
// Recommended CMS: Strapi or Contentful
// lib/cms/strapi.ts
interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

class StrapiClient {
  private baseUrl: string
  private apiToken?: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_CMS_URL!
    this.apiToken = process.env.CMS_API_TOKEN
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<StrapiResponse<T>> {
    const url = `${this.baseUrl}/api${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiToken && {
          Authorization: `Bearer ${this.apiToken}`,
        }),
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`CMS request failed: ${response.statusText}`)
    }

    return response.json()
  }

  async getHeroSlides(): Promise<HeroSlide[]> {
    const response = await this.request<HeroSlide[]>(
      '/hero-slides?populate=*&sort=order:asc'
    )
    return response.data
  }

  async getNewsArticles(limit = 6): Promise<NewsArticle[]> {
    const response = await this.request<NewsArticle[]>(
      `/news-articles?populate=*&sort=publishedAt:desc&pagination[limit]=${limit}`
    )
    return response.data
  }

  async getEvents(limit = 10): Promise<Event[]> {
    const response = await this.request<Event[]>(
      `/events?populate=*&sort=startDate:asc&pagination[limit]=${limit}`
    )
    return response.data
  }
}

export const cmsClient = new StrapiClient()
```

## Content Models
```typescript
// types/cms.ts
export interface HeroSlide {
  id: string
  title: string
  subtitle: string
  description?: string
  image: {
    url: string
    alternativeText: string
    width: number
    height: number
  }
  ctaPrimary?: {
    text: string
    url: string
  }
  ctaSecondary?: {
    text: string
    url: string
  }
  order: number
  isActive: boolean
}

export interface NewsArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  category: {
    name: string
    slug: string
  }
  featuredImage: {
    url: string
    alternativeText: string
  }
  author?: {
    name: string
    avatar?: {
      url: string
    }
  }
}

export interface Event {
  id: string
  title: string
  slug: string
  description: string
  startDate: string
  endDate?: string
  location: string
  category: {
    name: string
    color: string
  }
  image?: {
    url: string
    alternativeText: string
  }
  registrationUrl?: string
}
```
