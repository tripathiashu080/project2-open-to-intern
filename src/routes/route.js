const express = require('express');
const router = express.Router();
const collageController = require('../controller/collageController.js');
const internController = require('../controller/internController.js');


//collage
router.post('/functionup/colleges', collageController.createCollage) //create collage
router.post("/createIntern", internController.createIntern);
router.get("/getCollageDetails", collageController.getCollage);


module.exports = router;