<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header Section -->
    <div class="bg-white shadow-sm p-6">
      <div class="flex items-center space-x-4">
        <div
          class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold text-gray-900">Riwayat Permintaan</h1>
          <p class="text-gray-600 text-sm">Semua aktivitas BBM Anda</p>
        </div>
      </div>
    </div>

    <div class="p-4">
      <!-- Status Filter Tabs -->
      <div class="mb-6">
        <div class="bg-white rounded-2xl shadow-sm p-1">
          <nav class="flex space-x-1 overflow-x-auto">
            <button
              v-for="tab in statusTabs"
              :key="tab.value"
              @click="selectStatus(tab.value)"
              :class="[
                selectedStatus === tab.value
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50',
                'relative whitespace-nowrap py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center space-x-2',
              ]"
            >
              <span>{{ tab.label }}</span>
              <span
                v-if="getCountByStatus(tab.value) > 0"
                :class="[
                  selectedStatus === tab.value
                    ? 'bg-white/20 text-white'
                    : 'bg-blue-100 text-blue-600',
                  'px-2 py-0.5 rounded-full text-xs font-bold min-w-[20px] text-center',
                ]"
              >
                {{ getCountByStatus(tab.value) }}
              </span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Content Area -->
      <div class="space-y-4">
        <div v-if="loading" class="space-y-4">
          <!-- Enhanced Loading Placeholders -->
          <div v-for="n in 3" :key="n" class="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div class="animate-pulse">
              <div class="p-6">
                <div class="flex items-center space-x-4">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"
                  ></div>
                  <div class="flex-1 space-y-2">
                    <div
                      class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"
                    ></div>
                    <div
                      class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2"
                    ></div>
                  </div>
                  <div
                    class="w-20 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="error" class="bg-white rounded-2xl shadow-sm p-8">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Gagal Memuat Riwayat</h3>
            <p class="text-gray-500 text-sm mb-4">{{ error }}</p>
            <button
              @click="fetchHistory"
              class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Coba Lagi
            </button>
          </div>
        </div>

        <div v-else-if="requests.length === 0" class="bg-white rounded-2xl shadow-sm p-8">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-gray-400"
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
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Belum Ada Riwayat</h3>
            <p class="text-gray-500 text-sm mb-6">
              Tidak ada riwayat permintaan BBM untuk ditampilkan
            </p>
            <router-link
              to="/request/new"
              class="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Buat Permintaan Baru</span>
            </router-link>
          </div>
        </div>

        <div v-else class="space-y-4">
          <RequestCard
            v-for="request in requests"
            :key="request.id"
            :request="request"
            class="transform hover:scale-[1.02] transition-all duration-300"
          />
        </div>
      </div>

      <!-- Floating Action Button -->
      <router-link
        to="/request/new"
        class="fixed z-20 bottom-20 right-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 group-hover:rotate-180 transition-transform duration-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../services/api'
import RequestCard from '../components/RequestCard.vue'

const requests = ref([])
const allRequests = ref([])
const loading = ref(true)
const error = ref(null)
const selectedStatus = ref('all')

// Status tabs configuration
const statusTabs = [
  { value: 'all', label: 'Semua' },
  { value: 'diajukan', label: 'Diajukan' },
  { value: 'disetujui_atasan', label: 'Disetujui' },
  { value: 'ditolak', label: 'Ditolak' },
  { value: 'dikeluarkan_operator', label: 'Dikeluarkan' },
  { value: 'diperiksa', label: 'Diperiksa' },
  { value: 'selesai', label: 'Selesai' },
]

// Filter requests based on selected status
const filteredRequests = computed(() => {
  if (selectedStatus.value === 'all') {
    return allRequests.value
  }
  return allRequests.value.filter((request) => request.status === selectedStatus.value)
})

// Function untuk mendapatkan jumlah item per status
const getCountByStatus = (status) => {
  if (status === 'all') {
    return allRequests.value.length
  }
  return allRequests.value.filter((request) => request.status === status).length
}

// Update requests when filter changes
const selectStatus = (status) => {
  selectedStatus.value = status
  requests.value = filteredRequests.value
}

const fetchHistory = async () => {
  loading.value = true
  error.value = null
  try {
    // [FIX] Menambahkan parameter `history=true` pada panggilan API.
    // Ini akan memberitahu backend untuk menjalankan logika filter riwayat sesuai peran.
    // Kita juga bisa menghapus limit untuk menampilkan semua riwayat.
    const response = await api.get('/api/permintaan-bbm', {
      params: {
        history: true,
        limit: 0, // Kirim 0 untuk mendapatkan semua data (sesuai logika di controller Anda)
      },
    })
    allRequests.value = response.data.data
    requests.value = filteredRequests.value
  } catch (err) {
    console.error('Failed to fetch history:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchHistory()
})
</script>
