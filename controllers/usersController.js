const db = require('../db/users.json');
const { v4: uuidv4 } = require('uuid');//For the creation of RFC4122 UUIDs

const getUsers =  (req, res)=> {
    try {
        res.status(200).json({ users: db});
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
    
}

const getUser = (req, res)=> {
    const username = req.params.username;
    let user = db.filter(user => user.username === username);
            
    try {
        res.status(200).json({ user: user});
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
        
    
}

const getTotal = (req, res)=> {
    let total = db.length;
    try {
        res.status(200).json({total:total});
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
    
    

}

const getCountry = (req,res)=>{
    const country = req.params.country;
    console.log(country);
    let userCountry = db.filter(c => c.address.country.toLowerCase() == country.toLowerCase());
    try {
        res.status(200).json({country: userCountry});
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}
const getUVehicles = (req,res)=> {
    const { min, max } = req.query;
    let usersVehicles = db.filter(user => user.vehicles.length >= min && user.vehicles.length <= max);
    let userV =[]
    usersVehicles = usersVehicles.map(user => {
        user ={
            email: user.email,
            username:user.username,
            img:  user.img,
        }
        userV.push(user)
        
    })
    
    if (min && max) {
        
        try {
            res.status(200).json({users: userV});
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    
}
}

const getFoods = (req,res) =>{
    if (req.params.food) {
        const food = req.params.food;
    
        let userFood = db.filter(user => 
            user.favouritesFood.map(food => food.toLowerCase()).includes(food.toLowerCase()));
    
        try {
            res.status(200).json({food: userFood});
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    } else {
        
        let foods = []
        db.map(user => 
            user.favouritesFood.map(food => foods.push(food)));
        const foodSet = [...new Set(foods)]
        
        res.status(200).json({foods: foodSet});
    }
    
}

const getUserVehicles = (req,res) => {
    const { fuel, manufacturer, model } = req.query;
    if (fuel && manufacturer && model) {
        let userVehicles = [];
        for (let i = 0; i < db.length; i++) {
            db[i].vehicles.filter(vehicle =>  {
                if (vehicle.fuel.toLowerCase() === fuel.toLowerCase() && vehicle.manufacturer.toLowerCase() === manufacturer.toLowerCase() && vehicle.model.toLowerCase() === model.toLowerCase()) {
                    userVehicles.push(db[i])
                }
                })
        }
        /* let userVehicles = db.map(user => user.vehicles.filter(vehicle =>  vehicle.fuel.toLowerCase() === fuel.toLowerCase() && vehicle.manufacturer.toLowerCase() === manufacturer.toLowerCase() && vehicle.model.toLowerCase() === model.toLowerCase())); */
        let userV = []
        userVehicles = userVehicles.map(user => {
            user ={
                email: user.email,
                username:user.username,
                img:  user.img,
            }
            userV.push(user)
            
        }) 
        try {
            res.status(200).json({users: userV});
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }

    } else if(fuel && (manufacturer || model)){
        let userVehicles = [];
        for (let i = 0; i < db.length; i++) {
            db[i].vehicles.filter(vehicle =>  {
                if (fuel && manufacturer) {
                    if (vehicle.fuel.toLowerCase() === fuel.toLowerCase() && vehicle.manufacturer.toLowerCase() === manufacturer.toLowerCase()) {
                        userVehicles.push(db[i])
                    }
                    
                }else if (fuel && model) {
                    if (vehicle.fuel.toLowerCase() === fuel.toLowerCase() && vehicle.model.toLowerCase() === model.toLowerCase()) {
                        userVehicles.push(db[i])
                    }
                }
                })
        }
        let userV = []
        userVehicles = userVehicles.map(user => {
            user ={
                email: user.email,
                username:user.username,
                img:  user.img,
            }
            userV.push(user)
            
        }) 
        try {
            res.status(200).json({users: userV});
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    } else {
        let usersVehicles = db.filter(user => user.vehicles.length === 0);
        let userV =[]
        usersVehicles = usersVehicles.map(user => {
            user ={
                email: user.email,
                username:user.username,
                img:  user.img,
            }
            userV.push(user)
        
    })

        try {
            res.status(200).json({users: userV});
        } catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    }
}

const createUser = (req,res) => {
    let username = req.body.username;
    let firstName =req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    //no me funciona con destructuring
    let newUser = {
        "id": `${uuidv4()}`,
        "email": `${email}`,
        "firstName": `${firstName}`,
        "lastName": `${lastName}`,
        "phone": `${req.body.phone}`,
        "img": `${req.body.img}`,
        "username": `${username}`,
        "address": {
        "street": `${req.body.address.street}`,
        "city": `${req.body.address.city}`,
        "zipCode": `${req.body.address.zipCode}`,
        "county": `${req.body.address.county}`,
        "country": `${req.body.address.country}`
        },
        "vehicles": [
        {
        "fuel": `${req.body.vehicles[0].fuel}`,
        "manufacturer": `${req.body.vehicles[0].manufacturer}`,
        "model": `${req.body.vehicles[0].model}`,
        "car": `${req.body.vehicles[0].car}`,
        "type": `${req.body.vehicles[0].type}`
        },
        
        ],
        "favouritesFood": [
            `${req.body.favouritesFood}`
        ],
        "deleted": false
        }
    /*  json prueba {
        "id": "",
        "email": "prueba@email.com",
        "firstName": "prueba",
        "lastName": "test",
        "phone": "123456789",
        "img": "https://i.pravatar.cc/101",
        "username": "prueba_test",
        "address": {
        "street": "",
        "city": "",
        "zipCode": "",
        "county": "",
        "country": ""
        },
        "vehicles": [
        {
        "fuel": "",
        "manufacturer": "",
        "model": "",
        "car": "",
        "type":""
        }
        ],
        "favouritesFood": [
        ""
        ],
        "deleted": false
        } */
    
        if (username&&firstName&&lastName&&email) {
            
            try {
                res.status(201).json(newUser);
            } catch (error) {
                console.log(`ERROR: ${error.stack}`);
            }
        }else{
            res.status(206).json({msj:`Faltan datos para crear el usuario. Debe contener email, firstName, lastName y username`});
        }
        
        
        
        
}




module.exports = {
    getUsers,
    getUser,
    getTotal,
    getCountry,
    getUVehicles,
    getFoods,
    getUserVehicles,
    createUser
}