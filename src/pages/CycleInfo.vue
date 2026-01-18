<template>
  <q-page class="q-pa-md">
    <div v-if="cycle">
      <div class="text-h5 text-center q-py-lg">
        Cycle {{ cycleKey }}<br />
        {{ cycle.keywords.join(', ') }}
      </div>
      <div class="q-pt-md"><b>Summary:</b> {{ cycle.summary }}</div>
      <div class="q-pt-md">
        <b>Description:</b>
        <ul>
          <li v-for="(item, index) in cycle.description" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="text-body1">No cycle info found.</div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import cycleData from 'src/data/cycleInfo.json'

const route = useRoute()
const cycleKey = computed(() => String(route.params.cycleId ?? ''))

const cycle = computed(() => {
  return cycleData?.[cycleKey.value] ?? null
})
</script>
