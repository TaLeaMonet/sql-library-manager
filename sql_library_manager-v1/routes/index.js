var express = require('express');
var router = express.Router();
var Book = require( '../models').Book;


/* GET / - Redirects to /books route. */
router.get('/', async(req, res, next) => {
  res.redirect('/books');
});

/* GET /books - Shows the full list of books */
router.get('/books', async(req, res, next) => {
  const books = await Book.findAll();
  console.log( books.map(book => book.toJSON()) );
  res.render('index', {books, title: "Books"});  
});

/* GET /books/new - Shows the create new book form */
router.get('/books/new', async(req, res, next) => {
 const books = Book.findAll();
 res.render('new-book');
});

/* POST /books/new - Posts a new book to the database */ 
router.post('/books/new', async(req, res, next) => {
 const book = await Book.create(req.body);
 res.redirect('/books');
});

/* POST /books/new - Shows book detail form */ 
router.post('/books/:id', async(req, res, next) => {
 

});
/* GET /books/:id - Updates book info in the database */ 
router.get('/books/:id', async(req, res, next) => {
  

});
/* POST /books/:id/delete - Deletes a book - Careful, this can't be undone - create test book! */ 
router.post('/books/:id/delete', async(req, res, next) => {
  

});

module.exports = router;
