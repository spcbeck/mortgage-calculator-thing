<script setup lang="ts">
import { ref } from 'vue'
import type { Asset } from '../models/Asset'
import { saveAsset } from '@/services/Assets/AssetsApi'
import { useRouter } from 'vue-router'

const router = useRouter()
const saveSuccess = ref(false)
const saveError = ref('')

const asset = ref<Omit<Asset, 'id'>>({
  address: '',
  name: '',
  purchasePrice: 0,
  purchaseDate: new Date(),
  propertyTaxPerYear: 0,
  hasPrimaryResidenceExmption: false,
  depreciationYears: 27.5,
  assessedValue: 0,
  hoaFees: 0,
  insuranceCosts: 0,
  maintenanceCosts: 0,
  otherTaxes: 0
})

async function handleSubmit() {
  try {
    saveError.value = ''
    const savedAsset = await saveAsset(asset.value)
    console.log('Asset saved successfully:', savedAsset)
    saveSuccess.value = true

    // Redirect to assets page after 1.5 seconds
    setTimeout(() => {
      router.push('/assets')
    }, 1500)
  } catch (error) {
    console.error('Error saving asset:', error)
    saveError.value = 'Failed to save asset. Please try again.'
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col">
        <label class="form-label" for="name">Asset Name:</label>
        <input class="form-control" type="text" id="name" v-model="asset.name" required />
      </div>

      <div class="col">
        <label class="form-label" for="address">Address:</label>
        <input class="form-control" type="text" id="address" v-model="asset.address" required />
      </div>
    </div>

    <div class="row">
        <div class="col">
          <label class="form-label" for="purchasePrice">Purchase Price:</label>
          <input class="form-control" type="number" id="purchasePrice" v-model.number="asset.purchasePrice" step="0.01"
            min="0" required />
        </div>

        <div class="col">
          <label class="form-label" for="purchaseDate">Purchase Date:</label>
          <input class="form-control" type="date" id="purchaseDate" v-model="asset.purchaseDate" required />
        </div>
    </div>

    <div class="row">
      <div class="col">
        <label class="form-label" for="assessedValue">Assessed Value:</label>
        <input class="form-control" type="number" id="assessedValue" v-model.number="asset.assessedValue" step="0.01"
          min="0" required />
      </div>

      <div class="col">
        <div class="form-check">
          <label class="form-check-label" for="hasPrimaryResidenceExmption">
            <input class="form-check-input" type="checkbox" id="hasPrimaryResidenceExmption"
              v-model="asset.hasPrimaryResidenceExmption" />
            Has Primary Residence Exemption
          </label>
        </div>
      </div>
    </div>

    <div>
      <label class="form-label" for="depreciationYears">Depreciation Years:</label>
      <input class="form-control" type="number" id="depreciationYears" v-model.number="asset.depreciationYears"
        step="0.5" min="0" required />
    </div>

    <fieldset>
      <legend>Upkeep Costs</legend>
      <div class="row">
        <div class="col">
          <label class="form-label" for="propertyTaxPerYear">Property Tax (Annual):</label>
          <input class="form-control" type="number" id="propertyTaxPerYear" v-model.number="asset.propertyTaxPerYear"
            step="0.01" min="0" required />
        </div>

        <div class="col">
          <label class="form-label" for="hoaFees">HOA Fees (Annual):</label>
          <input class="form-control" type="number" id="hoaFees" v-model.number="asset.hoaFees" step="0.01" min="0"
            required />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label class="form-label" for="insuranceCosts">Insurance Costs (Annual):</label>
          <input class="form-control" type="number" id="insuranceCosts" v-model.number="asset.insuranceCosts"
            step="0.01" min="0" required />
        </div>

        <div class="col">
          <label class="form-label" for="maintenanceCosts">Maintenance Costs (Annual):</label>
          <input class="form-control" type="number" id="maintenanceCosts" v-model.number="asset.maintenanceCosts"
            step="0.01" min="0" required />
        </div>

        <div class="col">
          <label class="form-label" for="otherTaxes">Other Taxes (Annual):</label>
          <input class="form-control" type="number" id="otherTaxes" v-model.number="asset.otherTaxes" step="0.01"
            min="0" required />
        </div>
      </div>
    </fieldset>

    <div v-if="saveSuccess" class="alert alert-success" role="alert">
      ✓ Asset saved successfully! Redirecting to assets page...
    </div>

    <div v-if="saveError" class="alert alert-danger" role="alert">
      {{ saveError }}
    </div>

    <button type="submit" :disabled="saveSuccess">Add Asset</button>
  </form>
</template>

<style scoped>
div {
  margin-bottom: 1rem;
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
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #45a049;
}
</style>
