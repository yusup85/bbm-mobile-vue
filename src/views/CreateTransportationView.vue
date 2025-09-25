<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header Section -->
    <div class="bg-white shadow-sm p-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div
            class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg"
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
            <h1 class="text-2xl font-bold text-gray-900">Permintaan Transportasi</h1>
            <p class="text-gray-600 text-sm">Buat permintaan transportasi baru</p>
          </div>
        </div>
        <button
          @click="$router.back()"
          class="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl font-semibold"
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
        </button>
      </div>
    </div>

    <div class="p-3">
      <form @submit.prevent="submitForm" class="max-w-4xl mx-auto space-y-8">
        <!-- Layanan Selection -->
        <div class="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
          <div class="flex items-center mb-6">
            <div
              class="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-3"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900">Pilih Jenis Layanan</h2>
          </div>
          <div class="grid gap-4">
            <label
              class="bg-orange-50 border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-md"
              :class="
                form.jenis_layanan === 'penjemputan'
                  ? 'border-orange-400 ring-4 ring-orange-100 shadow-lg'
                  : 'border-orange-200'
              "
            >
              <div class="flex items-center">
                <input
                  type="radio"
                  v-model="form.jenis_layanan"
                  value="penjemputan"
                  class="w-5 h-5 text-orange-600 mr-4"
                  @change="updateLayanan"
                />
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-3"
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
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <span class="font-semibold text-gray-900 text-lg">Penjemputan</span>
                    <p class="text-sm text-orange-600 font-medium">
                      Layanan penjemputan dari lokasi tertentu
                    </p>
                  </div>
                </div>
              </div>
            </label>

            <label
              class="bg-orange-50 border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-md"
              :class="
                form.jenis_layanan === 'pengantaran'
                  ? 'border-orange-400 ring-4 ring-orange-100 shadow-lg'
                  : 'border-orange-200'
              "
            >
              <div class="flex items-center">
                <input
                  type="radio"
                  v-model="form.jenis_layanan"
                  value="pengantaran"
                  class="w-5 h-5 text-orange-600 mr-4"
                  @change="updateLayanan"
                />
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-3"
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
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <span class="font-semibold text-gray-900 text-lg">Pengantaran</span>
                    <p class="text-sm text-orange-600 font-medium">
                      Layanan pengantaran ke lokasi tujuan
                    </p>
                  </div>
                </div>
              </div>
            </label>

            <label
              class="bg-orange-50 border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-md"
              :class="
                form.jenis_layanan === 'keduanya'
                  ? 'border-orange-400 ring-4 ring-orange-100 shadow-lg'
                  : 'border-orange-200'
              "
            >
              <div class="flex items-center">
                <input
                  type="radio"
                  v-model="form.jenis_layanan"
                  value="keduanya"
                  class="w-5 h-5 text-orange-600 mr-4"
                  @change="updateLayanan"
                />
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-3"
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
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <span class="font-semibold text-gray-900 text-lg"
                      >Penjemputan dan Pengantaran</span
                    >
                    <p class="text-sm text-orange-600 font-medium">
                      Layanan lengkap penjemputan dan pengantaran
                    </p>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>

        <!-- Form Layanan -->
        <div class="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
          <div class="flex items-center mb-6">
            <div
              class="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-3"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900">Detail Permintaan</h2>
          </div>

          <!-- Info Notifikasi WhatsApp -->
          <!-- Nomor Telepon & Penumpang -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            <div>
              <label for="nomor_telp" class="block text-sm font-semibold text-gray-700 mb-3">
                📞 Nomor Telepon <span class="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="nomor_telp"
                v-model="form.nomor_telp"
                class="w-full px-4 py-3 bg-orange-50 border-2 border-orange-200 rounded-xl text-gray-900 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all duration-200"
                placeholder="Contoh: 08123456789"
                required
              />
            </div>

            <div>
              <label for="jumlah_penumpang" class="block text-sm font-semibold text-gray-700 mb-3">
                👥 Jumlah Penumpang <span class="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="jumlah_penumpang"
                v-model="form.jumlah_penumpang"
                min="1"
                max="20"
                class="w-full px-4 py-3 bg-orange-50 border-2 border-orange-200 rounded-xl text-gray-900 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all duration-200"
                placeholder="Masukkan jumlah penumpang"
                required
              />
            </div>
          </div>

          <!-- Penjemputan Fields -->
          <div v-if="showPickupFields" class="mb-8">
            <div
              class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-3 border-2 border-blue-200 mb-6"
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900">🚗 Detail Penjemputan</h3>
              </div>

              <div class="grid grid-cols-1 gap-3">
                <div>
                  <label
                    for="pickup_location"
                    class="block text-sm font-semibold text-gray-700 mb-3"
                  >
                    📍 Lokasi Penjemputan <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="pickup_location"
                    v-model="form.pickup_location"
                    class="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                    placeholder="Contoh: Hotel ABC, Jl. Sudirman No. 123"
                    :required="showPickupFields"
                  />
                </div>

                <div>
                  <label
                    for="lokasi_tujuan_pickup"
                    class="block text-sm font-semibold text-gray-700 mb-3"
                  >
                    🎯 Tujuan Penjemputan <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lokasi_tujuan_pickup"
                    v-model="form.lokasi_tujuan_pickup"
                    class="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                    placeholder="Contoh: Bandara Soekarno Hatta"
                    :required="showPickupFields"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label for="pickup_date" class="block text-sm font-semibold text-gray-700 mb-3">
                      📅 Tanggal Penjemputan <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="pickup_date"
                      v-model="form.pickup_date"
                      class="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                      :required="showPickupFields"
                    />
                  </div>
                  <div>
                    <label for="pickup_time" class="block text-sm font-semibold text-gray-700 mb-3">
                      🕐 Waktu Penjemputan <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      id="pickup_time"
                      v-model="form.pickup_time"
                      class="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                      :required="showPickupFields"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pengantaran Fields -->
          <div v-if="showDropoffFields" class="mb-8">
            <div
              class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-3 border-2 border-green-200 mb-6"
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
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900">🚙 Detail Pengantaran</h3>
              </div>

              <div class="grid grid-cols-1 gap-3">
                <div>
                  <label
                    for="dropoff_location"
                    class="block text-sm font-semibold text-gray-700 mb-3"
                  >
                    📍 Lokasi Pengantaran <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="dropoff_location"
                    v-model="form.dropoff_location"
                    class="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl text-gray-900 focus:border-green-400 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all duration-200"
                    placeholder="Contoh: Bandara Soekarno Hatta"
                    :required="showDropoffFields"
                  />
                </div>

                <div>
                  <label
                    for="lokasi_tujuan_dropoff"
                    class="block text-sm font-semibold text-gray-700 mb-3"
                  >
                    🎯 Tujuan Pengantaran <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lokasi_tujuan_dropoff"
                    v-model="form.lokasi_tujuan_dropoff"
                    class="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl text-gray-900 focus:border-green-400 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all duration-200"
                    placeholder="Contoh: Hotel ABC, Jl. Sudirman No. 123"
                    :required="showDropoffFields"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label
                      for="dropoff_date"
                      class="block text-sm font-semibold text-gray-700 mb-3"
                    >
                      📅 Tanggal Pengantaran <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="dropoff_date"
                      v-model="form.dropoff_date"
                      class="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl text-gray-900 focus:border-green-400 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all duration-200"
                      :required="showDropoffFields"
                    />
                  </div>
                  <div>
                    <label
                      for="dropoff_time"
                      class="block text-sm font-semibold text-gray-700 mb-3"
                    >
                      🕐 Waktu Pengantaran <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      id="dropoff_time"
                      v-model="form.dropoff_time"
                      class="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-xl text-gray-900 focus:border-green-400 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all duration-200"
                      :required="showDropoffFields"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-2xl mb-6 flex items-start shadow-lg"
        >
          <div
            class="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0"
          >
            <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-bold text-lg text-gray-900 mb-1">🎉 Berhasil!</p>
            <p class="text-green-700">{{ successMessage }}</p>
          </div>
        </div>

        <!-- Error Message -->
        <div
          v-if="error"
          class="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-6 flex items-start shadow-lg"
        >
          <div
            class="w-10 h-10 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0"
          >
            <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-bold text-lg text-gray-900 mb-1">⚠️ Terjadi Kesalahan</p>
            <p class="text-red-700">{{ error }}</p>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="loading || !form.jenis_layanan"
            class="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
          >
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
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
            <svg
              v-if="!loading"
              class="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
            <span v-if="loading">Mengirim Permintaan...</span>
            <span v-else>Kirim Permintaan</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import transportationService from '../services/transportationService'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()

// Form data
const form = ref({
  jenis_layanan: '',
  nomor_telp: '',
  jumlah_penumpang: 1,
  pickup_location: '',
  lokasi_tujuan_pickup: '',
  pickup_date: '',
  pickup_time: '',
  dropoff_location: '',
  lokasi_tujuan_dropoff: '',
  dropoff_date: '',
  dropoff_time: '',
  status: 'requested',
})

// State management
const loading = ref(false)
const error = ref(null)
const successMessage = ref(null)
const loadingMessage = ref('')

// Computed properties untuk menampilkan field sesuai layanan yang dipilih
const showPickupFields = computed(() => {
  return form.value.jenis_layanan === 'penjemputan' || form.value.jenis_layanan === 'keduanya'
})

const showDropoffFields = computed(() => {
  return form.value.jenis_layanan === 'pengantaran' || form.value.jenis_layanan === 'keduanya'
})

// Methods
const updateLayanan = () => {
  // Reset form fields when changing service type
  if (!showPickupFields.value) {
    form.value.pickup_location = ''
    form.value.lokasi_tujuan_pickup = ''
    form.value.pickup_date = ''
    form.value.pickup_time = ''
  }

  if (!showDropoffFields.value) {
    form.value.dropoff_location = ''
    form.value.lokasi_tujuan_dropoff = ''
    form.value.dropoff_date = ''
    form.value.dropoff_time = ''
  }
}

const showSuccessNotification = () => {
  successMessage.value =
    'Permintaan transportasi berhasil dibuat! Notifikasi WhatsApp telah dikirim ke admin dan pihak terkait.'

  // Hilangkan notifikasi setelah 5 detik
  setTimeout(() => {
    successMessage.value = null
  }, 5000)
}

const submitForm = async () => {
  loading.value = true
  error.value = null
  successMessage.value = null
  loadingMessage.value = 'Menyimpan permintaan...'

  try {
    // Validation
    if (!form.value.jenis_layanan) {
      throw new Error('Pilih jenis layanan terlebih dahulu')
    }

    if (!form.value.nomor_telp) {
      throw new Error('Nomor telepon wajib diisi')
    }

    if (!form.value.jumlah_penumpang || form.value.jumlah_penumpang < 1) {
      throw new Error('Jumlah penumpang minimal 1 orang')
    }

    // Validate pickup fields if needed
    if (showPickupFields.value) {
      if (
        !form.value.pickup_location ||
        !form.value.lokasi_tujuan_pickup ||
        !form.value.pickup_date ||
        !form.value.pickup_time
      ) {
        throw new Error('Semua field penjemputan wajib diisi')
      }
    }

    // Validate dropoff fields if needed
    if (showDropoffFields.value) {
      if (
        !form.value.dropoff_location ||
        !form.value.lokasi_tujuan_dropoff ||
        !form.value.dropoff_date ||
        !form.value.dropoff_time
      ) {
        throw new Error('Semua field pengantaran wajib diisi')
      }
    }

    // Prepare data untuk dikirim ke API
    const submitData = {
      user_id: authStore.user.id,
      nomor_telp: form.value.nomor_telp,
      jumlah_penumpang: parseInt(form.value.jumlah_penumpang),
      status: form.value.status,
    }

    // Add pickup data if applicable
    if (showPickupFields.value) {
      submitData.pickup_location = form.value.pickup_location
      submitData.lokasi_tujuan_pickup = form.value.lokasi_tujuan_pickup
      submitData.pickup_date = form.value.pickup_date
      submitData.pickup_time = form.value.pickup_time
    }

    // Add dropoff data if applicable
    if (showDropoffFields.value) {
      submitData.dropoff_location = form.value.dropoff_location
      submitData.lokasi_tujuan_dropoff = form.value.lokasi_tujuan_dropoff
      submitData.dropoff_date = form.value.dropoff_date
      submitData.dropoff_time = form.value.dropoff_time
    }

    // Update loading message untuk WhatsApp notification
    loadingMessage.value = 'Mengirim notifikasi WhatsApp...'

    await transportationService.create(submitData)

    // Tampilkan notifikasi sukses dengan informasi WhatsApp
    showSuccessNotification()

    // Tunggu sebentar agar user bisa membaca notifikasi
    setTimeout(() => {
      router.push('/transportation')
    }, 2000)
  } catch (err) {
    error.value =
      err.message || 'Gagal menyimpan permintaan. Pastikan semua field terisi dengan benar.'
    console.error(err)
  } finally {
    loading.value = false
    loadingMessage.value = ''
  }
}
</script>
