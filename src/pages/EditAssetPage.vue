<script lang="ts" setup>
import EditAssetForm from '@/components/EditAssetForm.vue';
import type { Asset, AssetWithLoan, LongTermRentalAssetWithLoan, ShortTermRentalAssetWithLoan } from '@/models/Asset';

defineProps<{
  asset: Asset | AssetWithLoan | ShortTermRentalAssetWithLoan | LongTermRentalAssetWithLoan
}>()
</script>

<template>
  <h1>Edit Asset</h1>
  <EditAssetForm :asset="asset" />
</template>
