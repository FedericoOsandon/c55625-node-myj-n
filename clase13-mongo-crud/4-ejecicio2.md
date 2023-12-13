db.createCollection('clientes')

1- db.clientes.insertMany([{nombre: 'Pablo', edad: 25}, {nombre: 'Juan', edad: 22}, {nombre: 'Lucia', edad: 25}, {nombre: 'Juan', edad: 29}, {nombre: 'Fede', edad: 35}])

2- db.clientes.find().sort({edad: -1})
3- db.clientes.find().sort({edad: 1}).limit(1)
4- db.clientes.find().sort({edad: 1}).skip(1).limit(1)
5- db.clientes.find({nombre: 'Juan'})
6- db.clientes.find({nombre: 'Juan', edad: 29})
7- db.clientes.find({ $or: [{nombre: 'Juan'}, {nombre: 'Lucia'}] })
8- db.clientes.find({ edad: {$gt: 25} }) Mayor
8- db.clientes.find({ edad: {$gte: 25} }) 
9- db.clientes.find({ edad: {$lte: 25}})
9- db.clientes.find({ edad: {$lt: 25}}) Menor extricto
10- db.clientes.find({edad: {$ne: 25}})
11- db.clientes.find({edad: {$gt: 25, $lt: 36}})
11- db.clientes.find({edad: {$gte: 25, $lte: 35}})
12- db.clientes.updateOne({nombre: 'Fede'}, {$set: {edad: 36}})
db.clientes.find({edad: {$gt: 25, $lt: 36}})
13- db.clientes.updateMany({edad: 25}, {$inc: {edad: 1}})
db.clientes.find({edad: {$gt: 25, $lt: 36}})
14- db.clientes.deleteMany({nombre: 'Juan'})
15- db.clientes.deleteMany({})