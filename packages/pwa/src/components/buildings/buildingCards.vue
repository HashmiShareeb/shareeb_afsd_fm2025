<template>
  <article
    class="bg-white shadow-md rounded-lg p-4 h-full"
    aria-labelledby="building-title"
  >
    <header>
      <h2 id="building-title" class="text-lg font-semibold mb-4">
        {{ myBuildings.name }}
      </h2>
    </header>
    <address class="not-italic text-gray-700">
      {{ myBuildings.address }}
    </address>
    <p class="text-gray-500 bg-gray-100 rounded-md w-fit px-2 py-1.2 mt-2">
      {{ myBuildings.type }}
    </p>
    <p class="text-gray-500 mt-1">{{ myBuildings.rooms.length }} room(s)</p>

    <nav class="mt-4 flex gap-2" aria-label="Building actions">
      <router-link
        :to="{
          name: 'building-details',
          params: { slug: myBuildings.buildingId },
        }"
        class="btn-primary rounded-md"
        aria-label="View details for {{ myBuildings.name }}"
      >
        Details
      </router-link>
      <router-link
        v-if="userRole === Role.ADMIN"
        :to="{
          name: 'admin-buildings',
          params: { slug: myBuildings.name },
        }"
        class="btn-secondary rounded-md"
        aria-label="Edit {{ myBuildings.name }}"
      >
        Bewerk
      </router-link>
    </nav>
  </article>
</template>

<script setup lang="ts">
import useCustomUser from '@/composables/useCustomUser'
import { Role } from '@/interfaces/custom.user.interface'

defineProps(['myBuildings'])

const { userRole, restoreCustomUser } = useCustomUser()

restoreCustomUser()
</script>
