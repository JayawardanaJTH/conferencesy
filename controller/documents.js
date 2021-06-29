const {Document,validate} = require('../models/document')

const addDocument = async (req,res,next) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    try{
        document = new Document({
            topic: req.body.topic,
            file: req.file.path,
            approval: req.body.approval,
            date: req.body.date,
            type: req.body.type,
            upload_by: req.body.upload_by,
        })
        await document.save()
        res.send({
            _id: document._id,
            topic: document.topic,
            file: document.path,
            approval: document.approval,
            date: document.date,
            type: document.type,
            upload_by: document.upload_by
        })
    }catch(error) {
        res.status(400).send('"Invalid data provided."');
    }
}

const getDocuments = async (req,res,next) => {
    try{
        const documents = await Document
        .find({}, { __v:0 })
        .populate('upload_by','username , _id')
        .populate('approved_by','name -_id')
        .sort('-createdAt');
        res.send(documents)
    }catch(ex){
        next(ex)
    }
}

const getPendingDocuments = async (req,res,next) => {
    try{
        const documents = await Document
        .find({}, { __v:0 })
        .where('approval').equals('pending')
        .populate('upload_by','username , _id')
        .populate('approved_by','name -_id')
        .sort('-createdAt');
        res.send(documents)
    }catch(ex){
        next(ex)
    }
}

const getApprovedResearches = async (req,res,next) => {
    try{
        const documents = await Document
        .find({}, { __v:0 })
        .where('approval').equals('approved')
        .where('type').equals('research-paper')
        .populate('upload_by','username , _id')
        .populate('approved_by','name -_id')
        .sort('-createdAt');
        res.send(documents)
    }catch(ex){
        next(ex)
    }
}

const getApprovedWorkshops = async (req,res,next) => {
    try{
        const documents = await Document
        .find({}, { __v:0 })
        .where('approval').equals('approved')
        .where('type').equals('workshop-proposal')
        .populate('upload_by','username , _id')
        .populate('approved_by','name -_id')
        .sort('-createdAt');
        res.send(documents)
    }catch(ex){
        next(ex)
    }
}

const getDocument = async (req,res,next) => {
    try{
        const document = await Document
        .findById(req.params.id, { __v:0 })
        .populate('upload_by','name -_id')
        .populate('approved_by','name -_id')
        if(!document) return res.status(404).send('The document with the given ID was not found');
        res.send(document)
    }catch(ex){
        next(ex)
    }
}

const updateDocument = async (req,res,next) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    try{
        const document = await Document.findByIdAndUpdate(req.params.id,
            {
                topic: req.body.topic,
                file: req.body.file,
                approval: req.body.approval,
                date: req.body.date,
                type: req.body.type,
                upload_by: req.body.upload_by,
                approved_by: req.body.approved_by
            }
            ,{new: true});
        
          if (!document) return res.status(404).send('The document with the given ID was not found.');
        
          res.send(document);
    }catch(ex){
        next(ex)
    }
}

const deleteDocument = async (req,res,next) => {
    try{
        const document = await Document.findByIdAndRemove(req.params.id);
        if(!document) return res.status(404).send('The document with the given ID was not found');
        res.send(document)
    }catch(ex){
        next(ex)
    }
}

module.exports = {
    addDocument,
    getDocuments,
    getPendingDocuments,
    getApprovedWorkshops,
    getApprovedResearches,
    getDocument,
    updateDocument,
    deleteDocument
};