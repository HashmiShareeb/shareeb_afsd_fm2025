<template>
  <div class="bg-white p-4 rounded-xl shadow-sm mt-6">
    <Line v-if="data" :data="data" :options="options" class="h-80" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
} from 'chart.js'
import type { energyReadingType } from '@/interfaces/energy-reading.interface'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
)

const props = defineProps<{ readings: energyReadingType[] }>()

const data = computed(() => {
  if (!props.readings.length) return null

  // group readings by type
  const types = [...new Set(props.readings.map(r => r.meterType))]

  return {
    labels: props.readings.map(r =>
      new Date(r.recordedAt).toLocaleDateString(),
    ),
    datasets: types.map((type, i) => ({
      label: type,
      data: props.readings.filter(r => r.meterType === type).map(r => r.value),
      borderColor: ['#3B82F6', '#F59E0B', '#10B981'][i],
      tension: 0.3,
    })),
  }
})

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
  },
}
</script>
