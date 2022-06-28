const eventModel = require('../model/event.model');
const scheduleModel = require('../model/schedule.model');
const moment = require('moment');

const createEvent = async (req, res) => {
    const data = req.body;

    let start = moment();
    let end = moment().add(90, 'd');

    var scheduledEvent = [];
    
    let temp = start.clone().day(data.weekDay);
    if (temp.isAfter(start, 'd')) {
        scheduledEvent.push(temp.format('YYYY-MM-DD'));
    }
    while (temp.isBefore(end)) {
        temp.add(7, 'days');
        scheduledEvent.push(temp.format('YYYY-MM-DD'));
    }

    

    const scheduleObj = {
        schedules: scheduledEvent,
        event: data.event,
        start: data.start,
        end: data.end,
        email: data.email
    }
    try {
        const dataRes = await eventModel.create(data);
        await scheduleModel.create(scheduleObj);
        return res.status(201).send({
            status: true,
            message: 'Event created successfully !',
            data: dataRes
        });
    }
    catch (err) {
  
        return res.status(500).send({ ERROR: err.message })
      }
}

const getSchedule = async (req, res) => {
    try{

    const schedulesRes = await scheduleModel.find({
        email: req.decodedToken
    });

    if (!schedulesRes) {
        return res.status(404).send({
            status: false,
            message: 'sorry !.. event not found'
        });
    }
    return res.status(200).send({
        status: true,
        message: 'Scheduled events found',
        data: schedulesRes
    });
}
catch (err) {
  
    return res.status(500).send({ ERROR: err.message })
  }
}



module.exports = {
    createEvent,
    getSchedule
}