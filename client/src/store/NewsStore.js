import { makeObservable, runInAction } from 'mobx'
import { fetchNews, fetchNewsComment, fetchNewsStory } from '../http/NewsApi'
import { observable, computed, action } from 'mobx'
export default class NewsStore {
  lastNewsHash = ''
  newsList = []
  newsDetails = []
  newsStory = {}
  newsComments = {}
  lastUpdate = null
  shouldUpdateNews = false

  constructor() {
    makeObservable(this, {
      lastNewsHash: observable,
      newsList: observable,
      newsDetails: observable,
      newsStory: observable,
      newsComments: observable,
      lastUpdate: observable,
      shouldUpdateNews: observable,
      getLastUpdate: computed,
      getNewsList: computed,
      getNewsDetails: computed,
      getLastNewsHash: computed,
      getNewsStory: computed,
      getNewsComments: computed,
      getShouldUpdateNews: computed,
      updateNews: action,
      fetchNewsDetails: action,
      fetchNewsStoryDetails: action,
      fetchNewsCommentsStore: action,
    })

    const updateNewsInterval = setInterval(() => {
      if (this.shouldUpdateNews) {
        this.updateNews()
      }
    }, 1000 * 60)

    this.disposeUpdateNewsInterval = () => clearInterval(updateNewsInterval)
  }

  setNewsList(newsList) {
    this.newsList = newsList
  }
  setLastUpdate(lastUpdate) {
    this.lastUpdate = lastUpdate
  }
  setNewsDetails(newsDetails) {
    this.newsDetails = newsDetails
  }
  setLastNewsHash(lastNewsHash) {
    this.lastNewsHash = lastNewsHash
  }
  setNewsStory(newsStory) {
    runInAction(() => {
      this.newsStory = newsStory
    })
  }
  setNewsComments(newsComments) {
    runInAction(() => {
      this.newsComments = newsComments
    })
  }
  setShouldUpdateNews(shouldUpdateNews) {
    this.shouldUpdateNews = shouldUpdateNews
  }

  get getLastUpdate() {
    return this.lastUpdate
  }

  get getNewsList() {
    return this.newsList
  }

  get getNewsDetails() {
    return this.newsDetails
  }

  get getLastNewsHash() {
    return this.lastNewsHash
  }

  get getNewsStory() {
    return this.newsStory
  }

  get getNewsComments() {
    return this.newsComments
  }

  get getShouldUpdateNews() {
    return this.shouldUpdateNews
  }

  async updateNews() {
    try {
      const currentNewsArray = await fetchNews()
      const currentNewsHash = JSON.stringify(currentNewsArray)
      //console.log(currentNewsHash)
      if (currentNewsHash !== this.lastNewsHash) {
        this.newsList = currentNewsArray
        this.lastNewsHash = currentNewsHash

        await this.fetchNewsDetails()
      }

      this.lastUpdate = new Date()
      //console.log('this.lastUpdate', this.lastUpdate)
    } catch (error) {
      console.error('Ошибка при обновлении новостей:', error)
    }
  }
  async fetchNewsDetails() {
    try {
      const batchSize = 20
      const newsArray = this.getNewsList
      const totalNews = newsArray.length

      for (let i = 0; i < totalNews; i += batchSize) {
        const batchIds = newsArray.slice(i, i + batchSize)
        const batchPromises = batchIds.map(async (id) => {
          const details = await fetchNewsStory(id)
          return details
        })

        const batchDetails = await Promise.all(batchPromises)
        const filteredDetails = batchDetails.filter(
          (details) => details !== null
        )
        runInAction(() => {
          this.newsDetails = [...this.newsDetails, ...filteredDetails]
        })
      }
    } catch (error) {
      console.error('Ошибка при получении деталей новостей:', error)
    }
  }
  async fetchNewsStoryDetails(id) {
    try {
      const newsStoryDetails = await fetchNewsStory(id)
      this.newsStoryDetails = newsStoryDetails
      // console.log(newsStoryDetails)
      return newsStoryDetails
    } catch (error) {
      console.error('Ошибка при получении детали новости:', error)
    }
  }
  async fetchNewsCommentsStore() {
    try {
      const commentsArray = this.newsStory.kids || []
      const commentsDetailsPromises = commentsArray.map(async (id, index) => {
        const details = await fetchNewsComment(id)
        return details
      })
      const commentsDetails = await Promise.all(commentsDetailsPromises)
      runInAction(() => {
        this.newsComments = commentsDetails
      })

      return commentsDetails
    } catch (error) {
      console.error('Ошибка при получении комментариев ', error)
    }
  }
}
