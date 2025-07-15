<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-400">
          Selamat datang, {{ authStore.currentUser?.name || 'User' }}!
        </p>
      </div>
      <!-- Tombol ganti tema bisa ditambahkan di sini -->
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <!-- Tombol persetujuan bisa ditambahkan di sini jika user adalah atasan -->
    </div>

    <!-- Recent Activity -->
    <div>
      <h2 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Aktivitas Terkini</h2>
      <div v-if="loading" class="space-y-3">
        <!-- Placeholder Loading -->
        <div
          v-for="n in 3"
          :key="n"
          class="bg-white dark:bg-gray-800 p-3 rounded-lg shadow animate-pulse"
        >
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
      <div v-else-if="error" class="text-center text-red-500">
        Gagal memuat aktivitas: {{ error }}
      </div>
      <div v-else-if="recentRequests.length === 0" class="text-center text-gray-500">
        Belum ada aktivitas.
      </div>
      <div v-else class="space-y-3">
        <RequestCard v-for="request in recentRequests" :key="request.id" :request="request" />
      </div>
    </div>

    <!-- FAB untuk request baru -->
    <button
      @click="openRequestForm"
      class="fixed z-20 bottom-20 right-5 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7"
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
    </button>

    <!-- Modal Form Permintaan akan ditambahkan di sini -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../store/auth'
import api from '../services/api'
import RequestCard from '../components/RequestCard.vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const recentRequests = ref([])
const loading = ref(true)
const error = ref(null)
const router = useRouter()

const fetchRecentActivity = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await api.get('/api/permintaan-bbm?limit=3')
    recentRequests.value = response.data.data
  } catch (err) {
    console.error('Failed to fetch recent activity:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const openRequestForm = () => {
  // Logika untuk membuka modal form permintaan
  router.push({ name: 'request-new' })
}

onMounted(() => {
  fetchRecentActivity()
})
</script>
