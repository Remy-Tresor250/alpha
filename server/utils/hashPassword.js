const bcrypt = require("bcrypt")

const hashPassword = async (password) => {
    const hashedPasswd = await bcrypt.hash(password, 10)

    return hashedPasswd
}

module.exports = hashPassword