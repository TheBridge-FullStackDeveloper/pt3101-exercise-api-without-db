const router = require("express").Router();
const data = require('../db/users.json');
const { appendFile, writeFile } = require('fs');

const { v4: uuidv4 } = require('uuid');
//uuidv4(); creates new key every time

router.post('/create', (req, res) => {
    const newUser = req.body;
    newUser['id'] = uuidv4();
    console.log(newUser)
    if (newUser.hasOwnProperty('username') &&
        newUser.hasOwnProperty('firstName') &&
        newUser.hasOwnProperty('lastName') &&
        newUser.hasOwnProperty('email')) {
        const updatedDB = [...data, newUser];
        writeFile('./db/users.json', JSON.stringify(updatedDB), err => {
            if (err) {
                console.error('writeFile err: ', err)
            } else {
                console.info(newUser)
            }
        })

    }

    res.status(200).json({
        success: true,
        [`Added user`]: newUser
    });
})

router.put('/vehicles/:username', (req, res) => {    //the for doesn't work D:
    const username = req.params.username;
    const newCars = req.body;

    if (newCars) {
        const currUser = data.filter(user => user.username === username);
        const restOfUsers = data.filter(user => user.username !== username);
        const oldCars = currUser.vehicles;
        
        console.log(currUser["vehicles"])
        console.log('antes de update: ', currUser.vehicles)
        if (Array.isArray(newCars)) {
            //currUser.vehicles = [...oldCars, ...newCars]
        } else {
            console.log('deberia entrar aqui')
            //currUser.vehicles = [...oldCars, newCars]
        }
        
        console.log('despues de update: ', currUser.vehicles)
        //const updatedDB = [...restOfUsers, currUser];

        //console.log('despues de update: ', updatedDB)
/*
        writeFile('./db/users.json', JSON.stringify(updatedDB), err => {
            if (err) {
                console.error('writeFile err: ', err)
            } else {
                console.info(newUser)
            }
        })
    */
        res.status(200).json({
            success: true,
            [`Vehiclesof ${username}`]: vehicles
        });
    }
})


router.put('/update/:username', (req, res) => {    //the for doesn't work D:
    const username = req.params.username;
    const updatedProperties = req.body;
    const user = data.filter(user => user.username === username)[0];
    console.log('user: ', user, 'newproperties: ', updatedProperties);
    for (let i = 0; i < updatedProperties.length; i++) {
        console.log('value of user property: ' ,user[updatedProperties.keys()[i]], 'new properties: ' ,updatedProperties[updatedProperties.keys()[i]])
        user[updatedProperties.keys()[i]] = updatedProperties[updatedProperties.keys()[i]]
    };
    console.log(user)
    /*
    writeFile('./db/users.json', JSON.stringify(updatedDB), err => {
        if (err) {
            console.error('writeFile err: ', err)
        } else {
            console.info(newUser)
        }
    })
    */
   const updatedUser = data.filter(user => user.username === username)

    res.status(200).json({
        success: true,
        [`Updated user`]: updatedUser
    });
})


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