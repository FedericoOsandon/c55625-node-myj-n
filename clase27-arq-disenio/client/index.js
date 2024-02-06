console.log('index')

function peticion(){
    fetch('http://localhost:8080/api/productos')
    .then(respuesta => respuesta.json())
    .then(respuesta => console.log(respuesta))
    .catch(err => console.log(err))
}

// *