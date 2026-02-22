# Synthesizer Portfolio - Specification Document

## 1. Project Overview

**Project Name:** Hisham Synth Portfolio  
**Type:** Single-page portfolio website  
**Core Functionality:** Showcase synthesizer playing skills through a sophisticated black-and-white piano-inspired design  
**Target Users:** Music industry professionals, event organizers, fans seeking to discover the artist

---

## 2. UI/UX Specification

### Layout Structure

**Sections (in order):**
1. **Hero** - Full viewport intro with artist name and tagline
2. **About** - Brief bio with single featured image
3. **Gallery** - Video grid showcasing synthesizer performances
4. **Contact** - Simple contact section

**Responsive Breakpoints:**
- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (2 columns for gallery)
- Desktop: > 1024px (3 columns for gallery)

### Visual Design

**Color Palette:**
- Primary Background: `#0A0A0A` (near black)
- Secondary Background: `#141414` (dark gray)
- Card Background: `#1A1A1A` (slightly lighter)
- Primary Text: `#FAFAFA` (off-white)
- Secondary Text: `#A3A3A3` (muted gray)
- Accent: `#FFFFFF` (pure white for emphasis)
- Piano Black Keys: `#0D0D0D`
- Piano White Keys: `#F5F5F5`

**Typography:**
- Headings: `Cormorant Garamond` (elegant, classical feel)
- Body: `Inter` (clean, readable)
- Hero Name: 72px desktop / 48px mobile, font-weight 300
- Section Titles: 36px, font-weight 400, letter-spacing 0.15em uppercase
- Body Text: 16px, line-height 1.7

**Spacing System:**
- Section Padding: 120px vertical desktop / 80px mobile
- Container Max Width: 1200px
- Grid Gap: 24px
- Component Padding: 32px

**Visual Effects:**
- Subtle grain texture overlay on backgrounds
- Vignette effect on hero
- Hover states: subtle brightness shift (not animate)
- Video thumbnails with play button overlay
- Piano key pattern decorative elements

### Components

**Navigation:**
- Fixed top, transparent background that gains opacity on scroll
- Logo/Name on left
- Simple text links on right (About, Gallery, Contact)
- No hamburger menu needed (only 3 links)

**Hero Section:**
- Full viewport height
- Centered text with artist name
- Subtle pulsing glow effect on text (CSS only, no animation)
- Down arrow indicator at bottom

**Gallery Grid:**
- Videos displayed in responsive grid
- Each video card has:
  - Thumbnail from video
  - Play icon overlay on hover
  - Video plays inline on click
- Image displayed prominently

**Contact Section:**
- Simple email link
- Social links (icons only)

---

## 3. Functionality Specification

### Core Features

1. **Smooth Scrolling** - Native CSS smooth scroll behavior
2. **Video Playback** - Click to play, click outside to pause
3. **Navigation** - Smooth scroll to sections
4. **Responsive Design** - Adapts to all screen sizes

### User Interactions

- **Hover on video cards:** Subtle brightness increase, cursor pointer
- **Click on video:** Plays the video inline
- **Click outside video:** Pauses video
- **Navigation links:** Smooth scroll to section
- **Scroll:** Navigation background gains subtle opacity

### Edge Cases

- Videos should have poster images for loading state
- Handle case where videos fail to load gracefully
- Fallback for image loading

---

## 4. Technical Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Fonts:** Google Fonts (Cormorant Garamond, Inter)
- **Media:** Local assets in public folder

---

## 5. Acceptance Criteria

1. Page loads in under 2 seconds
2. All 10 videos and 1 image are displayed
3. Black and white piano theme is evident throughout
4. No animations (CSS transitions for hover states only)
5. Fully responsive on mobile, tablet, desktop
6. Navigation smoothly scrolls to sections
7. Videos can be played inline
8. Design feels sophisticated and elegant
9. No console errors
10. Build completes successfully
