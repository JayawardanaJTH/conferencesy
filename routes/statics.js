const express = require('express');
const router = express.Router(); 
const {upload} = require('../helpers/file-helper')
const { addStatic,getStatics,updateStatic,deleteStatic } = require('../controller/statics')

router.get('/statics', getStatics);
router.put('/static/:id',upload.single('cover'), updateStatic);
router.post('/static', upload.single('cover'), addStatic);
router.delete('/static/:id', deleteStatic);

module.exports = router;