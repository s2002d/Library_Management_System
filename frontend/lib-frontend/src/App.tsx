import React from "react";
import BookList from "./Components/BookList"


const App: React.FC = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial" }}>
      <h1>Library Management System</h1>
      <BookList/>
      
    </div>
  );
};

export default App;
