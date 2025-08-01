<!-- src/views/birds/_slug.vue -->
<template>
  <div>
    <img
      src="https://imgs.search.brave.com/oO0zd--K-7KYsVrA_b1q0J7_kxMQtZ7ShGh9JrekRmU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vdmFyaWFu/dHMvRkpLUkY4cXJ0/RFhpNFFOZjNtYmdC/ck5oLzYyNGYwZGMx/ZGZmOWJkY2NhYjAz/MmY5M2MzM2U3OWRl/Nzg0ODE3NzBlNzll/MjFkM2IwNDY5ZGFm/NTFmMDI3OTc"
      alt=""
      class="h-auto rounded-xl"
    />
    <h1 class="text-2xl font-bold mt-4">
      {{ buildingDetails }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const buildingDetails = route.params.slug
</script>
