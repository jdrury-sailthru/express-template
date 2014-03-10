var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , pageSchema = new Schema({
       title    : { type: String, required: true }
     , url_name : String
     , owner_id : String
     , body     : { type: String, required: true }
     , date     : {type: Date, default: Date.now }
     , status   : Number
  });

exports.Page = mongoose.model('Page', pageSchema);