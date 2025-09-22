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

<!-- Quick Actions dengan warna Pertamina -->
    <div class="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-8">
      <!-- Card Transportasi -->
      <router-link to="/request/new" class="group transform hover:scale-105 transition-all duration-300">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-red-500 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="bg-red-100 dark:bg-red-900 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="text-red-500 group-hover:translate-x-1 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-2">BBM</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Ajukan Permintaan disini</p>
          <div class="mt-4 flex items-center text-red-600 dark:text-blue-400">
            <span class="text-sm font-medium">Lihat Detail</span>
          </div>
        </div>
      </router-link>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
      <!-- Card Transportasi -->
      <router-link to="/transportation" class="group transform hover:scale-105 transition-all duration-300">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-blue-500 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="text-blue-500 group-hover:translate-x-1 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-2">Transportasi</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Ajukan Pengantaran & Penjemputan disini</p>
          <div class="mt-4 flex items-center text-blue-600 dark:text-blue-400">
            <span class="text-sm font-medium">Lihat Detail</span>
          </div>
        </div>
      </router-link>

      <!-- Card Akomodasi -->
      <router-link to="/booking" class="group transform hover:scale-105 transition-all duration-300">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border-l-4 border-green-500 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div class="text-green-500 group-hover:translate-x-1 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-2">Akomodasi</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Booking akomodasi untuk perjalanan dinas</p>
          <div class="mt-4 flex items-center text-green-600 dark:text-green-400">
            <span class="text-sm font-medium">Lihat Detail</span>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Recent Activity -->
    <div>
      <h2 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Permintan BBM</h2>
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
