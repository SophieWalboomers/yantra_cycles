<template>
  <q-page class="q-pa-md">
    <!-- Error state -->
    <div v-if="cycleDataError" class="text-center q-pa-lg">
      <q-icon name="error" size="3em" color="negative" />
      <div class="q-mt-md text-negative">Failed to load cycle data</div>
      <q-btn color="accent" @click="fetchCycleData" class="q-mt-md">Try Again</q-btn>
    </div>

    <!-- Main content -->
    <div v-else-if="cycleData" class="row justify-center">
      <div class="col-12" :style="{ maxWidth: $q.screen.gt.sm ? '55%' : '100%' }">
        <q-splitter v-model="splitterModel" unit="%">
          <!-- LEFT: vertical tabs -->
          <template #before>
            <q-tabs
              v-model="tab"
              vertical
              class="text-accent"
              active-color="accent"
              indicator-color="accent"
              :dense="$q.screen.lt.md"
            >
              <q-tab
                v-for="(cycle, key) in cycleData"
                :key="key"
                :name="String(key)"
                :label="`Cycle ${key}`"
              />
            </q-tabs>
          </template>

          <!-- RIGHT: panels -->
          <template #after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              transition-prev="jump-up"
              transition-next="jump-up"
              class="rounded-borders"
            >
              <q-tab-panel
                v-for="(cycle, key) in cycleData"
                :key="key"
                :name="String(key)"
                class="q-pa-md"
              >
                <div class="text-h6 text-accent q-mb-sm text-bold">Cycle {{ key }}</div>

                <div
                  :class="$q.screen.lt.sm ? 'text-subtitle2' : 'text-subtitle1'"
                  class="text-grey-7 q-mb-md"
                >
                  {{ cycle.keywords.join(' · ') }}
                </div>

                <ul class="q-pl-md" style="max-width: 100%">
                  <li v-for="(item, index) in cycle.description" :key="index">
                    {{ item }}
                  </li>
                </ul>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import axios from 'axios'

const cycleData = ref(null)
const cycleDataError = ref(null)

const cycleKey = computed(() => {
  const stateKey = window.history.state?.cycleKey
  return stateKey ? String(stateKey) : '1'
})

const tab = ref(cycleKey.value)
const splitterModel = ref(22)

onMounted(() => {
  fetchCycleData()
})

// Fetch cycle data from backend API
async function fetchCycleData() {
  try {
    cycleDataError.value = null

    const response = await axios.get('http://localhost:3001/api/calculate/cycle-data')

    if (response.data.success) {
      cycleData.value = response.data.data
    } else {
      throw new Error('Failed to load cycle data')
    }
  } catch (error) {
    console.error('Error fetching cycle data:', error)
    cycleDataError.value = error.message
  } 
}
</script>

<style scoped>
/* Prevent accidental horizontal scroll on small screens */
.q-tab-panel {
  overflow-x: hidden;
}
.q-tab-panel * {
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
}
</style>
