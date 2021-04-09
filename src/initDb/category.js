const Category = require('../Modal/category')

const initCategory = async () => {
    await Category.sync()
    Category.create({
        name: '前端',
    })
    Category.create({
        name: '后端',
    })
}

initCategory()