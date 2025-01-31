import React, { useState, useEffect } from "react";

export default function MatchPage() {
  const [matchedDog, setMatchedDog] = useState(null);

  useEffect(() => {
    const matchedId = localStorage.getItem("matchedDogId");
    if (!matchedId) return;

    const fetchMatchedDog = async () => {
      try {
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([matchedId]),
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const dogData = await response.json();
        setMatchedDog(dogData[0]); // 첫 번째 개체 저장
      } catch (error) {
        console.error("Error fetching matched dog", error);
      }
    };

    fetchMatchedDog();
  }, []);

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Your Matched Dog</h1>
      {matchedDog ? (
        <div className="p-4 bg-white shadow rounded flex flex-col items-center">
          <img
            src={matchedDog.img}
            alt={matchedDog.name}
            className="w-32 h-32 object-cover rounded-full mb-2"
          />
          <h2 className="font-bold">{matchedDog.name}</h2>
          <p>{matchedDog.breed}</p>
        </div>
      ) : (
        <p>No match found. Try selecting some dogs in search.</p>
      )}
    </div>
  );
}
