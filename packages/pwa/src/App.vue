<template>
  <div class="flex h-screen">
    <AppHeader />
    <main
      class="font-sans flex-grow ml-64 min-h-screen bg-gray-50 overflow-auto"
    >
      <div class="max-w-5xl mx-auto p-4 sm:p-6">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/generic/AppHeader.vue'
</script>
