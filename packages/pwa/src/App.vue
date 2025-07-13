<template>
  <!-- Sun in light mode, Moon in dark mode, from Carbon
  <button class="i-carbon-sun dark:i-carbon-moon" /> -->
  <main class="min-h-screen flex flex-col">
    <h1 class="bg-red-500 p-4 rounded shadow">setup done</h1>
    <RouterView />
    <div class="mt-4 flex items-center space-x-2">
      <RouterLink
        to="/auth/login"
        class="text-blue-600 hover:underline font-medium"
      >
        Login
      </RouterLink>
      <span class="text-gray-400">|</span>
      <RouterLink
        to="/auth/register"
        class="text-blue-600 hover:underline font-medium"
      >
        Register
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
