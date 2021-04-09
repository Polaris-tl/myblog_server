const Router = require('koa-router')
const router = new Router()
const {
    getCategoryList,
    addCategory,
    deleteCategory,
    updateCategory
} = require('../controller/category')

router.post('/category/list', getCategoryList)
router.post('/category/add', addCategory)
router.post('/category/delete', deleteCategory)
router.post('/category/update', updateCategory)
module.exports = router