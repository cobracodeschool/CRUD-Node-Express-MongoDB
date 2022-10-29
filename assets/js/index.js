

/* UPDATE DATA */
$("#add_user").submit(function(event){                     //add_user is id from form
    alert("Data Inserted Successfully!");
})


/* UPDATE THE DATA */
$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
/*     console.log(unindexed_array); */                    //used to view data when update form is submitted
    var data = {}                                          //Passing a object

    /* Here i want to make id as a key of the value, So i can pass the array to the PUT request
    to update form in the database so here i am using map method for this*/

    $.map(unindexed_array, function(n, i){                 //Here the 1st argument return all the data from the array
        data[n['name']] = n['value']                       //and this i return the index from the array
    })

    // console.log(data);                                  // converted data view

    var request = {                                        //Passing an object as a variable
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){               //using ajax to make a request and get response from the server using done method
        alert("Data Updated Successfully!");
    })

})


/* DELETE DATA || LINK - GOTO SHOW.JS */
if(window.location.pathname == "/"){                               // I don't have a href iu <a> tag I don't want user to navigate anywhere else
    $ondelete = $(".table tbody td a.delete");                     // Selection of user data in table 
    $ondelete.click(function(){                                    //click method
        var id = $(this).attr("data-id")                           //used to get current user id

        var request = {                                            // Passing an object as a variable
            "url" : `http://localhost:3000/api/users/${id}`,       // url for delete user
            "method" : "DELETE"                                    // Method for delete
        }

        if(confirm("Do you really want to delete this record?")){  //confirm method to get permission from user
            $.ajax(request).done(function(response){               //using ajax to make a request and get response from the server using done method
                alert("Data Deleted Successfully!");               // Alert box for deletion
                location.reload();                                 //Reload the browser
            })
        }

    })
}
