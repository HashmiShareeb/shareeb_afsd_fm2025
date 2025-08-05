<template>
  <div>
    <h1>Building Details</h1>
    <p>Building ID: {{ buildingId }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// Example: define a reactive variable
const buildingId = ref<string | null>(null)

// You can use route params if using vue-router
// import { useRoute } from 'vue-router'
// const route = useRoute()
// buildingId.value = route.params.slug as string
</script>
