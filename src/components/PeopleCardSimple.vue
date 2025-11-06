<script setup lang="ts">
import type {
  ShortTermRentalAssetWithLoan,
  LongTermRentalAssetWithLoan,
} from '../models/Asset'
import type { HomoEconomicus } from '@/models/HomoEconomicus';

const props = defineProps<{
  asset: ShortTermRentalAssetWithLoan | LongTermRentalAssetWithLoan
  owner: HomoEconomicus
}>()

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

</script>

<template>
  <article class="asset-card">
    <header class="mb-2">
      <h2>{{ props.owner.name }}</h2>
      <p>Salary: {{ currencyFormatter.format(props.owner.salary) }}</p>
    </header>
    <div class="row bg-light p-2 mb-2">
      <div class="col-12">
        <h5>Financial Summary</h5>
      </div>
      <div class="col-6 col-md-3">
        <dl class="mb-2">
          <dt class="text-success">Annual Rental Income:</dt>
          <dd class="fw-bold">{{ currencyFormatter.format(Number(totalProfit.rentalIncome)) }}</dd>
        </dl>
      </div>
    </div>

    <!-- Tax Breakdown -->
    <details class="mb-3">
      <summary class="fw-bold text-primary" style="cursor: pointer;">Tax Breakdown & Benefits</summary>
      <div class="row mt-2 p-2 bg-white">
        <div class="col-6 col-md-4">
          <dl class="mb-2">
            <dt>Taxable Rental Income:</dt>
            <dd>{{ currencyFormatter.format(Number(totalProfit.taxableRentalIncome)) }}</dd>
          </dl>
        </div>
        <div class="col-6 col-md-4">
          <dl class="mb-2">
            <dt>Marginal Tax on Rental:</dt>
            <dd class="text-danger">{{ currencyFormatter.format(Number(totalProfit.marginalTaxOnRental)) }}</dd>
          </dl>
        </div>
      </div>
    </details>

    <div class="row">
      <div class="col-6">
        <dl class="mb-2">
          <dt>Purchase Price:</dt>
          <dd>{{ currencyFormatter.format(asset.purchasePrice) }}</dd>
        </dl>
      </div>
      <div class="col-6">
        <dl class="mb-2">
          <dt>Purchase Date:</dt>
          <dd>{{ new Date(asset.purchaseDate).toLocaleDateString() }}</dd>
        </dl>
      </div>
      <div class="col-6">
        <dl class="mb-2">
          <dt>Assessed Value:</dt>
          <dd>{{ currencyFormatter.format(asset.assessedValue) }}</dd>
        </dl>
      </div>
      <div class="col-6">
        <dl class="mb-2">
          <dt>Equity:</dt>
          <dd>{{ currencyFormatter.format(asset.assessedValue - asset.remainingBalance) }}</dd>
        </dl>
      </div>
    </div>
  </article>
</template>

<style scoped>
article {
  background: #eee;
}

address {
  font-style: normal;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

dl {
  padding: 1rem;
  margin: 0;
  overflow: hidden;
}

.asset-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px 0;
  border-radius: 8px;
}

.asset-card h2 {
  margin-top: 0;
  color: #333;
}

.asset-card h3 {
  display: inline;
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
  border: none;
}

.asset-card dt {
  font-weight: bold;
  color: #555;
}

.asset-card dd {
  margin: 0 0 1rem 0;
  padding-left: 0.5rem;
}
</style>
