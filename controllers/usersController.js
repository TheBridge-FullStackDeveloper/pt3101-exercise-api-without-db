const db = require('../db/users.json')

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
const getVehicles = (req,res)=> {
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


module.exports = {
    getUsers,
    getUser,
    getTotal,
    getCountry,
    getVehicles,
    getFoods
}