const {
    response
} = require('./utils')
const sequelize = require('../sequelize')

const Article = require('../Modal/article')
const User = require('../Modal/user')
const Comment = require('../Modal/comment')

Comment.belongsTo(User)
Comment.hasOne(User, {
    as: 'replyUser',
    foreignKey: 'id',
    sourceKey: 'replyTo',
})
Comment.hasMany(Comment, {
    as: 'children',
    foreignKey: 'pId'
})


class commentCtrl {
    async getComment(ctx) {
        const {
            articleId,
            pagesize = 5,
            page = 1
        } = ctx.request.body
        const comments = await Comment.findAndCountAll({
            limit: pagesize,
            offset: (page - 1) * pagesize || 0,
            attributes: ['id', 'pId', 'replyTo', 'comment', 'createdAt'],
            where: {
                articleId: articleId,
                pId: null,
            },
            include: [{
                    model: User,
                    attributes: ['id', 'username', 'avatar']
                },
                {
                    model: Comment,
                    as: 'children',
                    attributes: ['id', 'pId', 'replyTo', 'comment', 'createdAt'],
                    where: {
                        pId: sequelize.col('children.id')
                    },
                    include: [{
                            model: User,
                            attributes: ['id', 'username', 'avatar']
                        },
                        {
                            model: User,
                            as: 'replyUser',
                            attributes: ['id', 'username', 'avatar'],
                        },
                    ],
                },
                {
                    model: User,
                    as: 'replyUser',
                    attributes: ['id', 'username', 'avatar'],
                },
            ],
            order: [
                ['createdAt', 'desc'],
            ]
        })
        ctx.response.body = response.ok(comments)
    }
    //添加评论 post {uid,article_id,parent_id,content}
    async addComment(ctx) {
        const {
            userId,
            articleId,
            pId,
            replyTo,
            comment,
        } = ctx.request.body
        const newComment = await Comment.create({
            title,
            userId,
            content,
            isHot,
            categoryId,
            visitNum,
            tags
        })
        let tagsRes = await Tag.findAll({
            where: {
                id: tags
            }
        })
        const res = await newArticle.setTags(tagsRes)
        ctx.response.body = res ? response.ok() : response.err()
    }
    //删除评论
    async deleteComment(ctx) {
        const {
            id,
        } = ctx.request.body
        const res = await Comment.destroy({
            where: {
                id
            }
        })
        ctx.response.body = res ? response.ok() : response.err()
    }
    //修改评论
    async updateComment(ctx) {
        const {
            id,
            comment,
        } = ctx.request.body
        const res = Comment.update({
            comment,
        }, {
            where: {
                id
            }
        })
        ctx.response.body = res ? response.ok() : response.err()
    }
}

module.exports = new commentCtrl()