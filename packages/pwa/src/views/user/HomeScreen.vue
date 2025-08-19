<template>
  <div>
    <!-- HomeScreen content -->
    <h1 class="text-2xl font-bold">
      Welcome back,
      <span class="text-orange-500">{{
        firebaseUser?.displayName || 'displayName'
      }}</span>
    </h1>
    <p class="text-gray-600 mt-2">
      Here you can manage your reports and special requests.
    </p>
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
                {{
                  reports.filter(
                    (r: ReportType) => r.status !== ReportStatus.RESOLVED,
                  ).length
                }}
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
                  reports.filter(
                    (r: ReportType) => r.status === ReportStatus.PENDING,
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
                  reports.filter(
                    (r: ReportType) => r.status === ReportStatus.RESOLVED,
                  ).length
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      <div
        class="flex items-center space-x-2"
        v-if="activeTab === 'reports' && filteredReports"
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
      </div>
      <!-- Special Requests Tab -->
      <div v-if="activeTab === 'requests'" class="flex items-center space-x-2">
        <label for="requestStatusFilter" class="text-sm text-gray-600"
          >Filter:</label
        >
        <select
          id="requestStatusFilter"
          v-model="selectedRequestStatus"
          class="input border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option selected value="">All</option>
          <option :value="SpecialRequestStatus.PENDING">Pending</option>
          <option :value="SpecialRequestStatus.APPROVED">Approved</option>
          <option :value="SpecialRequestStatus.REJECTED">Rejected</option>
        </select>
      </div>
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
              v-for="report in filteredReports"
              :key="report.reportId"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">{{ report.title }}</div>
                <div class="text-gray-500 text-sm mt-1">
                  {{ report.description }}
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
                <span
                  class="inline-block px-2.5 py-0.5 text-xs bg-gray-100 font-medium rounded-full uppercase"
                  :class="getStatusReportColor(report.status)"
                >
                  {{ report.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="filteredReports.length === 0"
        class="text-center text-gray-500 py-6"
      >
        No reports found.
      </div>
    </div>

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
              v-for="request in filteredRequests"
              :key="request.requestId"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">{{ request.title }}</div>
                <div class="text-gray-500 text-sm mt-1">
                  {{ request.description }}
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
                <span
                  class="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full uppercase"
                  :class="getStatusColor(request.status)"
                >
                  {{ request.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="specialRequests.length === 0"
        class="text-center text-gray-500 py-6"
      >
        No reports found.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCustomUser from '@/composables/useCustomUser'
import useFirebase from '@/composables/useFirebase'
import { GET_BUILDINGS } from '@/graphql/building.entity'
import { MY_MAINTENANCE_REPORT } from '@/graphql/maintenance-report.mutations'
import { useQuery } from '@vue/apollo-composable'
import { CheckCircle, Clock, Check } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'
import { ReportStatus, type ReportType } from '@/interfaces/report.interface'
import { MY_SPECIAL_REQUESTS } from '@/graphql/special-request.entity'
import {
  SpecialRequestStatus,
  type SpecialRequestType,
} from '@/interfaces/special-request.interface'

const { firebaseUser } = useFirebase()
const { restoreCustomUser, userId } = useCustomUser()

const activeTab = ref<'reports' | 'requests'>('reports') // Default to "reports"
const selectedStatus = ref<ReportStatus | ''>('') // Default to show all statuses
const selectedRequestStatus = ref<SpecialRequestStatus | ''>('') // Default to show all request statuses

onMounted(async () => {
  await restoreCustomUser()
  // form.value.reportedById = userId.value || ''
})

const getBuildings = useQuery(GET_BUILDINGS)
const buildings = computed(() => getBuildings.result.value?.buildings ?? [])

const { result: reportsData } = useQuery(
  MY_MAINTENANCE_REPORT,
  () => ({ userId: userId.value }),
  {
    enabled: computed(() => !!userId.value),
  },
)

const reports = computed(() => reportsData.value?.myMaintenanceReport || [])

const { result: specialRequestData } = useQuery(
  MY_SPECIAL_REQUESTS,
  () => ({ userId: userId.value }),
  { enabled: computed(() => !!userId.value) },
)
const specialRequests = computed(
  () => specialRequestData.value?.mySpecialRequests || [],
)

console.log(specialRequests)

// const reports = computed(() =>
//   (reportsData.value?.maintenancereport || []).filter(
//     (report: ReportType) => report.reportedById === userId.value,
//   ),
// )

console.log('Buildings:', buildings.value)

// Computed property to filter reports based on the selected status
const filteredReports = computed(() => {
  if (!selectedStatus.value) return reports.value // Show all reports if no status is selected
  return reports.value.filter(
    (report: ReportType) => report.status === selectedStatus.value,
  )
})

const filteredRequests = computed(() => {
  if (!selectedRequestStatus.value) return specialRequests.value // Show all requests if no status is selected
  return specialRequests.value.filter(
    (request: SpecialRequestType) =>
      request.status === selectedRequestStatus.value,
  )
})

const getStatusColor = (status: string): string => {
  switch (status) {
    case SpecialRequestStatus.PENDING:
      return 'bg-orange-100 text-orange-800'
    case SpecialRequestStatus.APPROVED:
      return 'bg-blue-100 text-blue-800'
    case SpecialRequestStatus.REJECTED:
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusReportColor = (status: string): string => {
  switch (status) {
    case ReportStatus.PENDING:
      return 'bg-orange-100 text-orange-800'
    case ReportStatus.IN_PROGRESS:
      return 'bg-blue-100 text-blue-800'
    case ReportStatus.RESOLVED:
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
