const Router = require('express')
const newsRouter = require('./newsRouter')
const itemStoryRoutes = require('./itemStoryRoutes')
const itemCommentRoutes = require('./itemCommentRouter')
const router = new Router()

router.use('/news', newsRouter)
router.use('/item-story', itemStoryRoutes)
router.use('/item-comment', itemCommentRoutes)

module.exports = router
