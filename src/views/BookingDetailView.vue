<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Detail Booking</h1>
        <p class="text-gray-600">Informasi detail booking akomodasi</p>
      </div>
      <router-link
        to="/booking"
        class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Kembali ke Daftar
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <!-- Booking Detail -->
    <div v-else-if="booking" class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">

        <!-- Status Header -->
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-xl font-semibold text-white">Booking #{{ booking.id }}</h2>
              <p class="text-blue-100 text-sm">Dibuat pada {{ formatDateTime(booking.created_at) }}</p>
            </div>
            <span
              :class="getStatusBadgeClass(booking.status)"
              class="px-3 py-1 rounded-full text-sm font-medium uppercase"
            >
              {{ getStatusText(booking.status) }}
            </span>
          </div>
        </div>

        <div class="p-6 space-y-6">

          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <!-- Guest Information -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Informasi Tamu
              </h3>
              <div class="space-y-2">
                <div>
                  <span class="text-sm text-gray-600">Nama:</span>
                  <p class="font-medium">{{ booking.user?.name }}</p>
                </div>
                <div v-if="booking.perusahaan">
                  <span class="text-sm text-gray-600">Perusahaan:</span>
                  <p class="font-medium">{{ booking.perusahaan }}</p>
                </div>
                <div v-if="booking.number_of_guests">
                  <span class="text-sm text-gray-600">Jumlah Tamu:</span>
                  <p class="font-medium">{{ booking.number_of_guests }} orang</p>
                </div>
              </div>
            </div>

            <!-- Room Information -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                Informasi Kamar
              </h3>
              <div class="space-y-2">
                <div>
                  <span class="text-sm text-gray-600">Tipe Kamar:</span>
                  <p class="font-medium">{{ booking.room?.room_type?.name }}</p>
                </div>
                <div>
                  <span class="text-sm text-gray-600">Nomor Kamar:</span>
                  <p class="font-medium">{{ booking.room?.room_number }}</p>
                </div>
                <div v-if="booking.room?.room_type?.description">
                  <span class="text-sm text-gray-600">Deskripsi:</span>
                  <p class="font-medium">{{ booking.room.room_type.description }}</p>
                </div>
                <div>
                  <span class="text-sm text-gray-600">Harga per Malam:</span>
                  <p class="font-medium text-green-600">
                    Rp {{ formatCurrency(booking.room?.room_type?.price_per_night) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Date Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 9v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
              </svg>
              Tanggal Menginap
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span class="text-sm text-gray-600">Check-in:</span>
                <p class="font-medium">{{ formatDate(booking.check_in_date) }}</p>
              </div>
              <div>
                <span class="text-sm text-gray-600">Check-out:</span>
                <p class="font-medium">{{ formatDate(booking.check_out_date) }}</p>
              </div>
              <div>
                <span class="text-sm text-gray-600">Durasi:</span>
                <p class="font-medium">{{ calculateNights }} malam</p>
              </div>
            </div>
          </div>

          <!-- Guest Names -->
          <div v-if="booking.guest_names && booking.guest_names.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
              </svg>
              Daftar Nama Tamu
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div
                v-for="(guestName, index) in booking.guest_names"
                :key="index"
                class="flex items-center space-x-2"
              >
                <span class="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  {{ index + 1 }}
                </span>
                <span>{{ typeof guestName === 'object' ? guestName.name || guestName : guestName }}</span>
              </div>
            </div>
          </div>

          <!-- Extra Services -->
          <div v-if="booking.extra_services && booking.extra_services.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Layanan Tambahan
            </h3>
            <div class="space-y-3">
              <div
                v-for="service in booking.extra_services"
                :key="service.id"
                class="flex justify-between items-center bg-white rounded-md p-3 border border-gray-200"
              >
                <div>
                  <p class="font-medium">{{ service.name }}</p>
                  <p class="text-sm text-gray-600">
                    {{ service.quantity }}x @ Rp {{ formatCurrency(service.price) }}
                  </p>
                </div>
                <p class="font-semibold text-green-600">
                  Rp {{ formatCurrency(service.subtotal) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Price Breakdown -->
          <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              Rincian Harga
            </h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-700">
                  Kamar ({{ calculateNights }} malam @ Rp {{ formatCurrency(booking.room?.room_type?.price_per_night) }})
                </span>
                <span class="font-medium">
                  Rp {{ formatCurrency(roomSubtotal) }}
                </span>
              </div>
              <div
                v-if="booking.extra_services && booking.extra_services.length > 0"
                class="flex justify-between items-center"
              >
                <span class="text-gray-700">Layanan Tambahan</span>
                <span class="font-medium">
                  Rp {{ formatCurrency(extraServicesTotal) }}
                </span>
              </div>
              <div class="border-t border-gray-300 pt-2 flex justify-between items-center">
                <span class="text-lg font-semibold text-gray-900">Total Harga</span>
                <span class="text-2xl font-bold text-green-600">
                  Rp {{ formatCurrency(booking.total_price) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <router-link
              to="/booking"
              class="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              Kembali ke Daftar
            </router-link>
            <button
              v-if="booking.status === 'pending'"
              @click="cancelBooking"
              :disabled="loading"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-md transition-colors"
            >
              {{ loading ? 'Membatalkan...' : 'Batalkan Booking' }}
            </button>
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
      error: null
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
    }
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
          status: 'cancelled'
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
        completed: 'bg-blue-100 text-blue-800'
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    },

    getStatusText(status) {
      const statusTexts = {
        pending: 'Pending',
        confirmed: 'Dikonfirmasi',
        cancelled: 'Dibatalkan',
        completed: 'Selesai'
      }
      return statusTexts[status] || status
    },

    formatDate(dateString) {
      if (!dateString) return '-'
      const date = new Date(dateString)
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
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
        minute: '2-digit'
      })
    },

    formatCurrency(amount) {
      if (!amount) return '0'
      return new Intl.NumberFormat('id-ID').format(amount)
    }
  }
}
</script>
