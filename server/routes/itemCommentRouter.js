const Router = require('express')
const router = new Router()
const itemCommentController = require('../controllers/itemCommentController')

router.get('/:id', itemCommentController.getItem)

module.exports = router
