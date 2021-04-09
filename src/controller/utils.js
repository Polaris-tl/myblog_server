const response = {
    err: (err = '数据库查询出错') => {
        return {
            message: err,
            success: false
        }
    },
    ok: (data, message) => {
        return {
            data,
            message,
            success: true
        }
    }
}

module.exports = {
    response
}