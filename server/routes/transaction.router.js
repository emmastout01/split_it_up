var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');

// Handles POST request with new transaction
router.post('/', function (req, res) {
    if (req.isAuthenticated()) {
        var newTrans = req.body;
        pool.connect(function (err, db, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            else {
                var queryText = 'SELECT "id" FROM "categories" WHERE "categoryName" = $1;' 
                db.query(queryText, [newTrans.category], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        var category_id = result.rows[0].id;
                        console.log('result', result, 'category id', category_id);
                        var queryText =  'INSERT INTO "transactions" ("user_id", "house_id", "date", "amount", "category_id", "notes", "viewReceipt") VALUES ($1, $2, $3, $4, $5, $6, $7);'
                        db.query(queryText, [newTrans.userId, newTrans.houseId, newTrans.date, newTrans.amount, category_id, newTrans.notes, newTrans.photo], function (errorMakingQuery, result) {
                            done();
                            if (errorMakingQuery) {
                                console.log('error making query', errorMakingQuery);
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(201);
                            }
                        });
                    }
                });
            }
        }); //end of pool
    } // end req.isAuthenticated
}); //end of post

// Handles transaction GET request
router.get('/:id', function (req, res) {
    var houseId = req.params.id;
    if (req.isAuthenticated()) {
        pool.connect(function (err, db, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            else {
                var queryText = 'SELECT "transactions".*, "categories"."categoryName", "users"."username" FROM "transactions" JOIN "categories" ON "categories"."id" = "transactions"."category_id" JOIN "users" ON "users"."id" = "transactions"."user_id" WHERE "transactions"."house_id" = $1'
                db.query(queryText, [houseId], function (errorMakingQuery, result) {
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
        var transaction = req.body;
        var transactionId = req.params.id; 
        pool.connect(function (err, db, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            else {
                var queryText = 'SELECT "id" FROM "categories" WHERE "categoryName" = $1;' 
                db.query(queryText, [transaction.category], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        var category_id = result.rows[0].id;
                        var queryText = 'UPDATE "transactions" SET "amount" = $1, "category_id" = $2, "date" = $3, "notes"= $4, "viewReceipt"=$5 WHERE "id" = $6;'
                        db.query(queryText, [transaction.amount, category_id, transaction.date, transaction.notes, transaction.photo, transactionId], function (errorMakingQuery, result) {
                            done();
                            if (errorMakingQuery) {
                                console.log('error making query', errorMakingQuery);
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(201);
                            }
                        });
                    }
                });
            }
        }); //end of pool
    } // end req.isAuthenticated
}); //end of put


module.exports = router;