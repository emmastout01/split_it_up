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
                var query = 'SELECT * FROM "houses" WHERE "houseName" = $1;'; 
                console.log('houseName', houseName);
                houses.query(query, [houseName], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        console.log('house code', result.rows[0]);
                        var houseId = result.rows[0].id;
                        if (newMemberCode === result.rows[0].houseCode) {
                            console.log('it\'s a match!');
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
                        } // End if statement: if code matches
                        else {
                            res.sendStatus(401)
                        }
                        // res.send(result.rows);
                    }
                })
            }
        }); //end of pool
    } // end req.isAuthenticated
}); //end of post


module.exports = router;