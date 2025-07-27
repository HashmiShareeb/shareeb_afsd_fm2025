<template>
  <div>
    <div class="bg-white shadow-md rounded-lg p-4 h-full">
      <h2 class="text-lg font-semibold">{{ myBuildings.name }}</h2>
      <p class="text-gray-700">{{ myBuildings.address }}</p>
      <p class="text-gray-500 bg-slate-100 rounded-md w-fit px-2 py-1.2">
        {{ myBuildings.type }}
      </p>
      <p class="text-gray-500">{{ myBuildings.description }}</p>
      <div class="mt-4 flex gap-2">
        <router-link
          :to="{ name: 'building-details', params: { slug: myBuildings.name } }"
          class="btn-primary rounded-md"
        >
          Details
        </router-link>
        <button class="btn-secondary rounded-md">Bekijk</button>
        <!-- <button class="btn">Bewerk</button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['myBuildings'])
</script>
