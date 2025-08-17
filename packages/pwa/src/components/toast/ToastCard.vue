<template>
  <!-- Toast Container (Position at top-right) -->
  <div class="fixed top-4 right-4 z-50 space-y-3 w-80">
    <!-- Success Toast -->
    <div
      class="toast flex items-start p-4 bg-green-50 rounded-lg border border-green-100 shadow-lg"
    >
      <div class="flex-shrink-0">
        <CheckCircleIcon class="w-6 h-6 text-green-500" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-green-800">Success</h3>
        <p class="mt-1 text-sm text-green-600">
          Your changes have been saved successfully.
        </p>
      </div>
      <button class="ml-auto text-green-400 hover:text-green-500">
        <XIcon class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon, XIcon } from 'lucide-vue-next'
</script>
