<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Add Building</h1>

    <form @submit.prevent="submitForm" class="grid gap-4">
      <input
        v-model="form.name"
        type="text"
        placeholder="Building name"
        class="input"
      />
      <input
        v-model="form.address"
        type="text"
        placeholder="Address"
        class="input"
      />
      <select v-model="form.type" class="input">
        <option disabled value="">Select type</option>
        <option value="Flat">Flat</option>
        <option value="Campus">Campus</option>
        <option value="Office">Office</option>
        <option value="Classroom">Classroom</option>
        <option value="Lab">Lab</option>
        <option value="Sanitary">Sanitary</option>
      </select>

      <textarea
        v-model="form.description"
        placeholder="Beschrijving"
        rows="4"
        class="input"
      ></textarea>

      <button type="submit" class="btn-primary rounded-md" :disabled="loading">
        {{ loading ? 'Toevoegen...' : 'Gebouw toevoegen' }}
      </button>

      <p v-if="success" class="text-green-600 text-sm">
        ✅ Gebouw succesvol toegevoegd!
      </p>
      <p v-if="error" class="text-red-600 text-sm">
        ❌ Fout bij toevoegen: {{ error.message }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const form = ref({
  name: '',
  address: '',
  type: '',
  description: '',
})

const success = ref(false)

const CREATE_BUILDING = gql`
  mutation CreateBuilding($createBuildingInput: CreateBuildingInput!) {
    createBuilding(createBuildingInput: $createBuildingInput) {
      buildingId
      name
      type
      description
    }
  }
`

const { mutate, loading, error, onDone } = useMutation(CREATE_BUILDING)

function submitForm() {
  mutate({
    createBuildingInput: { ...form.value },
  })
}

onDone(() => {
  success.value = true
  form.value = { name: '', address: '', type: '', description: '' }
})
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-orange-300;
}
</style>
