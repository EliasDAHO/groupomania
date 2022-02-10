const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const { sequelize } = require('./models/index');

const app = express();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');


const connect = async function () {
    try {
      await sequelize.authenticate();
      console.log('La connexion a été établie avec succès à SQL.');
    } catch (error) {
      console.error('Impossible de se connecter à la base de données SQL:', error);
    }
  };
  connect();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/comments', commentRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);





module.exports = app;