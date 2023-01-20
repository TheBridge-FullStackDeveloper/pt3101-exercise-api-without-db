const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController')

usersRouter.get('/', usersController.getUsers);

usersRouter.get('/:username?', usersController.getUser);

usersRouter.get('/users/total',usersController.getTotal);

usersRouter.get('/country/:country', usersController.getCountry);
/*
usersRouter.get('/users/:food', (req,res =>{

}));

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