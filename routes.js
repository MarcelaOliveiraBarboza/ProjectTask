const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');

const { loginRequired } = require('./src/middlewares/middleware')

// home routes
route.get('/', homeController.homePage);

// login routes
route.get('/login', loginController.homePage);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// contact routes
route.get('/contact', loginRequired, contactController.contacts);
route.post('/contact/register', loginRequired, contactController.register);
route.get('/contact/homePage/:id', loginRequired, contactController.editHomePage);

module.exports = route;
