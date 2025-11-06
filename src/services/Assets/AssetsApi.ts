import type { Asset } from "@/models/Asset";
import assetsData from '@/assets.json';

const STORAGE_KEY = 'mortgage_calculator_assets';

// Generate a unique ID for new assets
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Get all assets from localStorage
function getStoredAssets(): Asset[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
}

// Get all assets (from JSON + localStorage)
export function getAllAssets(): Asset[] {
  const jsonAssets = assetsData.map(asset => ({
    ...asset,
    purchaseDate: new Date(asset.purchaseDate),
  })) as Asset[];

  const storedAssets = getStoredAssets();

  // Combine and deduplicate by id
  const allAssets = [...jsonAssets, ...storedAssets];
  const uniqueAssets = allAssets.reduce((acc, current) => {
    const exists = acc.find(item => item.id === current.id);
    if (!exists) {
      acc.push(current);
    }
    return acc;
  }, [] as Asset[]);

  return uniqueAssets;
}

// Save a new asset to localStorage
export async function saveAsset(assetData: Omit<Asset, 'id'>): Promise<Asset> {
  // Create new asset with generated ID
  const newAsset: Asset = {
    ...assetData,
    id: generateId(),
  };

  // Get existing stored assets
  const storedAssets = getStoredAssets();

  // Add new asset
  storedAssets.push(newAsset);

  // Save back to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedAssets));

  console.log('Asset saved to localStorage:', newAsset);

  return newAsset;
}

// Delete an asset from localStorage
export async function deleteAsset(id: string): Promise<void> {
  const storedAssets = getStoredAssets();
  const filtered = storedAssets.filter(asset => asset.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

// Update an asset in localStorage
export async function updateAsset(id: string, updates: Partial<Asset>): Promise<Asset> {
  const storedAssets = getStoredAssets();
  const index = storedAssets.findIndex(asset => asset.id === id);

  if (index === -1) {
    throw new Error(`Asset with id ${id} not found in localStorage`);
  }

  storedAssets[index] = { ...storedAssets[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedAssets));

  return storedAssets[index];
}
