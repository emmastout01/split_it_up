var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');


//Will move this to a currentHouse router if it's helpful to me
router.get('/:id', function(req, res) {
    var houseId = req.params.id;
    console.log('req.params for get request', houseId);
    if (req.isAuthenticated) {
        pool.connect(function (err, db, done) {
            if (err) {
                console.log("Error connecting: ", err);
                res.sendStatus(500);
            }
            else {
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
            }
        }); //end of pool
    } // end req.isAuthen
})



module.exports = router;