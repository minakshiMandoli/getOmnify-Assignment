const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');
const eventController = require('../controller/event.controller');
const {auth} = require('../midleware/midleware');


router.post('/registration', userController.registerUser);
router.post('/login', userController.loginUser);

router.post('/event', auth, eventController.createEvent);

router.get('/shedules', auth, eventController.getSchedule);



module.exports = router; 