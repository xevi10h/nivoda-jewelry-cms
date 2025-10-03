# Sidebar & Profile Features

## 🎯 Overview

The Nivoda Jewelry CMS now features an intelligent hover-expandable sidebar and a comprehensive user profile page.

## 🔄 Expandable Sidebar

### Behavior

The sidebar automatically expands and collapses based on mouse interaction:

- **Compact Mode**: 80px wide (w-20) - Shows only icons
- **Expanded Mode**: 256px wide (w-64) - Shows icons + labels
- **Transition**: Smooth 300ms animation when hovering

### Features

**Compact State (Default):**
- Nivoda isotope logo
- Navigation icons only
- User avatar icon
- Logout icon

**Expanded State (On Hover):**
- Full logo with "Jewelry CMS" title
- Navigation labels appear
- User name and email visible
- Logout button with text

### Technical Implementation

```tsx
// Sidebar state management
const [isExpanded, setIsExpanded] = useState(false);

// Hover handlers
onMouseEnter={() => setIsExpanded(true)}
onMouseLeave={() => setIsExpanded(false)}

// Conditional width
className={isExpanded ? 'w-64' : 'w-20'}
```

### Animations

All elements use smooth transitions:
- Width changes: `transition-all duration-300 ease-in-out`
- Opacity fades: Labels fade in/out
- No layout shift: Icons remain in fixed positions

## 👤 User Profile Page

### Access

Click on the user profile section at the bottom of the sidebar to navigate to `/profile`.

### Profile Sections

#### 1. Personal Information
Displays:
- Full Name (First + Last)
- Email Address
- Country
- Role (with badge)
- User ID

#### 2. Company Information
Shows (if available):
- Company Name
- Company ID
- API Type (with badge)

#### 3. Session Information
Includes:
- Session Expiration Date/Time
- Session Status (Active badge)
- Connected Services:
  - Zendesk (if token present)
  - B2C Portal (if token present)

#### 4. Required Steps
Displays any pending actions required for the account (if applicable).

#### 5. Session Data (Debug)
Complete JSON view of the session for troubleshooting.

### Layout

```
Profile Page Structure:
┌─────────────────────────────────┐
│ Profile Header                  │
│ "View and manage your account"  │
├─────────────────────────────────┤
│ Personal Information Card       │
│  - Name, Email, Country, Role   │
├─────────────────────────────────┤
│ Company Information Card        │
│  - Company details              │
├─────────────────────────────────┤
│ Session Information Card        │
│  - Expires, Status, Services    │
├─────────────────────────────────┤
│ Session Data (Debug)            │
│  - Full JSON                    │
└─────────────────────────────────┘
```

## 🎨 Design Details

### Sidebar Icons

**Compact Mode:**
- Logo: 40x24px
- Navigation icons: 16x16px (w-4 h-4)
- User avatar: 32x32px (w-8 h-8)
- Logout icon: 16x16px

**Spacing:**
- Compact padding: Centered icons
- Expanded padding: 16px horizontal

### Profile Page

**Cards:**
- White background with elegant shadow
- Border: Light gray (#E5E5E5)
- Spacing: 24px between cards
- Max width: 1280px (5xl)

**Icons:**
- Section headers: 24x24px (w-6 h-6)
- Field labels: 16x16px (w-4 h-4)
- Colored backgrounds for visual hierarchy

**Typography:**
- Page title: 3xl (30px), semibold
- Card titles: Default size, semibold
- Labels: Small (14px), medium weight
- Values: Base (16px), medium weight

## 💡 User Experience

### Sidebar Interaction

1. **Default State**: User sees compact sidebar with icons
2. **Hover**: Mouse enters sidebar area
3. **Expansion**: Sidebar smoothly expands showing full labels
4. **Navigation**: User can click navigation items or profile
5. **Collapse**: Mouse leaves sidebar, returns to compact mode

### Profile Navigation

1. **Access**: Click user profile section in sidebar
2. **Navigate**: Redirects to `/profile` page
3. **View**: See all session and account information
4. **Return**: Use navigation or browser back button

## 🔧 Technical Features

### Responsive Behavior

**Main Content Area:**
- Adjusts with sidebar: `ml-20` (margin-left: 80px)
- Sidebar overlays content when expanded
- Z-index: Sidebar has `z-50` to stay on top

**Smooth Transitions:**
- All width changes animated
- Labels fade in/out smoothly
- No jarring layout shifts

### State Management

```tsx
// Sidebar component maintains local state
const [isExpanded, setIsExpanded] = useState(false);

// Profile uses global auth context
const { session } = useAuth();
```

### Protected Routes

Both features are protected:
```tsx
<Route path="/profile" element={
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
} />
```

## 📱 Accessibility

### Keyboard Navigation

- All interactive elements focusable
- Profile button accessible via keyboard
- Proper focus indicators

### Screen Readers

- Semantic HTML structure
- Proper ARIA labels
- Alt text for logos
- Descriptive button labels

### Visual Hierarchy

- Clear section headings
- Consistent spacing
- High contrast text
- Icon + label combinations

## 🎯 Use Cases

### Sidebar

**Scenario 1: Quick Navigation**
- User wants to switch between sections
- Hovers sidebar → sees labels → clicks
- Fast, efficient navigation

**Scenario 2: More Screen Space**
- User working on content
- Sidebar stays compact (80px)
- Maximizes workspace

**Scenario 3: Exploration**
- New user discovering features
- Hovers sidebar → sees all options
- Self-documenting interface

### Profile Page

**Scenario 1: Verify Account Details**
- User checks email/company info
- Quick reference for account details
- No need to contact support

**Scenario 2: Session Management**
- User checks when session expires
- Verifies active status
- Plans work accordingly

**Scenario 3: Troubleshooting**
- User encounters an issue
- Views session data
- Provides to support team

**Scenario 4: Integration Status**
- User checks connected services
- Verifies Zendesk/B2C connection
- Confirms access tokens

## 🔐 Security Considerations

### Session Data Display

- User can only see their own data
- Protected route requires authentication
- No sensitive token values displayed (only presence)

### Privacy

- Email and personal info visible only to user
- Company info restricted to authenticated users
- No external data exposure

## 📊 Data Structure

### Session Object

```typescript
interface Session {
  token: string;
  expires: number;
  refresh_token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    country: string;
    steps_required?: string[];
    company?: {
      id: string;
      name: string;
      api_type?: string;
    };
  };
  company_settings?: any;
  hubspot_token?: string;
  zendesk_token?: string;
  b2c_token?: string;
}
```

## 🎨 Customization

### Adjust Sidebar Width

```tsx
// In Sidebar.tsx
isExpanded ? 'w-64' : 'w-20'  // Current: 256px / 80px

// Customize:
isExpanded ? 'w-72' : 'w-16'  // 288px / 64px
```

### Change Expansion Speed

```css
/* Current: 300ms */
transition-all duration-300

/* Faster: */
transition-all duration-200

/* Slower: */
transition-all duration-500
```

### Modify Profile Layout

Edit `/src/pages/Profile.tsx`:
- Add/remove card sections
- Change grid layouts
- Customize information display
- Add action buttons

## 🚀 Future Enhancements

Potential improvements:

- [ ] Edit profile information
- [ ] Change password functionality
- [ ] Profile picture upload
- [ ] Activity log
- [ ] Notification preferences
- [ ] Two-factor authentication setup
- [ ] API key management
- [ ] Session history
- [ ] Connected device list
- [ ] Preference settings

## 📝 Component Files

- **Sidebar**: `/src/components/Sidebar.tsx`
- **Profile Page**: `/src/pages/Profile.tsx`
- **Layout**: `/src/components/Layout.tsx`
- **Auth Context**: `/src/contexts/AuthContext.tsx`
- **Routes**: `/src/App.tsx`

---

*These features enhance the user experience with intelligent space management and comprehensive account visibility.*
