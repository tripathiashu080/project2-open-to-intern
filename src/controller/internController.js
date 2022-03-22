const collageModel = require('../models/collageModel.js');
const internModel = require('../models/internModel.js');

const isValidValue = function(value){
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const isValidDetails = function(details){
    return Object.keys(details).length > 0
}




const createIntern = async function (req, res){
    try{
        const details = req.body
        if(!isValidDetails(details)){
            res.status(400).send({status:false, msg:"Please provide collage details"})
        }
        const {name, email, mobile, collageId} = details
        if (!isValidValue(name)){
            return res.status(400).send({status:false, msg:"please provide name"})
        }
        if (!isValidValue(email)){
            return res.status(400).send({status:false, msg:"please provide email"})
        }
        if (!isValidValue(mobile)){
            return res.status(400).send({status:false, msg:"please provide mobile number"})
        }
        if (!isValidValue(collageId)){
            return res.status(400).send({status:false, msg:"please provide collageId"})
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return res.status(400).send({status:false,msg:"please provide valid email"})
        }
        if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile))) {
            res.status(400).send({ status: false, msg: "Plz enter valid mobile number" })
            return
          }
        const emailUsed = await  internModel.findOne({email})
        if(emailUsed){
            return res.status(400).send({status:false, msg:`Email Id ${email} already exists`})
        }
        let isMobilePresent = await internModel.findOne({mobile})
         if(isMobilePresent){
        return  res.status(400).send({status:false,msg:"Mobile no. is already exist"})
         } 
         let iscollagePresent = await internModel.findOne({_id:collageId})
         if(iscollagePresent){
        return  res.status(400).send({status:false,msg:"collageid is already exist"})
         }     
        const data = await internModel.create(details)  //creating the author details
        res.status(201).send({status: true, msg : "intern data created and  saved successfully", data:data})
    }
    catch(err){
        res.status(500).send({status:false, error : err.message})
    }               
}




module.exports.createIntern= createIntern