<script setup lang="ts">
import type {
  Asset,
  AssetWithLoan,
  ShortTermRentalAssetWithLoan,
  LongTermRentalAssetWithLoan,
} from '../models/Asset'

defineProps<{
  asset: Asset | AssetWithLoan | ShortTermRentalAssetWithLoan | LongTermRentalAssetWithLoan
}>()

function isAssetWithLoan(
  asset: Asset | AssetWithLoan | ShortTermRentalAssetWithLoan | LongTermRentalAssetWithLoan,
): asset is AssetWithLoan {
  return 'loanLength' in asset
}

function isShortTermRental(
  asset: Asset | AssetWithLoan | ShortTermRentalAssetWithLoan | LongTermRentalAssetWithLoan,
): asset is ShortTermRentalAssetWithLoan {
  return 'averageDailyRate' in asset
}

function isLongTermRental(
  asset: Asset | AssetWithLoan | ShortTermRentalAssetWithLoan | LongTermRentalAssetWithLoan,
): asset is LongTermRentalAssetWithLoan {
  return 'monthlyRent' in asset
}
</script>

<template>
  <div class="asset-container">
    <article class="asset-card">
      <header>
        <h2>
          what we get financially speaking from this asset
          <small>
            of course due to capitalism and the structure of our soceity (it is due to us)
          </small>
        </h2>
      </header>
      <ul>
        <li v-if="isShortTermRental(asset)">
          Est. Net Monthly Profit:
          <strong>{{
            (
              ((asset.averageDailyRate * asset.occupancyRate) / 100) * 30 -
              (asset.propertyTaxPerYear / 12 +
                asset.hoaFees +
                asset.insuranceCosts / 12 +
                asset.maintenanceCosts / 12 +
                asset.monthlyPayment +
                asset.averageMaidVisitsPerMonth * 80)
            ).toLocaleString('en-us', {
              style: 'currency',
              currency: 'USD',
            })
          }}</strong>
        </li>
        <li v-if="isLongTermRental(asset)">
          Est. Net Monthly Profit:
          {{
            (
              asset.monthlyRent -
              (asset.propertyTaxPerYear / 12 +
                asset.hoaFees +
                asset.insuranceCosts / 12 +
                asset.maintenanceCosts / 12 +
                (isAssetWithLoan(asset) ? asset.monthlyPayment : 0))
            ).toLocaleString('en-us', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        </li>
        <li v-if="isShortTermRental(asset)">
          Short-Term Est. Monthly Revenue:
          {{
            (((asset.averageDailyRate * asset.occupancyRate) / 100) * 30).toLocaleString('en-us', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        </li>
        <li v-if="isShortTermRental(asset)">
          Short-Term Est. Yearly Revenue:
          {{
            (((asset.averageDailyRate * asset.occupancyRate) / 100) * 365).toLocaleString('en-us', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        </li>
        <li v-if="isLongTermRental(asset)">
          Long-Term Rental Monthly Rent:
          {{
            asset.monthlyRent.toLocaleString('en-us', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        </li>
        <li v-if="!isShortTermRental(asset) && !isLongTermRental(asset)">
          we probably live here like for real
        </li>
      </ul>
    </article>
    <article class="asset-card">
      <header>
        <h2>{{ asset.name }}</h2>
        <address>{{ asset.address }}</address>
      </header>

      <details open>
        <summary><h3>General Information</h3></summary>
        <dl>
          <dt>Purchase Price</dt>
          <dd>${{ asset.purchasePrice.toLocaleString() }}</dd>
          <dt>Purchase Date</dt>
          <dd>{{ new Date(asset.purchaseDate).toLocaleDateString() }}</dd>
          <dt>Assessed Value</dt>
          <dd>${{ asset.assessedValue.toLocaleString() }}</dd>
          <dt>Depreciation Years</dt>
          <dd>{{ asset.depreciationYears }}</dd>
        </dl>
      </details>

      <details>
        <summary><h3>Upkeep</h3></summary>
        <dl>
          <dt>Property Tax (Yearly)</dt>
          <dd>${{ asset.propertyTaxPerYear.toLocaleString() }}</dd>
          <dt>HOA Fees</dt>
          <dd>${{ asset.hoaFees.toLocaleString() }}</dd>
          <dt>Insurance Costs</dt>
          <dd>${{ asset.insuranceCosts.toLocaleString() }}</dd>
          <dt>Maintenance Costs</dt>
          <dd>${{ asset.maintenanceCosts.toLocaleString() }}</dd>
          <dt>Other Taxes</dt>
          <dd>${{ asset.otherTaxes.toLocaleString() }}</dd>
          <dt>Primary Residence Exemption</dt>
          <dd>{{ asset.hasPrimaryResidenceExmption ? 'Yes' : 'No' }}</dd>
        </dl>
      </details>

      <details v-if="isAssetWithLoan(asset)">
        <summary><h3>Loan Information</h3></summary>
        <dl>
          <dt>Loan Length</dt>
          <dd>{{ asset.loanLength }} years</dd>
          <dt>Interest Rate</dt>
          <dd>{{ asset.interestRate }}%</dd>
          <dt>Down Payment</dt>
          <dd>${{ asset.downPayment.toLocaleString() }}</dd>
          <dt>Monthly Payment</dt>
          <dd>${{ asset.monthlyPayment.toLocaleString() }}</dd>
          <dt>Remaining Balance</dt>
          <dd>${{ asset.remainingBalance.toLocaleString() }}</dd>
          <dt>Maturity Date</dt>
          <dd>{{ new Date(asset.maturityDate).toLocaleDateString() }}</dd>
        </dl>
      </details>

      <details v-if="isShortTermRental(asset)">
        <summary><h3>Short-Term Rental Information</h3></summary>
        <dl>
          <dt>Average Daily Rate</dt>
          <dd>${{ asset.averageDailyRate.toLocaleString() }}</dd>
          <dt>Occupancy Rate</dt>
          <dd>{{ asset.occupancyRate }}%</dd>
          <dt>Average Maid Visits Per Month</dt>
          <dd>{{ asset.averageMaidVisitsPerMonth }}</dd>
        </dl>
      </details>

      <details v-if="isLongTermRental(asset)">
        <summary><h3>Long-Term Rental Information</h3></summary>
        <dl>
          <dt>Monthly Rent</dt>
          <dd>${{ asset.monthlyRent.toLocaleString() }}</dd>
          <dt>Pays Utilities</dt>
          <dd>{{ asset.payUtilities ? 'Yes' : 'No' }}</dd>
        </dl>
      </details>
    </article>

    <article class="asset-card">
      <header>
        <h2>what we pay <small>boooooo</small></h2>
      </header>
      <ul>
        <li>
          (estimated) Total Monthly Upkeep: $
          {{
            (
              asset.propertyTaxPerYear / 12 +
              asset.hoaFees +
              asset.insuranceCosts / 12 +
              asset.maintenanceCosts / 12 +
              (isAssetWithLoan(asset) ? asset.monthlyPayment : 0) +
              (isShortTermRental(asset) ? asset.averageMaidVisitsPerMonth * 80 : 0)
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }}
        </li>
        <li>okay stop reading</li>
        <li>blah blah blah nothing past here</li>
        <li v-if="isAssetWithLoan(asset)">
          Mortgage: ${{ asset.monthlyPayment.toLocaleString() }} / month
        </li>
        <li>
          Property Tax: ${{
            (asset.propertyTaxPerYear / 12).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }}
          / month
        </li>
        <li>HOA: ${{ asset.hoaFees.toLocaleString() }} / month</li>
        <li>
          Insurance: ${{
            (asset.insuranceCosts / 12).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }}
          / month
        </li>
        <li>
          Maintenance: ${{
            (asset.maintenanceCosts / 12).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }}
          / month
        </li>
        <li v-if="isShortTermRental(asset)">
          Maid Service: {{ asset.averageMaidVisitsPerMonth }} visits / month
        </li>
      </ul>
    </article>
  </div>
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

details {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  transition: height 0.3s ease;
}

summary {
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ddd;
  list-style: none; /* Remove default marker */
}

summary::-webkit-details-marker {
  display: none; /* Hide marker for Chrome/Safari */
}

summary::before {
  content: '▶';
  margin-right: 0.5rem;
  display: inline-block;
  transition: transform 0.2s;
}

details[open] > summary::before {
  transform: rotate(90deg);
}

details[open] summary {
  border-bottom: 1px solid #ddd;
}

summary:hover {
  background-color: #efefef;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  padding-left: 1rem;
}
</style>
