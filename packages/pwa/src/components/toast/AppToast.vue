<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed top-4 right-4 z-[999] w-80"
      @mouseenter="pause()"
      @mouseleave="resume()"
    >
      <div
        :class="[
          'flex items-start p-4 rounded-lg border shadow-lg transition-all toast',
          typeClasses[type],
        ]"
      >
        <!-- icon -->
        <div class="flex-shrink-0">
          <CheckCircleIcon v-if="type === 'success'" class="w-5 h-5" />
          <InfoIcon v-if="type === 'info'" class="w-5 h-5" />
          <XCircleIcon v-if="type === 'error'" class="w-5 h-5" />
        </div>

        <!-- info -->
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium">{{ title }}</p>
          <p v-if="message" class="mt-0.5 text-xs">{{ message }}</p>
        </div>
        <!-- close toast -->
        <button
          class="ml-2 -mr-1 -mt-1 p-1 rounded-md hover:bg-black/10"
          @click="close"
        >
          <XIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CheckCircleIcon, XCircleIcon, InfoIcon, XIcon } from 'lucide-vue-next'

/* props */
interface Props {
  type: 'success' | 'info' | 'error'
  title: string
  message?: string
  duration?: number
}
const props = withDefaults(defineProps<Props>(), {
  duration: 4000,
})

/* emit */
const emit = defineEmits<{
  close: []
}>()

/* state */
const visible = ref(true)
let timer: ReturnType<typeof setTimeout> | null = null

/* color map */
const typeClasses = {
  success: 'bg-green-50 text-green-800 border-green-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  error: 'bg-red-50 text-red-800 border-red-200',
}

/* auto-close */
const close = () => {
  visible.value = false
  emit('close')
}
const startTimer = () => {
  if (props.duration <= 0) return
  timer = setTimeout(close, props.duration)
}
const pause = () => timer && clearTimeout(timer)
const resume = () => startTimer()

startTimer()

// const iconClass = computed(() => {
//   switch (props.type) {
//     case 'success':
//       return 'text-green-500'
//     case 'error':
//       return 'text-red-500'
//     case 'info':
//     default:
//       return 'text-blue-500'
//   }
// })
</script>

<style scoped>
.toast {
  animation:
    slideIn 0.5s forwards,
    fadeOut 0.5s forwards 3s;
}
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fadeOut {
  to {
    opacity: 0;
  }
}
</style>
