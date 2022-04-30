const router = require("express").Router();
const data = require('../db/users.json');


router.get('/quantity/vehicles', (req, res) => {
    const min = req.query.min;
    const max = req.query.max;

    const users = data.filter(user =>
        min <= user.vehicles.length && user.vehicles.length <= max);

    const result = users.map(user => ({
        username: user.username,
        email: user.email,
        image: user.img
    })
    );

    res.status(200).json({
        success: true,
        data: result
    });
});


router.get('/vehicles', (req, res) => {  
    /*esto no busca un solo coche con todas las características, 
    sino alguien que las tenga entre todos los coches que tiene, 
    no sabía como hacer lo otro */

    const fuel = req.query.fuel;
    const manufacturer = req.query.manufacturer;
    const model = req.query.model;

    let users = data;

    if (fuel) {
        users = users.filter(user =>
            user.vehicles.find(car =>
                car.fuel === fuel)
        );
    };

    if (manufacturer) {
        users = users.filter(user =>
            user.vehicles.find(car =>
                car.manufacturer === manufacturer)
        );
    };

    if (model) {
        users = users.filter(user =>
            user.vehicles.find(car =>
                car.model === model)
        );
    };

    if (!fuel && !manufacturer && !model) {
        users = data.filter(user =>
        user.vehicles.length === 0);
    }
    
    users = users.map(user => ({
        username: user.username,
        email: user.email,
        image: user.img
    })
    );

    res.status(200).json({
        success: true,
        data: users
    });
});

router.get('/total', (req, res) => {
    console.info('enters in total')
    const totalUsers = data.length;
    res.status(200).json({
        success: true,
        data: {
            [`Total Users`]: totalUsers
        }
    });
});



router.get('/:username', (req, res) => {
    console.info('enters in :username')
    const country = req.query.country;
    const food = req.query.food;
    const username = req.params.username;
    let user = data.filter(user =>
        user.username === username
    );

    if (country) {
        user = user.filter(user =>
            user.address.country === country
        );
    };

    if (food) {
        user = user.filter(user =>
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