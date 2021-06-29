const express = require('express');
const router = express.Router(); 
const { addEvent, getEvents,getEvent,updateEvent,deleteEvent } = require('../controller/events')

router.get('/event/:id', getEvent)
router.get('/events', getEvents)
router.put('/event/:id', updateEvent)
router.post('/event', addEvent)
router.delete('/event/:id', deleteEvent)

module.exports = router;