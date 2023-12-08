# Métodos extras.

db.estudiantes.insertMany([{nombre: "Luis", apellido: "Pérez", edad: 21, correo: "l@gmail.com", curso: "Desarrollo Web", sexo: "h"},{nombre: "Fernando", apellido: "Suaréz", edad: 15, correo: "suarez@gmail.com", curso: "Javascript", sexo: "h"},{nombre: "Pedro", apellido: "Corregidor", edad: 16, correo: "corregidor@gmail.com", curso: "ReactJS", sexo: "h"},{nombre: "Mariana", apellido: "García", edad: 14, correo: "garcia@gmail.com", curso: "NodeJs", sexo: "f"},{nombre: "Sonia", apellido: "Llanera", edad: 21, correo: "m@gmail.com", curso: "ReactJS", sexo: "f"}])
- filtros 
db.estudiantes.find({}, {nombre: 1, _id: 0}) -> primer argumento es el filtro para especificar los campos que quiero ver

- Sort
Ordena asc
- db.estudiantes.find().sort({edad: 1})
- db.estudiantes.find().sort({edad: -1})


- Skip 
db.estudiantes.find().skip(7)

db.estudiantes.find().sort({edad: 1}).skip(7)

- Limit 
db.estudiantes.find().limit(7)
db.estudiantes.find().sort({edad: 1}).skip(13).limit(2) -> 

