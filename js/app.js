const https = require('https')
const fs = require('fs')
const { METHODS} = require('http')

const options = {
    hostname: 'en.wikipedia.org',
    port: 443,
    path: '/wiki/George_Washington',
    method: 'GET'
}

const request = https.request(options, response => {
    let responseBody = '';
    

    console.log('Response from server started')
    console.log(`Server status: ${response.statusCode}`)
    console.log(`Server status: ${response.headers}`)

    response.setEncoding('utf-8')

    response.once('data', chunk => {
        console.log(chunk);
    })
    response.on('data', chunk => {
        responseBody += chunk;
        console.log(`chunk --${chunk.length}`)
    })
    response.on('end', () => {
        fs.writeFile('george-washington.html',responseBody, err => {
            if (err) throw err;
            console.log('file downloaded')
        })
    })
})

request.end();