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


module.exports = {
    addPayment,
};