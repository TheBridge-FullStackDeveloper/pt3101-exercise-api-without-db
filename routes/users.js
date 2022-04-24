const router = require("express").Router();
const data = require('../db/users.json');


router.get('/vehicles', (req, res) => {
    const min = req.query.min;
    const max = req.query.max;
    const users = data.filter(user =>
        min <= user.vehicles.length && user.vehicles.length <= max);
/*
    const result = users.map( user =>  
        username: user.username,
        email: user.email,
        image: user.img
    )*/
    res.status(200).json({
        success: true,
        data: {
            result
        }
    });
});


router.get('/total', (req, res) => {
    console.info('enters in total')
    const totalUsers = data.length;
    res.status(200).json({
        success: true,
        data: {
            Total_Users: totalUsers
        }
    });
});


/*

router.get('/:country', (req, res, next) => {
    console.info('enters in :country')
    const country = req.params.country;
    

    const user = data.filter( user => 
        user.address.country
        .toLowerCase()
        .includes(country.toLowerCase()));

    if (!user.length) next()
    res.status(200).json({
        success: true,
        data: {
            user
        }
    });
});

*/



router.get('/:username', (req, res) => {
    console.info('enters in :username')
    const country = req.query.country;
    const food = req.query.food;
    const username = req.params.username;
    
    let user = data.filter( user => 
        user.username
        .toLowerCase()
        .includes(username.toLowerCase())
    );

    if (country) {
        user = user.filter( user =>
            user.address.country
            .toLowerCase()
            .includes(country.toLowerCase())
        );
    };

    if (food) {
        user = user.filter( user =>
            user.favouritesFood.includes(food)
        );
    };

    res.status(200).json({
        success: true,
        data: user
    });
});

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: data
    });
});

module.exports = router;