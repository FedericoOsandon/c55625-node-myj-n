// const suma = (num1,num2) => {
//     if(!num1 || !num2) return 0
//     if(typeof num1 !== 'number' || typeof num2 !== 'number') return null
//     let result = num1 + num2
//     return result
// }


// const suma = (...numeros) => {
//     // if(!num1 || !num2) return 0
//     if(numeros.length === 0) return 0

//     let  validInput = true 
//     for (let i = 0; i < numeros.length && validInput; i++) {        
//         if (typeof numeros[i] !== 'number') {
//             validInput = false
//         }
//     }

//     if(!validInput) return null

//     let result = 0
//     for (let i = 0; i < numeros.length; i++) {
//         result += numeros[i]        
//     }
//     return result
// }

const suma = (...numeros)=>{
    if(numeros.length === 0) return 0
    if (!numeros.every( numero => typeof numero === 'number'))  return null
    return numeros.reduce((sumaTotal, numero)=> sumaTotal + numero, 0)
}

// escenarios posibles

// suma(2, '2') -> null 
// suma() -> 0
// suma(2, 2)  -> pasar correctamente
// suma(2,2,2,2,2) 
let testPasados = 0
let testTotales = 4

console.log('-------------------------------------------------------------')
console.log('Test 1: la fución debe devolver null si algún parámetro no es numérico')
let resultadoTest1 = suma('2',2)
if (resultadoTest1 === null) {
    console.log('Test 1 pasado')
    testPasados++
} else {
    console.log(`Test 1 no ha pasado, se recibió ${typeof resultadoTest1} pero se esperaba null`)
}

console.log('-------------------------------------------------------------')
console.log('Test 2: la fución debe devolver 0 si no se paso algún parámetro')
let resultadoTest2 = suma()
if (resultadoTest2 === 0) {
    console.log('Test 2 pasado')
    testPasados++
} else {
    console.log(`Test 2 no ha pasado, se recibió ${resultadoTest2} pero se esperaba 0`)
}

console.log('-------------------------------------------------------------')
console.log('Test 3: la fución debe devolver la suma correctamente.')
let resultadoTest3 = suma(2,3)
if (resultadoTest3 === 5) {
    console.log('Test 3 pasado')
    testPasados++
} else {
    console.log(`Test 3 no ha pasado, se recibió ${resultadoTest3} pero se esperaba 5`)
}

console.log('-------------------------------------------------------------')
console.log('Test 4: la fución debe realizar la suma con cualquier cantidad de parámetros.')
let resultadoTest4 = suma(1,2,3,4,5)
if (resultadoTest4 === 15) {
    console.log('Test 4 pasado')
    testPasados++
} else {
    console.log(`Test 4 no ha pasado, se recibió ${resultadoTest4} pero se esperaba 15`)
}

if (testPasados === testTotales)  console.log('Todos los test pasaron correctamente')
else console.log(`Han pasados ${testPasados} de ${testTotales} test.`)


