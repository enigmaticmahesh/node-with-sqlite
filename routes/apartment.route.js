const express = require('express');

const ApartmentController = require('../controllers/apartment/apartments.controller');

const router = express.Router();

router.get('/', ApartmentController.apartmentList);

module.exports = router;
