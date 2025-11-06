<script setup lang="ts">
import { ref } from 'vue'
import type { Component } from 'vue'

const props = defineProps<{
  tabs: { label: string; component: Component }[]
}>()

const activeTabIndex = ref(0)

function setActiveTab(index: number) {
  activeTabIndex.value = index
}
</script>

<template>
  <ul class="nav nav-tabs">
    <li v-for="(tabItem, index) in props.tabs" :key="index" class="nav-item">
      <button
        class="nav-link"
        :class="{ active: activeTabIndex === index }"
        @click="setActiveTab(index)"
      >
        {{ tabItem.label }}
      </button>
    </li>
  </ul>

  <div class="tab-content">
    <div class="tab-pane fade show active">
      <component :is="props.tabs[activeTabIndex]?.component" />
    </div>
  </div>
</template>
