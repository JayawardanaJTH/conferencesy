const express = require('express');
const router = express.Router(); 
const { addUser,getUsers,getUser,deleteUser } = require('../controller/users')

router.get('/user/:id', getUser)
router.get('/users', getUsers)
router.post('/user', addUser)
router.delete('/user/:id', deleteUser)

module.exports = router;