import React from "react";
import Button from "../../../atoms/Button";

export default function DogTiles({
  dogs = [],
  toggleFavorite = () => {},
  favorites = [],
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {dogs.map((dog) => {
        const isFavorite = favorites.find(favorite => favorite.id === dog.id);

        return (
          <div
            key={dog.id}
            className={`p-4 shadow rounded flex flex-col items-center border ${
              isFavorite ? "border-yellow-500 bg-yellow-100" : "bg-white"
            }`}
          >
            <img
              src={dog.img}
              alt={dog.name}
              className="w-32 h-32 object-cover rounded-full mb-2"
            />
            <h2 className="font-bold">{dog.name}</h2>
            <p>{dog.breed}</p>
            <Button
              onClick={() => toggleFavorite(dog)}
              className={`mt-2 px-4 py-1 rounded ${
                isFavorite ? "bg-red-500 text-white" : "bg-blue-500 text-white"
              }`}
            >
              {isFavorite ? "Remove Favorite" : "Add to Favorites"}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
