const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const articleShopRoutes = require('./routes/articleRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'img')));

app.use(articleShopRoutes);

mongoose.
connect('mongodb+srv://admin:8fxzsX9US8zBEOFj@batman-mkrpo.mongodb.net/shop?retryWrites=true&w=majority')
.then(result =>{
    app.listen(3000);
})
.catch(err =>{
    console.log("Error connecting database")
});

