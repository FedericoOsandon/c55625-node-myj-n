
const { UserDto } = require("../dtos/usersDto")

class UserRepository {
    constructor(dao){
        this.dao = dao
    }
    
    getUsers = async () => await this.dao.get()
    getUser = async (filter) => await this.dao.getBy(filter)
    createUser = async (newUser) => {
        const newUserDto = new UserDto(newUser)
        return await this.dao.create(newUserDto)
    }
    updateUser = async (uid, userToUpdate) => await this.dao.update(uid, userToUpdate)
    deleteUser = async (uid) => await this.dao.delete(uid)
}

module.exports = {
    UserRepository
}