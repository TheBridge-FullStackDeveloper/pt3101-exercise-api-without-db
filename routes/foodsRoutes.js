const express = require('express');
const foodsRouter = express.Router();
const foodsController = require('../controllers/foodsController')



foodsRouter.get('/food/:food?',foodsController.getFoods);
//http://localhost:3000/users/food/ceviche
//http://localhost:3000/users/food/natto

module.exports = foodsRouter