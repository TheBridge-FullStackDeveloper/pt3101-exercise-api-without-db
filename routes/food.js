const router = require("express").Router();
const data = require('../db/users.json');

router.get('/', (req, res) => {
    const repeatedFoods = []

    data.map(user =>
        user.favouritesFood.map(food =>
            repeatedFoods.push(food))
    )

    const foods = new Set(repeatedFoods)

    res.status(200).json({
        success: true,
        data: [...foods]
    })
})

module.exports = router;