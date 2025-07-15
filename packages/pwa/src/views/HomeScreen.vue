<template>
  <div>
    <!-- HomeScreen content goes here -->
    <h1 class="text-2xl font-bold text-center mt-8">
      Welcome to the Home Screen
    </h1>
    <p class="text-center text-gray-600 dark:text-gray-300 mt-4">
      {{ firebaseUser?.displayName }}
    </p>
  </div>
</template>

<script setup lang="ts">
import useFirebase from '@/composables/useFirebase'

const { firebaseUser } = useFirebase()
</script>
