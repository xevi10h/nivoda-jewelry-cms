# Authentication System Documentation

## Overview

This CMS now includes a complete authentication system that integrates with your existing Nivoda authentication service. The system supports:

- Email/password login
- Two-factor authentication (2FA)
- Session management with localStorage
- Protected routes
- Automatic token injection into GraphQL requests
- User profile display
- Secure logout

## Setup

### 1. Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Configure the following variables:

```env
# Authentication Service URL (the GraphQL endpoint for login)
VITE_AUTH_API_URL=http://localhost:3000/graphql-public

# Main API URL (your CMS GraphQL endpoint - token auto-injected)
VITE_MAIN_API_URL=http://localhost:3000/graphql
```

### 2. Install Dependencies

All required dependencies are already in `package.json`. If you need to reinstall:

```bash
npm install
```

### 3. Run the Application

```bash
npm run dev
```

## Architecture

### Files Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # React context for authentication state
├── lib/
│   ├── auth.ts                  # Session storage utilities
│   ├── authClient.ts            # Apollo Client for auth service
│   └── apolloClient.ts          # Main Apollo Client with auth token
├── components/
│   ├── ProtectedRoute.tsx       # Route wrapper for authenticated pages
│   └── Sidebar.tsx              # Updated with logout and user info
└── pages/
    └── Login.tsx                # Login page with 2FA support
```

### Key Components

#### 1. Authentication Context (`src/contexts/AuthContext.tsx`)

Manages global authentication state:
- `session`: Current user session
- `isAuthenticated`: Boolean flag
- `isLoading`: Loading state during initialization
- `login(session)`: Save session
- `logout()`: Clear session

Usage:
```tsx
import { useAuth } from '@/contexts/AuthContext';

const { session, isAuthenticated, login, logout } = useAuth();
```

#### 2. Session Storage (`src/lib/auth.ts`)

Utilities for managing session in localStorage:
- `sessionStorage.get()`: Retrieve session (null if expired)
- `sessionStorage.set(session)`: Save session
- `sessionStorage.clear()`: Remove session
- `sessionStorage.getToken()`: Get auth token

#### 3. Auth Client (`src/lib/authClient.ts`)

Separate Apollo Client for authentication requests to `graphql-public` endpoint.

Exports:
- `authenticateUser(username, password, twofactorauth?)`: Login function
- `AUTHENTICATE_USER`: GraphQL query matching your schema

#### 4. Main Apollo Client (`src/lib/apolloClient.ts`)

Apollo Client for CMS operations with automatic token injection:
```tsx
import apolloClient from '@/lib/apolloClient';

// Token is automatically added to all requests
const { data } = await apolloClient.query({
  query: YOUR_QUERY,
});
```

#### 5. Protected Route (`src/components/ProtectedRoute.tsx`)

Wraps routes requiring authentication. Redirects to `/login` if not authenticated.

#### 6. Login Page (`src/pages/Login.tsx`)

Features:
- Email/password form
- 2FA code input (6-digit OTP)
- Error handling for all cases:
  - `NEED_2FA`: Shows 2FA input
  - `2FA_WRONG`: Invalid 2FA code
  - `INVALID`: Invalid credentials
  - `NOT_ALLOWED`: Access denied
- Loading states
- Automatic redirect after login

#### 7. Sidebar (`src/components/Sidebar.tsx`)

Updated with:
- User profile display (name, email, avatar)
- Logout button at bottom
- Smooth logout with redirect to login

## How It Works

### Login Flow

1. User enters email and password on `/login`
2. System calls `authenticateUser()` with credentials
3. If 2FA required, user enters 6-digit code
4. On success:
   - Session saved to localStorage
   - User redirected to `/`
   - Token added to all subsequent requests
5. On error:
   - Appropriate error message displayed

### Protected Routes

```tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

- Checks `isAuthenticated` from AuthContext
- Shows loading spinner while checking
- Redirects to `/login` if not authenticated
- Renders component if authenticated

### Token Management

The authentication token is automatically included in all GraphQL requests to your main API:

```tsx
// In your components, just use the client normally
import apolloClient from '@/lib/apolloClient';

const { data } = await apolloClient.query({
  query: gql`
    query GetInventory {
      inventory {
        id
        name
      }
    }
  `,
});
// Authorization header is automatically added
```

### Session Persistence

- Sessions stored in localStorage
- Automatically loaded on app startup
- Expires based on `expires` timestamp from server
- Cleared on logout or expiration

### Logout Flow

1. User clicks "Logout" in sidebar
2. Session cleared from state and localStorage
3. User redirected to `/login`
4. All protected routes now redirect to login

## Testing the Authentication

### Test Credentials

Use the example from your curl request:
- Email: `tushar1@nivoda.net`
- Password: `Nivoda123`

### Testing 2FA

If the account has 2FA enabled:
1. Enter email and password
2. System will prompt for 6-digit code
3. Enter code from authenticator app
4. Login completes

### API Response Format

The authentication response matches your schema:

```json
{
  "authenticate": {
    "username_and_password": {
      "token": "eyJhbGc...",
      "expires": 1234567890,
      "user": {
        "id": "123",
        "firstName": "Tushar",
        "lastName": "Doe",
        "email": "tushar1@nivoda.net",
        "role": "ADMIN",
        "country": "GB",
        "company": {
          "id": "456",
          "name": "Test Company",
          "api_type": "STANDARD"
        }
      },
      "zendesk_token": "...",
      "b2c_token": "..."
    }
  }
}
```

## Security Considerations

1. **Token Storage**: Tokens stored in localStorage (consider httpOnly cookies for production)
2. **Expiration**: Sessions expire based on server-provided timestamp
3. **HTTPS**: Always use HTTPS in production
4. **Token Refresh**: Consider implementing refresh token logic
5. **CORS**: Ensure your backend allows requests from the frontend origin

## Customization

### Change API Endpoints

Edit `.env`:
```env
VITE_AUTH_API_URL=https://api.nivoda.net/graphql-public
VITE_MAIN_API_URL=https://api.nivoda.net/graphql
```

### Customize Session Duration

The session duration is controlled by the backend's `expiresInSeconds` parameter (default: 24 hours).

### Add More User Info

Update the GraphQL fragments in `src/lib/authClient.ts`:

```tsx
const GATEWAY_USER_FRAGMENT = gql`
  fragment GatewayUser on User {
    id
    firstName
    lastName
    email
    role
    # Add more fields here
    phoneNumber
    avatar
  }
`;
```

### Style the Login Page

Edit `src/pages/Login.tsx` to customize the appearance.

## Troubleshooting

### "CORS Error"
- Ensure your backend allows requests from your frontend origin
- Check backend CORS configuration

### "Session not persisting"
- Check browser localStorage
- Verify token expiration timestamp
- Check for localStorage quota issues

### "Token not being sent"
- Verify `VITE_MAIN_API_URL` is set correctly
- Check browser Network tab for Authorization header
- Ensure you're using `apolloClient` from `src/lib/apolloClient.ts`

### "2FA not working"
- Verify the 6-digit code is current
- Check authenticator app time sync
- Ensure `twofactorauth` parameter is being sent

## Future Enhancements

Consider implementing:
- [ ] Refresh token logic
- [ ] "Remember me" functionality
- [ ] Password reset flow
- [ ] Session timeout warnings
- [ ] Multiple device session management
- [ ] Audit logging for logins
