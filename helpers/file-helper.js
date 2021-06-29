'use strict';
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'){
        cb(null, 'files/images');
        }else if(file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
            cb(null, 'files/research-papers');
        }else if(file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
            cb(null, 'files/workshop-proposals');
        }else{
            const error = new Error("Invalid data provided.");
            error.httpStatusCode = 422;
            error.errors = [{
                value: file.originalname,
                msg: "Invalid filetype.",
                param: file.fieldname,
                mimetype: file.mimetype,
                location: "body"}];
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

const upload = multer({storage: storage, fileFilter: fileFilter});

module.exports = {upload}