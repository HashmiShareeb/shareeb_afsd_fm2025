<!-- src/views/birds/_slug.vue -->
<template>
  <div>
    {{ buildingDetails }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const buildingDetails = route.params.slug
</script>
