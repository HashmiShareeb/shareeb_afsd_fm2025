<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
    <div class="flex items-center space-x-2 mb-6">
      <div class="h-4 w-14 bg-gray-200 rounded"></div>
      <div class="h-4 w-4 bg-gray-200 rounded-full"></div>
      <div class="h-4 w-20 bg-gray-200 rounded"></div>
      <div class="h-4 w-4 bg-gray-200 rounded-full"></div>
      <div class="h-4 w-32 bg-gray-200 rounded"></div>
    </div>

    <div class="h-72 sm:h-96 w-full bg-gray-200 rounded-2xl"></div>

    <div class="mt-6 space-y-3">
      <div class="h-9 w-3/5 bg-gray-200 rounded"></div>
      <div class="h-5 w-1/2 bg-gray-200 rounded"></div>
      <div class="h-6 w-24 bg-gray-200 rounded-full"></div>
      <div class="h-5 w-full bg-gray-200 rounded"></div>
      <div class="h-5 w-4/5 bg-gray-200 rounded"></div>
    </div>

    <div class="mt-10 mb-4 h-7 w-24 bg-gray-200 rounded"></div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="h-28 bg-gray-200 rounded-xl"></div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
