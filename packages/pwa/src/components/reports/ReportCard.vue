<template>
  <div
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
            {{ report.reportedBy?.name || 'You' }}
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
            {{ report.building?.name || 'Building not specified' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ReportStatus, type ReportType } from '@/interfaces/report.interface'
import type { BuildingType } from '@/interfaces/building.interface'
import { UserRoundIcon, Calendar, Clock3Icon } from 'lucide-vue-next'

defineProps({
  report: {
    type: Object as () => ReportType,
    required: true,
  },
  buildings: {
    type: Array as () => BuildingType[],
    required: true,
  },
})
</script>
