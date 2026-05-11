import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { CYCLE_DATA_PATH } from '../config/constants.js'

const router = express.Router()

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path to cycle data
const cycleDataPath = path.join(__dirname, CYCLE_DATA_PATH)

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

    // TODO: Validate inputs
    // TODO: Calculate cycles using moved logic from frontend
    // TODO: Format and return response

    res.json({
      message: 'Calculate endpoint - to be implemented',
      receivedData: { birthDate, currentDate },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
