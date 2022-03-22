const mongoose = require('mongoose');

 const collageSchema = new mongoose.Schema({
     "name" : {
         type : String,
         required : ' name is required',
         unique : true,
         trim : true
     },
     "fullname" : {
        type : String,
        required : 'Fullname is required',
        trim : true
    },
    "logolink" : { 
        type : String,
        required : 'Link is required',
        trim : true
    },
    "isDeleted" : {
        type : Boolean,
        default : false
    }
    
}
, {timestamps : true})

module.exports = mongoose.model('ProjectCollage', collageSchema);