<template>
  <div>
    <div class="bg-white shadow-md rounded-lg p-4 h-full">
      <h2 class="text-lg font-semibold mb-4">{{ myBuildings.name }}</h2>
      <p class="text-gray-700">{{ myBuildings.address }}</p>
      <p class="text-gray-500 bg-gray-100 rounded-md w-fit px-2 py-1.2 mt-2">
        {{ myBuildings.type }}
      </p>
      <p class="text-gray-500 mt-1">{{ myBuildings.rooms.length }} room(s)</p>

      <div class="mt-4 flex gap-2">
        <router-link
          :to="{
            name: 'building-details',
            params: { slug: myBuildings.buildingId },
          }"
          class="btn-primary rounded-md"
        >
          Details
        </router-link>
        <router-link
          v-if="userRole === 'ADMIN'"
          :to="{
            name: 'admin-buildings',
            params: { slug: myBuildings.name },
          }"
          class="btn-secondary rounded-md"
        >
          Bewerk
        </router-link>
      </div>
    </div>
  </div>

  <!-- <ul>
    <li></li>
  </ul> -->
</template>

<script setup lang="ts">
import useCustomUser from '@/composables/useCustomUser'

defineProps(['myBuildings'])

const { userRole, restoreCustomUser } = useCustomUser()

restoreCustomUser()
</script>
