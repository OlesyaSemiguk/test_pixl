const Router = require('express')
const router = new Router()
const itemStoryController = require('../controllers/itemStoryController')

router.get('/:id', itemStoryController.getItem)

module.exports = router
