<template>
  <div class="flex items-center justify-center my-20">
    <form @submit.prevent="handleLogin" class="max-w-md w-full mx-auto">
      <h1 class="text-2xl font-bold mb-4">Welcome back! Login</h1>
      <p class="text-neutral-500 mb-4">
        Please enter your email and password to continue.
      </p>

      {{ firebaseUser }}
      <div v-if="error" class="text-red-600 mb-2">{{ error }}</div>
      <div class="mb-4">
        <label
          for="email"
          class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
        >
          Email
          <input
            v-model="loginCredentials.email"
            type="email"
            id="email"
            class="mt-1 block w-full rounded-md p-2 border border-gray-300 rounded"
            required
          />
        </label>
      </div>
      <div class="mb-4">
        <label
          for="password"
          class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
        >
          Password
        </label>
        <input
          v-model="loginCredentials.password"
          type="password"
          id="password"
          class="mt-1 block w-full rounded-md p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-orange-500 py-3 px-2 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none transition-colors"
        aria-label="Login"
      >
        Login
      </button>

      <div class="mt-4 text-neutral-500 text-sm block text-center">
        Don't have an account?
        <router-link to="/register" class="text-blue-600 hover:underline">
          Sign up
        </router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import useFirebase from '@/composables/useFirebase'
import type { AuthError } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    // Composables
    const { login, firebaseUser } = useFirebase()
    const { replace } = useRouter()

    // Logic
    const loginCredentials = ref({
      email: '',
      password: '',
    })

    const error = ref('')

    const handleLogin = () => {
      login(loginCredentials.value.email, loginCredentials.value.password)
        .then(() => {
          replace('/')
        })
        .catch((err: AuthError) => {
          error.value = err.message
        })
    }

    return {
      firebaseUser,
      loginCredentials,
      error,
      handleLogin,
    }
  },
}
</script>
