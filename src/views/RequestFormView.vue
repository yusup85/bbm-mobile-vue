<template>
  <div>
    <!-- Header -->
    <header
      class="p-4 flex items-center gap-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-10"
    >
      <button @click="goBack" class="text-gray-700 dark:text-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-xl font-bold text-gray-900 dark:text-white">Buat Permintaan BBM</h1>
    </header>

    <!-- Form -->
    <form @submit.prevent="submitRequest" class="p-4 space-y-6">
      <!-- Jenis Kendaraan -->
      <div>
        <label
          for="jenis_kendaraan_id"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Jenis Kendaraan</label
        >
        <select
          v-model="form.jenis_kendaraan_id"
          id="jenis_kendaraan_id"
          required
          class="form-input"
        >
          <option disabled value="">Pilih Jenis Kendaraan</option>
          <option v-for="item in masterData.jenis_kendaraan" :key="item.id" :value="item.id">
            {{ item.nama }}
          </option>
        </select>
      </div>

      <!-- Nomor Polisi Dinamis -->
      <div>
        <label for="no_polisi" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Nomor Polisi</label
        >
        <div v-if="isFetchingNopol" class="form-input text-gray-500">Memuat data nopol...</div>
        <select
          v-else-if="isNopolSelect"
          v-model="form.no_polisi"
          id="no_polisi_select"
          required
          class="form-input"
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
          class="form-input"
          placeholder="Input Nomor Polisi"
        />
      </div>

      <!-- Fungsi Pengguna -->
      <div>
        <label
          for="fungsi_pengguna_id"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Fungsi Pengguna</label
        >
        <select
          v-model="form.fungsi_pengguna_id"
          id="fungsi_pengguna_id"
          required
          class="form-input"
        >
          <option disabled value="">Pilih Fungsi Pengguna</option>
          <option v-for="item in masterData.fungsi_pengguna" :key="item.id" :value="item.id">
            {{ item.nama }}
          </option>
        </select>
      </div>

      <!-- Jenis BBM -->
      <div>
        <label for="jenis_bbm_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Jenis BBM</label
        >
        <select v-model="form.jenis_bbm_id" id="jenis_bbm_id" required class="form-input">
          <option disabled value="">Pilih Jenis BBM</option>
          <option v-for="item in masterData.jenis_bbm" :key="item.id" :value="item.id">
            {{ item.nama }}
          </option>
        </select>
      </div>

      <!-- Volume & KM -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="volume" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Volume (Liter)</label
          >
          <input
            v-model="form.volume"
            type="number"
            step="0.01"
            id="volume"
            required
            class="form-input"
          />
        </div>
        <div>
          <label for="km" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >KM/HM Terakhir</label
          >
          <input v-model="form.km" type="number" id="km" required class="form-input" />
        </div>
      </div>

      <!-- Keterangan -->
      <div>
        <label for="keterangan" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Keterangan</label
        >
        <textarea v-model="form.keterangan" id="keterangan" rows="3" class="form-input"></textarea>
      </div>

      <!-- Tanda Tangan -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Tanda Tangan Pemohon</label
        >
        <SignaturePad
          v-model="form.tanda_tangan_pemohon"
          ref="signaturePadRef"
          :error="!!errors.tanda_tangan_pemohon"
        />
        <p v-if="errors.tanda_tangan_pemohon" class="text-red-500 text-xs mt-1">
          {{ errors.tanda_tangan_pemohon }}
        </p>
      </div>

      <!-- Tombol Submit -->
      <div class="pt-4">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? 'Mengirim...' : 'Ajukan Permintaan' }}
        </button>
        <p v-if="submitError" class="text-red-500 text-sm mt-2 text-center">{{ submitError }}</p>
      </div>
    </form>
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
    await api.post('/api/permintaan-bbm', form)
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
.form-input {
  @apply mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500;
}
</style>
