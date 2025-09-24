<template>
  <div>
    <!-- Header -->
    <header class="p-4 flex items-center gap-4 bg-white border-b sticky top-0 z-10">
      <button @click="$router.back()" class="mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-xl font-bold">Buat Permintaan Transportasi</h1>
    </header>

    <div class="p-4">
      <form @submit.prevent="submitForm" class="space-y-6">

        <!-- Layanan -->
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-lg font-semibold mb-4">Layanan</h2>
          <div class="space-y-3">
            <label class="flex items-center">
              <input
                type="radio"
                v-model="form.jenis_layanan"
                value="penjemputan"
                class="mr-3 text-indigo-600"
                @change="updateLayanan"
              >
              <span>Penjemputan</span>
            </label>

            <label class="flex items-center">
              <input
                type="radio"
                v-model="form.jenis_layanan"
                value="pengantaran"
                class="mr-3 text-indigo-600"
                @change="updateLayanan"
              >
              <span>Pengantaran</span>
            </label>

            <label class="flex items-center">
              <input
                type="radio"
                v-model="form.jenis_layanan"
                value="keduanya"
                class="mr-3 text-indigo-600"
                @change="updateLayanan"
              >
              <span>Penjemputan dan Pengantaran</span>
            </label>
          </div>
        </div>

        <!-- Form Layanan -->
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-lg font-semibold mb-4">Form Layanan</h2>

          <!-- Info Notifikasi WhatsApp -->
          <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-md mb-4">
            <div class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="text-sm">
                <p class="font-medium">Notifikasi WhatsApp</p>
                <p>Setelah permintaan dibuat, notifikasi WhatsApp akan dikirim otomatis ke admin dan nomor telepon yang Anda berikan.</p>
              </div>
            </div>
          </div>

          <!-- Nomor Telepon -->
          <div class="mb-4">
            <label for="nomor_telp" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nomor Telepon <span class="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="nomor_telp"
              v-model="form.nomor_telp"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Contoh: 08123456789"
              required
            >
          </div>

          <!-- Jumlah Penumpang -->
          <div class="mb-4">
            <label for="jumlah_penumpang" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Jumlah Penumpang <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="jumlah_penumpang"
              v-model="form.jumlah_penumpang"
              min="1"
              max="20"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
              required
            >
          </div>

          <!-- Penjemputan Fields -->
          <div v-if="showPickupFields">
            <h3 class="text-md font-medium mb-3 text-indigo-600">Detail Penjemputan</h3>

            <div class="mb-4">
              <label for="pickup_location" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lokasi Penjemputan <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="pickup_location"
                v-model="form.pickup_location"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Contoh: Hotel ABC, Jl. Sudirman No. 123"
                :required="showPickupFields"
              >
            </div>

            <div class="mb-4">
              <label for="lokasi_tujuan_pickup" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tujuan Penjemputan <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lokasi_tujuan_pickup"
                v-model="form.lokasi_tujuan_pickup"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Contoh: Bandara Soekarno Hatta"
                :required="showPickupFields"
              >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="pickup_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tanggal Penjemputan <span class="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="pickup_date"
                  v-model="form.pickup_date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  :required="showPickupFields"
                >
              </div>
              <div>
                <label for="pickup_time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Waktu Penjemputan <span class="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  id="pickup_time"
                  v-model="form.pickup_time"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  :required="showPickupFields"
                >
              </div>
            </div>
          </div>

          <!-- Pengantaran Fields -->
          <div v-if="showDropoffFields">
            <h3 class="text-md font-medium mb-3 text-green-600">Detail Pengantaran</h3>

            <div class="mb-4">
              <label for="dropoff_location" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lokasi Pengantaran <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="dropoff_location"
                v-model="form.dropoff_location"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Contoh: Bandara Soekarno Hatta"
                :required="showDropoffFields"
              >
            </div>

            <div class="mb-4">
              <label for="lokasi_tujuan_dropoff" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tujuan Pengantaran <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lokasi_tujuan_dropoff"
                v-model="form.lokasi_tujuan_dropoff"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Contoh: Hotel ABC, Jl. Sudirman No. 123"
                :required="showDropoffFields"
              >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="dropoff_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tanggal Pengantaran <span class="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dropoff_date"
                  v-model="form.dropoff_date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  :required="showDropoffFields"
                >
              </div>
              <div>
                <label for="dropoff_time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Waktu Pengantaran <span class="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  id="dropoff_time"
                  v-model="form.dropoff_time"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  :required="showDropoffFields"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md mb-4 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="flex-1">
            <p class="font-medium">Berhasil!</p>
            <p class="text-sm">{{ successMessage }}</p>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
          {{ error }}
        </div>

        <!-- Submit Button -->
        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="loading || !form.jenis_layanan"
            class="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? loadingMessage : 'Simpan Permintaan' }}
          </button>
          <router-link
            to="/transportation"
            class="flex-1 bg-gray-500 text-white py-3 px-4 rounded-md font-medium text-center hover:bg-gray-600"
          >
            Batal
          </router-link>
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
  status: 'requested'
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
  successMessage.value = 'Permintaan transportasi berhasil dibuat! Notifikasi WhatsApp telah dikirim ke admin dan pihak terkait.'

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
      if (!form.value.pickup_location || !form.value.lokasi_tujuan_pickup ||
          !form.value.pickup_date || !form.value.pickup_time) {
        throw new Error('Semua field penjemputan wajib diisi')
      }
    }

    // Validate dropoff fields if needed
    if (showDropoffFields.value) {
      if (!form.value.dropoff_location || !form.value.lokasi_tujuan_dropoff ||
          !form.value.dropoff_date || !form.value.dropoff_time) {
        throw new Error('Semua field pengantaran wajib diisi')
      }
    }

    // Prepare data untuk dikirim ke API
    const submitData = {
      user_id: authStore.user.id,
      nomor_telp: form.value.nomor_telp,
      jumlah_penumpang: parseInt(form.value.jumlah_penumpang),
      status: form.value.status
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
    error.value = err.message || 'Gagal menyimpan permintaan. Pastikan semua field terisi dengan benar.'
    console.error(err)
  } finally {
    loading.value = false
    loadingMessage.value = ''
  }
}
</script>
