var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var resultsjson = [{name: 'paul'}, {name: 'wes'}];

var pool  = mysql.createPool({
    host     : process.env.MYSQL_HOST || 'localhost', //'104.196.25.135', //'192.168.99.100',
    user     : process.env.MYSQL_USER_NAME || 'root',
    password : process.env.MYSQL_USER_PWD || 'admin',
    database : process.env.MYSQL_DB || 'hellodb',
    connectionLimit: 10
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET API static. */
router.get('/api', function (req, res, next) {
  res.render('index', { title: resultsjson[0].name });
});

/* GET data from sql db. */
router.get('/api/contacts/:contact_id', function (req, res, next) {


    pool.getConnection(function(err, connection) {
        // Use the connection
        var sql = "SELECT * FROM ?? WHERE ?? = ?";
        var inserts = ['contact', 'contact_id', req.params.contact_id];
        sql = mysql.format(sql, inserts);

        connection.query( sql, function(err, rows) {
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query" + err});
            } else {
                res.json(rows);

            }
            // And done with the connection.
            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
    });

});


module.exports = router;
