const {Payment,validate} = require('../models/payment')

const addPayment = async (req,res,next) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    try{
        payment = new Payment({
            amount: req.body.amount,
            reason: req.body.reason,
            payment_method: req.body.payment_method,
            payed_by: req.body.payed_by
        })

        await payment.save()
        res.send({
            _id: payment._id,
            amount: payment.amount,
            reason: payment.reason,
            payment_method: payment.payment_method,
            payed_by: payment.payed_by
        })
    }catch(ex){
        next(ex)
    }
}

const getPayments = async (req,res,next) => {
    try{
        const payment = await Payment
            .find({}, { updatedAt: 0,__v:0 })
            .populate('payed_by', 'name type email contact -_id')
            .sort('-createdAt');
        res.send(payment)
    }catch(ex){
        next(ex)
    }
}

const getPayment = async (req,res,next) => {
    try{
        const payment = await Payment
            .findById(req.params.id, { updatedAt: 0,__v:0 })
            .populate('payed_by', 'name type email contact -_id')
        if(!payment) return res.status(404).send('The payment with the given ID was not found');
        res.send(payment)
    }catch(ex){
        next(ex)
    }
}

module.exports = {
    addPayment,
    getPayments,
    getPayment
};