const Router = require("koa-router")
const koajwt = require('koa-jwt');
const {
    getUser,
    login,
    register,
    getUserList,
    deleteUser,
    updateUser,
} = require('../controller/user')
const router = new Router()

//验证是否授权
const auth = koajwt({
    'secret': "my_token"
})
//验证是是否是本id
const checkOwner = async (ctx, next) => {
    if (ctx.params.id != ctx.state.user.id) {
        ctx.throw(401, '您没有权限')
    }
    await next()
}
//超级用户权限
const withSuper = async (ctx, next) => {
    if (ctx.state.user.role != 'superAdmin') {
        ctx.throw(401, '您没有权限')
    }
    await next()
}
//管理员权限
const withAdmin = async (ctx, next) => {
    if (ctx.state.user.role != 'admin') {
        ctx.throw(401, '您没有权限')
    }
    await next()
}

router.post('/login', login);
router.post('/register', register);

// router.post('/user/detail', auth, checkOwner, getUser);
// router.post('/user/list', auth, withSuper, getUserList);
// router.post('/user/delete', auth, withSuper, deleteUser);
// router.post('/user/update', auth, withSuper, modifyUser);

router.post('/user/detail', getUser);
router.post('/user/list', getUserList);
router.post('/user/delete', deleteUser);
router.post('/user/update', updateUser);



module.exports = router