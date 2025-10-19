# Story 4.2.1: Mobile Navigation Accordion Menus Implementation

## Story Owner
Scrum Master

## Status
Ready for Review

## Story Points
5

## Sprint
Sprint 5

## Epic
Epic 4.2: Mobile Navigation Enhancement

## Description
As a mobile website visitor, I want to see expandable dropdown menus in the mobile navigation that match the desktop navigation structure, so that I can easily find and access all university information from my mobile device.

## Acceptance Criteria
- [x] Mobile menu displays 5 main accordion sections (About TU, Admission, Academics, Special Joint Program, International Student Support)
- [x] Each section can be expanded/collapsed by tapping
- [x] Expanded sections reveal all sub-menu items matching desktop navigation
- [x] About TU shows 9 sub-items when expanded
- [x] Admission shows 8 sub-items when expanded
- [x] Academics shows 9 sub-items when expanded
- [x] Special Joint Program shows 6 sub-items when expanded
- [x] International Student Support shows 5 sub-items when expanded
- [x] Chevron icon rotates to indicate expanded/collapsed state (Radix UI default)
- [x] Only one section can be expanded at a time (accordion single mode)
- [x] Smooth expand/collapse animations (200ms configured in tailwind)
- [x] All touch targets are minimum 44px height
- [x] Sub-menu links navigate to correct routes
- [x] Works in both light and dark themes (using theme variables)
- [x] Mobile menu closes on link click
- [x] No horizontal scrolling (max-height with overflow-y-auto)
- [x] Build completes without errors
- [x] Tests written and passing

## Tasks
- [x] Review current mobile menu implementation
- [x] Create shared navigation data constant (used by both desktop and mobile)
- [x] Install/verify Radix UI Accordion component
- [x] Create mobile menu component with Accordion
- [x] Implement accordion sections for 5 main categories
- [x] Add ChevronDown icons (Radix UI default)
- [x] Style accordion items to match theme
- [x] Ensure 44px minimum touch targets
- [x] Add smooth transitions (tailwind animations)
- [x] Update main-navigation.tsx to use new mobile menu
- [x] Update desktop navigation to use shared constants
- [x] Verify all 37 routes are accessible
- [x] Run dev server and verify compilation
- [x] Write component tests (11 test cases)

## Technical Implementation

### File Structure
```
components/
├── layout/
│   └── header/
│       ├── mobile-menu.tsx (UPDATE - add accordion)
│       └── mobile-menu-button.tsx (no changes)
├── ui/
│   └── accordion.tsx (add if not exists)
lib/
└── constants/
    └── navigation.ts (CREATE - shared nav data)
```

### Navigation Data Structure (Shared)
```typescript
// lib/constants/navigation.ts
export const NAVIGATION_ITEMS = [
  {
    id: 'about',
    title: 'About TU',
    icon: Building2,
    items: [
      { title: 'Educational Philosophy', href: '/about/philosophy' },
      { title: 'Vision', href: '/about/vision' },
      { title: "President's Greeting", href: '/about/president' },
      { title: 'History', href: '/about/history' },
      { title: 'Symbol', href: '/about/symbol' },
      { title: 'Global Networks', href: '/about/global-networks' },
      { title: 'Public Relations Videos', href: '/about/videos' },
      { title: 'Campus Map', href: '/about/campus-map' },
      { title: 'TU School Shuttle Bus Schedule', href: '/about/shuttle' },
    ]
  },
  // ... (admission, academics, special-joint-program, international)
]
```

### Mobile Menu Accordion Component
```typescript
// components/layout/header/mobile-menu.tsx
'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { NAVIGATION_ITEMS } from '@/lib/constants/navigation'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

export function MobileMenu({ isOpen, onOpenChange }) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full overflow-y-auto">
        <div className="py-6">
          <Accordion type="single" collapsible className="w-full">
            {NAVIGATION_ITEMS.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="text-lg font-semibold min-h-[44px]">
                  <div className="flex items-center gap-2">
                    <section.icon className="h-5 w-5" />
                    {section.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7 space-y-2">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-muted-foreground hover:text-foreground min-h-[44px] flex items-center"
                        onClick={() => onOpenChange(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

### Accordion Styling
```css
/* Smooth transitions for accordion */
[data-accordion-content] {
  overflow: hidden;
  transition: height 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

[data-accordion-content][data-state="open"] {
  animation: accordion-down 250ms ease-out;
}

[data-accordion-content][data-state="closed"] {
  animation: accordion-up 250ms ease-out;
}

@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}
```

## Routes
All routes match desktop navigation:
- `/about/*` (9 routes)
- `/admission/*` (8 routes)
- `/academics/*` (9 routes)
- `/special-joint-program/*` (6 routes)
- `/international/*` (5 routes)

## Testing Strategy
1. **Unit Tests**: Test accordion expand/collapse behavior
2. **Integration Tests**: Test link navigation and menu closing
3. **Visual Tests**: Verify on different viewport sizes
4. **Accessibility Tests**: Keyboard navigation, screen reader support
5. **Manual Tests**: Test on real iOS and Android devices

## Device Testing Matrix
- iPhone SE (320px width)
- iPhone 12 (390px width)
- iPhone 12 Pro Max (428px width)
- Samsung Galaxy S21 (360px width)
- iPad Mini (768px width)

## Definition of Done
- [ ] Code implemented and follows design system
- [ ] All acceptance criteria met
- [ ] Self-reviewed and follows best practices
- [ ] Build passes without errors
- [ ] Tests written and passing
- [ ] Tested on multiple mobile devices/viewports
- [ ] No accessibility violations (WCAG 2.1 AA)
- [ ] QA approved
- [ ] Code deployed

## Dependencies
- Radix UI Accordion component
- Existing Sheet component
- Shared navigation data structure

## Risks
- **Risk**: Performance with many accordion items
  - **Mitigation**: Radix UI is optimized, test on low-end devices
- **Risk**: Conflicts with existing mobile menu
  - **Mitigation**: Test thoroughly, preserve existing functionality

## Notes
- Maintain consistency with desktop navigation
- Use same color scheme and theming as desktop
- Ensure mobile menu remains fast and responsive
- Consider adding search to mobile menu in future iteration
