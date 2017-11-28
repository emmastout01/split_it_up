var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');


// Handles GET request with user houses
router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        var userId = req.user.id;
        pool.connect(function (err, houses, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            else {
                var queryText = 'SELECT "houses"."houseName", "houses"."id" FROM "houses" JOIN "members" ON "houses"."id" = "members"."house_id" WHERE "user_id" = $1'
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


//Will also have an update or delete route here: Users who are a member of a house will be able to remove themselves from that house


module.exports = router;