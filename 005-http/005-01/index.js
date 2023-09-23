const http = require('http')
const cityName = process.argv.slice(2)

const myAPIKey = process.env.myAPIKey
//const url = `http://data.fixer.io/api/latest&access_key=${myAPIKey}&symbols=USD,EUR,RUB`
const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${cityName}`

//https://api.weatherstack.com/current
//https://api.weatherstack.com/current?access_key=${myAPIKey}&query=New York

http.get(url, (res) => {
    const { statusCode } = res
    if (statusCode !== 200) {
        console.log(`statusCode: ${statusCode}`)
        return
    }

    res.setEncoding('utf8')
    let rowData = ''
    res.on('data', (chunk) => rowData += chunk)
    res.on('end', () => {
        let parseData = JSON.parse(rowData)
        console.log(parseData)
    })
}).on('error', (err) => {
    console.error(err)
})
