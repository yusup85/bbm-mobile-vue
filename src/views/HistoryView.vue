<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Riwayat Pekerjaan</h1>

    <div v-if="loading" class="space-y-3">
      <!-- Placeholder Loading -->
      <div
        v-for="n in 5"
        :key="n"
        class="bg-white dark:bg-gray-800 p-3 rounded-lg shadow animate-pulse"
      >
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
    <div v-else-if="error" class="text-center text-red-500 py-10">
      <p>Gagal memuat riwayat.</p>
      <p class="text-sm">{{ error }}</p>
    </div>
    <div v-else-if="requests.length === 0" class="text-center text-gray-500 py-10">
      <p>Tidak ada riwayat pekerjaan yang relevan untuk Anda.</p>
    </div>
    <div v-else class="space-y-3">
      <RequestCard v-for="request in requests" :key="request.id" :request="request" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import RequestCard from '../components/RequestCard.vue'

const requests = ref([])
const loading = ref(true)
const error = ref(null)

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
    requests.value = response.data.data
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
