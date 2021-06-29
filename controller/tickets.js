const {Ticket,validate} = require('../models/ticket')

const addTicket = async (req,res,next) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    try{
        ticket = new Ticket({
            description: req.body.description,
            price: req.body.price,
            seat_no: req.body.seat_no,
            ref_no: req.body.ref_no,
            user:req.body.user
        })
        await ticket.save()
        res.send({
            _id: ticket._id,
            description: ticket.description,
            price: ticket.price,
            seat_no: ticket.seat_no,
            ref_no: ticket.ref_no,
            user:ticket.user
        })
    }catch(ex){
        next(ex)
    }
}

const getTickets = async (req,res,next) => {
    try{
        const ticket = await Ticket
        .find({}, {password: 0,updatedAt: 0,__v:0 })
        .populate('user', 'name type email contact -_id')
        .sort('-createdAt');
        res.send(ticket)
    }catch(ex){
        next(ex)
    }
}

const getTicket = async (req,res,next) => {
    try{
        const ticket = await Ticket
        .findById(req.params.id)
        .populate('user', 'name type email contact')
        if(!ticket) return res.status(404).send('The ticket with the given ID was not found');
        res.send(ticket)
    }catch(ex){
        next(ex)
    }
}

module.exports = {
    addTicket,
    getTickets,
    getTicket
};