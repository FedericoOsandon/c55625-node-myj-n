
const sumaNumeros = (...numeros) => {
    if (numeros.length === 0) return 0 

    if(!numeros.every(numero => typeof numero === 'number')) return null

    return numeros.reduce((sumaTotal, elementoArray) => sumaTotal + elementoArray, 0)
}

module.exports = { sumaNumeros }
