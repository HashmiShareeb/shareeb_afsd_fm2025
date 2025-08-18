<template>
  <aside class="w-64 h-full fixed inset-0 shadow z-1">
    <div class="p-4 border-b">
      <div class="flex items-center gap-2">
        <AppLogo class="h-9 w-9" />
        <span class="text-xl font-semibold text-gray-800 flex items-center h-9"
          >Nexus FM</span
        >
      </div>
    </div>
    <nav class="h-full overflow-y-auto mt-4">
      <ul class="flex flex-col px-4 list-none no-underline">
        <li v-if="userRole === Role.MANAGER">
          <router-link
            :to="{ name: 'concierge-home' }"
            class="flex items-center p-2 rounded-full hover:bg-orange-100 hover:text-orange-700 mb-2 no-underline"
            active-class="bg-orange-100 text-orange-700"
          >
            <div
              class="rounded-full overflow-hidden h-10 w-10 object-fit ring-orange-50 flex items-center justify-center bg-orange-100"
            >
              <Home class="object-cover" />
            </div>
            <span class="mx-2">Dashboard</span>
          </router-link>
        </li>
        <li v-if="userRole === Role.USER">
          <router-link
            :to="{ name: 'userhome' }"
            class="flex items-center p-2 rounded-full hover:bg-orange-100 hover:text-orange-700 mb-2 no-underline"
            active-class="bg-orange-100 text-orange-700"
          >
            <div
              class="rounded-full overflow-hidden h-10 w-10 object-fit ring-orange-50 flex items-center justify-center bg-orange-100"
            >
              <Home class="object-cover" />
            </div>
            <span class="mx-2">Dashboard</span>
          </router-link>
        </li>
        <li v-if="userRole === Role.ADMIN">
          <router-link
            :to="{ name: 'admin' }"
            class="flex items-center p-2 rounded-full hover:bg-orange-100 hover:text-orange-700 mb-2 no-underline"
            active-class="bg-orange-100 text-orange-700"
          >
            <div
              class="rounded-full overflow-hidden h-10 w-10 object-fit ring-orange-50 flex items-center justify-center bg-orange-100"
            >
              <Home class="object-cover" />
            </div>
            <span class="mx-2">Dashboard</span>
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
              <BuildingIcon class="object-cover" />
            </div>
            <span class="mx-2">Buildings</span>
          </router-link>
        </li>
        <!-- <li v-if="userRole === Role.MANAGER">
          <router-link
            :to="{ name: 'rounds' }"
            class="flex items-center p-2 rounded-full hover:bg-orange-100 hover:text-orange-700 mb-2 no-underline"
            active-class="bg-orange-100 text-orange-700"
          >
            <div
              class="rounded-full overflow-hidden h-10 w-10 object-fit ring-orange-50 flex items-center justify-center bg-orange-100"
            >
              <CalendarSearch class="object-cover" />
            </div>
            <span class="mx-2">My Rounds</span>
          </router-link>
        </li> -->
        <li v-if="userRole === Role.ADMIN">
          <router-link
            :to="{ name: 'admin-rounds' }"
            class="flex items-center p-2 rounded-full hover:bg-orange-100 hover:text-orange-700 mb-2 no-underline"
            active-class="bg-orange-100 text-orange-700"
          >
            <div
              class="rounded-full overflow-hidden h-10 w-10 object-fit ring-orange-50 flex items-center justify-center bg-orange-100"
            >
              <CalendarSearch class="object-cover" />
            </div>
            <span class="mx-2">Manage Rounds</span>
          </router-link>
        </li>
        <li v-if="userRole == Role.MANAGER">
          <router-link
            :to="{ name: 'concierge-energy-reading' }"
            class="flex items-center p-2 rounded-full hover:bg-orange-100 hover:text-orange-700 mb-2 no-underline"
            active-class="bg-orange-100 text-orange-700"
          >
            <div
              class="rounded-full overflow-hidden h-10 w-10 object-fit ring-orange-50 flex items-center justify-center bg-orange-100"
            >
              <Zap class="object-cover" />
            </div>
            <span class="mx-2">Energy Readings</span>
          </router-link>
        </li>
        <li v-if="userRole === Role.ADMIN">
          <router-link
            :to="{ name: 'admin-energy-reading' }"
            class="flex items-center p-2 rounded-full hover:bg-orange-100 hover:text-orange-700 mb-2 no-underline"
            active-class="bg-orange-100 text-orange-700"
          >
            <div
              class="rounded-full overflow-hidden h-10 w-10 object-fit ring-orange-50 flex items-center justify-center bg-orange-100"
            >
              <Zap class="object-cover" />
            </div>
            <span class="mx-2">Energy Readings</span>
          </router-link>
        </li>
        <!-- ?test als rol werkt of niet -->
        <li v-if="userRole === Role.USER">
          <router-link
            :to="{ name: 'reports' }"
            class="flex items-center p-2 rounded-full hover:bg-orange-100 hover:text-orange-700 mb-2 no-underline"
            active-class="bg-orange-100 text-orange-700"
          >
            <div
              class="rounded-full overflow-hidden h-10 w-10 object-fit ring-orange-50 flex items-center justify-center bg-orange-100"
            >
              <FileSpreadsheet class="object-cover" />
            </div>
            <span class="mx-2">Reports</span>
          </router-link>
        </li>
        <router-link :to="firebaseUser ? `/myaccount` : `/login`">
          <li
            class="mt-auto flex items-center gap-2 align-center mb-4 no-underline absolute bottom-4 left-0 right-0 mx-5"
          >
            <div
              v-if="firebaseUser && !firebaseUser.photoURL"
              class="rounded-md h-10 w-10 flex items-center justify-center bg-orange-100 text-orange-700 text-2xl font-bold mx-2"
              style="user-select: none"
            >
              {{
                firebaseUser.displayName
                  ? firebaseUser.displayName.charAt(0).toUpperCase()
                  : 'U'
              }}
            </div>
            <div v-else-if="firebaseUser && firebaseUser.photoURL" class="mx-2">
              <img
                :src="firebaseUser.photoURL"
                alt="Profile picture"
                class="rounded-full h-10 w-10 object-cover"
              />
            </div>
            <div v-if="firebaseUser">
              <h1 class="font-bold text-lg">
                {{ firebaseUser.displayName || 'Unknown User' }}
              </h1>
              <p v-if="userRole" class="text-sm text-orange-500">
                {{ userRole }}
              </p>
              <p v-else-if="loading" class="text-sm text-gray-500">
                Loading role...
              </p>
              <p v-else class="text-sm text-gray-500">No role assigned</p>
            </div>
            <h1 v-else class="font-bold text-lg">Login</h1>
          </li>
        </router-link>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import useFirebase from '@/composables/useFirebase'
import { OWN_USER_ACCOUNT } from '@/graphql/user.query'
import {
  Home,
  CalendarSearch,
  BuildingIcon,
  FileSpreadsheet,
  Zap,
} from 'lucide-vue-next'
import { Role } from '@/interfaces/custom.user.interface'
import AppLogo from './AppLogo.vue'

// Get Firebase user
const { firebaseUser } = useFirebase()

// Compute GraphQL variables
const variables = computed(() => {
  return firebaseUser.value?.uid ? { uid: firebaseUser.value.uid } : null
})

// Compute whether to skip query
const shouldSkip = computed(() => !firebaseUser.value?.uid)

// Run GraphQL query
const { result, loading, refetch } = useQuery(OWN_USER_ACCOUNT, variables, {
  enabled: computed(() => !shouldSkip.value),
  fetchPolicy: 'network-only',
})

// Refetch user data when firebaseUser changes
watch(firebaseUser, newVal => {
  if (newVal?.uid) {
    refetch()
  }
})

// Debug logs
// watch(result, newVal => {
//   console.log('Raw result:', JSON.stringify(newVal, null, 2))
//   console.log('User by UID:', newVal?.userByUid)
// })
// watch(firebaseUser, newVal => {
//   console.log('firebaseUser UID:', newVal?.uid)
// })
// watch(error, newVal => {
//   if (newVal) console.error('GraphQL query error:', newVal)
// })

// Compute role
const userRole = computed(() => {
  const role = result.value?.userByUid?.role || null
  console.log('Computed userRole:', role)
  return role ? role.toUpperCase() : null
})
</script>
