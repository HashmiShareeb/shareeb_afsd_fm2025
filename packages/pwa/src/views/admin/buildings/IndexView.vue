<template>
  <AppToast v-if="success" type="success" title="Round Added Successfully" />
  <AppToast v-if="error" type="error" :title="error.message" />
  <AppToast v-if="roomSuccess" type="success" title="Room Added Successfully" />
  <AppToast
    v-if="successEdit"
    type="success"
    title="Building Updated Successfully"
  />
  <AppToast v-if="updateError" type="error" :title="updateError.message" />
  <div class="flex justify-between items-center mb-6">
    <div class="inline-flex items-center gap-2">
      <Building
        class="text-orange-500 w-10 h-10 bg-orange-100 rounded-full py-1.5 px-2"
      />
      <h2 class="text-xl font-semibold text-gray-700">Manage your Buildings</h2>
    </div>
    <input
      v-model="search"
      type="search"
      name="search"
      id="search"
      placeholder="Search buildings..."
      class="ml-auto w-full lg:w-96 border border-gray-300 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-shadow shadow-sm bg-white text-gray-700"
    />
    <button
      @click="openModal"
      class="mx-4 inline-block text-sm text-orange-600 bg-orange-100 rounded-md hover:bg-orange-200 p-2"
    >
      Add +
    </button>
  </div>

  <div v-if="buildings.length">
    <div
      v-for="b in filteredBuildings"
      :key="b.id"
      class="border p-4 mb-4 rounded-xl bg-white"
    >
      <!-- flex container: image never grows / shrinks -->
      <div class="flex gap-6">
        <!-- fixed-size image -->
        <img
          :src="b.imageUrl ? b.imageUrl : placeholderImage"
          :alt="b.name"
          class="w-96 object-cover rounded-lg shrink-0"
        />

        <!-- right column -->
        <div class="flex-1 flex flex-col">
          <!-- top info -->
          <div>
            <h2 class="font-medium text-lg text-gray-700">{{ b.name }}</h2>
            <p class="text-md text-gray-500">{{ b.address }}</p>
            <p
              class="text-gray-500 bg-slate-100 rounded-md w-fit px-2 py-1 text-sm mt-2"
            >
              {{ b.type }}
            </p>
          </div>

          <!-- spacer pushes buttons to bottom -->
          <div class="flex-1 mt-4">
            <button
              class="inline-flex items-center text-sm text-orange-500"
              @click="openRoomModal(b.buildingId)"
            >
              <PlusIcon class="w-4 h-4 mr-1" /> Add Room(s)
            </button>

            <button
              class="text-sm text-gray-500 ml-4 cursor-pointer hover:underline inline-flex items-center gap-1"
              @click="toggleExpanded(b.buildingId)"
              :disabled="!b.rooms?.length"
            >
              {{ b.rooms?.length ?? 0 }} Room(s)
              <ChevronUpIcon
                v-if="expanded.includes(b.buildingId)"
                class="w-4 h-4"
              />
              <ChevronDownIcon v-else class="w-4 h-4" />
            </button>

            <!-- rooms grid (never affects outer flex) -->
            <div
              v-if="expanded.includes(b.buildingId) && b.rooms?.length"
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
            >
              <div
                v-for="room in b.rooms"
                :key="room.id"
                class="border p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                <h3 class="font-medium text-gray-700">{{ room.name }}</h3>
                <p class="text-sm text-gray-500">Floor: {{ room.floor }}</p>
                <p class="text-sm text-gray-500">
                  Capacity: {{ room.capacity }}
                </p>
              </div>
            </div>
          </div>

          <!-- bottom actions row – always pinned -->
          <div
            class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mt-4 pt-4 border-t border-gray-100"
          >
            <!-- building id + copy -->
            <div class="flex items-center text-gray-500 mr-auto gap-1">
              <span>{{ b.buildingId }}</span>
              <button
                @click="copyToClipboard(b.buildingId)"
                class="p-1 rounded hover:bg-gray-100"
                type="button"
                :title="`Copy ${b.name} to clipboard`"
              >
                <Clipboard class="w-4 h-4" />
              </button>
            </div>

            <!-- action buttons -->
            <!-- <Pencil class="w-3 h-3" /> Edit -->
            <button
              class="inline-flex items-center gap-1 text-gray-700 hover:underline"
              @click="openEditModal(b)"
            >
              <Pencil class="w-3 h-3" />
              <span>Edit</span>
            </button>
            <router-link
              :to="`/admin/buildings/${b.buildingId}`"
              class="inline-flex items-center gap-1 text-gray-700 hover:underline"
            >
              <EyeIcon class="w-3 h-3" /> View
            </router-link>

            <button
              class="inline-flex items-center gap-1 text-red-500 hover:underline"
              @click="deleteBuilding(b.buildingId)"
              type="button"
            >
              <TrashIcon class="w-3 h-3" /> Delete
            </button>
          </div>
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

      <!-- <label class="text-gray-500 font-medium text-base">Building Image</label>
      <button
        type="button"
        class="btn-primary rounded-lg"
        @click="openUploadWidget()"
      >
        Upload Image
      </button>

      <div class="w-full h-32 rounded-lg overflow-hidden" v-if="form.imageUrl">
        <img
          :src="form.imageUrl"
          class="w-full h-full object-cover"
          alt="Preview"
        />
      </div> -->

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
          {{ loading ? 'Submitting...' : 'Submit Building' }}
        </button>
      </div>

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
          :disabled="loadingRoom"
        >
          <svg
            v-if="loading && loadingRoom"
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
          {{ loading ? 'Submitting...' : 'Submit Room' }}
        </button>
      </div>

      <p v-if="roomSuccess" class="text-green-600 text-sm">Room added!</p>
      <p v-if="roomError" class="text-red-600 text-sm">
        Error adding room: {{ roomError.message }}
      </p>
    </form>
  </ModalView>

  <!-- edit building modal -->
  <ModalView
    v-if="showEditModal"
    title="Edit Building"
    @close="showEditModal = false"
  >
    <form @submit.prevent="updateBuilding" class="grid gap-4">
      <label for="name" class="text-gray-500 font-medium text-base">Name</label>
      <input v-model="editForm.name" type="text" class="input" />

      <label for="address" class="text-gray-500 font-medium text-base"
        >Address</label
      >
      <input v-model="editForm.address" type="text" class="input" />

      <label for="type" class="text-gray-500 font-medium text-base">Type</label>
      <select v-model="editForm.type" class="input">
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
        v-model="editForm.description"
        rows="4"
        class="input"
      ></textarea>

      <!-- <label for="imageUrl" class="text-gray-500 font-medium text-base"
        >Image URL</label
      >
      <input
        v-model="editForm.imageUrl"
        type="text"
        class="input"
        placeholder="Paste image URL"
      />

      <div
        v-if="editForm.imageUrl"
        class="w-full h-32 rounded-lg overflow-hidden"
      >
        <img
          :src="editForm.imageUrl"
          class="w-full h-full object-cover"
          alt="Preview"
        />
      </div> -->

      <div class="flex justify-end gap-3 pt-2">
        <button
          type="button"
          @click="showEditModal = false"
          class="px-4 py-2 bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="btn-primary rounded-md flex items-center justify-center"
          :disabled="updating"
        >
          {{ updating ? 'Updating...' : 'Update Building' }}
        </button>
      </div>

      <p v-if="updateError" class="text-red-600 text-sm">
        Error updating building: {{ updateError.message }}
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
  ChevronDownIcon,
  ChevronUpIcon,
} from 'lucide-vue-next'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_ALL_BUILDINGS_WITH_ROOMS } from '@/graphql/building.entity'
import {
  ADD_ROOM_TO_BUILDING,
  CREATE_BUILDING,
  REMOVE_BUILDING,
  UPDATE_BUILDING,
} from '@/graphql/building.mutations'
import ModalView from '@/components/generic/ModalView.vue'
import type { BuildingType } from '@/interfaces/building.interface'
import placeholderImage from '@/assets/placeholder-image.jpg'
import AppToast from '@/components/toast/AppToast.vue'

const showModal = ref(false)
const showRoomModal = ref(false)
const showEditModal = ref(false)

const expanded = ref<string[]>([])

const search = ref('')

const filteredBuildings = computed(() => {
  const term = search.value.toLowerCase()

  return buildings.value.filter((b: BuildingType) =>
    [b.name, b.address, b.type]
      .filter(Boolean)
      .some(val => val.toLowerCase().includes(term)),
  )
})

const openModal = () => {
  showModal.value = true
  console.log('Modal opened')
}

// const currentBuildingId = ref<string>('')

const {
  mutate: updateBuildingMutation,
  loading: updating,
  error: updateError,
} = useMutation(UPDATE_BUILDING)

const openEditModal = (building: BuildingType) => {
  currentBuildingId.value = building.buildingId
  editForm.value = { ...building }
  showEditModal.value = true

  console.log('edit this!')
}

//*BUILDING

const { result, refetch } = useQuery(GET_ALL_BUILDINGS_WITH_ROOMS)
const buildings = computed(() => result.value?.buildings ?? [])

const { mutate, loading, error } = useMutation(CREATE_BUILDING, {})
const { mutate: removeBuildingMutation } = useMutation(REMOVE_BUILDING)

const form = ref({
  name: '',
  address: '',
  type: '',
  description: '',
  // imageUrl: '',
})

const editForm = ref({
  name: '',
  address: '',
  type: '',
  description: '',
  // imageUrl: '',
})

const success = ref(false)

const addBuilding = async () => {
  try {
    await mutate({
      createBuildingInput: { ...form.value },
    })

    success.value = true
    showModal.value = false

    // Reset form
    form.value = {
      name: '',
      address: '',
      type: '',
      description: '',
      // imageUrl: '',
    }
    await refetch()
  } catch (err) {
    console.error('Mutation error:', err)
  }
}
const deleteBuilding = async (buildingId: string) => {
  if (!window.confirm('You are deleting this image')) return
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

    await refetch()
  } catch (e) {
    console.error('Room mutation error', e)
  } finally {
    roomForm.value = { name: '', floor: 0, capacity: 0 }
  }
}

const successEdit = ref(false)
// Submit edit
const updateBuilding = async () => {
  try {
    await updateBuildingMutation({
      buildingId: currentBuildingId.value,
      updateBuildingInput: {
        name: editForm.value.name,
        address: editForm.value.address,
        type: editForm.value.type,
        description: editForm.value.description,
        //imageUrl: editForm.value.imageUrl,
      },
    })
    showEditModal.value = false
    await refetch()
    successEdit.value = true
  } catch (err) {
    console.error('Update failed:', err)
  }
}

const toggleExpanded = (buildingId: string) => {
  if (expanded.value.includes(buildingId)) {
    expanded.value = expanded.value.filter(id => id !== buildingId)
  } else {
    expanded.value.push(buildingId)
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

// const widget = window.cloudinary.createUploadWidget(
//   {
//     cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
//     upload_preset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
//     // multiple: false,
//   },
//   (error, result) => {
//     console.log(error)
//     console.log(result)
//   },
// )

//const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
</script>
