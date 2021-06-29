const express = require('express');
const router = express.Router(); 
const {upload} = require('../helpers/file-helper')
const { addGuest,getGuests,getGuest,updateGuest,deleteGuest } = require('../controller/guests')

router.get('/guest/:id', getGuest)
router.get('/guests', getGuests)
router.put('/guest/:id', upload.single('image'), updateGuest)
router.post('/guest',  upload.single('image'), addGuest)
router.delete('/guest/:id', deleteGuest)

module.exports = router;