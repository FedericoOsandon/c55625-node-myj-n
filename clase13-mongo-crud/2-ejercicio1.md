db.createCollection('estudiantes')

db.estudiantes.insertMany([{nombre: "Juan", apellido: "Pérez", edad: 16, correo: "p@gmail.com", curso: "Desarrollo Web", sexo: "h"},{nombre: "Federico", apellido: "Osandón", edad: 18, correo: "f@gmail.com", curso: "Javascript", sexo: "h"},{nombre: "Lucas", apellido: "Sánchez", edad: 21, correo: "s@gmail.com", curso: "ReactJS", sexo: "h"},{nombre: "María", apellido: "Rodriguez", edad: 22, correo: "r@gmail.com", curso: "NodeJs", sexo: "f"},{nombre: "Sofía", apellido: "Martínez", edad: 21, correo: "m@gmail.com", curso: "ReactJS", sexo: "f"}])

db.estudiantes.insertOne({nombre: 'Daniel',apellido: 'Monterrey', curso: 'Javascript'})

db.estudiantes.find()

db.estudiantes.find({sexo: 'h'})

db.estudiantes.countDocuments()

db.estudiantes.countDocuments({sexo: 'f'})
