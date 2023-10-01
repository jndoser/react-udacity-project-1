import Book from "./Book";

const BookShelf = ({ id, title, books, addBookToShelf }) => {
  const booksInShelf = books.filter((book) => book.shelf === id);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      {booksInShelf && booksInShelf.length > 0 && (
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksInShelf.map((book) => {
              return (
                <li key={book.id}>
                  <Book
                    book={book}
                    addBookToShelf={addBookToShelf}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
};

export default BookShelf;
