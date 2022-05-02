const router = require("express").Router();
const data = require('../db/users.json');

router.get('/', (req, res) => {
    const allFoods = [];

    data.map(user =>
        user.favouritesFood.map(food =>
            allFoods.push(food))
    );

    const foods = new Set(allFoods);

    res.status(200).json({
        success: true,
        [`Favourite foods:`]: [...foods]
    });
});

module.exports = router;