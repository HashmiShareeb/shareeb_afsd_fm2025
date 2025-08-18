<template>
  <div class="mt-8">
    <h2 class="text-xl font-semibold mb-4">Live Round Progress</h2>

    <!-- skeleton -->
    <SkeletonLarge v-if="loading" />

    <!-- no rounds -->
    <p v-else-if="!rounds.length" class="text-gray-500">
      No active rounds for this building.
    </p>

    <!-- rounds list -->
    <div v-else class="space-y-4">
      <div
        v-for="round in rounds"
        :key="round.roundId"
        class="bg-white border rounded-lg p-4 shadow-sm"
      >
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-semibold">{{ round.name }}</h3>
          <span class="text-xs text-gray-500">{{
            round.assignedTo?.name
          }}</span>
        </div>

        <!-- overall progress -->
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            :style="{ width: progress(round) + '%' }"
            class="bg-green-500 h-2 rounded-full transition-all"
          ></div>
        </div>
        <p class="text-xs text-gray-600 mt-1">
          {{ progress(round) }} % completed
        </p>

        <!-- room list -->
        <ul class="mt-3 space-y-1 text-sm">
          <li
            v-for="room in round.rooms"
            :key="room.roundRoomId"
            class="flex justify-between"
          >
            <span>{{ room.roomId }}</span>
            <CheckIcon
              v-if="room.status === 'COMPLETED'"
              class="text-green-500 w-4"
            />
            <CircleIcon v-else class="text-gray-400 w-4" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<!-- <script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { computed, onMounted } from 'vue'
import SkeletonLarge from '@/components/skeleton/SkeletonLarge.vue'
import { CheckIcon, CircleIcon } from 'lucide-vue-next'
import { GET_ROUNDS_BY_BUILDING } from '@/graphql/round.entity'
import { RoundRoomStatus, type Round } from '@/interfaces/round.interface'

const props = defineProps<{ buildingId: string }>()

const {
  result,
  loading,
  refetch: refetchRoundsByBuilding,
} = useQuery(GET_ROUNDS_BY_BUILDING, {
  buildingId: props.buildingId,
  pollInterval: 2000,
})

const rounds = computed(() => result.value?.roundsByBuilding || [])

const progress = (round: Round) => {
  const total = round.rooms?.length || 0
  const done =
    round.rooms?.filter(r => r.status === RoundRoomStatus.COMPLETED).length || 0
  return total ? Math.round((done / total) * 100) : 0
}

onMounted(() => {
  console.log('Rounds data:', rounds.value)
  refetchRoundsByBuilding()
})
</script> -->

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { computed, onMounted, watch } from 'vue'
import SkeletonLarge from '@/components/skeleton/SkeletonLarge.vue'
import { CheckIcon, CircleIcon } from 'lucide-vue-next'
import { GET_ROUNDS_BY_BUILDING } from '@/graphql/round.entity'
import { RoundRoomStatus, type Round } from '@/interfaces/round.interface'

const props = defineProps<{ buildingId: string }>()

const {
  result,
  loading,
  refetch: refetchRoundsByBuilding,
} = useQuery(GET_ROUNDS_BY_BUILDING, {
  buildingId: props.buildingId,
  pollInterval: 2000,
})

const rounds = computed(() => result.value?.roundsByBuilding || [])

const progress = (round: Round) => {
  const total = round.rooms?.length || 0
  const done =
    round.rooms?.filter(r => r.status === RoundRoomStatus.COMPLETED).length || 0
  return total ? Math.round((done / total) * 100) : 0
}

onMounted(() => {
  console.log('Rounds data:', rounds.value)
  refetchRoundsByBuilding()
})

watch(
  () => props.buildingId,
  () => {
    refetchRoundsByBuilding()
  },
)
</script>
