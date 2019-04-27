
const express = require('express')
const path = require('path')

const app = express()
const port = 15751

app.use('/', express.static(path.join(__dirname, 'frontend/build')))

app.get('/hello', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Piada Ruim do Dia running on port ${port}!`))
