const PORT = 3000;
const express = require("express");
const app = express();

const users = require('./db/users.json');

//Crea el endpoint /users (GET) que devuelva todos los usuarios

app.get('/users', (req, res) => {
    // console.log(users[0]);
    res.status(200).json(users);
})

//Crea el endpoint /users/:username (GET) que devuelva un único usuario en base al username (si hubiera varios, devuelve solo el primero)
//"Jianping_Shemesh"
app.get('users/:username', (req, res) => {
    if (req.params.username) {
        res.send('Hey! te mando el email ' + req.params.username)
    }
    else {
        res.send('Ahí va el mail')
    }
}
    // res.status(200).json(req.params.username)
)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});