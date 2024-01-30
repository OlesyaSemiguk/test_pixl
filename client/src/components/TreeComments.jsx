import React, { useState, useEffect } from 'react'
import './TreeComments.css'
import { fetchNewsComment } from '../http/NewsApi'
import { formatDateTime } from '../function/formateDate'

const TreeComments = (props) => {
  const { data } = props
  const [openComments, setOpenComments] = useState({})
  const [nestedComments, setNestedComments] = useState({})

  const toggleComments = (index, event) => {
    event.stopPropagation()
    setOpenComments((prevOpenComments) => ({
      ...prevOpenComments,
      [index]: !prevOpenComments[index],
    }))
  }

  const fetchNestedComments = async (ids, index) => {
    const nestedCommentsPromises = ids.map(async (id) => {
      const response = await fetchNewsComment(id)
      return response
    })

    const nestedCommentsData = await Promise.all(nestedCommentsPromises)
    setNestedComments((prevNestedComments) => ({
      ...prevNestedComments,
      [index]: nestedCommentsData,
    }))
  }

  useEffect(() => {
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        if (item.kids && openComments[index] && !nestedComments[index]) {
          fetchNestedComments(item.kids, index)
        }
      })
    }
  }, [data, openComments, nestedComments])

  return (
    <div className="tree-comments">
      {data.length
        ? data.map((item, index) => (
            <div key={item.id} className={`tree-comments__comment-wrapper`}>
              <div
                className={`tree-comments__comment`}
                onClick={(event) => toggleComments(index, event)}
              >
                <span className="tree-comments__comment__by">{item.by}</span>
                <span className="tree-comments__comment__time">
                  {formatDateTime(item.time)}
                </span>
                <div
                  className={`tree-comments__comment__text`}
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
                <div className={`tree-comments__comment__text__after `}>
                  {item.kids && !openComments[index] && 'показать комментарии'}
                  {item.kids && openComments[index] && 'скрыть комментарии'}
                </div>
              </div>
              {item.kids && openComments[index] && nestedComments[index] && (
                <TreeComments data={nestedComments[index]} />
              )}
            </div>
          ))
        : ''}
    </div>
  )
}

export default TreeComments
