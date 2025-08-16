<template>
  <div class="flex justify-between items-center mb-6">
    <div class="inline-flex items-center gap-2">
      <!-- <Building
        class="text-orange-500 w-10 h-10 bg-orange-100 rounded-full py-1.5 px-2"
      /> -->
      <h2 class="text-xl font-semibold text-gray-700">Rounds</h2>
    </div>

    <button
      @click="openModal"
      class="mx-2 inline-block text-sm text-orange-600 bg-orange-100 rounded-md hover:bg-orange-200 p-2"
    >
      Add +
    </button>
  </div>
  <div>
    <ul>
      <roundsList
        v-for="round in rounds"
        :key="round.roundId"
        :myRounds="round"
      />

      <li v-if="!rounds.length" class="text-gray-400 text-center py-4">
        No rounds found.
      </li>
    </ul>
  </div>

  <!-- modal for rounds -->
  <ModalView v-if="showModal" @close="showModal = false" title="Add New Round">
    <form class="grid gap-4" @submit.prevent="submitRound">
      <label class="text-gray-500 font-medium text-base">Round Name</label>
      <input
        type="text"
        v-model="form.name"
        placeholder="Evening cleanup - 18h30"
        class="input"
      />

      <label class="text-gray-500 font-medium">Building</label>

      <!-- show building with rooms in them otherwise no -->
      <select v-model="form.buildingId" class="input" required>
        <option disabled value="">Select a building</option>
        <option
          v-for="b in buildings"
          :key="b.buildingId"
          :value="b.buildingId"
        >
          {{ b.name }} - {{ b.address }}
        </option>
      </select>
      <label class="text-gray-500 font-medium">Concierge</label>
      <select v-model="form.assignedToId" class="input" required>
        <option disabled value="">Select Concierge</option>
        <option
          v-for="manager in managers"
          :key="manager.id"
          :value="manager.id"
        >
          {{ manager.name }}
        </option>
      </select>

      <!-- Rooms + Checklist Items -->
      <div v-if="availableRooms.length" class="mt-4">
        <label class="text-gray-500 font-medium mx-2">Rooms & Order</label>
        <div
          v-for="(room, roomIndex) in form.rooms"
          :key="roomIndex"
          class="border rounded p-3 mt-3"
        >
          <div class="flex gap-2 items-center mb-2">
            <select v-model="room.roomId" class="input flex-1">
              <option disabled value="">Select Room</option>
              <option
                v-for="r in availableRooms"
                :key="r.roomId"
                :value="r.roomId"
              >
                {{ r.name }}
              </option>
            </select>
            <input
              v-model.number="room.order"
              type="number"
              min="1"
              class="input w-20"
            />
            <button type="button" @click="removeRoom(roomIndex)">
              <XIcon class="w-4 h-4 text-red-500" />
            </button>
          </div>

          <!-- Checklist Items -->
          <div class="mt-2">
            <p class="font-medium text-sm text-gray-700">Checklist Items</p>
            <div
              v-for="(item, itemIndex) in room.checklist"
              :key="itemIndex"
              class="flex gap-2 mt-1"
            >
              <input
                v-model="item.label"
                placeholder="Label"
                class="input flex-1"
              />
              <input
                v-model="item.notes"
                placeholder="Notes"
                class="input flex-1"
              />
              <button
                type="button"
                @click="removeChecklistItem(roomIndex, itemIndex)"
              >
                <XIcon class="w-4 h-4 text-red-500" />
              </button>
            </div>
            <button
              type="button"
              @click="addChecklistItem(roomIndex)"
              class="btn-secondary text-xs mt-1"
            >
              + Add Checklist Item
            </button>
          </div>
        </div>

        <button
          type="button"
          @click="addRoom"
          class="btn-secondary text-sm mt-2"
        >
          + Add Room
        </button>
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <button
          type="button"
          @click="showModal = false"
          class="px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="btn-primary rounded-md transition flex items-center justify-center"
          :disabled="loading"
        >
          <svg
            v-if="loading"
            class="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          {{ loading ? 'Submitting...' : 'Submit Round' }}
        </button>
      </div>

      <p v-if="success" class="text-green-600 text-sm mt-2">Round added!</p>
      <p v-if="error" class="text-red-600 text-sm mt-2">{{ error.message }}</p>
    </form>
  </ModalView>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_ROUNDS } from '@/graphql/round.entity'
import { CREATE_CHECKLIST_ITEM, CREATE_ROUND } from '@/graphql/round.mutations'
import { GET_ALL_BUILDINGS_WITH_ROOMS } from '@/graphql/building.entity'
import { GET_MANAGERS } from '@/graphql/user.query'
import type { BuildingType } from '@/interfaces/building.interface'
import ModalView from '@/components/generic/ModalView.vue'
import { XIcon } from 'lucide-vue-next'
import roundsList from '@/components/rounds/roundsList.vue'

const { result: roundsData, refetch } = useQuery(GET_ROUNDS)
const rounds = computed(() => roundsData.value?.rounds || [])

const { result: buildingData } = useQuery(GET_ALL_BUILDINGS_WITH_ROOMS)
const buildings = computed(
  () =>
    buildingData.value?.buildings.filter(
      (b: BuildingType) => b.rooms && b.rooms.length > 0,
    ) || [],
)

const { result: managerData } = useQuery(GET_MANAGERS)
const managers = computed(() => managerData.value?.usersByRole || [])

console.log(managers.value)

const { mutate: createRound, loading, error } = useMutation(CREATE_ROUND)
const { mutate: addChecklistItemMutation } = useMutation(CREATE_CHECKLIST_ITEM)

const showModal = ref(false)
const openModal = () => {
  showModal.value = true
}

// Form state
const form = ref({
  name: '',
  buildingId: '',
  assignedToId: '',
  rooms: [] as {
    roomId: string
    order: number
    checklist: { label: string; notes?: string }[]
  }[],
})
const success = ref(false)

const availableRooms = computed(() => {
  const building = buildings.value.find(
    (b: BuildingType) => b.buildingId === form.value.buildingId,
  )
  return building?.rooms || []
})

const addRoom = () => {
  form.value.rooms.push({
    roomId: '',
    order: form.value.rooms.length + 1,
    checklist: [],
  })
}
const removeRoom = (index: number) => {
  form.value.rooms.splice(index, 1)
}

const addChecklistItem = (roomIndex: number) => {
  form.value.rooms[roomIndex].checklist.push({ label: '', notes: '' })
}
const removeChecklistItem = (roomIndex: number, itemIndex: number) => {
  form.value.rooms[roomIndex].checklist.splice(itemIndex, 1)
}

const submitRound = async () => {
  try {
    const result = await createRound({
      createRoundInput: {
        name: form.value.name,
        assignedToId: form.value.assignedToId,
        buildingId: form.value.buildingId,
        rooms: form.value.rooms.map(r => ({
          roomId: r.roomId,
          order: r.order,
        })),
      },
    })

    if (!result || !result.data) {
      throw new Error('Failed to create round')
    }

    const newRoundId = result.data.createRound.roundId

    // Add checklist items after round creation
    for (const createdRoom of result.data.createRound.rooms) {
      const checklist =
        form.value.rooms.find(r => r.roomId === createdRoom.roomId)
          ?.checklist || []
      for (const item of checklist) {
        if (item.label.trim()) {
          await addChecklistItemMutation({
            roundId: newRoundId,
            roundRoomId: createdRoom.roundRoomId,
            label: item.label,
            notes: item.notes || '',
          })
        }
      }
    }

    success.value = true
    showModal.value = false
    await refetch()
    form.value = { name: '', buildingId: '', assignedToId: '', rooms: [] }
  } catch (err) {
    console.error('Error creating round with checklist:', err)
  }
}

// const availableRooms = computed(() => {
//   const building = buildings.value.find(
//     (b: BuildingType) => b.buildingId === form.value.buildingId,
//   )
//   return building?.rooms || []
// })

// const addRoom = () => {
//   form.value.rooms.push({ roomId: '', order: form.value.rooms.length + 1 })
// }
// const removeRoom = (index: number) => {
//   form.value.rooms.splice(index, 1)
// }
</script>
