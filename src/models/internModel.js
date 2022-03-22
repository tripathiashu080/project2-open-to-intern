const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId

 const internSchema = new mongoose.Schema({
    "name" : {
        type : String,
        required : ' name is required',
        trim : true
    },
    "email" : {
        type : String, 
        required : 'email is required',
        unique : true,
        lowercase : true,
        trim:true,
        validate : {
            validator: function(email){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message:'Email is invalid, Please check your Email address.', isAsync:false
        }
    },
    "mobile" : {
        type : String,
        required : 'mobile number is required',
        unique: true,
        trim : true
    },
    "collageId" : {
        type : objectId,
        refs : 'projectCollage',
        required : 'collage Id is required'
    },   
    "isDeleted" : {
        type : Boolean,
        default : false
    } 

}
, {timestamps : true})

module.exports = mongoose.model('ProjectIntern', internSchema);