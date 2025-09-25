<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header Section -->
    <div class="bg-white shadow-sm p-3">
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Booking Baru</h1>
            <p class="text-gray-600 text-sm">Buat booking akomodasi baru</p>
          </div>
        </div>
        <router-link
          to="/booking"
          class="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl font-semibold"
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

    <div class="p-3">
      <!-- Booking Form -->
      <div class="max-w-4xl mx-auto">
        <form
          @submit.prevent="submitBooking"
          class="bg-white rounded-2xl shadow-lg p-5 space-y-8 border border-gray-100"
        >
          <div class="text-center pb-6 border-b border-gray-100">
            <div
              class="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-purple-600"
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
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Form Booking Akomodasi</h2>
            <p class="text-gray-600">Lengkapi informasi di bawah untuk membuat booking baru</p>
          </div>
          <!-- Perusahaan -->
          <div
            class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-3 border border-purple-100"
          >
            <div class="flex items-center mb-4">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              <label for="perusahaan" class="block text-lg font-bold text-gray-900">
                Informasi Perusahaan
              </label>
            </div>
            <input
              id="perusahaan"
              v-model="form.perusahaan"
              type="text"
              class="w-full bg-white/60 border-2 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-200"
              placeholder="Masukkan nama perusahaan"
            />
          </div>

          <!-- Check-in & Check-out Dates -->
          <div
            class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-3 border border-blue-100"
          >
            <div class="flex items-center mb-4">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900">Tanggal Menginap</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div class="space-y-2">
                <label for="check_in_date" class="block text-sm font-semibold text-blue-700">
                  Tanggal Check-in *
                </label>
                <input
                  id="check_in_date"
                  v-model="form.check_in_date"
                  type="date"
                  required
                  :min="today"
                  class="w-full bg-white/60 border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                  @change="onDateChange"
                />
              </div>
              <div class="space-y-2">
                <label for="check_out_date" class="block text-sm font-semibold text-blue-700">
                  Tanggal Check-out *
                </label>
                <input
                  id="check_out_date"
                  v-model="form.check_out_date"
                  type="date"
                  required
                  :min="form.check_in_date"
                  class="w-full bg-white/60 border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                  @change="onDateChange"
                />
              </div>
            </div>
          </div>

          <!-- Available Rooms -->
          <div
            v-if="availableRooms.length > 0"
            class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-3 border border-green-100"
          >
            <div class="flex items-center mb-4">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              <label class="text-lg font-bold text-gray-900">Pilih Kamar Tersedia *</label>
            </div>
            <div class="grid gap-4">
              <div
                v-for="room in availableRooms"
                :key="room.id"
                :class="[
                  'bg-white/60 rounded-2xl p-5 cursor-pointer transition-all duration-200 border-2',
                  form.room_id === room.id
                    ? 'border-green-400 bg-green-100/50 ring-4 ring-green-100 shadow-lg transform scale-105'
                    : 'border-green-200 hover:border-green-300 hover:shadow-md',
                ]"
                @click="selectRoom(room)"
              >
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-2">
                      <div
                        :class="[
                          'w-8 h-8 rounded-full flex items-center justify-center',
                          form.room_id === room.id
                            ? 'bg-green-500 text-white'
                            : 'bg-green-200 text-green-700',
                        ]"
                      >
                        <span class="text-sm font-bold">{{ room.room_number }}</span>
                      </div>
                      <div>
                        <h3 class="font-bold text-gray-900 text-lg">{{ room.room_type?.name }}</h3>
                        <p class="text-sm font-medium text-green-600">
                          Kamar {{ room.room_number }}
                        </p>
                      </div>
                    </div>
                    <p v-if="room.room_type?.description" class="text-sm text-gray-600 mt-2 pl-11">
                      {{ room.room_type.description }}
                    </p>
                  </div>
                  <div v-if="form.room_id === room.id" class="ml-4">
                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
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
            </div>
          </div>

          <!-- Room loading state -->
          <div
            v-else-if="loadingRooms"
            class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100"
          >
            <div class="text-center">
              <div
                class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <div
                  class="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"
                ></div>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Mencari Kamar Tersedia</h3>
              <p class="text-sm text-blue-600 font-medium">
                Sedang memproses pencarian kamar untuk tanggal yang Anda pilih...
              </p>
            </div>
          </div>

          <!-- No rooms available -->
          <div
            v-else-if="form.check_in_date && form.check_out_date"
            class="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-5 border border-orange-100"
          >
            <div class="text-center">
              <div
                class="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
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
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Tidak Ada Kamar Tersedia</h3>
              <p class="text-sm text-orange-600 font-medium">
                Mohon pilih tanggal lain atau hubungi customer service untuk bantuan.
              </p>
            </div>
          </div>

          <!-- Number of Guests -->
          <div
            class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-3 border border-indigo-100"
          >
            <div class="flex items-center mb-4">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <label for="number_of_guests" class="text-lg font-bold text-gray-900">
                Jumlah Tamu
              </label>
            </div>
            <input
              id="number_of_guests"
              v-model.number="form.number_of_guests"
              type="number"
              min="1"
              class="w-full bg-white/60 border-2 border-indigo-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-200"
              placeholder="Masukkan jumlah tamu"
            />
          </div>

          <!-- Guest Names -->
          <div
            v-if="form.number_of_guests > 0"
            class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-3 border border-pink-100"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mr-3"
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
              <label class="text-lg font-bold text-gray-900">Daftar Nama Tamu</label>
            </div>
            <div class="grid gap-3">
              <div
                v-for="(guestName, index) in form.guest_names"
                :key="index"
                class="flex items-center space-x-3"
              >
                <div
                  class="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-semibold text-sm">{{ index + 1 }}</span>
                </div>
                <input
                  v-model="form.guest_names[index]"
                  type="text"
                  :placeholder="`Nama tamu ${index + 1}`"
                  class="flex-1 bg-white/60 border-2 border-pink-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <!-- Extra Services -->
          <div
            v-if="extraServices.length > 0"
            class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-3 border border-emerald-100"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-3"
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
              <label class="text-lg font-bold text-gray-900">Layanan Tambahan</label>
            </div>
            <div class="grid gap-3">
              <div
                v-for="service in extraServices"
                :key="service.id"
                class="bg-white/60 border-2 border-emerald-200 rounded-xl p-2"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center"
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
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900 text-lg">{{ service.name }}</h4>
                      <p class="text-sm text-emerald-600 font-medium">Layanan tambahan optional</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span class="text-sm font-semibold text-gray-700">Jumlah:</span>
                    <input
                      :value="getServiceQuantity(service.id)"
                      @input="updateServiceQuantity(service.id, $event.target.value)"
                      type="number"
                      min="0"
                      class="w-20 bg-white border-2 border-emerald-200 rounded-xl px-3 py-2 text-center focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all duration-200 font-semibold"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div
            v-if="error"
            class="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 rounded-2xl p-3"
          >
            <div class="flex items-center">
              <div
                class="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mr-3"
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
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-red-800 mb-1">Error</h3>
                <p class="font-medium">{{ error }}</p>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div
            class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200"
          >
            <router-link
              to="/booking"
              class="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              Batal
            </router-link>
            <button
              type="submit"
              :disabled="loading || !canSubmit"
              class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-semibold transition-all duration-200 hover:from-purple-600 hover:to-pink-700 hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                  d="M5 13l4 4L19 7"
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
              {{ loading ? 'Menyimpan...' : 'Booking' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { bookingService } from '../services/bookingService'
import { useAuthStore } from '../store/auth'

export default {
  name: 'CreateBookingView',
  data() {
    return {
      form: {
        user_id: null,
        perusahaan: '',
        room_id: null,
        check_in_date: '',
        check_out_date: '',
        status: 'pending',
        number_of_guests: 1,
        guest_names: [''],
        extra_services: [],
      },
      availableRooms: [],
      extraServices: [],
      priceCalculation: null,
      loading: false,
      loadingRooms: false,
      error: null,
      today: new Date().toISOString().split('T')[0],
    }
  },
  computed: {
    canSubmit() {
      return this.form.room_id && this.form.check_in_date && this.form.check_out_date
    },
  },
  watch: {
    'form.number_of_guests'(newVal) {
      if (newVal > 0) {
        this.form.guest_names = Array(newVal)
          .fill('')
          .map((_, index) => this.form.guest_names[index] || '')
      } else {
        this.form.guest_names = []
      }
    },
  },
  async mounted() {
    const authStore = useAuthStore()
    this.form.user_id = authStore.user?.id

    await this.loadExtraServices()
  },
  methods: {
    async loadExtraServices() {
      try {
        const response = await bookingService.getExtraServices()
        this.extraServices = response.data || response
      } catch (error) {
        console.error('Error loading extra services:', error)
      }
    },

    async onDateChange() {
      if (this.form.check_in_date && this.form.check_out_date) {
        await this.loadAvailableRooms()
      }
    },

    async loadAvailableRooms() {
      if (!this.form.check_in_date || !this.form.check_out_date) return

      this.loadingRooms = true
      try {
        const response = await bookingService.getAvailableRooms(
          this.form.check_in_date,
          this.form.check_out_date
        )
        this.availableRooms = response.data || response

        // Reset room selection if previously selected room is not available
        if (
          this.form.room_id &&
          !this.availableRooms.find((room) => room.id === this.form.room_id)
        ) {
          this.form.room_id = null
          this.priceCalculation = null
        }
      } catch (error) {
        console.error('Error loading available rooms:', error)
        this.availableRooms = []
      } finally {
        this.loadingRooms = false
      }
    },

    selectRoom(room) {
      this.form.room_id = room.id
      this.calculatePrice()
    },

    getServiceQuantity(serviceId) {
      const service = this.form.extra_services.find((s) => s.id === serviceId)
      return service ? service.quantity : 0
    },

    updateServiceQuantity(serviceId, quantity) {
      const qty = parseInt(quantity) || 0
      const existingIndex = this.form.extra_services.findIndex((s) => s.id === serviceId)

      if (qty > 0) {
        if (existingIndex >= 0) {
          this.form.extra_services[existingIndex].quantity = qty
        } else {
          this.form.extra_services.push({ id: serviceId, quantity: qty })
        }
      } else {
        if (existingIndex >= 0) {
          this.form.extra_services.splice(existingIndex, 1)
        }
      }

      this.calculatePrice()
    },

    async calculatePrice() {
      if (!this.form.room_id || !this.form.check_in_date || !this.form.check_out_date) {
        this.priceCalculation = null
        return
      }

      try {
        const data = {
          room_id: this.form.room_id,
          check_in_date: this.form.check_in_date,
          check_out_date: this.form.check_out_date,
          extra_services: this.form.extra_services,
        }

        const response = await bookingService.calculatePrice(data)
        this.priceCalculation = response
      } catch (error) {
        console.error('Error calculating price:', error)
        this.priceCalculation = null
      }
    },

    async submitBooking() {
      if (!this.canSubmit) return

      this.loading = true
      this.error = null

      try {
        const bookingData = {
          ...this.form,
          guest_names: this.form.guest_names.filter((name) => name.trim() !== ''),
        }

        const response = await bookingService.createBooking(bookingData)
        const booking = response.data || response

        // Kirim notifikasi WhatsApp setelah booking berhasil dibuat
        try {
          await bookingService.sendWhatsAppNotification(booking.id)
          console.log('WhatsApp notification sent successfully')
        } catch (whatsAppError) {
          console.warn('Failed to send WhatsApp notification:', whatsAppError)
          // Tidak menampilkan error WhatsApp ke user karena booking sudah berhasil
        }

        // Redirect to booking list
        this.$router.push({ name: 'booking' })
      } catch (error) {
        console.error('Error creating booking:', error)
        this.error = error.response?.data?.message || 'Gagal membuat booking. Silakan coba lagi.'
      } finally {
        this.loading = false
      }
    },

    formatCurrency(amount) {
      if (!amount) return '0'
      return new Intl.NumberFormat('id-ID').format(amount)
    },
  },
}
</script>
