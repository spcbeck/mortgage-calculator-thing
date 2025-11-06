<script setup lang="ts">
import type { HomoEconomicus } from '@/models/HomoEconomicus';
import AssetCardSimple from './AssetCardSimple.vue'
import type { LongTermRentalAssetWithLoan, ShortTermRentalAssetWithLoan } from '@/models/Asset'

const owners = [
  {
    name: "Anna",
    salary: 140000,
    value: Infinity,
  },
  {
    name: "Seanna",
    salary: 170000,
    value: Infinity,
  }
] as HomoEconomicus[];

defineProps<{
  assets: Array<LongTermRentalAssetWithLoan | ShortTermRentalAssetWithLoan>
}>()

// Get owner for an asset, with fallback to first owner if index is out of bounds
function getOwner(index: number): HomoEconomicus {
  return owners[index] ?? owners[0]!
}

</script>

<template>
  <div class="asset-list-container">
    <div v-if="assets.length === 0" class="loading-message">
      <p>Loading assets...</p>
    </div>
    <div v-else class="asset-list">
      <template v-for="(asset, index) in assets" :key="asset.id">
        <AssetCardSimple :asset="asset" :owner="getOwner(index)" />
        <hr v-if="index < assets.length - 1" class="asset-divider" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.asset-list-container {
  font-family: sans-serif;
  margin: 0 auto;
  padding: 1rem;
  width: 100%;
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
  margin: auto;
}

.asset-divider {
  grid-column: 1 / -1;
  border: none;
  border-top: 2px solid #e0e0e0;
  margin: 0.5rem 0;
}
</style>
