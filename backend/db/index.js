import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_PATH = path.join(__dirname, 'config.db')

const db = new sqlite3.Database(DB_PATH, (error) => {
  if (error) {
    console.error('Failed to open config database:', error)
  }
})

export function initializeDb() {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        birthDate TEXT NOT NULL,
        createdAt TEXT NOT NULL
      )`,
      (error) => {
        if (error) {
          console.error('Failed to initialize config database:', error)
        }
      },
    )
  })
}

export function saveLead({ email, birthDate }) {
  const createdAt = new Date().toISOString()

  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO leads (email, birthDate, createdAt) VALUES (?, ?, ?)'
    db.run(query, [email, birthDate, createdAt], function (error) {
      if (error) {
        return reject(error)
      }

      resolve({
        id: this.lastID,
        email,
        birthDate,
        createdAt,
      })
    })
  })
}
