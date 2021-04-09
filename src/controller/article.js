const {
    Op
} = require("sequelize")

const {
    response
} = require('./utils')

const Article = require('../Modal/article')
const User = require('../Modal/user')
const Tag = require('../Modal/tag')
const Category = require('../Modal/category')
const TagArticle = require('../Modal/tagArticle')
const UserFavouriteArticle = require('../Modal/userFavouriteArticle')
const UserCollectionArticle = require('../Modal/userCollectionArticle')
const sequelize = require("../sequelize")

async function insertUser(res) {
    const user_Promise = res.rows.map(async (item) => {
        return await User.findOne({
            where: {
                id: item.uid
            },
            attributes: ['id', 'nick_name', 'avatar_url']
        }).then((res) => {
            return {
                ...item,
                user: res
            }
        })

    })
    return await Promise.all(user_Promise)
}

async function insertTag(res) {
    //1.先通过文章id在tag_and_articles表中查询这篇文章所对应的所有tag_id

    const tag_Promise = res.map(async (item) => {
        return await TagArticle.findAll({
            where: {
                article_id: item.id
            }
        }).then(async (res) => {
            //2.拿到这篇文章所有的tag_id后，接着在tag表中查询tag_id对应的类容
            const tag_ids = res.map(item2 => item2.tag_id)
            const last = await Tag.findAll({
                raw: true,
                where: {
                    id: tag_ids
                },
                attributes: ['id', 'name']
            }).then((res) => {
                return res
            })
            const tag = await Promise.all(last)
            return {
                ...item,
                tag
            }
        })

    })
    return await Promise.all(tag_Promise)
}


Article.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id'
})
Article.belongsTo(Category, {
    foreignKey: 'categoryId',
    targetKey: 'id',
})
Article.belongsToMany(Tag, {
    // through: 'tagarticles', 两种都行
    through: TagArticle,
    foreignKey: 'articleId',
    as: 'tags',
});

// 当前用户是否关注、点赞了这篇文章
Article.hasOne(UserFavouriteArticle)
Article.hasOne(UserCollectionArticle)

const utils = {
    getArticleLikeCount() {
        return UserFavouriteArticle.count()
    },
    getArticleCollectCount() {
        return UserCollectionArticle.count()
    },
    getArticleCommentCount() {

    }
}



class articleCtrl {
    //获取首页文章列表
    async getArticleList(ctx) {
        const {
            page = 1, pagesize = 5, categoryId = -1
        } = ctx.request.body
        try {
            const articles = await Article.findAndCountAll({
                limit: pagesize,
                offset: ((page - 1) * pagesize),
                attributes: [
                    'id', 'title', 'isHot', 'userId', 'createdAt', 'updatedAt', 'categoryId', 'visitNum'
                ],
                distinct: true,
                where: categoryId == '-1' ? {} : {
                    categoryId: categoryId
                },
                include: [{
                        model: User,
                        attributes: [
                            ['username', 'author']
                        ],
                        required: false
                    },
                    {
                        model: Category,
                        attributes: [
                            ['name', 'categoryName']
                        ],
                        required: false
                    },
                    {
                        model: Tag,
                        as: 'tags',
                        attributes: ['id', 'name'],
                        through: { //指定连接表中返回的字段
                            attributes: []
                        }
                    }
                ]
            })

            articles.page = page
            articles.pagesize = pagesize
            ctx.response.body = response.ok(articles)
        } catch (error) {
            ctx.response.body = response.err('数据查询出错')
        }

    }
    //获取某一文章详细信息
    async getArticleDetail(ctx) {
        const {
            id,
        } = ctx.request.body;
        try {
            let res = await Article.findOne({
                where: {
                    id: id
                },
                include: [{
                        model: User,
                        attributes: [
                            ['username', 'author']
                        ],
                        required: false,
                    },
                    {
                        model: Category,
                        attributes: [
                            ['name', 'categoryName']
                        ],
                        required: false
                    },
                    {
                        model: Tag,
                        as: 'tags',
                        attributes: ['id', 'name'],
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: UserFavouriteArticle,
                        attributes: ['id'],
                    },
                    {
                        model: UserCollectionArticle,
                        attributes: ['id'],
                    },

                ]
            })
            const likeNum = await utils.getArticleLikeCount() || 0
            const collectNum = await utils.getArticleCollectCount() || 0
            if (res) {
                res.increment('visitNum')
            }
            res = JSON.parse(JSON.stringify(res))
            res.likeNum = likeNum
            res.collectNum = collectNum
            ctx.response.body = response.ok(res)
        } catch {
            ctx.response.body = response.err();
        }
    }
    //通过标签来获取文章列表
    async getArticleListByTag(ctx) {
        const {
            tagId
        } = ctx.request.body
        const articles = await Article.findAndCountAll({
            where: {
                '$tags.id$': {
                    [Op.eq]: tagId
                }
            },
            include: [{
                    model: User,
                    attributes: [
                        ['username', 'author']
                    ],
                    required: false
                },
                {
                    model: Category,
                    attributes: [
                        ['name', 'categoryName']
                    ],
                    required: false
                },
                {
                    model: Tag,
                    as: 'tags',
                    attributes: ['id', 'name'],
                    through: { //指定连接表中返回的字段
                        attributes: [],
                    }
                }
            ]
        })
        ctx.response.body = response.ok(articles)
    }
    //用户点赞或者取消点赞这篇文章
    async changeLikeStatus(ctx) {
        const {
            userId,
            articleId,
            status = 1
        } = ctx.request.body
        try {
            if (status == 1) {
                await UserFavouriteArticle.create({
                    userId,
                    articleId
                })
            } else {
                await UserFavouriteArticle.destroy({
                    where: {
                        userId,
                        articleId
                    }
                })
            }
            ctx.response.body = response.ok()
        } catch (error) {
            ctx.response.body = response.err('修改出错')
        }

    }
    //用户收藏或者取消收藏这篇文章
    async changeCollectStatus(ctx) {
        const {
            userId,
            articleId,
            status = 1
        } = ctx.request.body
        try {
            if (status == 1) {
                await UserCollectionArticle.create({
                    userId,
                    articleId
                })
            } else {
                await UserCollectionArticle.destroy({
                    where: {
                        userId,
                        articleId
                    }
                })
            }
            ctx.response.body = response.ok()
        } catch (error) {
            ctx.response.body = response.err('修改出错')
        }
    }

    async addArticle(ctx) {
        let {
            title,
            userId,
            content,
            isHot,
            categoryId,
            visitNum,
            tags
        } = ctx.request.body
        tags = tags ? tags.split(',') : []
        const newArticle = await Article.create({
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
    async deleteArticle(ctx) {
        const {
            id
        } = ctx.request.body;
        const res = await Article.destroy({
            where: {
                id
            }
        })
        ctx.response.body = res ? response.ok() : response.err()
    }
    async updateArticle(ctx) {
        let {
            id,
            title,
            content,
            isHot,
            categoryId,
            visitNum,
            tags
        } = ctx.request.body
        tags = tags ? tags.split(',') : []
        const newTags = await Tag.findAll({
            where: {
                id: tags
            }
        })
        const article = await Article.findByPk(id)
        article.update({
            title,
            content,
            isHot,
            categoryId,
            visitNum
        })
        const res = await article.setTags(newTags)
        ctx.response.body = res ? response.ok() : response.err()
    }
}


module.exports = new articleCtrl()