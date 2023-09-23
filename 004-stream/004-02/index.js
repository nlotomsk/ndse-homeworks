const fs = require('fs')

const fileName = process.argv.slice(2)

const readStream = fs.readFileSync(fileName[0], 'utf8').toString().trim().split("\n")

let count = 0
for (i in readStream) {
    const dataParsed = JSON.parse(readStream[i])

    if (dataParsed.result == dataParsed.input) {
        count += 1
    }
}
console.log(`\nВсего игр: ${readStream.length} \n Выиграно/Проиграно: ${count}/${readStream.length - count}\n Процент выигрышей: ${(count * 100) / readStream.length} %\n`)