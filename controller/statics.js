const {Static,validate} = require('../models/static')

const addStatic = async (req,res,next) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    try{
        statics = new Static({
            page_title: req.body.page_title,
            sub_title: req.body.sub_title,
            email:  req.body.email,
            contact:  req.body.contact,
            cover: req.file.path,
            start:  req.body.start,
            end:  req.body.end,
            venue: req.body.venue,
            description: req.body.description,
            approval: req.body.approval,
            edited_by: req.body.edited_by  
        })
    
        await statics.save()
        res.send({
            _id: statics._id,
            page_title: statics.page_title,
            sub_title: statics.sub_title,
            email:  statics.email,
            contact:  statics.contact,
            cover: statics.path,
            start:  statics.start,
            end:  statics.end,
            venue: statics.venue,
            description: statics.description,
            approval: statics.approval,
            edited_by: statics.edited_by,
        })
    }catch(ex){
        next(ex)
    }
}

const getStatics = async (req,res,next) => {
    try{
        const statics = await Static
        .find({}, {__v:0 })
        .populate('edited_by','name -_id')
        .populate('approved_by','name -_id')
        .sort('-createdAt');
        res.send(statics)
    }catch(ex){
        next(ex)
    }
}

const updateStatic = async (req,res,next) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    try{
        const statics = await Static.findByIdAndUpdate(req.params.id,
            {
            page_title: req.body.page_title,
            sub_title: req.body.sub_title,
            email:  req.body.email,
            contact:  req.body.contact,
            cover: req.file.path,
            start:  req.body.start,
            end:  req.body.end,
            venue: req.body.venue,
            description: req.body.description,
            approval: req.body.approval,
            edited_by: req.body.edited_by ,
            approved_by: req.body.approved_by
            }
            ,{new: true});
        
          if (!statics) return res.status(404).send('The static with the given ID was not found.');
        
          res.send(statics);
    }catch(ex){
        next(ex)
    }
}

const deleteStatic = async (req,res,next) => {
    try{
        const statics = await Static.findByIdAndRemove(req.params.id);
        if(!statics) return res.status(404).send('The static with the given ID was not found');
        res.send(statics)
    }catch(ex){
        next(ex)
    }
}

module.exports = {
    addStatic,
    getStatics,
    updateStatic,
    deleteStatic
};