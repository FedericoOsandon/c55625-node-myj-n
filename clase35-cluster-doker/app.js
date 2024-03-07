const cluster = require('cluster')
const { cpus } = require('os')

const { appListen } = require("./src/server")
const { logger } = require('./src/utils/logger')

const numeroDeProcesadores = cpus().length
// console.log(numeroDeProcesadores)




// console.log('Process is primary: ',cluster.isPrimary)

if (cluster.isPrimary) {
    logger.info('Proceso primario, que va a generar workers')
    // Vamos a crear un proceso por cada hilo  de nuestro cpu
    for (let i = 0; i < numeroDeProcesadores; i++) {
        cluster.fork()       
    }

    cluster.on('message', worker => {
        logger.info(`Mensaje recibido de el worker ${worker.process.pid}`)
    })
} else {
    logger.info('El ser un workers, no cuento como primario, por lo tanto process.isPrimary = false')
    logger.info(`Soy un proceso worker con el id${process.pid}`)

    appListen()
}