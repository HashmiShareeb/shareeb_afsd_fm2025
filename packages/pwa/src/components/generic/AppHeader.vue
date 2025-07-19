<template>
  <aside class="w-64 bg-white h-full fixed inset-0 shadow z-1">
    <!-- Sidebar Header -->
    <div class="flex items-center justify-center h-16 border-b">
      <span class="text-lg font-semibold text-orange-700"
        >Bedenkt een naam</span
      >
    </div>
    <nav>
      <ul class="flex flex-col px-4 list-none">
        <li>
          <router-link
            :to="{ name: 'home' }"
            class="flex items-center p-2 rounded-full hover:bg-orange-100 hover:text-orange-700 mb-2 no-underline"
            active-class="bg-orange-100 text-orange-700"
          >
            <div
              class="rounded-full overflow-hidden h-10 w-10 object-fit ring-neutral-100 flex items-center justify-center bg-white"
            >
              <Home class="object-cover" />
            </div>

            <span class="mx-2"> Home </span>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'buildings' }"
            class="flex items-center p-2 rounded-full hover:bg-orange-100 hover:text-orange-700 mb-2 no-underline"
            active-class="bg-orange-100 text-orange-700"
          >
            <div
              class="rounded-full overflow-hidden h-10 w-10 object-fit ring-neutral-100 flex items-center justify-center bg-white"
            >
              <Building2 class="object-cover" />
            </div>

            <span class="mx-2">Buildings</span>
          </router-link>
        </li>
        <li>
          <RouterLink
            class="block rounded-full focus:outline-none focus-visible:ring-4 ring-blue-400 hover:bg-orange-100 py-2 px-3"
            :to="firebaseUser ? `/myaccount` : `/login`"
          >
            <div v-if="firebaseUser" class="flex items-center gap-3">
              <img
                v-if="firebaseUser.photoURL"
                :src="firebaseUser.photoURL"
                alt="Profile picture"
              />
              <div
                v-else
                class="rounded-full overflow-hidden h-10 w-10 object-fit ring-neutral-100 flex items-center justify-center bg-white"
              >
                <User2 class="object-cover" />
              </div>
              <p class="pr-1">{{ firebaseUser?.displayName || 'No name' }}</p>
            </div>
            <div v-else>
              <p>Login</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <p class="text-xs text-neutral-400 mt-1 text-center">v{{ version }}</p>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import useFirebase from '@/composables/useFirebase'
import { Building2, Home, User2 } from 'lucide-vue-next'
import { version } from '../../../package.json'

const { firebaseUser } = useFirebase()
console.log(firebaseUser)
</script>
