<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Modern Header Section -->
    <div class="bg-white shadow-sm p-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div
            class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Permintaan BBM</h1>
            <p class="text-gray-600 text-sm">Buat permintaan BBM untuk kendaraan Anda</p>
          </div>
        </div>
        <button
          @click="goBack"
          class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl font-semibold"
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
      <form @submit.prevent="submitRequest" class="max-w-4xl mx-auto space-y-8">
        <!-- Vehicle Information Section -->
        <div class="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900">🚗 Informasi Kendaraan</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <!-- Jenis Kendaraan -->
            <div>
              <label for="jenis_kendaraan_id" class="block text-sm font-semibold text-gray-700 mb-3">
                🚙 Jenis Kendaraan <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.jenis_kendaraan_id"
                id="jenis_kendaraan_id"
                required
                class="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
              >
                <option disabled value="">Pilih Jenis Kendaraan</option>
                <option v-for="item in masterData.jenis_kendaraan" :key="item.id" :value="item.id">
                  {{ item.nama }}
                </option>
              </select>
            </div>

            <!-- Nomor Polisi Dinamis -->
            <div>
              <label for="no_polisi" class="block text-sm font-semibold text-gray-700 mb-3">
                🏷️ Nomor Polisi <span class="text-red-500">*</span>
              </label>
              <div v-if="isFetchingNopol" class="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-gray-500 flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memuat data nopol...
              </div>
              <select
                v-else-if="isNopolSelect"
                v-model="form.no_polisi"
                id="no_polisi_select"
                required
                class="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
              >
                <option disabled value="">Pilih Nomor Polisi</option>
                <option
                  v-for="kendaraan in availableNopol"
                  :key="kendaraan.id"
                  :value="kendaraan.nomor_polisi"
                >
                  {{ kendaraan.nomor_polisi }}
                </option>
              </select>
              <input
                v-else
                v-model="form.no_polisi"
                type="text"
                id="no_polisi_input"
                required
                class="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                placeholder="Input Nomor Polisi"
              />
            </div>

            <!-- Fungsi Pengguna -->
            <div class="md:col-span-2">
              <label for="fungsi_pengguna_id" class="block text-sm font-semibold text-gray-700 mb-3">
                👤 Fungsi Pengguna <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.fungsi_pengguna_id"
                id="fungsi_pengguna_id"
                required
                class="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
              >
                <option disabled value="">Pilih Fungsi Pengguna</option>
                <option v-for="item in masterData.fungsi_pengguna" :key="item.id" :value="item.id">
                  {{ item.nama }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- BBM Information Section -->
        <div class="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900">⛽ Informasi BBM & Data Kendaraan</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <!-- Jenis BBM -->
            <div>
              <label for="jenis_bbm_id" class="block text-sm font-semibold text-gray-700 mb-3">
                ⛽ Jenis BBM <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.jenis_bbm_id"
                id="jenis_bbm_id"
                required
                class="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
              >
                <option disabled value="">Pilih Jenis BBM</option>
                <option v-for="item in masterData.jenis_bbm" :key="item.id" :value="item.id">
                  {{ item.nama }}
                </option>
              </select>
            </div>

            <!-- Volume -->
            <div>
              <label for="volume" class="block text-sm font-semibold text-gray-700 mb-3">
                📊 Volume (Liter) <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.volume"
                type="number"
                step="0.01"
                id="volume"
                required
                class="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                placeholder="Masukkan volume dalam liter"
              />
            </div>

            <!-- KM -->
            <div>
              <label for="km" class="block text-sm font-semibold text-gray-700 mb-3">
                🛣️ KM/HM Terakhir <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.km"
                type="number"
                id="km"
                required
                class="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                placeholder="Masukkan KM/HM terakhir"
              />
            </div>

            <!-- Keterangan -->
            <div>
              <label for="keterangan" class="block text-sm font-semibold text-gray-700 mb-3">
                📝 Keterangan
              </label>
              <textarea
                v-model="form.keterangan"
                id="keterangan"
                rows="3"
                class="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 resize-none"
                placeholder="Tambahkan keterangan tambahan (opsional)"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Digital Signature Section -->
        <div class="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900">✍️ Tanda Tangan Digital</h2>
          </div>

          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-3 border-2 border-blue-200">
            <label class="block text-sm font-semibold text-gray-700 mb-4">
              📝 Tanda Tangan Pemohon <span class="text-red-500">*</span>
            </label>
            <div class="bg-white rounded-xl border-2 border-dashed border-blue-300 p-4">
              <SignaturePad
                v-model="form.tanda_tangan_pemohon"
                ref="signaturePadRef"
                :error="!!errors.tanda_tangan_pemohon"
              />
            </div>
            <p v-if="errors.tanda_tangan_pemohon" class="text-red-500 text-sm mt-3 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ errors.tanda_tangan_pemohon }}
            </p>
            <div class="mt-4 p-4 bg-blue-100 rounded-xl border border-blue-200">
              <div class="flex items-start">
                <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-semibold text-blue-900 mb-1">Panduan Tanda Tangan:</p>
                  <ul class="text-sm text-blue-800 space-y-1">
                    <li>• Gunakan stylus atau jari untuk menandatangani</li>
                    <li>• Pastikan tanda tangan jelas dan terbaca</li>
                    <li>• Tanda tangan akan digunakan sebagai persetujuan resmi</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button Section -->
        <div class="pt-4">
          <div
            v-if="submitError"
            class="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-6 flex items-start shadow-lg"
          >
            <div class="w-10 h-10 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-bold text-lg text-gray-900 mb-1">⚠️ Terjadi Kesalahan</p>
              <p class="text-red-700">{{ submitError }}</p>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center"
          >
            <svg
              v-if="isSubmitting"
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
              v-if="!isSubmitting"
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
            <span v-if="isSubmitting">Mengirim Permintaan...</span>
            <span v-else">Ajukan Permintaan</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import SignaturePad from '../components/SignaturePad.vue'

const router = useRouter()
const masterData = ref({
  jenis_kendaraan: [],
  jenis_bbm: [],
  fungsi_pengguna: [],
})
const form = reactive({
  jenis_kendaraan_id: '',
  no_polisi: '',
  fungsi_pengguna_id: '',
  jenis_bbm_id: '',
  volume: null,
  km: null,
  keterangan: '',
  tanda_tangan_pemohon: null,
})
const errors = ref({})
const submitError = ref(null)
const isSubmitting = ref(false)
const signaturePadRef = ref(null)

const availableNopol = ref([])
const isFetchingNopol = ref(false)
const isNopolSelect = computed(() => availableNopol.value.length > 0)

const fetchMasterData = async () => {
  try {
    const [jenisKendaraanRes, jenisBbmRes, fungsiPenggunaRes] = await Promise.all([
      api.get('/api/master/jenis-kendaraan'),
      api.get('/api/master/jenis-bbm'),
      api.get('/api/master/fungsi-pengguna'),
    ])
    masterData.value.jenis_kendaraan = jenisKendaraanRes.data.data
    masterData.value.jenis_bbm = jenisBbmRes.data.data
    masterData.value.fungsi_pengguna = fungsiPenggunaRes.data.data
  } catch (error) {
    console.error('Failed to fetch master data:', error)
    submitError.value = 'Gagal memuat data. Coba lagi nanti.'
  }
}

watch(
  () => form.jenis_kendaraan_id,
  async (newJenisId) => {
    availableNopol.value = []
    form.no_polisi = ''

    if (newJenisId) {
      isFetchingNopol.value = true
      try {
        const response = await api.get('/api/master/kendaraan-by-jenis', {
          params: { jenis_kendaraan_id: newJenisId },
        })
        availableNopol.value = response.data.data
      } catch (error) {
        console.error('Failed to fetch kendaraan by jenis:', error)
      } finally {
        isFetchingNopol.value = false
      }
    }
  }
)

const submitRequest = async () => {
  // [FIX] Mengambil data tanda tangan secara manual sebelum validasi
  if (signaturePadRef.value) {
    form.tanda_tangan_pemohon = signaturePadRef.value.getDataURL()
  }

  errors.value = {}
  if (!form.tanda_tangan_pemohon) {
    errors.value.tanda_tangan_pemohon = 'Tanda tangan wajib diisi.'
    return
  }

  isSubmitting.value = true
  submitError.value = null
  try {
    const response = await api.post('/api/permintaan-bbm', form)
    const permintaanId = response.data.data.id

    // Send WhatsApp notification after successful submission
    try {
      await api.post(`/api/permintaan-bbm/${permintaanId}/send-whatsapp`)
    } catch (notificationError) {
      console.warn('WhatsApp notification failed:', notificationError)
      // Don't block the success flow if notification fails
    }

    alert('Permintaan berhasil diajukan!')
    router.push({ name: 'dashboard' })
  } catch (error) {
    console.error('Failed to submit request:', error)
    if (error.response && error.response.status === 422) {
      submitError.value = 'Data yang Anda masukkan tidak valid.'
      errors.value = error.response.data.errors
    } else {
      submitError.value = 'Terjadi kesalahan. Silakan coba lagi.'
    }
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => {
  router.go(-1)
}

onMounted(() => {
  fetchMasterData()
})
</script>

<style scoped>
/* Modern form styles are now handled via Tailwind classes in the template */
/* Removed old form-input styles to prevent conflicts */

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #6366f1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #4f46e5);
}

/* Smooth animations */
* {
  transition: all 0.2s ease;
}

/* Focus states enhancement */
input:focus,
select:focus,
textarea:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Button hover effects */
button:hover:not(:disabled) {
  transform: translateY(-2px);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

/* Card hover effects */
.bg-white:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Loading animation improvements */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.loading-shimmer {
  animation: shimmer 2s linear infinite;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  background-size: 200px 100%;
}
</style>
