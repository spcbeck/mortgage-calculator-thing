<script setup lang="ts">
import AssetList from '@/components/AssetList.vue';
import { getAllAssets } from '@/services/Assets/AssetsApi'
import { ref, onMounted } from 'vue'
import type {
  ShortTermRentalAssetWithLoan,
  LongTermRentalAssetWithLoan,
} from '../models/Asset'

const assets = ref<
  (ShortTermRentalAssetWithLoan | LongTermRentalAssetWithLoan)[]
>([])

// Fetch assets from both assets.json and localStorage
const fetchAssets = () => {
  setTimeout(() => {
    const allAssets = getAllAssets()

    assets.value = allAssets.map((asset) => {
      // Ensure purchaseDate is a Date object
      const purchaseDate = asset.purchaseDate instanceof Date
        ? asset.purchaseDate
        : new Date(asset.purchaseDate)

      // Calculate maturity date based on purchase date and loan length
      let maturityDate: Date | undefined
      if ('loanLength' in asset && asset.loanLength) {
        maturityDate = new Date(purchaseDate)
        maturityDate.setFullYear(purchaseDate.getFullYear() + (asset.loanLength as number))
      }

      return {
        ...asset,
        purchaseDate,
        ...(maturityDate && { maturityDate }),
      } as ShortTermRentalAssetWithLoan | LongTermRentalAssetWithLoan
    })
  }, 500) // Reduced delay since we're not hitting an API
}

onMounted(() => {
  fetchAssets()
})
</script>

<template>
  <h1>Assets</h1>
  <AssetList :assets="assets" />
</template>
