<template>
  <div>
    <h2 class="text-xl font-semibold mt-8 text-gray-700">Buildings Overview</h2>
    <p class="text-gray-500 mt-2">
      Here you can view all buildings and their details.
    </p>

    <div v-if="loading">Loading...</div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch my-4"
    >
      <!-- <div v-for="building in buildings" :key="building.buildingId">
        <p>{{ building.name }}</p>
      </div> -->

      <BuildingCards
        v-for="building in buildings"
        :key="building.buildingId"
        :myBuildings="building"
      />
    </div>

    <div v-if="error">{{ error.message }}</div>
  </div>
</template>

<script setup lang="ts">
import BuildingCards from '@/components/buildingCards.vue'
import { GET_ALL_BUILDINGS_WITH_ROOMS } from '@/graphql/building.entity'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'

const { result, loading, error } = useQuery(GET_ALL_BUILDINGS_WITH_ROOMS)
const buildings = computed(() => result.value?.buildings ?? [])
</script>
