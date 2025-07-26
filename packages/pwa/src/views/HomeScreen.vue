<template>
  <div>
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
    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Manage Buildings -->
      <div class="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
        <Building class="text-orange-500 w-8 h-8" />
        <div>
          <h2 class="text-lg font-semibold">Manage Buildings</h2>
          <p class="text-gray-600 text-sm">Add, edit, or remove buildings.</p>
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

    <!-- Rounds to do -->
    <div>
      <h2 class="text-xl font-semibold mt-8 text-gray-700">Rounds to do</h2>
      <!-- Example: List of rooms in the current round -->
      <div class="mt-4 bg-white p-4 shadow-md rounded-lg">
        <div class="inline-flex items-center gap-2 mb-4">
          <MapPin class="text-orange-500 w-6 h-6" />
          <span class="text-gray-600 text-md text-gray-700">Building A</span>
        </div>
        <div class="flex items-center gap-3 p-4 mb-2">
          <span class="font-medium text-gray-800">Lokaal: 101</span>
          <span class="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
            Gecontroleerd
          </span>
          <span
            class="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs"
          >
            Checklist ingevuld
          </span>
        </div>
        <div class="flex items-center gap-3 p-4 mb-2">
          <span class="font-medium text-gray-800">Lokaal: 102</span>
          <span class="px-2 py-1 rounded text-xs bg-gray-100 text-gray-500">
            Niet gecontroleerd
          </span>
        </div>
        <!-- <div
          class="flex items-center gap-3 bg-white p-4 shadow-md rounded-lg mb-2"
        >
          <span class="font-medium text-gray-800">Lokaal: 103</span>
          <span class="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
            Gecontroleerd
          </span>
        </div> -->
      </div>

      <!-- v-else (for now not dynamic because im setting up the base UI) -->
      <div class="mt-4">
        <div class="flex items-center gap-2 bg-white p-4 shadow-md rounded-lg">
          <CalendarSearch class="text-orange-500 w-6 h-6" />
          <p class="text-gray-600">No upcoming rounds scheduled.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useFirebase from '@/composables/useFirebase'
import { Building, Eye, CalendarSearch, MapPin } from 'lucide-vue-next'

const { firebaseUser } = useFirebase()
</script>
