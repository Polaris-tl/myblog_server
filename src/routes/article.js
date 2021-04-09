const Router = require('koa-router')
const koajwt = require('koa-jwt');
const {
    getArticleList,
    getArticleDetail,
    getArticleListByTag,
    changeLikeStatus,
    changeCollectStatus,
    addArticle,
    deleteArticle,
    updateArticle,
} = require('../controller/article')
const router = new Router()
//验证是否授权
const auth = koajwt({
    'secret': "my_token"
})

router.post('/article/list', getArticleList)
router.post('/article/detail', getArticleDetail)
router.post('/article/list/byTag', getArticleListByTag)
router.post('/article/changeLikeStatus', changeLikeStatus)
router.post('/article/changeCollectStatus', changeCollectStatus)
router.post('/article/add', addArticle)
router.post('/article/delete', deleteArticle)
router.post('/article/update', updateArticle)

module.exports = router