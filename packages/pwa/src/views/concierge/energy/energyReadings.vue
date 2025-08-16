<template>
  <div class="max-w-7xl mx-auto">
    <h2 class="text-xl font-semibold text-gray-700">Energy Readings</h2>
    <p class="text-gray-500 mt-2">
      Here you can view all buildings and their energy readings.
    </p>
    <div class="mt-6">
      <form class="p-6 bg-white rounded-xl shadow-sm space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Building -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Building</label
            >
            <select required class="mt-1 w-full rounded-md input">
              <option disabled>Select building</option>
              <option>Building A</option>
              <option>Building B</option>
            </select>
          </div>

          <!-- Meter type -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Meter</label>
            <select required class="mt-1 w-full rounded-md input">
              <option>ELECTRICITY</option>
              <option>GAS</option>
              <option>WATER</option>
            </select>
          </div>

          <!-- Value -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Value</label>
            <div class="flex items-center gap-2 mt-1">
              <input
                type="number"
                step="any"
                required
                class="w-full rounded-md input"
              />
              <select required class="w-20 rounded-md input">
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
        >
          Record
        </button>
      </form>
    </div>

    <!-- TABLE / LIST -->
    <div class="mt-10">
      <h2 class="text-xl font-semibold mb-4">All readings</h2>

      <!-- Skeleton -->
      <div class="space-y-3">
        <div class="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
        <div class="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
        <div class="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      <!-- Empty -->
      <p class="text-center text-sm text-gray-400 py-8">No readings yet.</p>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-xl shadow">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-semibold">
                Building
              </th>
              <th class="px-4 py-3 text-left text-sm font-semibold">Address</th>
              <th class="px-4 py-3 text-left text-sm font-semibold">Meter</th>
              <th class="px-4 py-3 text-left text-sm font-semibold">Value</th>
              <th class="px-4 py-3 text-left text-sm font-semibold">
                Recorded by
              </th>
              <th class="px-4 py-3 text-left text-sm font-semibold">Date</th>
              <!-- Admin / Manager delete icon -->
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr class="hover:bg-gray-50 transition">
              <td class="px-4 py-3 text-sm font-medium">HQ Tower</td>
              <td class="px-4 py-3 text-sm text-gray-600">123 Main St</td>
              <td class="px-4 py-3 text-sm">ELECTRICITY</td>
              <td class="px-4 py-3 text-sm">1 250 kWh</td>
              <td class="px-4 py-3 text-sm">Jane Doe</td>
              <td class="px-4 py-3 text-sm">17 Aug 2025 09:12</td>
              <!-- Delete -->
              <td class="px-4 py-3">
                <button class="text-red-500 hover:text-red-700">
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
import { Trash } from 'lucide-vue-next'
</script>
