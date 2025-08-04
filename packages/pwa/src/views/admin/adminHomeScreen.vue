<template>
  <!-- HomeScreen content -->
  <h1 class="text-2xl font-bold">
    Welcome back,
    <span class="text-orange-500">{{
      firebaseUser?.displayName || 'displayName'
    }}</span>
  </h1>
  <p class="text-gray-600 mt-2">
    Here you can manage your buildings and view details.
  </p>
  <!-- Widget Section -->
  <div
    class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
    v-if="userRole === 'ADMIN'"
  >
    <!-- Manage Buildings (visible only to ADMIN) -->
    <div class="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
      <Building2 class="text-orange-500 w-10 h-10" />
      <div>
        <h2 class="text-lg font-semibold">Manage Buildings</h2>
        <!-- <p class="text-gray-600 text-sm">
          Add, edit, or remove buildings. (this is for the facility manager
          example) you should see this as an ADMIN
        </p> -->
        <p class="text-gray-500 text-md mt-1">
          Total buildings: {{ buildings.length }}
        </p>
      </div>
      <div class="flex justify-end mt-auto ml-auto">
        <router-link
          :to="{ name: 'admin-buildings' }"
          class="mt-2 inline-block text-sm text-orange-600 hover:underline"
        >
          building list
        </router-link>
      </div>
    </div>
    <!-- View Details -->
    <div class="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
      <Eye class="text-orange-500 w-8 h-8" />
      <div>
        <h2 class="text-lg font-semibold">View Details</h2>
        <p class="text-gray-600 text-sm">
          Check building information and stats.
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>You do not have access to this section.</p>
  </div>
</template>

<script setup lang="ts">
import useCustomUser from '@/composables/useCustomUser'
import useFirebase from '@/composables/useFirebase'
import { Building2, Eye } from 'lucide-vue-next'
import { GET_BUILDINGS } from '@/graphql/building.entity'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'

const { userRole } = useCustomUser()
const { firebaseUser } = useFirebase()

const { result } = useQuery(GET_BUILDINGS)
const buildings = computed(() => result.value?.buildings ?? [])
</script>
