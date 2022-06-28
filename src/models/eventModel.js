const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        unique: true,
        trim: true
    },
    eventDescription: {
        type: String,
        trim: true
    },
    star: {type:Date},
    end:{ type:String},
    weekDay: {type:String},
    email: {type:String},
    // isDeleted:{type:Boolean,
    //        default:false}
   
}, {
    timestamps: true
});

module.exports = mongoose.model('event', eventSchema); 