const express = require('express');
const userFood = require('../controllers/userFood');
const usersRouter = express.Router();

//?7
usersRouter.get('/', userFood.userFood);
//? 6 
usersRouter.get('/users/:food', userFood.userSameFood);

module.exports = usersRouter;