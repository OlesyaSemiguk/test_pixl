import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewsItemPage from '../page/NewsItemPage'
import NewsPage from '../page/NewsPage'

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/news/:id" component={NewsItemPage} />
      <Route path="/" component={NewsPage} />
    </Switch>
  )
}

export default AppRouter
