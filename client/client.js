// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const helmet = require('helmet')

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '../.env' })

const port = process.env.WEB_DOCKER_PORT || 2000
const app = express()

//app.use(helmet())

app.use(express.static('build'))

app.listen(port, () =>
  console.log(
    `Server listening at ${port}`,
  ),
)

module.exports = app