import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { CYCLE_DATA_PATH } from '../config/constants.js'
import { validateBirthDate } from '../utils/validation.js'

const router = express.Router()

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path to cycle data
const cycleDataPath = path.join(__dirname, CYCLE_DATA_PATH)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function mod9to1(n) {
  return ((((n - 1) % 9) + 9) % 9) + 1
}

function parseCycleEndDate(dateString) {
  const [monthPart, dayPart] = dateString.split(' ')
  const monthIndex = months.indexOf(monthPart.slice(0, 3)) // corresponds to Date object indexing (Jan = 0, etc.)
  const day = Number(dayPart)

  return { monthIndex, day }
}

function loadCycleData() {
  return JSON.parse(fs.readFileSync(cycleDataPath, 'utf8'))
}

function buildCycleRange(yearCycle, today, cycleData) {
  const endDateCycle = cycleData[String(yearCycle)].year_ends
  const endDateParts = parseCycleEndDate(endDateCycle)

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

/**
 * GET /api/calculate/cycle-data
 * Returns all cycle data (keywords, descriptions, etc.)
 */
router.get('/cycle-data', (req, res) => {
  try {
    // Load cycle data from JSON file
    const cycleData = JSON.parse(fs.readFileSync(cycleDataPath, 'utf8'))

    res.json({
      success: true,
      data: cycleData,
    })
  } catch (error) {
    console.error('Error loading cycle data:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to load cycle data',
    })
  }
})

/**
 * POST /api/calculate
 * Calculate yearly, monthly, and daily cycles based on birth date
 *
 * Request body:
 * {
 *   birthDate: string (YYYY-MM-DD format),
 *   currentDate?: string (optional, defaults to today)
 * }
 *
 * Response:
 * {
 *   yearCycle: number,
 *   monthCycle: number,
 *   dayCycle: number,
 *   cycleStartDate: string,
 *   cycleEndDate: string,
 *   monthCycleRange: { start: string, end: string },
 *   dayCycleRange: { start: string, end: string }
 * }
 */
router.post('/', (req, res) => {
  try {
    const { birthDate, currentDate } = req.body

    if (!birthDate || !validateBirthDate(birthDate)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid birthDate. Expected format: YYYY-MM-DD',
      })
    }

    const requestDate = currentDate ? new Date(currentDate) : new Date()
    if (Number.isNaN(requestDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid currentDate. Expected a valid ISO date string.',
      })
    }

    const today = new Date(requestDate)
    const [birthYear, birthMonth, birthDay] = birthDate.split('-').map(Number)

    const cycleData = loadCycleData()

    let yearCycle = mod9to1(birthMonth + birthDay + today.getFullYear() + 1)
    const { activeCycle, cycleStartDate, cycleEndDate } = buildCycleRange(
      yearCycle,
      today,
      cycleData,
    )
    yearCycle = activeCycle

    const monthCycle = mod9to1(yearCycle - (7 - (today.getMonth() + 1)))
    const dayCycle = mod9to1(monthCycle + today.getDate())

    res.json({
      success: true,
      yearCycle,
      monthCycle,
      dayCycle,
      cycleStartDate: cycleStartDate.toISOString(),
      cycleEndDate: cycleEndDate.toISOString(),
    })
  } catch (error) {
    console.error('Error calculating cycles:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to calculate cycles',
    })
  }
})

export default router
