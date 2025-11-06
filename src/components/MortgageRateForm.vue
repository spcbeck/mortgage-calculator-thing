<script setup lang="ts">
import { ref, watch } from 'vue'
import { getMortgageDetails, getLatestMortgageRate } from '@/services/MortgageNinja/MortgageNinjaService';
import InputGroup from './shared/InputGroup.vue';

const estimatedMonthlyPayment = ref(0)
const useLoanAmountMethod = ref(false);

const home_value = ref(0)
const downpayment = ref(0)
const loan_amount = ref(0)
const interest_rate = ref(5.5)
const loan_term = ref(30)
const property_tax = ref(0)
const home_insurance = ref(0)
const hoa_fees = ref(0)

async function getAverageNationwideRate() {
  const response = await getLatestMortgageRate();

  interest_rate.value = response[0]?.data.frm_30 as number;
}

const disableForm = ref(true);

// Watch for changes in home_value and downpayment
watch([home_value, downpayment, loan_amount], () => {
  // Enable form if (home_value AND downpayment have values) OR (loan_amount has value)
  disableForm.value = !((home_value.value && downpayment.value) || loan_amount.value);
});


async function handleSubmit() {
  const baseParams = {
    interest_rate: interest_rate.value,
    duration_years: loan_term.value,
    annual_property_tax: property_tax.value,
    annual_home_insurance: home_insurance.value,
    monthly_hoa: hoa_fees.value,
  };

  const mortgageParams = useLoanAmountMethod.value
    ? { ...baseParams, loan_amount: loan_amount.value }
    : { ...baseParams, home_value: home_value.value, downpayment: downpayment.value };

  const response = await getMortgageDetails(mortgageParams);

  estimatedMonthlyPayment.value = response.monthly_payment.total;

  // TODO: Implement asset creation with generated ID and saving to some storage. maybe localStorage for demoing
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <header>
      <h2>Mortgage Details</h2>
    </header>
    <div class="form-check">
      <input type="checkbox" class="form-check-input" id="loan-amount-checkbox" v-model="useLoanAmountMethod" />
      <label class="form-check-label" for="loan-amount-checkbox">Use loan amount as base <br /> <small>instead of house price and down
        payment</small></label>
    </div>
    <div class="row" v-if="!useLoanAmountMethod">
      <!-- could probably be config based, array of input fields with a repeater -->
      <div class="col">
        <InputGroup id="home_value" label="Property Value:" v-model="home_value" icon="$" />
      </div>
      <div class="col">
        <InputGroup id="downpayment" label="Down Payment:" v-model="downpayment" icon="$" />
      </div>
    </div>
    <div class="row">
      <div class="col" v-if="useLoanAmountMethod">
        <InputGroup id="loan_amount" label="Loan Amount:" v-model="loan_amount" icon="$" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <InputGroup id="interest_rate" label="Interest Rate:" v-model="interest_rate" icon="%" icon-alignment="right" />
      </div>
      <div class="col">
        <button class="btn btn-secondary input-btn" type="button" @click="getAverageNationwideRate">Use Current Average Rate</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <InputGroup id="home_insurance" label="Home Insurance (annual):" v-model="home_insurance" icon="$" />
      </div>
      <div class="col">
        <InputGroup id="property_tax" label="Property Tax (annual):" v-model="property_tax" icon="$" />
      </div>
    </div>
    <div class="row">
      <dic class="col">
        <InputGroup id="loan_term" label="Loan Term" v-model="loan_term" icon="" />
      </dic>
      <div class="col">
        <InputGroup id="hoa_fees" label="HOA Fees (monthly):" v-model="hoa_fees" icon="$" />
      </div>
    </div>
    <footer>
      <button class="btn btn-primary mt-3" type="submit" >Get average rates for loan</button>
    </footer>
  </form>
  <div v-if="estimatedMonthlyPayment">
    <p>Estimated Total Monthly Payment: {{ estimatedMonthlyPayment.toLocaleString('en-us', {
      style: 'currency',
      currency: 'USD',
    }) }}</p>
  </div>
</template>

<style scoped>
footer button {
  float: right;
}
.input-btn {
  align-content: end;;
}
</style>
