const express = require("express");
const app = express();

const PORT = 3000;
app.use(express.json());

const routes = require('./routes');
app.use('/', routes);

app.use((req, res, next) => {
  next (new Error ('Path not found'));
});


app.use((error, req, res, next) => {
  res.status(404).json({
    success: false,
    message: error.message
  });
});



app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});