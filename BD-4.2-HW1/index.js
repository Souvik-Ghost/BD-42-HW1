let express = require("express");
let app = express();
let port = 3000;
let db;
let sqlite3 = require("sqlite3");
let { open } = require("sqlite");

app.listen(port, () => {
  console.log(`The Server is running on port: ${port}`);
});

// Connect to SQLite database
(async () => {
  try {
    db = await open({
      filename: './BD-4.2-HW1/database.sqlite',
      driver: sqlite3.Database,
    });
    console.log("Connected to the SQLite database.");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
})();
//Message
app.get("/", (req, res) => {
  res.status(200).json({ message: "BD 4.2 HW1 Error Handling" });
});
// THE ENPOINTS
// 1. /books
async function getBooks() {
  let query = ("SELECT * FROM books");
  let response = await db.all(query, []);
  return { books: response };
}
app.get("/books", async (req, res) => {
  try {
    let result = await getBooks();
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No books found." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//books

//2 /books/author/George%20Orwell
async function getAllBooksByAuthor(author) {
  let query = ("SELECT * FROM books WHERE author = ?");
  let response = await db.all(query, [author]);
  return { books: response };
}
app.get('/books/author/:author', async (req, res) => {
  try {
    let author = req.params.author;
    let result = await getAllBooksByAuthor(author);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No books found for the given author." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//3 /books/genre/Fiction
async function getAllBooksByGenre(genre) {
  let query = ("SELECT * FROM books WHERE genre = ?");
  let response = await db.all(query, [genre]);
  return { books: response };
}
app.get('/books/genre/:genre', async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await getAllBooksByGenre(genre);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No books found for the given genre." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})
//4 /books/publication_year/1960
async function getAllBooksByPublicationYear(publication_year) {
  let query = ("SELECT * FROM books WHERE publication_year = ?");
  let response = await db.all(query, [publication_year]);
  return { books: response };
}
app.get('/books/publication_year/:publication_year', async (req, res) => {
  try {
    let publication_year = req.params.publication_year;
    let result = await getAllBooksByPublicationYear(publication_year);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No books found for the given publication year." });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})