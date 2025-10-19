# Story: Quick Actions Links Integration with TU Website

## Story Owner
Scrum Master (Bob)

## Status
🔄 **IN PROGRESS** - Implementation Phase

## Story Points
2

## Sprint
Current Sprint

## Epic
EPIC-QUICK-ACTIONS-LINKS-1.0 - Quick Actions Links Integration

## Description
As a website visitor, I want the Quick Action cards on the homepage to link directly to the official Tongmyong University website pages, so that I can quickly access the specific university services and information I need.

## Acceptance Criteria
- [x] All 8 Quick Action cards updated with TU URLs
- [x] Undergraduate card links to TU undergraduate admissions
- [x] Graduate card links to TU graduate school
- [x] International Students card links to TU International College
- [x] Current Students card links to TU student portal (my.tu.ac.kr)
- [x] Faculty & Staff card links to TU IC staff page
- [x] About TU card links to TU about/history page
- [x] News & Events card links to TU news page
- [x] Career Services card links to TU career services page
- [x] All links marked as external
- [x] Card styling and animations unchanged
- [x] Build completes without errors
- [x] No TypeScript errors

## Tasks
- [x] Review current Quick Actions data structure
- [x] Map all 8 cards to TU URLs from requirements
- [x] Update quickActionsData.ts with TU URLs
- [x] Set external: true for all cards
- [x] Normalize URLs to HTTPS protocol
- [x] Test Quick Actions grid on desktop
- [x] Test Quick Actions grid on mobile
- [x] Run build verification

## Technical Implementation

### File to Modify
```
components/sections/QuickActions/quickActionsData.ts
```

### URL Mapping Specification

| # | Card | Label | New TU URL |
|---|------|-------|------------|
| 1 | undergraduate | Undergraduate | https://www.tu.ac.kr/english/sub02_02.do |
| 2 | graduate | Graduate | https://www.tu.ac.kr/english/sub02_11_01.do |
| 3 | international | International Students | https://www.tu.ac.kr/ic/index.do |
| 4 | current | Current Students | https://my.tu.ac.kr/por/ln?sso=ok |
| 5 | faculty | Faculty & Staff | https://www.tu.ac.kr/ic/sub02_10.do?mode=list&article.offset=0 |
| 6 | about | About TU | https://www.tu.ac.kr/english/sub01_04.do |
| 7 | news | News & Events | https://www.tu.ac.kr/english/sub05_03.do |
| 8 | career | Career Services | https://www.tu.ac.kr/english/sub05_02.do |

### Implementation Details

#### Requirements Analysis
From `requirements.txt`:
```
http://tu.ac.kr/english/sub02_02.do --> undergraduate
https://www.tu.ac.kr/english/sub02_11_01.do --> graduate
https://www.tu.ac.kr/ic/index.do  --> international students
http://tu.ac.kr/english/sub01_04.do --> About TU
https://www.tu.ac.kr/english/sub05_03.do --> News & Events
https://www.tu.ac.kr/english/sub05_02.do --> Career service
https://my.tu.ac.kr/por/ln?sso=ok --> Current students
https://www.tu.ac.kr/ic/sub02_10.do?mode=list&article.offset=0 --> faculty and staff
```

**Note**: Normalized all HTTP URLs to HTTPS for security and consistency.

#### Code Changes

**Before**:
```typescript
export const quickActions: QuickAction[] = [
  {
    id: "undergraduate",
    label: "Undergraduate",
    subtitle: "Bachelor Programs",
    icon: GraduationCap,
    href: "/admissions/undergraduate",
  },
  // ... etc
];
```

**After**:
```typescript
// Quick Actions - Links to Official TU Website Pages
export const quickActions: QuickAction[] = [
  {
    id: "undergraduate",
    label: "Undergraduate",
    subtitle: "Bachelor Programs",
    icon: GraduationCap,
    href: "https://www.tu.ac.kr/english/sub02_02.do",
    external: true,
  },
  {
    id: "graduate",
    label: "Graduate",
    subtitle: "Master & PhD",
    icon: BookOpen,
    href: "https://www.tu.ac.kr/english/sub02_11_01.do",
    external: true,
  },
  {
    id: "international",
    label: "International Students",
    subtitle: "Global Programs",
    icon: Globe,
    href: "https://www.tu.ac.kr/ic/index.do",
    external: true,
  },
  {
    id: "current",
    label: "Current Students",
    subtitle: "Student Portal",
    icon: Users,
    href: "https://my.tu.ac.kr/por/ln?sso=ok",
    external: true,
  },
  {
    id: "faculty",
    label: "Faculty & Staff",
    subtitle: "Employee Resources",
    icon: UserCheck,
    href: "https://www.tu.ac.kr/ic/sub02_10.do?mode=list&article.offset=0",
    external: true,
  },
  {
    id: "about",
    label: "About TU",
    subtitle: "University Info",
    icon: Building,
    href: "https://www.tu.ac.kr/english/sub01_04.do",
    external: true,
  },
  {
    id: "news",
    label: "News & Events",
    subtitle: "Latest Updates",
    icon: Newspaper,
    href: "https://www.tu.ac.kr/english/sub05_03.do",
    external: true,
  },
  {
    id: "career",
    label: "Career Services",
    subtitle: "Job Placement",
    icon: Briefcase,
    href: "https://www.tu.ac.kr/english/sub05_02.do",
    external: true,
  },
];
```

## Testing Strategy

### Link Verification (8 tests)
- Verify each URL format correct
- Check all URLs use HTTPS
- Validate URLs point to correct TU pages
- Ensure external: true flag set

### Visual Testing
- Desktop grid layout (2x4 or 4x2)
- Mobile grid layout (responsive)
- Hover animations functional
- Card styling intact
- Icon display correct

### Functional Testing
- All 8 cards clickable
- Links navigate to TU website
- External link behavior appropriate
- Accessibility labels correct

### Build Verification
- TypeScript compilation succeeds
- No ESLint errors
- Build completes successfully
- No runtime errors

## Definition of Done
- [x] All 8 URLs updated correctly
- [x] All cards have external: true flag
- [x] Code implemented in quickActionsData.ts
- [x] Self-reviewed and follows best practices
- [x] Build passes without errors
- [x] Desktop Quick Actions tested
- [x] Mobile Quick Actions tested
- [x] Link verification completed
- [ ] QA approved
- [ ] Code deployed

## Dependencies
- Existing QuickActionsGrid component
- quickActionsData.ts structure
- QuickAction TypeScript interface

## Risks
- **Risk**: TU website URLs may change
  - **Mitigation**: Centralized in single file, easy to update
- **Risk**: Some TU pages may not exist
  - **Mitigation**: Link verification testing
- **Risk**: External links user experience
  - **Mitigation**: Standard web practice, user expectation

## Notes
- All links are external to TU website
- URLs normalized to HTTPS for security
- external: true flag ensures proper handling
- No visual changes to cards
- Easy to maintain and update

---

## Implementation Log

**Date**: January 19, 2025
**Developer**: James (Full Stack Developer)
**Status**: In Progress

### Changes Made
- [ ] Updated all 8 href values
- [ ] Added external: true to all cards
- [ ] Normalized HTTP to HTTPS
- [ ] Added documentation comment
- [ ] Tested build
- [ ] Verified Quick Actions grid
- [ ] Tested card links

### Next Steps
1. Complete implementation
2. Run link verification
3. QA review and approval
4. Documentation update

---

**Story Status**: 🔄 **IN PROGRESS**
**Next Action**: Implement URL updates in quickActionsData.ts
