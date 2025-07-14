<template>
  <!-- Sun in light mode, Moon in dark mode, from Carbon
  <button class="i-carbon-sun dark:i-carbon-moon" /> -->
  <main class="px-8">
    <div class="min-h-screen flex flex-col">
      <RouterView class="grow" />
      <div class="mt-4 flex items-center space-x-2">
        <RouterLink
          to="/login"
          class="text-blue-600 hover:underline font-medium"
        >
          Login
        </RouterLink>
        <span class="text-gray-400">|</span>
        <RouterLink
          to="/register"
          class="text-blue-600 hover:underline font-medium"
        >
          Register
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
