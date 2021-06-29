const {Event,validate} = require('../models/event')

const addEvent =  async (req,res,next) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    try{
        events = new Event({
            speaker: req.body.speaker,
            topic: req.body.topic,
            start:  req.body.start,
            end:  req.body.end,
            description: req.body.description,
            edited_by: req.body.edited_by
        })
        await events.save()
        res.send({
            _id: events._id,
            speaker: events.speaker,
            topic: events.topic,
            start:  events.start,
            end:  events.end,
            description: events.description,
            edited_by: events.edited_by
        })
    }catch(ex){
        next(ex)
    }
}

const getEvents = async (req,res,next) => {
    try{
        const events = await Event
        .find({}, { __v:0 })
        .populate('edited_by','name -_id')
        .populate('approved_by','name -_id')
        .sort('-createdAt');
        res.send(events)
    }catch(ex){
        next(ex)
    }
}

const getEvent = async (req,res,next) => {
    try{
        const events = await Event
        .findById(req.params.id, { __v:0 })
        .populate('edited_by','name -_id')
        .populate('approved_by','name -_id')
        if(!events) return res.status(404).send('The event with the given ID was not found');
        res.send(events)
    }catch(ex){
        next(ex)
    }
}

const updateEvent = async (req,res,next) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    try{
        const events = await Event.findByIdAndUpdate(req.params.id,
            {
            speaker: req.body.speaker,
            topic: req.body.topic,
            start:  req.body.start,
            end:  req.body.end,
            description: req.body.description,
            approval: req.body.approval,
            edited_by: req.body.edited_by,
            approved_by: req.body.approved_by
            }
            ,{new: true});
        
          if (!events) return res.status(404).send('The event with the given ID was not found.');
        
          res.send({
            _id: events._id,
            speaker: events.speaker,
            topic: events.topic,
            start:  events.start,
            end:  events.end,
            description: events.description,
            edited_by: events.edited_by,
            approved_by: req.body.approved_by
          });
    }catch(ex){
        next(ex)
    }
}

const deleteEvent = async (req,res,next) => {
    try{
        const events = await Event.findByIdAndRemove(req.params.id);
        if(!events) return res.status(404).send('The event with the given ID was not found');
        res.send(events)
    }catch(ex){
        next(ex)
    }
}

module.exports = {
    addEvent, 
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent
};