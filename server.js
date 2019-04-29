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

server.get('/resources/joke/:id?', async function (req, res, next) {
    try {
        const db = await dbPromise
        const [ joke ] = await Promise.all([db.get(sql(req.params.id))])
        joke ? res.json(joke) : res.status(404).send({id: req.params.id, text: 'Not Found'})
    } catch (err) {
        next(err)
    }
})

const sql = id => {
    return isNaN(id) ? 'SELECT * FROM Jokes ORDER BY RANDOM() LIMIT 1;' : `SELECT * FROM Jokes WHERE id = ${id}`
}

server.listen(port, () => console.log(`Piada Ruim do Dia running on port ${port}!`))
