<template>
  <SkeletonLarge v-if="loading" />
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else-if="building">
    <!-- breadcrumbs -->
    <nav class="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <ol class="list-reset flex">
        <li>
          <router-link to="/" class="hover:underline">Home</router-link>
        </li>
        <li>
          <span class="mx-2">/</span>
        </li>
        <li>
          <router-link to="/buildings" class="hover:underline"
            >Buildings</router-link
          >
        </li>
        <li>
          <span class="mx-2">/</span>
        </li>
        <li class="font-semibold text-gray-800" aria-current="page">
          {{ building?.name }}
        </li>
      </ol>
    </nav>
    <!-- hero image -->
    <img
      :src="building?.imageUrl || placeholderImage"
      :alt="building?.name"
      class="w-full h-64 object-cover rounded-xl"
    />

    <!-- meta -->
    <h1 class="text-3xl font-bold mt-4">{{ building?.name }}</h1>
    <p class="text-gray-600 mt-1 font-500">{{ building?.address }}</p>
    <p class="text-sm bg-gray-200 w-fit px-2 py-1 mt-2 rounded">
      {{ building?.type }}
    </p>
    <p class="mt-4 text-gray-500 font-medium">{{ building?.description }}</p>

    <!-- rooms -->
    <h2 class="text-xl font-semibold mt-8 mb-3">Rooms</h2>
    <div
      v-if="building.rooms && building.rooms.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <div
        v-for="room in building.rooms"
        :key="room.id"
        class="border border-orange-200 rounded-lg p-3 bg-white"
      >
        <h3 class="font-medium">{{ room?.name }}</h3>
        <p class="text-sm text-gray-500">Floor {{ room?.floor }}</p>
        <p class="text-sm text-gray-500">Capacity {{ room?.capacity }}</p>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-600 mt-2">No rooms available for this building.</p>
    </div>
    <!-- Chart components here -->
    <h2 class="text-xl font-semibold mt-8 mb-3">Energy Readings</h2>
    <div v-if="buildingEnergyReadings && buildingEnergyReadings.length">
      <BarChart :myEnergyReadingsBar="buildingEnergyReadings" />
      <EnergyLineChart :myEnergyReadings="buildingEnergyReadings" />
    </div>
    <div v-else>
      <p class="text-gray-600 mt-2">
        no energy reading data available for this building
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { useRoute } from 'vue-router'
import { GET_BUILDING_BY_ID } from '@/graphql/building.entity'
import placeholderImage from '@/assets/placeholder-image.jpg'
import { computed } from 'vue'
import SkeletonLarge from '@/components/skeleton/SkeletonLarge.vue'
//import MiniChart from '@/components/charts/MiniChart.vue'
import EnergyLineChart from '@/components/charts/EnergyLineChart.vue'
import { GET_ENERGY_READINGS_BY_BUILDING } from '@/graphql/energy-reading.entity'
import BarChart from '@/components/charts/BarChart.vue'

const route = useRoute()
const { result, loading, error } = useQuery(GET_BUILDING_BY_ID, {
  buildingId: route.params.slug,
})

const building = computed(() => result.value?.building)

const { result: energyResult } = useQuery(GET_ENERGY_READINGS_BY_BUILDING, {
  buildingId: route.params.slug,
})

const buildingEnergyReadings = computed(
  () => energyResult.value?.energyReadingsByBuilding || [],
)

console.log(buildingEnergyReadings)
console.log('slug from URL →', route.params.slug)
</script>
