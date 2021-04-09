const {
    DataTypes
} = require('sequelize')
const sequelize = require('../sequelize')
const Tag = require('../Modal/tag')
const TagArticle = require('../Modal/tagArticle')
const {
    response
} = require('./utils')
Tag.belongsTo(TagArticle, {
    foreignKey: 'id',
    targetKey: 'tagId'
})

class tagCtrl {
    //获取所有tag
    async getTags(ctx) {
        const res = await Tag.findAll({
            distinct: true,
            attributes: ['id', 'name', 'createdAt', [sequelize.fn('COUNT', sequelize.col('tagarticle.tagId')), 'count']],
            include: [{
                model: TagArticle,
                duplicating: false,
                attributes: []
            }],
            group: ['tag.id']
        })
        ctx.response.body = res ? response.ok(res) : response.err()
    }
    async addTag(ctx) {
        const {
            name
        } = ctx.request.body;
        const res = await Tag.create({
            name
        })
        ctx.response.body = res ? response.ok() : response.err()
    }
    async deleteTag(ctx) {
        const {
            id
        } = ctx.request.body;
        const res = await Tag.destroy({
            where: {
                id
            }
        })
        ctx.response.body = res ? response.ok() : response.err()
    }
    async updateTag(ctx) {
        const {
            id,
            name
        } = ctx.request.body;
        const res = await Tag.update({
            name
        }, {
            where: {
                id
            }
        })
        ctx.response.body = res ? response.ok() : response.err()
    }
}

module.exports = new tagCtrl()