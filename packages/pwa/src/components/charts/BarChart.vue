<template>
  <div
    class="min-h-[300px] max-h-[500px] w-full bg-white p-4 rounded-xl shadow overflow-auto"
    style="overflow-x: auto"
  >
    <h3 class="text-lg font-semibold text-gray-700 mb-4">
      Energy Consumption by Type
    </h3>
    <div style="min-width: 400px">
      <Chart
        type="bar"
        :data="chartData"
        :options="chartOptions"
        :height="300"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TooltipItem } from 'chart.js'
import { Chart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import type { energyReadingType } from '@/interfaces/energy-reading.interface'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// make a bar chart wrapper for chart.js

// props from parent (detail page)
const props = defineProps<{
  myEnergyReadingsBar: energyReadingType[]
}>()

// group readings by meter type
const grouped = computed(() => {
  const result: Record<string, number> = { ELECTRICITY: 0, GAS: 0, WATER: 0 }
  props.myEnergyReadingsBar.forEach(r => {
    result[r.meterType] += r.value
  })
  return result
})
// chart data
const chartData = computed(() => ({
  labels: ['Electricity', 'Gas', 'Water'],
  datasets: [
    {
      label: 'Energy Consumption',
      data: [grouped.value.ELECTRICITY, grouped.value.GAS, grouped.value.WATER],
      backgroundColor: ['#f59e0b', '#ef4444', '#3b82f6'],
      borderRadius: 6,
    },
  ],
}))

// chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<'bar'>) =>
          `${context.formattedValue} units`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}
</script>

<style scoped>
div {
  min-height: 300px;
}
</style>
