<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 w-full max-w-sm rounded-lg p-6 space-y-4">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ title }}</h2>

      <!-- Input tambahan -->
      <div v-if="actionType === 'approve'">
        <label
          for="volume_disetujui"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Volume Disetujui (Liter)</label
        >
        <input
          v-model="formData.volume_disetujui"
          type="number"
          step="0.01"
          id="volume_disetujui"
          required
          class="form-input"
        />
      </div>
      <div v-if="actionType === 'issue'">
        <label
          for="volume_dikeluarkan"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Volume Dikeluarkan (Liter)</label
        >
        <input
          v-model="formData.volume_dikeluarkan"
          type="number"
          step="0.01"
          id="volume_dikeluarkan"
          required
          class="form-input"
        />

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Foto Bukti</label
          >
          <input
            type="file"
            @change="handlePhotoSelect"
            accept="image/*"
            ref="photoInput"
            class="hidden"
          />
          <button
            @click="triggerPhotoInput"
            type="button"
            class="mt-1 w-full p-2 border-2 border-dashed rounded-md flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Pilih/Ambil Foto
          </button>
          <img
            v-if="formData.evidence_photo_path"
            :src="formData.evidence_photo_path"
            class="mt-2 rounded-md max-h-40 w-auto mx-auto"
          />
          <p v-if="photoError" class="text-red-500 text-xs mt-1">{{ photoError }}</p>
        </div>
      </div>

      <!-- Tanda Tangan -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Tanda Tangan Anda</label
        >
        <SignaturePad ref="signaturePadRef" :error="!!signatureError" />
        <p v-if="signatureError" class="text-red-500 text-xs mt-1">{{ signatureError }}</p>
      </div>

      <!-- Tombol Aksi -->
      <div class="flex gap-4 pt-4">
        <button
          @click="$emit('close')"
          type="button"
          class="w-full bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md font-semibold"
        >
          Batal
        </button>
        <button
          @click="handleConfirm"
          type="button"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold"
        >
          Konfirmasi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import SignaturePad from './SignaturePad.vue'

const props = defineProps({
  actionType: { type: String, required: true },
  request: { type: Object, required: true },
})
const emit = defineEmits(['close', 'confirm'])

const signaturePadRef = ref(null)
const signatureError = ref(null)
const photoInput = ref(null)
const photoError = ref(null)

const formData = reactive({
  volume_disetujui: props.request.volume,
  volume_dikeluarkan: props.request.volume_disetujui || props.request.volume,
  // [FIX] Menyamakan nama field dengan yang ada di backend
  evidence_photo_path: null,
})

const title = computed(() => {
  switch (props.actionType) {
    case 'approve':
      return 'Setujui Permintaan'
    case 'issue':
      return 'Keluarkan BBM'
    case 'check':
      return 'Periksa Permintaan'
    default:
      return 'Konfirmasi Aksi'
  }
})

const triggerPhotoInput = () => {
  photoInput.value.click()
}

const handlePhotoSelect = (event) => {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    // [FIX] Menyimpan data ke field yang benar
    formData.evidence_photo_path = e.target.result
    photoError.value = null
  }
  reader.readAsDataURL(file)
}

const handleConfirm = () => {
  const signature = signaturePadRef.value.getDataURL()
  if (!signature) {
    signatureError.value = 'Tanda tangan wajib diisi.'
    return
  }
  signatureError.value = null

  const payload = {}

  if (props.actionType === 'approve') {
    payload.volume_disetujui = formData.volume_disetujui
    payload.tanda_tangan_penyetuju = signature
  } else if (props.actionType === 'issue') {
    // [FIX] Memvalidasi field yang benar
    if (!formData.evidence_photo_path) {
      photoError.value = 'Foto bukti wajib diisi.'
      return
    }
    payload.volume_dikeluarkan = formData.volume_dikeluarkan
    payload.tanda_tangan_dikeluarkan = signature
    // [FIX] Mengirim dengan key yang benar
    payload.evidence_photo_path = formData.evidence_photo_path
  } else if (props.actionType === 'check') {
    payload.tanda_tangan_pemeriksa = signature
  }

  emit('confirm', payload)
}
</script>
<style scoped>
.form-input {
  @apply mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500;
}
</style>
