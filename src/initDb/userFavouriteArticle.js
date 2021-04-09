const UserFavouriteArticle = require('../Modal/userFavouriteArticle')

const initUserFavouriteArticle = async () => {
    await UserFavouriteArticle.sync()
}
initUserFavouriteArticle()