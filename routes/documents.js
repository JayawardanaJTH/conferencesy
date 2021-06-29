const express = require('express');
const router = express.Router(); 
const {upload} = require('../helpers/file-helper')
const { addDocument,getDocuments,getDocument,getPendingDocuments,getApprovedWorkshops,getApprovedResearches,updateDocument,deleteDocument } = require('../controller/documents')

router.get('/document/:id', getDocument)
router.get('/documents', getDocuments)
router.get('/pending/documents', getPendingDocuments)
router.get('/approved/workshops', getApprovedWorkshops)
router.get('/approved/researches', getApprovedResearches)
router.put('/document/:id', upload.single('file'), updateDocument)
router.post('/document', upload.single('file'), addDocument);
router.delete('/document/:id', deleteDocument)

module.exports = router;