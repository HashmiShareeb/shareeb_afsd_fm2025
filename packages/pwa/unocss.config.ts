// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  shortcuts: [
    // Define your shortcuts here
    [
      'btn-primary',
      'bg-orange-500 text-white px-4 py-2 outline-none border-none focus:ring-2 focus:ring-orange-300 hover:bg-orange-600 active:bg-orange-700',
    ],
    [
      'btn-secondary',
      'bg-white text-orange-500 px-4 py-2 outline-none border-1 border-orange-300 focus:ring-2 focus:ring-orange-300 hover:border-orange-300 active:bg-orange-700',
    ],
    [
      'border-orange-clean',
      'border border-orange-500 rounded-md', // Clean border with rounded corners
    ],
    [
      'input',
      'border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500',
    ],
  ],
})
