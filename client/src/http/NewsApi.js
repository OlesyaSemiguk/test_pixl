export const fetchNews = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}api/news`)
  const NewsStoryIds = await response.json()
  return NewsStoryIds
}

export const fetchNewsStory = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}api/item-story/${id}`
  )
  const NewsStoryIds = await response.json()
  return NewsStoryIds
}

export const fetchNewsComment = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}api/item-comment/${id}`
  )
  const NewsCommentIds = await response.json()
  return NewsCommentIds
}
