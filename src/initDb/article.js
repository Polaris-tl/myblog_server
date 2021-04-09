const Article = require('../Modal/article')
const data = require('./article-data')

const initArticle = async () => {
    await Article.sync()
    // data.map((item) => {
    //     Article.create(item)
    // })
}

initArticle()