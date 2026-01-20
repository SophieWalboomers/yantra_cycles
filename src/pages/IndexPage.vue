<template>
  <q-page class="column items-center">
    <q-separator class="q-my-lg" />
    <div class="text-body1 text-italic">
      “Until you make the unconscious conscious, <br />
      it will direct your life and you will call it fate.”
    </div>
    <div class="q-pb-md">― C.G. Jung</div>
    <div class="text-body1 text-center" style="max-width: 80%">
      Understand the energies impacting you right now, to unlock your highest potential and live
      your Dharma.
    </div>

    <q-separator class="q-my-lg" />

    <q-card flat>
      <div class="text-subtitle2 q-mb-sm">Select your birthday</div>
      <q-date
        v-model="birthday"
        mask="YYYY-MM-DD"
        minimal
        navigation-type="select"
        :options="pastDatesOnly"
      />
    </q-card>

    <q-btn color="primary" @click="calculate">
      Calculate <br />
      energetic influences</q-btn
    >

    <template v-if="showResult && birthday">
      <!--<div class="text-body1 q-my-lg">
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
      </div>-->
      <q-table
        class="q-mt-lg q-px-sm"
        flat
        hide-bottom
        separator="cell"
        :rows="cycleRows"
        :columns="cycleColumns"
        row-key="id"
        :style="{
          width: $q.screen.gt.sm ? '50%' : '100%',
        }"
      >
        <template #body="props">
          <q-tr :props="props">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="white-space: normal; overflow-wrap: anywhere; vertical-align: top"
            >
              <!-- Row 1: render lists -->
              <template v-if="Array.isArray(props.row[col.name])">
                <div v-for="(word, i) in props.row[col.name]" :key="i" style="text-align: center">
                  {{ word }}
                </div>
              </template>

              <!-- Other rows: render text -->
              <template v-else>
                <template v-if="props.row.id === 3">
                  <q-btn
                    color="primary"
                    outline
                    :to="{
                      path: '/cycle-info',
                      state: { cycleKey: String(props.row[col.name]) },
                    }"
                    :style="{
                      // 'font-size': $q.screen.gt.sm ? '100%' : '70%',
                    }"
                  >
                    <div class="column items-center">
                      <div v-if="$q.screen.gt.sm">
                        <div>Read more about</div>
                        <div>{{ props.row[col.name] }}-cycles</div>
                      </div>
                      <div v-else>More</div>
                    </div>
                  </q-btn>
                </template>

                <template v-else>
                  <div
                    :class="{
                      'text-left': props.row.id === 2,
                      'text-center': props.row.id !== 2,
                      hyphenate: $q.screen.lt.md,
                    }"
                  >
                    {{ props.row[col.name] }}
                  </div>
                </template>
              </template>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </template>

    <template v-else-if="showResult && !birthday">
      <div class="text-body1 q-my-lg">Please select your birthday first :)</div>
    </template>
  </q-page>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import cycleData from 'src/data/cycleInfo.json'

const birthday = ref('')
onMounted(() => {
  birthday.value = localStorage.getItem('birthday') || ''
})

watch(birthday, (val) => {
  if (val) localStorage.setItem('birthday', val)
  else localStorage.removeItem('birthday')
})

const month = computed(() => (birthday.value ? Number(birthday.value.slice(5, 7)) : null))
const day = computed(() => (birthday.value ? Number(birthday.value.slice(8, 10)) : null))

const yearCycle = ref(null)
const monthCycle = ref(null)
const dayCycle = ref(null)

const showResult = ref(false)

function pastDatesOnly(date) {
  const today = new Date()
  const [year, month, day] = date.split('/').map(Number)

  const selectedDate = new Date(year, month - 1, day)

  return selectedDate < today
}

function mod9to1(n) {
  return ((((n - 1) % 9) + 9) % 9) + 1
}

function calculate() {
  const today = new Date()

  yearCycle.value = mod9to1(month.value + day.value + today.getFullYear() + 1)
  monthCycle.value = mod9to1(yearCycle.value - (7 - (today.getMonth() + 1)))
  dayCycle.value = mod9to1(monthCycle.value + today.getDate())

  showResult.value = true
}

const cycleColumns = computed(() => [
  {
    name: 'year',
    label: `Year cycle: ${yearCycle.value}`,
    align: 'center',
  },
  { name: 'month', label: `Month cycle: ${monthCycle.value}`, align: 'center' },
  { name: 'day', label: `Day cycle: ${dayCycle.value}`, align: 'center' },
])

const cycleRows = computed(() => {
  const yearObj = cycleData?.[String(yearCycle.value)]
  const monthObj = cycleData?.[String(monthCycle.value)]
  const dayObj = cycleData?.[String(dayCycle.value)]
  return [
    {
      id: 1,
      year: yearCycle.value ? yearObj.keywords : [],
      month: monthCycle.value ? monthObj.keywords : [],
      day: dayCycle.value ? dayObj.keywords : [],
    },
    {
      id: 2,
      year: yearCycle.value ? yearObj.summary : '',
      month: monthCycle.value ? monthObj.summary : '',
      day: dayCycle.value ? dayObj.summary : '',
    },
    {
      id: 3,
      year: yearCycle.value,
      month: monthCycle.value,
      day: dayCycle.value,
    },
  ]
})
</script>
<style scoped>
.hyphenate {
  hyphens: auto;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;

  overflow-wrap: break-word; /* fallback */
  word-break: normal;
}
</style>
