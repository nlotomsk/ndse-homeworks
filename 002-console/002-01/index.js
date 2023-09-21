#!/usr/bin/env node

var argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: $0 <cmd>  [option]') // usage string of application.
    .command('current [option]', 'Текущая дата и время в формате ISO', {}, (argv) => {
        date = new Date
        if (argv.year) {
            console.log(`Текущий год: ${date.getFullYear()}`)
        } else if (argv.month) {
            console.log(`Текущий месяц: ${date.getMonth() + 1}`)
        } else if (argv.date) {
            console.log(`Дата в календарном месяце: ${date.getDate()}`)
        } else {
            console.log(`Текущая дата и время в формате ISO:\n${new Date}`)
        }
    }) // describe commands available.
    .command('add [option]', 'Дата и время в формате ISO будущее', {}, (argv) => {
        const currentDate = new Date()
        if (argv.year) {
            currentDate.setFullYear(currentDate.getFullYear() + argv.option)
            console.log(`Дата и время будет через ${argv.option} лет:\n${currentDate}`)
        } else if (argv.month) {
            currentDate.setMonth(currentDate.getMonth() + argv.option)
            console.log(`Дата и время будет через ${argv.option} месяцев:\n${currentDate}`)
        } else if (argv.date) {
            currentDate.setDate(currentDate.getDate() + argv.option)
            console.log(`Дата и время будет через ${argv.option} дней:\n${currentDate}`)
        } 
    })
    .command('sub [option]', 'Дата и время в формате ISO будущее', {}, (argv) => {
        const currentDate = new Date()
        if (argv.year) {
            currentDate.setFullYear(currentDate.getFullYear() - argv.option)
            console.log(`Дата и время была ${argv.option} лет:\n${currentDate}`)
        } else if (argv.month) {
            currentDate.setMonth(currentDate.getMonth() - argv.option)
            console.log(`Дата и время была ${argv.option} месяцев:\n${currentDate}`)
        } else if (argv.date) {
            currentDate.setDate(currentDate.getDate() - argv.option)
            console.log(`Дата и время была ${argv.option} дней:\n${currentDate}`)
        } 
    })
    .option('year', {
        alias: "y",
        type: "boolean",
        description: "Текущий год",
    })
    .option('month', {
        alias: "m",
        type: "boolean",
        description: "Текущий месяц",
    })
    .option('date', {
        alias: "d",
        type: "boolean",
        description: "Дата в календарном месяце",
    })
    .option('h', {
        alias: 'help',
        description: 'display help message'
    })
    .help('help')
    .version('1.1.0', 'version', 'display version information') // the version string.
    .alias('version', 'v')
    .example('cmd current -y', 'Текущий год')
    .epilog('for more information visit https://github.com/chevex/yargs')
    // disable showing help on failures, provide a final message
    // to display for errors.
    .showHelpOnFail(false, 'whoops, something went wrong! run with --help')
    .argv;