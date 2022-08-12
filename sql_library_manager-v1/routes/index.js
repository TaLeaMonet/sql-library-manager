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
  try {
    const book = await Book.create(req.body);
    res.redirect('/books');
  } catch(error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      console.log(error.errors);
      res.render("new-book", {book, errors: error.errors, title: "Please correct errors."})
    } else {
      throw error;
    }
  }
});

/* GET /books/new - Shows book detail form */ 
router.get('/books/:id', async(req, res, next) => {
 const book = await Book.findByPk(req.params.id);
 res.render('update-book', { book, title: book.title })
});
/* POST /books/:id - Updates book info in the database */ 
router.post('/books/:id', async(req, res, next) => {
  let book;
  try {
    const book = await Book.findByPk(req.params.id);
    if(book) {
      await article.update(req.body);
    } else {
      res.sendStatus(404);
    }
  } catch(error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("books/new", {book, errors: error.errors, title: "New Book"})
    } else {
      throw error;
    }
  }
  res.redirect('/books');
});
/* POST /books/:id/delete - Deletes a book - Careful, this can't be undone - create test book! */ 
router.post('/books/:id/delete', async(req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books');
});

module.exports = router;
