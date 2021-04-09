const jwt = require('jsonwebtoken')
const {
    DataTypes
} = require("sequelize")
const sequelize = require('../sequelize')

const {
    response
} = require('./utils')


const User = require('../Modal/user')

class userCtrl {
    //登录
    async login(ctx, next) {
        let {
            username,
            password
        } = ctx.request.body

        const userInfo = await User.findOne({
            raw: true,
            attributes: ['id', 'username', 'email', 'avatar', 'role', 'motto', 'github', 'juejin', 'jianshu', 'csdn'],
            where: {
                username,
                password
            }
        })

        if (!userInfo) {
            return ctx.response.body = response.err('用户名或密码错误！')
        }

        //设置token
        const token = jwt.sign({
            name: userInfo.username,
            id: userInfo.id,
            role: userInfo.role
        }, 'my_token', {
            expiresIn: '2h'
        });

        delete userInfo.password
        ctx.response.body = {
            token: token,
            data: {
                ...userInfo,
            },
            success: true
        };

    }
    // 注册 添加用户
    async register(ctx) {
        const {
            username,
            password,
        } = ctx.request.body
        const res = await User.findOne({
            where: {
                username
            }
        })
        if (res) {
            return ctx.response.body = response.err('用户已注册')
        }
        await User.create({
            username,
            password,
        }).then(() => {
            ctx.response.body = response.ok()
        }).catch(() => {
            response.err('注册失败')
        })
    }
    //获取用户本人的信息 
    async getUser(ctx) {
        let {
            id
        } = ctx.request.body
        const userInfo = await User.findOne({
            attributes: ['id', 'username', 'email', 'avatar', 'role', 'motto', 'github', 'juejin', 'jianshu', 'csdn'],
            where: {
                id
            }
        })
        ctx.response.body = userInfo ? response.ok(userInfo) : response.err()
    }

    //获取用户列表
    async getUserList(ctx) {
        const {
            page = 1, pagesize = 5
        } = ctx.request.body
        const userList = await User.findAndCountAll({
            limit: pagesize,
            offset: ((page - 1) * pagesize),
            attributes: ['id', 'username', 'email', 'avatar', 'role', 'motto', 'github', 'juejin', 'jianshu', 'csdn'],
        })
        userList.page = page
        userList.pagesize = pagesize
        ctx.response.body = userList ? response.ok(userList) : response.err()
    }
    //删除用户
    async deleteUser(ctx) {
        const {
            id
        } = ctx.request.body
        const res = await User.destroy({
            where: {
                id
            }
        })
        ctx.response.body = res ? response.ok() : response.err()
    }
    //修改用户
    async updateUser(ctx) {
        const {
            id,
            password,
            role,
            email,
            motto,
            avatar,
            github,
            csdn,
            juejin,
            jianshu
        } = ctx.request.body
        const res = await User.update({
            password,
            role,
            email,
            motto,
            avatar,
            github,
            csdn,
            juejin,
            jianshu
        }, {
            where: {
                id: id
            }
        })
        ctx.response.body = res ? response.ok() : response.err()
    }
}
module.exports = new userCtrl()