# GraphQL API Integration - Jewellery Inventory Hub

This document describes the complete integration between the frontend and the `jewellery-service` GraphQL backend.

## Overview

The application is now fully integrated with the GraphQL backend running on `localhost:3010`. It provides:

- **CRUD Operations**: Create, Read, Update, and Delete jewellery items
- **CSV Import**: Bulk import jewellery items from Shopify CSV format
- **Real-time Data**: Automatic cache updates and refetching
- **Type Safety**: Full TypeScript support with GraphQL-generated types
- **Error Handling**: Comprehensive error handling with user-friendly toasts

## Architecture

### Directory Structure

```
src/
├── graphql/
│   ├── enums.ts          # GraphQL enum definitions
│   ├── types.ts          # GraphQL type definitions
│   ├── inputs.ts         # GraphQL input type definitions
│   ├── queries.ts        # GraphQL query definitions
│   └── mutations.ts      # GraphQL mutation definitions
├── lib/
│   └── apollo-client.ts  # Apollo Client configuration
├── hooks/
│   └── use-jewellery.ts  # Custom hooks for data operations
├── helpers/
│   └── csv-to-jewellery.ts  # CSV parsing utilities
├── components/
│   └── inventory/
│       ├── JewelryFormNew.tsx        # Form with GraphQL integration
│       ├── CSVImportDialogNew.tsx    # CSV import with backend
│       └── InventoryTable.tsx        # Table component
└── pages/
    └── IndexNew.tsx      # Main page with GraphQL data
```

## Key Components

### 1. Apollo Client Setup

**File**: `src/lib/apollo-client.ts`

Configures Apollo Client to connect to the GraphQL backend:

```typescript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3010/graphql',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
```

### 2. GraphQL Types & Enums

**Files**:
- `src/graphql/types.ts` - TypeScript interfaces matching GraphQL schema
- `src/graphql/enums.ts` - Enum definitions from GraphQL schema
- `src/graphql/inputs.ts` - Input types for mutations

These files provide full type safety throughout the application.

### 3. GraphQL Queries & Mutations

**Files**:
- `src/graphql/queries.ts` - Data fetching queries
- `src/graphql/mutations.ts` - Data mutation operations

#### Available Queries:
- `GET_ALL_JEWELLERY` - Fetch all jewellery with pagination
- `GET_FILTERED_RINGS` - Fetch rings with filters and sorting
- `GET_ONE_JEWELLERY` - Fetch single item by ID or SKU
- `GET_ALL_RING_FILTER_OPTIONS` - Get available filter options

#### Available Mutations:
- `CREATE_JEWELLERY` - Create new jewellery item
- `UPDATE_JEWELLERY` - Update existing item
- `DELETE_JEWELLERY` - Delete item by ID

### 4. Custom Hooks

**File**: `src/hooks/use-jewellery.ts`

Provides easy-to-use hooks for all operations:

```typescript
// Fetching data
const { data, loading, error } = useGetFilteredRings(filters, sort, limit, offset);
const { data } = useGetOneJewellery(id);

// Mutations
const { createJewellery, loading } = useCreateJewellery();
const { updateJewellery, loading } = useUpdateJewellery();
const { deleteJewellery, loading } = useDeleteJewellery();
```

All mutation hooks include:
- Automatic refetching of queries after success
- Toast notifications for success/error
- Loading states
- Error handling

## Usage Examples

### Creating a Jewellery Item

```typescript
import { useCreateJewellery } from '@/hooks/use-jewellery';
import { CreateJewelleryInput } from '@/graphql/inputs';
import { JewelleryTypeEnum, JewelleryMetalTypeEnum } from '@/graphql/enums';

const { createJewellery, loading } = useCreateJewellery();

const handleCreate = async () => {
  const input: CreateJewelleryInput = {
    jewellery: {
      sku: 'SKU-001',
      nivodaStockId: 'NIV-001',
      catalogSource: CatalogSourceEnum.NIVODA,
      description: 'Classic Solitaire Ring',
      type: JewelleryTypeEnum.RING,
      status: 'In Stock',
    },
    engagement_ring: {
      setting: JewellerySettingEnum.FINISHED,
      sizeType: 'US_CA',
      metalKarat: JewelleryMetalKaratEnum.KT_14KT,
      metalType: JewelleryMetalTypeEnum.WHITE_GOLD,
    },
    mounts: [{
      metalType: JewelleryMetalTypeEnum.WHITE_GOLD,
      metalKarat: JewelleryMetalKaratEnum.KT_14KT,
      metalWeight: 3.5,
    }],
    catalogSource: CatalogSourceEnum.NIVODA,
  };

  await createJewellery(input);
};
```

### Fetching with Filters

```typescript
import { useGetFilteredRings } from '@/hooks/use-jewellery';
import { SortFieldsEnum, OrderDirection } from '@/graphql/enums';

const filters = {
  styles: ['SOLITAIRE'],
  metalTypes: ['WHITE_GOLD'],
  catalogSources: ['NIVODA'],
};

const sort = {
  field: SortFieldsEnum.PRICE,
  direction: OrderDirection.ASC,
};

const { data, loading, error } = useGetFilteredRings(
  filters,
  undefined,
  sort,
  50,  // limit
  0    // offset
);

const items = data?.getFilteredRings?.items || [];
const totalCount = data?.getFilteredRings?.totalCount || 0;
```

### Updating an Item

```typescript
import { useUpdateJewellery } from '@/hooks/use-jewellery';
import { UpdateJewelleryInput } from '@/graphql/inputs';

const { updateJewellery, loading } = useUpdateJewellery();

const handleUpdate = async (itemId: string) => {
  const input: UpdateJewelleryInput = {
    jewellery: {
      id: itemId,
      description: 'Updated description',
      status: 'In Stock',
    },
    engagement_ring: {
      // Update ring-specific fields
    },
  };

  await updateJewellery(input);
};
```

### Deleting an Item

```typescript
import { useDeleteJewellery } from '@/hooks/use-jewellery';

const { deleteJewellery, loading } = useDeleteJewellery();

const handleDelete = async (itemId: string) => {
  await deleteJewellery(itemId);
};
```

## CSV Import Feature

The CSV import feature processes Shopify-format CSV files and creates jewellery items via the GraphQL API.

**File**: `src/components/inventory/CSVImportDialogNew.tsx`

### Features:
- Batch processing (10 items at a time)
- Progress tracking
- Success/failure statistics
- Automatic retry on network errors
- Validation of CSV data

### CSV Format

The CSV should match the Shopify export format with these columns:

- `Nivoda Stock ID`
- `Nivoda Unique SKU`
- `Product Name`
- `Product Description`
- `Ring Type`
- `Option 1 Value` (e.g., "14KT White Gold")
- `Option 2 Value` (Stone shape)
- `Metal Weight`
- `Band Width`
- `Number of Side Stones`
- `Total Cttw of Side Stones`
- `Accent Stones` (Yes/No)
- `Natural Stone Colour/ Clarity` (e.g., "D/VVS1")
- `Labgrown Stone Colour/ Clarity`
- `Natural Variant Price`
- `Labgrown Variant Price`
- `Shopify Ring Style`
- `Setting Type`
- `Band Style`
- `V360 url`

### CSV Processing

**File**: `src/helpers/csv-to-jewellery.ts`

The helper function `csvRowToJewelleryInput()` transforms CSV rows into `CreateJewelleryInput` objects:

```typescript
import { csvRowToJewelleryInput } from '@/helpers/csv-to-jewellery';

const input = csvRowToJewelleryInput(csvRow);
// Returns CreateJewelleryInput ready for GraphQL mutation
```

## Data Flow

### Create Flow
```
User Input → Form Validation → CreateJewelleryInput →
createJewellery mutation → GraphQL API →
Database → Response → Cache Update → UI Update → Toast
```

### Read Flow
```
Component Mount → useGetFilteredRings hook →
GET_FILTERED_RINGS query → GraphQL API →
Database → Response → Cache → UI Render
```

### Update Flow
```
User Edit → Form Validation → UpdateJewelleryInput →
updateJewellery mutation → GraphQL API →
Database → Response → Refetch Queries → UI Update → Toast
```

### Delete Flow
```
User Confirm → deleteJewellery mutation →
GraphQL API → Database → Response →
Refetch Queries → UI Update → Toast
```

## GraphQL Schema Integration

The frontend types are derived from the backend GraphQL schema. Key types include:

### Core Types
- `Jewellery` - Main jewellery entity
- `JewelleryRing` - Ring-specific properties
- `JewelleryMount` - Metal/mounting information
- `JewelleryStone` - Stone details
- `JewelleryFile` - File attachments

### Input Types
- `CreateJewelleryInput` - For creating new items
- `UpdateJewelleryInput` - For updating items
- `JewelleryInput` - Base jewellery properties
- `JewelleryEngagementRingInput` - Ring properties

### Filter Types
- `RingFilter` - Filter options for rings
- `SortOption` - Sorting configuration

## Error Handling

All operations include comprehensive error handling:

1. **Network Errors**: Caught by Apollo Client, displayed in toasts
2. **Validation Errors**: Form validation before submission
3. **GraphQL Errors**: Server errors caught and displayed
4. **Loading States**: All operations show loading indicators

Example error handling:

```typescript
const { createJewellery, loading, error } = useCreateJewellery();

// Error is automatically displayed via toast
// Loading state can be used to disable buttons
<Button disabled={loading}>
  {loading ? 'Creating...' : 'Create'}
</Button>
```

## Configuration

### Backend URL

The GraphQL endpoint is configured in `src/lib/apollo-client.ts`:

```typescript
const httpLink = createHttpLink({
  uri: 'http://localhost:3010/graphql',
});
```

To change the backend URL (e.g., for production):

```typescript
const httpLink = createHttpLink({
  uri: process.env.VITE_GRAPHQL_URL || 'http://localhost:3010/graphql',
});
```

Then set the environment variable:

```bash
VITE_GRAPHQL_URL=https://api.example.com/graphql
```

## Development

### Running the Application

1. Start the backend:
```bash
# In the jewellery-service directory
npm run dev
```

2. Start the frontend:
```bash
npm run dev
```

3. Open http://localhost:5173

### Testing GraphQL Operations

You can test GraphQL operations directly using the GraphQL playground at:
```
http://localhost:3010/graphql
```

## Migration Notes

### From Mock Data to GraphQL

The original `Index.tsx` and `JewelryForm.tsx` have been replaced with:
- `IndexNew.tsx` - Uses GraphQL hooks
- `JewelryFormNew.tsx` - Integrates with GraphQL mutations

The old files remain for reference but are not used in the routing.

### Key Differences

1. **Data Source**: Real-time from database instead of in-memory array
2. **Persistence**: All changes persist across sessions
3. **Type Safety**: Full GraphQL type checking
4. **Error Handling**: Backend validation and error messages
5. **Performance**: Optimistic updates and caching

## Future Enhancements

Potential improvements:

1. **Optimistic Updates**: Update UI before server response
2. **Subscriptions**: Real-time updates via GraphQL subscriptions
3. **Offline Support**: Apollo cache persistence
4. **Image Upload**: File upload for jewellery images
5. **Advanced Filters**: More filter options from the schema
6. **Bulk Operations**: Multi-select and bulk actions
7. **Export**: Export data to CSV/Excel

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure backend is running on port 3010
   - Check `apollo-client.ts` has correct URL

2. **GraphQL Errors**
   - Check browser console for detailed error messages
   - Verify input data matches schema requirements

3. **Type Errors**
   - Ensure enums match backend exactly
   - Check required vs optional fields

4. **CSV Import Failures**
   - Verify CSV format matches template
   - Check browser console for parsing errors
   - Ensure all required fields are present

## Support

For issues or questions:
- Check GraphQL playground for schema documentation
- Review backend logs for server-side errors
- Check browser console for client-side errors
