var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');


//Will move this to a currentHouse router if it's helpful to me
router.get('/:id', function (req, res) {
    //Id coming from house controller --> house service: $routeParams.id
    var houseId = req.params.id;
 
    //Check if user is authenticated
    if (req.isAuthenticated()) {
        var userId = req.user.id;
        console.log('req.user for get request', userId);
        pool.connect(function (err, db, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            // Check to see if the current user is a member of the house they want to access.
            else {
                var memberOfHouse = false;
                // Run query to get the house ids that the user is already associated with
                var query = 'SELECT "members"."house_id" FROM "members" WHERE "user_id" = $1'
                db.query(query, [userId], function (err, result) {
                    if (err) {
                        console.log('error', err);
                        res.sendStatus(500);
                    } else {
                        //Loop through all house ids user id matches (in other words, houses the user has joined). If the user is a member, memberOfHouse=true.
                        for (var i = 0; i < result.rows.length; i++) {
                            if (parseInt(houseId) === parseInt(result.rows[i].house_id)) {
                                memberOfHouse = true;
                            } 
                        }
                        //If user is a member of the house they want to access, run the GET request that will send back house data.
                        if (memberOfHouse) {
                            var queryText = 'SELECT * FROM "houses" WHERE "id" = $1'
                            db.query(queryText, [houseId], function (errorMakingQuery, result) {
                                done();
                                if (errorMakingQuery) {
                                    console.log('error making query', errorMakingQuery);
                                    res.sendStatus(500);
                                } else {
                                    res.send(result.rows);
                                }
                            });
                            //If user is not a member of the house, send a status of 'unauth'.
                        } else {
                            res.sendStatus(401);
                        }
                    }
                });
            }
        }) //end of pool
    } // end req.isAuthenticated
}) // end of GET request

    module.exports = router;