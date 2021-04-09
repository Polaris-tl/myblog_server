const TagArticle = require('../Modal/tagArticle')

const initTagArticle = async () => {
    await TagArticle.sync()
    // TagArticle.create({
    //     tagId: '04d0c364-be68-420f-b64d-8cc960a3e497',
    //     articleId: '99897511-503a-4836-aebd-629ce3f4f280'
    // })
}

initTagArticle()