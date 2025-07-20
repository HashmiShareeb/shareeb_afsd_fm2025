<template>
  <aside class="w-64 bg-white h-full fixed inset-0 shadow z-1">
    <!-- Sidebar Header -->
    <div class="flex items-center justify-center h-16 border-b">
      <span class="text-lg font-semibold text-orange-700"
        >Bedenkt een naam</span
      >
    </div>
    <nav>
      <ul class="flex flex-col px-4 list-none no-underline">
        <li>
          <router-link
            :to="{ name: 'home' }"
            class="flex items-center p-2 rounded-full hover:bg-orange-100 hover:text-orange-700 mb-2 no-underline"
            active-class="bg-orange-100 text-orange-700"
          >
            <div
              class="rounded-full overflow-hidden h-10 w-10 object-fit ring-orange-50 flex items-center justify-center bg-orange-100"
            >
              <Home class="object-cover" />
            </div>

            <span class="mx-2"> Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'buildings' }"
            class="flex items-center p-2 rounded-full hover:bg-orange-100 hover:text-orange-700 mb-2 no-underline"
            active-class="bg-orange-100 text-orange-700"
          >
            <div
              class="rounded-full overflow-hidden h-10 w-10 object-fit ring-orange-50 flex items-center justify-center bg-orange-100"
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

        <li class="mt-auto flex items-center">
          <div
            v-if="firebaseUser && !firebaseUser.photoURL"
            class="rounded-md h-10 w-10 flex items-center justify-center bg-orange-100 text-orange-700 text-2xl font-bold mx-2 mb-2"
            style="user-select: none"
          >
            {{
              firebaseUser.displayName
                ? firebaseUser.displayName.charAt(0).toUpperCase()
                : 'U'
            }}
            <img
              v-if="firebaseUser.photoURL"
              :src="firebaseUser.photoURL"
              alt="Profile picture"
            />
          </div>
          <h1 class="font-bold text-lg">
            {{ firebaseUser?.displayName }}
            <span class="text-sm block font-light text-gray-500">{{
              firebaseUser?.email
            }}</span>
          </h1>
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
