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
          class="btn-secondary mx-0 md:mx-2 inline-block text-sm rounded-md"
        >
          Special requests
        </button>
      </div>
    </div>

    <!-- List of Reports -->
    <div v-if="reports.length">
      <!-- <div
        v-for="report in reports"
        :key="report.reportId"
        class="border p-4 mb-4 rounded-lg bg-white shadow-sm"
      >
        <h3 class="font-medium text-xl text-gray-700">{{ report.title }}</h3>
        <p class="text-gray-600 mb-2">{{ report.description }}</p>
        <p class="text-xs text-gray-400 flex items-center gap-1">
          <span class="flex items-center font-medium">
            <UserRoundIcon class="inline-block w-4 h-4 mr-1" />
            Reported by:
            {{ report.reportedBy?.name || firebaseUser?.displayName }}
          </span>
          <span class="flex items-center ml-2">
            <Calendar class="inline-block w-4 h-4 mx-1" />
            {{ new Date(report.reportedAt).toLocaleDateString() }}
            -
            {{
              new Date(report.reportedAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            }}
          </span>
        </p>

        <div class="text-end">
          <span
            class="inline-block mt-2 px-2 py-0.5 text-xs rounded uppercase bg-blue-100 text-blue-800 text-end"
            :class="{
              'bg-yellow-500': report.status === 'pending',
              'bg-green-500': report.status === 'resolved',
            }"
          >
            {{ report.status }}
          </span>
        </div>
      </div> -->

      <div
        v-for="report in reports"
        :key="report.reportId"
        class="bg-white rounded-xl shadow-sm p-5 mb-4 border-l-4 transition-all hover:shadow-md"
        :class="{
          'border-l-orange-500': report.status === ReportStatus.PENDING,
          'border-l-blue-500': report.status === ReportStatus.IN_PROGRESS,
          'border-l-green-500': report.status === ReportStatus.RESOLVED,
        }"
      >
        <div
          class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3"
        >
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-semibold text-lg text-gray-800">
                {{ report.title }}
              </h3>
              <span
                class="inline-block px-2.5 py-0.5 text-xs bg-gray-100 font-medium rounded-full uppercase"
                :class="{
                  'bg-orange-100 text-orange-800':
                    report.status === ReportStatus.PENDING,
                  'bg-blue-100 text-blue-800':
                    report.status === ReportStatus.IN_PROGRESS,
                  'bg-green-100 text-green-800':
                    report.status === ReportStatus.RESOLVED,
                }"
              >
                {{ report.status }}
              </span>
            </div>
            <p class="text-gray-600 mt-2">{{ report.description }}</p>

            <div class="flex flex-wrap gap-3 mt-4">
              <div class="flex items-center text-sm text-gray-500">
                <UserRoundIcon class="inline-block w-4 h-4 mr-1" />
                {{
                  report.reportedBy?.name || firebaseUser?.displayName || 'You'
                }}
              </div>
              <div class="flex items-center text-sm text-gray-500">
                <Calendar class="inline-block w-4 h-4 mr-1" />
                {{ new Date(report.reportedAt).toLocaleDateString() }}
              </div>
              <div class="flex items-center text-sm text-gray-500">
                <Clock3Icon class="inline-block w-4 h-4 mr-1" />
                {{
                  new Date(report.reportedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }}
              </div>
              <div class="flex items-center text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                {{
                  buildings.find(
                    (b: BuildingType) => b.buildingId === report.buildingId,
                  )?.name || 'Unknown Building'
                }}
              </div>
            </div>
          </div>

          <button
            class="text-orange-600 hover:text-orange-800 flex items-center text-sm font-medium"
          >
            View Details
            <ChevronRight class="inline-block w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500">No reports found.</p>

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
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import ModalView from '@/components/generic/ModalView.vue'
import useCustomUser from '@/composables/useCustomUser'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_ALL_BUILDINGS_WITH_ROOMS } from '@/graphql/building.entity'
import type { BuildingType } from '@/interfaces/building.interface'
import { CREATE_MAINTENANCE_REPORT } from '@/graphql/maintenance-report.entity'
import { GET_MAINTENANCE_REPORTS } from '@/graphql/maintenance-report.mutations'
import useFirebase from '@/composables/useFirebase'
import {
  Calendar,
  Clock3Icon,
  ChevronRight,
  UserRoundIcon,
} from 'lucide-vue-next'
import { ReportStatus } from '@/interfaces/report.interface'

const { firebaseUser } = useFirebase()
const { restoreCustomUser, userId } = useCustomUser()

const showModal = ref(false)
const form = ref({
  title: '',
  description: '',
  roomId: '',
  reportedById: '', //fetched automatically
  buildingId: '',
})

const { result: buildingData } = useQuery(GET_ALL_BUILDINGS_WITH_ROOMS)
const buildings = computed(
  () =>
    buildingData.value?.buildings.filter(
      (b: BuildingType) => b.rooms && b.rooms.length > 0,
    ) || [],
)

const { result: reportsData, refetch } = useQuery(GET_MAINTENANCE_REPORTS)
const reports = computed(() => reportsData.value?.maintenancereport || [])

const {
  mutate: createReport,
  loading,
  error,
} = useMutation(CREATE_MAINTENANCE_REPORT)

const openModal = async () => {
  await restoreCustomUser()
  form.value.reportedById = userId.value || ''
  showModal.value = true
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

onMounted(async () => {
  await restoreCustomUser()
  form.value.reportedById = userId.value || ''
})
</script>
