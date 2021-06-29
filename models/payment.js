const mongoose = require('mongoose')
const {User} = require('./user')
const Joi = require('joi')

const paymentSchema = new mongoose.Schema({
    amount:{
        type: Number,
        required: true,
    },
    reason: {
        type: String,
        required: true,
        minlength:4,
        maxlength: 1024
    },
    payment_method:{
        type: String,
        required: true,
        lowercase: true,
        default: 'card payment',
        trim: true
    },
    payed_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
},{timestamps: true})

const Payment = mongoose.model('Payment', paymentSchema)

function validatePayment(payment){
    const schema = Joi.object({
        amount : Joi.number().required(),
        reason : Joi.string().min(4).max(1024).required(),
        payment_method: Joi.string(),
        payed_by: Joi.objectId().required()

    })
    return schema.validate(payment);
}

exports.Payment = Payment;
exports.validate = validatePayment;