# Assets Storage System

## Overview
This application uses a hybrid storage approach for managing assets:

1. **Static Assets**: Initial assets are stored in `src/assets.json`
2. **Dynamic Assets**: New assets created via the AddAssetForm are stored in browser's `localStorage`
3. **Combined View**: The AssetList displays assets from both sources

## How It Works

### Adding New Assets
When you submit the AddAssetForm:
1. A unique ID is generated for the new asset
2. The asset is saved to `localStorage` under the key `mortgage_calculator_assets`
3. Success message is displayed
4. You're redirected to the assets page after 1.5 seconds

### Viewing Assets
The AssetList component:
1. Loads assets from `assets.json` (static data)
2. Loads assets from `localStorage` (user-created data)
3. Combines both and removes duplicates by ID
4. Displays all assets in cards

### Storage Location
- **assets.json**: `src/assets.json` - Read-only, bundled with the app
- **localStorage**: Browser storage - Persists across sessions, specific to this browser

## API Functions

Located in `src/services/Assets/AssetsApi.ts`:

### `saveAsset(assetData)`
Saves a new asset to localStorage with a generated ID.
```typescript
const newAsset = await saveAsset({
  address: '123 Main St',
  name: 'My Property',
  // ... other fields
});
```

### `getAllAssets()`
Returns all assets from both sources combined.
```typescript
const assets = getAllAssets();
```

### `deleteAsset(id)`
Deletes an asset from localStorage by ID.
```typescript
await deleteAsset('asset-id-123');
```

### `updateAsset(id, updates)`
Updates an asset in localStorage.
```typescript
await updateAsset('asset-id-123', { name: 'Updated Name' });
```

## Limitations

1. **Browser-Specific**: Assets saved in one browser won't appear in another
2. **Local Only**: Data is stored locally, not synced to a server
3. **Static Assets Immutable**: Assets from `assets.json` cannot be edited or deleted through the UI
4. **No Persistence to JSON**: New assets are saved to localStorage, not written back to `assets.json`

## Future Enhancements

To persist data to a database:
1. Set up a backend server (Node.js/Express + PostgreSQL)
2. Update the API functions to use `fetch()` calls to your backend
3. See `database/schema.sql` for the PostgreSQL schema

## Clearing Data

To clear all user-created assets:
```javascript
localStorage.removeItem('mortgage_calculator_assets');
```

Or open DevTools → Application → Local Storage → Clear
