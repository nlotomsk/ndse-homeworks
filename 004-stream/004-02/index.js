const fs = require('fs')

const fileName = process.argv.slice(2)

console.log(fileName[0])

//const readStream = fs.createReadStream(fileName[0])

const readStream = fs.readFileSync(fileName[0], 'utf8').toString().trim().split("\n")

console.log(readStream)

for (i in readStream) {
    const dataParsed = JSON.parse(readStream[i])
    console.log(dataParsed);
}
//const dataParsed = JSON.parse(readStream)

//console.log(dataParsed)
// let data
// dataParsed
//     .setEncoding('UTF-8')
//     .on('data', (chank) => {
//         data += chank
//     })
//     .on('end', () => {
//         console.log('end', data)
//     })


console.log(`\nВсего игр: \n Выиграно/Проиграно: \n Процент выигрышей:\n`)