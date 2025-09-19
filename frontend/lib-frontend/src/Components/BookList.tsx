import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Fetch all books from backend
  const fetchBooks = async () => {
    const res = await fetch("http://localhost:5194/api/books");
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete a book
  const deleteBook = async (id: number) => {
    await fetch(`http://localhost:5194/api/books/${id}`, { method: "DELETE" });
    fetchBooks();
  };

  return (
    <div>
      <h2>Library Books</h2>

      {/* Book form for adding/updating */}
      <BookForm book={editingBook} refresh={fetchBooks} />

      {/* List of books */}
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div>
          {books.map((book) => (
            <div key={book.id}>
              <p><strong>Title:</strong> {book.title}</p>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Description:</strong> {book.description}</p>
              <button onClick={() => setEditingBook(book)}>Edit</button>
              <button onClick={() => deleteBook(book.id)}>Delete</button>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
