# Design Guidelines: LGBTQ+ Friendly Housing Platform

## Design Approach: Reference-Based (Community Trust + Housing Discovery)

**Primary Inspiration:** Airbnb (housing listings & trust), Instagram (community reviews), and modern inclusive design principles

**Core Philosophy:** Create a welcoming, trustworthy space that celebrates diversity while maintaining professional credibility. The design should feel safe, inclusive, and empowering.

---

## Color Palette

### Light Mode
- **Primary Brand:** 280 65% 55% (Rich purple - dignity & pride)
- **Secondary:** 200 70% 50% (Vibrant teal - community & support)
- **Accent:** 330 75% 60% (Warm pink - pride & visibility)
- **Background:** 0 0% 98%
- **Surface:** 0 0% 100%
- **Text Primary:** 240 10% 15%
- **Text Secondary:** 240 5% 45%

### Dark Mode
- **Primary Brand:** 280 60% 65%
- **Secondary:** 200 65% 60%
- **Accent:** 330 70% 65%
- **Background:** 240 8% 12%
- **Surface:** 240 6% 16%
- **Text Primary:** 0 0% 95%
- **Text Secondary:** 240 5% 65%

---

## Typography

**Font Stack:**
- **Primary (Headings):** 'Plus Jakarta Sans' - Modern, friendly, professional
- **Secondary (Body):** 'Inter' - Exceptional readability, clean
- **Accent (Stats/Numbers):** 'Space Grotesk' - Technical precision

**Scale:**
- Hero Headings: text-5xl lg:text-7xl font-bold
- Section Headings: text-3xl lg:text-4xl font-semibold
- Card Titles: text-xl font-semibold
- Body: text-base leading-relaxed
- Captions: text-sm text-secondary

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 8, 12, 16 (p-2, gap-4, m-8, py-12, space-y-16)

**Container Strategy:**
- Full-width hero: w-full with max-w-7xl centered
- Content sections: max-w-6xl mx-auto
- Reading content: max-w-3xl

**Grid Patterns:**
- Listing cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Featured sections: grid-cols-1 lg:grid-cols-2 gap-12
- Resource cards: grid-cols-2 md:grid-cols-4 gap-4

---

## Component Library

### Navigation
- Sticky header with glass morphism effect (backdrop-blur-lg bg-surface/80)
- Logo left, nav center, auth/profile right
- Mobile: hamburger menu with slide-in drawer
- Search bar prominently integrated in header

### Hero Section
- Split layout: Left 60% (content), Right 40% (featured image/map preview)
- Gradient background overlay: from-primary/10 to-secondary/5
- Search widget embedded: Housing type filter + location search + price range
- Trust indicators: "50k+ Safe Listings" badge

### Listing Cards
- Image gallery carousel (3-5 images) with rounded-xl corners
- Pride flag micro-badge for verified LGBTQ+ friendly
- Quick stats: housing type icon, price (prominent), location, nearby resources count
- Star rating + review count
- Hover: subtle lift (translate-y-1 shadow-xl transition)

### Interactive Map
- Leaflet integration with custom markers
- Purple markers: Listings
- Rainbow-bordered markers: LGBTQ+ resources
- Cluster groups for dense areas
- Info popup cards matching listing card style

### Review System
- User avatar + name + verified badge
- 5-star rating visual
- Review text: max-w-prose
- Safety tags: "Trans-Friendly," "Couples Welcome," "Queer Roommate Friendly"
- Helpful vote buttons

### Resource Cards (LGBTQ+ Centers, Healthcare, etc.)
- Icon-first design with category color coding
- Distance indicator: "0.3 mi away"
- Operating hours + contact quick actions
- Map integration button

### Forms (Listing Creation)
- Multi-step wizard: Details → Photos → Amenities → Review
- Progress indicator bar
- Image upload: Drag-drop zone with preview grid
- Checkbox groups for amenities with inclusive icons
- Safety features section: clearly highlighted

### Trust & Safety Elements
- Verification badges (profile verified, ID checked, community endorsed)
- Report listing/user button (subtle but accessible)
- Community guidelines link in footer

---

## Images

**Hero Section:** 
Large, welcoming image showing diverse people in a comfortable living space or community gathering (60% coverage on desktop, full-width on mobile). Image should convey warmth, safety, and authentic diversity. Overlay with subtle gradient for text readability.

**Listing Photos:**
Each listing should display 3-5 high-quality interior/exterior photos in a carousel format. Primary image shows the main living space.

**Resource Cards:**
Icon-based rather than photos to maintain clarity and loading speed.

**About/Trust Section:**
Include a genuine photo of the team or community members to build human connection.

---

## Animations & Interactions

**Minimal & Purposeful:**
- Card hover: subtle elevation (shadow-md to shadow-xl)
- Button states: scale-95 on active
- Page transitions: fade-in opacity
- Map markers: gentle bounce on new results
- Loading states: pulse animation on skeleton screens

**NO excessive animations** - prioritize accessibility and performance

---

## Accessibility & Inclusive Design

- High contrast mode toggle
- Screen reader optimized labels for all icons
- Keyboard navigation fully supported
- Pride flag colors used respectfully (not overwhelming)
- Gender-neutral language throughout
- Alt text for all images describing diverse representation
- Focus indicators: 2px ring-primary offset-2

---

## Page-Specific Layouts

**Homepage:** Hero search → Featured listings (3-col grid) → How it works (3 steps) → LGBTQ+ resources preview → Community reviews → CTA section

**Listings Page:** Filter sidebar (left 25%) + Results grid (right 75%) + Map toggle view

**Listing Detail:** Image gallery → Details card → Amenities grid → Nearby resources map → Reviews section → Booking/Contact CTA

**User Dashboard:** Stats cards → My listings (grid) → Saved listings → Messages preview

---

## Design Distinctions

- **Avoid:** Generic purple-pink gradients everywhere
- **Instead:** Strategic color use - neutrals dominate, pride colors accent intentionally
- **Unique Element:** "Safety Score" visualization (5-point scale based on reviews, proximity to resources, host verification)
- **Community First:** Reviews and resource proximity are hero features, not afterthoughts