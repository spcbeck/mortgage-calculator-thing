<script lang="ts">
</script>

<template>
  <nav class="navbar">
    <router-link class="navbar-brand display-1" to="/">abstract value<br/> generation machine</router-link>
    <div class="" id="navbarSupportedContent">
      <ul class="navbar-nav" role="group">
        <li class="nav-item"><router-link class="nav-link" to="/assets">Assets</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/assets/add">Add Asset</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/calculate-mortgage">Get Loan Rate For Specific Asset</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/income-tax-calculator">Income Tax Calculator</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 1rem;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 1rem;
}

li {
  cursor: pointer;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  padding-right: 1rem;
  border-right: 1px solid var(--bs-primary)
}

li:last-child {
  border-right: none;
  padding-right: 0;
}
</style>
