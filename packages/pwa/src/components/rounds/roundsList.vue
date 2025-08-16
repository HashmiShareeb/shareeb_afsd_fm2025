<template>
  <SkeletonSmall v-if="!myRounds" />

  <!-- Real card -->
  <li
    v-else-if="myRounds"
    class="mb-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex justify-between items-center"
  >
    <div>
      <p class="font-semibold text-gray-900">{{ myRounds.name }}</p>
      <p class="text-sm text-gray-500 mt-0.5">
        Assigned to:
        <span class="font-medium text-gray-700">
          {{ myRounds.assignedTo?.name || 'N/A' }}
        </span>
      </p>
    </div>

    <div
      :class="badgeClass"
      class="px-2.5 py-1 text-xs rounded-full tracking-wide"
    >
      {{ myRounds.status }}
    </div>
  </li>

  <p v-else class="text-center text-sm text-gray-400 py-8">
    No rounds available.
  </p>
</template>

<script setup lang="ts">
import useCustomUser from '@/composables/useCustomUser'
import { RoundStatus } from '@/interfaces/round.interface'
import { computed } from 'vue'
import SkeletonSmall from '../skeleton/SkeletonSmall.vue'
type RoundType = {
  name?: string
  assignedTo?: { name?: string }
  status?: string
}

const props = defineProps<{
  myRounds?: RoundType
}>()
const myRounds = props.myRounds

const { restoreCustomUser } = useCustomUser()

restoreCustomUser()

/* Dynamic badge colours */
const badgeClass = computed(() => {
  switch (myRounds?.status?.toLowerCase()) {
    case RoundStatus.PLANNED:
      return 'bg-blue-100 text-blue-700'
    case RoundStatus.COMPLETED:
      return 'bg-green-300 text-gray-700'
    case RoundStatus.IN_PROGRESS:
      return 'bg-yellow-100 text-yellow-700'
    case RoundStatus.CANCELLED:
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
})
</script>
