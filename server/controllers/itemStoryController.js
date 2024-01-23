const axios = require('axios')

class itemStoryController {
  async getItem(req, res) {
    const { id } = req.params

    try {
      const response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      )
      const storyData = response.data
      res.json(storyData)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

module.exports = new itemStoryController()
