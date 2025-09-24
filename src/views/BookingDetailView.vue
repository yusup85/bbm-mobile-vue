<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header Section -->
    <div class="bg-white shadow-sm p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div
            class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg"
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">Detail Booking</h1>
            <p class="text-gray-600 text-sm">Informasi detail booking akomodasi</p>
          </div>
        </div>
        <router-link
          to="/booking"
          class="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali
        </router-link>
      </div>
    </div>

    <div class="p-4">
      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div class="animate-pulse">
            <div class="bg-gradient-to-r from-purple-200 to-pink-300 h-24"></div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div
                    class="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"
                  ></div>
                  <div class="space-y-2">
                    <div
                      class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"
                    ></div>
                    <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
                <div class="space-y-4">
                  <div
                    class="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"
                  ></div>
                  <div class="space-y-2">
                    <div
                      class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"
                    ></div>
                    <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
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
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Gagal Memuat Data</h3>
          <p class="text-gray-500 text-sm mb-4">{{ error }}</p>
          <button
            @click="loadBooking"
            class="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Coba Lagi
          </button>
        </div>
      </div>

      <!-- Booking Detail -->
      <div v-else-if="booking" class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <!-- Status Header -->
          <div class="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-6">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <div
                  class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 14v6a2 2 0 002 2h4a2 2 0 002-2v-6a2 2 0 00-2-2h-4a2 2 0 00-2 2z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20.5 14.5A5.5 5.5 0 0015 9h-4a5.5 5.5 0 00-5.5 5.5v.5h16v-.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-white">Booking #{{ booking.id }}</h2>
                  <p class="text-purple-100 text-sm">
                    Dibuat pada {{ formatDateTime(booking.created_at) }}
                  </p>
                </div>
              </div>
              <span
                :class="getStatusBadgeClass(booking.status)"
                class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-white/20"
              >
                {{ getStatusText(booking.status) }}
              </span>
            </div>
          </div>

          <div class="p-6 space-y-6">
            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
              <!-- Guest Information -->
              <div
                class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
              >
                <h3 class="font-bold text-gray-900 mb-4 flex items-center">
                  <div
                    class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-3"
                  >
                    <svg
                      class="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  Informasi Tamu
                </h3>
                <div class="space-y-4">
                  <div class="bg-white/60 rounded-xl p-4">
                    <span class="text-sm font-medium text-purple-600">Nama:</span>
                    <p class="font-semibold text-gray-900 mt-1">{{ booking.user?.name }}</p>
                  </div>
                  <div v-if="booking.perusahaan" class="bg-white/60 rounded-xl p-4">
                    <span class="text-sm font-medium text-purple-600">Perusahaan:</span>
                    <p class="font-semibold text-gray-900 mt-1">{{ booking.perusahaan }}</p>
                  </div>
                  <div v-if="booking.number_of_guests" class="bg-white/60 rounded-xl p-4">
                    <span class="text-sm font-medium text-purple-600">Jumlah Tamu:</span>
                    <p class="font-semibold text-gray-900 mt-1">
                      {{ booking.number_of_guests }} orang
                    </p>
                  </div>
                </div>
              </div>

              <!-- Room Information -->
              <div
                class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
              >
                <h3 class="font-bold text-gray-900 mb-4 flex items-center">
                  <div
                    class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3"
                  >
                    <svg
                      class="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                  </div>
                  Informasi Kamar
                </h3>
                <div class="space-y-4">
                  <div class="bg-white/60 rounded-xl p-4">
                    <span class="text-sm font-medium text-blue-600">Tipe Kamar:</span>
                    <p class="font-semibold text-gray-900 mt-1">
                      {{ booking.room?.room_type?.name }}
                    </p>
                  </div>
                  <div class="bg-white/60 rounded-xl p-4">
                    <span class="text-sm font-medium text-blue-600">Nomor Kamar:</span>
                    <p class="font-semibold text-gray-900 mt-1">{{ booking.room?.room_number }}</p>
                  </div>
                  <div
                    v-if="booking.room?.room_type?.description"
                    class="bg-white/60 rounded-xl p-4"
                  >
                    <span class="text-sm font-medium text-blue-600">Deskripsi:</span>
                    <p class="font-semibold text-gray-900 mt-1">
                      {{ booking.room.room_type.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Date and Guest Information -->
            <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
              <div>
                <!-- Date Information -->
                <div
                  class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
                >
                  <h3 class="font-bold text-gray-900 mb-4 flex items-center">
                    <div
                      class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-3"
                    >
                      <svg
                        class="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    Informasi Tanggal
                  </h3>
                  <div class="space-y-4">
                    <div class="bg-white/60 rounded-xl p-4">
                      <span class="text-sm font-medium text-purple-600">Check-in:</span>
                      <p class="font-semibold text-gray-900 mt-1">
                        {{ formatDate(booking.check_in_date) }}
                      </p>
                    </div>
                    <div class="bg-white/60 rounded-xl p-4">
                      <span class="text-sm font-medium text-purple-600">Check-out:</span>
                      <p class="font-semibold text-gray-900 mt-1">
                        {{ formatDate(booking.check_out_date) }}
                      </p>
                    </div>
                    <div class="bg-white/60 rounded-xl p-4">
                      <span class="text-sm font-medium text-purple-600">Durasi Menginap:</span>
                      <p class="font-semibold text-gray-900 mt-1">
                        {{ getDuration(booking.check_in_date, booking.check_out_date) }} malam
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="booking.guest_names && booking.guest_names.length > 0">
                <!-- Guest Names -->
                <div
                  class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100"
                >
                  <h3 class="font-bold text-gray-900 mb-4 flex items-center">
                    <div
                      class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3"
                    >
                      <svg
                        class="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        ></path>
                      </svg>
                    </div>
                    Daftar Nama Tamu
                  </h3>
                  <div class="space-y-3 max-h-64 overflow-y-auto">
                    <div
                      v-for="(guestName, index) in booking.guest_names"
                      :key="index"
                      class="bg-white/60 rounded-xl p-4 flex items-center"
                    >
                      <div
                        class="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mr-3"
                      >
                        <span class="text-white font-semibold text-sm">{{ index + 1 }}</span>
                      </div>
                      <span class="font-semibold text-gray-900">{{
                        typeof guestName === 'object' ? guestName.name || guestName : guestName
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Extra Services -->
            <div
              v-if="booking.extra_services && booking.extra_services.length > 0"
              class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100"
            >
              <h3 class="font-bold text-gray-900 mb-4 flex items-center">
                <div
                  class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </div>
                Layanan Tambahan
              </h3>
              <div class="space-y-3">
                <div
                  v-for="service in booking.extra_services"
                  :key="service.id"
                  class="bg-white/60 rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p class="font-semibold text-gray-900">{{ service.name }}</p>
                    <p class="text-sm font-medium text-green-600 mt-1">
                      Jumlah: {{ service.quantity }}
                    </p>
                  </div>
                  <div
                    class="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div
              class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200"
            >
              <router-link
                to="/booking"
                class="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-purple-300 text-purple-700 rounded-2xl font-semibold transition-all duration-200 hover:bg-purple-50 hover:border-purple-400 hover:shadow-lg"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                Kembali
              </router-link>
              <button
                v-if="booking.status === 'pending'"
                @click="cancelBooking"
                :disabled="loading"
                class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl font-semibold transition-all duration-200 hover:from-red-600 hover:to-pink-700 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <svg
                  v-if="!loading"
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <svg v-else class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{ loading ? 'Membatalkan...' : 'Batalkan' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bookingService } from '../services/bookingService'

export default {
  name: 'BookingDetailView',
  data() {
    return {
      booking: null,
      loading: false,
      error: null,
    }
  },
  computed: {
    calculateNights() {
      if (!this.booking?.check_in_date || !this.booking?.check_out_date) return 0
      const checkIn = new Date(this.booking.check_in_date)
      const checkOut = new Date(this.booking.check_out_date)
      const diffTime = Math.abs(checkOut - checkIn)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays > 0 ? diffDays : 1
    },

    roomSubtotal() {
      if (!this.booking?.room?.room_type?.price_per_night) return 0
      return this.calculateNights * this.booking.room.room_type.price_per_night
    },

    extraServicesTotal() {
      if (!this.booking?.extra_services?.length) return 0
      return this.booking.extra_services.reduce((total, service) => total + service.subtotal, 0)
    },
  },
  async mounted() {
    await this.loadBooking()
  },
  methods: {
    async loadBooking() {
      this.loading = true
      this.error = null

      try {
        const response = await bookingService.getBooking(this.$route.params.id)
        this.booking = response.data || response
      } catch (error) {
        this.error = 'Gagal memuat detail booking. Silakan coba lagi.'
        console.error('Error loading booking:', error)
      } finally {
        this.loading = false
      }
    },

    async cancelBooking() {
      if (!confirm('Apakah Anda yakin ingin membatalkan booking ini?')) return

      this.loading = true
      try {
        await bookingService.updateBooking(this.booking.id, {
          ...this.booking,
          status: 'cancelled',
        })

        // Reload booking data
        await this.loadBooking()
      } catch (error) {
        this.error = 'Gagal membatalkan booking. Silakan coba lagi.'
        console.error('Error cancelling booking:', error)
      } finally {
        this.loading = false
      }
    },

    getStatusBadgeClass(status) {
      const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        completed: 'bg-blue-100 text-blue-800',
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    },

    getStatusText(status) {
      const statusTexts = {
        pending: 'Pending',
        confirmed: 'Dikonfirmasi',
        cancelled: 'Dibatalkan',
        completed: 'Selesai',
      }
      return statusTexts[status] || status
    },

    formatDate(dateString) {
      if (!dateString) return '-'
      const date = new Date(dateString)
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },

    formatDateTime(dateString) {
      if (!dateString) return '-'
      const date = new Date(dateString)
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },

    formatCurrency(amount) {
      if (!amount) return '0'
      return new Intl.NumberFormat('id-ID').format(amount)
    },

    getDuration(checkInDate, checkOutDate) {
      if (!checkInDate || !checkOutDate) return 0
      const checkIn = new Date(checkInDate)
      const checkOut = new Date(checkOutDate)
      const diffTime = Math.abs(checkOut - checkIn)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays || 1
    },
  },
}
</script>
