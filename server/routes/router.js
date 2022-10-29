const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');


/* Notice I have separated the callback function in router.js 
in the service folder to maintain the callbacks separately*/

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)


/* To create and add new user i am using post method */
/* When I make a get request on route i want to execute find method*/
/* When I call a put method on this path I need to specify the value to the ID 
here I am passing a parameter to this path*/
/* When I call a delete method on this path then I am passing a parameter to this path 
to get a single user by id passing ID*/

// API for this application
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);
 
module.exports = route;