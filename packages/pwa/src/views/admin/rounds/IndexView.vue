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
      <li
        v-for="round in rounds"
        :key="round.id"
        class="mb-2 p-3 bg-white rounded shadow flex justify-between items-center"
      >
        <div>
          <span class="font-medium text-gray-800">{{ round.name }}</span>
          <span class="text-gray-500 text-sm ml-2"
            >Assigned to: {{ round.assignedTo?.name || 'N/A' }}</span
          >
        </div>
        <div>
          <span class="text-gray-400 text-xs uppercase">{{
            round.status
          }}</span>
        </div>
      </li>
      <li v-if="!rounds.length" class="text-gray-400 text-center py-4">
        No rounds found.
      </li>
    </ul>
  </div>

  <!-- modal for rounds -->
  <ModalView v-if="showModal" @close="showModal = false" title="Add New Round">
    <form class="grid gap-4" @submit.prevent="submitRound">
      <label for="name" class="text-gray-500 font-medium text-base"
        >Round Name</label
      >
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
      <!-- Rooms only show when building selected -->
      <div v-if="availableRooms.length">
        <label class="text-gray-500 font-medium mx-2">Rooms & Order</label>
        <div
          v-for="(room, index) in form.rooms"
          :key="index"
          class="flex gap-2 items-center"
        >
          <select v-model="form.rooms[index].roomId" class="input flex-1">
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
            v-model.number="form.rooms[index].order"
            type="number"
            min="1"
            class="input w-20"
          />
          <button type="button" @click="removeRoom(index)">
            <XIcon class="w-4 h-4 text-red-500" />
          </button>
        </div>
        <button
          type="button"
          @click="addRoom"
          class="btn-secondary text-sm mt-2"
        >
          + Add Room
        </button>
      </div>

      <button
        type="submit"
        class="btn-primary rounded-full"
        :disabled="loading"
      >
        {{ loading ? 'Creating...' : 'Add Round' }}
      </button>

      <p v-if="success" class="text-green-600 text-sm mt-2">Round added!</p>
      <p v-if="error" class="text-red-600 text-sm mt-2">
        {{ error.message }}
      </p>
    </form>
  </ModalView>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_ROUNDS } from '@/graphql/round.entity'
import ModalView from '@/components/generic/ModalView.vue'
import { GET_ALL_BUILDINGS_WITH_ROOMS } from '@/graphql/building.entity'
import { GET_MANAGERS } from '@/graphql/user.query'
import type { BuildingType } from '@/interfaces/building.interface'
import { CREATE_ROUND } from '@/graphql/round.mutations'
import { XIcon } from 'lucide-vue-next'

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

const showModal = ref(false)

const openModal = () => {
  console.log('Open modal to add a new round')
  showModal.value = true
}

// Mutation
const { mutate: createRound, loading, error } = useMutation(CREATE_ROUND)

// Form state
const form = ref({
  name: '',
  buildingId: '',
  assignedToId: '',
  rooms: [] as { roomId: string; order: number }[],
})

const success = ref(false)

const submitRound = async () => {
  try {
    await createRound({
      createRoundInput: {
        name: form.value.name,
        assignedToId: form.value.assignedToId,
        buildingId: form.value.buildingId,
        rooms: form.value.rooms,
      },
    })
    success.value = true
    showModal.value = false
    await refetch()
    form.value = { name: '', buildingId: '', assignedToId: '', rooms: [] }
  } catch (err) {
    console.error('Error creating round:', err)
  }
}

const availableRooms = computed(() => {
  const building = buildings.value.find(
    (b: BuildingType) => b.buildingId === form.value.buildingId,
  )
  return building?.rooms || []
})

const addRoom = () => {
  form.value.rooms.push({ roomId: '', order: form.value.rooms.length + 1 })
}
const removeRoom = (index: number) => {
  form.value.rooms.splice(index, 1)
}
</script>
