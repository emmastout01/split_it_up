var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');


// Handles GET request with new house
router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (err, db, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            else {
                var queryText = 'SELECT * FROM "categories"'
                db.query(queryText, function (errorMakingQuery, result) {
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

module.exports = router;
