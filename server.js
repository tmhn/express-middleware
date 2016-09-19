'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
app.use(bodyParser.json())

var port = 3030 || process.env.PORT;



var books = {
	"library": [{
		"name": "Harry Potter",
		"author": "JK Rowling",
		"authorId": "jk-rowling",
		"id": 789
	}, {
		"name": "Twilight",
		"author": "Steph Smith",
		"authorId": "steph-smith",
		"id": 123
	}, {
		"name": "Sherlock",
		"author": "Arthur Conan Doyle",
		"authorId": "arthur-conan-doyle",
		"id": 456
	},{
		"name": "The Sweet Gold",
		"author": "Daniel James",
		"authorId": "daniel-james",
		"id": 987
	},{
		"name": "Shark Core",
		"author": "Daniel James",
		"authorId": "daniel-james",
		"id": 382
	}]
}

// Books
app.get('/books', function(req, res) {
	res.send(books);
})

app.get('/books/:id', function(req, res) {
	var bookId = req.params.id;
	var result;

	for(var i = 0; i < books.library.length; i++) {
		if(bookId == books.library[i].id) {
			result = books.library[i];
			break;
		} else {
			result = "Book not found";
		}
	}
	res.send(result);
})

app.get('/books/author/:authorId', function(req, res) {
	var authorId = req.params.authorId;
	var result = {};

	for (var i = 0; i < books.library.length; i++) {
		if(authorId == books.library[i].authorId) {
			console.log(books.library[i]);
			_.extend(result, books.library[i]);
		}
	}

	res.json(result);
})

app.listen(port, function() {
	console.log("Listening on: " + port);
})
