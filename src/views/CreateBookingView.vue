<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Booking Baru</h1>
        <p class="text-gray-600">Buat booking akomodasi baru</p>
      </div>
      <router-link
        to="/booking"
        class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Kembali
      </router-link>
    </div>

    <!-- Booking Form -->
    <div class="max-w-2xl mx-auto">
      <form @submit.prevent="submitBooking" class="bg-white rounded-lg shadow-md p-6 space-y-6">

        <!-- Perusahaan -->
        <div>
          <label for="perusahaan" class="block text-sm font-medium text-gray-700 mb-2">
            Perusahaan
          </label>
          <input
            id="perusahaan"
            v-model="form.perusahaan"
            type="text"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan nama perusahaan"
          />
        </div>

        <!-- Check-in & Check-out Dates -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="check_in_date" class="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Check-in *
            </label>
            <input
              id="check_in_date"
              v-model="form.check_in_date"
              type="date"
              required
              :min="today"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="onDateChange"
            />
          </div>
          <div>
            <label for="check_out_date" class="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Check-out *
            </label>
            <input
              id="check_out_date"
              v-model="form.check_out_date"
              type="date"
              required
              :min="form.check_in_date"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="onDateChange"
            />
          </div>
        </div>

        <!-- Available Rooms -->
        <div v-if="availableRooms.length > 0">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Pilih Kamar *
          </label>
          <div class="grid gap-3">
            <div
              v-for="room in availableRooms"
              :key="room.id"
              :class="[
                'border rounded-lg p-4 cursor-pointer transition-all',
                form.room_id === room.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-300 hover:border-gray-400'
              ]"
              @click="selectRoom(room)"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-semibold text-gray-900">{{ room.room_type?.name }}</h3>
                  <p class="text-sm text-gray-600">Room {{ room.room_number }}</p>
                  <p class="text-sm text-gray-500 mt-1">{{ room.room_type?.description }}</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-green-600">
                    Rp {{ formatCurrency(room.room_type?.price_per_night) }}
                  </p>
                  <p class="text-xs text-gray-500">per malam</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Room loading state -->
        <div v-else-if="loadingRooms" class="text-center py-4">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
          <p class="text-sm text-gray-600 mt-2">Mencari kamar tersedia...</p>
        </div>

        <!-- No rooms available -->
        <div v-else-if="form.check_in_date && form.check_out_date" class="text-center py-4">
          <p class="text-sm text-gray-600">Tidak ada kamar tersedia untuk tanggal yang dipilih.</p>
        </div>

        <!-- Number of Guests -->
        <div>
          <label for="number_of_guests" class="block text-sm font-medium text-gray-700 mb-2">
            Jumlah Tamu
          </label>
          <input
            id="number_of_guests"
            v-model.number="form.number_of_guests"
            type="number"
            min="1"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan jumlah tamu"
          />
        </div>

        <!-- Guest Names -->
        <div v-if="form.number_of_guests > 0">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Nama Tamu
          </label>
          <div class="space-y-2">
            <input
              v-for="(guestName, index) in form.guest_names"
              :key="index"
              v-model="form.guest_names[index]"
              type="text"
              :placeholder="`Nama tamu ${index + 1}`"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Extra Services -->
        <div v-if="extraServices.length > 0">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Layanan Tambahan
          </label>
          <div class="space-y-3">
            <div
              v-for="service in extraServices"
              :key="service.id"
              class="border border-gray-300 rounded-lg p-4"
            >
              <div class="flex items-center justify-between mb-2">
                <div>
                  <h4 class="font-medium text-gray-900">{{ service.name }}</h4>
                  <p class="text-sm text-green-600 font-semibold">
                    Rp {{ formatCurrency(service.price) }}
                  </p>
                </div>
                <input
                  :value="getServiceQuantity(service.id)"
                  @input="updateServiceQuantity(service.id, $event.target.value)"
                  type="number"
                  min="0"
                  class="w-20 border border-gray-300 rounded-md px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Price Calculation -->
        <div v-if="priceCalculation" class="bg-gray-50 rounded-lg p-4">
          <h3 class="font-semibold text-gray-900 mb-3">Rincian Harga</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Kamar ({{ priceCalculation.nights }} malam)</span>
              <span>Rp {{ formatCurrency(priceCalculation.room_price) }}</span>
            </div>
            <div v-if="priceCalculation.extra_services_details?.length > 0">
              <div
                v-for="extra in priceCalculation.extra_services_details"
                :key="extra.id"
                class="flex justify-between text-gray-600"
              >
                <span>{{ extra.name }} ({{ extra.quantity }}x)</span>
                <span>Rp {{ formatCurrency(extra.subtotal) }}</span>
              </div>
            </div>
            <div class="border-t pt-2 font-semibold flex justify-between">
              <span>Total</span>
              <span>Rp {{ formatCurrency(priceCalculation.total_price) }}</span>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end space-x-3">
          <router-link
            to="/booking"
            class="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            Batal
          </router-link>
          <button
            type="submit"
            :disabled="loading || !canSubmit"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition-colors"
          >
            {{ loading ? 'Menyimpan...' : 'Simpan Booking' }}
          </button>
        </div>
      </form>
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
        extra_services: []
      },
      availableRooms: [],
      extraServices: [],
      priceCalculation: null,
      loading: false,
      loadingRooms: false,
      error: null,
      today: new Date().toISOString().split('T')[0]
    }
  },
  computed: {
    canSubmit() {
      return this.form.room_id && this.form.check_in_date && this.form.check_out_date
    }
  },
  watch: {
    'form.number_of_guests'(newVal) {
      if (newVal > 0) {
        this.form.guest_names = Array(newVal).fill('').map((_, index) => this.form.guest_names[index] || '')
      } else {
        this.form.guest_names = []
      }
    }
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
        if (this.form.room_id && !this.availableRooms.find(room => room.id === this.form.room_id)) {
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
      const service = this.form.extra_services.find(s => s.id === serviceId)
      return service ? service.quantity : 0
    },

    updateServiceQuantity(serviceId, quantity) {
      const qty = parseInt(quantity) || 0
      const existingIndex = this.form.extra_services.findIndex(s => s.id === serviceId)

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
          extra_services: this.form.extra_services
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
          guest_names: this.form.guest_names.filter(name => name.trim() !== '')
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
    }
  }
}
</script>
