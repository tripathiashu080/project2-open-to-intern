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





const createCollage = async function (req, res){
    try{
        const details = req.body
        if(!isValidDetails(details)){
            res.status(400).send({status:false, msg:"Please provide collage details"})
        }
        const {name, fullname, logolink} = details
        if (!isValidValue(name)){
            return res.status(400).send({status:false, msg:"please provide name"})
        }
        if (!isValidValue(fullname)){
            return res.status(400).send({status:false, msg:"please provide fullname name"})
        }
        if (!isValidValue(logolink)){
            return res.status(400).send({status:false, msg:"please provide logo link"})
        }
        if (!(/^(ftp|http|https):\/\/[^ "]+$/.test(logolink))) {
            res.status(400).send({ status: false, msg: "Plz enter valid logo link" })
            return
          }
        let clgName =await collageModel.findOne({name});
        if(clgName){
            return res.status(400).send({status:false, msg:"name allready exits"}) 
        }
        let clgFullname =await collageModel.findOne({fullname});
        if(clgFullname){
            return res.status(400).send({status:false, msg:"Fullname allready exits"}) 
        }


        const data = await collageModel.create(details)  //creating the collage details
        res.status(201).send({status: true, msg : "collage created successfully", data:data})
    }
    catch(err){
        res.status(500).send({status:false, error : err.message})
    }               
}


const getCollage = async function (req, res) {
  try {
    let collageName = req.query.collageName;

    let collageDetails = await collageModel.findOne({name: collageName, isDeleted: false}).select({ _id: 1, name: 1, fullname: 1, logolink: 1 });

    if (!collageName) {
      res.status(400).send({ status: false, msg: "plz provide college name" });
    }

    if (!collageDetails) {
      res.status(404).send({ status: false, msg: "college details not found" });
    }

    let clgId = collageDetails._id;
    let InternDetails = await internModel.find({collageId: clgId, isDeleted: false}).select({ _id: 1, name: 1, email: 1, mobile: 1 });

    if (InternDetails.length > 0) {
      result = {
        name: collageDetails.name,
        fullname: collageDetails.fullname,
        logolink: collageDetails.logolink,
        interest: InternDetails,
      };
      return res.status(200).send({ status: true, data: result });
    } else {
      // res.status(404).send({status: false, msg:"Interns not found"});
      return res.status(404).send({status: true, data: {...collageDetails.toObject(),interests: "Interns not found"}});
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports.createCollage = createCollage
module.exports.getCollage = getCollage