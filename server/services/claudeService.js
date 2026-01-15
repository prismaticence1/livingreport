import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export async function summarizeTweets(tweetsText) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not set. Add it to .env file.')
  }

  if (!tweetsText || tweetsText.trim().length === 0) {
    return {
      summaries: [],
      error: 'No tweets to summarize'
    }
  }

  const prompt = `You are analyzing 30 days of tweets from @YottaLabs about their distributed AI compute operating system (Yotta).

Extract and summarize the key development updates. For each significant update, create a JSON object with:
- title: Brief title of the update (max 60 chars)
- category: One of: technical, partnership, business, milestone, community, other
- impact: One of: high, medium, low
- summary: 1-2 sentences summarizing the development
- key_points: Array of 2-3 bullet points with key details

Focus on:
- Product milestones and feature releases
- Technical achievements and benchmarks
- Partnerships and integrations
- Business metrics and funding
- Community events and engagement

Return a JSON array of updates, sorted by date (most recent first). Only include significant developments.

Tweets:
${tweetsText}

Return ONLY valid JSON array, no markdown formatting.`

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })

    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''

    // Parse JSON response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      console.error('Could not parse Claude response:', responseText)
      return {
        summaries: [],
        error: 'Failed to parse summarization response'
      }
    }

    const summaries = JSON.parse(jsonMatch[0])

    return {
      summaries: summaries || [],
      raw_response: responseText
    }
  } catch (error) {
    console.error('Claude API error:', error.message)
    throw new Error(`Failed to summarize tweets: ${error.message}`)
  }
}
