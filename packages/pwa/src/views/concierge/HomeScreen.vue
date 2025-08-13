<template>
  <div>
    <!-- HomeScreen content -->
    <h1 class="text-2xl font-bold">
      Welcome back,
      <span class="text-orange-500">{{
        firebaseUser?.displayName || 'displayName'
      }}</span>
    </h1>
    <p class="text-gray-600 mt-2">Your tasks and rounds for today:</p>

    <!-- Rounds to do -->
    <div v-if="userRole === Role.MANAGER">
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
              <span class="text-gray-800">Lokaal: 101</span>
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
      <!-- <div class="mt-4">
        <div class="flex items-center gap-2 bg-white p-4 shadow-md rounded-lg">
          <CalendarSearch class="text-orange-500 w-6 h-6" />
          <p class="text-gray-600">No upcoming rounds scheduled.</p>
        </div>
      </div> -->
    </div>
    <h2 class="text-xl font-semibold mt-8 text-gray-700">Rounds to do</h2>
    <div
      class="bg-white rounded-xl shadow overflow-hidden mt-4"
      v-for="round in rounds"
      :key="round.roundId"
    >
      <div
        class="p-4 border-b border-gray-200 flex justify-between items-center"
      >
        <h2 class="font-semibold text-gray-700 text-md">
          {{ rounds[0].name }}
        </h2>

        <!-- <span class="text-sm text-gray-500">rondes</span> -->
        <ChevronDown class="w-5 h-5 text-gray-400 cursor-pointer ml-2" />
      </div>

      <div class="p-4">
        <div class="mb-4 last:mb-0">
          <div class="flex justify-between items-center mb-2">
            <div class="inline-flex items-center gap-2">
              <MapPin class="text-orange-500 w-5 h-5" />
              <h3 class="text-sm text-gray-700 font-600">Building Name here</h3>
            </div>
            <span
              class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {{ round.status }}
            </span>
          </div>
          <p class="text-gray-600 text-sm">{{ round.time }}</p>
          <div class="mt-2 flex items-center text-sm">
            <span class="text-gray-500 mr-2">Tasks:</span>
            <span class="font-medium"> checklist here </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCustomUser from '@/composables/useCustomUser'
import useFirebase from '@/composables/useFirebase'
// import { GET_ALL_BUILDINGS_WITH_ROOMS } from '@/graphql/building.entity'
import { GET_ROUNDS } from '@/graphql/round.entity'
import { Role } from '@/interfaces/custom.user.interface'
import { useQuery } from '@vue/apollo-composable'
import { MapPin, ChevronDown } from 'lucide-vue-next'
import { computed } from 'vue'

const { firebaseUser } = useFirebase()
const { userRole } = useCustomUser()

const { result: roundsData } = useQuery(GET_ROUNDS)
const rounds = computed(() => roundsData.value?.rounds || [])

//const { result: buildingData } = useQuery(GET_ALL_BUILDINGS_WITH_ROOMS)
//const buildings = computed(() => buildingData.value?.buildings || [])

// const todaysRounds = [
//   {
//     id: 1,
//     time: '08:00 - 09:30',
//     buildings: ['Hoofdgebouw', 'Vleugel A'],
//     checklists: '12 lokalen',
//     status: 'PLANNED',
//   },
// ]
</script>
