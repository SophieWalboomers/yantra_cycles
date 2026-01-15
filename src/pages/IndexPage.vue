<template>
  <q-page class="column items-center">
    <q-separator class="q-my-lg" />
    <div class="text-body1">Calculate your Yantra cycles!</div>

    <q-separator class="q-my-lg" />

    <q-card flat class="q-pa-md">
      <div class="text-subtitle2 q-mb-sm">Select your birthday</div>
      <q-date v-model="birthday" mask="YYYY-MM-DD" minimal />
    </q-card>

    <q-btn label="Calculate cycles" color="primary" @click="calculate" />

    <template v-if="showResult && birthday">
      <div class="text-body1 q-my-lg">
        You are currently in a
        <div>
          <b>{{ yearCycle }}</b
          >-cycle year
        </div>
        <div>
          <b>{{ monthCycle }}</b
          >-cycle month
        </div>
        <div>
          <b>{{ dayCycle }}</b
          >-cycle day
        </div>
      </div>
      <q-table
        class="q-mt-lg q-px-lg"
        flat
        hide-bottom
        separator="vertical"
        :rows="cycleRows"
        :columns="cycleColumns"
        row-key="id"
      />
    </template>

    <template v-else-if="showResult && !birthday">
      <div class="text-body1 q-my-lg">Please select your birthday first :)</div>
    </template>
  </q-page>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
const birthday = ref('')

const month = computed(() => (birthday.value ? Number(birthday.value.slice(5, 7)) : null))
const day = computed(() => (birthday.value ? Number(birthday.value.slice(8, 10)) : null))

const yearCycle = ref(null)
const monthCycle = ref(null)
const dayCycle = ref(null)

const showResult = ref(false)

watch(birthday, () => {
  showResult.value = false
})

function mod9to1(n) {
  return ((((n - 1) % 9) + 9) % 9) + 1
}

function calculate() {
  const now = new Date()

  yearCycle.value = mod9to1(month.value + day.value + now.getFullYear() + 1)
  monthCycle.value = mod9to1(yearCycle.value - (7 - (now.getMonth() + 1)))
  dayCycle.value = mod9to1(monthCycle.value + now.getDate())

  showResult.value = true
}

const cycleColumns = computed(() => [
  { name: 'year', label: `${yearCycle.value}-year`, field: 'year', align: 'center' },
  { name: 'month', label: `${monthCycle.value}-month`, field: 'month', align: 'center' },
  { name: 'day', label: `${dayCycle.value}-day`, field: 'day', align: 'center' },
])

const cycleRows = computed(() => [
  {
    id: 1,
    year: 'Your year-cycle info here',
    month: 'Your month-cycle info here',
    day: 'Your day-cycle info here',
  },
])
</script>
