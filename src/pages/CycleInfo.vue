<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div
        :style="{
          maxWidth: $q.screen.gt.sm ? '55%' : '100%',
        }"
      >
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          :swipeable="$q.screen.lt.md"
          :arrows="$q.screen.gt.sm"
          :padding="$q.screen.gt.sm"
          control-color="black"
          class="rounded-borders q-pb-md"
          :height="$q.screen.lt.md ? '80vh' : ''"
        >
          <q-carousel-slide
            v-for="(cycle, key) in cycleData"
            :key="key"
            :name="key"
            class="column no-wrap items-center q-pa-md"
          >
            <div class="text-h5 q-mt-md text-bold">Cycle {{ key }}</div>
            <div class="text-subtitle1 q-mt-sm text-grey-7">
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
      <q-btn-toggle
        v-model="slide"
        :options="toggleOptions"
        toggle-text-color="black"
        toggle-text-weight="bold"
      />
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
