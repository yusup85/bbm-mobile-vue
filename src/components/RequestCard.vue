<template>
  <router-link :to="{ name: 'request-detail', params: { id: request.id } }" class="block group">
    <div
      class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group-hover:scale-[1.02]"
    >
      <div class="flex justify-between items-start mb-4">
        <div class="flex-1">
          <div class="flex items-center space-x-3 mb-2">
            <div
              class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3
                class="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-200"
              >
                {{ request.no_form || 'Nomor Form Tidak Ada' }}
              </h3>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h5m4-5.5V9a1 1 0 00-1-1H8a1 1 0 00-1 1v2.5"
                />
              </svg>
              <span class="font-medium">{{ request.no_polisi }}</span>
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              <span>{{ request.volume }} Liter</span>
              <span class="mx-2 text-gray-300">•</span>
              <span class="font-medium">{{ bbmNama }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end space-y-2">
          <span
            class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm"
            :class="statusColor"
          >
            {{ request.status }}
          </span>
        </div>
      </div>

      <div class="flex items-center justify-between pt-4 border-t border-gray-100">
        <div class="flex items-center text-xs text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4V7a2 2 0 012-2h4a2 2 0 012 2v4M8 15v4a2 2 0 002 2h4a2 2 0 002-2v-4"
            />
          </svg>
          <span>{{ formattedDate }}</span>
        </div>
        <div class="flex items-center text-blue-600 group-hover:text-blue-700">
          <span class="text-xs font-medium mr-1">Lihat Detail</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
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
    diajukan: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300',
    disetujui_atasan:
      'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300',
    disetujui:
      'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300',
    dikeluarkan_operator:
      'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300',
    dikeluarkan:
      'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300',
    diperiksa:
      'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300',
    selesai: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300',
    ditolak: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300',
  }
  return (
    colors[props.request.status.toLowerCase()] ||
    'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
  )
})
</script>
