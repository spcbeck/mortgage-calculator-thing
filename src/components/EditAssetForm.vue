<script setup lang="ts">
import { ref } from 'vue'
import type { Asset } from '../models/Asset'

// Placeholder asset for testing/development
const asset = ref<Asset>({
  id: '2',
  address: '123 Main Street, Springfield, IL 62701',
  name: 'Sample Investment Property',
  purchasePrice: 250000,
  purchaseDate: new Date('2023-06-15'),
  propertyTaxPerYear: 3500,
  hasPrimaryResidenceExmption: false,
  depreciationYears: 27.5,
  assessedValue: 260000,
  hoaFees: 1200,
  insuranceCosts: 1800,
  maintenanceCosts: 2400,
  otherTaxes: 500
})

function handleSubmit() {
  console.log('Asset updated:', asset.value)
  // TODO: Implement asset update logic
}
</script>

<template>
  <h2>Edit Asset</h2>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Asset Name:</label>
      <input type="text" id="name" v-model="asset.name" required />
    </div>

    <div>
      <label for="address">Address:</label>
      <input type="text" id="address" v-model="asset.address" required />
    </div>

    <div>
      <label for="purchasePrice">Purchase Price:</label>
      <input type="number" id="purchasePrice" v-model.number="asset.purchasePrice" step="0.01" min="0" required />
    </div>

    <div>
      <label for="purchaseDate">Purchase Date:</label>
      <input type="date" id="purchaseDate" v-model="asset.purchaseDate" required />
    </div>

    <div>
      <label for="assessedValue">Assessed Value:</label>
      <input type="number" id="assessedValue" v-model.number="asset.assessedValue" step="0.01" min="0" required />
    </div>

    <div>
      <label for="propertyTaxPerYear">Property Tax Per Year:</label>
      <input type="number" id="propertyTaxPerYear" v-model.number="asset.propertyTaxPerYear" step="0.01" min="0" required />
    </div>

    <div>
      <label for="hasPrimaryResidenceExmption">
        <input type="checkbox" id="hasPrimaryResidenceExmption" v-model="asset.hasPrimaryResidenceExmption" />
        Has Primary Residence Exemption
      </label>
    </div>

    <div>
      <label for="depreciationYears">Depreciation Years:</label>
      <input type="number" id="depreciationYears" v-model.number="asset.depreciationYears" step="0.5" min="0" required />
    </div>

    <div>
      <label for="hoaFees">HOA Fees (Annual):</label>
      <input type="number" id="hoaFees" v-model.number="asset.hoaFees" step="0.01" min="0" required />
    </div>

    <div>
      <label for="insuranceCosts">Insurance Costs (Annual):</label>
      <input type="number" id="insuranceCosts" v-model.number="asset.insuranceCosts" step="0.01" min="0" required />
    </div>

    <div>
      <label for="maintenanceCosts">Maintenance Costs (Annual):</label>
      <input type="number" id="maintenanceCosts" v-model.number="asset.maintenanceCosts" step="0.01" min="0" required />
    </div>

    <div>
      <label for="otherTaxes">Other Taxes (Annual):</label>
      <input type="number" id="otherTaxes" v-model.number="asset.otherTaxes" step="0.01" min="0" required />
    </div>

    <footer>
      <button type="submit">Update Asset</button>
    </footer>
  </form>
</template>

<style scoped>
form {
  max-width: 600px;
  margin: 0 auto;
}

div {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

input[type="text"],
input[type="number"],
input[type="date"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}

label:has(input[type="checkbox"]) {
  display: flex;
  align-items: center;
  cursor: pointer;
}

button {
  background-color: #2196F3;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #0b7dda;
}
</style>
