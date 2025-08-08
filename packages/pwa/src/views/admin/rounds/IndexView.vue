<template>
  <div class="flex justify-between items-center mb-6">
    <div class="inline-flex items-center gap-2">
      <!-- <Building
        class="text-orange-500 w-10 h-10 bg-orange-100 rounded-full py-1.5 px-2"
      /> -->
      <h2 class="text-xl font-semibold text-gray-700">Rounds</h2>
    </div>

    <button
      @click="openModal"
      class="mx-2 inline-block text-sm text-orange-600 bg-orange-100 rounded-md hover:bg-orange-200 p-2"
    >
      Add +
    </button>
  </div>
  <div>
    <ul>
      <li v-for="round in rounds" :key="round.id">
        {{ round.name }}
      </li>
    </ul>
  </div>

  <!-- modal for rounds -->
  <ModalView v-if="showModal" @close="showModal = false" title="Add New Round">
    <form class="grid gap-4">
      <label for="name" class="text-gray-500 font-medium text-base"
        >Round Name</label
      >
      <input type="text" placeholder="Round Name" class="input" />

      <label for="building" class="text-gray-500 font-medium text-base">
        Building
      </label>
      <select class="input">
        <!-- <select v-model="buildingId" class="input"> -->
        <option disabled value="">Select a building</option>
        <option
          v-for="b in buildings"
          :key="b.buildingId"
          :value="b.buildingId"
        >
          {{ b.name }} - {{ b.address }}
        </option>
      </select>
      <label for="concierge" class="text-gray-500 font-medium text-base">
        Concierge
      </label>
      <select id="concierge" class="input">
        <option value="" disabled selected>Select Concierge</option>
        <option value="concierge1">Concierge 1</option>
        <option value="concierge2">Concierge 2</option>
        <option value="concierge3">Concierge 3</option>
      </select>
      <button type="submit" class="btn-primary rounded-full">Add Round</button>
    </form>
  </ModalView>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_ROUNDS } from '@/graphql/room.entity'
import ModalView from '@/components/generic/ModalView.vue'
import { GET_ALL_BUILDINGS_WITH_ROOMS } from '@/graphql/building.entity'

const { result } = useQuery(GET_ROUNDS)
const rounds = computed(() => result.value?.rounds || [])

const { result: buildingData } = useQuery(GET_ALL_BUILDINGS_WITH_ROOMS)
const buildings = computed(() => buildingData.value?.buildings || [])

const showModal = ref(false)

const openModal = () => {
  // Logic to open modal for adding a new round
  console.log('Open modal to add a new round')
  showModal.value = true
}
</script>
