import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SearchBook from "./components/SearchBook";
import ListBook from "./components/ListBook";
import { getAll, update } from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await getAll();
      setBooks(res);
    };
    getBooks();
  }, []);

  const bookShelfs = [
    {
      id: "currentlyReading",
      title: "Currently Reading",
    },
    {
      id: "wantToRead",
      title: "Want to Read",
    },
    {
      id: "read",
      title: "Read",
    }
  ];
  
  const addBookToShelf = async (newBook, shelf) => {
    await update(newBook, shelf);

    if (newBook.shelf === "none" && shelf !== "none") {
      setBooks([...books, { ...newBook, shelf: shelf }]);
      return;
    }

    // if is already added before, change its shelf
    const newBooks = books.map((book) => {
      if (book.id === newBook.id) {
        book.shelf = shelf;
      }
    });

    setBooks([...books, newBooks]);

    // if use choose none, remove the book from shelf
    if (shelf === 'none') {
      const newBooks = books.filter((book) => book.id !== newBook.id);
      setBooks(newBooks);
    }
  }

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<ListBook bookShelfs={bookShelfs} books={books} addBookToShelf={addBookToShelf} />} />
        <Route path="/search" element={<SearchBook books={books} addBookToShelf={addBookToShelf} />} />
      </Routes>
    </div>
  );
}

export default App;
