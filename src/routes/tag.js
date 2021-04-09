const Router = require('koa-router')
const router = new Router()
const {
    getTags,
    addTag,
    deleteTag,
    updateTag
} = require('../controller/tag')

router.post('/tag/list', getTags)
router.post('/tag/add', addTag)
router.post('/tag/delete', deleteTag)
router.post('/tag/update', updateTag)

module.exports = router