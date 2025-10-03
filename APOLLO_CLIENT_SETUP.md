# Apollo Client v4 Setup & Troubleshooting

## ⚠️ Important: Correct Import Paths

Apollo Client v4 has a specific module structure. You **must** import hooks from the correct path:

### ✅ Correct Imports

```typescript
// For React hooks (useQuery, useMutation, etc.)
import { useQuery, useMutation, type ApolloError } from '@apollo/client/react';

// For core functionality (ApolloClient, InMemoryCache, gql, etc.)
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';

// For Apollo Provider
import { ApolloProvider } from '@apollo/client/react';
```

### ❌ Incorrect Imports (will cause errors)

```typescript
// DON'T DO THIS - will cause "does not provide an export named 'useMutation'" error
import { useQuery, useMutation } from '@apollo/client';
```

## Package Structure

Apollo Client v4 exports from different entry points:

- `@apollo/client` → Core functionality (ApolloClient, cache, links, gql)
- `@apollo/client/react` → React hooks (useQuery, useMutation, useSubscription)
- `@apollo/client/link/*` → Various link implementations
- `@apollo/client/cache` → Cache utilities

## Files Updated

### 1. `src/hooks/use-jewellery.ts`
```typescript
import { useQuery, useMutation, type ApolloError } from '@apollo/client/react';
```

### 2. `src/main.tsx`
```typescript
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './lib/apollo-client';

// Wrap app with ApolloProvider
<ApolloProvider client={apolloClient}>
  <App />
</ApolloProvider>
```

### 3. `src/lib/apollo-client.ts`
```typescript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// Note: These imports are from the main package, not /react
```

### 4. `src/graphql/queries.ts` & `mutations.ts`
```typescript
import { gql } from '@apollo/client';
// gql is from main package, not /react
```

## Common Errors & Solutions

### Error: "does not provide an export named 'useMutation'"

**Cause**: Importing hooks from `@apollo/client` instead of `@apollo/client/react`

**Solution**: Change imports to:
```typescript
import { useQuery, useMutation } from '@apollo/client/react';
```

### Error: "Invariant Violation: ApolloProvider was not passed a client instance"

**Cause**: ApolloProvider not properly configured or imported incorrectly

**Solution**:
1. Ensure ApolloProvider is imported from `@apollo/client/react`
2. Pass the client instance: `<ApolloProvider client={apolloClient}>`

### Error: Module resolution issues

**Cause**: Vite cache might be stale

**Solution**:
```bash
rm -rf node_modules/.vite
npm run dev
```

## Verification Checklist

✅ Apollo Client v4.0.7 installed
✅ Imports use `@apollo/client/react` for hooks
✅ ApolloProvider wraps the app in main.tsx
✅ Apollo client configured with correct GraphQL endpoint
✅ Vite cache cleared
✅ Dev server running without errors

## Development Server

Start the development server:
```bash
npm run dev
```

The server will run on:
- http://localhost:8080 (or next available port)

## Testing the Integration

1. **Start Backend**:
   ```bash
   # Ensure jewellery-service is running on port 3010
   ```

2. **Start Frontend**:
   ```bash
   npm run dev
   ```

3. **Test Operations**:
   - Navigate to http://localhost:8080
   - Try creating a new item
   - Try editing an item
   - Try deleting an item
   - Try importing a CSV file

## Package Versions

```json
{
  "@apollo/client": "^4.0.7",
  "graphql": "^16.11.0"
}
```

## Module Resolution in package.json

The Apollo Client package.json exports:

```json
{
  "exports": {
    ".": {
      "module": "./core/index.js",
      "default": "./core/index.js"
    },
    "./react": {
      "default": {
        "module": "./react/index.js",
        "default": "./react/index.js"
      }
    }
  }
}
```

This means:
- `import ... from '@apollo/client'` → resolves to `core/index.js` (no hooks)
- `import ... from '@apollo/client/react'` → resolves to `react/index.js` (has hooks)

## Additional Notes

### TypeScript Support

All imports have full TypeScript support:
```typescript
import { useQuery, type ApolloError } from '@apollo/client/react';
import type { Jewellery, PaginatedJewellery } from '@/graphql/types';
```

### Cache Configuration

The Apollo Client is configured with `cache-and-network` policy:
```typescript
defaultOptions: {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
  },
}
```

This ensures fresh data while showing cached data immediately.

### Error Handling

All hooks include error handling:
```typescript
const { data, loading, error } = useQuery(QUERY);

if (error) {
  // Error is automatically displayed via toast
  console.error('GraphQL Error:', error);
}
```

## File Structure

```
src/
├── lib/
│   └── apollo-client.ts          # Apollo Client instance
├── graphql/
│   ├── enums.ts                  # GraphQL enums
│   ├── types.ts                  # TypeScript types
│   ├── inputs.ts                 # Input types
│   ├── queries.ts                # Query definitions (uses gql from @apollo/client)
│   └── mutations.ts              # Mutation definitions
├── hooks/
│   └── use-jewellery.ts          # Custom hooks (uses @apollo/client/react)
└── main.tsx                      # ApolloProvider setup
```

## Quick Reference

| Import From | Use For |
|-------------|---------|
| `@apollo/client` | ApolloClient, InMemoryCache, createHttpLink, gql |
| `@apollo/client/react` | useQuery, useMutation, useSubscription, ApolloProvider |
| `@apollo/client/link/*` | Custom links (http, error, retry, etc.) |
| `@apollo/client/cache` | Cache utilities |

## Support

If you encounter issues:
1. Clear Vite cache: `rm -rf node_modules/.vite`
2. Check import paths match this guide
3. Verify Apollo Client version: `npm list @apollo/client`
4. Check browser console for detailed errors
5. Verify backend is running on port 3010
