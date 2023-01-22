const express = require('express');
const usersRuter = express.Router();
const userControllers = require('../controllers/userControllers');

//?1
usersRuter.get('/users', userControllers.allUsers);
//?3
usersRuter.get('/total', userControllers.uniqueUser);
//?4
usersRuter.get('/country/:country', userControllers.uniqueCountryUsers);
//? 2
usersRuter.get('/users/username/:username',  userControllers.onlyUser);
//? 10
usersRuter.post('/create', userControllers.createUser);
//? 11
usersRuter.put('/users/:username',userControllers.reqParmUser );
//? 14
usersRuter.put('/users/hide', userControllers.putHideUsers );
//? 15
usersRuter.put('/users/delet',userControllers.deleteUsers );



module.exports = usersRuter;