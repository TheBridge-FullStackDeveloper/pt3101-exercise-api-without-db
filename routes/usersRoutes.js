const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController')

usersRouter.get('/', usersController.getUsers);

usersRouter.get('/users/:username?', usersController.getUser);

usersRouter.get('/users/total',usersController.getTotal);

usersRouter.get('/country/:country', usersController.getCountry);

//http://localhost:3000/users/vehicles/vehicles?min=1&max=6
usersRouter.get('/vehicles/vehicles', usersController.getVehicles);


usersRouter.get('/food/:food?',usersController.getFoods);
/*
usersRouter.get('/users/vehicles', (req,res =>{

}));

usersRouter.post('/users', (req,res =>{

}));

usersRouter.put('/users/:username', (req,res =>{

}));

usersRouter.put('/users/:username/vehicles', (req,res =>{

}));

usersRouter.put('/users/:username/foods', (req,res =>{

}));

usersRouter.put('/users/:username/hide', (req,res =>{

}));

usersRouter.delete('/users/:username', (req,res =>{

})); */

module.exports = usersRouter;