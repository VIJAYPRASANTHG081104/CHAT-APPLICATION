const express = require('express');
const router = express.Router();
const {searchcontact,requestFriend,getRequest}  = require('../controller/requestController')


router.post('/searchcontact',searchcontact)
router.post('/requestfriend',requestFriend)
router.post('/getfriendrequest',getRequest)

module.exports = router;