const db = require('../db/users.json');

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
    getFoods};