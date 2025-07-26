<template>
  <div class="flex items-center justify-center my-20">
    <form @submit.prevent="handleRegister" class="max-w-md w-full mx-auto">
      <h1 class="text-2xl font-bold mb-4">Create an account</h1>
      <p class="text-neutral-500 mb-4">
        Join us to start managing your buildings.
      </p>

      <div class="mb-4">
        <label
          for="nickname"
          class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
        >
          Name
        </label>
        <input
          v-model="newUser.name"
          type="text"
          name="nickname"
          id="nickname"
          class="mt-1 block w-full rounded-md p-2 border border-gray-300 rounded"
        />
      </div>

      <div class="mb-4">
        <label
          for="email"
          class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
        >
          Email
        </label>
        <input
          v-model="newUser.email"
          type="email"
          name="email"
          id="email"
          class="mt-1 block w-full rounded-md p-2 border border-gray-300 rounded"
        />
      </div>

      <div class="mb-4">
        <label
          for="password"
          class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
        >
          Password
        </label>
        <input
          v-model="newUser.password"
          type="password"
          name="password"
          id="password"
          class="mt-1 block w-full rounded-md p-2 border border-gray-300 rounded"
        />
      </div>

      <div class="mb-4">
        <button type="submit" class="btn-primary w-full rounded-full">
          Register
        </button>
      </div>
      <div class="mt-4 text-neutral-500 text-sm block text-center">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline">
          Login
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import useFirebase from '@/composables/useFirebase'
import { ref } from 'vue'
import type { AuthError } from 'firebase/auth'

const { register } = useFirebase()
const newUser = ref({
  name: '',
  email: '',
  password: '',
})
const error = ref<AuthError | null>(null)

const handleRegister = () => {
  register(newUser.value.name, newUser.value.email, newUser.value.password)
    .then(user => {
      console.log('User registered', user)
    })
    .catch((err: AuthError) => {
      error.value = err
    })
}
</script>
