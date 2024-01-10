const bcrypt = require('bcrypt')

exports.createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// password del login  - el de db - return true o false
exports.isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)

// bcryptjs
// 8 -> años días 