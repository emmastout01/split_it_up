var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');


// Handles POST request with new member
router.post('/', function (req, res) {
    if (req.isAuthenticated) {
        var newMemberCode = req.body.code;
        var houseName = req.body.selectedHouse;
        var userId = req.body.userId;
        console.log('req.body', req.body);
        pool.connect(function (err, houses, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            else {
                var memberAlreadyJoined = false;
                //Run query to get house code for the house user selected
                var query = 'SELECT * FROM "houses" WHERE "houseName" = $1;';
                houses.query(query, [houseName], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        console.log('house code', result.rows[0]);
                        var houseId = result.rows[0].id;
                        //If code user entered = house code, proceed to next step
                        if (newMemberCode === result.rows[0].houseCode) {
                            console.log('it\'s a match!');
                            // Run query to get the house ids that the user is already associated with
                            query = 'SELECT "members"."house_id" FROM "members" WHERE "user_id" = $1'
                            houses.query(query, [userId], function (err, result) {
                                if (err) {
                                    console.log('error', err);
                                    res.sendStatus(500);
                                } else {
                                    //Loop through all house ids user id matches (in other words, houses the user has joined). If the user has joined a house, memberAlreadyJoined = true.
                                    for (var i = 0; i < result.rows.length; i++) {
                                        if (houseId === result.rows[i].house_id)
                                            memberAlreadyJoined = true;
                                    }
                                    //If member has joined a house, send back status and tell the user they have already joined the house.
                                    if (memberAlreadyJoined) {
                                        //Send 'conflict' status. This triggers a message on the DOM
                                        res.sendStatus(409);
                                    } else {
                                        //If member has not already joined, add that user to the member table 
                                        var queryText = 'INSERT into "members" ("user_id", "house_id") VALUES ($1, $2);';
                                        houses.query(queryText, [userId, houseId], function (errorMakingQuery, result) {
                                            done();
                                            if (errorMakingQuery) {
                                                console.log('error making query', errorMakingQuery);
                                                res.sendStatus(500);
                                            } else {
                                                res.sendStatus(201);
                                            }
                                        });
                                    }

                                }
                            })
                        } // End if statement: if code matches
                        else {
                            res.sendStatus(401)
                        }
                    }
                })
            }
        })//end of pool
    } // end req.isAuthenticated
});  //end of post

//delete member from house
router.delete('/:id', function (req, res) {
    if (req.isAuthenticated) {
        var houseId = req.params.id;
        var userId = req.user.id;
        console.log('house id', houseId, 'user id', userId);
        pool.connect(function (errorConnecting, db, done) {
            if (errorConnecting) {
                console.log('Error connecting ', errorConnecting);
                res.sendStatus(500);
            } else {
                var queryText = 'DELETE FROM "members" WHERE "house_id" = $1 AND "user_id" = $2;'
                db.query(queryText, [houseId, userId], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('errorMakingQuery', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
            }
        });//end of pool
    } //end of is authenticated
});//end of delete

module.exports = router;