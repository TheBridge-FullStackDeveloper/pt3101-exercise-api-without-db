const PORT = 3000;
const express = require("express");
const app = express();
const users = require('./db/users.json');
const uuid = require('uuid');
const bodyParser = require('body-parser');


//Modulos de rutas
const usersRoutes = require('./routes/usersRoutes');
const usersFood = require('./routes/foodRoutes');
const userVehicle = require('./routes/vehiclesRoutes');
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('views', './views');

//rutass
app.use('/', usersRoutes);
app.use('/food', usersFood);
app.use('/vehicle', userVehicle);




//?   1ª Crea el endpoint /users (GET) que devuelva todos los usuarios

// app.get('/users', (req, res) => {
//     // console.log(users[0]);
//     res.status(200).json(users);
//     if (!users) {
//         res.status(404).send({ message: 'No se ha encontrado el usuario' });
//     }
// })

//? 3ªCrea el endpoint /users/:username (GET) que devuelva un único usuario en base al username (si hubiera varios, devuelve solo el primero)

// app.get('/users/total', (req, res) => {
//     const total = users.length;
//     res.json({ total });
// });

//? 7  Crea el endpoint /foods (GET) para devolver una lista de todas las comidas registradas UNICAS de todos los usuarios

// app.get('/foods', (req, res) => {
//     let uniqueFoods = new Set();
//     users.forEach(user => {
//         user.favouritesFood.forEach(food => uniqueFoods.add(food));
//     });
//     res.json([...uniqueFoods]);
// });

//? Tambien funciona, lo dejo comentado 

// app.get('/users/foods', (req, res) => {
//     const foods = users.flatMap(user => user.favouritesFood)
//     const Uniquefood = foods.filter((food, act, array) => act === array.indexOf(food))
//     res.status(200).json(Uniquefood)
// })

//?  5ª Crea el endpoint /users/vehicles (GET) para obtener email,
//? username e imagen de los usuarioss que tengan un mínimo y un máximo de vehículos (req.query min y max);
//http://localhost:3000/users/vehicles?min=9&max=30
// app.get('/users/vehicles', (req, res) => {
//     const min = req.query.min;
//     const max = req.query.max;
//     let userFromVehicles = []
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].vehicles.length >= min && users[i].vehicles.length <= max) {
//             userFromVehicles.push({ email: users[i].email, username: users[i].username, img: users[i].img })
//         }
//     }
//     if (userFromVehicles.length === 0) {
//         res.status(404).send({ message: `No se ha encontrado usuarios con un minimo de ${min} y un maximo de ${max} de vehiculos` });
//     } else {
//         res.send(userFromVehicles);
//     }
// });

//? 10 Crea el endpoint /users (POST) para recibir información en req.body para crear un usuario nuevo. 
//?Evita que se puedan crear usuarios si no hay, en req.body: email, firstname, lastname y username. 
//?Genera el id automáticamente (v4) (paquete uuid, más info en: https://www.npmjs.com/package/uuid). El resto de campos, si no están, crealos vacíos

// app.post('/create', (req, res) => {
//     const { email, firstname, lastname, username } = req.body;

//     if (!email || !firstname || !lastname || !username) {
//         return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const newUser = {
//         id: uuid.v4(),
//         email: email,
//         firstname: firstname,
//         lastname: lastname,
//         username: username,
//         createdAt: new Date()
//     };
// });


// module.exports = router;

// app.post('/created', (req, res) => {
//     const email = req.body.email;
//     const firstname = req.body.firstName;
//     const lastname = req.body.lastName;
//     const username = req.body.username;
//     if (!email || !firstname || !lastname || !username) {
//         res.status(400).json({ message: 'Missing required fields: email, firstname, lastname, and username' });
//     } else {
//         const newUser = {
//             id: uuid.v4(),
//             email: email,
//             firstName: firstname,
//             lastName: lastname,
//             username: username,
//             age: req.body.age || '',
//             address: req.body.address || ''
//         };
//         // Add new user to database
//         res.status(201).json({ message: 'User created', user: newUser });
//     }
// });

// module.exports = router;

//? FUNCIONA
// app.post('/created', (req, res) => {
//     const email = req.body.email;
//     const firstname = req.body.firstName;
//     const lastname = req.body.lastName;
//     const username = req.body.username;
//     if (email && firstname && lastname && username) {

//         const newUser = {
//             id: uuid.v4(),
//             email: email,
//             firstname: firstname,
//             lastname: lastname,
//             username: username,
//             createdAt: new Date().toISOString()
//         };
//         // code to save the new user in the database
// res.status(201).json(newUser);
//     } else {
//         res.status(400).json({
//             error: 'Email, firstname, lastname and username are required to create a user'
//         });
//     }
// });

// module.exports = {
//     getUsers2
// }
//?  4 Crea el endpoint /users/:country (GET) para devolver todos los usuarios de un país en concreto recibido por params

// app.get('/users/country/:country', (req, res) => {
//     const country = req.params.country;
//     let userCountry = null;

//     // buscar en un array de usuarios
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].address.country === country) {
//             userCountry = users[i];
//         }
//     }
//     if (!userCountry) {
//         res.status(404).send({ message: `No se ha encontrado el pais ${country}` });
//     } else {
//         res.send(userCountry);
//     }
// });

//?   8  Crea el endpoint /users/vehicles (GET) para obtener email, username e imagen de los usuarios que tenga,
//? al menos, un coche con los detalles pasados por query string (fuel, manufacturer y/o model. Si están los
//? 3 se filtra por los 3, si falta alguno, se filtra solo por los que existen. Si no hay ninguno, se saca la 
//?información de los usuarios que NO TIENEN COCHES)

// app.get('/users/vehicles', (req, res) => {
//     let filteredUsers = users.filter(user => {
//         if (!user.vehicles.length) {
//             return true;
//         }
//         let filterByFuel = req.query.fuel ? user.vehicles.filter(vehicle => vehicle.fuel === req.query.fuel) : user.vehicles;
//         let filterByManufacturer = req.query.manufacturer ? filterByFuel.filter(vehicle => vehicle.manufacturer === req.query.manufacturer) : filterByFuel;
//         let filterByModel = req.query.model ? filterByManufacturer.filter(vehicle => vehicle.model === req.query.model) : filterByManufacturer;
//         return filterByModel.length > 0;
//     });
//     let userInfo = filteredUsers.map(user => ({ email: user.email, username: user.username, img: user.img }));
//     res.json(userInfo);
// });

//!9 no funcion, dice que vehicles no esta definido.

// app.get('/vehicles', (req, res) => {
//     let filteredVehicles = vehicles;
//     if (req.query.fuel) {
//         filteredVehicles = vehicles.filter(vehicle => vehicle.vehicles.fuel === req.query.fuel);
//     }
//     let uniqueVehicles = new Set();
//     filteredVehicles.forEach(vehicle => {
//         uniqueVehicles.add(`${vehicle.manufacturer} ${vehicle.model}`);
//     });
//     let vehiclesAndCount = [...uniqueVehicles].map(vehicle => {
//         return {
//             vehicles: vehicle,
//             count: filteredVehicles.filter(v => `${v.manufacturer} ${v.model}` === vehicle).length
//         }
//     });
//     res.send(vehiclesAndCount);
// });

//? 2  Crea el endpoint /users/:username (GET) que devuelva un único usuario en base al username (si hubiera varios, devuelve solo el primero)

// app.get('/users/:username', (req, res) => {
//     const username = req.params.username;
//     let user = null;
//     // buscar en un array de usuarios
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].username === username) {
//             user = users[i];
//             break;
//         }
//     }
//     if (!user) {
//         res.status(404).send({ message: 'No se ha encontrado el usuario' });
//     } else {
//         res.send(user);
//     }
// });

//? 6 Crea el endpoint /users/:food (GET) para devolver todos los usuarios con una comida favorita en concreto a través de params

// app.get('/users/:food', (req, res) => {
//     const food = req.params.food;
//     const usersWithFood = users.filter(user => user.favouritesFood.includes(food));
//     res.json(usersWithFood);
// });

//? 11 Crea el endpoint /users/:username (PUT) para obtener información del usuario a través de req.body (menos el id, los vehículos,
//? los alimentos y el campo deleted) y actualiza dicho usuario



app.put('/users/:username', (req, res) => {
    const username = req.params.username;
    const updatedUser = req.body;

    // Find the index of the user with the specified username
    const userIndex = users.findIndex(user => user.username === username);

    if (userIndex === -1) {
        return res.status(404).json('User not found');
    }

    delete updatedUser.id;
    delete updatedUser.vehicles;
    delete updatedUser.foods;
    delete updatedUser.deleted;
    users[userIndex] = { ...users[userIndex], ...updatedUser };


    fs.writeFileSync('./db/users.json', JSON.stringify(users));

    res.json({ message: 'Usuario actualizado correctamente' });
});

//? 12 Crea el endpoint /users/:username/vehicles (PUT) para obtener una lista de vehículos en req.body
//? (puede ser uno o muchos. Si no es ninguno, que no haga nada) y añádelos a los existentes del usuario específico (usuario a través de params)

//? [{"fuel": "Gasoline","manufacturer": "Audi","model": "Civic","car": "Audi Civic","type": "Coupe"}]

// app.put("/users/:username/vehicles", (req, res) => {
//     if (req.body.length > 0) {
//         for (let user of users) {
//             if (user.username === req.params) {
//                 user.vehicles += req.body;
//                 break;
//             }
//         }
//         fs.writeFileSync(usersPath, JSON.stringify(users));
//         res.status(200).send("El usuario se ha actualizado correctamente")
//     }
// }
// )

// app.put("/users/:username/vehicles", (req, res) => {
//     const { username } = req.params;
//     const vehicles = req.body;
//     if (!vehicles) {
//         return res.status(400).send("No se ha especificado ningún vehículo para añadir.");
//     }

//     users.findOne({ username }, (err, users) => {
//         if (err) return res.status(500).send(err);
//         if (!users) return res.status(404).send("No se ha encontrado el usuario especificado");
//         users.vehicles = vehicles;
//         users.save((err, updatedUser) => {
//             if (err) return res.status(500).send(err);
//             return res.send(updatedUser);
//         });
//     });
// });

//? 13  Crea el endpoint /users/:username/foods (PUT) para obtener una lista de alimentos en req.body, junto con el nombre del usuario por params
//? y añade la lista de dichos alimentos a la lista de comidas favoritas de dicho usuario. Si no se recibe ningún alimento, se eliminan todos los que tienen

// app.put("/users/:username/foods", (req, res) => {
//     const { username } = req.params;
//     const foods = req.body;
//     if (!foods) {
//         return res.status(400).send("No se ha especificado ningún alimento para añadir.");
//     }
//     users.findOne({ username }, (err, user) => {
//         if (err) return res.status(500).send(err);
//         if (!user) return res.status(404).send("No se ha encontrado el usuario especificado");
//         user.favouritesFood = foods;
//         user.save((err, updatedUser) => {
//             if (err) return res.status(500).send(err);
//             return res.send(updatedUser);
//         });
//     });
// });
//? 14 Crea el endpoint /users/:username/hide (PUT) para recibir el email en req.body y cambiar la visibilidad de ese usuario para que no aparezca si se busca
//? (se entenderá como borrado para el mismo usuario)

// app.put("/users/:username/hide", (req, res) => {
//     const username = req.params;
//     const email = req.body.email;
//     if (!email) {
//         return res.status(400).send("No se ha especificado el email del usuario a ocultar.");
//     }

//     users.findOne({ username }, (err, user) => {
//         if (err) return res.status(500).send(err);
//         if (!user) return res.status(404).send("No se ha encontrado el usuario especificado");
//         if (user.email === email) {
//             user.deleted = true;
//             user.save((err, updatedUser) => {
//                 if (err) return res.status(500).send(err);
//                 return res.send(updatedUser);
//             });
//         } else {
//             return res.status(401).send("El usuario no tiene permiso para ocultar este perfil");
//         }
//     });
// });

//? 15 Crea el endpoint /user/:username (DELETE) para recibir en req.body el email y elimina definitivamente dicho usuario de la lista. Devuelve el usuario borrado.
//? IMPORTANTE! Solo se puede borrar si el campo deleted está a true. Si no, devolverá un error
// app.put("/users/:username/foods", (req, res) => {
//     const username = req.params;
//     const foods = req.body;
//     if (!foods) {
//         return res.status(400).send("No se ha especificado ningún alimento para añadir.");
//     }

//     users.findOne({ username }, (err, user) => {
//         if (err) return res.status(500).send(err);
//         if (!user) return res.status(404).send("No se ha encontrado el usuario especificado");
//         users.favouritesFood = foods;
//         users.save((err, updatedUser) => {
//             if (err) return res.status(500).send(err);
//             return res.send(updatedUser);
//         });
//     });
// });
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});