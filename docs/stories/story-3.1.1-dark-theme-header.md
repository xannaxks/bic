# Story 3.1.1: Update Dark Theme Header Color

## Story Owner
Scrum Master

## Status
Completed

## Story Points
1

## Sprint
Sprint 3

## Description
As a user viewing the site in dark mode, I want the header background to use the correct dark theme color (#020817) so that it matches the overall dark theme aesthetic.

## Acceptance Criteria
- [x] Dark theme header background changes from rgb(30,41,59) to #020817
- [x] Light theme header remains #005629 (unchanged)
- [x] Transition between themes is smooth
- [x] No visual glitches during theme switching

## Technical Implementation
**File**: `app/layout.tsx`
**Line**: 46

**Before**:
```tsx
<header className="sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-500 ease-in-out bg-[#005629] dark:bg-[rgb(30,41,59)]">
```

**After**:
```tsx
<header className="sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-500 ease-in-out bg-[#005629] dark:bg-[#020817]">
```

## Testing Notes
- ✅ Tested in light mode - header shows #005629
- ✅ Tested in dark mode - header shows #020817
- ✅ Tested theme switching - smooth transition
- ✅ Build completed without errors

## Related Files
- `app/layout.tsx`

## Definition of Done
- [x] Code implemented
- [x] Self-reviewed
- [x] Build passes
- [x] QA tested
- [x] Documentation updated
