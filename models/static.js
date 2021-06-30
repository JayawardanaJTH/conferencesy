const mongoose = require('mongoose')
const {User} = require('./user')
const Joi = require('joi')

const staticSchema = new mongoose.Schema({
    page_title:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    sub_title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        minlength:5,
        maxlength: 255
    },
    contact:{
        type: String,
        required: true,
        minlength:7,
        maxlength: 12 
    },
    cover:{
        type: String,
    },
    start:{
        type: Date
    },
    end:{
        type: Date
    },
    venue:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 1024
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

const Static = mongoose.model('Static', staticSchema)

function validateStatic(statics){
    const schema = Joi.object({
        page_title : Joi.string().min(4).max(50).required(),
        sub_title : Joi.string().min(4).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        contact : Joi.string().min(7).max(12).required(),
        cover: Joi.string(),
        start: Joi.date(),
        end: Joi.date(),
        venue: Joi.string().min(4).max(1024).required(),
        description: Joi.string().min(12).max(1024).required(),
        approval: Joi.string().valid('pending', 'approved', 'rejected'),
        edited_by: Joi.objectId().required(),
        approved_by: Joi.objectId()
        
    })
    return schema.validate(statics);
}

exports.Static = Static;
exports.validate = validateStatic;