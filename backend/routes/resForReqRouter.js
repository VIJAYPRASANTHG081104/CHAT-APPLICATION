const express = require('express');
const { acceptRequest, rejectRequest } = require('../controller/resForReq');
const router = express.Router();


router.post('/accept',acceptRequest);
router.post('/reject',rejectRequest);

module.exports = router