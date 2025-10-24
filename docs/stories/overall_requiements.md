# 🎯 Project: Tongmyong University Website — UI/UX & Visual Design Revamp

## 🧩 Objective
Enhance the overall **visual clarity, consistency, and usability** of the Tongmyong University homepage while preserving its existing structure and content.  
The goal is to create a **modern, professional, and academic look** aligned with international university standards.

---

## 🪞 1. General Design Principles

| Aspect | Requirements |
|--------|---------------|
| **Color Palette** | Use the official green (`#007a33` / `#005826`) as a brand accent. Neutrals: `#ffffff`, `#f5f7f8`, `#0b0f13`, `#1a1f24`. Ensure WCAG-compliant contrast (≥ 4.5:1). |
| **Typography** | Use a clean sans-serif font (e.g., *Inter*, *Noto Sans KR*, or *Open Sans*). <br> Headings: `700` weight, Body: `400–500`. <br> Line height: `1.5–1.8`. |
| **Icons** | Use simple line icons with a single accent color. Ensure consistent size and padding. |
| **Animations** | Apply minimal, 150–250 ms transitions for hover states and dropdowns. Avoid heavy motion. |
| **Responsiveness** | Must be fully responsive across desktop, tablet, and mobile. Follow a grid-based layout system (e.g., 12-column). *(Implementation not covered here.)* |

---

## 🧭 2. Navbar & Dropdown Menu

### 🟩 Functional Goals
- Improve **readability** and **visual contrast** of dropdown items.  
- Maintain brand identity through green accent usage.  
- Provide a professional and calm academic tone.

### 🔧 Design Requirements

| Component | Specification |
|------------|----------------|
| **Navbar background** | Use translucent dark background with blur:  <br>`background-color: rgba(0, 0, 0, 0.75);`<br>`backdrop-filter: blur(10px);` |
| **Dropdown background** | Dark theme dropdown: `#0b0f13`. <br>Light mode alternative (optional): `#ffffff`. |
| **Text color** | Default: `#e8f5e9` (light greenish white). <br>Hover: `#40ff96` (bright accent). |
| **Icons** | Default: `filter: brightness(1.3)`; hover: `brightness(2)`. |
| **Padding** | `0.75rem 1.25rem` for each item. |
| **Corner radius** | `0.5rem` (for dropdown box). |
| **Box shadow** | `0 8px 24px rgba(0, 0, 0, 0.2);` |
| **Hover background** | `rgba(255, 255, 255, 0.05);` |
| **Dropdown animation** | Fade & slight slide-down (150 ms ease-in-out). |
| **Accessibility** | Keyboard navigable (`Tab`, `Enter`, `Esc` support). Maintain at least 4.5:1 contrast ratio. |

---

## ⚡ 3. Quick Access Section

| Requirement | Description |
|-------------|--------------|
| **Layout** | Use a 2x4 grid (desktop) and 2x2 or 1x4 (mobile). |
| **Card Design** | White background, soft shadow (`0 2px 8px rgba(0,0,0,0.1)`), rounded corners (`12px`). |
| **Hover State** | Slight upward motion (`transform: translateY(-3px)`), accent border (`#007a33`). |
| **Icon Styling** | Use SVG line icons (32 px). Accent color on hover. |
| **Typography** | Titles bold, 16–18 px; descriptions optional, muted gray (`#555`). |

---

## 🧠 4. “Why Choose Tongmyong University” Section

| Requirement | Description |
|-------------|-------------|
| **Layout** | 4 equal cards horizontally aligned (wrap on mobile). |
| **Card Background** | White or light gray (`#f5f7f8`). |
| **Icons** | Colored green (`#007a33`) with circle backdrop (`#e8f5e9`). |
| **Text** | Heading: 18–20 px bold; Subtext: muted gray. |
| **Spacing** | Top and bottom padding: `4rem`. |
| **Animation** | Fade-in with slight delay for each card (50 ms stagger). |

---

## 📰 5. Latest News & Media

| Requirement | Description |
|-------------|-------------|
| **Card Layout** | Uniform grid with 2–3 columns (desktop). |
| **Hover** | Slight zoom on thumbnail (`scale(1.02)`), shadow intensifies. |
| **“Read more”** | Use arrow → animation (`translateX(4px)` on hover). |
| **Typography** | Use same heading and body sizes as Quick Access. |
| **Video Thumbnails** | Maintain 16:9 aspect ratio, corner radius `10px`. |

---

## 🧱 6. Spacing & Structure

| Element | Spacing Guidelines |
|----------|-------------------|
| **Section padding** | `80px 0` (desktop), `48px 0` (mobile). |
| **Content container** | Max-width: `1280px`, centered. |
| **Card spacing** | Gap: `24px` between cards (desktop), `16px` (mobile). |
| **Font hierarchy** | `h2`: 2.25 rem; `h3`: 1.5 rem; `p`: 1rem. |

---

## 🧩 7. Accessibility & Performance

- Maintain **contrast ratio ≥ 4.5:1** for text vs background.  
- All interactive elements must have **focus states**.  
- Ensure dropdowns are **keyboard navigable**.  
- Use **lazy-loading** for heavy images and videos.  
- Optimize all images (WebP or AVIF) to stay under 300 KB where possible.

---

## ✅ Deliverables

1. Updated CSS/SCSS for navbar, dropdowns, and cards.  
2. Updated HTML structure (semantic + ARIA attributes).  
3. Design consistency sheet (colors, typography, spacing).  
4. Visual mockup (Figma / image preview) for confirmation before coding.
