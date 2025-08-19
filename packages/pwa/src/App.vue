<template>
  <div class="flex h-screen font-sans text-gray-700">
    <AppHeader />
    <main class="font-sans flex-grow min-h-screen bg-gray-50 overflow-auto">
      <div class="max-w-8xl ml-64 mx-auto p-4 sm:p-6">
        <RouterView />
        <AppFooter />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/generic/AppHeader.vue'
import AppFooter from '@/components/generic/AppFooter.vue'
</script>
