const express = require('express');
const router = express.Router(); 
const {upload} = require('../helpers/file-helper')
const { addStatic,getStatics,getPendingStatics,getApprovedStatics,updateStatic,deleteStatic } = require('../controller/statics')

router.get('/statics', getStatics);
router.get('/pending/statics', getPendingStatics);
router.get('/approved/statics', getApprovedStatics);
router.put('/static/:id',upload.single('cover'), updateStatic); 
router.post('/static', upload.single('cover'), addStatic);
router.delete('/static/:id', deleteStatic);

module.exports = router;