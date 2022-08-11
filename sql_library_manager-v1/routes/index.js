var express = require('express');
var router = express.Router();
var Book = require( '../models').Book;

/* GET home page. */
router.get('/', async(req, res, next) => {
  const books = await Book.findAll();
  console.log( books.map(book => book.toJSON()) );
  res.json(books);
});

module.exports = router;
