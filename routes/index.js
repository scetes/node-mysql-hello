var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var resultsjson = [{name: 'paul'}];

var mysqlconnection = mysql.createConnection({
    host     : process.env.MYSQL_HOST || 'localhost', //'104.196.25.135', //'192.168.99.100',
    user     : process.env.MYSQL_USER_NAME || 'root',
    password : process.env.MYSQL_USER_PWD || 'admin',
    database : process.env.MYSQL_DB || 'hellodb'
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
router.get('/api/sql', function (req, res, next) {

    mysqlconnection.connect();

    function onQueryEvent(err, rows) {
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    }

    mysqlconnection.query('SELECT name from contact', onQueryEvent);

    //console.log('response ' + resultsjson[0].name);
    //res.render('contacts', {title:  resultsjson[0].name});

});




//get contacts
function getContacts() {

  var mysqlconnection = mysql.createConnection({
    host     : '192.168.99.100',
    user     : 'root',
    password : 'admin',
    database : 'hellodb'
  });

  mysqlconnection.connect();


     var query = mysqlconnection.query('SELECT name from contact');

    query.on('result', function(row) {
        console.log('name: ' + row.name);
        resultsjson[0].name = row.name;

    });


    /*
      query.on('error', function(err) {
        throw err;
      });
      console.log('query resulte: ' + query);

      query.on('fields', function(fields) {
        console.log('fields: ' + fields);
      });

     query.on('result', function(row) {
     console.log('name: ' + row.name);

     });


     function mylistener(err, rows, fields) {
     if (err) throw err;

     resultsjson = rows;

     for (var i in rows) {
     console.log('Post Titles: ', rows[i].name);

     }

     };

     mysqlconnection.query('SELECT name from contact', resultsjson = mylistener);
     */

    return query;

}



module.exports = router;
