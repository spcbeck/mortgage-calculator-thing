<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <header>
      <h1>abstract value generation machine</h1>
    </header>
    <section>
      <h3>the main numbers, new numbers, they just came out</h3>
      <p>
        the money we're getting each month
        <smaller>because we deserve it due to the market</smaller>
      </p>
    </section>
    <nav>
      <ul>
        <li><RouterLink to="/assets">Current Assets</RouterLink></li>
        <li><RouterLink to="/assets/add">Add Asset</RouterLink></li>
      </ul>
    </nav>
    <RouterView />
  </main>
</template>

<style>
li {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
</style>
