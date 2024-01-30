import React, { useContext, useEffect, useState } from 'react'
import { Button, Flex, Spin, Typography } from 'antd'
import { Context } from '..'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import './NewsItemPage.css'
import TreeComments from '../components/TreeComments'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { formateDate } from '../function/formateDate'

const { Title, Paragraph } = Typography

const NewsItemPage = observer(() => {
  const { news } = useContext(Context)
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const newsStoryDetails = news.getNewsStory
  const newsComment = news.getNewsComments
  const history = useHistory()

  const handleButtonClick = () => {
    history.push('/')
  }
  useEffect(() => {
    news.fetchNewsCommentsStore()

    news.setShouldUpdateNews(false)

    const fetchData = async () => {
      try {
        if (!newsStoryDetails.length) {
          const resultStory = await news.fetchNewsStoryDetails(id)
          news.setNewsStory(resultStory)

          if (resultStory && !resultStory.error) {
            const resultComment = await news.fetchNewsCommentsStore(id)
            news.setNewsComments(resultComment)
          }
        }
      } catch (error) {
        console.error('Ошибка при получении детали новости:', error)
      }
    }

    fetchData()
  }, [])

  const updateComments = async () => {
    try {
      setIsLoading(true)
      await news.fetchNewsCommentsStore()
    } catch (error) {
      console.error('Ошибка при обновлении комментариев', error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="news-item-page-container">
      <Button type="primary" onClick={handleButtonClick}>
        На главную
      </Button>

      {newsStoryDetails.dead || newsStoryDetails.deleted ? (
        <Title className="news-item-page__title">
          К сожалению, новость удалена
        </Title>
      ) : !newsStoryDetails || !newsStoryDetails.title ? (
        <Flex align="center" gap="middle">
          <Spin className="news-item-page__loading" size="large" />
          <div>{!newsStoryDetails} </div>
        </Flex>
      ) : (
        <Typography>
          <Title className="news-item-page__title">
            {newsStoryDetails.title}
          </Title>
          <Paragraph className="news-item-page__info">
            <a href={newsStoryDetails.url} target="_blank" rel="noreferrer">
              {newsStoryDetails.url}
            </a>
            <div>
              <span className="news-item-page__description">
                Рейтинг: {newsStoryDetails.score}
              </span>
              <span className="news-item-page__description">
                Автор: {newsStoryDetails.by}
              </span>
              <span>Опубликовано в {formateDate(newsStoryDetails.time)}</span>
            </div>
          </Paragraph>
          <Paragraph>
            <div
              className="news-item-page__text"
              dangerouslySetInnerHTML={{ __html: newsStoryDetails.text }}
            ></div>
          </Paragraph>
          <Paragraph className="news-item-page__comments">
            Количество комментариев: {newsStoryDetails.descendants}
          </Paragraph>
          <Button
            className="news-item-page__comments__button"
            type="primary"
            onClick={updateComments}
          >
            Обновить комментарии
          </Button>
          {isLoading ? (
            <Flex align="center" gap="middle">
              <Spin className="news-page__loading" size="large" />
            </Flex>
          ) : (
            ''
          )}
          {newsComment && <TreeComments data={newsComment} />}
        </Typography>
      )}
    </div>
  )
})

export default NewsItemPage
