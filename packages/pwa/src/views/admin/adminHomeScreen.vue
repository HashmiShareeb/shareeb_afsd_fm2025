<template>
  <h2 class="text-xl font-semibold mt-8 text-gray-700">
    Manage your Buildings
  </h2>
  <p class="text-gray-500 mt-2">
    Here you can manage your buildings and view details. (visible only to ADMIN)
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
        <p class="text-gray-600 text-sm">
          Add, edit, or remove buildings. (this is for the facility manager
          example) you should see this as an ADMIN
        </p>
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
import { Building2, Eye } from 'lucide-vue-next'

const { userRole } = useCustomUser()
</script>
