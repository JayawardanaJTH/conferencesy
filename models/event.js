const mongoose = require('mongoose')
const {User} = require('./user')
const Joi = require('joi')

const eventSchema = new mongoose.Schema({
    speaker:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    topic: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    start:{
        type: Date
    },
    end:{
        type: Date
    },
    description:{
        type: String,
        required: true,
        minlength: 12,
        maxlength: 1024
    },
    approval:{
        type: String,
        lowercase: true,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        trim: true
    },
    edited_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    approved_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
},{timestamps: true})

const Event = mongoose.model('Event', eventSchema)

function validateEvent(events){
    const schema = Joi.object({
        speaker : Joi.string().min(4).max(50).required(),
        topic : Joi.string().min(4).max(50).required(),
        start: Joi.date().max('now'),
        end: Joi.date(),
        description: Joi.string().min(12).max(1024).required(),
        approval: Joi.string().valid('pending', 'approved', 'rejected'),
        edited_by: Joi.objectId().required(),
        approved_by: Joi.objectId()
        
    })
    return schema.validate(events);
}

exports.Event = Event;
exports.validate = validateEvent;