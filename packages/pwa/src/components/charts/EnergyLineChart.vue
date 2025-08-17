<template>
  <div class="mt-6 bg-white p-4 rounded-xl shadow-sm">
    <h2 class="text-lg font-semibold mb-3">Energy Consumption Over Time</h2>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js'

import { computed } from 'vue'
import type { energyReadingType } from '@/interfaces/energy-reading.interface'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
)

const props = defineProps<{ myEnergyReadings: energyReadingType[] }>()

// group readings by meter type and collect unique dates
const grouped = computed(() => {
  const groups: Record<string, Record<string, number>> = {}
  const dateSet = new Set<string>()
  props.myEnergyReadings.forEach((r: energyReadingType) => {
    const date = new Date(r.recordedAt).toLocaleDateString()
    dateSet.add(date)
    if (!groups[r.meterType]) groups[r.meterType] = {}
    groups[r.meterType][date] = r.value
  })
  return {
    groups,
    dates: Array.from(dateSet).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    ),
  }
})

const chartData = computed(() => ({
  labels: grouped.value.dates,
  datasets: Object.entries(grouped.value.groups).map(
    ([meterType, dataByDate]) => ({
      label: meterType,
      data: grouped.value.dates.map(date => dataByDate[date] ?? null),
      borderColor:
        meterType === 'ELECTRICITY'
          ? 'blue'
          : meterType === 'GAS'
            ? 'red'
            : 'green',
      fill: true,
    }),
  ),
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
  },
}
</script>
