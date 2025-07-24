<template>
  <div>
    <div class="bg-white shadow-md rounded-lg p-4">
      <h2 class="text-lg font-semibold">{{ myBuildings.name }}</h2>
      <p class="text-gray-700">{{ myBuildings.address }}</p>
      <p class="text-gray-500 bg-slate-100 rounded-md w-fit px-2 py-1.2">
        {{ myBuildings.type }}
      </p>
      <p class="text-gray-500">{{ myBuildings.description }}</p>
      <div class="mt-4 flex gap-2">
        <router-link
          :to="{ name: 'building-details', params: { slug: myBuildings.name } }"
          class="bg-blue-500 text-white px-4 py-2 rounded outline-none border-none focus:ring-2 focus:ring-blue-300"
        >
          Details
        </router-link>
        <button
          class="bg-orange-500 text-white px-4 py-2 rounded outline-none border-none focus:ring-2 focus:ring-orange-300"
        >
          Bekijk
        </button>
        <button
          class="bg-green-500 text-white px-4 py-2 rounded border-none focus:ring-2 focus:ring-green-300"
        >
          Bewerk
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['myBuildings'])
</script>
