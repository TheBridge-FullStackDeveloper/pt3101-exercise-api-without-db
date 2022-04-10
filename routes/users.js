const router = require("express").Router();
const data = require('../db/users.json');

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: data
    });
});


router.get('/:username', (req, res) => {
    const username = req.params.username;
    const user = data.filter( user => user.username.toLowerCase() === username.toLowerCase());
    res.status(200).json({
        success: true,
        data: user
    });
});

const totalUsers = data.length
console.log(totalUsers)

router.get('/total', (req, res) => {
    res.status(200).json({
        success: true,
        data: totalUsers
    });
});


module.exports = router;