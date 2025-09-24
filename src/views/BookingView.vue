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
            <h1 class="text-xl font-bold text-gray-900">Akomodasi</h1>
            <p class="text-gray-600 text-sm">Kelola booking akomodasi Anda</p>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4">
      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <div v-for="n in 3" :key="n" class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div class="animate-pulse">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-20 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
                <div class="w-24 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              </div>
              <div class="space-y-3">
                <div class="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
                <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2"></div>
                <div class="space-y-2">
                  <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
                  <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
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
            @click="loadBookings"
            class="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Coba Lagi
          </button>
        </div>
      </div>

      <!-- Booking List -->
      <div v-else class="space-y-4">
        <!-- Empty State -->
        <div v-if="bookings.length === 0" class="bg-white rounded-2xl shadow-sm p-8">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="h-8 w-8 text-purple-500"
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
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Belum Ada Booking</h3>
            <p class="text-gray-500 text-sm mb-6">Mulai dengan membuat booking akomodasi baru.</p>
            <router-link
              to="/booking/create"
              class="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              <span>Booking Baru</span>
            </router-link>
          </div>
        </div>

        <!-- Booking Cards -->
        <div v-else class="space-y-4">
          <div
            v-for="booking in bookings"
            :key="booking.id"
            class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
            @click="viewBookingDetail(booking.id)"
          >
            <!-- Header -->
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center space-x-3">
                <div
                  class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0"
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
                  <span
                    :class="getStatusBadgeClass(booking.status)"
                    class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border"
                  >
                    {{ getStatusText(booking.status) }}
                  </span>
                </div>
              </div>
              <span class="text-sm text-gray-500">{{ formatDate(booking.created_at) }}</span>
            </div>

            <!-- Room Info -->
            <div class="mb-4">
              <h3
                class="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors duration-200 mb-1"
              >
                {{ booking.room?.room_type?.name }} - Room {{ booking.room?.room_number }}
              </h3>
              <p class="text-sm text-gray-600" v-if="booking.perusahaan">
                {{ booking.perusahaan }}
              </p>
            </div>

            <!-- Details Grid -->
            <div class="space-y-3">
              <!-- Dates -->
              <div class="grid grid-cols-1 gap-3">
                <div class="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                  <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      class="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3a4 4 0 118 0v4m-4 9v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">Check-in</p>
                    <p class="text-sm text-gray-600">{{ formatDate(booking.check_in_date) }}</p>
                  </div>
                </div>

                <div class="flex items-center space-x-3 p-3 bg-red-50 rounded-xl">
                  <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg
                      class="w-4 h-4 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3a4 4 0 118 0v4m-4 9v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">Check-out</p>
                    <p class="text-sm text-gray-600">{{ formatDate(booking.check_out_date) }}</p>
                  </div>
                </div>
              </div>

              <!-- Guests -->
              <div
                v-if="booking.number_of_guests"
                class="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl"
              >
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-4 h-4 text-purple-600"
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
                <div>
                  <p class="text-sm font-medium text-gray-900">Jumlah Tamu</p>
                  <p class="text-sm text-gray-600">{{ booking.number_of_guests }} Orang</p>
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
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <span>Booking ID: #{{ booking.id }}</span>
              </div>
              <div class="flex items-center text-purple-600 group-hover:text-purple-700">
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
        </div>

        <!-- Pagination -->
        <div
          v-if="pagination && pagination.last_page > 1"
          class="bg-white rounded-2xl shadow-sm p-6"
        >
          <div class="flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                @click="loadPage(pagination.current_page - 1)"
                :disabled="pagination.current_page <= 1"
                class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Previous
              </button>
              <div class="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">
                Page {{ pagination.current_page }} of {{ pagination.last_page }}
              </div>
              <button
                @click="loadPage(pagination.current_page + 1)"
                :disabled="pagination.current_page >= pagination.last_page"
                class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <router-link
      to="/booking/create"
      class="fixed z-20 bottom-20 right-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
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
      pagination: null,
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
          total: response.total,
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
        pending:
          'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300',
        confirmed:
          'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300',
        cancelled: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300',
        completed:
          'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300',
      }
      return (
        statusClasses[status] ||
        'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
      )
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

    formatCurrency(amount) {
      if (!amount) return '0'
      return new Intl.NumberFormat('id-ID').format(amount)
    },
  },
}
</script>
