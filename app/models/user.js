// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var Save     = require('./save');
var Follow    = require('./follow');


// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        username     : String,  
        created: {type:Date, default: Date.now} 

    },
    facebook            : {
        id           : String,
        email        : String,
        password     : String,
        username     : String,  
        created: {type:Date, default: Date.now} 

    },
    following        : [{type: Schema.Types.ObjectId, ref: "Save"}], 
    saved            : [{type: Schema.Types.ObjectId, ref: "Follow"}]

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);