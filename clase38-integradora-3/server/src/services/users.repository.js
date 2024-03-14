class UserRepository {
    constructor(dao){
        this.dao = dao
    }

    getUsers = async () => {
        return await this.dao.get()
    }
    getUser = async (filter) => {
        return await this.dao.getBy(filter)
    }
    createUser = async (newUser) => {
        return await this.dao.create(newUser)
    }
    updateUser = async (uid, userToUpdate) => {
        return await this.dao.update(uid, userToUpdate)
    }
    deleteUser = async (uid) => {
        return await this.dao.delete(uid)
    }
}

module.exports = UserRepository