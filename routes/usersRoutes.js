const express = require('express');
const usersRuter = express.Router();
const userControllers = require('../controllers/userControllers');

//? 1
usersRuter.get('/users', userControllers.allUsers);
//? 3
usersRuter.get('/total', userControllers.uniqueUser);
//? 10
usersRuter.post('/create', userControllers.createUser);
//? 14
usersRuter.put('/users/hide', userControllers.putHideUsers );
//? 15
usersRuter.delete('/users/delet',userControllers.deleteUsers );
//? 11
usersRuter.put('/users/:username',userControllers.reqParmUser );
//? 4
usersRuter.get('/country/:country', userControllers.uniqueCountryUsers);
//? 2
usersRuter.get('/users/username/:username',  userControllers.onlyUser);



module.exports = usersRuter;