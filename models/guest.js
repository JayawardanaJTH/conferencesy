const mongoose = require('mongoose')
const {User} = require('./user')
const Joi = require('joi')

const guestSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    designation: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    image:{
        type: String,
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

const Guest = mongoose.model('Guest', guestSchema)

function validateGuest(guest){
    const schema = Joi.object({
        name : Joi.string().min(4).max(50).required(),
        designation : Joi.string().min(4).max(50).required(),
        image: Joi.string(),
        description: Joi.string().min(12).max(1024).required(),
        approval: Joi.string().valid('pending', 'approved', 'rejected'),
        edited_by: Joi.objectId().required(),
        approved_by: Joi.objectId()
        
    })
    return schema.validate(guest);
}

exports.Guest = Guest;
exports.validate = validateGuest;