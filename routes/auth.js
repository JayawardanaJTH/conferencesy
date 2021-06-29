const express = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const router = express.Router(); 
const {login} = require('../controller/auth')

router.post('/auth', login);

module.exports = router;