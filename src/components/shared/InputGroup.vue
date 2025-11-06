<script setup lang="ts">
const props = defineProps<{
  label: string
  id: string
  modelValue: number
  icon: string
  iconAlignment?: 'left' | 'right'
}>()
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="form-label" :for="props.id">{{ props.label }}</label>
  <div class="input-group">
    <!-- I don't love the way I handled alignment here -->
    <span v-if="props.iconAlignment && props.iconAlignment ==='left'" class="input-group-text">{{ props.icon }}</span>
    <input type="number" :class="['form-control']" :id="props.id" :name="props.id" :value="props.modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    <span v-if="props.iconAlignment && props.iconAlignment ==='right'" class="input-group-text">{{ props.icon }}</span>
  </div>
</template>

<style scoped>
.right-alignment {
  text-align: right;
}
</style>
