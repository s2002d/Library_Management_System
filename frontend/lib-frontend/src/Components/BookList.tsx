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
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
          color: "#4f46e5",
        }}
      >Library Books</h2>

      {/* Book form for adding/updating */}
      <div style={{ marginBottom: "30px" }}><BookForm book={editingBook} refresh={fetchBooks} /></div>

      {/* List of books */}
      {books.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No books available.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}>
          {books.map((book) => (
            <div key={book.id}
              style={{
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              <p style={{ fontSize: "20px", color: "#4338ca" }}><strong>Title:</strong> {book.title}</p>
              <p style={{ margin: "5px 0", color: "#333" }}><strong>Author:</strong> {book.author}</p>
              <p style={{ margin: "10px 0", color: "#555" }}><strong>Description:</strong> {book.description}</p>
              <button onClick={() => setEditingBook(book)}
                style={{
                  padding: "8px 16px",
                  background: "#f59e0b",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >Edit</button>
              <button onClick={() => deleteBook(book.id)}
                style={{
                  padding: "8px 16px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >Delete</button>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
