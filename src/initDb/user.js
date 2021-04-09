const User = require('../Modal/user')

const initUser = async () => {
    await User.sync()
    User.create({
        username: 'tangling',
        password: '123'
    })
}

initUser()