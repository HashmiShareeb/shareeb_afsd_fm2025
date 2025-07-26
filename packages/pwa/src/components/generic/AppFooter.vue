<template>
  <footer class="mt-auto text-center fixed bottom-0 left-0 right-0 p-4">
    <p class="text-xs">
      Created by Shareeb Hashmi
      <a
        class="underline focus:outline-none focus-visible:ring-4 ring-blue-400 rounded-md"
        href="https://mct.be/"
        >MCT</a
      >
      -
      {{ new Date().getFullYear() }} <br />
      <span class="text-xs text-neutral-500 mt-1 text-center"
        >v{{ version }}</span
      >
    </p>
  </footer>
</template>

<script setup lang="ts">
import { version } from '../../../package.json'
</script>
