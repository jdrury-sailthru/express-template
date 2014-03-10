var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , userSchema = new Schema({
      name  : {
        first : String,
        last  : String
      }
     , email : String
    });

exports.User = mongoose.model('User', userSchema);
