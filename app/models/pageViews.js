var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
//var relationship = require("mongoose-relationship");

var User      = require('./user');


var pageView   = new Schema({
    url: String,
    device: String,
    ip: Number, 
    user: { type:String, ref:"User" },
    viewCount: Number
});



module.exports = mongoose.model('pageView', pageView);