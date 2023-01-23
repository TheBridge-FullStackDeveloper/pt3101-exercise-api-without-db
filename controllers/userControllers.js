//? 1
const allUsers = (req, res) => {
    const users = require('../db/users.json');
    // console.log(users[0]);
    res.status(200).json(users);
    if (!users) {
        res.status(404).send({ message: 'No se ha encontrado el usuario' });
    }
};
//?3
const uniqueUser = (req, res) => {
    const users = require('../db/users.json');
    const total = users.length;
    res.json({ total });
}

//? 10
const createUser = (req, res) => {
    const users = require('../db/users.json');
    const email = req.body.email;
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const username = req.body.username;
    if (!email || !firstname || !lastname || !username) {
        res.status(400).json({ message: 'Missing required fields: email, firstname, lastname, and username' });
    } else {
        const newUser = {
            id: uuid.v4(),
            email: email,
            firstName: firstname,
            lastName: lastname,
            username: username,
            age: req.body.age || '',
            address: req.body.address || ''
        };
        // Add new user to database
        res.status(201).json({ message: 'User created', user: newUser });
    }
};
//?4
const uniqueCountryUsers = (req, res) => {
    const country = req.params.country;
    let userCountry = null;

    // buscar en un array de usuarios
    for (let i = 0; i < users.length; i++) {
        if (users[i].address.country === country) {
            userCountry = users[i];
        }
    }
    if (!userCountry) {
        res.status(404).send({ message: `No se ha encontrado el pais ${country}` });
    } else {
        res.send(userCountry);
    }
};
//? 2
const onlyUser = (req, res) => {
    const users = require('../db/users.json');
    const username = req.params.username;
    let user = null;
    // buscar en un array de usuarios
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            user = users[i];
            break;
        }
    }
    if (!user) {
        res.status(404).send({ message: 'No se ha encontrado el usuario' });
    } else {
        res.send(user);
    }
};

//?11
const reqParmUser = (req, res) => {
    const users = require('../db/users.json');
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
};

//? 14

const putHideUsers = (req, res) => {
    
    const username = req.params.username;
    const email = req.body.email;

    if (username && email) {
        const usersJson = fs.readFileSync("db/users.json", "utf8");
        const users = JSON.parse(usersJson);
        let userIndex = users.findIndex(user => user.username === username && user.email === email);
        if (userIndex !== -1) {
            users[userIndex].visibility = false;
            fs.writeFileSync('db/users.json', JSON.stringify(users), 'utf8');
            res.status(200).json({ message: 'User visibility has been successfully updated' });
        } else {
            res.status(404).json({
                error: 'User not found'
            });
        }
    } else {
        res.status(400).json({
            error: 'Both username and email are required to hide a user'
        });
    }
};

//? 15
const deleteUsers = (req, res) => {
    const username = req.params.username;
    const email = req.body.email;

    if (username && email) {
        const usersJson = fs.readFileSync("db/users.json", "utf8");
        const users = JSON.parse(usersJson);
        let userIndex = users.findIndex(user => user.username === username && user.email === email);
        if (userIndex !== -1) {
            if (users[userIndex].deleted) {
                let deletedUser = users.splice(userIndex, 1);
                fs.writeFileSync('db/users.json', JSON.stringify(users), 'utf8');
                res.status(200).json({ deletedUser });
            } else {
                res.status(401).json({
                    error: 'User can only be deleted if the deleted field is true'
                });
            }
        } else {
            res.status(404).json({
                error: 'User not found'
            });
        }
    } else {
        res.status(400).json({
            error: 'Both username and email are required to delete a user'
        });
    }
};



module.exports = {
    allUsers,
    uniqueUser,
    createUser,
    uniqueCountryUsers,
    onlyUser,
    reqParmUser,
    putHideUsers,
    deleteUsers
}