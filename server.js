'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 3030 || process.env.PORT;
//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies
//app.use(express.json() );
//app.use(express.urlencoded() );
//app.use( json() );
//app.use( urlencode() );
//app.use(bodyParser.json());


var books = {
	"library": [{
		"name": "Harry Potter",
		"author": "JK Rowling",
		"id": 789
	}, {
		"name": "Twilight",
		"author": "Steph Smith",
		"id": 123
	}, {
		"name": "Sherlock",
		"author": "Arthur Conan Doyle",
		"id": 456
	}]
};

// Books
app.get('/books', function(req, res) {
	console.log()
	res.send(books);
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/books/:id', function(req, res) {
	var paramsId = req.params.id;
	var result;
	console.log(books.library.length)

	for(var i = 0; i < books.library.length; i++) {
		if(paramsId == books.library[i].id) {
			console.log("Book found");
			result = books.library[i];
			break;
		} else {
			console.log("Book not found");
			result = "Book not found";
		}
	}
	res.send(result);
})

app.post('/books', function(req, res){
	var newBook = {
		id : req.body.id,
		name : req.body.name,
		author : req.body.author
		}
	res.send(newBook);
	books.library.push(newBook);
	books.save();
});

app.listen(port, function(req, res) {
	console.log("Listening on: " + port);
})
