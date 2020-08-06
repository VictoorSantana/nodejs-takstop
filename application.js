

const express = require('express'); //npm install express
const cors = require('cors'); //npm i cors
const app = express();

const db = require('./database/connection');

var login = require('./routes/login');
var todolist = require('./routes/todolist');


db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(express.json());
app.use(cors());

app.use('/login', login);
app.use('/todolist', todolist);

app.listen(5000, () => {
    console.log('Server is running on port 5000...');
});