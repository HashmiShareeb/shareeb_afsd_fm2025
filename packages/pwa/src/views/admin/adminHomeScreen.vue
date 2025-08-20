<template>
  <!-- HomeScreen content -->
  <h1 class="text-2xl font-bold">
    Welcome back,
    <span class="text-orange-500">{{
      firebaseUser?.displayName || 'displayName'
    }}</span>
  </h1>
  <p class="text-gray-600 mt-2">
    Here you can manage your buildings and view details.
  </p>
  <!-- Widget Section -->
  <div
    class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    v-if="userRole === Role.ADMIN"
  >
    <!-- Manage Buildings (visible only to ADMIN) -->
    <div class="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
      <Building2 class="text-orange-500 w-10 h-10" />
      <div>
        <h2 class="text-md font-semibold">Manage Buildings</h2>
        <!-- <p class="text-gray-600 text-sm">
          Add, edit, or remove buildings. (this is for the facility manager
          example) you should see this as an ADMIN
        </p> -->
        <p class="text-gray-500 text-2xl mt-1 font-semibold">
          {{ buildings.length }}
        </p>
      </div>
      <div class="flex justify-end mt-auto ml-auto">
        <router-link
          :to="{ name: 'admin-buildings' }"
          class="mt-2 inline-block text-sm text-orange-600 hover:underline"
        >
          building list
        </router-link>
      </div>
    </div>
    <!-- total concierges -->
    <div class="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
      <UserCog2Icon class="text-orange-500 w-8 h-8" />
      <div>
        <h2 class="text-md font-semibold">Concierges</h2>
        <p class="text-gray-600 text-2xl mt-1 capitalize font-semibold">
          {{ managers.length }}
        </p>
      </div>
    </div>
    <!-- total active rounds -->
    <div class="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
      <UserRoundSearch class="text-orange-500 w-8 h-8" />
      <div>
        <h2 class="text-md font-semibold">Active rounds</h2>
        <p class="text-gray-600 text-2xl mt-1 capitalize font-semibold">
          {{ rounds.length }}
        </p>
      </div>
      <div class="flex justify-end mt-auto ml-auto">
        <router-link
          :to="{ name: 'admin-rounds' }"
          class="mt-2 inline-block text-sm text-orange-600 hover:underline"
        >
          rounds list
        </router-link>
      </div>
    </div>

    <!-- <ul v-if="rounds.length" class="mt-4 space-y-2">
      <li
        v-for="round in rounds.slice(0, 3)"
        :key="round.id"
        class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
      >
        <span class="font-medium">{{ round.name || 'Unnamed Round' }}</span>
        <span class="text-xs text-gray-500 uppercase">{{
          round.status || ''
        }}</span>
      </li>
    </ul> -->
  </div>

  <div>
    <!-- Tabs Navigation -->
    <div
      class="border-b border-gray-200 mb-6 flex items-center justify-between"
    >
      <nav class="flex space-x-8">
        <button
          @click="activeTab = 'reports'"
          :class="{
            'py-4 px-1 font-medium text-sm border-b-2 border-orange-500 text-orange-600':
              activeTab === 'reports',
            'py-4 px-1 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300':
              activeTab !== 'reports',
          }"
        >
          Recent Reports
        </button>
        <button
          @click="activeTab = 'requests'"
          :class="{
            'py-4 px-1 font-medium text-sm border-b-2 border-orange-500 text-orange-600':
              activeTab === 'requests',
            'py-4 px-1 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300':
              activeTab !== 'requests',
          }"
        >
          Special Requests
        </button>
      </nav>
      <!-- <div
        class="flex items-center space-x-2"
        v-if="
          activeTab === 'reports' && filteredReports && filteredReports.length
        "
      >
        <label for="statusFilter" class="text-sm text-gray-600">Filter:</label>
        <select
          id="statusFilter"
          v-model="selectedStatus"
          class="input border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option selected value="">All</option>
          <option :value="ReportStatus.NEW">New</option>
          <option :value="ReportStatus.PENDING">Pending</option>
          <option :value="ReportStatus.IN_PROGRESS">In Progress</option>
          <option :value="ReportStatus.RESOLVED">Resolved</option>
        </select>
      </div> -->
    </div>

    <!-- Reports Tab -->
    <div
      v-if="activeTab === 'reports'"
      class="bg-white shadow rounded-lg overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-white">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Report
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Requested by
              </th>

              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="report in reports"
              :key="report.reportId"
              class="hover:bg-orange-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">{{ report.title }}</div>
                <div class="text-gray-500 text-sm mt-1">
                  {{ report.description }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-gray-900">
                  {{ report.reportedBy?.name || 'User' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                {{ new Date(report.reportedAt).toLocaleDateString() }} <br />
                {{
                  new Date(report.reportedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select
                  :value="report.status"
                  @change="
                    changeStatus(
                      report.reportId,
                      ($event.target as HTMLSelectElement)
                        .value as ReportStatus,
                    )
                  "
                  class="input border-gray-300 text-sm rounded"
                >
                  <option value="NEW">New</option>
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="reports.length === 0" class="text-center text-gray-500 py-6">
        No reports found.
      </div>
    </div>

    <!-- Special Requests Tab -->
    <div
      v-if="activeTab === 'requests'"
      class="bg-white shadow rounded-lg overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-white">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Requests
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Requested by
              </th>

              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="request in specialRequests"
              :key="request.requestId"
              class="hover:bg-orange-50"
            >
              <td class="px-6 py-4 whitespace-wrap">
                <div class="font-medium text-gray-900">{{ request.title }}</div>
                <div class="text-gray-500 text-sm mt-1">
                  {{ request.description }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-gray-900">
                  {{ request.requestedBy?.name || 'User' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                {{ new Date(request.requestedAt).toLocaleDateString() }} <br />

                {{
                  new Date(request.requestedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <!-- <span
                  class="inline-block px-2.5 py-0.5 text-xs bg-gray-100 font-medium rounded-full uppercase"
                  :class="{
                    'bg-orange-100 text-orange-800':
                      request.status === 'PENDING',
                    'bg-blue-100 text-blue-800':
                      request.status === 'IN_PROGRESS',
                    'bg-green-100 text-green-800':
                      request.status === 'RESOLVED',
                  }"
                >
                  {{ request.status }}
                </span> -->
                <select
                  :value="request.status"
                  @change="
                    changeRequestStatus(
                      request.requestId,
                      ($event.target as HTMLSelectElement)
                        .value as SpecialRequestStatus,
                    )
                  "
                  class="input border-gray-300 text-sm rounded"
                >
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="specialRequests.length === 0"
        class="text-center text-gray-500 py-6"
      >
        No requests found.
      </div>
    </div>
  </div>

  <!-- Stats Cards -->
  <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center">
        <div class="p-3 rounded-lg bg-blue-50 mr-4">
          <svg
            class="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Openstaande Meldingen</p>
          <p class="text-2xl font-bold text-gray-800 mt-1">3</p>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center">
        <div class="p-3 rounded-lg bg-yellow-50 mr-4">
          <svg
            class="w-6 h-6 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Lopende Verzoeken</p>
          <p class="text-2xl font-bold text-gray-800 mt-1">2</p>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center">
        <div class="p-3 rounded-lg bg-green-50 mr-4">
          <svg
            class="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Afgerond</p>
          <p class="text-2xl font-bold text-gray-800 mt-1">7</p>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import useCustomUser from '@/composables/useCustomUser'
import useFirebase from '@/composables/useFirebase'
import { Building2, UserCog2Icon, UserRoundSearch } from 'lucide-vue-next'
import { GET_BUILDINGS } from '@/graphql/building.entity'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'
import { GET_MANAGERS } from '@/graphql/user.query'
import { Role } from '@/interfaces/custom.user.interface'
import { GET_ROUNDS } from '@/graphql/round.entity'
//import { ReportStatus } from '@/interfaces/report.interface'
import { GET_MAINTENANCE_REPORTS } from '@/graphql/maintenance-report.entity'
import { UPDATE_MAINTENANCE_REPORT_STATUS } from '@/graphql/maintenance-report.mutations'
import type { ReportStatus, ReportType } from '@/interfaces/report.interface'
import { GET_ALL_SPECIAL_REQUESTS } from '@/graphql/special-request.entity'
import type { SpecialRequestStatus } from '@/interfaces/special-request.interface'
import { UPDATE_STATUS_SPECIAL_REQUEST } from '@/graphql/special-request.mutations'
// import AppToast from '@/components/toast/AppToast.vue'
const activeTab = ref<'reports' | 'requests'>('reports') // Default to "reports"
const { userRole } = useCustomUser()
const { firebaseUser } = useFirebase()

const { result } = useQuery(GET_BUILDINGS)
const buildings = computed(() => result.value?.buildings ?? [])

const { result: managerData } = useQuery(GET_MANAGERS)
const managers = computed(() => managerData.value?.usersByRole || [])

const { result: roundData } = useQuery(GET_ROUNDS)
const rounds = computed(() => roundData.value?.rounds || [])

const { result: reportsData, refetch: reportsRefetch } = useQuery(
  GET_MAINTENANCE_REPORTS,
)
// const filteredReports = computed(() => {
//   if (!selectedStatus.value) return reports.value // Show all reports if no status is selected
//   return reports.value.filter(
//     (report: ReportType) => report.status === selectedStatus.value,
//   )
// })
const reports = computed(() => reportsData.value?.maintenancereport || [])

const { result: requestData, refetch: requestsRefetch } = useQuery(
  GET_ALL_SPECIAL_REQUESTS,
)

const specialRequests = computed(() => requestData.value?.specialrequest || [])

// const changeStatus = () => {
//   console.log('test')
// }

const { mutate: updateStatus } = useMutation(UPDATE_MAINTENANCE_REPORT_STATUS)
const { mutate: updateRequestStatus } = useMutation(
  UPDATE_STATUS_SPECIAL_REQUEST,
)

const changeStatus = async (reportId: ReportType, status: ReportStatus) => {
  try {
    const response = await updateStatus({
      reportId,
      status,
    })
    await reportsRefetch()
    console.log('Status updated:', response?.data.updateSpecialRequestStatus)
  } catch (error) {
    console.error('Failed to update status:', error)
  }
}

const changeRequestStatus = async (
  requestId: ReportType,
  status: SpecialRequestStatus,
) => {
  try {
    const response = await updateRequestStatus({
      requestId,
      status,
    })
    await requestsRefetch()
    console.log('Status updated:', response?.data.updateSpecialRequestStatus)
  } catch (error) {
    console.error('Failed to update status:', error)
  }
}
</script>
