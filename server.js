'use strict';

var express = require('express');
var app = express();

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
	let paramsId = req.params;
	// console.log(paramsId)
	console.log(books.library.length)

	for(var i = 0; i < books.library.length; i++) {
		if(paramsId == books.library[i].id) {
			res.send(books.library[i]);
		} else {
			res.send("Not found the book");
		}
	}
})

app.listen(port, function() {
	console.log("Listening on: " + port);
})
