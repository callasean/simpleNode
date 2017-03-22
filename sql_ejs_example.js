var express = require('express');
var mysql = require('mysql');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
var connection = mysql.createConnection({
    host: '206.12.96.242',
    user: 'group5',
    password: 'untanglingGroup5',
    database: 'group5DB'
});
connection.connect();

var employees;

connection.query('SELECT * FROM coupons where category = "FOOD" or category = "GENERAL"', function(err, rows, fields) {
    if (err) throw err;

    employees = rows;
    console.log(rows[0]);
});

connection.end();

app.get('/', function(req, res) {


    res.render('simple1', { employees: employees })
})

// about page 
app.get('/about', function(req, res) {
    var sentence = "this is a test about page, passed as a variable through ejs";
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    res.render('about', {
        drinks: drinks,
        sentence: sentence
    });
});

app.listen(8005, function() {
    console.log('Example app listening on port 8005!')
})