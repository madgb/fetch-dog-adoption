import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import MatchPage from "./pages/MatchPage";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = document.cookie.includes("fetch-access-token");
    setIsAuthenticated(token);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/search" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/search" element={isAuthenticated ? <SearchPage /> : <Navigate to="/" />} />
          <Route path="/match" element={isAuthenticated ? <MatchPage /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;