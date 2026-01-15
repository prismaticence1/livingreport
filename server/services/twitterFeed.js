import Parser from 'rss-parser'

const parser = new Parser()
const RSS_FEED_URL = 'https://rss.app/feeds/SKdmwNTy6aLaQTvw.xml'

export async function fetchYottaTweets(days = 30) {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  try {
    console.log(`Fetching RSS feed: ${RSS_FEED_URL}`)

    const feed = await parser.parseURL(RSS_FEED_URL)

    if (feed && feed.items && feed.items.length > 0) {
      // Filter items from last N days
      const recentItems = feed.items
        .filter(item => new Date(item.pubDate) > cutoffDate)
        .slice(0, 50) // Get up to 50 items
        .map(item => ({
          id: item.guid || item.link,
          title: item.title,
          content: item.contentSnippet || '',
          date: new Date(item.pubDate),
          link: item.link
        }))

      if (recentItems.length > 0) {
        console.log(`✓ Successfully fetched ${recentItems.length} items from RSS feed`)
        return recentItems
      }
    }

    console.error('No items found in RSS feed')
    return []
  } catch (error) {
    console.error(`✗ Failed to fetch RSS feed: ${error.message}`)
    return []
  }
}

export function formatTweetsForSummarization(tweets) {
  return tweets
    .map((tweet, idx) => `Tweet ${idx + 1} (${tweet.date.toLocaleDateString()}):\n${tweet.content}`)
    .join('\n\n---\n\n')
}
