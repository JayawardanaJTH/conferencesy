const mongoose = require('mongoose')
const {User} = require('./user')
const Joi = require('joi')

const ticketSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
        minlength:12,
        maxlength: 1024
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        min:0
    },
    seat_no:{
        type: Number,
        required: true,
        trim: true,
        min:0
    },
    ref_no:{
        type: Number,
        required: true, 
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
},{timestamps: true})

const Ticket = mongoose.model('Ticket', ticketSchema)

function validateTicket(ticket){
    const schema = Joi.object({
        description : Joi.string().min(12).max(1024).required(),
        price : Joi.number().required(),
        seat_no: Joi.number().required(),
        ref_no: Joi.number().required(),
        user: Joi.objectId().required()
        
    })
    return schema.validate(ticket);
}

exports.Ticket = Ticket;
exports.validate = validateTicket;