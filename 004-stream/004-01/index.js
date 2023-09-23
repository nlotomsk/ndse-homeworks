const readline = require('node:readline')
const { stdin: input, stdout: output } = require('node:process')
const rl = readline.createInterface({ input, output })

const fs = require('fs')

const fileName = process.argv.slice(2)
console.log('\n Консольная игра «Орёл или решка»\n Ваш ход.\n орел или решка? \n')

function LogStr(format, result, input, total) {

    this.format = format,
        this.result = result,
        this.input = input
}

rl.on('line', (input) => {
    const result = (Math.floor(Math.random() * 2) === 0) ? "орел" : "решка";
    if (input === result) {
        console.log(`\n-----Выиграл-----\n`)
        rl.close()
    } else {
        console.log(`-----Не в этот раз. Удача близка----- \n`)
        console.log('\n Попробуй еще.\n')
    }
    const date = new Date
    const format = date.toLocaleString()
    const str1 = new LogStr(format, result, input)
    fs.appendFile(fileName[0], `${JSON.stringify(str1)}\n`, (err) => {
        if (err) throw Error(err)
    })
});