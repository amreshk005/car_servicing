const express = require('express');
const coustmerInfoController = require("../controllers/coustmerInfoController");

const router = express.Router();


router
    .route('/')
    .get(coustmerInfoController.getallcoustmerInfo)
    .post(coustmerInfoController.createcoustmerInfo);


module.exports = router;