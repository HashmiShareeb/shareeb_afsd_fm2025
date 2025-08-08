<template>
  <!-- HomeScreen content -->
  <h1 class="text-2xl font-bold">
    Welcome back,
    <span class="text-orange-500">{{
      firebaseUser?.displayName || 'displayName'
    }}</span>
  </h1>
  <p class="text-gray-600 mt-2">
    Here you can manage your buildings and view details.
  </p>
  <!-- Widget Section -->
  <div
    class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    v-if="userRole === Role.ADMIN"
  >
    <!-- Manage Buildings (visible only to ADMIN) -->
    <div class="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
      <Building2 class="text-orange-500 w-10 h-10" />
      <div>
        <h2 class="text-lg font-semibold">Manage Buildings</h2>
        <!-- <p class="text-gray-600 text-sm">
          Add, edit, or remove buildings. (this is for the facility manager
          example) you should see this as an ADMIN
        </p> -->
        <p class="text-gray-500 text-md mt-1">
          Total buildings: {{ buildings.length }}
        </p>
      </div>
      <div class="flex justify-end mt-auto ml-auto">
        <router-link
          :to="{ name: 'admin-buildings' }"
          class="mt-2 inline-block text-sm text-orange-600 hover:underline"
        >
          building list
        </router-link>
      </div>
    </div>
    <!-- total concierges -->
    <div class="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
      <UserCog2Icon class="text-orange-500 w-8 h-8" />
      <div>
        <h2 class="text-lg font-semibold">Concierges</h2>
        <p class="text-gray-600 text-md mt-1 capitalize">
          total concierges: {{ managers.length }}
        </p>
      </div>
    </div>
    <!-- total active rounds -->
    <div class="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
      <UserRoundSearch class="text-orange-500 w-8 h-8" />
      <div>
        <h2 class="text-lg font-semibold">Active rounds</h2>
        <p class="text-gray-600 text-md mt-1 capitalize">
          total active rounds: {{ rounds.length }}
        </p>
      </div>
      <div v-if="rounds.length > 3" class="flex justify-end mt-auto ml-auto">
        <router-link
          :to="{ name: 'admin-rounds' }"
          class="text-sm text-orange-600 hover:underline"
        >
          View all rounds
        </router-link>
      </div>
    </div>

    <ul v-if="rounds.length" class="mt-4 space-y-2">
      <li
        v-for="round in rounds.slice(0, 3)"
        :key="round.id"
        class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
      >
        <span class="font-medium">{{ round.name || 'Unnamed Round' }}</span>
        <span class="text-xs text-gray-500 uppercase">{{
          round.status || ''
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import useCustomUser from '@/composables/useCustomUser'
import useFirebase from '@/composables/useFirebase'
import { Building2, UserCog2Icon, UserRoundSearch } from 'lucide-vue-next'
import { GET_BUILDINGS } from '@/graphql/building.entity'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'
import { GET_MANAGERS } from '@/graphql/user.query'
import { Role } from '@/interfaces/custom.user.interface'
import { GET_ROUNDS } from '@/graphql/round.entity'

const { userRole } = useCustomUser()
const { firebaseUser } = useFirebase()

const { result } = useQuery(GET_BUILDINGS)
const buildings = computed(() => result.value?.buildings ?? [])

const { result: managerData } = useQuery(GET_MANAGERS)
const managers = computed(() => managerData.value?.usersByRole || [])

const { result: roundData } = useQuery(GET_ROUNDS)
const rounds = computed(() => roundData.value?.rounds || [])
</script>
