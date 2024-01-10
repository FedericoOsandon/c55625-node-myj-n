const { usersModel } = require("../../models/users.model")

class UserDaoMongo { // manager User
    constructor() {
        //  iniciar la base de datos
        this.userModel = usersModel
    }


}
    
module.exports = UserDaoMongo
    