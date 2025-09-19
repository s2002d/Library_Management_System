import React from "react";
import BookList from "./Components/BookList"


const App: React.FC = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial" }}>
      <h1
        style={{
          background: "white",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease-in-out",
          textAlign: "center",
          fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
          fontSize: "32px",
          color: "#333",
          margin: "20px auto",
          maxWidth: "600px",
        }}>Library Management System</h1>
      <BookList />

    </div>
  );
};

export default App;
