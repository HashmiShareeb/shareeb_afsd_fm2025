<template>
  <li
    v-if="myRounds"
    class="mb-2 p-3 bg-white rounded shadow flex justify-between items-center"
  >
    <div>
      <span class="font-medium text-gray-800">{{ myRounds.name }}</span>
      <span class="text-gray-500 text-sm ml-2">
        Assigned to: {{ myRounds.assignedTo?.name || 'N/A' }}
      </span>
    </div>
    <div>
      <span class="text-gray-400 text-xs uppercase">{{ myRounds.status }}</span>
    </div>
  </li>
  <p v-else>No rounds available</p>
</template>

<script setup lang="ts">
import useCustomUser from '@/composables/useCustomUser'
defineProps(['myRounds'])

const { restoreCustomUser } = useCustomUser()

restoreCustomUser()
</script>
