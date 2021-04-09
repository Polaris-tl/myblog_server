const jwt = require('jsonwebtoken')
const {
    DataTypes
} = require('sequelize')
const sequelize = require('../sequelize')
const {
    response
} = require('./utils')

const Category = require('../Modal/category')
const Article = require('../Modal/article')

Category.belongsTo(Article, {
    foreignKey: 'id',
    targetKey: 'categoryId'
})


class CategoryCtrl {
    async getCategoryList(ctx) {
        try {
            const res = await Category.findAll({
                distinct: true,
                attributes: ['id', 'name', 'createdAt', [sequelize.fn('COUNT', sequelize.col('article.categoryId')), 'count']],
                include: [{
                    model: Article,
                    duplicating: false,
                    attributes: []
                }],
                group: ['category.id']
            })
            ctx.response.body = response.ok(res)
        } catch (e) {
            ctx.response.body = response.err()
        }
    }
    async addCategory(ctx) {
        const {
            name
        } = ctx.request.body;
        const res = await Category.create({
            name
        })
        ctx.response.body = res ? response.ok() : response.err()
    }
    async deleteCategory(ctx) {
        const {
            id
        } = ctx.request.body;
        const res = await Category.destroy({
            where: {
                id
            }
        })
        ctx.response.body = res ? response.ok() : response.err()
    }
    async updateCategory(ctx) {
        const {
            id,
            name
        } = ctx.request.body;
        const res = await Category.update({
            name
        }, {
            where: {
                id
            }
        })
        ctx.response.body = res ? response.ok() : response.err()
    }
}

module.exports = new CategoryCtrl()