class uploadCtrl {
    async avatarUpload(ctx, next) {
        ctx.response.body = {
            filename: ctx.req.file.filename //返回文件名
        }
    }
}

module.exports = new uploadCtrl()