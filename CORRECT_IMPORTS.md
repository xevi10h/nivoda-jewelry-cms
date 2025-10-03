# ✅ Correct Apollo Client v4 Imports

## Critical: Import Rules for Apollo Client v4

### Rule #1: ALL React Hooks and Components from `/react`

```typescript
// ✅ CORRECT - Import from @apollo/client/react
import {
  useQuery,
  useMutation,
  useSubscription,
  useLazyQuery,
  ApolloProvider,
  type ApolloError
} from '@apollo/client/react';
```

```typescript
// ❌ WRONG - Will cause "does not provide an export" error
import { useQuery, useMutation, ApolloProvider } from '@apollo/client';
```

### Rule #2: Core Functionality from Main Package

```typescript
// ✅ CORRECT - Import from @apollo/client
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
  HttpLink,
  ApolloLink
} from '@apollo/client';
```

## Files Updated ✅

### 1. src/main.tsx
```typescript
import { ApolloProvider } from "@apollo/client/react";  // ✅ /react
import { apolloClient } from "./lib/apollo-client";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);
```

### 2. src/hooks/use-jewellery.ts
```typescript
import { useQuery, useMutation, type ApolloError } from '@apollo/client/react';  // ✅ /react
```

### 3. src/lib/apollo-client.ts
```typescript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';  // ✅ main package

const httpLink = createHttpLink({
  uri: 'http://localhost:3010/graphql-jewellery',  // ✅ Correct endpoint
});
```

### 4. src/graphql/queries.ts & mutations.ts
```typescript
import { gql } from '@apollo/client';  // ✅ main package
```

## Backend URL ✅

```typescript
uri: 'http://localhost:3010/graphql-jewellery'
```

NOT `http://localhost:3010/graphql`

## Summary of Changes

| File | Import | Package Path |
|------|--------|--------------|
| main.tsx | ApolloProvider | @apollo/client/react |
| use-jewellery.ts | useQuery, useMutation, ApolloError | @apollo/client/react |
| apollo-client.ts | ApolloClient, InMemoryCache, createHttpLink | @apollo/client |
| queries.ts | gql | @apollo/client |
| mutations.ts | gql | @apollo/client |

## To Apply Changes

1. **Clear Vite cache**:
   ```bash
   rm -rf node_modules/.vite
   ```

2. **Restart dev server**:
   ```bash
   npm run dev
   ```

3. **Hard refresh browser**:
   - Chrome/Edge: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Firefox: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)

## Verification

After restarting, you should see NO errors in the console about missing exports.

✅ All imports are now correct
✅ Backend URL is correct (`graphql-jewellery`)
✅ Ready to use!
