const router = require("express").Router();
const data = require('../db/users.json');


router.get('/', (req, res) => {
    const allVehicleNames = [];
    const fuel = req.query.fuel;
    let carsOfThisFuel = []

    data.map(user =>
        user.vehicles.map(car => {
            allVehicleNames.push(car.car);
        }));

    const differentCars = new Set(allVehicleNames);
    const numberOfDifferentCars = differentCars.size

    if (fuel) {
        data.map(user => {
            user.vehicles.map(car => {
                if (car.fuel === fuel) {
                    carsOfThisFuel.push(car)
                }
            })
        });

        const fuelCarNames = carsOfThisFuel.map(car => car.car);
        const uniqueCars = new Set(fuelCarNames)
        numberOfCarsOfThisFuel = uniqueCars.size;
    };

    res.status(200).json({
        success: true,
        [`Unique cars:`]: numberOfDifferentCars,
        [`${fuel} cars`]: numberOfCarsOfThisFuel
    });
})

module.exports = router;