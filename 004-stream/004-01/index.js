const readline = require('node:readline')
const { stdin: input, stdout: output } = require('node:process')
const rl = readline.createInterface({ input, output })

const fs = require('fs')
const path = require('path')

const fileName = process.argv.slice(2)//.map(n => +n)

console.log(fileName[0])

const result = (Math.floor(Math.random() * 2) === 0) ? "орел" : "решка";

console.log(result)

console.log('\n Консольная игра «Орёл или решка» \n')

rl.on('line', (input) => {
    //const answer = input

    if (input === result) {

        console.log(input)

        console.log(`\n-----Выиграл-----\n`)
        //rl.close();
    } else {

        console.log(input)
        console.log(`\n-----Не в этот раз. Удача близка----- \n`)
        //rl.close();
    }
    const date = new Date
    const format = date.toLocaleString()
    const content = `${format} Загадано: ${result} Ответ: ${input}\n`

    const file = path.join(__dirname, '', fileName[0])
    // const content = 'content \n'

    fs.appendFile(file, content, (err) => {
        if (err) throw Error(err)
        console.log('file rewrite')
    })
    rl.close();

});
//rl.emit(ReadableStream)
// console.log(rl.emit(ReadableStream))
// //const answer = input
// const date = new Date
// const format = date.toLocaleString()
// const content = `${format} Загадано: ${result} Ответ: ${answer} \n`

// const writeStr = fs.createWriteStream(fileName[0])
// writeStr.write(content, 'utf-8')
// writeStr.end()

// writeStr.on('finish', () => {
//     console.log('Finish')
// })
// writeStr.on('close', () => {
//     console.log('close')
// })
// writeStr.on('err', () => {
//     console.error('err')
// })
// const dir = path.join(__dirname, 'log')

// fs.mkdir(dir, (err) => {
//     if (err) throw Error(err)
//     console.log('ok')
// })
// const file = path.join(__dirname, '', fileName[0])
// // const content = 'content \n'

// fs.appendFile(file, content, (err) => {
//     if (err) throw Error(err)
//     console.log('file rewrite')
// })