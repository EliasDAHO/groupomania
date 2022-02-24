const express = require('express');
const bodyParser = require('body-parser');
const { sequelize }=  require('./models');
const path = require("path")


const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentsRoutes = require('./routes/comment') 
 
 const connect = async function() {
    try{
       await sequelize.authenticate();
        console.log('Connection has been successfully established !'); 
     }
     catch (error) {
        console.error('Unable to connect to the database !')
     }
 };
 connect();


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());
app.use(bodyParser.json());
app.use('/images',express.static(path.join(__dirname,'images')));

app.use('/api/auth',userRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/comments',commentsRoutes);

module.exports = app;