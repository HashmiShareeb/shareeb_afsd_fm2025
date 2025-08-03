<template>
  <div class="flex h-screen font-sans">
    <AppHeader />
    <main
      class="font-sans flex-grow ml-64 min-h-screen bg-gray-50 overflow-auto"
    >
      <div class="max-w-6xl mx-auto p-4 sm:p-6">
        <RouterView />
      </div>

      <AppFooter />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/generic/AppHeader.vue'
import AppFooter from '@/components/generic/AppFooter.vue'
</script>
