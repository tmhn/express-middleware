'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

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
};

// Books
app.get('/books', function(req, res) {
	console.log()
	res.send(books);
});

app.get('/books/new', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

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


app.post('/books', function(req, res){
	var newBook = {
		id : req.body.id,
		name : req.body.name,
		author : req.body.author,
		authorId : req.body.authorId
		}
	res.send(newBook);
	books.library.push(newBook);
	books.save();
});

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
});
