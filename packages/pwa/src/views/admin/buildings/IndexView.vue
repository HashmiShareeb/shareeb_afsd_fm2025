<template>
  <div class="flex justify-between items-center mb-6">
    <div class="inline-flex items-center gap-2">
      <Home
        class="text-orange-500 w-10 h-10 bg-orange-100 rounded-full py-1.5 px-2"
      />
      <h1 class="text-xl font-semibold text-gray-700">Buildings Overview</h1>
    </div>

    <input
      type="search"
      name="search"
      id="search"
      placeholder="Search buildings..."
      class="border border-gray-300 rounded-md py-2 px-4"
    />

    <!-- <p class="mt-2">Manage your buildings here.</p> -->
    <router-link
      :to="{ name: 'admin-building-add', params: { slug: 'new' } }"
      class="mt-2 inline-block text-sm text-orange-600 bg-orange-100 rounded-md hover:bg-orange-200 p-2"
    >
      Add +
    </router-link>
  </div>

  <div v-if="buildings.length">
    <div
      v-for="b in buildings"
      :key="b.id"
      class="border p-4 mb-4 rounded-xl bg-white"
    >
      <img src="" alt="" />
      <h2 class="font-medium text-lg text-gray-700">{{ b.name }}</h2>
      <p class="text-md text-gray-500">{{ b.address }}</p>
      <p
        class="text-gray-500 bg-slate-100 rounded-md w-fit px-2 py-1.2 text-sm mt-2"
      >
        {{ b.type }}
      </p>

      <!-- <RouterLink
        class="text-blue-500 mt-2 block"
        :to="`/admin/buildings/${b.id}`"
      >
        ➤ Lokalen beheren
      </RouterLink> -->

      <div class="flex items-center justify-end gap-2 mt-4">
        <div class="text-sm text-gray-500 flex justify-start mr-auto">
          {{ b.buildingId }}
        </div>
        <!-- <button @click="testKnopje" class="text-sm text-blue-500">edit</button> -->
        <div class="inline-flex items-center gap-1.2">
          <Pencil class="w-3 h-3" />
          <p class="text-sm">Edit</p>
        </div>
        <div class="inline-flex items-center gap-1.2">
          <EyeIcon class="w-3 h-3" />
          <p class="text-sm">View</p>
        </div>
        <div class="inline-flex items-center gap-1.2">
          <TrashIcon class="w-3 h-3" />
          <p class="text-sm">Delete</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EyeIcon, Home, Pencil, TrashIcon } from 'lucide-vue-next'
import { useQuery } from '@vue/apollo-composable'
import { GET_BUILDINGS } from '@/graphql/building.entity'

const { result } = useQuery(GET_BUILDINGS)
const buildings = computed(() => result.value?.buildings ?? [])
</script>
