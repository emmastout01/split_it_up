var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');


// Handles POST request with new house
router.post('/', function (req, res) {
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
}); //end of post


module.exports = router;
