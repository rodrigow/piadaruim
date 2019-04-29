
const express = require('express')
const path = require('path')
const helmet = require('helmet')

const Promise = require('bluebird')
const sqlite = require('sqlite')
const dbPromise = sqlite.open('./piadaruim.sqlite', { Promise })

const server = express()
const port = 15751

server.use(helmet())
server.use('/', express.static(path.join(__dirname, 'frontend/build')))

server.get('/resources/joke', async function (req, res, next) {
    try {
        const db = await dbPromise
        const [ joke ] = await Promise.all([db.get('SELECT * FROM Jokes ORDER BY RANDOM() LIMIT 1;')])
        res.json(joke)
    } catch (err) {
        next(err)
    }
})

server.post('', function(req, res) {

})

server.get('/hello', (req, res) => res.send('Hello World!'))

server.listen(port, () => console.log(`Piada Ruim do Dia running on port ${port}!`))
