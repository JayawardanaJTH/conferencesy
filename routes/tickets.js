const express = require('express');
const router = express.Router(); 
const {addTicket,getTickets,getTicket } = require('../controller/tickets')

router.get('/ticket/:id', getTicket)
router.get('/tickets', getTickets);
router.post('/ticket', addTicket);

module.exports = router;