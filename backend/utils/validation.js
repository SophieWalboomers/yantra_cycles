/**
 * Validation utilities for API inputs
 */

export function validateEmail(email) {
  const emailRegex = /.+@.+\..+/
  return emailRegex.test(email)
}

export function validateBirthDate(dateString) {
  // Expected format: YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(dateString)) return false

  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date)
}

export function validateDateIsPast(dateString) {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}
