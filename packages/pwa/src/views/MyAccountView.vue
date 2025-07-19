<template>
  <div v-if="firebaseUser" class="block py-8">
    <div class="flex items-center space-x-4">
      <Avatar
        :label="firebaseUser.displayName?.charAt(0).toUpperCase()"
        size="large"
      />
      <h1 class="font-bold text-2xl">
        {{ firebaseUser.displayName }}
        <span class="text-sm block font-light text-gray-400">{{
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
