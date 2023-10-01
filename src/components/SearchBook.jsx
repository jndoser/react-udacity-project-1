import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";
import Book from "./Book";

const SearchBook = ({ books, addBookToShelf }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const searchBooks = async () => {
      try {
        const res = await search(searchQuery.trim(), 10);

        // If book alredy is added before, update the shelf to map with list book
        res.forEach((bookResult) => {
          books.forEach((book) => {
            if (book.id === bookResult.id) {
              bookResult.shelf = book.shelf;
            }
          });

          // If book is not in shelf, default shelf is none
          if (!bookResult.shelf) {
            bookResult.shelf = "none";
          }
        });

        setSearchResult(res);
      } catch (err) {
        setSearchResult([]);
      }
    };
    if (searchQuery.length > 0) {
      const timer = setTimeout(() => {
        searchBooks();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResult([]);
    }
  }, [searchQuery]);

  const searchQueryChangeHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchQuery}
            onChange={searchQueryChangeHandler}
          />
        </div>
      </div>
      {searchResult && searchResult.length > 0 && (
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResult.map((book) => {
              return (
                <li key={book.id}>
                  <Book book={book} addBookToShelf={addBookToShelf} />
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
};

export default SearchBook;
