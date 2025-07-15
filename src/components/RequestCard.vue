<template>
  <!-- [FIX] Bungkus seluruh div dengan <router-link> -->
  <router-link
    :to="{ name: 'request-detail', params: { id: request.id } }"
    class="block hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
  >
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div class="flex justify-between items-start">
        <div>
          <p class="font-bold text-gray-800 dark:text-gray-100">
            {{ request.no_form || 'Nomor Form Tidak Ada' }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ request.no_polisi }} &bull; {{ request.volume }} Liter - {{ bbmNama }}
          </p>
        </div>
        <span class="text-xs font-semibold px-2 py-1 rounded-full" :class="statusColor">{{
          request.status
        }}</span>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">{{ formattedDate }}</p>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  request: {
    type: Object,
    required: true,
  },
})

const bbmNama = computed(() => props.request.jenis_bbm?.nama || 'Data BBM Error')

const formattedDate = computed(() => {
  if (!props.request.tanggal) return 'Invalid Date'
  return new Date(props.request.tanggal).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
})

const statusColor = computed(() => {
  const colors = {
    diajukan: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    disetujui: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    dikeluarkan: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    diperiksa: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    selesai: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    ditolak: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  }
  return colors[props.request.status.toLowerCase()] || 'bg-gray-100 text-gray-800'
})
</script>
