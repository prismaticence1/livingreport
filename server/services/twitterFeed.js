import Parser from 'rss-parser'

const parser = new Parser()

// Multiple Nitter instances for fallback
const NITTER_INSTANCES = [
  'https://nitter.net',
  'https://nitter.poast.org',
  'https://nitter.1d4.us'
]

// CORS proxies as final fallback
const CORS_PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`
]

export async function fetchYottaTweets(days = 30) {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  // Try each Nitter instance
  for (const instance of NITTER_INSTANCES) {
    try {
      const rssUrl = `${instance}/YottaLabs/rss`
      console.log(`Trying Nitter instance: ${instance}`)

      const feed = await parser.parseURL(rssUrl)

      if (feed && feed.items && feed.items.length > 0) {
        // Filter tweets from last N days
        const recentTweets = feed.items
          .filter(item => new Date(item.pubDate) > cutoffDate)
          .slice(0, 50) // Get up to 50 tweets
          .map(item => ({
            id: item.guid || item.link,
            title: item.title,
            content: item.contentSnippet || '',
            date: new Date(item.pubDate),
            link: item.link
          }))

        if (recentTweets.length > 0) {
          console.log(`✓ Successfully fetched ${recentTweets.length} tweets from ${instance}`)
          return recentTweets
        }
      }
    } catch (error) {
      console.log(`✗ Failed to fetch from ${instance}: ${error.message}`)
      continue
    }
  }

  // Fallback: Try with CORS proxies
  for (const proxyFunc of CORS_PROXIES) {
    for (const instance of NITTER_INSTANCES.slice(0, 2)) {
      try {
        const rssUrl = `${instance}/YottaLabs/rss`
        const proxyUrl = proxyFunc(rssUrl)

        console.log(`Trying with CORS proxy: ${rssUrl}`)

        const response = await fetch(proxyUrl, {
          headers: { 'Accept': 'application/rss+xml, application/xml' }
        })

        if (!response.ok) continue

        const text = await response.text()
        const feed = await parser.parseString(text)

        if (feed && feed.items && feed.items.length > 0) {
          const recentTweets = feed.items
            .filter(item => new Date(item.pubDate) > cutoffDate)
            .slice(0, 50)
            .map(item => ({
              id: item.guid || item.link,
              title: item.title,
              content: item.contentSnippet || '',
              date: new Date(item.pubDate),
              link: item.link
            }))

          if (recentTweets.length > 0) {
            console.log(`✓ Successfully fetched ${recentTweets.length} tweets via CORS proxy`)
            return recentTweets
          }
        }
      } catch (error) {
        console.log(`✗ Failed with CORS proxy: ${error.message}`)
        continue
      }
    }
  }

  // If all else fails, return empty array
  console.error('Failed to fetch tweets from all sources')
  return []
}

export function formatTweetsForSummarization(tweets) {
  return tweets
    .map((tweet, idx) => `Tweet ${idx + 1} (${tweet.date.toLocaleDateString()}):\n${tweet.content}`)
    .join('\n\n---\n\n')
}
