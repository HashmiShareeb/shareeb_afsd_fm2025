<template>
  <div class="fixed inset-0 z-10 flex bg-black/10 p-6">
    <!-- Overlay background -->
    <button
      type="button"
      class="inset-0 flex-1 cursor-default"
      @click="onClose"
      aria-label="Close modal"
    ></button>

    <!-- Slide-in content -->
    <transition name="popup" mode="out-in" appear>
      <div
        class="z-10 w-[600px] max-w-full overflow-y-auto rounded-xl border border-gray-300 bg-white p-6 shadow-sm"
      >
        <!-- Header -->
        <div class="mb-4 flex items-center justify-between">
          <div class="inline-flex space-x-2 items-center">
            <h2 class="my-2 text-xl font-medium text-gray-800">
              {{ title }}
            </h2>
          </div>
          <button
            @click="onClose"
            aria-label="Close"
            class="transition-transform duration-200 hover:scale-110"
          >
            <X />
          </button>
        </div>

        <!-- Modal content slot -->
        <div class="space-y-4">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { X } from 'lucide-vue-next'

const { title } = defineProps<{
  title: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function onClose() {
  emit('close')
}
</script>

<style scoped>
/* Pop-up effect */
.popup-enter-active,
.popup-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.3s ease;
}
.popup-enter-from {
  transform: scale(0.8);
  opacity: 0;
}
.popup-enter-to {
  transform: scale(1);
  opacity: 1;
}
.popup-leave-from {
  transform: scale(1);
  opacity: 1;
}
.popup-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>
