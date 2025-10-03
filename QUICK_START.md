# Quick Start Guide - Jewellery Inventory Hub

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm
- Backend `jewellery-service` running on `localhost:3010`

### Installation & Setup

1. **Install dependencies** (if not already done):
```bash
npm install
```

2. **Start the development server**:
```bash
npm run dev
```

3. **Access the application**:
   - Open http://localhost:8080 (or the port shown in terminal)

## 📝 Features

### ✅ View Inventory
- See all jewellery items in a paginated table
- 50 items per page
- Search by SKU, Stock ID, or description
- Filter by style, type, and status

### ✅ Create New Items
1. Click "Add New Item" button
2. Fill in the form with:
   - **Basic Info**: SKU, Stock ID, Description
   - **Metal & Pricing**: Metal type, karat, weight, prices
   - **Stones**: Stone details (optional)
   - **Media**: Video URL (optional)
3. Click "Create Item"
4. Item appears in the inventory immediately

### ✅ Edit Items
1. Click the edit icon on any row
2. Modify fields in the form
3. Click "Update Item"
4. Changes are saved to the database

### ✅ Delete Items
1. Click the delete icon on any row
2. Confirm the deletion
3. Item is removed from database

### ✅ Import CSV
1. Click "Import CSV" button
2. Download template (optional) - shows the expected format
3. Select your CSV file (Shopify format)
4. Click "Import"
5. Watch progress with real-time statistics
6. Review success/failure counts

## 📂 CSV Format

The CSV import supports the Shopify export format:

### Required Columns
- `Nivoda Stock ID`
- `Nivoda Unique SKU`
- `Product Name`
- `Product Description`
- `Option 1 Value` (e.g., "14KT White Gold")
- `Option 2 Value` (Stone shape)
- `Metal Weight`

### Optional Columns
- `Number of Side Stones`
- `Total Cttw of Side Stones`
- `Accent Stones` (Yes/No)
- `Natural Stone Colour/ Clarity` (e.g., "D/VVS1")
- `Labgrown Stone Colour/ Clarity`
- `Natural Variant Price`
- `Labgrown Variant Price`
- `Ring Type`
- `Setting Type`
- `Band Style`
- `V360 url`

### Example CSV Row
```csv
NIV-001,SKU-001,Classic Solitaire Diamond Ring,Elegant solitaire ring,Engagement Rings,14KT White Gold,Round,3.5,2.0,1ST,32,1.5,Yes,D/VVS1,E/VVS2,5999,3499,SOLITAIRE,Four Prong,Straight,
```

## 🛠️ Troubleshooting

### Server Won't Start
```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### GraphQL Connection Error
- Ensure backend is running: `http://localhost:3010/graphql`
- Check browser console for detailed error
- Verify GraphQL playground is accessible

### Import Errors
- Check CSV format matches template
- Ensure all required columns are present
- Look for parsing errors in browser console

### No Data Showing
- Check backend has data
- Try refreshing the page
- Check browser Network tab for API calls

## 📖 Documentation

- **Full Documentation**: `README_GRAPHQL_INTEGRATION.md`
- **Apollo Client Setup**: `APOLLO_CLIENT_SETUP.md`
- **Integration Summary**: `INTEGRATION_SUMMARY.md`

## 🎯 Common Operations

### Add a Ring
```
1. Click "Add New Item"
2. Fill in:
   - Nivoda Stock ID: NIV-001
   - SKU: SKU-001
   - Type: RING
   - Metal Type: WHITE_GOLD
   - Metal Karat: 14KT
   - Metal Weight: 3.5
   - Natural Price: 5999
   - Labgrown Price: 3499
3. Add stone details if applicable
4. Click "Create Item"
```

### Bulk Import
```
1. Prepare CSV file (use template)
2. Click "Import CSV"
3. Select file
4. Click "Import"
5. Wait for processing (10 items at a time)
6. Review statistics
```

### Search Items
```
1. Use search box at top
2. Type SKU, Stock ID, or description
3. Results filter automatically
```

## 🔐 Backend Connection

The application connects to:
- **GraphQL API**: `http://localhost:3010/graphql`
- **Protocol**: HTTP POST with JSON body
- **Authentication**: None (local development)

## 🌟 Features in Use

### GraphQL Operations
- **Queries**: getAllJewellery, getFilteredRings, oneJewellery
- **Mutations**: createJewellery, updateJewellery, deleteJewellery
- **Fragments**: Reusable field selections for Jewellery, Ring, Mount, Stone

### Apollo Client Features
- **Caching**: Automatic cache management
- **Optimistic Updates**: Immediate UI updates
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during operations

### React Features
- **Hooks**: Custom hooks for all operations
- **Type Safety**: Full TypeScript support
- **Form Validation**: Zod schema validation
- **Toast Notifications**: Success/error feedback

## 📊 Performance

- **Pagination**: 50 items per page
- **Batch Import**: 10 items at a time
- **Cache Strategy**: cache-and-network
- **Optimistic UI**: Updates before server confirmation

## 🐛 Known Issues

None currently. If you encounter issues:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Check backend logs
4. Verify all services are running

## 📞 Support

For help:
- Check documentation files
- Review GraphQL playground: `http://localhost:3010/graphql`
- Check browser console for client errors
- Check backend logs for server errors

## ✨ Next Steps

After getting started:
1. Import your jewellery data via CSV
2. Verify all items imported correctly
3. Use filters to explore the inventory
4. Try editing and deleting items
5. Add new items manually via the form

The system is ready for production use with the backend running on `localhost:3010`.
