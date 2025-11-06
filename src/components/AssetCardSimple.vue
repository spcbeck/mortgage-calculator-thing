<script setup lang="ts">
import { useRouter } from 'vue-router'
import type {
  ShortTermRentalAssetWithLoan,
  LongTermRentalAssetWithLoan,
} from '../models/Asset'
import type { HomoEconomicus } from '@/models/HomoEconomicus';
import { calculateShortTermRentalProfit } from '@/utils/taxes';

const props = defineProps<{
  asset: ShortTermRentalAssetWithLoan | LongTermRentalAssetWithLoan
  owner: HomoEconomicus
}>()

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

// Calculate annual rental income based on property type
function calculateAnnualRentalIncome() {
  // Check if it's a short-term rental (has averageDailyRate)
  if ('averageDailyRate' in props.asset) {
    // Short-term: daily rate × occupancy rate × 365 days
    return ((props.asset.averageDailyRate * props.asset.occupancyRate) / 100) * 365
  } else if ('monthlyRent' in props.asset) {
    // Long-term: monthly rent × 12
    return props.asset.monthlyRent * 12
  }
  return 0
}

// Calculate the actual mortgage interest payment (not the rate, but the dollar amount)
// This is approximate - should ideally use amortization schedule
const annualMortgageInterest = (props.asset.remainingBalance * props.asset.interestRate) / 100

// Calculate annual cleaning/maid costs for short-term rentals
function calculateAnnualCleaningCosts() {
  if ('averageMaidVisitsPerMonth' in props.asset) {
    return props.asset.averageMaidVisitsPerMonth * 80 * 12 // $80 per visit, 12 months
  }
  return 0
}

console.info(props.owner.salary)

const propertyInputs = {
  rentalIncome: calculateAnnualRentalIncome(),
  operatingExpenses: (props.asset.hoaFees || 0) + props.asset.insuranceCosts + props.asset.maintenanceCosts + (props.asset.otherTaxes || 0) + calculateAnnualCleaningCosts(),
  propertyTax: props.asset.propertyTaxPerYear,
  mortgageInterest: annualMortgageInterest,
  depreciation: (props.asset.purchasePrice * 0.8) / 27.5, // the .8 multiplication is a guess at the value of the building vs the land, it's probably something different
  ownerOtherIncome: props.owner.salary,
}

const totalProfit = calculateShortTermRentalProfit(propertyInputs)

console.log('Property Inputs:', propertyInputs)
console.log('Calculated Profit:', totalProfit)

const router = useRouter()

function navigateToDetails() {
  sessionStorage.setItem(`asset-${props.asset.id}`, JSON.stringify(props.asset))

  // Navigate to the details page
  router.push(`/assets/${props.asset.id}`)
}
</script>

<template>
  <article class="asset-card">
    <header class="mb-2">
      <h2>{{ asset.name }}</h2>
      <address>{{ asset.address }}</address>
      <button class="btn btn-primary mb-2" @click="navigateToDetails">View Details</button>
    </header>
    <!-- <gmp-map center="40.12150192260742,-100.45039367675781" zoom="4" map-id="DEMO_MAP_ID">
      <gmp-advanced-marker position="40.12150192260742,-100.45039367675781" title="My location"></gmp-advanced-marker>
    </gmp-map> -->
    <!-- Financial Summary -->
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
      <div class="col-6 col-md-3">
        <dl class="mb-2">
          <dt class="text-danger">Total Expenses:</dt>
          <dd class="fw-bold">{{ currencyFormatter.format(Number(totalProfit.totalExpenses)) }}</dd>
        </dl>
      </div>
      <div class="col-6 col-md-3">
        <dl class="mb-2">
          <dt class="text-primary">Pre-Tax Cash Flow:</dt>
          <dd class="fw-bold">{{ currencyFormatter.format(Number(totalProfit.preTaxCashFlow)) }}</dd>
        </dl>
      </div>
      <div class="col-6 col-md-3">
        <dl class="mb-2">
          <dt class="text-success fw-bold">After-Tax Profit:</dt>
          <dd class="fw-bold fs-5 text-success">{{ currencyFormatter.format(Number(totalProfit.afterTaxProfit)) }}</dd>
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
        <div class="col-6 col-md-4">
          <dl class="mb-2">
            <dt>Total Taxable Income:</dt>
            <dd>{{ currencyFormatter.format(Number(totalProfit.totalTaxableIncome)) }}</dd>
          </dl>
        </div>
        <div class="col-6 col-md-4">
          <dl class="mb-2">
            <dt class="text-info">Annual Depreciation:</dt>
            <dd class="text-info">{{ currencyFormatter.format(Number(totalProfit.depreciation)) }}</dd>
          </dl>
        </div>
        <div class="col-6 col-md-4">
          <dl class="mb-2">
            <dt class="text-success">Depreciation Tax Benefit:</dt>
            <dd class="text-success">{{ currencyFormatter.format(Number(totalProfit.depreciationTaxBenefit)) }}</dd>
          </dl>
        </div>
        <div class="col-6 col-md-4">
          <dl class="mb-2">
            <dt>Effective Tax Rate:</dt>
            <dd>{{ ((Number(totalProfit.marginalTaxOnRental) / Number(totalProfit.preTaxCashFlow)) * 100).toFixed(2) }}%</dd>
          </dl>
        </div>
      </div>
      <div class="alert alert-info mt-2">
        <small>
          <strong>💡 Tax Benefit Explanation:</strong> Depreciation of {{ currencyFormatter.format(Number(totalProfit.depreciation)) }}
          shields your rental income from taxes. You only pay tax on {{ currencyFormatter.format(Number(totalProfit.taxableRentalIncome)) }}
          instead of {{ currencyFormatter.format(Number(totalProfit.preTaxCashFlow)) }},
          saving you approximately {{ currencyFormatter.format(Number(totalProfit.depreciationTaxBenefit)) }} in taxes!
        </small>
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
