const express = require('express')
const path = require('path')
const bodyParser = require("body-parser")
const error = require('../middleware/error')
const users = require('../routes/users')
const auth = require('../routes/auth')
const payments = require('../routes/payments')
const tickets = require('../routes/tickets')
const documents = require('../routes/documents')
const guests = require('../routes/guests')
const events = require('../routes/events')
const statics = require('../routes/statics')

module.exports = function(app){

    app.use(bodyParser.json());
    app.use('/files', express.static(path.join(__dirname, '../files')));

    app.use('/api',auth)
    app.use('/api',tickets)
    app.use('/api',statics)
    app.use('/api', guests)
    app.use('/api',  documents)
    app.use('/api', events)
    app.use('/api',payments)
    app.use('/api',users)
    app.use(error)
}