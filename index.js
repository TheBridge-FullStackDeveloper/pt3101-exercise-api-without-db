const express = require("express");
const app = express();
const usersRouter = require('./routes/usersRoutes');
const vehiclesRouter = require('./routes/vehiclesRoutes')
const foodsRouter = require('./routes/foodsRoutes')

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/users',usersRouter)
app.use(vehiclesRouter)
app.use(foodsRouter)

app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});
