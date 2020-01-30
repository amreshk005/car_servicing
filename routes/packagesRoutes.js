const express = require('express');
const packageController = require('../controllers/packageController');

const router = express.Router({ mergeParmas: true});

router
    .route('/')
    .get(packageController.getAllPackages)
    .post(packageController.createPackage);


module.exports = router;