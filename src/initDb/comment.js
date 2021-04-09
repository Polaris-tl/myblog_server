const Comment = require('../Modal/comment')

const init = async () => {
    await Comment.sync({
        force: true
    })
}

init()