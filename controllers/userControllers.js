//? 1
const allUsers = (req, res) => {
    // console.log(users[0]);
    res.status(200).json(users);
    if (!users) {
        res.status(404).send({ message: 'No se ha encontrado el usuario' });
    }
};
//?3
const uniqueUser = (req, res) => {
    const total = users.length;
    res.json({ total });
}

//? 10
const createUser = (req, res) => {
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

module.exports = {
    allUsers,
    uniqueUser,
    createUser,
    uniqueCountryUsers,
    onlyUser
}