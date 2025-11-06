<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from './components/MainHeader.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
</script>

<template>
  <main class="mortage-calculator-thing container-fluid">
    <MainHeader />
    <RouterView />

    <footer class="footer-main">
      <p>&copy;2025 abstract value generation machine - made in Boston with ambivalence</p>
    </footer>
  </main>
</template>
<style>

.mortage-calculator-thing {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: auto;
  padding: 1rem;
}

.footer-main {
  text-align: center;
  margin-top: auto;
  padding: 1rem;
  border-top: 1px solid #ccc;
}
</style>
