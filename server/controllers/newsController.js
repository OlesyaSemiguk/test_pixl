const axios = require('axios')

class NewsController {
  async getNews(req, res) {
    try {
      const response = await axios.get(
        'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'
      )
      const newStoriesIds = response.data.slice(0, 100)
      res.json(newStoriesIds)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

module.exports = new NewsController()
