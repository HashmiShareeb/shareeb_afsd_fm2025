<template>
  <div
    v-if="loading"
    class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse"
  >
    <div class="flex items-center space-x-2 mb-6">
      <div class="h-4 w-14 bg-gray-200 rounded"></div>
      <div class="h-4 w-4 bg-gray-200 rounded-full"></div>
      <div class="h-4 w-20 bg-gray-200 rounded"></div>
      <div class="h-4 w-4 bg-gray-200 rounded-full"></div>
      <div class="h-4 w-32 bg-gray-200 rounded"></div>
    </div>

    <div class="h-72 sm:h-96 w-full bg-gray-200 rounded-2xl"></div>

    <div class="mt-6 space-y-3">
      <div class="h-9 w-3/5 bg-gray-200 rounded"></div>
      <div class="h-5 w-1/2 bg-gray-200 rounded"></div>
      <div class="h-6 w-24 bg-gray-200 rounded-full"></div>
      <div class="h-5 w-full bg-gray-200 rounded"></div>
      <div class="h-5 w-4/5 bg-gray-200 rounded"></div>
    </div>

    <div class="mt-10 mb-4 h-7 w-24 bg-gray-200 rounded"></div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="h-28 bg-gray-200 rounded-xl"></div>
    </div>
  </div>
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
    <p class="text-gray-600 mt-1">{{ building?.address }}</p>
    <p class="text-sm bg-gray-200 w-fit px-2 py-1 mt-2 rounded">
      {{ building?.type }}
    </p>
    <p class="mt-4 text-gray-500 font-medium">{{ building?.description }}</p>

    <!-- rooms -->
    <h2 class="text-xl font-semibold mt-8 mb-3">Rooms</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { useRoute } from 'vue-router'
import { GET_BUILDING_BY_ID } from '@/graphql/building.entity'
import placeholderImage from '@/assets/placeholder-image.jpg'
import { computed } from 'vue'

const route = useRoute()
const { result, loading, error } = useQuery(GET_BUILDING_BY_ID, {
  buildingId: route.params.slug,
})

const building = computed(() => result.value?.building)
console.log('slug from URL →', route.params.slug)
</script>
