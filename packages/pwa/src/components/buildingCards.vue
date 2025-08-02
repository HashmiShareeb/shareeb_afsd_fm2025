<template>
  <div>
    <div class="bg-white shadow-md rounded-lg p-4 h-full">
      <h2 class="text-lg font-semibold mb-4">{{ myBuildings.name }}</h2>
      <p class="text-gray-700">{{ myBuildings.address }}</p>
      <p class="text-gray-500 bg-slate-100 rounded-md w-fit px-2 py-1.2">
        {{ myBuildings.type }}
      </p>
      <!-- <p class="text-gray-500">{{ myBuildings.description }}</p> -->
      <p class="text-gray-500 mt-1">{{ myBuildings.rooms.length }} room(s)</p>
      <!-- <p class="text-gray-500 mt-1">
        {{ myBuildings.rooms[0].capacity || '' }}
      </p> -->
      <div class="mt-4 flex gap-2">
        <router-link
          :to="{ name: 'building-details', params: { slug: myBuildings.name } }"
          class="btn-primary rounded-md"
        >
          Details
        </router-link>
        <button
          class="btn-secondary rounded-md"
          v-if="userRole === 'ADMIN'"
          @click="testKnopje"
        >
          Bewerk
        </button>
        <!-- <button class="btn">Bewerk</button> -->
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

const testKnopje = () => {
  alert('test knopje clicked')
  // You can add more functionality here, like opening a modal or redirecting
  // to an edit page.
}

restoreCustomUser()
</script>
