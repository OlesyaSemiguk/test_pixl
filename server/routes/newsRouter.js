const Router = require('express')
const newsController = require('../controllers/newsController')
const router = new Router()

router.get('/', newsController.getNews)

module.exports = router
