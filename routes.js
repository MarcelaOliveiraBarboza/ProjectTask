const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

// home routes
route.get('/', homeController.homePage);

// login routes
route.get('/login', loginController.homePage);
route.post('/login/register', loginController.register);


module.exports = route;
