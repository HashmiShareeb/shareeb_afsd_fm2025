<template>
  <div v-if="firebaseUser" class="block py-8">
    <div class="flex items-center space-x-4">
      <div
        v-if="firebaseUser && !firebaseUser.photoURL"
        class="rounded-full h-16 w-16 flex items-center justify-center bg-orange-200 text-orange-700 text-2xl font-bold mb-2"
      >
        {{
          firebaseUser.displayName
            ? firebaseUser.displayName.charAt(0).toUpperCase()
            : 'U'
        }}
      </div>
      <h1 class="font-bold text-2xl">
        {{ firebaseUser.displayName }}
        <span class="text-sm block font-light text-gray-500">{{
          firebaseUser.email
        }}</span>
      </h1>
    </div>
  </div>
  <div v-else>
    <p>You are not logged in</p>
    <RouterLink to="/login" class="text-teal-500">Login</RouterLink>
  </div>
  <form @click="handleLogout">
    <Button severity="danger" v-if="firebaseUser" @click="handleLogout"
      >Logout</Button
    >
  </form>
</template>

<script setup lang="ts">
import useFirebase from '@/composables/useFirebase'
import { useRouter } from 'vue-router'

const { replace } = useRouter()
const { firebaseUser, logout } = useFirebase()

const handleLogout = () => {
  logout().then(() => {
    console.log('Logged out')
    firebaseUser.value?.getIdToken().then(token => {
      console.log(`{"Authorization": "Bearer ${token}"}`)
    })
    replace({ name: 'login' })
  })
}
</script>
