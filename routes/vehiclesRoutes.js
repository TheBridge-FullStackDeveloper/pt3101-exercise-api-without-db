const express = require('express');
const userVehicles = require('../controllers/userVehicles');
const usersRouter = require('./usersRoutes');
const usersVehicle = express.Router();

//?5
usersVehicle.get('/1', userVehicles.uniqueVehicle);

//?8
usersRouter.get('/users/vehicles', userVehicles.userVehicles);

//? 9 

usersRouter.get('/vehicles', userVehicles.fuelVehicle);

module.exports = usersVehicle;