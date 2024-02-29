const { faker } = require('@faker-js/faker')

const generateProduc= ()=>{
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        departement: faker.commerce.department(),
        // stock: faker.random.numeric(),
        stock: faker.string.numeric(),
        description: faker.commerce.productDescription(),
        id: faker.database.mongodbObjectId(),
        // image: faker.image.image()
        image: faker.image.url()
    }
}


exports.generateUser = () => {
    // let numOfProductos = parseInt(faker.random.numeric(1, {bannedDigits: ['0']}))
    let numOfProductos = parseInt(faker.string.numeric(1, {bannedDigits: ['0']}))
    let products = []
    for (let i = 0; i < numOfProductos; i++) {
        products.push(generateProduc())        
    }
    return {
        // first_name: faker.name.firstName(),
        first_name: faker.person.firstName(),
        // last_name: faker.name.lastName(),
        last_name: faker.person.lastName(),
        // sex: faker.name.sex(),
        sex: faker.person.sex(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        image: faker.image.avatar(),
        id: faker.database.mongodbObjectId(),
        email: faker.internet.email(),
        products
    }
}