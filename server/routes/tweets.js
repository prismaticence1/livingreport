import express from 'express'
import { fetchYottaTweets, formatTweetsForSummarization } from '../services/twitterFeed.js'
import { summarizeTweets } from '../services/claudeService.js'

const router = express.Router()

// In-memory cache
let summaryCache = {
  data: null,
  timestamp: null,
  ttl: 6 * 60 * 60 * 1000 // 6 hours
}

async function getCachedSummaries(refresh = false) {
  // Check if cache is valid
  if (!refresh && summaryCache.data && summaryCache.timestamp) {
    const ageMs = Date.now() - summaryCache.timestamp
    if (ageMs < summaryCache.ttl) {
      console.log(`📦 Cache hit! Age: ${(ageMs / 1000 / 60).toFixed(1)}m`)
      return {
        ...summaryCache.data,
        fromCache: true,
        cacheExpiresIn: summaryCache.ttl - ageMs
      }
    }
  }

  console.log('🔄 Fetching fresh data...')

  try {
    // Fetch tweets
    const tweets = await fetchYottaTweets(30)

    if (tweets.length === 0) {
      throw new Error('No tweets found for the past 30 days')
    }

    console.log(`📝 Fetched ${tweets.length} tweets, summarizing...`)

    // Format and summarize
    const tweetsText = formatTweetsForSummarization(tweets)
    const summaryResult = await summarizeTweets(tweetsText)

    if (summaryResult.error) {
      console.warn('⚠️ Summary error:', summaryResult.error)
    }

    const data = {
      success: true,
      data: {
        summaries: summaryResult.summaries || [],
        period: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          end: new Date().toISOString()
        },
        tweet_count: tweets.length
      },
      metadata: {
        lastUpdated: new Date().toISOString(),
        cacheHit: false,
        cacheExpiresIn: summaryCache.ttl
      }
    }

    // Cache the result
    summaryCache = {
      data,
      timestamp: Date.now(),
      ttl: summaryCache.ttl
    }

    return data
  } catch (error) {
    console.error('❌ Error fetching summaries:', error.message)
    throw error
  }
}

// GET /api/yotta/developments
// Returns key development updates with AI summaries
router.get('/developments', async (req, res, next) => {
  try {
    const refresh = req.query.refresh === 'true'
    const data = await getCachedSummaries(refresh)
    res.json(data)
  } catch (error) {
    next({
      status: 500,
      message: error.message
    })
  }
})

// GET /api/yotta/developments/raw
// Returns raw tweets for debugging
router.get('/developments/raw', async (req, res, next) => {
  try {
    const days = parseInt(req.query.days) || 30
    const tweets = await fetchYottaTweets(days)

    res.json({
      success: true,
      data: {
        tweets,
        count: tweets.length
      },
      metadata: {
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    next({
      status: 500,
      message: error.message
    })
  }
})

// POST /api/yotta/developments/cache/clear
// Clear the cache (admin endpoint)
router.post('/developments/cache/clear', (req, res) => {
  summaryCache = {
    data: null,
    timestamp: null,
    ttl: 6 * 60 * 60 * 1000
  }

  res.json({
    success: true,
    message: 'Cache cleared'
  })
})

// GET /api/yotta/developments/cache/status
// Get cache status (debug endpoint)
router.get('/developments/cache/status', (req, res) => {
  const hasCache = !!summaryCache.data
  const ageMs = hasCache ? Date.now() - summaryCache.timestamp : null
  const isExpired = hasCache && ageMs > summaryCache.ttl

  res.json({
    success: true,
    data: {
      hasCache,
      ageMs,
      ageMins: ageMs ? (ageMs / 1000 / 60).toFixed(1) : null,
      ttlMs: summaryCache.ttl,
      isExpired,
      expiresIn: hasCache ? Math.max(0, summaryCache.ttl - ageMs) : null
    }
  })
})

export default router
