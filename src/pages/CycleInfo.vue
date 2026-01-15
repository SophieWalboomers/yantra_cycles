<template>
  <q-page class="q-pa-md">
    <div v-if="cycle" class="text-h5">{{ cycle.info }}</div>
    <div v-else class="text-body1">No cycle found.</div>
  </q-page>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const cycle = ref(null)

// TODO add images
const cyclesDb = [
  { index: 1, info: 'Info for cycle 1' }, //, image: 'images/placeholder.jpg' },
  { index: 2, info: 'Info for cycle 2' }, //, image: 'images/placeholder.jpg' },
  { index: 3, info: 'Info for cycle 3' }, //, image: 'images/placeholder.jpg' },
  { index: 4, info: 'Info for cycle 4' }, //, image: 'images/placeholder.jpg' },
  { index: 5, info: 'Info for cycle 5' }, //, image: 'images/placeholder.jpg' },
  { index: 6, info: 'Info for cycle 6' }, //, image: 'images/placeholder.jpg' },
  { index: 7, info: 'Info for cycle 7' }, //, image: 'images/placeholder.jpg' },
  { index: 8, info: 'Info for cycle 8' }, //, image: 'images/placeholder.jpg' },
  { index: 9, info: 'Info for cycle 9' }, //, image: 'images/placeholder.jpg' },
]

const cycleId = computed(() => Number(route.params.cycleId))

watchEffect(async () => {
  cycle.value = null
  cycle.value = cyclesDb.find((x) => x.index === cycleId.value) ?? null
  console.log(cycle.value?.index)
  console.log(cycle.value?.info)
})
</script>
