const Tag = require('../Modal/tag')


const initTag = async () => {
    await Tag.sync()
    Tag.create({
        name: '漏得',
    })
    Tag.create({
        name: '大数据',
    })
}

initTag()