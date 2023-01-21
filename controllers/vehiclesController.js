const db = require('../db/users.json');

const getVehicles = (req,res)=> {
    const {fuel} = req.query;
    let usersVehicles =[];
    if (fuel) {
        db.map(user => {
            user.vehicles.filter(vehicle => { 
                if (vehicle.fuel.toLowerCase() === fuel.toLowerCase()) {
                    usersVehicles.push(vehicle);
                }
            });
        });
        try {
            res.status(200).json({ fuel: usersVehicles});
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    } else {
        
    db.map(user => {
        user.vehicles.map(vehicle => {
            usersVehicles.push(vehicle)
        })
    });
    let vehicles = [...new Set(usersVehicles)]
    try {
        res.status(200).json({ vehicles: vehicles});
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
    }
    
}

module.exports = getVehicles