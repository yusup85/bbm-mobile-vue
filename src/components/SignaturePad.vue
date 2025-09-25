<template>
  <div class="w-full">
    <div class="border border-dashed rounded-lg p-2" :class="{ 'border-red-500': error }">
      <canvas ref="canvas" class="w-full h-40 rounded-md bg-gray-50"></canvas>
    </div>
    <div class="flex justify-end mt-2">
      <button @click="clear" type="button" class="text-sm text-gray-600 hover:text-indigo-600">
        Ulangi Tanda Tangan
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SignaturePad from 'signature_pad'

const props = defineProps({
  error: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const canvas = ref(null)
let signaturePad = null

onMounted(() => {
  signaturePad = new SignaturePad(canvas.value, {
    penColor: 'black',
    onEnd: () => {
      if (!signaturePad.isEmpty()) {
        emit('update:modelValue', signaturePad.toDataURL('image/png'))
      }
    },
  })

  function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1)
    canvas.value.width = canvas.value.offsetWidth * ratio
    canvas.value.height = canvas.value.offsetHeight * ratio
    canvas.value.getContext('2d').scale(ratio, ratio)
    signaturePad.clear()
  }
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()

  onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas)
  })
})

const clear = () => {
  signaturePad.clear()
  emit('update:modelValue', null)
}

// [FIX] Menambahkan fungsi untuk mengambil data URL secara manual
const getDataURL = () => {
  if (signaturePad && !signaturePad.isEmpty()) {
    return signaturePad.toDataURL('image/png')
  }
  return null
}

// [FIX] Expose method 'clear' dan 'getDataURL' ke komponen induk
defineExpose({ clear, getDataURL })
</script>
