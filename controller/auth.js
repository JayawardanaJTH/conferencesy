const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const {User} = require('../models/user')
const { Payment } = require('../models/payment')
const { Document } = require('../models/document')

const login = async (req,res,next) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid email or password');

    
    try{
        const token = jwt.sign({_id: user._id},config.get('jwtPrivateKey'))

        if(user.type == 'attendee'){
            let payment = await Payment.findOne({payed_by: user._id});
            if(payment){
                res.send({
                    token: token,
                    id: user._id,
                    username:user.username,
                    type:user.type,
                    role:user.role,
                });
            }
            else{
                res.status(400).send({error: 'Please make your payment before login', _id: user._id}); 
            }

        } 
        else if(user.type == 'presenter') {
            let document = await Document.findOne({upload_by: user._id});
            if(document.approval == 'approved'){
                res.send({
                    token: token, 
                    id: user._id,
                    username:user.username,
                    type:user.type,
                    role:user.role,
                });
            }
            else if(document.approval == 'rejected'){
                res.status(400).send({error: 'Sorry, your document has been rejected'}); 
            }
            else{
                res.status(400).send({error: 'Please be patient until your document is approved'}); 
            }
        }
        else if(user.type == 'researcher'){
            let document = await Document.findOne({upload_by: user._id});
            let payment = await Payment.findOne({payed_by: user._id});

            if( payment && document.approval == 'approved'){
                res.send({
                    token: token, 
                    id: user._id,
                    username:user.username,
                    type:user.type,
                    role:user.role,
                });
            }
            else if(document.approval == 'rejected'){
                res.status(400).send({error: 'Sorry, your document has been rejected'}); 
            }
            else if( !payment && document.approval == 'approved'){
                res.status(400).send({error: 'Please make your payment before login' ,_id: user._id}); 
            }
            else{
                res.status(400).send({error: 'Please be patient until your document is approved'}); 
            }
        }
        else if(user.type == 'reviewer' || user.type == 'editor' || user.type == 'admin'){
            res.send({
                token: token, 
                id: user._id,
                username:user.username,
                type:user.type,
                role:user.role,
            });
        }
    }catch(ex){
        next(ex)
    }
}

function validate(req){
    const schema = Joi.object({
        email: Joi.string().min(5).max(1024).required().email(),
        password: Joi.string().min(5).max(1024).required()      
    })
    return schema.validate(req);
}

module.exports = {
    login
};