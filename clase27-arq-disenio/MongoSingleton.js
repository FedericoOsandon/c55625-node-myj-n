const { connect } = require('mongoose')


class MongoSingleton {
    static #instance

    constructor(url){
        connect('mongodb://localhost:27017/comision32270')
    }

    static getInstance(url){
        if (this.#instance) {
            console.log('Ya está conectada')
            return this.#instance
        }

        this.#instance = new MongoSingleton(url)
        console.log('conected')
        return this.#instance
    }
}

module.exports = MongoSingleton


// const mongoInstance = MongoSingleton.getInstance()
// const otherMongoInstance = MongoSingleton.getInstance()
// MongoSingleton.getInstance()