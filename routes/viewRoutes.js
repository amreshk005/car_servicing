const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/package/:slug', viewController.getPackage);
router.get('/booking', viewController.getBooking);

router.post('/booking', viewController.createBooking);

module.exports = router;