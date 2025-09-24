<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header Section dengan Avatar -->
    <div class="bg-white shadow-sm p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div
            class="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-12z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">
              Hello, {{ authStore.currentUser?.name || 'Budi' }}!
            </h1>
            <p class="text-gray-600 text-sm">Selamat datang di Sistem BBM Mobile</p>
          </div>
        </div>
        <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-5 5v-5z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 7H4l5-5v5z"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="p-4 space-y-6">
      <!-- Course Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-6">
        <!-- BBM Card dengan Design Baru -->
        <router-link
          to="/request/new"
          class="group transform hover:scale-105 transition-all duration-300"
        >
          <div
            class="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden"
          >
            <!-- Decorative Background Circles -->
            <div
              class="absolute -top-4 -right-4 w-24 h-24 bg-white bg-opacity-10 rounded-full"
            ></div>
            <div
              class="absolute -bottom-6 -left-6 w-32 h-32 bg-white bg-opacity-5 rounded-full"
            ></div>

            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <div
                  class="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
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
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>

              <h3 class="font-bold text-xl mb-2">Permintaan BBM</h3>
              <p class="text-blue-100 text-sm mb-4">Pengajuan Bahan Bakar Minyak</p>

              <div class="flex items-center justify-between">
                <div class="group-hover:translate-x-1 transition-transform">
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-8">
        <!-- Card Transportasi -->
        <router-link
          to="/transportation"
          class="group transform hover:scale-105 transition-all duration-300"
        >
          <div
            class="bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden min-h-[160px]"
          >
            <!-- Decorative Background Circles -->
            <div
              class="absolute -top-6 -right-6 w-20 h-20 bg-white bg-opacity-10 rounded-full"
            ></div>
            <div
              class="absolute -bottom-4 -left-4 w-16 h-16 bg-white bg-opacity-10 rounded-full"
            ></div>

            <div class="relative z-10 h-full flex flex-col justify-between">
              <div
                class="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm"
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
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>

              <div class="mt-4">
                <h3 class="font-bold text-lg mb-1">Transportasi</h3>
                <p class="text-orange-100 text-xs mb-3">Pesan layanan transportasi</p>

                <div class="group-hover:translate-x-1 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </router-link>

        <!-- Card Akomodasi -->
        <router-link
          to="/booking"
          class="group transform hover:scale-105 transition-all duration-300"
        >
          <div
            class="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden min-h-[160px]"
          >
            <!-- Decorative Background Circles -->
            <div
              class="absolute -top-6 -right-6 w-20 h-20 bg-white bg-opacity-10 rounded-full"
            ></div>
            <div
              class="absolute -bottom-4 -left-4 w-16 h-16 bg-white bg-opacity-10 rounded-full"
            ></div>

            <div class="relative z-10 h-full flex flex-col justify-between">
              <div
                class="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm"
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>

              <div class="mt-4">
                <h3 class="font-bold text-lg mb-1">Akomodasi</h3>
                <p class="text-purple-100 text-xs mb-3">Booking Penginapan</p>

                <div class="group-hover:translate-x-1 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-3 gap-3 mb-6">
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">{{ recentRequests.length }}</div>
            <div class="text-xs text-gray-500">Total Permintaan</div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">2</div>
            <div class="text-xs text-gray-500">Disetujui</div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="text-center">
            <div class="text-2xl font-bold text-orange-600">1</div>
            <div class="text-xs text-gray-500">Pending</div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-gray-900">Permintaan Terbaru</h2>
          <router-link to="/history" class="text-blue-600 text-sm font-medium"
            >Lihat Semua</router-link
          >
        </div>

        <div v-if="loading" class="space-y-3">
          <!-- Placeholder Loading -->
          <div v-for="n in 3" :key="n" class="flex items-center space-x-3 animate-pulse">
            <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div class="flex-1">
              <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
        <div v-else-if="error" class="text-center text-red-500 py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto mb-2"
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
          <p class="text-sm">Gagal memuat aktivitas</p>
        </div>
        <div v-else-if="recentRequests.length === 0" class="text-center text-gray-500 py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mx-auto mb-2"
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
          <p class="text-sm">Belum ada permintaan</p>
        </div>
        <div v-else class="space-y-3">
          <RequestCard v-for="request in recentRequests" :key="request.id" :request="request" />
        </div>
      </div>

      <!-- FAB untuk request baru -->
      <button
        @click="openRequestForm"
        class="fixed z-20 bottom-20 right-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
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
    </div>
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
