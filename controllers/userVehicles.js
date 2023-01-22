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
function getUniqueVehiclesByFuel(fuel) {

    return users.vehicles.filter((vehicle) => vehicle.fuel === fuel)
}
function getAllUniqueVehicles() {
    return users.filter(user => user.vehicles);
}
//? 12

const putVehicleUsers = (req, res) => {
    const username = req.params.username;
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const vehicles = req.body.vehicles;


    if (username) {
        const usersJson = fs.readFileSync("db/users.json", "utf8");
        const users = JSON.parse(usersJson);
        let userIndex = users.findIndex(user => user.username === username);
        if (userIndex !== -1) {
            users[userIndex].vehicles = vehicles || users[userIndex].vehicles;
            users[userIndex].firstname = firstname || users[userIndex].firstname;
            users[userIndex].lastname = lastname || users[userIndex].lastname;
            users[userIndex].email = email || users[userIndex].email;
            fs.writeFileSync('db/users.json', JSON.stringify(users), 'utf8');
            res.status(200).json({ firstname: users[userIndex].firstname, lastname: users[userIndex].lastname, email: users[userIndex].email, vehicles: users[userIndex].vehicles });
        } else {
            res.status(404).json({
                error: 'User not found'
            });
        }
    } else {
        res.status(400).json({
            error: 'Username is required to update a user'
        });
    }
};



module.exports = {
    userVehicles,
    uniqueVehicle,
    fuelVehicle,
    putVehicleUsers
}

