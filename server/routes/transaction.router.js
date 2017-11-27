var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');

// Handles POST request with new transaction
router.post('/', function (req, res) {
    if (req.isAuthenticated) {
        var newTrans = req.body;
        pool.connect(function (err, db, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            else {
                var queryText = 'INSERT INTO "transactions" ("date", "amount", "category_id", "notes", "viewReceipt") VALUES ($1, $2, $3, $4, $5);'
                db.query(queryText, [newTrans.date, newTrans.amount, newTrans.category, newTrans.notes, newTrans.photo], function (errorMakingQuery, result) {
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

// Handles transaction GET request
router.get('/', function (req, res) {
    if (req.isAuthenticated) {
        pool.connect(function (err, db, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            else {
                var queryText = 'SELECT * FROM "transactions"'
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