var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');


// Handles POST request with new house
router.post('/', function (req, res) {
    if (req.isAuthenticated()) {
        var newHouse = req.body;
        pool.connect(function (err, houses, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            else {
                var queryText = 'INSERT INTO "houses" ("houseName", "houseCode", "totalRent", "closeOutDate") VALUES ($1, $2, $3, $4) RETURNING "id";'
                houses.query(queryText, [newHouse.houseName, newHouse.houseCode, newHouse.totalRent, newHouse.closeOutDate], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
            }
        }); //end of pool
    } // end req.isAuthenticated
}); //end of post

// Handles GET request with new house
router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (err, houses, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            else {
                var queryText = 'SELECT * FROM "houses"'
                houses.query(queryText, function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
            }
        }); //end of pool
    } // end req.isAuthenticated
}); //end of get route

//Handles transaction PUT request
router.put('/:id', function (req, res) {
    if (req.isAuthenticated()) {
        var house = {
            houseCode: req.body.houseCode,
            totalRent: parseInt(req.body.totalRent),
            closeOutDate: parseInt(req.body.closeOutDate)
        }
        console.log('req params', req.params.id);
        var houseId = req.params.id;
        console.log('house', house);
        pool.connect(function (err, db, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            else {
                var queryText = 'UPDATE "houses" SET "houseCode" = $1, "totalRent" = $2, "closeOutDate" = $3 WHERE "id" = $4;'
                db.query(queryText, [house.houseCode, house.totalRent, house.closeOutDate, houseId], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
            }
        }); //end of pool
    } // end req.isAuthenticated
}); //end of put


module.exports = router;
