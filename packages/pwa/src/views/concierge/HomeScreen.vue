<template>
  <div>
    <!-- HomeScreen content -->
    <h1 class="text-2xl font-bold">
      Welcome back,
      <span class="text-orange-500">{{
        firebaseUser?.displayName || 'displayName'
      }}</span>
    </h1>

    <div>
      <!-- Widget Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6">
        <!-- Open Reports Widget -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 mr-4 bg-orange-50 rounded-full">
              <CheckCircle class="text-orange-500 w-5 h-5" />
            </div>
            <div>
              <p class="text-sm">Open Reports</p>
              <p class="text-2xl font-bold text-gray-600 mt-1">
                {{ rounds?.length || 0 }}
              </p>
            </div>
          </div>
        </div>

        <!-- Pending Requests Widget -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-50 mr-4">
              <Clock class="text-yellow-500 w-5 h-5" />
            </div>
            <div>
              <p class="text-sm">Pending Requests</p>
              <p class="text-2xl font-bold text-gray-600 mt-1">
                {{
                  rounds.filter(
                    (r: Round) => r.status === RoundStatus.IN_PROGRESS,
                  ).length
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Completed Widget -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-50 mr-4">
              <Check class="text-green-500 w-5 h-5" />
            </div>
            <div>
              <p class="text-sm">Completed</p>
              <p class="text-2xl font-bold text-gray-600 mt-1">
                {{
                  rounds.filter(
                    (r: Round) => r.status === RoundStatus.COMPLETED,
                  ).length
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rounds to do -->
    <h2 class="text-xl font-semibold mt-8 text-gray-700">Rounds to do</h2>
    <p class="text-gray-600 mt-2">Your tasks and rounds for today:</p>

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
            <span
              :class="`px-2 py-1 text-xs rounded-full ${getStatusColor(round.status)} space-x-8`"
            >
              {{ round.status }}
            </span>
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
          <!-- Color-coded status -->
          <div class="flex items-center gap-2 mb-2">
            <MapPin class="text-orange-500" />
            <span class="text-sm font-semibold flex items-center">
              {{ round.building?.name || 'No building assigned' }}
              <span v-if="round.building?.type" class="ml-2 text-gray-400">
                ({{ round.building.type }})
              </span>
            </span>
          </div>
          <!-- Progress bar -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-1">
              <span class="text-sm text-gray-600">Progress</span>
              <span class="text-sm text-gray-600"
                >{{ calculateProgress(round) }}%</span
              >
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                class="h-2 rounded-full transition-all duration-300 ease-out"
                :class="{
                  'bg-green-500': calculateProgress(round) === 100,
                  'bg-yellow-500':
                    calculateProgress(round) > 0 &&
                    calculateProgress(round) < 100,
                  'bg-gray-500': calculateProgress(round) === 0,
                }"
                :style="{ width: calculateProgress(round) + '%' }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              {{ completedCount(round) }} / {{ totalCount(round) }} tasks
              completed
            </p>
          </div>

          <!-- Room and checklist details -->
          <div v-for="room in round.rooms" :key="room.roomId" class="mb-4">
            <p class="font-semibold mb-2 text-gray-700">
              Room Order:
              <span class="text-orange-500">{{ room.order }}</span>
            </p>

            <!-- checklist items -->
            <label
              v-for="item in room.checklist"
              :key="item.itemId"
              class="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                class="form-checkbox text-orange-500"
                :checked="item.status === 'OK'"
                @change="handleChecklistChange(round, room, item)"
              />
              {{ item.label }}
              <span v-if="item.notes" class="block text-gray-500 italic">
                – {{ item.notes }}
              </span>
            </label>

            <p
              v-if="!(room.checklist && room.checklist.length)"
              class="text-xs text-gray-400"
            >
              No checklist items yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCustomUser from '@/composables/useCustomUser'
import useFirebase from '@/composables/useFirebase'
import { MY_ROUNDS } from '@/graphql/round.entity'
import { UPDATE_CHECKLIST_ITEM } from '@/graphql/round.mutations'
import { Role } from '@/interfaces/custom.user.interface'
import {
  RoundStatus,
  type ChecklistItem,
  type Round,
  type RoundRoom,
} from '@/interfaces/round.interface'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { ChevronDown, CheckCircle, Clock, Check } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { MapPin } from 'lucide-vue-next'

const { firebaseUser } = useFirebase()
const { userRole, userId } = useCustomUser()

const { result: roundsData, refetch: refetchRounds } = useQuery(
  MY_ROUNDS,
  () => ({ userId: userId.value }),
  { enabled: computed(() => !!userId.value) },
)

// const { result: roundsData } = useQuery(GET_ROUNDS)
const rounds = computed(() => roundsData.value?.myRounds || [])

const { mutate: updateChecklistItemMutation } = useMutation(
  UPDATE_CHECKLIST_ITEM,
)

const handleChecklistChange = async (
  round: Round, // the round object
  room: RoundRoom, // the room object
  item: ChecklistItem, // the checklist item
) => {
  const newStatus = item.status === 'OK' ? 'NOT_CHECKED' : 'OK'

  await updateChecklistItemMutation({
    roundId: round.roundId,
    roundRoomId: room.roundRoomId,
    itemId: item.itemId,
    status: newStatus,
  })
  // item.status = newStatus
  await refetchRounds()
}
const expanded = ref<boolean[]>([])
function toggleExpand(index: number) {
  expanded.value[index] = !expanded.value[index]
}

import { watchEffect } from 'vue'

watchEffect(() => {
  console.log('rounds from query', rounds.value) //check if rounds are loaded
})

const calculateProgress = (round: Round): number => {
  const totalItems = round.rooms.reduce(
    (sum, room) => sum + (room.checklist?.length || 0),
    0,
  )
  const completedItems = round.rooms.reduce(
    (sum, room) =>
      sum + (room.checklist?.filter(item => item.status === 'OK').length || 0),
    0,
  )
  return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
}

const totalCount = (round: Round) =>
  round.rooms.reduce((sum, r) => sum + (r.checklist?.length || 0), 0)

const completedCount = (round: Round) =>
  round.rooms.reduce(
    (sum, r) => sum + (r.checklist?.filter(i => i.status === 'OK').length || 0),
    0,
  )

const getStatusColor = (status: string): string => {
  switch (status) {
    case RoundStatus.PLANNED:
      return 'bg-blue-300 text-blue-800'
    case RoundStatus.IN_PROGRESS:
      return 'bg-yellow-300 text-yellow-800'
    case RoundStatus.COMPLETED:
      return 'bg-green-300 text-gray-800'
    default:
      return 'bg-gray-300 text-gray-800'
  }
}

//const { result: buildingData } = useQuery(GET_ALL_BUILDINGS_WITH_ROOMS)
//const buildings = computed(() => buildingData.value?.buildings || [])
</script>
