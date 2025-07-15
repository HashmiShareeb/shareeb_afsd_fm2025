<template>
  <!-- Sun in light mode, Moon in dark mode, from Carbon
  <button class="i-carbon-sun dark:i-carbon-moon" /> -->
  <main class="text-decoration-none">
    <div class="flex max-w-screen-lg mx-auto h-screen">
      <AppHeader />
      <div class="flex flex-col w-full">
        <RouterView class="grow" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/generic/AppHeader.vue'
</script>
