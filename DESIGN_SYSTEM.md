# Nivoda Jewelry CMS - Design System

## 🎨 Brand Identity

### Colors

The Nivoda CMS uses a refined black, white, and gray color palette that reflects the brand's professional and elegant identity.

#### Primary Colors

- **Nivoda Black**: `#0C0C0B` (HSL: 240 1% 5%)
  - Main brand color used for text, sidebar, and primary actions
  - Deep, sophisticated black that defines the Nivoda identity

- **White**: `#FFFFFF` (HSL: 0 0% 100%)
  - Clean backgrounds
  - Primary interface color for cards and content areas
  - Active navigation states

#### Gray Scale

- **Gray 100**: `hsl(0 0% 96%)` - Lightest gray for subtle backgrounds
- **Gray 200**: `hsl(0 0% 90%)` - Borders and inputs
- **Gray 300**: `hsl(0 0% 80%)` - Disabled states
- **Gray 400**: `hsl(0 0% 60%)` - Secondary text
- **Gray 500**: `hsl(0 0% 40%)` - Muted text
- **Gray 600**: `hsl(0 0% 25%)` - Strong secondary elements

#### Usage Guidelines

```css
/* Primary buttons and important actions */
background: var(--nivoda-black); /* Black */
color: white;

/* Sidebar */
background: var(--nivoda-black); /* Black sidebar */
text: white;

/* Active navigation */
background: white;
text: black;

/* Borders and dividers */
border: var(--nivoda-gray-200);
```

### Typography

#### Font Family

**Inter** - A modern, highly legible sans-serif font

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

#### Font Weights

- **Regular (400)**: Body text, form inputs
- **Medium (500)**: Emphasized text
- **SemiBold (600)**: Subheadings, important labels
- **Bold (700)**: Headings, titles

#### Type Scale

```css
/* Headings */
h1: font-size: 2rem (32px), font-weight: 600
h2: font-size: 1.5rem (24px), font-weight: 600
h3: font-size: 1.25rem (20px), font-weight: 600
h4: font-size: 1.125rem (18px), font-weight: 600

/* Body */
Base: font-size: 1rem (16px), font-weight: 400
Small: font-size: 0.875rem (14px)
Extra Small: font-size: 0.75rem (12px)
```

### Logos

#### Isotope Logo
- **File**: `/public/logo-isotope.png`
- **Usage**: Sidebar, small spaces
- **Dimensions**: 32x32px typical display
- **Treatment**: Inverted to white on dark backgrounds

#### Complete Logo
- **File**: `/public/logo-complete.svg`
- **Usage**: Login page, headers, large displays
- **Dimensions**: Height 32px typical (maintains aspect ratio)
- **Treatment**: Black on white backgrounds

## 📐 Layout & Spacing

### Spacing Scale

Based on 4px grid system:

```
4px   (0.25rem) - xs
8px   (0.5rem)  - sm
12px  (0.75rem) - md
16px  (1rem)    - base
24px  (1.5rem)  - lg
32px  (2rem)    - xl
48px  (3rem)    - 2xl
64px  (4rem)    - 3xl
```

### Border Radius

```css
--radius: 0.5rem (8px) - default
sm: calc(var(--radius) - 4px) = 4px
md: calc(var(--radius) - 2px) = 6px
lg: var(--radius) = 8px
```

### Shadows

```css
/* Elegant shadow for cards and elevated elements */
--shadow-elegant: 0 4px 20px -2px hsl(0 0% 0% / 0.08);
```

### Transitions

```css
/* Smooth transitions for all interactive elements */
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

## 🧩 Component Guidelines

### Sidebar

**Specifications:**
- Width: 256px (w-64)
- Background: Nivoda Black (#0C0C0B)
- Text: White/Off-white
- Active state: White background with black text
- Hover state: Slightly lighter black background

**Structure:**
```
┌─────────────────────────┐
│ Logo + Title            │
├─────────────────────────┤
│ Navigation Items        │
│   - Inventory           │
│   - Settings            │
│                         │
│                         │
├─────────────────────────┤
│ User Profile            │
│ Logout Button           │
└─────────────────────────┘
```

### Buttons

**Primary Button:**
```tsx
<Button className="bg-primary text-primary-foreground">
  Action
</Button>
```
- Background: Black
- Text: White
- Hover: Slightly lighter black

**Secondary Button:**
```tsx
<Button variant="secondary">
  Action
</Button>
```
- Background: Light gray
- Text: Black

**Ghost Button:**
```tsx
<Button variant="ghost">
  Action
</Button>
```
- Background: Transparent
- Hover: Light gray background

### Cards

```tsx
<Card className="shadow-elegant border-gray-200">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

- Background: White
- Border: Light gray (#E5E5E5)
- Shadow: Elegant shadow
- Radius: 8px

### Forms

**Input Fields:**
```tsx
<Input
  className="border-gray-200 focus:ring-black"
  placeholder="Enter text"
/>
```
- Background: White
- Border: Light gray
- Focus ring: Black
- Text: Nivoda black

**Labels:**
```tsx
<Label className="text-sm font-medium">
  Field Label
</Label>
```
- Font size: 14px
- Font weight: Medium (500)
- Color: Nivoda black

## 🎭 Page Examples

### Login Page

**Design:**
- Clean white background
- Centered card with shadow
- Nivoda complete logo at top
- Minimalist form design
- Black buttons

**Key Elements:**
- Logo height: 32px
- Card max-width: 448px (28rem)
- Form spacing: 16px between fields
- Button: Full width, black background

### Dashboard/Content Pages

**Layout:**
- Sidebar: 256px fixed left
- Main content: `ml-64` (margin-left: 256px)
- Background: White
- Content padding: 24px - 32px

## 🎨 CSS Variables Reference

### Light Mode (Default)

```css
--background: 0 0% 100%;           /* White */
--foreground: 240 1% 5%;           /* Nivoda Black */
--primary: 240 1% 5%;              /* Nivoda Black */
--primary-foreground: 0 0% 100%;   /* White */
--secondary: 0 0% 96%;             /* Light Gray */
--muted: 0 0% 96%;                 /* Light Gray */
--border: 0 0% 90%;                /* Border Gray */

/* Sidebar */
--sidebar-background: 240 1% 5%;   /* Nivoda Black */
--sidebar-foreground: 0 0% 95%;    /* Off-white */
--sidebar-accent: 0 0% 12%;        /* Hover state */
--sidebar-border: 0 0% 15%;        /* Border */
```

### Dark Mode

```css
--background: 0 0% 8%;             /* Dark background */
--foreground: 0 0% 95%;            /* Light text */
--primary: 0 0% 100%;              /* White (inverted) */
--primary-foreground: 240 1% 5%;   /* Black */
```

## 📱 Responsive Design

### Breakpoints

```css
sm: 640px   - Mobile
md: 768px   - Tablet
lg: 1024px  - Desktop
xl: 1280px  - Large desktop
2xl: 1400px - Extra large
```

### Mobile Considerations

- Sidebar becomes drawer/hamburger menu on mobile
- Touch targets minimum 44x44px
- Increased spacing for touch interfaces

## ♿ Accessibility

### Color Contrast

All color combinations meet WCAG AA standards:
- Black on white: 21:1 (AAA)
- Gray text on white: Minimum 4.5:1

### Focus States

- All interactive elements have visible focus states
- Focus ring: Black color with 2px offset

### Screen Readers

- Proper semantic HTML
- ARIA labels where needed
- Alt text for all images

## 🎯 Best Practices

### Do's ✅

- Use Inter font exclusively
- Maintain consistent spacing (4px grid)
- Use Nivoda black for primary actions
- Use elegant shadows sparingly
- Keep interfaces clean and minimal

### Don'ts ❌

- Don't use colors outside the defined palette
- Don't mix font families
- Don't use heavy shadows or gradients
- Don't clutter interfaces with unnecessary elements
- Don't use colored buttons (stick to black/white/gray)

## 🔄 Component States

### Interactive Elements

```
Default → Hover → Active → Disabled
```

**Button States:**
- Default: Black background, white text
- Hover: Slightly lighter black (12%)
- Active: Even lighter black (15%)
- Disabled: Light gray background, muted text

**Navigation States:**
- Default: Transparent, white text
- Hover: Slightly lighter black background
- Active: White background, black text
- Disabled: N/A

## 📦 Resources

### Files

- Fonts: `/public/fonts/Inter-*.ttf`
- Logos: `/public/logo-isotope.png`, `/public/logo-complete.svg`
- CSS: `/src/index.css`
- Config: `/tailwind.config.ts`

### Tools

- Tailwind CSS for utility classes
- shadcn/ui for component library
- Lucide React for icons

## 🎨 Design Philosophy

The Nivoda Jewelry CMS design embodies:

1. **Minimalism**: Clean, uncluttered interfaces
2. **Elegance**: Refined black and white palette
3. **Professionalism**: Business-focused design
4. **Clarity**: Easy to read, easy to use
5. **Consistency**: Unified experience throughout

---

*This design system ensures a cohesive, professional, and elegant user experience across the Nivoda Jewelry CMS.*
