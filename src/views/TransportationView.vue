<template>
  <div class="p-4 pb-20">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Penjemputan & Pengantaran</h1>
    </div>

    <!-- Status Tabs -->
    <div class="mb-6">
      <div class="border-b border-gray-200 dark:border-gray-600">
        <nav class="-mb-px flex space-x-8 overflow-x-auto">
          <button
            v-for="tab in statusTabs"
            :key="tab.status"
            @click="activeTab = tab.status"
            :class="[
              activeTab === tab.status
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.label }}
            <span
              v-if="getCountByStatus(tab.status) > 0"
              :class="[
                activeTab === tab.status
                  ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400'
                  : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-300',
                'ml-2 py-0.5 px-2 rounded-full text-xs font-medium'
              ]"
            >
              {{ getCountByStatus(tab.status) }}
            </span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-2 text-gray-600">Memuat data...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
      {{ error }}
    </div>

    <!-- Transportation List -->
    <div v-if="filteredTransportations.length > 0 && !loading" class="space-y-4">
      <router-link
        v-for="item in filteredTransportations"
        :key="item.id"
        :to="`/transportation/${item.id}`"
        class="block bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
      >
        <!-- Header Card -->
        <div class="flex justify-between items-start mb-3">
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900 dark:text-white">
              Transportasi #{{ item.id }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ formatDate(item.created_at) }}
            </p>
          </div>
          <div class="ml-4">
            <span :class="getStatusClass(item.status)" class="px-3 py-1 text-xs font-semibold rounded-full">
              {{ getStatusText(item.status) }}
            </span>
          </div>
        </div>

        <!-- Details -->
        <div class="space-y-2">
          <!-- Contact Info -->
          <div v-if="item.nomor_telp" class="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {{ item.nomor_telp }}
          </div>

          <!-- Passenger Count -->
          <div v-if="item.jumlah_penumpang" class="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            {{ item.jumlah_penumpang }} Penumpang
          </div>

          <!-- Pickup Information -->
          <div v-if="item.pickup_location || item.pickup_date">
            <h4 class="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">Penjemputan:</h4>
            <div class="ml-4 space-y-1">
              <div v-if="item.pickup_location" class="text-sm text-gray-600 dark:text-gray-400">
                <strong>Dari:</strong> {{ item.pickup_location }}
              </div>
              <div v-if="item.lokasi_tujuan_pickup" class="text-sm text-gray-600 dark:text-gray-400">
                <strong>Ke:</strong> {{ item.lokasi_tujuan_pickup }}
              </div>
              <div v-if="item.pickup_date" class="text-sm text-gray-600 dark:text-gray-400">
                <strong>Waktu:</strong> {{ formatDateTime(item.pickup_date, item.pickup_time) }}
              </div>
            </div>
          </div>

          <!-- Dropoff Information -->
          <div v-if="item.dropoff_location || item.dropoff_date">
            <h4 class="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Pengantaran:</h4>
            <div class="ml-4 space-y-1">
              <div v-if="item.dropoff_location" class="text-sm text-gray-600 dark:text-gray-400">
                <strong>Dari:</strong> {{ item.dropoff_location }}
              </div>
              <div v-if="item.lokasi_tujuan_dropoff" class="text-sm text-gray-600 dark:text-gray-400">
                <strong>Ke:</strong> {{ item.lokasi_tujuan_dropoff }}
              </div>
              <div v-if="item.dropoff_date" class="text-sm text-gray-600 dark:text-gray-400">
                <strong>Waktu:</strong> {{ formatDateTime(item.dropoff_date, item.dropoff_time) }}
              </div>
            </div>
          </div>
        </div>

        <!-- View More Button -->
        <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <div class="flex items-center justify-between">
            <span class="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              Lihat Detail →
            </span>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Empty State for Filtered Tab -->
    <div v-else-if="!loading && filteredTransportations.length === 0 && transportations.length > 0" class="text-center py-8">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Tidak ada data untuk status ini</h3>
      <p class="text-gray-500 dark:text-gray-400 mb-4">Belum ada transportasi dengan status yang dipilih.</p>
    </div>

    <!-- Empty State - No Data at All -->
    <div v-else-if="!loading && transportations.length === 0" class="text-center py-8">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Tidak ada data transportasi</h3>
      <p class="text-gray-500 dark:text-gray-400 mb-4">Anda belum pernah membuat permintaan transportasi.</p>
      <router-link
        to="/transportation/create"
        class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Buat Permintaan Baru
      </router-link>
    </div>

    <!-- Floating Action Button -->
    <router-link
      to="/transportation/create"
      class="fixed bottom-20 right-5 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import transportationService from '../services/transportationService'

const transportations = ref([])
const loading = ref(true)
const error = ref(null)
const activeTab = ref('all')

// Status tabs configuration
const statusTabs = ref([
  { status: 'all', label: 'Semua' },
  { status: 'requested', label: 'Diminta' },
  { status: 'confirmed', label: 'Disetujui' },
  { status: 'completed', label: 'Selesai' },
  { status: 'cancelled', label: 'Dibatalkan' }
])

// Computed property untuk filter transportasi berdasarkan tab aktif
const filteredTransportations = computed(() => {
  if (activeTab.value === 'all') {
    return transportations.value
  }
  return transportations.value.filter(item => item.status === activeTab.value)
})

// Function untuk mendapatkan jumlah item per status
const getCountByStatus = (status) => {
  if (status === 'all') {
    return transportations.value.length
  }
  return transportations.value.filter(item => item.status === status).length
}

const fetchTransportations = async () => {
  try {
    loading.value = true
    const response = await transportationService.getAll()
    transportations.value = response.data || response
  } catch (err) {
    error.value = 'Gagal memuat data transportasi.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

const formatDateTime = (dateString, timeString) => {
  if (!dateString) return '-'

  let date = new Date(dateString)

  // If time is provided, combine it with date
  if (timeString) {
    const [hours, minutes] = timeString.split(':')
    date.setHours(parseInt(hours), parseInt(minutes))
  }

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return date.toLocaleDateString('id-ID', options)
}

const getStatusClass = (status) => {
  const statusClasses = {
    'requested': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'approved': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'in_progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const getStatusText = (status) => {
  const statusTexts = {
    'requested': 'Diminta',
    'approved': 'Disetujui',
    'in_progress': 'Dalam Proses',
    'completed': 'Selesai',
    'cancelled': 'Dibatalkan'
  }
  return statusTexts[status] || status
}

onMounted(() => {
  fetchTransportations()
})
</script>
