const { Command } = require('commander')

const program = new Command()

program
    .option('-d', 'VAriables para debug', false) // --version forma larga ->  -v forma corta npm i npm install
    .option('-p <port>', 'puerto del servidor', 4000)
    .option('-u <user>', 'usuario del proceso')
    .option('--mode <mode>', 'especifíca el entrono de ejecución de nuestra server', 'development') // development, testing, production
    .option('-l, --letter [letter...]', 'specify letter')  // modo del entorno
    
program.parse()

console.log('option: ', program.opts())
console.log('ARgument: ', program.args)