import React, { useState } from "react";

const MatchPage = () => {
  const [matchedDog, setMatchedDog] = useState(null);
  const [favoriteDogs, setFavoriteDogs] = useState([]);

  const handleMatch = async () => {
    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoriteDogs),
        credentials: "include",
      });
      const data = await response.json();
      setMatchedDog(data.match);
    } catch (error) {
      console.error("Error fetching match", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Matched Dog</h1>
      {matchedDog ? (
        <div className="p-4 bg-white shadow rounded">
          <h2 className="font-bold">{matchedDog.name}</h2>
          <p>{matchedDog.breed}</p>
          <img src={matchedDog.img} alt={matchedDog.name} className="w-full h-auto rounded-lg mt-2" />
        </div>
      ) : (
        <button onClick={handleMatch} className="bg-green-500 text-white px-4 py-2 rounded">
          Find My Match
        </button>
      )}
    </div>
  );
};

export default MatchPage;
