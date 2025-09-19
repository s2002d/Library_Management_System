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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
      />
      <button type="submit">{book?.id ? "Update Book" : "Add Book"}</button>
    </form>
  );
};

export default BookForm;
