const express = require('express')
const app = express()

require('./startup/headers')(app)
require('./startup/config')()
require('./startup/routes')(app)
require('./startup/validation')()
require('./startup/db')()

    // PORT
    const port = process.env.PORT || 4000;
    const server = app.listen(port, () => console.log(`Listen on port ${port}....`))

    module.exports = server;