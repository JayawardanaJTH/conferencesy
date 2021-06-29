const mongoose = require('mongoose')
const {User} = require('./user')
const Joi = require('joi')

const documentSchema = new mongoose.Schema({
    topic:{
        type: String,
        required: true,
        minlength:4,
        maxlength: 50
    },
    file:{
        type: String
    },
    approval: {
        type: String,
        lowercase: true,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        trim: true
    },
    date:{
        type: Date, 
        default: Date.now
    },
    type:{
        type: String,
        required: true,
        lowercase: true,
        enum: ['research-paper', 'workshop-proposal'],
        trim: true
    },
    upload_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    approved_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
},{timestamps: true})

const Document = mongoose.model('Document', documentSchema)

function validateDocument(document){
    const schema = Joi.object({
        topic : Joi.string().min(4).max(50).required(),
        file : Joi.string(),
        approval : Joi.string().valid('pending', 'approved', 'rejected'),
        date: Joi.date().max('now'),
        type: Joi.string().valid('research-paper', 'workshop-proposal').required(),
        upload_by: Joi.objectId().required(),
        approved_by: Joi.objectId()
    })
    return schema.validate(document);
}

exports.Document = Document;
exports.validate = validateDocument;