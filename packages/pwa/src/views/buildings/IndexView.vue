<template>
  <div>
    <h1>Buildings</h1>

    <div v-if="loading">Loading...</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
import { GET_BUILDINGS } from '@/graphql/building.entity'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'

const { result, loading, error } = useQuery(GET_BUILDINGS)
const buildings = computed(() => result.value?.buildings ?? [])
</script>
