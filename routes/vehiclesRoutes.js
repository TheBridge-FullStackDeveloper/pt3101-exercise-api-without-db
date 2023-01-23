const express = require('express');
const userVehicles = require('../controllers/userVehicles');
const usersRouter = require('./usersRoutes');
const usersVehicle = express.Router();

//? 9 
usersRouter.get('/vehicles', userVehicles.fuelVehicle);
//?5
usersVehicle.get('users/params/vehicle', userVehicles.uniqueVehicle);
//?8
usersRouter.get('/users/vehicles', userVehicles.userVehicles);
//?12
usersRouter.put('/vehicles.put',userVehicles.putVehicleUsers);

module.exports = usersVehicle;