<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
    <!-- Header Section -->
    <div class="bg-white shadow-sm p-3">
      <div class="flex items-center space-x-4">
        <div
          class="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg"
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
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold text-gray-900">Transportasi</h1>
          <p class="text-gray-600 text-sm">Penjemputan & Pengantaran</p>
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
              :key="tab.status"
              @click="activeTab = tab.status"
              :class="[
                activeTab === tab.status
                  ? 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50',
                'relative whitespace-nowrap py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center space-x-2',
              ]"
            >
              <span>{{ tab.label }}</span>
              <span
                v-if="getCountByStatus(tab.status) > 0"
                :class="[
                  activeTab === tab.status
                    ? 'bg-white/20 text-white'
                    : 'bg-orange-100 text-orange-600',
                  'px-2 py-0.5 rounded-full text-xs font-bold min-w-[20px] text-center',
                ]"
              >
                {{ getCountByStatus(tab.status) }}
              </span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <div v-for="n in 3" :key="n" class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div class="animate-pulse">
            <div class="p-3">
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
                <div class="w-20 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
              </div>
              <div class="mt-4 space-y-2">
                <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-white rounded-2xl shadow-sm p-3">
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
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Gagal Memuat Data</h3>
          <p class="text-gray-500 text-sm mb-4">{{ error }}</p>
          <button
            @click="fetchTransportations"
            class="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Coba Lagi
          </button>
        </div>
      </div>

      <!-- Transportation List -->
      <div v-if="filteredTransportations.length > 0 && !loading" class="space-y-4">
        <router-link
          v-for="item in filteredTransportations"
          :key="item.id"
          :to="`/transportation/${item.id}`"
          class="block group"
        >
          <div
            class="bg-white rounded-2xl shadow-sm p-3 border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-300 group-hover:scale-[1.02]"
          >
            <!-- Header Card -->
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center space-x-3 flex-1">
                <div
                  class="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0"
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
                      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h5m4-5.5V9a1 1 0 00-1-1H8a1 1 0 00-1 1v2.5"
                    />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <h3
                    class="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors duration-200"
                  >
                    Transportasi #{{ item.id }}
                  </h3>
                  <p class="text-sm text-gray-500">
                    {{ formatDate(item.created_at) }}
                  </p>
                </div>
              </div>
              <span
                :class="getStatusClass(item.status)"
                class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border"
              >
                {{ getStatusText(item.status) }}
              </span>
            </div>

            <!-- Details -->
            <div class="space-y-4">
              <!-- Contact Info -->
              <div
                v-if="item.nomor_telp"
                class="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
              >
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Kontak</p>
                  <p class="text-sm text-gray-600">{{ item.nomor_telp }}</p>
                </div>
              </div>

              <!-- Passenger Count -->
              <div
                v-if="item.jumlah_penumpang"
                class="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
              >
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Penumpang</p>
                  <p class="text-sm text-gray-600">{{ item.jumlah_penumpang }} Orang</p>
                </div>
              </div>

              <!-- Pickup Information -->
              <div
                v-if="item.pickup_location || item.pickup_date"
                class="border border-green-200 rounded-xl p-4 bg-green-50"
              >
                <div class="flex items-center space-x-2 mb-3">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </div>
                  <h4 class="text-sm font-semibold text-green-800">Penjemputan</h4>
                </div>
                <div class="space-y-2 ml-8">
                  <div v-if="item.pickup_location" class="text-sm">
                    <span class="text-green-700 font-medium">Dari:</span>
                    <span class="text-gray-700 ml-1">{{ item.pickup_location }}</span>
                  </div>
                  <div v-if="item.lokasi_tujuan_pickup" class="text-sm">
                    <span class="text-green-700 font-medium">Ke:</span>
                    <span class="text-gray-700 ml-1">{{ item.lokasi_tujuan_pickup }}</span>
                  </div>
                  <div v-if="item.pickup_date" class="text-sm">
                    <span class="text-green-700 font-medium">Waktu:</span>
                    <span class="text-gray-700 ml-1">{{
                      formatDateTime(item.pickup_date, item.pickup_time)
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Dropoff Information -->
              <div
                v-if="item.dropoff_location || item.dropoff_date"
                class="border border-red-200 rounded-xl p-4 bg-red-50"
              >
                <div class="flex items-center space-x-2 mb-3">
                  <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  <h4 class="text-sm font-semibold text-red-800">Pengantaran</h4>
                </div>
                <div class="space-y-2 ml-8">
                  <div v-if="item.dropoff_location" class="text-sm">
                    <span class="text-red-700 font-medium">Dari:</span>
                    <span class="text-gray-700 ml-1">{{ item.dropoff_location }}</span>
                  </div>
                  <div v-if="item.lokasi_tujuan_dropoff" class="text-sm">
                    <span class="text-red-700 font-medium">Ke:</span>
                    <span class="text-gray-700 ml-1">{{ item.lokasi_tujuan_dropoff }}</span>
                  </div>
                  <div v-if="item.dropoff_date" class="text-sm">
                    <span class="text-red-700 font-medium">Waktu:</span>
                    <span class="text-gray-700 ml-1">{{
                      formatDateTime(item.dropoff_date, item.dropoff_time)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
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
                <span>ID: #{{ item.id }}</span>
              </div>
              <div class="flex items-center text-orange-600 group-hover:text-orange-700">
                <span class="text-sm font-medium mr-2">Lihat Detail</span>
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
      </div>

      <!-- Empty State for Filtered Tab -->
      <div
        v-else-if="!loading && filteredTransportations.length === 0 && transportations.length > 0"
        class="bg-white rounded-2xl shadow-sm p-3"
      >
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
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Tidak Ada Data Status Ini</h3>
          <p class="text-gray-500 text-sm">Belum ada transportasi dengan status yang dipilih.</p>
        </div>
      </div>

      <!-- Empty State - No Data at All -->
      <div
        v-else-if="!loading && transportations.length === 0"
        class="bg-white rounded-2xl shadow-sm p-3"
      >
        <div class="text-center">
          <div
            class="w-16 h-16 bg-gradient-to-r from-orange-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Belum Ada Data Transportasi</h3>
          <p class="text-gray-500 text-sm mb-6">
            Anda belum pernah membuat permintaan transportasi.
          </p>
          <router-link
            to="/transportation/create"
            class="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
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

      <!-- Floating Action Button -->
      <router-link
        to="/transportation/create"
        class="fixed z-20 bottom-20 right-5 bg-gradient-to-r from-orange-400 to-yellow-500 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
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
  { status: 'cancelled', label: 'Dibatalkan' },
])

// Computed property untuk filter transportasi berdasarkan tab aktif
const filteredTransportations = computed(() => {
  if (activeTab.value === 'all') {
    return transportations.value
  }
  return transportations.value.filter((item) => item.status === activeTab.value)
})

// Function untuk mendapatkan jumlah item per status
const getCountByStatus = (status) => {
  if (status === 'all') {
    return transportations.value.length
  }
  return transportations.value.filter((item) => item.status === status).length
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
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return date.toLocaleDateString('id-ID', options)
}

const getStatusClass = (status) => {
  const statusClasses = {
    requested:
      'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300',
    approved: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300',
    confirmed: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300',
    in_progress:
      'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300',
    completed:
      'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300',
    cancelled: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300',
  }
  return (
    statusClasses[status] ||
    'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
  )
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

onMounted(() => {
  fetchTransportations()
})
</script>
