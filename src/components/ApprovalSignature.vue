<template>
  <div v-if="user || signature" class="text-center flex-1 min-w-[150px]">
    <h3 class="text-sm font-semibold text-gray-600 mb-2">{{ title }}</h3>
    <div class="bg-gray-50 p-0 rounded-lg space-y-2">
      <img
        v-if="signature"
        :src="signature"
        :alt="`Tanda Tangan ${title}`"
        class="h-16 w-full object-contain mx-auto"
      />
      <div v-else class="h-16 flex items-center justify-center">
        <span class="text-xs text-gray-400">Belum ada TTD</span>
      </div>

      <!-- [BARU] Menampilkan foto bukti jika ada -->
      <div v-if="photo">
        <img
          :src="photo"
          :alt="`Foto bukti ${title}`"
          class="rounded-md w-full object-cover cursor-pointer"
          @click="showFullImage = true"
        />
      </div>

      <div class="mt-2 border-t pt-2">
        <p class="font-semibold text-gray-800 text-sm truncate">
          {{ user?.name || 'N/A' }}
        </p>
        <p class="text-xs text-gray-500">
          {{ user?.jabatan || 'Jabatan tidak ada' }}
        </p>
      </div>
    </div>
  </div>

  <!-- [BARU] Modal untuk melihat foto ukuran penuh -->
  <div
    v-if="showFullImage"
    @click="showFullImage = false"
    class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
  >
    <img :src="photo" class="max-w-full max-h-full rounded-lg" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: { type: String, required: true },
  user: { type: Object, default: null },
  signature: { type: String, default: null },
  photo: { type: String, default: null }, // [BARU] Prop untuk foto
})

const showFullImage = ref(false) // [BARU]
</script>
