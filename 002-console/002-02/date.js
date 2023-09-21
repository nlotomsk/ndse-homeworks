#!/usr/bin/env node

const readline = require('node:readline')
const { stdin: input, stdout: output } = require('node:process')
const rl = readline.createInterface({ input, output })

var random_number = Math.floor(Math.random() * 101); // generate random number between 0 and 1
//console.log(random_number)
console.log('\n Загадано число в диапазоне от 0 до 100 \n')

rl.on('line', (input) => {
    if (input < random_number) {
        console.log(`\n-----Больше-----\n`)
    } else if (input > random_number) {
        console.log(`\n-----Меньше-----\n`)
    } else {
        console.log(`\n-----Угадал!!!----- \n`)
        rl.close();
    }
});

// } else {
//   rl.close()
//}

//});