const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    schedules: {type:String},
    event: {type:String},
    start: {type:String},
    end: {type:String},
    weekDay: {type:String},
    email: {type:String},
    // isDeleted:{type:Boolean,
    //     default:false}

}, {
    timestamps: true
});

module.exports = mongoose.model('schedule', scheduleSchema); 