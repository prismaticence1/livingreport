import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import tweetsRouter from './routes/tweets.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = dirname(__dirname)

const app = express()
const PORT = process.env.PORT || 3001
const NODE_ENV = process.env.NODE_ENV || 'development'

// Middleware
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'
app.use(cors({
  origin: corsOrigin,
  credentials: true
}))
app.use(express.json())

// API Routes
app.use('/api/yotta', tweetsRouter)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), env: NODE_ENV })
})

// Serve static files in production
if (NODE_ENV === 'production') {
  const distPath = join(rootDir, 'dist')
  app.use(express.static(distPath))

  // SPA fallback: serve index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'))
  })

  console.log(`📂 Serving static files from: ${distPath}`)
}

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    success: false,
    error: NODE_ENV === 'production' ? 'Internal server error' : err.message
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Yotta Report API running on port ${PORT}`)
  console.log(`🌍 Environment: ${NODE_ENV}`)
  console.log(`📡 CORS Origin: ${corsOrigin}`)
})

export default app
