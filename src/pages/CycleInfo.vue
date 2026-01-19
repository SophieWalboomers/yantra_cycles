<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div style="width: 100%; max-width: 680px">
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          control-color="primary"
          class="rounded-borders"
        >
          <q-carousel-slide
            v-for="(cycle, key) in cycleData"
            :key="key"
            :name="key"
            class="column no-wrap flex-center q-pa-lg"
          >
            <div class="text-h5 q-mt-md">Cycle {{ key }}</div>
            <div class="text-subtitle2 q-mt-sm text-grey-7">
              {{ cycle.keywords.join(' · ') }}
            </div>
            <div class="q-mt-md">
              <ul>
                <li v-for="(item, index) in cycle.description" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>

    <div class="row justify-center">
      <q-btn-toggle glossy v-model="slide" :options="toggleOptions" />
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import cycleData from 'src/data/cycleInfo.json'

const cycleKey = computed(() => {
  const stateKey = window.history.state?.cycleKey
  return stateKey ? String(stateKey) : '1'
})

const slide = ref(cycleKey.value)
const toggleOptions = computed(() =>
  Object.keys(cycleData).map((key) => ({
    label: key,
    value: key,
  })),
)
</script>
