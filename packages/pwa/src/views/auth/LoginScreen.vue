<template>
  <form @submit.prevent="handleLogin" class="w-full">
    {{ firebaseUser }}
    <label for="email">
      Email:
      <input
        v-model="loginCredentials.email"
        type="email"
        id="email"
        class="block w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
    </label>
    <label for="password">
      Password:
      <input
        v-model="loginCredentials.password"
        type="password"
        id="password"
        class="block w-full p-2 border border-gray-300 rounded mb-4"
        required
      />
    </label>

    <button
      type="submit"
      class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
    >
      Login
    </button>
  </form>
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
      email: 'christophe.laprudence@howest.be',
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
