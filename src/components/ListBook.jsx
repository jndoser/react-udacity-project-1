import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

const ListBook = ({ bookShelfs, books, addBookToShelf }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookShelfs.map((bookShelf) => {
            return (
              <BookShelf
                key={bookShelf.id}
                id={bookShelf.id}
                title={bookShelf.title}
                books={books}
                addBookToShelf={addBookToShelf}
              />
            );
          })}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default ListBook;
