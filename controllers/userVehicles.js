//? 5
const uniqueVehicle = (req, res) => {
    const min = req.query.min;
    const max = req.query.max;
    let userFromVehicles = []
    for (let i = 0; i < users.length; i++) {
        if (users[i].vehicles.length >= min && users[i].vehicles.length <= max) {
            userFromVehicles.push({ email: users[i].email, username: users[i].username, img: users[i].img })
        }
    }
    if (userFromVehicles.length === 0) {
        res.status(404).send({ message: `No se ha encontrado usuarios con un minimo de ${min} y un maximo de ${max} de vehiculos` });
    } else {
        res.send(userFromVehicles);
    }
};


//? 8

const userVehicles = (req, res) => {
    let filteredUsers = users.filter(user => {
        if (!user.vehicles.length) {
            return true;
        }
        let filterByFuel = req.query.fuel ? user.vehicles.filter(vehicle => vehicle.fuel === req.query.fuel) : user.vehicles;
        let filterByManufacturer = req.query.manufacturer ? filterByFuel.filter(vehicle => vehicle.manufacturer === req.query.manufacturer) : filterByFuel;
        let filterByModel = req.query.model ? filterByManufacturer.filter(vehicle => vehicle.model === req.query.model) : filterByManufacturer;
        return filterByModel.length > 0;
    });
    let userInfo = filteredUsers.map(user => ({ email: user.email, username: user.username, img: user.img }));
    res.json(userInfo);
};

//?9
const fuelVehicle = ('/vehicles', (req, res) => {
    const fuel = req.query.fuel;
    let uniqVehicles = []
    if (fuel) {
        uniqVehicles = getUniqueVehiclesByFuel(fuel);
    }
    else {
        uniqVehicles = getAllUniqueVehicles();
    }
    res.json(uniqVehicles);
});

module.exports = {
    userVehicles,
    uniqueVehicle,
    fuelVehicle
}

