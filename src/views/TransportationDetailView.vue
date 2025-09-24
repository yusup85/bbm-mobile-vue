<template>
  <div>
    <!-- Header -->
    <header class="p-4 flex items-center gap-4 bg-white border-b border-gray-700 sticky top-0 z-10">
      <button @click="$router.back()" class="mr-4 p-2 rounded-full hover:bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1 class="text-xl font-bold">Detail Transportasi</h1>
    </header>

    <div class="p-4">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
        ></div>
        <p class="mt-2 text-gray-600">Memuat data...</p>
      </div>

      <!-- Error State -->
      <div
        v-if="error"
        class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4"
      >
        {{ error }}
      </div>

      <!-- Transportation Details -->
      <div v-if="transportation && !loading" class="space-y-6">
        <!-- Header Card -->
        <div class="bg-white p-4 rounded-lg shadow-md">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="text-xl font-bold text-gray-900">Transportasi #{{ transportation.id }}</h2>
              <p class="text-gray-500 mt-1">
                Dibuat pada {{ formatDate(transportation.created_at) }}
              </p>
            </div>
            <span
              :class="getStatusClass(transportation.status)"
              class="px-3 py-1 text-sm font-semibold rounded-full"
            >
              {{ getStatusText(transportation.status) }}
            </span>
          </div>

          <!-- User & Contact Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-if="transportation.user">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Pemesan</h3>
              <p class="font-medium">{{ transportation.user.name }}</p>
            </div>
            <div v-if="transportation.nomor_telp">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Nomor Telepon</h3>
              <p class="font-medium">{{ transportation.nomor_telp }}</p>
            </div>
            <div v-if="transportation.jumlah_penumpang">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Jumlah Penumpang</h3>
              <p class="font-medium">{{ transportation.jumlah_penumpang }} Orang</p>
            </div>
          </div>
        </div>

        <!-- Pickup Details -->
        <div v-if="hasPickupData" class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold text-indigo-600 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2"
              />
            </svg>
            Detail Penjemputan
          </h3>

          <div class="space-y-4">
            <div v-if="transportation.pickup_location">
              <h4 class="text-sm font-medium text-gray-500 mb-1">Lokasi Penjemputan</h4>
              <p class="font-medium">{{ transportation.pickup_location }}</p>
            </div>

            <div v-if="transportation.lokasi_tujuan_pickup">
              <h4 class="text-sm font-medium text-gray-500 mb-1">Tujuan Penjemputan</h4>
              <p class="font-medium">{{ transportation.lokasi_tujuan_pickup }}</p>
            </div>

            <div v-if="transportation.pickup_date">
              <h4 class="text-sm font-medium text-gray-500 mb-1">Waktu Penjemputan</h4>
              <p class="font-medium">
                {{ formatDateTime(transportation.pickup_date, transportation.pickup_time) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Dropoff Details -->
        <div v-if="hasDropoffData" class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold text-green-600 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2"
              />
            </svg>
            Detail Pengantaran
          </h3>

          <div class="space-y-4">
            <div v-if="transportation.dropoff_location">
              <h4 class="text-sm font-medium text-gray-500 mb-1">Lokasi Pengantaran</h4>
              <p class="font-medium">{{ transportation.dropoff_location }}</p>
            </div>

            <div v-if="transportation.lokasi_tujuan_dropoff">
              <h4 class="text-sm font-medium text-gray-500 mb-1">Tujuan Pengantaran</h4>
              <p class="font-medium">{{ transportation.lokasi_tujuan_dropoff }}</p>
            </div>

            <div v-if="transportation.dropoff_date">
              <h4 class="text-sm font-medium text-gray-500 mb-1">Waktu Pengantaran</h4>
              <p class="font-medium">
                {{ formatDateTime(transportation.dropoff_date, transportation.dropoff_time) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Status Timeline (Optional - jika ingin menampilkan riwayat status) -->
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Informasi Status</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Status Saat Ini:</span>
              <span
                :class="getStatusClass(transportation.status)"
                class="px-2 py-1 text-xs font-semibold rounded-full"
              >
                {{ getStatusText(transportation.status) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Terakhir Diperbarui:</span>
              <span class="font-medium">{{ formatDate(transportation.updated_at) }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-white p-4 rounded-lg shadow-md">
          <div class="flex flex-col sm:flex-row gap-3">
            <router-link
              to="/transportation"
              class="flex-1 bg-gray-500 text-white py-3 px-4 rounded-md font-medium text-center hover:bg-gray-600 transition-colors"
            >
              Kembali ke Daftar
            </router-link>

            <!-- Tambahkan tombol aksi lain jika diperlukan, seperti edit atau cancel -->
            <!-- <button
              v-if="transportation.status === 'requested'"
              class="flex-1 bg-red-500 text-white py-3 px-4 rounded-md font-medium hover:bg-red-600 transition-colors"
            >
              Batalkan Permintaan
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import transportationService from '../services/transportationService'

const route = useRoute()
const router = useRouter()
const transportation = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchTransportation = async () => {
  try {
    loading.value = true
    const response = await transportationService.getById(route.params.id)
    transportation.value = response.data || response
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
    minute: '2-digit',
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
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return date.toLocaleDateString('id-ID', options)
}

const getStatusClass = (status) => {
  const statusClasses = {
    requested: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const statusTexts = {
    requested: 'Diminta',
    approved: 'Disetujui',
    in_progress: 'Dalam Proses',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
  }
  return statusTexts[status] || status
}

// Computed properties to check if pickup/dropoff data exists
const hasPickupData = computed(() => {
  if (!transportation.value) return false
  return (
    transportation.value.pickup_location ||
    transportation.value.lokasi_tujuan_pickup ||
    transportation.value.pickup_date
  )
})

const hasDropoffData = computed(() => {
  if (!transportation.value) return false
  return (
    transportation.value.dropoff_location ||
    transportation.value.lokasi_tujuan_dropoff ||
    transportation.value.dropoff_date
  )
})

onMounted(() => {
  fetchTransportation()
})
</script>
