const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function mod9to1(n) {
  return ((((n - 1) % 9) + 9) % 9) + 1
}

function parseCycleEndDate(dateString) {
  const [monthPart, dayPart] = dateString.split(' ')
  const monthIndex = months.indexOf(monthPart.slice(0, 3))
  const day = Number(dayPart)
  return { monthIndex, day }
}

function buildCycleRange(yearCycle, today, cycleData) {
  const endDateParts = parseCycleEndDate(cycleData[String(yearCycle)].year_ends)

  let activeCycle = yearCycle
  let cycleStartDate
  let cycleEndDate

  const todayMonth = today.getMonth()
  const todayDay = today.getDate()

  if (
    todayMonth > endDateParts.monthIndex ||
    (todayMonth === endDateParts.monthIndex && todayDay > endDateParts.day)
  ) {
    activeCycle = mod9to1(activeCycle + 1)
    const previousCycle = mod9to1(activeCycle - 1)

    const previousEnd = parseCycleEndDate(cycleData[String(previousCycle)].year_ends)
    cycleStartDate = new Date(today.getFullYear(), previousEnd.monthIndex, previousEnd.day + 1)

    const currentEnd = parseCycleEndDate(cycleData[String(activeCycle)].year_ends)
    cycleEndDate = new Date(today.getFullYear() + 1, currentEnd.monthIndex, currentEnd.day)
  } else {
    const previousCycle = mod9to1(activeCycle - 1)
    const previousEnd = parseCycleEndDate(cycleData[String(previousCycle)].year_ends)
    cycleStartDate = new Date(today.getFullYear() - 1, previousEnd.monthIndex, previousEnd.day + 1)

    const currentEnd = parseCycleEndDate(cycleData[String(activeCycle)].year_ends)
    cycleEndDate = new Date(today.getFullYear(), currentEnd.monthIndex, currentEnd.day)
  }

  return { activeCycle, cycleStartDate, cycleEndDate }
}

export function calculateCycles(birthday, today, cycleData) {
  const [, birthMonth, birthDay] = birthday.split('-').map(Number)
  let yearCycle = mod9to1(birthMonth + birthDay + today.getFullYear() + 1)
  const { activeCycle, cycleStartDate, cycleEndDate } = buildCycleRange(yearCycle, today, cycleData)
  yearCycle = activeCycle

  // const monthCycle = mod9to1(yearCycle - (7 - (today.getMonth() + 1)))
  const kycYear = cycleEndDate.getFullYear()
  const monthsToJuly = (kycYear - today.getFullYear()) * 12 + (6 - today.getMonth())
  const monthCycle = mod9to1(yearCycle - monthsToJuly)
  const dayCycle = mod9to1(monthCycle + today.getDate())

  return { yearCycle, monthCycle, dayCycle, cycleStartDate, cycleEndDate }
}
