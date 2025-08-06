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
    <div
      class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
      v-if="userRole === 'ADMIN'"
    >
      <!-- Manage Buildings (visible only to ADMIN) -->
      <div class="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
        <Building class="text-orange-500 w-8 h-8" />
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
    <!-- Rounds to do -->
    <div>
      <h2 class="text-xl font-semibold mt-8 text-gray-700">Rounds to do</h2>
      <div
        class="flex items-start gap-4 p-4 bg-white shadow-md rounded-lg mt-4"
      >
        <MapPin class="text-orange-500 w-8 h-8 mt-1" />
        <div>
          <h2 class="text-lg font-semibold">Building A</h2>
          <p class="text-gray-600 text-sm mb-4">ergenstraat 42</p>
          <div class="flex flex-col gap-2">
            <!-- room section -->
            <div class="flex items-center gap-3 mb-4">
              <span class="font-medium text-gray-800">Lokaal: 101</span>
              <span
                class="px-2 py-1 rounded text-xs bg-green-100 text-green-700"
              >
                Gecontroleerd
              </span>
              <span
                class="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs"
              >
                Checklist ingevuld
              </span>
            </div>
            <div class="flex items-center gap-3 mb-4">
              <span class="font-medium text-gray-800">Lokaal: 104</span>
              <span
                class="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700"
              >
                In behandeling
              </span>
            </div>
            <div class="flex items-center gap-3 mb-4">
              <span class="font-medium text-gray-800">Lokaal: 105</span>
              <span class="px-2 py-1 rounded text-xs bg-red-100 text-red-700">
                Niet gestart
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- v-else (for now not dynamic because im setting up the base UI) -->
      <h2 class="text-xl font-semibold mt-8 text-gray-700">if no rounds</h2>
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
import { GET_BUILDINGS } from '@/graphql/building.entity'
import { OWN_USER_ACCOUNT } from '@/graphql/user.query'
import { useQuery } from '@vue/apollo-composable'
import { Building, Eye, CalendarSearch, MapPin } from 'lucide-vue-next'
import { computed, watch } from 'vue'
const { firebaseUser } = useFirebase()

const variables = computed(() => {
  return firebaseUser.value?.uid ? { uid: firebaseUser.value.uid } : null
})

// Compute whether to skip query
const shouldSkip = computed(() => !firebaseUser.value?.uid)

const { result, error, refetch } = useQuery(OWN_USER_ACCOUNT, variables, {
  fetchPolicy: 'network-only',
  enabled: computed(() => !shouldSkip.value),
})

const getBuildings = useQuery(GET_BUILDINGS)
const buildings = computed(() => getBuildings.result.value?.buildings ?? [])

console.log('Buildings:', buildings.value)

// Refetch user data when firebaseUser changes
watch(firebaseUser, newVal => {
  if (newVal?.uid) {
    refetch()
  }
})

// Debug logs
watch(result, newVal => {
  console.log('Raw result:', JSON.stringify(newVal, null, 2))
  console.log('User by UID:', newVal?.userByUid)
})
watch(firebaseUser, newVal => {
  console.log('firebaseUser UID:', newVal?.uid)
})
watch(error, newVal => {
  if (newVal) console.error('GraphQL query error:', newVal)
})
// Compute role
const userRole = computed(() => {
  const role = result.value?.userByUid?.role || null
  console.log('Computed userRole:', role)
  return role ? role.toUpperCase() : null
})
</script>
