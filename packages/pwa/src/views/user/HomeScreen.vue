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

    <!-- Widget Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center">
          <div class="p-3 mr-4 bg-orange-50 rounded-full">
            <CheckCircle class="text-orange-500 w-5 h-5" />
          </div>
          <div>
            <p class="text-sm">Openstaande Meldingen</p>
            <p class="text-2xl font-bold text-gray-600 mt-1">3</p>
          </div>
          <!-- <div class="flex justify-end ml-auto mt-auto">
            <router-link
              :to="{ name: 'admin-buildings' }"
              class="mt-2 inline-block text-sm text-orange-600 hover:underline"
            >
              building list
            </router-link>
          </div> -->
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-50 mr-4">
            <Clock class="text-yellow-500 w-5 h-5" />
          </div>
          <div>
            <p class="text-sm">Lopende Verzoeken</p>
            <p class="text-2xl font-bold text-gray-600 mt-1">2</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-50 mr-4">
            <Check class="text-green-500 w-5 h-5" />
          </div>
          <div>
            <p class="text-sm">Afgerond</p>
            <p class="text-2xl font-bold text-gray-600 mt-1">7</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Tabs Navigation -->

  <div class="border-b border-gray-200 mb-6">
    <div class="mr-auto flex items-center justify-end space-x-4">
      <label for="statusFilter" class="text-sm text-gray-600">Filter:</label>
      <select
        id="statusFilter"
        v-model="statusFilter"
        class="input border-gray-300 rounded px-2 py-1 text-sm"
      >
        <option selected value="">All</option>
        <option :value="ReportStatus.NEW">New</option>
        <option :value="ReportStatus.PENDING">Pending</option>
        <option :value="ReportStatus.IN_PROGRESS">In Progress</option>
        <option :value="ReportStatus.RESOLVED">Resolved</option>
      </select>
    </div>
    <nav class="flex space-x-8">
      <button
        class="py-4 px-1 font-medium text-sm border-b-2 border-blue-500 text-blue-600"
      >
        Recent Reports
      </button>
      <button
        class="py-4 px-1 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      >
        Special Requests
      </button>
    </nav>
  </div>
  <div v-if="reports.length" class="bg-white shadow rounded-lg overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-white">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Title
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
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="font-medium text-gray-900">{{ report.title }}</div>
              <div class="text-gray-500 text-sm mt-1">
                {{ report.description }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-gray-900">
                {{
                  report.reportedBy?.id === firebaseUser?.uid
                    ? 'You'
                    : report.reportedBy?.name ||
                      firebaseUser?.displayName ||
                      'You'
                }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-500">
              {{ new Date(report.reportedAt).toLocaleDateString() }} -
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
            </td>
          </tr>
        </tbody>
      </table>
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

const { firebaseUser } = useFirebase()
const { restoreCustomUser, userId } = useCustomUser()

const getBuildings = useQuery(GET_BUILDINGS)
const buildings = computed(() => getBuildings.result.value?.buildings ?? [])

const { result: reportsData } = useQuery(
  MY_MAINTENANCE_REPORT,
  () => ({ userId: userId.value }),
  { enabled: computed(() => !!userId.value) },
)

const reports = computed(() => reportsData.value?.myMaintenanceReport || [])

// const reports = computed(() =>
//   (reportsData.value?.maintenancereport || []).filter(
//     (report: ReportType) => report.reportedById === userId.value,
//   ),
// )

console.log('Buildings:', buildings.value)

onMounted(async () => {
  await restoreCustomUser()
  // form.value.reportedById = userId.value || ''
})

const selectedStatus = ref<ReportStatus | null>(null) // Selected status filter

const statusFilter = () => {
  return reports.value.filter((report: ReportType) => {
    if (!selectedStatus.value) return true
    return report.status === selectedStatus.value
  })
}
</script>
