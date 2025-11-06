<script setup lang="ts">
import { ref } from 'vue';
import { getLatestMortgageRate } from '@/services/MortgageNinja/MortgageNinjaService';

const avg30YearRate = ref<number | null>(null);
const avg15YearRate = ref<number | null>(null);


async function getMortgageQuote() {
  const result = await getLatestMortgageRate();
  if (!result || result.length === 0 || !result[0]) {
    console.error('No mortgage rate data received');
    return;
  }
  avg15YearRate.value = result[0].data.frm_15;
  avg30YearRate.value = result[0].data.frm_30;
}
</script>

<template>
  <section>
    <h1>the main numbers, new numbers, they just came out</h1>
  </section>

  <button class="btn btn-primary mt-3 mb-3" @click="getMortgageQuote">Get Avg. Rates Countrywide</button>
  <p v-if="avg15YearRate !== null">The average 15 year mortgage interest rate is: {{ avg15YearRate }}%</p>
  <p v-if="avg30YearRate !== null">The average 30 year mortgage interest rate is: {{ avg30YearRate }}%</p>

</template>
