var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');


// Handles POST request with new house
router.post('/', function (req, res) {
    if (req.isAuthenticated) {
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
    if (req.isAuthenticated) {
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

// Handles GET request with user houses
router.get('/:id', function (req, res) {
    if (req.isAuthenticated) {
        var userId = req.params.id;
        pool.connect(function (err, houses, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            else {
                // SELECT "warehouse"."warehouse", "products"."description"
                // FROM "warehouse" JOIN "warehouse_product" ON "warehouse"."id" = "warehouse_product"."warehouse_id"
                // JOIN "products" ON "products"."id" = "warehouse_product"."product_id"
                // WHERE "description" = 'diet pepsi';
                //Select the house name. I want the house name of the houses where the user is a member. So, I think I want a join here. Select houseName from Houses join Members on house_id WHERE "user_id" = $1 ($1 = the variable userId)
                var queryText = 'SELECT "houses"."houseName" FROM "houses" JOIN "members" ON "houses"."id" = "members"."house_id" WHERE "user_id" = $1'
                houses.query(queryText, [userId], function (errorMakingQuery, result) {
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
