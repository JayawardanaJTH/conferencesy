const {Guest,validate} = require('../models/guest')

const addGuest = async (req,res,next) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    try{
        guest = new Guest({
            name: req.body.name,
            designation: req.body.designation,
            image: req.file.path,
            description: req.body.description,
            edited_by: req.body.edited_by
        })
        await guest.save()
        res.send({
            _id: guest._id,
            name: guest.name,
            designation: guest.designation,
            image: guest.path,
            description: guest.description,
            approval: guest.approval,
            edited_by: guest.edited_by
        })
    }catch(error) {
        res.status(400).send('"Invalid data provided."');
    }
}

const getGuests = async (req,res,next) => {
    try{
        const guest = await Guest
        .find({}, {__v:0 })
        .populate('edited_by','username ,_id')
        .populate('approved_by','username ,_id')
        .sort('-createdAt');
        res.send(guest)
    }catch(ex){
        next(ex)
    }
}

const getPendingGuests = async (req,res,next) => {
    try{
        const guest = await Guest
        .find({}, {__v:0 })
        .where('approval').equals('pending')
        .populate('edited_by','username ,_id')
        .populate('approved_by','username ,_id')
        .sort('-createdAt');
        res.send(guest)
    }catch(ex){
        next(ex)
    }
}

const getApprovedGuests = async (req,res,next) => {
    try{
        const guest = await Guest
        .find({}, {__v:0 })
        .where('approval').equals('approved')
        .populate('edited_by','username ,_id')
        .populate('approved_by','username ,_id')
        .sort('-createdAt');
        res.send(guest)
    }catch(ex){
        next(ex)
    }
}

const getGuest = async (req,res,next) => {
    try{
        const guest = await Guest
        .findById(req.params.id, { __v:0 })
        .populate('edited_by','username ,_id')
        .populate('approved_by','username ,_id')
        if(!guest) return res.status(404).send('The guest with the given ID was not found');
        res.send(guest)
    }catch(ex){
        next(ex)
    }
}

const updateGuest = async (req,res,next) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    try{
        const guest = await Guest.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                designation: req.body.designation,
                image: req.body.image,
                description: req.body.description,
                approval: req.body.approval,
                edited_by: req.body.edited_by,
                approved_by: req.body.approved_by
            }
            ,{new: true});
        
          if (!guest) return res.status(404).send('The guest with the given ID was not found.');
        
          res.send(guest);
    }catch(ex){
        next(ex)
    }
}

const deleteGuest = async (req,res,next) => {
    try{
        const guest = await Guest.findByIdAndRemove(req.params.id);
        if(!guest) return res.status(404).send('The guest with the given ID was not found');
        res.send(guest)
    }catch(ex){
        next(ex)
    }
}

module.exports = {
    addGuest,
    getGuests,
    getPendingGuests,
    getApprovedGuests,
    getGuest,
    updateGuest,
    deleteGuest
};