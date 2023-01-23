const express = require('express');
const userFood = require('../controllers/userFood');
const usersRouter = express.Router();

//? 7
usersRouter.get('/food', userFood.userFood);
//? 6 
usersRouter.get('/users/:food', userFood.userSameFood);
//? 13
usersRouter.put('users/put/params', userFood.putFoodUsers);



module.exports = usersRouter;