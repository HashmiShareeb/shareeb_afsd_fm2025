<template>
  <form @submit.prevent="handleRegister" class="w-full">
    <div class="mt-6">
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
        class="mt-1 block w-full rounded-md"
      />
    </div>

    <div class="mt-6">
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
        class="mt-1 block w-full rounded-md"
      />
    </div>

    <div class="mt-6">
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
        class="mt-1 block w-full rounded-md"
      />
    </div>

    <div class="mt-6">
      <button
        type="submit"
        class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
      >
        Register
      </button>
    </div>
  </form>
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
