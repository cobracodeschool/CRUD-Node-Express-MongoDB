/* Using controller we can create, remove, update and delete records */

var Userdb = require('../model/model');
 
// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    /* If the user make a post request from the empty body i just return they above callback function. 
    when ever user make a post request you need to specify the body of the post request.
    when you make a post request using a form all the data in the form is stored in the body of the request object 
    and using the body we can access all the form data. */

    // create a new instance of the userdb schema
    const user = new Userdb({
        name : req.body.name,  /* When the user make a post req we can access the name property form the body */
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
        // The data is going to match the model
    })
    /* Inside the controller we store the above data and create a new instance of userdb model and store is in the var user*/

    // save user in the database
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user');
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

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
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
    else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retrieving user information" })
            })
    }
}



// Update a new identified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    /* So when I make a req with id value. The value is going to pass through the parameter object
     & to this id variable we can get that value and store it in the variable  and this is a url parameter*/

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
        .then(data => {
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