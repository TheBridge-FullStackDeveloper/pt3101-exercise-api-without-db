const express = require("express");
const app = express();
const usersRouter = require('./routes/usersRoutes')

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users',usersRouter)

app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});
