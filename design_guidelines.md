# Learning Resource Management System (LRMS) Design Guidelines

## Design Approach
**Material Design Principles** - This academic platform prioritizes clarity, efficiency, and information hierarchy. Material Design's card-based system and structured layouts perfectly suit resource browsing and management interfaces.

## Typography System

**Font Family:** Inter (Google Fonts)
- Headings (h1): 2.5rem, font-weight 700
- Headings (h2): 2rem, font-weight 600
- Headings (h3): 1.5rem, font-weight 600
- Body text: 1rem, font-weight 400
- Small text/metadata: 0.875rem, font-weight 400
- Buttons/CTAs: 0.9375rem, font-weight 500

## Layout System

**Spacing Scale:** Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Component padding: p-6 or p-8
- Section spacing: py-12 to py-20
- Card gaps in grids: gap-6
- Form field spacing: space-y-4

**Container Strategy:**
- Max width: max-w-7xl for main content
- Navigation: full-width with inner max-w-7xl
- Forms: max-w-2xl centered

## Component Library

### Navigation Bar
- Full-width sticky header with subtle shadow
- Logo/title on left, navigation links center-right
- Include: Home, Browse Resources, Upload, About
- Search bar integrated in navbar (right side)
- Dark/Light mode toggle icon button (far right)
- Mobile: Hamburger menu with slide-in drawer

### Homepage
**Hero Section:**
- Clean, centered layout (no background image needed)
- Large h1 title with tagline below
- Three prominent CTA cards in grid (Browse, Upload, About) with icons and short descriptions
- Stats section below: Display metrics (e.g., "500+ E-books", "200+ Research Papers", "150+ Lecture Notes", "50+ Videos")
- Height: Natural content height, not forced viewport

### Resource Cards
- Card-based layout with soft shadows (shadow-md on hover: shadow-lg)
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Each card contains:
  - Icon representing resource type (top)
  - Title (h3)
  - Author name (small text, muted)
  - Resource type badge
  - Description snippet (2 lines max)
  - View/Download buttons at bottom
- Consistent card padding: p-6
- Rounded corners: rounded-lg

### Category Navigation
- Pill-style category buttons in horizontal scroll/wrap layout
- Active category has distinct styling
- Include counts: "E-books (45)", "Research Papers (23)"
- Sticky below main navbar when scrolling

### Upload Form
- Single column form layout (max-w-2xl)
- Clear field labels above inputs
- Input fields with borders and focus states
- Dropdown with custom styling for resource type
- File upload area: Dashed border drop zone with upload icon
- Success message: Toast notification (top-right) or inline confirmation card

### Search & Filter
- Search bar with icon (magnifying glass)
- Live search feedback as user types
- Filter dropdown integrated next to search
- Clear filters button when active

### Footer
- Three-column layout on desktop, stacked on mobile
- Column 1: About LRMS brief
- Column 2: Quick links (Browse, Upload, About, Contact)
- Column 3: Social/contact info placeholder
- Copyright notice at bottom center

## Images

**Homepage Stats Section:** Include 4 icon illustrations representing different resource types (book, document, video, audio) - decorative, not photographic
**About Page:** Consider a single feature illustration showing students/faculty collaborating with digital resources - modern, flat illustration style

**No large hero images needed** - This is a utility-focused application where clarity and efficiency take precedence over visual storytelling.

## Interaction Patterns

### Dark/Light Mode
- Toggle button in navbar (sun/moon icon)
- Persist preference in localStorage
- Smooth transition between modes (transition-colors duration-200)

### Resource Actions
- Primary button: View/Open resource
- Secondary button: Download
- Icon buttons for additional actions (bookmark, share)

### Loading States
- Skeleton screens for resource cards while loading
- Spinner for form submissions

## Responsive Behavior

**Mobile (< 768px):**
- Single column cards
- Stacked navigation in drawer
- Search bar moves below navbar or in expandable field
- Touch-friendly button sizes (min-height: 44px)

**Tablet (768px - 1024px):**
- Two-column resource grid
- Condensed navbar with some items in dropdown

**Desktop (> 1024px):**
- Three-column resource grid
- Full horizontal navigation
- Sidebar filters alongside content on Resources page

## Accessibility
- Maintain WCAG AA contrast ratios
- Focus indicators on all interactive elements (ring-2 ring-offset-2)
- Semantic HTML throughout
- ARIA labels for icon-only buttons
- Keyboard navigation support for all interactive elements