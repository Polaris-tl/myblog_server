const Router = require('koa-router')
const koajwt = require('koa-jwt')
const {
    getComment,
    addComment,
    deleteComment,
    updateComment,
} = require('../controller/comment')
const router = new Router()

//验证是否授权
const auth = koajwt({
    'secret': "my_token"
})
//验证是是否是本id
const checkOwner = async (ctx, next) => {
    if (ctx.request.body.uid != ctx.state.user.id) {
        ctx.throw(401, '您没有权限')
    }
    await next()
}

router.post('/comment/list', getComment)
router.post('/comment/add', addComment)
router.post('/comment/delete', deleteComment)
router.post('/comment/update', updateComment)

module.exports = router