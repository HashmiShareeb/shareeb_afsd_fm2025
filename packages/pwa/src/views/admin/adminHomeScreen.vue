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
    </div>

    <ul v-if="rounds.length" class="mt-4 space-y-2">
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
    </ul>
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
                {{ report.reportedBy?.name || 'User' }}
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
              <!-- <span
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
              </span> -->
            </td>
            <!-- @change="changeStatus(report.reportId, report.status)" -->
            <td class="px-6 py-4 whitespace-nowrap">
              <select
                v-model="report.status"
                @change="changeStatus"
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
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
  </div>
</template>

<script setup lang="ts">
import useCustomUser from '@/composables/useCustomUser'
import useFirebase from '@/composables/useFirebase'
import { Building2, UserCog2Icon, UserRoundSearch } from 'lucide-vue-next'
import { GET_BUILDINGS } from '@/graphql/building.entity'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'
import { GET_MANAGERS } from '@/graphql/user.query'
import { Role } from '@/interfaces/custom.user.interface'
import { GET_ROUNDS } from '@/graphql/round.entity'
//import { ReportStatus } from '@/interfaces/report.interface'
import { GET_MAINTENANCE_REPORTS } from '@/graphql/maintenance-report.mutations'

const { userRole } = useCustomUser()
const { firebaseUser } = useFirebase()

const { result } = useQuery(GET_BUILDINGS)
const buildings = computed(() => result.value?.buildings ?? [])

const { result: managerData } = useQuery(GET_MANAGERS)
const managers = computed(() => managerData.value?.usersByRole || [])

const { result: roundData } = useQuery(GET_ROUNDS)
const rounds = computed(() => roundData.value?.rounds || [])

const { result: reportsData } = useQuery(GET_MAINTENANCE_REPORTS)
const reports = computed(() => reportsData.value?.maintenancereport || [])

const changeStatus = () => {
  console.log('test')
}

// const { mutate: updateStatus } = useMutation(UPDATE_MAINTENANCE_REPORT_STATUS)

// const changeStatus = async (reportId, newStatus) => {
//   try {
//     const response = await updateStatus({
//       requestId: reportId,
//       status: newStatus,
//     })
//     console.log('Status updated:', response.data.updateSpecialRequestStatus)
//   } catch (error) {
//     console.error('Failed to update status:', error)
//   }
// }
</script>
