/* Using controller we can create, remove, update and delete records */

var Userdb = require('../model/model'); //imported the schema
 
// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be empty!"});
        return;
        // Here i'm going to say response dot status & status code is 400 which is error code and then send the message object.
        // Here i'm going to say err message 
    }
    /* If the user make a post request from the empty body I just return they above callback function. 
    when ever user make a post request you need to specify the body of the post request.
    when you make a post request using a form all the data in the form is stored in the body of the request object 
    and using the body we can access all the form data. */

    // create a new instance of the userdb schema
    const user = new Userdb({
        name : req.body.name,  /* When the user make a post req we can access the name property form the body */
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status 
    }) // The data is going to match the model schema

    /* Inside the controller we store the above data and create a new instance of userdb model and store is in the var user*/
    /* 
    * If the user make a post request from the empty body i'm just gonna exit from the method.
    * If user post request with body I will get all the content from the user and create a instance(object) this model.
    * so once i have the instance of this userdb model i'm just going to save it inside the MongoDB database using the save method.
    * Just out of that i'm going to call the promise then and then return this save data to the user.
    * and if there is any error inside this statement i'm gonna call this catch method.
    */
    /* Method Chaining is the practice of calling different methods in a single line instead of calling 
    other methods with the same object reference separately. Under this procedure, we have to 
    write the object reference once and then call the methods by separating them with a (dot.). */

    // save user in the database     /* ***** doubt  in console page*/
    user
        .save(user)               /* This method save the data in the mongodb database & I am passing the object here*/
        .then(data => {           /* This is promise then method */
            // res.send(data)
            res.redirect('/add-user'); //Using this method i going to redirect the user to different url
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}
/* Inside the find method we are going to get the query parameter and get the single user from the database*/






// retrieve and return all users/ retrieve and return a single user
exports.find = (req, res)=>{
    /*
    * TO get the single user I am using the query method here. I'm just gonna pass query parameter here 
    * when i make get request to the route I'm gonna just return a query parameter and then i get that query parameter
    * and pass inside this callback function an get a specific user.
    */
    if(req.query.id){              //If I have this id parameter of the query then i'm gonna return the specific user 
               
        const id = req.query.id;   
        /* Inside the if statement if i have query parameter to this request i'm going to just get that query parameter 
           And store it in the id variable 
        */

        Userdb.findById(id)        //Passing id var in findBYId method in userdb object
            .then(data =>{         //Passing data var in then method
                if(!data){         
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })
    }
    else{                         //otherwise i'm gonna return all the user in else statement

        Userdb.find()             // I called a find method in userdb object
            .then(user => {       // Here passing user as a parameter
                res.send(user)    // In the call back function i'm going to set response.send user
            })
            .catch(err => {       // called a catch method to return the error message if there is any error inside the statement.
                res.status(500).send({ message : err.message || "Error Occurred while retrieving user information" })
            })
            // Here i'm going to say response dot status & status code is 500 which ius error code and then send the message object.
            // Here i'm going to say err dot message & if this variable is not available send the default value.
    }
}

/* 
* In find method inside it i'm gonna read the data from the database, 
* So i'm gonna get the data from the database first and return as a response 
* I called a find method in userdb object then I called then method of promise after that call catch method.
*/






// Update a new identified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    
    /* 
     * I am just going to get the id value from the request(/api/users/:id) in router using this parm object.
     * In express there are two type of route parameters they are -->url parameters & --> query parameters
     * This is the type of url parameter we created a variable in the url this is what we call url parameter.
     * when we make put request i need to specify value to this id parameter. this value is going to specify id variable using this statement.
     * So when I make a req with id value. The value is going to pass through the parameter object
       & to this id variable we can get that value and store it in the variable  and this is a url parameter
    */


/* Calling findByIdAndUpdate method. Inside I specified the id var which I want to update from req.body i'm going to pass the data
   which i want to update iam using useFindAndModify method as false inside curly brace */

    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false}) 
        .then(data => {
            if(!data){                  
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}






// Delete a user with specified user id in the request
/* When i make a request the id is pass through the variable and pass through the object and 
the bellow statement delete the record from the mongoDB database */

exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {               //specify the parameter data
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}


/* As we know when I make a request this id going to pass to this variable an pass through this object 
and this statement will delete the this record from mongoDB database */