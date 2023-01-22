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
module.exports = {
    userFood,
    userSameFood
}