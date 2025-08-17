<template>
  <AppToast
    v-if="success"
    title="Success"
    type="success"
    message="Reading recorded"
  />
  <div class="max-w-7xl mx-auto">
    <h2 class="text-xl font-semibold text-gray-700">Energy Readings</h2>
    <p class="text-gray-500 mt-2">
      Here you can view all buildings and their energy readings.
    </p>

    <!-- FORM -->
    <div class="mt-6">
      <form
        class="p-6 bg-white rounded-xl shadow-sm space-y-4"
        @submit.prevent="submitReading"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Building -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Building
            </label>
            <select v-model="form.buildingId" required class="input w-full">
              <option disabled value="">Select building</option>
              <option
                v-for="b in buildings"
                :key="b.buildingId"
                :value="b.buildingId"
              >
                {{ b.name }}
              </option>
            </select>
          </div>

          <!-- Meter type -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Meter</label>
            <select
              v-model="form.meterType"
              required
              class="mt-1 w-full rounded-md input"
            >
              <option value="ELECTRICITY">ELECTRICITY</option>
              <option value="GAS">GAS</option>
              <option value="WATER">WATER</option>
            </select>
          </div>

          <!-- Value -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Value</label>
            <div class="flex items-center gap-2 mt-1">
              <input
                v-model.number="form.value"
                type="number"
                step="any"
                required
                class="w-full rounded-md input"
              />
              <select
                v-model="form.unit"
                required
                class="w-20 rounded-md input"
              >
                <option>kWh</option>
                <option>m³</option>
                <option>L</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="btn-primary rounded-lg disabled:opacity-50"
          :disabled="recordLoading"
        >
          {{ recordLoading ? 'Recording...' : 'Record' }}
        </button>
      </form>
    </div>

    <!-- TABLE / LIST -->
    <div class="mt-10">
      <h2 class="text-xl font-semibold mb-4">All readings</h2>

      <!-- Skeleton -->
      <SkeletonMedium v-if="!energyReadings.length" />
      <!-- Empty -->
      <p
        v-else-if="energyReadings.length === 0"
        class="text-center text-sm text-gray-400 py-8"
      >
        No readings yet.
      </p>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-xl shadow">
          <thead class="bg-gray-200">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Building
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Address
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Meter
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Value
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Recorded by
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Date
              </th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="reading in energyReadings"
              :key="reading.readingId"
              class="hover:bg-gray-50 transition"
            >
              <td class="px-4 py-3 text-sm font-medium">
                {{ reading.building?.name }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-600">
                {{ reading.building?.address }}
              </td>
              <td class="px-4 py-3 text-sm">{{ reading.meterType }}</td>
              <td class="px-4 py-3 text-sm">
                {{ reading.value }} {{ reading.unit }}
              </td>
              <td class="px-4 py-3 text-sm">
                {{ reading.recordedBy?.name || 'Unknown' }}
              </td>
              <td class="px-4 py-3 text-sm">
                {{ new Date(reading.recordedAt).toLocaleString() }}
              </td>
              <!-- Delete -->
              <td class="px-4 py-3" v-if="userRole === Role.ADMIN">
                <button
                  @click="deleteReading(reading.readingId)"
                  class="text-red-500 hover:text-red-700"
                >
                  <Trash />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
//import { Trash } from 'lucide-vue-next'
import SkeletonMedium from '@/components/skeleton/SkeletonMedium.vue'

import { GET_ALL_ENERGY_READINGS } from '@/graphql/energy-reading.entity'
import { GET_BUILDINGS } from '@/graphql/building.entity'
import {
  RECORD_ENERGY_READING,
  REMOVE_ENERGY_READING,
} from '@/graphql/energy-reading.mutations'

import useCustomUser from '@/composables/useCustomUser'
import { MeterType } from '@/interfaces/energy-reading.interface'
import { Role } from '@/interfaces/custom.user.interface'
import AppToast from '@/components/toast/AppToast.vue'

const { restoreCustomUser, userId, userRole } = useCustomUser()

// --- Form state
const form = ref({
  buildingId: '',
  meterType: MeterType.ELECTRICITY,
  value: 0,
  unit: 'kWh',
  recordedById: '',
})

// --- Queries
const { result: readingsResult, refetch: refetchReadings } = useQuery(
  GET_ALL_ENERGY_READINGS,
)
const energyReadings = computed(
  () => readingsResult.value?.energyReadings ?? [],
)

const { result: buildingsResult } = useQuery(GET_BUILDINGS)
const buildings = computed(() => buildingsResult.value?.buildings ?? [])

// --- Mutations
const { mutate: recordReading, loading: recordLoading } = useMutation(
  RECORD_ENERGY_READING,
)
const { mutate: removeReading } = useMutation(REMOVE_ENERGY_READING)

const success = ref(false)
// --- Submit
const submitReading = async () => {
  try {
    await recordReading({
      buildingId: form.value.buildingId,
      meterType: form.value.meterType,
      value: Number(form.value.value),
      unit: form.value.unit,
      recordedById: form.value.recordedById,
    })
    await refetchReadings()
    form.value = {
      buildingId: '',
      meterType: MeterType.ELECTRICITY,
      value: 0,
      unit: 'kWh',
      recordedById: userId.value || '',
    }
    success.value = true
  } catch (e) {
    console.error('Error recording reading', e)
  }
}

//Delete
const deleteReading = async (readingId: string) => {
  if (!window.confirm('Delete this reading?')) return
  try {
    await removeReading({ readingId })
    await refetchReadings()
  } catch (e) {
    console.error('Error deleting reading', e)
  }
}

// --- Init user
onMounted(async () => {
  await restoreCustomUser()
  form.value.recordedById = userId.value || ''
})
</script>
