<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Booking Akomodasi</h1>
        <p class="text-gray-600">Kelola booking akomodasi Anda</p>
      </div>
      <router-link
        to="/booking/create"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        Booking Baru
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

    <!-- Booking List -->
    <div v-else class="space-y-4">
      <!-- Empty State -->
      <div v-if="bookings.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 9v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada booking</h3>
        <p class="mt-1 text-sm text-gray-500">Mulai dengan membuat booking baru.</p>
        <div class="mt-6">
          <router-link
            to="/booking/create"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Booking Baru
          </router-link>
        </div>
      </div>

      <!-- Booking Cards -->
      <div v-else class="space-y-4">
        <div
          v-for="booking in bookings"
          :key="booking.id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
          @click="viewBookingDetail(booking.id)"
        >
          <!-- Status Badge -->
          <div class="flex justify-between items-start mb-4">
            <span
              :class="getStatusBadgeClass(booking.status)"
              class="px-2 py-1 rounded-full text-xs font-medium uppercase"
            >
              {{ getStatusText(booking.status) }}
            </span>
            <span class="text-sm text-gray-500">{{ formatDate(booking.created_at) }}</span>
          </div>

          <!-- Room Info -->
          <div class="mb-4">
            <h3 class="font-semibold text-gray-900 mb-1">
              {{ booking.room?.room_type?.name }} - Room {{ booking.room?.room_number }}
            </h3>
            <p class="text-sm text-gray-600" v-if="booking.perusahaan">
              {{ booking.perusahaan }}
            </p>
          </div>

          <!-- Dates -->
          <div class="mb-4 space-y-1">
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 9v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
              </svg>
              Check-in: {{ formatDate(booking.check_in_date) }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 9v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
              </svg>
              Check-out: {{ formatDate(booking.check_out_date) }}
            </div>
          </div>

          <!-- Guests -->
          <div class="mb-4" v-if="booking.number_of_guests">
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
              </svg>
              {{ booking.number_of_guests }} Tamu
            </div>
          </div>

          <!-- Total Price -->
          <div class="border-t pt-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Total Harga:</span>
              <span class="font-semibold text-lg text-green-600">
                Rp {{ formatCurrency(booking.total_price) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination && pagination.last_page > 1" class="flex justify-center mt-8">
        <nav class="flex space-x-2">
          <button
            @click="loadPage(pagination.current_page - 1)"
            :disabled="pagination.current_page <= 1"
            class="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span class="px-3 py-2 text-sm text-gray-700">
            Page {{ pagination.current_page }} of {{ pagination.last_page }}
          </span>
          <button
            @click="loadPage(pagination.current_page + 1)"
            :disabled="pagination.current_page >= pagination.last_page"
            class="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { bookingService } from '../services/bookingService'

export default {
  name: 'BookingView',
  data() {
    return {
      bookings: [],
      loading: false,
      error: null,
      pagination: null
    }
  },
  async mounted() {
    await this.loadBookings()
  },
  methods: {
    async loadBookings() {
      this.loading = true
      this.error = null

      try {
        const response = await bookingService.getBookings()
        this.bookings = response.data
        this.pagination = {
          current_page: response.current_page,
          last_page: response.last_page,
          total: response.total
        }
      } catch (error) {
        this.error = 'Gagal memuat data booking. Silakan coba lagi.'
        console.error('Error loading bookings:', error)
      } finally {
        this.loading = false
      }
    },

    async loadPage(page) {
      if (page < 1 || page > this.pagination.last_page) return
      // TODO: Implement pagination
      await this.loadBookings()
    },

    viewBookingDetail(id) {
      this.$router.push({ name: 'booking-detail', params: { id } })
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

    formatCurrency(amount) {
      if (!amount) return '0'
      return new Intl.NumberFormat('id-ID').format(amount)
    }
  }
}
</script>
