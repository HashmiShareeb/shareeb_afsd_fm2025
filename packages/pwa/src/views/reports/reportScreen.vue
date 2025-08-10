<template>
  <div>
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4"
    >
      <div>
        <h2 class="text-xl font-semibold text-gray-700">Reports</h2>
        <p class="text-gray-500 mt-2">
          manage and view reports related to your account or building.
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
      <div
        v-for="report in reports"
        :key="report.reportId"
        class="border p-4 mb-4 rounded-lg bg-white shadow-sm"
      >
        <h3 class="font-medium text-lg text-gray-700">{{ report.title }}</h3>
        <p class="text-sm text-gray-500 mb-2">{{ report.description }}</p>
        <p class="text-xs text-gray-400">
          Reported by: {{ report.reportedBy?.name || 'Unknown' }} on
          {{ new Date(report.reportedAt).toLocaleString() }}
        </p>
        <span
          class="inline-block mt-2 px-2 py-0.5 text-xs rounded text-white"
          :class="{
            'bg-yellow-500': report.status === 'pending',
            'bg-green-500': report.status === 'resolved',
          }"
        >
          {{ report.status }}
        </span>
      </div>
    </div>
    <p v-else class="text-gray-500">No reports found.</p>

    <!-- Add Report Modal -->
    <ModalView
      v-if="showModal"
      @close="showModal = false"
      title="Report a Problem"
    >
      <form @submit.prevent="submitReport" class="grid gap-4">
        <label class="text-gray-500 font-medium">Title</label>
        <input v-model="form.title" type="text" class="input" required />

        <label class="text-gray-500 font-medium">Description</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="input"
          required
        ></textarea>

        <label class="text-gray-500 font-medium">Select Room</label>
        <select v-model="form.roomId" class="input" required>
          <option disabled value="">Select a room</option>
          <optgroup v-for="b in buildings" :label="b.name" :key="b.buildingId">
            <option v-for="r in b.rooms" :key="r.roomId" :value="r.roomId">
              {{ r.name }} (Floor {{ r.floor }})
            </option>
          </optgroup>
        </select>

        <button type="submit" class="btn-primary rounded-full">
          {{ loading ? 'Reporting...' : 'Submit Report' }}
        </button>
      </form>
    </ModalView>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import ModalView from '@/components/generic/ModalView.vue'
import { GET_ALL_BUILDINGS_WITH_ROOMS } from '@/graphql/building.entity'

import type { BuildingType } from '@/interfaces/building.interface'
import { GET_MAINTENANCE_REPORTS } from '@/graphql/maintenance-report.mutations'
import { CREATE_MAINTENANCE_REPORT } from '@/graphql/maintenance-report.entity'
import useCustomUser from '@/composables/useCustomUser'

const { userId } = useCustomUser()

console.log(userId)

// Fetch reports
const { result: reportData, refetch } = useQuery(GET_MAINTENANCE_REPORTS)
const reports = computed(() => reportData.value?.maintenancereport || [])

// Fetch buildings with rooms
const { result: buildingData } = useQuery(GET_ALL_BUILDINGS_WITH_ROOMS)
const buildings = computed(
  () =>
    buildingData.value?.buildings.filter(
      (b: BuildingType) => b.rooms && b.rooms.length > 0,
    ) || [],
)

// Mutation
const { mutate: createReport, loading } = useMutation(CREATE_MAINTENANCE_REPORT)

// Modal + Form
const showModal = ref(false)
const openModal = () => (showModal.value = true)

const form = ref({
  title: '',
  description: '',
  roomId: '',
  reportedById: userId.value,
})

const submitReport = async () => {
  await createReport({ input: { ...form.value } })
  await refetch()
  showModal.value = false
  form.value = {
    title: '',
    description: '',
    roomId: '',
    reportedById: userId.value,
  }
}
</script>
