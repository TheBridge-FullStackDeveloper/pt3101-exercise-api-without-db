//? 7
const userFood = (req, res) => {
    let uniqueFoods = new Set();
    users.forEach(user => {
        user.favouritesFood.forEach(food => uniqueFoods.add(food));
    });
    res.json([...uniqueFoods]);
};
//? 6
const userSameFood = (req, res) => {
    const food = req.params.food;
    const usersWithFood = users.filter(user => user.favouritesFood.includes(food));
    res.json(usersWithFood);
};
//?13
const putFoodUsers = (req, res) => {
    const username = req.params.username;
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const favouritesFood = req.body.food;


    if (username) {
        const usersJson = fs.readFileSync("db/users.json", "utf8");
        const users = JSON.parse(usersJson);
        let userIndex = users.findIndex(user => user.username === username);
        if (userIndex !== -1) {
            users[userIndex].favouritesFood = favouritesFood || users[userIndex].favouritesFood;
            users[userIndex].firstname = firstname || users[userIndex].firstname;
            users[userIndex].lastname = lastname || users[userIndex].lastname;
            users[userIndex].email = email || users[userIndex].email;
            fs.writeFileSync('db/users.json', JSON.stringify(users), 'utf8');
            res.status(200).json({ firstname: users[userIndex].firstname, lastname: users[userIndex].lastname, email: users[userIndex].email, favouritesFood: users[userIndex].favouritesFood });
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
    userFood,
    userSameFood,
    putFoodUsers
}