import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import calculateRoutes from './routes/calculate.js'
import leadCaptureRoutes from './routes/leadCapture.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:9000',
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/calculate', calculateRoutes)
app.use('/api/lead-capture', leadCaptureRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📝 CORS enabled for: ${process.env.CORS_ORIGIN || 'http://localhost:9000'}`)
})
