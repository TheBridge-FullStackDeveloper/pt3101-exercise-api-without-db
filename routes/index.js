const router = require('express').Router();

const users = require('./users');
const vehicles = require('./vehicles');
const food = require('./food');
const countries = require('./countries');

/*
const createRequire = (name, path) => {
    const name = require(`./${path}`)
}

createRequire */

router.use('/users', users);
router.use('/vehicles', vehicles);
router.use('/food', food);
router.use('/countries', countries);


module.exports = router