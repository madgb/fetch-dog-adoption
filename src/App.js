import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import MatchPage from "./pages/MatchPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = document.cookie.includes("fetch-access-token");
    setIsAuthenticated(token);
  }, []);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, [setFavorites]);

  const toggleFavorite = (dog) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.some((fav) => fav.id === dog.id)
        ? prevFavorites.filter((fav) => fav.id !== dog.id)
        : [...prevFavorites, { ...dog }];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-blue-500 text-white p-4 flex justify-between">
          <h1 className="text-xl font-bold">
            <Link to="/search">Find my Match! Dog</Link>
          </h1>
          <div>
            <Link to="/search" className="mr-4 hover:underline">
              Search
            </Link>
            <Link to="/favorites" className="mr-4 hover:underline">
              Favorites
            </Link>
            <Link to="/match" className="hover:underline">
              Match
            </Link>
          </div>
        </nav>

        <div className="flex-grow flex items-center justify-center p-4">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/search" />
                ) : (
                  <LoginPage setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/search"
              element={
                isAuthenticated ? (
                  <SearchPage
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/favorites"
              element={
                isAuthenticated ? (
                  <FavoritesPage
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/match"
              element={isAuthenticated ? <MatchPage /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
