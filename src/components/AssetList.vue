<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type {
  Asset,
  AssetWithLoan,
  ShortTermRentalAssetWithLoan,
  LongTermRentalAssetWithLoan,
} from '../models/Asset'
import AssetCard from './AssetCard.vue'
import assetsData from '../assets.json'

const assets = ref<
  (Asset | AssetWithLoan | ShortTermRentalAssetWithLoan | LongTermRentalAssetWithLoan)[]
>([])

// This function simulates fetching data from an API.
const fetchAssets = () => {
  // In a real application, you would make an API call here.
  // For demonstration, we'll use a timeout to simulate a network request.
  setTimeout(() => {
    assets.value = assetsData.map((asset) => {
      const purchaseDate = new Date(asset.purchaseDate)

      // Calculate maturity date based on purchase date and loan length
      let maturityDate: Date | undefined
      if ('loanLength' in asset && asset.loanLength) {
        maturityDate = new Date(purchaseDate)
        maturityDate.setFullYear(purchaseDate.getFullYear() + asset.loanLength)
      }

      return {
        ...asset,
        purchaseDate,
        ...(maturityDate && { maturityDate }),
      }
    })
  }, 1500) // Simulate a 1.5 second delay
}

onMounted(() => {
  fetchAssets()
})
</script>

<template>
  <div class="asset-list-container">
    <header>
      <h1>My Stuff</h1>
      <button>Add New Asset</button>
    </header>
    <div v-if="assets.length === 0" class="loading-message">
      <p>Loading assets...</p>
    </div>
    <div v-else class="asset-list">
      <AssetCard v-for="asset in assets" :key="asset.id" :asset="asset" />
    </div>
  </div>
</template>

<style scoped>
.asset-list-container {
  font-family: sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

.loading-message {
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
  color: #666;
}

.asset-list {
  display: grid;
  gap: 1.5rem 2rem;
  border-radius: 0.5rem;
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
  color: #565656;
  box-shadow: 0 4px 0.5rem rgba(0, 0, 0, 0.1);
  margin: auto;
}

@media (min-width: 768px) {
  .asset-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
