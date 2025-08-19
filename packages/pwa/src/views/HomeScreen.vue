<template>
  <div>
    <h1 class="text-2xl font-bold" tabindex="0">
      You are not supposed to see this screen
    </h1>
    <div
      v-if="!firebaseUser"
      class="flex flex-col items-center mt-8"
      role="alert"
      aria-live="polite"
    >
      <button
        class="btn-primary rounded-lg"
        @click="router.push('/login')"
        aria-label="Go to Login"
      >
        Go to Login
      </button>
      <p class="mt-4 text-gray-500 text-sm" tabindex="0">
        Please log in to continue.
      </p>
    </div>
    <SkeletonLarge
      v-else
      class="mt-8"
      :rows="5"
      :columns="3"
      :loading="true"
      aria-busy="true"
      aria-label="Loading content"
    />
  </div>
</template>

<script setup lang="ts">
import useFirebase from '@/composables/useFirebase'
import { GET_BUILDINGS } from '@/graphql/building.entity'
import { OWN_USER_ACCOUNT } from '@/graphql/user.query'
import { useQuery } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'

import { computed, watch } from 'vue'
import SkeletonLarge from '@/components/skeleton/SkeletonLarge.vue'
const { firebaseUser } = useFirebase()
const router = useRouter()

const variables = computed(() => {
  return firebaseUser.value?.uid ? { uid: firebaseUser.value.uid } : null
})

// Compute whether to skip query
const shouldSkip = computed(() => !firebaseUser.value?.uid)

const { result, error, refetch } = useQuery(OWN_USER_ACCOUNT, variables, {
  fetchPolicy: 'network-only',
  enabled: computed(() => !shouldSkip.value),
})

const getBuildings = useQuery(GET_BUILDINGS)
const buildings = computed(() => getBuildings.result.value?.buildings ?? [])

console.log('Buildings:', buildings.value)

// Refetch user data when firebaseUser changes
watch(firebaseUser, newVal => {
  if (newVal?.uid) {
    refetch()
  }
})

// Debug logs
watch(result, newVal => {
  console.log('Raw result:', JSON.stringify(newVal, null, 2))
  console.log('User by UID:', newVal?.userByUid)
})
watch(firebaseUser, newVal => {
  console.log('firebaseUser UID:', newVal?.uid)
})
watch(error, newVal => {
  if (newVal) console.error('GraphQL query error:', newVal)
})
// Compute role
</script>
