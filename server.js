
const express = require('express')
const path = require('path')
const helmet = require('helmet')

const server = express()
const port = 15751

server.use(helmet())
server.use('/', express.static(path.join(__dirname, 'frontend/build')))

server.get('/resources/joke', function (req, res) {
    res.json({"id": 1, "joke": "Como um átomo atende o telefone? PRÓTON?!"})
})

server.get('/hello', (req, res) => res.send('Hello World!'))

server.listen(port, () => console.log(`Piada Ruim do Dia running on port ${port}!`))
