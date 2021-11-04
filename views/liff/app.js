var express = require('express');
var mysql = require('mysql');

var app = express();

///
///	Create connection to MySQL database server.
/// 
function getMySQLConnection() {
	return mysql.createConnection({
      host: 'phpmyadmin.exodus.tw',
      user: 'meichuhackathon_appuser',
      password: 'UaIBByKYVjtsOrMi',
      database: 'meichuhackathon',
      port: 3306,
	});
}

///
/// Use pug as templating engine. Pug is renamed jade.
///
app.set('view engine', 'pug');

///
/// HTTP Method	: GET
/// Endpoint 	: /person
/// 
/// To get collection of person saved in MySQL database.
///
app.get('/', function(req, res) {
	var myWords = [];

	// Connect to MySQL database.
	var connection = getMySQLConnection();
	connection.connect();

	// Do the query to get data.
	connection.query('SELECT keyword, keyword_id FROM keyword ORDER BY weight desc LIMIT 30', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {

	  			// Create an object to save current row's data
		  		var word = {
		  			'word':rows[i].keyword,
		  			'size':rows[i].keyword_id
		  			//'url':
		  		}
		  		// Add object into array
		  		myWords.push(word);
	  	}

	  	// Render index.pug page using array 
	  	res.render('trend', {"myWords": myWords});
	  	}
	});

	// Close the MySQL connection
	connection.end();
	
});



///
/// Start the app on port 300 
/// The endpoint should be: 
/// List/Index 	: http://localhost:3000/person
/// Details 	: http://localhost:3000/person/2
///
