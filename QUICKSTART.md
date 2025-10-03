# Quick Start Guide - Authentication System

## 🚀 Get Started in 3 Steps

### Step 1: Configure Environment

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and set your API endpoints:

```env
VITE_AUTH_API_URL=http://localhost:3000/graphql-public
VITE_MAIN_API_URL=http://localhost:3000/graphql
```

### Step 2: Start the Development Server

```bash
npm run dev
```

### Step 3: Login

1. Navigate to `http://localhost:5173`
2. You'll be redirected to `/login`
3. Enter your credentials:
   - Email: `your-email@nivoda.net`
   - Password: `your-password`
4. If 2FA is enabled, enter your 6-digit code
5. Click "Sign In"

## ✅ What's Included

- ✅ Login page with email/password
- ✅ Two-factor authentication (2FA) support
- ✅ Session management (localStorage)
- ✅ Protected routes (auto-redirect if not logged in)
- ✅ User profile in sidebar
- ✅ Logout functionality
- ✅ Automatic token injection in GraphQL requests
- ✅ Error handling for all login scenarios

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/pages/Login.tsx` | Login page with 2FA |
| `src/contexts/AuthContext.tsx` | Auth state management |
| `src/lib/authClient.ts` | Authentication GraphQL client |
| `src/lib/apolloClient.ts` | Main API client (with auth token) |
| `src/components/ProtectedRoute.tsx` | Route protection wrapper |
| `src/components/Sidebar.tsx` | User info & logout button |

## 🔐 Using Authentication in Your Code

### Get Current User Info

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { session, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    console.log(session.user.firstName); // User's first name
    console.log(session.user.email);     // User's email
    console.log(session.user.role);      // User's role
  }
}
```

### Make Authenticated API Requests

```tsx
import apolloClient from '@/lib/apolloClient';
import { gql } from '@apollo/client';

// Token is automatically included!
const { data } = await apolloClient.query({
  query: gql`
    query GetInventory {
      jewelry {
        id
        name
      }
    }
  `,
});
```

### Logout User

```tsx
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
}
```

## 🛡️ Protecting Routes

Wrap any route that requires authentication:

```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute';

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

## 📝 Test Login

Use your Nivoda credentials. Example from the provided curl:
- Email: `tushar1@nivoda.net`
- Password: `Nivoda123`

## 🐛 Troubleshooting

### "Network Error"
- Ensure your backend is running
- Check `VITE_AUTH_API_URL` in `.env`
- Verify CORS is enabled on backend

### "Invalid credentials"
- Double-check email and password
- Ensure user exists in database
- Check backend logs for errors

### "Not redirecting after login"
- Check browser console for errors
- Verify `navigate('/')` is being called
- Check if routes are properly protected

### Session not persisting
- Check browser localStorage (DevTools → Application → Local Storage)
- Verify token expiration time
- Clear localStorage and try again

## 📚 Full Documentation

See [AUTHENTICATION.md](./AUTHENTICATION.md) for complete documentation.

## 🎨 Customization

### Change Login Page Styling

Edit `src/pages/Login.tsx` - it uses shadcn/ui components:
- `Card`, `CardHeader`, `CardContent`
- `Button`, `Input`, `Label`
- `Alert` for errors

### Add More User Fields

Update `GatewayUser` fragment in `src/lib/authClient.ts`:

```tsx
fragment GatewayUser on User {
  id
  firstName
  lastName
  email
  role
  phoneNumber  // Add this
  avatar       // Add this
}
```

### Change Session Duration

Backend controls this via `expiresInSeconds` parameter (default: 24 hours).

## 🔄 Next Steps

1. ✅ Authentication is working
2. Create your CMS features (inventory, orders, etc.)
3. Use `apolloClient` for all API calls
4. User info available via `useAuth()`
5. All routes are protected by default

## 📞 Support

For issues or questions, check:
- `AUTHENTICATION.md` - Full documentation
- Browser DevTools Console - Error messages
- Network Tab - API request/response
- Backend logs - Server-side errors
