import React, { useContext, useEffect, useState } from 'react'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import { Button, Flex, List, Spin } from 'antd'
import './NewsPage.css'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { formateDate } from '../function/formateDate'

const NewsPage = observer(() => {
  const { news } = useContext(Context)
  const newsDetails = news.getNewsDetails

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    news.setShouldUpdateNews(true)
    updateNews(false)
  }, [])

  const updateNews = async (isLoading) => {
    try {
      setIsLoading(isLoading)
      await news.updateNews()
    } catch (error) {
      console.error('Ошибка при обновлении новостей:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="news-page-container">
      <Button type="primary" onClick={() => updateNews(true)}>
        Обновить
      </Button>
      {isLoading || !newsDetails.length ? (
        <Flex align="center" gap="middle">
          <Spin className="news-page__loading" size="large" />
        </Flex>
      ) : (
        ''
      )}

      <List
        itemLayout="horizontal"
        dataSource={newsDetails}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link
                  to={`/news/${item.id}`}
                  onClick={() => {
                    news.setNewsStory(
                      newsDetails.find((news) => news.id === item.id)
                    )
                  }}
                >
                  {item.title}
                </Link>
              }
              description={
                <div>
                  <span className="news-page__description">
                    Рейтинг: {item.score}
                  </span>
                  <span className="news-page__description">
                    Автор: {item.by}
                  </span>
                  <span>Опубликовано в {formateDate(item.time)}</span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
})

export default NewsPage
