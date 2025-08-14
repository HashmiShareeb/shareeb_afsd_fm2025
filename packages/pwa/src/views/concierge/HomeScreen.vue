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
              <!-- <span
                class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {{ round.status }}
              </span> -->
            </div>
            <div>
              <p class="text-gray-600 text-sm">{{ round.time }}</p>
              <!-- inside the room block -->
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
  type ChecklistItem,
  type Round,
  type RoundRoom,
} from '@/interfaces/round.interface'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { MapPin, ChevronDown } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const { firebaseUser } = useFirebase()
const { userRole, userId } = useCustomUser()

const { result: roundsData } = useQuery(
  MY_ROUNDS,
  () => ({ userId: userId.value }),
  { enabled: computed(() => !!userId.value) },
)

// const { result: roundsData } = useQuery(GET_ROUNDS)
const rounds = computed(() => roundsData.value?.myRounds || [])

const { mutate: updateChecklistItemMutation } = useMutation(
  UPDATE_CHECKLIST_ITEM,
)
// const handleChecklistChange = async (
//   roundId: string,
//   roundRoomId: string,
//   item: ChecklistItem,
// ) => {
//   const newStatus =
//     item.status === ChecklistItemStatus.OK
//       ? ChecklistItemStatus.NOT_CHECKED
//       : ChecklistItemStatus.OK

//   const roundIndex = rounds.value.findIndex((r: Round) => r.roundId === roundId)
//   if (roundIndex !== -1) {
//     const roomIndex = rounds.value[roundIndex].rooms.findIndex(
//       (r: RoundRoom) => r.roundRoomId === roundRoomId,
//     )
//     if (roomIndex !== -1) {
//       const itemIndex = rounds.value[roundIndex].rooms[
//         roomIndex
//       ].checklist.findIndex((i: ChecklistItem) => i.itemId === item.itemId)

//       if (itemIndex !== -1) {
//         // Clone the checklist array and update locally
//         const updatedChecklist = [
//           ...rounds.value[roundIndex].rooms[roomIndex].checklist,
//         ]
//         updatedChecklist[itemIndex] = {
//           ...updatedChecklist[itemIndex],
//           status: newStatus,
//         }

//         // Replace in the rooms array
//         const updatedRoom = {
//           ...rounds.value[roundIndex].rooms[roomIndex],
//           checklist: updatedChecklist,
//         }

//         // Replace in the rounds array
//         const updatedRooms = [...rounds.value[roundIndex].rooms]
//         updatedRooms[roomIndex] = updatedRoom

//         rounds.value[roundIndex] = {
//           ...rounds.value[roundIndex],
//           rooms: updatedRooms,
//         }
//       }
//     }
//   }

//   // Send mutation
//   try {
//     await updateChecklistItemMutation({
//       roundId,
//       roundRoomId,
//       itemId: item.itemId,
//       status: newStatus,
//     })
//   } catch (err) {
//     console.error('Failed to update checklist item', err)
//   }
// }

const handleChecklistChange = async (
  round: Round, // the round object
  room: RoundRoom, // the room object
  item: ChecklistItem, // the checklist item
) => {
  const newStatus = item.status === 'OK' ? 'NOT_CHECKED' : 'OK'

  await updateChecklistItemMutation({
    roundId: round.roundId, // string
    roundRoomId: room.roundRoomId, // string
    itemId: item.itemId, // string
    status: newStatus, // string
  })
}
const expanded = ref<boolean[]>([])
function toggleExpand(index: number) {
  expanded.value[index] = !expanded.value[index]
}

import { watchEffect } from 'vue'

watchEffect(() => {
  console.log('rounds from query', rounds.value) //check if rounds are loaded
})

//const { result: buildingData } = useQuery(GET_ALL_BUILDINGS_WITH_ROOMS)
//const buildings = computed(() => buildingData.value?.buildings || [])
</script>
