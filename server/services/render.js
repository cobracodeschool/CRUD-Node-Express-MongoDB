const axios = require('axios');


exports.homeRoutes = (req, res) => {
   // ADD DATABASE DATA
   // Make a get request to /api/users and this get req and return the promise that mean return the all data in the database
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            console.log(response);
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

// ADD FORM
// Make a PUSH request to /api/users and add all the  data in the add_form  to mongoDB database
exports.add_user = (req, res) =>{
    res.render('add_user');
}


/* 
* UPDATE FORM
* Instead of just returning the update user i'm going to return the data as well with this render method
* By using axios.get method and query method i get the single user here
* when i get the record and pass it to the user variable so i can access it from the update user file.
*/
exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})

        .then(function(userdata){                //here iam get the specific user data and pass that data here
            res.render("update_user", { user : userdata.data})    
        })
        .catch(err =>{
             res.send(err);
        })
}

/* when i make a request with the above url i need to pass the key and value paid for the id variable 
Go to the show.ejs file 
*/
