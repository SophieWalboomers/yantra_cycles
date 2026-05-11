import express from 'express'
import { validateEmail, validateBirthDate } from '../utils/validation.js'
import { initializeDb, saveLead } from '../db/index.js'

const router = express.Router()
initializeDb()

/**
 * POST /api/lead-capture
 * Capture lead email and birth date
 *
 * Request body:
 * {
 *   email: string,
 *   birthDate: string (YYYY-MM-DD format)
 * }
 *
 * Response:
 * {
 *   success: boolean,
 *   message: string
 * }
 */
router.post('/', async (req, res) => {
  try {
    const { email, birthDate } = req.body

    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
      })
    }

    if (!birthDate || !validateBirthDate(birthDate)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid birth date. Expected YYYY-MM-DD',
      })
    }

    // TODO: Implement CAPTCHA verification to prevent bot submissions and spam in the lead capture form

    const lead = await saveLead({ email, birthDate })

    res.json({
      success: true,
      message: 'Lead captured successfully',
      lead,
    })
  } catch (error) {
    console.error('Lead capture error:', error)
    res.status(500).json({
      success: false,
      message: 'Unable to capture lead at this time',
    })
  }
})

export default router
