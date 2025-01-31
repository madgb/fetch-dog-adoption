import React from "react";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";

const FavoritesPage = ({ favorites, toggleFavorite }) => {
  const navigate = useNavigate();

  const fetchMatch = async () => {
    if (favorites.length === 0) return alert("Select at least one dog!");

    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/match",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(favorites.map((dog) => dog.id)),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const matchData = await response.json();
      localStorage.setItem("matchedDogId", matchData.match);
      navigate("/match");
    } catch (error) {
      console.error("Error fetching match", error);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Dogs</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {favorites.map((dog) => (
            <div
              key={dog.id}
              className="p-4 bg-white shadow rounded flex flex-col items-center"
            >
              <img
                src={dog.img}
                alt={dog.name}
                className="w-32 h-32 object-cover rounded-full mb-2"
              />
              <h2 className="font-bold">{dog.name}</h2>
              <p>{dog.breed}</p>
              <button
                onClick={() => toggleFavorite(dog)}
                className="mt-2 px-4 py-1 rounded bg-red-500 text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite dogs added yet.</p>
      )}
      <Button
        onClick={fetchMatch}
        disabled={favorites.length === 0}
        className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
      >Find My Match</Button>
    </div>
  );
};

export default FavoritesPage;
