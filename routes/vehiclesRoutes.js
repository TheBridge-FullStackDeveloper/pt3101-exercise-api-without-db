const express = require('express');
const vehiclesRouter = express.Router();
const getVehicles = require('../controllers/vehiclesController')

vehiclesRouter.get('/vehicles', getVehicles); 
//http://localhost:3000/vehicles
//http://localhost:3000/vehicles?fuel=diesel
//http://localhost:3000/vehicles?fuel=electric

module.exports = vehiclesRouter;