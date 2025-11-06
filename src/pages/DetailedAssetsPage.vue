<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AssetCardDetailed from '@/components/AssetCardDetailed.vue'
import { getAllAssets } from '@/services/Assets/AssetsApi'
import type { Asset, AssetWithLoan, LongTermRentalAssetWithLoan, ShortTermRentalAssetWithLoan } from '@/models/Asset'

const route = useRoute()
const asset = ref<Asset | AssetWithLoan | ShortTermRentalAssetWithLoan | LongTermRentalAssetWithLoan | null>(null)

onMounted(() => {
  const assetId = route.params.id as string

  // Try to get from sessionStorage first (passed from navigation)
  const storedAsset = sessionStorage.getItem(`asset-${assetId}`)

  if (storedAsset) {
    asset.value = JSON.parse(storedAsset)
    // Convert date strings back to Date objects
    if (asset.value) {
      asset.value.purchaseDate = new Date(asset.value.purchaseDate)
      if ('maturityDate' in asset.value && asset.value.maturityDate) {
        asset.value.maturityDate = new Date(asset.value.maturityDate)
      }
    }
  } else {
    // Fallback: find asset by ID from all assets
    const allAssets = getAllAssets()
    asset.value = allAssets.find(a => a.id === assetId) || null
  }
})
</script>

<template>
  <div v-if="asset">
    <h1>{{ asset.name }}</h1>
    <AssetCardDetailed :asset="asset"/>
  </div>
  <div v-else>
    <p>Loading asset...</p>
  </div>
</template>
