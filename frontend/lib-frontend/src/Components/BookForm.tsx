import React, { useState, useEffect } from "react";

interface Book {
  id?: number;
  title: string;
  author: string;
  description: string;
}

interface Props {
  book: Book | null;
  refresh: () => void;
}

const BookForm: React.FC<Props> = ({ book, refresh }) => {
  const [formData, setFormData] = useState<Book>({
    title: "",
    author: "",
    description: "",
  });

  // Update form when editing a book
  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = book?.id
      ? `http://localhost:5194/api/books/${book.id}`
      : "http://localhost:5194/api/books";

    const method = book?.id ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // Clear form after submit
    setFormData({ title: "", author: "", description: "" });
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}

      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",

      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        style={{
          width: "100%",
          padding: "10px",
          margin: "8px 0",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <input
        type="text"
        placeholder="Author"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        required
        style={{
          width: "100%",
          padding: "10px",
          margin: "8px 0",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
        style={{
          width: "100%",
          padding: "10px",
          margin: "8px 0",
          border: "1px solid #ccc",
          borderRadius: "5px",
          resize: "none",
          height: "80px",
        }}
      />
      <button type="submit"
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}

      >{book?.id ? "Update Book" : "Add Book"}</button>
    </form>
  );
};

export default BookForm;
