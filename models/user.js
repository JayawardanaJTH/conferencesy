const config = require('config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength:4,
        maxlength: 50
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'reviewer','user'],
        default: 'user',
        lowercase: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        minlength:5,
        maxlength: 1024,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength:5,
        maxlength: 1024
    },
    type:{
        type: String,
        required: true,
        enum: ['attendee', 'presenter', 'researcher'],
        lowercase: true,
        trim: true
    }
},{timestamps: true})

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id},config.get('jwtPrivateKey'))
    return token;
}

const User = mongoose.model('User', userSchema)

function validateUser(user){
    const schema = Joi.object({
        username : Joi.string().min(4).max(50).required(),
        role: Joi.string().valid('admin', 'editor', 'reviewer','user'),
        email: Joi.string().min(5).max(1024).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        type: Joi.string().valid('attendee', 'presenter', 'researcher').required()
    })
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;