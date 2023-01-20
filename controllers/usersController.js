const db = require('../db/users.json')

const getUsers =  (req, res)=> {
    try {
        res.status(200).json({ users: db});
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
    
}

const getUser = (req, res)=> {
    let username = req.params.username;
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
    let country = req.params.country;
    console.log(country);
    let userCountry = db.filter(c => c.address.country.toLowerCase() == country.toLowerCase());
    
    try {
        res.status(200).json({country: userCountry});
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}

module.exports = {
    getUsers,
    getUser,
    getTotal,
    getCountry
}