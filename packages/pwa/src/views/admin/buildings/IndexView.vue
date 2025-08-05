<template>
  <div class="flex justify-between items-center mb-6">
    <div class="inline-flex items-center gap-2">
      <Building
        class="text-orange-500 w-10 h-10 bg-orange-100 rounded-full py-1.5 px-2"
      />
      <h2 class="text-xl font-semibold text-gray-700">Manage your Buildings</h2>
    </div>

    <input
      type="search"
      name="search"
      id="search"
      placeholder="Search buildings..."
      class="w-96 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-shadow shadow-sm bg-white text-gray-700"
    />

    <button
      @click="openModal"
      class="mt-2 inline-block text-sm text-orange-600 bg-orange-100 rounded-md hover:bg-orange-200 p-2"
    >
      Add +
    </button>
  </div>

  <div v-if="buildings.length">
    <div
      v-for="b in buildings"
      :key="b.id"
      class="border p-4 mb-4 rounded-xl bg-white"
    >
      <img src="" alt="" />
      <h2 class="font-medium text-lg text-gray-700">{{ b.name }}</h2>
      <p class="text-md text-gray-500">{{ b.address }}</p>
      <p
        class="text-gray-500 bg-slate-100 rounded-md w-fit px-2 py-1.2 text-sm mt-2"
      >
        {{ b.type }}
      </p>

      <div class="mt-4">
        <button
          class="inline-flex items-center text-sm text-orange-500"
          @click="openRoomModal(b.buildingId)"
        >
          <PlusIcon class="w-4 h-4 mr-1" /> Add Room(s)
        </button>
      </div>

      <p class="text-sm text-gray-500 mt-2">
        {{ b.rooms?.length ?? 0 }} Room(s) available
      </p>

      <div class="flex items-center justify-end gap-2 mt-4">
        <div
          class="text-sm text-gray-500 flex justify-start mr-auto items-center gap-1"
        >
          <span>{{ b.buildingId }}</span>
          <button
            @click="copyToClipboard(b.buildingId)"
            class="ml-1 p-1 rounded hover:bg-gray-100"
            title="Copy ID"
            type="button"
          >
            <Clipboard class="w-4 h-4" />
          </button>
        </div>
        <!-- <button @click="testKnopje" class="text-sm text-blue-500">edit</button> -->
        <div class="inline-flex items-center gap-1.2">
          <Pencil class="w-3 h-3" />
          <p class="text-sm">Edit</p>
        </div>
        <router-link
          :to="`/admin/buildings/${b.buildingId}`"
          class="inline-flex items-center gap-1.2 hover:underline text-gray-700"
        >
          <EyeIcon class="w-3 h-3" />
          <p class="text-sm">View</p>
        </router-link>
        <div
          class="inline-flex items-center gap-1.2 cursor-pointer text-red-500"
          @click="deleteBuilding(b.buildingId)"
        >
          <TrashIcon class="w-3 h-3" />
          <p class="text-sm">Delete</p>
        </div>
      </div>
    </div>
  </div>
  <!-- building modal-->
  <ModalView
    v-if="showModal"
    title="Add New Building"
    @close="showModal = false"
  >
    <form @submit.prevent="addBuilding" class="grid gap-4">
      <label for="name" class="text-gray-500 font-medium text-base"
        >Building Name</label
      >
      <input
        v-model="form.name"
        type="text"
        placeholder="Building name"
        class="input"
      />
      <label for="address" class="text-gray-500 font-medium text-base"
        >Address</label
      >
      <input
        v-model="form.address"
        type="text"
        placeholder="Address"
        class="input"
      />
      <label for="type" class="text-gray-500 font-medium text-base">Type</label>
      <select v-model="form.type" class="input">
        <option disabled value="">Select type</option>
        <option value="Flat">Flat</option>
        <option value="Campus">Campus</option>
        <option value="Office">Office</option>
        <option value="Classroom">Classroom</option>
        <option value="Lab">Lab</option>
        <option value="Sanitary">Sanitary</option>
      </select>
      <label for="description" class="text-gray-500 font-medium text-base"
        >Description</label
      >
      <textarea
        v-model="form.description"
        placeholder="Description"
        rows="4"
        class="input"
      ></textarea>

      <button
        type="submit"
        class="btn-primary rounded-full"
        :disabled="loading"
      >
        {{ loading ? 'Adding...' : 'Add Building' }}
      </button>

      <p v-if="success" class="text-green-600 text-sm">
        Building added successfully!
      </p>
      <p v-if="error" class="text-red-600 text-sm">
        Error adding building: {{ error.message }}
      </p>
    </form>
  </ModalView>
  <!-- add room  modal-->
  <ModalView
    v-if="showRoomModal"
    title="Add New Room"
    @close="showRoomModal = false"
  >
    <form @submit.prevent="submitRoom" class="grid gap-4">
      <label for="name" class="text-gray-500 font-medium text-base"
        >Room Name</label
      >
      <input
        v-model="roomForm.name"
        type="text"
        placeholder="Room name"
        class="input"
      />
      <label for="floor" class="text-gray-500 font-medium text-base"
        >Floor</label
      >
      <input
        v-model.number="roomForm.floor"
        type="number"
        placeholder="Floor"
        class="input"
      />
      <label for="capacity" class="text-gray-500 font-medium text-base">
        Room Capacity</label
      >
      <input
        v-model.number="roomForm.capacity"
        type="number"
        placeholder="Capacity"
        class="input"
      />

      <button
        type="submit"
        class="btn-primary rounded-full"
        :disabled="loadingRoom"
      >
        {{ loadingRoom ? 'Adding...' : 'Add Room' }}
      </button>

      <p v-if="roomSuccess" class="text-green-600 text-sm">Room added!</p>
      <p v-if="roomError" class="text-red-600 text-sm">
        Error adding room: {{ roomError.message }}
      </p>
    </form>
  </ModalView>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Building,
  EyeIcon,
  Pencil,
  TrashIcon,
  Clipboard,
  PlusIcon,
} from 'lucide-vue-next'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_ALL_BUILDINGS_WITH_ROOMS } from '@/graphql/building.entity'
import {
  ADD_ROOM_TO_BUILDING,
  CREATE_BUILDING,
  REMOVE_BUILDING,
} from '@/graphql/building.mutations'
import ModalView from '@/components/generic/ModalView.vue'

const { result, refetch } = useQuery(GET_ALL_BUILDINGS_WITH_ROOMS)
const buildings = computed(() => result.value?.buildings ?? [])

const showModal = ref(false)
const showRoomModal = ref(false)

const openModal = () => {
  showModal.value = true
  console.log('Modal opened')
}

//*BUILDING
const { mutate, loading, error } = useMutation(CREATE_BUILDING, {})
const { mutate: removeBuildingMutation } = useMutation(REMOVE_BUILDING)

const form = ref({
  name: '',
  address: '',
  type: '',
  description: '',
})

const success = ref(false)

const addBuilding = async () => {
  try {
    await mutate({
      createBuildingInput: { ...form.value },
    })

    success.value = true
    showModal.value = false

    alert('Building added successfully!')

    // Reset form
    form.value = {
      name: '',
      address: '',
      type: '',
      description: '',
    }
    await refetch()
  } catch (err) {
    console.error('Mutation error:', err)
  }
}
const deleteBuilding = async (buildingId: string) => {
  try {
    await removeBuildingMutation({ buildingId })
    await refetch() // Refresh list after deletion
  } catch (err) {
    console.error('Delete failed:', err)
  }
}

//*ROOM
const {
  mutate: addRoomToBuilding,
  loading: loadingRoom,
  error: roomError,
} = useMutation(ADD_ROOM_TO_BUILDING)

const roomSuccess = ref(false)
const currentBuildingId = ref('')
const roomForm = ref({
  name: '',
  floor: 0,
  capacity: 0,
})

const openRoomModal = (buildingId: string) => {
  currentBuildingId.value = buildingId
  roomForm.value = {
    name: '',
    floor: 0,
    capacity: 0,
  }
  showRoomModal.value = true
}

const submitRoom = async () => {
  try {
    await addRoomToBuilding({
      buildingId: currentBuildingId.value,
      createRoomInput: {
        ...roomForm.value,
        buildingId: currentBuildingId.value, // nie vergeten eh shareeeb
      },
    })
    roomSuccess.value = true
    showRoomModal.value = false
    alert('Room added!')
    await refetch()
  } catch (e) {
    console.error('Room mutation error', e)
  } finally {
    roomForm.value = { name: '', floor: 0, capacity: 0 }
  }
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  } catch (err) {
    alert('Failed to copy!')
    console.error('Clipboard error:', err)
  }
}
</script>
