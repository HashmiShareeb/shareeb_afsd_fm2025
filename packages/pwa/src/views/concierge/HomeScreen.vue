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

    <h2 class="text-xl font-semibold mt-8 text-gray-700">Rounds to do</h2>

    <div v-if="userRole === Role.MANAGER">
      <div
        class="bg-white rounded-xl shadow overflow-hidden mt-4"
        v-for="(round, idx) in rounds"
        :key="round.roundId"
      >
        <div
          class="p-4 border-b border-gray-200 flex justify-between items-center"
        >
          <h2 class="font-semibold text-gray-700 text-md">
            {{ round.name }}
          </h2>

          <div
            class="flex justify-between items-center cursor-pointer"
            @click="toggleExpand(idx)"
          >
            <ChevronDown
              class="w-5 h-5 text-gray-400 transition-transform"
              :class="{ 'rotate-180': expanded[idx] }"
            />
          </div>
        </div>

        <div class="p-4" v-show="expanded[idx]">
          <div class="mb-4 last:mb-0">
            <div class="flex justify-between items-center mb-2">
              <div class="inline-flex items-center gap-2">
                <MapPin class="text-orange-500 w-5 h-5" />
                <h3 class="text-sm text-gray-700 font-600">
                  Building Name here
                </h3>
              </div>
              <span
                class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {{ round.status }}
              </span>
            </div>
            <div>
              <p class="text-gray-600 text-sm">{{ round.time }}</p>
              <div class="mt-2 flex items-center text-sm">
                <span class="text-gray-500 mr-2">Tasks:</span>
                <span class="font-medium">
                  <div class="flex flex-wrap gap-2">
                    <label class="flex items-center gap-1">
                      <input
                        type="checkbox"
                        class="form-checkbox text-orange-500"
                      />
                    </label>
                  </div>
                </span>
              </div>
            </div>
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
import { computed, ref } from 'vue'

const { firebaseUser } = useFirebase()
const { userRole } = useCustomUser()

const { result: roundsData } = useQuery(GET_ROUNDS)
const rounds = computed(() => roundsData.value?.rounds || [])

const expanded = ref<boolean[]>([])

function toggleExpand(index: number) {
  expanded.value[index] = !expanded.value[index]
}

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
