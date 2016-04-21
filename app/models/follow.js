var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
//var relationship = require("mongoose-relationship");

var User      = require('./user');


var FollowSchema   = new Schema({
    following: { type : Array , "default" : [] },
    user: { type:String, ref:"User" }
});



module.exports = mongoose.model('Follow', FollowSchema);