<template>
  <div>
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4"
    >
      <div>
        <h2 class="text-xl font-semibold text-gray-700">Reports</h2>
        <p class="text-gray-500 mt-2">
          Manage and view your reports, and review your history.
        </p>
      </div>
      <div class="flex flex-col md:flex-row gap-2 md:gap-0">
        <button
          @click="openModal"
          class="mx-0 md:mx-2 inline-block text-sm text-orange-600 bg-orange-100 rounded-md hover:bg-orange-200 p-2"
        >
          report a problem
        </button>
        <button
          @click="openRequestModal"
          class="btn-secondary mx-0 md:mx-2 inline-block text-sm rounded-md"
        >
          Special requests
        </button>
      </div>
    </div>

    <!-- Tab Switcher -->
    <div class="flex border-b border-gray-200 mb-6">
      <button
        @click="selectedTab = 'reports'"
        :class="[
          'py-2 px-4 font-medium text-sm focus:outline-none',
          selectedTab === 'reports'
            ? 'border-b-2 border-orange-500 text-orange-600'
            : 'text-gray-500 hover:text-gray-700',
        ]"
      >
        Reports
      </button>
      <button
        @click="selectedTab = 'requests'"
        :class="[
          'py-2 px-4 font-medium text-sm focus:outline-none',
          selectedTab === 'requests'
            ? 'border-b-2 border-orange-500 text-orange-600'
            : 'text-gray-500 hover:text-gray-700',
        ]"
      >
        Special Requests
      </button>
    </div>

    <!-- Reports List -->
    <div v-if="selectedTab === 'reports'">
      <div v-if="reports.length">
        <div v-for="report in reports" :key="report.reportId">
          <ReportCard :report="report" :buildings="buildings" />
        </div>
      </div>
      <p v-else class="text-gray-500">No reports found.</p>
    </div>

    <!-- Special Requests List -->
    <div v-if="selectedTab === 'requests'" class="mt-4">
      <div v-if="specialRequests.length">
        <RequestCard
          v-for="request in specialRequests"
          :key="request.requestId"
          :specialRequest="request"
          :buildings="buildings"
        />
      </div>
      <p v-else class="text-gray-500">No special requests found.</p>
    </div>

    <!-- Add Report Modal -->
    <ModalView
      v-if="showModal"
      @close="showModal = false"
      title="Report a Problem"
    >
      <form class="grid gap-4" @submit.prevent="submitReport">
        <label class="text-gray-500 font-medium">Title</label>
        <input
          v-model="form.title"
          type="text"
          class="input"
          placeholder="Describe your issue"
        />

        <label class="text-gray-500 font-medium"
          >Description <span class="text-red-500">*</span></label
        >
        <textarea
          v-model="form.description"
          class="input"
          rows="4"
          placeholder="Describe the problem"
          required
        ></textarea>

        <label class="text-gray-500 font-medium">Select Room</label>
        <select v-model="form.roomId" class="input" required>
          <option disabled value="">Select room</option>
          <optgroup v-for="b in buildings" :key="b.buildingId" :label="b.name">
            <option
              v-for="room in b.rooms"
              :key="room.roomId"
              :value="room.roomId"
            >
              {{ room.name }} (Floor: {{ room.floor }})
            </option>
          </optgroup>
        </select>

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
            {{ loading ? 'Submitting...' : 'Submit Report' }}
          </button>
        </div>

        <p v-if="error" class="text-red-600 text-sm">{{ error.message }}</p>
      </form>
    </ModalView>
    <!-- add a specialrequest Modal -->
    <ModalView
      title="Special Request"
      v-if="showModalRequest"
      @close="showModalRequest = false"
    >
      <form class="grid gap-4" @submit.prevent="submitRequest">
        <label class="text-gray-500 font-medium">Title</label>
        <input
          v-model="requestForm.title"
          type="text"
          class="input"
          placeholder="Request report"
        />

        <label class="text-gray-500 font-medium"
          >Description <span class="text-red-500">*</span></label
        >
        <textarea
          v-model="requestForm.description"
          class="input"
          rows="4"
          placeholder="Describe the problem"
          required
        ></textarea>

        <label class="text-gray-500 font-medium">Select Room</label>
        <select v-model="requestForm.roomId" class="input" required>
          <option disabled value="">Select room</option>
          <optgroup v-for="b in buildings" :key="b.buildingId" :label="b.name">
            <option
              v-for="room in b.rooms"
              :key="room.roomId"
              :value="room.roomId"
            >
              {{ room.name }} (Floor: {{ room.floor }})
            </option>
          </optgroup>
        </select>

        <div class="flex justify-end gap-3 pt-2">
          <button
            type="button"
            @click="showModalRequest = false"
            class="px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn-primary rounded-md transition flex items-center justify-center"
            :disabled="loadingRequest"
          >
            <svg
              v-if="loadingRequest"
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
            {{ loadingRequest ? 'Submitting...' : 'Submit Request' }}
          </button>
        </div>
      </form>
    </ModalView>
  </div>
</template>
<script setup lang="ts">
import ReportCard from '@/components/reports/ReportCard.vue'
import RequestCard from '@/components/reports/RequestCard.vue'
import { ref, computed, onMounted, watch } from 'vue'
import ModalView from '@/components/generic/ModalView.vue'
import useCustomUser from '@/composables/useCustomUser'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_ALL_BUILDINGS_WITH_ROOMS } from '@/graphql/building.entity'
import type { BuildingType } from '@/interfaces/building.interface'
import { CREATE_MAINTENANCE_REPORT } from '@/graphql/maintenance-report.entity'
import { MY_MAINTENANCE_REPORT } from '@/graphql/maintenance-report.mutations'
import { CREATE_SPECIAL_REQUEST } from '@/graphql/special-request.mutations'
import { MY_SPECIAL_REQUESTS } from '@/graphql/special-request.entity'

const { restoreCustomUser, userId } = useCustomUser()
const selectedTab = ref<'reports' | 'requests'>('reports')

const showModal = ref(false)
const form = ref({
  title: '',
  description: '',
  roomId: '',
  reportedById: '', //fetched automatically
  buildingId: '',
})

const showModalRequest = ref(false)
const requestForm = ref({
  title: '',
  description: '',
  roomId: '',
  requestedById: '', // fetched automatically
  buildingId: '',
})

const { result: buildingData } = useQuery(GET_ALL_BUILDINGS_WITH_ROOMS)
const buildings = computed(
  () =>
    buildingData.value?.buildings.filter(
      (b: BuildingType) => b.rooms && b.rooms.length > 0,
    ) || [],
)

const { result: reportsData, refetch } = useQuery(
  MY_MAINTENANCE_REPORT,
  () => ({
    userId: userId.value,
  }),
  {
    enabled: computed(() => !!userId.value),
  },
)
const reports = computed(() => reportsData.value?.myMaintenanceReport || [])

const { result: specialRequestData, refetch: refetchRequests } = useQuery(
  MY_SPECIAL_REQUESTS,
  () => ({ userId: userId.value }),
  { enabled: computed(() => !!userId.value) },
)
const specialRequests = computed(
  () => specialRequestData.value?.mySpecialRequests || [],
)

const {
  mutate: createReport,
  loading,
  error,
} = useMutation(CREATE_MAINTENANCE_REPORT)

const {
  mutate: createRequest,
  loading: loadingRequest,
  // error: errorRequest,
} = useMutation(CREATE_SPECIAL_REQUEST)

const openModal = async () => {
  await restoreCustomUser()
  form.value.reportedById = userId.value || ''
  showModal.value = true
  showModalRequest.value = false
}

const openRequestModal = async () => {
  await restoreCustomUser()
  requestForm.value.requestedById = userId.value || ''
  showModalRequest.value = true
  showModal.value = false
}

const submitReport = async () => {
  try {
    await createReport({
      input: { ...form.value },
    })
    await refetch()
    showModal.value = false
    form.value = {
      title: '',
      description: '',
      roomId: '',
      reportedById: userId.value || '',
      buildingId: '',
    }
  } catch (err) {
    console.error('Error creating report:', err)
  }
}

const submitRequest = async () => {
  try {
    await createRequest({
      input: { ...requestForm.value },
    })
    await refetchRequests()
    showModal.value = false
    requestForm.value = {
      title: '',
      description: '',
      roomId: '',
      requestedById: userId.value || '',
      buildingId: '',
    }
  } catch (err) {
    console.error('Error creating request:', err)
  }
}

watch(
  () => form.value.roomId,
  newRoomId => {
    if (!newRoomId) {
      form.value.buildingId = ''
      return
    }
    // Find building that contains the selected room
    const building = buildings.value.find((b: BuildingType) =>
      b.rooms?.some(room => room.roomId === newRoomId),
    )
    if (building) {
      form.value.buildingId = building.buildingId
    }
  },
)

watch(
  () => requestForm.value.roomId,
  newRoomId => {
    if (!newRoomId) {
      requestForm.value.buildingId = ''
      return
    }

    const building = buildings.value.find((b: BuildingType) =>
      b.rooms?.some(room => room.roomId === newRoomId),
    )
    if (building) {
      requestForm.value.buildingId = building.buildingId
    }
  },
)

onMounted(async () => {
  await restoreCustomUser()
  form.value.reportedById = userId.value || ''
  requestForm.value.requestedById = userId.value || ''
})

console.log('Special Requests:', specialRequests.value)
</script>
