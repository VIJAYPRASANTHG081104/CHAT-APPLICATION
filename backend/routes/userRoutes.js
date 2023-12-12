const express = require('express');
const { register, login, setAvatar, getAlluser,searchcontact,requestFriend,getRequest } = require('../controller/userController');
const router = express.Router();


router.post("/register",register);
router.post("/login",login);
router.post('/setAvatar/:id',setAvatar);
router.get('/allusers/:id',getAlluser);
module.exports = router