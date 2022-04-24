const router = require('express').Router();

const users = require('./users');
const vehicles = require('./vehicles');
const food = require('./food');


/*
const createRequire = (name, path) => {
    const name = require(`./${path}`)
}

createRequire */

router.use('/users', users);
router.use('/vehicles', vehicles);
router.use('/foods', food);


module.exports = router