<template>
  <q-page class="column items-center">
    <!-- Popup -->
    <q-dialog v-model="showLeadPopup">
      <q-card style="width: 100%; max-width: 420px" class="q-pa-md">
        <q-card-section class="text-center">
          <div class="text-h6 text-bold q-mb-sm">
            Get your free personalized Dharma Marga report
          </div>
          <div class="text-body2">
            Enter your email and birth date to receive your personalized report.
          </div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            v-model="email"
            type="email"
            label="Email"
            outlined
            dense
            :rules="[
              (val) => !!val || 'Email is required',
              (val) => /.+@.+\..+/.test(val) || 'Enter a valid email',
            ]"
          />

          <div>
            <div class="text-subtitle2 q-mb-sm"><b>Birth date</b></div>

            <div class="row q-col-gutter-sm">
              <div class="col-4">
                <q-select
                  v-model="birthDay"
                  :options="dayOptions"
                  label="Day"
                  outlined
                  dense
                  emit-value
                  map-options
                />
              </div>

              <div class="col-4">
                <q-select
                  v-model="birthMonth"
                  :options="monthOptions"
                  label="Month"
                  outlined
                  dense
                  emit-value
                  map-options
                />
              </div>

              <div class="col-4">
                <q-select
                  v-model="birthYear"
                  :options="yearOptions"
                  label="Year"
                  outlined
                  dense
                  emit-value
                  map-options
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="between">
          <q-btn flat label="Not now" @click="showLeadPopup = false" />
          <q-btn color="accent" label="Get my free report" @click="submitLeadForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-separator class="q-my-lg" />
    <div class="text-body1 text-italic q-px-sm text-center">
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
      <div class="text-subtitle2 q-mb-sm"><b>Select your birthday</b></div>
      <q-date
        v-model="birthday"
        mask="YYYY-MM-DD"
        minimal
        navigation-type="select"
        color="accent"
        :options="pastDatesOnly"
      />
    </q-card>

    <q-btn color="accent" @click="calculate" class="text-bold">
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
        class="q-mt-lg q-px-sm cycle-table"
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
        <template #header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              <div class="text-bold">
                {{ col.label }}
              </div>
            </q-th>
          </q-tr>
        </template>
        <template #body="props">
          <q-tr :props="props">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="white-space: normal; overflow-wrap: anywhere; vertical-align: top"
            >
              <!-- Row 1: render lists -->
              <div :class="{ hyphenate: $q.screen.lt.md }">
                <template v-if="Array.isArray(props.row[col.name])">
                  <div v-for="(word, i) in props.row[col.name]" :key="i" style="text-align: center">
                    {{ word }}
                  </div>
                </template>

                <!-- Other rows: render text -->
                <template v-else>
                  <template v-if="props.row.id === 3"
                    ><div class="text-left">{{ props.row[col.name] }}</div></template
                  >
                  <template v-else-if="props.row.id === 4">
                    <q-btn
                      color="accent"
                      outline
                      :to="{
                        path: '/cycle-info',
                        state: { cycleKey: String(props.row[col.name]) },
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
                    {{ props.row[col.name] }}
                  </template>
                </template>
              </div>
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
import { useQuasar } from 'quasar'
import axios from 'axios'

const $q = useQuasar()

const birthday = ref('')
const email = ref('')
const showLeadPopup = ref(false)

const birthDay = ref(null)
const birthMonth = ref(null)
const birthYear = ref(null)

// Cycle data fetched from API
const cycleData = ref(null)
const cycleDataError = ref(null)

const monthOptions = [
  { label: 'Jan', value: 1 },
  { label: 'Feb', value: 2 },
  { label: 'Mar', value: 3 },
  { label: 'Apr', value: 4 },
  { label: 'May', value: 5 },
  { label: 'Jun', value: 6 },
  { label: 'Jul', value: 7 },
  { label: 'Aug', value: 8 },
  { label: 'Sep', value: 9 },
  { label: 'Oct', value: 10 },
  { label: 'Nov', value: 11 },
  { label: 'Dec', value: 12 },
]

const currentYear = new Date().getFullYear()

const yearOptions = computed(() => {
  const years = []
  for (let y = currentYear; y >= 1900; y--) {
    years.push({ label: String(y), value: y })
  }
  return years
})

const dayOptions = computed(() => {
  if (!birthMonth.value || !birthYear.value) {
    return Array.from({ length: 31 }, (_, i) => ({
      label: String(i + 1),
      value: i + 1,
    }))
  }

  const daysInMonth = new Date(birthYear.value, birthMonth.value, 0).getDate()

  return Array.from({ length: daysInMonth }, (_, i) => ({
    label: String(i + 1),
    value: i + 1,
  }))
})

onMounted(() => {
  birthday.value = localStorage.getItem('birthday') || ''

  // Show popup on first-time page load
  const hasSeenInSession = sessionStorage.getItem('leadPopupShown')

  const isReload = performance.getEntriesByType('navigation')[0]?.type === 'reload'

  if (isReload || !hasSeenInSession) {
    showLeadPopup.value = true
    sessionStorage.setItem('leadPopupShown', 'true')
  }

  // Fetch cycle data from API
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

    // Fallback: show error notification
    $q.notify({
      type: 'negative',
      message: 'Failed to load cycle information.',
    })
  }
}

// if birthday changes, save to localStorage (or remove if empty)
watch(birthday, (val) => {
  if (val) localStorage.setItem('birthday', val)
  else localStorage.removeItem('birthday')
})

// sync birthday with values of the popup
watch([birthYear, birthMonth, birthDay], ([year, month, day]) => {
  if (year && month && day) {
    birthday.value = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }
})

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const today = new Date()

// - 1 so it corresponds to Date object indexing (Jan = 0, etc.)
const birth_month = computed(() => (birthday.value ? Number(birthday.value.slice(5, 7)) - 1 : null))
const birth_day = computed(() => (birthday.value ? Number(birthday.value.slice(8, 10)) : null))

const yearCycle = ref(null)
const monthCycle = ref(null)
const dayCycle = ref(null)

const showResult = ref(false)

const curr_cycle_startdate = ref('')
const curr_cycle_enddate = ref('')

function submitLeadForm() {
  if (!email.value || !/.+@.+\..+/.test(email.value)) {
    $q.notify({
      type: 'negative',
      message: 'Please enter a valid email address.',
    })
    return
  }

  if (!birthYear.value || !birthMonth.value || !birthDay.value) {
    $q.notify({
      type: 'negative',
      message: 'Please select a valid birth date.',
    })
    return
  }

  // TODO: Hook API / email service here

  $q.notify({
    type: 'positive',
    message: 'Thanks! Check your email for your free personalized Dharma Marga report.',
    color: 'accent',
    textColor: 'white',
  })

  showLeadPopup.value = false
}

function pastDatesOnly(date) {
  const [year, month, day] = date.split('/').map(Number)

  const selectedDate = new Date(year, month - 1, day)

  return selectedDate < today
}

function mod9to1(n) {
  return ((((n - 1) % 9) + 9) % 9) + 1
}

function calculate() {
  yearCycle.value = mod9to1(birth_month.value + 1 + birth_day.value + today.getFullYear() + 1)
  const end_date_cycle = cycleData.value[String(yearCycle.value)].year_ends

  // we already entered the next cycle, the new cycle started this year
  if (today.getMonth() > months.indexOf(end_date_cycle.slice(0, 3))) {
    yearCycle.value = mod9to1(yearCycle.value + 1)
    curr_cycle_startdate.value = new Date(
      today.getFullYear(),
      months.indexOf(cycleData.value[String(mod9to1(yearCycle.value - 1))].year_ends.slice(0, 3)),
      Number(cycleData.value[String(mod9to1(yearCycle.value - 1))].year_ends.slice(-2)) + 1,
    )
    curr_cycle_enddate.value = new Date(
      today.getFullYear() + 1,
      months.indexOf(cycleData.value[String(yearCycle.value)].year_ends.slice(0, 3)),
      cycleData.value[String(yearCycle.value)].year_ends.slice(-2),
    )
  } else if (
    today.getMonth() == months.indexOf(end_date_cycle.slice(0, 3)) &&
    today.getDate() > end_date_cycle.slice(-2)
  ) {
    yearCycle.value = mod9to1(yearCycle.value + 1)
    curr_cycle_startdate.value = new Date(
      today.getFullYear(),
      months.indexOf(cycleData.value[String(mod9to1(yearCycle.value - 1))].year_ends.slice(0, 3)),
      Number(cycleData.value[String(mod9to1(yearCycle.value - 1))].year_ends.slice(-2)) + 1,
    )
    curr_cycle_enddate.value = new Date(
      today.getFullYear() + 1,
      months.indexOf(cycleData.value[String(yearCycle.value)].year_ends.slice(0, 3)),
      cycleData.value[String(yearCycle.value)].year_ends.slice(-2),
    )
  }
  // we are still in the current cycle, which started last year
  else {
    curr_cycle_startdate.value = new Date(
      today.getFullYear() - 1,
      months.indexOf(cycleData.value[String(mod9to1(yearCycle.value - 1))].year_ends.slice(0, 3)),
      Number(cycleData.value[String(mod9to1(yearCycle.value - 1))].year_ends.slice(-2)) + 1,
    )
    curr_cycle_enddate.value = new Date(
      today.getFullYear(),
      months.indexOf(cycleData.value[String(yearCycle.value)].year_ends.slice(0, 3)),
      cycleData.value[String(yearCycle.value)].year_ends.slice(-2),
    )
  }

  monthCycle.value = mod9to1(yearCycle.value - (7 - (today.getMonth() + 1)))
  dayCycle.value = mod9to1(monthCycle.value + today.getDate())

  showResult.value = true
}

const cycleColumns = computed(() => [
  {
    name: 'year',
    label: `Yearly cycle: ${yearCycle.value}`,
    align: 'center',
  },
  { name: 'month', label: `Monthly cycle: ${monthCycle.value}`, align: 'center' },
  { name: 'day', label: `Daily cycle: ${dayCycle.value}`, align: 'center' },
])

function parseDate(dateObj) {
  return String(dateObj.getDate()) + ' ' + months[dateObj.getMonth()] + ' ' + dateObj.getFullYear()
}

function print_yearcycle_runtime() {
  return (
    'This cycle runs from ' +
    parseDate(curr_cycle_startdate.value) +
    ', until ' +
    parseDate(curr_cycle_enddate.value)
  )
}

function print_monthcycle_runtime() {
  // default: first & last day of the month
  const start = ref(new Date(today.getFullYear(), today.getMonth(), 1))
  const end = ref(new Date(today.getFullYear(), today.getMonth() + 1, 0))

  // we already entered the next cycle, the new cycle STARTED THIS month
  if (
    today.getMonth() == curr_cycle_startdate.value.getMonth() &&
    today.getDate() >= curr_cycle_startdate.value.getDate()
  ) {
    start.value = curr_cycle_startdate.value
  }
  // we are still in the current cycle, the cycle ENDS THIS month
  else if (
    today.getMonth() == curr_cycle_enddate.value.getMonth() &&
    today.getDate() <= curr_cycle_enddate.value.getDate()
  ) {
    end.value = curr_cycle_enddate.value
  }

  // else:
  // we are still in the current cycle, the new cycle begins in a future month
  // OR
  // we already entered the next cycle, the new cycle started in a past month
  // --> nothing happens

  return 'This cycle runs from ' + parseDate(start.value) + ', until ' + parseDate(end.value)
}

const cycleRows = computed(() => {
  const yearObj = cycleData.value?.[String(yearCycle.value)]
  const monthObj = cycleData.value?.[String(monthCycle.value)]
  const dayObj = cycleData.value?.[String(dayCycle.value)]
  return [
    {
      id: 1,
      year: print_yearcycle_runtime(yearObj),
      month: print_monthcycle_runtime(yearObj),
      day: 'Lasts only today',
    },
    {
      id: 2,
      year: yearCycle.value ? yearObj.keywords : [],
      month: monthCycle.value ? monthObj.keywords : [],
      day: dayCycle.value ? dayObj.keywords : [],
    },
    {
      id: 3,
      year: yearCycle.value ? yearObj.summary : '',
      month: monthCycle.value ? monthObj.summary : '',
      day: dayCycle.value ? dayObj.summary : '',
    },
    {
      id: 4,
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
