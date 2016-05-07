var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
//var relationship = require("mongoose-relationship");

var User      = require('./user');


var FollowSchema   = new Schema({
    ip: Number,
    device: String,
    user: { type:String, ref:"User" }
});



module.exports = mongoose.model('Follow', FollowSchema);