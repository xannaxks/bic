# Internationalization Architecture

## Locale-based Routing Structure
```
app/
├── [locale]/
│   ├── layout.tsx (Locale-specific layout)
│   ├── page.tsx (Localized homepage)
│   ├── about/
│   │   └── page.tsx
│   ├── admissions/
│   │   └── page.tsx
│   └── news/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
│
├── layout.tsx (Root layout)
├── not-found.tsx
└── globals.css
```

## i18n Configuration
```typescript
// lib/i18n/config.ts
export const locales = ['en', 'ko', 'zh'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  zh: '中文',
}

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  ko: '🇰🇷',
  zh: '🇨🇳',
}

// middleware.ts
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './lib/i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
```

## Translation Management
```typescript
// messages/en.json
{
  "navigation": {
    "home": "Home",
    "about": "About",
    "admissions": "Admissions",
    "academics": "Academics",
    "programs": "Programs",
    "studentLife": "Student Life",
    "research": "Research"
  },
  "hero": {
    "mainHeading": "CREATE POSITIVE CHANGE",
    "subHeading": "Leading innovation in higher education",
    "ctaPrimary": "Apply Now",
    "ctaSecondary": "Learn More"
  },
  "quickActions": {
    "undergraduate": "Undergraduate",
    "graduate": "Graduate",
    "international": "International Students",
    "current": "Current Students",
    "faculty": "Faculty & Staff",
    "about": "About TU",
    "news": "News & Events",
    "career": "Career Services"
  }
}

// Component usage with translations
import { useTranslations } from 'next-intl'

export function QuickActionsGrid() {
  const t = useTranslations('quickActions')
  
  const actions = [
    { key: 'undergraduate', icon: GraduationCap },
    { key: 'graduate', icon: BookOpen },
    { key: 'international', icon: Globe },
    { key: 'current', icon: Users },
    { key: 'faculty', icon: UserCheck },
    { key: 'about', icon: Building },
    { key: 'news', icon: Newspaper },
    { key: 'career', icon: Briefcase },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {actions.map(({ key, icon: Icon }) => (
            <ActionButton
              key={key}
              href={`/${key}`}
              icon={Icon}
              label={t(key)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```
