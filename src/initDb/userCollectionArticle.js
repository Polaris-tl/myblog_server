const UserCollectionArticle = require('../Modal/userCollectionArticle')

const initUserCollectionArticle = async () => {
    await UserCollectionArticle.sync()
}
initUserCollectionArticle()