'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json())

var port = 3030 || process.env.PORT;



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
}

// Books
app.get('/books', function(req, res) {
	res.send(books);
})

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

app.listen(port, function() {
	console.log("Listening on: " + port);
})
