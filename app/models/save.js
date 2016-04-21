var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
//var relationship = require("mongoose-relationship");

var User      = require('./user');


var SaveSchema   = new Schema({
    saved: { type : Array , "default" : [] },
    user: { type:String, ref:"User" }
});



module.exports = mongoose.model('Save', SaveSchema);