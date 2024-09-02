const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const taskController = require('./src/controllers/taskController');

const { loginRequired } = require('./src/middlewares/middleware')

// home routes
route.get('/', homeController.homePage);

// login routes
route.get('/login', loginController.homePage);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// task routes
route.get('/task', loginRequired, taskController.tasks);
route.post('/task/register', loginRequired, taskController.register);
route.get('/task/homePage/:id', loginRequired, taskController.editHomePage);
route.post('/task/edit/:id', loginRequired, taskController.edit);
route.get('/task/delete/:id', loginRequired, taskController.delete);

module.exports = route;
